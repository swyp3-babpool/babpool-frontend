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
} from './HistoryPage.styles';
import Txt from '@/components/common/text';
import NotificationCard from '@/components/notification/NotificationCard';
import Header from '@/components/common/header';

export default function HistoryPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<'complete' | 'reject' | 'accept' | 'waiting'>(
        'complete'
    );

    const handleSelectedToggle = (select: 'complete' | 'reject' | 'accept' | 'waiting') => {
        setSelected(select);
    };

    const handleNotificationCardClick = () => {
        navigate(`/mypage/history/${selected}`);
    };

    return (
        <NotificationPageContainer>
            <Header text="밥약 히스토리" />
            <TabBarTextContainer>
                <TextButtonContainer>
                    <Txt
                        variant={selected === 'complete' ? 'h5' : 'body'}
                        align="center"
                        color={selected === 'complete' ? colors.purple_light_40 : colors.white_30}
                        style={{ width: '100%' }}
                        onClick={() => handleSelectedToggle('complete')}
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
                <TabBar selected={selected === 'complete'} />
                <TabBar selected={selected === 'reject'} />
            </TabBarContainer>
            <GridContainer>
                <NotificationCard
                    type="waiting"
                    name="이름"
                    content="후기 작성하기"
                    onClick={handleNotificationCardClick}
                />
                <NotificationCard type={selected} name="이름" content="2023년" />
                <NotificationCard type={selected} name="이름" content="2023년" />
                <NotificationCard type={selected} name="이름" content="2023년" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
                <NotificationCard type={selected} name="이름" content="개인 사유" />
            </GridContainer>
        </NotificationPageContainer>
    );
}
