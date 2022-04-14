var linkCardContainerElement = document.getElementById("linkCardContainer");

class Redirect {
  constructor() {
    this.links = new Array();
  }

  add(link) {
    this.links.push(link);
  }

  send(slug) {
    for (let i = 0; i < this.links.length; i++) {
      if(this.links[i].slug == slug) {
        if(this.links[i].expire && this.links[i].expire < Date.now()) {
          window.location.replace("/expired.html");
          return;
        }

        // TODO increment some counter for google analytics

        window.location.replace(this.links[i].location);
        return;
      }
    }

    window.location.replace("/lost.html");
    return;
  }

  generateLinkCards() {
    var today = new Date().getTime();
    var centreClass = "totallyCentre";
    var linkContainerClass = "linkContainer";
    var linkTextContainerClass = "linkTextContainer";
    var linkTitleClass = "linkTitle";
    var linkParagraphClass = "linkParagraph";
    var linkImageContainerClass = "linkImageContainer";
    var linkImageClass = "linkImage";

    this.links.forEach(link => {
      if(link.logo !== undefined) {
        if(link.expire !== null && link.expire < today) {
          return;
        }

        // Image
        var linkImageContainer = document.createElement("div");
        linkImageContainer.classList.add(linkImageContainerClass);

        var linkImage = document.createElement("img");
        linkImage.classList.add(linkImageClass);
        linkImage.classList.add(centreClass);
        linkImage.src = "/images/social/" + link.logo;

        linkImageContainer.appendChild(linkImage);

        // Text
        var linkTextContainer = document.createElement("div");
        linkTextContainer.classList.add(linkTextContainerClass);

        var linkTitle = document.createElement("div");
        linkTitle.classList.add(linkTitleClass);
        linkTitle.innerHTML = link.name;

        var linkParagraph = document.createElement("div");
        linkParagraph.classList.add(linkParagraphClass);
        linkParagraph.innerHTML = link.description;

        linkTextContainer.appendChild(linkTitle);
        linkTextContainer.appendChild(linkParagraph);

        // Build
        var linkContainer = document.createElement("a");
        linkContainer.href = link.location;
    
        var linkCard = document.createElement("div");
        linkCard.classList.add(linkContainerClass);

        linkCard.appendChild(linkImageContainer);
        linkCard.appendChild(linkTextContainer);
    
        linkContainer.appendChild(linkCard);
        linkCardContainerElement.appendChild(linkContainer);

        // Example Card
        // <a href="https://apple.com">
        //   <div class="linkContainer">
        //     <div class="linkImageContainer">
        //       <img src="/images/social/instagram.png" class="linkImage totallyCentre">
        //     </div>
        //     <div class="linkTextContainer">
        //       <div class="linkTitle">Instagram</div>
        //       <div class="linkParagraph">@neuralberta</div>
        //     </div>
        //   </div>
        // </a>
      }
    })

  }
}


class Link {
  slug = "";
  location = "";
  expire = null;
  name = "";
  description = "";
  logo = "";

  constructor(args) {
    this.setSlug(args["slug"]);
    this.setLocation(args["location"]);
    this.setExpire(args["expire"]);
    this.setName(args["name"])
    this.setDescription(args["description"])
    this.setLogo(args["logo"])
  }

  setSlug(slug) {
    if (!slug) {
      console.error("Please provide a slug for all redirects");
      return;
    }
    this.slug = slug;
    return this;
  }

