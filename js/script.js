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

const deadline = "2024-04-20";

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
