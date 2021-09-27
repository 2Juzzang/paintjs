const canvas = document.getElementById("jsCanvas");
// context는 canvas안에서 픽셀을 다룬다.
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
// 브러쉬 크기 조절
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//기본값 설정, 변수에 겹치는 값이 있을 경우 만들어주면 좋음 여기선 stroke, fill 색상을  
const Initial_color = "#2c2c2c"


// 캔버스를 pixel을 다룰 수 있는 element로 만듦
const canvasSize = 700;
canvas.width = canvasSize;
canvas.height = canvasSize;

// 기본 브러쉬 색 설정
ctx.strokeStyle = Initial_color;
// 브러쉬 두께 설정
ctx.lineWidth = 2.5;

let filling = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasSize, canvasSize);
// 사각형 렌더링 x,y 좌표와 가로, 세로 크기 설정

// 새로고침하면 그려지는게 아니라 클릭시 그려지게 해야함 >> 조건문으로 만들기
function FillingCanvas() {
    if (filling) {
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}

// 마우스 움직임
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // !painting은 !false 이므로 이는 만약 true 라면이 되겠다.
    if(!painting){
        //path의 시작을 알리는 함수 
        //path의 좌표는 찍히지만 그려지고 있진 않다.
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        // 클릭시 라인이 그려지기 시작
        // lineto = 현재 서브 패스의 마지막점을 특정 좌표와 직선으로 연결한다. 전 위치와 다음 위치가 연결되기 때문에 그려지게 되는 것
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// true가 되면 그리기 시작
let painting = false;

//그리기 멈춤
function stopPainting() {
    painting = false ;
}
//그리기 시작
function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    // 색깔을 뽑아 변수에 담고 기본 브러쉬 색을 변경해줌
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(color);
}

//브러쉬 사이즈 조절 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
//버튼 클릭시 모드 변경 함수
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText="Paint"
    }

    // filling 을 사용하는 이유는 paint모드에서 그림을 그리면 마우스를 떼는 순간 fill이 작동하는데 이를 방지하기 위해 사용
    // if(mode.innerText == "FILL"){
    //     mode.innerText = "PAINT"
    // } else{
    //     mode.innerText = "FILL"
    // }
}

// 이미지 저장
//HTMLCanvasElemental.toDataURL() 메소드는type parameter에 의해 지정된 포맷의 이미지 표현을 포함한 data URL을 반환한다.
function saveImg() {
    // type을 정하지 않으면 기본값인 png가 반환
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    // a 태그는 download를 사용할 수 있는데, 말 그대로 URL을 다운로드 하는 것
    // 여기서 image는 링크를 가져야 한다.
    link.href = image;
    // download는 이름을 가져야 한다.
    link.download = "GirinGrim";
    // 아래 메서드가 없으면 자동으로 다운이 받아지지 않는다.
    link.click();
    console.log(link);    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스가 캔버스에서 나가면 painting이 false가 되도록 설정
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", FillingCanvas)
}

// Array.from 메소드는 object로부터 array를 만든다.
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

//슬라이드 바 변경시 handleRangeChange 함수 실행, 상수 size에 담긴 값으로 lineWidth가 변한다.
if(range){
 range.addEventListener("input", handleRangeChange)
}


if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", saveImg)
}