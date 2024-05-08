import LowerFooter from "./lower/LowerFooter";
import UpperFooter from "./upper/UpperFooter";

export default function Footer() {
  return (
    <div
      className={`flex flex-col h-fit w-full 
                  py-[16px] mt-[64px] 
                  border-t border-slate-200`}
    >
      <UpperFooter />
      <LowerFooter />
    </div>
  );
}
