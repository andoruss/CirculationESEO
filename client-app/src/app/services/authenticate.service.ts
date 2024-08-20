import { Injectable } from '@angular/core';
import { WebClient } from './web.client';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/DTOs/UserDTO';
import { LoginDTO } from '../models/DTOs/LoginDTO';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthenticateService {
    constructor(private client: WebClient, private router: Router) { }

    private isAuthenticat = false;

    authentication(user: UserDTO): Observable<LoginDTO> {
        return this.client.post<LoginDTO, UserDTO>('User/authentification', user)
    }
}
