import { AddSensorDTO } from '../models/DTOs/AddSensorDTO';
import { Injectable } from '@angular/core';
import { WebClient } from './web.client';
import { Observable } from 'rxjs';
import { SensorDTO } from '../models/DTOs/SensorDTO';

import { HttpHeadersEnum } from '../enums/http-header.enum';
import { HeatMapDTO } from '../models/DTOs/HeatMapDTO';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private client: WebClient) {}

  addCapteur(sensor: AddSensorDTO): Observable<SensorDTO> {
    return this.client.post<SensorDTO, AddSensorDTO>('sensor', sensor);
  }

  GetCapteurs(): Observable<SensorDTO[]> {
    const route = 'sensor'; 
    return this.client.get<SensorDTO[]>(route, false, true, 'Erreur lors de la récupération des capteurs', 'Capteurs récupéré avec succès', HttpHeadersEnum.JSON);
  }

  deleteCapteur(id: number): Observable<number> {
    return this.client.delete<number>(`sensor/${id}`);
  }

  addSensorsCsv(file: File[]): Observable<SensorDTO[]> {
    let formData: FormData = new FormData();
    formData.append('file', file[0]);
    return this.client.post<SensorDTO[], FormData>('Sensor/ImportCsv', formData, true, true, "", "Capteurs importés avec succès !", HttpHeadersEnum.OnlyToken)
  }

  updateSensor(sensor: SensorDTO): Observable<SensorDTO> {
    return this.client.put<SensorDTO, SensorDTO>('sensor', sensor);
  }

  getCarteChaleur(date: string): Observable<HeatMapDTO> {
    return this.client.get<HeatMapDTO>(`Sensor/CarteChaleur/` + date);
  }
}
