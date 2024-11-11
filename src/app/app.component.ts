import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    MatProgressBarModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;
  progressValue = 70;
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];
  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter((state) =>
      state.name.toLowerCase().includes(filterValue)
    );
  }

  incrementProgress() {
    if (this.progressValue < 100) {
      this.progressValue += 10;
    }
  }

  decrementProgress() {
    if (this.progressValue > 0) {
      this.progressValue -= 10;
    }
  }
}
