import { hash, compare } from 'bcryptjs';
import IHashPassword from '../IHashPassword';

export default class BCryptHashPassword implements IHashPassword {
  public async HashCrete(password: string): Promise<string> {
    const hashPassword = await hash(password, 8);
    return hashPassword;
  }

  public async HashCompare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatched = await compare(password, hashPassword);
    return isMatched;
  }
}
