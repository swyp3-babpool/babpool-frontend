import 연결 from '../assets/images/연결.webp';
import 안심 from '../assets/images/안심.webp';
import 재발견 from '../assets/images/재발견.webp';
import 존중 from '../assets/images/존중.webp';
import 환대 from '../assets/images/환대.webp';
import 주체성 from '../assets/images/주체성.webp';
import 즐거움 from '../assets/images/즐거움.webp';
import 밥 from '../assets/images/밥.webp';
import 손 from '../assets/images/손.webp';
import 신분증 from '../assets/images/신분증.webp';

export type FilterCategoryType = '구분' | '관심 키워드';
export type DivisionType = '1학년' | '2학년' | '3학년' | '4학년' | '졸업생' | '대학원생'

export const DIVISION = ['1학년', '2학년', '3학년', '4학년', '졸업생', '대학원생'] as DivisionType[];

export const INTEREST_KEYWORD = {
    'university': ['전공', '입시생', '편입생', '자취', '동아리', '대외활동', '스터디', '유학생', '네트워킹'],
    'exam': ['공직', '기사', '스터디', '전문직'],
    'employment': ['대기업', '스타트업', '진로탐색', '자기소개/이력서', '포트폴리오', '인턴', '해외취업', '면접', '창업'],
    'graduateSchool': ['석사', '박사', '대학원 준비']
}

export const INIT_INTEREST_KEYWORD = {
    'university': [],
    'exam': [],
    'employment': [],
    'graduateSchool': []
}

export const WORTH_LIST = [
    {
        title: '연결',
        desc: '밥출 속에서 모두가 연결돼요',
        imgSrc: 연결,
    },
    {
        title: '주체성',
        desc: '의미있는 대학생활을 위해',
        sDesc: '주체적으로 노력해요',
        imgSrc: 주체성,
    },
    {
        title: '환대',
        desc: '서로를 따뜻하게 대하는',
        sDesc: '문화를 만들어요',
        imgSrc: 환대,
    },
    {
        title: '존중',
        desc: '다양한 생각을 수용해요',
        imgSrc: 존중,
    },
    {
        title: '안심',
        desc: '편안하고 안전한',
        sDesc: '밥약 문화를 만들어요',
        imgSrc: 안심,
    },
    {
        title: '재발견',
        desc: '밥약을 통해 스스로',
        sDesc: '재발견하는 기회를 얻어요',
        imgSrc: 재발견,
    },
    {
        title: '즐거움',
        desc: '밥풀러와 즐거움을',
        sDesc: '나누는 여유도 가져봐요',
        imgSrc: 즐거움,
    },
]

export const HOW_TO_USE_LIST = [
    {
        title: '01 회원가입하고 프로필카드 만들기',
        desc: '카카오 로그인을 통해 빠르게 회원가입하고 밥풀러 프로필카드를 작성하세요.',
        imgSrc: 신분증
    },
    {
        title: '02 밥풀러 찾고 밥약 요청하기',
        desc: '원하는 밥풀러를 찾아 밥약을 보내세요. 밥약이 가능한 날짜와 시간을 선택하고, 궁금하신 내용을 함께 보내주세요. 밥약이 수락되면 연락 수단이 공개돼요.',
        imgSrc: 밥
    },
    {
        title: '03 밥풀러 후기 작성하기',
        desc: '밥약 이후 밥풀러에 대한 솔직한 후기를 작성하세요. 상대방의 대화 태도와 정보의 유용성을 평가하여 다른 이용자들과 경험을 공유할 수 있어요.',
        imgSrc: 손
    }
]

export const FILTER_CATEGORY = ['구분', '관심 키워드'] as FilterCategoryType[];