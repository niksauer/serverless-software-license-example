import dotenv from 'dotenv';
import assert from './utils/assert';

dotenv.config();

const RPC_HOST = process.env.RPC_HOST!;
assert(RPC_HOST !== undefined, 'RPC_HOST env required');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
assert(CONTRACT_ADDRESS !== undefined, 'CONTRACT_ADDRESS env required');

export { RPC_HOST, CONTRACT_ADDRESS };
