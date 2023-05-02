import type { AppType } from "next/app";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { api } from "@/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
