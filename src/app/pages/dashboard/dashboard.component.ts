import { Component, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CurrentUserService } from '../../auth/current-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIcon, MatRipple, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  user = this.currentUserService.currentUser;
  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit() {
    console.log('Current user:', this.currentUserService.currentUser);
  }

  chart: any;

  chartOptions = {
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: 's',
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,###szt',
        dataPoints: [
          { label: 'Schabowy', y: 5 },
          { label: 'Pierogi', y: 10 },
          { label: 'Zupa', y: 15 },
          { label: 'Kompot', y: 22 },
          { label: 'Kotlet', y: 33 },
        ],
      },
    ],
  };
}
