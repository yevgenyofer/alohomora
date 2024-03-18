import { WebAppUser } from '@vkruglikov/react-telegram-web-app';
import { useState, useEffect } from 'react';

const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;
const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

interface ITgUser {
    telegram_id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    clicks?: number;
}

interface IApiUser {
    id: number;
    attributes: ITgUser;
}

const useFetchOrCreateUser = (tgUser: WebAppUser | undefined) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const userId = tgUser?.id;

  useEffect(() => {
    setLoading(true);
    fetch(`${REACT_APP_API_ENDPOINT}/api/telegram-users?filters[telegram_id][$eq]=${userId}`, {
      headers: {
        'Authorization': `Bearer ${REACT_APP_API_TOKEN}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.length === 0) {
            console.log('User not found')
            // If the user is not found, create a new user
            return fetch(`${REACT_APP_API_ENDPOINT}/api/telegram-users`, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        telegram_id: String(userId),
                        first_name: tgUser?.first_name,
                        last_name: tgUser?.last_name,
                        username: tgUser?.username,
                        clicks: 0
                    }
                })
            }).then(response => response.json());
        }
        return data as IApiUser[];
      })
      .then(data => {
        setData(data.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        window.location.reload();
        setLoading(false);
      });
  }, [userId]);

    return { loading, data: data as unknown as IApiUser };
};

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
  
    const updateUser = (id: number, userData: ITgUser) => {
      setLoading(true);
      fetch(`${REACT_APP_API_ENDPOINT}/api/telegram-users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: userData })
      })
        .then(response => response.json())
        .then(data => {
          console.log('User updated:', data);
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    };
  
    return { loading, updatedUser: data, updateUser };
};

export { useFetchOrCreateUser, useUpdateUser };
