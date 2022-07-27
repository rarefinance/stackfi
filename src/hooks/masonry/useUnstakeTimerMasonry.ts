import { useEffect, useState } from 'react';
import useSfiFinance from '../useSfiFinance';
import { AllocationTime } from '../../sfi-finance/types';

const useUnstakeTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const sfiFinance = useSfiFinance();

  useEffect(() => {
    if (sfiFinance) {
      sfiFinance.getUserUnstakeTime().then(setTime);
    }
  }, [sfiFinance]);
  return time;
};

export default useUnstakeTimerMasonry;
