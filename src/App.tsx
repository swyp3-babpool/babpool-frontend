import Layout from './Layout';
import RouteProvider from './routes';
import GlobalStyle from './assets/styles/global';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from './utils/config';
import { useSetRecoilState } from 'recoil';
import { INIT_ALARM_INFO, alarmInfoState } from './atom/alarminfo';

function App() {
    const token = localStorage.getItem('accessToken');
    const setAlarmInfo = useSetRecoilState(alarmInfoState);
    const client = useRef<Client | null>(null);

    const handleSubscribeToNotifications = () => {
        const userId = localStorage.getItem('userId');
        // const setAlarmInfo = useSetRecoilState(alarmInfoState)
        if (userId && client.current !== null) {
            console.log(`${userId} 연결`);
            client.current.subscribe(`/topic/appointment/${userId}`, (message: any) => {
                // 알림, 채팅 데이터가 있을 경우 JSON 파싱
                if (message.body) {
                    const body = JSON.parse(message.body);
                    console.log(body);
                    setAlarmInfo((prev) => ({...prev, requesterProfileId: 1, messageType: body.messageType}));
                    if (
                        body.messageType === 'APPOINTMENT_REQUESTED' ||
                        body.messageType === 'APPOINTMENT_ACCEPTED'
                    ) {
                        localStorage.setItem('isAlarm', '1');
                        setAlarmInfo((prev) => ({...prev, isAlarm: 1}));
                    }
                }
                return;
            });
        }
    };

    useEffect(() => {
        if (client.current) return;
        if (token) {
            const socket = new SockJS(`${BASE_URL}/websocket/appointment`);
            const stompClient = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => {
                    console.log(str);
                },

                onConnect: () => {
                    console.log('연결 성공');
                    handleSubscribeToNotifications();
                },

                onDisconnect: () => {
                    console.log('연결 종료');
                },

                onStompError: (err) => {
                    console.error('STOMP 에러 : ', err);
                },
            });
            stompClient.activate();
            console.log(stompClient);
            client.current = stompClient;
        }

        return () => {
            if (client.current && client.current.connected) {
                client.current.deactivate();
                client.current = null;
                console.log('연결 종료');
                setAlarmInfo(INIT_ALARM_INFO);
            }
        };
    }, [token]);

    return (
        <Layout>
            <GlobalStyle />
            <RouteProvider />
        </Layout>
    );
}

export default App;
