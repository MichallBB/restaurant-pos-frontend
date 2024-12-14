import { Component, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CurrentUserService } from '../../auth/current-user.service';
import { OrdersService } from '../../services/orders/orders.service';
import { RestaurantMenuComponent } from '../restaurant-menu/restaurant-menu.component';
import { RestaurantTableService } from '../../services/restaurant-table/restaurant-table.service';
import { OrdersHistoryService } from '../../services/orders-history/orders-history.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryDish } from '../../models/history-dish.model';
import { DishService } from '../../services/dish-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    MatRipple,
    CanvasJSAngularChartsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user = this.currentUserService.currentUser;
  activeOrders: number = 0;
  tablesQuantity: number = 0;
  ordersTodayQuantity: number = 0;
  chartLoaded = false;
  dishesToOrder: number = 0;

  chart: any;

  chartOptions = {
    animationEnabled: true,
    axisX: {
      labelPlacement: 'inside',
    },
    axisY: {
      includeZero: true,
      suffix: ' szt',
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        yValueFormatString: '#,###szt',
        dataPoints: [
          { label: 'Pizza', y: 10 },
          { label: 'Pasta', y: 15 },
        ],
      },
    ],
  };

  constructor(
    private currentUserService: CurrentUserService,
    private orderService: OrdersService,
    private tablesService: RestaurantTableService,
    private ordersHistoryService: OrdersHistoryService,
    private dishService: DishService,
  ) {}

  ngOnInit() {
    this.getActiveOrders();
    this.getTablesQuantity();
    this.getOrdersTodayQuantity();
    this.getDishesFromLastWeek();
    this.getAllDishes();
  }

  getActiveOrders() {
    this.orderService.getAllActiveOrders().subscribe((orders) => {
      this.activeOrders = orders.length;
    });
  }

  getTablesQuantity() {
    this.tablesService.getAllTables().subscribe((tables) => {
      this.tablesQuantity = tables.length;
    });
  }

  getOrdersTodayQuantity() {
    this.ordersHistoryService.getTodayOrders().subscribe((orders) => {
      this.ordersTodayQuantity = orders.length;
    });
  }

  getDishesFromLastWeek() {
    this.ordersHistoryService.getDishesFromLastWeek().subscribe((dishes) => {
      dishes = dishes.sort((a: any, b: any) => a.quantity - b.quantity);
      this.chartOptions.data[0].dataPoints = dishes.map((dish: HistoryDish) => {
        return { label: dish.dishName, y: dish.quantity };
      });
      this.chartLoaded = true;
      if (dishes.length === 0) {
        this.chartOptions.data[0].dataPoints = [
          { label: 'Brak danych', y: 0 }
        ]
      }
    });
  }

  getAllDishes() {
    this.dishService.getAllDishes().subscribe((dishes) => {
      this.dishesToOrder = dishes.filter((dish) => dish.enabled === true).length;
    });
  }

}
