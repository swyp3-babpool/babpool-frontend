import { useState } from 'react';
import { colors } from '@/assets/styles/theme';

import Txt from '@/components/common/text';
import {
    Header,
    BackButton,
    EmptyDiv,
    NotificationDetailPageContainer,
    NotificationDetailPageSection,
} from './NotificationDetailPage.styles';
import { ReactComponent as LeftArrowIcon } from '@/assets/icons/ic_back.svg';
import { useParams } from 'react-router-dom';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';

export default function NotificationDetailPage() {
    const { type } = useParams();
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);
    return (
        <NotificationDetailPageContainer>
            <Header>
                <BackButton>
                    <LeftArrowIcon />
                </BackButton>
                <Txt variant="h4">{type === 'received' ? '받은 밥약' : '보낸 밥약'}</Txt>
                <EmptyDiv />
            </Header>
            <NotificationDetailPageSection>
                <ProfileBox
                    name="송채영"
                    group="대학생"
                    content="대학생활 고민 같이 나누며 이야기 해요!"
                    padding="25px 0px 16px 0px"
                />
                <ProfileKeywords keywords={keywords} />
            </NotificationDetailPageSection>
        </NotificationDetailPageContainer>
    );
}
