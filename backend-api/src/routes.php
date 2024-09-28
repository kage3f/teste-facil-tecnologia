<?php
require_once 'database.php';

// Função para verificar se as tabelas existem
function checkIfTablesExist($pdo) {
    $stmt = $pdo->prepare("SELECT to_regclass('public.users')");
    $stmt->execute();
    return $stmt->fetchColumn();
}

// Rodar migrações se as tabelas ainda não existirem
if (!checkIfTablesExist($pdo)) {
    require_once 'migrations.php';
}

// Carregar Controladores
// Carregar Controladores
require_once __DIR__ . '/controllers/AuthController.php';  // Caminho correto para AuthController
require_once __DIR__ . '/controllers/UserController.php';  // Caminho correto para UserController
require_once __DIR__ . '/controllers/ContractController.php';  // Caminho correto para ContractController

// Instanciar os Controladores
$authController = new AuthController($pdo);
$userController = new UserController($pdo);
$contractController = new ContractController($pdo);

// Obter a URI e o método da requisição
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Rotas de autenticação
if ($requestUri == '/login' && $requestMethod == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode($authController->login($data['username'], $data['password']));
}

// Rotas de usuários
elseif ($requestUri == '/users' && $requestMethod == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode($userController->createUser($data['username'], $data['password'], $data['role']));
}

elseif ($requestUri == '/users' && $requestMethod == 'GET') {
    echo json_encode($userController->listUsers());
}

elseif (preg_match('/\/users\/(\d+)/', $requestUri, $matches) && $requestMethod == 'GET') {
    $userId = $matches[1];
    echo json_encode($userController->getUserById($userId));
}

elseif (preg_match('/\/users\/(\d+)/', $requestUri, $matches) && $requestMethod == 'PUT') {
    $userId = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode($userController->updateUser($userId, $data['username'], $data['password'], $data['role']));
}

elseif (preg_match('/\/users\/(\d+)/', $requestUri, $matches) && $requestMethod == 'DELETE') {
    $userId = $matches[1];
    echo json_encode($userController->deleteUser($userId));
}

// Rotas de contratos
elseif ($requestUri == '/contracts' && $requestMethod == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode($contractController->createContract($data['value'], $data['date']));
}

elseif ($requestUri == '/contracts' && $requestMethod == 'GET') {
    echo json_encode($contractController->listContracts());
}

elseif (preg_match('/\/contracts\/(\d+)/', $requestUri, $matches) && $requestMethod == 'GET') {
    $contractId = $matches[1];
    echo json_encode($contractController->getContractById($contractId));
}

elseif (preg_match('/\/contracts\/(\d+)/', $requestUri, $matches) && $requestMethod == 'PUT') {
    $contractId = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode($contractController->updateContract($contractId, $data['value'], $data['date']));
}

elseif (preg_match('/\/contracts\/(\d+)/', $requestUri, $matches) && $requestMethod == 'DELETE') {
    $contractId = $matches[1];
    echo json_encode($contractController->deleteContract($contractId));
}
