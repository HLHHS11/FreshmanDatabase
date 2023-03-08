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
            const infoObj = modelRequest.info; 
            let infoArr = [];   // まずは簡単のため一次元配列を用いる。速度が気になるなら初めから二次元でやる
            infoArr[COLUMN_NUM.nickname-1] = infoObj.nickname || "";
            infoArr[COLUMN_NUM.name-1] = infoObj.name || "";
            infoArr[COLUMN_NUM.department-1] = infoObj.department || "";
            infoArr[COLUMN_NUM.experience-1] = infoObj.experience || "";
            infoArr[COLUMN_NUM.years-1] = infoObj.years || "";  // 入力値が半角英数字なら本来number型なので、||""とするのはちょっと気持ち悪い
            infoArr[COLUMN_NUM.hometown-1] = infoObj.hometown || "";
            infoArr[COLUMN_NUM.contact-1] = infoObj.contact || "";
            infoArr[COLUMN_NUM.comment-1] = infoObj.comment || "";
            infoArr[COLUMN_NUM.status-1] = infoObj.status || "";
            infoArr[COLUMN_NUM.schedule-1] = infoObj.schedule || "";
            infoArr = [[...infoArr]];   // 二次元配列に変換

            // 値を挿入するRangeオブジェクトを取得
            const ss = SpreadsheetApp.getActiveSpreadsheet();
            const DBSheet = ss.getSheetByName("database");
            const dataRange = DBSheet.getDataRange();
            const lastRow = dataRange.getLastRow();
            const targetRange = DBSheet.getRange(lastRow+1,1,1,10); // !!カラム数が増えたらここを変更する必要がある!!
            
            // 値を挿入
            targetRange.setValues(infoArr);
            
            console.log("create処理終了");
            return new ModelResponse("create", "succeed");
        } catch (e) {
            return new ModelResponse("create", "failed", [], {
                errorMsg: e.message || e    // エラーがthrow ""で書く簡単なものだったときにも対応できるように
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