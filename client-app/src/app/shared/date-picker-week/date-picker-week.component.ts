import { CommonModule } from '@angular/common'; // Importer CommonModule
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MeasureService } from '../../services/measure.service'; // Import du service MeasureService
import { MeasureDTO } from '../../models/DTOs/MeasureDTO'; // Assurez-vous d'importer le bon chemin pour MeasureDTO

@Injectable()
export class DatePickerWeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-date-picker-week',
  templateUrl: './date-picker-week.component.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DatePickerWeekRangeSelectionStrategy,
    },
    provideNativeDateAdapter(),
  ],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule], // Ajouter CommonModule ici
})
export class DatePickerWeekComponent implements OnInit {
  dateRangeForm: FormGroup;
  measures: MeasureDTO[] = []; // Tableau pour stocker les mesures récupérées

  @Output() messageToParent = new EventEmitter<any[]>();


  constructor(private fb: FormBuilder, private measureService: MeasureService) {
    this.dateRangeForm = this.fb.group({
      start: [],
      end: [],
    });
  }

  ngOnInit(): void {}

  onDateChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement): void {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    
    this.messageToParent.emit([new Date(dateRangeStart.value) , new Date(dateRangeEnd.value)])
  }
}
