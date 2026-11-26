import "./globals.css";
import Header from "./components/header";

import { M_PLUS_1 } from "next/font/google";

const MPlus1Font = M_PLUS_1({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className={`min-h-full flex flex-col ${MPlus1Font.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
