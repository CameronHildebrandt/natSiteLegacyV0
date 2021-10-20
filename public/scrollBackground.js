// Continuous Blur | Worse performance, looks okay
window.onload = () => {
  var scroll = 0;

  let scrollContainer = document.getElementById("scrollContainer");
  let bgImg = document.getElementById("headerBGImg");

  scrollContainer.addEventListener("scroll", (event) => {
    scroll = scrollContainer.scrollTop;

    if (scroll < 200) { // Stop blurring after a bit
      blurRadius = scroll / 40;

      bgImg.style.filter = "blur(" + String(blurRadius) + "px)";
      bgImg.style.webkitFilter = "blur(" + String(blurRadius) + "px)";
      bgImg.style.mozFilter = "blur(" + String(blurRadius) + "px)";
    }
  })
};


// Binary Blur | Better performance, looks garbage
// $(document).ready(function(){
//   var scroll = 0;
//   $("#scrollContainer").scroll(function(){
//     scroll = $("#scrollContainer").scrollTop();
//
//     if (scroll > 100) {
//       document.getElementById("headerBGDiv").style.height = "50%";
//       document.getElementById("headerBGDiv").style.filter="blur(5px)";
//     } else {
//       document.getElementById("headerBGDiv").style.height = "50%";
//       document.getElementById("headerBGDiv").style.filter="blur(0px)";
//     }
//
//   });
// });
