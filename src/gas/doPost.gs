function doPost(e) {

  // リクエストを解析
  /** @type {ModelRequest} */
  const modelRequest = JSON.parse(e.postData.contents);
  const requestType = modelRequest.request;
  let modelResponse;
  // リクエストによって分岐
  if (requestType === "create") {
    modelResponse = Model.create(modelRequest);
  }

  // レスポンスを返す
  const jsonResponse = JSON.stringify(modelResponse);
  return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
}