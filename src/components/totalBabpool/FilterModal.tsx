import { EmptyDiv } from '@/pages/Notification/NotificationPage.styles';
import styled from 'styled-components';
import Txt from '../common/text';
import { ReactComponent as C_CloseIcon } from '@/assets/icons/ic_close.svg';
import { ReactComponent as ResetIcon } from '@/assets/icons/ic_reset.svg';
import { colors } from '@/assets/styles/theme';
import { DIVISION, DivisionType, FILTER_CATEGORY, FilterCategoryType, INIT_INTEREST_KEYWORD, INTEREST_KEYWORD } from '@/utils/constant';
import Checkbox from '../common/checkbox/Checkbox';
import Button from '../common/button';
import KeywordList from '../common/keyword/KeywordList';
import { CheckboxList } from '../signup/DivisionGroup';
import { SearchInfoType } from '@/pages/totalBabpool/TotalBabpoolPage';
import { KeywordType } from '../signup/KeywordGroup';

type FilterModalProps = {
    open: boolean;
    filterCategory: FilterCategoryType;
    searchInfo: SearchInfoType;
    setSearchInfo: React.Dispatch<React.SetStateAction<SearchInfoType>>;
    handleChangeCategory: (category: FilterCategoryType) => void;
    handleSetFilterModal: (category: FilterCategoryType) => void;
};

export default function FilterModal({
    open,
    filterCategory,
    searchInfo,
    setSearchInfo,
    handleChangeCategory,
    handleSetFilterModal,
}: FilterModalProps) {
    const handleCheck = (keywordGroup: KeywordType, keyword: string) => {
        return searchInfo.filterKeyword[keywordGroup].includes(keyword);
    };

    const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const isSelected = searchInfo.division.includes(name as DivisionType);
        if (isSelected) {
            setSearchInfo((prev) => ({
                ...prev,
                division: prev.division.filter((division) => division !== name),
            }));
        } else {
            setSearchInfo((prev) => ({ ...prev, division: [...prev.division, name as DivisionType] }));
        }
    }

    const handleKeywordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        keywordGroup: keyof typeof INTEREST_KEYWORD
    ) => {
        const { name } = e.target;
        const isSelected = searchInfo.filterKeyword[keywordGroup].includes(name);
        if (isSelected) {
            setSearchInfo((prev) => ({
                ...prev,
                filterKeyword: {
                    ...prev.filterKeyword,
                    [keywordGroup]: prev.filterKeyword[keywordGroup].filter(
                        (keyword) => keyword !== name
                    ),
                },
            }));
        } else {
            setSearchInfo((prev) => ({
                ...prev,
                filterKeyword: {
                    ...prev.filterKeyword,
                    [keywordGroup]: [...prev.filterKeyword[keywordGroup], name],
                },
            }));
        }
    };

    const handleInitialKeyword = () => {
        setSearchInfo((prev) => ({...prev, filterKeyword: INIT_INTEREST_KEYWORD}))
    }

    return (
        <FilterModalContainer open={open}>
            <FilterModalTitleBox>
                <EmptyDiv />
                <Txt variant="h3">필터</Txt>
                <CloseIcon onClick={() => handleSetFilterModal(filterCategory)} />
            </FilterModalTitleBox>
            <FilterCategoryBox>
                {FILTER_CATEGORY.map((category) => (
                    <FilterCategoryTextBox
                        key={category}
                        active={category === filterCategory}
                        onClick={() => handleChangeCategory(category)}
                    >
                        <Txt
                            variant="caption3"
                            color={
                                category === filterCategory
                                    ? colors.purple_light_40
                                    : colors.white_20
                            }
                        >
                            {category}
                        </Txt>
                    </FilterCategoryTextBox>
                ))}
            </FilterCategoryBox>
            {filterCategory === '관심 키워드' && (
                <ResetFilterButtonBox onClick={handleInitialKeyword}>
                    <ResetIcon />
                    <Txt variant="caption2" color={colors.purple_light_40}>
                        필터 초기화
                    </Txt>
                </ResetFilterButtonBox>
            )}

            <FilterListBox>
                {filterCategory === '구분' ? (
                    <CheckboxList>
                        {DIVISION.map((division) => (
                            <Checkbox
                                key={division}
                                label={division}
                                type="checkbox"
                                isChecked={searchInfo.division.includes(division)}
                                onChange={handleDivisionChange}
                            />
                        ))}
                    </CheckboxList>
                ) : (
                    <KeywordList handleCheck={handleCheck} handleChange={handleKeywordChange} />
                )}
            </FilterListBox>
            <FilterButtonBox>
                <Button text="적용" onClick={() => {}} />
            </FilterButtonBox>
        </FilterModalContainer>
    );
}

const FilterModalContainer = styled.section<{ open: boolean }>`
    width: 100%;
    height: auto;
    padding: 24px 18px;
    background-color: white;
    position: absolute;
    bottom: ${(props) => (props.open ? 0 : '-100%')};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px 20px 0 0;
    z-index: 10;
    transition: all 0.5s ease;
`;

const FilterModalTitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FilterCategoryBox = styled.div`
    width: 100%;
    display: flex;
    margin-top: 24px;
`;

const ResetFilterButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 4px;
    margin-top: 20px;
    cursor: pointer;
    margin-right: 10px;
`;

const FilterCategoryTextBox = styled.div<{ active: boolean }>`
    width: 100%;
    padding: 0 0 8px 0;
    border-bottom: ${(props) => (props.active ? '2px' : '1px')} solid
        ${(props) => (props.active ? colors.purple_light_40 : colors.white_20)};
    color: ${(props) => (props.active ? colors.purple_light_40 : colors.white_20)};
    display: grid;
    place-items: center;
    cursor: pointer;
`;

const FilterListBox = styled.div`
    width: 100%;
    padding: 0 24px;
    margin-top: 10px;
`;

const FilterButtonBox = styled.div`
    width: 100%;
    margin-top: 30px;
    display: grid;
    place-items: center;
    margin-bottom: 10px;
`;

const CloseIcon = styled(C_CloseIcon)`
    cursor: pointer;
`;
