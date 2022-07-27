import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useSfiFinance from './useSfiFinance';
import config from '../config';

const useEarningsOnMasonry = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await sfiFinance.getEarningsOnMasonry());
  }, [sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, setBalance, fetchBalance, sfiFinance]);

  return balance;
};

export default useEarningsOnMasonry;
