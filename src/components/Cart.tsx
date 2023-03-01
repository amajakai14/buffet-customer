import { useState } from "react";
import type { TMenuWithUrl } from "../pages/test/[...slug]";
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

const Cart = ({
  channelId,
  menus,
}: {
  channelId: string;
  menus: TMenuWithUrl[];
}) => {
  const [show, setShow] = useState(false);
  const fetchData = api.cart.getCart.useQuery({ channel_id: channelId });

  function handleClose() {
    setShow(false);
    fetchData.refetch();
  }

  let fetchedMenus = fetchData.data?.result;
  const displayMenus: DisplayMenus[] = [];

  if (fetchData.isLoading) return <>Loading...</>;
  if (!fetchedMenus) fetchedMenus = [];

  fetchedMenus.map((fetchedMenu) => {
    const index = displayMenus.findIndex(
      (item) => item.id === fetchedMenu.menu_id
    );
    if (index === -1) {
      displayMenus.push({
        id: fetchedMenu.menu_id,
        engName:
          menus.find((menu) => menu.id === fetchedMenu.menu_id)?.menu_name_en ||
          "",
        thaiName:
          menus.find((menu) => menu.id === fetchedMenu.menu_id)?.menu_name_th ||
          "",
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
