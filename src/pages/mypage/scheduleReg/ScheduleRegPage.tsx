import Header from '@/components/common/header';
import React, { useState } from 'react';
import { AddPossibleTimeButton, ScheduleRegPageContainer } from './ScheduleRegPage.styles';
import { Col } from '@/components/common/flex/Flex';
import Txt from '@/components/common/text';
import { colors } from '@/assets/styles/theme';
import { TimeRange } from '@/interface/api/modifyProfileType';
import { ReactComponent as PlusIcon } from '@/assets/icons/ic_plus.svg';
import SelectPossibleTimeModal from '@/components/modifyProfile/SelectPossibleTimeModal';
import Overlay from '@/components/common/overlay';

export default function ScheduleRegPage() {

    const [possibleDate, setPossibleDate] = useState<TimeRange>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                </Col>
                <SelectPossibleTimeModal
                    selectedDates={possibleDate}
                    setSelectedDates={setPossibleDate}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
                {
                    isModalOpen && <Overlay />
                }
        </ScheduleRegPageContainer>
    );
}

