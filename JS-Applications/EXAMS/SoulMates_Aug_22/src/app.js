import { page } from './lib.js';
import { addRender, addSearch } from './middlewares/middlwares.js';
import { updateSession } from './middlewares/session.js';
page(updateSession);
page(addRender);
page(addSearch);
page.start();
