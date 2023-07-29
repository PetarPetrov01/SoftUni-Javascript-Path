import { page } from './lib.js';
import { addRender } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';
page(updateSession);
page(addRender);
page('/index.html', '/');
page('/', homePage);
