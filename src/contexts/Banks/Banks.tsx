import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useSfiFinance from '../../hooks/useSfiFinance';
import { Bank } from '../../sfi-finance';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const sfiFinance = useSfiFinance();
  const isUnlocked = sfiFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!sfiFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await sfiFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          sfiFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: sfiFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'SFI' ? sfiFinance.SFI : sfiFinance.TSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [sfiFinance, setBanks]);

  useEffect(() => {
    if (sfiFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, sfiFinance, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
