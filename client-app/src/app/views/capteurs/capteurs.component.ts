import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { SensorDTO } from '../../models/DTOs/SensorDTO';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { AddCapteurComponent } from './add-capteur/add-capteur.component';
import { ButtonComponent } from '../../shared/button/button.component';
import Swal from 'sweetalert2';  
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";


@Component({
    selector: 'app-capteurs',
    standalone: true,
    templateUrl: './capteurs.component.html',
    styleUrls: ['./capteurs.component.scss'],
    imports: [CommonModule, NgIconComponent, AddCapteurComponent, ButtonComponent, FormsModule, SpinnerComponent]
})
export class CapteursComponent implements OnInit {
  sensors!: SensorDTO[];
  showModalCreate: boolean = false;
  showModalEdit: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  csvSensors!: any[];
  isLoading: boolean = false;

  constructor(private sensorService: SensorService) { }

  toggleCreateModal() {
    this.showModalCreate = !this.showModalCreate;
  }

  toggleEditModal() { 
    this.showModalEdit = !this.showModalEdit;
  }

  ngOnInit(): void {
    this.sensorService.GetCapteurs().subscribe((data: SensorDTO[]) => {
      this.sensors = data;
    });
  }

  get paginatedSensors(): SensorDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sensors.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.sensors.length / this.itemsPerPage);
  }

  deleteSensor(sensorId: number) { 
    Swal.fire({
      title: 'Es-tu sûr de vouloir supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler',
      showLoaderOnConfirm: true,
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        this.sensorService.deleteCapteur(sensorId).subscribe({
          next: (data) => {
            this.sensors = this.sensors.filter((sensor) => sensor.sensorId !== sensorId);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
        return;
      }
    });
  }

  onFileChange(event: any){
    this.csvSensors = event.target.files;
  }

  submitCsv() { 
    if(this.csvSensors) {
      this.sensors = [];
      this.isLoading = true;
      this.sensorService.addSensorsCsv(this.csvSensors).subscribe({
        next: (data: SensorDTO[]) => {
          console.log(data);
          this.sensors = data;
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
