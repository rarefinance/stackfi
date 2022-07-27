import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import SfiFinance from '../../sfi-finance';
import config from '../../config';

export interface SfiFinanceContext {
  sfiFinance?: SfiFinance;
}

export const Context = createContext<SfiFinanceContext>({ sfiFinance: null });

export const SfiFinanceProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [sfiFinance, setSfiFinance] = useState<SfiFinance>();

  useEffect(() => {
    if (!sfiFinance) {
      const sfi = new SfiFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        sfi.unlockWallet(ethereum, account);
      }
      setSfiFinance(sfi);
    } else if (account) {
      sfiFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, sfiFinance]);

  return <Context.Provider value={{ sfiFinance }}>{children}</Context.Provider>;
};
