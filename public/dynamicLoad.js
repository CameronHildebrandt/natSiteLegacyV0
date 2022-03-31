$(document).ready(function(){

  function showLastImg() {
    // console.info(performance.navigation.type);
    // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //   console.log( "This page is reloaded" );
    // } else {
    //   console.log( "This page is not reloaded");
    // }

    // Detect Chrome
    let chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
    // Detect Safari
    let safariAgent = navigator.userAgent.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent)) safariAgent = false;


    if(!safariAgent && !performance.navigation.type) {
      referrer = document.referrer;

      if(referrer.indexOf("projects") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/FullSizeHeaderImages/Sticker.jpg)";
      }
      else if (referrer.indexOf("team") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/FullSizeHeaderImages/ProjectTeam2019.jpg)";
      }
      else if (referrer.indexOf("events") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/FullSizeHeaderImages/MeetingEvent.jpg)";
      }
      else if (referrer.indexOf("contact") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/FullSizeHeaderImages/Muse.jpg)";
      }
      else if (referrer.indexOf("drone") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/ProjectPhotos/BrainDroneThumbnail.jpg)";
      }
      else if (referrer.indexOf("alphaBlaster") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/ProjectPhotos/AlphaBlasterScreencap.jpg)";
      }
      else if (referrer.indexOf("RemBRAINdt") > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/ProjectPhotos/AlphaBlasterScreencap.jpg)";
      }
      else if (referrer.indexOf(window.location.hostname) > -1) {
        document.getElementById("headerBGDiv").style.backgroundImage = "url(/images/FullSizeHeaderImages/Whiteboard.jpg)";
      }
      else {
        document.getElementById("headerBGDiv").style.backgroundImage = "linear-gradient( 135deg, #FF6FD8 10%, #3813C2 100%)";
      }

      delete referrer
    }
  }


  window.addEventListener('load', function () {
    // showLastImg();

    if(document.getElementById("headerBGImg")) {
      var img=new Image();
      img.src = document.getElementById("headerBGImg").getAttribute("lsrc");
  
      img.addEventListener('load', function () {
        document.getElementById("headerBGImg").style.backgroundImage = "url(" + this.src + ")";
        document.querySelector(".spinner").style.opacity = "0%";
        document.getElementById("headerBGImg").style.opacity = "100%";
        document.getElementById("headerBGImg").style.filter = "blur(0px)";
      })
      showLastImg();
    }
  })

});
