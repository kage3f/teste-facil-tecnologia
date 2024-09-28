<?php

// Função para lidar com exceções não capturadas
function exceptionHandler($exception) {
    http_response_code(500);  // Código de erro 500 por padrão
    echo json_encode([
        'errors' => ['errors: ' . $exception->getMessage()]
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Função para lidar com erros do PHP
function errorHandler($severity, $message, $file, $line) {
    // Transformar todos os erros em exceções para lidar de forma consistente
    throw new ErrorException($message, 0, $severity, $file, $line);
}

// Função para lidar com erros fatais (ex. falta de memória, tempo de execução)
function shutdownHandler() {
    $error = error_get_last();
    if ($error !== null) {
        http_response_code(500);
        echo json_encode([
            'errors' => ['Fatal error: ' . $error['message']]
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}

// Setar os manipuladores globais de erros e exceções
set_exception_handler('exceptionHandler');
set_error_handler('errorHandler');
register_shutdown_function('shutdownHandler');
