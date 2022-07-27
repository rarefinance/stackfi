import { useCallback } from 'react';
import useSfiFinance from './useSfiFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../sfi-finance';

const useHarvest = (bank: Bank) => {
  const sfiFinance = useSfiFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      sfiFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, sfiFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
