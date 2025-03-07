document.addEventListener('DOMContentLoaded', () => {
    // Функция для плавной прокрутки к секциям
    const scrollToSection = (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение ссылки

        const targetId = event.target.getAttribute('href').slice(1); // Получаем id секции
        const targetElement = document.getElementById(targetId); // Находим DOM элемент с этим id

        if (targetElement) {
            // Плавно прокручиваем страницу к найденной секции
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Учитываем смещение для корректного центрирования
                behavior: 'smooth' // Включаем плавную прокрутку
            });

            // Добавляем анимацию при переходе
            targetElement.classList.add('enter');
            setTimeout(() => targetElement.classList.remove('enter'), 1000); // Убираем класс после анимации
        }
    };

    // Находим все элементы меню
    const menuItems = document.querySelectorAll('.menu-item');

    // Добавляем обработчик события на каждый элемент меню
    menuItems.forEach(item => {
        item.addEventListener('click', scrollToSection); // Вешаем обработчик на клик
    });

    const menuButton = document.querySelector('.menu-open-button');
    let timer, removeInterval, removedCount = 0;

    // Функция для сброса состояния скрытия элементов
    function resetMenu() {
        clearTimeout(timer);
        clearInterval(removeInterval);
        removedCount = 0;

        menuItems.forEach(item => {
            item.classList.remove('hidden');
        });
    }

    // Обработчик для события при наведении мышки на меню
    menuButton.addEventListener('mouseenter', () => {
        resetMenu(); // Сбрасываем скрытие элементов

        // Таймер перед началом анимации
        timer = setTimeout(() => {
            removeInterval = setInterval(() => {
                if (removedCount < menuItems.length) {
                    menuItems[removedCount].classList.add('hidden');
                    removedCount++;
                } else {
                    clearInterval(removeInterval);
                }
            }, 5000); // Задержка 5 секунд между скрытием каждого элемента
        }, 3000); // Задержка 3 секунды перед началом анимации
    });

    // Обработчик для события при уходе мышки с кнопки меню
    menuButton.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        clearInterval(removeInterval);

        // Возвращаем элементы в исходное состояние
        menuItems.forEach(item => {
            item.classList.remove('hidden');
        });
    });

    // Плавный переход между секциями
    const sections = document.querySelectorAll('.section');

    // Добавляем анимацию при переходе между секциями
    sections.forEach((section) => {
        section.classList.add('enter'); // Добавляем анимацию при загрузке страницы
    });

    // Добавление анимации для перехода секций при прокрутке
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                section.classList.add('enter');
            } else {
                section.classList.remove('enter');
            }
        });
    });

    // Анимация появления секций
    const scrollToSectionOnClick = (event) => {
        const targetId = event.target.getAttribute('href').slice(1); // Получаем id секции
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.classList.add('enter');
            setTimeout(() => targetElement.classList.remove('enter'), 1000); // Убираем класс после анимации
        }
    };
});
