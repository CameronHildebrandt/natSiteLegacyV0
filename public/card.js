function isAlpha(c) {
  return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
}

function isNumeric(c) {
  return (c >= '0' && c <= '9');
}

function isAlphaNumeric(c) {
  return (isAlpha(c) || isNumeric(c));
}

Array.prototype.mutate = function (func) {
  this.forEach(func);
  return this;
}

class Card {
  header = "";
  subHeader = "";
  paragraph = "";
  image = "";
  imageWidth = "";
  video = "";
  buttonText = "";
  link = "";
  location = "";
  altText = "";
  largeHeader = ""
  startDate = null;
  endDate = null;
  dark = false;
  large = false;
  featured = false;

  constructor(args) {
    this.setHeader(args["header"]); 
    this.setSubHeader(args["subHeader"]);
    this.setParagraph(args["paragraph"]);
    this.setImage(args["image"]);
    this.setImageWidth(args["imageWidth"]);
    this.setVideo(args["video"]);
    this.setButtonText(args["buttonText"]);
    this.setLink(args["link"]);
    this.setLocation(args["location"]);
    this.setAltText(args["altText"]);
    this.setStartDate(args["startDate"]);
    this.setEndDate(args["endDate"]);
    this.setDark(args["dark"]);
    this.setLarge(args["large"]);
    this.setLargeHeader(args["largeHeader"]);
    this.setFeatured(args["featured"]);
  }

  clone() {
    return new Card({
      header: this.header,
      subHeader: this.subHeader,
      paragraph: this.paragraph,
      image: this.image,
      imageWidth: this.imageWidth,
      video: this.video,
      buttonText: this.buttonText,
      link: this.link,
      location: this.location,
      date: this.date,
      dark: this.dark,
      large: this.large,
      largeHeader: this.largeHeader,
      featured: this.featured,
    });
  }

  isFinished() {
    return this.endDate !== undefined && this.endDate < Date.now();
  }

  isFeatured() {
    return this.featured;
  }

  isDark() {
    return this.dark;
  }

  setHeader(header) {
    if (header !== undefined) {
      this.header = header;
    }
    return this;
  }

  setSubHeader(subHeader) {
    if (subHeader !== undefined) {
      this.subHeader = subHeader;
    }
    return this;
  }

  setParagraph(paragraph) {
    if (paragraph !== undefined) {
      this.paragraph = paragraph;
    }
    return this;
  }

  setImage(image) {
    if (image !== undefined) {
      this.image = image;
    }
    return this;
  }
  
  setImageWidth(imageWidth) {
    if (imageWidth !== undefined) {
      this.imageWidth = imageWidth;
    }
  }

  setVideo(video) {
    if (video !== undefined) {
      this.video = video;
    }
    return this;
  }

  setLink(link) {
    if (link !== undefined) {
      this.link = link;
    }
    return this;
  }

  setButtonText(buttonText) {
    if (buttonText !== undefined) {
      this.buttonText = buttonText;
    }
    return this;
  }

  setLocation(location) {
    if (location !== undefined) {
      this.location = location;
    }
    return this;
  }

  setAltText(altText) {
    if (altText !== undefined) {
      this.altText = altText;
    }
    return this;
  }

  setStartDate(date) {
    if (date !== undefined) {
      this.startDate = date;
    }
    return this;
  }

  setEndDate(date) {
    if (date !== undefined) {
      this.endDate = date;
    }
    return this;
  }

  setDark(dark) {
    if (dark !== undefined) {
      this.dark = dark;
    }
    return this;
  }

  setLarge(large) {
    if (large !== undefined) {
      this.large = large;
    }
    return this;
  }

  setLargeHeader(header) {
    if (header !== undefined) {
      this.largeHeader = header;
    }
    return this;
  }

  setFeatured(featured) {
    if (featured !== undefined) {
      this.featured = featured;
    }
    return this;
  }

  _linkToText(link) {
    for (var i = link.length; i > 0; --i) {
      if (link[i-1] == '.') {
        link = link.substr(0, i-1);
        break;
      }
    }

    link = link.split("/");
    link = link[link.length-1];
    var text = "";
    if (link.length > 0) {
      text = link[0].toUpperCase();
    }
    for (var i = 1; i < link.length; ++i) {
      if (link[i] == link[i].toUpperCase() && link[i-1] != link[i-1].toUpperCase() && isAlphaNumeric(link[i])) {
        text += " "
      }
      text += link[i];
    }

    return text;
  }

