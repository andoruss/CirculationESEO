import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { Hoursformat } from './pipe/hoursformat.pipe'; 
import { RouterModule, Routes } from '@angular/router';

import {
  heroUsers,
  heroSquares2x2,
  heroCube,
  heroBuildingOffice,
  heroMagnifyingGlass,
  heroArrowLeftOnRectangle,
  heroBell,
  heroXMark,
  heroSun,
  heroMoon,
  heroUser,
  heroKey,
  heroForward,
  heroBackward,
  heroTrash,
  heroCheckCircle,
  heroHome,
  heroXCircle,
  heroPencilSquare,
  heroEye,
  heroPlus,
  heroCheck,
  heroQuestionMarkCircle,
  heroLockClosed,
  heroClock,
  heroPlusCircle,
} from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIconComponent, RouterLink, ReactiveFormsModule, FormsModule, AgChartsAngular, Hoursformat, ToastrModule,RouterModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons({
      heroUsers,
      heroSquares2x2,
      heroCube,
      heroBuildingOffice,
      heroMagnifyingGlass,
      heroArrowLeftOnRectangle,
      heroBell,
      heroXMark,
      heroSun,
      heroMoon,
      heroUser,
      heroKey,
      heroForward,
      heroBackward,
      heroTrash,
      heroCheckCircle,
      heroHome,
      heroXCircle,
      heroPencilSquare,
      heroPlus,
      heroCheck,
      heroQuestionMarkCircle,
      heroEye,
      heroLockClosed,
      heroClock,
      heroPlusCircle
    }),
  ],
  
})
export class AppComponent {
  title = 'client-app';

}
