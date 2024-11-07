import { compile } from '@parity/revive';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('Compiling contracts...');

let json = JSON.parse(readFileSync('src/constants.json', 'utf8'));
const input = [
  { file: 'ERC20.sol', contract: 'MyToken', keypath: 'hst' },
  { file: 'Piggybank.sol', contract: 'PiggyBank', keypath: 'piggybank' },
  { file: 'ERC721.sol', contract: 'MyToken', keypath: 'nfts' },
  {
    file: 'FailingContract.sol',
    contract: 'MMCheck',
    keypath: 'failingContract',
  },
  {
    file: 'MultisigWallet.sol',
    contract: 'MultiSigWallet',
    keypath: 'multisig',
  },
  {
    file: 'ERC1155Example.sol',
    contract: 'ERC1155Example',
    keypath: 'erc1155',
  },
];

for (const { keypath, contract, file } of input) {
  console.log(`Compile ${file}`);
  const out = await compile({
    [file]: { content: readFileSync(join('contracts', file), 'utf8') },
  });

  const entry = out.contracts[file][contract];
  json[`${keypath}Abi`] = entry.abi;
  json[`${keypath}bytecode`] = entry.evm.bytecode.object;
}
writeFileSync('src/constants.json', JSON.stringify(json, null, 2));
