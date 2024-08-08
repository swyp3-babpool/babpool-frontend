import { appointmentRequest, getAvailableSchedule } from '@/api/babRequest/babRequestApi';
import { getModifyProfileAvailableSchedule } from '@/api/profile/modifyProfileApi';
import { colors } from '@/assets/styles/theme';
import { alarmInfoState } from '@/atom/alarminfo';
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
import { getMonthFormatDate, getMonthFormatMonth } from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

export type RequestInfoType = {
    targetProfileId: string;
    possibleDateTime: string;
    appointmentContent: string;
};

export default function BabRequestPage() {
    const { targetProfileIdAndName } = useParams();
    console.log(targetProfileIdAndName);
    const targetProfileId = targetProfileIdAndName?.split('-')[0];
    const targetProfileName = targetProfileIdAndName?.split('-')[1];
    const [isScheduleSelected, setIsScheduleSelected] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isRequestValidate, setIsRequestValidate] = useState(false);
    const [selectScheduleBoxKey, setSelectScheduleBoxKey] = useState<number | null>(null);
    const [requestInfo, setRequestInfo] = useState<RequestInfoType>({
        targetProfileId: targetProfileId as string,
        possibleDateTime: '',
        appointmentContent: '',
    });
    const {
            data: userSchedule,
            isError: isLoadingPossibleTime,
            isLoading: isErrorPossibleTime,
        } = useQuery<GetModifyProfilePossibleTimeType[]>({
            queryKey: [`/api/possible/datetime/${Number(targetProfileId)}`, targetProfileId],
            queryFn: () => getModifyProfileAvailableSchedule(targetProfileId as string),
            enabled: !!targetProfileId,
        });

    const possibleAppointmentTime = userSchedule
        ? userSchedule
            .filter((item) => item.possibleDateTimeStatus === "AVAILABLE")
            .map((item) => item.possibleDateTime)
        : [];


    const [possibleDate, setPossibleDate] = useState<string[]>([]);

    const alarmInfo = useRecoilValue(alarmInfoState);

    const { navigate } = useNavigation();

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
            return {
                ...prev,
                possibleTimeIdList: selectedSchedule[0],
            };
        });
        handleCloseModal();
        
    };

    const handleSubmit = () => {
        const reqBody = {
            ...requestInfo, ...possibleDate
        };
        console.log(reqBody);
        // appointmentRequest(reqBody).then((res) => {
        //     console.log(res);
        //     if (res.code === 200) {
        //         console.log('밥약 요청 완료');
        //         setIsOpenPopup(true);
        //     }
        // });
    };

    const handleClosePopup = () => {
        setIsOpenPopup(false);
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
                                    // selectText={
                                    //     requestInfo.possibleDateTime.length >= 1
                                    //         ? `${getMonthFormatDate(
                                    //               requestInfo.possibleDateTime
                                    //           )} ${String(
                                    //               SELECT_TIME_SCHEDULE[
                                    //                   getMonthFormatMonth(
                                    //                       requestInfo.possibleDateTime
                                    //                   ) as keyof typeof SELECT_TIME_SCHEDULE
                                    //               ]
                                    //           )}`
                                    //         : ''
                                    // }
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
                        initialDates={possibleAppointmentTime}
                        selectedDates={possibleDate}
                        setSelectedDates={setPossibleDate}
                        isOpen={isScheduleSelected}
                        onClose={handleCloseModal}
                    />
                    {/* <SelectScheduleModal
                        isOpen={isScheduleSelected}
                        userId={Number(targetProfileId)}
                        requestInfo={requestInfo}
                        handleSelectSchedule={handleSubmit}
                        onClose={handleCloseModal}
                    /> */}
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
