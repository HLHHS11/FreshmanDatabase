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
    }

    /**
     * _idプロパティも、ここで
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
        // const idSelector = '[id^="id-"]';
        // info.id = this.viewElm.closest('[id^="id-"]')
        info.id = this.viewElm.dataset.id;
        console.log(`info:${JSON.stringify(info)}`);
        return info;
    }

    /**
     * 返り値はない予定。
     * @param {Info} info 
     */
    setInfo (info) {
        this.viewElm.querySelector(".name").querySelector(".form-control").value = info.name;
        this.viewElm.querySelector(".nickname").querySelector(".form-control").value = info.nickname;
        this.viewElm.querySelector(".exp-and-years").querySelector(".btn").textContent = info.experience ? info.experience:"\u00A0\u00A0経験\u00A0\u00A0";
        this.viewElm.querySelector(".exp-and-years").querySelector(".form-control").value = info.years;
        this.viewElm.querySelector(".department").querySelector(".btn").textContent = info.department ? info.department:"\u00A0学科\u00A0";
        this.viewElm.querySelector(".status").querySelector(".btn").textContent = info.status ? info.status:"入会意思";
        this.viewElm.querySelector(".hometown").querySelector(".form-control").value = info.hometown;
        this.viewElm.querySelector(".contact").querySelector(".form-control").value = info.contact;
        this.viewElm.querySelector(".schedule").querySelector(".form-control").value = info.schedule;
        this.viewElm.querySelector(".comment").querySelector(".form-control").value = info.comment;
        this.viewElm.dataset.id = info.id;
        
    }


    /**
     * ビューの情報をすべて元に戻す
     */
    clearInfo () {
        /** @type {Info} */
        const defaultInfo = {
            name:"",
            nickname:"",
            department:"",
            experience:"",
            years:"",
            hometown:"",
            contact:"",
            status:"",
            schedule:"",
            comment:"",
            id:""
        };
        this.setInfo(defaultInfo);
    }


    /**
     * @param {Number} - 何番目のviewであるかを表す数値。ex: view3ならi=3
     * @return {HTMLElement} - Viewインスタンスを返す
     */
    static createViewElementWithNumbering (i) {
        const template = document.getElementById("view-template");
        const clone = template.content.cloneNode(true);
        const viewElem = document.createElement("div");
        const containerElem = document.getElementById("outside-container");
        viewElem.id = `view${String(i)}`;
        // viewElem.dataset.id = String(info.id);  // data-id属性に文字列化したidをセット
        viewElem.appendChild(clone);
        containerElem.appendChild(viewElem);
        return viewElem;
    }





    /**
     * search処理の前に呼び出したい。すでに出てる検索結果をクリアする
     */
    static clearViewElements () {
        // const viewNodeList = document.querySelecotrAll("div[id^='view']");
        // querySelectorAllを使わないのは気持ち悪いかもしれないが、
        // idだけでうまくやる方法に気づいたのでそれで書いてみる
        for (let i=0; i<400; i++) {
            const viewElm = document.getElementById(`view${String(i)}`);
            // 存在したら消去、存在しなければそこで終わりなのでbreak
            if (viewElm) {
                viewElm.remove();
            } else {
                break;
            }
        }
    }

}
