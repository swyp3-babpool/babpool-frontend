import styled from 'styled-components';
import Txt from '../common/text';
import { useNavigation } from '@/hooks/useNavigation';
import { useEffect, useState } from 'react';
import { logoutRequest } from '@/api/auth/auth';
import Overlay from '../common/overlay';
import Popup from '../common/popup';
import Button from '../common/button';

export default function HomeMenu({ isOpenMenu, handleMenu }: { isOpenMenu: boolean, handleMenu: () => void}) {
    const [isLogin, setIsLogin] = useState(false);
    const [isLogoutPopup, setIsLogoutPopup] = useState(false);

    const { handleNavigate, loginCheckNavigate } = useNavigation();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLogin(true);
        }
    }, [isOpenMenu]);

    const handleLogout = () => {
        logoutRequest()
        .then((res) => {
            console.log(res);
            if(res.code === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                setIsLogin(false);
                setIsLogoutPopup(false);
                handleMenu()
                handleNavigate('/')
            }
        
        }).finally(() => {
            handleNavigate('/')
        })
    };

    const handleLogoutPopup = () => {
        setIsLogoutPopup(true);
    };

    const MENU_LIST = [
        {
            text: '밥풀이란?',
            url: 'explanation',
        },
        {
            text: '밥풀 전체보기',
            url: 'total',
        },
        {
            text: '밥약 알림',
            url: 'notification',
        },
        {
            text: '마이페이지',
            url: 'mypage',
        },
        {
            text: `${isLogin ? '로그아웃' : '로그인/회원가입'}`,
            url: `${isLogin ? '' : '/signin'}`,
        },
    ];


    return (
        <HomeMenuContainer left={isOpenMenu ? '0%' : '100%'}>
            <MenuList>
                {MENU_LIST.map((menu, idx) => {
                    return (
                        <MenuTextBox
                            key={menu.text}
                            onClick={
                                menu.text === '로그아웃'
                                    ? handleLogoutPopup
                                    : menu.text === '밥약 알림' || menu.text === '마이페이지'
                                    ? () => loginCheckNavigate(menu.url)
                                    : () => handleNavigate(menu.url)
                            }
                        >
                            <Txt variant={'h2'}>{menu.text}</Txt>
                        </MenuTextBox>
                    );
                })}
            </MenuList>
            {isLogoutPopup && (
                <Overlay>
                    <Popup
                        text="로그아웃 하시겠습니까?"
                        button={<Button text="확인" onClick={handleLogout} />}
                        secondButton={
                            <Button
                                text="나중에"
                                type="refuse"
                                onClick={() => setIsLogoutPopup(false)}
                            />
                        }
                        closePopup={() => setIsLogoutPopup(false)}
                    />
                </Overlay>
            )}
        </HomeMenuContainer>
    );
}

export const HomeMenuContainer = styled.div<{ left: string }>`
    width: inherit;
    height: calc(100% - 64px);
    background-color: white;
    position: absolute;
    left: ${(props) => props.left};
    top: 63px;
    transition: 0.5s;
    z-index: 10;
`;

export const MenuList = styled.div`
    width: inherit;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 61px;
`;

export const MenuTextBox = styled.div`
    height: auto;
    display: grid;
    place-items: center;
    padding: 18px 0;
    cursor: pointer;
    &:hover {
        span {
            font-weight: bold;
        }
    }
`;
