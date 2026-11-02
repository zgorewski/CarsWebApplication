import type { ReactNode } from 'react';

export function Loading({ text = 'Ładowanie danych…' }: { text?: string }) {
  return (
    <div className="feedback feedback--loading" role="status">
      <span className="spinner" aria-hidden="true" />
      {text}
    </div>
  );
}

export function ErrorMessage({ message, children }: { message: string; children?: ReactNode }) {
  return (
    <div className="feedback feedback--error" role="alert">
      <strong>Wystąpił błąd.</strong> {message}
      {children && <div className="feedback__actions">{children}</div>}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="feedback feedback--empty">{children}</div>;
}
