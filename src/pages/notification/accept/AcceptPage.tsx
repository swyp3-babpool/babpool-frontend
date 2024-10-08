import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import Txt from '@/components/common/text';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_complete.svg';
import Header from '@/components/common/header';

import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import { AcceptContentType } from '@/interface/api/notifications';
import { formatDateTime, getDivisionName } from '@/utils/util';
import {
    AcceptPageContainer,
    ButtonContainer,
    Devider,
    IconContainer,
    QueryBox,
    ThickDevider,
} from './AcceptPage.styles';
import AlarmModal from '@/components/common/alarm/AlarmModal';
import { alarmInfoState } from '@/atom/alarminfo';
import { useRecoilValue } from 'recoil';

export default function AcceptPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        appointmentId,
        requesterNickName,
        requesterProfileImageUrl,
        requesterGrade,
        requesterIntro,
        possibleDateTime,
        requesterContactPhone,
        requesterContactChat,
        appointmentContent,
    } = location.state as AcceptContentType;

    const alarmInfo = useRecoilValue(alarmInfoState);

    return (
        <AcceptPageContainer>
            <Header destination='/'/>
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
                            {`${
                                requesterContactPhone ? '{연락처로}' : '{오픈채팅방으로}'
                            } 밥약 장소를 정해보세요!`}
                        </Txt>
                    </Col>
                </Col>
            </Col>
            <ThickDevider />
            <Col gap="20" padding="40px 30px 0">
                <Col gap="15">
                    <ProfileBox
                        url={requesterProfileImageUrl}
                        name={requesterNickName}
                        group={getDivisionName(requesterGrade)}
                        content={requesterIntro}
                    />
                    <Devider />
                </Col>
                <Col gap="8">
                    <Row gap="20">
                        <Txt variant="h6" color={colors.black}>
                            밥약시간
                        </Txt>
                        <Txt variant="caption1" color={colors.black}>
                            {formatDateTime(possibleDateTime)}
                        </Txt>
                    </Row>
                    <Row gap="20">
                        <Txt variant="h6" color={colors.black}>
                            {requesterContactPhone ? '연락처' : '오픈채팅방'}
                        </Txt>
                        <Txt variant="caption1" color={colors.black}>
                            {requesterContactPhone || requesterContactChat}
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
                            {appointmentContent}
                        </Txt>
                    </QueryBox>
                </Col>
            </Col>
            <ButtonContainer>
                <Button
                    text="상세 내역 보기"
                    onClick={() =>
                        navigate(`/notification/received`, {
                            state: { state: 'ACCEPT', appointmentId: appointmentId },
                        })
                    }
                />
            </ButtonContainer>
            {(alarmInfo.messageType) && (
                <AlarmModal
                    messageType={alarmInfo.messageType}
                />
            )}
        </AcceptPageContainer>
    );
}
