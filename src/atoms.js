import { atom } from 'recoil'
import testImg from './Image/test.png'// 임의로 넣은 이미지 


export const userState = atom({
  key: 'userSstate',
  default:[
    {login: true,

    },
  ]
})
export const studyInfoState = atom({ //배움터에 사용될 하나의 모임들 
  key: 'studyInfoState',
  default:[
    {
      img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name:'헌책방 투어 ~^^', //모임명 
      loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
      participants:[''],
      max: '10',
      crnt:'4',
      profilImg: testImg, //담당자 프로필이미지 
      nickname: '담당자',
      intro: '자기소개 내용', //100자 이내의 소개글 
      activity: '활동에 대한 설명 ',
      fee:'참가 비용',
      latitude: '37.58833257313714', //위도
      longitude: '127.00831057785734' //경도 
  },
  {
    img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name:'헌책방 투어 ~^^', //모임명 
      loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
      participants:[''],
      max: '10',
      crnt:'4',
      profilImg: testImg, //담당자 프로필이미지 
      nickname: '담당자',
      intro: '자기소개 내용', //100자 이내의 소개글 
      activity: '활동에 대한 설명 ',
      fee:'참가 비용',
      latitude: '37.58833257313714', //위도
      longitude: '127.00831057785734' //경도 
},
{
  img: testImg,
  category: '독서모임',
  date: '07.20',
  time: '오전 11:00',
  name:'헌책방 투어 ~^^', //모임명 
  loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
  participants:[''],
  max: '10',
  crnt:'4',
  profilImg: testImg, //담당자 프로필이미지 
  nickname: '담당자',
  intro: '자기소개 내용', //100자 이내의 소개글 
  activity: '활동에 대한 설명 ',
  fee:'참가 비용',
  latitude: '37.58833257313714', //위도
  longitude: '127.00831057785734' //경도 
},
{
  img: testImg,
  category: '독서모임',
  date: '07.20',
  time: '오전 11:00',
  name:'헌책방 투어 ~^^', //모임명 
  loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
  participants:[''],
  max: '10',
  crnt:'4',
  profilImg: testImg, //담당자 프로필이미지 
  nickname: '담당자',
  intro: '자기소개 내용', //100자 이내의 소개글 
  activity: '활동에 대한 설명 ',
  fee:'참가 비용',
  latitude: '37.58833257313714', //위도
  longitude: '127.00831057785734' //경도 
},
  ]
});

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
      participants:[''],
      max: '10',
      crnt:'4',
      profilImg: testImg, //담당자 프로필이미지 
      nickname: '담당자',
      intro: '자기소개 내용', //100자 이내의 소개글 
      activity: '활동에 대한 설명 ',
      fee:'참가 비용',
      latitude: '37.58833257313714', //위도
      longitude: '127.00831057785734' //경도 
  },
  {
    img: testImg,
      category: '독서모임',
      date: '07.20',
      time: '오전 11:00',
      name:'헌책방 투어 ~^^', //모임명 
      loc: '서울특별시 성북구', //api로 어떻게 넘겨야 하는지 
      participants:[''],
      max: '10',
      crnt:'4',
      profilImg: testImg, //담당자 프로필이미지 
      nickname: '담당자',
      intro: '자기소개 내용', //100자 이내의 소개글 
      activity: '활동에 대한 설명 ',
      fee:'참가 비용',
      latitude: '37.58833257313714', //위도
      longitude: '127.00831057785734' //경도 
},

  ]
});

export const interviewState = atom({
  key: 'interState',
  default: [
    {people: '젠틀멘',
    comment: '리플레이를 만나고 자신감이 생겼어요!',
    },
    {people: '와인한잔',
    comment: '리플레이 덕분에 재취업도 문제 없어요!',
    },
    ]


})
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

// 북마크된 게시물의 상태를 관리하는 atom
export const bookmarksAtom = atom({
  key: 'bookmarksAtom',
  default: [],
});
