// src/app/auth/models/auth.models.ts (or src/app/core/models/auth.models.ts)

import { IUserData } from "./iUser";


export interface IAuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserData;
  errormessage?: string;
}

export interface IErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errormessage?: string;
}