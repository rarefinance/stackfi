import { useCallback, useEffect, useState } from 'react';
import useSfiFinance from './useSfiFinance';
import useStakedBalanceOnMasonry from './useStakedBalanceOnMasonry';

const useMasonryVersion = () => {
  const [masonryVersion, setMasonryVersion] = useState('latest');
  const sfiFinance = useSfiFinance();
  const stakedBalance = useStakedBalanceOnMasonry();

  const updateState = useCallback(async () => {
    setMasonryVersion(await sfiFinance.fetchMasonryVersionOfUser());
  }, [sfiFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (sfiFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [sfiFinance?.isUnlocked, stakedBalance]);

  return masonryVersion;
};

export default useMasonryVersion;
