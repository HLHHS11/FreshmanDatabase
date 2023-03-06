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
        // ↓trim()がないと変な空白？改行がひっついてくる
        info.name = this.viewElm.querySelector(".name").querySelector(".form-control").value.trim();
        info.nickname = this.viewElm.querySelector(".nickname").querySelector(".form-control").value.trim();
        info.experience = this.viewElm.querySelector(".exp-and-years").querySelector(".btn").textContent.trim();
        info.years = this.viewElm.querySelector(".exp-and-years").querySelector(".form-control").value.trim();
        info.department = this.viewElm.querySelector(".department").querySelector(".btn").textContent.trim();
        info.status = this.viewElm.querySelector(".status").querySelector(".btn").textContent.trim();
        info.schedule = this.viewElm.querySelector(".schedule").querySelector(".form-control").value.trim();
        info.comment = this.viewElm.querySelector(".comment").querySelector(".form-control").value.trim();
        console.log(`info:${JSON.stringify(info)}`);
        return info;
    }



}
