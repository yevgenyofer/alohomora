import React from 'react';

import { useHapticFeedback, useInitData  } from '@vkruglikov/react-telegram-web-app';
import { TCreateClientArgs, useCreateClientMutation, useGetClientQuery, useUpdateClientMutation } from '../feature/users';
import { skipToken } from '@reduxjs/toolkit/query';


const DUMMY_USER: TCreateClientArgs = {
    id: 1234567,
    first_name: "Dummy",
    last_name: "User",
    username: "dummyuser",
};

const LOCAL_STORAGE_KEY = 'w-claim/balance'


export const usePageClaimApi = () => {
    const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();
    const [initDataUnsafe] = useInitData();

    const [debouncedValue, setDebouncedValue] = React.useState<string | null>(null);
    const timerRef = React.useRef<any>();
    const currentBalanceLS = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const [_, setBalance] = React.useState<number>(0)

    const tgUser = initDataUnsafe?.user || DUMMY_USER;

    // TODO: Create error notification
    const  {data, isLoading, isError, isSuccess}  = useGetClientQuery(tgUser.id ? {userId: tgUser.id} : skipToken);
    const user = data?.data;
    const [createClient, createClientState ] = useCreateClientMutation();
    const [updateClient] = useUpdateClientMutation();
    

    /**
     * if current user doesn't exist in db
     * add user in db
     */ 
    React.useEffect(() => {
        if (user?.length === 0 && isSuccess) {
            createClient(DUMMY_USER).unwrap()
            .then(() => {
                console.warn('Client created successfully')
            }).catch((e) => {
                console.warn(e);
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[createClient, user, isSuccess]);
  
    React.useEffect(() => {
        const clicks = user?.[0].attributes?.clicks;

        const currentBalance = currentBalanceLS ?? clicks;
        

        if (currentBalance && Number(currentBalance) > 0) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, currentBalance.toString());
            setBalance(Number(currentBalance));
        }
    } ,[isSuccess, user]);

    // Update balance
    React.useEffect(() => {
        clearTimeout(timerRef.current);

        if (debouncedValue) {
            timerRef.current = setTimeout(() => {
                if(user?.[0]?.attributes && currentBalanceLS) {
                    const {id, attributes} = user[0];

                    const data = {
                        telegram_id: attributes.telegram_id,
                        first_name:  attributes.first_name,
                        last_name: attributes.last_name,
                        username: attributes.username,
                        clicks: Number(currentBalanceLS),
                        id,
                    }

                    updateClient(data).unwrap()
                        .then(() => {
                            console.log(`User updated: ${data}`);
                        }).catch((e) => {
                            console.warn(e)
                        })
                }
            }, 1000);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [debouncedValue]);


    const handleInputChange = () => {
        impactOccurred('heavy');
        const nextBalance = (Number(currentBalanceLS) + 1).toString();
        
        window.localStorage.setItem(LOCAL_STORAGE_KEY, nextBalance);
        setDebouncedValue(nextBalance);
    };

    return {
        isLoading: isLoading || createClientState.isLoading,
        balance: currentBalanceLS,
        user,
        onBalanceChange: handleInputChange,
    }
}