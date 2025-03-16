// Получаем элементы DOM
const authModal = document.getElementById('auth-modal'); // Модальное окно авторизации
const authRegisterModal = document.getElementById('auth-register-modal'); // Модальное окно регистрации
const authButton = document.getElementById('authButton'); // Кнопка "Авторизация"
const logoutButton = document.getElementById('logoutButton'); // Кнопка "Выйти"
const authShowRegisterForm = document.getElementById('auth-show-register-form'); // Кнопка "Зарегистрироваться"
const authShowLoginForm = document.getElementById('auth-show-login-form'); // Кнопка "Уже есть аккаунт? Войти"
const authCloseButtons = document.querySelectorAll('.auth-modal-close'); // Кнопки закрытия (крестики)

// Функция для открытия модального окна авторизации
function openAuthModal() {
  authModal.style.display = 'block';
}

// Функция для открытия модального окна регистрации
function openAuthRegisterModal() {
  authRegisterModal.style.display = 'block';
}

// Функция для закрытия модальных окон
function closeAuthModal() {
  authModal.style.display = 'none';
  authRegisterModal.style.display = 'none';
}

// Функция для обновления интерфейса после авторизации
function updateUIAfterLogin(userName) {
  authButton.innerText = userName; // Меняем текст кнопки на имя пользователя
  logoutButton.style.display = 'inline-block'; // Показываем кнопку "Выйти"
}

// Функция для обновления интерфейса после выхода
function updateUIAfterLogout() {
  authButton.innerText = 'Авторизация'; // Возвращаем текст кнопки
  logoutButton.style.display = 'none'; // Скрываем кнопку "Выйти"
}

// Открываем модальное окно авторизации при нажатии на кнопку "Авторизация"
authButton.addEventListener('click', openAuthModal);

// Переключаемся на окно регистрации при нажатии на кнопку "Зарегистрироваться"
authShowRegisterForm.addEventListener('click', () => {
  authModal.style.display = 'none'; // Закрываем окно авторизации
  openAuthRegisterModal(); // Открываем окно регистрации
});

// Переключаемся на окно авторизации при нажатии на кнопку "Уже есть аккаунт? Войти"
authShowLoginForm.addEventListener('click', () => {
  authRegisterModal.style.display = 'none'; // Закрываем окно регистрации
  openAuthModal(); // Открываем окно авторизации
});

// Закрываем модальные окна при нажатии на крестик
authCloseButtons.forEach(button => {
  button.addEventListener('click', closeAuthModal);
});

// Закрываем модальные окна при клике вне их области
window.addEventListener('click', (event) => {
  if (event.target === authModal || event.target === authRegisterModal) {
    closeAuthModal();
  }
});

// Обработка формы авторизации
document.getElementById('auth-login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы
  const formData = new FormData(this); // Собираем данные формы

  // Отправляем данные на сервер
  fetch('login.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Ошибка сервера: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      alert('Авторизация успешна');
      closeAuthModal(); // Закрываем модальное окно
      updateUIAfterLogin(data.userName); // Обновляем интерфейс
    } else {
      alert(data.message || 'Ошибка авторизации');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при авторизации');
  });
});

// Обработка формы регистрации
document.getElementById('auth-register-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы
  const formData = new FormData(this); // Собираем данные формы

  // Отправляем данные на сервер
  fetch('register.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Ошибка сервера: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      alert('Регистрация успешна');
      closeAuthModal(); // Закрываем модальное окно
    } else {
      alert(data.message || 'Ошибка регистрации');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при регистрации');
  });
});

// Обработка кнопки "Выйти"
logoutButton.addEventListener('click', function() {
  // Отправляем запрос на выход
  fetch('logout.php', {
    method: 'POST'
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Ошибка сервера: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      alert('Вы успешно вышли из системы');
      updateUIAfterLogout(); // Обновляем интерфейс
    } else {
      alert(data.message || 'Ошибка при выходе из системы');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при выходе из системы');
  });
});

// Проверяем, авторизован ли пользователь при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  fetch('check-auth.php', {
    method: 'POST'
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Ошибка сервера: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      updateUIAfterLogin(data.userName); // Обновляем интерфейс
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
});

// Функция для переключения видимости пароля
document.getElementById('toggle-password').addEventListener('click', function() {
  const passwordInput = document.getElementById('auth-register-password');
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.textContent = 'Скрыть';
  } else {
      passwordInput.type = 'password';
      this.textContent = 'Показать';
  }
});