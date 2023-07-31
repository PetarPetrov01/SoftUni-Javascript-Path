import { page } from './dom.js';

import { createNav } from './navigation.js';
import { logout as apiLogout } from './api/data.js';

import { setupHome } from './views/home.js';
import { setupCatalog } from './views/catalog.js';
import { setupCreate, onCreateSubmit } from './views/create.js';
import { setupLogin, onLoginSubmit } from './views/login.js';
import { setupRegister, onRegisterSubmit } from './views/register.js';
import { setupDetails } from './views/details.js';
import { setupEdit, onEditSubmit, setupDeleted } from './views/edit.js';


window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    const views = {
        homePage: navigation.registerView('home', setupHome),
        catalogPage: navigation.registerView('catalog', setupCatalog, 'catalogLink'),
        detailsPage: navigation.registerView('details', setupDetails),
        loginPage: navigation.registerView('login', setupLogin, 'loginLink'),
        registerPage: navigation.registerView('register', setupRegister, 'registerLink'),
        createPage: navigation.registerView('create', setupCreate, 'createLink'),
        editPage: navigation.registerView('edit', setupEdit),
        deletePage: navigation.registerView('deleted', setupDeleted),
    }

    page('/', views.homePage)
    page('/index.html', views.homePage)
    page('/catalog', views.catalogPage)
    page('/catalog/:page', views.catalogPage)
    debugger
    navigation.registerForm('searchForm', (data) => {
        page.redirect('/catalog?search=' + data.search);
        console.log(data)
        console.log(data.search)
    })
    page('/details/:id', views.detailsPage)

    page('/login', views.loginPage)
    navigation.registerForm('loginForm', onLoginSubmit, () => { page.redirect('/'); navigation.setUserNav() })

    page('/register', views.registerPage)
    navigation.registerForm('registerForm', onRegisterSubmit, () => { page.redirect('/'); navigation.setUserNav() })

    page('/create', views.createPage)
    navigation.registerForm('createForm', onCreateSubmit, (id) => page.redirect('/details/' + id))

    page('/edit', views.editPage)
    navigation.registerForm('editForm', onEditSubmit, (id) => page.redirect('/details/' + id))

    page('/delete', views.deletePage)

    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Start application
    page.start()


    async function logout() {
        try {
            await apiLogout();
            navigation.setUserNav();
            page.redirect('/catalog')
        } catch (err) {
            alert(err.message);
        }
    }
});
