import { appointmentRequest, getAvailableSchedule } from '@/api/babRequest/babRequestApi';
import { getModifyProfileAvailableSchedule } from '@/api/profile/modifyProfileApi';
import { colors } from '@/assets/styles/theme';
import { alarmInfoState, noPossibleDateAlarm } from '@/atom/alarminfo';
import SelectScheduleModal from '@/components/babpoolRequest/SelectScheduleModal';
import AlarmModal from '@/components/common/alarm/AlarmModal';
import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import ScheduleBox from '@/components/common/schedule/ScheduleBox';
import Txt from '@/components/common/text';
import Textarea from '@/components/common/textarea/Textarea';
import SelectPossibleTimeModal from '@/components/modifyProfile/SelectPossibleTimeModal';
import { useNavigation } from '@/hooks/useNavigation';
import { UserScheduleType } from '@/interface/api/babRequestType';
import { GetModifyProfilePossibleTimeType } from '@/interface/api/modifyProfileType';
import { SELECT_TIME_SCHEDULE } from '@/utils/constant';
import { getHour, getMonthFormatDate, getMonthFormatMonth } from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

export type RequestInfoType = {
    targetProfileId: string;
    possibleDateTime: string;
    appointmentContent: string;
};

export default function BabRequestPage() {
    const { targetProfileIdAndName } = useParams();
    const targetProfileId = targetProfileIdAndName?.split('-')[0];
    const targetProfileName = targetProfileIdAndName?.split('-')[1];
    const [isScheduleSelected, setIsScheduleSelected] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isNotificationPopupOpen, setNotificationPopupOpen] = useState(false);
    const [isAlreadyFinished, setIsAlreadyFinished] = useState(false);
    const [isRequestValidate, setIsRequestValidate] = useState(false);
    const [possibleAppointmentTime, setPossibleAppointmentTime] = useState<
        GetModifyProfilePossibleTimeType[]
    >([]);
    const alertShownRef = useRef(false); // useRef로 alert 중복 방지
    const [selectScheduleBoxKey, setSelectScheduleBoxKey] = useState<number | null>(null);
    const { goHome } = useNavigation();
    const [requestInfo, setRequestInfo] = useState<RequestInfoType>({
        targetProfileId: targetProfileId as string,
        possibleDateTime: '',
        appointmentContent: '',
    });
    const {
        data: userSchedule,
        isLoading: isLoadingPossibleTime,
        refetch: refetchUserSchedule,
    } = useQuery<GetModifyProfilePossibleTimeType[]>({
        queryKey: [`/api/possible/datetime/${Number(targetProfileId)}`, targetProfileId],
        queryFn: () => getModifyProfileAvailableSchedule(targetProfileId as string),
        enabled: !!targetProfileId,
    });

    const alarmInfo = useRecoilValue(alarmInfoState);
    const noPossibleDate = useRecoilValue(noPossibleDateAlarm);

    const { navigate } = useNavigation();
    const setNoPossibleDateAlarm = useSetRecoilState(noPossibleDateAlarm);

    const handleOpenModal = (key: number) => {
        setIsScheduleSelected(true);
        setSelectScheduleBoxKey(key);
    };

    const handleCloseModal = () => {
        setIsScheduleSelected(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRequestInfo({ ...requestInfo, appointmentContent: e.target.value });
    };

    const handleSelectSchedule = (selectedSchedule: string[]) => {
        setRequestInfo((prev) => {
            console.log({
                ...prev,
                possibleDateTime: selectedSchedule[0],
            });
            return {
                ...prev,
                possibleDateTime: selectedSchedule[0],
            };
        });
        handleCloseModal();
    };

    const handleSubmit = () => {
        const reqBody = {
            ...requestInfo,
        };
        if (noPossibleDate) {
            setIsAlreadyFinished(true);

            // 2초 후에 상태를 false로 되돌림
            setTimeout(() => {
                setNoPossibleDateAlarm(false);
            }, 2000);
        }
        appointmentRequest(reqBody).then((res) => {
            console.log(res);
            if (res.code === 200) {
                console.log('밥약 요청 완료');
                setIsOpenPopup(true);
            }
        });
    };

    const renderRequestPopup = () => {
        if (isOpenPopup) {
            return (
                <Overlay>
                    <Popup
                        text="밥약을 요청했어요!"
                        closePopup={() => {
                            setIsOpenPopup(false);
                        }}
                        button={<Button text="확인" onClick={() => navigate('/notification')} />}
                    />
                </Overlay>
            );
        }
        return null;
    };

    const renderNotificationPopup = () => {
        if (isNotificationPopupOpen) {
            return (
                <Overlay>
                    <Popup
                        text="가능한 시간이 없습니다!"
                        closePopup={() => {
                            setNotificationPopupOpen(false);
                        }}
                        button={<Button text="확인" onClick={goHome} />}
                    />
                </Overlay>
            );
        }
        return null;
    };

    const renderAlreadyFinishedPopup = () => {
        if (isAlreadyFinished) {
            return (
                <Overlay>
                    <Popup
                        text="이미 마감된 시간입니다. 시간을 다시 선택해주세요"
                        closePopup={() => {
                            setIsAlreadyFinished(false);
                        }}
                        button={<Button text="확인" onClick={refetchUserSchedule} />}
                    />
                </Overlay>
            );
        }
        return null;
    };

    useEffect(() => {
        const validateStr = requestInfo.appointmentContent.trim();
        if (validateStr.length > 200) {
            setRequestInfo((prev) => ({
                ...prev,
                questionContents: prev.appointmentContent.slice(0, 200),
            }));
        }
        if (
            requestInfo.possibleDateTime.length > 0 &&
            validateStr.length >= 20 &&
            validateStr.length <= 200
        ) {
            setIsRequestValidate(true);
        } else {
            setIsRequestValidate(false);
        }
    }, [requestInfo]);

    useEffect(() => {
        const currentTime = new Date();

        const availableTimes = userSchedule
            ? userSchedule.filter((item) => new Date(item.possibleDateTime) > currentTime)
            : [];

        if (noPossibleDate) {
            setNotificationPopupOpen(true);

            // 2초 후에 상태를 false로 되돌림
            setTimeout(() => {
                setNoPossibleDateAlarm(false);
            }, 2000);
        } else if (availableTimes.length > 0) {
            setPossibleAppointmentTime(availableTimes); // 가능한 시간을 상태로 업데이트
        }
    }, [userSchedule, noPossibleDate]);

    return (
        targetProfileId &&
        targetProfileName && (
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
                                    원하는 일정을 선택해주세요
                                </Txt>
                            </TextContainer>
                            <ScheduleBoxContainer>
                                <ScheduleBox
                                    defaultText="일정 선택하기*"
                                    selectText={
                                        requestInfo.possibleDateTime.length >= 1 && !noPossibleDate
                                            ? `${getMonthFormatDate(
                                                  requestInfo.possibleDateTime
                                              )} ${
                                                  SELECT_TIME_SCHEDULE[
                                                      getHour(requestInfo.possibleDateTime)
                                                  ]
                                              }`
                                            : ''
                                    }
                                    onClick={() => handleOpenModal(0)}
                                />
                            </ScheduleBoxContainer>
                        </ScheduleContainer>
                        <QuestionContainer>
                            <Txt variant="h5">무엇이 궁금한가요?*</Txt>
                            <Textarea
                                value={requestInfo.appointmentContent}
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
                    <SelectPossibleTimeModal
                        page={'appointment'}
                        appointmentDates={possibleAppointmentTime}
                        selectedDates={[]}
                        setSelectedDates={handleSelectSchedule}
                        isOpen={isScheduleSelected}
                        onClose={handleCloseModal}
                        refetchUserSchedule={refetchUserSchedule}
                    />
                    {isScheduleSelected && <Overlay />}
                </BabRequestPageContainer>
                {renderRequestPopup()}
                {renderNotificationPopup()}
                {renderAlreadyFinishedPopup()}
                {alarmInfo.messageType && <AlarmModal messageType={alarmInfo.messageType} />}
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
    overflow-y: auto;
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
