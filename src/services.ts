import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EAPITagType } from './enums';

// Assuming you have REACT_APP_API_TOKEN defined somewhere in your environment
export const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;
export const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api',
        credentials: 'include',
        prepareHeaders(headers) {
            // Set the authorization header with the bearer token
            headers.set('Authorization', `Bearer ${REACT_APP_API_TOKEN}`);
            return headers;
        },
    }),
    tagTypes: [EAPITagType.USERS],
    endpoints: () => ({}),
});