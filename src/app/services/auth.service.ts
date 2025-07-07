import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse, IErrorResponse } from '../interfaces/iAuth';
import { map, catchError } from 'rxjs/operators'; 
import { IUserData } from '../interfaces/iUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'lms_u_token';
  private readonly currentUserKey = "lms_u_user";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasMockToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private readonly baseUrl = environment.API_BASE_URL;

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<IAuthResponse | IErrorResponse> {
    if (!email && !password) {
      return new Observable(observer => {
        observer.error({ status: 400, message: 'Invalid credentials provided' });
      });
    }
    const url = `${this.baseUrl}/auth/login`;
    const credentials = {email, password}
     return this.http.post<IAuthResponse>(url, credentials).pipe(
      map(response => {
        if (response.success && response.statusCode == 200) {
          console.log(response);
          const successResponse: IAuthResponse = {
            success: true,
            statusCode: response.statusCode,
            message: response.message,
            data: response.data
          };
          this.setToken(response.data.token.token);
          this.setCurrentUser(response.data);
          return successResponse;
        } else {
                  console.log("Ress");
          const errorResponse: IErrorResponse = {
            success: false,
            statusCode: response.statusCode,
            message: response.message,
            errormessage: response.errormessage
          };
          return errorResponse;
        }
      }),
      catchError(error => {
        let transformedError: IErrorResponse;

        if (error.success === false && error.statusCode !== undefined) {
            transformedError = error;
        } else if (error.error instanceof ProgressEvent) {
            transformedError = {
                success: false,
                statusCode: 0,
                message: 'Network error occurred. Please check your internet connection.',
                errormessage: 'A network problem prevented the request from completing.'
            };
        }
        else if (error.error && typeof error.error === 'object') {
          transformedError = {
            success: false,
            statusCode: error.status || 500,
            message: error.error.message || 'An API error occurred.',
            errormessage: error.error.errormessage || error.message || 'Server did not provide specific error details.'
          };
        } else {
          transformedError = {
            success: false,
            statusCode: error.status || 500,
            message: 'An unexpected error occurred.',
            errormessage: error.message || 'Unknown error.'
          };
        }
        return throwError(() => transformedError);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    console.log('Mock User logged out. Dummy token removed.');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  setToken(token : string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  setCurrentUser(user : IUserData): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  isAuthenticated(): boolean {
    return this.hasMockToken();
  }

  private hasMockToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
   private hasMockUser(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  getCurrentUserFromToken(): IUserData | null {
    if (this.hasMockUser()) {
      return JSON.parse(localStorage.getItem(this.currentUserKey) ?? "")
    }
    return null;
  }
}