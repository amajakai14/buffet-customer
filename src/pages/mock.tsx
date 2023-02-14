import { useRouter } from "next/router";
import { useState } from "react";
import MainDish from "../components/MainDish";
import Modal from "../components/Modal";
import Recommend from "../components/Recommend";
import Sidebar from "../components/Sidebar";
import { menus, menuType, TMenu } from "../mock/menu";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";

// type of menu and add blurDataUrl property
export interface ImageProps extends TMenu {
  imageSrc: string;
  blurDataUrl?: string;
}

const Mock = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [openModal, setOpenModal] = useState(false);
  if (!images) return <div>Not found</div>;
  const recommend = images.filter((menu) => menu.type === menuType.RECOMMEND);
  const mainDish = images.filter((menu) => menu.type === menuType.MAINDISH);
  const vegetables = images.filter((menu) => menu.type === menuType.VEGETABLES);
  const dessert = images.filter((menu) => menu.type === menuType.DESSERT);
  const drinks = images.filter((menu) => menu.type === menuType.DRINKS);
  return (
    <div>
      <Sidebar />
      <Modal />
      <div className="ml-24 h-screen px-4 pt-5 text-sm font-light">
        <div>
          <div>Recommend</div>
          <Recommend menus={recommend} />
        </div>
        <div className="pt-5">
          <div>Main Dish</div>
          <MainDish menus={mainDish} />
        </div>
        <div className="pt-5">
          <div>Vegetables</div>
          <MainDish menus={vegetables} />
        </div>
        <div className="pt-5">
          <div>Snack & Others</div>
          <MainDish menus={dessert} />
        </div>
        <div className="pt-5">
          <div>Drinks</div>
          <MainDish menus={drinks} />
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

  for (let i = 0; i < menusWithImage.length; i++) {
    menusWithImage[i].blurDataUrl = blurDataUrls[i];
  }
  return {
    props: {
      images: menusWithImage,
    },
  };
}
