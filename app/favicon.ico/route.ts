import { WpSdk } from "@/utils/wp-sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const siteData = await WpSdk.getSiteData({ cache: "force-cache" });

  const response = await fetch(siteData.icon.ico);
  const image = await response.blob();

  // Convert the blob to a Buffer
  const buffer = await image.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  // Return the image as the response
  return new NextResponse(uint8Array, {
    headers: {
      "Content-Type": "image/x-icon",
    },
  });
}
