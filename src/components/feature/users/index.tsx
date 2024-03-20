import { EAPITagType } from "../../../enums";
import { REACT_APP_API_ENDPOINT, baseApi } from "../../../services";

type TAttributes = {
    telegram_id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    clicks?: number;
    referred_by?: number;
    is_task_1_done?: boolean;
    is_task_2_done?: boolean;
    is_task_3_done?: boolean;
    is_task_4_done?: boolean;
}

export type TUser = {
    attributes: TAttributes,
    id: number,  
}

export type TClientResponse = {
    data: TUser[];  
}

export type TClientArgs = {
    telegram_id?: number;
    id?: number;
}

export type TCreateClientArgs = {
    telegram_id: number,
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
                url: `${REACT_APP_API_ENDPOINT}/api/telegram-users?filters[telegram_id][$eq]=${queryArg.telegram_id}`,
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
                        telegram_id: String(queryArg.telegram_id),
                        first_name: queryArg.first_name,
                        last_name: queryArg.last_name,
                        username: queryArg.username,
                        clicks: 0,
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
                        clicks: queryArg.clicks,
                        referred_by: queryArg.referred_by,
                        is_task_1_done: queryArg.is_task_1_done,
                        is_task_2_done: queryArg.is_task_2_done,
                        is_task_3_done: queryArg.is_task_3_done,
                        is_task_4_done: queryArg.is_task_4_done,
                    }
                },
            }),
            transformResponse: (response: TUser) => response,
            invalidatesTags: [EAPITagType.USERS]
        }),
        getReferrals: builder.query<TClientResponse, TClientArgs>({
            query: (queryArg) => ({
                url: `${REACT_APP_API_ENDPOINT}/api/telegram-users?filters[referred_by][$eq]=${queryArg.id}`,
                method: 'GET',
            }),
            transformResponse: (response: TClientResponse) => response,
            providesTags: [EAPITagType.USERS]
        }),
    }),
});

export const {
    useGetClientQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useGetReferralsQuery,
} = clientApi;