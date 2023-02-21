import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CartIcon from "./icons/CartIcon";

const Cart = () => {
  const [show, setShow] = useState(false);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function handleClose() {
    setShow(false);
  }
  useEffect(() => {
    console.log("show", show);
  }, [show]);
  return (
    <>
      <div className="fixed bottom-4 bg-slate-300 text-center">
        <button onClick={() => setShow(!show)} className="px-6 py-2">
          <CartIcon />
        </button>
      </div>
      <OnCartMenus show={show} handleClose={handleClose} />
    </>
  );
};

export default Cart;

const OnCartMenus = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  return (
    <AnimatePresence>
      <Dialog
        as={motion.div}
        open={show}
        className="fixed inset-0 z-10 flex items-center justify-center"
        onClose={handleClose}
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
              </Dialog.Overlay>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
};
