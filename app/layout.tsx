import { M_PLUS_1 } from "next/font/google";
import Header from "./components/header";
import { Metadata } from "next";
import "./globals.css";

const MPlus1Font = M_PLUS_1({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corgi - 講義口コミサイト",
  description: "中部大学生向けの講義評価をするためのWebサービスです。",
  appleWebApp: {
    capable: true,
    title: "Corgi",
    statusBarStyle: "default",
  },
};

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
