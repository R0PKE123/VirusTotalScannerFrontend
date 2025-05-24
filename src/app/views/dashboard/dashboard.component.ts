import {Component, OnInit} from '@angular/core';
import {ChartData} from 'chart.js';
import {ChartjsComponent} from '@coreui/angular-chartjs';
import {CardBodyComponent, CardComponent, ColComponent, RowComponent} from '@coreui/angular';
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent, CardBodyComponent, ChartjsComponent, NgIf]
})
export class DashboardComponent implements OnInit {
  notScanned?: number;
  Scanned?: number;
  Viruses?: number;
  chartDoughnutData?: ChartData;
  errorMessage: string | null = null;
  options = {
    maintainAspectRatio: false
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.http.get<string[]>('http://localhost:8080/api/allFileStatuses').subscribe({
      next: (data) => {
        console.log(data);
        if (data && data.length === 3) {
          this.notScanned = parseInt(data[0], 10);
          this.Scanned = parseInt(data[1], 10);
          this.Viruses = parseInt(data[2], 10);
          this.chartDoughnutData = {
            labels: ['Not Scanned', 'Scanned', 'Viruses'],
            datasets: [
              {
                backgroundColor: ['#ffea00', '#17ff00', '#ff0000'],
                data: [this.notScanned, this.Scanned, this.Viruses]
              }
            ]
          };
        }
      },
      error: (err) => {
        console.error('Failed to load dashboard:', err);
        this.errorMessage = "An error occurred. Is the application running?";
      }
    });
  }

  stopScanning() {
    console.info('Stoping Scanning');
    this.http.get("http://localhost:8080/api/stop").subscribe({});
    console.info('Stoped scanning');
  }

  clearError() {
    this.errorMessage = null;
  }
}

