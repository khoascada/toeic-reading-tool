'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';

type ConfirmOptions = {
  title?: ReactNode;
  description?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  destructive?: boolean;
  loading?: boolean;
  onConfirm?: () => void | Promise<void>;
};

type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

const defaultOptions: Required<
  Omit<ConfirmOptions, 'title' | 'description' | 'loading' | 'onConfirm'>
> = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  destructive: false,
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [loading, setLoading] = useState(false);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((opts = {}) => {
    setOptions(opts);
    setLoading(opts.loading ?? false);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleClose = useCallback(
    async (result: boolean) => {
      if (loading) return;

      // If user confirmed and there's an onConfirm callback
      if (result && options.onConfirm) {
        try {
          setLoading(true);
          await Promise.resolve(options.onConfirm());
          setLoading(false);
          resolverRef.current?.(true);
          resolverRef.current = null;
          setOpen(false);
        } catch (error) {
          setLoading(false);
          throw error;
        }
        return;
      }

      // Normal flow: just close and resolve
      resolverRef.current?.(result);
      resolverRef.current = null;
      setOpen(false);
      setLoading(false);
    },
    [loading, options]
  );

  const merged = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
      loading,
    }),
    [options, loading]
  );

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {merged.title ? <AlertDialogTitle>{merged.title}</AlertDialogTitle> : null}
            {merged.description ? (
              <AlertDialogDescription>{merged.description}</AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)} disabled={merged.loading}>
              {merged.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                merged.destructive
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : undefined
              }
              onClick={() => handleClose(true)}
              disabled={merged.loading}
            >
              {merged.loading && (
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
              )}
              {merged.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return ctx;
};
