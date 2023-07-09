import { createPost, onCancel, showHome } from "./home.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome)

const cancelButtonElement = document.querySelector('button.cancel')
cancelButtonElement.addEventListener('click', onCancel)

const createPostButtonElement = document.querySelector('button.public')
createPostButtonElement.addEventListener('click', createPost)
