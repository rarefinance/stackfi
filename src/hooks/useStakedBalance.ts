import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useSfiFinance from './useSfiFinance';
import { ContractName } from '../sfi-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await sfiFinance.stakedBalanceOnBank(poolName, poolId, sfiFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, sfiFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
