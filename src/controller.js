import { Info } from "./typedef.js"
import { ModelRequest } from "./modelRequest.js" 
import { ModelResponse} from "./modelResponse.js"
import { GasApiClient } from "./http.js"
import { View} from "./view.js"
// リクエストからルーティングされることになっている。
// ルーティングによって呼ばれると、Modelからデータを取得したり更新したりして、viewを返す
// ルーティングとは言いつつも、よくよく考えてみると結局各イベントハンドラが呼び出すってだけ

export class Controller {

    /**
     * データを作成するようModelに要請し、得られた結果をviewに渡す
     * 将来的に、optionでデータ重複の可能性を調べるかどうかも決められるようにしたい
     * @param {View} view 
     */
    static create (view) {

        // スプシと通信してresponseDataに結果を格納
        const info = view.getInfo();
        if (info.id) {  // createの際にすでにIDが存在したら警告
            const confirmResult = window.confirm("重複したデータが登録される可能性があります。\n処理を続ける場合はOK、中止する場合はキャンセルを選択してください");
            if (!confirmResult) {
                console.log("処理中断");
                return;
            }
        }
        const modelRequest = new ModelRequest("create", info);
        const url = "https://script.google.com/macros/s/AKfycbw4zNibfdhB6pPuKdrZOKKxIfaxNx8EyclIsi5OcMHazJ0ZLse9LD_06qwg3xlqRR8g/exec"; 
        // const requestData = {name:"HogeHuga", age:20};  // modelRequestの簡易版

        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(url, modelRequest);
            console.log(modelResponse);
            console.log("postに対するレスポンスが返ってきた");
            // viewに情報を渡す
            // といってもviewがやることは殆ど無いだろう。
            if (modelResponse.status === "succeed") {
                alert(`Request "create" has been succeeded.\nid:${modelResponse.infoArr[0].id}`);
                view.viewElm.dataset.id = modelResponse.infoArr[0].id;
            } else if (modelResponse.status === "failed") {
                alert(`createリクエスト失敗:\n${modelResponse.option.errorMsg}`);
            } else {
                alert("通常考えられないエラー。postレスポンス返ってこなかった時とかならあり得るかも");
            }
        })();

    }


    /**
     * 検索
     * @param {View} view 
     * @param {Object} option 
     */
    static read (view, option) {
        const info = view.getInfo();
        const modelRequest = new ModelRequest("read", info, option);
        const url = "https://script.google.com/macros/s/AKfycbw4zNibfdhB6pPuKdrZOKKxIfaxNx8EyclIsi5OcMHazJ0ZLse9LD_06qwg3xlqRR8g/exec"; 

        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(url, modelRequest);
            console.log(modelResponse);
            console.log("post(read)に対するレスポンスが返ってきた");
            
            const infoArr = modelResponse.infoArr;
            for (let i=0; i<infoArr.length; i++) {
                /** @type {Info} */
                const info = infoArr[i];

                // まずはテンプレートを表示
                const viewElm = View.createViewElementWithNumbering(i);

                // Infoをセットする
                const view = new View(viewElm);
                view.setInfo(info);

            }
        })();
    }


}