import "./globals.css";
import { JavariChat } from "@/components/JavariChat";

export const metadata = {
  title: "Module Name | CR AudioViz AI",
  description: "Your module description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
        <JavariChat moduleContext="module-slug" />
      </body>
    </html>
  );
}

