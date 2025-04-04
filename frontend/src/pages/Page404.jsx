import React, { useEffect, useState } from "react";
import { Code, Terminal, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

const Page404 = () => {
    const [terminalLines, setTerminalLines] = useState([]);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const lines = [
            "$ cd /home/user/website",
            "$ find . -name 'requested-page'",
            "find: No results found",
            "$ grep -r 'requested-page' .",
            "grep: Pattern not found",
            "$ echo $?",
            "1",
            "$ ERROR: 404 Page Not Found"
        ];

        let currentLines = [];
        let lineIndex = 0;
        let charIndex = 0;

        const typeWriter = setInterval(() => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];

                if (charIndex < currentLine.length) {
                    currentLines[lineIndex] = currentLine.substring(0, charIndex + 1);
                    charIndex++;
                } else {
                    charIndex = 0;
                    lineIndex++;
                }

                setTerminalLines([...currentLines]);
            } else {
                clearInterval(typeWriter);
            }
        }, 50);

        // Blink cursor
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(typeWriter);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-base-300 text-base-content font-mono p-4">
            {/* Matrix-like background effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-primary text-opacity-30 text-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `fall ${5 + Math.random() * 10}s linear infinite`
                        }}
                    >
                        {Array.from({ length: 20 }).map((_, j) => (
                            <div key={j}>
                                {Math.random() > 0.5 ? "1" : "0"}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="z-10 max-w-3xl w-full bg-base-100 border border-primary rounded-lg shadow-lg shadow-primary/20 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 p-2 bg-base-200 border-b border-primary/50">
                    <span className="w-3 h-3 bg-error rounded-full"></span>
                    <span className="w-3 h-3 bg-warning rounded-full"></span>
                    <span className="w-3 h-3 bg-success rounded-full"></span>
                    <span className="ml-2 text-sm text-base-content">terminal - 404.sh</span>
                </div>

                {/* Terminal content */}
                <div className="p-4 bg-base-100">
                    <div className="flex items-center mb-6">
                        <Terminal className="w-6 h-6 mr-2 text-primary" />
                        <span className="text-primary text-lg font-semibold">404 Error Detected</span>
                    </div>

                    <div className="mb-8 font-mono text-secondary">
                        {terminalLines.map((line, i) => (
                            <div key={i} className="mb-1">
                                {line}
                                {i === terminalLines.length - 1 && showCursor && <span className="animate-pulse">▋</span>}
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-primary/30 pt-4 mt-4">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl font-bold mb-2 text-center">
                                <ChevronLeft className="size-14 text-primary inline-block" />
                                <span className="text">404</span>
                                <ChevronRight className="size-14 text-primary inline-block" />
                            </h1>
                            <p className="text-base-content/70 mb-6 text-center">
                                The resource you're looking for could not be found in any directory.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center">
                                <button
                                    onClick={() => window.location.href = "/"}
                                    className="btn btn-primary"
                                >
                                    <span>cd /home</span>
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="btn btn-secondary"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    <span>retry</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-sm text-base-content/50">
                <code>/* Page not found in the codebase */</code>
            </div>

            {/* Required for animated falling effect */}
            <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
        </div>
    );
};

export default Page404;