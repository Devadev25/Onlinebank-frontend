import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class transferService {
  [x: string]: any;
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  transferMoney(transferRequest: any): Observable<any> {
    const url = `${this.baseUrl}/transfer`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAuthToken()}`,
      }),
    };

    return this.http.post<any>(url, transferRequest, httpOptions).pipe(
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
