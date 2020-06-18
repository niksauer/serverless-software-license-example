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

const USE_SIGNER_INTERNAL = process.env.USE_SIGNER!;
assert(USE_SIGNER_INTERNAL !== undefined, 'USE_SIGNER env required');

const USE_SIGNER = USE_SIGNER_INTERNAL === 'true';

// eslint-disable-next-line prefer-destructuring
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (USE_SIGNER) {
  assert(PRIVATE_KEY !== undefined, 'PRIVATE_KEY env required');
}

const MNEMONIC = process.env.MNEMONIC!;
assert(MNEMONIC !== undefined, 'MNEMONIC env required');

const USE_TEST_ENV_INTERNAL = process.env.USE_TEST_ENVIRONMENT!;
assert(
  USE_TEST_ENV_INTERNAL !== undefined,
  'USE_TEST_ENVIRONMENT env required'
);

const USE_TEST_ENVIRONMENT = USE_TEST_ENV_INTERNAL === 'true';

export {
  LICENSE_PATH,
  RPC_HOST,
  CONTRACT_ADDRESS,
  PRIVATE_KEY,
  USE_SIGNER,
  MNEMONIC,
  USE_TEST_ENVIRONMENT
};
