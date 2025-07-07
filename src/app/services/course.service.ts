// src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Course, CourseDetail, ICourseDetailResponse, ICourseResponse } from '../interfaces/iCourse';
import { mockCourses } from './courses_list';
import { IErrorResponse } from '../interfaces/iAuth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators'; 
import { AuthService } from './auth.service';


export interface DisplayCourse {
  totalPages: number;
  currentPage: number;
  items: Course[],
  offset: number,
  len: number,
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private readonly baseUrl = environment.API_BASE_URL;
  
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getAssignedCourses(take = 3): Observable<Course[]> {

    return of(mockCourses.filter((c) => c.assigned === true).slice(0, take));
  }
 
  getCourses(page: number, limit = 9): Observable<ICourseResponse | IErrorResponse> {
     let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `${this.baseUrl}/courses?pageNumber=${page}&pageSize=${limit}`;
       return this.http.get<ICourseResponse>(url, {
        headers : headers 
       }).pipe(
        map(response => {
          if (response.success && response.statusCode == 200) {
            const successResponse: ICourseResponse = {
              success: true,
              statusCode: response.statusCode,
              message: response.message,
              data: response.data,
              totalCount : response.totalCount,
              pageSize : response.pageSize,
              currentPage : response.currentPage,
            };
            return successResponse;
          } else {
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
        transformedError = {
              success: false,
              statusCode: 0,
              message: 'Network error occurred. Please check your internet connection.',
              errormessage: 'A network problem prevented the request from completing.'
          };
          if (error.status === 401 ) {
              transformedError = {
              success: false,
              statusCode: 0,
              message: 'Unathenticated',
              errormessage: 'Unathenticated'
          }
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

  getCourse(id: number): Observable<ICourseDetailResponse | IErrorResponse> {
    let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `${this.baseUrl}/courses/${id}`;
       return this.http.get<ICourseDetailResponse>(url, {
        headers : headers 
       }).pipe(
        map(response => {
          if (response.success && response.statusCode == 200) {
            const successResponse: ICourseDetailResponse = {
              success: true,
              statusCode: response.statusCode,
              message: response.message,
              data: response.data
            };
            return successResponse;
          } else {
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
        transformedError = {
              success: false,
              statusCode: 0,
              message: 'Network error occurred. Please check your internet connection.',
              errormessage: 'A network problem prevented the request from completing.'
          };
          if (error.status === 401 ) {
              transformedError = {
              success: false,
              statusCode: 0,
              message: 'Unathenticated',
              errormessage: 'Unathenticated'
          }
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

  getRecommendedCourses(): Observable<ICourseResponse | IErrorResponse> {
      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `${this.baseUrl}/courses`;
       return this.http.get<ICourseResponse>(url, {
        headers : headers 
       }).pipe(
        map(response => {
          if (response.success && response.statusCode == 200) {
            const successResponse: ICourseResponse = {
              success: true,
              statusCode: response.statusCode,
              message: response.message,
              data: response.data
            };
            return successResponse;
          } else {
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
        transformedError = {
              success: false,
              statusCode: 0,
              message: 'Network error occurred. Please check your internet connection.',
              errormessage: 'A network problem prevented the request from completing.'
          };
          if (error.status === 401 ) {
              transformedError = {
              success: false,
              statusCode: 0,
              message: 'Unathenticated',
              errormessage: 'Unathenticated'
          }
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

    getMyLearning(): Observable<ICourseResponse | IErrorResponse> {
      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `${this.baseUrl}/courses/my-learning`;
       return this.http.get<ICourseResponse>(url, {
        headers : headers 
       }).pipe(
        map(response => {
          if (response.success && response.statusCode == 200) {
            const successResponse: ICourseResponse = {
              success: true,
              statusCode: response.statusCode,
              message: response.message,
              data: response.data
            };
            return successResponse;
          } else {
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
        transformedError = {
              success: false,
              statusCode: 0,
              message: 'Network error occurred. Please check your internet connection.',
              errormessage: 'A network problem prevented the request from completing.'
          };
          if (error.status === 401 ) {
              transformedError = {
              success: false,
              statusCode: 0,
              message: 'Unathenticated',
              errormessage: 'Unathenticated'
          }
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

    purchaseCourse(id: any): Observable<ICourseDetailResponse | IErrorResponse> {
    let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `${this.baseUrl}/courses/purchase`;
       return this.http.post<ICourseDetailResponse>(url, {
        courseId : id
       }, {
        headers : headers 
       }).pipe(
        map(response => {
          if (response.success && response.statusCode == 200) {
            const successResponse: ICourseDetailResponse = {
              success: true,
              statusCode: response.statusCode,
              message: response.message,
              data: response.data
            };
            return successResponse;
          } else {
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
        transformedError = {
              success: false,
              statusCode: 0,
              message: 'Network error occurred. Please check your internet connection.',
              errormessage: 'A network problem prevented the request from completing.'
          };
          if (error.status === 401 ) {
              transformedError = {
              success: false,
              statusCode: 0,
              message: 'Unathenticated',
              errormessage: 'Unathenticated'
          }
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
}