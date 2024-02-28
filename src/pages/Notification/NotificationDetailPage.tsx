import { useState } from 'react';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';
import {
    NotificationDetailPageContainer,
    NotificationDetailPageSection,
    Col,
    PossibleTimeBox,
    QueryBox,
    ButtonContainer,
} from './NotificationDetailPage.styles';
import { useParams } from 'react-router-dom';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Button from '@/components/common/button';
import Header from '@/components/common/header';
import Popup from '@/components/common/popup';
import Overlay from '@/components/common/overlay';

export default function NotificationDetailPage() {
    const { type } = useParams();
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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupSecondButton, setIsPopupSecondButton] = useState(false);
    const [modalTitle, setModalTitle] = useState('밥약 요청을 수락했어요!');

    const handlePopupOpen = (state: string) => {
        setIsPopupOpen(true);
        if (type === 'received') {
            if (state === 'accept') {
                setModalTitle('밥약 요청을 수락했어요!');
            } else {
                //거절페이지로 이동
                console.log('거절');
            }
        } else {
            setModalTitle('밥약 요청을 취소하시겠어요?');
            setIsPopupSecondButton(true);
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handlePopupButtonClick = () => {};

    return (
        <NotificationDetailPageContainer>
            <Header text={type === 'received' ? '받은 밥약' : '보낸 밥약'} />
            <NotificationDetailPageSection>
                <Col gap="40px">
                    <Col gap="0">
                        <ProfileBox
                            name="송채영"
                            group="대학생"
                            content="대학생활 고민 같이 나누며 이야기 해요!"
                            padding="25px 0px 16px 0px"
                        />
                        <ProfileKeywords keywords={keywords} />
                    </Col>
                    <Col gap="16px">
                        <Txt variant="h5" color={colors.black}>
                            이때 가능해요
                        </Txt>
                        {times.map((time, idx) => (
                            <PossibleTimeBox key={idx}>
                                <Txt variant="caption1" color={colors.black}>
                                    {time}
                                </Txt>
                            </PossibleTimeBox>
                        ))}
                    </Col>
                    <Col gap="12px">
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
                <ButtonContainer type={type}>
                    {type === 'sent' ? (
                        <Button text="요청 취소" onClick={() => handlePopupOpen('')} />
                    ) : (
                        <>
                            <Button text="수락" onClick={() => handlePopupOpen('accept')} />
                            <Button text="다음에요" type="refuse" onClick={() => {}} />
                        </>
                    )}
                </ButtonContainer>
            </NotificationDetailPageSection>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text={modalTitle}
                        button={<Button text="확인" onClick={() => handlePopupButtonClick} />}
                        closePopup={handlePopupClose}
                    />
                </Overlay>
            )}
        </NotificationDetailPageContainer>
    );
}
