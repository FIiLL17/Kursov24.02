<?php
session_start();
header('Content-Type: application/json');
error_reporting(E_ALL); // Включаем вывод всех ошибок
ini_set('display_errors', 1); // Показываем ошибки на экране

// Проверяем, что запрос отправлен методом POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Метод запроса не POST']);
    exit;
}

require_once("link.php");

// Получаем данные из формы
$number = $_POST['loginNumber'] ?? '';
$password = $_POST['loginPassword'] ?? '';

if (empty($number) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Номер телефона и пароль обязательны']);
    exit;
}

// Ищем пользователя в базе данных
$sql = "SELECT * FROM users WHERE number_user = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
    exit;
}
$stmt->bind_param('s', $number);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Проверяем пароль (без хэширования)
    if ($password === $user['password_user']) {
        // Успешная авторизация
        $_SESSION['user_id'] = $user['id_user'];
        $_SESSION['user_name'] = $user['name_user'];
        echo json_encode(['success' => true, 'userName' => $user['name_user']]);
    } else {
        // Неверный пароль
        echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
    }
} else {
    // Пользователь не найден
    echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
}

$stmt->close();
$conn->close();
?>