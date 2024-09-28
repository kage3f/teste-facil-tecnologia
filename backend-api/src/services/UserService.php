<?php

require_once __DIR__ . '/../repositories/UserRepository.php';
require_once __DIR__ . '/../services/AuthService.php';  // Importando o AuthService

class UserService {
    private $userRepository;
    private $authService;

    public function __construct($pdo) {
        $this->userRepository = new UserRepository($pdo);
        $this->authService = new AuthService($pdo);
    }

    public function createUser($username, $password, $role) {
        // Verificar token e permissões (somente gestores podem criar usuários)
        $decodedToken = $this->authService->verifyToken();
        if ($decodedToken->role !== 'gestor') {
            throw new Exception('Permissão negada', 403);
        }

        // Validar dados do usuário
        if (empty($username) || empty($password) || empty($role)) {
            throw new Exception('Todos os campos são obrigatórios', 400);
        }

        // Hash da senha
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Criar o usuário
        $userId = $this->userRepository->create($username, $hashedPassword, $role);

        // Buscar o usuário recém-criado
        return $this->userRepository->findById($userId);
    }

    public function listUsers() {
        // Verificar token
        $this->authService->verifyToken();

        // Listar todos os usuários
        return $this->userRepository->findAll();
    }

    public function getUserById($userId) {
        $this->authService->verifyToken();
        $user = $this->userRepository->findById($userId);
        if (!$user) {
            throw new Exception('Usuário não encontrado', 404);
        }
        return $user;
    }

    public function updateUser($userId, $username, $password, $role) {
        // Verificar token
        $this->authService->verifyToken();

        // Verificar se o usuário existe
        $existingUser = $this->userRepository->findById($userId);
        if (!$existingUser) {
            throw new Exception('Usuário não encontrado', 404);
        }

        // Validar dados
        if (empty($username) || empty($password) || empty($role)) {
            throw new Exception('Todos os campos são obrigatórios', 400);
        }

        // Hash da senha
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Atualizar usuário
        $this->userRepository->update($userId, $username, $hashedPassword, $role);

        // Buscar usuário atualizado
        return $this->userRepository->findById($userId);
    }

    public function deleteUser($userId) {
        // Verificar token
        $this->authService->verifyToken();

        // Verificar se o usuário existe
        $existingUser = $this->userRepository->findById($userId);
        if (!$existingUser) {
            throw new Exception('Usuário não encontrado', 404);
        }

        // Deletar usuário
        $this->userRepository->delete($userId);

        // Opcionalmente, retornar alguma confirmação
        return true;
    }
}
