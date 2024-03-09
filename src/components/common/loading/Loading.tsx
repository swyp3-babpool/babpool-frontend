import { styled } from 'styled-components';
import Overlay from '../overlay';
import LoadingGif from '@/assets/gif/loading.gif';

export default function Loading() {
    return (
        <Overlay>
            <LoadingIcon src={LoadingGif} alt="로딩gif" />
        </Overlay>
    );
}

const LoadingIcon = styled.img`
    width: 45px;
    height: 45px;
`;
