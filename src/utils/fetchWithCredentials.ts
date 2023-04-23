export default async function fetchWithCredentials(url: RequestInfo | URL, jwt : string, options?: RequestInit | undefined) {

    let headers = {};
    if(options && options.headers) {
        headers = {...options.headers}
    }

    headers = {
        ...headers,
        'Authorization' : `Bearer ${jwt}`
    }

    const fetchPromise = fetch(url, 
        {
            ...options,
           headers: headers
        })

    return fetchPromise;
}