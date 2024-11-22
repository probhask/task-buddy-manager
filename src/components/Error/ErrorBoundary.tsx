import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("uncaught error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        <>{this.props.fallback}</>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center bg-neutral-800">
          <div className="rounded-md bg-neutral-950 p-3 px-5 text-center text-[#F7EFE5]">
            <h1 className="mb-1 text-4xl font-bold uppercase">OOPS!</h1>
            <h1 className="mb-3 text-2xl font-bold uppercase">
              Something went wrong.
            </h1>
            <p className="text-lg">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
