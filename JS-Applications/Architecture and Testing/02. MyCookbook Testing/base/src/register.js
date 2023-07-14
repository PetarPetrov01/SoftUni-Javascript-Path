import { post } from './api.js';
import { showCatalog } from './catalog.js';
import { register } from './data.js';
import { addSubmitListener } from './util.js';


let main;
let section;
let setActiveNav;

export function setupRegister(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;
    const form = targetSection.querySelector('form');
    addSubmitListener(form, onSubmit)

    async function onSubmit(data) {
        if (data.password != data.rePass) {
            return alert('Passwords don\'t match');
        }

        const email = data.email
        const password = data.password

        register(email, password)
        showCatalog();
    }
}

export function showRegister() {
    setActiveNav('registerLink');
    main.innerHTML = '';
    main.appendChild(section);
}