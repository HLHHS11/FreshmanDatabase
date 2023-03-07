function doGet(e) {
    // const data = JSON.parse(e.postData.contents);
    // レスポンスとして返すJSONオブジェクトを作成
    let response = { message: "Hello World" };
    // 正しくパラメータが読み取られているか確認したいので、"Hello World"に加えてクエリ文字列も書き込む
    response.query = e.queryString;
    // JSONオブジェクトを文字列に変換
    let jsonResponse = JSON.stringify(response);
    // ContentServiceを使ってレスポンスを作成
    return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
  }
  // function doGet(e) {
  //   var output = ContentService.createTextOutput('Hello, world!');
  //   output.setMimeType(ContentService.MimeType.JSON);
  //   output.setHeader('Access-Control-Allow-Origin', '*'); // すべてのドメインからのリクエストを許可
  //   return output;
  // }
  // function doGet() {
  //   return HtmlService.createHtmlOutputFromFile('sample');
  // }

  

  
// function doPost(e) {

//   // リクエストを解析
//   const requestJSON = JSON.parse(e.postData.contents);

//   // データベースにかかわる処理を行う
//   // ModelController的なのがあるといいだろう

//   // レスポンスを返す
//   // const data = JSON.parse(e.postData.contents);
//   let response = {message:"Hello World!"};
//   response.param = JSON.parse(e.postData.contents);  // curlからJSONまで送るのは面倒なので一旦保留
//   let jsonResponse = JSON.stringify(response);
//   return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
// }

// function doPost(e) {
//   // CORSを許可するためのヘッダーを設定
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'POST',
//     'Access-Control-Allow-Headers': 'Content-Type'
//   };

//   // POSTリクエストを受け取るためのコード
//   if (e && e.postData) {
//     const data = JSON.parse(e.postData.contents);
//     // ここで受け取ったデータを処理する
//     // ...
//     // レスポンスを返す
//     return ContentService.createTextOutput('POST request received.').setMimeType(ContentService.MimeType.TEXT).setHeaders(headers);
//   }
//   // POSTデータがなかった場合の処理
//   return ContentService.createTextOutput('No POST data received.').setMimeType(ContentService.MimeType.TEXT).setHeaders(headers);
// }