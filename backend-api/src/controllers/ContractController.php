<?php

require_once __DIR__ . '/../services/ContractService.php';

class ContractController {
    private $contractService;

    public function __construct($pdo) {
        $this->contractService = new ContractService($pdo);
    }

    public function createContract($value, $date) {
        try {
            $newContract = $this->contractService->createContract($value, $date);
            echo json_encode([
                'message' => 'Contrato cadastrado com sucesso',
                'contract' => $newContract
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function getContractById($contractId) {
        try {
            $contract = $this->contractService->getContractById($contractId);
            if ($contract) {
                echo json_encode($contract, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } else {
                http_response_code(404);
                echo json_encode(['errors' => ['Contrato não encontrado.']], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function listContracts() {
        try {
            $contracts = $this->contractService->listContracts();
            echo json_encode($contracts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function updateContract($contractId, $value, $date) {
        try {
            $updatedContract = $this->contractService->updateContract($contractId, $value, $date);
            echo json_encode([
                'message' => 'Contrato atualizado com sucesso',
                'contract' => $updatedContract
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    public function deleteContract($contractId) {
        try {
            $this->contractService->deleteContract($contractId);
            echo json_encode([
                'message' => 'Contrato excluído com sucesso'
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            $this->handleError($e);
        }
        exit;
    }

    private function handleError($e) {
        $code = $e->getCode() ?: 500;  // Se não houver código, retornamos 500 (erro interno)
        http_response_code($code);
        echo json_encode(['errors' => [$e->getMessage()]], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
