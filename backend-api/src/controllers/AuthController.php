<?php

require_once __DIR__ . '/../services/AuthService.php';

class AuthController {
    private $authService;

    public function __construct($pdo) {
        $this->authService = new AuthService($pdo);
    }

    public function login($username, $password) {
        try {
            $result = $this->authService->login($username, $password);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function verifyToken() {
        try {
            return $this->authService->verifyToken();
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    private function handleError($e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        $message = str_replace('"', "'", $e->getMessage());
        echo json_encode(['errors' => [$message]], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
