import Image from "next/image";
import type { TMenu } from "../mock/menu";

const Recommend = ({ menus }: { menus: TMenu }) => {
  const first = menus[0]!;
  const second = menus[1]!;
  return (
    <>
      <div className="flex justify-between pt-4">
        <Image
          src={first.image}
          alt={first.thaiName}
          width={120}
          height={120}
          className="h-auto w-auto rounded-full"
        />
        <div className="pl-4">
          <p className="pb-1 text-base">{first.engName}</p>
          <p className="text-xs opacity-50">{first.thaiName}</p>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <div className="pl-4">
          <p className="pb-1 text-base">{second.engName}</p>
          <p className="text-xs opacity-50">{second.thaiName}</p>
        </div>
        <Image
          src={second.image}
          alt={second.thaiName}
          width={120}
          height={120}
          className="h-auto w-auto rounded-full"
        />
      </div>
    </>
  );
};

export default Recommend;
