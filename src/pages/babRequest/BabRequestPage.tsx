import { appointmentRequest, getAvailableSchedule } from '@/api/babRequest/babRequestApi';
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
import { UserScheduleType } from '@/interface/api/babRequestType';
import { SELECT_TIME_SCHEDULE } from '@/utils/constant';
import { getMonthFormatDate } from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

type RequestInfoType = {
    targetProfileId: number;
    possibleTimeIdList: UserScheduleType[];
    questionContents: string;
};

export default function BabRequestPage() {
    const { targetProfileIdAndName } = useParams();
    const targetProfileId = targetProfileIdAndName?.split('-')[0];
    const targetProfileName = targetProfileIdAndName?.split('-')[1];

    const [isScheduleSelected, setIsScheduleSelected] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isRequestValidate, setIsRequestValidate] = useState(false);
    const [selectScheduleBoxKey, setSelectScheduleBoxKey] = useState<number | null>(null);
    const [requestInfo, setRequestInfo] = useState<RequestInfoType>({
        targetProfileId: Number(targetProfileId),
        possibleTimeIdList: [],
        questionContents: '',
    });

    const { navigate } = useNavigation();

    const handleOpenModal = (key: number) => {
        setIsScheduleSelected(true);
        setSelectScheduleBoxKey(key);
    };

    const handleCloseModal = () => {
        setIsScheduleSelected(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRequestInfo({ ...requestInfo, questionContents: e.target.value });
    };

    const handleSelectSchedule = (selectedSchedule: UserScheduleType) => {
        setRequestInfo((prev) => {
            const newPossibleTimeList = [...prev.possibleTimeIdList];
            newPossibleTimeList[selectScheduleBoxKey as number] = selectedSchedule;
            return {
                ...prev,
                possibleTimeIdList: newPossibleTimeList,
            };
        });
        handleCloseModal();
    };

    const handleSubmit = () => {
        const reqBody = {
            ...requestInfo,
            possibleTimeIdList: requestInfo.possibleTimeIdList.map((item) => item.possibleTimeId),
        };
        console.log(reqBody);
        appointmentRequest(reqBody).then((res) => {
            console.log(res);
            if (res.code === 200) {
                console.log('밥약 요청 완료');
                setIsOpenPopup(true);
            }
        });
    };

    const handleClosePopup = () => {
        setIsOpenPopup(false);
    };

    useEffect(() => {
        if (requestInfo.questionContents.length > 200) {
            setRequestInfo((prev) => ({
                ...prev,
                questionContents: prev.questionContents.slice(0, 200),
            }));
        }
        if (
            requestInfo.possibleTimeIdList.length > 0 &&
            requestInfo.questionContents.length >= 20 &&
            requestInfo.questionContents.length <= 200
        ) {
            setIsRequestValidate(true);
        } else {
            setIsRequestValidate(false);
        }
    }, [requestInfo]);

    return (
        targetProfileId && targetProfileName && (
            <>
                <BabRequestPageContainer>
                    <Header />
                    <RequestContainer>
                        <TextBox>
                            <Txt variant="h3" styles={{ marginBottom: '25px' }}>
                                {targetProfileName}님께 밥약 요청하기
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
                                    selectText={
                                        requestInfo.possibleTimeIdList.length >= 1
                                            ? `${getMonthFormatDate(
                                                  requestInfo.possibleTimeIdList[0].possibleDate
                                              )} ${String(
                                                  SELECT_TIME_SCHEDULE[
                                                      requestInfo.possibleTimeIdList[0]
                                                          .possibleTime as keyof typeof SELECT_TIME_SCHEDULE
                                                  ]
                                              )}`
                                            : ''
                                    }
                                    onClick={() => handleOpenModal(0)}
                                />
                                {requestInfo.possibleTimeIdList.length >= 1 && (
                                    <ScheduleBox
                                        defaultText="두 번째 일정 선택하기"
                                        selectText={
                                            requestInfo.possibleTimeIdList.length >= 2
                                                ? `${getMonthFormatDate(
                                                      requestInfo.possibleTimeIdList[1].possibleDate
                                                  )} ${String(
                                                      SELECT_TIME_SCHEDULE[
                                                          requestInfo.possibleTimeIdList[1]
                                                              .possibleTime as keyof typeof SELECT_TIME_SCHEDULE
                                                      ]
                                                  )}`
                                                : ''
                                        }
                                        onClick={() => handleOpenModal(1)}
                                    />
                                )}
                                {requestInfo.possibleTimeIdList.length >= 2 && (
                                    <ScheduleBox
                                        defaultText="세 번째 일정 선택하기"
                                        selectText={
                                            requestInfo.possibleTimeIdList.length >= 3
                                                ? `${getMonthFormatDate(
                                                      requestInfo.possibleTimeIdList[2].possibleDate
                                                  )} ${String(
                                                      SELECT_TIME_SCHEDULE[
                                                          requestInfo.possibleTimeIdList[2]
                                                              .possibleTime as keyof typeof SELECT_TIME_SCHEDULE
                                                      ]
                                                  )}`
                                                : ''
                                        }
                                        onClick={() => handleOpenModal(2)}
                                    />
                                )}
                            </ScheduleBoxContainer>
                        </ScheduleContainer>
                        <QuestionContainer>
                            <Txt variant="h5">무엇이 궁금한가요?*</Txt>
                            <Textarea
                                value={requestInfo.questionContents}
                                placeholder="20자-200자 이내로 작성해주세요"
                                onChange={handleTextChange}
                            />
                        </QuestionContainer>
                        <ButtonContainer>
                            <Button
                                text="완료"
                                type={isRequestValidate ? 'accept' : 'refuse'}
                                disabled={!isRequestValidate}
                                onClick={handleSubmit}
                            />
                        </ButtonContainer>
                    </RequestContainer>
                    <SelectScheduleModal
                        isOpen={isScheduleSelected}
                        userId={Number(targetProfileId)}
                        handleSelectSchedule={handleSelectSchedule}
                        onClose={handleCloseModal}
                    />
                    {isScheduleSelected && <Overlay />}
                </BabRequestPageContainer>
                {isOpenPopup && (
                    <Overlay>
                        <Popup
                            text="밥약을 요청했어요!"
                            closePopup={handleClosePopup}
                            button={
                                <Button text="확인" onClick={() => navigate('/notification')} />
                            }
                        />
                    </Overlay>
                )}
            </>
        )
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
