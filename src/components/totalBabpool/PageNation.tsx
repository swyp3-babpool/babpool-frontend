import { colors } from '@/assets/styles/theme';
import { styled } from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ic_left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/ic_right.svg';
import Txt from '../common/text';

type PageNationProps = {
    currentPage: number;
    totalPage: number;
    handlePageChange: (page: number) => void;
};

export default function PageNation({currentPage, totalPage, handlePageChange}: PageNationProps) {


    return (
        <PageNationContainer>
            {currentPage !== 1 && (
                <IconBox onClick={() => handlePageChange(currentPage-2)}>
                    <ArrowLeft />
                </IconBox>
            )}
            {totalPage < 8 ?
                new Array(totalPage).fill(0).map((_, index) => {
                    const isActivePage = currentPage === index + 1;
                    return (
                        <PageButton key={index} isActive={isActivePage} onClick={() => handlePageChange(index)}>
                            <Txt
                                variant={isActivePage ? 'caption3' : 'caption2'}
                                color={isActivePage ? colors.purple_light_40 : colors.black}
                            >
                                {index + 1}
                            </Txt>
                        </PageButton>
                    );
                }) : (
                    <>
                        {currentPage === 1 ? (
                            [1, 2, '...', totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : currentPage === totalPage ? (
                            [1, '...', totalPage - 1, totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : currentPage === 2 ? (
                            [1, 2, 3, '...', totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : currentPage === totalPage - 1 ? (
                            [1, '...', totalPage - 2, totalPage - 1, totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : currentPage === 3 ? (
                            [1, 2, 3, 4, '...', totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : currentPage === totalPage - 2 ? (
                            [1, '...', totalPage - 3, totalPage - 2, totalPage - 1, totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        ) : (
                            [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage].map((page, index) =>(
                                <PageButton key={index} isActive={currentPage === page} onClick={() => handlePageChange(Number(page)-1 as number)}>
                                    <Txt
                                        variant={page === currentPage ? 'caption3' : 'caption2'}
                                        color={page === currentPage ? colors.purple_light_40 : colors.black}>{page}</Txt>
                                </PageButton>
                            ))
                        )}
                    </>
                )}
            {currentPage !== totalPage && (
                <IconBox>
                    <ArrowRight onClick={() => handlePageChange(currentPage)}/>
                </IconBox>
            )}
        </PageNationContainer>
    );
}

const PageNationContainer = styled.div`
    width: 100%;
    height: 81px;
    bottom: 0;
    background-color: white;
    padding: 0 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;
const PageButton = styled.button<{ isActive?: boolean }>`
    width: 30px;
    height: 30px;
    border: ${(props) => (props.isActive ? `1px solid ${colors.white_20}` : 'none')};
    border-radius: 4px;
`;

const IconBox = styled.div`
    cursor: pointer;
`;
