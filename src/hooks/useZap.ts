import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import { Bank } from '../sfi-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        sfiFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, sfiFinance, handleTransactionReceipt],
  );
  return { onZap: handleZap };
};

export default useZap;
