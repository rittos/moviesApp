const API_BASE_URL= process.env.REACT_APP_AZURE_API_BASE_URL

export const getPopularPeoples = async (args) => {
    const [, pagePart] = args.queryKey;
    const { page } = pagePart;
    const res = await fetch(
        `${API_BASE_URL}/api/people?&page=${page}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }
    )
    return res.json();
};
export const getPeopleById = async (id) => {
    return await fetch(`${API_BASE_URL}/api/people/${id}`, {
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
    return await fetch(`${API_BASE_URL}/api/people/${id}/movie_credits`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};
export const getLatestPeoples = async () => {
    return await fetch(`${API_BASE_URL}/api/people/latest/all`, {
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
    return await fetch(`${API_BASE_URL}/api/people/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    }).then(res => res.json())
};