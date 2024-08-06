<<<<<<< HEAD
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
=======
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pay() {
  const navigate = useNavigate();
  
  const handlePayment = () => {
    navigate('/applyComplete');
  };

  return (
    <>
      임의의 결제창입니다.
      <button onClick={handlePayment}>결제하기</button>
    </>
  );
}
>>>>>>> 41e26eb (수정중)
