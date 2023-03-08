import {Info} from "./typedef.js"

/**
 * テンプレートから入力値を取得したりする
 * あらかじめ注意として書いとくと、
 * HTMLでドロップダウンは初期値が「学科」や「経験」なので、
 * そのままだった場合は空文字列に変換する必要がある
 */
export class View {
    
    /**
     * 
     * @param {HTMLElement} viewElm
     */
    constructor (viewElm) {
        this.viewElm = viewElm;
        console.log(`view constructor`);
    }

    /**
     * 
     * @returns {Info}
     */
    getInfo () {
        /** @type {Info} */
        let info = {};
        let temp;   // validation用
        // ↓trim()がないと変な空白？改行がひっついてくる
        info.name = this.viewElm.querySelector(".name").querySelector(".form-control").value.trim();
        info.nickname = this.viewElm.querySelector(".nickname").querySelector(".form-control").value.trim();
        temp = this.viewElm.querySelector(".exp-and-years").querySelector(".btn").textContent.trim();
        info.experience = !(temp==="経験"||temp==="未選択") ? temp : "";
        info.years = this.viewElm.querySelector(".exp-and-years").querySelector(".form-control").value.trim();
        temp = this.viewElm.querySelector(".department").querySelector(".btn").textContent.trim();
        info.department = !(temp==="学科"||temp==="未選択") ? temp : "";
        temp = this.viewElm.querySelector(".status").querySelector(".btn").textContent.trim();
        info.status = !(temp==="入会意思"||temp==="未選択") ? temp : "";
        info.hometown = this.viewElm.querySelector(".hometown").querySelector(".form-control").value.trim();
        info.contact = this.viewElm.querySelector(".contact").querySelector(".form-control").value.trim();
        info.schedule = this.viewElm.querySelector(".schedule").querySelector(".form-control").value.trim();
        info.comment = this.viewElm.querySelector(".comment").querySelector(".form-control").value.trim();

        console.log(`info:${JSON.stringify(info)}`);
        return info;
    }

    /**
     * 返り値はない予定。
     * @param {Info} info 
     */
    setInfo (info) {

    }


    /**
     * @return {HTMLElement} - Viewインスタンスを返す
     */
    static renderViewElement () {

    }


    /**
     * search処理の前に呼び出したい。すでに出てる検索結果をクリアする
     */
    static clearViewElements () {

    }

}