  generateElement() {
    var rootBlockType = "smallInfoBlock";
    var rootBlockStyle = "margin-bottom: 0px";
    var contentsType = "smallInfoContents";
    var textColorStyle = "";
    var buttonType = "smallButton";
    var mediaFrameType = "smallMediaFrame";
    var mediaImageType = "eventImageNoHover";
    var mediaHref = "";
    var mediaAltText = this.altText;
    var mediaImageStyle = "";
    
    if (this.large) {
      rootBlockType = "largeInfoBlock";
      contentsType = "largeInfoContents";
      mediaFrameType = "largeMediaFrame";
    }

    // We create these elements here because `darkSmallInfoBlockMedia` and 
    // `darkSmallInfoBlockText` do not exist.
    var mediaBlockType = rootBlockType + "Media";
    var textBlockType = rootBlockType + "Text";

    if (this.dark) {
      rootBlockType = "dark" + rootBlockType[0].toUpperCase() + 
        rootBlockType.substr(1, rootBlockType.length);
      textColorStyle = "color: rgba(240,240,240,1);"
    }
    if (this.link) {
      mediaHref = this.link;
      mediaImageType = "eventImage";
    }
    if (mediaAltText == "") {
      // Attempt to auto generate a useful alt text using the image name if
      // no alt is given.
      if (this.image.length > 0 && this.image[0] == "/") {
        mediaAltText = this._linkToText(this.image);
      } else {
        mediaAltText = "Image not found";
      }
    }
    if (this.imageWidth != "") {
      mediaImageStyle += `width: ${this.imageWidth}`;
    }

    var cardRoot = document.createElement("div");
    cardRoot.id = rootBlockType;  // TODO: Change to class.
    cardRoot.style = rootBlockStyle;

    // Add the large header if it exitsts.
    if (this.largeHeader !== "") {
      var largeHeaderElement = document.createElement("h1");
      largeHeaderElement.classList.add("subTitle");
      largeHeaderElement.innerHTML = this.largeHeader;
      cardRoot.appendChild(largeHeaderElement);
    }

    var cardBlock = document.createElement("div");
    cardBlock.id = contentsType;  // TODO: Change to class.

    // Create media section.
    var mediaBlock = document.createElement("div");
    var mediaFrame = document.createElement("div");
    var mediaLink = document.createElement("a");
    mediaBlock.id = mediaBlockType;  // TODO: Change to class.
    mediaFrame.id = mediaFrameType;  // TODO: Change to class.
    if (mediaHref != "") {
      mediaLink.href = mediaHref;
    }

    // Defualt create a video in case of conflict.
    if (this.video != "") {
      var mediaVideo = document.createElement("iframe");
      mediaVideo.id = "normalVideoPlayer";
      mediaVideo.width = "560";
      mediaVideo.height = "315";
      mediaVideo.src = this.video;
      mediaVideo.frameBorder = "0";
      mediaVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      mediaVideo.allowFullscreen = true;
      mediaFrame.appendChild(mediaVideo);
    } else {
      var mediaImage = document.createElement("img");
      mediaImage.src = this.image;
      mediaImage.id = mediaImageType;  // TODO: Change to class.
      mediaImage.alt = mediaAltText;
      mediaImage.style = mediaImageStyle;
      mediaLink.appendChild(mediaImage);
      mediaFrame.appendChild(mediaLink);
    }
    mediaBlock.appendChild(mediaFrame);
    if (this.buttonText) {
      var mediaButton = document.createElement("button");
      mediaButton.id = buttonType;  // TODO: Change to class.
      mediaButton.innerHTML = this.buttonText;
      var mediaLinkCopy = mediaLink.cloneNode();
      mediaLinkCopy.appendChild(mediaButton);
      mediaBlock.appendChild(mediaLinkCopy);
    }

    cardBlock.appendChild(mediaBlock);


    // Create text section.
    var textBlock = document.createElement("div");
    var headerBlock = document.createElement("div");
    var paragraphText = document.createElement("p");
    textBlock.id = textBlockType  // TODO: Change to class.
    headerBlock.classList.add("subSubTitle");
    headerBlock.style = "margin-bottom: 15px; " + textColorStyle;
    headerBlock.innerHTML = this.header;
    textBlock.appendChild(headerBlock);
    if (this.subHeader) {
      var subHeaderBlock = document.createElement("p");
      var subHeaderText = document.createElement("b");
      var br = document.createElement("br")
      subHeaderBlock.classList.add("paragraphGradHeader");
      subHeaderText.innerHTML = this.subHeader;
      subHeaderBlock.appendChild(subHeaderText);
      subHeaderBlock.appendChild(br);
      textBlock.appendChild(subHeaderBlock);
    }
    paragraphText.style = textColorStyle;
    paragraphText.classList.add("paragraph");
    paragraphText.innerHTML = this.paragraph;
    textBlock.appendChild(paragraphText);
    cardBlock.appendChild(textBlock);
    cardRoot.appendChild(cardBlock);
    
    return cardRoot;
  }
}

// Defined cards. /////////////////////////////////////////////////////////////

// Featured.
var museAmassadorCard = new Card({
  header: "Muse Ambassador",
  paragraph: `Are you interested in picking up a new brain-computer interface? Are you interested in helping NAT further our goal of making brain-computer interfacing technology accessible to everyone? Why not both!? We're excited to announce that we now have an official affiliate link with muse! Every headset bought using this link both gets you a new piece of hardware and funds a donation to NAT, at no extra cost to you!`,
  image: "/images/event/muse-ambassador.jpg",
  buttonText: "Shop Now",
  link: "https://mbsy.co/3qhP3N",
});

