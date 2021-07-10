// 스트라이크 : 자리수+숫자 맞춤, 볼 : 숫자는 맞추고 자리수 틀림, 4 Strike : 홈런!

var body = document.body;
var allNumber;
var numberArray;

function 숫자뽑기() {
    allNumber = [1,2,3,4,5,6,7,8,8];
    numberArray = [];

    for (var i=0; i<4; i++) {
        // splice : begin~end 전까지의 복사본을 새로운 배열 객체로 반환
        var choose = allNumber.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        numberArray.push(choose);
    }
}

숫자뽑기();
console.log(numberArray);

var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
form.append(input);
input.type = "text";
input.maxLength = 4; // 최대 네자리 수까지 입력

var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

var wrongCnt = 0; //열번 틀리면 땡!
form.addEventListener('submit', function check(e) {
    e.preventDefault();
    var userInput = input.value;
    if (userInput === numberArray.join('')) {
        result.textContent = '홈런';
        input.value = '';
        input.focus();
        // 재 함수 호출로 새로운 숫자 생성
        숫자뽑기();
        wrongCnt = 0;
    }
     else { // 답이 틀릴 경우, 볼/스트라이크 여부 알려주기
         var answerArray = userInput.split('');
         var strike = 0;
         var ball = 0;
         wrongCnt += 1;

         if (wrongCnt > 10) {
             result.textContent = '10번 넘게 틀려서 실패! 답은' + numberArray.join(',') + '였습니다';
             input.value = '';
             input.focus();
             숫자뽑기();
             wrongCnt = 0;
         } else {
             console.log('답이 틀리면', answerArray);
             for (var i=0; i<=3; i++) {
                 if (Number(answerArray[i] === numberArray[i])) { // 같은 자리수라면
                     console.log('같은 자리!');
                     strike += 1;

                 } else if (numberArray.indexOf(Number(answerArray[i])) > -1) {
                     // 같은 자리는 아니지만, 숫자가 겹치는지 확인
                     console.log('자리는 다르지만 숫자 같음');
                     ball += 1;
                 }
             }

             result.textContent = strike + '스트라이크, ' + ball + '볼 입니다.';
             input.value = '';
             input.focus();

         }
    }
})