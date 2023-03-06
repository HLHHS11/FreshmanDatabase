// gasからjsに渡される情報のイメージ
["呼び名","名前","地球工","軟フレ",6,"愛知・刈谷高校","やま","めがね",]
// 一人のプロフィールをclass Profileでまとめてオブジェクトとする。
// ※idや作成日時、更新日時も入れるべきだ

// Profileに依存するクラスViewRenderer(仮)を作って、それを用いてDOMの更新を行うことにする

export interface ProfileI {
    /**
     * この中で引数の配列をいい感じに連想配列のように整形
     * main.gsのconst COLUMN_NUM的なやつにもお世話になることだろう
     * 
     * データの更新用メソッドも作るべきだ。
     * 汎用的に、いろんな場面で、更新はメソッドを介して行われたほうが良いと思う
     */
    nickname:String;
    name:String;
    // ......



    // ViewRendererのスタックで管理しやすいように、「表示中かどうか」のboolean値があってもいいかも。というのは、Modelへの指示はスピードの都合上非同期にしちゃったほうがいいので、view内のスタックも消すんではなくフラグをfalseにして、新規プロフィールをpushしてそっちのフラグをtrueにする、そんでデータベース操作に失敗したら、そのデータたちも取得して保存しておくという仕組みがあるべきだ
}

// 最終的には、ビューごとまとめて更新するのではなく、更新があったデータについてのみ更新するようにしたい
// ただしそれは複雑になるので、いったんデータ更新があったら「すべて更新する」という実装をすることにする

export interface ViewRendererI {
    $dependency:Object; // Profile

    constructor (profile:Profile): void;

    profileStack: Profile[];

    pushProfileToStack (): void;

    template: HTMLElement;

    /**
     * 成功したらtrueを返すとかでも良い
     * スタックからプロフィールを取り出して、ビューを作る
     */
    createProfileView (): void;


    /**
     * プロフィールのビューを更新するメソッド
     * 更新ボタンが押される→イベントハンドラがコントローラーにProfileオブジェクトとリクエストを投げる
     * →コントローラーがモデルにデータベースから情報を引っ張ってくるよう指示（できれば非同期にして、通信中との文言を出しておく）
     * →コントローラーがviewに再描画を指示
     * この、「コントローラーがview再描画を指示」されたときの処理を書く
     */
    updateProfileView (): void;

    /**
     * プロフィールのビューを削除するメソッド
     * 削除ボタンが押される→イベントハンドラがコントローラーにProfileオブジェクトとリクエストを投げる
     * →コントローラーがモデルにデータベースに削除フラグをつけるよう指示（非同期）
     * →コントローラーがview再描画（表示を消させる）を指示
     * 
     * もちろん削除もフラグをつけるだけで、実際には消さない。
     */
    removeProfileView (): void;
}

export interface ViewControllerI {

}

/**
 * イベントハンドラ。
 * ボタン等にイベントリスナーを設定して、ボタンクリックなどのイベントを検知したら、
 * 入力フォームの情報等を取得して、コントローラーにわたす
 */
export interface EventHandlerI {

}

export interface MainI {
    /** 
     * 初期化
     *  - イベントリスナーの設定
     */
    init(): Void;
}


/**
 * ドロップダウンメニューを改良するjs
 */
function selectDropdownItem(e) {
    // クリックされた選択肢のdata-value属性値を取得
    const selectedValue = e.target.getAttribute('data-value');
    // ドロップダウンボタンのテキストを変更
    const dropdownButton = document.getElementById('dropdownMenuButton');
    dropdownButton.textContent = selectedValue;
}
// ドロップダウンメニュー内の各選択肢にイベントリスナーを設定
const dropdownItems = document.querySelectorAll('.dropdown-item');
for (let i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener('click', selectDropdownItem);
}

/** テンプレートを扱う部分 */
for (let i=0; i<4; i++) {
    const template = document.getElementById("person-template");
    const clone = template.content.cloneNode(true);
    const containerElement = document.getElementsByClassName("container-fluid")[0];
    containerElement.appendChild(clone);
}