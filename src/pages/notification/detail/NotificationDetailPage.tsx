import { useState } from 'react';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Button from '@/components/common/button';
import Header from '@/components/common/header';
import Popup from '@/components/common/popup';
import Overlay from '@/components/common/overlay';
import { Col, Row } from '@/components/common/flex/Flex';
import {
    ButtonContainer,
    Devider,
    NotificationDetailPageContainer,
    NotificationDetailPageSection,
    PossibleTimeBox,
    PossibleTimeRadioButton,
    QueryBox,
} from './NotificationDetailPage.styles';

export default function NotificationDetailPage() {
    const { type } = useParams();
    const [searchParams] = useSearchParams();
    const state = searchParams.get('state');
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);

    const [times, setTimes] = useState<string[]>([
        '2/7(수) 오후 07:00 ~ 오후 08:00',
        '2/8(목) 오후 07:00 ~ 오후 08:00',
        '2/9(금) 오후 07:00 ~ 오후 08:00',
    ]);

    const navigate = useNavigate();
    const [selectedTimeIdx, setSelectedTimeIdx] = useState(-1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupSecondButton, setIsPopupSecondButton] = useState(false);
    const [modalTitle, setModalTitle] = useState('밥약 요청을 수락했어요!');

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
        if (type === 'received') {
            if (state === 'waiting') {
                if (selectedTimeIdx === -1) {
                    setModalTitle('가능하신 시간대 1개를');
                } else {
                    setModalTitle('밥약 요청을 수락했어요!');
                }
            }
        } else {
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
            if (state === 'waiting') {
                if (selectedTimeIdx === -1) {
                    setIsPopupOpen(false);
                    return;
                } else {
                    navigate(`/accept`);
                }
            }
        } else {
            setModalTitle('밥약 요청을 취소하시겠어요?');
            setIsPopupSecondButton(true);
        }
    };

    return (
        <NotificationDetailPageContainer>
            <Header text={type === 'received' ? '받은 밥약' : '보낸 밥약'} />
            <NotificationDetailPageSection>
                <Col gap="20">
                    <Col gap="0">
                        <ProfileBox
                            name="송채영"
                            group="대학생"
                            content="대학생활 고민 같이 나누며 이야기 해요!"
                            padding="25px 0px 16px 0px"
                        />
                        <ProfileKeywords keywords={keywords} />
                    </Col>
                    <Devider />
                    <Row gap="20">
                        <Txt variant="h5" color={colors.black}>
                            {state === 'waiting' ? '만료까지 남은 시간' : '연락처'}
                        </Txt>
                        <Txt
                            variant="caption1"
                            color={state === 'waiting' ? colors.purple_light_40 : colors.black}
                        >
                            {state === 'waiting' ? '00시간 00분' : '010-0000-0000'}
                        </Txt>
                    </Row>
                    {state === 'waiting' && type === 'sent' && (
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
                            {state === 'waiting' && type === 'received' && (
                                <Txt variant="caption2" color={colors.white_20}>
                                    밥약 수락을 위해 가능한 시간대 1개를 선택해주세요
                                </Txt>
                            )}
                        </Col>
                        <Col gap="16">
                            {times.map((time, idx) => (
                                <Row gap="14" key={idx} alignItems="center">
                                    {!(state === 'waiting' && type === 'sent') && (
                                        <PossibleTimeRadioButton
                                            selected={selectedTimeIdx === idx}
                                            disabled={!(type === 'received' && state === 'waiting')}
                                            onClick={() => setSelectedTimeIdx(idx)}
                                        />
                                    )}
                                    <PossibleTimeBox>
                                        <Txt variant="caption1" color={colors.black}>
                                            {time}
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
                    state === 'accept' ? (
                        <></>
                    ) : (
                        <Button text="요청 취소" onClick={handlePopupOpen} />
                    )
                ) : state === 'waiting' ? (
                    <>
                        <Button text="수락" onClick={handlePopupOpen} />
                        <Button
                            text="다음에요"
                            type="refuse"
                            onClick={() => {
                                navigate(`/reject`);
                            }}
                        />
                    </>
                ) : (
                    <Button text="확인" onClick={() => navigate(-1)} />
                )}
            </ButtonContainer>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text={modalTitle}
                        secondText={selectedTimeIdx === -1 ? '선택해주세요!' : undefined}
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
