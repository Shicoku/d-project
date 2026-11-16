import "./globals.css";
import Header from "./components/header";

import { Chiron_Sung_HK } from "next/font/google";

const RampartOneFont = Chiron_Sung_HK({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${RampartOneFont.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}


