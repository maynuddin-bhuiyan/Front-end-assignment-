// import Footer from "@/components/footer";
// import Header from "@/components/header";
import "../styles/globals.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Optional 
import "swiper/css/pagination"; // Optional  
import Footer from "../components/footer";
import Header from "../components/header";

// Metadata object
export const metadata = {
  title: "Short Frontend Task",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  openGraph: {
    title: "",
    description: "",
    url: "", // Replace with your website URL
    images: [
      {
        url: "", // Open Graph image
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    images: [""],
  },
};

export default function RootLayout({ children }) {
 
  return (
    <html style={{ scrollBehavior: "smooth" }}>
        <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </head>
      <body>     
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
