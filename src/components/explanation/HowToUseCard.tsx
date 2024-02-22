import { styled } from 'styled-components';
import Txt from '../common/text';

type HowToUseCardProps = { title: string; desc: string; imgSrc: string; alt: string; };

export default function HowToUseCard({title, desc, imgSrc, alt} : HowToUseCardProps) {
    return (
        <CardContainer>
            <TitleBox>
                <Txt variant='h5'>{title}</Txt>
                <CardImage src={imgSrc} alt={alt} />
            </TitleBox>
            <Txt variant='caption1'>{desc}</Txt>
        </CardContainer>
    );
}

const CardContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    border-radius: 10px;
    background-color: white;
`

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CardImage = styled.img`
    width: 30px;
    height: 24px;
`;

