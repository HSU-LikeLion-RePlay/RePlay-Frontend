// src/recoil/userInfoState.js
import { atom } from "recoil";
import Image from "../Recoil/image/logo.jpg";
export const InformationRecoil = atom({
  key: "InformationRecoil",
  default: [
    {
      img: Image,
      issue: "제 1호",
      date: "2024년 01월 01일",
      title: "첫 번째 이야기",
    },
    {
      img: Image,
      issue: "제 2호",
      date: "2024년 02월 01일",
      title: "두 번째 이야기",
    },
  ],
});
