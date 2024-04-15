import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 totalTransactions: number = 0;
  chart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getTotalTransactions().subscribe(
      (data: number) => {
        this.totalTransactions = data;
        this.createChart();
      },
      (error: any) => {
        console.error('Error fetching total transactions:', error);
      }
    );
  }

createChart(): void {
  this.chart = new Chart({
  chart: {
    type: 'line'
  },
  title: {
    text: 'Total transactions'
  },
  credits: {
    enabled: false
  },
  series: [
    {
      type:'line',
      name: 'Total transactions',
      data: [this.totalTransactions]
    }
  ]
});
  }


}
