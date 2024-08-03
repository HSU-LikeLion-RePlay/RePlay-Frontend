import { atom } from 'recoil'
import testImg from './Image/test.png'// 임의로 넣은 이미지 

export const playInfoState = atom({ //놀이터에 사용될 하나의 모임들 
  key: 'playInfoState',
  default:[
    {
      img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name:'헌책방 투어 ~^^', //모임명 
      loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
      max: '10',
      crnt:'4',
      profilImg: testImg, //담당자 프로필이미지 
      nickname: '담당자',
      intro: '자기소개 내용', //100자 이내의 소개글 
      activity: '활동에 대한 설명 ',
      fee:'참가 비용',
  },
  {
    img: testImg,
    category: '독서모임',
    date: '07.20',
    time: '오전 11:00',
    name:'헌책방 투어 ~^^', //모임명 
    loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
    max: '10',
    crnt:'4',
    profilImg: testImg, //담당자 프로필이미지 
    nickname: '담당자',
    intro: '자기소개 내용', //100자 이내의 소개글 
    activity: '활동 내용',
    fee:'참가 비용',
},
{
  img: testImg,
  category: '독서모임',
  date: '07.20',
  time: '오전 11:00',
  name:'헌책방 투어 ~^^', //모임명 
  loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
  max: '10',
  crnt:'4',
  profilImg: testImg, //담당자 프로필이미지 
  nickname: '담당자',
  intro: '자기소개 내용', //100자 이내의 소개글 
  activity: '활동 내용',
  fee:'참가 비용',
},
{
  img: testImg,
  category: '독서모임',
  date: '07.20',
  time: '오전 11:00',
  name:'헌책방 투어 ~^^', //모임명 
  loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
  max: '10',
  crnt:'4',
  profilImg: testImg, //담당자 프로필이미지 
  nickname: '담당자',
  intro: '자기소개 내용', //100자 이내의 소개글 
  activity: '활동 내용',
  fee:'참가 비용',
},
  ]
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
    // 다른 모임의 후기 데이터...
  ],
});

// 북마크된 게시물의 상태를 관리하는 atom
export const bookmarksAtom = atom({
  key: 'bookmarksAtom',
  default: [],
});