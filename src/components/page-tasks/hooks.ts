import { useEffect, useState, useContext } from 'react';

import { useHapticFeedback, useShowPopup, useWebApp  } from '@vkruglikov/react-telegram-web-app';
import { UserContext } from '../contexts/user-context';

const icon1 = require('./img/icon-1.svg').default as string;
const icon2 = require('./img/icon-2.svg').default as string;
const icon3 = require('./img/icon-3.svg').default as string;
const icon4 = require('./img/icon-4.svg').default as string;

const TASKS = [
    {
      icon: icon1,
      title: 'Join our Telegram community',
      subtitle: '+52 W-Coins',
      link: 'https://google.com',
      is_done: false
    },
    {
      icon: icon2,
      title: 'Join our X community',
      subtitle: '+52 W-Coins',
      link: 'https://google.com',
      is_done: false
    },
    {
      icon: icon3,
      title: 'Join our Discord server',
      subtitle: '+52 W-Coins',
      link: 'https://google.com',
      is_done: false
    },
    {
      icon: icon4,
      title: 'Join presale on our website',
      subtitle: '+52 W-Coins',
      link: 'https://google.com',
      is_done: false
    }
];

export const usePageTasksApi = () => {
    const [impactOccurred] = useHapticFeedback();

    const { user, isLoading, isSuccess } = useContext(UserContext);

    const [tasks, setTasks] = useState(TASKS);

    useEffect(() => {
        tasks[0].is_done = user?.data[0]?.attributes.is_task_1_done || false;
        tasks[1].is_done = user?.data[0]?.attributes.is_task_2_done || false;
        tasks[2].is_done = user?.data[0]?.attributes.is_task_3_done || false;
        tasks[3].is_done = user?.data[0]?.attributes.is_task_4_done || false;
      }, [user, tasks]);

    const showPopup = useShowPopup();

    const webApp = useWebApp();

    const handleTaskClick = (index: number) => {
        impactOccurred('medium');
        const newTasks = [...tasks];
        showPopup({
            title: 'Task',
            message: `You are about to complete the task: ${newTasks[index].title}.`,
            buttons: [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel'),
                },
                {
                    text: 'Complete',
                    onPress: () => webApp.openLink(newTasks[index].link),
                },
            ],
        });
        newTasks[index].is_done = true;
        setTasks(newTasks);
    }

    return {
        isLoading,
        user,
        tasks,
        handleTaskClick
    }
}