import IHashPassword from '../../IHashPassword';

export default class FakeBCryptHashPassword implements IHashPassword {
  public async HashCrete(password: string): Promise<string> {
    return password;
  }

  public async HashCompare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return password === hashPassword;
  }
}
