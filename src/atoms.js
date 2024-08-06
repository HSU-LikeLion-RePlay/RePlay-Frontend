import { atom } from 'recoil';
import testImg from './Image/test.png'; // 임의로 넣은 이미지

export const userState = atom({
  key: 'userState',
  default: {
    login: true,
  },
});

export const studyInfoState = atom({
  key: 'studyInfoState',
  default: [
    {
      img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name: '헌책방 투어 ~^^',
      loc: '서울특별시 성북구',
      participants: [''],
      max: '10',
      crnt: '4',
      profilImg: testImg,
      nickname: '담당자',
      intro: '자기소개 내용',
      activity: '활동에 대한 설명 ',
      fee: '참가 비용',
      latitude: '37.58833257313714',
      longitude: '127.00831057785734',
    },
    // 다른 모임 정보 추가
  ],
});

export const playInfoState = atom({
  key: 'playInfoState',
  default: [
    {
      img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name: '헌책방 투어 ~^^',
      loc: '서울특별시 성북구',
      participants: [''],
      max: '10',
      crnt: '4',
      profilImg: testImg,
      nickname: '담당자',
      intro: '자기소개 내용',
      activity: '활동에 대한 설명 ',
      fee: '참가 비용',
      latitude: '37.58833257313714',
      longitude: '127.00831057785734',
    },
    {
      img: testImg,
      category: '자기계발',
      date: '07.20',
      time: '오전 11:00',
      name: '자기계발 세미나',
      loc: '서울특별시 강남구',
      participants: [''],
      max: '10',
      crnt: '4',
      profilImg: testImg,
      nickname: '홍길동',
      intro: '자기계발에 관심 있는 분들을 위한 세미나입니다.',
      activity: '자기계발 관련 활동을 함께 합니다.',
      fee: '무료',
      latitude: '37.497942',
      longitude: '127.027621',
    },
    // 다른 모임 정보 추가
  ],
});

export const reviewState = atom({
  key: 'reviewState',
  default: [
    {
      playIndex: 1,
      reviews: [
        { author: '참가자1', content: '정말 재미있었어요!' },
        { author: '참가자2', content: '유익한 시간이었습니다.' },
      ],
    },
  ],
});

export const interviewState = atom({
  key: 'interviewState',
  default: [
    { people: '젠틀멘', comment: '리플레이를 만나고 자신감이 생겼어요!' },
    { people: '와인한잔', comment: '리플레이 덕분에 재취업도 문제 없어요!' },
    { people: '성북동 중절모', comment: '리플레이 추천하냐구요? 무조건 추천!' },
  ],
});

export const bookmarksAtom = atom({
  key: 'bookmarksAtom',
  default: [],
});

export const playscarapState = atom({
  key: 'playscarapState',
  default: [],
});

export const studyscarapState = atom({
  key: 'studyscarapState',
  default: [],
});
