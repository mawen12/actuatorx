import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ClosedCaptionIcon } from "lucide-react";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface SnackbarItem {
    text: string | ReactNode,
    type: "success" | "error" | "info" | "warning",
    timeout?: number,
}

interface SnackModel extends SnackbarItem {
    open?: boolean,
    key?: number,
}

type SnackbarProviderProps = {
    children: React.ReactNode
}

export type SnackbarContextType = {
    showInfoMessage: (item: SnackbarItem) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
    showInfoMessage: () => { }
});


export function SnackbarProvider({ children }: SnackbarProviderProps) {
    const [snack, setSnack] = useState<SnackModel>({ text: "", type: "info" });

    const [open, setOpen] = useState(false);

    const [infoMessage, setInfoMessage] = useState<SnackbarItem | null>(null);

    const handleClose = () => {
        setInfoMessage(null);
        setOpen(false);
    }

    useEffect(() => {
        if (!infoMessage) return;

        setSnack({
            ...infoMessage,
            key: Date.now(),
        })

        setOpen(true);

        const timeout = setTimeout(handleClose, infoMessage.timeout || 4000);
        return () => clearTimeout(timeout);
    }, [infoMessage, setSnack])

    return (
        <SnackbarContext value={{ showInfoMessage: setInfoMessage }}>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-row justify-between">
                            {snack.text}
                            <Button variant="outline" size="sm" onClick={handleClose}>
                                <ClosedCaptionIcon />
                            </Button>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {snack.text}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                </AlertDialogContent>
            </AlertDialog>
            {children}
        </SnackbarContext>
    )
}

export const useSnack = (): SnackbarContextType => {
   const context = useContext(SnackbarContext);
   
   if (context === undefined) {
        throw new Error("useSnack must be used within a SnackbarProvider")
    }

   return context
}