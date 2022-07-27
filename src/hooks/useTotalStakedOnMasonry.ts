import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useSfiFinance from './useSfiFinance';
import config from '../config';

const useTotalStakedOnMasonry = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const fetchTotalStaked = useCallback(async () => {
    setTotalStaked(await sfiFinance.getTotalStakedInMasonry());
  }, [sfiFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchTotalStaked().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchTotalStaked, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, fetchTotalStaked, sfiFinance]);

  return totalStaked;
};

export default useTotalStakedOnMasonry;
