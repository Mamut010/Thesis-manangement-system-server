import { Bootstrapper } from '../../lib/bootstrapper';
import { serverBootstrapperFactory } from './server-bootstrapper-factory';

export const bootstrapApiServer: Bootstrapper = serverBootstrapperFactory('api');