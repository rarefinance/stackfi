import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks';
import useAllowance from './useAllowance';
import ERC20 from '../sfi-finance/ERC20';
import { ETH_TICKER, SFI_TICKER, TSHARE_TICKER, ZAPPER_ROUTER_ADDR } from '../utils/constants';
import useSfiFinance from './useSfiFinance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveZapper(zappingToken: string): [ApprovalState, () => Promise<void>] {
  const sfiFinance = useSfiFinance();
  let token: ERC20;
  if (zappingToken === ETH_TICKER) token = sfiFinance.ETH;
  else if (zappingToken === SFI_TICKER) token = sfiFinance.SFI;
  else if (zappingToken === TSHARE_TICKER) token = sfiFinance.TSHARE;
  const pendingApproval = useHasPendingApproval(token.address, ZAPPER_ROUTER_ADDR);
  const currentAllowance = useAllowance(token, ZAPPER_ROUTER_ADDR, pendingApproval);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // we might not have enough data to know whether or not we need to approve
    if (token === sfiFinance.ETH) return ApprovalState.APPROVED;
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval, token, sfiFinance]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    const response = await token.approve(ZAPPER_ROUTER_ADDR, APPROVE_AMOUNT);
    addTransaction(response, {
      summary: `Approve ${token.symbol}`,
      approval: {
        tokenAddress: token.address,
        spender: ZAPPER_ROUTER_ADDR,
      },
    });
  }, [approvalState, token, addTransaction]);

  return [approvalState, approve];
}

export default useApproveZapper;
