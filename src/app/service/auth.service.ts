import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  private token: string | null = null;

  constructor(private httpClient: HttpClient) {}

  userLogin(data: any) {
    return this.httpClient.post('http://localhost:8080/api/user/login', data);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  setAuthToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearAuthToken(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }
  getCurrentUser() {
    this.user = sessionStorage.getItem('role');
  }
}
