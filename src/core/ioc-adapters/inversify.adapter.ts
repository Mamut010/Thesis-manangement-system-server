import { IocAdapter, ClassConstructor, Action } from 'routing-controllers';
import { Container } from 'inversify';

export class InversifyAdapter implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    return this.container.resolve<T>(someClass);
  }
}