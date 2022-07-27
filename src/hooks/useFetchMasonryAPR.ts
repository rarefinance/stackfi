import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import config from '../config';

const useFetchMasonryAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const sfiFinance = useSfiFinance();

  const fetchMasonryPR = useCallback(async () => {
    setApr(await sfiFinance.getMasonryAPR());
  }, [sfiFinance]);

  useEffect(() => {
    fetchMasonryPR().catch((err) => console.error(`Failed to fetch masonry apr: ${err.stack}`));
    const refreshInterval = setInterval(fetchMasonryPR, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setApr, sfiFinance, fetchMasonryPR]);

  return apr;
};

export default useFetchMasonryAPR;
