export const getMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false&page=${page}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
     });
    };
  export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getUpcomingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };

  export const getLanguages = () => {
    return fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=" +
        process.env.REACT_APP_TMDB_KEY
    )
      .then((res) => res.json())
      .then((json) => json);
  };

  export const getPopularPeoples = (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };

  
  export const getPeopleById = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json);
  };

  export const getPeopleDetails = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const searchMovies = (args) => {
    const [, pagePart, genrePart, languagePart, castPart, adultPart] = args.queryKey;
    const page = pagePart['page'];
    const genreId = genrePart['genreId']
    const languageId = languagePart['languageId']
    const actorId = castPart['actorId']
    const adult = adultPart['adult']   

      return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}&with_genres=${genreId}&language=${languageId}&with_cast=${actorId}&include_adult=${adult}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
     });
    };

    export const getTopRatedMovies = (args) => {
      const [, pagePart] = args.queryKey;
      const { page } = pagePart;
      return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
      )
        .then(res => res.json())
    };
    export const getNowPlayingMovies = (args) => {
      const [, pagePart] = args.queryKey;
      const { page } = pagePart;
      return fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
      )
        .then(res => res.json())
    };

    export const getLatestPeoples = () => {
      return fetch(
        `https://api.themoviedb.org/3/person/latest?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
      )
        .then(res => res.json())
    };
  