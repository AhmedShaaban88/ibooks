import axios from 'axios';
const apiURL = "https://fakerestapi.azurewebsites.net/api/";
const apiBooks = apiURL+"Books";
const apiAuthors = apiURL+"Authors";
const apiHomeBook= apiBooks+"/1";
const apiHomeAuthor= apiAuthors+"/1";
const login = apiURL+"Users";
export async function homeBooks() {
    return await axios.get(apiHomeBook);
}
export async function homeAuthors() {
    return await axios.get(apiHomeAuthor);
}
export async function getAllBooks() {
    return await axios.get(apiBooks);
}
export async function getAllAuthors() {
    return await axios.get(apiAuthors);
}
export async function getBook(id) {
    return await axios.get(apiBooks+`/${id}`);
}
export async function getAuthor(id) {
    return await axios.get(apiAuthors+`/${id}`);
}
export async function LoginRequest(data) {
    return await axios.post(login, data);
}
