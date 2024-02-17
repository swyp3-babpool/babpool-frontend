import { styled } from 'styled-components';
import {ReactComponent as C_BackIcon} from '@/assets/icons/ic_back.svg';
import Txt from '../text';
import { useNavigation } from '@/hooks/useNavigation';

export default function Header({text = ''}: {text?: string}) {

    const {goBack} = useNavigation();
    const { navigate } = useNavigation();

    return (
        <HeaderContainer>
            <Txt variant='h3'>{text}</Txt>
            <BackIcon onClick={() => navigate('/signin')} />
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
    left: -10px;
    transform: translateY(-50%);
    cursor: pointer;
`

