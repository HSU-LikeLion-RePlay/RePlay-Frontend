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

<<<<<<< HEAD
export const playInfoState = atom({ //놀이터에 사용될 하나의 모임들 
=======
export const playInfoState = atom({ 
>>>>>>> 41e26eb (수정중)
  key: 'playInfoState',
  default:[
    {
      img: testImg,
<<<<<<< HEAD
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

=======
      category: '자기계발',
      date: '07.20',
      time: '오전 11:00',
      name:'자기계발 세미나',
      loc: '서울특별시 강남구',
      participants:[''],
      max: '10',
      crnt:'4',
      profilImg: testImg,
      nickname: '홍길동',
      intro: '자기계발에 관심 있는 분들을 위한 세미나입니다.',
      activity: '자기계발 관련 활동을 함께 합니다.',
      fee:'무료',
      latitude: '37.497942',
      longitude: '127.027621'
    },
    {
      img: testImg,
      category: '외국어',
      date: '07.22',
      time: '오후 2:00',
      name:'영어 회화 모임',
      loc: '서울특별시 종로구',
      participants:[''],
      max: '15',
      crnt:'10',
      profilImg: testImg,
      nickname: '김영희',
      intro: '영어 회화를 함께 연습해요.',
      activity: '영어로 대화하고 연습하는 시간입니다.',
      fee:'5,000원',
      latitude: '37.570377',
      longitude: '126.982982'
    },
    {
      img: testImg,
      category: 'SNS',
      date: '07.25',
      time: '오전 10:00',
      name:'SNS 마케팅 워크숍',
      loc: '서울특별시 마포구',
      participants:[''],
      max: '20',
      crnt:'12',
      profilImg: testImg,
      nickname: '이민수',
      intro: 'SNS 마케팅에 대해 배워보는 시간입니다.',
      activity: 'SNS 마케팅 전략을 공유합니다.',
      fee:'10,000원',
      latitude: '37.556003',
      longitude: '126.923854'
    },
    {
      img: testImg,
      category: '독서',
      date: '07.27',
      time: '오후 4:00',
      name:'독서 토론 모임',
      loc: '서울특별시 서대문구',
      participants:[''],
      max: '8',
      crnt:'5',
      profilImg: testImg,
      nickname: '박서준',
      intro: '함께 책을 읽고 토론하는 모임입니다.',
      activity: '정해진 책을 읽고 토론합니다.',
      fee:'무료',
      latitude: '37.579617',
      longitude: '126.936947'
    },
    {
      img: testImg,
      category: '문화∙예술',
      date: '07.30',
      time: '오후 6:00',
      name:'미술 전시회 관람',
      loc: '서울특별시 용산구',
      participants:[''],
      max: '12',
      crnt:'7',
      profilImg: testImg,
      nickname: '정수진',
      intro: '미술 전시회를 함께 관람해요.',
      activity: '전시회 관람 후 소감 나누기.',
      fee:'입장료 별도',
      latitude: '37.531057',
      longitude: '126.978394'
    },
    {
      img: testImg,
      category: '요리',
      date: '08.02',
      time: '오전 11:00',
      name:'쿠킹 클래스',
      loc: '서울특별시 강동구',
      participants:[''],
      max: '6',
      crnt:'3',
      profilImg: testImg,
      nickname: '최유리',
      intro: '함께 요리하는 즐거움을 느껴보세요.',
      activity: '새로운 요리 레시피를 배웁니다.',
      fee:'재료비 15,000원',
      latitude: '37.530256',
      longitude: '127.123944'
    },
    {
      img: testImg,
      category: '여행',
      date: '08.05',
      time: '오전 9:00',
      name:'당일치기 여행',
      loc: '서울특별시 중구',
      participants:[''],
      max: '25',
      crnt:'18',
      profilImg: testImg,
      nickname: '한지민',
      intro: '서울 근교로 당일치기 여행을 떠나요.',
      activity: '서울 근교 관광 및 체험 활동.',
      fee:'30,000원',
      latitude: '37.563014',
      longitude: '126.997104'
    },
    {
      img: testImg,
      category: '운동',
      date: '08.08',
      time: '오후 7:00',
      name:'저녁 조깅 모임',
      loc: '서울특별시 송파구',
      participants:[''],
      max: '10',
      crnt:'6',
      profilImg: testImg,
      nickname: '김철수',
      intro: '함께 저녁에 조깅해요.',
      activity: '조깅 후 스트레칭.',
      fee:'무료',
      latitude: '37.504296',
      longitude: '127.090522'
    },
    {
      img: testImg,
      category: '나들이',
      date: '08.10',
      time: '오후 3:00',
      name:'한강 피크닉',
      loc: '서울특별시 영등포구',
      participants:[''],
      max: '15',
      crnt:'10',
      profilImg: testImg,
      nickname: '오지훈',
      intro: '한강에서 피크닉 즐겨요.',
      activity: '돗자리 깔고 한강에서 피크닉.',
      fee:'간식비 5,000원',
      latitude: '37.525006',
      longitude: '126.929789'
    },
    {
      img: testImg,
      category: '맛집탐방',
      date: '08.12',
      time: '오후 1:00',
      name:'맛집 탐방 모임',
      loc: '서울특별시 강서구',
      participants:[''],
      max: '8',
      crnt:'5',
      profilImg: testImg,
      nickname: '서영호',
      intro: '함께 서울의 맛집을 탐방해요.',
      activity: '정해진 맛집 방문 후 리뷰 공유.',
      fee:'개별 식사비',
      latitude: '37.558296',
      longitude: '126.836491'
    },
    {
      img: testImg,
      category: '오락',
      date: '08.15',
      time: '오후 2:00',
      name:'보드게임 모임',
      loc: '서울특별시 노원구',
      participants:[''],
      max: '10',
      crnt:'7',
      profilImg: testImg,
      nickname: '이하늘',
      intro: '함께 보드게임을 즐겨요.',
      activity: '다양한 보드게임을 함께 합니다.',
      fee:'게임방 이용료 10,000원',
      latitude: '37.654884',
      longitude: '127.056489'
    },
    {
      img: testImg,
      category: '기타',
      date: '08.18',
      time: '오전 10:00',
      name:'취미공유 모임',
      loc: '서울특별시 동작구',
      participants:[''],
      max: '12',
      crnt:'8',
      profilImg: testImg,
      nickname: '장민호',
      intro: '다양한 취미를 공유하는 모임입니다.',
      activity: '각자의 취미를 소개하고 공유합니다.',
      fee:'무료',
      latitude: '37.512418',
      longitude: '126.939929'
    }
>>>>>>> 41e26eb (수정중)
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
     {people: '성북동 중절모',
    comment: '리플레이 추천하냐구요? 무조건 추천!',
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
  ],
});

// 북마크된 게시물의 상태를 관리하는 atom
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