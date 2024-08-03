import { atom } from "recoil";
import testImg from "../Recoil/image/logo.jpg";

export const StudyAndPlay = atom({
  key: "StudyAndPlay",
  default: [
    {
      img: testImg,
      category: "독서모임",
      date: "07.20",
      time: "오전 11:00",
      name: "헌책방 투어 ~^^",
      loc: "서울특별시 성북구",
      max: "10",
      crnt: "4",
    },
    // 다른 모임 정보 추가...
  ],
});
