import { TronWeb } from 'tronweb';
import web3 from 'web3';
import TonWeb from 'tonweb'

export class WalletAddressValidator {
  static isValidTRC20(address: string): boolean {
    return TronWeb.isAddress(address);
  }

  static isValidBEP20(address: string): boolean {
    return web3.utils.isAddress(address);
  }

  static isValidTON(address: string): boolean {
    return TonWeb.Address.isValid(address);
  }
}