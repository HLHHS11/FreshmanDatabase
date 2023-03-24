const overlay = document.getElementById('overlay');

function showOverlay() {
  overlay.style.display = 'block';
}

function hideOverlay() {
  overlay.style.display = 'none';
}

async function fetchData() {
  try {
    showOverlay(); // 通信開始時にオーバーレイを表示
    const response = await fetch('https://umayadia-apisample.azurewebsites.net/api/persons/Shakespeare');
    const data = await response.json();
    // データの処理


    await (function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    })(3000);


    console.log(data);
  } catch (e) {
    // エラー処理
  } finally {
    hideOverlay(); // 通信終了時にオーバーレイを非表示
  }
}