import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MainDish from "../components/MainDish";
import Recommend from "../components/Recommend";
import Sidebar from "../components/Sidebar";
import { env } from "../env.mjs";
import { menus, menuType, TMenu } from "../mock/menu";

// type of menu and add blurDataUrl property
export interface ImageProps extends TMenu {
  imageSrc: string;
  blurDataUrl?: string;
}

const Mock = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  console.log(photoId);
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
      {/* <Modal /> */}
      <div className="ml-24 h-screen px-4 pt-5 text-sm font-light">
        <div>
          <div>Recommend</div>
          <Recommend menus={recommend} />
        </div>

        <div className="grid grid-cols-2 gap-y-4 pt-5">
          {mainDish.map((menu) => (
            <Link
              key={menu.id}
              href={`/?photoId=${menu.id}`}
              as={`/p/${menu.id}`}
              shallow
            >
              <Image
                src={menu.imageSrc}
                alt={menu.thaiName}
                width={102}
                height={61}
                className={`h-20 w-28 ${menu.available ? "" : "opacity-50"}`}
                blurDataURL={menu.blurDataUrl}
              />
              <p className="text-[10px] font-extralight sm:text-xs">
                {menu.engName}
              </p>
              <p className="text-[10px] font-extralight sm:text-xs">
                {menu.thaiName}
              </p>
            </Link>
          ))}
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

export function getStaticProps() {
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
      images: menusWithImage,
    },
  };
}
