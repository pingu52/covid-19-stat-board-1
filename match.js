var xhr = new XMLHttpRequest();
var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'HUnQteuijblByOxbDrbreMvrn8pamVlnm%2B80O2hb%2Fe1Yw0buKlVXfoZT9KMxXpEz7MsyrGyH%2Fy20jv7%2FAFBJPA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220901'); /**/
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220930'); /**/
xhr.open('GET', url + queryParams);

xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        //여기에작성
        regioncovid2();


        drawmtable();
    }
};

let itemList = [];

var hrefList = [];

var lvList = [];






//메인표 그리기
function creatembox(gubun, createDt, defCnt, incDec) {

    var mtbody = document.querySelector('.tbody');

    var mtr = document.createElement("tr");
    var mtd1 = document.createElement("td"); // 
    var mtd2 = document.createElement("td");
    var mtd3 = document.createElement("td");
    var mtd4 = document.createElement("td");





    mtbody.appendChild(mtr);
    mtr.appendChild(mtd1);
    mtr.appendChild(mtd2);
    mtr.appendChild(mtd3);
    mtr.appendChild(mtd4);
    mtd4.style.color = 'red';

    mtd1.innerHTML = gubun;
    mtd2.innerHTML = createDt;
    mtd3.innerHTML = defCnt;
    mtd4.innerHTML = incDec + "↑";


}

//api가져오기
function regioncovid2() {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
    let lvs = xmlDoc.getElementsByTagName("item");
    var txt = document.querySelector('h1').innerText;

    for (let i = 0; i < lvs.length; i++) {
        let gubunmain = lvs[i].innerHTML.match(txt);
        if (gubunmain != null) {
            xmlDoc = parser.parseFromString(gubunmain.input, "text/html");
            
            let defCnt = xmlDoc.getElementsByTagName("defCnt")[0].innerHTML;
            let createDt = xmlDoc.getElementsByTagName("createDt")[0].innerHTML;
            let incDec = xmlDoc.getElementsByTagName("incDec")[0].innerHTML;
            let gubun = xmlDoc.getElementsByTagName("gubun")[0].innerHTML;


            let lv = {
                createDt,
                gubun,
                defCnt,
                incDec
            }

            lvList.push(lv);


        }
    }
    lvList.reverse();
    
}








//그려주는거
function drawmtable() {


    for (var lv of lvList) {
        creatembox(lv.gubun, lv.createDt, lv.defCnt, lv.incDec);

    }

}






xhr.send('');
