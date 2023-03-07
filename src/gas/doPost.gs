function doPost(e) {

  // リクエストを解析
  /** @type {ModelRequest} */
  const modelRequest = JSON.parse(e.postData.contents);
  const requestType = modelRequest.request;
  if (requestType === "create") {
    Model.create(modelRequest);
  }
  
  // データベースにかかわる処理を行う
  // ModelController的なのがあるといいだろう
  
  
  // レスポンスを返す
  // const data = JSON.parse(e.postData.contents);
  let response = {message:"Hello World!"};
  response.param = JSON.parse(e.postData.contents);  // curlからJSONまで送るのは面倒なので一旦保留
  let jsonResponse = JSON.stringify(response);
  return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
}