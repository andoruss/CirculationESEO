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
  templateUrl: './add-capteur.component.html',
  styleUrl: './add-capteur.component.scss'
})
export class AddCapteurComponent implements OnInit {
  @Input() sensors!: SensorDTO[];
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

  addSensorForm = this.fb.group({
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
    if (this.addSensorForm.valid) {
      let sensor: AddSensorDTO = {
        sensorId : this.addSensorForm.value.sensorId as number,
        destination : this.addSensorForm.value.destination as string,
        sensorLat : this.addSensorForm.value.latitude as string,
        sensorLong : this.addSensorForm.value.longitude as string,
        position : this.addSensorForm.value.position as string,
        monitorId : this.addSensorForm.value.monitor as number,
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
