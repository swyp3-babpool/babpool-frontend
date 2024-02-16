import styled from 'styled-components';
import { ReactComponent as C_MailIcon } from '@/assets/icons/ic_mail.svg';
import { ReactComponent as C_MenuIcon } from '@/assets/icons/ic_menubar.svg';
import { ReactComponent as C_BabpoolLogo } from '@/assets/logo/babpoolLogo.svg';
import { ReactComponent as C_CloseIcon } from '@/assets/icons/ic_close.svg';

type HomeHeaderProps = {
    isOpenMenu: boolean;
    handleMenu: () => void;
};

export default function HomeHeader({ isOpenMenu, handleMenu }: HomeHeaderProps) {
    return (
        <HeaderContainer>
            <BabpoolLogo />
            {isOpenMenu ? (
                <CloseIcon onClick={handleMenu} />
            ) : (
                <HeaderCategoryBox>
                    <MailIcon />
                    <MenuIcon onClick={handleMenu} />
                </HeaderCategoryBox>
            )}
        </HeaderContainer>
    );
}

export const HeaderContainer = styled.header`
    width: inherit;
    height: auto;
    min-height: 64px;
    padding: 12px 20px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderCategoryBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const MenuIcon = styled(C_MenuIcon)`
    cursor: pointer;
`;
export const MailIcon = styled(C_MailIcon)`
    cursor: pointer;
`;
export const BabpoolLogo = styled(C_BabpoolLogo)`
    cursor: pointer;
`;
export const CloseIcon = styled(C_CloseIcon)`
    cursor: pointer;
`;
