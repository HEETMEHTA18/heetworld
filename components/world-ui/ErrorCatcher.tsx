"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.toString() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-[999] bg-red-900 text-white p-10 font-mono text-sm overflow-auto">
          <h1 className="text-2xl font-bold mb-4">CRASH DETECTED</h1>
          <pre>{this.state.errorMsg}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
