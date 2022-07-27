import { useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import { AllocationTime } from '../sfi-finance/types';

const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const sfiFinance = useSfiFinance();

  useEffect(() => {
    if (sfiFinance) {
      sfiFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [sfiFinance]);
  return time;
};

export default useTreasuryAllocationTimes;
