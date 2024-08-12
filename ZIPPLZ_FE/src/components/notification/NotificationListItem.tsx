import { useEffect, useState } from 'react';

import axios from 'axios';

interface UserSerial {
  userSerial: number;
  fileSerial: number;
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  tel: string;
  delYN: number;
  role: string;
}

interface NotificationData {
  notificationSerial: number;
  userSerial: UserSerial;
  notificationComment: string;
  notificationDate: string;
  isChecked: number;
}

interface ApiResponse {
  conn: {
    networkConnected: boolean;
  };
  proc: {
    code: number;
    message: string;
  };
  data: NotificationData[];
}

export default function NotificationListItem() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post<ApiResponse>(
          'http://localhost:5000/notification/list',
          {
            user_serial: 1,
            notification_comment: '사탕 받아가세요',
          }
        );

        if (response.data.proc.code === 200) {
          setNotifications(response.data.data);
        } else {
          setError('Failed to fetch notifications.');
        }
      } catch (error) {
        setError('알림을 받아오는 중에 문제가 생겼습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {notifications.length === 0 ? (
        <div>알림이 없습니다.</div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.notificationSerial}
            className="notification-item"
          >
            <p>{notification.notificationComment}</p>
            <small>
              {new Date(notification.notificationDate).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
