import React from 'react';

const CrashPage: React.FC = () => {
  return <div>An unexpected error occurred.</div>;
};

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: any): void {}

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <CrashPage />;
    }

    return children;
  }
}

export default ErrorBoundary;
