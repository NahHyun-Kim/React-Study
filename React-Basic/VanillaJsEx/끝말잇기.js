var body = document.body;
var word = document.createElement('div');

word.textContent = '나현이';
// 끝말잇기 첫 시작 단어를 body에 append
document.body.append(word);

// form 태그, 입력창 input을 생성
var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
form.append(input);

// 입력 버튼, 입력 결과에 따른 결과멘트 표시 div 생성
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

var resultMent = document.createElement('div');
document.body.append(resultMent);


// 끝말잇기 정답 / 오답 여부를 체크할 함수 생성(submit 호출 시)
form.addEventListener('submit', function check (e) {
    e.preventDefault();

    // word의 마지막 글자와 input에 입력한 첫 글자가 일치하는 경우, 정답 처리(length-1 : 마지막, [0] : 첫번째 글자)
    if (word.textContent[word.textContent.length - 1] === input.value[0]) {
        resultMent.textContent = '참 잘했어요!';
        // 정답 시, 해당 단어를 끝말잇기 문제에 쓰일 단어로 변경
        word.textContent = input.value;
        input.value = '';
        input.focus();
    }
     else {
         resultMent.textContent = '땡!';
         input.value = '';
         input.focus();
    }
})

