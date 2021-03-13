// Core
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// Environments
import { environment } from '../../environments/environment';
// RxJS
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// Interfaces
import { ApiResponse } from './interfaces/api-response.interface';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = error.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            errorMessage = 'Uh oh, something has gone wrong... :(';
        }
        // Return an observable with a user-facing error message.
        return throwError(errorMessage);
    }

    getRandomUsers(
        results: number = 51,
        page: number = 1,
        seed: string | null = null,
    ): Observable<ApiResponse> {
        const includeParams: string = 'name,email,phone,location,picture';
        const apiUrl: string = `${environment.apiUrl}?inc=${includeParams}&seed=${seed}&page=${page}&results=${results}`;

        return this.http.get<ApiResponse>(apiUrl).pipe(
            map((response: ApiResponse) => response),
            retry(1),
            catchError(this.handleError),
        );
    }
}
