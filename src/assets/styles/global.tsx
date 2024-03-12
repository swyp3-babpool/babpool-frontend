import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
    ${normalize}

    * {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-family: 'Pretendard Variable', 'Noto Sans KR', sans-serif;
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        background-color: #fff;
    }

    html,
    body,
    #root {
        width: 100vw;
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        justify-content: center;
        -webkit-overflow-scrolling: touch !important;
        -ms-overflow-style: none;
        scrollbar-width: none;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    body {
        background-color: #f5f5f5;
    }

    button {
        padding: 0;
        overflow: visible;
        cursor: pointer;
        background: inherit;
        border: none;
        border-radius: 0;
        box-shadow: none;
    }
    a {
        color: #fff;
        text-decoration: none;
        outline: none;
    }
    a:hover,
    a:active {
        text-decoration: none;
        color: #fff;
    }
`;

export default GlobalStyle;
