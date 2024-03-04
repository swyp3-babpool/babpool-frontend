import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import Txt from '@/components/common/text';
import { ReactComponent as ProfileModifyIcon } from '@/assets/icons/ic_modify.svg';
import { ReactComponent as RightIcon } from '@/assets/icons/ic_right_chevron.svg';
import {
    MyPageContainer,
    Devider,
    IconContainer,
    ThickDevider,
    ProfileContainer,
    ProfileModifyButton,
    RightIconContainer,
    DeleteAccountButton,
} from './Mypage.styles';
import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Header from '@/components/common/header';
import NotificationCard from '@/components/notification/NotificationCard';
import ReviewCount from '@/components/common/review/ReviewCount';

export default function MyPage() {
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);
    return (
        <MyPageContainer>
            <ProfileContainer>
                <Header text="마이페이지" />
                <ProfileBox
                    name="송채영"
                    group="대학생"
                    content="대학생활 고민 같이 나누며 이야기 해요!"
                    textColor={colors.white}
                    padding="25px 30px 16px"
                />
                <ProfileKeywords keywords={keywords} color={colors.white} padding="0px 30px" />
                <ProfileModifyButton>
                    <IconContainer>
                        <ProfileModifyIcon />
                    </IconContainer>
                    <Txt variant="caption2" color={colors.black}>
                        프로필카드 수정
                    </Txt>
                </ProfileModifyButton>
            </ProfileContainer>
            <Col gap={16} padding="30px 20px">
                <Row padding="0 5px" alignItems="center" justifyContent={'space-between'}>
                    <Txt variant="h5" color={colors.black}>
                        밥약 히스토리
                    </Txt>
                    <Row
                        style={{ width: 'auto' }}
                        alignItems="center"
                        gap={4}
                        justifyContent="flex-end"
                    >
                        <Txt variant="caption1" color={colors.black}>
                            더보기
                        </Txt>
                        <RightIconContainer>
                            <RightIcon />
                        </RightIconContainer>
                    </Row>
                </Row>
                <Row gap={16}>
                    <NotificationCard type="accept" name="이름" content="2023년" />
                    <NotificationCard type="accept" name="이름" content="2023년" />
                </Row>
            </Col>
            <Devider />
            <Col gap={16} padding="30px 20px">
                <Row padding="0 5px" alignItems="center" justifyContent={'space-between'}>
                    <Txt variant="h5" color={colors.black}>
                        내가 받은 후기
                    </Txt>
                    <Row
                        style={{ width: 'auto' }}
                        alignItems="center"
                        gap={4}
                        justifyContent="flex-end"
                    >
                        <Txt variant="caption1" color={colors.black}>
                            더보기
                        </Txt>
                        <RightIconContainer>
                            <RightIcon />
                        </RightIconContainer>
                    </Row>
                </Row>
                <Row gap={12}>
                    {['최고예요', '좋아요', '별로예요'].map((text) => (
                        <ReviewCount key={text} text={text} count={1} />
                    ))}
                </Row>
            </Col>
            <ThickDevider />
            <DeleteAccountButton>
                <Txt variant="caption2" color={colors.white_30}>
                    회원탈퇴
                </Txt>
            </DeleteAccountButton>
        </MyPageContainer>
    );
}
