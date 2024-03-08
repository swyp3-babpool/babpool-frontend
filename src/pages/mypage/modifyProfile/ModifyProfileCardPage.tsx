import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import Txt from '@/components/common/text';
import ProfileDefaultIcon from '@/assets/icons/ic_profile_default.png';
import { ReactComponent as ImgModifyIcon } from '@/assets/icons/ic_modify_img.svg';
import { ReactComponent as PlusIcon } from '@/assets/icons/ic_plus.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/ic_delete_content.svg';
import { Col, Row } from '@/components/common/flex/Flex';
import Button from '@/components/common/button';
import Header from '@/components/common/header';
import ReviewCount from '@/components/common/review/ReviewCount';
import {
    AddPossibleTimeButton,
    AlbumButtonContainer,
    ButtonContainer,
    ContactInput,
    DeleteButton,
    Image,
    ImageContainer,
    ImageDefaultContainer,
    ImageIcon,
    InputWrapper,
    IntroduceInput,
    ModifyProfileImgButton,
    ModifyProfilePageContainer,
    NickNameInput,
    SummaryIntroduceInput,
    UnderLine,
} from './ModifyProfileCardPage.styles';
import SelectInput from '@/components/common/select/SelectInput';
import KeywordGroup from '@/components/signup/KeywordGroup';
import SelectPossibleTimeModal from '@/components/modifyProfile/SelectPossibleTimeModal';
import Overlay from '@/components/common/overlay';
import { TimeRange } from '@/interface/api/modifyProfileType';

export interface ModifyProfileInfo {
    division: string;
    keywordGroups: {
        university: string[]; // 대학생활
        exam: string[]; // 수험
        employment: string[]; // 취업
        graduateSchool: string[]; // 대학원
    };
}

