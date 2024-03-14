import Header from '@/components/common/header';
import styled from 'styled-components';
import ReviewCount from '@/components/common/review/ReviewCount';
import Review from '@/components/common/review/Review';
import { Col, Row } from '@/components/common/flex/Flex';
import { colors } from '@/assets/styles/theme';
import {
    ReviewCountContainer,
    ReviewTextContainer,
} from '@/pages/profileDetails/ProfileDetailsPage';
import Txt from '@/components/common/text';
import { ReviewType } from '@/interface/api/profileDetailsType';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { getReviewCounts, getReviewList } from '@/api/profile/profileApi';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import LoadingGif from '@/assets/gif/loading.gif';

export default function MyReceivedReviewsPage() {
    const target = useRef(null);
    const location = useLocation();
    const profileId = location.state as string;
    const {
        data: reviewCounts,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [`/api/review/${profileId}/count`],
        queryFn: () => getReviewCounts(profileId as string),
    });

    console.log(reviewCounts);

    const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['/api/review/list', profileId],
        queryFn: ({ pageParam = 0 }) =>
            getReviewList({
                profileId: profileId,
                page: pageParam,
                size: 10,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                allPages.length !== allPages[0].totalPages
                    ? lastPage.pageable.pageNumber + 1
                    : undefined;
            return nextPage;
        },
        getPreviousPageParam: (firstPage, allPages) => {
            return allPages.length !== allPages[0].totalPages
                ? firstPage.pageable.pageNumber - 1
                : undefined;
        },
    });

    const { observe, unobserve } = useIntersectionObserver(fetchNextPage);

    useEffect(() => {
        if (target.current) {
            observe(target.current);
        }
        return () => {
            if (target.current) {
                unobserve(target.current);
            }
        };
    }, [data]);

    return (
        reviewCounts &&
        isSuccess &&
        !isLoading && (
            <ReceivedReviewPageContainer>
                <Header text={`내가 받은 후기`} />
                <ReviewContainer>
                    <ReviewCountContainer>
                        <ReviewCount count={reviewCounts.bestCount} text="최고예요" />
                        <ReviewCount count={reviewCounts.greatCount} text="좋아요" />
                        <ReviewCount count={reviewCounts.badCount} text="별로에요" />
                    </ReviewCountContainer>
                    <ReviewTextContainer>
                        {data.pages[0].content.length !== 0 ? (
                            <>
                                {data.pages.map((page) => {
                                    return page.content.map((review: ReviewType) => {
                                        return <Review text={review.reviewComment} />;
                                    });
                                })}
                                {hasNextPage && (
                                    <ObserverTarget ref={target}>
                                        <Loading src={LoadingGif} alt="로딩" />
                                    </ObserverTarget>
                                )}
                            </>
                        ) : (
                            <Txt variant="caption1" color={colors.white_20}>
                                아직 리뷰가 없습니다.
                            </Txt>
                        )}
                    </ReviewTextContainer>
                </ReviewContainer>
            </ReceivedReviewPageContainer>
        )
    );
}

const ReceivedReviewPageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

const ObserverTarget = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    place-items: center;
`;

const ScrollableCol = styled(Col)`
    height: 564px;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
        display: none; /* WebKit */
    }
`;

const ReviewContainer = styled.div`
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 30px;
`;

const Loading = styled.img`
    width: 25px;
    height: 25px;
`;
