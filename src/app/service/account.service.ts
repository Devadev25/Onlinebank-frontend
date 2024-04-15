import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  balanceEnquiry(accountNumber: string): Observable<any> {
    const url = `${this.baseUrl}/balanceEnquiry`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAuthToken()}`,
      }),
    };
    const requestBody = { accountNumber: accountNumber }; // Directly send the accountNumber

    return this.http.post<any>(url, requestBody, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred.';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}


  // balanceEnquiry(accountNumber: string): Observable<any> {
  //   return this.http.get<any>(
  //     `http://localhost:8080/api/user/balanceEnquiry`
  //   );
  // }

