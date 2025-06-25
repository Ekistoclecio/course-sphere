import { EditProfileData, profileUpdateBaseSchema } from '@/schemas/user/profileEdit';
import { signUpBaseSchema, SignUpData } from '@/schemas/user/signup';
import { userSchema, User } from '@/schemas/user/user';
import { userService } from '@/services/user';
import { zodValidate } from '@/utils/zod/validate';
import { randomUserSchema } from '@/schemas/user/randomUser';
import { RandomUsersServiceInstance } from '@/services/randomUsers';

export class UserModel {
  static async create(user: SignUpData): Promise<User> {
    zodValidate(user, signUpBaseSchema);
    const createdUser = await userService.create(user);
    zodValidate(createdUser, userSchema);
    return createdUser;
  }

  static async update(user: Partial<EditProfileData>, id: number): Promise<User> {
    zodValidate(user, profileUpdateBaseSchema.partial());
    const updatedUser = await userService.update(user, id);
    zodValidate(updatedUser, userSchema);
    return updatedUser;
  }

  static async remove(userID: number): Promise<void> {
    return await userService.remove(userID);
  }

  static async getRandomUsers(results: number): Promise<SignUpData[]> {
    const { data } = await RandomUsersServiceInstance.getUsers(results);
    data.results.forEach((u) => zodValidate(u, randomUserSchema));
    const users = data.results.map((u) => ({
      name: `${u.name.first} ${u.name.last}`,
      email: u.email,
      password: u.login.password,
      confirm_password: u.login.password,
    }));
    return users;
  }
}
