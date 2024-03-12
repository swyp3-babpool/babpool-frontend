import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/header';
import { Col } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import {
    ButtonContainer,
    InputContainer,
    RejectInput,
    RejectPageContainer,
} from './RejectPage.styles';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';

export default function RejectPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <RejectPageContainer>
            <Header text="다음에요" />
            <Col gap="20" padding="25px 30px 0">
                <Col gap="16">
                    <ProfileBox
                        name="송채영"
                        group="대학생"
                        content="대학생활 고민 같이 나누며 이야기 해요!"
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
                    onClick={() => setIsPopupOpen(true)}
                />
            </ButtonContainer>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text="밥약 요청을 거절했어요!"
                        button={<Button text="확인" onClick={() => navigate('/mypage')} />}
                        closePopup={() => setIsPopupOpen(false)}
                    />
                </Overlay>
            )}
        </RejectPageContainer>
    );
}
