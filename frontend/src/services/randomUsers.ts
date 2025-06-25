'use client';

import { RandomUser } from '@/schemas/user/randomUser';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class RandomUsersService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://randomuser.me/api',
    });
  }

  public getUsers = async (
    results: number = 5
  ): Promise<AxiosResponse<{ results: RandomUser[] }>> => {
    return await this.api.get<{ results: RandomUser[] }>(
      `?results=${results}&password=upper,lower,6`
    );
  };
}

export const RandomUsersServiceInstance = new RandomUsersService();
