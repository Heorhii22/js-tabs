const tabContent = document.querySelectorAll(".tabcontent"),
  tabParent = document.querySelector(".tabheader__items"),
  tabItem = document.querySelectorAll(".tabheader__item");

function hideTabContent() {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabItem.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
}

function showTabContent(i = 0) {
  tabContent[i].style.display = "block";
  tabItem[i].classList.add("tabheader__item_active");
}

hideTabContent();
showTabContent();

tabParent.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target);
  if (target && target.classList.contains("tabheader__item")) {
    tabItem.forEach((item, i) => {
      if (target === item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

// Timer

const deadline = "2024-05-20";

function endTimerCount(enddate) {
  const timer = Date.parse(enddate) - new Date();
  const days = Math.floor(timer / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timer / (1000 * 60)) % 60);
  const seconds = Math.floor((timer / 1000) % 60);

  return {
    total: timer,
    days,
    seconds,
    hours,
    minutes,
  };
}

function getFormatedTime(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setTimer(endtime) {
  const timer = document.querySelector(".timer"),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds");

  const timeInterval = setInterval(updateTimer, 1000);
  updateTimer();

  function updateTimer() {
    const time = endTimerCount(endtime);
    days.innerHTML = getFormatedTime(time.days);
    hours.innerHTML = getFormatedTime(time.hours);
    minutes.innerHTML = getFormatedTime(time.minutes);
    seconds.innerHTML = getFormatedTime(time.seconds);

    if (time.total <= 0) {
      clearInterval(timeInterval);
      days.innerHTML = 0;
      hours.innerHTML = 0;
      minutes.innerHTML = 0;
      seconds.innerHTML = 0;
    }
  }
}

setTimer(deadline);

// Modal
const modal = document.querySelector(".modal");
const btn = document.querySelectorAll(".btn");
const modalCloseBtn = document.querySelector(".modal__close");

btn.forEach((element) => {
  if (element.hasAttribute("data-modal")) {
    element.addEventListener("click", openModal);
  }
});

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);
}

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll() {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
}

window.addEventListener("scroll", showModalByScroll);

// Создаем шаблоны для меня на карточках сайта

class Menu {
  constructor(image, alt, title, description, price, selector, ...classes) {
    this.image = image;
    this.alt = alt;
    this.title = title;
    this.description = description;
    this.price = price;
    this.selector = document.querySelector(selector);
    this.classes = classes;
  }

  createMenuCard() {
    const newCard = document.createElement("div");
    if (this.classes.length === 0) {
      this.classes = 'menu__item'
      newCard.classList.add(this.classes)
    } else {
      this.classes.forEach((className) => newCard.classList.add(className));
    }

   
    newCard.innerHTML = `<img src=${this.image} alt=${this.alt} />
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">
      ${this.description}
    </div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>`;

    this.selector.append(newCard);
  }
}

new Menu(
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Этоабсолютно новый продукт с оптимальной ценой и высоким качеством!',
  229,
  ".menu .container",
  "menu__item",
  "big"
).createMenuCard();

new Menu(
  "img/tabs/elite.jpg",
  "elite",
  "Меню “Премиум”",
  "В меню “Премиум” мы используем не только красивый дизайн упаковки,но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  550,
  ".menu .container",
  "menu__item"
).createMenuCard();

new Menu(
  "img/tabs/post.jpg",
  "post",
  'Меню "Постное"',
  "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  430,
  ".menu .container",
  "menu__item"
).createMenuCard();


// Slider js доработанная более сложная версия
const slides = document.querySelectorAll('.offer__slide')
const sliderImg = document.querySelectorAll('.offer__slide img')
const nextSlideBtn = document.querySelector('.offer__slider-next')
const prevSlideBtn = document.querySelector('.offer__slider-prev')
const sliderCounter = document.querySelector('.offer__slider-counter span')
const slidesWrapper = document.querySelector('.offer__slider-wrapper')
const slidesField = document.querySelector('.offer__slider-inner')
const width = window.getComputedStyle(slidesWrapper).width
const currentSlideNum = document.querySelector('#current')
const totalSlideNum = document.querySelector('#total')

let slideIndex = 1
let offset = 0


if (slides.length < 10) {
  totalSlideNum.textContent = `0${slides.length}`
  currentSlideNum.textContent = `0${slideIndex}`
} else {
  totalSlideNum.textContent = slides.length
  currentSlideNum.textContent = slideIndex
}

slides.forEach(slide => slide.style.width = width)

slidesField.style.width = 100 * slides.length + '%'
slidesField.style.display = 'flex'
slidesField.style.transition = '0.5s all'

slidesWrapper.style.overflow = 'hidden'

nextSlideBtn.addEventListener('click', () => {
  if (offset == +width.slice(0, width.length - 2) * (slides.length -1)) {
    offset = 0
  } else {
    offset += +width.slice(0, width.length - 2)
  }

  slidesField.style.transform = `translateX(-${offset}px)`

  if (slideIndex === slides.length) {
    slideIndex = 1
  } else {
    slideIndex++
  }

  if (slides.length < 10) {
    currentSlideNum.textContent = `0${slideIndex}`
  } else {
    currentSlideNum.textContent = slideIndex
  }
  
})

prevSlideBtn.addEventListener('click', () => {
  if (offset == 0) {
    offset = +width.slice(0, width.length - 2) * (slides.length -1)
  } else {
    offset -= +width.slice(0, width.length - 2)
  }

  slidesField.style.transform = `translateX(-${offset}px)`

  if (slideIndex === 1) {
    slideIndex = slides.length
  } else {
    slideIndex--
  }
  
  if (slides.length < 10) {
    currentSlideNum.textContent = `0${slideIndex}`
  } else {
    currentSlideNum.textContent = slideIndex
  }
  
})


// showSlides(slideIndex)

// function showSlides(index) {
//   if (index > sliderBox.length) {
//     slideIndex = 1
//   }

//   if (index < 1) {
//     slideIndex = sliderBox.length

//   }

//   sliderBox.forEach(slide => slide.style.display = 'none')
//   sliderBox[slideIndex - 1].style.display = 'block'
  
//   if (slideIndex < 10) {
//     sliderCounter.innerHTML = '0' + slideIndex
//   }
  
// }

//   function nextSlide(index) {
//     showSlides(slideIndex += index)
//   }

//   function prevSlide(index) {
//     showSlides(slideIndex += index)
//   }

//   nextSlideBtn.addEventListener('click', () => {
//     nextSlide(1)
//   })

//   prevSlideBtn.addEventListener('click', () => {
//     prevSlide(-1)
//   })


