import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/header';
import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import {
    ButtonContainer,
    ReviewButton,
    ReviewInput,
    ReviewPageContainer,
} from './SendReviewPage.styles';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Txt from '@/components/common/text';
import { colors } from '@/assets/styles/theme';
import { Devider } from '../Mypage.styles';
import { useQuery } from '@tanstack/react-query';
import { sendReview } from '@/api/review/reviewApi';
import { ProfileDetailsType } from '@/interface/api/profileDetailsType';
import { getUserProfile } from '@/api/profile/profileApi';
import { getDivisionName, getReviewTypeToServer } from '@/utils/util';

export default function SendReviewPage() {
    const location = useLocation();
    const appointmentId = location.state.appointmentId;
    const userProfileId = location.state.profileId;

    const {
        data: profileInfo,
        isError: isError,
        isLoading: isLoading,
    } = useQuery<ProfileDetailsType>({
        queryKey: [`/api/profile/detail/${userProfileId}`],
        queryFn: () => getUserProfile(String(userProfileId)),
    });

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleSendReview = () => {
        const reqBody = {
            targetAppointmentId: appointmentId,
            rateType: getReviewTypeToServer(selectedButton || ''),
            reviewContent: inputValue,
        };
        sendReview(reqBody).then((res) => {
            if (res.code === 200) {
                navigate('/mypage');
            }
        });
    };

    return (
        <ReviewPageContainer>
            <Header text="후기작성" />
            <Col gap="30" padding="25px 30px 0">
                <Col gap="16">
                    <ProfileBox
                        url={profileInfo?.profileImg}
                        name={profileInfo?.name}
                        group={getDivisionName(profileInfo?.grade || '')}
                        content={profileInfo?.intro}
                    />
                    <ProfileKeywords keywords={profileInfo?.keywords} />
                </Col>
                <Col gap="16" padding="10px 0 0">
                    <Txt variant="h5">{profileInfo?.name}과 밥약은 어떠셨나요?</Txt>
                    <Row gap={12} justifyContent="center" alignItems="center">
                        {['최고예요', '좋아요', '별로예요'].map((text) => (
                            <ReviewButton
                                key={text}
                                onClick={() => setSelectedButton(text)}
                                selected={selectedButton === text}
                            >
                                <Txt
                                    variant="h5"
                                    color={
                                        selectedButton === text
                                            ? colors.white
                                            : colors.purple_light_40
                                    }
                                >
                                    {text}
                                </Txt>
                            </ReviewButton>
                        ))}
                    </Row>
                </Col>
                <Devider />
                <ReviewInput
                    placeholder="5자-200자 이내로 작성해주세요"
                    value={inputValue}
                    onChange={(e) => {
                        if (e.target.value.length <= 200) {
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
                    onClick={() => {
                        handleSendReview();
                    }}
                />
            </ButtonContainer>
        </ReviewPageContainer>
    );
}
