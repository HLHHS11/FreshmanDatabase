class Model {

  /**
   * @param {ModelRequest} 
   * @returns {ModelResponse} - 簡単なステータス情報を返すようにしたい。成功・失敗とか
   */
  static create(modelRequest) {
    // 本来エラーの危険性があるのはスプシを操作する部分だけだが
    // その確信も持てないのでちょっと気持ち悪いが一旦全部try catchで囲ってしまうことにした。
    try {
      // スプシのカラムの配置にあわせて、情報を整形
      // setValuesに用いる配列は二次元配列であることに注意せよ
      const info = modelRequest.info; 
      let convertedArr = [];   // まずは簡単のため一次元配列を用いる。速度が気になるなら初めから二次元でやる
      convertedArr[COLUMN_NUM.nickname-1] = info.nickname || "";
      convertedArr[COLUMN_NUM.name-1] = info.name || "";
      convertedArr[COLUMN_NUM.department-1] = info.department || "";
      convertedArr[COLUMN_NUM.experience-1] = info.experience || "";
      convertedArr[COLUMN_NUM.years-1] = info.years || "";  // 入力値が半角英数字なら本来number型なので、||""とするのはちょっと気持ち悪い
      convertedArr[COLUMN_NUM.hometown-1] = info.hometown || "";
      convertedArr[COLUMN_NUM.contact-1] = info.contact || "";
      convertedArr[COLUMN_NUM.comment-1] = info.comment || "";
      convertedArr[COLUMN_NUM.status-1] = info.status || "";
      convertedArr[COLUMN_NUM.schedule-1] = info.schedule || "";
      convertedArr = [[...convertedArr]];   // 二次元配列に変換

      // 値を挿入するRangeオブジェクトを取得
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const DBSheet = ss.getSheetByName("database");
      const dataRange = DBSheet.getDataRange();
      const lastRow = dataRange.getLastRow();
      const targetRange = DBSheet.getRange(lastRow+1,1,1,10); // !!カラム数が増えたらここを変更する必要がある!!
      
      // 値を挿入
      targetRange.setValues(convertedArr);
      
      console.log("create処理終了");
      // infoArrの部分に、挿入した行の番号を入れて送信
      return new ModelResponse("create", "succeed", [{id: lastRow+1}]);
    } catch (e) {
      return new ModelResponse("create", "failed", [], {
        errorMsg: e.message || e  // エラーがthrow ""で書く簡単なものだったときにも対応できるように
      });
    }

  }

  /**d
   * 
   * @param {ModelRequest} modelRequest
   * @returns {ModelResponse}
   */
  static read(modelRequest) {
    try {
      // 全データを二次元配列で取得して、各列ごとに検索
      // 部分一致で検索してもいい
      // 困ったときの全部一致の実装はかなり簡単なはずなので、一旦部分一致の実装に挑戦

      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const DBSheet = ss.getSheetByName("database");
      const dataRange = DBSheet.getDataRange();
      const filteringInfo = modelRequest.info;
      let searchResults = dataRange.getValues();  // まずは全データ取得しておき、ここから絞っていく
      searchResults.shift();  // 先頭の要素は一行目に対応し、これは各個人のデータではないので捨てる
      let idArray = [];   // 一旦IDArrayつくっとく
      for (let i=2; i<searchResults.length+2; i++) {  // idはデーターベースの行番号なので、2スタートである必要がある
        idArray.push(i);
      }

      for (const key in filteringInfo) {   // Infoオブジェクトの各プロパティをチェック
        if (key === "id") {
          continue;
        }
        const value = filteringInfo[key];
        if (value) {  // 値が存在すれば
          let newSearchResults = [];
          let newIDArray = [];
          for (let i=0; i<searchResults.length; i++) {
            if (searchResults[i][COLUMN_NUM[key]-1].includes(value)) {
              newSearchResults.push(searchResults[i])
              newIDArray.push(idArray[i]);   // 行番号に変換するため+1
            }

          }
          // !!スプレッド構文使わない参照渡しだけど、これでも絞り込みには十分なはず、、、
          searchResults = newSearchResults;
          idArray = newIDArray;
        } else {  // 値が存在しなければ次のプロパティへ
          continue;
        }

      }
      // レスポンスのInfo[]を作成
      let infoArr = [];
      for (let i=0; i<searchResults.length; i++) {
        /** @type {Info} */
        let eachInfo = {};
        const eachData = searchResults[i];
        eachInfo.nickname = eachData[COLUMN_NUM.nickname-1] || "";
        eachInfo.name = eachData[COLUMN_NUM.name-1] || "";
        eachInfo.department = eachData[COLUMN_NUM.department-1] || "";
        eachInfo.experience = eachData[COLUMN_NUM.experience-1] || "";
        eachInfo.years = eachData[COLUMN_NUM.years-1] || "";
        eachInfo.hometown = eachData[COLUMN_NUM.hometown-1] || "";
        eachInfo.contact = eachData[COLUMN_NUM.contact-1] || "";
        eachInfo.comment = eachData[COLUMN_NUM.comment-1] || "";
        eachInfo.status = eachData[COLUMN_NUM.status-1] || "";
        eachInfo.schedule = eachData[COLUMN_NUM.schedule-1] || "";
        eachInfo.id = String(idArray[i]);
        
        infoArr.push(eachInfo);
      }
      return new ModelResponse("read", "succeed", infoArr);
    } catch (e) {
      return new ModelResponse("read", "failed", [], {
        errorMsg: e.message || e
      });
    }
  }


}



class ModelResponse {

  constructor (request, status, infoArr=[], option={}) {
    this.request = request;
    this.status = status;
    this.infoArr = infoArr;
    this.option = option;
  }

}