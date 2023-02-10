import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { randomMenu } from "../mock/menu";

const Mock = () => {
  let typeTracking = "";
  const [currentType, setCurrentType] = useState("appetizer");
  function isScrolledIntoView(elem: HTMLElement) {
    const docViewTop = window.scrollY;
    const docViewBottom = docViewTop + window.innerHeight;

    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.clientHeight;

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }
  useEffect(() => {
    console.log("re render ");
    console.log(currentType);
    const handleScroll = () => {
      console.log("scrolling");
      const appetizers = document.querySelectorAll(
        "[data-product-type=appetizer]"
      );
      let visible = false;
      appetizers.forEach((item) => {
        isScrolledIntoView(item as HTMLElement) && (visible = true);
      });
      if (visible) {
        setCurrentType("appetizer");
        return;
      }
      const mainDishes = document.querySelectorAll(
        "[data-product-type=main_dish]"
      );
      mainDishes.forEach((item) => {
        isScrolledIntoView(item as HTMLElement) && (visible = true);
      });
      if (visible) {
        setCurrentType("main_dish");
        return;
      }
      const desserts = document.querySelectorAll("[data-product-type=dessert]");
      desserts.forEach((item) => {
        isScrolledIntoView(item as HTMLElement) && (visible = true);
      });
      if (visible) {
        setCurrentType("dessert");
        return;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div id="container">
      <Sidebar currentType={currentType} />
      <div className="ml-32 pl-2">
        <div>Mock</div>
        <div className="grid">
          {randomMenu().map((item) => {
            if (typeTracking !== item.type) {
              typeTracking = item.type;
              return (
                <div
                  id={item.type}
                  key={item.id}
                  className="bg-red-500"
                  data-product-type={item.type}
                >
                  <div>{item.name}</div>
                  <Image src={item.image} width={100} height={100} alt={""} />
                </div>
              );
            } else
              return (
                <div key={item.id} data-product-type={item.type}>
                  <div>{item.name}</div>
                  <Image src={item.image} width={100} height={100} alt={""} />
                </div>
              );
          })}
          <div id="ending">This is End</div>
        </div>
      </div>
    </div>
  );
};

export default Mock;
