class Page {
  constructor() {
    this.initEvents();
  };

  initEvents() {
    const self = this;
    const menuBtn = document.querySelectorAll(".menu-toggle");
    const skipNavBtn = document.querySelector(".skip-navigation")
    
    menuBtn.forEach(btn => {
      btn.addEventListener("click", self.showHideMenu.bind(this));
    });

    const menuItems = document.querySelectorAll(".menu-items, .expandible");
    menuItems.forEach(item => {
      item.addEventListener("click", self.expandCollapseMenuItem);
    });

    document.querySelector("#menuOverlay").addEventListener('click', () => {
      self.closeMenu();
    });
    skipNavBtn.addEventListener('click', () => {
      document.querySelector("main button").focus();
      skipNavBtn.blur();
    });
  };

  showHideMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const isOpened = menuToggle.getAttribute('aria-expanded') === "true";
    if (isOpened)
    {
      this.closeMenu();
    }
    else
    {
      menuToggle.setAttribute('aria-expanded', "true");
      document.querySelector("body").setAttribute("data-menu-status", "opened");
    }
  };
  closeMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const body = document.querySelector("body");
    menuToggle.setAttribute('aria-expanded', "false");
    body.setAttribute("data-menu-status", "closing");
    document.querySelector("#menuOverlay").addEventListener('animationend', () => {
      body.setAttribute("data-menu-status", "closed");
    }, {once: true});
  };

  expandCollapseMenuItem(evt) {
    const target = evt.target;
    if (target.getAttribute("data-list-status") === "opened")
    {
      target.nextElementSibling.addEventListener('animationend', () => {
        target.setAttribute("data-list-status", "closed");
      }, {once: true});
      target.setAttribute("data-list-status", "closing");
      return;
    }

    const menuItems = document.querySelectorAll(".menu-item.expandible[data-list-status='opened']");
    if (menuItems.length > 0)
    {
      menuItems.forEach(item => {
        item.setAttribute("data-list-status", "closing");
        item.nextElementSibling.addEventListener('animationend', () => {
          item.setAttribute("data-list-status", "closed");
        }, {once: true});
      });
    }

    target.setAttribute("data-list-status", "opened");
  };
}