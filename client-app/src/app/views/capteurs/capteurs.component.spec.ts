import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapteursComponent } from './capteurs.component';
import { SensorService } from '../../services/sensor.service';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SensorDTO } from '../../models/DTOs/SensorDTO';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { AddCapteurComponent } from './add-capteur/add-capteur.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

describe('CapteursComponent', () => {
  let component: CapteursComponent;
  let fixture: ComponentFixture<CapteursComponent>;
  let sensorServiceMock: jasmine.SpyObj<SensorService>;

  const mockSensors: SensorDTO[] = [
    { sensorId: 1, sensorLong: '123', sensorLat: '456', sensorName: 'Sensor 1', position: 'Position 1', destination: 'Destination 1', monitorId: '1', typeId: 1, incrementationType: 1, monitor: {
      monitorId: "1",
      longitudeMonitor: "0.000000000000060",
      latitudeMonitor: "00.000000000000060"
  }, type_Sensor: 'Type 1', isActive: true },
    { sensorId: 2, sensorLong: '789', sensorLat: '101', sensorName: 'Sensor 2', position: 'Position 2', destination: 'Destination 2', monitorId: '2', typeId: 2, incrementationType: 2, monitor: {
      monitorId: "1",
      longitudeMonitor: "0.000000000000060",
      latitudeMonitor: "00.000000000000060"
  }, type_Sensor: 'Type 2', isActive: true }
  ];

  const swalResponse: SweetAlertResult<unknown> = {
    isConfirmed: true,
    isDenied: false,
    isDismissed: false,
    value: null
};

  beforeEach(async () => {
    sensorServiceMock = jasmine.createSpyObj('SensorService', ['GetCapteurs', 'deleteCapteur', 'addSensorsCsv']);

    await TestBed.configureTestingModule({
      declarations: [CapteursComponent],
      imports: [CommonModule, NgIconComponent, AddCapteurComponent, ButtonComponent, FormsModule, SpinnerComponent],
      providers: [
        { provide: SensorService, useValue: sensorServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CapteursComponent);
    component = fixture.componentInstance;
    sensorServiceMock.GetCapteurs.and.returnValue(of(mockSensors));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sensors on init', () => {
    expect(component.sensors.length).toBe(2);
    expect(component.sensors).toEqual(mockSensors);
  });

  it('should paginate sensors correctly', () => {
    component.itemsPerPage = 1;
    expect(component.paginatedSensors.length).toBe(1);
    component.changePage(2);
    expect(component.paginatedSensors[0].sensorName).toBe('Sensor 2');
  });

  it('should change page correctly', () => {
    component.changePage(2);
    expect(component.currentPage).toBe(2);
    component.changePage(1);
    expect(component.currentPage).toBe(1);
  });

  it('should delete sensor correctly', () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResponse));
    sensorServiceMock.deleteCapteur.and.returnValue(of(1));
    component.deleteSensor(1);
    expect(sensorServiceMock.deleteCapteur).toHaveBeenCalledWith(1);
  });

  it('should handle delete sensor error', () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResponse));
    sensorServiceMock.deleteCapteur.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');
    component.deleteSensor(1);
    expect(console.error).toHaveBeenCalledWith('There was an error!', jasmine.any(Error));
});

  it('should toggle create modal', () => {
    component.toggleCreateModal();
    expect(component.showModalCreate).toBe(true);
    component.toggleCreateModal();
    expect(component.showModalCreate).toBe(false);
  });

  it('should toggle edit modal', () => {
    component.toggleEditModal();
    expect(component.showModalEdit).toBe(true);
    component.toggleEditModal();
    expect(component.showModalEdit).toBe(false);
  });

  // it('should handle CSV file change', () => {
  //   const event = { target: { files: ['file.csv'] } };
  //   component.onFileChange(event);
  //   expect(component.csvSensors).toEqual(['file.csv']);
  // });

  // it('should submit CSV and load sensors', () => {
  //   component.csvSensors = ['file.csv'];
  //   sensorServiceMock.addSensorsCsv
  // });

});