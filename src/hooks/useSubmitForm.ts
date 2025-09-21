import { useState } from "react";

export function useSubmitForm<T>(
    sendSubmit: () => Promise<T>,
    redirect?: string
) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const errormsgTimer = 2000;

    async function sendForm(
        event: React.FormEvent,
        navigate?: (path: string) => void,
        errorMsg: string = 'Något gick fel'
    ): Promise<T | null> {
        event.preventDefault();
        setErrorMessage('');
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const result = await sendSubmit();

            if (result) {
                if (navigate && redirect) {
                    navigate(redirect);
                }
                return result;
            } else {
                setErrorMessage(errorMsg);
                setTimeout(() => setErrorMessage(''), errormsgTimer);
                return null;
            }
        } catch {
            setErrorMessage(errorMsg);
            setTimeout(() => setErrorMessage(''), errormsgTimer);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { sendForm, loading, errorMessage, setErrorMessage };
}
