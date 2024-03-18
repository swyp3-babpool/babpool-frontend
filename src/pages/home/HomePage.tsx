import HomeHeader from '../../components/home/HomeHeader';
import { useEffect, useState } from 'react';
import HomeMenu from '@/components/home/HomeMenu';
import styled from 'styled-components';
import HomeSection from '@/components/home/HomeSection';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchInfoState } from '@/atom/searchInfoStore';
import { INIT_INTEREST_KEYWORD } from '@/utils/constant';
import { useQuery } from '@tanstack/react-query';
import { getUserGrade, getisRegistrationProfile } from '@/api/profile/profileApi';
import { getDivisionName } from '@/utils/util';
import { alarmInfoState } from '@/atom/alarminfo';
import AlarmModal from '@/components/common/alarm/AlarmModal';

export default function HomePage() {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const setSearchInfo = useSetRecoilState(searchInfoState)
    const alarmInfo = useRecoilValue(alarmInfoState);
    const setAlarm = useSetRecoilState(alarmInfoState)

    const handleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const {data, isLoading, isError} = useQuery({
        queryKey: ['/api/user/grade'],
        queryFn: () => getUserGrade()
    })

    useEffect(() => {
        if(!isLoading) {
            const grade = [getDivisionName(data.userGrade)] as string[]
            setSearchInfo((prev) => ({...prev, page: 0, division: grade, searchText: '', prevFilterKeyword: INIT_INTEREST_KEYWORD}))
        }
    }, [])

    return (
        <HomePageContainer>
            <HomeHeader isOpenMenu={isOpenMenu} handleMenu={handleMenu} />
            <HomeSection />
            <HomeMenu isOpenMenu={isOpenMenu} handleMenu={handleMenu}  />
            {
                (alarmInfo.messageType) && (
                    <AlarmModal messageType={alarmInfo.messageType} />
                )
            }
        </HomePageContainer>
    );
}

export const HomePageContainer = styled.section`
    width: inherit;
    height: inherit;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
`;