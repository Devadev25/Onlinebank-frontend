import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Transaction } from '../Interface/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private apiUrl = 'http://localhost:8080/bankStatement'; // Update the API URL

  constructor(private http: HttpClient) {}

  getTransactionsByDateRange(
    accountNumber: string,
    startDate: string,
    endDate: string,
    amount: string
  ): Observable<Transaction[]> {
    const url = `${this.apiUrl}/pdf?accountNumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Transaction[]>(url).pipe(
      tap((data) => console.log('Received data:', data)),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        throw error;
      })
    );
  }
}
