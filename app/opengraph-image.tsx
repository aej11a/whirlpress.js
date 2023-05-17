import { WpSdk } from "@/utils/wp-sdk";
import { ImageResponse } from "next/server";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function og({ params }: { params: { slug: string } }) {
  const siteData = await WpSdk.getSiteData();
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "rgb(235 235 235)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img src={siteData.icon.img} alt="logo" width={200} height={200} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
