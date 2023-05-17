import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { WpSdk } from "@/utils/wp-sdk";
import { SearchBar } from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Broadsheet.js Demo",
  description: "Open source headless frontend for WordPress",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = await WpSdk.getSiteData();

  return (
    <html lang="en">
      <body
        className={
          inter.className + " container mx-auto px-4 md:px-18 lg:px-24"
        }
        style={{ backgroundColor: "rgb(235 235 235)" }}
      >
        {siteData.icon.ico && (
          <link rel="icon" href={siteData.icon.ico} sizes="any" />
        )}
        <div className="nav mt-4 mb-4 md:flex md:flex-row md:justify-between grid grid-cols-4">
          <Link href="/" className="col-span-3">
            {siteData.icon.ico && (
              <Image
                src={siteData.icon.img}
                alt="logo"
                width={75}
                height={75}
                className="inline-block mb-5"
              />
            )}
            <h1 className="text-xl font-bold inline-block ml-2">
              {siteData.name}
            </h1>
          </Link>
          <SearchBar />
        </div>
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
