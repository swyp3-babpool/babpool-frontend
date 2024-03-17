import Layout from './Layout';
import RouteProvider from './routes';
import GlobalStyle from './assets/styles/global';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import StompJS, { Client } from '@stomp/stompjs';
import { BASE_URL } from './utils/config';

function App() {
    const token = localStorage.getItem('accessToken');
    const client = useRef<Client | null>(null);

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
