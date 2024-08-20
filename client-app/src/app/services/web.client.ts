import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map, concatMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHeadersEnum } from '../enums/http-header.enum';

@Injectable({
    providedIn: 'root',
})
export class WebClient {
    httpOptions: any;
    apiUrl: string;
    endpoint?: string;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
        this.apiUrl = environment.apiUrl;
        this.http = http;
    }

    createHeaders(type: HttpHeadersEnum) {
        switch (type) {
            case HttpHeadersEnum.Default:
                this.httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'text/plain',
                        Authorization: 'Bearer ' + localStorage.getItem('access')
                    }),
                    strictSSL: false 
                };
                break;
            case HttpHeadersEnum.JSON:
                this.httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access')
                    }),
                    strictSSL: false 
                };
                break;
            case HttpHeadersEnum.BLOB:
                this.httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('access')
                    }),
                    observe: 'response' as 'body',
                    responseType: 'blob' as 'json',
                    strictSSL: false 
                };
                break;
            case HttpHeadersEnum.OnlyToken:
                this.httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + localStorage.getItem('access')
                    }),
                    strictSSL: false 
                };
                break;
        }
    }

    get<T>(
        route: string,
        showSuccessToast: boolean = false,
        showErrorToast: boolean = true,
        errorMessage: string = '',
        successMessage: string = '',
        headerType: HttpHeadersEnum = HttpHeadersEnum.JSON
    ): Observable<T> {
        this.createHeaders(headerType);
        return this.http.get<T>(this.apiUrl + route, this.httpOptions).pipe(
            tap({
                complete: () => {
                    if (showSuccessToast) {
                        this.showSuccessToast(successMessage);
                    }
                },
                error: (err) => {
                    if (showErrorToast) {
                        this.showErrorToast(errorMessage ? errorMessage : err.message);
                    }
                },
            }),
            map((response: any) => response as T)
        );
    }

    post<T, B>(
        route: string,
        body: B,
        showSuccessToast: boolean = true,
        showErrorToast: boolean = true,
        errorMessage: string = '',
        successMessage: string = 'Ajouter',
        headerType: HttpHeadersEnum = HttpHeadersEnum.JSON
    ): Observable<T> {
        this.createHeaders(headerType);
        console.log(body);
        return this.http
            .post<T>(this.apiUrl + route, body, this.httpOptions)
            .pipe(
                tap({
                    complete: () => {
                        if (showSuccessToast) {
                            this.showSuccessToast(successMessage);
                        }
                    },
                    error: (err) => {
                        if (showErrorToast) {
                            this.showErrorToast(
                                errorMessage ? errorMessage : err.message
                            );
                        }
                    },
                }),
                map((response: any) => response as T),
                catchError(this.handleError)
            );
    }

    put<T, B>(
        route: string,
        body: B,
        showSuccessToast: boolean = true,
        showErrorToast: boolean = true,
        errorMessage: string = '',
        successMessage: string = 'Modifier',
        headerType: HttpHeadersEnum = HttpHeadersEnum.JSON
    ): Observable<T> {
        this.createHeaders(headerType);
        return this.http
            .put<T>(this.apiUrl + route, body, this.httpOptions)
            .pipe(
                tap({
                    complete: () => {
                        if (showSuccessToast) {
                            this.showSuccessToast(successMessage);
                        }
                    },
                    error: (err) => {
                        if (showErrorToast) {
                            this.showErrorToast(
                                errorMessage ? errorMessage : err.message
                            );
                        }
                    },
                }),
                map((response: any) => response as T),
                catchError(this.handleError)
            );
    }

    delete<T>(
        route: string,
        showSuccessToast: boolean = true,
        showErrorToast: boolean = true,
        errorMessage: string = '',
        successMessage: string = 'Supprimer',
        headerType: HttpHeadersEnum = HttpHeadersEnum.JSON
    ): Observable<T> {
        this.createHeaders(headerType);
        return this.http.delete<T>(this.apiUrl + route, this.httpOptions).pipe(
            tap({
                complete: () => {
                    if (showSuccessToast) {
                        this.showSuccessToast(successMessage);
                    }
                },
                error: (err) => {
                    if (showErrorToast) {
                        this.showErrorToast(errorMessage ? errorMessage : err.message);
                    }
                },
            }),
            map((response: any) => response as T),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('An error occurred:', error.error.message);
        } else {
            // Erreur côté serveur
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
            if (error.status === 0) {
                console.error(
                    'The server seems to be unavailable. Please try again later.'
                );
            } else if (error.status === 400) {
                console.error('Bad request. Please check your request data.');
            } else if (error.status === 500) {
                console.error('Internal server error. Please try again later.');
            }
        }
        // Retourne une erreur observable avec un message générique
        return throwError('Something bad happened; please try again later.');
    }

    showErrorToast(errorMessage: string) {
        if (errorMessage) {
            this.toastr.error(errorMessage, 'Erreur');
        } else {
            this.toastr.error('Erreur inconnue', 'Erreur');
        }
    }

    showSuccessToast(successMessage: string) {
        if (successMessage) {
            this.toastr.success(successMessage, 'Succès');
        } else {
            this.toastr.success('Appel reussi', 'Succès');
        }
    }
}
