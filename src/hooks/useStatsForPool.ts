import { useCallback, useState, useEffect } from 'react';
import useSfiFinance from './useSfiFinance';
import { Bank } from '../sfi-finance';
import { PoolStats } from '../sfi-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const sfiFinance = useSfiFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await sfiFinance.getPoolAPRs(bank));
  }, [sfiFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch TBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, sfiFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
