import React from "react"
import { useNavigate } from "react-router-dom"

export default function Pay(){
  const navigate = useNavigate();
  return(
    <>
    임의의 결제창입니다.
    <button onclick={navigate('/applyComplete')}>결제하기</button></>
  )
}