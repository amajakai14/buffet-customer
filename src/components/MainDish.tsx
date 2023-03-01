import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RefObject } from "react";
import { TMenuWithUrl } from "../pages/test/[...slug]";

const MainDish = ({
  menus,
  lastViewedPhotoRef,
  lastViewedPhoto,
}: {
  menus: TMenuWithUrl[];
  lastViewedPhotoRef: RefObject<HTMLAnchorElement>;
  lastViewedPhoto: any;
}) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const locale = router.locale;
  return (
    <div className="grid grid-cols-2 gap-y-4 pt-5">
      {menus.map((menu) => (
        <Link
          key={menu.id}
          href={`${currentPath}?photoId=${menu.id}`}
          shallow={true}
          ref={menu.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
        >
          <Image
            src={menu.url}
            alt={menu.menu_name_th}
            width={102}
            height={61}
            className={`h-20 w-28 ${menu.available ? "" : "opacity-50"}`}
          />
          <p className="text-[10px] font-extralight sm:text-xs">
            {locale === "th" ? menu.menu_name_th : menu.menu_name_en}
          </p>
          <p className="text-[10px] font-extralight sm:text-xs">
            {locale === "th" ? menu.menu_name_en : menu.menu_name_th}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MainDish;
