import Header from '@/components/common/header';
import styled from 'styled-components';
import { ReviewCountContainer, ReviewTextContainer } from '../profileDetails/ProfileDetailsPage';
import ReviewCount from '@/components/common/review/ReviewCount';
import Review from '@/components/common/review/Review';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getReviewCounts, getReviewList } from '@/api/profile/profileApi';
import { ReviewType } from '@/interface/api/profileDetailsType';
import Txt from '@/components/common/text';
import { colors } from '@/assets/styles/theme';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingGif from '@/assets/gif/loading.gif';

export default function ReceivedReviewPage() {
    const { userInfo } = useParams();
    const target = useRef(null);

    const userId = userInfo && userInfo.split('-')[0];
    const userName = userInfo && userInfo.split('-')[1];

    const {data: reviewCounts, isLoading, isError } = useQuery({
        queryKey: [`/api/review/${userId}/count`],
        queryFn: () => getReviewCounts(userId as string)
    })

    console.log(reviewCounts)

    const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['/api/review/list', userId],
        queryFn: ({ pageParam = 0 }) =>
            getReviewList({
                profileId: userId,
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
        userName &&
        reviewCounts &&
        isSuccess &&
        !isLoading &&  (
            <ReceivedReviewPageContainer>
                <Header text={`${userName}님이 받은 후기`} />
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
    height: auto;
    display: flex;
    flex-direction: column;
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

const ObserverTarget = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    place-items: center;
`;
