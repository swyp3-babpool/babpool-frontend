import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import {
    GridContainer,
    NotificationPageContainer,
    TabBar,
    TabBarContainer,
    TabBarTextContainer,
    TextButtonContainer,
} from './HistoryPage.styles';
import Txt from '@/components/common/text';
import NotificationCard from '@/components/notification/NotificationCard';
import Header from '@/components/common/header';
import { useQuery } from '@tanstack/react-query';
import { HistoryType, RejectHistoryType } from '@/interface/mypageType';
import { getAcceptHistory, getRejectHistory } from '@/api/profile/mypageApi';
import { Col } from '@/components/common/flex/Flex';
import { getDate, getDateTime } from '@/utils/util';

export default function HistoryPage() {
    const navigate = useNavigate();

    const {
        data: doneList,
        isError: isErrorDone,
        isLoading: isLoadingDone,
    } = useQuery<HistoryType[]>({
        queryKey: [`/api/appointment/list/done`],
        queryFn: () => getAcceptHistory(),
    });

    const {
        data: rejectList,
        isError: isErrorReject,
        isLoading: isLoadingReject,
    } = useQuery<RejectHistoryType[]>({
        queryKey: [`/api/appointment/list/refuse`],
        queryFn: () => getRejectHistory(),
    });

    const [selected, setSelected] = useState('done');

    const handleSelectedToggle = (select: string) => {
        setSelected(select);
    };

    const handleNotificationCardClick = (review: boolean) => {
        if (review) {
            navigate('/mypage/review');
        }
    };

    useEffect(() => {
        console.log('doneList', doneList);
        console.log('rejectList', rejectList);
    }, [doneList, rejectList]);

    return (
        <NotificationPageContainer>
            <Header text="밥약 히스토리" />
            <TabBarTextContainer>
                <TextButtonContainer>
                    <Txt
                        variant={selected === 'done' ? 'h5' : 'body'}
                        align="center"
                        color={selected === 'done' ? colors.purple_light_40 : colors.white_30}
                        style={{ width: '100%' }}
                        onClick={() => handleSelectedToggle('done')}
                    >
                        완료
                    </Txt>
                </TextButtonContainer>
                <TextButtonContainer>
                    <Txt
                        variant={selected === 'reject' ? 'h5' : 'body'}
                        align="center"
                        color={selected === 'reject' ? colors.purple_light_40 : colors.white_30}
                        style={{ width: '100%' }}
                        onClick={() => handleSelectedToggle('reject')}
                    >
                        거절
                    </Txt>
                </TextButtonContainer>
            </TabBarTextContainer>
            <TabBarContainer>
                <TabBar selected={selected === 'done'} />
                <TabBar selected={selected === 'reject'} />
            </TabBarContainer>
            {(selected === 'done' && doneList === undefined) ||
            (selected === 'reject' && rejectList === undefined) ? (
                <Col padding="100px 0" justifyContent="center" alignItems="">
                    <Txt variant="caption1" color={colors.white_30} align="center">
                        아직 {selected === 'done' ? '완료된' : '거절한'} 밥약 히스토리가 없어요
                    </Txt>
                </Col>
            ) : (
                <GridContainer>
                    {selected === 'done'
                        ? doneList &&
                          doneList?.map((item) => (
                              <NotificationCard
                                  key={item.appointmentId}
                                  type={item.appointmentStatus}
                                  name={item.appointmentReceiverUserNickname}
                                  content={
                                      item.reviewRequired === 'REVIEW_REQUIRED'
                                          ? '후기 보내기'
                                          : getDateTime(item.appointmentFixDateTime)
                                  }
                                  image={item.appointmentReceiverProfileImageUrl}
                                  onClick={() =>
                                      handleNotificationCardClick(
                                          item.reviewRequired === 'REVIEW_REQUIRED'
                                      )
                                  }
                              />
                          ))
                        : rejectList &&
                          rejectList?.map((item) => (
                              <NotificationCard
                                  key={item.appointmentId}
                                  type={item.appointmentStatus}
                                  name={item.appointmentReceiverUserNickname}
                                  content={item.refuseType ? '개인 사유' : '시간 만료'}
                                  image={item.appointmentReceiverProfileImageUrl}
                              />
                          ))}
                </GridContainer>
            )}
        </NotificationPageContainer>
    );
}
