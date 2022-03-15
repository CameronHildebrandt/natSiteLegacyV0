class NavbarMenuType {
  static Button = 0;
  static Image = 1;
}

class Navbar {
  menus = [];
  constructor() {}

  addMenu(menu) {
    this.menus.push(menu);
  }

  addMenus(menus) {
    menus.forEach(menu => this.addMenu(menu));
  }

  getCurrentPath() {
    var path = window.location.pathname;

    return path;
  }

  cleanPath(path) {
    if (path === "" || path === "." || path.lenth == 0) {
      return getCurrentPath();
    }

    if (path[0] != "/") {
      return getCurrentPath() + path;
    }

    return path;
  }

  comparePaths(a, b) {
    a = this.cleanPath(a);
    b = this.cleanPath(b);

    if (a.endsWith(".html")) {
      a = a.substr(0, a.length-5);
      console.debug(a);
    }
    if (b.endsWith(".html")) {
      b = b.substr(0, b.length-5);
      console.debug(b);
    }

    if (a == b) {
      return true;
    } else {
      return false;
    }
  }
  
  isCurrentPath(path) {
    return this.comparePaths(path, this.getCurrentPath());
  }

  generateElement() {
    var navbarRoot = document.createElement("div");

    // Init burger
    var burger = document.createElement("div");
    burger.id = "burger";
    
    var topBun = document.createElement("div");
    var patty = document.createElement("div");
    var bottomBun = document.createElement("div");
    topBun.id = "topBun";
    patty.id = "patty";
    bottomBun.id = "bottomBun";
    topBun.classList.add("burgerPart");
    patty.classList.add("burgerPart");
    bottomBun.classList.add("burgerPart");

    burger.appendChild(topBun);
    burger.appendChild(patty);
    burger.appendChild(bottomBun);
    navbarRoot.appendChild(burger);


    // Mobile Menu
    var mobileBar = document.createElement("div");
    mobileBar.classList.add("mobileMenu");

    this.menus.forEach(menu => {
      if (menu.type == NavbarMenuType.Image) {
        return;
      }

      var mobileButton = document.createElement("button");
      mobileButton.classList.add("mobilePageLink");
      mobileButton.innerHTML = menu.name;
      if (this.isCurrentPath(menu.link)) {
        mobileButton.id = "currentPageLink";
        mobileBar.appendChild(mobileButton);
      } else {
        var anchor = document.createElement("a");
        anchor.href = this.cleanPath(menu.link);

        anchor.appendChild(mobileButton);
        mobileBar.appendChild(anchor);
      }
    });
    
    navbarRoot.appendChild(mobileBar);


    // Head Bar
    var headBar = document.createElement("div");
    headBar.id = "headBar";

    this.menus.forEach(menu => {
      var headButton;
      if (menu.type == NavbarMenuType.Image) {
        headButton = document.createElement("img");
        headButton.id = "headerImg";
        headButton.src = menu.imageSrc;
        headButton.alt = menu.imageAlt;
      } else if (menu.type == NavbarMenuType.Button) {
        headButton = document.createElement("button");
        headButton.classList.add("pageLink");
        headButton.innerHTML = menu.name;
      } else {
        console.error("Found an unknown type of Navbar Menu: " + menu.type);
        return;
      }

      // Add anchor unless if the menu links to the current page
      if (this.isCurrentPath(menu.link)) {
        if (menu.type != NavbarMenuType.Image) {
          headButton.id = "currentPageLink";
        }
        headBar.appendChild(headButton);
      } else {
        var anchor = document.createElement("a");
        anchor.href = this.cleanPath(menu.link);

        anchor.appendChild(headButton);
        headBar.appendChild(anchor);
      }
    });

    navbarRoot.appendChild(headBar);

    return navbarRoot;
  }
}

class NavbarMenu {
  type = NavbarMenuType.Button;
  name = "";
  link = "";
  imageSrc = "";
  imageAlt = "";
  constructor(args) {
    this.setType(args["type"]);
    this.setName(args["name"]);
    this.setLink(args["link"]);
    this.setImageSrc(args["imageSrc"]);
    this.setImageAlt(args["imageAlt"]);
    this.validate();
  }

  setType(type) {
    if (type !== undefined) {
      this.type = type;
    }
  }

  setName(name) {
    if (name !== undefined) {
      this.name = name;
    }
  }

  setLink(link) {
    if (link !== undefined) {
      this.link = link;
    }
  }

  setImageSrc(src) {
    if (src !== undefined) {
      this.imageSrc = src;
    }
  }

  setImageAlt(alt) {
    if (alt !== undefined) {
      this.imageAlt = alt;
    }
  }

  validate() {
    if (this.link == "") {
      console.warn("Navbar Menu is missing its link");
    }

    if (this.type == NavbarMenuType.Image) {
      if (this.imageSrc == "") {
        console.warn("Navbar Image Menu is missing an image link");
      }
    }
  }
}

var homeImage = new NavbarMenu({
  type: NavbarMenuType.Image,
  link: "/index.html",
  imageSrc: "/images/nat.svg",
  imageAlt: "NAT Logo",
});

var homeMenu = new NavbarMenu({
  name: "Home",
  link: "/index.html",
});

var projectsMenu = new NavbarMenu({
  name: "Projects",
  link: "/projects.html",
});

var teamMenu = new NavbarMenu({
  name: "Team",
  link: "/team.html",
});

var eventsMenu = new NavbarMenu({
  name: "Events",
  link: "/events.html",
});

var natFlatMenu = new NavbarMenu({
  name: "natFlat",
  link: "/natflat.html",
});

var communityMenu = new NavbarMenu({
  name: "Community",
  link: "/community.html",
});

var contactMenu = new NavbarMenu({
  name: "Contact",
  link: "/contact.html",
});


var pageNavbar = new Navbar();
pageNavbar.addMenus([homeImage, contactMenu, communityMenu, natFlatMenu, eventsMenu, teamMenu, projectsMenu, homeMenu]);

var navbarElement = document.getElementById("navbar");

if (navbarElement) {
  navbarElement.appendChild(pageNavbar.generateElement());
}
