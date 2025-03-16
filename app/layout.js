import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Dashboard",
  description: "Modern Next.js Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
