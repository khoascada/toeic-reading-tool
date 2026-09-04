'use client';

import { Button } from '@components/ui';
import { RotateCcw } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';

export type ErrorBoundaryVariant = 'page' | 'header' | 'sidebar';

export interface ErrorMessages {
  title: string;
  description: string;
  tryAgain: string;
  sectionError: string;
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  variant?: ErrorBoundaryVariant;
  onReset?: () => void;
  messages?: ErrorMessages;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    const { onReset } = this.props;

    this.setState({ hasError: false, error: null });

    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  renderErrorUI() {
    const { variant = 'page', messages } = this.props;
    const { error } = this.state;

    // Default messages (fallback if no translations provided)
    const defaultMessages: ErrorMessages = {
      title: 'Có lỗi xảy ra',
      description: 'Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu lỗi vẫn tiếp diễn',
      tryAgain: 'Thử lại',
      sectionError: 'Phần này gặp lỗi',
    };

    const msg = messages || defaultMessages;

    if (variant === 'header') {
      return (
        <div className="sticky top-0 z-50 flex h-[64px] items-center justify-center gap-4 border-b border-gray-200 bg-white/80 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
          <span className="text-sm text-gray-700 dark:text-gray-300">{msg.title}</span>
          <Button onClick={this.handleReset} variant="default" size="sm">
            <RotateCcw size={14} />
            <span>{msg.tryAgain}</span>
          </Button>
        </div>
      );
    }

    if (variant === 'sidebar') {
      return (
        <div className="flex w-[220px] flex-col items-center justify-center gap-2 overflow-y-auto border-r border-gray-200 dark:border-white/[0.08]">
          <span className="text-sm text-gray-700 dark:text-gray-300">{msg.title}</span>
          <Button onClick={this.handleReset} variant="default" size="sm">
            <RotateCcw size={14} />
            <span className="ml-1">{msg.tryAgain}</span>
          </Button>
        </div>
      );
    }

    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
            <svg
              className="h-12 w-12 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {msg.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{msg.description}</p>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-4 max-w-md rounded bg-gray-100 p-3 text-left text-xs dark:bg-gray-800">
                <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">
                  Chi tiết lỗi (Dev only)
                </summary>
                <pre className="mt-2 overflow-auto text-red-600 dark:text-red-400">
                  {error.message}
                  {'\n\n'}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>

          <Button onClick={this.handleReset} variant="default" size="sm">
            <RotateCcw size={16} />
            <span className="font-semibold">{msg.tryAgain}</span>
          </Button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback has priority
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
