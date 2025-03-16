<?php
session_start(); // Начинаем сессию
header('Content-Type: application/json'); // Указываем, что возвращаем JSON

if (isset($_SESSION['user_id'])) {
  // Пользователь авторизован
  echo json_encode(['success' => true, 'userName' => $_SESSION['user_name']]);
} else {
  // Пользователь не авторизован
  echo json_encode(['success' => false]);
}
?>