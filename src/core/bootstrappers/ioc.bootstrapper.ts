import { useContainer } from 'routing-controllers';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { InversifyAdapter } from '../ioc-adapters';
import { Container } from 'inversify';
import { configInversify } from '../../config';

let container: Container;

export const bootstrapIoc: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    container = new Container();
    const inversifyAdapter = new InversifyAdapter(container);
    useContainer(inversifyAdapter);

    configInversify(container, settings);
};

export { container }