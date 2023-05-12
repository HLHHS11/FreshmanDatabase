import { Info } from "./typedef.js"
import { EventHandler } from "./eventHandler.js"


export class View {
    
    /**
     * ボタン等を初期化する
     * addEventListener()の第２引数は「イベントハンドラ」で、ボタンが押されたら具体的に何を行うのかが書かれている
     * @param {HTMLElement} viewElm
     */
    constructor (viewElm) {
        this.viewElm = viewElm;
    }

    init () {
        // ドロップダウンのイベントリスナー設定
        const dropdownBtns = this.viewElm.querySelectorAll(".dropdown-menu .dropdown-item");
        for (const button of dropdownBtns) {
            button.addEventListener("click",EventHandler.onDropdownButtonClicked, false);
        }

        if (this.viewElm.id === "view-top") {
            const searchBtn = this.viewElm.querySelector(".search").querySelector(".btn");
            const clearBtn = this.viewElm.querySelector(".clear").querySelector(".btn");
            const createBtn = this.viewElm.querySelector(".create").querySelector(".btn");
            createBtn.addEventListener("click", EventHandler.onCreateButtonClicked, false);
            searchBtn.addEventListener("click", EventHandler.onSearchButtonClicked, false);
            clearBtn.addEventListener("click", EventHandler.onClearButtonClicked, false);
        } else {
            // update, delete
            const updateBtn = this.viewElm.querySelector(".update").querySelector(".btn");
            const deleteBtn = this.viewElm.querySelector(".delete").querySelector(".btn");
            updateBtn.addEventListener("click", EventHandler.onUpdateButtonClicked, false);
            deleteBtn.addEventListener("click", EventHandler.onDeleteButtonClicked, false);
            this.viewElm.addEventListener("touchstart", EventHandler.onTouchStart, false);
            this.viewElm.addEventListener("touchend", EventHandler.onTouchEnd, false);
        }
    }


    /**
     * viewから値を取得
     * @returns {Info}
     */
    getInfo () {
        /** @type {Info} */
        const info = {};
        let temp;   // validation用
        // ↓trim()がないと変な空白や改行がひっついてくる
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
     * viewに引数で与えられた値をセット
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
     * viewの操作画面の情報をすべて初期値に戻す
     * view0など検索結果に対しても使えるが、現状クリアボタンが#view-topにしかないので、#view-top限定
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
     * カラーコードの例
     * 青系:#d9edf7, 赤系:#f2dede, 緑系:#dff0d8, 灰色系:#f2f2f2
     * 薄い青:#E0F5FF
     * @param {String} colorCode
     */
    setBackground (colorCode) {
        this.viewElm.style.backgroundColor = colorCode; // ブロック全体の背景色を変える
        // ↓↓テキストボックスの中の背景色まで変える
        // const inputElmCollection = this.viewElm.getElementsByTagName("input");
        // for (let inputElm of inputElmCollection) {  // 各inputタグの中の背景色を変える
        //     // inputElm.setAttribute("background-color", colorCode);
        //     inputElm.style.backgroundColor = colorCode;
        // }
        // this.viewElm.getElementsByTagName("textarea")[0].style.backgroundColor = colorCode;
    }


    /**
     * @param {Number} 何番目のviewであるかを表す数値。ex: view3ならi=3
     * @return {HTMLElement} Viewインスタンスを返す
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
        for (let i=0; i<400; i++) {
            const viewElm = document.getElementById(`view${String(i)}`);
            if (viewElm) {
                viewElm.remove();
            } else {
                break;
            }
        }
    }

}
