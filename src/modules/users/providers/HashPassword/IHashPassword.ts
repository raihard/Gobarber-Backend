export default interface IHashPassword {
  HashCrete(password: string): Promise<string>;
  HashCompare(password: string, hashPassword: string): Promise<boolean>;
}
