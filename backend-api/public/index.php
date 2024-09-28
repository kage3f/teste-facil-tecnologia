<?php

// Cabeçalhos CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permite requisições do seu frontend
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permite os cabeçalhos necessários
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Permite os métodos HTTP usados


// Incluir o handler global de erros
require_once __DIR__ . '/../src/errorHandler.php';

// A partir daqui, o resto do código continua normalmente
require_once __DIR__ . '/../src/routes.php';
