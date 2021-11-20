class Redirect {
  constructor() {
    this.links = new Array();
  }

  add(link) {
    const isAlreadyAdded = this.links.some(element => element.slug === link.slug);
    if(!isAlreadyAdded) {
      this.links.push(link);
      return;
    }
    console.error("Attempted to add duplicate link record. Skipped adding " + JSON.stringify(link));
  }

  send(slug) {
    for (let i = 0; i < this.links.length; i++) {
      if(this.links[i].slug == slug) {
        if(this.links[i].expire && this.links[i].expire < Date.now()) {

          // Track Event in Google Analytics
          ga('send', {
            hitType: 'social',
            eventCategory: 'Link',
            eventAction: 'usedExpiredRedirect',
            eventLabel: this.links[i].location
          });

          window.location.replace("/expired.html");
          return;
        }

        // Track Event in Google Analytics
        ga('send', {
          hitType: 'social',
          eventCategory: 'Link',
          eventAction: 'usedRedirect',
          eventLabel: this.links[i].location
        });

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
      console.error("All links must have a slug.");
      return;
    }
    this.slug = slug;
    return this;
  }

  setLocation(location) {
    if (!location) {
      console.error("No location provided for the link. Defaulting to the 500 error page.");
      return "500";
    }
    this.location = location;
    return this;
  }

  setExpire(expire) {
    this.expire = expire;
    return this;
  }
}


function formatExpire(expire) {
  if(expire === "-") {
    return null;
  }

  let format = new Date(expire);

  if(format instanceof Date && !isNaN(format)) {
    return format;
  } else {
    console.error("Was not able to parse date: " + expire + ". Expiry date has been removed from this record.");
    return null;
  }
}


function loadRedirectSheet() {
  const sheetName = 'Redirects';
  const sheetId = '1spr0VSqwKbOM7kAKnqKSmItOl7noNgRb427od-f3oHw';
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`

  return new Promise(resolve => {
    fetch(url)
    .then(res => res.text())
    .then(text => {

      const out = JSON.parse(text.substr(47).slice(0, -2));

      let table = out.table;
      let rowCount = table.rows.length;
      let colCount = table.cols.length;

      // Testing //
      // console.log(table.rows[1].c[1].v);
      // console.log("----------------");
      // console.log("rowCount: " + rowCount);
      // console.log("colCount: " + colCount);
      // console.log("----------------");
      // console.log(table);
      // Testing //

      for(var i = 1; i < rowCount; i++) {
        redirect.add(new Link({
          slug: table.rows[i].c[0].v,
          location: table.rows[i].c[1].v,
          expire: formatExpire(table.rows[i].c[2].v),
        }));
      }
      resolve(redirect);
    })
    .catch(err => { console.error(err); });
  });
}




let redirect = new Redirect();

window.addEventListener('load', async function () {
  const maxRequestLengthTimeoutMS = 10000;
  const slug = window.location.pathname.substring(1);
  const p1 = loadRedirectSheet();
  const p2 = new Promise((res) => setTimeout(() => res(false), maxRequestLengthTimeoutMS));

  const success = await Promise.race([p1, p2]);

  if(!success) {
    window.location.replace("/500.html");
    return;
  }
  redirect.send(slug);
});
