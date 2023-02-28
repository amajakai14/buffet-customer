import { useState } from "react";
import type { TMenu } from "../mock/menu";
import { api } from "../utils/api";
import CartIcon from "./icons/CartIcon";
import OnCartMenus from "./OnCartMenus";

export type DisplayMenus = {
  id: number;
  engName: string;
  thaiName: string;
  amount: number;
  userId: string[];
};

const Cart = ({ channelId, menus }: { channelId: string; menus: TMenu[] }) => {
  const [show, setShow] = useState(false);
  const fetchData = api.cart.getCart.useQuery({ channel_id: channelId });

  function handleClose() {
    setShow(false);
  }

  const fetchedMenus = fetchData.data?.result;
  const displayMenus: DisplayMenus[] = [];

  if (!fetchedMenus) return <></>;

  fetchedMenus.map((fetchedMenu) => {
    const index = displayMenus.findIndex(
      (item) => item.id === fetchedMenu.menu_id
    );
    if (index === -1) {
      displayMenus.push({
        id: fetchedMenu.menu_id,
        engName:
          menus.find((menu) => menu.id === fetchedMenu.menu_id)?.engName || "",
        thaiName:
          menus.find((menu) => menu.id === fetchedMenu.menu_id)?.thaiName || "",
        amount: 1,
        userId: [fetchedMenu.user_id],
      });
    } else {
      displayMenus.map((displayMenu) => {
        if (displayMenu.id === fetchedMenu.menu_id) {
          displayMenu.amount += 1;
          displayMenu.userId.push(fetchedMenu.user_id);
        }
      });
    }
  });
  console.log("displayMenus", displayMenus);
  return (
    <>
      <div className="fixed bottom-20 bg-slate-300 text-center">
        <button onClick={() => setShow(!show)} className="px-6 py-2">
          <CartIcon />
        </button>
      </div>
      <OnCartMenus show={show} handleClose={handleClose} menus={displayMenus} />
    </>
  );
};

export default Cart;
