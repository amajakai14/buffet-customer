import Image from "next/image";
import { ImageProps } from "../pages/mock";

const Recommend = ({ menus }: { menus: ImageProps[] }) => {
  const first = menus[0]!;
  const second = menus[1]!;
  return (
    <>
      <div className="flex justify-between pt-4">
        <Image
          // src={first.image}
          src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max"
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
