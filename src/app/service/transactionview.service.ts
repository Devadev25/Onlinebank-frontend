import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../Interface/history';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionviewService {

  private apiUrl = 'http://localhost:8080/bankStatement';

  constructor(private http: HttpClient) {}

  getTransactionsByDateRange(accountNumber: string, startDate: string, endDate: string): Observable<Transaction[]> {
    const url = `${this.apiUrl}/history?accountNumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Transaction[]>(url).pipe(
      tap(data => console.log('Received data:', data)),
      catchError(error => {
        console.error('Error fetching transactions:', error);
        throw error;
      })
    );
  }
}
