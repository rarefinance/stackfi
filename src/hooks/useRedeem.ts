import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import { Bank } from '../sfi-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(sfiFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, sfiFinance, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
