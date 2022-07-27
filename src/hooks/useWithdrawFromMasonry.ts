import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromMasonry = () => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        sfiFinance.withdrawShareFromMasonry(amount),
        `Withdraw ${amount} TSHARE from the masonry`,
      );
    },
    [sfiFinance, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromMasonry;
