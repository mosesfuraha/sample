export interface RegisterRequestInterface {
  user: {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    confirmPassword: string;
    workExperience?: string;
    contactInformation?: string;
    highSchoolOrUniversity?: string;
    role:string
  };
}
