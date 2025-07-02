import type { OpenAICheckResponse } from "@/lib/types";
import { use } from "react";

const hasOpenAiKeyPromise = fetch("/check-open-ai-key").then((res) =>
  res.json<OpenAICheckResponse>()
);

export function HasOpenAIKey() {
  const hasOpenAiKey = use(hasOpenAiKeyPromise);

  if (!hasOpenAiKey.success) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-500/10 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-red-200 dark:border-red-900 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  Missing OpenAI API Key
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Please set the{" "}
                  <code className="bg-red-100 dark:bg-red-900/50 px-1 py-0.5 rounded">
                    OPENAI_API_KEY
                  </code>{" "}
                  environment variable in your{" "}
                  <code className="bg-red-100 dark:bg-red-900/50 px-1 py-0.5 rounded">
                    .env
                  </code>{" "}
                  file.
                </p>
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                  <p>
                    Add this to your{" "}
                    <code className="bg-red-100 dark:bg-red-950/50 px-1 py-0.5 rounded">
                      .env
                    </code>{" "}
                    file:
                  </p>
                  <pre className="mt-1 p-2 bg-red-50 dark:bg-red-950/50 rounded overflow-x-auto">
                    <code>OPENAI_API_KEY=your_api_key_here</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
