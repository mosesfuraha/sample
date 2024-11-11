import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { RegisterRequestInterface } from '../../models/user.register';
import { AuthStateInterface } from '../../shared/types/authState.interface';
import { selectIsSubmitting } from '../../store/auth.reducer';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isSubmitting$;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {
    this.isSubmitting$ = this.store.select(selectIsSubmitting);
  }
  form!: FormGroup;
  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workExperience: [''],
      contactInformation: [''],
      highSchoolOrUniversity: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    console.log('form', this.form.getRawValue());

    this.store.dispatch(authActions.register({ request }));

    this.authService.register(request).subscribe(
      (res) => console.log('res', res),
      (error) => console.error('Registration failed', error)
    );
  }
}
