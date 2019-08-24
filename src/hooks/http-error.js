import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    })
    const resInterceptor = httpClient.interceptors.response.use(
        response => response,
        err => {
            setError(err)
        })
    
    useEffect(() => {
        // Cleaning up the interceptors
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);  // clear the interceptor
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, httpClient.interceptors.request, httpClient.interceptors.response])

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return [error, errorConfirmedHandler];

}