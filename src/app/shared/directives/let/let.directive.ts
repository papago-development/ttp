/* eslint-disable unicorn/prevent-abbreviations */
import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LetContext } from './let-context';

@Directive({
  selector: '[appLet]',
  standalone: true,
})
export class LetDirective<T> {
  @Input()
  appLet!: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateReference: TemplateRef<LetContext<T>>,
  ) {
    viewContainer.createEmbeddedView(
      templateReference,
      new LetContext<T>(this),
    );
  }

  static ngTemplateContextGuard<T>(
    _dir: LetDirective<T>,
    _context: any,
  ): _context is LetDirective<Exclude<T, null | undefined>> {
    return true;
  }
}
