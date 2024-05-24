import { GITHUB_LINK } from "../constant/todo.constant";
const navArr: IconProps[] = [
  {
    icon: "i-ri:github-line",
    handler: () => {
      window.open(GITHUB_LINK, "_blank");
    },
  },
  {
    icon: "i-gravity-ui:copy-transparent",
    handler: () => {
      window.open(GITHUB_LINK, "_blank");
    },
  },
  {
    icon: "i-gravity-ui:copy-plus",
    handler: () => {
      window.open(GITHUB_LINK, "_blank");
    },
  },
];
const Footer = () => {
  return (
    <footer w-full flex="~ row items-center justify-center">
      <nav
        className="bg-[rgba(255,255,255,0.56)] p-2  rounded-3"
        flex="~ row gap-2"
      >
        {navArr.map((nav) => (
          <IconBtn icon={nav.icon} handler={nav.handler} />
        ))}
      </nav>
    </footer>
  );
};

interface IconProps {
  handler: () => void;
  icon: string;
}

const IconBtn = ({ handler, icon }: IconProps) => {
  return (
    <div
      className={`cursor-pointer  p-2 rounded-full hover:text-primary/100 text-[#AEAEAE] hover:bg-tint-1/100  transition-all-color`}
      onClick={() => handler()}
    >
      <div className={`${icon}  text-6 `} />
    </div>
  );
};

export default Footer;
