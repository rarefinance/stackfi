import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import { TokenStat } from '../sfi-finance/types';
import config from '../config';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const sfiFinance = useSfiFinance();

  const fetchBondPrice = useCallback(async () => {
    setStat(await sfiFinance.getBondStat());
  }, [sfiFinance]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch TBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, sfiFinance, fetchBondPrice]);

  return stat;
};

export default useBondStats;
