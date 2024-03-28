const tabContent = document.querySelectorAll('.tabcontent'),
tabParent = document.querySelector('.tabheader__items'),
tabItem = document.querySelectorAll('.tabheader__item');

function hideTabContent() {
    tabContent.forEach(item  => {
        item.style.display = 'none'
    })
    tabItem.forEach(item => {
        item.classList.remove('tabheader__item_active')
    })
}

function showTabContent(i = 0) {
    tabContent[i].style.display = 'block'
    tabItem[i].classList.add('tabheader__item_active')
}

hideTabContent();
showTabContent();

tabParent.addEventListener('click', (e) => {
    const target = e.target
    console.log(target)
    if (target && target.classList.contains('tabheader__item')) {
        tabItem.forEach((item, i) => {
            if (target === item) {
                hideTabContent();
                showTabContent(i)
            }
        })
    }
})
