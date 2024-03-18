import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/header';
import { Col } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';

import { ButtonContainer, RejectInput, RejectPageContainer } from './RejectPage.styles';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import { getDivisionName } from '@/utils/util';
import { appointmentReject } from '@/api/notification/notificationApi';
import AlarmModal from '@/components/common/alarm/AlarmModal';
import { alarmInfoState } from '@/atom/alarminfo';
import { useRecoilValue } from 'recoil';

interface RejectPageProps {
    appointmentId: number;
    userNickName: string;
    userGrade: string;
    profileIntro: string;
    profileImgUrl: string;
    keywords: string[];
}

export default function RejectPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userNickName, appointmentId, userGrade, profileIntro, profileImgUrl, keywords } =
        location.state as RejectPageProps;
    const [inputValue, setInputValue] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const alarmInfo = useRecoilValue(alarmInfoState);

    const handleRejectButtonClick = () => {
        const reqBody = {
            appointmentId: appointmentId,
            refuseMessage: inputValue,
        };
        appointmentReject(reqBody).then((res) => {
            if (res.code === 200) {
                setIsPopupOpen(true);
            }
        });
    };

    return (
        <RejectPageContainer>
            <Header text="다음에요" />
            <Col gap="20" padding="25px 30px 0">
                <Col gap="16">
                    <ProfileBox
                        name={userNickName}
                        group={getDivisionName(userGrade)}
                        content={profileIntro}
                    />
                    <ProfileKeywords keywords={keywords} />
                </Col>
                <RejectInput
                    placeholder="5자-30자 이내로 거절 사유를 작성해주세요"
                    value={inputValue}
                    onChange={(e) => {
                        if (e.target.value.length <= 30) {
                            setInputValue(e.target.value);
                        }
                    }}
                />
            </Col>
            <ButtonContainer>
                <Button
                    text="완료"
                    disabled={inputValue.length < 5}
                    type={inputValue.length < 5 ? 'refuse' : 'accept'}
                    onClick={handleRejectButtonClick}
                />
            </ButtonContainer>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text="밥약 요청을 거절했어요!"
                        button={<Button text="확인" onClick={() => navigate('/mypage/history')} />}
                        closePopup={() => setIsPopupOpen(false)}
                    />
                </Overlay>
            )}
            {(alarmInfo.messageType) && (
                <AlarmModal
                    messageType={alarmInfo.messageType}
                />
            )}
        </RejectPageContainer>
    );
}
