function isAlpha(c) {
  return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
}

function isNumeric(c) {
  return (c >= '0' && c <= '9');
}

function isAlphaNumeric(c) {
  return (isAlpha(c) || isNumeric(c));
}

function determineDisplayTier(events) {
  if (!events) {
    return sponsorshipTier.bronze;
  }
  largestTierFound = false;

  events.forEach(event => {
    if (event.getTier() == sponsorshipTier.platinum) {
      largestTierFound = true;
    }
  });
  if(largestTierFound) {return sponsorshipTier.platinum;}

  events.forEach(event => {
    if (event.getTier() == sponsorshipTier.gold) {
      largestTierFound = true;
    }
  });
  if(largestTierFound) {return sponsorshipTier.gold;}

  events.forEach(event => {
    if (event.getTier() == sponsorshipTier.silver) {
      largestTierFound = true;
    }
  });
  if(largestTierFound) {return sponsorshipTier.silver;}

  return sponsorshipTier.bronze;
}

Array.prototype.mutate = function (func) {
  this.forEach(func);
  return this;
}

const natEvent = {
  natChat: 'natChat',
  natHACKS: 'natHACKS',
  workshops: 'workshops'
};

const sponsorshipTier = {
  platinum: 'platinum',
  gold: 'gold',
  silver: 'silver',
  bronze: 'bronze',
}

const cardType = {
  sponsor: 'sponsor',
  normal: 'normal',
}

class eventSponsored {
  event = "";
  tier = "";

  constructor(args) {
    this.setEvent(args["event"]);
    this.setTier(args["tier"]);
  }

  setEvent(event) {
    if (event !== undefined) {
      this.event = event;
    }
    return this;
  }

  setTier(tier) {
    if (tier !== undefined) {
      this.tier = tier;
    }
    return this;
  }

  getEvent() {
    return this.event;
  }

  getTier() {
    return this.tier;
  }
}

class Card {
  header = "";
  subHeader = "";
  paragraph = "";
  image = "";
  colourLogo = ""; // TODO add constructor
  lightLogo = "";
  darkLogo = "";
  eventsSponsored = [];
  video = "";
  buttonText = "";
  link = "";
  location = "";
  altText = "";
  largeHeader = ""
  type = null;
  startDate = null;
  endDate = null;
  dark = false;
  large = false;
  featured = false;
  userUsingDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(args) {
    this.setHeader(args["header"]);
    this.setSubHeader(args["subHeader"]);
    this.setParagraph(args["paragraph"]);
    this.setImage(args["image"]);
    this.setVideo(args["video"]);
    this.setButtonText(args["buttonText"]);
    this.setLink(args["link"]);
    this.setLocation(args["location"]);
    this.setAltText(args["altText"]);
    this.setType(args["type"]);
    this.setStartDate(args["startDate"]);
    this.setEndDate(args["endDate"]);
    this.setDark(args["dark"]);
    this.setLarge(args["large"]);
    this.setLargeHeader(args["largeHeader"]);
    this.setFeatured(args["featured"]);
    this.setLightLogo(args["lightLogo"]);
    this.setDarkLogo(args["darkLogo"]);
    this.setEventsSponsored(args["eventsSponsored"]);
  }

