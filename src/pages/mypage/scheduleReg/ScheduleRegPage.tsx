import Header from '@/components/common/header';
import React, { useEffect, useState } from 'react';
import { AddPossibleTimeButton, ScheduleRegPageContainer } from './ScheduleRegPage.styles';
import { Col } from '@/components/common/flex/Flex';
import Txt from '@/components/common/text';
import { colors } from '@/assets/styles/theme';
import { GetModifyProfilePossibleTimeType, TimeRange } from '@/interface/api/modifyProfileType';
import { ReactComponent as PlusIcon } from '@/assets/icons/ic_plus.svg';
import SelectPossibleTimeModal from '@/components/modifyProfile/SelectPossibleTimeModal';
import Overlay from '@/components/common/overlay';
import { getModifyProfileAvailableSchedule } from '@/api/profile/modifyProfileApi';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/hooks/useNavigation';
import Popup from '@/components/common/popup';
import Button from '@/components/common/button';

export default function ScheduleRegPage() {
    const location = useLocation();
    const profileId = location.state as string;
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const {
        data: userSchedule,
        isError: isErrorPossibleTime,
        isLoading: isLoadingPossibleTime,
        refetch: refetchUserSchedule,
    } = useQuery<GetModifyProfilePossibleTimeType[]>({
        queryKey: [`/api/possible/datetime/${profileId}`, profileId],
        queryFn: () => getModifyProfileAvailableSchedule(profileId),
        enabled: !!profileId,
        refetchOnReconnect: true,
    });

    const initialTimes = userSchedule ? userSchedule.map((item) => item.possibleDateTime) : [];
    const [possibleDate, setPossibleDate] = useState<string[]>(
        userSchedule ? [...initialTimes] : []
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (userSchedule) {
            setPossibleDate(initialTimes);
        }
    }, [userSchedule]);

    const handleClosePopup = () => {
        setIsOpenPopup(false);
    };

    const handleOpenPopup = () => {
        setIsOpenPopup(true);
    };

    const { goBack } = useNavigation();
    return (
        <ScheduleRegPageContainer>
            <Header text="일정 등록" destination="/mypage" />
            <Col gap={16} padding="25px 30px 45px">
                <Col gap={8}>
                    <Txt variant="h5" color={colors.black}>
                        밥약이 가능한 시간대*
                    </Txt>
                    <Txt variant="caption2" color={colors.white_30}>
                        밥약이 가능한 시간대를 날짜별로 선택해주세요
                        <br />
                        선택하신 시간대로 밥약 요청이 접수돼요
                    </Txt>
                </Col>
                {!isLoadingPossibleTime && (
                    <AddPossibleTimeButton
                        isExist={Object.keys(possibleDate).length > 0}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {Object.keys(possibleDate).length > 0 ? (
                            <Txt variant="body" color={colors.purple_light_40}>
                                확인/수정하기
                            </Txt>
                        ) : (
                            <PlusIcon />
                        )}
                    </AddPossibleTimeButton>
                )}
            </Col>
            {!isLoadingPossibleTime && (
                <SelectPossibleTimeModal
                    page={'mypage'}
                    initialDates={initialTimes}
                    selectedDates={possibleDate}
                    setSelectedDates={setPossibleDate}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    isAlarmModalOpen={handleOpenPopup}
                    refetchUserSchedule={refetchUserSchedule}
                />
            )}
            {isModalOpen && <Overlay />}
            {isOpenPopup && (
                <Overlay>
                    <Popup
                        text="일정 업데이트가 완료되었습니다"
                        closePopup={handleClosePopup}
                        button={<Button text="확인" onClick={goBack} />}
                    />
                </Overlay>
            )}
        </ScheduleRegPageContainer>
    );
}
