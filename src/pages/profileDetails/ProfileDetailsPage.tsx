import Button from '@/components/common/button';
import Header from '@/components/common/header';
import Keyword from '@/components/common/keyword/Keyword';
import Review from '@/components/common/review/Review';
import ReviewCount from '@/components/common/review/ReviewCount';
import Txt from '@/components/common/text';
import ProfileBox from '@/components/profile/ProfileBox';
import { useNavigation } from '@/hooks/useNavigation';
import { styled } from 'styled-components';
import { ReactComponent as RightArrorIcon } from '@/assets/icons/ic_right_arrow.svg';
import { colors } from '@/assets/styles/theme';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProfileDetailsType } from '@/interface/api/profileDetailsType';
import { getDivisionName } from '@/utils/util';
import { getUserProfile } from '@/api/profile/profileApi';
import Loading from '@/components/common/loading/Loading';

export default function ProfileDetailsPage() {
    const { navigate } = useNavigation();
    const { userId } = useParams();

    const {
        data: profile,
        isError,
        isLoading,
    } = useQuery<ProfileDetailsType>({
        queryKey: [`api/profile/detail/${userId}`],
        queryFn: () => getUserProfile(userId as string),
    });

    const reviewCount = profile && [
        profile.reviewCount.best,
        profile.reviewCount.good,
        profile.reviewCount.bad,
    ];

    return (
        <ProfileDetailsPageContainer>
            <Header text="프로필카드 보기" />
            {
                !isLoading && profile && reviewCount ? (
                    <ContentSection>
                <ProfileBoxContainer>
                    <ProfileBox
                        name={profile.name}
                        url={profile.profileImg}
                        group={getDivisionName(profile.grade)}
                        nameType="column"
                    />
                </ProfileBoxContainer>
                <ContentBox>
                    <Txt variant="h5">{profile.intro}</Txt>
                    <Txt variant="caption1">{profile.contents}</Txt>
                </ContentBox>
                <KeywordContainer>
                    <Txt variant="h5">관심 키워드</Txt>
                    <KeywordList>
                        {profile.keywords.map((keyword: string) => (
                            <Keyword
                                key={keyword}
                                name={keyword}
                                ischecked={true}
                                disabled={true}
                                onChange={() => {}}
                            />
                        ))}
                    </KeywordList>
                </KeywordContainer>
                <ReviewContainer>
                    <ReviewTitleBox>
                        <Txt variant="h5">{'조민택'}님이 받은 후기</Txt>
                        <ReviewDetailsBox onClick={() => navigate('review')}>
                            <Txt variant="caption1" color={colors.white_50}>
                                더보기
                            </Txt>
                            <RightArrorIcon />
                        </ReviewDetailsBox>
                    </ReviewTitleBox>
                    <ReviewCountContainer>
                        {['최고예요', '좋아요', '별로예요'].map((text, i) => (
                            <ReviewCount key={text} text={text} count={reviewCount[i]} />
                        ))}
                    </ReviewCountContainer>
                    <ReviewTextContainer>
                        {profile.reviews.length > 0 ? (
                            profile.reviews.map((review, i) => {
                                if(i > 2) return
                                return (
                                    <Review key={review.reviewId} text={review.reviewComment} />
                                )})
                        ) : (
                            <>
                                <Txt variant='caption1' color={colors.white_30}>아직 후기가 없어요</Txt>

                            </>
                        )}
                    </ReviewTextContainer>
                </ReviewContainer>
                <ButtonBox>
                    <Button text="밥약 요청" onClick={() => navigate(`/total/profile/${userId}-${profile.name}/request`)} />
                </ButtonBox>
            </ContentSection>
                )
                : (
                    <Loading />
                )
            }
            
        </ProfileDetailsPageContainer>
    ) 
}

const ProfileDetailsPageContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

const ContentSection = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

const ProfileBoxContainer = styled.div`
    width: 100%;
    margin-top: 25px;
`;

const ContentBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 30px;
`;

const KeywordContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 12px;
`;

const KeywordList = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const ReviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
`;

const ReviewTitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ReviewDetailsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 10px;
    cursor: pointer;
`;

export const ReviewCountContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 5px;
`;

export const ReviewTextContainer = styled.div`
    width: 100%;
    max-height: 580px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 0 18px;
    margin-top: 14px;
    overflow-y: auto;
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    margin-bottom: 40px;
    padding: 0 13px;
`;
