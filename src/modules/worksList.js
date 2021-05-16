const worksList = () => {
  class SliderCarousel {
    constructor({
      main,
      wrap,
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 3,
      responsive = [],

    }) {
      if (!main || !wrap) {
        console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow),
      };
      this.responsive = responsive;
    }

    init() {
      this.addGloClass();
      this.addStyle();

      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }

      if (this.responsive) {
        this.responseInit();
      }
    }

    addGloClass() {
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');
      for (const item of this.slides) {
        item.classList.add('glo-slider__item');
      }
    }

    addStyle() {
      let style = document.getElementById('sliderCarousel-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'sliderCarousel-style';
      }

      style.textContent = `
        .glo-slider {
          
        }
        .glo-slider__wrap {
          display: flex !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }
        .glo-slider__item {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 0 ${this.options.widthSlide}% !important;
          margin: auto 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
        --this.options.position;
        if (this.options.position < 0) {
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    nextSlider() {
      if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
        if (this.options.position > this.slides.length - this.slidesToShow) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    addArrow() {
      this.prev = document.createElement('button');
      this.next = document.createElement('button');

      this.prev.className = 'glo-slider__prev';
      this.next.className = 'glo-slider__next';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);

      const style = document.createElement('style');
      style.textContent = `
        .glo-slider__prev,
        .glo-slider__next {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
        }
        .glo-slider__next {
          border-left-color: #19b5fe;
        }
        .glo-slider__prev {
          border-right-color: #19b5fe;
        }
        .glo-slider__prev:hover,
        .glo-slider__next:hover,
        .glo-slider__prev:focus,
        .glo-slider__next:focus {
          background: transparent;
          outline: transparent;
        }
      `;

      document.head.appendChild(style);
    }

    responseInit() {
      const slidesToShowDefault = this.slidesToShow,
        allResponse = this.responsive.map(item => item.breakpoint),
        maxResponse = Math.max(...allResponse);

      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;

        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]) {
              this.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
            }
          }
        } else {
          this.slidesToShow = slidesToShowDefault;
          this.options.widthSlide = Math.floor(100 / this.slidesToShow);
          this.addStyle();
        }
      };

      checkResponse();
      window.addEventListener('resize', checkResponse);
    }
  }
  const getData = () => fetch('../crm-backend/db.json'),
    popupRepairTypes = document.querySelector('.popup-repair-types'),
    btns = popupRepairTypes.querySelectorAll('.popup-repair-types-nav__item'),
    switchInner = document.getElementById('switch-inner'),
    popupTableList = document.querySelector('.popup-repair-types-content-table__list'),
    navListPopupRepair = document.querySelector('.nav-list-popup-repair');


  const render = item => {

    const { name, cost } = item,
      tbody = document.createElement('tbody'),
      el = document.createElement('tr');

    el.classList.add('mobile-row');
    el.innerHTML = `
        <td class="repair-types-name">${name}</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
        <td class="repair-types-value">м<sup>2</sup></td>
        <td class="repair-types-value">${cost}</td>
      `;
    tbody.insertAdjacentElement('beforeend', el);

    popupTableList.appendChild(tbody);

  };

  popupRepairTypes.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.popup-repair-types-nav__item')) {
      popupTableList.innerHTML = '';
      for (const btn of btns) {
        btn.classList.remove('active');
      }
      target.classList.add('active');
      switchInner.textContent = target.textContent;
      getData()
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network NOT 200');
          }
          return (response.json());
        })
        .then(data => {
          data.forEach(item => {
            if (item.type === target.textContent) {
              render(item);
            } else {
              return;
            }
          });
        })
        .catch(error => console.error(error));
    }
  });

  const sliderMini = new SliderCarousel({
    main: '.nav-wrap-repair',
    wrap: '.nav-list-popup-repair',
    next: '#nav-arrow-popup-repair_right',
    prev: '#nav-arrow-popup-repair_left',
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 2,
      },
      {
        breakpoint: 576,
        slidesToShow: 1,
      },

    ]
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      btns.forEach(item => {
        item.classList.remove('glo-slider__item');
      });
      navListPopupRepair.classList.remove('glo-slider__wrap');
      navListPopupRepair.style = 'transform: translateX(0);';
    } else {
      btns.forEach(item => {
        item.classList.add('glo-slider__item');
      });
      navListPopupRepair.classList.add('glo-slider__wrap');
    }
  });

  if (window.innerWidth < 1024) {
    sliderMini.init();
  }
};

export default worksList;
