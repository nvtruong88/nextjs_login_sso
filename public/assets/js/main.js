/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /*header menu */
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleHeaderScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleHeaderScrolled);
  window.addEventListener("load", toggleHeaderScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileHeaderNavToggleBtn = document.querySelector(
    ".h-mobile-nav-toggle"
  );

  function mobileHeaderNavToogle() {
    document.querySelector("body").classList.toggle("h-mobile-nav-active");
    mobileHeaderNavToggleBtn.classList.toggle("bi-list");
    mobileHeaderNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileHeaderNavToggleBtn) {
    mobileHeaderNavToggleBtn.addEventListener("click", mobileHeaderNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#h-navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".h-mobile-nav-active")) {
        mobileHeaderNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document
    .querySelectorAll(".h-navmenu .toggle-dropdown")
    .forEach((navmenu) => {
      navmenu.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      });
    });

  /**
   * Navmenu Scrollspy
   */
  let navmenuHeaderlinks = document.querySelectorAll(".h-navmenu a");

  function navmenuHeaderScrollspy() {
    navmenuHeaderlinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".h-navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuHeaderScrollspy);
  document.addEventListener("scroll", navmenuHeaderScrollspy);

  /*end header */
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const footer = document.querySelector("footer");
    const sidebar = document.querySelector("#sidebar"); // Đổi tên selectSidebar thành sidebar để rõ ràng hơn
    const footerOffsetTop = footer.offsetTop + 100;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Kiểm tra nếu vị trí cuộn >= vị trí của footer
    if (scrollPosition + windowHeight >= footerOffsetTop) {
      // Thêm class để ẩn menu (sidebar)
      sidebar.classList.add("sidebar-customize"); // Sử dụng class CSS để ẩn
    } else {
      // Xóa class để hiển thị lại menu (sidebar)
      sidebar.classList.remove("sidebar-customize");
    }
  }

  document.addEventListener("scroll", toggleScrolled);

  /**
   * sidebar toggle
   */
  const sidebarToggleBtn = document.querySelector(".sidebar-toggle");

  function sidebarToggle() {
    document.querySelector("#sidebar").classList.toggle("sidebar-show");
    sidebarToggleBtn.classList.toggle("bi-list");
    sidebarToggleBtn.classList.toggle("bi-x");
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", sidebarToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".sidebar-show")) {
        sidebarToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);


  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });


  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  // window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  function redirectSinglePage(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định

    let pageUrl = event.currentTarget.getAttribute("data-page");

    // Gọi hàm loadPage để tải trang mà không reload trang
    loadPage(pageUrl);
  }

  function loadPage(pageUrl, isInitSwiper) {
    $.get(pageUrl, function (data) {
      debugger;
      // Gán nội dung HTML từ tệp vào #main
      $("#main").html(data);
      // Cập nhật URL trong thanh địa chỉ mà không tải lại trang
      window.history.pushState({ path: pageUrl }, "", pageUrl);

      // Khởi tạo Swiper
      initSwiper(); // Gọi hàm khởi tạo Swiper
    }).fail(function (xhr) {
      $("#main").html(
        `<p>Error loading page: ${xhr.status} ${xhr.statusText}</p>`
      );
    });
  }

  // Hàm khởi tạo Swiper
  function initSwiper() {
    // Lấy cấu hình từ thẻ script
    const swiperConfig = JSON.parse($(".swiper-config").html());

    // Khởi tạo Swiper
    const swiper = new Swiper(".init-swiper", swiperConfig); // Thay đổi '.swiper-container' thành selector phù hợp của bạn
  }

  // Select all .details-link elements and add event listeners to each
  const detailLinkBtns = document.querySelectorAll(".details-link");
  detailLinkBtns.forEach((link) => {
    link.addEventListener("click", redirectSinglePage);
  });

  const stretchedLinks = document.querySelectorAll(".stretched-link");
  stretchedLinks.forEach((link) => {
    link.addEventListener("click", redirectSinglePage);
  });

  // Hàm khởi tạo trạng thái trang
  function initPageState() {
    // Xử lý sự kiện khi người dùng nhấn nút quay lại/trở lại trên trình duyệt
    window.onpopstate = function (event) {
      debugger;
      if (event.state && event.state.path) {
        loadPage(event.state.path); // Tải trang tương ứng khi quay lại
      }else{
       // window.location.reload(true);
      }
    };
  }

  // Khi trang được tải, khởi động trạng thái trang
  window.addEventListener("load", initPageState);
})();
