import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import Txt from '@/components/common/text';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_complete.svg';
import Header from '@/components/common/header';

import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import { AcceptPageContainer, ButtonContainer, Devider, IconContainer, QueryBox, ThickDevider } from './AcceptPage.styles';

interface AcceptPageProps {
    appointmentId: number;
    userNickName: string;
    userGrade: string;
    profileIntro: string;
    profileImgUrl: string;
    keywords: string[];
}

export default function AcceptPage() {
    const navigate = useNavigate();
    return (
        <AcceptPageContainer>
            <Header />
            <Col gap="0" padding="35px 0 55px">
                <Col gap="18" padding="0" alignItems="center">
                    <IconContainer>
                        <CheckIcon />
                    </IconContainer>
                    <Col gap="8" alignItems="center">
                        <Txt variant="h3" color={colors.black} align="center">
                            밥약 수락 완료
                        </Txt>
                        <Txt variant="caption1" color={colors.black} align="center">
                            {`{연락처로} 밥약 장소를 정해보세요!`}
                        </Txt>
                    </Col>
                </Col>
            </Col>
            <ThickDevider />
            <Col gap="20" padding="40px 30px 0">
                <Col gap="15">
                    <ProfileBox
                        name="송채영"
                        group="대학생"
                        content="대학생활 고민 같이 나누며 이야기 해요!"
                    />
                    <Devider />
                </Col>
                <Col gap="8">
                    <Row gap="20">
                        <Txt variant="h6" color={colors.black}>
                            밥약시간
                        </Txt>
                        <Txt variant="caption1" color={colors.black}>
                            2/7(수) 오후 07:00 ~ 오후 08:00
                        </Txt>
                    </Row>
                    <Row gap="20">
                        <Txt variant="h6" color={colors.black}>
                            연락처
                        </Txt>
                        <Txt variant="caption1" color={colors.black}>
                            010-0000-0000
                        </Txt>
                    </Row>
                </Col>
                <Devider />
                <Col gap="10">
                    <Txt variant="h6" color={colors.black}>
                        이런점이 궁금해요
                    </Txt>
                    <QueryBox>
                        <Txt variant="caption1" color={colors.black}>
                            "대학생활에 대해 궁금한게 많아요. 어떤 동아리가 있을까요?"
                        </Txt>
                    </QueryBox>
                </Col>
            </Col>
            <ButtonContainer>
                <Button
                    text="상세 내역 보기"
                    onClick={() => navigate(`/notification/received?state=accept`)}
                />
            </ButtonContainer>
        </AcceptPageContainer>
    );
}
