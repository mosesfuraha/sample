import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthStateInterface } from '../../shared/types/authState.interface';
import { authActions } from '../../store/actions';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsSubmitting,
  selectCurrentUser,
} from '../../store/auth.reducer';
import { filter } from 'rxjs/operators';
import { CurrentUserInterface } from '../../shared/types/current.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;
  currentUser$!: Observable<CurrentUserInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthStateInterface>,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.isLoading$ = this.store.pipe(select(selectIsSubmitting));
    this.errorMessage$ = this.store.pipe(select(selectError));

    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.pipe(filter((user) => !!user)).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password, role } = this.form.value;
    this.store.dispatch(authActions.login({ email, password, role }));
  }
}
