import { useContext, useMemo, useState } from 'react'
import { createContext } from 'react';
import { createPortal } from 'react-dom';
export const ToastContext = createContext();
import Toast from './Toast'
function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);
    return first + second;
}


function ToastProvider(props) {
    const [toasts, setToasts] = useState([]);
    const open = ({ type, content }) =>
        setToasts((currentToasts) => [
            ...currentToasts,
            { id: generateUEID(), content, type },
        ]);

    const close = (id) =>
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    const contextValue = useMemo(() => ({ open }), []);

    return (
        <ToastContext.Provider value={contextValue}>
            {props.children}

            {createPortal(
                <div className="toasts-wrapper">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} close={close} toast={toast} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}

const useToast = () => useContext(ToastContext);
export { ToastProvider, useToast }
