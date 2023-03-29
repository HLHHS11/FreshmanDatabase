import { View } from "./view.js"
import {Info} from "./typedef.js"
import {Controller} from "./controller.js"

export class EventHandler {

    /**
     * @param {Event} e 
     */
    static onDropdownButtonClicked (e) {
        const selectedText = e.target.textContent;
        const dropdownButton = e.target.closest(".dropdown").querySelector(".dropdown-toggle");
        dropdownButton.textContent = selectedText;
    }

    /**
     * @param {Event} e 
     */
    static onCreateButtonClicked (e) {
        View.clearViewElements();
        // viewのElementを取得
        const viewDiv = e.target.closest("#view-top");
        const view = new View(viewDiv);
        // const info = view.getInfo();
        // const info = {  // テスト用サンプルデータ
        //     name:"山田太郎",
        //     nickname:"たろう",
        //     department:"工",
        //     experience:"経",
        //     years:5,
        //     hometown:"兵庫・灘",
        //     contact:"れんたん",
        //     status:"強",
        //     schedule:"4/2'初参加'",
        //     comment:"下宿している"
        // };
        Controller.create(view);    // 言うなればこの部分がルーティングか。
    }


    static onSearchButtonClicked (e) {
        // 既存の検索結果を消去してから検索処理開始
        View.clearViewElements();
        const viewDiv = e.target.closest("#view-top");
        const view = new View(viewDiv);
        const option = {and:true, or:false};
        Controller.read(view, option);  // and,orは一旦考えずに、検索結果の数に応じて自動でやるようにしてもいいかも
    }


    static onUpdateButtonClicked (e) {
        console.log("update btn");
        // 親divをCSSセレクタの正規表現的なやつを使って取得
        const viewElm = e.target.closest('[id^="view"]');
        const view = new View(viewElm);
        const option = {};   // force的な感じで、競合への処理もいずれは書く必要がある
        Controller.update(view, option);
    }

    static onDeleteButtonClicked (e) {
        console.log("delete btn");
        const viewElm = e.target.closest('[id^="view"]');
        const view = new View(viewElm);
        const option = {};
        Controller.delete(view, option);
    }


    static onClearButtonClicked (e) {
        const viewDiv = e.target.closest("#view-top");
        const view = new View(viewDiv);
        view.clearInfo();
    }


    static onScheduleButtonClicked (e) {
        // 日程の編集ボタンが押されたら、日程の編集画面を表示する
    }

    static onTouchStart (e) {
        const viewElm = e.target.closest('[id^="view"]');
        const view = new View(viewElm);
        // view.setBackground("#e9f1f5");
        view.setBackground("#f2f2f2");
    }


    static onTouchEnd (e) {
        const viewElm = e.target.closest('[id^="view"]');
        const view = new View(viewElm);
        view.setBackground("#FFFFFF")
    }

}
