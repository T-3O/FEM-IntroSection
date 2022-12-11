class Page {
  constructor() {
    this.initEvents();
  };

  initEvents() {
    const self = this;

    const menuBtn = document.querySelectorAll(".menu-toggle");
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
    if (target.classList.contains("opened"))
    {
      target.classList.remove("opened");
      return;
    }

    const menuItems = document.querySelectorAll(".menu-items, .expandible, .opened");
    menuItems.forEach(item => {
      item.classList.remove("opened");
    });
    target.classList.add("opened");
  };
}