import { SignUpData } from '@/schemas/user/signup';
import { User } from '@/schemas/user/user';
import { ApiService } from '@/services/client';

class UserService extends ApiService {
  constructor() {
    super('users/');
  }

  async create(user: SignUpData) {
    const { data } = await super.post<User>('', { ...user });
    return data;
  }

  async update(user: Partial<SignUpData>) {
    const { data } = await super.patch<User>('', { ...user });
    return data;
  }

  async remove(userID: number) {
    await super.delete<void>(`${userID}`);
    return;
  }
}

export const userService = new UserService();
