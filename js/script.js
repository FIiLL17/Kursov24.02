const addReviewBtn = document.getElementById('add-review-btn');
const reviewForm = document.getElementById('review-form');
const reviewTextarea = document.getElementById('review-textarea');
const submitReviewBtn = document.getElementById('submit-review-btn');
const viewAllReviewsBtn = document.getElementById('view-all-reviews-btn');
const allReviewsModal = document.getElementById('all-reviews-modal');
const allReviewsList = document.getElementById('all-reviews-list');
const closeModal = allReviewsModal.querySelector('.close'); // Исправленный выбор крестика

// Статичные отзывы
let allReviews = [
    {
        username: 'Иван Иванов',
        text: 'Отличный ЖК-дисплей! Цвета яркие, углы обзора широкие. Рекомендую для работы и игр.',
        date: '10 октября 2023'
    },
    {
        username: 'Мария Петрова',
        text: 'Купила ЖК-монитор для дома. Качество изображения на высоте, никаких битых пикселей.',
        date: '5 октября 2023'
    },
    {
        username: 'Алексей Смирнов',
        text: 'Отличное качество! Рекомендуется для профессионалов, работающих с графикой.',
        date: '15 сентября 2023'
    },
    {
        username: 'Анна Кузнецова',
        text: 'Я в восторге от этого экрана! Яркие цвета, отличное разрешение, всегда была довольна.',
        date: '1 сентября 2023'
    }
];

// Функция для отображения всех отзывов
function showAllReviews() {
    allReviewsList.innerHTML = '';
    allReviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="user-info">
                <img src="images/avatar.png" alt="Аватар" class="avatar">
                <div>
                    <span class="username">${review.username}</span>
                    <span class="date">${review.date}</span>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        allReviewsList.appendChild(reviewDiv);
    });
}

// Открытие модального окна при нажатии на "Просмотреть все отзывы"
viewAllReviewsBtn.addEventListener('click', () => {
    allReviewsModal.style.display = 'block';
    showAllReviews();
});

// Закрытие модального окна при нажатии на крестик
if (closeModal) {
    closeModal.addEventListener('click', () => {
        console.log('Крестик нажат!'); // Отладочное сообщение
        allReviewsModal.style.display = 'none';
    });
}

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (event) => {
    if (event.target === allReviewsModal) {
        allReviewsModal.style.display = 'none';
    }
});

// Открытие/закрытие формы для написания отзыва
addReviewBtn.addEventListener('click', () => {
    reviewForm.style.display = reviewForm.style.display === 'block' ? 'none' : 'block';
});

// Отправка нового отзыва
submitReviewBtn.addEventListener('click', () => {
    const newReviewText = reviewTextarea.value.trim();
    if (newReviewText) {
        const newReview = {
            username: 'Новый пользователь',
            text: newReviewText,
            date: new Date().toLocaleDateString()
        };
        allReviews.push(newReview);
        showAllReviews();
        reviewTextarea.value = '';
        reviewForm.style.display = 'none';
    }
});