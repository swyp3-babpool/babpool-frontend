import { styled } from 'styled-components';
import Txt from '../common/text';
import WorthCard from './WorthCard';
import { WORTH_LIST } from '@/utils/constant';

export default function C_ThirdSection() {
    return (
        <ThirdSection>
        <Txt style={{ fontSize: '20px', fontWeight: 700, lineHeight: '30px' }}>
            밥풀은 유익한 가치를 전해요
        </Txt>
        <WorthCardContainer>
            {WORTH_LIST.map((worth) => (
                <WorthCard
                    key={worth.title}
                    title={worth.title}
                    desc={worth.desc}
                    sDesc={worth.sDesc && worth.sDesc}
                    imgSrc={worth.imgSrc}
                />
            ))}
        </WorthCardContainer>
    </ThirdSection>
    );
}

export const ThirdSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 22px;
`;

export const WorthCardContainer = styled.div`
    width: 100%;
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    place-items: center;

    :nth-child(1) {
        grid-column: span 2;
    }
`;