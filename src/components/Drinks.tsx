import Image from "next/image";
import type { TMenu } from "../mock/menu";

const Drinks = ({ menus }: { menus: TMenu[] }) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 pt-5">
      {menus.map((menu) => (
        <div key={menu.id}>
          <Image
            src={menu.image}
            alt={menu.thaiName}
            width={61}
            height={102}
            className={`h-28 w-20 ${menu.available ? "" : "opacity-50"}`}
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

export default Drinks;
