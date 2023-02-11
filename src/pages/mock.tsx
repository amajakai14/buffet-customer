import Drinks from "../components/Drinks";
import MainDish from "../components/MainDish";
import Recommend from "../components/Recommend";
import Sidebar from "../components/Sidebar";
import Snacks from "../components/Snacks";
import Vegetables from "../components/Vegetables";
import { menus, menuType } from "../mock/menu";

const Mock = () => {
  const recommend = menus.filter((menu) => menu.type === menuType.RECOMMEND);
  const mainDish = menus.filter((menu) => menu.type === menuType.MAINDISH);
  const vegetables = menus.filter((menu) => menu.type === menuType.VEGETABLES);
  const dessert = menus.filter((menu) => menu.type === menuType.DESSERT);
  const drinks = menus.filter((menu) => menu.type === menuType.DRINKS);
  return (
    <div>
      <Sidebar />
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
          <Vegetables menus={vegetables} />
        </div>
        <div className="pt-5">
          <div>Snack & Others</div>
          <Snacks menus={dessert} />
        </div>
        <div className="pt-5">
          <div>Drinks</div>
          <Drinks menus={drinks} />
        </div>
      </div>
    </div>
  );
};

export default Mock;
