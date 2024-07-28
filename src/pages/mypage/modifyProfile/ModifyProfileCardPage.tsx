import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    ImageInput,
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
import {
    GetModifyProfilePossibleTimeType,
    ModifyProfileType,
    TimeRange,
} from '@/interface/api/modifyProfileType';
import {
    getModifyProfile,
    getModifyProfileAvailableSchedule,
    modifyProfileRequest,
} from '@/api/profile/modifyProfileApi';
import { useQuery } from '@tanstack/react-query';
import { getDate, getDivisionId, getDivisionName, getHour, getKeywordId, getMonthFormatDate } from '@/utils/util';
import Popup from '@/components/common/popup';
import AlarmModal from '@/components/common/alarm/AlarmModal';
import { alarmInfoState } from '@/atom/alarminfo';
import { useRecoilValue } from 'recoil';

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
    const location = useLocation();
    const profileId = location.state as number;

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        data: defaultProfileInfo,
        isError: isError,
        isLoading: isLoading,
    } = useQuery<ModifyProfileType>({
        queryKey: [`/api/profile/default`, profileId],
        queryFn: () => getModifyProfile(),
    });



    // const userId = defaultProfileInfo.userId;

    const {
        data: userSchedule,
        isError: isLoadingPossibleTime,
        isLoading: isErrorPossibleTime,
    } = useQuery<GetModifyProfilePossibleTimeType[]>({
        queryKey: [`/api/possible/datetime/${profileId}`, profileId],
        queryFn: () => getModifyProfileAvailableSchedule(profileId),
        enabled: !!profileId,
    });

    const [file, setFile] = useState<File>();

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
    const [modifyProfileInfo, setModifyProfileInfo] = useState<ModifyProfileInfo>({
        division: '',
        keywordGroups: {
            university: [], // 대학생활
            exam: [], // 수험
            employment: [], // 취업
            graduateSchool: [], // 대학원
        },
    });

    const [possibleDate, setPossibleDate] = useState<string[]>([]);
    const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedAlbumButton, setClickedAlbumButton] = useState(false);
    const [nickName, setNickName] = useState<string>('');
    const [selectedUserType, setSelectedUserType] = useState<string>('');
    const [summaryIntroduce, setSummaryIntroduce] = useState<string>('');
    const [introduce, setIntroduce] = useState<string>('');
    const [contactInput, setContactInput] = useState('');
    const [selectedContactType, setSelectedContactType] = useState<string>('연락처');
    const profileImageInputRef = useRef<HTMLInputElement>(null);
    const [isInputVerified, setIsInputVerified] = useState(false);
    const [isContactInputVerified, setIsContactInputVerified] = useState(false);
    const alarmInfo = useRecoilValue(alarmInfoState);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleVerifyInput = () => {
        if (!nickName || nickName.trim().length < 1) {
            return false;
        }
        if (!selectedUserType) {
            return false;
        }
        if (!summaryIntroduce || summaryIntroduce.trim().length < 1) {
            return false;
        }
        if (!introduce || introduce.trim().length < 1) {
            return false;
        }
        if (!selectedContactType) {
            return false;
        }

        if (!contactInput) {
            return false;
        }

        if (
            !modifyProfileInfo ||
            Object.values(modifyProfileInfo.keywordGroups).every((array) => array.length === 0)
        ) {
            return false;
        }
        if (!isContactInputVerified) {
            return false;
        }
        return true;
    };

    const handleCompleteButton = () => {
        const reqBody = {
            userNickName: nickName,
            userGrade: getDivisionId(selectedUserType) as string,
            profileIntro: summaryIntroduce,
            profileContents: introduce,
            profileContactPhone: selectedContactType === '연락처' ? contactInput : '',
            profileContactChat: selectedContactType === '오픈채팅방' ? contactInput : '',
            keywords: Object.values(modifyProfileInfo.keywordGroups)
                .flat()
                .map((keyword) => getKeywordId(keyword)),
        };

        console.log("requsetBody는", typeof reqBody.keywords[0])

        const formData = new FormData();
        if (file) {
            formData.append('profileImageFile', file);
        }

        const json = JSON.stringify(reqBody);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('profileInfo', blob);

        modifyProfileRequest(formData).then((res) => {
            if (res.code === 200) {
                navigate('/mypage');
            } else if (res.code === 400) {
                if (res.message === 'File size is too large. Maximum allowed size is 5MB.') {
                    setIsPopupOpen(true);
                }
            }
        });
    };

    const handleProfileImgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files?.[0];
        if (!fileObj) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImgUrl(reader.result as string);
            setFile(fileObj);
        };
        reader.readAsDataURL(fileObj);
    };

    const handleSelectFromAlbum = () => {
        setClickedAlbumButton(false);
        profileImageInputRef.current?.click();
    };

    useEffect(() => {
        if (defaultProfileInfo && defaultProfileInfo.keywords) {
            setNickName(defaultProfileInfo.userNickName);
            setProfileImgUrl(defaultProfileInfo.imgUrl);
            const division = getDivisionName(defaultProfileInfo.userGrade);
            setSelectedUserType(String(division));
            setSummaryIntroduce(defaultProfileInfo.profileIntro);
            setIntroduce(defaultProfileInfo.profileContents);
            if (defaultProfileInfo.profileContactPhone === '') {
                setSelectedContactType('오픈채팅방');
                setContactInput(defaultProfileInfo.profileContactChat);
            } else {
                setSelectedContactType('연락처');
                setContactInput(defaultProfileInfo.profileContactPhone);
            }
            setModifyProfileInfo({
                division: defaultProfileInfo.userGrade,
                keywordGroups: {
                    university: defaultProfileInfo.keywords.대학생활
                        ? defaultProfileInfo.keywords.대학생활
                        : [],
                    exam: defaultProfileInfo.keywords.수험 ? defaultProfileInfo.keywords.수험 : [],
                    employment: defaultProfileInfo.keywords.취업
                        ? defaultProfileInfo.keywords.취업
                        : [],
                    graduateSchool: defaultProfileInfo.keywords.대학원
                        ? defaultProfileInfo.keywords.대학원
                        : [],
                },
            });
        }
    }, [defaultProfileInfo]);

    useEffect(() => {
        setIsInputVerified(handleVerifyInput());
    }, [
        nickName,
        selectedUserType,
        summaryIntroduce,
        introduce,
        selectedContactType,
        contactInput,
        possibleDate,
        modifyProfileInfo,
        isContactInputVerified,
    ]);

    useEffect(() => {
        if (selectedContactType === '연락처') {
            const phoneRegex = /^010\d{8}$/;
            if (!phoneRegex.test(contactInput)) {
                setIsContactInputVerified(false);
            } else {
                setIsContactInputVerified(true);
            }
        } else {
            const urlRegex = /https?:\/\/open\.kakao\.com\/o\/[a-zA-Z0-9_-]+/;
            if (!urlRegex.test(contactInput)) {
                setIsContactInputVerified(false);
            } else {
                setIsContactInputVerified(true);
            }
        }
    }, [contactInput]);


    console.log("여기 콘솔있음🔥",userSchedule)
    return (
        <ModifyProfilePageContainer>
            <Header text="프로필카드 수정" destination="/mypage" />
            <Col gap={40} padding="25px 30px 45px">
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
                        <NickNameInput
                            type="text"
                            placeholder="닉네임"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                        <SelectInput
                            key={selectedUserType}
                            optionData={userType}
                            initialValue={selectedUserType}
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
                    <SummaryIntroduceInput
                        type="text"
                        placeholder="20자 이내로 작성해주세요"
                        maxLength={20}
                        value={summaryIntroduce}
                        onChange={(e) => setSummaryIntroduce(e.target.value)}
                    />
                </Col>
                <Col gap={10}>
                    <Txt variant="h5" color={colors.black}>
                        자기소개*
                    </Txt>
                    <IntroduceInput
                        placeholder="1000자 이내로 작성해주세요"
                        maxLength={1000}
                        value={introduce}
                        onChange={(e) => setIntroduce(e.target.value)}
                    />
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
                            key={selectedContactType}
                            optionData={contactType}
                            initialValue={selectedContactType}
                            onValueChange={(value) => {
                                setSelectedContactType(value);
                                setContactInput('');
                            }}
                        />
                        <InputWrapper>
                            <ContactInput
                                type="text"
                                value={contactInput}
                                onChange={(e) => {
                                    if (selectedContactType === '연락처') {
                                        const reg = /^[0-9-]*$/;
                                        if (reg.test(e.target.value)) {
                                            const text = e.target.value.replace('-', '');
                                            setContactInput(text);
                                        }
                                        return;
                                    } else {
                                        setContactInput(e.target.value);
                                    }
                                }}
                                placeholder={
                                    selectedContactType === '연락처'
                                        ? '01012341234'
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
                        isExist={Object.keys(possibleDate).length > 0}
                        onClick={() => setIsModalOpen(true)}
                    >
                        {Object.keys(possibleDate).length > 0 ? (
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
                        disabled={!isInputVerified}
                        type={isInputVerified ? 'accept' : 'refuse'}
                        onClick={handleCompleteButton}
                    />
                </ButtonContainer>
            </Col>
            <ImageInput
                id="profileImg"
                ref={profileImageInputRef}
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleProfileImgFileChange}
            />
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
                    <Button text="앨범에서 선택" type={'accept'} onClick={handleSelectFromAlbum} />
                </AlbumButtonContainer>
            )}
            {isPopupOpen && (
                <Overlay>
                    <Popup
                        text={'이미지용량이 5MB를 초과했습니다.'}
                        secondText={'이미지를 다시 선택해주세요.'}
                        button={<Button text={'확인'} onClick={() => setIsPopupOpen(false)} />}
                        closePopup={() => setIsPopupOpen(false)}
                    />
                </Overlay>
            )}
            {alarmInfo.messageType && <AlarmModal messageType={alarmInfo.messageType} />}
        </ModifyProfilePageContainer>
    );
}
