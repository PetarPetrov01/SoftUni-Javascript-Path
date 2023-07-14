import { get, post, del } from "./api.js";

export async function getCatalog() {
    return get('/data/recipes?select=' + encodeURIComponent('_id,name,img'))
}

export async function deleteRecipeById(id) {
    del(`/data/recipes/${id}`)
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password })

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);

    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password })

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);

    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
}