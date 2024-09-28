<?php
$host = 'db';
$dbname = 'contracts_db';
$user = 'postgres';
$pass = '91034161';

try {
    // Use 'pgsql' instead of 'mysql' in the DSN
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}
