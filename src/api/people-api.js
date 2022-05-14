export const getPopularPeoples = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `/api/people?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getPeopleById = async (id) => {
    return await fetch(`/api/people/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getMovieCredits = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return await fetch(`/api/people/${id}/movie_credits`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getLatestPeoples = async () => {
    return await fetch(`/api/people/latest/all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};

export const getPeopleDetails = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return await fetch(`/api/people/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};