  clone() {
    return new Card({
      header: this.header,
      subHeader: this.subHeader,
      paragraph: this.paragraph,
      image: this.image,
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

  setType(type) {
    if (type !== undefined) {
      this.type = type;
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

  setLightLogo(lightLogo) {
    if (lightLogo !== undefined) {
      this.lightLogo = lightLogo;
    }
    return this;
  }

  setDarkLogo(darkLogo) {
    if (darkLogo !== undefined) {
      this.darkLogo = darkLogo;
    }
    return this;
  }

  setEventsSponsored(eventsSponsored) {
    if (eventsSponsored !== undefined) {
      this.eventsSponsored = eventsSponsored;
    }
    return this;
  }

  _generatePlatinumSponsoredTagContainer() {
    var containerClass = "platinumSponsorHeroEventSponsoredTagContainer";
    var container = this.generateSponsoredTags();
    container.classList.add(containerClass);

    return container;
  }
  
  _generateSponsoredTagContainer() {
    var containerClass = "eventSponsoredTagContainer";
    var container = this.generateSponsoredTags();
    container.classList.add(containerClass);

    return container;
  }

  generateSponsoredTags() {
    //TODO link to the specific page
    var tagClass = "eventSponsoredTag";
    var rootTagImageURL = "/images/Logos/event/";
    var tooltipClass = "tooltiptext";
    var tooltipContainerClass = "tooltipContainer";

    var container = document.createElement("div");
    this.eventsSponsored.forEach(event => {
      var tooltipContainer = document.createElement("div");
      tooltipContainer.classList.add(tooltipContainerClass);

      var tooltip = document.createElement("span");
      tooltip.classList.add(tooltipClass);
      tooltip.innerHTML = "Sponsored " + event.event;

      var eventTag = document.createElement("img");
      eventTag.classList.add(tagClass);
      eventTag.src = rootTagImageURL + event.event + ".png";

      tooltipContainer.appendChild(eventTag);
      tooltipContainer.appendChild(tooltip);
      container.appendChild(tooltipContainer);
    });

    return container;
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

  _generateMediaAltText() {
    // Attempt to auto generate a useful alt text using the image name if
    // no alt is given.
    if (this.image.length > 0 && this.image[0] == "/") {
      return this._linkToText(this.image);
    } else {
      return "Image not found";
    }
  }

  generateElement() {
    // For partner card: give them an anchor tag, link to anchor from index.html
    const today = new Date();
    var rootBlockType = "smallInfoBlock";
    var rootBlockStyle = "margin-bottom: 0px";
    var contentsType = "smallInfoContents";
    var textColorStyle = "";
    var buttonType = "smallButton";
    var mediaFrameType = "smallInfoBlockMedia";
    var mediaImageType = "eventImageNoHover";
    var mediaHref = "";
    var mediaAltText = this.altText;
    var displayTier = "";

    // sponsorship card exceptions
    if(this.type == cardType.sponsor) {
      if(this.endDate < today) {
        console.warn(`No longer displaying sponsorship card for ${this.header}. The sponsorship end date has been reached.`);
        return document.createElement("div");
      }
      if(this.startDate > today) {
        console.warn(`${this.header} is not yet being displayed as their sponsorship has not yet started.`);
        return document.createElement("div");
      }

      displayTier = determineDisplayTier(this.eventsSponsored);

      if (displayTier == sponsorshipTier.platinum) {
        return this.generatePlatinumSponsorCard();
      }

      if (displayTier == sponsorshipTier.bronze) {
        return this.generateBronzeSponsorCard();
      }

      // The gold and silver cards are basically just normal cards, they don't need a special generate function.
    }

    // Do not allow link clicking for past events.
    if(this.endDate !== null && this.endDate < today) {
      this.link = "";
      this.buttonText = "";
    }

    if (this.large) {
      rootBlockType = "largeInfoBlock";
      contentsType = "largeInfoContents";
      mediaFrameType = "largeMediaFrame";
    }
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
      mediaAltText = this._generateMediaAltText();
    }

    var cardRoot = document.createElement("div");
    cardRoot.style = rootBlockStyle;
    if (this.type == cardType.sponsor && displayTier == sponsorshipTier.silver) {
      cardRoot.classList.add("silverSponsorBlock");
    } else {
      cardRoot.id = rootBlockType;  // TODO: Change to class.
    }

    // Add the large header if it exists.
    if (this.largeHeader !== "") {
      var largeHeaderElement = document.createElement("h1");
      largeHeaderElement.classList.add("subTitle");
      largeHeaderElement.innerHTML = this.largeHeader;
      cardRoot.appendChild(largeHeaderElement);
    }

    var cardBlock = document.createElement("div");
    if (this.type == cardType.sponsor && displayTier == sponsorshipTier.silver) {
      cardBlock.classList.add("silverSponsorContents");
    } else {
      cardBlock.id = contentsType;  // TODO: Change to class.
    }

    // If there are event sponsored tags to add, create the block
    var eventSponsoredTagBlock = document.createElement("div");
    if (this.eventsSponsored.length > 0) {      
      eventSponsoredTagBlock = this._generateSponsoredTagContainer();
    }

    // Create media section.
    var mediaBlock = document.createElement("div");
    var mediaFrame = document.createElement("div");
    var mediaLink = document.createElement("a");
    mediaBlock.id = rootBlockType + "Media";  // TODO: Change to class.
    mediaFrame.id = mediaFrameType;  // TODO: Change to class.
    if (mediaHref != "") {
      mediaLink.href = mediaHref;
    }

    // <iframe id="normalVideoPlayer" width="560" height="315" src="https://www.youtube.com/embed/-3UTwKpKpcI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    // Default create a video in case of conflict.
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
      if (this.type == cardType.sponsor) {
        if(this.userUsingDarkMode) {
          mediaImage.src = this.lightLogo;
        } else {
          mediaImage.src = this.darkLogo;
        }
      } else {
        mediaImage.src = this.image;
      }
      mediaImage.id = mediaImageType;  // TODO: Change to class.
      mediaImage.alt = mediaAltText;
      mediaLink.appendChild(mediaImage);
      mediaFrame.appendChild(mediaLink);
    }
    mediaBlock.appendChild(mediaFrame);
    mediaBlock.appendChild(eventSponsoredTagBlock);
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
    textBlock.id = rootBlockType + "Text"  // TODO: Change to class.
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
    if(this.type == cardType.sponsor && this.paragraph == "") {
      paragraphText.innerHTML = "Visit our website to learn more!";
    }
    textBlock.appendChild(paragraphText);
    cardBlock.appendChild(textBlock);
    cardRoot.appendChild(cardBlock);

    return cardRoot;
  }

  generatePlatinumSponsorCard() {
    var rootBlockType = "platinumSponsorBlock";
    var heroImageClass = "platinumSponsorHeroImg";
    var heroLogoClass = "platinumSponsorHeroLogo";
    var heroContainerClass = "platinumSponsorHeroImageContainer";
    var infoContainerClass = "platinumSponsorInfoContainer";
    var titleClass = "subSubTitle";
    var titleStyle = "margin-bottom: 10px; text-align: center";
    var textClass = "paragraph";
    var textStyle = "margin-bottom: 0px; text-align: center";
    var buttonClass = "smallButtonCentringContainer";
    var buttonType = "smallButton";

    var cardRoot = document.createElement("div");
    cardRoot.classList.add(rootBlockType);


    // hero container
    var heroContainer = document.createElement("div");
    heroContainer.classList.add(heroContainerClass);

    var heroImage = document.createElement("img");
    heroImage.classList.add(heroImageClass);
    heroImage.src = this.image;
    heroImage.alt = this._generateMediaAltText();

    var correctlyThemedLogo = this.userUsingDarkMode ? this.lightLogo : this.darkLogo;
    var heroLogo = document.createElement("img");
    heroLogo.classList.add(heroLogoClass);
    heroLogo.src = correctlyThemedLogo;
    heroLogo.alt = this._generateMediaAltText();

    heroContainer.appendChild(heroLogo);
    heroContainer.appendChild(this._generatePlatinumSponsoredTagContainer());
    heroContainer.appendChild(heroImage);


    // info container
    var infoContainer = document.createElement("div");
    infoContainer.classList.add(infoContainerClass);

    var titleContainer = document.createElement("div");
    titleContainer.classList.add(titleClass);
    titleContainer.style = titleStyle;
    titleContainer.innerHTML = this.header;

    var textContainer = document.createElement("div");
    textContainer.classList.add(textClass);
    textContainer.style = textStyle;
    textContainer.innerHTML = this.paragraph;

    var websiteButton = document.createElement("button");
    websiteButton.id = buttonType;
    websiteButton.innerHTML = this.buttonText;
    
    var buttonLink = document.createElement("a");
    buttonLink.href = this.link;
    
    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add(buttonClass);
    
    buttonLink.appendChild(websiteButton);
    buttonContainer.appendChild(buttonLink);

    infoContainer.appendChild(titleContainer);
    infoContainer.appendChild(textContainer);
    infoContainer.appendChild(buttonContainer);


    cardRoot.appendChild(heroContainer);
    cardRoot.appendChild(infoContainer);

    return cardRoot;

    // Example Card
    // <div class="platinumSponsorBlock">
    //   <div class="platinumSponsorHeroImageContainer">
    //     <img src="/images/Logos/WhiteLogos/openBCI.png" class="platinumSponsorHeroLogo">
    //     <div class="platinumSponsorHeroEventSponsoredTagContainer">
    //       Link to the card on the specific event page
    //       <img src="/images/Logos/event/workshops.png" class="eventSponsoredTag">
    //       <img src="/images/Logos/event/natHACKS.png" class="eventSponsoredTag">
    //       <img src="/images/Logos/event/natChat.png" class="eventSponsoredTag">
    //     </div>
    //     <img src="/images/openbci.jpg" class="platinumSponsorHeroImg">
    //   </div>
    //   <div class="platinumSponsorInfoContainer">
    //     <div class="subSubTitle" style="margin-bottom: 10px; text-align: center">OpenBCI</div>
    //     <p class="paragraph" style="margin-bottom: 0px; text-align: center">OpenBCI specializes in creating open-source tools for neuroscience and biosensing. OpenBCI's mission is to reduce the barrier to entry for neurotechnology by creating affordable, high-quality tools for sampling the electrical activity of the body.OpenBCI specializes in creating open-source tools for neuroscience and biosensing. OpenBCI's mission is to reduce the barrier to entry for neurotechnology by creating affordable, high-quality tools for sampling the electrical activity of the body.</p>
    //     <div class="smallButtonCentringContainer">
    //       <a href="https://example.com"><button id="smallButton">Visit the OpenBCI Website</button></a>
    //     </div>
    //   </div>
    // </div>
  }

  generateBronzeSponsorCard() {
    var cardClass = "bronzeSponsorBlock";
    var cardStyle = "width: 300px;";
    var contentsContainerClass = "smallInfoContents";
    var mediaClass = "smallInfoBlockMedia";
    var logoContainerClass = "eventImageWideFrame";
    var logoClass = "eventImageNoHoverWide";
    var titleClass = "subSubTitle";
    var titleStyle = "margin-bottom: 10px; text-align: center";
    var buttonType = "smallButton";


    var cardBlock = document.createElement("div");
    cardBlock.classList.add(cardClass);
    cardBlock.style = cardStyle;

    var contentsContainer = document.createElement("div");
    contentsContainer.id = contentsContainerClass;

    var mediaContainer = document.createElement("div");
    mediaContainer.id = mediaClass;

    var logoContainer = document.createElement("div");
    logoContainer.id = logoContainerClass;

    var correctlyThemedLogo = this.userUsingDarkMode ? this.lightLogo : this.darkLogo;
    var logo = document.createElement("img");
    logo.id = logoClass;
    logo.src = correctlyThemedLogo;
    logo.alt = this._generateMediaAltText();

    var titleContainer = document.createElement("div");
    titleContainer.classList.add(titleClass);
    titleContainer.style = titleStyle;
    titleContainer.innerHTML = this.header;

    var websiteButton = document.createElement("button");
    websiteButton.id = buttonType;
    websiteButton.innerHTML = this.buttonText;
    
    var buttonLink = document.createElement("a");
    buttonLink.href = this.link;

    
    buttonLink.appendChild(websiteButton);
    logoContainer.appendChild(logo);

    mediaContainer.appendChild(logoContainer);
    // mediaContainer.appendChild(titleContainer); // Hide title?
    mediaContainer.appendChild(this._generateSponsoredTagContainer());
    mediaContainer.appendChild(buttonLink);

    contentsContainer.appendChild(mediaContainer);
    cardBlock.appendChild(contentsContainer);

    return cardBlock;

    // Example Card
    // <div id="smallInfoBlock" style="width: 300px;">
    //   <div id="smallInfoContents" style="display: inline;">

    //     <div id="smallInfoBlockMedia">
    //       <div id="eventImageWideFrame"><image src="/images/Logos/PartnerLogos/UAIS.svg" id="eventImageNoHoverWide" alt="UAIS Logo"></image></div>
    //       <div class="subSubTitle" style="margin-bottom: 10px; text-align: center">UAIS</div>
    //       <a href="https://uais.dev"><button id=smallButton>uais.dev</button></a>
    //     </div>

    //   </div>
    // </div>
  }
}

// Defined cards. /////////////////////////////////////////////////////////////

// Featured.
// var museAmbassadorCard = new Card({
//   header: "Muse Ambassador",
//   paragraph: `Are you interested in picking up a new brain-computer interface? Are you interested in helping NAT further our goal of making brain-computer interfacing technology accessible to everyone? Why not both!? We're excited to announce that we now have an official affiliate link with muse! Every headset bought using this link both gets you a new piece of hardware and funds a donation to NAT, at no extra cost to you!`,
//   image: "/images/event/muse-ambassador.jpg",
//   buttonText: "Shop Now",
//   link: "https://mbsy.co/3qhP3N",
// });
// TEMP (FOR CHRISTMAS)

var workshopSeriesCardHome = new Card({
  header: "Workshop Series",
  paragraph: `<p class="paragraphGradHeader"><b>Now open for registration!</b></p> <br> If you want to learn about the stuff we do in a fun, interactive, low-stress environment, this is the event for you! We currently offer four unique 10-session workshop streams (Hardware, Software, Machine Learning, and Neuroscience) that serve as an introduction to each of the key pillars of brain computer interfacing programs.`,
  image: "/images/workshop/mlLogo.png",
  buttonText: "Learn More",
  link: "event/workshops.html",
  dark: false,
});

var ntxOpenComp20Card = new Card({
  header: "Last Project: NTX Open Competition 2020",
  paragraph: `A drone controlled entirely by your brain waves! Not only is this an incredibly fun project, but this is also a potentially incredibly powerful creation. In reality, over the past few months, we have built a general purpose BCI controller that can be connected to whatever we want! We chose to connect it to a drone to show it's power in an entertaining way, though, this can be connected to anything from games to wheelchairs to rudimentary speech tools to allow for a new method of control that enables people to meaningfully interact with the world, regardless of motor ability. Tap on "View Project" to learn more!`,
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
  paragraph: `We are developing a suite of hardware and software solutions that allows for the reliable, repeatable, and time synchronized acquisition of electroencephalography, eye tracking, and body tracking data (several orders of magnitude cheaper than current solutions).`,
  image: "/images/ProjectPhotos/bermuda/main.jpg",
  buttonText: "View Project",
  link: "/project/bermuda.html",
  large: true,
});

var openStrokeRehabCard = new Card({
  largeHeader: "Open Stroke Rehab",
  header: "Accessible Multi-modal Stroke Rehab",
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
  paragraph: `Despite the reality of COVID-19, in just a few summer months we remotely developed and submitted an art-generating BCI program (utilizing our new 16-channel OpenBCI) to the Russia-hosted <a href="https://neurotechcup.com/en" id="uncoloredLink">Neurotech Cup 2020</a> and secured a position as finalists! On October 10th, 2020 we were awarded a <a href="https://neurotechcup.com/winners2020" id="uncoloredLink">People's Choice Award!</a>
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
  paragraph: `Alpha Blaster is a proof of concept 2D tower defense game controlled entirely by your brain activity. Our game received a 5th place award in NeuroTechX's Open Competition 2019!
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


// Events.

var natUriCard = new Card({
  header: "NAT + URI: Summer Funding Opportunities",
  // subHeader: "RSVPs are open now!",
  paragraph: `NeurAlbertaTech and the Undergraduate Research Initiative present an interactive discussion on how you can contribute to local neurotechnology development. Learn about the project work done at NAT, how the URI is available to support summer research students with funding and resources, and (most importantly) how you can take advantage of these opportunities! Note: This is only open to Alberta-based undergraduate students.
  <br><br>
  <b>When:</b> Thursday, November 18, 17:00-18:00 MST<br>
  <b>Where:</b> Virtual - Link will be sent to those who RSVP.`,
  image: "/images/event/misc/nuri.png",
  buttonText: "RSVP",
  link: "rsvp",
  location: "Virtual - Link will be sent to those who RSVP.",
  startDate: new Date("November 18, 2021 17:00"),
  endDate: new Date("November 18, 2021 18:00"),
  featured: true,
});

var natUCInfoNightFa21 = new Card({
  header: "natUC Info Night Fa21",
  paragraph: `Are you interested in cutting-edge neuroscience and advanced technologies? Join us for a sneak peak into the exciting projects and events put on by NeurAlbertaTech! Learn about our plans for the Calgary chapter and weigh-in on the types of workshops, hands-on projects, networking events, and international competitions that you want to see here at UCalgary!
  <br><br>
  <b>When:</b> Wednesday, November 24th,18:00-19:00 MST
  <br>
  <b>Where:</b> Virtual
  `,
  image: "/images/InfoNight/ucInfoNightFa21.png",
  buttonText: "RSVP",
  link: "/rsvpnatuc",
  location: "Virtual",
  startDate: new Date("November 24, 2021 18:00"),
  endDate: new Date("November 24, 2021 19:00"),
  featured: true,
});

var natChatCard = new Card({
  header: "NATChat: Neurotech in Gaming",
  paragraph: `A <b>FREE</b> virtual chat session hosted by NeurAlbertaTech. We invite guest speakers to talk about important topics in neuroscience, tech, and the neurotech industry. At this event you will have the chance to win some exclusive NAT swag and more importantly, you will have the chance to build your network and expand your professional reach.`,
  image: "/images/event/natChat/natChatLogo.png",
  buttonText: "Learn More",
  link: "/event/natchat.html",
  location: "natFlat (CCIS L1)",
  // startDate: new Date("March 23, 2022 17:00"),
  // endDate: new Date("March 23, 2022 19:00"),
  dark: true,
  featured: true,
});

var natChatCardHome = new Card({
  header: "NATChat: Neurotech in Medicine",
  paragraph: `A <b>FREE</b> virtual chat session hosted by NeurAlbertaTech. We invite guest speakers to talk about important topics in neuroscience, tech, and the neurotech industry. At this event you will have the chance to win some exclusive NAT swag and more importantly, you will have the chance to build your network and expand your professional reach.`,
  image: "/images/event/natChat/natChatInMedicine.png",
  buttonText: "Learn More",
  link: "/event/natchat.html",
  location: "natFlat (CCIS L1)",
  // startDate: new Date("March 23, 2022 17:00"),
  // endDate: new Date("March 23, 2022 19:00"),
  dark: false,
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
  subHeader: "Registration Opening Soon",
  paragraph: `natHACKS is an event like no other, inspiring beginners to develop practical neurotech skills and challenging competent hackers to apply themselves in this growing and exciting field. Spanning two weeks and culminating in a 64-hour hackathon weekend, the event will combine workshops, challenges, and networking opportunities for anyone interested in neurotechnology. With three different streams and separate judging criteria based on experience level, we're thrilled to allow neurotech enthusiasts to get their hands dirty in a diverse selection of projects.
  <br><br>
  Begins: <b>July 29th, 2022</b><br>
  Ends: <b>August 1st, 2022</b>`,
  image: "/images/event/natHACKs/nathanGlow.png",
  buttonText: "Learn More",
  link: "event/nathack.html",
  dark: true,
});

var natHacksCardHome = new Card({
  header: "natHACKS",
  subHeader: "Registration Opening Soon",
  paragraph: `natHACKS is an event like no other, inspiring beginners to develop practical neurotech skills and challenging competent hackers to apply themselves in this growing and exciting field. Spanning two weeks and culminating in a 64-hour hackathon weekend, the event will combine workshops, challenges, and networking opportunities for anyone interested in neurotechnology. With three different streams and separate judging criteria based on experience level, we're thrilled to allow neurotech enthusiasts to get their hands dirty in a diverse selection of projects.
  <br><br>
  Begins: <b>July 29th, 2022</b><br>
  Ends: <b>August 1st, 2022</b>`,
  image: "/images/event/natHACKs/nathanGlow.png",
  buttonText: "Learn More",
  link: "event/nathack.html",
  dark: false,
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


// Sponsors //////////////////////////////////////////////////////////////////////////

// NOTE When displaying, shuffle order
var sponsorOpenBCI = new Card({
  type: cardType.sponsor,
  header: "OpenBCI",
  paragraph: `OpenBCI specializes in creating open-source tools for neuroscience and biosensing. OpenBCI's mission is to reduce the barrier to entry for neurotechnology by creating affordable, high-quality tools for sampling the electrical activity of the body. OpenBCI specializes in creating open-source tools for neuroscience and biosensing. OpenBCI's mission is to reduce the barrier to entry for neurotechnology by creating affordable, high-quality tools for sampling the electrical activity of the body.`,
  image: "/images/Logos/partnerHeroImage/openbci.jpg",
  eventsSponsored: [
    new eventSponsored({event: natEvent.natChat, tier: sponsorshipTier.bronze}),
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.platinum}),
    new eventSponsored({event: natEvent.workshops, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/openBCI.png",
  darkLogo: "/images/Logos/4to1/openBCI.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "openbci.com",
  link: "https://openbci.com",
});

var sponsorCampusAlbertaNeuroscience = new Card({
  type: cardType.sponsor,
  header: "Campus Alberta Neuroscience",
  paragraph: `Campus Alberta Neuroscience is delighted to be a gold level sponsor for natHACKs, hosted by NeurAlbertaTech and recognizes the significant impact this event brings to the neurotech industry and ecosystem in Alberta. CAN has a keen focus on providing opportunities for entrepreneurs working in Neuroscience and Mental Health across Alberta, with a particular interest in the development of the commercialization ecosystem, including supporting the development of new companies, supporting education and knowledge of entrepreneurship as well as securing new investment in the province. `,
  image: "/images/Logos/partnerHeroImage/CAN.png",
  eventsSponsored: [
    new eventSponsored({event: natEvent.natChat, tier: sponsorshipTier.bronze}),
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.platinum}),
    new eventSponsored({event: natEvent.workshops, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/CANcolor.png",
  darkLogo: "/images/Logos/4to1/CANcolor.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "albertaneuro.ca",
  link: "https://www.albertaneuro.ca/",
});

var sponsorHunterHub = new Card({
  type: cardType.sponsor,
  header: "Hunter Hub",
  paragraph: `The Hunter Hub for Entrepreneurial Thinking is the University of Calgary's central community hub that transforms lives and economies through fostering entrepreneurial thinking in students, faculty and the community. Our mission is to create and support game-changing innovators and accelerate their ideas from conception to impact.<br><br>The Hunter Hub is proud to be a sponsor of natHACKS. Alberta is home to a strong entrepreneurial community, and there is vast potential in the neurotechnology field. natHACKS will inspire both beginners and experienced hackers to discover the incredible opportunities in this field.`,
  image: "/images/Logos/partnerHeroImage/hunterHub.jpg",
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.platinum}),
  ],
  lightLogo: "/images/Logos/4to1/hunterHub.png",
  darkLogo: "/images/Logos/4to1/hunterHub.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ucalgary.ca",
  link: "https://www.ucalgary.ca/hunter-hub",
});

var sponsorAltaML = new Card({
  type: cardType.sponsor,
  header: "AltaML",
  paragraph: `AltaML is an Applied AI Studio for product innovation, guided by a purpose to elevate human potential through applied AI. We are a 2020 Deloitte Fast 50 Canada Companies-to-Watch winner, and were recognized with a 2020 Responsible AI Award by AI Global, now Responsible AI Institute. We work with organizations as an invested partner, bringing together our AI experts with their domain experts. Together, we create and deploy data-driven solutions that enable better decision making. We are a team of 120+ strong, working with partners across Canada and the U.S.`,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.gold}),
  ],
  lightLogo: "/images/Logos/4to1/altaML.png",
  darkLogo: "/images/Logos/4to1/altaMLdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "altaml.com",
  link: "https://www.altaml.com/",
});

var sponsorBranchOutNeurologicalFoundation = new Card({
  type: cardType.sponsor,
  header: "Branch Out Neurological Foundation",
  paragraph: `Branch Out funds research into complementary and alternative modalities of treating brain disorders, which we have termed NeuroCAM. We added Neurotechnology as a modality to our funding mandate in 2016 to complement our existing research funding streams of Mind and Body Modalities, Nutraceutical treatments, and Personalized Medicine. We are thrilled to be supporting the innovation involving BCI technology at NeurAlbertaTech's natHACKS event. With applications ranging from diagnostic tools and biofeedback platforms in the general population to communication aids in neurodevelopmental populations, the technology that could emerge from natHACKS would actively advance our mandate of supporting laboratory ideas to community impact.`,
  eventsSponsored: [
    new eventSponsored({event: natEvent.workshops, tier: sponsorshipTier.gold}),
    new eventSponsored({event: natEvent.natChat, tier: sponsorshipTier.gold}),
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.gold}),
  ],
  lightLogo: "/images/Logos/4to1/BONF.png",
  darkLogo: "/images/Logos/4to1/BONF.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "branchoutfoundation",
  link: "https://www.branchoutfoundation.com/",
});

var sponsorThinAirLabs = new Card({
  type: cardType.sponsor,
  header: "Thin Air Labs",
  paragraph: `Thin Air Labs is an ecosystem studio building future-fit ventures for What's Next. We ignite growth for many ventures, ecosystem partners and the innovation ecosystem itself creating massive human impact as well as investment return.<br><br>Thin Air Labs - Building What's Next.`,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.gold}),
  ],
  lightLogo: "/images/Logos/4to1/thinair.png",
  darkLogo: "/images/Logos/4to1/thinair.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "thinairlabs.ca",
  link: "https://www.thinairlabs.ca/",
});

var sponsorUAFOS = new Card({
  type: cardType.sponsor,
  header: "University of Alberta Faculty of Science",
  paragraph: `The University of Alberta's Faculty of Science is committed to supporting student innovation—and is proud to support NeurAlbertaTech's natHACKS hackathon. Student innovation can take many forms, from developing new technology to pursuing entrepreneurship. Supporting this experiential learning beyond the classroom is a key part of how we are training the next generation of talented scientists, innovators, and entrepreneurs.`,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.gold}),
  ],
  lightLogo: "/images/Logos/4to1/FoS.png",
  darkLogo: "/images/Logos/4to1/FoSdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ualberta.ca/science",
  link: "https://www.ualberta.ca/science/index.html",
});

var sponsorUpsideDownLabs = new Card({
  type: cardType.sponsor,
  header: "Upside Down Labs",
  paragraph: `Upside Down Labs is an Indian tech startup based out of New Delhi, making the technology advancement process efficient for all. Their open-source hardware and software products benefit makers, researchers, students, and learners around the world. Currently, they are working on projects related to Bio-Electronics and DIY Neuroscience.`,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natChat, tier: sponsorshipTier.gold}),
    new eventSponsored({event: natEvent.workshops, tier: sponsorshipTier.gold}),
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.gold}),
  ],
  lightLogo: "/images/Logos/4to1/UDLabs.png",
  darkLogo: "/images/Logos/4to1/UDLabsdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "upsidedownlabs.tech",
  link: "https://upsidedownlabs.tech/",
});

var sponsorBMEUC = new Card({
  type: cardType.sponsor,
  header: "University of Calgary Biomedical Engineering",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.silver}),
  ],
  lightLogo: "/images/Logos/4to1/BMEuCalgary.png",
  darkLogo: "/images/Logos/4to1/BMEuCalgarydark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ucalgary.ca/bme",
  link: "https://research.ucalgary.ca/bme/home",
});

var sponsorPreciscionHealthUA = new Card({
  type: cardType.sponsor,
  header: "University of Alberta Precision Health",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.silver}),
  ],
  lightLogo: "/images/Logos/4to1/precHealth.png",
  darkLogo: "/images/Logos/4to1/precHealthdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ualberta.ca",
  link: "https://www.ualberta.ca/precision-health/index.html",
});

var sponsorAI4S = new Card({
  type: cardType.sponsor,
  header: "Ai4 Society",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/ai4s.png",
  darkLogo: "/images/Logos/4to1/ai4s.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ai4society.ca",
  link: "https://ai4society.ca/",
});

var sponsorFORMDCD = new Card({
  type: cardType.sponsor,
  header: "Faculty of Rehabilitation Medicine",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/FORMDCD.png",
  darkLogo: "/images/Logos/4to1/FORMDCDdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ualberta.ca",
  link: "https://www.ualberta.ca/communications-sciences-and-disorders/index.html",
});

