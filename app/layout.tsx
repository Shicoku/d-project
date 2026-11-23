import "./globals.css";
import Header from "./components/header";

import { Chiron_Sung_HK } from "next/font/google";

const ChironSungFont = Chiron_Sung_HK({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className={`min-h-full flex flex-col ${ChironSungFont.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
