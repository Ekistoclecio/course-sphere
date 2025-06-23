import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor(entity: string) {
    this.api = axios.create({
      baseURL: `http://localhost:3001/${entity}`,
      timeout: 10000,
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.api.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.api.post<T>(url, data, config);
  }

  public async patch<T>(
    url: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.api.patch<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.api.delete<T>(url, config);
  }
}

const ApiServiceInstance = new ApiService('');

export { ApiService, ApiServiceInstance };
