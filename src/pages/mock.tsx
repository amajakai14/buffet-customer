import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import nextI18nConfig from "../../next-i18next.config.mjs";
import Cart from "../components/Cart";
import MainDish from "../components/MainDish";
import Modal from "../components/Modal";
import Recommend from "../components/Recommend";
import Sidebar from "../components/Sidebar";
import { env } from "../env.mjs";
import { menus, menuType, TMenu } from "../mock/menu";
import { useLastViewedImage } from "../utils/useLastViewedPhoto";

// type of menu and add blurDataUrl property
export interface ImageProps extends TMenu {
  imageSrc: string;
}

const Mock = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  console.log(router.locale);
  const { photoId } = router.query as { photoId: string };
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedImage();
  const lastViewedImageRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedImageRef.current?.scrollIntoView({
        block: "center",
      });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, photoId, setLastViewedPhoto]);

  if (!images) return <div>Not found</div>;
  const recommend = images.filter((menu) => menu.type === menuType.RECOMMEND);
  const mainDish = images.filter((menu) => menu.type === menuType.MAINDISH);
  const vegetables = images.filter((menu) => menu.type === menuType.VEGETABLES);
  const dessert = images.filter((menu) => menu.type === menuType.DESSERT);
  const drinks = images.filter((menu) => menu.type === menuType.DRINKS);
  return (
    <div>
      <Sidebar />
      {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )}
      <div
        className={`ml-24 h-screen px-4 pt-5 text-sm font-light ${
          photoId ? "bg-slate-300" : ""
        }`}
      >
        <div>
          <div>Recommend</div>
          <Recommend menus={recommend} />
        </div>
        <div className="pt-5">
          <div>Main Dish</div>
          <MainDish
            menus={mainDish}
            lastViewedPhotoRef={lastViewedImageRef}
            lastViewedPhoto={lastViewedPhoto}
          />
        </div>
        <div className="pt-5">
          <div>Vegetables</div>
          <MainDish
            menus={vegetables}
            lastViewedPhotoRef={lastViewedImageRef}
            lastViewedPhoto={lastViewedPhoto}
          />
        </div>
        <div className="pt-5">
          <div>Snack & Others</div>
          <MainDish
            menus={dessert}
            lastViewedPhotoRef={lastViewedImageRef}
            lastViewedPhoto={lastViewedPhoto}
          />
        </div>
        <div className="pt-5">
          <div>Drinks</div>
          <MainDish
            menus={drinks}
            lastViewedPhotoRef={lastViewedImageRef}
            lastViewedPhoto={lastViewedPhoto}
          />
        </div>
      </div>
      <Cart channelId="abc" menus={menus} />
    </div>
  );
};

export default Mock;

export async function getServerSideProps({ locale }: { locale: string }) {
  const imageSrc = env.CLOUDFRONT_URL;
  const menusWithImage = menus.map((menu) => {
    const menuWithImage: ImageProps = {
      ...menu,
      imageSrc: `${imageSrc}/${menu.id}.jpg`,
    };
    return menuWithImage;
  });

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "mock"],
        nextI18nConfig,
        ["en", "th"]
      )),
      images: menusWithImage,
    },
  };
}
