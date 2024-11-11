import { CurrentUserInterface } from './current.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  role: 'applicant' | 'university' | null;
  error: string | null;
}
