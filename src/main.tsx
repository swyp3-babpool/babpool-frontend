import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import QueryProvider from './provider/QueryProvider.tsx';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryProvider>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </QueryProvider>
    </React.StrictMode>
);