var sponsorCybera = new Card({
  type: cardType.sponsor,
  header: "Cybera",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/cybera.png",
  darkLogo: "/images/Logos/4to1/cyberadark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "cybera.ca",
  link: "https://www.cybera.ca/",
});

var sponsorMuse = new Card({
  type: cardType.sponsor,
  header: "Muse",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natChat, tier: sponsorshipTier.bronze}),
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
    new eventSponsored({event: natEvent.workshops, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/muse.png",
  darkLogo: "/images/Logos/4to1/muse.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "choosemuse.com",
  link: "https://mbsy.co/3qhP3N",
});

var sponsorRemBRAINdt = new Card({
  type: cardType.sponsor,
  header: "RemBRAINdt",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/rembraindt.png",
  darkLogo: "/images/Logos/4to1/rembraindt.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "rembraindt",
  link: "https://linktr.ee/rembraindt",
});

var sponsorRisingYouth = new Card({
  type: cardType.sponsor,
  header: "Rising Youth",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/risingYouth.png",
  darkLogo: "/images/Logos/4to1/risingYouthdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "risingyouth.ca",
  link: "https://www.risingyouth.ca/",
});

var sponsorURI = new Card({
  type: cardType.sponsor,
  header: "Undergraduate Research Initiative",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/uriColour.png",
  darkLogo: "/images/Logos/4to1/uriColour.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "ualberta.ca",
  link: "https://www.ualberta.ca/current-students/undergraduate-research-initiative/index.html",
});

