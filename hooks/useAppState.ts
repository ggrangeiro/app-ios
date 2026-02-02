import { useEffect, useState, useRef, useCallback } from 'react';
import { App, AppState } from '@capacitor/app';

interface AppStateInfo {
    isActive: boolean;
    lastBackground: number | null;
    wasBackgrounded: boolean;
}

/**
 * Hook para detectar quando o app vai/volta do background
 * Útil para recovery de operações longas em iOS
 */
export const useAppState = () => {
    const [appState, setAppState] = useState<AppStateInfo>({
        isActive: true,
        lastBackground: null,
        wasBackgrounded: false
    });

    const callbacksRef = useRef<Set<(isActive: boolean, backgroundDuration: number) => void>>(new Set());

    useEffect(() => {
        let backgroundTime: number | null = null;

        const listener = App.addListener('appStateChange', (state: AppState) => {
            const isActive = state.isActive;

            if (!isActive) {
                // App going to background
                backgroundTime = Date.now();
                setAppState(prev => ({
                    ...prev,
                    isActive: false,
                    lastBackground: backgroundTime
                }));
            } else {
                // App returning to foreground
                const duration = backgroundTime ? Date.now() - backgroundTime : 0;
                setAppState({
                    isActive: true,
                    lastBackground: backgroundTime,
                    wasBackgrounded: true
                });

                // Notify all registered callbacks
                callbacksRef.current.forEach(cb => {
                    try {
                        cb(true, duration);
                    } catch (e) {
                        console.error('[useAppState] Callback error:', e);
                    }
                });

                backgroundTime = null;
            }
        });

        return () => {
            listener.then(l => l.remove());
        };
    }, []);

    /**
     * Registra um callback para ser chamado quando o app voltar do background
     */
    const onResume = useCallback((callback: (isActive: boolean, backgroundDuration: number) => void) => {
        callbacksRef.current.add(callback);
        return () => {
            callbacksRef.current.delete(callback);
        };
    }, []);

    return { ...appState, onResume };
};

export default useAppState;
