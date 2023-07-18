import { createIdea } from "../api/data.js";

const section = document.querySelector('#createPage');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx;
export function showCreate(context) {
    ctx = context
    context.showSection(section)
}