var ntxOpenComp20Card = new Card({
  header: "Last Project: NTX Open Competition 2020",
  paragraph: `A drone controlled entirely by your brain waves! Not only is this an incredibly fun project, but this is also a potentially incredibly powerful creation. In reality, over the past few months, we have built a general purpose BCI controller that can be connected to whatever we want! We chose to connect it to a drone to show it's power in an entertaining way, though, this can be connected to anything from games to wheelchairs to rudamentary speech tools to allow for a new method of control that enables people to meaningfully interact with the world, regardless of motor ability. Tap on "View Project" to learn more!`,
  video: "https://www.youtube.com/embed/-3UTwKpKpcI",
  buttonText: "View Project",
  link: "project/drone.html",
  large: true,
});


// Projects.
var koalacademyCard = new Card({
  largeHeader: "Koalacademy",
  header: "BCI-Optimized Language Learning",
  paragraph: `We are currently developing an open access web platform that uses electroencephalography, cloud cloud computing, modern web development, and machine learning in order to increase learning efficiency for the Mandarin language!`,
  image: "/images/ProjectPhotos/koalacademy/equate.png",
  buttonText: "View Project",
  link: "/project/koalacademy.html",
  large: true,
});

var bermudaCard = new Card({
  largeHeader: "Bermuda",
  header: "Brain, Body, and Eye Tracking",
  paragraph: `We are developing a suite of hardware and software solutions that allows for the reliable, repeatable, and time sycnhronized acquisition of electroencaphalography, eye tracking, and body tracaking data (several orders of magnitude cheaper than current solutions).`,
  image: "/images/ProjectPhotos/bermuda/main.jpg",
  buttonText: "View Project",
  link: "/project/bermuda.html",
  large: true,
});

var openStrokeRehabCard = new Card({
  largeHeader: "Open Stroke Rehab",
  header: "Acessable Multi-modal Stroke Rehab",
  paragraph: `This team is developing an open software/hardware stack incorporating electroencephalogram (EEG), transcranial direct current stimulation (tDCS), and transcutaneous electrical nerve stimulation (TENS) for the purpose of providing an accessible treatment and research platform.`,
  image: "/images/ProjectPhotos/osr/main.png",
  buttonText: "View Project",
  link: "/project/osr.html",
  large: true,
});

var brainDroneCard = new Card({
  largeHeader: "Brain Drone",
  header: "NTX Open Competition 2020",
  paragraph: `A drone controlled entirely by your brain waves!
    <br><br>
    Not only was this an incredibly fun project, but it represents a potential for an incredibly powerful creation. Essentially, we have built a general purpose BCI controller that can be connected to whatever we want!`,
  image: "/images/ProjectPhotos/BrainDroneThumbnail.jpg",
  buttonText: "View Project",
  link: "/project/drone.html",
  large: true,
});

var rembraindtCard = new Card({
  largeHeader: "RemBRAINdt",
  header: "Russian NeuroTech Cup 2020",
  paragraph: `Despite the reality of COVID-19, in just a few summer months we remotely developed and submitted an art-generating BCI program (utilizing our new 16-channel OpenBCI) to the Russia-hosted <a href="https://neurotechcup.com/en" id="uncoloredLink">Neurotech Cup 2020</a> and secured a position as finalists! On October 10th, 2020 we were awarded a <a href="https://neurotechcup.com/winners2020" id="uncoloredLink">People’s Choice Award!</a>
    <br><br>
    Several original team members went on compete in <a href="https://neuro-nexus.ca/" id="uncoloredLink">NeuroNexus 2020</a> a provincial neurotechnology design competition, going on to win 1st place in the entrepreneurial stream along with $20,000
    <br><br>
    Now a spin-off company, RemBRAINdt continues to flourish with an official Beta launch to the public, scheduled for September 2021. You can keep up-to-date with the team on their LinkedIn<a href="https://www.linkedin.com/company/70542469/" id="uncoloredLink"> here</a>.
    <br><br>
    <span style="font-weight: 700;">Media Coverage:</span>
    <div id="mediaGrid">
      <div class="mediaLogo">
        <a href="https://edmonton.ctvnews.ca/this-university-of-alberta-helmet-can-turn-your-thoughts-into-art-1.5266220" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/CTV_flat_logo.svg">
        </a>
      </div>

      <div class="mediaLogo">
        <a href="https://www.ualberta.ca/science/news/2021/january/neurotech-student-group.html" target="_blank">
          <img src="./images/Logos/MediaLogos/UAlberta.png"></a>
        
      </div>

      <div class="mediaLogo">
        <a href="https://dailyhive.com/edmonton/canadian-students-rembraindt-thoughts-abstract-art" target="_blank">
          <img src="/images/Logos/MediaLogos/dailyhive.png"></a>
        
      </div>
    </div>`,
  image: "/images/FullSizeHeaderImages/RemBRAINdt.jpg",
  buttonText: "View Project",
  link: "/project/RemBRAINdt.html",
  large: true,
});

