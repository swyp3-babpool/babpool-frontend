import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/header';
import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import {
    ButtonContainer,
    InputContainer,
    ReviewButton,
    ReviewInput,
    ReviewPageContainer,
} from './SendReviewPage.styles';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import Txt from '@/components/common/text';
import { colors } from '@/assets/styles/theme';
import { Devider } from '../Mypage.styles';

export default function SendReviewPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);
    const reviewRecipient = '임예지';

    return (
        <ReviewPageContainer>
            <Header text="후기작성" />
            <Col gap="30" padding="25px 30px 0">
                <Col gap="16">
                    <ProfileBox
                        name="송채영"
                        group="대학생"
                        content="대학생활 고민 같이 나누며 이야기 해요!"
                    />
                    <ProfileKeywords keywords={keywords} />
                </Col>
                <Col gap="16" padding="10px 0 0">
                    <Txt variant="h5">{reviewRecipient}과 밥약은 어떠셨나요?</Txt>
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
                    placeholder="5자-30자 이내로 작성해주세요"
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
                    onClick={() => {}}
                />
            </ButtonContainer>
        </ReviewPageContainer>
    );
}
