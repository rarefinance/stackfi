import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnMasonry = (description?: string) => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem TSHARE from Masonry';
    handleTransactionReceipt(sfiFinance.exitFromMasonry(), alertDesc);
  }, [sfiFinance, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnMasonry;
