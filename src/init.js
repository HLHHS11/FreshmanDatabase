import {View} from "./view.js"
import {Info} from "./typedef.js"
import {Controller} from "./controller.js"

/**
 * とりあえずクラスにまとめてみた
 * ajax的なことをやって一部の要素に適用するなら、クラスにまとめてもいいなと考えた
 * しかし現時点(03/06)では特に変わったことはせず、シンプルに初期化するだけである
 */

export class Init {

    /**
     * とりあえずViewをセットするけど、仕様は全然決めてない
     * なんならいらない可能性さえある
     * @param {View} view 
     */
    constructor (view) {
        // ↓イベントリスナーからメソッドが呼ばれる時、インスタンスは別物であって、
        // this.viewはundefinedであるようだ
        this.view = view;
        // console.log(`typeof this: ${typeof this}(constructor)`);
        // console.log(`typeof this.view : ${typeof this.view}(constructor)`);
    }

    init () {
        // ドロップダウンの設定
        const dropdownBtns = document.querySelectorAll(".dropdown-menu .dropdown-item");
        for (const button of dropdownBtns) {
            button.addEventListener("click",this.onDropdownButtonClicked, false);
        }
        // 作成ボタンの設定
        
        const searchBtn = document.querySelector(".search").querySelector(".btn");
        const clearBtn = document.querySelector(".clear").querySelector(".btn");
        const createBtn = document.querySelector(".create").querySelector(".btn");
        createBtn.addEventListener("click", this.onCreateButtonClicked, false);
        searchBtn.addEventListener("click", this.onSearchButtonClicked, false);
        clearBtn.addEventListener("click", this.onClearButtonClicked, false);
    }

    /**
     * @param {Event} e 
     */
    onDropdownButtonClicked (e) {
        const selectedText = e.target.textContent;
        const dropdownButton = e.target.closest(".dropdown").querySelector(".dropdown-toggle");
        dropdownButton.textContent = selectedText;
    }

    /**
     * @param {Event} e 
     */
    onCreateButtonClicked (e) {
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


    onSearchButtonClicked (e) {
        // 既存の検索結果を消去してから検索処理開始
        View.clearViewElements();
        const viewDiv = e.target.closest("#view-top");
        const view = new View(viewDiv);
        const option = {and:true, or:false};
        Controller.read(view, option);  // and,orは一旦考えずに、検索結果の数に応じて自動でやるようにしてもいいかも
    }


    onClearButtonClicked (e) {
        const viewDiv = e.target.closest("#view-top");
        const view = new View(viewDiv);
        view.clearInfo();
    }

}
