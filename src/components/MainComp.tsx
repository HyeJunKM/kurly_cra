import React from 'react';
import PropTypes from 'prop-types'

function MainComp ({회원관리, openModal}){

  const [state, setState] = React.useState(회원관리);
  const {
    아이디,아이디중복확인,isId,
    비밀번호,isPwText1,isPwText2,isPwText3,비밀번호확인,isPw2Text1,isPw2Text2,
    이름,isName, 이메일,isEmailText1,isEmailText2, 이메일중복확인,isEmail, 휴대폰, 주소1, 주소2, 
    성별, 생년, 생월, 생일, 
    추가입력사항, 추가입력사항상자, 이용약관동의
  } = state;

  const onChangeId=(e)=>{
    const regExp1 = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g;
    const regExp2 = /.{6,16}/g;
    const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g;
    const regExp4 = /\s/g;
    let imsi ='';
    let isLogic ='';
    const {value} = e.target; //e.target.value 입력값 비구조화

    imsi = e.target.value.replace(regExp1, '');

    if(regExp2.test(value)===false || regExp3.test(value)===false || regExp4.test(value)===true ){
      isLogic=true;
    }
    else {isLogic=false;}

    setState({...state, 아이디: imsi, isId: isLogic});
  }
  const onClickIdCheck=(e)=>{
    const regExp1 = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g;
    const regExp2 = /.{6,16}/g;
    const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g;
    const regExp4 = /\s/g;
    let isLogic ='';
    let message ='';

    e.preventDefault();

    if(regExp2.test(아이디)===false || regExp3.test(아이디)===false || regExp4.test(아이디)===true ){
      isLogic=true;
      message ='6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
    }
    else {
      isLogic=false;
      message ='사용할 수 있는 아이디 입니다.';
    }
    openModal(message);
    setState({...state, 아이디중복확인: isLogic});
  }
  const onChangePw=(e)=>{
    const regExp1 = /.{10,}/g;
    const regExp2 = /((?=.*[A-Z])+(?=.*[0-9])+)+|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>])+)+|((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>])+)+/gi;
    const regExp3 = /\s/g;
    const regExp4 = /(.)\1\1/g;
    let imsi1 = false;
    let imsi2 = false;
    let imsi3 = false;

    let {value} = e.target;
    if (value===''){imsi1 = imsi2 = imsi3 = false;}
    else {
      if (regExp1.test(value)===false){imsi1 = true; imsi2 = imsi3 = false;}
      else if (regExp2.test(value)===false||regExp3.test(value)===true){
        imsi1 = false; imsi2 = true; imsi3 = false;
      }
      else if (regExp4.test(value)===true){imsi1 = imsi2 = false; imsi3 = true;}
      else {imsi1 = imsi2 = imsi3 = false;}
    }
    setState({...state, isPwText1: imsi1, isPwText2: imsi2, isPwText3: imsi3, 비밀번호: value});
  }
  const onChangePw2=(e)=>{
    let {value} = e.target;
    let imsi1 = false;
    let imsi2 = false;

    if (value===''){imsi1 = true; imsi2 = false;}
    else {
      if (value!==비밀번호){imsi1 = false; imsi2 = true;}
      else {imsi1 = false; imsi2 = false;}
    }
    setState({...state, isPw2Text1: imsi1, isPw2Text2: imsi2, 비밀번호확인: value});
  }
  const onChangeName=(e)=>{
    const regExp = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g;
    let {value} = e.target;
    let imsi1 = ''; //입력값
    let imsi2 = false; //논리값
    imsi1 = value.replace(regExp, '');

    if (value===''){imsi2 = true;}
    else{imsi2 = false;}

    setState({...state, isName: imsi2, 이름: imsi1});
  }
  const onChangeEmail=(e)=>{
    const regExp = /^([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*@([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*.[a-z]{2,3}$/gi; 
    let {value} = e.target;
    let imsi1 = false;
    let imsi2 = false;

    if (value===''){imsi1 = true; imsi2 = false;}
    else {
      if (regExp.test(value)===false){imsi1 = false; imsi2 = true;}
      else {imsi1 = false; imsi2 = false;}
    }
    setState({...state, 이메일: value, isEmailText1: imsi1, isEmailText2: imsi2});
  }
  const onClickEmailCheck=(e)=>{
    e.preventDefault();
    const regExp = /^([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*@([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*.[a-z]{2,3}$/gi;
    let imsi = [];
    let result = [];
    let isEmail = false;

    if (이메일===''){openModal(`이메일을 입력해주세요`);}
    else {
      if (regExp.test(이메일)===false){openModal(`이메일 형식으로 입력해주세요`);}
      else {
        // 중복검사 // 로컬스토리지 키 -KurlyMember
        //데이터베이스 사용시 로컬스토리지 사용안함, 로컬 사용 시 데이터베이스 사용안함
        
        if (localStorage.getItem("KurlyMember")===null){return;}
        try {imsi = [...imsi, JSON.parse(localStorage.getItem("KurlyMember"))];}
        catch {console.log('err: 데이터가 JSON 형식이 아닙니다.'); return;}
        
        result = imsi.map((item)=>item.이메일===이메일);
  
        if (result.includes(true)){
          openModal(`사용 불가능한 이메일 입니다.`);
          isEmail=false;
        }
        else {
          openModal(`사용 가능한 이메일 입니다.`);
          isEmail=true;
        }
      }
    }
    setState({...state, 이메일중복확인: isEmail});
  }
  const onChangePhone=(e)=>{
    setState({...state, 휴대폰: e.target.value});
  }
  const onChangeAddr1=(e)=>{
    setState({...state, 주소1: e.target.value});
  }
  const onChangeAddr2=(e)=>{
    setState({...state, 주소2: e.target.value});
  }
  const onClickAddrSearch=(e)=>{
    e.preventDefault();
    const popW = 530;
    const popH = 615;
    const popName = 'popup';
    const popFile = './popup.html';

    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let top = (winH-popH)/2;
    let left = (winW-popW)/2;

    console.log(winW);
    console.log(winH);

    const winPopup = window.open(popFile,popName,`width=${popW}, height=${popH}, top=${top}, left=${left}`);
  }
  const onChangeGender=(e)=>{
    setState({...state, 성별: e.target.value});
  }
  const birthCheck=(e)=>{
    console.log('생년월일 체크 함수');
  }
  const onChangeYear=(e)=>{
    setState({...state, 생년: e.target.value});
    birthCheck();
  }
  const onChangeMonth=(e)=>{
    setState({...state, 생월: e.target.value});
    birthCheck();
  }
  const onChangeDate=(e)=>{
    setState({...state, 생일: e.target.value});
    birthCheck();
  }
  const onChangeAddInput=(e)=>{
    setState({...state, 추가입력사항: e.target.value});
  }
  const onChangeAddInputBox=(e)=>{
    setState({...state, 추가입력사항상자: e.target.value});
  }
  const onChangeAgreeAll=(e)=>{
    let imsi = [];
    const checkAll= document.getElementsByClassName('check');

    if (e.target.checked===true){
      for (let i=0; i<checkAll.length; i++){
        //imsi.push(checkAll[i].value);
        imsi = [...imsi, checkAll[i].value]
      }
    }
    else {imsi =[];} //체크 해제시 빈 배열
    
    setState({...state, 이용약관동의: imsi});
  }
  const onChangeAgree=(e)=>{
    let imsi = [];
    if (e.target.checked){
       //마케팅수신동의 
      if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
        if (이용약관동의.includes('SMS')===false && 이용약관동의.includes('이메일')===false){
          setState({...state, 이용약관동의: [...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', 'SMS', '이메일']});
        }
        else if (이용약관동의.includes('SMS')===false && 이용약관동의.includes('이메일')===true){
          setState({...state, 이용약관동의: [...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', 'SMS']});
        }
        else if (이용약관동의.includes('SMS')===true && 이용약관동의.includes('이메일')===false){
          setState({...state, 이용약관동의: [...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', '이메일']});
        }
      }
      else if (e.target.value==='SMS' && 이용약관동의.includes('이메일')===true){
        setState({...state, 이용약관동의: [...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', 'SMS']});
      }
      else if (e.target.value==='이메일' && 이용약관동의.includes('SMS')===true){
        setState({...state, 이용약관동의: [...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', '이메일']});
      }
      //개별체크
      else {setState({...state, 이용약관동의: [...이용약관동의, e.target.value]});}
      
    }
    else {
      if (e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
        imsi = 이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
        imsi = imsi.filter((item)=>item!=='SMS');
        imsi = imsi.filter((item)=>item!=='이메일');
        setState({...state, 이용약관동의: imsi});
      }
      else if (e.target.value==='SMS' && 이용약관동의.includes('이메일')===true){
        imsi = 이용약관동의.filter((item)=>item!=='SMS');
        imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
        setState({...state, 이용약관동의: imsi});
      }
      else if (e.target.value==='이메일' && 이용약관동의.includes('SMS')===true){
        imsi = 이용약관동의.filter((item)=>item!=='이메일');
        imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
        setState({...state, 이용약관동의: imsi});
      }
      else {
        imsi = 이용약관동의.filter((item)=>item!==e.target.value);
        setState({...state, 이용약관동의: imsi});
      }
    }

    //마케팅수신동의 
  //   if(이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')){
  //     if (이용약관동의.includes('SMS')===false && 이용약관동의.includes('이메일')===false){
  //       imsi =[...imsi, 'SMS', '이메일'];
  //     }
  //     else if (이용약관동의.includes('SMS')===false && 이용약관동의.includes('이메일')===true){
  //       imsi =[...imsi, 'SMS'];
  //     }
  //     else if (이용약관동의.includes('SMS')===true && 이용약관동의.includes('이메일')===false){
  //       imsi =[...imsi, '이메일'];
  //     }
  //   }
  //   else {
  //     imsi = 이용약관동의.filter((item)=>item!=='SMS');
  //     imsi = imsi.filter((item)=>item!=='이메일');
  //   }
   }

  return (
    <main id="main">
      <section id="join">
        <div className="container">
          <div className="title">
            <h2>회원가입</h2>
          </div> 
          <div className="content">
            <form autoComplete='off' id='signUp' name='sign_up' method='post' action="./response.php">
              <ul>
                <li><span><i>*</i>필수입력사항</span></li>
                <li>
                  <div className="left"><label htmlFor="id">아이디<i>*</i></label></div>
                  <div className="right id-input">
                    <input maxLength='16' type="text" id='id' name='id' placeholder='아이디를 입력해주세요' value={아이디} onChange={onChangeId} />
                    <button type="button" className='id-check' onClick={onClickIdCheck}>중복확인</button>
                    <p className={isId?`id-error on`:`id-error`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="pw">비밀번호<i>*</i></label></div>
                  <div className="right pw-input">
                    <input maxLength='16' type="password" id='pw' name='pw' placeholder='비밀번호를 입력해주세요' value={비밀번호} onChange={onChangePw}/>
                    <p className={`pw-error pw-error1 ${isPwText1&&'on'}`}>최소 10자 이상 입력</p>
                    <p className={`pw-error pw-error2 ${isPwText2&&'on'}`}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                    <p className={`pw-error pw-error3 ${isPwText3&&'on'}`}>동일한 숫자 3개 이상 연속 사용 불가</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="pw2">비밀번호확인<i>*</i></label></div>
                  <div className="right pw-check">
                    <input type="password" id='pw2' name='pw2' placeholder='비밀번호를 한번 더 입력해주세요' value={비밀번호확인} onChange={onChangePw2} />
                    <p className={`pw2-error pw2-error1 ${isPw2Text1&&'on'}`}>비밀번호를 한번 더 입력해 주세요.</p>
                    <p className={`pw2-error pw2-error2 ${isPw2Text2&&'on'}`}>동일한 비밀번호를 입력</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="name">이름<i>*</i></label></div>
                  <div className="right name-input">
                    <input type="text" id='name' name='name' placeholder='이름을 입력해주세요' value={이름} onChange={onChangeName} />
                    <p className={`name-error ${isName&&'on'}`}>이름을 입력해주세요.</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="email">이메일<i>*</i></label></div>
                  <div className="right email-input">
                    <input type="email" id='email' name='email' placeholder='예: marketkurly@kurly.com' value={이메일} onChange={onChangeEmail}/>
                    <button type="button" className='email-check' onClick={onClickEmailCheck}>중복확인</button>
                    <p className={`email-error email-error1 ${isEmailText1&&'on'}`}>이메일을 입력해주세요.</p>
                    <p className={`email-error email-error2 ${isEmailText2&&'on'}`}>이메일 형식으로 입력해주세요.</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="phone">휴대폰<i>*</i></label></div>
                  <div className="right phone-input">
                    <input maxLength='11' type="text" id='phone' name='phone' placeholder='숫자만 입력해주세요' value={휴대폰} onChange={onChangePhone}/>
                    <button type="button" className='phone-check' disabled>인증번호 받기</button>
                    <button type="button" className='phone-check-other'>다른번호 인증</button>
                    <p className='phone-error phone-error1'>휴대폰 번호를 입력해주세요.</p>
                    <p className='phone-error phone-error2'>휴대폰 번호 형식으로 입력해주세요.</p>
                  </div>
                </li>
                <li className='phone2-box'>
                  <div className="left"><label htmlFor="phone2" className='hide'></label></div>
                  <div className="right phone-input-ok">
                    <input maxLength='6' type="text" id='phone2' name='phone2' placeholder=''/>
                    <span className='phone-time'><em className='min'>02</em>:<em className='sec'>59</em></span>
                    <button type="button" className='phone-check-ok' disabled>인증번호 확인</button>
                    <p className='phone-p'>
                      인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)
                    </p>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="address">주소<i>*</i></label></div>
                  <div className="right address">
                    <button type="button" className='address-search' onClick={onClickAddrSearch}><img src="./img/h_search.svg" alt=""/>주소 검색</button>
                    <input type="text" id='address1' name='address1' placeholder='주소' value={주소1} onChange={onChangeAddr1}/>
                    <input type="text" id='address2' name='address2' placeholder='나머지 주소를 입력해주세요' value={주소2} onChange={onChangeAddr2}/>
                    <button type="button" className='address-rescan' onClick={onClickAddrSearch}><img src="./img/h_search.svg" alt=""/>재검색</button>
                    <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                  </div>
                </li>
                <li>
                  <div className="left"><label>성별</label></div>
                  <div className="right radio-btn">
                      <label htmlFor="male"><input type="radio" className='gender' id='male' name='gender' value='남자' onChange={onChangeGender} checked={성별.includes('남자')?true:false}/>남자</label>
                      <label htmlFor="female"><input type="radio" className='gender' id='female' name='gender' value='여자' onChange={onChangeGender} checked={성별.includes('여자')}/>여자</label>
                      <label htmlFor="none"><input type="radio" className='gender' id='none' name='gender' value='선택안함' onChange={onChangeGender} checked={성별.includes('선택안함')}/>선택안함</label>
                  </div>
                </li>
                <li>
                  <div className="left"><label htmlFor="">생년월일</label></div>
                  <div className="right birth">
                    <ul>
                      <li><input type="text" maxLength='4' id='year' name='year' placeholder='YYYY' value={생년} onChange={onChangeYear}/></li>
                      <li><i>/</i></li>
                      <li><input type="text" maxLength='2' id='month' name='month' placeholder='MM' value={생월} onChange={onChangeMonth}/></li>
                      <li><i>/</i></li>
                      <li><input type="text" maxLength='2' id='date' name='date' placeholder='DD' value={생일} onChange={onChangeDate}/></li>
                    </ul>
                    <p className="birth-error"></p>
                  </div>
                </li>
                <li>
                  <div className="left"><label>추가입력 사항</label></div>
                  <div className="right radio-btn add">
                    <div className="add-box">
                      <label><input type="radio" id='addId' name='add-input' className='add-input' value='추천인 아이디' onChange={onChangeAddInput} checked={추가입력사항.includes('추천인 아이디')}/>추천인 아이디</label>
                      <label><input type="radio" id='addEvent' name='add-input' className='add-input' value='참여 이벤트명' onChange={onChangeAddInput} checked={추가입력사항.includes('참여 이벤트명')}/>참여 이벤트명</label>
                    </div>
                    
                    <input type="text" id='inputBox' name='inputBox' value={추가입력사항상자} placeholder=''onChange={onChangeAddInputBox}/>
                    <p>
                      추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                      가입 이후는 수정이 불가능 합니다.<br/>
                      대소문자 및 띄어쓰기에 유의해주세요.
                    </p>
                  </div>
                </li>
                <li className='hr'>
                  <hr/>
                </li>
                <li>
                  <div className="left"><label htmlFor="agree">이용약관동의<i>*</i></label></div>
                  <div className="right agree">
                    <ul>
                      <li>
                        <label><input type="checkbox" id='checkAll' name='check_all' value='전체 동의합니다.' onChange={onChangeAgreeAll} checked={이용약관동의.length>=7?true:false}/>전체 동의합니다.</label>
                        <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                      </li>
                      <li>
                        <label className='after'><input type="checkbox" id='check1' name='check1' className='check' value='이용약관 동의(필수)' onChange={onChangeAgree} checked={이용약관동의.includes('이용약관 동의(필수)')?true:false}/>이용약관 동의</label>
                        <em>(필수)</em>
                        <span className='agree-view'>약관보기<img src="./img/agree_arrow.svg" alt=""/></span>
                      </li>
                      <li>
                        <label className='after'><input type="checkbox" id='check2' name='check2' className='check' value='개인정보 수집∙이용 동의(필수)' onChange={onChangeAgree} checked={이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}/>개인정보 수집∙이용 동의</label>
                        <em>(필수)</em>
                        <span className='agree-view'>약관보기<img src="./img/agree_arrow.svg" alt=""/></span>
                      </li>
                      <li>
                        <label className='after'><input type="checkbox" id='check3' name='check3' className='check' value='개인정보 수집∙이용 동의(선택)' onChange={onChangeAgree} checked={이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}/>개인정보 수집∙이용 동의</label>
                        <em>(선택)</em>
                        <span className='agree-view'>약관보기<img src="./img/agree_arrow.svg" alt=""/></span>
                      </li>
                      <li>
                        <label className='after'><input type="checkbox" id='check4' name='check4' className='check sms-all' value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' onChange={onChangeAgree} checked={이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}/>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label>
                        <em>(선택)</em>
                      </li>
                      <li>
                        <label><input type="checkbox" id='check5' name='check5' className='check sms-check' value='SMS' onChange={onChangeAgree} checked={이용약관동의.includes('SMS')}/>SMS</label>
                        <label><input type="checkbox" id='check6' name='check6' className='check sms-check' value='이메일' onChange={onChangeAgree} checked={이용약관동의.includes('이메일')}/>이메일</label>
                      </li>
                      <li><p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p></li>
                      <li>
                        <label className='after'><input type="checkbox" id='check7' name='check7' className='check' value='본인은 만 14세 이상입니다(필수)' onChange={onChangeAgree} checked={이용약관동의.includes('본인은 만 14세 이상입니다(필수)')}/>본인은 만 14세 이상입니다.</label>
                        <em>(필수)</em>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="submit">
                <button type='submit' className='submit-btn'>가입하기</button>
              </div>
            </form>
          </div>
        </div>
      </section>
   </main>
  );
};

// 프롭타입
MainComp.propTypes = {
  회원관리 : PropTypes.shape(
    {
      아이디: PropTypes.string.isRequired,
      아이디중복확인: PropTypes.bool.isRequired, //true or false
      isId: PropTypes.bool.isRequired,

      비밀번호: PropTypes.string.isRequired,
      isPwText1: PropTypes.bool.isRequired,
      isPwText2: PropTypes.bool.isRequired,
      isPwText3: PropTypes.bool.isRequired,

      비밀번호확인: PropTypes.string.isRequired,
      isPw1Text1: PropTypes.bool.isRequired,
      isPw2Text2: PropTypes.bool.isRequired,

      이름: PropTypes.string.isRequired,
      isName: PropTypes.bool.isRequired,

      이메일: PropTypes.string.isRequired,
      isEmailText1: PropTypes.bool.isRequired,
      isEmailText2: PropTypes.bool.isRequired,

      이메일중복확인: PropTypes.bool.isRequired, //true or false
      isEmail: PropTypes.bool.isRequired,

      휴대폰: PropTypes.string.isRequired,
      주소1: PropTypes.string.isRequired,
      주소2: PropTypes.string.isRequired,
      성별: PropTypes.string,
      생년: PropTypes.string,
      생월: PropTypes.string,
      생일: PropTypes.string,
      추가입력사항: PropTypes.string,
      추가입력사항상자: PropTypes.string,
      이용약관동의: PropTypes.array.isRequired,
    }
  )
}

// 회원가입 컴포넌트
MainComp.defaultProps={
  회원관리 : {
    아이디:'', //type: string
    아이디중복확인:false,
    isId: false,

    비밀번호:'',
    isPwText1: false,
    isPwText2: false,
    isPwText3: false,

    비밀번호확인:'',
    isPw1Text1: false,
    isPw2Text2: false,

    이름:'',
    isName: false,

    이메일:'',
    isEmailText1: false,
    isEmailText2: false,

    이메일중복확인:false,
    isEmail: false,

    휴대폰:'',
    주소1:'', 
    주소2:'',
    성별:'선택안함',
    생년:'',
    생월:'',
    생일:'',
    추가입력사항:'',
    추가입력사항상자:'',
    이용약관동의:[],
  }
}

export default MainComp;