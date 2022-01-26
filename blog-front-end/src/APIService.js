import { useCookies } from 'react-cookie';

export default class APIService {

    static GetPosts(token) {
        return fetch('http://127.0.0.1:8000/api/v1/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token${token['mytoken']}`
            }
        })
    }

    static UpdatePost(post_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/v1/${post_id}/`, {
            'method': 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertArticle(body, token) {
        return fetch('http://127.0.0.1:8000/api/v1/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeletePost(post_id, token) {
        return fetch(`http://127.0.0.1:8000/api/v1/${post_id}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
    }

    static LoginUser(body) {
        return fetch('http://localhost:8000/api/v1/dj-rest-auth/login/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch('http://localhost:8000/api/v1/dj-rest-auth/registration', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

}