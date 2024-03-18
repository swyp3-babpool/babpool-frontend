import Layout from './Layout';
import RouteProvider from './routes';
import GlobalStyle from './assets/styles/global';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import StompJS, { Client } from '@stomp/stompjs';
import { BASE_URL } from './utils/config';
import { webSocketInstance } from './utils/socket/websocketInstance';

function App() {
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            webSocketInstance.setToken(token);
            webSocketInstance.connect();
        }

        return () => {
            webSocketInstance.disconnect();
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
