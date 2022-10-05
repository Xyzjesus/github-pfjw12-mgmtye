import { SigningCosmosClient } from '@cosmjs/launchpad';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { calculateFee, coins, GasPrice } from '@cosmjs/stargate';
import { CW20Base } from './contract';

import {
  assertIsBroadcastTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';

const CYBER = {
  CYBER_CONGRESS_ADDRESS: 'cyber1latzme6xf6s8tsrymuu6laf2ks2humqvdq39v8',
  DIVISOR_CYBER_G: 10 ** 9,
  DENOM_CYBER: 'boot',
  DENOM_CYBER_G: `GBOOT`,
  HYDROGEN: 'H',

  // CHAIN_ID: 'dev',
  // CYBER_NODE_URL_API: 'http://localhost:26657',
  // CYBER_WEBSOCKET_URL: 'ws://localhost:26657/websocket',
  // CYBER_NODE_URL_LCD: 'http://localhost:1317',

  CHAIN_ID: 'bostrom',
  CYBER_NODE_URL_API: 'https://rpc.bostrom.cybernode.ai',
  CYBER_WEBSOCKET_URL: 'wss://rpc.bostrom.cybernode.ai/websocket',
  CYBER_NODE_URL_LCD: 'https://lcd.bostrom.cybernode.ai',
  CYBER_INDEX_HTTPS: 'https://index.bostrom.cybernode.ai/v1/graphql',
  CYBER_INDEX_WEBSOCKET: 'wss://index.bostrom.cybernode.ai/v1/graphql',

  // CHAIN_ID: 'space-pussy-1',
  // CYBER_NODE_URL_API: 'https://rpc.space-pussy-1.cybernode.ai',
  // CYBER_WEBSOCKET_URL: 'wss://rpc.space-pussy-1.cybernode.ai/websocket',
  // CYBER_NODE_URL_LCD: 'https://lcd.space-pussy-1.cybernode.ai',
  // CYBER_INDEX_HTTPS: 'https://index.space-pussy-1.cybernode.ai/v1/graphql',
  // CYBER_INDEX_WEBSOCKET: 'wss://index.space-pussy-1.cybernode.ai/v1/graphql',

  CYBER_GATEWAY: 'https://gateway.ipfs.cybernode.ai',

  BECH32_PREFIX_ACC_ADDR_CYBER: 'bostrom',
  BECH32_PREFIX_ACC_ADDR_CYBERVALOPER: 'bostromvaloper',
  MEMO_KEPLR: '[bostrom] cyb.ai, using keplr',
};

const configKeplr = () => {
  return {
    // Chain-id of the Cosmos SDK chain.
    chainId: CYBER.CHAIN_ID,
    // The name of the chain to be displayed to the user.
    chainName: CYBER.CHAIN_ID,
    // RPC endpoint of the chain.
    rpc: CYBER.CYBER_NODE_URL_API,
    rest: CYBER.CYBER_NODE_URL_LCD,
    stakeCurrency: {
      coinDenom: 'BOOT',
      coinMinimalDenom: 'boot',
      coinDecimals: 0,
    },
    bip44: {
      // You can only set the coin type of BIP44.
      // 'Purpose' is fixed to 44.
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'cyber',
      bech32PrefixAccPub: 'cyberpub',
      bech32PrefixValAddr: 'cybervaloper',
      bech32PrefixValPub: 'cybervaloperpub',
      bech32PrefixConsAddr: 'cybervalcons',
      bech32PrefixConsPub: 'cybervalconspub',
    },
    currencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: 'BOOT',
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: 'boot',
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: 'BOOT',
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: 'boot',
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 0,
      average: 0,
      high: 0,
    },
  };
};

window.onload = async () => {
  // Keplr extension injects the offline signer that is compatible with cosmJS.
  // You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
  // And it also injects the helper function to `window.keplr`.
  // If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
  if (!window.getOfflineSigner || !window.keplr) {
    alert('Please install keplr extension');
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
        // cosmoshub-3 is integrated to Keplr so the code should return without errors.
        // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
        // If the user approves, the chain will be added to the user's Keplr extension.
        // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
        // If the same chain id is already registered, it will resolve and not require the user interactions.
        await window.keplr.experimentalSuggestChain(configKeplr());
      } catch {
        alert('Failed to suggest the chain');
      }
    } else {
      alert('Please use the recent version of keplr extension');
    }
  }

  // You should request Keplr to enable the wallet.
  // This method will ask the user whether or not to allow access if they haven't visited this website.
  // Also, it will request user to unlock the wallet if the wallet is locked.
  // If you don't request enabling before usage, there is no guarantee that other methods will work.
  await window.keplr.enable(CYBER.CHAIN_ID);

  const offlineSigner = window.getOfflineSigner(CYBER.CHAIN_ID);
  const accounts = await offlineSigner.getAccounts();
  console.log('accounts', accounts);
  const client = new SigningCosmosClient(
    CYBER.CYBER_NODE_URL_API,
    accounts[0].address,
    offlineSigner
  );
  const address = accounts[0].address;
  const cw20BaseContract = CW20Base(client, address);
  console.log('cw20BaseContract', cw20BaseContract);

  const data = {
    name: 'Test contract',
    symbol: 'AAAS',
    decimals: 6,
    initial_balances: 10,
    mint: {
      minter: address,
      cap: 9999,
    },
    marketing: {
      project: 'My Awesome Project',
      description: 'This is my awesome contract project',
      marketing: address,
      logo: {
        url: 'https://toppng.com/uploads/preview/sample-logo-11551056375txoo49urn6.png',
      },
    },
  };

  document.getElementById('address').append(accounts[0].address);
  cw20BaseContract
    .instantiate(address, 5, data, data.name, address)
    .then((result) => {
      console.log('success', result);
    })
    .catch((err) => {
      console.log('err', err);
      alert(err);
    });
};
