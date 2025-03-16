<?php
session_start(); // Начинаем сессию
header('Content-Type: application/json'); // Указываем, что возвращаем JSON

// Уничтожаем сессию
session_destroy();

// Возвращаем успешный ответ
echo json_encode(['success' => true]);
?>