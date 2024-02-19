import { keyframes, styled } from 'styled-components';
import Txt from '../common/text';
import profileImage_1 from '@/assets/images/프로필1.png';
import profileImage_2 from '@/assets/images/프로필2.png';


export default function C_FirstSection() {
    return (
        <FirstSection>
                <TitleBox>
                    <Txt style={{ fontWeight: 700, fontSize: '40px' }}>밥풀과 함께하는</Txt>
                    <Txt style={{ fontWeight: 700, fontSize: '40px' }}>즐거운 대학생활</Txt>
                </TitleBox>
                <ScrollAnimationContainer>
                    <ScrollAnimation>
                        <ProfileImageBox1>
                            <ProfileImage src={profileImage_1} alt="프로필1" />
                        </ProfileImageBox1>
                        <ProfileImageBox1>
                            <ProfileImage src={profileImage_1} alt="프로필1" />
                        </ProfileImageBox1>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <ProfileImageBox2>
                            <ProfileImage src={profileImage_2} alt="프로필2" />
                        </ProfileImageBox2>
                        <ProfileImageBox2>
                            <ProfileImage src={profileImage_2} alt="프로필2" />
                        </ProfileImageBox2>
                    </ScrollAnimation>
                </ScrollAnimationContainer>
                <DescBox>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        대학 내에서 학생들 간의 연결을 경험하고
                    </Txt>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        더 행복하고 의미있는 대학생활을 꾸려가도록 도와주는
                    </Txt>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        밥풀 서비스에 대해 알아보세요.
                    </Txt>
                </DescBox>
            </FirstSection>
    );
}

export const TitleBox = styled.div`
    width: 100%;
    padding: 0 61px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ScrollAnimationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ScrollAnimation = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    --webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
`;

const scrollAnimation_1 = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const scrollAnimation_2 = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
`;

export const ProfileImageBox1 = styled.div`
    display: flex;
    animation: ${scrollAnimation_1} 20s linear infinite;
    animation-delay: calc(-20s);
`;

export const ProfileImageBox2 = styled.div`
    display: flex;
    animation: ${scrollAnimation_2} 20s linear infinite;
    animation-delay: calc(-20s);
`;

export const ProfileImage = styled.img`
    height: 100px;
`;

export const FirstSection = styled.section`
    width: 100%;
    height: 675px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 50px;
    padding: 80px 0;
`;

export const DescBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

