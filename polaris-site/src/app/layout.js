import "./globals.css";

export const metadata = {
  title: "POLARIS — Earth Beyond Borders",
  description:
    "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}