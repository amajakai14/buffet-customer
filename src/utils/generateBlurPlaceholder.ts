import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import { ImageProps } from "../pages/mock";

const cache = new Map<number, string>();

export default async function getBase64ImageUrl(
  image: ImageProps
): Promise<string> {
  let url = cache.get(image.id);
  if (url) {
    console.log("hit");
    return url;
  }
  console.log("not hit");
  const response = await fetch(image.imageSrc);
  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()],
  });

  url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  cache.set(image.id, url);
  return url;
}
