
function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var activeCell = ss.getActiveSheet().getActiveCell();
  if(activeCell.getValue() == 1){   //一番最初にアクティブセル値が1がどうかで分岐
    var database = ss.getSheetByName("Database")
    var home = ss.getSheetByName("Home")
    var images = ss.getSheetByName("Images");
    var activeSheetName = ss.getActiveSheet().getName();
    var rowNum = activeCell.getRow();
    //データベース・画像転送処理始まり
    //直後のifではアクティブセルがdatabaseの該当セルであるかで分岐
    //つまりｱｸﾃｨﾌﾞｼｰﾄ="Database"かつｱｸﾃｨﾌﾞｾﾙが14行目
    if(activeSheetName == "Database"
    && activeCell.getColumn() == 14){
      //入会意思による呼び名・本名の色分け・フォント処理
      var temp = database.getRange(rowNum,13); //入会意思のセル
      var temp2 = database.getRange(rowNum,2,1,2); //名前とフルネームのセル
      switch(temp.getValue()){
        case "不明":
        case "":
          temp.setBackground("#FFFFFF");  //白
          temp2.setBackground("#FFFFFF");
          temp.setFontStyle("normal");  //普通の太さ
          temp2.setFontWeight("normal");
          break;
        case "弱":
          temp.setBackground("#FADBDA");  //薄い赤
          temp2.setBackground("#FADBDA");
          temp.setFontWeight("normal");  //普通の太さ
          temp2.setFontWeight("normal");
          break;
        case "他":
          temp.setBackground("#FADBDA");  //薄い赤
          temp2.setBackground("#FADBDA");
          temp.setFontWeight("normal");  //普通の太さ
          temp.setFontStyle("italic");  //イタリック
          temp2.setFontWeight("normal");
          temp2.setFontStyle("italic");  //イタリック
          break;
        case "強":
          temp.setBackground("#C9DAF8");  //青
          temp2.setBackground("#C9DAF8");
          temp.setFontWeight("normal");  //普通の太さ
          temp2.setFontWeight("normal");
          break;
        case "済":
          temp.setBackground("#C9DAF8");  //青
          temp2.setBackground("#C9DAF8");
          temp.setFontWeight("bold");  //太
          temp2.setFontWeight("bold");
          break;
        case "セレ":
          temp.setBackground("#DBDBDB");  //濃いめの灰色
          temp2.setBackground("#DBDBDB");
          temp.setFontWeight("normal");  //普通の太さ
          temp2.setFontWeight("normal");
          break;
        default:
          temp.setBackground("#FFFFFF");  //白
          temp2.setBackground("#FFFFFF");
          temp.setFontStyle("normal");  //普通の太さ
          temp2.setFontWeight("normal");
          break;
      }   //入会意思による処理終
      //学部学科による色分け
      temp = database.getRange(rowNum,4); //学科のセル
      switch(temp.getValue()) {
        case "総人":  //黄色
          temp.setBackground("#ffff8e");
          break;
        case "文":    //紫
          temp.setBackground("#d8b2ff");
          break;
        case "教育":  //オレンジ
          temp.setBackground("#ffddab");
          break;
        case "法": //灰色
          temp.setBackground("#c9bacc");
          break;
        case "経済":　//青
          temp.setBackground("#adadff");
          break;
        case "理":    //薄緑
          temp.setBackground("#99ff99");
          break;
        case "医":    //赤
          temp.setBackground("#ffa3a3");
          break;
        case "人健":  //ピンク
          temp.setBackground("#ffbfdf");
          break;
        case "薬":  //水色
          temp.setBackground("#adffff");
          break;
        case "工":  //白
        case "地球工":
        case "電電":
        case "情報":
        case "物工":
        case "工化":
        case "建築":
          temp.setBackground("#ebebeb");
          break;
        case "農":  //緑
        case "応生":
        case "食品":
        case "資源":
        case "食環":
        case "地環":
        case "森林":
          temp.setBackground("#55c955")
          break;
        default:
          temp.setBackground("#ffffff");
          break;
      }   //学部学科による処理終
      //経験・年数による色分け
      temp = database.getRange(rowNum,5); //経験のセル
      temp2 = database.getRange(rowNum,6);  //年数のセル
      switch(temp.getValue()) {
        case "経":
          if(temp2.getValue() === ""){
            temp.setBackground("#d9ff6b")
            temp2.setBackground("#d9ff6b")
          }else if(temp2.getValue() <= 3){
            temp.setBackground("#efffc2")
            temp2.setBackground("#efffc2")
          }else if(temp2.getValue() <= 6){
            temp.setBackground("#d9ff6b")
            temp2.setBackground("#d9ff6b")
          }else if(temp2.getValue() >= 7){
            temp.setBackground("#91ff00")
            temp2.setBackground("#91ff00")
          }else{
            temp.setBackground("#FFFFFF")
            temp2.setBackground("FFFFFF")
          }
          break;  
        case "軟フレ":
          if(temp2.getValue() === ""){
            temp.setBackground("#6BDCFF")
            temp2.setBackground("#6BDCFF")
          }else if(temp2.getValue() <= 3){
            temp.setBackground("#c9f2ff")
            temp2.setBackground("#c9f2ff")
          }else if(temp2.getValue() <= 6){
            temp.setBackground("#6BDCFF")
            temp2.setBackground("#6BDCFF")
          }else if(temp2.getValue() >= 7){
            temp.setBackground("#00c2ff")
            temp2.setBackground("#00c2ff")
          }else{
            temp.setBackground("#FFFFFF")
            temp2.setBackground("#FFFFFF")
          }  
          break;
        case "ドフレ":
        case "どフレ":
          if(temp2.getValue() > 0){
            temp.setBackground("#DBDBDB")
            temp2.setBackground("#DBDBDB")
          }else if(temp2.getValue() == 0
          || temp2.getValue() === ""){
            temp.setBackground("#EBEBEB")
            temp2.setBackground("#EBEBEB")
          }else{
            temp.setBackground("#FFFFFF")
            temp2.setBackground("#FFFFFF")
          }
          break;
        default:
          temp.setBackground("#FFFFFF")
          break;
      }   //経験・年数による処理終
/*    //画像をimagesシートに移動する処理。廃止した。
      var imagesArray = database.getImages();
      var length = imagesArray.length;
      for(var i=0; i<length; i++){
        var tempImgCell = imagesArray[i].getAnchorCell();
        if(tempImgCell.getRow() == rowNum){
          imagesArray[i].setAnchorCell(images.getRange(rowNum, tempImgCell.getColumn()-13))
          tempImgCell.setValue("画像転送済み") 
        }
      }   //画像移動処理終  */
      //変更セルの"1"を"変更済み"に
      activeCell.setValue("変更済み")
      //直近の変更を表示する処理
      var log = ss.getSheetByName("Log");
      var history = ss.getSheetByName("History");
      var indData = database.getRange(rowNum,2,1,12);
      var numbers = history.getRange(2,1,16,1).getValues().flat();
      //既存データの番号とindDataの番号が一致するかどうかで分岐
      if(numbers.includes(rowNum)){
        //filterメソッド使って作ろうとしたが、indexOfによりもっと簡潔につくれそうだったので中止
/*      var temp = items.filter( function(index) {
          return index;
        })
        var tempRowNum = temp + 2; //番号の一致したデータの行番号
*/
        var tempRowNum = numbers.indexOf(rowNum) + 2;
        var getRange = history.getRange(2,1,tempRowNum-2,14);//tempRowNum-2 == 0となったときバグ発生するかも？？？
        var setRange = history.getRange(3,1,tempRowNum-2,14); 
        getRange.copyTo(setRange);
      }else{
        var getRange = history.getRange(2,1,14,14);
        var setRange = history.getRange(3,1,14,14);
        getRange.copyTo(setRange);
      } //既存データとindDataの重複に対応する条件分岐の終了
      indData.copyTo(history.getRange(2,3,1,12));
      var date　=  new Date();     //よくわからんけどネットから引っ張ってきたやつ
      var formatDate = Utilities.formatDate(date, "Asia/Tokyo","MM/dd \n HH:mm:ss");   //よくわからんけどネットから引っ張ってきたやつ
      var tempArray = indData.getValues().flat();   //getValuesで取得すると二次元配列になるのでflatで一次元化する必要がある
      var logArray = [[rowNum,formatDate,tempArray[1]]];  //setValuesの引数は二次元配列なので配列を二次元配列として定義
      log.getRange(log.getLastRow()+1,2,1,3).setValues(logArray);
      logArray[0].pop();  //logArray.pop();としてしまうと、logArray[0][2]ではなく一次元配列「logArray[0]」そのものが消えてしまう！そのため一次元配列logArray[0]にpopメソッドを適用する
      history.getRange("A2:B2").setValues(logArray);  //※１行上でlogArray[0]にpopを使ったのは、setValuesで番号、日付を出力するためである(フルネームは邪魔)
    }   //データベース・画像転送処理終
/*いったん探索マクロは保留!!!    
    //探索のマクロ
    //直後のelseifではアクティブセルがHomeのB2かどうかで分岐
    else if(activeSheetName == "Home"
    && activeCell.getRow() == 2
    && activeCell.getColumn() == 2){
    }   ここで探索マクロは終了*/
    //変更されたデータの履歴
  }else if(activeCell.getValue() === "対面更新"){
    if(ss.getActiveSheet().getName() == "Calendar"){
      var calendar = ss.getSheetByName("Calendar");
      var database = ss.getSheetByName("Database");
      var activeCell = ss.getActiveCell();
      var rowNum = activeCell.getRow();
      var lastRow = database.getLastRow();
      var input = calendar.getRange(rowNum,4).getValue();
      var date = calendar.getRange(rowNum,1).getValue();
      var inputArray = input.split("、");
      var schedulesArray = database.getRange(2,16,lastRow-1,2).getValues();
      Logger.log(schedulesArray)
      //まずinputが空でないことを確認
      if(!(input === "")){
        var namesArray = database.getRange(2,2,lastRow-1,1).getValues().flat();
        var dupCounter = 0;
        //inputArrayの人を、一人ずつずらしていく
        for(var i=0;i<inputArray.length;i++){
          indexs = [];  //名前のデータが見つかり、さらに複数みつかった(重複)場合にそのインデックスを格納する
          //その名前がdatabaseに見つかるかどうかで分岐
          if(namesArray.includes(inputArray[i])){ //みつかったら
              var firstIndex = namesArray.indexOf(inputArray[i]);
              var lastIndex = namesArray.lastIndexOf(inputArray[i]);
              if(firstIndex === lastIndex){   //最初と最後に見つかった名前が一致
                  //名前の重複のほかに、その人の日付の重複がないかチェックする必要がある。すなわち、04/05,04/10,04/10のようになってしまってはいけないのだ
                  if(!(schedulesArray[firstIndex][0].includes(date))){
                    Logger.log("122行目のifに入った")
                      schedulesArray[firstIndex][0]=schedulesArray[firstIndex][0]+","+date
                  }else{  //出力用配列の該当部分にdateの一致があった
                      //何もしない
                  }
              }else{  //名前に重複があれば
                  //名前の重複した者について、フルネーム、学科表示を表示する処理
                  namesArray.filter(function(value, index){
                      if(value == inputArray[i]){
                          indexs.push(index);
                      }   
                  })
                  var dupStr = ""; //重複者を出力するためのストリング
                  for(var j=0;j<indexs.length;j++){
                    //行番号(インデックス番号+2)とフルネームと学科を同じストリングに出力し、並べていく。
                    //プログラムの別の部分で、そこに１と入力したらその人の分だけ更新されるようなスクリプトを組みたい！
                    //必要なのは、出力場所に何もデータがないか判定する機能。それによって、データをどこに出力するか決める。出力しない場合は0と入
                    //その処理が終了したら、出力場所のストリングを全部消す。ただし、それもプログラムの別の部分で行う
                    dupStr = indexs[j]+2 + "："
                    + database.getRange(indexs[j]+2,3).getValue()+"，"
                    + database.getRange(indexs[j]+2,4).getValue();
                    calendar.getRange(rowNum,9+dupCounter*2).setValue(dupStr);
                    dupCounter = dupCounter + 1;
                  }

                  Logger.log(indexs)
                  Logger.log(namesArray[indexs[0]])
                  Logger.log(namesArray[indexs[1]])
                  //選びたい方の該当欄に１と入力したら、重複なしのときと同様の処理を行うようにする。ただしそれはこの構造の中ではなく、最初のアクティブセルによる条件分岐で処理開始
              }

          }else{
              //見つからなかったときの処理
              //その名前が見つかりませんでしたと表示
              //再入力は、名前のほうからやる
              calendar.getRange(rowNum,9+dupCounter*2).setValue(inputArray[i]+"が見つかりません")
              dupCounter = dupCounter + 1;
          }
    
        }
      }  
      database.getRange(2,16,lastRow-1,2).setValues(schedulesArray);
      var counterFtF = database.getRange(2,10,lastRow-1,1).getValues();
      for(var i=0; i<counterFtF.length;i++){
        counterFtF[i][0] = schedulesArray[i][0].split(",").length - 1;
      }
      database.getRange(2,10,lastRow-1,1).setValues(counterFtF);
      if(dupCounter > 0){
        calendar.getRange(rowNum,6).setValue("一部出力済")
      }else if(dupCounter == 0){
        calendar.getRange(rowNum,6).setValue("出力済")
      }
    Logger.log("プログラム終了")
    }
  }else if(activeCell.getValue() === "対面個別"){
    //まず文字列をコロンでsplitすることにより番号を割り出す
    //その番号と同じ列の該当欄の対面欄に日付を出力
    var calendar = ss.getSheetByName("Calendar");
    var database = ss.getSheetByName("Database");
    var rowNum = activeCell.getRow();
    var date = calendar.getRange(rowNum,1).getValue();
    var dupStr = calendar.getRange(rowNum,activeCell.getColumn()-1).getValue();
    var number = dupStr.split("：")[0];
    var scheduleFtF = database.getRange(number,16); //rangeオブジェクトである
    console.log(number);
    //number行の対面参加回数のとこに追加
    if(!(scheduleFtF.getValue().includes(date))){
      scheduleFtF.setValue(scheduleFtF.getValue() + "," + date)
    }else{  //出力用配列の該当部分にdateの一致があった
      //何もしない
    }
    database.getRange(number,10).setValue(scheduleFtF.getValue().split(",").length - 1);
    calendar.getRange(rowNum,activeCell.getColumn()-1,1,2).clearContent();
  }else if(activeCell.getValue() === "無視"){
    var calendar = ss.getSheetByName("Calendar");
    var rowNum = activeCell.getRow();
    calendar.getRange(rowNum,activeCell.getColumn()-1,1,2).clearContent();
  }
}


