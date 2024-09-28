<?php

require_once __DIR__ . '/../services/UserService.php';

class UserController {
    private $userService;

    public function __construct($pdo) {
        $this->userService = new UserService($pdo);
    }

    public function createUser($username, $password, $role) {
        try {
            $newUser = $this->userService->createUser($username, $password, $role);
            echo json_encode([
                'message' => 'Usuário criado com sucesso',
                'user' => $newUser
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function listUsers() {
        try {
            $users = $this->userService->listUsers();
            echo json_encode($users, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function getUserById($userId) {
        try {
            $user = $this->userService->getUserById($userId);
            echo json_encode($user, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function updateUser($userId, $username, $password, $role) {
        try {
            $updatedUser = $this->userService->updateUser($userId, $username, $password, $role);
            echo json_encode([
                'message' => 'Usuário atualizado com sucesso',
                'user' => $updatedUser
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function deleteUser($userId) {
        try {
            $this->userService->deleteUser($userId);
            echo json_encode([
                'message' => 'Usuário excluído com sucesso'
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    private function handleError($e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        $message = str_replace('"', "'", $e->getMessage());
        echo json_encode(['errors' => [$message]], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
