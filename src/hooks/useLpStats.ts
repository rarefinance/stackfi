import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import { LPStat } from '../sfi-finance/types';
import config from '../config';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const sfiFinance = useSfiFinance();

  const fetchCashPrice = useCallback(async () => {
    setStat(await sfiFinance.getLPStat(lpTicker));
  }, [sfiFinance, lpTicker]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch SFI price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, sfiFinance, fetchCashPrice]);

  return stat;
};

export default useLpStats;
