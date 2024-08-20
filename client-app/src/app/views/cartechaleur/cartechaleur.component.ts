import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hoursformat } from '../../pipe/hoursformat.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SensorService } from '../../services/sensor.service';
import { Router } from '@angular/router';
import { HeatMapDTO } from '../../models/DTOs/HeatMapDTO';

@Component({
  selector: 'app-cartechaleur',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, Hoursformat, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './cartechaleur.component.html',
  styleUrl: './cartechaleur.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CartechaleurComponent {
  selectedDate: Date = new Date();;
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  minutes: number[] = Array.from({length: 4}, (_, i) => i * 15);  // 0, 15, 30, 45
  selectedHour: number = this.selectedDate.getHours();
  selectedMinute: number = Math.floor(this.selectedDate.getMinutes() / 15) * 15;;
  htmlContent!: string;

  constructor(private sensorService: SensorService, private router: Router) { }

  displayCarteChaleur(){ 
    this.sensorService.getCarteChaleur(this.selectedDate.toISOString()).subscribe((data: HeatMapDTO) => { 
      console.log(data.htmlMap);
      let htmlMap = data.htmlMap;
      this.router.navigate(['/html-viewer'], { state: { htmlMap } });
    });
  }

  onDateChange(event: any): void {
    const date = new Date(event.value);
    date.setHours(this.selectedHour);
    date.setMinutes(this.selectedMinute);
    this.selectedDate = date;
  }

  onTimeChange(): void {
    const date = new Date(this.selectedDate);
    date.setHours(this.selectedHour);
    date.setMinutes(this.selectedMinute);
    this.selectedDate = date;
  }

}
