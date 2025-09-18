import { Component } from "react";

export class MyErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary поймал:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Что-то пошло не так: {this.state.error.message}</div>;
    }

    return this.props.children;
  }
}
