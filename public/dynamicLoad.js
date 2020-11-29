window.addEventListener('load', function () {
  var img=new Image();
  img.src = document.getElementById("headerBGImg").getAttribute("lsrc");

  img.addEventListener('load', function () {
    document.getElementById("headerBGImg").style.backgroundImage = "url(" + this.src + ")";
    document.querySelector(".spinner").style.opacity = "0%";
    document.getElementById("headerBGImg").style.opacity = "100%";
    document.getElementById("headerBGImg").style.filter = "blur(0px)";
  })
})