var alphaBlasterCard = new Card({
  largeHeader: "AlphaBlaster",
  header: "NTX Open Competition 2019",
  paragraph: `Alpha Blaster is a proof of concept 2D tower defense game controlled entirely by your brain activity. Our game recieved a 5th place award in NeuroTechX's Open Competition 2019!
    <br><br>
    <span style="font-weight: 700;">Media Coverage:</span>
    <div id="mediaGrid">
      <div class="mediaLogo">
        <a href="https://www.cbc.ca/news/canada/edmonton/u-of-a-students-create-video-game-uses-brain-controller-1.5263352" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CBC_Logo_1992-Present.svg/1024px-CBC_Logo_1992-Present.svg.png">
        </a>
      </div>

      <div class="mediaLogo">
        <a href="https://edmonton.ctvnews.ca/brain-controlled-video-game-aims-to-improve-accessibility-for-players-1.4567521?cache=yes%3FclipId%3D89531%3FautoPlay%3Dtrue%3FautoPlay%3Dtrue%3FautoPlay%3Dtrue%3Fot%3DAjaxLayout%3FautoPlay%3Dtrue%3FautoPlay%3Dtrue%3FautoPlay%3Dtrue%3Fot%3DAjaxLayout%3Fot%3DAjaxLayout%3FautoPlay%3Dtrue%3Fot%3DAjaxLayout%3FautoPlay%3Dtrue%3FautoPlay%3Dtrue" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/CTV_flat_logo.svg">
        </a>
      </div>

      <div class="mediaLogo">
        <a href="https://edmontonjournal.com/news/local-news/u-of-a-students-create-mind-controlled-video-game/" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Edmonton_Journal_%282020-01-15%29.svg/1200px-Edmonton_Journal_%282020-01-15%29.svg.png">
        </a>
      </div>


      <div class="mediaLogo">
        <a href="https://www.thestar.com/calgary/2019/08/29/some-alberta-university-students-have-created-a-mind-controlled-video-game-and-the-technology-could-have-real-world-applications.html" target="_blank">
          <img src="https://lh3.googleusercontent.com/rNE-n57GBBDjcxbLwY2ouar-aM_ufghjPmpFp5xyEMyhRPxblYXZ0Nx12Z79LIYniGySiB4fo8hr96bJGwqa8kVqT36qLC6m_8pijVx-M6VnoP3oj7xVytWtS6nBfznnh0tZQiaWxQ=w2400">
        </a>
      </div>


      <div class="mediaLogo">
        <a href="https://www.facebook.com/CityNewsYEG/videos/2097476683892344/" target="_blank">
          <img src="https://lh3.googleusercontent.com/CHVewaOa751dAQnzsPp7KLIaBkRvkuorfJaw0oo7S8X1fqMkDyefiJ2-rwQ3Ux6np5gKde7hvB3QjOhoCcxWOJXx-urQAiSUlhyAljiWcKbZyh0bt-MoxShPaR6ZJlTXV5mFwVfqOA=w2400">
        </a>
      </div>

      <div class="mediaLogo">
        <a href="https://novo.press/university-students-create-first-mind-controlled-video-game-using-neurotechnology/" target="_blank">
          <img src="https://novo.press/wp-content/uploads/2017/08/NOVO-logo-1.png"></a>
        
      </div>

      <div class="mediaLogo">
        <a href="https://www.ualberta.ca/science/news/2019/august/neurotechnology-video-game.html" target="_blank">
          <img src="./images/Logos/MediaLogos/UAlberta.png"></a>
        
      </div>

      <div class="mediaLogo">
        <a href="https://www.innovatechnews.com/2019/09/17/university-students-create-the-first-brain-controlled-video-game/" target="_blank">
          <img src="../images/Logos/MediaLogos/innovatech.png"></a>
        
      </div>
    </div>`,
  image: "/images/ProjectPhotos/AlphaBlasterScreencap.jpg",
  buttonText: "View Project",
  link: "/project/alphaBlaster.html",
  large: true,
});


// Hardware
var muse2HardwareCard = new Card({
  header: "Muse",
  paragraph: `<b>EEG Headset</b>
  <br>
  The Muse 2 headband is a popular commercial EEG, used to track the brain’s electrical activity, usually during meditation. We have access to several Muses, which are portable, accessible, and relatively easy to work with, perfect for starter neurotech projects.`,
  image: "/images/hardware/muse2.jpg",
  buttonText: "Muse 2",
  link: "https://mbsy.co/3qhP3N",
  dark: true,
});

var museSHardwareCard = new Card({
  header: "Muse",
  paragraph: `<b>EEG Headset</b>
  <br>
  The Muse S headband is a popular commercial EEG, used to track the brain’s electrical activity, usually during sleep. We have access to several Muses, which are portable, accessible, and relatively easy to work with, perfect for starter neurotech projects. Compared to ther Muse 2, the Muse S a more advanced and powerful version used primarily for sleep related studies.`,
  image: "/images/hardware/muses.jpg",
  buttonText: "Muse S",
  link: "https://mbsy.co/3qhP3N",
  dark: true,
});

var blueberryHardwareCard = new Card({
  header: "Blueberry",
  paragraph: `<b>fNIRS Eyeglassses</b>
  <br>
  Blueberry eyeglasses are used to track the concentration of blood oxygenation in the brain, allowing users to monitor their level of focus. The glasses are NAT’s first non-EEG neurotech, and we look forward to applying them in an attention-related project.`,
  image: "/images/hardware/blueberry.jpg",
  buttonText: "Eyeglasses",
  link: "https://blueberryx.com/",
  dark: true,
});

