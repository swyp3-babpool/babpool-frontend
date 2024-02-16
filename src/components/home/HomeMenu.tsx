import styled from 'styled-components';
import Txt from '../common/text';

export default function HomeMenu({ isOpenMenu }: { isOpenMenu: boolean }) {
    const MENU_LIST = ['밥풀이란?', '밥풀 전체보기', '우편함', '마이페이지', '로그아웃'];
    return (
        <HomeMenuContainer left={isOpenMenu ? '0%' : '100%'}>
            <MenuList>
                {MENU_LIST.map((menu, idx) => {
                    return (
                        <MenuTextBox>
                            <Txt variant={'h2'}>{menu}</Txt>
                        </MenuTextBox>
                    );
                })}
            </MenuList>
        </HomeMenuContainer>
    );
}

export const HomeMenuContainer = styled.div<{ left: string }>`
    width: inherit;
    height: calc(100% - 63px);
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
