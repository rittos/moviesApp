export const signup = (email, password, firstName, lastName) => {
    return fetch('/api/accounts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    }).then(res => res.json())
};

export const login = (email, password) => {
    return fetch('/api/accounts/security/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json())
};

export const addMovietoFavourites = (userid, movieid) => {
    return fetch(`/api/accounts/${userid}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ movieId: movieid })
    }).then(res => res.json())
};

export const getFavouriteMovies = (userid) => {
    return fetch(`/api/accounts/${userid}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
    }).then(res => res.json())
};

export const getAccountByEmail = (email) => {
    return fetch(`/api/accounts/email/${email}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json())
};
