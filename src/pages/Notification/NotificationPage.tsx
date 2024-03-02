import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import {
    GridContainer,
    NotificationPageContainer,
    TabBar,
    TabBarContainer,
    TabBarTextContainer,
    TextButtonContainer,
} from './NotificationPage.styles';
import { ReactComponent as LeftArrowIcon } from '@/assets/icons/ic_back.svg';
import Txt from '@/components/common/text';
import NotificationCard from '@/components/notification/NotificationCard';
import Header from '@/components/common/header';

export default function NotificationPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('received');

    const handleSelectedToggle = (select: string) => {
        setSelected(select);
    };

    const handleNotificationCardClick = (state: string) => {
        navigate(`/notification/${selected}?state=${state}`);
    };

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
                <NotificationCard
                    type="waiting"
                    name="이름"
                    content="2023년"
                    onClick={() => handleNotificationCardClick('waiting')}
                />
                <NotificationCard
                    type="accept"
                    name="이름"
                    content="2023년"
                    onClick={() => handleNotificationCardClick('accept')}
                />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
                <NotificationCard type="accept" name="이름" content="2023년" />
            </GridContainer>
        </NotificationPageContainer>
    );
}
