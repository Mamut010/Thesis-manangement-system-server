import { useContainer } from 'routing-controllers';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { InversifyAdapter } from '../ioc-adapters';
import { Container } from 'inversify';
import { configInversify } from '../../config';
import { BOOTSTRAP_SETTINGS_KEY } from '../constants/bootstrap-settings';

let container: Container;

export const bootstrapIoc: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    container = new Container();
    const inversifyAdapter = new InversifyAdapter(container);
    useContainer(inversifyAdapter);

    configInversify(container, settings);

    // Set container data for other bootstrappers
    settings?.setData(BOOTSTRAP_SETTINGS_KEY.Container, container);
    settings?.setData(BOOTSTRAP_SETTINGS_KEY.IocAdapter, inversifyAdapter);
};

export { container }