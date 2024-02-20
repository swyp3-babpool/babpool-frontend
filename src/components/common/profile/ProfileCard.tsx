import React from 'react';
import { styled } from 'styled-components';
import Txt from '../text';

export default function ProfileCard() {
    return (
        <ProfileCardContainer>
            <UserProfileBox>
                <UserInfoBox>
                    <UserNameBox>
                        <Txt variant="h2">이름</Txt>
                        <Txt variant="h2">구분</Txt>
                    </UserNameBox>
                </UserInfoBox>
            </UserProfileBox>
        </ProfileCardContainer>
    );
}

const ProfileCardContainer = styled.div`
    width: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const UserProfileBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
`;

const UserInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`;

const UserNameBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
`;
