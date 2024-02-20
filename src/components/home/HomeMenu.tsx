import styled from 'styled-components';
import Txt from '../common/text';
import { useNavigation } from '@/hooks/useNavigation';

export default function HomeMenu({ isOpenMenu }: { isOpenMenu: boolean }) {
    const MENU_LIST = 
    [
        {
            text: '밥풀이란?',
            url: 'explanation'
        },
        {
            text: '밥풀 전체보기',
            url: ''
        },
        {
            text: '우편함',
            url: ''
        },
        {
            text: '마이페이지',
            url: ''
        },
        {
            text: '로그아웃',
            url: '/signin'
        },
    ];

    const {handleNavigate} = useNavigation();


    return (
        <HomeMenuContainer left={isOpenMenu ? '0%' : '100%'}>
            <MenuList>
                {MENU_LIST.map((menu, idx) => {
                    return (
                        <MenuTextBox key={menu.text} onClick={menu.text === '로그아웃' ? () => handleNavigate(menu.url) : () => handleNavigate(menu.url)}>
                            <Txt variant={'h2'}>{menu.text}</Txt>
                        </MenuTextBox>
                    );
                })}
            </MenuList>
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
