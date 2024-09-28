<?php

require_once __DIR__ . '/../database.php';

class UserRepository {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($username, $hashedPassword, $role) {
        $stmt = $this->pdo->prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
        $stmt->execute([$username, $hashedPassword, $role]);
        return $this->pdo->lastInsertId();
    }

    public function findById($userId) {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findAll() {
        $stmt = $this->pdo->prepare('SELECT * FROM users');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($userId, $username, $hashedPassword, $role) {
        $stmt = $this->pdo->prepare('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?');
        $stmt->execute([$username, $hashedPassword, $role, $userId]);
        return $stmt->rowCount();
    }

    public function delete($userId) {
        $stmt = $this->pdo->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        return $stmt->rowCount();
    }
}
