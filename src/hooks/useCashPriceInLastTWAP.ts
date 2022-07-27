import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const sfiFinance = useSfiFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await sfiFinance.getSfiPriceInLastTWAP());
  }, [sfiFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch SFI price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, sfiFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
