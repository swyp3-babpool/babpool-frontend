import { useEffect, useState } from 'react';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';

import {
    NotificationDetailPageContainer,
    NotificationDetailPageSection,
    PossibleTimeBox,
    QueryBox,
    ButtonContainer,
    Devider,
    PossibleTimeRadioButton,
} from './NotificationDetailPage.styles';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

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
import { getDate, getDivisionName } from '@/utils/util';

interface NotificationDetailPageProps {
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
    const [selectedTime, setSelectedTime] = useState(-1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupSecondButton, setIsPopupSecondButton] = useState(false);
    const [isPopupSecondText, setIsPopupSecondText] = useState(false);
    const [modalTitle, setModalTitle] = useState('밥약 요청을 수락했어요!');
    const [acceptContent, setAcceptContent] = useState<AcceptContentType>();

    const handleAppointmentAccept = () => {
        const reqBody = {
            appointmentId: appointmentId,
            possibleTimeId: selectedTime,
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
                if (selectedTime === -1) {
                    setIsPopupOpen(true);
                    setIsPopupSecondText(true);
                    setModalTitle('가능하신 시간대 1개를');
                } else {
                    handleAppointmentAccept();
                }
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
                if (selectedTime === -1) {
                    setIsPopupOpen(false);
                    return;
                } else {
                    navigate(`/accept`, { state: acceptContent });
                }
            }
        } else {
            handleAppointmentCacel();
        }
        setIsPopupSecondText(false);
    };

    return (
        <NotificationDetailPageContainer>
            <Header text={type === 'received' ? '받은 밥약' : '보낸 밥약'} />
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
                                ? `${detailAppointment?.lastingTime.hour}시간 ${detailAppointment?.lastingTime.minute}분`
                                : '010-0000-0000'}
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
                                    010-0000-0000
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
                            {state === 'WAITING' && type === 'received' && (
                                <Txt variant="caption2" color={colors.white_20}>
                                    밥약 수락을 위해 가능한 시간대 1개를 선택해주세요
                                </Txt>
                            )}
                        </Col>
                        <Col gap="16">
                            {detailAppointment?.possibleDateTimes.map((time, idx) => (
                                <Row gap="14" key={idx} alignItems="center">
                                    {!(state === 'WAITING' && type === 'sent') && (
                                        <PossibleTimeRadioButton
                                            selected={selectedTime === time.possibleTimeId}
                                            disabled={!(type === 'received' && state === 'WAITING')}
                                            cursor={
                                                type === 'received' && state === 'WAITING'
                                                    ? 'pointer'
                                                    : 'default'
                                            }
                                            onClick={() => setSelectedTime(time.possibleTimeId)}
                                        />
                                    )}
                                    <PossibleTimeBox
                                        selected={
                                            state === 'ACCEPT'
                                                ? selectedTime === time.possibleTimeId
                                                : true
                                        }
                                    >
                                        <Txt variant="caption1" color={colors.black}>
                                            {getDate(time.possibleDate, time.possibleTimeStart)}
                                        </Txt>
                                    </PossibleTimeBox>
                                </Row>
                            ))}
                        </Col>
                    </Col>
                    <Devider />
                    <Col gap="12">
                        <Txt variant="h5" color={colors.black}>
                            이런 점이 궁금해요
                        </Txt>
                        <QueryBox>
                            <Txt variant="caption1" color={colors.black}>
                                "대학생활에 대해 궁금한게 많아요. 어떤 동아리가 있을까요?"
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
                        secondText={
                            selectedTime === -1 && isPopupSecondText ? '선택해주세요!' : undefined
                        }
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
        </NotificationDetailPageContainer>
    );
}
