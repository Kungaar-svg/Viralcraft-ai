import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:"#08080a", color:"white", fontFamily:"sans-serif"}}>
        <Header />
        <main style={{minHeight:"80vh"}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
