<?php

require_once __DIR__ . '/../repositories/ContractRepository.php';
require_once __DIR__ . '/../services/AuthService.php';  // Importando o AuthService

class ContractService {
    private $contractRepository;
    private $authService;  // Adicionando o AuthService

    public function __construct($pdo) {
        $this->contractRepository = new ContractRepository($pdo);
        $this->authService = new AuthService($pdo);  // Instanciando o AuthService
    }

    public function createContract($value, $date) {
        // Verificar token usando o AuthService
        $decodedToken = $this->authService->verifyToken();
        $userId = $decodedToken->sub;

        // Validação dos dados
        if (empty($value) || empty($date)) {
            throw new Exception("Os campos 'value' e 'date' são obrigatórios.", 400);
        }

        // Validar se o valor é numérico
        if (!is_numeric($value)) {
            throw new Exception("O campo 'value' deve ser numérico.", 400);
        }

        // Validar o formato da data (YYYY-MM-DD)
        $d = DateTime::createFromFormat('Y-m-d', $date);
        if (!($d && $d->format('Y-m-d') === $date)) {
            throw new Exception("O campo 'date' deve estar no formato YYYY-MM-DD.", 400);
        }

        // Criar contrato
        $contractId = $this->contractRepository->create($userId, $value, $date);

        // Buscar o contrato recém-criado
        return $this->contractRepository->findById($contractId);
    }

    public function listContracts() {
        // Verificar token usando o AuthService
        $this->authService->verifyToken();

        // Listar todos os contratos
        return $this->contractRepository->findAll();
    }

    public function getContractById($contractId) {
        // Verificar token usando o AuthService
        $this->authService->verifyToken();

        // Buscar contrato pelo ID
        $contract = $this->contractRepository->findById($contractId);

        if (!$contract) {
            throw new Exception('Contrato não encontrado.', 404);
        }

        return $contract;
    }

    public function updateContract($contractId, $value, $date) {
        // Verificar token
        $this->authService->verifyToken();

        // Verificar se o contrato existe
        $existingContract = $this->contractRepository->findById($contractId);
        if (!$existingContract) {
            throw new Exception('Contrato não encontrado.', 404);
        }

        // Validação dos dados
        if (empty($value) || empty($date)) {
            throw new Exception("Os campos 'value' e 'date' são obrigatórios.", 400);
        }

        if (!is_numeric($value)) {
            throw new Exception("O campo 'value' deve ser numérico.", 400);
        }

        $d = DateTime::createFromFormat('Y-m-d', $date);
        if (!($d && $d->format('Y-m-d') === $date)) {
            throw new Exception("O campo 'date' deve estar no formato YYYY-MM-DD.", 400);
        }

        // Atualizar contrato
        $this->contractRepository->update($contractId, $value, $date);

        // Buscar contrato atualizado
        return $this->contractRepository->findById($contractId);
    }

    public function deleteContract($contractId) {
        // Verificar token
        $this->authService->verifyToken();

        // Verificar se o contrato existe
        $existingContract = $this->contractRepository->findById($contractId);
        if (!$existingContract) {
            throw new Exception('Contrato não encontrado.', 404);
        }

        // Deletar contrato
        $this->contractRepository->delete($contractId);
    }
}
