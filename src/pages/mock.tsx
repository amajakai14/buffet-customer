import Image from "next/image";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { randomMenu } from "../mock/menu";

const Mock = () => {
  let typeTracking = "";
  //log when window scroll
  useEffect(() => {
    console.log("re render ");
    const handleScroll = () => {
      const container = document.getElementById("container");
      const htmlElement = document.getElementById("appetizer");
      const htmlElement2 = document.getElementById("main_dish");
      const htmlElement3 = document.getElementById("dessert");
      if (
        htmlElement === null ||
        htmlElement2 === null ||
        htmlElement3 === null
      )
        return;
      // make array of html element
      const arrayHtmlElement = [htmlElement, htmlElement2, htmlElement3];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      //   console.log("scrollPosition", scrollPosition);
      //   console.log("windowHeight", windowHeight);
      const ceiling = scrollPosition;
      const floor = scrollPosition + windowHeight;
      const center = (ceiling + floor) / 2;
      //   console.log("centerPosition", center);
      arrayHtmlElement.forEach((element) => {
        const endingPosition = element.offsetTop;
        const endingBottom = endingPosition + element.offsetHeight;
        // console.log(
        //   "element",
        //   element.id,
        //   "endingBottom",
        //   endingBottom,
        //   "endingPosition",
        //   endingPosition
        // );
        const ratio = endingPosition / center;
        if (ratio > 0.95 && ratio < 1.0) {
          console.log(
            `########################element${element.id} is in view###########################`
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div id="container">
      <Sidebar />
      <div className="ml-32 pl-2">
        <div>Mock</div>
        <div className="grid">
          {randomMenu().map((item) => {
            if (typeTracking !== item.type) {
              typeTracking = item.type;
              return (
                <div id={item.type} key={item.id} className="bg-red-500">
                  <div>{item.name}</div>
                  <Image src={item.image} width={100} height={100} alt={""} />
                </div>
              );
            } else
              return (
                <div key={item.id}>
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
