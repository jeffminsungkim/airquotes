import type { MutableRefObject } from "react";
import { toast } from "react-hot-toast";

type GeneratedQuoteProps = {
  generatedQuotes: string;
  quoteRef: MutableRefObject<HTMLDivElement | null>;
};

const GeneratedQuote = ({ generatedQuotes, quoteRef }: GeneratedQuoteProps) => {
  return (
    <>
      {generatedQuotes && (
        <>
          <div>
            <h2
              className="mx-auto text-3xl font-bold text-app sm:text-4xl"
              ref={quoteRef}
            >
              Generated quotes
            </h2>
            <div className="mt-3 text-zinc-500">
              Click the generated quotes to copy ✂️
            </div>
          </div>
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
            {generatedQuotes
              .substring(generatedQuotes.indexOf("1") + 3)
              .split("2.")
              .map((generatedQuote) => {
                return (
                  <div
                    className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-zinc-100"
                    onClick={() => {
                      void navigator.clipboard.writeText(generatedQuote);
                      toast("Copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                    key={generatedQuote}
                  >
                    <p>{generatedQuote}</p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default GeneratedQuote;
