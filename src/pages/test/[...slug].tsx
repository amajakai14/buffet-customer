import type { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cart from "../../components/Cart";
import Modal from "../../components/Modal";
import Recommend from "../../components/Recommend";
import Sidebar from "../../components/Sidebar";
import { menuType } from "../../mock/menu";
import { prisma } from "../../server/db";
import { useLastViewedImage } from "../../utils/useLastViewedPhoto";
import MainDish from "./../../components/MainDish";
export type TMenuWithUrl = Menu & { url: string };

const Slug = ({
	menus,
	channelId,
}: {
	menus: TMenuWithUrl[];
	channelId: string;
}) => {
	const router = useRouter();
	const [ws, setWs] = useState<WebSocket | null>(null);
	if (typeof window !== "undefined") {
		const preferredLanguage = navigator.language;
		console.log("asPath", router.asPath);
		if (preferredLanguage === "th" && router.locale !== "th") {
			router.push(router.asPath, router.asPath, { locale: "th" });
		}

	}

	const { photoId } = router.query as { photoId: string };
	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedImage();
	const lastViewedImageRef = useRef<HTMLAnchorElement>(null);

	const recommend = menus.filter(
		(menu) => menu.menu_type === menuType.RECOMMEND
	);
	const mainDish = menus.filter((menu) => menu.menu_type === menuType.MAINDISH);
	const vegetables = menus.filter(
		(menu) => menu.menu_type === menuType.VEGETABLES
	);
	const dessert = menus.filter((menu) => menu.menu_type === menuType.DESSERT);
	const drinks = menus.filter((menu) => menu.menu_type === menuType.DRINKS);
	const payload = {
		action: 1,
		menu: {
			menu_id: 1,
			quantity: 2,
			order_users: [542, 23],
		},
	};

	function handleSendMessage() {
		if (!ws) return
		ws.send(JSON.stringify(payload));
	}


	useEffect(() => {
		const ws = new WebSocket(`ws://localhost:8088/ws/${channelId}`);
		setWs(ws);
		ws.onopen = () => {
			console.log("connected");
		}
		ws.onmessage = (e) => {
			console.log("sent", e)
		}
		if (lastViewedPhoto && !photoId) {
			lastViewedImageRef.current?.scrollIntoView({
				block: "center",
			});
			setLastViewedPhoto(null);
		}

	}, [lastViewedPhoto, photoId, setLastViewedPhoto]);

	return (
		<div>
			<Sidebar />
			{photoId && (
				<Modal
					images={menus}
					onClose={() => {
						setLastViewedPhoto(photoId);
					}}
				/>
			)}
			<div
				className={`ml-24 h-screen px-4 pt-5 text-sm font-light ${photoId ? "bg-slate-300" : ""
					}`}
			>

				<button onClick={() => handleSendMessage()} className="border-gray-50">Send</button>
				<div>
					<div>Recommend</div>
					<Recommend menus={recommend} />
				</div>
				<div className="pt-5">
					<div>Main Dish</div>
					<MainDish
						menus={mainDish}
						lastViewedPhotoRef={lastViewedImageRef}
						lastViewedPhoto={lastViewedPhoto}
					/>
				</div>
				<div className="pt-5">
					<div>Vegetables</div>
					<MainDish
						menus={vegetables}
						lastViewedPhotoRef={lastViewedImageRef}
						lastViewedPhoto={lastViewedPhoto}
					/>
				</div>
				<div className="pt-5">
					<div>Snack & Others</div>
					<MainDish
						menus={dessert}
						lastViewedPhotoRef={lastViewedImageRef}
						lastViewedPhoto={lastViewedPhoto}
					/>
				</div>
				<div className="pt-5">
					<div>Drinks</div>
					<MainDish
						menus={drinks}
						lastViewedPhotoRef={lastViewedImageRef}
						lastViewedPhoto={lastViewedPhoto}
					/>
				</div>
			</div>
			<Cart channelId="abc" menus={menus} />
		</div>
	);
};
export default Slug;

export async function getStaticProps({
	params: { slug },
}: {
	params: { slug: string[] };
}) {
	const corporationId = slug[0];
	const courseId = Number(slug[1]);
	const channelId = slug[2];
	if (!channelId) throw new Error("Invalid channel id");
	if (isNaN(courseId)) throw new Error("Invalid course id");
	const menus = await prisma.menu.findMany({
		where: {
			corporation_id: corporationId,
			CourseOnMenu: {
				some: {
					course_id: courseId,
				},
			},
		},
	});
	const baseImageUrl = "https://d1xgtoppp2m1fw.cloudfront.net";
	const menusWithUrl = menus.map((menu) => {
		return {
			...menu,
			url: baseImageUrl + `/${corporationId}/${menu.id}`,
		};
	});

	return {
		props: {
			menus: menusWithUrl,
			channelId,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const channels = await prisma.channel.findMany({
		where: {
			status: "ACTIVE",
		},
		select: {
			id: true,
			course_id: true,
			Desk: {
				select: {
					corporation_id: true,
				},
			},
		},
	});
	const params = channels.map((channel) => {
		const { course_id, id } = channel;
		const { corporation_id } = channel.Desk;
		return {
			params: {
				slug: [corporation_id, String(course_id), String(id)],
			},
		};
	});
	return {
		paths: params,
		fallback: "blocking",
	};
}
