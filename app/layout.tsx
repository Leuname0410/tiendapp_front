import { montserrat } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialised`}>
        <h1>Tiendapp</h1>
        {children}
        <footer>
          <h4>Do it for Emanuel Naranjo Arias :D</h4>
        </footer>
      </body>
    </html>
  );
}
