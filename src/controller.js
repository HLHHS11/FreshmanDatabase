import { Info } from "./typedef.js"
import { ModelRequest } from "./modelRequest.js" 
import { GasApiClient } from "./http.js";
// リクエストからルーティングされることになっている。
// ルーティングによって呼ばれると、Modelからデータを取得したり更新したりして、viewを返す
// ルーティングとは言いつつも、よくよく考えてみると結局各イベントハンドラが呼び出すってだけ

export class Controller {

    /**
     * データを作成するようModelに要請し、得られた結果をviewに渡す
     * @param {Info} info 
     */
    static create (info) {

        // スプシと通信してresponseDataに結果を格納
        const modelRequest = new ModelRequest("create", info);
        const url = "https://script.google.com/macros/s/AKfycbw4zNibfdhB6pPuKdrZOKKxIfaxNx8EyclIsi5OcMHazJ0ZLse9LD_06qwg3xlqRR8g/exec"; 
        // const requestData = {name:"HogeHuga", age:20};  // modelRequestの簡易版

        (async function () {
            const modelResponse = await GasApiClient.httpPostRequest(url, modelRequest);
            console.log(modelResponse);
            console.log("postに対するレスポンスが返ってきた");
            // viewに情報を渡す
            // といってもviewがやることは殆ど無いだろう。
            if (modelResponse.status === "succeed") {
                alert(`createリクエスト成功`);
            } else if (modelResponse.status === "failed") {
                alert(`createリクエスト失敗：\n${modelResponse.option.errorMsg}`);
            } else {
                alert("通常考えられないエラー。postレスポンス返ってこなかった時とかならあり得るかも");
            }
        })();

    }

}