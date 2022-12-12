import React from 'react';

function MemberModalComp ({title, closeModal}){

  const onClickModalClose=()=>{
    //모달창 닫기
    closeModal();
  }

  return (
    <div className="member-modal">
      <div className="wrap">
        <div className="container">
          <div className="content">
            <p className='modal-message'>{title}</p>
          </div>
          <div className="button-box">
            <button onClick={onClickModalClose} className='member-modal-close'>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModalComp;