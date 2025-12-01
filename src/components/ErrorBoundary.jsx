import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Something went wrong
            </h1>
            <p className="text-gray-700 mb-4">
              An unexpected error occurred. Here are the details:
            </p>
            <details className="text-sm text-gray-600 bg-gray-50 p-4 rounded border border-gray-300 whitespace-pre-wrap break-words">
              <summary className="font-semibold cursor-pointer text-gray-800 mb-2">
                Error Details (click to expand)
              </summary>
              {this.state.error && (
                <>
                  <p className="font-mono text-red-600 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <p className="font-mono text-xs">
                      {this.state.errorInfo.componentStack}
                    </p>
                  )}
                </>
              )}
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
