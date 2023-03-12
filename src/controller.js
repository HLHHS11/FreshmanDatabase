import { Info } from "./typedef.js"
import { ModelRequest } from "./modelRequest.js" 
import { ModelResponse} from "./modelResponse.js"
import { GasApiClient } from "./http.js"
import { View} from "./view.js"
// リクエストからルーティングされることになっている。
// ルーティングによって呼ばれると、Modelからデータを取得したり更新したりして、viewを返す
// ルーティングとは言いつつも、よくよく考えてみると結局各イベントハンドラが呼び出すってだけ

const URL = "https://script.google.com/macros/s/AKfycbw4zNibfdhB6pPuKdrZOKKxIfaxNx8EyclIsi5OcMHazJ0ZLse9LD_06qwg3xlqRR8g/exec"; 

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
        // const requestData = {name:"HogeHuga", age:20};  // modelRequestの簡易版

        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(URL, modelRequest);
            console.log(modelResponse);
            console.log("postに対するレスポンスが返ってきた");
            // viewに情報を渡す
            // といってもviewがやることは殆ど無いだろう。
            if (modelResponse.status === "succeed") {
                // まずはテンプレートを表示
                const viewElm = View.createViewElementWithNumbering(0);
                // Infoをセットする
                const view = new View(viewElm);
                view.init();
                view.setInfo(modelResponse.infoArr[0]);
                // #view-topに対してもdata-id属性をセット。重複createを防ぐためだ。
                document.getElementById("view-top").dataset.id = modelResponse.infoArr[0].id;
                alert(`Request "create" was successful.\nid:${modelResponse.infoArr[0].id}`);
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

        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(URL, modelRequest);
            console.log(modelResponse);
            console.log("post(read)に対するレスポンスが返ってきた");
            
            if (modelResponse.status === "succeed") {
                const infoArr = modelResponse.infoArr;
                if (infoArr.length !== 0) {
                    for (let i=0; i<infoArr.length; i++) {
                        /** @type {Info} */
                        const info = infoArr[i];
                        // まずはテンプレートを表示
                        const viewElm = View.createViewElementWithNumbering(i);
                        // Infoをセットする
                        const view = new View(viewElm);
                        view.init();
                        view.setInfo(info);
                    }
                } else {
                    alert(`条件に一致するデータが見つかりませんでした。条件を変えて再度お試しください。\nヒント：各項目は部分一致検索が可能ですので、不明な項目はキーワードを短くするか、空欄にしてください。`)
                }
            } else if (modelResponse === "failed") {
                alert(`readリクエスト失敗:\n${modelResponse.option.errorMsg}`);
            } else {
                alert("通常考えられないエラー。postレスポンス返ってこなかった時とかならあり得るかも。エラーハンドラちゃんと実装しときたい");
            }


        })();
    }


    /**
     * データ更新
     * @param {View} view 
     * @param {Object} option - いつかforceプロパティとか作ってコンフリクトに対応したい
     */
    static update (view, option) {
        const info = view.getInfo();
        const modelRequest = new ModelRequest("update", info, option);
        console.log("modelRequest");
        console.log(JSON.stringify(modelRequest));
        
        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(URL, modelRequest);
            console.log("updateのレスポンスが帰ってきた");
            if (modelResponse.status === "succeed") {
                alert(`Request "update" was successful.\nid:${modelResponse.infoArr[0].id} `);
            } else if (modelResponse.status === "failed") {
                alert(`updateリクエスト失敗:\n${modelResponse.option.errorMsg}`);
            } else {
                alert("通常考えられないエラー。postレスポンス返ってこなかった時とかならあり得るかも");
            }
        })();
    }


    /**
     * 
     * @param {View} view 
     * @param {Object} option 
     */
    static delete (view, option) {
        // 概要に@deleteと加えてからupdate()を呼び出す
        // やっぱりupdateを直接呼び出すのはやめて、共通する処理は別のメソッドに分けるというやり方にしたい。
        let comment = view.viewElm.querySelector(".comment").querySelector(".form-control").value.trim();
        if (!comment.includes("@delete")) { // すでにdeleteが含まれていれば、ここには入らない
            comment = comment + "\n@delete"
            view.viewElm.querySelector(".comment").querySelector(".form-control").value = comment;
        }
        
        const info = view.getInfo();
        const modelRequest = new ModelRequest("delete", info, option);
        console.log("modelRequest");
        console.log(JSON.stringify(modelRequest));

        // (async function () {
        //     /** @type {ModelResponse} */
        //     const modelResponse = await GasApiClient.httpPostRequest(URL, modelRequest);
        //     // ここから下でレスポンスを扱う
        //     console.log("modelResponse");
        //     console.log(modelResponse);
        // })();

        // ↓↓updateからそのままコピーして、ログの中身だけ変えた
        (async function () {
            /** @type {ModelResponse} */
            const modelResponse = await GasApiClient.httpPostRequest(URL, modelRequest);
            console.log("deleteのレスポンスが帰ってきた");
            if (modelResponse.status === "succeed") {
                alert(`Request "delete" was successful.\nid:${modelResponse.infoArr[0].id} `);
            } else if (modelResponse.status === "failed") {
                alert(`deleteリクエスト失敗:\n${modelResponse.option.errorMsg}`);
            } else {
                alert("通常考えられないエラー。postレスポンス返ってこなかった時とかならあり得るかも");
            }
        })();
    }

}