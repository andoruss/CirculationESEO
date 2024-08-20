import { Injectable } from '@angular/core';
import { WebClient } from './web.client';
import { Observable } from 'rxjs';
import { MonitorDTO } from '../models/DTOs/MonitorDTO';

@Injectable({
    providedIn: 'root',
})
export class MonitorService {
    constructor(private client: WebClient) { }

    getAll(): Observable<MonitorDTO[]> {
        return this.client.get<MonitorDTO[]>('Monitor');
    }
}
