import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yurulito | 腸の状態チェック",
  description: "腸もみサロン Yurulito の診断アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
