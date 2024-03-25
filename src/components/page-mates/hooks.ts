import React, { useEffect, useState } from 'react';

import { useHapticFeedback  } from '@vkruglikov/react-telegram-web-app';
import { UserContext } from '../contexts/user-context';
import { TClaim, useGetReferralsQuery, useUpdateClientMutation } from '../feature/users';
import { skipToken } from '@reduxjs/toolkit/query';

interface Mate {
    id: number;
    username: string | undefined;
    clicks: number;
    alreadyClaimed: number;
    availableReward: number;
    claims: TClaim[] | null;
};

const referralLevels = [
    { title: '1st Level', minMates: 1, maxMates: 20, oneTimeReward: 50, rewardPercentage: 1 },
    { title: '2nd Level', minMates: 21, maxMates: 50, oneTimeReward: 60, rewardPercentage: 3 },
    { title: '3rd Level', minMates: 51, maxMates: 150, oneTimeReward: 70, rewardPercentage: 5 },
    { title: '4th Level', minMates: 151, maxMates: 500, oneTimeReward: 80, rewardPercentage: 10 },
    { title: '5th Level', minMates: 501, maxMates: 1500, oneTimeReward: 90, rewardPercentage: 15 },
    { title: '6th (max) Level', minMates: 1501, maxMates: Infinity, oneTimeReward: 100, rewardPercentage: 25 },
];

function getRewardLevel(matesCount: number) {
    for (let level of referralLevels) {
      if (matesCount >= level.minMates && matesCount <= level.maxMates) {
        return level;
      }
    }
    return referralLevels[0];
}

export const usePageMatesApi = () => {
    const [impactOccurred] = useHapticFeedback();

    const { user, isLoading, isSuccess  } = React.useContext(UserContext);

    const userId = user?.data[0]?.id;

    const { data: referrals } = useGetReferralsQuery(userId ? {id: userId} : skipToken);
    const [updateClient] = useUpdateClientMutation();

    const [mates, setMates] = useState<Mate[]>([]);
    const [rewardLevel, setRewardLevel] = useState<any>(referralLevels[0]);

    const calculateAlreadyClaimed = (claims: TClaim[] | undefined) => {
        if (!claims) return 0;
        return claims.reduce((acc: number, claim: any) => acc + claim.clicks, 0);
    }

    const calculateAvailableReward = (referral: any, rewardPercentage: number) => {
        if (!referral.attributes.claims) return referral.attributes.clicks;
        const alreadyClaimed = calculateAlreadyClaimed(referral.attributes.claims);
        const availableReward = Math.floor((referral.attributes.clicks - alreadyClaimed) * rewardPercentage / 100);
        return availableReward;
    }

    useEffect(() => {
        const rewardLevel = getRewardLevel(mates.length);
        setRewardLevel(rewardLevel);

        if (referrals) {
            const mates = referrals.data.map((referral) => ({
                id: referral.id,
                username: referral.attributes.username,
                clicks: referral.attributes.clicks || 0,
                alreadyClaimed: calculateAlreadyClaimed(referral.attributes.claims) || 0,
                availableReward: calculateAvailableReward(referral, rewardLevel.rewardPercentage) || 0,
                claims: referral.attributes.claims || null,
            }));
            setMates(mates);
        }
    }, [referrals]);

    const handleClaim = (mate: Mate, percentage: number) => {
        console.log(mate, percentage)

        const claimClicks = mate.clicks - mate.alreadyClaimed;

        const newClaim = {
            clicks: Number(claimClicks),
            percentage: Number(percentage),
        }

        const newClaims = mate.claims ? [...mate.claims, newClaim] : [newClaim];

        const userClicks = user?.data[0].attributes.clicks ?? 0;
        const newClicks = Number(userClicks) + mate.availableReward;

        if (user) {
            updateClient({id: mate.id, claims: newClaims}).unwrap()
                .then(() => {
                    updateClient({id: user?.data[0].id, clicks: newClicks}).unwrap()
                        .then((data) => {
                            console.log(data);
                            window.location.reload();
                        }).catch((e) => {
                            console.warn(e)
                        })
            }).catch((e) => {
                console.warn(e)
            })
        }
    };

    return {
        isLoading,
        mates,
        rewardLevel,
        handleClaim,
        user,
    }
}