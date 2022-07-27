import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import { TokenStat } from '../sfi-finance/types';
import config from '../config';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const sfiFinance = useSfiFinance();

  const fetchSharePrice = useCallback(async () => {
    setStat(await sfiFinance.getShareStat());
  }, [sfiFinance]);

  useEffect(() => {
    fetchSharePrice().catch((err) => console.error(`Failed to fetch TSHARE price: ${err.stack}`));
    const refreshInterval = setInterval(fetchSharePrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, sfiFinance, fetchSharePrice]);

  return stat;
};

export default useShareStats;
