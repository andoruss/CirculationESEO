import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddSensorDTO } from '../../../models/DTOs/AddSensorDTO';
import { ButtonComponent } from '../../../shared/button/button.component';
import { SensorService } from '../../../services/sensor.service';
import { SensorDTO } from '../../../models/DTOs/SensorDTO';
import { MonitorService } from '../../../services/monitor.service';
import { MonitorDTO } from '../../../models/DTOs/MonitorDTO';

@Component({
  selector: 'app-add-capteur',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-capteur.component.html',
  styleUrl: './edit-capteur.component.scss'
})
export class EditCapteurComponent implements OnInit {
  @Input() sensors!: SensorDTO[];
  @Input() sensor!: SensorDTO ;
  @Output() closeModal = new EventEmitter();
  errorMessage: string = '';
  isLoading: boolean = false;
  monitors: MonitorDTO[] = [];


  constructor(private fb: FormBuilder, 
    private sensorService: SensorService, 
    private monitorService: MonitorService) {
    
  }
  ngOnInit(): void {
    this.monitorService.getAll().subscribe((monitors: MonitorDTO[]) => {
      this.monitors = monitors;
    });
  }

  editSensorForm = this.fb.group({
    sensorId: [0, Validators.required],
    longitude: ['0.000000000000000', [Validators.required, Validators.minLength(17)]],
    latitude: ['00.000000000000000', [Validators.required, Validators.minLength(18)]],
    destination: ['', Validators.required],
    position: ['', Validators.required],
    monitor: [1, Validators.required]
  });

  toggleModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.editSensorForm.valid) {
      let sensor: AddSensorDTO = {
        sensorId : this.editSensorForm.value.sensorId as number,
        destination : this.editSensorForm.value.destination as string,
        sensorLat : this.editSensorForm.value.latitude as string,
        sensorLong : this.editSensorForm.value.longitude as string,
        position : this.editSensorForm.value.position as string,
        monitorId : this.editSensorForm.value.monitor as number,
      };

      this.sensorService.addCapteur(sensor).subscribe((sensor: SensorDTO) => { 
        this.sensors.push(sensor);
        this.toggleModal();
      });
    } else {
      this.errorMessage = 'Veuillez saisir des valeurs valides';
    }
  }
}
