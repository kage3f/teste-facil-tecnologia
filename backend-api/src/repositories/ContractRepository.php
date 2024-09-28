<?php

require_once __DIR__ . '/../database.php';

class ContractRepository {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($userId, $value, $date) {
        $stmt = $this->pdo->prepare('INSERT INTO contracts (user_id, value, date) VALUES (?, ?, ?)');
        $stmt->execute([$userId, $value, $date]);
        return $this->pdo->lastInsertId();
    }

    public function findById($contractId) {
        $stmt = $this->pdo->prepare('SELECT * FROM contracts WHERE id = ?');
        $stmt->execute([$contractId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findAll() {
        $stmt = $this->pdo->prepare('SELECT * FROM contracts ORDER BY date DESC');
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }    

    public function update($contractId, $value, $date) {
        $stmt = $this->pdo->prepare('UPDATE contracts SET value = ?, date = ? WHERE id = ?');
        $stmt->execute([$value, $date, $contractId]);
        return $stmt->rowCount();
    }

    public function delete($contractId) {
        $stmt = $this->pdo->prepare('DELETE FROM contracts WHERE id = ?');
        $stmt->execute([$contractId]);
        return $stmt->rowCount();
    }
}
