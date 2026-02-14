import React, { useState } from 'react';
import { Shield, Lock, CheckCircle, X, Eye, Server, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface PrivacyConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PrivacyConsentModal: React.FC<PrivacyConsentModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [showDetails, setShowDetails] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
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
                        Para utilizar os recursos de Inteligência Artificial, precisamos da sua permissão explícita para processar seus dados conforme detalhado abaixo.
                    </p>
                </div>

                <div className="space-y-4 mb-6">
                    {/* Quem recebe os dados */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-400" /> Para quem seus dados são enviados?
                        </h4>
                        <p className="text-sm text-slate-400">
                            Seus dados são enviados para a <strong className="text-white">Google LLC</strong>, por meio do serviço <strong className="text-white">Google Gemini API</strong>, para processamento de inteligência artificial.
                        </p>
                    </div>

                    {/* Quais dados são compartilhados */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-emerald-400" /> Quais dados são compartilhados?
                        </h4>
                        <ul className="text-sm text-slate-400 space-y-2">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Dados de perfil:</strong> peso, altura, idade, sexo e objetivo de treino</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Dados de saúde (anamnese):</strong> lesões, condições médicas, restrições alimentares e preferências de exercício</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Vídeos de exercícios:</strong> enviados para análise biomecânica de movimento</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Fotos corporais:</strong> enviadas para avaliação postural e composição corporal</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Fotos de refeições:</strong> enviadas para análise nutricional</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-slate-300">Documentos médicos:</strong> laudos e exames enviados para extração de informações relevantes ao treino</span>
                            </li>
                        </ul>
                    </div>

                    {/* Finalidade */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-400" /> Para qual finalidade?
                        </h4>
                        <ul className="text-sm text-slate-400 space-y-1.5">
                            <li>- Análise biomecânica de exercícios por vídeo</li>
                            <li>- Geração de treinos personalizados</li>
                            <li>- Geração de dietas personalizadas</li>
                            <li>- Análise nutricional de refeições por foto</li>
                            <li>- Avaliação postural e de composição corporal</li>
                        </ul>
                    </div>

                    {/* Detalhes expandíveis */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-slate-300 transition-colors px-1"
                    >
                        <span>Detalhes sobre segurança e proteção dos dados</span>
                        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showDetails && (
                        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30 space-y-3 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-start gap-2">
                                <Lock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400">
                                    <strong className="text-slate-300">Transmissão segura:</strong> Todos os dados são enviados por conexão criptografada (HTTPS/TLS).
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Lock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400">
                                    <strong className="text-slate-300">Sem uso para treinamento:</strong> Conforme os termos da Google Gemini API, seus dados <strong>não são utilizados</strong> para treinar modelos de inteligência artificial.
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Lock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400">
                                    <strong className="text-slate-300">Uso exclusivo:</strong> Os dados são processados exclusivamente para gerar a resposta da funcionalidade solicitada e não são armazenados pelo Google após o processamento.
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Lock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-slate-400">
                                    <strong className="text-slate-300">Proteção equivalente:</strong> O Google fornece proteção de dados equivalente ou superior, conforme sua{' '}
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline inline-flex items-center gap-0.5">
                                        Política de Privacidade <ExternalLink className="w-3 h-3" />
                                    </a>.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-xs text-slate-500 text-center mb-4">
                    Ao clicar em "Concordo", você autoriza o envio dos dados descritos acima para a Google LLC (Gemini API) para as finalidades indicadas. Consulte nossa{' '}
                    <a href="https://fitanalizer.com.br/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
                        Política de Privacidade
                    </a>{' '}completa para mais informações.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all"
                    >
                        Não Autorizo
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all"
                    >
                        Concordo e Autorizo
                    </button>
                </div>
            </div>
        </div>
    );
};
