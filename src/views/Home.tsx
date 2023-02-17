import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Roadmap } from './Roadmap';
import * as anchor from '@project-serum/anchor';
import * as metagrab from 'solana-nft-metadata';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { CandyMachine, getCandyMachineState } from '../utils/candy-machine';
import { getMeta } from '../utils/get-meta';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Team } from './Team';
import { Rarity } from './Rarity';
import { MyScoogis } from './MyScoogis';
import { Battle } from './Battle';
import { WalletDisconnectButton } from '@solana/wallet-adapter-material-ui';
import BattleDetails from './BattleDetails';
import { Navbar } from '../components/Navbar';
import { Leaderboard } from './Leaderboard';

const Logo = styled.img`
  width: 480px;
  max-width: 100%;
`;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const Home = (props: HomeProps) => {
  const [myScoogis, setMySoogis] = useState([]);
  const [scoogisLoading, setScoogisLoading] = useState(false);
  const [scoogisLoaded, setScoogisLoaded] = useState(false);
  const [, setStartDate] = useState(new Date(props.startDate));
  const { width } = useWindowSize();
  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) {
        setMySoogis([]);
        setScoogisLoaded(false);
        setScoogisLoading(false);
        return;
      }
      const { candyMachine, goLiveDate } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey && candyMachine?.connection) {
        setScoogisLoading(true);
        const d = await metagrab.getAllUserTokens(wallet.publicKey, {
          connection: candyMachine?.connection
        });

        let data = (await Promise.all(
          d.map((e) => getMeta(`${e.mint}`, rpcHost))
        ).then((res) => res.flat().filter((f) => f))) as any;
        console.log(data);

        setMySoogis(data);
        setScoogisLoading(false);
        setScoogisLoaded(true);
      }
    })();
  }, [candyMachine?.connection, wallet?.publicKey]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection
  ]);

  return (
    <main>
      <WalletDisconnectButton
        style={{ position: 'absolute', right: 0, margin: '1rem' }}
      />
      <Logo
        src="https://arweave.net/WDdl0iJJKcpXQWYE34YqmO2f_tgdOY_PfQMXjh2vCqY"
        alt="Logo"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/team" component={Team} />
          <Route exact path="/my-scoogis">
            <MyScoogis
              wallet={wallet}
              scoogisLoading={scoogisLoading}
              width={width}
              myScoogis={myScoogis}
              scoogisLoaded={scoogisLoaded}
            />
          </Route>
          <Route exact path="/rarities" component={Rarity} />
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/battle/:id" component={BattleDetails} />
          <Route exact path="/battle">
            <Battle
              wallet={wallet}
              rpcHost={rpcHost}
              scoogisLoading={scoogisLoading}
              scoogisLoaded={scoogisLoaded}
              myScoogis={myScoogis}
              width={width}
            />
          </Route>
          <Route path="/" component={Roadmap} />
        </Switch>
      </Router>
    </main>
  );
};

export default Home;
