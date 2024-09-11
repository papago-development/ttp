import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from './directives';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  NgIf,
  AsyncPipe,
  LetDirective,
];

@NgModule({
  imports: [...MODULES],
  declarations: [],
  exports: [...MODULES],
})
export class SharedModule {}
