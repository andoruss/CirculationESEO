import { MonitorDTO } from "./MonitorDTO";

export interface SensorDTO {
    sensorId: number;
    sensorLong: string | null;
    sensorLat: string | null;
    sensorName: string | null;
    position: string | null;
    destination: string | null;
    monitorId: string | null;
    typeId: number | null;
    incrementationType: number;
    monitor: MonitorDTO;
    type_Sensor: string | null;
    isActive: boolean;
}