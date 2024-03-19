import React, { useEffect, useState } from 'react';

import { useHapticFeedback  } from '@vkruglikov/react-telegram-web-app';
import { UserContext } from '../contexts/user-context';
import { useGetReferralsQuery } from '../feature/users';
import { skipToken } from '@reduxjs/toolkit/query';

interface Mate {
    username: string | undefined;
    balance: number | undefined;
};


export const usePageMatesApi = () => {
    const [impactOccurred] = useHapticFeedback();

    const { user, isLoading, isSuccess  } = React.useContext(UserContext);

    const userId = user?.data[0]?.id;

    const { data: referrals } = useGetReferralsQuery(userId ? {id: userId} : skipToken);

    const [mates, setMates] = useState<Mate[]>([]);

    useEffect(() => {
        if (referrals) {
            const mates = referrals.data.map((referral) => ({
                username: referral.attributes.username,
                balance: referral.attributes.clicks
            }));
            setMates(mates);
        }
    }, [referrals]);

    return {
        isLoading,
        mates,
        user,
    }
}