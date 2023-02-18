import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { photoId } = router.query as { photoId: string };
  return (
    <div
      className={`fixed top-0 w-24 ${photoId ? "bg-slate-300" : "bg-white"}`}
    >
      <div className="flex h-screen flex-col px-2 py-5 shadow">
        <div>
          <div className="pb-4">
            <h2 className="text-xs font-extralight">Means Restaurant</h2>
          </div>
          <div className="flex">
            <ul className="text-sm font-light">
              <li className="pb-4">
                <a href="#appetizer">
                  <span className="active:uppercase">Recommend</span>
                </a>
              </li>
              <li className="pb-4">
                <a href="#main_dish">
                  <span className="active:uppercase">Main Dish</span>
                </a>
              </li>
              <li className="pb-4">
                <a href="#dessert">
                  <span className="active:uppercase">Vegetables</span>
                </a>
              </li>
              <li className="pb-4">
                <a href="#">
                  <span className="active:uppercase">Snack & Others</span>
                </a>
              </li>
              <li className="pb-4">
                <a href="#">
                  <span className="active:uppercase">Drinks</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
