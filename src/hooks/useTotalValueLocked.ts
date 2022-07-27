import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import config from '../config';
const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const sfiFinance = useSfiFinance();

  const fetchTVL = useCallback(async () => {
    setTotalValueLocked(await sfiFinance.getTotalValueLocked());
  }, [sfiFinance]);

  useEffect(() => {
    fetchTVL().catch((err) => console.error(`Failed to fetch Total value locked: ${err.stack}`));
    const refreshInterval = setInterval(fetchTVL, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setTotalValueLocked, sfiFinance, fetchTVL]);

  return totalValueLocked;
};

export default useTotalValueLocked;
