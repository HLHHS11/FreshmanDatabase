
export class GasApiClient {
    
    /**
     * テスト用。もし使うなら、引数のとこをちゃんと作り変えること
     * @param {String} url 
     * @param {String} param 
     */

    static async httpGetRequest (url, param) {
        const response = await fetch(url+"?name=HogeHuga&age=20");
        const data = await response.json();
        return data;
    }

    /**
     * requestDataは基本的にはModelRequestオブジェクトのつもりだが、
     * 他にもデータを送りたくなることがあるかもしれないので、型は広くObjectとしておく
     * @param {String} url 
     * @param {Object} requestData
     * @return {Object} - JSONとしてパースした結果
     */
    static async httpPostRequest (url, requestData) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(requestData)
        });
        const responseData = await response.json();
        return responseData;
    }



    // ↓ボツ。controller側でawaitしたいから。
    // static async httpGetRequest (url, param) {
    //     fetch(url+"?name=HogeHuga&age=20")
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             return data;
    //         });    // よくわかってない。普通にdataを返したいだけ
    // }


}

