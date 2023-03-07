// 参考サイトURL:https://zenn.dev/tentel/articles/8146043d1101b5ea873d

// Promiseオブジェクトのテスト
// new Promise(function (resolve, reject){
//     try {
//       // 1秒後に"非同期処理"とコンソールに出力
//       setTimeout(()=>{
//         console.log("非同期処理")
        
//         // returnの代わりに正常終了したことを表すresolveを返す
//         resolve()
//       }, 1000)
//     } catch (e) {
//       // 異常終了時の処理
      
//       // returnの代わりに異常終了したことを表すresolveを返す
//       reject()
//     }
// })
// console.log("プログラム最終行");

// output:
// プログラム最終行
// 非同期処理



// then, catchのテスト
// function asyncFunction() {
//     return new Promise((resolve, reject) => {
//         try {
//             // 1秒後に"非同期処理"とコンソールに出力
//             setTimeout(() => {
//                 console.log("非同期処理")
//                 // returnの代わりに正常終了したことを表すresolveを返す
//                 resolve();
//             }, 3000)
//             // // エラーを投げてみる
//             // throw "異常終了";
//         } catch (e) {
//             // 異常終了時の処理
    
//             // returnの代わりに異常終了したことを表すresolveを返す
//             reject();
//         }
//     });
// }

// asyncFunction().then(() => {
//     console.log("resolve後の処理");
//     console.log("ここに例えばデータ取得後の処理を書く");
// }).catch(e => {
//     console.log("reject後の処理");
//     console.error(e);
// })
// console.log("プログラム最終行");

// output:
// プログラム最終行
// 非同期処理
// resolve後の処理
// ここに例えばデータ取得後の処理を書く



// then, catchで引数を受け取るテスト
// function asyncFunction() {
//     return new Promise((resolve, reject) => {   // ※コピペ時にここだけ4スペースのインデントが入ってしまい、少し見た目が崩れている
//       try {
//         // 1秒後に"非同期処理"とコンソールに出力
//         setTimeout(() => {
//           console.log("非同期処理")
//           const num = 1
//           resolve(num);
//         }, 3000)
//       } catch (e) {
//         // 異常終了時の処理
  
//         // returnの代わりに異常終了したことを表すresolveを返す
//         reject(e);
//       }
//     })
// }
  
//   asyncFunction().then((num) => {
//     console.log(`引数で受け取った値：${num}`);
//   }).catch(e => {
//     console.log(`引数で受け取った値：${e}`);
//   })

// output:
// 非同期処理
// 引数で受け取った値：1

// try{の直下に次のコードを入れた場合
//     if (true) {
//         throw "異常終了";
//     }
// output:
// 引数で受け取った値：異常終了


// 「async/await よくあるミス3」について
// async function asyncFunction() {
//     try {
//       return setTimeout(async ()=>{
//         console.log("タイムアウトのコールバック");
//         return "resolve"
//       }, 3000)
//     } catch (e) {
//       throw "reject"
//     }
//   }
  
//   async function main() {
//     const txt = await asyncFunction()
//     console.log(txt);
//   }
//   main()

// output: TimerIdオブジェクトが返ってきてしまっている
// Timeout {
//     _idleTimeout: 3000,
//     _idlePrev: [TimersList],
//     _idleNext: [TimersList],
//     _idleStart: 24,
//     _onTimeout: [AsyncFunction (anonymous)],
//     _timerArgs: undefined,
//     _repeat: null,
//     _destroyed: false,
//     [Symbol(refed)]: true,
//     [Symbol(kHasPrimitive)]: false,
//     [Symbol(asyncId)]: 2,
//     [Symbol(triggerId)]: 1
// }
// タイムアウトのコールバック

// 106~109を以下のように書き換えれば、思ったような出力が得られるらしい
// return new Promise(resolve => setTimeout(resolve, 1000, "resolve"))
// return new Promise()とすることで実現可能であることは覚えておくべきだ
// output:
// resolve