var upsideDownLabsHardwareCard = new Card({
  header: "Upside Down Labs",
  paragraph: `<b>DIY BCI Hardware</b>
  <br>
  This is a small single chip Bio-potential amplifier for recording any Bio-potential signal non-invasively. This piece of hardware can be used in conjunction with all sorts of bio sensors to achieve anything that you can think of! The sky is the limit!`,
  image: "/images/hardware/bioamp.jpg",
  buttonText: "BioAmp v1.5",
  link: "https://github.com/upsidedownlabs/BioAmp-v1.5",
  dark: true,
});

var openBCIHardwareCard = new Card({
  header: "OpenBCI",
  paragraph: `<b>EEG Headset</b>
  <br>
  OpenBCI headsets are among the most powerful and effective commercially available EEGs. With 16 channels, compared to the 4 found in the Muse, the tech allows us to access a more detailed view of brain activity. NAT now has two Ultracortex Mark IV Headsets, which have been used in both the Brain Drone and RemBraindt projects.`,
  image: "/images/hardware/openbci.jpg",
  buttonText: "Mark IV",
  link: "https://shop.openbci.com/collections/frontpage/products/ultracortex-mark-iv",
  dark: true,
});

var HTCViveHardwareCard = new Card({
  header: "HTC Vive",
  paragraph: `<b>Eye Tracking VR Headset</b>
  <br>
  We recently bought a VIVE Pro Eye virtual reality headset, with precise eye-tracking built into the hardware. Potential projects include developing neurofeedback protocols involving eye movement.`,
  image: "/images/hardware/vive.jpg",
  buttonText: "VIVE Pro Eye",
  link: "https://www.vive.com/eu/product/vive-pro-eye/overview/",
  dark: true,
});


// Sponsors
var campusAlbertaNeuroscienceSponsorCard = new Card({
  header: "Campus Alberta Neuroscience",
  paragraph: `Campus Alberta Neuroscience is delighted to be a gold level sponsor for NAT Chat, hosted by NeurAlbertaTech and recognizes the significant impact this event brings to the neurotech industry and ecosystem in Alberta. CAN has a keen focus on providing opportunities for entrepreneurs working in Neuroscience and Mental Health across Alberta, with a particular interest in the development of the commercialization ecosystem, including supporting the development of new companies, supporting education and knowledge of entrepreneurship as well as securing new investment in the province.
  <br><br>
  CAN is a provincial organization committed to promoting and increasing the impact and outcomes of Alberta-wide collaborative research, education, translation and innovation initiatives in neuroscience and mental health.`,
  image: "/images/Logos/PartnerLogos/CAN.png",
  buttonText: "albertaneuro.ca",
  link: "https://www.albertaneuro.ca",
  dark: true,
});

var openBCISponsorCard = new Card({
  header: "OpenBCI",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/openBCI.png",
  buttonText: "openbci.com",
  link: "https://openbci.com",
  dark: true,
});

var blueberrySponsorCard = new Card({
  header: "Blueberry",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/blueberry.png",
  buttonText: "blueberryx.com",
  link: "https://blueberryx.com",
  imageWidth: "100px",
  dark: true,
});

var studentInnovationCentreSponsorCard = new Card({
  header: "Student Innovation Centre",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/SIC.png",
  buttonText: "Website",
  link: "https://www.ualberta.ca/student-innovation-centre/index.html",
  dark: true,
});

var neuroscienceAndMentalHealthInstituteSponsorCard = new Card({
  header: "NMHI",
  paragraph: `At the Neuroscience and Mental Health Institute, we are training the next generation of researchers who will find solutions and improve the lives of those affected by neurological and mental health diseases and disorders. We support NeurAlbertaTech as it promotes innovation and education in the neurotechnology space.`,
  image: "/images/Logos/PartnerLogos/NMHI.png",
  buttonText: "Website",
  link: "https://www.ualberta.ca/neuroscience-and-mental-health-institute/index.html",
  dark: true,
})

var neuroTechXSponsorCard = new Card({
  header: "NeuroTechX",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/NTX.png",
  buttonText: "neurotechx.com",
  link: "https://neurotechx.com",
  dark: true,
});

var museSponsorCard = new Card({
  header: "Muse",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/muse.png",
  buttonText: "choosemuse.com",
  link: "https://choosemuse.com",
  dark: true,
});

var undergraduateResearchInitiativeSponsorCard = new Card({
  header: "Undergraduate Research Initiative",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/uri.png",
  buttonText: "Website",
  link: "https://www.ualberta.ca/current-students/undergraduate-research-initiative/index.html",
  imageWidth: "150px",
  dark: true,
});

var eightBitCortexSponsorCard = new Card({
  header: "8 Bit Cortex",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/8bit.png",
  buttonText: "8bitcortex.com",
  link: "https://8bitcortex.com/main_nav/home/",
  imageWidth: "100px",
  dark: true,
});

