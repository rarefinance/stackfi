import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from '../useSfiFinance';
import config from '../../config';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const canUserWithdraw = useCallback(async () => {
    setCanWithdraw(await sfiFinance.canUserUnstakeFromMasonry());
  }, [sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      canUserWithdraw().catch((err) => console.error(err.stack));

      const checkButton = setInterval(canUserWithdraw, config.refreshInterval);
      return () => clearInterval(checkButton);
    }
  }, [isUnlocked, canUserWithdraw, sfiFinance]);

  return canWithdraw;
};

export default useWithdrawCheck;
