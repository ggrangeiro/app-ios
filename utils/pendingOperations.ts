import { secureStorage } from './secureStorage';

export interface PendingOperation {
    id: string;
    type: 'WORKOUT_GENERATION' | 'DIET_GENERATION' | 'ANALYSIS';
    userId: string;
    startedAt: number;
    metadata?: Record<string, any>;
}

const STORAGE_KEY = 'fitai_pending_operations';

/**
 * Gerenciador de operações pendentes
 * Usado para recovery quando app vai para background durante operações longas
 */
export const pendingOperations = {
    /**
     * Salva uma operação como pendente
     */
    save: (operation: Omit<PendingOperation, 'id' | 'startedAt'>): PendingOperation => {
        const fullOperation: PendingOperation = {
            ...operation,
            id: `${operation.type}_${Date.now()}`,
            startedAt: Date.now()
        };

        const existing = pendingOperations.getAll();
        existing.push(fullOperation);
        secureStorage.setItem(STORAGE_KEY, existing);

        console.log('[PendingOperations] Saved:', fullOperation.id);
        return fullOperation;
    },

    /**
     * Remove uma operação pendente (após sucesso ou cancelamento)
     */
    remove: (operationId: string): boolean => {
        const existing = pendingOperations.getAll();
        const filtered = existing.filter(op => op.id !== operationId);

        if (filtered.length !== existing.length) {
            secureStorage.setItem(STORAGE_KEY, filtered);
            console.log('[PendingOperations] Removed:', operationId);
            return true;
        }
        return false;
    },

    /**
     * Retorna todas as operações pendentes
     */
    getAll: (): PendingOperation[] => {
        return secureStorage.getItem<PendingOperation[]>(STORAGE_KEY) || [];
    },

    /**
     * Retorna operações pendentes de um tipo específico
     */
    getByType: (type: PendingOperation['type']): PendingOperation[] => {
        return pendingOperations.getAll().filter(op => op.type === type);
    },

    /**
     * Retorna operações pendentes para um usuário
     */
    getByUser: (userId: string): PendingOperation[] => {
        return pendingOperations.getAll().filter(op => op.userId === userId);
    },

    /**
     * Verifica se há operação pendente para um usuário e tipo específico
     */
    has: (userId: string, type: PendingOperation['type']): boolean => {
        return pendingOperations.getAll().some(
            op => op.userId === userId && op.type === type
        );
    },

    /**
     * Limpa operações expiradas (mais de 5 minutos)
     */
    cleanExpired: (maxAgeMs: number = 5 * 60 * 1000): number => {
        const now = Date.now();
        const existing = pendingOperations.getAll();
        const valid = existing.filter(op => (now - op.startedAt) < maxAgeMs);

        const removed = existing.length - valid.length;
        if (removed > 0) {
            secureStorage.setItem(STORAGE_KEY, valid);
            console.log('[PendingOperations] Cleaned expired:', removed);
        }
        return removed;
    },

    /**
     * Limpa todas as operações pendentes
     */
    clearAll: (): void => {
        secureStorage.removeItem(STORAGE_KEY);
        console.log('[PendingOperations] Cleared all');
    }
};

export default pendingOperations;
