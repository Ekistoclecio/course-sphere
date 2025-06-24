import { SignUpData } from '@/schemas/user/signup';
import { User } from '@/schemas/user/user';
import { ApiService } from '@/services/client';

class UserService extends ApiService {
  constructor() {
    super('users/');
  }

  create = async (user: SignUpData) => {
    const { data } = await this.post<User>('', { ...user });
    return data;
  };

  update = async (user: Partial<SignUpData>, id: number) => {
    const { data } = await this.patch<User>(`${id}`, { ...user });
    return data;
  };

  remove = async (userID: number) => {
    await this.delete<void>(`${userID}`);
    return;
  };
}

export const userService = new UserService();
