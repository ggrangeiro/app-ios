import React from 'react';
import { Shield, Lock, CheckCircle, X } from 'lucide-react';

interface PrivacyConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PrivacyConsentModal: React.FC<PrivacyConsentModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="p-4 bg-indigo-500/20 rounded-full mb-4">
                        <Shield className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Consentimento de Privacidade</h3>
                    <p className="text-slate-400 text-sm">
                        Para utilizar os recursos de Inteligência Artificial, precisamos da sua permissão para processar alguns dados.
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-emerald-400" /> O que será compartilhado?
                        </h4>
                        <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                            <li>Dados de perfil (peso, altura, idade, objetivo) para personalizar os planos.</li>
                            <li>Imagens enviadas (refeições ou físico) para análise visual.</li>
                        </ul>
                    </div>

                    <p className="text-xs text-slate-500 text-justify">
                        Utilizamos a tecnologia Google Gemini (AI) para processar estas informações e gerar seus treinos, dietas e análises.
                        Seus dados são enviados de forma segura e utilizados <strong>exclusivamente</strong> para esta finalidade, não sendo armazenados para treinamento de modelos públicos.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all"
                    >
                        Concordo e Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};
