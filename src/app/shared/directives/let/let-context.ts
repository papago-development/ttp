import { LetDirective } from './let.directive';

export interface ContextWithImplicit<T> {
  $implicit: T;
}

export class LetContext<T> implements ContextWithImplicit<T> {
  constructor(private readonly internalDirectiveInstance: LetDirective<T>) {}

  get $implicit(): T {
    return this.internalDirectiveInstance.appLet;
  }

  get appLet(): T {
    return this.internalDirectiveInstance.appLet;
  }
}
