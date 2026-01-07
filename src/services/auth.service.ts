import { findByUserName } from '../repository/user.repository';
import { IUser } from '../models/user.model';
import { comparePassword } from '../utils/passwordManager';
import jwt from 'jsonwebtoken';

export async function login(
  username: string,
  password: string
): Promise<{ token: string; user: IUser }> {

  const user = (await findByUserName(username)) as unknown as IUser;
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const isValidPassword = await comparePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error('INVALID_PASSWORD');
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return {
    token,
    user,
  };
}