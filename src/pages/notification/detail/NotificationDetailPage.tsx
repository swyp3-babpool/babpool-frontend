import { useState } from 'react';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';

import {
    NotificationDetailPageContainer,
    NotificationDetailPageSection,
    PossibleTimeBox,
    QueryBox,
    ButtonContainer,
    Devider,
} from './NotificationDetailPage.styles';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Button from '@/components/common/button';
import Header from '@/components/common/header';
import Popup from '@/components/common/popup';
import Overlay from '@/components/common/overlay';
import { Col, Row } from '@/components/common/flex/Flex';
import { AcceptContentType, DetailBabAppointmentType } from '@/interface/api/notifications';
import {
    appointmentAccept,
    appointmentCancel,
    getDetailBabAppointment,
} from '@/api/notification/notificationApi';

import { useQuery } from '@tanstack/react-query';
import { formatDateTime, getDate, getDivisionName } from '@/utils/util';
import { alarmInfoState } from '@/atom/alarminfo';
import { useRecoilValue } from 'recoil';
import AlarmModal from '@/components/common/alarm/AlarmModal';

export interface NotificationDetailPageProps {
    state: string;
    appointmentId: number;
}

export default function NotificationDetailPage() {
    const { type } = useParams();
    const location = useLocation();
    const { state, appointmentId } = location.state as NotificationDetailPageProps;
    const {
        data: detailAppointment,
        isError: isError,
        isLoading: isLoading,
    } = useQuery<DetailBabAppointmentType>({
        queryKey: [`/api/appointment/detail/${appointmentId}`],
        queryFn: () => getDetailBabAppointment(appointmentId),
    });
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupSecondButton, setIsPopupSecondButton] = useState(false);
    const [isPopupSecondText, setIsPopupSecondText] = useState(false);
    const [modalTitle, setModalTitle] = useState('밥약 요청을 수락했어요!');
    const [acceptContent, setAcceptContent] = useState<AcceptContentType>();

    const alarmInfo = useRecoilValue(alarmInfoState);

    const handleAppointmentAccept = () => {
        const reqBody = {
            appointmentId: appointmentId,
        };
        appointmentAccept(reqBody).then((res) => {
            if (res.code === 200) {
                setIsPopupOpen(true);
                setModalTitle('밥약 요청을 수락했어요!');
                setAcceptContent(res.data);
            }
        });
    };

    const handleAppointmentCacel = () => {
        appointmentCancel(appointmentId).then((res) => {
            if (res.code === 200) {
                setModalTitle('밥약 요청을 취소했어요!');
                setIsPopupSecondButton(false);
                navigate('/notification', { replace: true });
            }
        });
    };

    const handlePopupOpen = () => {
        if (type === 'received') {
            if (state === 'WAITING') {
                    handleAppointmentAccept();
            }
        } else {
            setIsPopupOpen(true);
            setModalTitle('밥약 요청을 취소하시겠어요?');
            setIsPopupSecondButton(true);
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handlePopupButtonClick = () => {
        setIsPopupOpen(false);
        if (type === 'received') {
            if (state === 'WAITING') {

                    navigate(`/accept`, { state: acceptContent });
            }
        } else {
            handleAppointmentCacel();
        }
        setIsPopupSecondText(false);
    };

    return (
        <NotificationDetailPageContainer>
            <Header
                text={type === 'received' ? '받은 밥약' : '보낸 밥약'}
                destination="/notification"
            />
            <NotificationDetailPageSection>
                <Col gap="20">
                    <Col gap="0">
                        <ProfileBox
                            url={detailAppointment?.profileImgUrl}
                            name={detailAppointment?.userNickName}
                            group={
                                detailAppointment?.userGrade &&
                                getDivisionName(detailAppointment?.userGrade)
                            }
                            content={detailAppointment?.profileIntro}
                            padding="25px 0px 16px 0px"
                        />
                        <ProfileKeywords keywords={detailAppointment?.keywords} />
                    </Col>
                    <Devider />
                    <Row gap="20">
                        <Txt variant="h5" color={colors.black}>
                            {state === 'WAITING' ? '만료까지 남은 시간' : '연락처'}
                        </Txt>
                        <Txt
                            variant="caption1"
                            color={state === 'WAITING' ? colors.purple_light_40 : colors.black}
                        >
                            {state === 'WAITING'
                                ? detailAppointment?.lastingTime
                                    ? `${detailAppointment?.lastingTime.hour}시간 ${detailAppointment?.lastingTime.minute}분`
                                    : '시간 정보 없음'
                                : `${
                                      detailAppointment?.contactPhone
                                          ? detailAppointment?.contactPhone
                                          : detailAppointment?.contactChat
                                  }`}
                        </Txt>
                    </Row>
                    {state === 'WAITING' && type === 'sent' && (
                        <>
                            <Devider />
                            <Row gap="20">
                                <Txt variant="h5" color={colors.black}>
                                    연락처
                                </Txt>
                                <Txt variant="caption1" color={colors.black}>
                                    {detailAppointment?.contactPhone
                                        ? detailAppointment?.contactPhone
                                        : detailAppointment?.contactChat}
                                </Txt>
                            </Row>
                        </>
                    )}
                    <Devider />
                    <Col gap="12">
                        <Col gap="8">
                            <Txt variant="h5" color={colors.black}>
                                이때 가능해요
                            </Txt>
                        </Col>
                        <Col gap="16"> 
                                <Row gap="14" alignItems="center">
                                    <PossibleTimeBox
                                        selected={
                                            // state === 'ACCEPT'
                                            //     ? selectedTime === time.possibleTimeId
                                            //     : true
                                            true
                                        }
                                    >
                                        <Txt variant="caption1" color={colors.black}>
                                            {formatDateTime(detailAppointment?.possibleDateTime as string)}
                                        </Txt>
                                    </PossibleTimeBox>
                                </Row>
                        </Col>
                    </Col>
                    <Devider />
                    <Col gap="12">
                        <Txt variant="h5" color={colors.black}>
                            이런 점이 궁금해요
                        </Txt>
                        <QueryBox>
                            <Txt variant="caption1" color={colors.black}>
                                {detailAppointment?.appointmentContent}
                            </Txt>
                        </QueryBox>
                    </Col>
                </Col>
            </NotificationDetailPageSection>
            <ButtonContainer type={type}>
                {type === 'sent' ? (
                    state === 'ACCEPT' ? (
                        <></>
                    ) : (
                        <Button text="요청 취소" onClick={handlePopupOpen} />
                    )
                ) : state === 'WAITING' ? (
                    <>
                        <Button text="수락" onClick={handlePopupOpen} />
                        <Button
                            text="다음에요"
                            type="refuse"
                            onClick={() => {
                                navigate(`/reject`, {
                                    state: {
                                        appointmentId: appointmentId,
                                        userNickName: detailAppointment?.userNickName,
                                        userGrade: detailAppointment?.userGrade,
                                        profileIntro: detailAppointment?.profileIntro,
                                        profileImgUrl: detailAppointment?.profileImgUrl,
                                        keywords: detailAppointment?.keywords,
                                    },
                                });
                            }}
                        />
                    </>
                ) : (
                    <Button
                        text="확인"
                        onClick={() => navigate('/notification', { replace: true })}
                    />
                )}
            </ButtonContainer>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text={modalTitle}
                        // secondText={
                        //     selectedTime === -1 && isPopupSecondText ? '선택해주세요!' : undefined
                        // }
                        button={
                            <Button
                                text={isPopupSecondButton ? '네' : '확인'}
                                onClick={handlePopupButtonClick}
                            />
                        }
                        secondButton={
                            isPopupSecondButton ? (
                                <Button text="아니요" type="refuse" onClick={handlePopupClose} />
                            ) : undefined
                        }
                        closePopup={handlePopupClose}
                    />
                </Overlay>
            )}
            {(alarmInfo.messageType) && (
                <AlarmModal
                    messageType={alarmInfo.messageType}
                />
            )}
        </NotificationDetailPageContainer>
    );
}
