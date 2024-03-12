import Header from '@/components/common/header';
import styled from 'styled-components';
import ReviewCount from '@/components/common/review/ReviewCount';
import Review from '@/components/common/review/Review';
import { Col, Row } from '@/components/common/flex/Flex';
import { colors } from '@/assets/styles/theme';

export default function MyReceivedReviewsPage() {
    return (
        <ReceivedReviewPageContainer>
            <Header text={`내가 받은 후기`} />
            <ReviewContainer>
                <Row gap={12} padding="0 10px">
                    {['최고예요', '좋아요', '별로예요'].map((text) => (
                        <ReviewCount key={text} text={text} count={1} />
                    ))}
                </Row>
                <ScrollableCol gap={16}>
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                    <Review text="최고의 컨설팅을 해주셔서 감사합니다" />
                </ScrollableCol>
            </ReviewContainer>
        </ReceivedReviewPageContainer>
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
