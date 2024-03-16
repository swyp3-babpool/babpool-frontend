import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';
import NotificationCard from '@/components/notification/NotificationCard';
import Header from '@/components/common/header';
import { SentBabAppointmentType, ReceivedBabAppointmentType } from '@/interface/api/notifications';
import { useQuery } from '@tanstack/react-query';
import {
    getReceivedBabAppointment,
    getSentBabAppointment,
} from '@/api/notification/notificationApi';
import { Col } from '@/components/common/flex/Flex';
import { getDate, getDateTime } from '@/utils/util';
import {
    GridContainer,
    NotificationPageContainer,
    TabBar,
    TabBarContainer,
    TabBarTextContainer,
    TextButtonContainer,
} from './NotificationPage.styles';

export default function NotificationPage() {
    const {
        data: sentList,
        isError: isErrorSent,
        isLoading: isLoadingSent,
    } = useQuery<SentBabAppointmentType[]>({
        queryKey: [`/api/appointment/list/send`],
        queryFn: () => getSentBabAppointment(),
    });

    const {
        data: receivedList,
        isError: isErrorReceived,
        isLoading: isLoadingReceived,
    } = useQuery<ReceivedBabAppointmentType[]>({
        queryKey: [`/api/appointment/list/receive`],
        queryFn: () => getReceivedBabAppointment(),
    });

    const navigate = useNavigate();
    const [selected, setSelected] = useState('received');
    const [appoinmentId, setAppoinmentId] = useState();

    const handleSelectedToggle = (select: string) => {
        setSelected(select);
    };

    const handleNotificationCardClick = (state: string, appointmentId: number) => {
        navigate(`/notification/${selected}`, { state: { state, appointmentId } });
    };

    useEffect(() => {
        console.log('sentList', sentList);
        console.log('receivedList', receivedList);
    });

    return (
        <NotificationPageContainer>
            <Header text="밥약 알림" destination="/" />
            <TabBarTextContainer>
                <TextButtonContainer>
                    <Txt
                        variant={selected === 'received' ? 'h5' : 'body'}
                        align="center"
                        color={selected === 'received' ? colors.purple_light_40 : colors.white_30}
                        style={{ width: '100%' }}
                        onClick={() => handleSelectedToggle('received')}
                    >
                        받은 밥약
                    </Txt>
                </TextButtonContainer>
                <TextButtonContainer>
                    <Txt
                        variant={selected === 'sent' ? 'h5' : 'body'}
                        align="center"
                        color={selected === 'sent' ? colors.purple_light_40 : colors.white_30}
                        style={{ width: '100%' }}
                        onClick={() => handleSelectedToggle('sent')}
                    >
                        보낸 밥약
                    </Txt>
                </TextButtonContainer>
            </TabBarTextContainer>
            <TabBarContainer>
                <TabBar selected={selected === 'received'} />
                <TabBar selected={selected === 'sent'} />
            </TabBarContainer>
            {(selected === 'received' && receivedList === undefined) ||
            (selected === 'sent' && sentList === undefined) ? (
                <Col padding="100px 0" justifyContent="center" alignItems="">
                    <Txt variant="caption1" color={colors.white_30} align="center">
                        아직 {selected === 'received' ? '받은' : '보낸'} 밥약이 없어요
                    </Txt>
                </Col>
            ) : (
                <GridContainer>
                    {selected === 'received'
                        ? Array.isArray(receivedList) &&
                          receivedList?.map((item) => (
                              <NotificationCard
                                  key={item.appointmentId}
                                  type={item.appointmentStatus}
                                  name={item.appointmentSenderUserNickname}
                                  content={
                                      item.appointmentStatus === 'WAITING'
                                          ? '수락 대기중'
                                          : getDateTime(item.appointmentFixDateTime)
                                  }
                                  image={item.appointmentSenderProfileImageUrl}
                                  onClick={() =>
                                      handleNotificationCardClick(
                                          item.appointmentStatus,
                                          item.appointmentId
                                      )
                                  }
                              />
                          ))
                        : Array.isArray(sentList) &&
                          sentList?.map((item) => (
                              <NotificationCard
                                  key={item.appointmentId}
                                  type={item.appointmentStatus}
                                  name={item.appointmentReceiverUserNickname}
                                  content={
                                      item.appointmentStatus === 'WAITING'
                                          ? '수락 대기중'
                                          : getDateTime(item.appointmentFixDateTime)
                                  }
                                  image={item.appointmentReceiverProfileImageUrl}
                                  onClick={() =>
                                      handleNotificationCardClick(
                                          item.appointmentStatus,
                                          item.appointmentId
                                      )
                                  }
                              />
                          ))}
                </GridContainer>
            )}
        </NotificationPageContainer>
    );
}
