import Image from "next/image";
import { ImageProps } from "../pages/mock";

const MainDish = ({ menus }: { menus: ImageProps[] }) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 pt-5">
      {menus.map((menu) => (
        <div key={menu.id}>
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
        </div>
      ))}
    </div>
  );
};

export default MainDish;
