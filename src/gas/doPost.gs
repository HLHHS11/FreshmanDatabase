function doPost(e) {

  // リクエストを解析
  /** @type {ModelRequest} */
  const modelRequest = JSON.parse(e.postData.contents);
  const requestType = modelRequest.request;
  let modelResponse;  // スコープの都合ここで宣言
  // リクエストによって分岐
  switch (requestType) {
    case "create":
      modelResponse = Model.create(modelRequest);
      break;
    case "read":
      modelResponse = Model.read(modelRequest);
      break;
    case "update":
      modelResponse = Model.update(modelRequest);
      break;
    case "delete":
      modelResponse = Model.detele(modelRequest);
      break;
    default:
      // 想定外のリクエストがきたときのためのエラー
  }

  // レスポンスを返す
  const jsonResponse = JSON.stringify(modelResponse);
  return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
}