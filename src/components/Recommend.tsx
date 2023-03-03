import Image from "next/image";
import type { TMenuWithUrl } from "../pages/test/[...slug]";

const Recommend = ({ menus }: { menus: TMenuWithUrl[] }) => {
  const first = menus[0];
  const second = menus[1];
  if (!first || !second) return <div>Not Found</div>;
  return (
    <>
      <div className="flex justify-between pt-4">
        <Image
          // src={first.image}
          src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max"
          alt={first.menu_name_th}
          width={120}
          height={120}
          className="h-auto w-auto rounded-full"
        />
        <div className="pl-4">
          <p className="pb-1 text-base">{first.menu_name_en}</p>
          <p className="text-xs opacity-50">{first.menu_name_th}</p>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <div className="pl-4">
          <p className="pb-1 text-base">{second.menu_name_en}</p>
          <p className="text-xs opacity-50">{second.menu_name_th}</p>
        </div>
        <Image
          src={second.url}
          alt={second.menu_name_th}
          width={120}
          height={120}
          className="h-auto w-auto rounded-full"
        />
      </div>
    </>
  );
};

export default Recommend;
