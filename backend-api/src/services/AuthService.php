<?php

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService {
    private $pdo;
    private $key;

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->key = "fcbdb1a31a6e49e4cf47dddc9dba4b5c38b7e4f62398b940f60d6a5d4f5b06ad";  // Idealmente, use uma variável de ambiente
    }

    public function login($username, $password) {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Geração do token JWT
            $payload = [
                "sub" => $user['id'],
                "username" => $user['username'],
                "role" => $user['role'],
                "iat" => time(),
                "exp" => time() + (60 * 60) // Expira em 1 hora
            ];

            $jwt = JWT::encode($payload, $this->key, 'HS256');
            return ['token' => $jwt];
        } else {
            throw new Exception('Credenciais inválidas', 401);
        }
    }

    public function verifyToken() {
        // Obter todos os cabeçalhos
        $headers = getallheaders();

        // Verificar se o cabeçalho Authorization está presente
        if (!isset($headers['Authorization'])) {
            throw new Exception('Token não fornecido', 401);
        }

        // Extrair o token do cabeçalho Authorization
        $authHeader = $headers['Authorization'];
        $jwt = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JWT::decode($jwt, new Key($this->key, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            throw new Exception('Token inválido: ' . $e->getMessage(), 401);
        }
    }
}
