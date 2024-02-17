import { useState } from 'react';
import { colors } from '@/assets/styles/theme';
import {
    BackButton,
    EmptyDiv,
    GridContainer,
    Header,
    NotificationPageContainer,
    TabBar,
    TabBarContainer,
    TabBarTextContainer,
} from './NotificationPage.styles';
import { ReactComponent as LeftArrowIcon } from '@/assets/icons/ic_back.svg';
import Txt from '@/components/common/text';
import NotificationCard from '@/components/notification/NotificationCard';

export default function NotificationPage() {
    const [selected, setSelected] = useState('received');

    const handleSelectedToggle = () => {
        setSelected(selected === 'received' ? 'sent' : 'received');
    };
    return (
        <NotificationPageContainer>
            <Header>
                <BackButton>
                    <LeftArrowIcon />
                </BackButton>
                <Txt variant="h4">밥약 알림</Txt>
                <EmptyDiv />
            </Header>
            <TabBarTextContainer>
                <Txt
                    variant="h5"
                    align="center"
                    color={selected === 'received' ? colors.purple_light_40 : colors.white_30}
                    style={{ width: '100%' }}
                    onClick={handleSelectedToggle}
                >
                    받은 밥약
                </Txt>
                <Txt
                    variant="body"
                    align="center"
                    color={selected === 'sent' ? colors.purple_light_40 : colors.white_30}
                    style={{ width: '100%' }}
                    onClick={handleSelectedToggle}
                >
                    보낸 밥약
                </Txt>
            </TabBarTextContainer>
            <TabBarContainer>
                <TabBar selected={selected === 'received'} />
                <TabBar selected={selected === 'sent'} />
            </TabBarContainer>
            <GridContainer>
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
                <NotificationCard name="이름" content="2023년" />
            </GridContainer>
        </NotificationPageContainer>
    );
}