export default function ModifyProfileCardPage() {
    const navigate = useNavigate();
    const userType = [
        { key: 1, value: '1학년' },
        { key: 2, value: '2학년' },
        { key: 3, value: '3학년' },
        { key: 4, value: '4학년' },
        { key: 5, value: '대학원생' },
        { key: 6, value: '졸업생' },
    ];

    const contactType = [
        { key: 1, value: '연락처' },
        { key: 2, value: '오픈채팅방' },
    ];
    const [keywords, setKeywords] = useState<string[]>([
        '편입생',
        '자취',
        '동아리',
        '진로탐색',
        '대학원',
    ]);

    const [modifyProfileInfo, setModifyProfileInfo] = useState<ModifyProfileInfo>({
        division: '',
        keywordGroups: {
            university: [], // 대학생활
            exam: [], // 수험
            employment: [], // 취업
            graduateSchool: [], // 대학원
        },
    });

    const [possibleDate, setPossibleDate] = useState<TimeRange[]>([]);
    const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
    // 'https://fastly.picsum.photos/id/338/200/300.jpg?hmac=rE5P3WDLKY1VMpd9y_FLo_OKhTzG4_3zCbGjKvgOL5w'
    const [selectedUserType, setSelectedUserType] = useState<string>('1학년');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedAlbumButton, setClickedAlbumButton] = useState(false);
    const [contactInput, setContactInput] = useState('');
    const [selectedContactType, setSelectedContactType] = useState<string>('연락처');

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ModifyProfilePageContainer>
            <Header text="프로필카드 수정" />
            <Col style={{ overflowY: 'scroll' }} gap={40} padding="25px 30px 45px">
                <Row gap={0} justifyContent="center" alignItems="center">
                    {!profileImgUrl ? (
                        <ImageDefaultContainer>
                            <ImageIcon src={ProfileDefaultIcon} />
                            <ModifyProfileImgButton onClick={() => setClickedAlbumButton(true)}>
                                <ImgModifyIcon />
                            </ModifyProfileImgButton>
                        </ImageDefaultContainer>
                    ) : (
                        <ImageContainer>
                            <Image src={profileImgUrl} />
                            <ModifyProfileImgButton onClick={() => setClickedAlbumButton(true)}>
                                <ImgModifyIcon />
                            </ModifyProfileImgButton>
                        </ImageContainer>
                    )}
                </Row>
                <Col gap={10}>
                    <Row justifyContent="space-between">
                        <Txt style={{ width: '38.4%' }} variant="h5" color={colors.black}>
                            닉네임*
                        </Txt>
                        <Txt style={{ width: '38.4%' }} variant="h5" color={colors.black}>
                            구분*
                        </Txt>
                    </Row>

                    <Row justifyContent="space-between">
                        <NickNameInput type="text" placeholder="닉네임" />
                        <SelectInput
                            optionData={userType}
                            initialValue="대학원생"
                            onValueChange={(value) => {
                                setSelectedUserType(value);
                            }}
                        />
                    </Row>
                </Col>
                <Col gap={10}>
                    <Txt variant="h5" color={colors.black}>
                        한줄소개*
                    </Txt>
                    <SummaryIntroduceInput type="text" placeholder="20자 이내로 작성해주세요" />
                </Col>
                <Col gap={10}>
                    <Txt variant="h5" color={colors.black}>
                        자기소개*
                    </Txt>
                    <IntroduceInput placeholder="1000자 이내로 작성해주세요" />
                </Col>

                <Col gap={16}>
                    <Col gap={8}>
                        <Txt variant="h5" color={colors.black}>
                            연락수단*
                        </Txt>
                        <Txt variant="caption2" color={colors.white_30}>
                            대화가 수락된 경우에만 상대방에게 공개돼요
                        </Txt>
                    </Col>
                    <Row gap={12} justifyContent="space-between">
                        <SelectInput
                            optionData={contactType}
                            initialValue="연락처"
                            onValueChange={(value) => {
                                setSelectedContactType(value);
                            }}
                        />
                        <InputWrapper>
                            <ContactInput
                                type="text"
                                value={contactInput}
                                onChange={(e) => setContactInput(e.target.value)}
                                placeholder={
                                    selectedContactType === '연락처'
                                        ? '010-0000-0000'
                                        : 'open.kakao.com/...'
                                }
                            />
                            <UnderLine />
                            {contactInput && (
                                <DeleteButton onClick={() => setContactInput('')}>
                                    <DeleteIcon />
                                </DeleteButton>
                            )}
                        </InputWrapper>
                    </Row>
                </Col>
                <KeywordGroup
                    margin={'0'}
                    signUpInfo={modifyProfileInfo}
                    setSignUpInfo={setModifyProfileInfo}
                />
                <Col gap={16}>
                    <Col gap={8}>
                        <Txt variant="h5" color={colors.black}>
                            밥약이 가능한 시간대*
                        </Txt>
                        <Txt variant="caption2" color={colors.white_30}>
                            밥약이 가능한 시간대를 날짜별로 선택해주세요
                            <br />
                            선택하신 시간대로 밥약 요청이 접수돼요
                        </Txt>
                    </Col>
                    <AddPossibleTimeButton
                        isExist={possibleDate.length > 0}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {possibleDate.length > 0 ? (
                            <Txt variant="body" color={colors.purple_light_40}>
                                확인/수정하기
                            </Txt>
                        ) : (
                            <PlusIcon />
                        )}
                    </AddPossibleTimeButton>
                </Col>
                <ButtonContainer>
                    <Button
                        text="완료"
                        disabled={false}
                        type={'refuse'}
                        onClick={() => navigate('/mypage')}
                    />
                </ButtonContainer>
            </Col>
            <SelectPossibleTimeModal
                selectedDates={possibleDate}
                setSelectedDates={setPossibleDate}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            {(isModalOpen || clickedAlbumButton) && (
                <Overlay onClick={() => setClickedAlbumButton(false)} />
            )}
            {clickedAlbumButton && (
                <AlbumButtonContainer onClick={(e) => e.stopPropagation()}>
                    <Button
                        text="앨범에서 선택"
                        disabled={false}
                        type={'accept'}
                        onClick={() => setClickedAlbumButton(false)}
                    />
                </AlbumButtonContainer>
            )}
        </ModifyProfilePageContainer>
    );
}
