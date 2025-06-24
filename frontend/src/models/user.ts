import { EditProfileData, profileUpdateBaseSchema } from '@/schemas/user/profileEdit';
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

  static async update(user: EditProfileData, id: number): Promise<User> {
    zodValidate(user, profileUpdateBaseSchema.partial());
    const updatedUser = await userService.update(user, id);
    zodValidate(updatedUser, userSchema);
    return updatedUser;
  }

  static async remove(userID: number): Promise<void> {
    return await userService.remove(userID);
  }
}
