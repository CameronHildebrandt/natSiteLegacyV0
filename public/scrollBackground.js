// Continuous Blur | Worse performance, looks okay
$(document).ready(function(){
  var scroll = 0;
  $("#scrollContainer").scroll(function(){
    scroll = $("#scrollContainer").scrollTop();

    if (scroll < 200) { // Stop blurring after a bit
      scroll = scroll / 50;
      $("#headerBGImg").css({"-webkit-filter": "blur("+scroll+"px)","filter": "blur("+scroll+"px)" })
    }

  });
});

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
