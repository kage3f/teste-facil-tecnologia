<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/database.php';

try {
    // Criação da tabela de usuários
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        CHECK (role IN ('gestor', 'usuario'))
    )");

    // Criação da tabela de contratos
    $pdo->exec("CREATE TABLE IF NOT EXISTS contracts (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        value NUMERIC(12, 2) NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )");

    echo "Tabelas criadas com sucesso.\n";

    // Verificar se o usuário padrão já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute(['gestor']);
    $userCount = $stmt->fetchColumn();

    if ($userCount == 0) {
        // Inserir o usuário gestor padrão
        $hashedPassword = password_hash('gestor123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        $stmt->execute(['gestor', $hashedPassword, 'gestor']);
        echo "Usuário gestor criado com sucesso.\n";
    }

} catch (PDOException $e) {
    echo "Erro ao criar tabelas: " . $e->getMessage();
}
