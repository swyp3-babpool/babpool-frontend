import Header from '@/components/common/header';
import styled from 'styled-components';
import { Col, Row } from '@/components/common/flex/Flex';
import { colors } from '@/assets/styles/theme';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_check.svg';
import { ReactComponent as ActiveCheckIcon } from '@/assets/icons/ic_active_check.svg';
import Txt from '@/components/common/text';
import { useState } from 'react';
import Button from '@/components/common/button';
import { useNavigation } from '@/hooks/useNavigation';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import { deleteAccountRequest } from '@/api/auth/auth';

export default function DeleteAccountPage() {
    const reason = [
        '원하는 밥풀러가 없어요',
        '비매너 밥풀러를 만났어요',
        '밥약 요청 과정이 불편해요 ',
        '개인정보 보안이 걱정돼요',
        '새 계정을 만들고 싶어요',
        '기타',
    ];

    const [selectedReason, setSelectedReason] = useState<string[]>([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { goHome, navigate } = useNavigation();

    const handleSelectReason = (reason: string) => {
        if (selectedReason.includes(reason)) {
            setSelectedReason(selectedReason.filter((r) => r !== reason));
        } else {
            setSelectedReason([...selectedReason, reason]);
        }
    };

    const handleCheckIcon = (reason: string) => {
        const isExist = selectedReason && selectedReason.find((content) => content === reason);
        return isExist;
    };

    const handleDeleteAccount = () => {
        const requestBody = {
            exitReason: selectedReason,
        }
        deleteAccountRequest(requestBody)
        .then((res) => {
            if(res.code === 200) {
                localStorage.removeItem('accessToken');
                goHome();
            }
        })
    }

    

    return (
        <DeleteAccountPageContainer>
            <Header />
            <Col gap={30} padding="25px 20px">
                <Col gap={25}>
                    <Txt variant="h3" color={colors.black}>
                        회원탈퇴하기
                    </Txt>
                    <Devider />
                </Col>
                <Col gap={20}>
                    <Col gap={8} padding="0  0 0 12px">
                        <Txt variant="h5" color={colors.black}>
                            탈퇴하시려는 이유가 있나요?
                        </Txt>
                        <Txt variant="caption2" color={colors.white_30}>
                            최소 1개 이상의 응답을 선택해주세요
                        </Txt>
                    </Col>
                    <Col gap={16} padding="0  0 0 30px">
                        {reason.map((reason) => (
                            <Row
                                alignItems="center"
                                justifyContent="flex-start"
                                gap={10}
                                key={reason}
                            >
                                <IconButton onClick={() => handleSelectReason(reason)}>
                                    {handleCheckIcon(reason) ? <ActiveCheckIcon /> : <CheckIcon />}
                                </IconButton>

                                <Txt
                                    style={{
                                        paddingTop: '3px',
                                    }}
                                    variant="caption1"
                                >
                                    {reason}
                                </Txt>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
            <ButtonContainer>
                <Button
                    text="완료"
                    disabled={selectedReason.length === 0}
                    type={selectedReason.length === 0 ? 'refuse' : 'accept'}
                    onClick={() => setIsPopupOpen(true)}
                />
            </ButtonContainer>
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text="정말 탈퇴하시겠어요?"
                        secondText="너무 아쉬워요."
                        button={<Button text="탈퇴" onClick={handleDeleteAccount} />}
                        secondButton={
                            <Button
                                text="취소"
                                onClick={() => setIsPopupOpen(false)}
                                type="refuse"
                            />
                        }
                        deleteAccount={true}
                        closePopup={() => setIsPopupOpen(false)}
                    />
                </Overlay>
            )}
        </DeleteAccountPageContainer>
    );
}

const DeleteAccountPageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

const Devider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.black};
`;

export const ButtonContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 0px 30px 40px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
`;

const IconButton = styled.div`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;
