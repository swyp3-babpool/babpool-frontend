import { colors } from '@/assets/styles/theme';
import SelectScheduleModal from '@/components/babpoolRequest/SelectScheduleModal';
import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import ScheduleBox from '@/components/common/schedule/ScheduleBox';
import Txt from '@/components/common/text';
import Textarea from '@/components/common/textarea/Textarea';
import { useNavigation } from '@/hooks/useNavigation';
import React, { useState } from 'react';
import { styled } from 'styled-components';

export default function BabRequestPage() {
    const [isScheduleSelected, setIsScheduleSelected] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [requestInfo, setRequestInfo] = useState({
        userId: 0,
        schedule: [],
        question: '',
    });

    const { navigate } = useNavigation();

    const handleOpenModal = () => {
        setIsScheduleSelected(true);
    };

    const handleCloseModal = () => {
        setIsScheduleSelected(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRequestInfo({ ...requestInfo, question: e.target.value });
    };

    const handleSubmit = () => {
        setIsOpenPopup(true);
    };

    const handleClosePopup = () => {
        setIsOpenPopup(false);
    };

    return (
        <>
            <BabRequestPageContainer>
                <Header />
                <RequestContainer>
                    <TextBox>
                        <Txt variant="h3" styles={{ marginBottom: '25px' }}>
                            {'조민택'}님께 밥약 요청하기
                        </Txt>
                    </TextBox>
                    <Divider />
                    <ScheduleContainer>
                        <TextContainer>
                            <Txt variant="h5">일정은 언제로 할까요?*</Txt>
                            <Txt variant="caption2" color={colors.white_20}>
                                최소 1개 이상의 일정을 선택해주세요
                            </Txt>
                        </TextContainer>
                        <ScheduleBoxContainer>
                            <ScheduleBox
                                defaultText="첫 번째 일정 선택하기*"
                                selectText={undefined}
                                onClick={handleOpenModal}
                            />
                            <ScheduleBox
                                defaultText="두 번째 일정 선택하기"
                                selectText={undefined}
                                onClick={handleOpenModal}
                            />
                            <ScheduleBox
                                defaultText="세 번째 일정 선택하기"
                                selectText={undefined}
                                onClick={handleOpenModal}
                            />
                        </ScheduleBoxContainer>
                    </ScheduleContainer>
                    <QuestionContainer>
                        <Txt variant="h5">무엇이 궁금한가요?*</Txt>
                        <Textarea
                            value={requestInfo.question}
                            placeholder="20자-200자 이내로 작성해주세요"
                            onChange={handleTextChange}
                        />
                    </QuestionContainer>
                    <ButtonContainer>
                        <Button text="완료" disabled={false} type="accept" onClick={handleSubmit} />
                    </ButtonContainer>
                </RequestContainer>
                <SelectScheduleModal isOpen={isScheduleSelected} onClose={handleCloseModal} />
                {isScheduleSelected && <Overlay />}
            </BabRequestPageContainer>
            {isOpenPopup && (
                <Overlay>
                    <Popup
                        text="밥약을 요청했어요!"
                        closePopup={handleClosePopup}
                        button={<Button text="확인" onClick={() => navigate('/notification')} />}
                    />
                </Overlay>
            )}
        </>
    );
}

const BabRequestPageContainer = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
`;
const RequestContainer = styled.div`
    width: 100%;
    padding: 0 20px;
    margin-top: 25px;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TextBox = styled.div`
    width: 100%;
    margin-bottom: 25px;
`;

const ScheduleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px 12px;
    gap: 12px;
`;

const ScheduleBoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const QuestionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 60px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    margin: 40px 0;
`;
