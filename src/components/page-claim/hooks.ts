import React from 'react';

import { useHapticFeedback  } from '@vkruglikov/react-telegram-web-app';
import { useUpdateClientMutation } from '../feature/users';
import { UserContext } from '../contexts/user-context';

const LOCAL_STORAGE_KEY = 'balance'

export const usePageClaimApi = () => {
    const [impactOccurred] = useHapticFeedback();

    const { user, isLoading, isSuccess  } = React.useContext(UserContext);

    const [updateClient] = useUpdateClientMutation();

    const clicks = user?.data?.[0]?.attributes?.clicks;
    const currentBalanceLS = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    let currentBalance: string | null | number | undefined;

    if (user?.data?.[0]?.attributes?.need_to_refresh_ls === true) {
        currentBalance = clicks || 0;
        window.localStorage.setItem(LOCAL_STORAGE_KEY, String(currentBalance));
    } else {
        currentBalance = currentBalanceLS || clicks || 0;
    }
    

    const [debouncedValue, setDebouncedValue] = React.useState<string | null | number| undefined>(currentBalance);
    const timerRef = React.useRef<any>();

    React.useEffect(() => {
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
    } ,[isLoading, user, isSuccess]);

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
        if (user?.data[0] && currentBalance) {
            const {id} = user?.data[0];

            const data = {
                clicks: Number(currentBalance),
                id,
                need_to_refresh_ls: false,
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
        isLoading,
        balance: currentBalance,
        user,
        onBalanceChange: handleBalanceChange,
    }
}