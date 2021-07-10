/*
  jquery의 $(document).ready()와 같은 vanilla js 문법 : 
  document.addEventListener('DOMContentLoaded', function() {
    // 실행할 동작
  })
*/
 
 // 1~9까지 수 중 랜덤한 두 수를 뽑아 구구단을 만듬
 var num1 = Math.ceil(Math.random() * 9);
 var num2 = Math.ceil(Math.random() * 9);
 var res = num1 * num2;

 var body = document.body;
 // <div></div> 태그를 만듬 (word)
 var word = document.createElement('div');

 // 만든 word 변수의 텍스트를 지정(랜덤으로 뽑아온 숫자값으로 구구단을 만들어 실행)
 word.textContent = String(num1) + ' 곱하기 ' + String(num2) + '는?';
 document.body.append(word);



 // 구구단의 결과값을 입력받아 정답 여부를 판별할 form + input + button 태그 생성(createElement + body append)
 var form = document.createElement('form');
 document.body.append(form);

 var input = document.createElement('input');
 input.type = 'number'; //숫자를 입력 받을 것이므로 input 태그의 type을 number로 지정
 form.append(input);

 var button = document.createElement('button');
 button.textContent = "입력!";
 form.append(button); // form 태그 안에 input, button이 들어가므로 form.append

 // 구구단 입력에 따른 정답 여부를 보여줄 div 태그 생성 + body에 append
 var result = document.createElement('div');
 document.body.append(result);

 form.addEventListener('submit', function check (e) {
   e.preventDefault();

   // 입력받은 value값과 일치하면(=정답이면)
   if (res === Number(input.value)) {
     result.textContent = "정답입니다!";

     // 정답이면 새로운 구구단 문제 생성하여, 구구단 문제란에 내용 변경
     // 기존 입력된 결과값을 초기화하기 위해 input 태그의 value값을 초기화
     var num1 = Math.ceil(Math.random() * 9);
     var num2 = Math.ceil(Math.random() * 9);
     res = num1 * num2;
     word.textContent = String(num1) + ' 곱하기 ' + String(num2) + "는?";
     input.value = "";
     input.focus();
   
   } else {
     result.textContent = "땡!";
     input.value = ""; 
     input.focus();
   }
 })