export interface IUserData {
  id: number;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  userName: string;
  avatarUrl: string;
  status: string;
  deactivateReason: string;
  deleteReason: string;
  deletedOn: string;
  createdAt: string;
  token: IToken;
}


export interface IToken {
  token: string;
  expireFrom: string; // Or Date if you plan to convert it immediately
  expireTo: string;   // Or Date if you plan to convert it immediately
  expireTimeTo: string; // This looks like a string representation of time
}