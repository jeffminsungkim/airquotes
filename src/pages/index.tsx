import type { NextPage } from "next";
import type { MultiValue, SingleValue } from "react-select";
import type { LanguageOutputType } from "@/components/Dropdown";
import type { SelectedVibeType } from "@/components/MultiSelectDropdown";
import type { MouseEvent } from "react";
import { toast } from "react-hot-toast";

import { useRef, useState } from "react";
import { api } from "@/utils/api";

import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Github from "@/components/Github";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { promptHanlder } from "../utils/promptHandler";
import { LoadingSpinner } from "@/components/Loading";

const BounceLoader = dynamic(() => import("@/components/LoaderDots"));
const GeneratedQuote = dynamic(() => import("@/components/GeneratedQuote"));

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [generateCount, setGenerateCount] = useState(0);
  const [generatedQuotes, setGeneratedQuotes] = useState("");
  const [languageOutput, setLanguageOutput] = useState<
    SingleValue<LanguageOutputType>
  >({ value: "English", label: "English" });
  const [vibes, setVibes] = useState<MultiValue<SelectedVibeType>>([
    {
      value: "famous",
      label: "Famous",
    },
  ]);

  const { data: quotes } = api.quote.getAllGeneratedQuotes.useQuery();

  const { mutate } = api.quote.create.useMutation();

  const quoteRef = useRef<null | HTMLDivElement>(null);

  const scrollToQuotes = () => {
    if (quoteRef.current !== null) {
      quoteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchGeneratedQuotes = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setGeneratedQuotes("");
    setLoading(true);

    const prompt = promptHanlder(languageOutput, vibes, generateCount);

    const response = await fetch("/api/fetchGeneratedQuotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        toast.error(response.statusText);
        setLoading(false);
        return;
      }
    }

    const data = response.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedQuotes((prev) => prev + chunkValue);
    }

    scrollToQuotes();
    setLoading(false);
    setGenerateCount((prev) => prev + 1);
    mutate();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Quote Generator - airquotes.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <a
          className="mb-5 flex max-w-fit items-center justify-center space-x-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-zinc-100"
          href="https://github.com/jeffminsungkim/airquotes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="max-w-[700px] text-4xl font-bold text-app sm:text-6xl">
          Generate popular &quot;Quotes&quot; using{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            ChatGPT
          </span>
        </h1>
        {!quotes ? (
          <div className="mt-5 h-5">
            <LoadingSpinner />
          </div>
        ) : (
          <p className="mt-5 h-5 text-zinc-500">{`${Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(quotes)} quotes generated so far`}</p>
        )}

        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center space-x-3">
            <Image
              src="/icon-1-black.png"
              width={35}
              height={35}
              alt="1 icon image"
              className="sm:mb-0"
            />
            <p className="text-left font-medium">
              Select the language for the output.
            </p>
          </div>
          <div className="mt-4">
            <Dropdown
              languageOutput={languageOutput}
              setLanguageOutput={(lang) => setLanguageOutput(lang)}
            />
          </div>
        </div>
        <div className="w-full max-w-xl">
          <div className="mb-5 mt-5 flex items-center space-x-3">
            <Image
              src="/icon-2-black.png"
              width={35}
              height={35}
              alt="2 icon image"
              className="sm:mb-0"
            />
            <p className="text-left font-medium">
              Pick more vibes if you want.
            </p>
          </div>
          <div className="mt-5">
            <MultiSelectDropdown setVibes={(vibes) => setVibes(vibes)} />
          </div>
          {!loading && (
            <button
              className="mt-8 h-10 w-full rounded-md bg-app px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              onClick={(e) => void fetchGeneratedQuotes(e)}
            >
              Generate quotes
            </button>
          )}
          {loading && (
            <button
              className="mt-8 h-10 w-full rounded-md bg-app px-4 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
              disabled
            >
              <BounceLoader />
            </button>
          )}
        </div>
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          <GeneratedQuote
            generatedQuotes={generatedQuotes}
            quoteRef={quoteRef}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
