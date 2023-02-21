import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useReducer, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import type { ImageProps } from "../pages/mock";
import { useLastViewedImage } from "../utils/useLastViewedPhoto";
import Cart from "./icons/CartIcon";
import Minus from "./icons/Minus";
import Plus from "./icons/Plus";

type STATE = {
  count: number;
  currentPhoto: ImageProps | undefined;
};

type ACTION = {
  type: "increment" | "decrement" | "reset";
};

function reducer(state: STATE, action: ACTION): STATE {
  if (state.currentPhoto && !state.currentPhoto.available) {
    return state;
  }

  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: ++state.count,
      };
    case "decrement":
      if (state.count === 0) return { ...state, count: 0 };
      else {
        return {
          ...state,
          count: --state.count,
        };
      }
    case "reset":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}

export default function Modal({
  images,
  onClose,
}: {
  images: ImageProps[];
  onClose: () => void;
}) {
  const router = useRouter();

  const { photoId } = router.query;
  const index = Number(photoId);
  const currentPhoto = images?.find((image) => image.id === index);

  const [, setLastViewedPhoto] = useLastViewedImage();
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    currentPhoto,
  });
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const overlayRef = useRef(null);

  function handleClose() {
    if (typeof photoId !== "string") {
      onClose();
      return;
    }
    dispatch({ type: "reset" });
    setLastViewedPhoto(photoId);
    router.push("/mock", undefined, { shallow: true });
    onClose();
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        setDirection(1);
        dispatch({ type: "reset" });
        router.push(`/mock?photoId=${index + 1}`, undefined, {
          shallow: true,
        });
      }
    },

    onSwipedRight: () => {
      if (index > 0) {
        setDirection(-1);
        dispatch({ type: "reset" });
        router.push(`/mock?photoId=${index - 1}`, `/mock/p/${index - 1}`, {
          shallow: true,
        });
      }
    },

    onSwipedDown: () => {
      handleClose();
    },

    onSwipedUp: () => {
      handleClose();
    },
    trackMouse: true,
  });
  if (!currentPhoto) return <div>Not Found</div>;
  const initial = direction === 1 ? 300 : -300;
  const exit = direction === 1 ? -300 : 300;

  return (
    <>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <Dialog
            static
            as={motion.div}
            open={true}
            className="fixed inset-0 z-10 flex items-center justify-center"
            onClose={handleClose}
            initialFocus={overlayRef}
            {...handlers}
          >
            <div className="fixed bottom-0 min-w-full overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel
                  as={motion.div}
                  ref={overlayRef}
                  className="min-h-[70vh] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl backdrop-blur-2xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className={`text-center text-lg font-medium leading-6 text-gray-900 ${
                      loaded ? "" : "inline-block animate-pulse"
                    }`}
                    style={{
                      animationDelay: "0.2s",
                      animationDuration: "0.5s",
                    }}
                  >
                    {currentPhoto?.engName}
                  </Dialog.Title>
                  <p className="text-center text-sm text-gray-500">
                    {currentPhoto?.thaiName}
                  </p>
                  <Dialog.Overlay
                    className="flex items-center justify-center"
                    as={motion.div}
                    key={currentPhoto.id}
                    initial={{ x: initial, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: exit, opacity: 0 }}
                  >
                    <Image
                      src={currentPhoto.imageSrc}
                      alt="some image"
                      width={300}
                      height={300}
                      priority
                      onLoadingComplete={() => setLoaded(true)}
                      className={`${
                        currentPhoto.available ? "" : "opacity-50"
                      }`}
                    />
                  </Dialog.Overlay>
                  <div className="mt-4">
                    <div className="flex justify-center gap-6">
                      <button
                        className="active:bg-slate-300"
                        onClick={() => {
                          dispatch({ type: "increment" });
                        }}
                      >
                        <Plus />
                      </button>
                      <div className="flex items-center justify-center">
                        <p>{state?.count}</p>
                      </div>
                      <button
                        className="active:bg-slate-300"
                        onClick={() => {
                          dispatch({ type: "decrement" });
                        }}
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="flex justify-center gap-3 rounded-md p-3 hover:bg-slate-300">
                      <p>Add to cart</p>
                      <Cart />
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