var neuroNexusSponsorCard = new Card({
  header: "Neuro Nexus",
  paragraph: "Visit our website to learn more!",
  image: "/images/Logos/PartnerLogos/neuronexus.png",
  buttonText: "neuro-nexus.ca",
  link: "https://neuro-nexus.ca",
  imageWidth: "200px",
  dark: true,
});


// Events.
var womenInNeuroCard = new Card({
  header: "NATChat: Women in Neurotech",
  subHeader: "RSVPs for natChat Fa21 are now open!",
  paragraph: `A <b>FREE</b> virtual chat session hosted by NeurAlbertaTech. We invite guest speakers to talk about important topics in neuroscience, tech, and the neurotech industry. At this event you will have the chance to win some exclusive NAT swag and more importantly, you will have the chance to build your network and expand your professional reach.`,
  image: "/images/event/natChat/natChatLogo.png",
  buttonText: "Learn More",
  link: "/event/natchat.html",
  location: "natFlat (CCIS L1)",
  startDate: new Date("October 27, 2021 17:00"),
  endDate: new Date("October 27, 2021 19:00"),
  dark: true,
  featured: true,
});

var workshopSeriesCard = new Card({
  header: "Workshop Series",
  paragraph: `If you want to learn about the stuff we do in a fun, interactive, low-stress environment, this is the event for you! We currently offer four unique 10-session workshop streams (Hardware, Software, Machine Learning, and Neuroscience) that serve as an introduction to each of the key pilars of brain computer interfacing programs.`,
  image: "/images/workshop/mlLogo.png",
  buttonText: "Learn More",
  link: "event/workshops.html",
  dark: true,
});

var natHacksCard = new Card({
  header: "natHACKS",
  paragraph: `Alberta’s inaugural brain-computer interface hackathon. This is a completely remote hackathon with thousands of dollars in prizes available! natHACKS will be an event like no other, inspiring beginners to develop practical neurotech skills and challenging competent hackers to apply themselves in this growing and exciting field. Spanning two weeks and culminating in a 64-hour hackathon weekend, the event will combine workshops, challenges, and networking opportunities for anyone interested in neurotechnology. With three different streams and separate judging criteria based on experience level, we’re thrilled to allow neurotech enthusiasts to get their hands dirty in a diverse selection of projects.
  <br><br>
  Begins: <b>July 30th 5:00PM MDT</b><br>
  Ends: <b>August 2nd 10:00AM MDT</b>`,
  image: "/images/event/natHACKs/nathanGlow.png",
  dark: true,
});

var superNaturalCard = new Card({
  header: "SuperNATural Activities",
  paragraph: `Drop by the natFlat any time during our office hours the week before Halloween for some superNATural trick-or-treats! (costume optional) Check out the spookified flat while picking up some candy and merch. You can find directions to the flat and the hours that we'll be there on our natFlat page!
  <br><br>
  Happy Halloween everyone!
  <br><br>
  <b>When:</b> Monday, October 25th - Friday, October 29th
  <br><br>
  <b>Where:</b> <a href="/natflat" id="uncoloredLink">natFlat</a>`,
  image: "/images/Logos/misc/spook.png",
  buttonText: "natFlat",
  link: "/natflat",
  startDate: new Date("October 25, 2021"),
  endDate: new Date("October 29, 2021"),
  featured: true,
});

var startupWeekCard = new Card({
  header: "Edmonton Startup Week",
  paragraph: `We will start with a quick introduction to the NPO, NeurAlbertaTech, with a recap of projects we have supported since our founding in February of 2019.<br><br>
  Then we will dive deep into the specifics of one of our current projects, "Koalacademy" (submission to the Russian Neurotech Cup 2021), and how we are scientifically validating a Brain Computer Interface-accelerated language learning platform through traditional academic research avenues at the University of Alberta.<br><br>
  <b>When:</b> Friday October 21st, 2021, 16:00-16:30 MT<br><br>
  <b>Where:</b> Virtual!`,
  image: "/images/InfoNight/natStartupWeek21.png",
  buttonText: "RSVP",
  link: "https://emamo.com/event/techstars-edmonton-startup-week",
  startDate: new Date("October 21, 2021, 16:00"),
  endDate: new Date("October 21, 2021, 16:30"),
  featured: true,
});

var fa21InfoNightCard = new Card({
  header: "Fa21 Info Night",
  paragraph: `We are a super beginner friendly club open to any and all skill levels (even if you have never touched CS or Neuroscience!) Come out to Info Night to see how you can get involved!
  <br><br>
  Come out and learn about all the diverse programs that NeurAlbertaTech has to offer, a representative from NeurAlbertaTech Neurotechnologies Ltd. (NATnl) will be in attendance.
  <br><br>
  Double vaccination + masking is required for all attendees, no exceptions.
  <br><br>
  <b>When:</b> Monday, September 13th, 6:00pm-8:00pm MT
  <br><br>
  <b>Where:</b> CCIS 1-160`,
  image: "/images/InfoNight/INBlue.jpg",
  startDate: new Date("September 13, 2021 18:00"),
  endDate: new Date("September 13, 2021 20:00"),
});

