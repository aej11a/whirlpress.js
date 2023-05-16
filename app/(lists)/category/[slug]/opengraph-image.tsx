import { WpSdk } from "@/utils/wp-sdk";
import { ImageResponse } from "next/server";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function og({ params }: { params: { slug: string } }) {
  const [category, siteData] = await Promise.all([
    WpSdk.getCategory(params.slug),
    WpSdk.getSiteData(),
  ]);
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
        <div
          style={{
            display: "flex",
            fontSize: 75,
            fontStyle: "normal",
            color: "black",
            whiteSpace: "pre-wrap",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <p style={{ fontWeight: "bolder"}}>
            Category: {category.name}
            {"\n"}
            {siteData.name}
          </p>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
