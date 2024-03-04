import Link from "next/link";
import Image from "next/image";
import Select from "react-select";

export default function Navbar() {
  return (
    <div>
      <div className="z-0 bg-[#fafafa] border-b-[1px] absolute left-0 top-0 w-screen h-[56px] flex"></div>
      <div className="z-10 w-full relative h-[56px] flex md:justify-between justify-center items-center">
        <div className="md:flex hidden text-slate-800 text-[12px] font-medium gap-[30px]">
          <Link
            className="hover:text-[#818592] transition duration-150"
            href="#"
          >
            ABOUT
          </Link>
          <Link
            className="hover:text-[#818592] transition duration-150"
            href="#"
          >
            CONTACT
          </Link>
        </div>
        <div className="flex gap-[16px]">
          <Link href="https://www.facebook.com/profile.php?id=100058719204557">
            <FacebookIcon w="24" />
          </Link>
          <XIcon w="24" />
          <Link href="https://www.instagram.com/roscarares007/?next=%2F">
            <InstagramIcon w="24" />
          </Link>
          <MailIcon w="24" />
        </div>
      </div>
    </div>
  );
}

type IconComponentProps = {
  w: string | number;
};

const FacebookIcon = ({ w }: IconComponentProps) => (
  <div title="Follow on facebook" className="group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="facebook"
      width={w}
      height={w}
      viewBox="0 0 128 128"
    >
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M64 7.989c-30.885 0-56.01 25.126-56.01 56.01 0 30.885 25.125 56.012 56.01 56.012 30.883 0 56.01-25.127 56.01-56.012 0-30.884-25.127-56.01-56.01-56.01zm15.83 35.358a1 1 0 0 1-1 1l-6.367.004c-4.201 0-4.969 1.636-4.969 4.858v6.684h10.92c.287 0 .561.124.75.34s.277.503.242.788l-1.555 12.033a1 1 0 0 1-.992.872h-9.365v29.879a1 1 0 0 1-1 1H54.07a1 1 0 0 1-1-1V69.926h-9.395a1 1 0 0 1-1-1V56.893a1 1 0 0 1 1-1h9.395v-7.875c0-10.43 6.312-16.908 16.475-16.908 4.369 0 8.23.325 9.416.482a1 1 0 0 1 .869.991v10.764z"
      />
    </svg>
  </div>
);

const XIcon = ({ w }: IconComponentProps) => (
  <div title="Follow me on X" className="group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      width={w}
      height={w}
      viewBox="0 0 540 540"
    >
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z"
      />
      <path
        fill={"white"}
        fillRule="nonzero"
        d="M318.64 157.549h33.401l-72.973 83.407 85.85 113.495h-67.222l-52.647-68.836-60.242 68.836h-33.423l78.052-89.212-82.354-107.69h68.924l47.59 62.917 55.044-62.917zm-11.724 176.908h18.51L205.95 176.493h-19.86l120.826 157.964z"
      />
    </svg>
  </div>
);

const InstagramIcon = ({ w }: IconComponentProps) => (
  <div title="Follow me on instagram" className="group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Instagram w/circle"
      width={w}
      height={w}
      viewBox="0 0 20 20"
      id="instagram"
    >
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M13.498 6.651a1.656 1.656 0 0 0-.95-.949 2.766 2.766 0 0 0-.928-.172c-.527-.024-.685-.03-2.02-.03s-1.493.006-2.02.03a2.766 2.766 0 0 0-.929.172 1.656 1.656 0 0 0-.949.95 2.766 2.766 0 0 0-.172.928c-.024.527-.03.685-.03 2.02s.006 1.493.03 2.02a2.766 2.766 0 0 0 .172.929 1.656 1.656 0 0 0 .95.949 2.766 2.766 0 0 0 .928.172c.527.024.685.03 2.02.03s1.493-.006 2.02-.03a2.766 2.766 0 0 0 .929-.172 1.656 1.656 0 0 0 .949-.95 2.766 2.766 0 0 0 .172-.928c.024-.527.03-.685.03-2.02s-.006-1.493-.03-2.02a2.766 2.766 0 0 0-.172-.929zM9.6 12.168A2.568 2.568 0 1 1 12.168 9.6 2.568 2.568 0 0 1 9.6 12.168zm2.669-4.637a.6.6 0 1 1 .6-.6.6.6 0 0 1-.6.6z"
      />
      <circle
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        cx="9.6"
        cy="9.6"
        r="1.667"
      />
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M9.6 0a9.6 9.6 0 1 0 9.6 9.6A9.6 9.6 0 0 0 9.6 0zm4.97 11.662a3.67 3.67 0 0 1-.233 1.213 2.556 2.556 0 0 1-1.462 1.462 3.67 3.67 0 0 1-1.213.233c-.534.024-.704.03-2.062.03s-1.528-.006-2.062-.03a3.67 3.67 0 0 1-1.213-.233 2.556 2.556 0 0 1-1.462-1.462 3.67 3.67 0 0 1-.233-1.213c-.024-.534-.03-.704-.03-2.062s.006-1.528.03-2.062a3.67 3.67 0 0 1 .233-1.213 2.556 2.556 0 0 1 1.462-1.462 3.67 3.67 0 0 1 1.213-.233c.534-.024.704-.03 2.062-.03s1.528.006 2.062.03a3.67 3.67 0 0 1 1.213.233 2.556 2.556 0 0 1 1.462 1.462 3.67 3.67 0 0 1 .233 1.213c.024.534.03.704.03 2.062s-.006 1.528-.03 2.062z"
      />
    </svg>
  </div>
);

const MailIcon = ({ w }: IconComponentProps) => (
  <div title="Mail me" className="group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={w}
      viewBox="0 0 26 26"
      id="mail"
    >
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M13 0A13 13 0 0 0 0 13a13 13 0 0 0 13 13 13 13 0 0 0 13-13A13 13 0 0 0 13 0zM5.621 8v.004l.02.016h14.855a.5.5 0 0 1 .502.5v8.98a.5.5 0 0 1-.502.5H5.527a.5.5 0 0 1-.5-.5V8.805L5 8.783l.027-.035v-.232a.5.5 0 0 1 .5-.5h.082L5.621 8zm1.281 1.016 6.118 4.847 6.109-4.847H6.902zm-.877.582V17h13.971V9.602l-6.666 5.293a.5.5 0 0 1-.62 0L6.026 9.598z"
      />
    </svg>
  </div>
);
