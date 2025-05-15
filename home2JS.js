var swiper = new Swiper('.swiper-container', {  
    autoplay: {  
        delay: 3000,  
        disableOnInteraction: false,  
    },
    
    pagination: {  
        el: '.swiper-pagination',  
        type: 'fraction',  
        clickable: true,  
    },

    navigation: {  
        nextEl: '.swiper-button-next',  
        prevEl: '.swiper-button-prev',  
    },
    
    allowTouchMove: false,  

    on: {  
        init: function() {  
            var prevButton = document.querySelector('.swiper-button-prev');  
            var nextButton = document.querySelector('.swiper-button-next');  
            
            prevButton.style.left = '10px';  
            nextButton.style.right = '10px';  
            
            prevButton.style.top = '50%';  
            prevButton.style.transform = 'translateY(-50%)';  
            
            nextButton.style.top = '50%';  
            nextButton.style.transform = 'translateY(-50%)';  
            
            document.querySelector('.swiper-pagination').style.bottom = '10px';  
        },
    },
});





document.querySelector('.category-container .category-item:nth-child(1)').addEventListener('click', function() {  
    window.location.href = 'pie.html';  
});

document.querySelector('.category-container .category-item:nth-child(2)').addEventListener('click', function() {  
    window.location.href = 'cake.html';  
});

document.querySelector('.category-container .category-item:nth-child(3)').addEventListener('click', function() {  
    window.location.href = 'ice.html';  
});

document.querySelector('.category-container .category-item:nth-child(4)').addEventListener('click', function() {  
    window.location.href = 'candy.html';  
});

document.querySelector('.category-container .category-item:nth-child(5)').addEventListener('click', function() {  
    window.location.href = 'cookies.html';  
});

document.querySelector('.category-container .category-item:nth-child(6)').addEventListener('click', function() {  
    window.location.href = 'drink.html';  
});





// Функція для пошуку збігу тексту, введенний в пошуковий рядок
// Додаємо подію на форму пошуку
// Зупиняємо стандартну поведінку форми при її відправці
document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Зупиняємо стандартну дію форми (не відправляти форму)
    
    // Отримуємо текст, введений у полі для пошуку, і обрізаємо зайві пробіли з обох сторін
    const searchText = document.querySelector('.search-input').value.trim();  
    
    // Якщо текст для пошуку не порожній, викликаємо функцію для виділення знайденого тексту
    if (searchText) {
        highlightTextSelection(searchText);  // Викликаємо функцію для виділення знайденого тексту
    }
});





// Функція для виділення знайденого тексту на сторінці
function highlightTextSelection(text) {
    // Очищаємо попередні виділення тексту
    window.getSelection().removeAllRanges();

    // Створюємо "перехідник" по всіх текстових вузлах сторінки
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    
    // Перетворюємо шуканий текст на нижній регістр для порівняння
    const lowerText = text.toLowerCase();

    // Пройдемо всі текстові вузли в документі
    while ((node = walker.nextNode())) {
        const nodeText = node.nodeValue.toLowerCase();  // Отримуємо текст поточного вузла
        const index = nodeText.indexOf(lowerText);  // Шукаємо позицію тексту в вузлі

        // Якщо знайдено збіг, виділяємо цей текст
        if (index !== -1) {
            const range = document.createRange();  // Створюємо діапазон для виділення
            range.setStart(node, index);  // Початок виділення
            range.setEnd(node, index + text.length);  // Кінець виділення

            const selection = window.getSelection();
            selection.removeAllRanges();  // Очищаємо попереднє виділення
            selection.addRange(range);  // Додаємо новий діапазон для виділення

            // Прокручуємо сторінку до знайденого збігу
            range.startContainer.parentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;  // Завершуємо після першого знайденого збігу
        }
    }
    
    // Якщо збігів не знайдено, сповіщаємо користувача
    alert('Збігів не знайдено');
}




























// Налаштування автоматичного натискання на стрілки кожні 3 секунди
let moveForward = true; // Початковий напрямок перемикання
let autoSlideInterval; // Перемінна для зберігання інтервалу автоматичного переміщення
let isMouseOver = false; // Чи наведено курсор на слайдер
let isArrowClicked = false; // Чи натиснуто на стрілку

// Функція для запуску автоматичного переміщення
function startAutoSlide() {
    clearInterval(autoSlideInterval); // Очищуємо попередній інтервал

    // Запускаємо автоматичне перемикання, якщо курсор не наведено і не натиснуто стрілки
    if (!isMouseOver && !isArrowClicked) {
        autoSlideInterval = setInterval(() => {
            const nextButton = document.querySelector('#custom-slider .swiper-button-next');
            const prevButton = document.querySelector('#custom-slider .swiper-button-prev');

            if (moveForward) {
                nextButton.click(); // Натискаємо на праву стрілку
                if (nextButton.classList.contains('swiper-button-disabled')) {
                    moveForward = false; // Зміна напрямку на назад
                }
            } else {
                prevButton.click(); // Натискаємо на ліву стрілку
                if (prevButton.classList.contains('swiper-button-disabled')) {
                    moveForward = true; // Зміна напрямку на вперед
                }
            }
        }, 2000); // Перемикання кожні 2 секунди
    }
}

// Функція для зупинки автоматичного переміщення
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Відслідковуємо наведення курсора на слайдер
document.querySelector('#custom-slider').addEventListener('mouseenter', () => {
    isMouseOver = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
});

document.querySelector('#custom-slider').addEventListener('mouseleave', () => {
    isMouseOver = false;
    setTimeout(startAutoSlide, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

// Відслідковуємо натискання на стрілки
document.querySelector('#custom-slider .swiper-button-next').addEventListener('click', () => {
    isArrowClicked = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
    setTimeout(() => {
        isArrowClicked = false;
        startAutoSlide();
    }, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

document.querySelector('#custom-slider .swiper-button-prev').addEventListener('click', () => {
    isArrowClicked = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
    setTimeout(() => {
        isArrowClicked = false;
        startAutoSlide();
    }, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

// Запускаємо автоматичне переміщення при завантаженні
startAutoSlide();
















