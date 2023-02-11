import Image from "next/image";
import type { TMenu } from "../mock/menu";

const Vegetables = ({ menus }: { menus: TMenu }) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 pt-5">
      {menus.map((menu) => (
        <div key={menu.id}>
          <Image
            src={menu.image}
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
        </div>
      ))}
    </div>
  );
};

export default Vegetables;
