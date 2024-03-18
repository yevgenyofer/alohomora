import { EAPITagType } from "../../../enums";
import { REACT_APP_API_ENDPOINT, baseApi } from "../../../services";

type TAttributes = {
    telegram_id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    clicks?: number;
}

export type TUser = {
    attributes: TAttributes,
    id: number,  
}

export type TClientResponse = {
    data: TUser[];  
}

export type TClientArgs = {
    userId: number;
}

export type TCreateClientArgs = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
}

type TCreateClientArgsResponse = {
    id: number;
    attributes: TUser;
}

interface TUpdateClientArgs extends TAttributes {
    id: number;
    
}

const clientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getClient: builder.query<TClientResponse, TClientArgs>({
            query: (queryArg) => ({
                url: `${REACT_APP_API_ENDPOINT}/api/telegram-users?filters[telegram_id][$eq]=${queryArg.userId}`,
                method: 'GET',
            }),
            transformResponse: (response: TClientResponse) => response,
            providesTags: [EAPITagType.USERS]
        }),
        createClient: builder.mutation<TCreateClientArgsResponse, TCreateClientArgs>({
            query: (queryArg) => ({
                url: `${REACT_APP_API_ENDPOINT}/api/telegram-users`,
                method: 'POST',
                body: {
                    data: {
                        id: queryArg.id,
                        first_name: queryArg.first_name,
                        last_name: queryArg.last_name,
                        username: queryArg.username,
                    }
                },
            }),
            transformResponse: (response: TCreateClientArgsResponse) => response,
            invalidatesTags: [EAPITagType.USERS]
        }),
        updateClient: builder.mutation<TUser, TUpdateClientArgs>({
            query: (queryArg) => ({
                url: `${REACT_APP_API_ENDPOINT}/api/telegram-users/${queryArg.id}`,
                method: 'PUT',
                body: {
                    data: {
                        telegram_id: queryArg.telegram_id,
                        first_name: queryArg.first_name,
                        last_name: queryArg.last_name,
                        username: queryArg.username,
                        clicks: queryArg.clicks
                    }
                },
            }),
            transformResponse: (response: TUser) => response,
            invalidatesTags: [EAPITagType.USERS]
        }),
    }),
});

export const {
    useGetClientQuery,
    useCreateClientMutation,
    useUpdateClientMutation
} = clientApi;