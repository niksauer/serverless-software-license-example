import dotenv from 'dotenv';
import { remote } from 'electron';
import path from 'path';
import assert from './utils/assert';

dotenv.config();

// https://www.electronjs.org/docs/api/app
const LICENSE_PATH = path.join(remote.app.getPath('userData'), 'license.json');

const RPC_HOST = process.env.RPC_HOST!;
assert(RPC_HOST !== undefined, 'RPC_HOST env required');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
assert(CONTRACT_ADDRESS !== undefined, 'CONTRACT_ADDRESS env required');

const USE_CONFIG_SIGNER_INTERNAL = process.env.USE_CONFIG_SIGNER!;
assert(
  USE_CONFIG_SIGNER_INTERNAL !== undefined,
  'USE_CONFIG_SIGNER env required'
);

const USE_CONFIG_SIGNER = USE_CONFIG_SIGNER_INTERNAL === 'true';

const ALLOW_SIGNER_INTERNAL = process.env.ALLOW_SIGNER!;
assert(ALLOW_SIGNER_INTERNAL !== undefined, 'ALLOW_SIGNER env required');

const ALLOW_SIGNER = ALLOW_SIGNER_INTERNAL === 'true';

// eslint-disable-next-line prefer-destructuring
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
assert(PRIVATE_KEY !== undefined, 'PRIVATE_KEY env required');

const MNEMONIC = process.env.MNEMONIC!;
assert(MNEMONIC !== undefined, 'MNEMONIC env required');

const USE_TEST_ENV_INTERNAL = process.env.USE_TEST_ENVIRONMENT!;
assert(
  USE_TEST_ENV_INTERNAL !== undefined,
  'USE_TEST_ENVIRONMENT env required'
);

const USE_TEST_ENVIRONMENT = USE_TEST_ENV_INTERNAL === 'true';

const DIRECT_PURCHASE_INTERNAL = process.env.DIRECT_PURCHASE!;
assert(DIRECT_PURCHASE_INTERNAL !== undefined, 'DIRECT_PURCHASE env required');

const DIRECT_PURCHASE = DIRECT_PURCHASE_INTERNAL === 'true';

export {
  LICENSE_PATH,
  RPC_HOST,
  CONTRACT_ADDRESS,
  PRIVATE_KEY,
  ALLOW_SIGNER,
  USE_CONFIG_SIGNER,
  MNEMONIC,
  USE_TEST_ENVIRONMENT,
  DIRECT_PURCHASE
};