  setLocation(location) {
    if (!location) {
      console.error("Please provide a location for all redirects");
      return;
    }
    this.location = location;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setLogo(logo) {
    this.logo = logo;
    return this;
  }

  setExpire(expire) {
    this.expire = expire;
    return this;
  }
}











let redirect = new Redirect();

redirect.add(new Link({
  slug: "natsite",
  location: "/index.html",
  name: "natSite",
  description: "See more NAT",
  logo: "nat.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "rsvp",
  location: "https://forms.gle/c6LZvHiFAac3fiDF9",
  expire: null,
}));

redirect.add(new Link({
  slug: "rsvpua",
  location: "https://forms.gle/wLw89Ne9Wb7UkFUA6",
  name: "RSVP",
  description: "NATure Walk",
  logo: "nat.png",
  expire: new Date('May 1, 2022 15:00:00'),
}));

redirect.add(new Link({
  slug: "demo",
  location: "https://forms.gle/tC78wn3vNTbQAH4P7",
  name: "Demo Nights",
  description: "Check out some neurotech hardware!",
  logo: "nat.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "rsvpuc",
  location: "https://ucalgary.zoom.us/meeting/register/tJIkdO-srzMqHNcvxElJVI7d3mBcN_S8vGJg",
  expire: new Date('November 24, 2021 19:00:00'),
}));

redirect.add(new Link({
  slug: "newsletter",
  location: "http://eepurl.com/gjhjMz",
  name: "Newsletter",
  description: "Stay in the loop with everything NAT",
  logo: "newsletter.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "slack",
  location: "https://join.slack.com/t/neuralbertatech/shared_invite/zt-r4bf4crb-WmljePHzGBrrLOjvaCsnJg",
  name: "Slack",
  description: "NeurAlbertaTech",
  logo: "slack.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "instagram",
  location: "https://www.instagram.com/neuralberta/",
  name: "Instagram",
  description: "@neuralberta",
  logo: "instagram.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "instaua",
  location: "https://instagram.com/nat.ualberta",
  name: "natUA",
  description: "@nat.ualberta",
  logo: "instagram.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "instauc",
  location: "https://instagram.com/nat.ucalgary",
  name: "natUC",
  description: "@nat.ucalgary",
  logo: "instagram.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "instaul",
  location: "https://instagram.com/nat.ulethbridge",
  name: "natUL",
  description: "@nat.ulethbridge",
  logo: "instagram.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "twitter",
  location: "https://twitter.com/neuralbertatech",
  name: "Twitter",
  description: "@neuralbertatech",
  logo: "twitter.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "facebook",
  location: "https://www.facebook.com/NeurAlbertaTech/",
  name: "Facebook",
  description: "NeurAlbertaTech",
  logo: "facebook.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "linkedin",
  location: "https://www.linkedin.com/company/neuralbertatech/",
  name: "LinkedIn",
  description: "NeurAlbertaTech",
  logo: "linkedin.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "youtube",
  location: "https://www.youtube.com/channel/UC6ydgj4tflqsyt9A_XjY1uw",
  name: "YouTube",
  description: "NeurAlbertaTech",
  logo: "youtube.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "messenger",
  location: "http://m.me/NeurAlbertaTech",
  name: "Messenger",
  description: "NeurAlbertaTech",
  logo: "messenger.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "email",
  location: "mailto:neuralbertatech@gmail.com",
  name: "Email",
  description: "info@neuralberta.tech",
  logo: "email.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "uadiscord",
  location: "https://discord.gg/7ZsNZ3ZrDs",
  name: "Discord",
  description: "uAlberta Chapter",
  logo: "discord.png",
  expire: null,
}));

redirect.add(new Link({
  slug: "tracing",
  location: "https://forms.gle/EfGr2a9TjqCzQMyg9",
  expire: null,
}));

redirect.add(new Link({
  slug: "card",
  location: "link",
  expire: null,
}));

redirect.add(new Link({
  slug: "bio",
  location: "link",
  expire: null,
}));

redirect.add(new Link({
  slug: "eventtrace",
  location: "https://forms.gle/rSAtPriEAZ4ScDjn9",
  expire: null,
}));

redirect.add(new Link({
  slug: "followup",
  location: "https://forms.gle/biymZzhsgF7gaNdA9",
  expire: new Date('March 29, 2022 21:00:00'),
}));



function proposeRedirect() {
  const slug = window.location.pathname.substring(1);

  setTimeout(() => {
    redirect.send(slug);
  }, 500);
}

function getLinkCards() {
    redirect.generateLinkCards();
}