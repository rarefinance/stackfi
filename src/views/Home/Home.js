import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useSfiStats from '../../hooks/useSfiStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useFantomPrice from '../../hooks/useFantomPrice';
import { sfi as sfiTesting, tShare as tShareTesting } from '../../sfi-finance/deployments/deployments.testing.json';
import { sfi as sfiProd, tShare as tShareProd } from '../../sfi-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useSfiFinance from '../../hooks/useSfiFinance';
import { AlignCenter } from 'react-feather';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const sfiEthLpStats = useLpStats('SFI-ETH-LP');
  const tShareEthLpStats = useLpStats('TSHARE-ETH-LP');
  const sfiStats = useSfiStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const sfiFinance = useSfiFinance();
  const { price: ethPrice, marketCap: ethMarketCap, priceChange: ethPriceChange } = useFantomPrice();

  let sfi;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    sfi = sfiTesting;
    tShare = tShareTesting;
  } else {
    sfi = sfiProd;
    tShare = tShareProd;
  }

  const buySfiAddress = 'https://app.uniswap.org/#/swap?outputCurrency=' + sfi.address;
  const buyTShareAddress = 'https://app.uniswap.org/#/swap?/swap?outputCurrency=' + tShare.address;

  const sfiLPStats = useMemo(() => (sfiEthLpStats ? sfiEthLpStats : null), [sfiEthLpStats]);
  const tshareLPStats = useMemo(() => (tShareEthLpStats ? tShareEthLpStats : null), [tShareEthLpStats]);
  const sfiPriceInDollars = useMemo(
    () => (sfiStats ? Number(sfiStats.priceInDollars).toFixed(2) : null),
    [sfiStats],
  );
  const sfiPriceInETH = useMemo(() => (sfiStats ? Number(sfiStats.tokenInEth).toFixed(2) : null), [sfiStats]);
  const sfiCirculatingSupply = useMemo(() => (sfiStats ? String(sfiStats.circulatingSupply) : null), [sfiStats]);
  const sfiTotalSupply = useMemo(() => (sfiStats ? String(sfiStats.totalSupply) : null), [sfiStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInETH = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInEth).toFixed(2) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInETH = useMemo(() => (tBondStats ? Number(tBondStats.tokenInEth).toFixed(2) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const sfiLpZap = useZap({ depositTokenName: 'SFI-ETH-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-ETH-LP' });

  const [onPresentSfiZap, onDissmissSfiZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        sfiLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissSfiZap();
      }}
      tokenName={'SFI-ETH-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-ETH-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={2} justify="center">
          {/* <Paper>xs=  6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={10}>
        <Paper style={{ backgroundColor: '#eee', boxShadow: '2px 3px 4px 5px #C6E2FF'}}>
            <Box p={2}>
              <center>
              <h2>Welcome to STACKFi.</h2>
              <p>STACKFi is the premier seigniorage-centric yield farm on the Ethereum Network. Per the name of the protocol, our primary intent is to supplement investors' ability to "stack" $ETH during nascent periods of volatility via passive staking with mitigated protocol risks. Thus, irregardless of impending market cycles, we can share in the pursuit of our ultimate investment goals over longevity. To learn more on how the protocol functions, click here.</p>
              
              <i><b>Long live Proof of Stake.</b></i> 

            </center>
            </Box>
            </Paper>
        </Grid>

        {/* TVL */}
        <Grid item xs={8} sm={4}>
        <Paper style={{ backgroundColor: '#eee', boxShadow: '2px 3px 4px 5px #C6E2FF'}}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '20px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
          </Paper>
        </Grid>

        {/* Wallet */}
        <Grid item xs={16} sm={8}>
        <Paper style={{ backgroundColor: '#eee', boxShadow: '2px 3px 4px 5px #C6E2FF'}}>
          <Card
            style={{
              height: '100px',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: '1px solid var(--white)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardContent align="center">
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/farms" variant="contained" style={{ marginRight: '10px' }}>
                <b>Farms</b>
              </Button>
              <Button color="primary" href="/boardroom" variant="contained" style={{ marginRight: '25px' }}>
                <b>Stake</b>
              </Button>
              {/* <Button color="primary" href="/masonry" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button> */}
              {/* <Button href="/cemetery" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button> */}
              <Button
                target="_blank"
                href="https://spookyswap.finance/swap?outputCurrency=0x14def7584a6c52f470ca4f4b9671056b22f4ffde"
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                <b>Buy SFI</b>
              </Button>
              <Button
                variant="contained"
                target="_blank"
                href="https://spookyswap.finance/swap?outputCurrency=0x6437adac543583c4b31bf0323a0870430f5cc2e7"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                <b>Buy SFSHARE</b>
              </Button>
              <Button
                variant="contained"
                target="_blank"
                href="https://dexscreener.com/fantom/0x83a52eff2e9d112e9b022399a9fd22a9db7d33ae"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                <b>SFI Chart</b>
              </Button>
              <Button
                variant="contained"
                target="_blank"
                href="https://dexscreener.com/fantom/0xd352dac95a91afefb112dbbb3463ccfa5ec15b65"
                className={classes.button}
              >
                <b>SFSHARE Chart</b>
              </Button>
            </CardContent>
          </Card>
          </Paper>
        </Grid>

        {/* SFI */}
        <Grid item xs={12} sm={3}>
          <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>ETH</h2>
              <Box mt={2} style={{ backgroundColor: '#ffffff !important' }}>
                <CardIcon style={{ backgroundColor: '#ffffff !important' }}>
                  <TokenSymbol symbol="WETH" style={{ backgroundColor: 'transparent !important' }} />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>${ethPrice.toFixed(2) ? ethPrice.toFixed(2) : '-.----'} USD</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(ethMarketCap/1000000000).toFixed(2)}B <br />
                Price Change 24h: {ethPriceChange.toFixed(2)}% <br />
                <br />
                <br />
              </span>
            </CardContent>
          </Paper>
        </Grid>

        {/* SFI */}
        <Grid item xs={12} sm={3}>
        <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>SFI</h2>
              {/* <Button
                onClick={() => {
                  sfiFinance.watchAssetInMetamask('SFI');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2} style={{ backgroundColor: 'transparent !important' }}>
                <CardIcon style={{ backgroundColor: 'transparent !important' }}>
                  <TokenSymbol symbol="SFI" style={{ backgroundColor: 'transparent !important' }} />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{sfiPriceInETH ? sfiPriceInETH : '-.----'} ETH</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${sfiPriceInDollars ? sfiPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(sfiCirculatingSupply * sfiPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {sfiCirculatingSupply} <br />
                Total Supply: {sfiTotalSupply}
              </span>
            </CardContent>
          </Paper>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} sm={3}>
        <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>SFSHARE</h2>
              {/* <Button
                onClick={() => {
                  sfiFinance.watchAssetInMetamask('TSHARE');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInETH ? tSharePriceInETH : '-.----'} ETH</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply}
              </span>
            </CardContent>
          </Paper>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={3}>
        <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>SBOND</h2>
              {/* <Button
                onClick={() => {
                  sfiFinance.watchAssetInMetamask('TBOND');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> */}
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInETH ? tBondPriceInETH : '-.----'} ETH</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
          <Card style={{ backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid var(--white)' }}>
            <CardContent align="center">
              <h2>SFI-WFETH Uniswap LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SFI-ETH-LP" />
                </CardIcon>
              </Box>
              {/*
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentSfiZap} variant="contained">
                  Zap In
                </Button>
              </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {sfiLPStats?.tokenAmount ? sfiLPStats?.tokenAmount : '-.--'} SFI /{' '}
                  {sfiLPStats?.ethAmount ? sfiLPStats?.ethAmount : '-.--'} WETH
                </span>
              </Box>
              <Box>${sfiLPStats?.priceOfOne ? sfiLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${sfiLPStats?.totalLiquidity ? sfiLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {sfiLPStats?.totalSupply ? sfiLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper style={{ background: 'rgba(238, 238, 238, 0.65'}}>
          <Card style={{ backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid var(--white)' }}>
            <CardContent align="center">
              <h2>SFSHARE-WETH Uniswap LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE-ETH-LP" />
                </CardIcon>
              </Box>
              {/*<Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
            </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} SFSHARE /{' '}
                  {tshareLPStats?.ethAmount ? tshareLPStats?.ethAmount : '-.--'} WETH
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
