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

    const handleSelectedToggle = (select: string) => {
        setSelected(select);
    };

    const handleNotificationCardClick = (state: string) => {
        navigate(`/notification/${selected}?state=${state}`);
    };

    useEffect(() => {
        console.log('sentList', sentList);
        console.log('receivedList', receivedList);
    });

    return (
        <NotificationPageContainer>
            <Header text="밥약 알림" />
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
            <GridContainer>
                {selected === 'received'
                    ? receivedList &&
                      receivedList?.map((item) => (
                          <NotificationCard
                              key={item.appointmentId}
                              type={item.appointmentStatus === 'ACCEPT' ? 'accept' : 'waiting'}
                              name={item.appointmentSenderUserNickname}
                              content={
                                  item.appointmentStatus === 'ACCEPT'
                                      ? item.appointmentFixDateTime
                                      : '수락 대기중'
                              }
                              image={item.appointmentSenderProfileImageUrl}
                              onClick={() => handleNotificationCardClick(selected)}
                          />
                      ))
                    : sentList &&
                      sentList?.map((item) => (
                          <NotificationCard
                              key={item.appointmentId}
                              type={item.appointmentStatus === 'ACCEPT' ? 'accept' : 'waiting'}
                              name={item.appointmentReceiverUserNickname}
                              content={
                                  item.appointmentStatus === 'ACCEPT'
                                      ? item.appointmentFixDateTime
                                      : '수락 대기중'
                              }
                              image={item.appointmentReceiverProfileImageUrl}
                              onClick={() => handleNotificationCardClick(selected)}
                          />
                      ))}
            </GridContainer>
        </NotificationPageContainer>
    );
}
