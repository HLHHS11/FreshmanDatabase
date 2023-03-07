// getでGASで作ったAPIを叩く
const url = "https://script.google.com/macros/s/AKfycbw4zNibfdhB6pPuKdrZOKKxIfaxNx8EyclIsi5OcMHazJ0ZLse9LD_06qwg3xlqRR8g/exec"

// fetch("https://script.google.com/macros/s/AKfycby91vhGDwvk_MIcN_j-B0J2i-VAEc0IqtZUIuTSEyWxpaWSpsQMgDcKnJNQiVBu8JdY?name=AIUEO&age=25")
// fetch("https://script.google.com/macros/s/AKfycbyDW_Fc3juOfYNsMr7cPjzIM_JcEdesRjOE2BbgRZ4qi-MnqEWO0Wzg9ajKbOXbT6yz?name=AIUEO&age=25")
fetch(url+"?name=HogeHuga&age=20")
  .then(response => response.json())
  .then(data => console.log(data));

// POSTの基本的な使い方
// const url = "https://script.google.com/macros/s/AKfycbxjmaEW1EIQTthO13J-l_QNsYQRRhoaVFofCU4m_EkM3MG1XC-E5vQy01vcyw-Gyuu_";
// const url = "https://eozp4mgcg3t9ld.m.pipedream.net";

const data = {name:"HogeHuga", age:20};
fetch(url, {
  method: 'POST',
  // mode: "no-cors";
  mode: "cors",
  // headers: {
  //   'Content-Type': 'application/json' // リクエストヘッダ
  // },
  body: JSON.stringify(data) // リクエスト本文

})
.then(response => response.json())
.then(data => {
  // レスポンスの処理
  console.log(data);
})
.catch(error => {
  console.error(error);
  // エラー処理
});