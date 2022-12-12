import React from 'react';

function HeaderComp (){
  return (
    <header id="header">
      <div className="row1">
        <a href="<?=$mem_path?>join/" title="회원가입" className="join">회원가입</a>
        <i>|</i>
        <a href="<?=$mem_path?>login/"title="로그인">로그인</a>
        <i>|</i>
        <a href="<?=$mem_path?>service/" title="고객센터">고객센터</a>
      </div>
      <div className="row1 login">
        <a href="!#" title="일반회원" className="login-memberclass login-sub-down">일반</a>
        <a href="!#" title="회원정보" className='header-login login-sub-down'>회원이름</a>
        <div className="login-sub">
          <ul>
            <li><a href="!#">주문 내역</a></li>
            <li><a href="!#">선물 내역</a></li>
            <li><a href="!#">찜한 상품</a></li>
            <li><a href="!#">배송지 관리</a></li>
            <li><a href="!#">상품 후기</a></li>
            <li><a href="!#">상품 문의</a></li>
            <li><a href="!#">적립금</a></li>
            <li><a href="!#">쿠폰</a></li>
            <li><a href="<?=$mem_path?>order/" className='login-sub-btn'>개인 정보 수정</a></li>
            <li><a href="!#">나의 컬리 스타일</a></li>
            <li><a href="!#" className='logout-btn'>로그아웃</a></li>
          </ul>
        </div>
        <i>|</i>
        <a href="<?=$mem_path?>service/" title="고객센터">고객센터<img src="./img/ico_down_16x10.png" alt=""/></a>
      </div>

      <div className="row2">
        <div className="left">
          <div className="logo">
            <a href="./"><img src="./img/logo_kurly.svg" alt=""/><span>마켓컬리</span></a>
          </div>
          <div className="text">
            <i>|</i>
            <a href="!#">뷰티컬리<img src="./img/n.svg" alt=""/></a>
          </div>

        </div>

        <div className="center">
          <input type="text" id="search" name="search" placeholder="검색어를 입력해주세요"/>
          <a href="!#" title="search" className="search-btn"><img src="./img/search.svg" alt=""/></a>
        </div>

        <div className="right">
          <a href="!#" className="icon-btn" title="map"><img src="./img/h_location.svg" alt=""/></a>
          <a href="!#" className="icon-btn" title="heart"><img src="./img/h_heart.svg" alt=""/></a>
          <a href="!#" className="icon-btn" title="cart"><img src="./img/h_cart.svg" alt=""/></a>
        </div>
      </div>

      <div className="row3">
        <div className="container">
          <div className="left">
            <a href="!#" className="3menu-btn"><img src="./img/h_3menu.svg" alt=""/>카테고리</a>
          </div>

          <div className="center">
            <a href="<?=$nav_path?>main1/index.php" title="신상품">신상품</a>
            <a href="<?=$nav_path?>main2/index.php" title="베스트">베스트</a>
            <a href="<?=$nav_path?>main3/index.php" title="알뜰쇼핑">알뜰쇼핑</a>
            <a href="<?=$nav_path?>main4/index.php" title="특가/혜택">특가/혜택</a>
          </div>

          <div className="right">
              <a href="!#" title="샛별·낮배송안내">
                <em>샛별·낮</em>
                <span>배송안내</span>
              </a>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default HeaderComp;