import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useTranslation } from "next-i18next";
import { DisplayMenus } from "./Cart";

const OnCartMenus = ({
  show,
  handleClose,
  menus,
}: {
  show: boolean;
  handleClose: () => void;
  menus: DisplayMenus[];
}) => {
  const { t, i18n } = useTranslation("mock");
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
          className="fixed inset-0 z-10 flex items-center justify-center bg-gray-200"
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
                <Dialog.Title as="h3" className="text-center">
                  {t("cart")}
                </Dialog.Title>
                <div className="flex justify-between text-sm">
                  <div>{t("menu")}</div>
                  <div>{t("amount")}</div>
                </div>
                <Dialog.Overlay
                  className="max-h-[36rem] items-center overflow-auto pb-4"
                  as={motion.div}
                >
                  {menus &&
                    menus.map((menu) => (
                      <div key={menu.id} className="relative">
                        <div className="flex justify-between py-2 text-xs">
                          <div className="text-left">
                            <div>
                              {i18n.language === "th"
                                ? menu.thaiName
                                : menu.engName}
                            </div>
                          </div>
                          <div className="pr-4">
                            <p>{menu.amount}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {menu.userId.map((id, idx) => {
                            let dynamic = "";
                            switch (idx) {
                              case 0:
                                dynamic = "z-50";
                                break;
                              case 1:
                                dynamic = "z-40  translate-x-[-70%]";
                                break;
                              case 2:
                                dynamic = "z-30 translate-x-[-140%]";
                                break;
                              case 3:
                                dynamic = "z-20 translate-x-[-210%]";
                                break;
                              case 4:
                                dynamic = "z-10 translate-x-[-280%]";
                                break;
                              case 5:
                                dynamic = "z-0 translate-x-[-350%]";
                                break;
                              default:
                                dynamic = "hidden";
                            }
                            return (
                              <div key={id} className={`${dynamic} `}>
                                <div
                                  className={`h-8 w-8 rounded-full border-2 border-green-400 bg-sky-400`}
                                >
                                  <div className="text-center text-xs">
                                    {id}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </Dialog.Overlay>
                <Dialog.Overlay as={motion.div} className="pt-4 text-center">
                  <button onClick={() => console.log("I'm clicked")}>
                    Click Me
                  </button>
                </Dialog.Overlay>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </AnimatePresence>
    </MotionConfig>
  );
};

export default OnCartMenus;
