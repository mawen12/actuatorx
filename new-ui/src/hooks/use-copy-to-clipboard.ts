
export function useCopyToClipboard() {
    return async(text: string) => {
        if (!navigator?.clipboard) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);

                return successful;
            } catch (err) {
                console.warn('Copy failed', err);
                return false;
            }
        }

        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn("Copy failed", err);
            return false;
        }
    }
}