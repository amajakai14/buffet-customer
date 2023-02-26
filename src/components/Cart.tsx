import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import type { TMenu } from "../mock/menu";
import { api } from "../utils/api";
import CartIcon from "./icons/CartIcon";

type DisplayMenus = {
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
  useEffect(() => {
    console.log("show", show);
  }, [show]);
  const fetchedMenus = fetchData.data?.result;
  const toShowMenus = fetchedMenus?.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item.id === cur.id);
    if (index === -1) {
      acc.push({
        id: cur.id,
        engName: menus.find((menu) => menu.id === cur.id)?.engName || "",
        thaiName: menus.find((menu) => menu.id === cur.id)?.thaiName || "",
        amount: 1,
        userId: [cur.user_id],
      });
    } else {
      acc = acc.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            amount: item.amount + 1,
            userId: [...item.userId, cur.user_id],
          };
        }
        return item;
      });
    }
    return acc;
  }, [] as DisplayMenus[]);
  return (
    <>
      <div className="fixed bottom-20 bg-slate-300 text-center">
        <button onClick={() => setShow(!show)} className="px-6 py-2">
          <CartIcon />
        </button>
      </div>
      <OnCartMenus show={show} handleClose={handleClose} menus={toShowMenus} />
    </>
  );
};

export default Cart;

const OnCartMenus = ({
  show,
  handleClose,
  menus,
}: {
  show: boolean;
  handleClose: () => void;
  menus: DisplayMenus[] | undefined;
}) => {
  return (
    <MotionConfig
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      }}
    >
      <AnimatePresence>
        <Dialog
          as={motion.div}
          open={show}
          className="fixed inset-0 z-10 flex items-center justify-center"
          onClose={handleClose}
          initial={{ y: 1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -1000, opacity: 0 }}
        >
          <div className="fixed bottom-0 min-w-full overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel
                as={motion.div}
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl backdrop-blur-2xl transition-all"
              >
                <Dialog.Title as="h3">Cart</Dialog.Title>
                <p className="text-center text-sm text-gray-500">Takra</p>
                <Dialog.Overlay
                  className="flex items-center justify-center"
                  as={motion.div}
                >
                  <div>Some thing in the box</div>
                  {menus &&
                    menus.map((menu) => (
                      <div key={menu.id}>
                        <p>{menu.engName}</p>
                        <p>{menu.thaiName}</p>
                        <p>{menu.amount}</p>
                        {menu.userId.map((id) => (
                          <p key={id}>{id}</p>
                        ))}
                      </div>
                    ))}
                </Dialog.Overlay>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </AnimatePresence>
    </MotionConfig>
  );
};
