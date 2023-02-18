import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import MainDish from "../components/MainDish";
import Modal from "../components/Modal";
import Recommend from "../components/Recommend";
import Sidebar from "../components/Sidebar";
import { menus, menuType, TMenu } from "../mock/menu";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import { useLastViewedImage } from "../utils/useLastViewedPhoto";

// type of menu and add blurDataUrl property
export interface ImageProps extends TMenu {
  imageSrc: string;
  blurDataUrl?: string;
}

const Mock = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
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
    </div>
  );
};

export default Mock;

export async function getServerSideProps() {
  console.log(menus);
  const imageSrc =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const menusWithImage = menus.map((menu) => {
    const menuWithImage: ImageProps = {
      ...menu,
      imageSrc: `${imageSrc}/${menu.id}.png`,
    };
    return menuWithImage;
  });
  const generateBlurUrl = menusWithImage.map(async (mwi) => {
    return getBase64ImageUrl(mwi);
  });
  console.log("+++++++++++++++menu+++++++++++++++++++++", menusWithImage);
  const blurDataUrls = await Promise.all(generateBlurUrl);
  const result: ImageProps[] = [];
  menusWithImage.forEach((menu, index) => {
    result.push({ ...menu, blurDataUrl: blurDataUrls[index] });
  });

  // for (let i = 0; i < menusWithImage.length; i++) {
  //   if (menusWithImage[i] ) menusWithImage[i].blurDataUrl = blurDataUrls[i];
  // }
  return {
    props: {
      images: result,
    },
  };
}
