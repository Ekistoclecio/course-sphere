import { signUpBaseSchema, SignUpData } from '@/schemas/user/signup';
import { userSchema, User } from '@/schemas/user/user';
import { userService } from '@/services/user';
import { zodValidate } from '@/utils/zod/validate';

export class UserModel {
  static async create(user: SignUpData): Promise<User> {
    zodValidate(user, signUpBaseSchema);
    const createdUser = await userService.create(user);
    zodValidate(createdUser, userSchema);
    return createdUser;
  }

  static async update(user: Partial<SignUpData>): Promise<User> {
    zodValidate(user, signUpBaseSchema.partial());
    const updatedUser = await userService.update(user);
    zodValidate(updatedUser, userSchema);
    return updatedUser;
  }

  static async remove(userID: number): Promise<void> {
    return await userService.remove(userID);
  }
}