var sponsorPrintMachine = new Card({
  type: cardType.sponsor,
  header: "Print Machine",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/printMachine.png",
  darkLogo: "/images/Logos/4to1/printMachinedark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "printmachine.ca",
  link: "https://printmachine.ca/",
});

var sponsorGTec = new Card({
  type: cardType.sponsor,
  header: "g.tec",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/g-tec.png",
  darkLogo: "/images/Logos/4to1/g-tecdark.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("March 16, 2023 23:59"),
  buttonText: "gtec.at",
  link: "https://www.gtec.at",
});

var sponsorUAIS = new Card({
  type: cardType.sponsor,
  header: "Undergraduate Artificial Intelligence Society",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/UAIS.png",
  darkLogo: "/images/Logos/4to1/UAIS.png",
  startDate: new Date("January 1, 2022 00:00"),
  endDate: new Date("May 1, 2022 23:59"),
  buttonText: "uais.dev",
  link: "https://uais.dev/",
});



var featuredCards = [
  natChatCardHome,
  natHacksCardHome
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

var eventCards = [
  natUriCard,
  natUCInfoNightFa21,
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
  natChatCard,
  workshopSeriesCard,
  natHacksCard,
];

var partnerCards = [
  sponsorOpenBCI,
  sponsorCampusAlbertaNeuroscience,
  sponsorHunterHub,
  sponsorAltaML,
  sponsorBranchOutNeurologicalFoundation,
  sponsorThinAirLabs,
  sponsorUAFOS,
  sponsorUpsideDownLabs,
  sponsorBMEUC,
  sponsorPreciscionHealthUA,
  sponsorAI4S,
  sponsorFORMDCD,
  sponsorCybera,
  sponsorMuse,
  sponsorRemBRAINdt,
  sponsorRisingYouth,
  sponsorURI,
  sponsorGTec
];

var featuredCardsElement = document.getElementById("homeFeaturedCards");
var homePageCardsElement = document.getElementById("homePageCards");
var currentProjectCardsElement = document.getElementById("currentProjectCards");
var pastProjectCardsElement = document.getElementById("pastProjectCards");
var currentEventCardsElement = document.getElementById("currentEventCards");
var pastEventCardsElement = document.getElementById("pastEventCards");
var moreEventCardsElement = document.getElementById("moreEventCards");

var partnerCardsPlatinum = document.getElementById("partnerCardsPlatinum");
var partnerCardsGold = document.getElementById("partnerCardsGold");
var partnerCardsSilver = document.getElementById("partnerCardsSilver");
var partnerCardsBronze = document.getElementById("partnerCardsBronze");

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
} else if (currentProjectCardsElement && pastProjectCardsElement) {  // projects.html
  // Adds all present and future project cards to the projects page.
  currentProjectCards.forEach(card => currentProjectCardsElement.appendChild(card.generateElement()));
  pastProjectCards.forEach(card => pastProjectCardsElement.appendChild(card.generateElement()));

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

} else if (partnerCardsPlatinum && partnerCardsGold && partnerCardsSilver && partnerCardsBronze) { // partners.html 
  // Randomize the order we display sponsors
  const shuffledArray = partnerCards.sort((a, b) => 0.5 - Math.random()); 
  shuffledArray
    .mutate(card => card.setDark(false))
    .forEach(card => {
      switch(this.determineDisplayTier(card.eventsSponsored)) {
        case sponsorshipTier.platinum:
          partnerCardsPlatinum.appendChild(card.generateElement());
          break;
        case sponsorshipTier.gold:
          partnerCardsGold.appendChild(card.generateElement());
          break;
        case sponsorshipTier.silver:
          partnerCardsSilver.appendChild(card.generateElement());
          break;
        case sponsorshipTier.bronze:
          partnerCardsBronze.appendChild(card.generateElement());
          break;
        default:
          console.error("Failed to generate a sponsor card. Ensure every sponsor has an event sponsored");
      }
    });
}
