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
import { getUserProfile } from '@/api/profile/profileApi';
import { ProfileDetailsType } from '@/interface/api/profileDetailsType';

export default function ProfileDetailsPage() {
    const { navigate } = useNavigation();

    const {userId} = useParams();

    console.log(userId);

    const { data, isError, isLoading } = useQuery<ProfileDetailsType>({
        queryKey: [`profile`, userId],
        queryFn: () => getUserProfile(userId as string),
    });

    console.log(data)

    return (
        <ProfileDetailsPageContainer>
            <Header text="프로필카드 보기" />
            <ContentSection>
                <ProfileBoxContainer>
                    <ProfileBox name="조민택" group="4학년" nameType="column" />
                </ProfileBoxContainer>
                <ContentBox>
                    <Txt variant="h5">대학생활 고민이 있으시면 편하게 이야기해요!</Txt>
                    <Txt variant="caption1">
                        예시 저는 원래 문과 계열의 학부 출신이였습니다. 도중에 데이터 사이언스 관련
                        분야에 관심이 생겨 데이터 관련 전공으로 학부 복수전공을 하게 되었고, 뒤늦게
                        시작했기 때문에 부족한 실력을 채우기 위해 치열하게 공부해왔습니다. 그래서
                        아무것도 없는 '밑바닥'부터 실력을 쌓아 왔기 때문에 저와 같은 상황인 분들의
                        입장이 너무나도 공감이 됩니다. 또한 Data Scientist 또는 ML Engineer로 취업
                        목표를 설정한 이후에 수많은 시행착오를 겪었지만, 포기하지 않고 끊임없이
                        도전하고 노력해오며 현재는 한국을 대표하는 IT 대기업인 카카오 계열사 중 한
                        곳에서 Data Scientist 직무로 재직 중이며 하루하루 성장해 나가고 있습니다. 이
                        쪽 직무를 준비하다 보면 대학원을 가야 할지 말지, 어떤 방향성을 갖고 공부를
                        하고 취업을 해야 할지, 회사에서 요구하는 역량은 무엇인지.. 막막한 것들이 한
                        둘이 아니라고 생각합니다. 그래서 지금도 이러한 막연함을 느끼는 취업 준비생
                        또는 이쪽 직무로 이직을 하시려는 분들에게 제 경험이 큰 도움이 되도록
                        기여하고 싶습니다.
                    </Txt>
                </ContentBox>
                <KeywordContainer>
                    <Txt variant="h5">관심 키워드</Txt>
                    <KeywordList>
                        {[
                            '편입생',
                            '전공',
                            '입시생',
                            '자취',
                            '동아리',
                            '대외활동',
                            '스터디',
                            '유학생',
                            '네트워킹',
                        ].map((keyword) => (
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
                        {['최고예요', '좋아요', '별로예요'].map((text) => (
                            <ReviewCount key={text} text={text} count={1} />
                        ))}
                    </ReviewCountContainer>
                    <ReviewTextContainer>
                        <Review text="최고의 컨설팅을 해주셔서 감사합니다ㅠㅜ!!" />
                        <Review text="최고의 컨설팅을 해주셔서 감사합니다ㅠㅜ!!" />
                        <Review text="최고의 컨설팅을 해주셔서 감사합니다ㅠㅜ!!" />
                    </ReviewTextContainer>
                </ReviewContainer>
                <ButtonBox>
                    <Button text="밥약 요청" onClick={() => navigate('request')} />
                </ButtonBox>
            </ContentSection>
        </ProfileDetailsPageContainer>
    );
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
    padding: 0 10px;
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
