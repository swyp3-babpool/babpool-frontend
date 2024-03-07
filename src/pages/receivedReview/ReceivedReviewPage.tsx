import Header from '@/components/common/header';
import styled from 'styled-components';
import { ReviewCountContainer, ReviewTextContainer } from '../profileDetails/ProfileDetailsPage';
import ReviewCount from '@/components/common/review/ReviewCount';
import Review from '@/components/common/review/Review';

export default function ReceivedReviewPage() {
    return (
        <ReceivedReviewPageContainer>
            <Header text={`${'민택'}님이 받은 후기`} />
            <ReviewContainer>
                <ReviewCountContainer>
                    <ReviewCount count={1} text='최고예요' />
                    <ReviewCount count={1} text='좋아요' />
                    <ReviewCount count={1} text='별로에요' />
                </ReviewCountContainer>
                <ReviewTextContainer>
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />
                    <Review text='최고의 컨설팅을 해주셔서 감사합니다' />

                </ReviewTextContainer>
            </ReviewContainer>
        </ReceivedReviewPageContainer>
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
`

