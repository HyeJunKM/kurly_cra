;(($,window)=>{ //화살표함수

  const SignUp = {
    데이터 : { //작업한 모든 내용들을 여기에 저장
      가입회원:[],
      아이디:'',
      아이디중복확인:false,
      비밀번호:'',
      비밀번호확인:'',
      이름:'',
      이메일:'',
      이메일중복확인:false,
      휴대폰:'',
      인증번호:'',
      setId:0,
      휴대폰인증확인:false,
      주소1:'',
      주소2:'',
      성별:'',
      생년:'',
      생월:'',
      생일:'',
      추가입력사항1:'',
      추가입력사항2:'',
      이용약관:[], // 전체 7개 중 필수 3개, 선택 2개
      가입완료:false
    },
    
    init(){
      this.dbFn();
      this.idFn();
      this.pwFn();
      this.nameFn();
      this.emailFn();
      this.phoneFn();
      this.addrFn();
      this.genderFn();
      this.birthFn();
      this.addInputFn();
      this.agreeFn();
      this.idCheckFn();
      this.emailCheckFn();
      this.phoneCheckFn();
      this.submitFn();
    },
    dbFn(){
    
      let that = this;
      // 데이터베이스 서버에서 회원 데이터 가져와서 비교
      $.ajax({
        url: './member_select.php',
        type: 'GET',
        success: function(res){
          that.데이터.가입회원 = JSON.parse( res );
          console.log(JSON.parse( res ));
        },
        error: function(err){
          console.log(`ajax 회원 정보 가져오기 실패${err}`);
        },
      });

    },
    idFn(){
      const that = this;
      //아이디 검사 (입력제한 알고리즘 코딩) //global은 전체
      //6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합, 특수문자 입력과 동시에 삭제(replace)
      // + 1글자이상, * 0글자이상, ? 0글자 또는 1글자, . 1글자

      ////키보드 키가 눌리고(keydown) 올라오면(keyup) 입력값 받아서 처리
      $('#id').on({
        keyup: function(){

          const regExp1 = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g; //특수문자 -[]{}같은 애들은 앞에 역슬래시 써주기
          const regExp2 = /.{6,16}/g; //글자수 제한 (6~16자)
          const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g; //영문 1글자 필수, 숫자 조합 가능
          //영문(?=.*[A-Za-z]) : 영문 글자가 범위 내에서 한글자 이상 아무거나 무조건 들어가기
          const regExp4 = /\s/g; //공백(스페이스바) 금지 \d:숫자 \D:숫자가 아닌것 \s:공백 [^] ~가 아닌것

          //////////특수문자 삭제하기
          let idValue =$('#id').val(); //변수설정
          let result=idValue.replace(regExp1,''); //결과설정, true면 공백으로 변경
          $('#id').val(result); //출력

          ////////아무것도 입력 안 했을 때는 에러메시지 안 보이기
          if (idValue===''){$('.id-input .id-error').removeClass('on');}

          else {
            ////////////글자수 조건범위 또는(||) 영문 || 공백이면
            if(regExp2.test(idValue)===false || regExp3.test(idValue)===false || regExp4.test(idValue)===true ){
              $('.id-input .id-error').addClass('on');
            }
            else {
              $('.id-input .id-error').removeClass('on');
              that.데이터.아이디 = $(this).val();
            }
          }
        }
      });

      ///아이디 중복확인 모달창
      $('.id-check').on({
        click: function(){
          
          const regExp1 = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g; //특수문자 -[]{}같은 애들은 앞에 역슬래시 써주기
          const regExp2 = /.{6,16}/g; //글자수 제한 (6~16자)
          const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g; //영문 1글자 필수, 숫자 조합 가능
          //영문(?=.*[A-Za-z]) : 영문 글자가 범위 내에서 한글자 이상 아무거나 무조건 들어가기
          const regExp4 = /\s/g; //공백(스페이스바) 금지 \d:숫자 \D:숫자가 아닌것 \s:공백 [^] ~가 아닌것

          ////////아무것도 입력 안 했는데 버튼 클릭시 오류 모달창
          if ($('#id').val()===''){
            $('.member-modal').show();
            $('.modal-message').html(`아이디를 입력해주세요`);
          }

          else {
            // 아이디 조건 틀렸을 경우
            if(regExp1.test($('#id').val())===true || regExp2.test($('#id').val())===false || regExp3.test($('#id').val())===false || regExp4.test($('#id').val())===true ){
              $('.member-modal').show();
              $('.modal-message').html(`6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`);
            }
            else {
              that.데이터.아이디 = $('#id').val();
              that.idCheckFn();
            }
          }


        }
      });
      
    },
    pwFn(){

      const that = this;
      let pwValue ='';

      //비밀번호 조건
      //최소 10자 이상 입력 //영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 //동일한 숫자 3개 이상 연속 사용 불가
      $('#pw').on({
        keyup: function(){
          const regExp1 = /.{10,}/g; // 최소 10자
          const regExp2 = /((?=.*[A-Z])+(?=.*[0-9])+)+|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>])+)+|((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>])+)+/gi;
          // ((?=.*영문)+(?=.*숫자)+)+|((?=.*숫자)+(?=.*특문)+)+|((영문)+(특문)+)+
          const regExp3 = /\s/g; // 공백 금지
          const regExp4 = /(.)\1\1/g; // 동일 숫자 연속사용 금지

          pwValue =$('#pw').val(); //입력받음
          if (pwValue===''){$('.pw-input .pw-error').removeClass('on');}
          else {
            if (regExp1.test(pwValue)===false){
              $('.pw-input .pw-error').removeClass('on'); 
              $('.pw-input .pw-error1').addClass('on');
            }

            else if (regExp2.test(pwValue)===false||regExp3.test(pwValue)===true){
              $('.pw-input .pw-error').removeClass('on'); 
              $('.pw-input .pw-error2').addClass('on');
            }

            else if (regExp4.test(pwValue)===true){
              $('.pw-input .pw-error').removeClass('on'); 
              $('.pw-input .pw-error3').addClass('on');
            }
            else {
              $('.pw-input .pw-error').removeClass('on');
              that.데이터.비밀번호 = $(this).val();
            }
          }
        }
      });

      //////////////비밀번호 확인
      //동일한 비밀번호를 입력 / 빈칸일 때 비밀번호를 한번 더 입력해 주세요.
      $('#pw2').on({
        keyup: function(){
          let pw2Val = $('#pw2').val();
          let pw1Val = $('#pw').val();
          if (pw2Val===''){ //공백이면
            $('.pw-check .pw2-error').removeClass('on'); 
            $('.pw-check .pw2-error1').addClass('on');
          }
          else {
            $('.pw-check .pw2-error').removeClass('on');
            if (pw2Val!==pw1Val){ //!== 같지않으면
              $('.pw-check .pw2-error2').addClass('on');
            }
            else {
              $('.pw-check .pw2-error2').removeClass('on');
              that.데이터.비밀번호확인 = $(this).val();
            }
          }
        }
      });

    },
    nameFn(){
      
      const that = this;
      //이름 조건 //특수문자 입력과 동시에 삭제, 빈칸으로 두면 오류메시지
      $('#name').on({
        keyup:function(){
          const regExp = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]/g;

          let nameValue =$('#name').val(); //변수설정
          let result=nameValue.replace(regExp,''); //결과설정, true면 공백으로 변경
          $('#name').val(result); //출력 //특수문자 입력과 동시에 삭제

          if (nameValue===''){
            $('.name-input .name-error').addClass('on');
          } //빈칸이면 오류메시지
          else{
            $('.name-input .name-error').removeClass('on');
            that.데이터.이름 = $(this).val();
          }
        }
      });

    },
    emailFn(){
      const that = this;
      //이메일 조건 @필수(한번만) .선택 //gi :대소문자 구별없음
      // ;:[]",\ 금지 //@뒤에는 특수문자 사용불가(문자숫자만)
      $('#email').on({
        keyup: function(){
          const regExp = /^([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*@([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*.[a-z]{2,3}$/gi; 
          //^[영문숫자특문1자이상]@[영문숫자1자이상].([일부특문._\-]?1글자이상혹은없음[영문숫자0자이상]*)*선택사항.영문{2,3}$
          //괄호바깥*는 선택사항 //^$시작끝표시 //[^]는 제외사항 //마이너스 기호 오류나니까 역슬래시 써주기
          // /^[A-Z0-9]@[A-Z0-9]([._\-]?[A-Z0-9])*.[A-Z]{2,3}$/gi;
          // const regExp = /^ ( [A-Z0-9]+  [^@;:\[\]",\\]*  )+  @   [A-Z0-9]+  ([.\-_]?[A-Z0-9]+)*  .[A-Z]{2,3}  $/gi;

          let emailValue =$('#email').val(); //변수설정

          console.log(emailValue.match(regExp)); //매치함수 이용해서 점검

          //let result=emailValue.replace(regExp,''); //결과변수설정(생략가능), true면 공백으로 변경
          //$('#email').val(result); //출력 //특수문자 입력과 동시에 삭제

          if (emailValue===''){
            $('.email-input .email-error').removeClass('on');
            $('.email-input .email-error1').addClass('on');
          } //빈칸이면 오류메시지
          else {
            $('.email-input .email-error').removeClass('on');
            if (regExp.test(emailValue)===false){
              $('.email-input .email-error').removeClass('on');
              $('.email-input .email-error2').addClass('on');
            }
            else {
              $('.email-input .email-error').removeClass('on');
              that.데이터.이메일 = $(this).val();
            }
          }
        }
      });

      ///이메일 중복확인 모달창
      $('.email-check').on({
        click: function(){
          const regExp = /^([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*@([a-z0-9]+[^\s]*)+([._\-]?[a-z0-9]*)*.[a-z]{2,3}$/gi; 
          //^[영문숫자특문1자이상]@[영문숫자1자이상].([일부특문._\-]?1글자이상혹은없음[영문숫자0자이상]*)*선택사항.영문{2,3}$
          //괄호바깥*는 선택사항 //^$시작끝표시 //[^]는 제외사항 //마이너스 기호 오류나니까 역슬래시 써주기
          // /^[A-Z0-9]@[A-Z0-9]([._\-]?[A-Z0-9])*.[A-Z]{2,3}$/gi;
          // const regExp = /^ ( [A-Z0-9]+  [^@;:\[\]",\\]*  )+  @   [A-Z0-9]+  ([.\-_]?[A-Z0-9]+)*  .[A-Z]{2,3}  $/gi;

          let emailValue =$('#email').val(); //변수설정

          console.log(emailValue.match(regExp)); //매치함수 이용해서 점검

          //let result=emailValue.replace(regExp,''); //결과변수설정(생략가능), true면 공백으로 변경
          //$('#email').val(result); //출력 //특수문자 입력과 동시에 삭제

          if (emailValue===''){
            $('.member-modal').show();
            $('.modal-message').html(`이메일을 입력해주세요`);
          } //빈칸이면 오류메시지
          else {
            if (regExp.test(emailValue)===false){
              $('.member-modal').show();
              $('.modal-message').html(`이메일 형식으로 입력해주세요`);
            }
            else {
              that.데이터.이메일 = $('#email').val();
              that.emailCheckFn();
            }
          }

        }
      });
    },
    phoneFn(){

      const that = this;
      let num = null; //인증번호 변수 (phoneFn 내에서만 사용가능)
      let m = 02; //2 min
      let s = 59; //59 sec 

      //////폰번호 조건 /10자 이상이면 인증번호 버튼 클릭가능
      $('#phone').on({
        keyup:function(){

          //const regExpHome =/[0-9]{2,3}[0-9]{3,4}[0-9]{4}/g;
          const regExp1 = /[`~!@#$%^&*()\-_=+|\\\{\}\[\]'";:?.,<>]*[^\d]/g;

          let phoneValue =$('#phone').val(); //변수설정

          ///숫자가 아닌 문자 자동삭제
          $('#phone').val(phoneValue.replace(regExp1,''));
          phoneValue =$('#phone').val(); //결과출력

          /////////폰번호 10글자 이상일때 버튼 활성화
          if(phoneValue.length>=10){
            $('.phone-check').show();
            $('.phone-check-other').hide();
            $('.phone-check').addClass('on');
            $('.phone-check').attr('disabled',false); //disabled 풀어주기

            $('#phone2').val('')
                        .focus();
          }
          else {$('.phone-check').removeClass('on');}

          /////////폰번호 조건
          if (phoneValue===''){
            $('.phone-input .phone-error').removeClass('on');
            $('.phone-input .phone-error1').addClass('on');
          }
          else {
            $('.phone-input .phone-error').removeClass('on');
            that.데이터.휴대폰 = $(this).val();
          }
        }
      });

      /////////인증번호 받기 버튼 클릭 이벤트 //클릭 정규표현식 검증
      $('.phone-check').on({
        click: function(e){
          e.preventDefault();

          const regExp =/01[0|1|6|7|8|9]+[0-9]{3,4}[0-9]{4}/g;
          let phoneValue =$('#phone').val(); //변수설정

          if (regExp.test(phoneValue)===false){
            $('.phone-input .phone-error').removeClass('on');
            $('.phone-input .phone-error2').addClass('on');
          }
          else { //제대로 입력했을때
            $('.phone-input .phone-error').removeClass('on');

            num = Math.floor(Math.random()*900000+100000); //인증번호 발송 (랜덤 6자리 숫자)

            that.데이터.인증번호 = num; //인증번호 잠시 보관

            $('.member-modal').show();
            $('.modal-message').html(`인증번호가 발송되었습니다.<br>${num}`);

            //인증번호 입력칸 보이기
            $('.phone2-box').css({display:'flex'}); //원래는 show() 쓰면 되는데 li 전체에 flex있어서 상자 정렬이 안됨

            //3분 타이머 실행
            timerCount();
          }
        }
      });

      //////////////3분 타이머 함수
      function timerCount(){
        m = 02; //02 min
        s = 59; //59 sec
        that.데이터.setId= setInterval(function(){
          s--;
          if (s<0){///60초 경과
            s=59; m--;
            if (m<0){
              s=0; m=0; clearInterval(that.데이터.setId); //초기화, 타이머 중지
              $('.member-modal').show();
              $('.modal-message').html(`유효 시간이 만료되었습니다.<br>다시 시도해 주세요.`);
              $('.phone2-box').hide();
              return; //끝났다는 표시
            }
          }
  
          $('.min').text(`${m<10 ? '0'+m : m}`);
          $('.sec').text(`${s<10 ? '0'+s : s}`);
        },1000); //1초에 한번씩 실행
      }

      //인증번호 모달 닫기
      $('.member-modal-close').on({
        click: function(){
          $('.member-modal').hide(0);
          //모달창 닫고 인트로 페이지로 이동
          if (that.데이터.가입완료===true){location.href='../../../';} //$path
        }
      });

      /////////인증번호 입력창 조건 / 빈칸이 아니면 확인버튼 활성화 / 숫자제외 다른건 전부 삭제
      $('#phone2').on({
        keyup: function(){
          let phone2Value = $('#phone2').val();

          const regExp = /[^\d]/g; //숫자 제외 전부 
          $('#phone2').val(phone2Value.replace(regExp,'')); //입력과 동시에 삭제

          if (phone2Value.length > 1){ //1글자이상 입력되면
            $('.phone-check-ok').addClass('on');
            $('.phone-check-ok').attr('disabled', false);
          }
          else {
            $('.phone-check-ok').removeClass('on');
            $('.phone-check-ok').attr('disabled', true);
          }
        }
      });

      /////////인증번호 확인버튼 클릭이벤트
      $('.phone-check-ok').on({
        click: function(e){
          e.preventDefault();
          that.phoneCheckFn();
        }
      });

      //// 다른번호 인증버튼 눌렀을때 초기화
      $('.phone-check-other').on({
        click: function(e){
          e.preventDefault();
          $('#phone').attr('disabled', false)
                      .val('') //원래 있던 내용 삭제
                      .focus(); //입력대기상태
          $('.phone-error1').addClass('on');
        }
      });
    },
    addrFn(){

      const that = this;
      let $child = '';

      function popupFn(){
        const popW = 530;
        const popH = 615;
        const popName = 'popup';
        const popFile = './popup.php';

        let winW = $(window).innerWidth();
        let winH = $(window).innerHeight();
        let top = (winH-popH)/2;
        let left = (winW-popW)/2;

        $child = window.open(popFile,popName,`width=${popW}, height=${popH}, top=${top}, left=${left}`);
      }

      //let childAddr1Val = $child.$('#address1').val(); //부모 창에서 자식창의 입력상자 값 가져오기

      //let parentAddr1Val = opener.$('#address1').val(); //자식창에서 부모창의 입력값 가져오기

      ///팝업창열기
      $('.address-search').on({
        click: function(e){
          e.preventDefault();
          popupFn();
        }
      });

      $('.address-rescan').on({
        click: function(e){
          e.preventDefault();
          popupFn();
        }
      });

      //팝업창에서 저장한 로컬스토리지 데이터를 가져와서 비교하고 kurly address 키가 있다면 유지
      function addressFn (){
        let addrKey = 'kurly address';
        let key = '';
        let Obj = '';

        for (i=0; i<sessionStorage.length; i++){
          if(sessionStorage.key(i)===addrKey){ //로컬스토리지에서

            $('#address1, #address2, .address-rescan').show(); //display:none 했던거 풀기
            $('.address-search').hide();

            key = sessionStorage.getItem(addrKey); //키(주소2) 가져오기
            Obj = JSON.parse(sessionStorage.getItem(key)); //키를 이용해서 주소1, 주소2 가져오기

            $('#address1').val(Obj.주소1); //화면에는 보이게 한다
            $('#address2').val(Obj.주소2);
            that.데이터.주소1 = Obj.주소1;
            that.데이터.주소2 = Obj.주소2;
          }
        }
      }
      addressFn();
      
    },
    genderFn(){

      const that = this; 

      $('.gender').each(function(idx,item){
        //console.log(idx, item.value, item.id, item.type, item.name);
        $(this).on({
          change: function(){
            // console.log(this); //this = .gender (개체, 즉 태그요소들)
            // console.log(that.데이터); // signUp 객체(object)
            // console.log(that.데이터.성별); // signUp.gender의 속성값
            that.데이터.성별 = $(this).val();
          }
        });
      });
    },
    birthFn(){
      const that = this;
      const regExpNumX = /[\D]/g; //숫자가 아닌 것
      // const regExpYear = /^(?:192[2-9]|19[3-9][\d]|20[\d][\d])$/g; //1922~2099년
      // const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g; //1~12월 또는 01~12월
      // const regExpDate = /^(?:0?[1-9]|1[\d]|2[\d]|3[0-1])$/g; //1~31일 또는 01~31일

      const regExpYear  = /^(?:19(?:2[2-9]|[3-9][0-9])|2[0-9][0-9][0-9])$/g; //1. 생년 (1900~1999) ~ (2000~2999)
      const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g;  //2. 생월 01 .. 09  ~ 10  11  12 const regExpMonth = /^(?:0?[1-9]|10|11|12)$/g;        
      const regExpDate  = /(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])/g;  

      function birthCheck(){ //생년월일 확인 알고리즘

      }

      const nowYear = new Date().getFullYear();  //2022     
      $('#year').on({
          keyup: function(){
            $(this).val( $(this).val().replace(regExpNumX,'') );
            
            if($(this).val()===''){
                $('.birth-error').removeClass('on');
            }                    
            else if( Number($(this).val()) > nowYear ){ //미래년도 2023 ~
                $('.birth-error').addClass('on')
                                .text('생년월일이 미래로 입력되었습니다.');
            } 
            else if( Number($(this).val()) >= nowYear-14 ){ //14미만   20022 ~ 2008
                $('.birth-error').addClass('on')
                                .text('만 14세 미만은 가입이 불가합니다.');
            }                    
            else{
                if( regExpYear.test( $(this).val().toString() ) === false ){
                      $('.birth-error').addClass('on')
                                      .text('생년월일을 다시 확인해주세요.');
                }               
                else{
                      $('.birth-error').text('태어난 월을 정확하게 입력해주세요.');
                }  
            } 
          }
        });

      $('#month').on({
        keyup: function(){
          $('#month').val( $('#month').val().replace(regExpNumX,'') );

          if( $('#year').val() ==='' ){ //년도가 비어있으면 
            $('.birth-error').addClass('on')
                              .text('태어난 년도 4자리를 정확하게 입력해주세요.');
          }
          else{
            if( $('#month').val()==='' ){
                $('.birth-error').addClass('on')
                                .text('태어난 월을 정확하게 입력해주세요.');
            }
            else{
              if( regExpMonth.test($('#month').val().toString()) === false ){
                $('.birth-error').addClass('on')
                                  .text('태어난 월을 정확하게 입력해주세요.');
              }
              else{
                $('.birth-error').addClass('on')
                                  .text('태어난 일을 정확하게 입력해주세요.');
              }
            }
          }
        }
      });

      $('#date').on({
        keyup: function(){
          $('#date').val( $('#date').val().replace(regExpNumX,'') );

          if($('#year').val()===''){ //년도가 비어있으면 
            $('.birth-error').addClass('on')
                              .text('태어난 년도 4자리를 정확하게 입력해주세요.');
          }
          else if($('#month').val()===''){ //월이 비어있으면 
            $('.birth-error').addClass('on')
                              .text('태어난 월을 정확하게 입력해주세요.');
          }
          else{
            if( $('#date').val()==='' ){
                $('.birth-error').addClass('on')
                                .text('태어난 일을 정확하게 입력해주세요.');
            }
            else{
              if( regExpDate.test( $('#date').val().toString() ) === false ){
                $('.birth-error').addClass('on')
                                  .text('태어난 일을 정확하게 입력해주세요.');
              }
              else{
                if( Number($('#date').val()) > 31 ){
                    $('.birth-error').addClass('on')
                                    .text('태어난 일을 정확하게 입력해주세요.');
                }  
                else{
                    $('.birth-error').removeClass('on');
                    that.데이터.생년 = $('#year').val();
                    that.데이터.생월 = $('#month').val();
                    that.데이터.생일 = $('#date').val();
                } 
              }
            }
          }
        }
      });


      // 태어난 년도 4자리를 정확하게 입력해주세요. -4자리 미만일때 / 생년월일을 다시 확인해주세요. -오류 발생했을때
      // 만 14세 미만은 가입이 불가합니다. / 생년월일이 미래로 입력 되었습니다. 
      // 태어난 월을 정확하게 입력해주세요. / 태어난 일을 정확하게 입력해주세요.

/*       $('#year').on({
        keyup: function(){
          $(this).val( $(this).val().replace(regExpNumX,'') );

          if ( $(this).val==='' ){$('.birth-error').removeClass('on');} //공백이면 에러미시지 삭제
          else {
            if ( regExpYear.test( $(this).val() )===false ){
              $('.birth-error').removeClass('on');
              $('.birth-error1').addClass('on');
            }
            else {
              $('.birth-error').removeClass('on');
              $('.birth-error5').addClass('on');
            }
          }

        }
      });

      $('#month').on({
        keyup: function(){
          $(this).val( $(this).val().replace(regExpNumX,'') );
          if ( $('#year').val==='' ){$('.birth-error1').addClass('on');}
          else {
            if ( $(this).val==='' ){$('.birth-error5').addClass('on');}
            else {
              if ( regExpMonth.test( $(this).val() )===false ){
                $('.birth-error').removeClass('on');
                $('.birth-error5').addClass('on');
              }
              else {
                $('.birth-error').removeClass('on');
                $('.birth-error6').addClass('on');
              }
            }
          }
        }
      });

      $('#date').on({
        keyup: function(){
          $(this).val( $(this).val().replace(regExpNumX,'') );
          if ( $('#month').val==='' ){$('.birth-error5').addClass('on');}
          else {
            if ( $(this).val==='' ){$('.birth-error6').addClass('on');}
            else {
              if ( regExpDate.test( $(this).val() )===false ){
                $('.birth-error').removeClass('on');
                $('.birth-error6').addClass('on');
              }
              else {
                $('.birth-error').removeClass('on');
              }
            }
          }
        }
      }); */
    },
    addInputFn(){
      const that = this;
      $('.add-input').each(function(idx,item){
        $(this).on({
          change: function(){
            $('#inputBox').attr('placeholder',item.value);
            that.데이터.추가입력사항1 = $(this).val();
          },
          click: function(){
            $('#inputBox, p').show();
            //console.log(that.데이터); //데이터출력
          }
        });
      });
      //키보드 입력과 동시에 저장
      $('#inputBox').on({
        keyup: function(){
          that.데이터.추가입력사항2 = $('#inputBox').val();
        }
      });
    },
    agreeFn(){
      //전체동의 자동선택(해제) / 체크박스 선택은 반복객체(.each) 처리  
      //반복문 종류 while(){}, for(){}, $.each(), forEach(), map()

      /* $('.check').each(function(idx, item){
        $(this).on({
          change: function(){ //라디오버튼, 셀렉트박스 이벤트는 change
            // if ($(this).is(':checked')===true){ //현재 선택된 항목 확인 
            //  console.log(idx, item.value);
            // }
            // if ($('.check').eq(idx).is(':checked')===true){ //전체 체크박스에서 확인할때 사용
            // console.log(idx, item.value);
            //}
          }
        });
      }); */

      const that = this;

      //각각 항목 체크 //방법1
      /* $('.check').on({
        change: function(){
          checkState();
        }
      }); */ 
      //각각 항목 체크 //방법2 - 더유용
      $('.check').each(function(){
        $(this).on({
          change: function(){
            checkState();
          }
        });
      });
      

      function checkState (){ //체크 갯수 카운트, 집계(피봇)
        let cnt = 0;
        let arr = []; //임시 배열 보관장소
        $('.check').each(function(idx, item){
          if ($(this).is(':checked')===true){
            cnt++;
            //console.log(cnt + ' 체크된 항목: '+ item.value);
            //체크한 항목 value값 배열에 추가하기
            //that.데이터.이용약관 = item.value;
            arr = [...that.데이터.이용약관,item.value]; // 이전 데이터에 새로운 데이터를 누적하겠다 / ... : 이전데이터 (전개연산자) 
          }
          else {
            //체크해제시 배열에서 삭제 / arr = arr.filter(필드!=='사과'); 
            //재배열 arr = arr.filter((배열값)=> 배열값 !== 선택 취소한 값); 
            arr = arr.filter((val)=>val!==item.value); 
          } 
        });

        arr=[...new Set(arr)];///중복된 데이터 제거
        that.데이터.이용약관 = arr; //최종 정리된 데이터 저장

        //console.log(that.데이터.이용약관);

        //7개 선택되었을 때 전체동의 자동선택
        if (cnt===7){$('#checkAll').prop('checked', true);}
        else {$('#checkAll').prop('checked', false);}
      }

      let 이용약관전체동의 = [
        '이용약관 동의(필수)', 
        '개인정보 수집∙이용 동의(필수)', 
        '개인정보 수집∙이용 동의(선택)', 
        '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', 
        'SMS', 
        '이메일', 
        '본인은 만 14세 이상입니다(필수)'
      ]
      
      //전체동의 클릭시 전체 체크
      $('#checkAll').on({
        change: function(){

          let {이용약관} = that.데이터; //비구조화 (구조 분할 할당) => 이 이후에는 반드시 이것만 사용(제이쿼리)

          if ($(this).is(':checked')===true){
            $('.check').prop('checked', true);
            //that.데이터.이용약관 = [...that.데이터.이용약관, 이용약관전체동의]; //배열 누적해서 추가
            이용약관 = [...이용약관, 이용약관전체동의]; //배열 누적해서 추가
          }
          else {
            $('.check').prop('checked', false);
            //that.데이터.이용약관 = []; //빈칸으로 두면 배열 삭제
            이용약관 = []; //빈칸으로 두면 배열 삭제
          }
          //console.log(이용약관);
        }
      });

      //////////////수신동의 클릭 sms-check
      function smsState(){
        let cnt = 0;
        $('.sms-check').each(function(){
          if ($(this).is(':checked')){
            cnt++;
          }
        });

        if (cnt===2){$('.sms-all').prop('checked', true);}
        else {$('.sms-all').prop('checked', false);}
      }

      $('.sms-check').each(function(){
        $(this).on({
          change: function(){
            smsState();
          }
        });
      });

      $('.sms-all').on({
        change: function(){
          if ($(this).is(':checked')){
            $('.sms-check').prop('checked', true);
          }
          else {$('.sms-check').prop('checked', false);}
        }
      });
    },
    idCheckFn(){
      
      //임시 배열 만들어서 데이터 보관할거예요 (아이디 비교용) - 객체를 여러개 만들면 배열
      let that = this;
      let imsi = [];
      let result = [];
      let 아이디중복확인 = '';

      imsi = that.데이터.가입회원;


      //////////임시배열 객체에 전개연산자를 이용하여 데이터 누적저장
      // for (let i=0; i<localStorage.length; i++){
      //  imsi = [...imsi, JSON.parse( localStorage.getItem(localStorage.key(i)) )]; //임시배열에 데이터 누적출력 ES6
      // }
        //console.log(localStorage.key(i)); //키 가져오기
        //console.log( JSON.parse( localStorage.getItem(localStorage.key(i)) ) ); //키값 출력
        //imsi.push(JSON.parse( localStorage.getItem(localStorage.key(i)) )); //임시배열에 데이터 누적출력 ES5

      //데이터베이스 조회하면 더이상 로컬스토리지 사용x
      //아이디만 추출해서 중복검사
      //반복문으로 아이디 비교, 결과는 result에 보관 / result 안에 ture, false 를 최종 includes()로 비교
      console.log('입력상자 아이디 '+$('#id').val());
      console.log(imsi);

      result = imsi.map( (item)=>item.아이디===$('#id').val() );
      //console.log(result); //배열로 반환된 값

      //////아이디 공백이 아닌 경우에만 실행
      if ($('#id').val()===''){
        $('.member-modal').show(0);
        $('.modal-message').html(`아이디를 입력해주세요.`);
        $('#id').focus();
      }
      else {
        if (result.includes(true)){ //배열 안에 true 논리값이 포함되어 있는지 검증
          $('.member-modal').show(0);
          $('.modal-message').html(`사용 불가능한 아이디 입니다.`);
          아이디중복확인 = false;
        }
        else { 
          $('.member-modal').show(0);
          $('.modal-message').html(`사용할 수 있는 아이디 입니다.`);
          아이디중복확인=true; //중복검사완료
        }
      }
      return 아이디중복확인;
    },
    emailCheckFn(){
      
      let that = this;
      let imsi = [];
      let result = []; //여러개면 배열[]써도 되고 아니면 null도 가능
      let 이메일중복확인='';

      imsi = that.데이터.가입회원; 
      /////////////데이터베이스 사용시 로컬스토리지 사용안함

      /// 1. 로컬스토리지 데이터 가져오기 - key 사용해서 키값(value)가져오기 localStorage.getItem( localStorage.key(i) )
      // 2. 임시배열에 저장 imsi = [...imsi, 데이터]
      // 3. 임시배열에서 이메일 비교 imsi.map() 
      // 4. map함수 결과 배열값 중에 true 있는지 확인(있으면 중복된 이메일) result.includes(true) 
      // 5. 모달창 띄우고 인증완료 true로 변경 

      //for (let i=0; i<localStorage.length; i++){
      //  imsi = [...imsi, JSON.parse(localStorage.getItem( localStorage.key(i) ))];
      //}
      result = imsi.map((data)=>data.이메일===$('#email').val());


      ///////////////이메일 칸 공백이 아닐 경우 실행
      if ($('#email').val()===''){
        $('.member-modal').show(0);
        $('.modal-message').html(`이메일을 입력해주세요.`);
        $('#email').focus();
      }
      else {
        if (result.includes(true)){
          $('.member-modal').show(0);
          $('.modal-message').html(`사용 불가능한 이메일 입니다.`);
          이메일중복확인=false;
        }
        else {
          $('.member-modal').show(0);
          $('.modal-message').html(`사용 가능한 이메일 입니다.`);
          이메일중복확인=true;
        }
      }
      return 이메일중복확인;
    },
    phoneCheckFn(){
      let that = this;
      let 휴대폰인증확인 = '';

      // num 변수값은 인증번호 발송과 동시에 루트 변수(that.데이터.인증번호)에 저장하고, 나중에 가져와서 비교

      if (that.데이터.인증번호===Number($('#phone2').val())){ //사람이 입력할때는 숫자도 문자로 인식하므로 입력값 앞에 Number()적어줘야함 
        $('.member-modal').show();
        $('.modal-message').html(`인증에 성공하였습니다.`);
        //인증번호 입력칸, 버튼 사라짐 / 인증번호 받기 버튼은 다른번호 인증 으로 변경 / 휴대폰 입력칸은 비활성화, 다른번호 버튼 누르면 활성화
        $('.phone2-box').hide(); //입력칸 없애기
        $('.phone-check').hide();
        $('.phone-check-other').show();
        $('#phone').attr('disabled',true);
        휴대폰인증확인=true; //휴대폰 인증완료 
        clearInterval(that.데이터.setId);
      }
      else {
        if ($('#phone2').val()===''){$('.member-modal').hide();}
        else {
          $('.member-modal').show();
          $('.modal-message').html(`잘못된 인증 코드입니다.`);
          휴대폰인증확인=false;
        }
      }
      return 휴대폰인증확인;
    },
    submitFn(){

      const that = this;
      let cnt = 0;


      //////////전송버튼 클릭
      $('.submit-btn').on({
        click: function(e){
          e.preventDefault();
          
          that.데이터.주소1 = $('#address1').val();
          that.데이터.주소2 = $('#address2').val();
          //유효성 검사 (아이디~이용약관까지 필수요소 확인)
          that.데이터.아이디중복확인 = that.idCheckFn(),  //true or false로 검증
          that.데이터.이메일중복확인 = that.emailCheckFn(),
          that.데이터.휴대폰인증확인 = that.phoneCheckFn(),

          
          ////// 체크된 값들을 배열에 저장

          //이용약관 필수 3개 반드시 선택

          $('.check').each(function(idx, item){
            //console.log(idx,item.value);
            if ($(this).is(':checked')){ //선택자 객체
              that.데이터.이용약관 = [...that.데이터.이용약관, item.value];
              console.log(item.value.indexOf('필수'));
              if (item.value.indexOf('필수')>=0){ 
                //item.value 값 안에 필수항목 갯수 카운트 
                // 특정문자열 검색하는법 : search(), indexOf(문자열) - 찾으면 글자위치, 못찾으면 -1 출력
                cnt++;
              }
              else {}
            }
          });

          //console.log(`that.데이터 ${that.데이터}`);


          if (that.데이터.아이디===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`아이디를 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.비밀번호===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`비밀번호를 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.비밀번호확인===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`비밀번호를 한번 더 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.이름===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`이름을 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.이메일===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`이메일을 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.휴대폰===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`휴대폰을 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.주소1===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`주소를 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.주소2===''){
            $('.member-modal').show(0);
            $('.modal-message').html(`나머지 주소를 입력해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (cnt<3){
            $('.member-modal').show(0);
            $('.modal-message').html(`이용약관의 필수 항목을 선택해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.아이디중복확인===false){
            $('.member-modal').show(0);
            $('.modal-message').html(`아이디 중복확인을 해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.이메일중복확인===false){
            $('.member-modal').show(0);
            $('.modal-message').html(`이메일 중복확인을 해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }

          if (that.데이터.휴대폰인증확인===false){
            $('.member-modal').show(0);
            $('.modal-message').html(`휴대폰 인증을 해주세요.`);
            return;
          }
          else {
            $('.member-modal').hide(0);
            $('.modal-message').html(``);
          }


          ////////////////// 회원가입 데이터 정리, 로컬스토리지에 저장 -> 데이터베이스(닷홈) 저장 ////////////
          const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;

          let 마켓컬리회원 = {
            ///idx : auto increment (자동증가 인덱스번호)-> AI 유일성
            아이디: that.데이터.아이디, 
            비밀번호: that.데이터.비밀번호, 
            이름: that.데이터.이름,
            이메일: that.데이터.이메일,
            휴대폰: that.데이터.휴대폰.replace(regExpHp, '$1-$2-$3'),
            주소: `${that.데이터.주소1} ${that.데이터.주소2}`,
            성별: that.데이터.성별,
            생년월일: that.데이터.생년!==''?(`${that.데이터.생년}-${that.데이터.생월}-${that.데이터.생일}`):'',
            추가입력사항: that.데이터.추가입력사항1!==''?(`${that.데이터.추가입력사항1}, ${that.데이터.추가입력사항2}`):'',
            이용약관: that.데이터.이용약관,
            가입일자: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
          }

          //localStorage.setItem(마켓컬리회원.아이디, JSON.stringify(마켓컬리회원)); //데이터라는 이름으로 저장한다

          // ajax 전송
          $.ajax({
            url: './response.php',
            type: 'POST',
            data: { //php에 보낼 데이터
              id: 마켓컬리회원.아이디,
              pw: 마켓컬리회원.비밀번호,
              name: 마켓컬리회원.이름,
              email: 마켓컬리회원.이메일,
              phone: 마켓컬리회원.휴대폰,
              addr: 마켓컬리회원.주소,
              gender: 마켓컬리회원.성별,
              birth: 마켓컬리회원.생년월일,
              add_input: 마켓컬리회원.추가입력사항,
              service_: JSON.stringify(마켓컬리회원.이용약관),
              day: 마켓컬리회원.가입일자
            },
            success: function(res){
              that.데이터.가입완료 = true;
              $('.member-modal').show(0);
              $('.modal-message').html(`${마켓컬리회원.이름}님 반갑습니다!`);
              //모달창 닫고 인트로 페이지로 이동
            },
            error: function(err){
              console.log('AJAX 실패', err);
            }
          });
        }
      });
    }
  }
  SignUp.init();

})(jQuery,window);
