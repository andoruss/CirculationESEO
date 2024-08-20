import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { AddCapteurComponent } from '../capteurs/add-capteur/add-capteur.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { MeasureService } from '../../services/measure.service';
import { MeasureDTO } from '../../models/DTOs/MeasureDTO';

@Component({
  selector: 'app-mesures',
  standalone: true,
  templateUrl: './mesures.component.html',
  styleUrl: './mesures.component.scss',
  imports: [CommonModule, NgIconComponent, AddCapteurComponent, ButtonComponent, FormsModule, SpinnerComponent]
})
export class MesuresComponent {
  isLoading: boolean = false;
  csvMeasures!: any[];

  constructor(private measureService: MeasureService) { 
  }
  
  onFileChange(event: any){
    this.csvMeasures = event.target.files;
  }

  submitCsv() { 
    if(this.csvMeasures) {
      this.isLoading = true;
      this.measureService.addMeasuresCsv(this.csvMeasures).subscribe({
        next: (data: boolean) => {
          this.isLoading = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.isLoading = false;
        }
      })
    }
  }
}
