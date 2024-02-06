import "./global.scss";

import { PropsWithChildren } from "react";

export const metadata = {
  title: "ADMIN | Techos.dev",
  description: "ADMIN | Techos.dev",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
