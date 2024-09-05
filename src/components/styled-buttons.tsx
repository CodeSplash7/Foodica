import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export const Button1: React.FC<{
  children: React.ReactNode;
  onClick: (e: React.FormEvent) => void;
}> = ({ children, onClick }) => (
  <div className={`btn-1`} onClick={onClick}>
    <span className={`${roboto_condensed.className}`}>{children}</span>
  </div>
);

/* From Uiverse.io by cssbuttons-io */
export const Button2: React.FC<{
  children: React.ReactNode;
  onClick: (e: React.FormEvent) => void;
}> = ({ children, onClick }) => (
  <div className="noselect btn-2" onClick={onClick}>
    <span className={`text ${roboto_condensed.className}`}>{children}</span>
    <span className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
      </svg>
    </span>
  </div>
);

export const Button3 = ({ text }: { text: string }) => {
  return <div className={`btn-3 ${roboto_condensed.className}`}>{text}</div>;
};
