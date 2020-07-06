import React from "react";
import ErrorPage from "./pages/ErrorPage";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(err: any) {
    if (err) {
      this.setState({ hasError: true });
    }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
