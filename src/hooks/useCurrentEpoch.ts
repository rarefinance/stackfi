import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const sfiFinance = useSfiFinance();

  const fetchCurrentEpoch = useCallback(async () => {
    setCurrentEpoch(await sfiFinance.getCurrentEpoch());
  }, [sfiFinance]);

  useEffect(() => {
    fetchCurrentEpoch().catch((err) => console.error(`Failed to fetch SFI price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCurrentEpoch, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setCurrentEpoch, sfiFinance, fetchCurrentEpoch]);

  return currentEpoch;
};

export default useCurrentEpoch;
