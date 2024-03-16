import { useEffect, useState } from 'react';
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
import { GetMypageType } from '@/interface/mypageType';
import { useQuery } from '@tanstack/react-query';
import { getMypageInfo } from '@/api/profile/mypageApi';
import { getDate, getDateTime, getDivisionName, getReviewType } from '@/utils/util';

export default function MyPage() {
    const navigate = useNavigate();

    const {
        data: mypageInfo,
        isError: isError,
        isLoading: isLoading,
    } = useQuery<GetMypageType>({
        queryKey: [`/api/user/mypage`],
        queryFn: () => getMypageInfo(),
    });

    const handleModifyProfileButtonClick = () => {
        navigate('/mypage/profile-modify', { state: mypageInfo?.profileId });
    };

    const handleDeleteAccountButtonClick = () => {
        navigate('/deleteAccount');
    };

    return (
        <MyPageContainer>
            <ProfileContainer>
                <Header text="마이페이지" destination="/" />
                <ProfileBox
                    url={mypageInfo?.profileImg}
                    name={mypageInfo?.name}
                    group={getDivisionName(mypageInfo?.grade || '')}
                    content={mypageInfo?.intro ? mypageInfo?.intro : ''}
                    textColor={colors.white}
                    padding="25px 30px 16px"
                />
                <ProfileKeywords
                    keywords={mypageInfo?.keywords}
                    color={colors.white}
                    padding="0px 30px"
                />
                <ProfileModifyButton onClick={handleModifyProfileButtonClick}>
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
                        style={{ width: 'auto', cursor: 'pointer' }}
                        alignItems="center"
                        gap={4}
                        justifyContent="flex-end"
                        onClick={() => navigate('/mypage/history')}
                    >
                        <Txt variant="caption1" color={colors.black}>
                            더보기
                        </Txt>
                        <RightIconContainer>
                            <RightIcon />
                        </RightIconContainer>
                    </Row>
                </Row>
                {mypageInfo?.histories === undefined || mypageInfo?.histories.length === 0 ? (
                    <Col
                        gap={16}
                        padding="24px 0 20px 0"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Txt variant="caption2" color={colors.white_20}>
                            밥약 히스토리가 없어요!
                            <br />
                            원하는 밥풀러를 찾아보시겠어요?
                        </Txt>
                        <Txt
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            variant="caption2"
                            color={colors.purple_light_40}
                            onClick={() => navigate('/total')}
                        >
                            밥풀 전체보기
                        </Txt>
                    </Col>
                ) : (
                    <Row gap={16}>
                        {mypageInfo?.histories.map((history) => (
                            <NotificationCard
                                key={history.appointmentId}
                                type={history.appointmentStatus}
                                reviewRequired={false}
                                name={history.appointmentReceiverUserNickname}
                                content={getDateTime(history.appointmentFixDateTime)}
                            />
                        ))}
                    </Row>
                )}
            </Col>
            <Row padding="0 30px">
                <Devider />
            </Row>

            <Col gap={16} padding="30px 20px">
                <Row padding="0 5px" alignItems="center" justifyContent={'space-between'}>
                    <Txt variant="h5" color={colors.black}>
                        내가 받은 후기
                    </Txt>
                    <Row
                        style={{ width: 'auto', cursor: 'pointer' }}
                        alignItems="center"
                        gap={4}
                        justifyContent="flex-end"
                        onClick={() =>
                            navigate('/mypage/my-received-reviews', {
                                state: mypageInfo?.profileId,
                            })
                        }
                    >
                        <Txt variant="caption1" color={colors.black}>
                            더보기
                        </Txt>
                        <RightIconContainer>
                            <RightIcon />
                        </RightIconContainer>
                    </Row>
                </Row>
                <Row gap={12} padding="0 10px">
                    {Object.entries(mypageInfo?.reviewCount || {}).map(([key, value]) => (
                        <ReviewCount key={key} text={getReviewType(key)} count={value} />
                    ))}
                </Row>
            </Col>

            <Row padding="0">
                <ThickDevider />
            </Row>
            <Row padding="0" justifyContent="flex-end">
                <DeleteAccountButton onClick={handleDeleteAccountButtonClick}>
                    <Txt variant="caption2" color={colors.white_30}>
                        회원탈퇴
                    </Txt>
                </DeleteAccountButton>
            </Row>
        </MyPageContainer>
    );
}
