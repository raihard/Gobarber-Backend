import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private usersTokens: UserToken[] = [];

  public async create(User_Id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, { id: uuid(), User_Id, token: uuid() });
    userToken.created_at = new Date(Date.now());
    this.usersTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.usersTokens.find(
      tokenid => tokenid.token === token,
    );
    return userToken;
  }
}

export default FakeUserTokenRepository;
