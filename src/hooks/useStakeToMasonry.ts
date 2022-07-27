import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToMasonry = () => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(sfiFinance.stakeShareToMasonry(amount), `Stake ${amount} TSHARE to the masonry`);
    },
    [sfiFinance, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToMasonry;