var musingAboutHardwareCard = new Card({
  header: "MUSEing About Hardware",
  paragraph: `Are you wondering how to go about collecting real brain data? Muse® by Interaxon Inc. headbands are perfect for starter neurotech projects as they are an accessible means of gathering EEG (electroencephalography) data. MUSEing About Hardware will include an introduction to the Muse S headband, a walk-through of working with data gathered by the Muse, and networking with like-minded neurotech innovators!
  <br><br>
  <b>June 23rd, 2021 17:00-19:00 MT</b>`,
  image: "/images/event/museEvent.jpeg",
  startDate: new Date("June 23, 2021 17:00"),
  endDate: new Date("June 23, 2021 19:00"),
});

var natFlowCard = new Card({
  header: "NAT + Flow Neuroscience Event",
  paragraph: `Join NeurAlbertaTech and Flow Neuroscience for some insight into an emerging neurotechnology startup! Submit your questions ahead of time, then join us for a live discussion with Flow’s founders, Erik and Daniel. Stay afterwards for the chance to chat with the founders yourself.
  <br><br>
  <b>June 1st, 11:00am-12:15pm MT</b>`,
  image: "/images/event/FlowNAT.png",
  startDate: new Date("June 1, 2021 11:00"),
  endDate: new Date("June 1, 2021 12:15"),
});

var wi21InfoNightCard = new Card({
  header: "Wi21 Info Night",
  paragraph: `Learn about what NeurAlbertaTech does and how you can get involved! We will have presentations on our past projects as well as details on all the exciting things we are doing in the near future. This is the perfect opportunity for you if you are interested in neurotechnology but don't know where to start, or if you are looking for a group where you can put your skills to use!
  <br><br>
  <b>When:</b> January 18th, 2021 17:00-19:00 MDT
  <br><br>
  <b>Where:</b> Zoom`,
  image: "/images/InfoNight/INPurple.jpg",
  startDate: new Date("January 18, 2021 17:00"),
  endDate: new Date("January 18, 2021 19:00"),
});

var wi21ClubsFairCard = new Card({
  header: "Wi21 Clubs Fair",
  paragraph: `Join us during virtual clubs fair to learn about the stuff we do and for some opportunities to get involved with the club!
  <br><br>
  <b>When:</b> January 4th-6th, 2021 10:00-16:00 MDT each day
  <br><br>
  <b>Where:</b> Zoom`,
  image: "/images/InfoNight/CFPink.jpg",
  startDate: new Date("January 4, 2021 10:00"),
  endDate: new Date("January 6, 2021 16:00"),
});

var startupWeek2020Card = new Card({
  header: "Edmonton Startup Week",
  paragraph: `We start with a quick introduction to the group and a recap of our submissions to international neurotechnology competitions since our founding in February of 2019. Then we dive deep into the specifics of our current "RemBRAINdt" project (Finalists for the Russian Neurotech Cup 2020) and how we are leveraging this project as our group's first foray into entrepreneurship developing a highly customizable and easy-to-use interface for real-time generation of visual art from live brain signals, for use in private and public events. On October 10th, we won a People's Choice Award at NeuroTech Cup 2020 at the BCI Samara Conference in Russia!
  <br><br>
  <b>When:</b> Friday October 23, 2020 11:30am - 12:00pm MDT
  <br><br>
  <b>Where:</b> Virtual!`,
  image: "/images/InfoNight/NAT_Startup_Week.jpg",
  startDate: new Date("October 23, 2020 11:30"),
  endDate: new Date("October 23, 2020 12:00"),
});

var fa20InfoNightCard = new Card({
  header: "Fa20 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, September 7th 4pm-6pm
  <br><br>
  <b>Where:</b> Virtual, on Google Meet! Link is shared once you RSVP!`,
  image: "/images/InfoNight/INPink.jpg",
  startDate: new Date("September 7, 16:00"),
  endDate: new Date("September 7, 18:00"),
});

var fa20ClubsFairCard = new Card({
  header: "Fa20 Clubs Fair",
  paragraph: `Visit our online chat in this year's all new virtual clubs fair to learn about what we do at NeurAlbertaTech and to learn what you can do to help push the bleeding edge of neurotech! We will be hosting a live demo of a project the team has worked on from 2pm-3pm MDT on Thursday and 3pm-4pm MDT on Friday, so make sure you don't miss that!
  <br><br>
  <b>When:</b> Monday, August 31 - Friday September 4th, 10am - 4pm each day
  <br><br>
  <b>Where:</b> Virtual Clubs Fair`,
  image: "/images/InfoNight/CFPastel.jpg",
  startDate: new Date("August 31, 2020 10:00"),
  endDate: new Date("September 4, 2020 16:00"),
});

var wi20InfoNightCard = new Card({
  header: "Wi20 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, January 13th, 2020 5:00pm - 7:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student Innovation Centre (Near CCIS Remedey)`,
  image: "/images/InfoNight/INMagenta.jpg",
  startDate: new Date("January 13, 2020 17:00"),
  endDate: new Date("January 13, 2020 19:00"),
});

var wi20ClubsFair = new Card({
  header: "Wi20 Clubs Fair",
  paragraph: `Come out to see our booth at UASU's Winter 20 clubs fair and talk with us about the bleeding edge of neurotech!
  <br><br>
  <b>When:</b> Monday, January 13th, 2020 10:00am - 4:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student's Union Building`,
  image: "/images/InfoNight/CFPink.jpg",
  startDate: new Date("January 13, 2020 10:00"),
  endDate: new Date("January 13, 2020 16:00"),
});

