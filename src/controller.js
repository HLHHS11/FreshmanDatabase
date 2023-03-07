import {Info} from "./typedef.js"
// リクエストからルーティングされることになっている。
// ルーティングによって呼ばれると、Modelからデータを取得したり更新したりして、viewを返す

export class Controller {
    /**
     * データを作成するようModelに要請し、得られた結果をviewに渡す
     * @param {Info} info 
     */
    static create (info) {
        // スプシとの通信をModelに実装。Model
        // イメージ：Model.create(hoge);

        // viewに情報を渡す

    }
}