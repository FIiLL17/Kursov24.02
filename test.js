const video = document.getElementById('bg-video');

video.addEventListener('timeupdate', function() {
    // Если видео接近конца (например, последние 0.5 секунды), начинаем плавное исчезновение
    if (video.currentTime >= video.duration - 0.5) {
        video.style.opacity = '0'; // Плавно исчезает
        setTimeout(() => {
            video.currentTime = 0; // Перезапуск видео
            video.style.opacity = '1'; // Плавно появляется
        }, 1000); // Задержка для плавного перехода
    }
});