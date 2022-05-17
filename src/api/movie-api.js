const API_BASE_URL= process.env.REACT_APP_AZURE_API_BASE_URL

export const signup = (email, password, firstName, lastName) => {
    return fetch(`${API_BASE_URL}/api/accounts`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    }).then(res => res.json())
};

export const login = (email, password) => {
    return fetch(`${API_BASE_URL}/api/accounts/security/token`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json())
};

export const addMovietoFavourites = (userid, movieid) => {
    return fetch(`${API_BASE_URL}/api/accounts/${userid}/favourites`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ movieId: movieid })
    }).then(res => res.json())
};

export const removeFromFavorites = (userid, movieid) => {
    return fetch(`${API_BASE_URL}/api/accounts/deleteFavourite`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ userId: userid,movieId: movieid })
    }).then(res => res.json())
};

export const getFavouriteMovies = (userid) => {
    return fetch(`${API_BASE_URL}/api/accounts/${userid}/favourites`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getAccountByEmail = (email) => {
    return fetch(`${API_BASE_URL}/api/accounts/email/${email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const addFantasyMovie = (userId, name, genreId, runtime, overview, releaseDt, actorIds) => {
    return fetch(`${API_BASE_URL}/api/movies//${userId}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ userId: userId, name: name, genreId: genreId, runtime: runtime, overview: overview, releaseDt: releaseDt,actorIds: actorIds })
    }).then(res => res.json())
};
export const updateFantasyMovie = (userId, name, genreId, runtime, overview, releaseDt, actorIds) => {
    return fetch(`${API_BASE_URL}/api/movies//${userId}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'put',
        body: JSON.stringify({ userId: userId, name: name, genreId: genreId, runtime: runtime, overview: overview, releaseDt: releaseDt,actorIds: actorIds })
    }).then(res => res)
};
export const deleteFantasyMovie = (userId) => {
    return fetch(`${API_BASE_URL}/api/movies//${userId}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'delete'
    }).then(res => res)
};
export const uploadPosterforFantasyMovie = (formdata, userId) => {
    return fetch(`${API_BASE_URL}/api/movies//${userId}/fantasymovie/uploadposter`, {
        headers: {
            // "Content-Type": "multipart/form-data",
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: formdata
    }).then(res => res.json())
};

export const getFantasyMovie = (userid) => {
    return fetch(`${API_BASE_URL}/api/movies/${userid}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `${API_BASE_URL}/api/movies?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};

export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return await fetch(`${API_BASE_URL}/api/movies/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getGenres = async () => {
    return await fetch(`${API_BASE_URL}/api/movies/genres/all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getMovieImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetch(`${API_BASE_URL}/api/movies/${id}/movie_images`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getMovieReviews = async (id) => {
    return await fetch(`${API_BASE_URL}/api/movies/${id}/movie_reviews`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json()).then((json) => {
        // console.log(json.results);
        return json.results;
      });
};
export const getUpcomingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `${API_BASE_URL}/api/movies/upcoming/all?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getLanguages = async () => {
    return await fetch(`${API_BASE_URL}/api/movies/languages/all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const searchMovies = async (args) => {
    const [, pagePart, genrePart, languagePart, castPart, adultPart] = args.queryKey;
    const page = pagePart['page'];
    const genreId = genrePart['genreId']
    const languageId = languagePart['languageId']
    const actorId = castPart['actorId']
    const adult = adultPart['adult']
    const res = await fetch(
        `${API_BASE_URL}/api/movies/search/all?&page=${page}&with_genres=${genreId}&language=${languageId}&with_cast=${actorId}&include_adult=${adult}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getTopRatedMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `${API_BASE_URL}/api/movies/top/rated?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getNowPlayingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `${API_BASE_URL}/api/movies//now/playing?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};