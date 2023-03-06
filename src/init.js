import {View} from "./view.js"
import {Info} from "./typedef.js"

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
        
        const createBtn = document.querySelector(".create").querySelector(".btn");
        createBtn.addEventListener("click", ()=>console.log(`this : ${JSON.stringify(this)}(click button)`), false);
        createBtn.addEventListener("click", ()=>console.log(`typeof this: ${typeof this}(click button)`), false);
        createBtn.addEventListener("click", this.onCreateButtonClicked, false);
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
        /** @type {Info} */
        const info = view.getInfo();
        

    }

}
