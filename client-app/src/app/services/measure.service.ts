import { Injectable } from '@angular/core';
import { WebClient } from './web.client';
import { Observable } from 'rxjs/internal/Observable';
import { MeasureDTO } from '../models/DTOs/MeasureDTO';
import { HttpHeadersEnum } from '../enums/http-header.enum';

@Injectable({
  providedIn: 'root',
})
export class MeasureService {
  constructor(private client: WebClient) {}

  GetMeasuresByDate(date: Date): Observable<MeasureDTO[]> {
    const route = `measure?date=${this.toLocalISOString(date)}`;
    return this.client.get<MeasureDTO[]>(
      route,
      false,
      true,
      'Erreur lors de la récupération des mesures',
      'Mesures récupéré avec succès',
      HttpHeadersEnum.JSON
    );
  }

  GetMeasuresByDateRange(startDate: Date, endDate: Date): Observable<MeasureDTO[]> {
    const route = `measure/ByDateRange?startDate=${this.toLocalISOString(startDate)}&endDate=${this.toLocalISOString(endDate)}`;
    return this.client.get<MeasureDTO[]>(route, false, true, 'Erreur lors de la récupération des mesures sur la plage de dates', 'Mesures récupérées avec succès', HttpHeadersEnum.JSON);
  }

  toLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();

    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().slice(0, -1); 
}


  addMeasuresCsv(file: File[]): Observable<boolean> { 
    let formData: FormData = new FormData();
    formData.append('file', file[0]);
    return this.client.post<boolean, FormData>('Measure/ImportCsv', formData, true, true, "", "Mesures importées avec succès !", HttpHeadersEnum.OnlyToken)
  }

  getMeasuresByYearTMJM(id: number, year: number): Observable<MeasureDTO[]> {
    const route = `measure/${id}/year/${year}/tmjm`;
    return this.client.get<MeasureDTO[]>(route, false, true, 'Erreur lors de la récupération des mesures tmjm', 'Mesures récupéré avec succès', HttpHeadersEnum.JSON);
  }
  
  getMeasuresByYearTMJO(id: number, year: number): Observable<MeasureDTO[]> {
    const route = `measure/${id}/year/${year}/tmjo`;
    return this.client.get<MeasureDTO[]>(route, false, true, 'Erreur lors de la récupération des mesures tmjo', 'Mesures récupéré avec succès', HttpHeadersEnum.JSON);
  }
}
