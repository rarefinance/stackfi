import React from 'react';

//Graveyard ecosystem logos
import sfiLogo from '../../assets/img/crypto_tomb_cash2.svg';
import tShareLogo from '../../assets/img/crypto_tomb_share.svg';
import sfiLogoPNG from '../../assets/img/crypto_tomb_cash.f2b44ef4.png';
import tShareLogoPNG from '../../assets/img/crypto_tomb_share.bf1a6c52.png';
import tBondLogo from '../../assets/img/crypto_tomb_bond.svg';

import sfiEthLpLogo from '../../assets/img/tomb_ftm_lp.svg';
import tshareEthLpLogo from '../../assets/img/tshare_ftm_lp.svg';

import wethLogo from '../../assets/img/ftm_logo_blue.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  SFI: sfiLogo,
  SFIPNG: sfiLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  TBOND: tBondLogo,
  WETH: wethLogo,
  'SFI-ETH-LP': sfiEthLpLogo,
  'TSHARE-ETH-LP': tshareEthLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
