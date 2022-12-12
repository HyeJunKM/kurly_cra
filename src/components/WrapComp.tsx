import React from 'react';
import ModalComp from './ModalComp';
import HeaderComp from './HeaderComp';
import MainComp from './MainComp';
import FooterComp from './FooterComp';
import MemberModalComp from './MemberModalComp';

function WrapComp (){
  const [isModal, setModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const  openModal=(msg:any)=>{
    setModal(true); //모달열기
    setTitle(msg); //모달창 메세지
  }
  const  closeModal=(e)=>{
    setModal(false);
  }
  return (
    <div id="wrap">
      <ModalComp/>
      <HeaderComp/>
      <MainComp openModal={openModal}/>
      <FooterComp/>
      {
        isModal&&<MemberModalComp title={title} closeModal={closeModal}/>
      }
    </div>
  );
};

export default WrapComp;