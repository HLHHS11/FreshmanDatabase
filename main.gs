function onEdit (e) {
  const AUTO_UPDATE = true;
  if (AUTO_UPDATE) {
    const SHT_ELM = new SheetElements();
    if (SHT_ELM.activeSheet.getName() === "database") {
      let setColor = new SetColor(SHT_ELM);
      switch (SHT_ELM.column) {
        case COLUMN_NUM.department:
          setColor.setColorByDepartment();
          break;
        case COLUMN_NUM.experience:
          // 3秒ほど待つ処理を加えても良い
          // すでに年数の欄に数字が入っていれば、待たずに処理をする
          let yearsCell = SHT_ELM.activeSheet.getRange(SHT_ELM.row, COLUMN_NUM.years);
          if (yearsCell.getValue() === "") { // 5秒待って実行
            const PROP_SRV = PropertiesService.getScriptProperties();
            PROP_SRV.setProperty("shouldExecute", "true");
            // setTimeout(tempFunction, 5000);  // GASではsetTimeoutが使えないらしい
            Utilities.sleep(5000)
            let shouldExecute = JSON.parse(PROP_SRV.getProperty("shouldExecute"));
            if (shouldExecute === true) {  // SHOULD_EXECUTEが「真値」かどうかではなく、trueと型を含めて等しいことを確認
              setColor.setColorByExperience();
            }
            PROP_SRV.setProperty("shouldExecute", "false");

          } else {  // 待たずに実行
            // 例えば年数を先に埋めてから経験種別を入れた場合、こちらに入ることになる
            try { // 一時的にactiveCell等の情報を変更してsetColorByYears()を実行
              // setColor.SHT_ELMプロパティは定数SHT_ELMへの参照をもつので、参照先のSHT_ELMの方を変更すればよい
              SHT_ELM.activeCell = SHT_ELM.activeSheet.getRange(SHT_ELM.row, COLUMN_NUM.years);
              SHT_ELM.column = COLUMN_NUM.years;
              setColor.setColorByYears();
            } catch (error) {
              console.log("エラー発生");  // エラーメッセージちゃんと作っとかなあかん
            } finally {
              SHT_ELM.activeCell = SHT_ELM.activeSheet.getRange(SHT_ELM.row, COLUMN_NUM.experience);
              SHT_ELM.column = COLUMN_NUM.experience;
            }
          }
          break;
        case COLUMN_NUM.years:
          PropertiesService.getScriptProperties().setProperty("shouldExecute","false")
          setColor.setColorByYears();
          break;
        case COLUMN_NUM.status:
          setColor.setColorByStatus();
          break;
      }
    }
  }
}



class SheetElements {
  constructor () {
    this.ss = SpreadsheetApp.getActiveSpreadsheet();
    this.activeSheet = this.ss.getActiveSheet();
    this.activeCell = this.activeSheet.getActiveCell();
    this.row = this.activeCell.getRow();
    this.column = this.activeCell.getColumn();
  }
}


class SetColor {

  /**
   * @param {SheetElements} sheetElements 
   */
  constructor (sheetElements) {
    this.SHT_ELM = sheetElements;
  }

  setColorByDepartment () {
    // 学科と色の対応表
    const DEPARTMENT_COLOR_MAP = {
      総人  : "#ffff8e",  // 黄色
      文    : "#d8b2ff",  // 紫
      教育  : "#ffddab",  // オレンジ
      法    : "#c9bacc",  // 灰色
      経済  : "#adadff",  // 青
      理    : "#99ff99",  // 薄緑
      医    : "#ffa3a3",  // 赤
      人健  : "#ffbfdf",  // ピンク
      薬    : "#adffff",  // 水色
      工    : "#ebebeb",  // 白
      地球工: "#ebebeb",
      電電  : "#ebebeb",
      情報  : "#ebebeb",
      物工  : "#ebebeb",
      工化  : "#ebebeb",
      建築  : "#ebebeb",
      農    : "#55c955",  // 緑
      応生  : "#55c955",
      食品  : "#55c955",
      資源  : "#55c955",
      食環  : "#55c955",
      地環  : "#55c955",
      森林  : "#55c955"
    };
    let color = DEPARTMENT_COLOR_MAP[this.SHT_ELM.activeCell.getValue()] || "#ffffff";
    this.SHT_ELM.activeCell.setBackground(color);
  }

