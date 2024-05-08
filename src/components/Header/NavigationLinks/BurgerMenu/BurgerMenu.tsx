import "./styles.css";

import Icon from "./Icon";
import Links from "./Links";

export default async function BurgerMenu() {
  return (
    <div className="burger-menu-container flex md:hidden flex-col relative w-full">
      <Icon />
      <Links />
    </div>
  );
}
