// app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "NYC Cleanliness App",
  description: "Visualizing NYC cleanliness and garbage density",
  icons: {
    icon: "/buildings.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
