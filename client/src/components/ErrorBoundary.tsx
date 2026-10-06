import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI Error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h1 className="text-2xl font-black text-white">Something Went Wrong</h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              An unexpected application error occurred. We apologize for the inconvenience.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition"
              >
                Reload Home Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
