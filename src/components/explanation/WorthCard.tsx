import React from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import banner from '@/assets/banner/banner.png';

type WorthCardProps = { title: string; desc: string; imgSrc: string; alt: string;  sDesc?: string; };

export default function WorthCard({ title, desc, sDesc='', imgSrc, alt }: WorthCardProps) {
    return (
        <WorthCardContainer>
            <CardImage src={banner} alt={title} />
            <Txt variant="h5" style={{ marginTop: '2px' }}>
                {title}
            </Txt>
            <DescBox>
                <Txt variant="caption2" style={{ marginTop: '6px', textAlign: 'center' }}>
                    {desc}
                </Txt>
                <Txt variant="caption2">
                    {sDesc}
                </Txt>
            </DescBox>
        </WorthCardContainer>
    );
}

const WorthCardContainer = styled.div`
    width: 100%;
    min-width: 156px;
    max-width: 186px;
    height: 165px;
    min-height: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardImage = styled.img`
    width: 60%;
`;

const DescBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
