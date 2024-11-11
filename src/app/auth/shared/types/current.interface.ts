export interface CurrentUserInterface {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  token: string;
  role: 'applicant' | 'university';
}

export interface AuthResponseInterface {
  message: string;
  data: CurrentUserInterface;
  token: string;
}
