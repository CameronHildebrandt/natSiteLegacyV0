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
}


class Link {
  constructor(args) {
    this.setSlug(args["slug"]);
    this.setLocation(args["location"]);
    this.setExpire(args["expire"]);
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

  setExpire(expire) {
    this.expire = expire;
    return this;
  }
}











let redirect = new Redirect();

redirect.add(new Link({
  slug: "facebook",
  location: "https://www.facebook.com/NeurAlbertaTech/",
  expire: null,
}));

redirect.add(new Link({
  slug: "messenger",
  location: "http://m.me/NeurAlbertaTech",
  expire: null,
}));

redirect.add(new Link({
  slug: "linkedin",
  location: "https://www.linkedin.com/company/neuralbertatech/",
  expire: null,
}));

redirect.add(new Link({
  slug: "instagram",
  location: "https://www.instagram.com/neuralberta/",
  expire: null,
}));

redirect.add(new Link({
  slug: "twitter",
  location: "https://twitter.com/neuralbertatech",
  expire: null,
}));

redirect.add(new Link({
  slug: "slack",
  location: "https://join.slack.com/t/neuralbertatech/shared_invite/zt-r4bf4crb-WmljePHzGBrrLOjvaCsnJg",
  expire: null,
}));

redirect.add(new Link({
  slug: "newsletter",
  location: "http://eepurl.com/gjhjMz",
  expire: null,
}));

redirect.add(new Link({
  slug: "email",
  location: "mailto:neuralbertatech@gmail.com",
  expire: null,
}));

redirect.add(new Link({
  slug: "tracing",
  location: "https://forms.gle/EfGr2a9TjqCzQMyg9",
  expire: null,
}));

redirect.add(new Link({
  slug: "rsvp",
  location: "https://forms.gle/c6LZvHiFAac3fiDF9",
  expire: null,
}));

redirect.add(new Link({
  slug: "rsvpnatuc",
  location: "https://ucalgary.zoom.us/meeting/register/tJIkdO-srzMqHNcvxElJVI7d3mBcN_S8vGJg",
  expire: new Date('November 24, 2021 19:00:00'),
}));







window.addEventListener('load', function () {
  const slug = window.location.pathname.substring(1);

  setTimeout(() => {
    redirect.send(slug);
  }, 500);
});
