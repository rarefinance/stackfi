import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromMasonry = () => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(sfiFinance.harvestCashFromMasonry(), 'Claim SFI from Masonry');
  }, [sfiFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromMasonry;
