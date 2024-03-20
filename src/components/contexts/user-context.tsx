import React from 'react';

import { useInitData  } from '@vkruglikov/react-telegram-web-app';
import { skipToken } from '@reduxjs/toolkit/query';

import { TClientResponse, TCreateClientArgs, useCreateClientMutation, useGetClientQuery } from '../feature/users';


export type TUserContext = {
    user: undefined | TClientResponse; 
    isLoading: boolean;
    isError: boolean;
    isSuccess : boolean;
}

export const UserContext = React.createContext<TUserContext>({
    user: undefined,
    isLoading: false,
    isError: false,
    isSuccess: false,
});


const DUMMY_USER: TCreateClientArgs = {
    telegram_id: 1234567,
    first_name: "Dummy",
    last_name: "User",
    username: "dummyuser",
};


export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    
    const [initDataUnsafe] = useInitData();

    const tgUserId = initDataUnsafe?.user?.id || DUMMY_USER.telegram_id;

    // TODO: Create error notification
    const  {data, isLoading, isError, isSuccess}  = useGetClientQuery(tgUserId ? {telegram_id: tgUserId} : skipToken);
    const user = data?.data;
    const [createClient, createClientState ] = useCreateClientMutation();

     /**
     * if the current user does not exist in the database
     * add user to database
     */ 
    React.useEffect(() => {
        if (user?.length === 0 && isSuccess) {
            const userData = {} as TCreateClientArgs;
            if (initDataUnsafe?.user) {
                userData.telegram_id = initDataUnsafe.user.id;
                userData.first_name = initDataUnsafe.user.first_name || '';
                userData.last_name = initDataUnsafe.user.last_name || '';
                userData.username = initDataUnsafe.user.username || '';
            } else {
                userData.telegram_id = DUMMY_USER.telegram_id;
                userData.first_name = DUMMY_USER.first_name;
                userData.last_name = DUMMY_USER.last_name;
                userData.username = DUMMY_USER.username;
            }
            createClient(
                {
                    telegram_id: userData.telegram_id,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    username: userData.username,
                }
            ).unwrap()
            .then(() => {
                console.warn('Client created successfully')
            }).catch((e) => {
                console.warn(e);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[createClient, user, isSuccess]);



    const ctx: TUserContext = React.useMemo(
        () => ({ user: data, isLoading: isLoading || createClientState.isLoading, isError, isSuccess }),
        [createClientState.isLoading, data, isError, isLoading, isSuccess],
    );

    return (
        <UserContext.Provider value={ctx}>
            {children}
        </UserContext.Provider>
    );
};