  setColorByExperience () {
    // 経験と色の対応表
    const EXPERIENCE_COLOR_MAP = {
      経    : "#d9ff6b",
      軟フレ: "#6BDCFF",
      ドフレ: "#EBEBEB"
    };
    let color = EXPERIENCE_COLOR_MAP[this.SHT_ELM.activeCell.getValue()] || "#ffffff";
    this.SHT_ELM.activeCell.setBackground(color);
    this.SHT_ELM.activeSheet.getRange(this.SHT_ELM.row, COLUMN_NUM.years).setBackground(color);
  }



  setColorByYears () {
    const YEARS_COLOR_MAP = {
      経    : {
        short : "#efffc2",
        mid   : "#d9ff6b",
        long  : "#91ff00"
      },
      軟フレ: {
        short : "#c9f2ff",
        mid   : "#6BDCFF",
        long  : "#00c2ff"
      },
      ドフレ: {
        short : "#EBEBEB",
        mid   : "#EBEBEB",
        long  : "#EBEBEB"
      }
    };
    let expCell = this.SHT_ELM.activeSheet.getRange(this.SHT_ELM.row, COLUMN_NUM.experience);
    let years = Number(this.SHT_ELM.activeCell.getValue());
    let category;
    if (years > 6) {
      category = "long";
    } else if (years >3) {
      category = "mid";
    } else if (years > 0) {
      category = "short";
    } else {  // 有効な値でない場合はすべてmidとする
      category = "mid";
    }
    let color = YEARS_COLOR_MAP[expCell.getValue()][category] || "#ffffff";
    this.SHT_ELM.activeCell.setBackground(color);
    expCell.setBackground(color);
  }

  setColorByStatus () {
    const STATUS_COLOR_MAP = {
      弱    : {color:"#fadbda", weight:"normal"}, // 薄い赤
      強    : {color:"#c9daf8", weight:"normal"}, // 青
      済    : {color:"#c9daf8", weight:"bold"},   // 青
      他    : {color:"#fadbda", weight:"normal"}, // 薄い赤
      セレ  : {color:"#dbdbdb", weight:"normal"},  // 濃いめの灰色
      不明  : {color:"#ffffff", weight:"normal"} // 白
    };
    let status = this.SHT_ELM.activeCell.getValue();
    let color = STATUS_COLOR_MAP[status]["color"] || "#fffff";
    let weight = STATUS_COLOR_MAP[status]["weight"] || "normal";

    let nameAndNickname = this.SHT_ELM.activeSheet.getRange(this.SHT_ELM.row, COLUMN_NUM.nickname, 1, 2); // nicknameカラムの右にnameカラムがあることを前提としている
    nameAndNickname.setBackground(color);
    this.SHT_ELM.activeCell.setBackground(color);
    nameAndNickname.setFontWeight(weight);
    this.SHT_ELM.activeCell.setFontWeight(weight);
  }    

  /**
   * 引数でカラムの名前を与え、それに対応する形式でセルの値のチェック・修正を行います
   * イメージ:this.#validateInputs(department);this.setColorByDepartment();
   */
  // switch構文で分岐しようと思ったけど、各caseはたぶん同じブロックスコープになっちゃうのでやめた
  _validateInputs (columnName) {
    if (columnName === "department") {
    } else if (columnName === "experience") {
    } else if (columnName === "years") {
    } else if (columnName === "status") {
    }
  }

  /**
   * オブジェクトのプロパティの値からキーを取得します
   * アクティブセルのcolumnNameを取得する
   */
  _getKeyByValue () {

  }

}

const COLUMN_NUM = {
  nickname:1,   // A
  name:2,       // B
  department:3, // C
  experience:4, // D
  years:5,      // E
  hometown:6,   // F
  contact:7,    // G
  comment:8,    // H
  status:9      // I
}