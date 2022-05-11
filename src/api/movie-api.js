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
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ movieId: movieid })
    }).then(res => res.json())
};

export const getFavouriteMovies = (userid) => {
    return fetch(`/api/accounts/${userid}/favourites`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getAccountByEmail = (email) => {
    return fetch(`/api/accounts/email/${email}`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const addFantasyMovie = (userId, name, genreId, runtime, overview, releaseDt, actorIds) => {
    return fetch(`/api/movies//${userId}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ userId: userId, name: name, genreId: genreId, runtime: runtime, overview: overview, releaseDt: releaseDt,actorIds: actorIds })
    }).then(res => res.json())
};


export const getFantasyMovie = (userid) => {
    return fetch(`/api/movies/${userid}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `/api/movies?&page=${page}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};

export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return await fetch(`/api/movies/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getGenres = async () => {
    return await fetch(`/api/movies/genres/all`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getMovieImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetch(`/api/movies/${id}/movie_images`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getMovieReviews = async (id) => {
    return await fetch(`/api/movies/${id}/movie_reviews`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
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
        `/api/movies/upcoming/all?&page=${page}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getLanguages = async () => {
    return await fetch(`/api/movies/languages/all`, {
        headers: {
            'Content-Type': 'application/json',
            'token': window.localStorage.getItem('token')
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
        `/api/movies/search/all?&page=${page}&with_genres=${genreId}&language=${languageId}&with_cast=${actorId}&include_adult=${adult}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getTopRatedMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `/api/movies/top/rated?&page=${page}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getNowPlayingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `/api/movies//now/playing?&page=${page}`, {
            headers: {
                'token': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};