import { styled } from 'styled-components';
import { ReactComponent as C_BackIcon } from '@/assets/icons/ic_back.svg';
import Txt from '../text';
import { useNavigation } from '@/hooks/useNavigation';

export default function Header({
    text = '',
    destination,
}: {
    text?: string;
    destination?: string;
}) {
    const { goBack, handleNavigate } = useNavigation();

    return (
        <HeaderContainer>
            <Txt variant="h4">{text}</Txt>
            <BackIcon onClick={() => (destination ? handleNavigate(destination) : goBack())} />
        </HeaderContainer>
    );
}

export const HeaderContainer = styled.header`
    width: inherit;
    height: auto;
    min-height: 50px;
    position: relative;
    padding: 11px 10px 7px 10px;
    display: grid;
    place-items: center;
`;

export const BackIcon = styled(C_BackIcon)`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: pointer;
`;
