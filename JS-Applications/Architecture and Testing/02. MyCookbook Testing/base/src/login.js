import { showCatalog } from './catalog.js';
import { login } from './data.js';
import { addSubmitListener } from './util.js';

let main;
let section;
let setActiveNav;

export function setupLogin(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;

    const form = targetSection.querySelector('form');
    addSubmitListener(form, onSubmit)

    async function onSubmit(data) {
        const email = data.email
        const password = data.password
        login(email, password)

        showCatalog();
    }
}

export function showLogin() {
    setActiveNav('loginLink');
    main.innerHTML = '';
    main.appendChild(section);
}