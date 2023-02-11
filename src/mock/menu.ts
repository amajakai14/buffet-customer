export const menuType = {
  RECOMMEND: "recommend",
  MAINDISH: "main",
  VEGETABLES: "vegetables",
  DESSERT: "dessert",
  DRINKS: "drinks",
};

export type TMenu = typeof menus;

export const menus = [
  {
    id: 1,
    engName: "AUSTRALIAN BEEF",
    thaiName: "เนื้อวัวออสเตรเลียเกรดพรีเมี่ยม",
    image: "/assets/recommend1.png",
    type: menuType.RECOMMEND,
    available: true,
  },
  {
    id: 2,
    engName: "USDA ANGUS BEEF",
    thaiName: "เนื้อวัว USDA ANGUS BEEF",
    image: "/assets/recommend2.png",
    type: menuType.RECOMMEND,
    available: true,
  },
  {
    id: 3,
    engName: "Pork Blade Shoulder",
    thaiName: "หมูคุโรบุตะพรีเมี่ยม (สันคอ)",
    image: "/assets/main1.png",
    type: menuType.MAINDISH,
    available: true,
  },
  {
    id: 4,
    engName: "Pork Loid",
    thaiName: "หมูคุโรบุตะนาระ (ส่วนท้อง)",
    image: "/assets/main2.png",
    type: menuType.MAINDISH,
    available: true,
  },
  {
    id: 5,
    engName: "Duck",
    thaiName: "เนื้อเป็ดอนามัย",
    image: "/assets/main3.png",
    type: menuType.MAINDISH,
    available: true,
  },
  {
    id: 6,
    engName: "Chicken Dumpling",
    thaiName: "ไก่ไม้ไผ่",
    image: "/assets/main4.png",
    type: menuType.MAINDISH,
    available: true,
  },
  {
    id: 7,
    engName: "Vegetable Set (L)",
    thaiName: "ชุดผักสุขภาพใหญ่",
    image: "/assets/veg1.jpeg",
    type: menuType.VEGETABLES,
    available: true,
  },
  {
    id: 8,
    engName: "Vegetable Set (S)",
    thaiName: "ชุดผักสุขภาพเล็ก",
    image: "/assets/veg2.webp",
    type: menuType.VEGETABLES,
    available: true,
  },
  {
    id: 9,
    engName: "Long Bok Choy",
    thaiName: "ผักกวางตุ้ง",
    image: "/assets/veg3.jpeg",
    type: menuType.VEGETABLES,
    available: true,
  },
  {
    id: 10,
    engName: "Celery",
    thaiName: "ขึ้นฉ่าย",
    image: "/assets/veg4.jpeg",
    type: menuType.VEGETABLES,
    available: true,
  },
  {
    id: 11,
    engName: "Shanghai Bok Choy",
    thaiName: "ขึ้นฉ่าย",
    image: "/assets/veg5.jpeg",
    type: menuType.VEGETABLES,
    available: true,
  },
  {
    id: 12,
    engName: "Morning Glory",
    thaiName: "ผักบุ้ง",
    image: "/assets/veg6.jpeg",
    type: menuType.VEGETABLES,
    available: false,
  },
  {
    id: 13,
    engName: "Barbecued Pork Bun",
    thaiName: "ซาลาเปาหมูแดง",
    image: "/assets/dessert1.jpeg",
    type: menuType.DESSERT,
    available: true,
  },
  {
    id: 14,
    engName: "Minced Pork Bun",
    thaiName: "ซาลาเปาหมูสับ",
    image: "/assets/dessert2.jpeg",
    type: menuType.DESSERT,
    available: true,
  },
  {
    id: 15,
    engName: "Shanghai Bok Choy",
    thaiName: "ขนมจีบกุ้ง",
    image: "/assets/dessert3.jpeg",
    type: menuType.DESSERT,
    available: true,
  },
  {
    id: 16,
    engName: "Fried Spring Roll",
    thaiName: "เปาะเปี๊ยะทอด",
    image: "/assets/dessert4.jpeg",
    type: menuType.DESSERT,
    available: true,
  },
  {
    id: 17,
    engName: "Coconut Shake",
    thaiName: "น้ำมะพร้าวปั่น",
    image: "/assets/drink1.jpeg",
    type: menuType.DRINKS,
    available: true,
  },
  {
    id: 18,
    engName: "Brown Sugar Milk",
    thaiName: "คิทแคท นมบราวชูการ์เย็น",
    image: "/assets/drink2.png",
    type: menuType.DRINKS,
    available: true,
  },
];
