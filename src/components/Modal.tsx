import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useReducer } from "react";
import { useSwipeable } from "react-swipeable";
import { ImageProps } from "../pages/mock";
import { useLastViewedImage } from "../utils/useLastViewedPhoto";
import Cart from "./icons/Cart";
import Minus from "./icons/Minus";
import Plus from "./icons/Plus";

type STATE = {
  count: number;
};

type ACTION = {
  type: "increment" | "decrement" | "reset";
};

function reducer(state: STATE, action: ACTION) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count++,
      };
    case "decrement":
      if (state.count === 0) return { count: 0 };
      else {
        return {
          count: state.count--,
        };
      }
    case "reset":
      return {
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

  const [, setLastViewedPhoto] = useLastViewedImage();
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function handleClose() {
    dispatch({ type: "reset" });
    setLastViewedPhoto(photoId);
    router.push("/mock", undefined, { shallow: true });
    onClose();
  }
  const currentPhoto = images?.find((image) => image.id === index);

  function changePhotoId(newVal: number) {
    return newVal;
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        dispatch({ type: "reset" });
        router.push(`/mock?photoId=${index + 1}`, `/mock/p/${index + 1}`, {
          shallow: true,
        });
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        dispatch({ type: "reset" });
        router.push(`/mock?photoId=${index - 1}`, `/mock/p/${index - 1}`, {
          shallow: true,
        });
      }
    },
    onSwipedDown: () => {
      handleClose();
    },
    trackMouse: true,
  });

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10"
          onClose={handleClose}
          {...handlers}
        >
          <div className="fixed bottom-0 min-w-full overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="min-h-[70vh] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    {currentPhoto?.engName}
                  </Dialog.Title>
                  <p className="text-center text-sm text-gray-500">
                    {currentPhoto?.thaiName}
                  </p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={currentPhoto.imageSrc}
                      alt="image"
                      width={200}
                      height={200}
                    />
                  </div>
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
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
