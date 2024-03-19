import React from 'react';

import { useHapticFeedback, useInitData  } from '@vkruglikov/react-telegram-web-app';
import { TCreateClientArgs, useCreateClientMutation, useGetClientQuery, useUpdateClientMutation } from '../feature/users';
import { skipToken } from '@reduxjs/toolkit/query';


const DUMMY_USER: TCreateClientArgs = {
    telegram_id: 1234567,
    first_name: "Dummy",
    last_name: "User",
    username: "dummyuser",
};

const LOCAL_STORAGE_KEY = 'balance'


export const usePageClaimApi = () => {
    const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();
    const [initDataUnsafe] = useInitData();

    const tgUserId = initDataUnsafe?.user?.id || DUMMY_USER.telegram_id;

    // TODO: Create error notification
    const  {data, isLoading, isError, isSuccess}  = useGetClientQuery(tgUserId ? {telegram_id: tgUserId} : skipToken);
    const user = data?.data;
    const [createClient, createClientState ] = useCreateClientMutation();
    const [updateClient] = useUpdateClientMutation();

    const clicks = user?.[0]?.attributes?.clicks;
    const currentBalanceLS = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const currentBalance = currentBalanceLS || clicks || 0;

    const [debouncedValue, setDebouncedValue] = React.useState<string | null | number| undefined>(currentBalance);
    const timerRef = React.useRef<any>();

    /**
     * if the current user does not exist in the database
     * add user to database
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


        /**
         *  If previous balance didn't add to db (issue with internet connection or page reload)
         *  update user balance with value from local storage
         */ 
        if (clicks && currentBalanceLS) {
            if (Number(currentBalanceLS) > Number(clicks)) {
                handleUpdateClient();
            }

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[createClient, user, isSuccess]);

    // Update balance with debounce
    React.useEffect(() => {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            handleUpdateClient();
        }, 3000);

        return () => {
            clearTimeout(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    function handleUpdateClient () {
        if(user?.[0] && currentBalance) {
            const {id, attributes} = user?.[0];

            const data = {
                telegram_id: attributes.telegram_id,
                first_name:  attributes.first_name,
                last_name: attributes.last_name,
                username: attributes.username,
                clicks: Number(currentBalance),
                id,
            }

            updateClient(data).unwrap()
                .then(() => {
                    console.log(`User updated: ${data}`);
                }).catch((e) => {
                    console.warn(e)
                })
        }
    }

    const handleBalanceChange = () => {
        impactOccurred('heavy');
        const nextBalance = (Number(currentBalance) + 1).toString();

        window.localStorage.setItem(LOCAL_STORAGE_KEY, nextBalance);
        setDebouncedValue(nextBalance);
    };

    return {
        isLoading: isLoading || createClientState.isLoading,
        balance: currentBalance,
        user,
        onBalanceChange: handleBalanceChange,
    }
}