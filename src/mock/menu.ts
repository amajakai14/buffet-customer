export const randomMenu = () => {
  const menu = [];
  const name = "fvylikmrflqvilwykmlntrifgkqhqbwz";
  for (let i = 0; i < 30; i++) {
    //if i < 4 menu type is appetizer if i < 8 menu type is main dish else menu type is dessert
    let type = "dessert";
    if (i < 11) type = "appetizer";
    else if (i < 21) type = "main_dish";
    menu.push({
      id: i,
      name,
      image: "/assets/noimage.jpeg",
      type,
    });
  }
  return menu;
};
