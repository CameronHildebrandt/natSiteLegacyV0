class WholeRowCard {
  header = "";
  subHeader = "";
  paragraph = "";
  image = "";
  buttonText = "";
  link = "";
  location = "";
  startDate = null;
  endDate = null;
  dark = false;

  constructor(args) {
    this.setHeader(args["header"]); 
    this.setSubHeader(args["subHeader"]);
    this.setParagraph(args["paragraph"]);
    this.setImage(args["image"]);
    this.setButtonText(args["buttonText"]);
    this.setLink(args["link"]);
    this.setLocation(args["location"]);
    this.setStartDate(args["startDate"]);
    this.setEndDate(args["endDate"]);
    this.setDark(args["dark"]);
  }

  clone() {
    return new WholeRowCard({
      header: this.header,
      subHeader: this.subHeader,
      paragraph: this.paragraph,
      image: this.image,
      buttonText: this.buttonText,
      link: this.link,
      location: this.location,
      date: this.date,
      dark: this.dark
    });
  }

  setHeader(header) {
    if (header !== undefined) {
      this.header = header;
    }
  }

  setSubHeader(subHeader) {
    if (subHeader !== undefined) {
      this.subHeader = subHeader;
    }
  }

  setParagraph(paragraph) {
    if (paragraph !== undefined) {
      this.paragraph = paragraph;
    }
  }

  setImage(image) {
    if (image !== undefined) {
      this.image = image;
    }
  }

  setLink(link) {
    if (link !== undefined) {
      this.link = link;
    }
  }

  setButtonText(buttonText) {
    if (buttonText !== undefined) {
      this.buttonText = buttonText;
    }
  }

  setLocation(location) {
    if (location !== undefined) {
      this.location = location;
    }
  }

  setStartDate(date) {
    if (date !== undefined) {
      this.startDate = date;
    }
  }

  setEndDate(date) {
    if (date !== undefined) {
      this.endDate = date;
    }
  }

  setDark(dark) {
    if (dark !== undefined) {
      this.dark = dark;
    }
  }

  generateElement() {
    var cardRoot = document.createElement("div");
    if (this.dark) {
      cardRoot.id = "darkSmallInfoBlock";  // TODO: Change to class.
    } else {
      cardRoot.id = "smallInfoBlock";  // TODO: Change to class.
    }
    cardRoot.style = "magin-bottom: 0px;";

    var cardBlock = document.createElement("div");
    cardBlock.id = "smallInfoContents";  // TODO: Change to class.

    var lightTextColorStyle = "color: rgba(240,240,240,1);";

    // Create media section.
    var mediaBlock = document.createElement("div");
    var mediaLink = document.createElement("a");
    var mediaImage = document.createElement("img");
    mediaBlock.id = "smallInfoBlockMedia";  // TODO: Change to class.
    if (this.link) {
      mediaLink.href = this.link;
    }
    mediaImage.src = this.image;
    mediaImage.id = "eventImage"  // TODO: Change to class.
    //mediaImage.alt = ""  // TODO: Add.
    mediaLink.appendChild(mediaImage);
    mediaBlock.appendChild(mediaLink);
    if (this.buttonText) {
      var mediaButton = document.createElement("button");
      mediaButton.id = "smallButton"  // TODO: Change to class.
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
    textBlock.id = "smallInfoBlockText"  // TODO: Change to class.
    headerBlock.classList.add("subSubTitle");
    if (this.dark) {
      headerBlock.style = "margin-bottom: 15px; " + lightTextColorStyle;
    } else {
      headerBlock.style = "margin-bottom: 15px;";
    }
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
    if (this.dark) {
      paragraphText.style = lightTextColorStyle;
    }
    paragraphText.classList.add("paragraph");
    paragraphText.innerHTML = this.paragraph;
    textBlock.appendChild(paragraphText);
    cardBlock.appendChild(textBlock);
    cardRoot.appendChild(cardBlock);
    
    return cardRoot;
  }
}

// Defined cards.
var womenInNeuroCard = new WholeRowCard({
  header: "NATChat: Women in Neurotech",
  subHeader: "RSVPs for natChat Fa21 are now open!",
  paragraph: `A <b>FREE</b> virtual chat session hosted by NeurAlbertaTech. We invite guest speakers to talk about important topics in neuroscience, tech, and the neurotech industry. At this event you will have the chance to win some exclusive NAT swag and more importantly, you will have the chance to build your network and expand your professional reach.`,
  image: "images/InfoNight/NatChat.jpg",
  buttonText: "Learn More",
  link: "/event/natchat.html",
  location: "natFlat (CCIS L1)",
  startDate: new Date("October 27, 2021 17:00"),
  endDate: new Date("October 27, 2021 19:00"),
});

var womenInNeuroDarkCard = womenInNeuroCard.clone();
womenInNeuroDarkCard.setDark(true);

var workshopSeriesDarkCard = new WholeRowCard({
  header: "Workshop Series",
  paragraph: `If you want to learn about the stuff we do in a fun, interactive, low-stress environment, this is the event for you! We currently offer four unique 10-session workshop streams (Hardware, Software, Machine Learning, and Neuroscience) that serve as an introduction to each of the key pilars of brain computer interfacing programs.`,
  image: "images/InfoNight/WSML.jpg",
  buttonText: "Learn More",
  link: "event/workshops.html",
  dark: true,
});

var natHacksDarkCard = new WholeRowCard({
  header: "natHACKS",
  paragraph: `Alberta’s inaugural brain-computer interface hackathon. This is a completely remote hackathon with thousands of dollars in prizes available! natHACKS will be an event like no other, inspiring beginners to develop practical neurotech skills and challenging competent hackers to apply themselves in this growing and exciting field. Spanning two weeks and culminating in a 64-hour hackathon weekend, the event will combine workshops, challenges, and networking opportunities for anyone interested in neurotechnology. With three different streams and separate judging criteria based on experience level, we’re thrilled to allow neurotech enthusiasts to get their hands dirty in a diverse selection of projects.
  <br><br>
  Begins: <b>July 30th 5:00PM MDT</b><br>
  Ends: <b>August 2nd 10:00AM MDT</b>`,
  image: "/images/event/natHACKs/nathanGlow.png",
  dark: true,
});

var museAmassadorCard = new WholeRowCard({
  header: "Muse Ambassador",
  paragraph: `Are you interested in picking up a new brain-computer interface? Are you interested in helping NAT further our goal of making brain-computer interfacing technology accessible to everyone? Why not both!? We're excited to announce that we now have an official affiliate link with muse! Every headset bought using this link both gets you a new piece of hardware and funds a donation to NAT, at no extra cost to you!`,
  image: "images/event/muse-ambassador.jpg",
  buttonText: "Shop Now",
  link: "https://mbsy.co/3qhP3N",
});


var superNaturalCard = new WholeRowCard({
  header: "SuperNATural Activities",
  paragraph: `Drop by the natFlat any time during our office hours the week before Halloween for some superNATural trick-or-treats! (costume optional) Check out the spookified flat while picking up some candy and merch. You can find directions to the flat and the hours that we'll be there on our natFlat page!
  <br><br>
  Happy Halloween everyone!
  <br><br>
  <b>When:</b> Monday, October 25th - Friday, October 29th
  <br><br>
  <b>Where:</b> <a href="/natflat" id="uncoloredLink">natFlat</a>`,
  image: "images/Logos/misc/spook.png",
  buttonText: "natFlat",
  link: "/natflat",
  startDate: new Date("October 25, 2021"),
  endDate: new Date("October 29, 2021"),
});

var startupWeekCard = new WholeRowCard({
  header: "Edmonton Startup Week",
  paragraph: `We will start with a quick introduction to the NPO, NeurAlbertaTech, with a recap of projects we have supported since our founding in February of 2019.<br><br>
  Then we will dive deep into the specifics of one of our current projects, "Koalacademy" (submission to the Russian Neurotech Cup 2021), and how we are scientifically validating a Brain Computer Interface-accelerated language learning platform through traditional academic research avenues at the University of Alberta.<br><br>
  <b>When:</b> Friday October 21st, 2021, 16:00-16:30 MT<br><br>
  <b>Where:</b> Virtual!`,
  image: "images/InfoNight/natStartupWeek21.png",
  buttonText: "RSVP",
  link: "https://emamo.com/event/techstars-edmonton-startup-week",
  startDate: new Date("October 21, 2021, 16:00"),
  endDate: new Date("October 21, 2021, 16:30"),
});

var fa21InfoNightCard = new WholeRowCard({
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
  image: "images/InfoNight/INBlue.jpg",
  startDate: new Date("September 13, 2021 18:00"),
  endDate: new Date("September 13, 2021 20:00"),
});

var musingAboutHardwareCard = new WholeRowCard({
  header: "MUSEing About Hardware",
  paragraph: `Are you wondering how to go about collecting real brain data? Muse® by Interaxon Inc. headbands are perfect for starter neurotech projects as they are an accessible means of gathering EEG (electroencephalography) data. MUSEing About Hardware will include an introduction to the Muse S headband, a walk-through of working with data gathered by the Muse, and networking with like-minded neurotech innovators!
  <br><br>
  <b>June 23rd, 2021 17:00-19:00 MT</b>`,
  image: "/images/event/museEvent.jpeg",
  startDate: new Date("June 23, 2021 17:00"),
  endDate: new Date("June 23, 2021 19:00"),
});

var natFlowCard = new WholeRowCard({
  header: "NAT + Flow Neuroscience Event",
  paragraph: `Join NeurAlbertaTech and Flow Neuroscience for some insight into an emerging neurotechnology startup! Submit your questions ahead of time, then join us for a live discussion with Flow’s founders, Erik and Daniel. Stay afterwards for the chance to chat with the founders yourself.
  <br><br>
  <b>June 1st, 11:00am-12:15pm MT</b>`,
  image: "/images/event/FlowNAT.png",
  startDate: new Date("June 1, 2021 11:00"),
  endDate: new Date("June 1, 2021 12:15"),
});

var wi21InfoNightCard = new WholeRowCard({
  header: "Wi21 Info Night",
  paragraph: `Learn about what NeurAlbertaTech does and how you can get involved! We will have presentations on our past projects as well as details on all the exciting things we are doing in the near future. This is the perfect opportunity for you if you are interested in neurotechnology but don't know where to start, or if you are looking for a group where you can put your skills to use!
  <br><br>
  <b>When:</b> January 18th, 2021 17:00-19:00 MDT
  <br><br>
  <b>Where:</b> Zoom`,
  image: "images/InfoNight/INPurple.jpg",
  startDate: new Date("January 18, 2021 17:00"),
  endDate: new Date("January 18, 2021 19:00"),
});

var wi21ClubsFairCard = new WholeRowCard({
  header: "Wi21 Clubs Fair",
  paragraph: `Join us during virtual clubs fair to learn about the stuff we do and for some opportunities to get involved with the club!
  <br><br>
  <b>When:</b> January 4th-6th, 2021 10:00-16:00 MDT each day
  <br><br>
  <b>Where:</b> Zoom`,
  image: "images/InfoNight/CFPink.jpg",
  startDate: new Date("January 4, 2021 10:00"),
  endDate: new Date("January 6, 2021 16:00"),
});

var startupWeek2020Card = new WholeRowCard({
  header: "Edmonton Startup Week",
  paragraph: `We start with a quick introduction to the group and a recap of our submissions to international neurotechnology competitions since our founding in February of 2019. Then we dive deep into the specifics of our current "RemBRAINdt" project (Finalists for the Russian Neurotech Cup 2020) and how we are leveraging this project as our group's first foray into entrepreneurship developing a highly customizable and easy-to-use interface for real-time generation of visual art from live brain signals, for use in private and public events. On October 10th, we won a People's Choice Award at NeuroTech Cup 2020 at the BCI Samara Conference in Russia!
  <br><br>
  <b>When:</b> Friday October 23, 2020 11:30am - 12:00pm MDT
  <br><br>
  <b>Where:</b> Virtual!`,
  image: "images/InfoNight/NAT_Startup_Week.jpg",
  startDate: new Date("October 23, 2020 11:30"),
  endDate: new Date("October 23, 2020 12:00"),
});

var fa20InfoNightCard = new WholeRowCard({
  header: "Fa20 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, September 7th 4pm-6pm
  <br><br>
  <b>Where:</b> Virtual, on Google Meet! Link is shared once you RSVP!`,
  image: "images/InfoNight/INPink.jpg",
  startDate: new Date("September 7, 16:00"),
  endDate: new Date("September 7, 18:00"),
});

var fa20ClubsFairCard = new WholeRowCard({
  header: "Fa20 Clubs Fair",
  paragraph: `Visit our online chat in this year's all new virtual clubs fair to learn about what we do at NeurAlbertaTech and to learn what you can do to help push the bleeding edge of neurotech! We will be hosting a live demo of a project the team has worked on from 2pm-3pm MDT on Thursday and 3pm-4pm MDT on Friday, so make sure you don't miss that!
  <br><br>
  <b>When:</b> Monday, August 31 - Friday September 4th, 10am - 4pm each day
  <br><br>
  <b>Where:</b> Virtual Clubs Fair`,
  image: "images/InfoNight/CFPastel.jpg",
  startDate: new Date("August 31, 2020 10:00"),
  endDate: new Date("September 4, 2020 16:00"),
});

var wi20InfoNightCard = new WholeRowCard({
  header: "Wi20 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, January 13th, 2020 5:00pm - 7:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student Innovation Centre (Near CCIS Remedey)`,
  image: "images/InfoNight/INMagenta.jpg",
  startDate: new Date("January 13, 2020 17:00"),
  endDate: new Date("January 13, 2020 19:00"),
});

var wi20ClubsFair = new WholeRowCard({
  header: "Wi20 Clubs Fair",
  paragraph: `Come out to see our booth at UASU's Winter 20 clubs fair and talk with us about the bleeding edge of neurotech!
  <br><br>
  <b>When:</b> Monday, January 13th, 2020 10:00am - 4:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student's Union Building`,
  image: "images/InfoNight/CFPink.jpg",
  startDate: new Date("January 13, 2020 10:00"),
  endDate: new Date("January 13, 2020 16:00"),
});

var milleniumStemWorkshopCard = new WholeRowCard({
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

var fa19InfoNight = new WholeRowCard({
  header: "Fa19 Info Night",
  paragraph: `Are you interested in computing science, neuroscience, or brain computer interfaces? Do you already know a little bit about us and are thinking about joining the project team? This is your event! There will be some talks, more information about our club and what we do, and refreshments will be available!
  <br><br>
  <b>When:</b> Monday, September 9th, 2019 5:00pm - 7:00pm
  <br><br>
  <b>Where:</b> Upper Floor Student Innovation Centre (Near CCIS Remedey)`,
  image: "images/InfoNight/INTeal.jpg",
  startDate: new Date("September 9, 2019 17:00"),
  endDate: new Date("September 9, 2019 19:00"),
});


var featuredCards = [
  womenInNeuroCard,
  startupWeekCard,
  superNaturalCard,
  museAmassadorCard,
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
  womenInNeuroDarkCard,
  workshopSeriesDarkCard,
  natHacksDarkCard,
];

var featuredCardsElement = document.getElementById("homeFeaturedCards");
var currentEventCardsElement = document.getElementById("currentEventCards");
var pastEventCardsElement = document.getElementById("pastEventCards");
var moreEventCardsElement = document.getElementById("moreEventCards");


if (featuredCardsElement) {
  for (var i = 0; i < featuredCards.length; ++i) {
    featuredCardsElement.appendChild(featuredCards[i].generateElement());
  }
} else if (currentEventCardsElement && pastEventCardsElement) {
  for (var i = 0; i < eventCards.length; ++i) {
    if (eventCards[i].endDate < Date.now()) {
      pastEventCardsElement.appendChild(eventCards[i].generateElement())
    } else {
      currentEventCardsElement.appendChild(eventCards[i].generateElement());
    }
  }
}

if (moreEventCardsElement) {
  for (var i = 0; i < moreEventCards.length; ++i) {
    moreEventCardsElement.appendChild(moreEventCards[i].generateElement());
  }
}
