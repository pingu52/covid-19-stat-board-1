//샘플코드


var xhr = new XMLHttpRequest();
var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'HUnQteuijblByOxbDrbreMvrn8pamVlnm%2B80O2hb%2Fe1Yw0buKlVXfoZT9KMxXpEz7MsyrGyH%2Fy20jv7%2FAFBJPA%3D%3D'; /*Service Key*/
//queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('3'); /**/
//queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('7'); /**/
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220930'); /**/
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220930'); /**/
xhr.open('GET', url + queryParams);

xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    //여기에 작성
    regioncovid();

    drawmtable();

  }
};

let itemList = [];

var hrefList = [];





var now = new Date();
var Ynow = now.getFullYear();
var Mnow = now.getMonth() + 1;
var Dnow = now.getDate();
var l = 1;

var mtbody = document.querySelector('.tbody');
var h1 = document.querySelector("h1");
h1.innerHTML = Ynow + "년 " + Mnow + "월 " + Dnow + "일 코로나19 발생현황";
//메인표 그리기
function creatembox(gubun, defCnt, incDec, phref) {



  var mtr = document.createElement("tr");
  mtr.className = `tr${l++}`;
  var mtd1 = document.createElement("td"); // 
  var mtd2 = document.createElement("td");
  var mtd3 = document.createElement("td");
  var a1 = document.createElement("a");





  mtbody.appendChild(mtr);
  mtr.appendChild(mtd1);
  mtr.appendChild(mtd2);
  mtr.appendChild(mtd3);
  mtd1.appendChild(a1);
  mtd3.style.color = 'red';

  a1.href = phref;
  a1.innerHTML = gubun;
  mtd2.innerHTML = defCnt;
  mtd3.innerHTML = incDec + "↑";



}

//api 정보 가져오기
function regioncovid() {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
  let items = xmlDoc.getElementsByTagName("item");

  for (let i = 0; i < items.length; i++) {
    let gubun = items[i].getElementsByTagName("gubun")[0].innerHTML; // 지역이름
    let defCnt = parseInt(items[i].getElementsByTagName("defCnt")[0].innerHTML); // 누적확진자
    let incDec = parseInt(items[i].getElementsByTagName("incDec")[0].innerHTML); // 신규확진자
    let createDt = new Date(items[i].getElementsByTagName("createDt")[0].innerHTML);

    let item = {
      createDt,
      gubun,
      defCnt,
      incDec,

    }



    itemList.push(item);




  }

  for (var k = 0; k < itemList.length; k++) {
    hrefList[k] = `${k}.html`
  }

}



var covid = itemList.filter(function (itemList) {
  return itemList.gubun == "제주"
});



//그려주는거
function drawmtable() {

  var i=0;

  for (var item of itemList) {
    creatembox(item.gubun, item.defCnt, item.incDec, hrefList[i++]);
  }

}



//pagination 


xhr.send('');
