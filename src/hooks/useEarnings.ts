import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useSfiFinance from './useSfiFinance';
import { ContractName } from '../sfi-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await sfiFinance.earnedFromBank(poolName, earnTokenName, poolId, sfiFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, sfiFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
