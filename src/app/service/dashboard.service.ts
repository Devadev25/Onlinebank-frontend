import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl="http://localhost:8080/bankStatement/total-amount"

  constructor(private hhtp:HttpClient) { }
  getTotalTransactions():Observable<number>{
    return this.hhtp.get<number>(this.apiUrl);
  }
}