var milleniumStemWorkshopCard = new Card({
  header: "NAT Workshops Hosted by Millenium Stem Alberta",
  paragraph: `Want to learn more about BCIs and get some hands on experience with python? This is your event! Our workshops will give you all the baseline knowledge you will need to understand what a BCI is and how we use them to work on our projects!
  <br><br>
  <b>When:</b> Saturday, November 16th, 2019 9:00am - 2:30pm
  <br><br>
  <b>Where:</b> CCIS and CAB`,
  image: "https://pbs.twimg.com/profile_images/1163937356560289792/Y0iKZnQQ_400x400.jpg",
  startDate: new Date("November 16, 2019 9:00"),
  endDate: new Date("November 16, 2019 14:30"),
});

var fa19InfoNight = new Card({
  header: "Fa19 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, September 9th, 2019 5:00pm - 7:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student Innovation Centre (Near CCIS Remedey)`,
  image: "/images/InfoNight/INTeal.jpg",
  startDate: new Date("September 9, 2019 17:00"),
  endDate: new Date("September 9, 2019 19:00"),
});


var featuredCards = [
  museAmassadorCard,
];

var homePageCards = [
  ntxOpenComp20Card,
];

var currentProjectCards = [
  koalacademyCard,
  bermudaCard,
  openStrokeRehabCard,
];

var pastProjectCards = [
  brainDroneCard,
  rembraindtCard,
  alphaBlasterCard,
];

var hardwareCards = [
  muse2HardwareCard,
  museSHardwareCard,
  blueberryHardwareCard,
  upsideDownLabsHardwareCard,
  openBCIHardwareCard,
  HTCViveHardwareCard,
];

var sponsorCards = [
  campusAlbertaNeuroscienceSponsorCard,
  openBCISponsorCard,
  blueberrySponsorCard,
  studentInnovationCentreSponsorCard,
  neuroscienceAndMentalHealthInstituteSponsorCard,
  neuroTechXSponsorCard,
  museSponsorCard,
  undergraduateResearchInitiativeSponsorCard,
  eightBitCortexSponsorCard,
  neuroNexusSponsorCard,
];

var eventCards = [
  startupWeekCard,
  superNaturalCard,
  fa21InfoNightCard,
  musingAboutHardwareCard,
  natFlowCard,
  wi21InfoNightCard,
  wi21ClubsFairCard,
  startupWeek2020Card,
  fa20InfoNightCard,
  fa20ClubsFairCard,
  wi20InfoNightCard,
  wi20ClubsFair,
  milleniumStemWorkshopCard,
  fa19InfoNight,
];

var moreEventCards = [
  womenInNeuroCard,
  workshopSeriesCard,
  natHacksCard,
];

var featuredCardsElement = document.getElementById("homeFeaturedCards");
var homePageCardsElement = document.getElementById("homePageCards");
var currentProjectCardsElement = document.getElementById("currentProjectCards");
var pastProjectCardsElement = document.getElementById("pastProjectCards");
var hardwareCardsElement = document.getElementById("hardwareCards");
var sponsorCardsElement = document.getElementById("sponsorCards");
var currentEventCardsElement = document.getElementById("currentEventCards");
var pastEventCardsElement = document.getElementById("pastEventCards");
var moreEventCardsElement = document.getElementById("moreEventCards");

if (featuredCardsElement && homePageCardsElement) {  // index.html
  // Add all present and future featured event cards to the featured list,
  // then add them to the page.
  eventCards
    .concat(moreEventCards)
    .filter(card => card.isFeatured() && !card.isFinished())
    .mutate(card => card.setDark(false))
    .concat(featuredCards)
    .forEach(card => featuredCardsElement.appendChild(card.generateElement()));

  homePageCards.forEach(card => homePageCardsElement.appendChild(card.generateElement()));
} else if (currentProjectCardsElement && pastProjectCardsElement && hardwareCardsElement) {  // projects.html
  // Adds all present and future project cards to the projects page.
  currentProjectCards.forEach(card => currentProjectCardsElement.appendChild(card.generateElement()));
  pastProjectCards.forEach(card => pastProjectCardsElement.appendChild(card.generateElement()));
  hardwareCards.forEach(card => hardwareCardsElement.appendChild(card.generateElement()));

} else if (sponsorCardsElement) {  // community.html
  sponsorCards.forEach(card => sponsorCardsElement.appendChild(card.generateElement()));

} else if (currentEventCardsElement && 
           pastEventCardsElement && 
           moreEventCardsElement) {  // events.html
  // Add all of the event cards to either currentEvents or pastEvents.
  eventCards.forEach(card =>
    card.isFinished() ?
      pastEventCardsElement.appendChild(card.generateElement()) :
      currentEventCardsElement.appendChild(card.generateElement()))

  // Add all of the moreEvent cards to the moreEvents section.
  moreEventCards.forEach(card => moreEventCardsElement.appendChild(card.generateElement()));
  
}
