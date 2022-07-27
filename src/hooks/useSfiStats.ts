import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import { TokenStat } from '../sfi-finance/types';
import config from '../config';

const useSfiStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const sfiFinance = useSfiFinance();

  const fetchCashPrice = useCallback(async () => {
    setStat(await sfiFinance.getSfiStat());
  }, [sfiFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch SFI price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, sfiFinance, fetchCashPrice]);

  return stat;
};

export default useSfiStats;
