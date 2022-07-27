import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useSfiFinance from './useSfiFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const sfiFinance = useSfiFinance();

  useEffect(() => {
    if (sfiFinance) {
      const { Treasury } = sfiFinance.contracts;
      sfiFinance.SFI.balanceOf(Treasury.address).then(setAmount);
    }
  }, [sfiFinance]);
  return amount;
};

export default useTreasuryAmount;
