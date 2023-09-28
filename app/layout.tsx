import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import { Inter } from "next/font/google";

import { Container } from "@mui/material";
import TanStackProvider from "./components/providers/TanStackProvider";

import AppNavBar from "@/app/components/common/AppNavBar";
// import { AppNavBar } from "./components/common/AppNavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className} suppressHydrationWarning={true}>
          <TanStackProvider>
            <AppNavBar />
            <Container fixed>{children}</Container>
          </TanStackProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
