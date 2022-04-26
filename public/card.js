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

Node.prototype.safeAppendChild = function (child) {
  if (child !== null && child !== undefined) {
    this.appendChild(child);
  }
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
  altText = "";
  buttonText = "";
  colourLogo = ""; // TODO add constructor
  darkLogo = "";
  header = "";
  image = "";
  largeHeader = ""
  lightLogo = "";
  link = "";
  location = "";
  paragraph = "";
  subHeader = "";
  video = "";

  eventsSponsored = [];
  subSection = [];

  backSide = null;
  endDate = null;
  startDate = null;
  type = null;

  dark = false;
  featured = false;
  hidden = false;
  large = false;
  subCard = false;
  superCard = false;
  userUsingDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(args) {
    this.setAltText(args["altText"]);
    this.setButtonText(args["buttonText"]);
    this.setColourLogo(args["colourLogo"]);
    this.setDarkLogo(args["darkLogo"]);
    this.setHeader(args["header"]);
    this.setImage(args["image"]);
    this.setLargeHeader(args["largeHeader"]);
    this.setLightLogo(args["lightLogo"]);
    this.setLink(args["link"]);
    this.setLocation(args["location"]);
    this.setParagraph(args["paragraph"]);
    this.setSubHeader(args["subHeader"]);
    this.setVideo(args["video"]);

    this.setEventsSponsored(args["eventsSponsored"]);
    this.setSubSection(args["subSection"]);

    this.setBackSide(args["backSide"]);
    this.setEndDate(args["endDate"]);
    this.setStartDate(args["startDate"]);
    this.setType(args["type"]);

    this.setDark(args["dark"]);
    this.setFeatured(args["featured"]);
    this.setHidden(args["hidden"]);
    this.setLarge(args["large"]);
    this.setSubCard(args["subCard"]);
    this.setSuperCard(args["superCard"]);
  }

  clone() {
    return new Card({
      altText: this.altText,
      buttonText: this.buttonText,
      colourLogo: this.colourLogo,
      darkLogo: this.darkLogo,
      header: this.header,
      image: this.image,
      largeHeader: this.largeHeader,
      lightLogo: this.lightLogo,
      link: this.link,
      location: this.location,
      paragraph: this.paragraph,
      subHeader: this.subHeader,
      video: this.video,

      eventsSponsored: this.eventsSponsored.map((x) => x),
      subSection: this.subSection.map((x) => x),

      backSide: this.backSide,
      endDate: this.endDate,
      startDate: this.startDate,
      type: this.type,

      dark: this.dark,
      featured: this.featured,
      hidden: this.hidden,
      large: this.large,
      subCard: this.subCard,
      superCard: this.superCard,
      userUsingDarkMode: this.userUsingDarkMode,
    });
  }

  isDark() {
    return this.dark;
  }

  isFeatured() {
    return this.featured;
  }

  isFinished() {
    return this.endDate !== undefined && this.endDate < Date.now();
  }

  isSubCard() {
    return this.subCard;
  }

  isSuperCard() {
    return this.superCard;
  }

  flip() {
    if (this.backSide !== null) {
      return this.backSide;
    } else {
      return this;
    }
  }

  setAltText(altText) {
    if (altText !== undefined) {
      this.altText = altText;
    }
    return this;
  }

  setButtonText(buttonText) {
    if (buttonText !== undefined) {
      this.buttonText = buttonText;
    }
    return this;
  }

  setColourLogo(colourLogo) {
    if (colourLogo !== undefined) {
      this.colourLogo = colourLogo;
    }
    return this;
  }

  setDarkLogo(darkLogo) {
    if (darkLogo !== undefined) {
      this.darkLogo = darkLogo;
    }
    return this;
  }

  setHeader(header) {
    if (header !== undefined) {
      this.header = header;
    }
    return this;
  }

  setImage(image) {
    if (image !== undefined) {
      this.image = image;
    }
    return this;
  }

  setLargeHeader(header) {
    if (header !== undefined) {
      this.largeHeader = header;
    }
    return this;
  }

  setLightLogo(lightLogo) {
    if (lightLogo !== undefined) {
      this.lightLogo = lightLogo;
    }
    return this;
  }

  setLink(link) {
    if (link !== undefined) {
      this.link = link;
    }
    return this;
  }

  setLocation(location) {
    if (location !== undefined) {
      this.location = location;
    }
    return this;
  }

  setParagraph(paragraph) {
    if (paragraph !== undefined) {
      this.paragraph = paragraph;
    }
    return this;
  }

  setSubHeader(subHeader) {
    if (subHeader !== undefined) {
      this.subHeader = subHeader;
    }
    return this;
  }

  setVideo(video) {
    if (video !== undefined) {
      this.video = video;
    }
    return this;
  }



  setEventsSponsored(eventsSponsored) {
    if (eventsSponsored !== undefined) {
      this.eventsSponsored = eventsSponsored;
    }
    return this;
  }

  setSubSection(section) {
    if (section !== undefined) {
      this.subSection = section;
    }
    return this;
  }



  setBackSide(backSide) {
    if (backSide !== undefined) {
      this.backSide = backSide;
      this.backSide.backSide = this;
    }
    return this;
  }

  setEndDate(date) {
    if (date !== undefined) {
      this.endDate = date;
    }
    return this;
  }

  setStartDate(date) {
    if (date !== undefined) {
      this.startDate = date;
    }
    return this;
  }

  setType(type) {
    if (type !== undefined) {
      this.type = type;
    }
    return this;
  }



  setDark(dark) {
    if (dark !== undefined) {
      this.dark = dark;
    }
    return this;
  }

  setFeatured(featured) {
    if (featured !== undefined) {
      this.featured = featured;
    }
    return this;
  }
  
  setHidden(hidden) {
    if (hidden !== undefined) {
      this.hidden = hidden;
    }
    return this;
  }

  setLarge(large) {
    if (large !== undefined) {
      this.large = large;
    }
    return this;
  }

  setSubCard(card) {
    if (card !== undefined) {
      this.subCard = card;
    }
    return this;
  }

  setSuperCard(card) {
    if (card !== undefined) {
      this.superCard = card;
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
    if (this.hidden) {
      return null;
    }

    // For partner card: give them an anchor tag, link to anchor from index.html
    const today = new Date();
    var rootBlockType = "smallInfoBlock";
    var rootBlockStyle = "margin-bottom: 0px;";
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
    if (this.isSubCard()) {
      rootBlockType += "SubSection";
      rootBlockStyle += " animation-delay: 0s;"
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
    if (this.isSuperCard()) {
      // TODO
      var textBlock = document.createElement("div");
      textBlock.id = rootBlockType + "Text"  // TODO: Change to class.
      textBlock.style = "top: 0px; " + textColorStyle;
      this.subSection.forEach((element) => textBlock.safeAppendchild(element.generateElement()));
      cardBlock.appendChild(textBlock);
    } else {
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
    }

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

var NATureWalk = new Card({
  header: "NATure Walk",
  paragraph: `Feel like you have to scream in a field after finals? Come out on our 🌲NATure walk🌲 where you can welcome the fresh spring air of the River Valley! We'll be providing a few snacks and games during the walk then end it off with a trip to our club room natFlat. Sign up via our link in bio and make sure to pack your bags like our mascot Nathan the Aardvark.
  <br><br>
  <b>When:</b> Monday, May 1st, 2022 3:00pm - 5:00pm
  <br>
  <b>Where:</b> CCIS Atrium (Near the Parking Lot)`,
  image: "/images/event/misc/natureWalk.png",
  startDate: new Date("May 1, 2022 15:00"),
  endDate: new Date("May 1, 2022 17:00"),
  link: "/rsvpua",
  buttonText: "RSVP"
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

var sponsorHotchkiss = new Card({
  type: cardType.sponsor,
  header: "Hotchkiss Brain Institute",
  paragraph: ``,
  eventsSponsored: [
    new eventSponsored({event: natEvent.natHACKS, tier: sponsorshipTier.bronze}),
  ],
  lightLogo: "/images/Logos/4to1/hotchkiss.png",
  darkLogo: "/images/Logos/4to1/hotchkiss.png",
  startDate: new Date("March 31, 2022 00:00"),
  endDate: new Date("March 31, 2023 23:59"),
  buttonText: "hbi.ucalgary.ca",
  link: "https://hbi.ucalgary.ca",
});


// NatChat /////////////////////////////////////////////////////////////////////

var upcomingNatChats = new Card({
  header: "Upcoming chats will be announced soon!",
  paragraph: `<b>More details to come!</b>
<br>We are working out details for the upcoming chats in our series! Check back here soon and we will have updated information for all upcoming chats this semester.
<br>
<br>That join button still works though. If you want to RSVP for the first ever natChat you can click that button now!`,
  image: "/images/temp.jpg",
  buttonText: "Join",
  link: "/rsvp.html",
});

var natChatRaffle = new Card({
  header: "Raffle",
  paragraph: `We will be raffling off exciting prizes throughout the chats, such as:
<br>- NAT merch baskets (shirt, pen, mask, etc.)*
<br>- NAT workshop subscription for any stream
<br>
<br>* Physical prizes will only be shipped to Canadian addresses. If you reside outside of Canada and win a physical prize, you may trade that in for a workshop subscription.`,
  image: "/images/InfoNight/merch.jpg",
  dark: true,
});

var natChatNetworking = new Card({
  header: "Networking",
  paragraph: `Building a network is important! One of the strongesst factors contributing to successful job applications is your network. If you think you want to pursue a career in neurotech, neuroscience, or tech, this is the place to build your network! We bring in as many great minds as we can find from all of the fields we are involved in, and this is your chance to meet them.`,
  image: "/images/InfoNight/network.jpg",
  dark: true,
});

var natChatSpeaker0_0 = new Card({
  header: "Keynote: Mikhail Lebedev",
  paragraph: `With over 100 publications, decades of cutting-edge research at esteemed institutions, and a multitude of coveted awards, Dr. Lebedev has investigated all levels of brain function from cellular to cortical, with a focus on somatosensory and motor cortices. He has developed bi-directional BCIs that simultaneously read brain activity and deliver sensory information. Mikhail is currently Scientific Head of the Center for Bioelectrical Interfaces, part of the Institute of Cognitive Neuroscience at HSE in Moscow.`,
  video: "https://www.youtube.com/embed/iIXZW6-0pDc",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/mikhail-lebedev-1843b210/",
  subCard: true,
  backSide: new Card({
    header: "Keynote: Mikhail Lebedev",
    paragraph: `<b>Scientific Head at National Research University — Higher School of Economics<b>
<br>Mikhail works in the fields of Neurophysiology and Brain-Computer Interfaces. He has more than 100 publications. He has a MS degree in Physics from Moscow Institute of Physics and Technology (1986) and a PhD degree in Neurobiology from the University of Tennessee, Memphis. In 1986-1991, Lebedev conducted research on motor control in Victor Gurfinkel's laboratory at the Institute for Problems of Information Transmission. In 1991-1995, during his stay in Memphis, he investigated single-unit activity in the somatosensory cortex and basal ganglia of awake, behaving primates. In 1995-1995, Lebedev conducted research at SISSA, Trieste, Italy, where he examined plasticity in rat somatosensory cortex. In 1997-2002, Lebedev worked at NIMH, Bethesda, Maryland.`,
    image: "/images/event/natChat/speakers/mikhailLebedev.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/mikhail-lebedev-1843b210/",
    subCard: true,
  }),
});

var natChatSpeaker0_1 = new Card({
  header: "Andreas Forsland",
  paragraph: `Andreas is Founder and CEO of Cognixion where he is providing the hundreds of millions of people with communication disabilities a way to express their voice. Cognixion creates natural interfaces powered by AI to facilitate and improve communication. In addition to Speakprose, a mobile app that uses gestures and eye-tracking to build sentences, the team is developing an entirely wireless BCI with integrated AR.`,
  video: "https://www.youtube.com/embed/KB_3aetw65g",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/andreasforsland/",
  subCard: true,
  backSide: new Card({
    header: "Andreas Forsland",
    paragraph: `<b>Founder and CEO of Cognixion</b>
<br>Cognixion has been internationally recognized for its innovation and use of exponential technologies to solve a social and healthcare global challenge - affecting the lives of 509 million people* affected by speech disabilities. Cognixion has won the prestigious Roddenberry Prize, the Gold Edison Award for Social Impact, the Global Elevate Award and the Singularity University Global Grand Challenge for Education for its potential to impact over a billion lives.`,
    image: "/images/event/natChat/speakers/andreasForsland.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/andreasforsland/",
    subCard: true,
  }),
});

var natChatSpeaker0_2 = new Card({
  header: "Cayden Pierce",
  paragraph: `Cayden helps people upgrade their thinking by creating wearable BCIs and is currently the BCI Lead at Blueberry. Blueberry is building BCI glasses that allow continuous brain state monitoring to help users make better work, break, and rest decisions, overall increasing productivity and satisfaction.`,
  video: "https://www.youtube.com/embed/hAZnoXJAyQ4",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/cayden-pierce-814664b9/",
  subCard: true,
  backSide: new Card({
    header: "Cayden Pierce",
    paragraph: `<b>BCI Lead at Blueberry</b>
<br>Cayden Pierce develops wearable computers and BCI to help people upgrade their thinking. He's the BCI Lead at Blueberry, building BCI glasses to help users upgrade their output by making better work, break, and rest decisions throughout the day.`,
    image: "/images/event/natChat/speakers/caydenPierce.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/cayden-pierce-814664b9/",
    subCard: true,
  }),
});

var natChatSpeaker0_3 = new Card({
  header: "Jacob Flood",
  paragraph: `Originally an engineer, Jacob transitioned towards productivity and science; author of the book Study Smart, founder of a SaaS tutoring company, and now Founder and CEO of Eno. Eno is improving focused productivity with elegant and innovative BCIs for everyday use.`,
  video: "https://www.youtube.com/embed/skqjZUr5KJU",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/jacobflood/",
  subCard: true,
  backSide: new Card({
    header: "Jacob Flood",
    paragraph: `<b>Founder and CEO of Eno</b>
<br>Visit my LinkedIn for more information!`,
    image: "/images/event/natChat/speakers/jacobFlood.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/jacobflood/",
    subCard: true,
  }),
});

var natChatSpeaker0_4 = new Card({
  header: "Joseph Artuso",
  paragraph: `Coming from a Political Science degree at Columbia University, Joseph has honed his marketing and communication skills at companies across the globe including Salesforce, AppNexus, and WPP. Joseph previously managed digital marketing for OpenBCI and now directs OpenBCI’s commercialization and communication strategies.`,
  video: "https://www.youtube.com/embed/d9I2yRyTSMc",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/jartuso/",
  subCard: true,
  backSide: new Card({
    header: "Joseph Artuso",
    paragraph: `<b>Director Of Marketing & Business Development at OpenBCI</b>
<br>Drawing on experience in sales, marketing, and consulting, Joseph is responsible for guiding OpenBCI's commercialization and communication strategies. Prior to joining OpenBCI full-time, Joseph managed OpenBCI's digital marketing as a consultant while working in the US and EMEA at market-leading companies such as Salesforce, AppNexus, and WPP. After returning from living in London, Joseph also briefly coordinated a series of innovative art and music events in NYC. He has a B.A. in Political Science from Columbia University.`,
    image: "/images/event/natChat/speakers/josephArtuso.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/jartuso/",
    subCard: true,
  }),
});

var natChatSpeaker1_0 = new Card({
  header: "Keynote: Mike Ambinder",
  paragraph: `Mike is an experimental psychologist at Valve, focusing on BCIs and has worked on many of their games such as TF2 and Portal 2.`,
  video: "https://www.youtube.com/embed/9nxCthpJccs",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/mike-ambinder-578aa89/",
  subCard: true,
  backSide: new Card({
    header: "Keynote: Mike Ambinder",
    paragraph: `<b>Principal Experimental Psychologist at Valve</b>
<br>I’m an experimental psychologist at Valve who works on applying knowledge and methodologies from psychology to game design. I do a fair bit of statistical analysis on gameplay and Steam data, and these days I’m spending time on Brain-Computer Interface research. I’ve been at Valve since 2008 and have worked on basically every game/product we’ve released since then.`,
    image: "/images/event/natChat/speakers/mikeAmbinder.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/mike-ambinder-578aa89/",
    subCard: true,
  }),
});

var natChatSpeaker1_1 = new Card({
  header: "Stefan Chmelik",
  paragraph: `Stefan is the founder and creator of BioSelf Technology. Their product Sensate uses infrasound vagal nerve stimulation to improve subjective well-being amongst consumers.`,
  video: "https://youtube.com/embed/NMQ2R9hSGz0",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/stefan-chmelik-msc-4539611a/?originalSubdomain=uk",
  subCard: true,
  backSide: new Card({
    header: "Stefan Chmelik",
    paragraph: `<b>Founder at BioSelf Technology</b>
<br>Stefan Chmelik is a life-long meditator and a driven entrepreneur fully focussed on his mission to help build a world less full of fear. He has brought together these two personal drivers in the invention of Sensate, a technology designed to help almost anyone achieve a fast-track to optimal self-regulation in the conquest of anxiety. His career is now entirely devoted to enabling the optimisation of human resilience through the work of BioSelf Technology.`,
    image: "/images/event/natChat/speakers/stefanChmelik.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/stefan-chmelik-msc-4539611a/?originalSubdomain=uk",
    subCard: true,
  }),
});

var natChatSpeaker1_2 = new Card({
  hidden: true,
  header: "Eli Kinney-Lang",
  paragraph: `Eli Kinney-Lang is a postdoc researcher at the UofC and is a part of the Pediatric BCI lab at the Alberta Children’s Hospital where he leads development of innovative BCIs for kids.`,
  video: "https://www.youtube.com/embed/T1sC6DGCWwA",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/eli-kinney-lang/?originalSubdomain=ca",
  subCard: true,
  backSide: new Card({
    header: "Eli Kinney-Lang",
    paragraph: `<b>Postdoctoral Researcher at University of Calgary</b>
<br>Experienced postdoctoral researcher focused on driving forward design, development and realization of pediatric brain-computer interfaces (BCI). Skills include biomedical signal processing, multi-way analysis, machine learning, EEG acquisition and analysis, BCI gamification and design.`,
    image: "/images/event/natChat/speakers/eliKinneylang.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/eli-kinney-lang/?originalSubdomain=ca",
    subCard: true,
  }),
});

var natChatSpeaker1_3 = new Card({
  header: "Ty McKinney",
  paragraph: `Ty is a co-founder of the mental health tech company 8-Bit Cortex where he focuses on gamifying mental health assessment.`,
  video: "https://www.youtube.com/embed/tWIuyMoG7N4",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/tytheneuroguy/",
  subCard: true,
  backSide: new Card({
    header: "Ty McKinney",
    paragraph: `<b>Co-Founder at 8 Bit Cortex</b>
<br>Ty is currently completing his PhD at the University of Utah with a research focus on brain health assessment. Ty is thrilled to be co-founder of 8 Bit Cortex, a mental health tech start up, and adapt his research expertise to creating accessible and affordable mental health services. Ty is also the Research Director for Branch Out Neurological Foundation, a non-profit that accelerates non-pharmaceutical and tech-based solutions to neurological and mental health disorders. Finally, Ty is also a consultant with ConsciousWorks to promote brain health in the workplace. Through these positions, Ty has cultivated project management, research, science communication, programming skills (In order of skill: R, Matlab, HTML, CSS, Javascript, Python), and entrepreneurial thinking with an eye for the clinical impact.`,
    image: "/images/event/natChat/speakers/tyMckinney.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/tytheneuroguy/",
    subCard: true,
  }),
});

var natChatSpeaker2_0 = new Card({
  header: "Keynote: Katherine Perdue",
  paragraph: `<b>Research Scientist at Kernel</b>
<br>With a PhD in Biomedical Engineering from Dartmouth, Katherine’s expertise is incredibly impressive. Throughout her professional career Katherine has built up extensive experience in research and neuroscience study. Now at Kernel as a research scientist, Katherine has worked on neuroimaging system characterization, optimization, configuration, and much more!`,
  video: "https://www.youtube.com/embed/MC5mtKJzGLM",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/katherine-perdue/",
  subCard: true,
  backSide: new Card({
    header: "Keynote: Katherine Perdue",
    paragraph: `<b>Research Scientist at Kernel</b>
<br>I specialize in making human brain imaging methods more robust and useful. My training is in Biomedical Engineering and Cognitive Neuroscience. I use signal processing methods and experimental expertise to get the most information from the smallest amount of brain data.`,
    image: "/images/event/natChat/speakers/katherinePerdue.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/katherine-perdue/",
    subCard: true,
  }),
});

var natChatSpeaker2_1 = new Card({
  hidden: true,
  header: "Dion Kelly",
  paragraph: `<b>PhD Candidate, Neuroscience - NATuc President</b>
<br>A PhD Candidate in Neuroscience at the University of Calgary, Dion is an aspiring Neurotechnology Professional. As a member of the Calgary Pediatric Stroke Program, Dion has put her passion and impressive wealth of knowledge to work on pediatric brain-computer interfaces.`,
  video: "https://www.youtube.com/embed/M1b-wKU7zpE",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/dionmkelly/",
  subCard: true,
  backSide: new Card({
    header: "Dion Kelly",
    paragraph: `<b>PhD Candidate, Neuroscience - NATuc President</b>
<br>I am an aspiring Neurotechnology Professional with a passion for health, life sciences research and technology, and travel. I bring a proven record of achievement in medical science education, community involvement, business development, and leadership. I have travelled to over 35 countries on six different continents and can speak three languages. With a global mindset and graduate education in the fields of neuroscience and biomedical technology, I will strive to achieve my goals of improving the world's quality of life and improving human health.`,
    image: "/images/event/natChat/speakers/dionKelly.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/dionmkelly/",
    subCard: true,
  }),
});

var natChatSpeaker2_2 = new Card({
  header: "Vivian Mushahwar",
  paragraph: `Throughout her career, Vivian has contributed an incredible amount to the medical neurotech industry, including Founding or Co-Founding several innovative companies. Vivian now sits as the Canadian Research Chair in Functional Restoration at the University of Alberta as well as serving as a Professor of Physical Medicine and Rehabilitation.`,
  video: "https://www.youtube.com/embed/4tDDMlFAt-4",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/vivian-mushahwar-1b4122133/",
  subCard: true,
  backSide: new Card({
    header: "Vivian Mushahwar",
    paragraph: `<b>Fellow at American Institute for Medical and Biological Engineering</b>
<br>I focus on developing intelligent medical devices and innovative rehabilitation interventions to improve function, health outcomes and quality of life of persons with neural injuries or diseases`,
    image: "/images/event/natChat/speakers/vivianMushahwar.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/vivian-mushahwar-1b4122133/",
    subCard: true,
  }),
});

var natChatSpeaker2_3 = new Card({
  header: "Bhawna Sehgal",
  paragraph: `<b>Co-Founder | Upside Down Labs</b>
<br>With an eye for detail and passion for design Bhawna has built up an extensive graphic design background. More recently, she Co-Founded Upside Down Labs, a technology development firm that is currently working on open-source projects in the bioelectronics and neuroscience spaces.`,
  video: "https://www.youtube.com/embed/C0XnlBvTsyk",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/bhawnasehgal99/",
  subCard: true,
  backSide: new Card({
    header: "Bhawna Sehgal",
    paragraph: `<b>Co-Founder | Upside Down Labs</b>
<br>Bhawna Sehgal is a goal-oriented Visual Designer with an eye for detail and a passion for designing. She believes in creating eye-appealing visual concepts and communicating ideas that inspire, inform and captivate people. Her love for designing and creative thinking pushes her to always keep creating something new that can excite the viewers.`,
    image: "/images/event/natChat/speakers/bhawnaSehgal.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/bhawnasehgal99/",
    subCard: true,
  }),
});

var natChatSpeaker3_0 = new Card({
  header: "Katherine Perdue",
  paragraph: `<b>Research Scientist at Kernel</b>
<br>With a PhD in Biomedical Engineering from Dartmouth, Katherine's expertise is incredibly impressive. Throughout her professional career Katherine has built up extensive experience in research and neuroscience study. Now at Kernel as a research scientist, Katherine has worked on neuroimaging system characterization, optimization, configuration, and much more!`,
  video: "https://www.youtube.com/embed/YGVdLNooM8o",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/katherine-perdue/",
  subCard: true,
  backSide: new Card({
    header: "Katherine Perdue",
    paragraph: `<b>Research Scientist at Kernel</b>
<br>I specialize in making human brain imaging methods more robust and useful. My training is in Biomedical Engineering and Cognitive Neuroscience. I use signal processing methods and experimental expertise to get the most information from the smallest amount of brain data.`,
    image: "/images/event/natChat/speakers/katherinePerdue.jpeg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/katherine-perdue/",
    subCard: true,
  }),
});

var natChatSpeaker3_1 = new Card({
  header: "Mike Ambinder",
  paragraph: `Mike is an experimental psychologist at Valve, focusing on BCIs and has worked on many of their games such as TF2 and Portal 2.`,
  video: "https://www.youtube.com/embed/REIgWT70JpQ",
  buttontext: "Linkedin",
  link: "https://www.linkedin.com/in/mike-ambinder-578aa89/",
  subCard: true,
  backSide: new Card({
    header: "Mike Ambinder",
    paragraph: `<b>Principal Experimental Psychologist at Valve</b>
<br>I'm an experimental psychologist at Valve who works on applying knowledge and methodologies from psychology to game design. I do a fair bit of statistical analysis on gameplay and Steam data, and these days I’m spending time on Brain-Computer Interface research. I’ve been at Valve since 2008 and have worked on basically every game/product we’ve released since then.`,
    buttontext: "Linkedin",
    image: "/images/event/natChat/speakers/mikeAmbinder.jpeg",
    link: "https://www.linkedin.com/in/mike-ambinder-578aa89/",
    subCard: true,
  }),
});

var natChatSpeaker4_0 = new Card({
  header: "Dr. Milad Nazarahari",
  paragraph: `<b>Mechanical and Biomedical Engineer at University of Alberta</b>
<br>Milad began his educational journey at Iran University of Science and Technology where he spent six years studying Mechanical Engineering, and another two years as a Researcher. More recently Milad completed his PhD in Mechanical Engineering at the University of Alberta in 2020, where he has served as a Research and Teaching Assistant since 2016. Currently Dr. Nazarahari is working in a lab which researches the potential of neuroprostheses for controlling balance in those with physical disabilities.`,
  video: "https://www.youtube.com/embed/m4t8C9W3P7Y",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/milad-nazarahari-1999b3a3/?originalSubdomain=ir",
  subCard: true,
  backSide: new Card({
    header: "Dr. Milad Nazarahari",
    paragraph: `<b>Mechanical and Biomedical Engineer at University of Alberta</b>
<br>Milad began his educational journey at Iran University of Science and Technology where he spent six years studying Mechanical Engineering, and another two years as a Researcher. More recently Milad completed his PhD in Mechanical Engineering at the University of Alberta in 2020, where he has served as a Research and Teaching Assistant since 2016. Currently Dr. Nazarahari is working in a lab which researches the potential of neuroprostheses for controlling balance in those with physical disabilities.`,
    image: "/images/event/natChat/speakers/miladNazarahari.jpg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/milad-nazarahari-1999b3a3/?originalSubdomain=ir",
    subCard: true,
  }),
});

var natChatSpeaker4_1 = new Card({
  header: "Dr. Tony Muhammad Yousefnezhad",
  paragraph: `<b>Postdoctoral Fellow at University of Alberta</b>
<br>My primary research interests lie in developing machine / deep / reinforcement learning for solving real-world big and complex problems. Specifically, I am now working on the intersection of machine learning and computational neuroscience, where I am creating different techniques for decoding patterns of the human brain by exploiting distinctive biomarkers, i.e., fMRI, EEG, MEG, Health Records, etc.`,
  video: "https://www.youtube.com/embed/4HWKx89Cyp8",
  buttonText: "Linkedin",
  link: "https://www.linkedin.com/in/myousefnezhad/",
  subCard: true,
  backSide: new Card({
    header: "Dr. Tony Muhammad Yousefnezhad",
    paragraph: `<b>Postdoctoral Fellow at University of Alberta</b>
<br>My primary research interests lie in developing machine / deep / reinforcement learning for solving real-world big and complex problems. Specifically, I am now working on the intersection of machine learning and computational neuroscience, where I am creating different techniques for decoding patterns of the human brain by exploiting distinctive biomarkers, i.e., fMRI, EEG, MEG, Health Records, etc.`,
    image: "/images/event/natChat/speakers/tonyYousefnezhad.jpg",
    buttonText: "Linkedin",
    link: "https://www.linkedin.com/in/myousefnezhad/",
    subCard: true,
  }),
});

var featuredCards = [
  // natChatCardHome,
  NATureWalk,
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
  NATureWalk,
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
  sponsorGTec,
  sponsorHotchkiss
];

var natChatUpcomingChatsCards = [
  upcomingNatChats,
];

var natChatWhyAttendCards = [
  natChatRaffle,
  natChatNetworking,
];

var natChatSpeaker0Cards = [
  natChatSpeaker0_0,
  natChatSpeaker0_1,
  natChatSpeaker0_2,
  natChatSpeaker0_3,
  natChatSpeaker0_4,
];

var natChatSpeaker1Cards = [
  natChatSpeaker1_0,
  natChatSpeaker1_1,
  natChatSpeaker1_2,
  natChatSpeaker1_3,
];

var natChatSpeaker2Cards = [
  natChatSpeaker2_0,
  natChatSpeaker2_1,
  natChatSpeaker2_2,
  natChatSpeaker2_3,
];

var natChatSpeaker3Cards = [
  natChatSpeaker3_0,
  natChatSpeaker3_1,
];

var natChatSpeaker4Cards = [
  natChatSpeaker4_0,
  natChatSpeaker4_1,
];


var featuredCardsElement = document.getElementById("homeFeaturedCards");
var homePageCardsElement = document.getElementById("homePageCards");
var currentProjectCardsElement = document.getElementById("currentProjectCards");
var pastProjectCardsElement = document.getElementById("pastProjectCards");
var currentEventCardsElement = document.getElementById("currentEventCards");
var pastEventCardsElement = document.getElementById("pastEventCards");
var moreEventCardsElement = document.getElementById("moreEventCards");
var natChatUpcomingChatsCardsElement = document.getElementById("natChatUpcomingChatsCards");
var natChatWhyAttendCardsElement = document.getElementById("natChatWhyAttendCards");
var natChatSpeaker0Element = document.getElementById("natChatSpeaker0");
var natChatSpeaker0FlippedElement = document.getElementById("natChatSpeaker0Flipped");
var natChatSpeaker1Element = document.getElementById("natChatSpeaker1");
var natChatSpeaker1FlippedElement = document.getElementById("natChatSpeaker1Flipped");
var natChatSpeaker2Element = document.getElementById("natChatSpeaker2");
var natChatSpeaker2FlippedElement = document.getElementById("natChatSpeaker2Flipped");
var natChatSpeaker3Element = document.getElementById("natChatSpeaker3");
var natChatSpeaker3FlippedElement = document.getElementById("natChatSpeaker3Flipped");
var natChatSpeaker4Element = document.getElementById("natChatSpeaker4");
var natChatSpeaker4FlippedElement = document.getElementById("natChatSpeaker4Flipped");

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
    .forEach(card => featuredCardsElement.safeAppendChild(card.generateElement()));

  homePageCards.forEach(card => homePageCardsElement.safeAppendChild(card.generateElement()));
} else if (currentProjectCardsElement && pastProjectCardsElement) {  // projects.html
  // Adds all present and future project cards to the projects page.
  currentProjectCards.forEach(card => currentProjectCardsElement.safeAppendChild(card.generateElement()));
  pastProjectCards.forEach(card => pastProjectCardsElement.safeAppendChild(card.generateElement()));

} else if (currentEventCardsElement &&
           pastEventCardsElement &&
           moreEventCardsElement) {  // events.html
  // Add all of the event cards to either currentEvents or pastEvents.
  eventCards.forEach(card =>
    card.isFinished() ?
      pastEventCardsElement.safeAppendChild(card.generateElement()) :
      currentEventCardsElement.safeAppendChild(card.generateElement()))

  // Add all of the moreEvent cards to the moreEvents section.
  moreEventCards.forEach(card => moreEventCardsElement.safeAppendChild(card.generateElement()));

} else if (partnerCardsPlatinum && partnerCardsGold && partnerCardsSilver && partnerCardsBronze) { // partners.html 
  // Randomize the order we display sponsors
  const shuffledArray = partnerCards.sort((a, b) => 0.5 - Math.random()); 
  shuffledArray
    .mutate(card => card.setDark(false))
    .forEach(card => {
      switch(this.determineDisplayTier(card.eventsSponsored)) {
        case sponsorshipTier.platinum:
          partnerCardsPlatinum.safeAppendChild(card.generateElement());
          break;
        case sponsorshipTier.gold:
          partnerCardsGold.safeAppendChild(card.generateElement());
          break;
        case sponsorshipTier.silver:
          partnerCardsSilver.safeAppendChild(card.generateElement());
          break;
        case sponsorshipTier.bronze:
          partnerCardsBronze.safeAppendChild(card.generateElement());
          break;
        default:
          console.error("Failed to generate a sponsor card. Ensure every sponsor has an event sponsored");
      }
    });
} else if (natChatUpcomingChatsCardsElement && natChatWhyAttendCardsElement) { // event/natchat.html
  natChatUpcomingChatsCards.forEach(card => natChatUpcomingChatsCardsElement.safeAppendChild(card.generateElement()));
  natChatWhyAttendCards.forEach(card => natChatWhyAttendCardsElement.safeAppendChild(card.generateElement()));
  natChatSpeaker0Cards.forEach(card => natChatSpeaker0Element.safeAppendChild(card.generateElement()));
  natChatSpeaker0Cards.map(card => card.flip()).forEach(card => natChatSpeaker0FlippedElement.safeAppendChild(card.generateElement()));
  natChatSpeaker1Cards.forEach(card => natChatSpeaker1Element.safeAppendChild(card.generateElement()));
  natChatSpeaker1Cards.map(card => card.flip()).forEach(card => natChatSpeaker1FlippedElement.safeAppendChild(card.generateElement()));
  natChatSpeaker2Cards.forEach(card => natChatSpeaker2Element.safeAppendChild(card.generateElement()));
  natChatSpeaker2Cards.map(card => card.flip()).forEach(card => natChatSpeaker2FlippedElement.safeAppendChild(card.generateElement()));
  natChatSpeaker3Cards.forEach(card => natChatSpeaker3Element.safeAppendChild(card.generateElement()));
  natChatSpeaker3Cards.map(card => card.flip()).forEach(card => natChatSpeaker3FlippedElement.safeAppendChild(card.generateElement()));
  natChatSpeaker4Cards.forEach(card => natChatSpeaker4Element.safeAppendChild(card.generateElement()));
  natChatSpeaker4Cards.map(card => card.flip()).forEach(card => natChatSpeaker4FlippedElement.safeAppendChild(card.generateElement()));
}
