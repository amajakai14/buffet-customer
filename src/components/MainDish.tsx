import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";
import { ImageProps } from "../pages/mock";

const MainDish = ({
  menus,
  lastViewedPhotoRef,
  lastViewedPhoto,
}: {
  menus: ImageProps[];
  lastViewedPhotoRef: RefObject<HTMLAnchorElement>;
  lastViewedPhoto: any;
}) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 pt-5">
      {menus.map((menu) => (
        <Link
          key={menu.id}
          href={`/mock?photoId=${menu.id}`}
          shallow={true}
          ref={menu.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
        >
          <Image
            src={menu.imageSrc}
            alt={menu.thaiName}
            width={102}
            height={61}
            className={`h-20 w-28 ${menu.available ? "" : "opacity-50"}`}
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
  );
};

export default MainDish;
