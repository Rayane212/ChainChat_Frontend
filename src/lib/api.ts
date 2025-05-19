import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export class ApiClient {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('jwt');
          window.location.href = '/auth';
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'An error occurred');
      }
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, username: string, password: string) {
    return this.request('POST', '/auth/login', { email, username, password });
  }

  async register(data: any) {
    return this.request('POST', '/auth/register', data);
  }

  async getUserProfile() {
    return this.request('GET', '/auth/me');
  }

  async logout() {
    return this.request('POST', '/auth/logout');
  }

  async refreshToken() {
    return this.request('POST', '/auth/refresh');
  }

  async forgotPassword(email: string) {
    return this.request('POST', '/auth/send-mail-forget-password', { email });
  }

  async resetPassword(token: string, password: string) {
    return this.request('POST', '/auth/reset-password', { token, password });
  }

  // Message endpoints
  async sendMessage(recipientId: string, content: string) {
    return this.request('POST', '/messages', { recipientId, content });
  }

  async getMessages() {
    return this.request('GET', '/messages');
  }

  async createGroup(name: string, userIds: string[]) {
    return this.request('POST', '/messages/groups', { name, userIds });
  }

  async addUserToGroup(conversationId: string, userId: string) {
    return this.request('POST', `/messages/groups/${conversationId}/members/${userId}`);
  }

  async removeUserFromGroup(conversationId: string, userId: string) {
    return this.request('DELETE', `/messages/groups/${conversationId}/members/${userId}`);
  }

  async getGroupMembers(conversationId: string) {
    return this.request('GET', `/messages/groups/${conversationId}/members`);
  }

  async leaveGroup(conversationId: string) {
    return this.request('DELETE', `/messages/groups/${conversationId}/members`);
  }

  async getWebSocketInfo() {
    return this.request('GET', '/ws-info');
  }
}

export const api = new ApiClient('http://localhost:3000/api');