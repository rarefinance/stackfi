import { useContext } from 'react';
import { Context } from '../contexts/SfiFinanceProvider';

const useSfiFinance = () => {
  const { sfiFinance } = useContext(Context);
  return sfiFinance;
};

export default useSfiFinance;
