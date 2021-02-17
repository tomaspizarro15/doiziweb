import { get } from './cookie'
export const post = (post, url) => {
    let posts = [];
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': get('session'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post: post
        })
    }).then(res => res.json())
        .then(data => {
            posts.push(data.post)
        })
    return posts;
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
