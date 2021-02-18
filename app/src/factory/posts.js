import { get } from './cookie'
export const post = async (url, content) => {
    const newPost = fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': get('session'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content
        })
    }).then(res => res.json())
        .then(data => {
            return data;
        })
    return newPost;
}

export const getAll = async (url) => {
    let dataRecieved;
    return dataRecieved = fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': get('session'),
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
}
