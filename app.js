import Fluxible from 'fluxible';
import ApplicationStore from './stores/ApplicationStore';
import TestStore from './stores/TestStore';

const app = new Fluxible({
    stores: [
      TestStore
    ]
});

module.exports = app;
