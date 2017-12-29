const BASE_URL='http://localhost:3001'
const HEADERS= {
    'Authorization': '123',
    'Content-Type': 'application/json'
}

export function getCategories () {
    return fetch(`${BASE_URL}/categories`, { headers: HEADERS })
        .then((res) => res.json())
        .then(data => data.categories)
}

export function getPosts () {
    return fetch(`${BASE_URL}/posts`, { method: "GET", headers: HEADERS })
        .then((res) => res.json())
}

export function addPost (data) {
    return fetch(`${BASE_URL}/posts`, { method: "POST", body: JSON.stringify(data), headers: HEADERS })
        .then((res) => res.json())
}

export function editPost (id, data) {
    return fetch(`${BASE_URL}/posts/${id}`, { method: "PUT", body: JSON.stringify(data), headers: HEADERS })
        .then((res) => res.json())
}

export function deleteObject (id, type) {
    return fetch(`${BASE_URL}/${type}/${id}`, { method: "DELETE", headers: HEADERS })
        .then((res) => res.json())
}

export function getComments (id) {
    return fetch(`${BASE_URL}/posts/${id}/comments`, { method: "GET", headers: HEADERS })
        .then((res) => res.json())
}

export function addComment (data) {
    return fetch(`${BASE_URL}/comments`, { method: "POST", body: JSON.stringify(data), headers: HEADERS })
        .then((res) => res.json())
}

export function editComment (id, data) {
    return fetch(`${BASE_URL}/comments/${id}`, { method: "PUT", body: JSON.stringify(data), headers: HEADERS })
        .then((res) => res.json())
}

export function votePost (id, option, type) {
    return fetch(`${BASE_URL}/${type}/${id}`, { method: "POST", body: JSON.stringify({ option: option }), headers: HEADERS })
        .then((res) => res.json())
}

