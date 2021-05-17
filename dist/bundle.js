(()=>{"use strict";function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,l=!0,a=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return l=t.done,t},e:function(t){a=!0,s=t},f:function(){try{l||null==r.return||r.return()}finally{if(a)throw s}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}const s=function(){function t(e){var n=e.main,r=e.wrap,o=e.next,i=e.prev,s=e.infinity,l=void 0!==s&&s,a=e.position,c=void 0===a?0:a,u=e.slidesToShow,d=void 0===u?3:u,p=e.responsive,f=void 0===p?[]:p;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n&&r||console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!'),this.main=document.querySelector(n),this.wrap=document.querySelector(r),this.slides=document.querySelector(r).children,this.next=document.querySelector(o),this.prev=document.querySelector(i),this.slidesToShow=d,this.options={position:c,infinity:l,widthSlide:Math.floor(100/this.slidesToShow)},this.responsive=f}var e,n;return e=t,(n=[{key:"init",value:function(){this.addGloClass(),this.addStyle(),this.prev&&this.next||this.addArrow(),this.controlSlider(),this.responsive&&this.responseInit()}},{key:"addGloClass",value:function(){this.main.classList.add("glo-slider"),this.wrap.classList.add("glo-slider__wrap");var t,e=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,l=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){a=!0,s=t},f:function(){try{l||null==n.return||n.return()}finally{if(a)throw s}}}}(this.slides);try{for(e.s();!(t=e.n()).done;)t.value.classList.add("glo-slider__item")}catch(t){e.e(t)}finally{e.f()}}},{key:"addStyle",value:function(){var t=document.getElementById("sliderCarousel-style");t||((t=document.createElement("style")).id="sliderCarousel-style"),t.textContent="\n      .glo-slider {\n      \n      }\n\n      .glo-slider2 {\n        overflow: hidden;\n        border-radius: 20px;\n      }\n\n      .glo-slider3 {\n        overflow: hidden;\n      \n      }\n\n      .glo-slider__wrap {\n        display: flex !important;\n        transition: transform 0.5s !important;\n        will-change: transform !important;\n      }\n      .glo-slider__item {\n        display: flex !important;\n        align-items: center !important;\n        justify-content: center !important;\n        flex: 0 0 ".concat(this.options.widthSlide,"% !important;\n        margin: auto 0 !important;\n      }\n    "),document.head.appendChild(t)}},{key:"controlSlider",value:function(){this.prev.addEventListener("click",this.prevSlider.bind(this)),this.next.addEventListener("click",this.nextSlider.bind(this))}},{key:"prevSlider",value:function(){(this.options.infinity||this.options.position>0)&&(--this.options.position,this.options.position<0&&(this.options.position=this.slides.length-this.slidesToShow),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"nextSlider",value:function(){(this.options.infinity||this.options.position<this.slides.length-this.slidesToShow)&&(++this.options.position,this.options.position>this.slides.length-this.slidesToShow&&(this.options.position=0),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"addArrow",value:function(){this.prev=document.createElement("button"),this.next=document.createElement("button"),this.prev.className="glo-slider__prev",this.next.className="glo-slider__next",this.main.appendChild(this.prev),this.main.appendChild(this.next);var t=document.createElement("style");t.textContent="\n      .glo-slider__prev,\n      .glo-slider__next {\n        margin: 0 10px;\n        border: 20px solid transparent;\n        background: transparent;\n      }\n      .glo-slider__next {\n        border-left-color: #19b5fe;\n      }\n      .glo-slider__prev {\n        border-right-color: #19b5fe;\n      }\n      .glo-slider__prev:hover,\n      .glo-slider__next:hover,\n      .glo-slider__prev:focus,\n      .glo-slider__next:focus {\n        background: transparent;\n        outline: transparent;\n      }\n    ",document.head.appendChild(t)}},{key:"responseInit",value:function(){var t,e=this,n=this.slidesToShow,i=this.responsive.map((function(t){return t.breakpoint})),s=Math.max.apply(Math,function(t){if(Array.isArray(t))return o(t)}(t=i)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||r(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=function(){var t=document.documentElement.clientWidth;if(t<s)for(var r=0;r<i.length;r++)t<i[r]&&(e.slidesToShow=e.responsive[r].slidesToShow,e.options.widthSlide=Math.floor(100/e.slidesToShow),e.addStyle());else e.slidesToShow=n,e.options.widthSlide=Math.floor(100/e.slidesToShow),e.addStyle()};l(),window.addEventListener("resize",l)}}])&&i(e.prototype,n),t}();function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=u(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){l=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw i}}}}function u(t,e){if(t){if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t,e){return!e||"object"!==a(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var w,b,S,_,E,L,x,k,A,C,T,q,I,j;q=document.querySelector(".header-contacts__arrow"),I=document.querySelector(".header-contacts__phone-number-accord"),j=I.querySelector(".header-contacts__phone-number"),q.addEventListener("click",(function(){I.classList.toggle("phone-number-accord-top25"),j.classList.toggle("show-phone-number"),q.classList.toggle("rotate-arrow")})),k=document.querySelector(".popup-dialog-menu"),A=document.querySelector(".popup-repair-types"),C=document.querySelectorAll(".link-list-repair>a"),T=document.querySelector(".popup-consultation"),document.body.addEventListener("click",(function(t){var e=t.target;if(e.matches(".close-menu"))return k.style.top="0",void(k.style.right="0");if(e.classList.contains("close"))e.closest(".popup").classList.toggle("visibility-visible");else if(e.classList.contains("button_wide")&&T.classList.toggle("visibility-visible"),!e.closest(".feedback-wrap")){if(!e.closest(".popup-dialog")){if(e.closest(".popup-menu"))return;if(e.closest(".popup")){if(e.closest(".popup-dialog-transparency"))return;e.closest(".popup").classList.toggle("visibility-visible")}}e.matches(".menu__icon")?window.screen.width>1024?(k.style.right="639px",k.style.top="0"):window.screen.width<1024&&window.screen.width>576?(k.style.right="549px",k.style.top="0"):window.screen.width<576&&(k.style.top="100%",k.style.right="0"):e.closest(".popup-menu")||(k.style.top="0",k.style.right="0")}})),C.forEach((function(t){t.addEventListener("click",(function(){A.classList.toggle("visibility-visible")}))})),k.addEventListener("click",(function(t){var e=t.target;"A"!==e.tagName&&e.closest(".popup-menu")||(k.style.top="0",k.style.right="0"),e.matches(".no-overflow")&&A.classList.toggle("visibility-visible")})),function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"+7 (___) ___-__-__",r=document.querySelectorAll(e);function o(t){var e=t.keyCode,r=n,o=r.replace(/\D/g,""),i=this.value.replace(/\D/g,""),s=0,l=r.replace(/[_\d]/g,(function(t){return s<i.length?i.charAt(s++)||o.charAt(s):t}));-1!==(s=l.indexOf("_"))&&(l=l.slice(0,s));var a=r.substr(0,this.value.length).replace(/_+/g,(function(t){return"\\d{1,"+t.length+"}"})).replace(/[+()]/g,"\\$&");(!(a=new RegExp("^"+a+"$")).test(this.value)||this.value.length<5||e>47&&e<58)&&(this.value=l),"blur"===t.type&&this.value.length<5&&(this.value=""),18!==this.value.length?this.setCustomValidity("Введите номер телефона в формате +7 (***) ***-**-**"):this.setCustomValidity("")}var i,s=t(r);try{for(s.s();!(i=s.n()).done;){var l=i.value;l.addEventListener("input",o),l.addEventListener("focus",o),l.addEventListener("blur",o)}}catch(t){s.e(t)}finally{s.f()}}('input[name="phone"]'),x=document.querySelector(".popup-thank"),(L=document.getElementsByTagName("form"),function(t){if(Array.isArray(t))return n(t)}(L)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(L)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(L)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(t){var e=t.querySelector(".checkbox__input"),n=t.querySelectorAll("input");t.addEventListener("submit",(function(r){r.preventDefault();var o=new FormData(t),i={};o.forEach((function(t,e){i[e]=t})),e.checked&&i.phone&&(i.name||void 0===i.name)?("feedback6"===t.id&&t.closest(".popup").classList.toggle("visibility-visible"),function(t){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}(i).then((function(t){if(200!==t.status)throw new Error("status Network not 200")})).then((function(){x.classList.toggle("visibility-visible"),setTimeout((function(){return x.classList.toggle("visibility-visible")}),3e3),n.forEach((function(t){t.value="",t.checked&&(t.checked=!1)}))})).catch((function(t){alert("При отправки заявки что-то пошло не так, попробуйте ещё раз"),console.error(t)}))):alert("Перед отправкой заявки убедитесь, что вы поставили согласие на обработку личных данных и заполнили все поля")}))})),_=document.querySelectorAll(".link-privacy"),E=document.querySelector(".popup-privacy"),_.forEach((function(t){t.addEventListener("click",(function(){E.classList.toggle("visibility-visible")}))})),document.getElementById("formula").querySelectorAll(".formula-item").forEach((function(t){var e=t.querySelector(".formula-item-popup");t.classList.contains("formula-slider__slide")||(t.addEventListener("mouseover",(function(n){n.target.matches("span")&&(n.target.getBoundingClientRect().y<e.clientHeight?e.classList.add("formula-item-popup-toggle"):e.classList.remove("formula-item-popup-toggle")),n.target.matches("span")&&(t.style="z-index: 2",t.classList.toggle("active-item"))})),t.addEventListener("mouseout",(function(e){e.target.matches("span")&&(t.style="z-index: 1",t.classList.toggle("active-item"))})))})),b=document.querySelector(".formula-slider-wrap"),S=b.querySelectorAll(".formula-slider__slide"),b.addEventListener("click",(function(t){var e=t.target;e.matches(".formula-slider__slide")?e.classList.toggle("active-item"):S.forEach((function(t){t.classList.remove("active-item")}))})),new s({main:".formula-slider-wrap",wrap:".formula-slider",next:"#formula-arrow_right",prev:"#formula-arrow_left",slidesToShow:3,infinity:!0,responsive:[{breakpoint:1025,slidesToShow:1}]}).init(),function(){var t=document.getElementById("repair-types"),e=t.querySelectorAll(".repair-types-slider>div"),n=t.querySelectorAll(".nav-list-repair>button"),r=document.querySelector(".slider-counter-content__current"),o=document.querySelector(".slider-counter-content__total"),i=1;function s(t){var e=document.querySelectorAll(".active>.repair-types-slider__slide");t>e.length&&(i=1),t<1&&(i=e.length);var n,r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw i}}}}(e);try{for(r.s();!(n=r.n()).done;)n.value.style.display="none"}catch(t){r.e(t)}finally{r.f()}e[i-1].style.display="flex"}s(i),o.textContent=e[0].childElementCount,t.addEventListener("click",(function(t){var l=t.target;l.closest(".button_o")&&n.forEach((function(t,s){t===l&&function(t){for(var s=0;s<n.length;s++)t===s?(n[s].classList.add("active"),e[s].style.display="block",e[s].classList.add("active"),i=1,r.textContent=i,o.textContent=e[s].childElementCount):(n[s].classList.remove("active"),e[s].style.display="none",e[s].classList.remove("active"),e[s].childNodes.forEach((function(t){"DIV"===t.tagName&&(t.style.display="none")})),e[s].firstElementChild.style.display="flex")}(s)})),l.closest("#repair-types-arrow_right")?e.forEach((function(t){t.classList.contains("active")&&(s(i+=1),r.textContent=i)})):l.closest("#repair-types-arrow_left")&&e.forEach((function(t){t.classList.contains("active")&&(s(i-=1),r.textContent=i)}))}))}(),function(){var t=new s({main:".portfolio-slider-wrap",wrap:".portfolio-slider.mobile-hide",next:"#portfolio-arrow_right",prev:"#portfolio-arrow_left",slidesToShow:3,infinity:!1,responsive:[{breakpoint:1025,slidesToShow:2},{breakpoint:900,slidesToShow:1}]}),e=new s({main:".portfolio-slider-wrap",wrap:".portfolio-slider-mobile",next:"#portfolio-arrow-mobile_right",prev:"#portfolio-arrow-mobile_left",slidesToShow:3,infinity:!0,responsive:[{breakpoint:576,slidesToShow:1},{breakpoint:320,slidesToShow:1}]}),n=document.getElementById("portfolio-arrow_right"),r=document.getElementById("portfolio-arrow_left"),o=document.querySelector("#portfolio-arrow-mobile_right"),i=document.querySelector("#portfolio-arrow-mobile_left"),l=document.getElementById("portfolio-counter"),a=l.querySelector(".slider-counter-content__current"),v=l.querySelector(".slider-counter-content__total"),g=document.querySelector(".transparency-slider"),w=document.querySelector(".portfolio-slider"),b=document.querySelector(".portfolio-slider-mobile"),S=function(){a.textContent=e.options.position+1},_=function(){a.textContent=t.options.position+1,t.options.position===+v.textContent-1?(n.classList.add("non-visible"),n.classList.remove("visibility-visible")):t.options.position!==+v.textContent-1&&(n.classList.remove("non-visible"),n.classList.add("visibility-visible")),1===t.options.position?(r.classList.add("visibility-visible"),r.classList.remove("non-visible")):0===t.options.position&&(r.classList.remove("visibility-visible"),r.classList.add("non-visible"))};window.addEventListener("resize",(function(){window.innerWidth<576?(b.style="display: flex !important",w.style="display: none !important",n.style="display: none",r.style="display: none",a.textContent=e.options.position+1,v.textContent=e.slides.length,o.addEventListener("click",S),i.addEventListener("click",S),n.removeEventListener("click",_),r.removeEventListener("click",_)):(n.style="display: flex",b.style="display: none !important",w.style="display: flex !important",o.removeEventListener("click",S),i.removeEventListener("click",S),n.addEventListener("click",_),r.addEventListener("click",_),v.textContent=t.slides.length-t.slidesToShow+1,g.style="transform: translateX(0%)")})),e.init(),t.init(),window.innerWidth<576?(b.parentElement.classList.add("glo-slider2"),b.style="display: flex !important",w.style="display: none !important",n.style="display: none",r.style="display: none",a.textContent=e.options.position+1,v.textContent=e.slides.length,o.addEventListener("click",S),i.addEventListener("click",S),n.removeEventListener("click",_),r.removeEventListener("click",_)):(w.parentElement.classList.add("glo-slider2"),n.style="display: flex",b.style="display: none !important",w.style="display: flex !important",a.textContent=t.options.position+1,v.textContent=t.slides.length-t.slidesToShow+1,o.removeEventListener("click",S),i.removeEventListener("click",S),n.addEventListener("click",_),r.addEventListener("click",_),g.style="transform: translateX(0%)");var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(s,t);var e,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(r);if(o){var n=m(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return h(this,t)});function s(){p(this,s);for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return i.call.apply(i,[this].concat(e))}return e=s,(n=[{key:"init",value:function(){this.addGloClass(),this.prev&&this.next,this.controlSlider(),this.responsive&&this.responseInit()}},{key:"addGloClass",value:function(){this.main.classList.add("glo-slider3"),this.wrap.classList.add("glo-slider__wrap");var t,e=c(this.slides);try{for(e.s();!(t=e.n()).done;)t.value.classList.add("glo-slider__item2")}catch(t){e.e(t)}finally{e.f()}}},{key:"responseInit",value:function(){var t,e=this,n=this.slidesToShow,r=this.responsive.map((function(t){return t.breakpoint})),o=Math.max.apply(Math,function(t){if(Array.isArray(t))return d(t)}(t=r)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||u(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=function(){var t=document.documentElement.clientWidth;if(t<o)for(var i=0;i<r.length;i++)t<r[i]&&(e.slidesToShow=e.responsive[i].slidesToShow,e.options.widthSlide=Math.floor(100/e.slidesToShow));else e.slidesToShow=n,e.options.widthSlide=Math.floor(100/e.slidesToShow)};i(),window.addEventListener("resize",i)}}])&&f(e.prototype,n),s}(s),L=document.querySelector(".portfolio-slider-wrap"),x=document.querySelector(".popup-portfolio"),k=new E({main:".popup-portfolio-slider-wrap",wrap:".popup-portfolio-slider",next:"#popup_portfolio_right",prev:"#popup_portfolio_left",slidesToShow:1,infinity:!0}),A=document.querySelectorAll(".popup-portfolio-text"),C=document.getElementById("popup_portfolio_left"),T=document.getElementById("popup_portfolio_right"),q=document.getElementById("popup-portfolio-counter"),I=q.querySelector(".slider-counter-content__current"),j=q.querySelector(".slider-counter-content__total");k.init(),j.textContent=k.slides.length,L.addEventListener("click",(function(t){var e=t.target;e.matches(".portfolio-slider__slide-frame")&&(x.classList.toggle("visibility-visible"),k.options.position=+e.children[0].alt.slice(-1),k.wrap.style.transform="translateX(-".concat(k.options.position*k.options.widthSlide,"%)"),I.textContent=k.options.position+1)}));var O=function(){!function(t){for(var e=0;e<A.length;e++)A[e].style.display=t===e?"flex":"none"}(k.options.position),I.textContent=k.options.position+1};C.addEventListener("click",O),T.addEventListener("click",O);var B=new E({main:".transparency-slider-wrap",wrap:".transparency-slider.row",next:"#transparency-arrow_right",prev:"#transparency-arrow_left",slidesToShow:1,infinity:!0}),M=document.getElementById("transparency_left"),N=document.getElementById("transparency_right"),X=document.getElementById("transparency-popup-counter"),$=X.querySelector(".slider-counter-content__current"),P=X.querySelector(".slider-counter-content__total"),R=document.querySelectorAll(".popup-transparency-slider__slide");B.init(),new E({main:".reviews-slider-wrap",wrap:".reviews-slider",next:"#reviews-arrow_right",prev:"#reviews-arrow_left",slidesToShow:1,infinity:!0}).init();var U=document.getElementById("transparency"),z=document.querySelector(".popup-transparency"),W=1;function D(t){var e=document.querySelectorAll(".popup-transparency-slider__slide");P.textContent=e.length,t>e.length&&(W=1),t<1&&(W=e.length);var n,r=c(e);try{for(r.s();!(n=r.n()).done;)n.value.style.display="none"}catch(t){r.e(t)}finally{r.f()}e[W-1].style.display="flex"}D(W),U.addEventListener("click",(function(t){var e=t.target;e.matches(".transparency-item__img")&&(z.classList.toggle("visibility-visible"),"Договор"===e.parentElement.childNodes[3].innerText?(W=1,$.textContent=1,R[0].style.display="flex",R[1].style.display="none",R[2].style.display="none"):"Смета"===e.parentElement.childNodes[3].innerText?(W=2,$.textContent=2,R[1].style.display="flex",R[0].style.display="none",R[2].style.display="none"):"График платежей"===e.parentElement.childNodes[3].innerText&&(W=3,$.textContent=3,R[2].style.display="flex",R[1].style.display="none",R[0].style.display="none"))})),M.addEventListener("click",(function(){D(W-=1),$.textContent=W})),N.addEventListener("click",(function(){D(W+=1),$.textContent=W})),$.textContent=1}(),(w=document.querySelector(".accordion>ul")).addEventListener("click",(function(t){if(t.target.matches(".title_block")){var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){l=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw i}}}}(w.children);try{for(n.s();!(e=n.n()).done;)e.value.firstElementChild.classList.remove("msg-active")}catch(t){n.e(t)}finally{n.f()}t.target.classList.add("msg-active")}})),function(){var t=document.querySelector(".popup-repair-types"),e=document.querySelectorAll(".button_o"),n=document.getElementById("switch-inner"),r=document.querySelector(".popup-repair-types-content-table__list"),o=document.querySelector(".nav-list-popup-repair"),i=document.querySelector(".nav-list-repair");t.addEventListener("click",(function(t){var o=t.target;if(o.matches(".popup-repair-types-nav__item")){r.innerHTML="";var i,s=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){l=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw i}}}}(e);try{for(s.s();!(i=s.n()).done;)i.value.classList.remove("active")}catch(t){s.e(t)}finally{s.f()}o.classList.add("active"),n.textContent=o.textContent,fetch(location.origin+"/crm-backend/db.json").then((function(t){if(200!==t.status)throw new Error("status Network NOT 200");return t.json()})).then((function(t){t.forEach((function(t){t.type===o.textContent&&function(t){var e=t.name,n=t.cost,o=document.createElement("tbody"),i=document.createElement("tr");i.classList.add("mobile-row"),i.innerHTML='\n        <td class="repair-types-name">'.concat(e,'</td>\n        <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>\n        <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>\n        <td class="repair-types-value">м<sup>2</sup></td>\n        <td class="repair-types-value">').concat(n,"</td>\n      "),o.insertAdjacentElement("beforeend",i),r.appendChild(o)}(t)}))})).catch((function(t){return console.error(t)}))}}));var l=new s({main:".nav-wrap-repair",wrap:".nav-list-popup-repair",next:"#nav-arrow-popup-repair_right",prev:"#nav-arrow-popup-repair_left",slidesToShow:3,infinity:!0,responsive:[{breakpoint:1025,slidesToShow:1},{breakpoint:576,slidesToShow:1}]}),a=new s({main:".nav-wrap-repair",wrap:".nav-list-repair",next:"#nav-arrow-repair-right_base",prev:"#nav-arrow-repair-left_base",slidesToShow:3,infinity:!0,responsive:[{breakpoint:1025,slidesToShow:1},{breakpoint:576,slidesToShow:1}]});window.addEventListener("resize",(function(){window.innerWidth>=1025?(e.forEach((function(t){t.classList.remove("glo-slider__item")})),o.classList.remove("glo-slider__wrap"),o.style="transform: translateX(0);",i.style="transform: translateX(0%)",i.classList.remove("glo-slider__wrap")):(e.forEach((function(t){t.classList.add("glo-slider__item")})),o.classList.add("glo-slider__wrap"))})),l.init(),a.init(),window.innerWidth>=1025?(e.forEach((function(t){t.classList.remove("glo-slider__item")})),o.classList.remove("glo-slider__wrap"),o.style="transform: translateX(0);",i.style="transform: translateX(0%)",i.classList.remove("glo-slider__wrap")):(e.forEach((function(t){t.classList.add("glo-slider__item")})),o.classList.add("glo-slider__wrap"))}()})();