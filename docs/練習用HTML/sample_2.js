// オーバーレイ表示サンプル

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


// sessionStorage使用練習
// const updateBtn = document.querySelector(".update");
const updateBtn = document.querySelector(".update");
updateBtn.addEventListener("click", ()=>{
  sessionStorage.setItem("name", "umaya");
  sessionStorage.setItem("age", 30);
  console.log(sessionStorage.getItem("name"));
  console.log(sessionStorage.getItem("age"));

  const usernameElm = document.querySelector(".username");
  sessionStorage.setItem("username", usernameElm.value);
  console.log(sessionStorage.getItem("username"));
})



// クロージャによる永続化の練習

const closureBtn1 = document.querySelector(".closure1");
const closureBtn2 = document.querySelector(".closure2");

const closure = (initVal)=>{
  let count = initVal;
  console.log(`closure was called`);
  return function(){
    count++;
    console.log(count);
  }
};

const closureFunc1 = closure(0);
const closureFunc2 = closure(100);

closureBtn1.addEventListener("click", closureFunc1);
closureBtn2.addEventListener("click", closureFunc2);

// クロージャを使わなくても値の永続化は一応可能
// let counter = 0;
// closureBtn.addEventListener("click", ()=>{
//   console.log(`button was clicked`);
//   counter++;
//   console.log(counter);
// })



// const closureBtn = document.querySelector(".closure");
// const closure = (function(){
//   let count = 0;
//   return function(){
//     count++;
//     console.log(count);
//   }
// })();

// closureBtn.addEventListener("click", ()=>{
//   console.log(`closure was called`);
//   closure();
// });




// スワイプで削除ボタン

$(document).ready(function() {
  let swipeStartX = 0;
  let swipeEndX = 0;
  let swipeThreshold = 50;

  $('.swipe-item').on('touchstart', function(e) {
    swipeStartX = e.touches[0].clientX;
  });

  $('.swipe-item').on('touchmove', function(e) {
    swipeEndX = e.touches[0].clientX;
  });

  $('.swipe-item').on('touchend', function() {
    const swipeDistance = swipeStartX - swipeEndX;

    if (swipeDistance > swipeThreshold) {
      $(this).css('transform', 'translateX(-100px)');
      $(this).find('.delete-btn').css('opacity', '1');
    } else if (swipeDistance < -swipeThreshold) {
      $(this).css('transform', 'translateX(0)');
      $(this).find('.delete-btn').css('opacity', '0');
    }
  });
});


// スワイプで削除ボタン(プレーンjs)
document.addEventListener('DOMContentLoaded', function() {
  const swipeItems = document.querySelectorAll('.swipe-item');
  let swipeStartX = 0;
  let swipeEndX = 0;
  const swipeThreshold = 50;

  swipeItems.forEach(function(swipeItem) {
    swipeItem.addEventListener('touchstart', function(e) {
      swipeStartX = e.touches[0].clientX;
    });

    swipeItem.addEventListener('touchmove', function(e) {
      swipeEndX = e.touches[0].clientX;
    });

    swipeItem.addEventListener('touchend', function() {
      const swipeDistance = swipeStartX - swipeEndX;

      if (swipeDistance > swipeThreshold) {
        this.style.transform = 'translateX(-100px)';
        this.querySelector('.delete-btn').style.opacity = '1';
      } else if (swipeDistance < -swipeThreshold) {
        this.style.transform = 'translateX(0)';
        this.querySelector('.delete-btn').style.opacity = '0';
      }
    });
  });
});