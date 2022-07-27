import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from '../useSfiFinance';
import config from '../../config';

const useClaimRewardCheck = () => {
  const [canClaimReward, setCanClaimReward] = useState(false);
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const canUserClaimReward = useCallback(async () => {
    setCanClaimReward(await sfiFinance.canUserClaimRewardFromMasonry());
  }, [sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      canUserClaimReward().catch((err) => console.error(err.stack));

      const checkButton = setInterval(canUserClaimReward, config.refreshInterval);
      return () => clearInterval(checkButton);
    }
  }, [isUnlocked, canUserClaimReward, sfiFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
