type IconComponentProps = {
  w: string | number;
  h?: string | number;
};

export const FacebookIcon = ({ w }: IconComponentProps) => (
  <div title="Follow on facebook" className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <circle
        cx="54.5"
        cy="54.5"
        r="54.5"
        className="fill-[#3b5998] group-hover:fill-[#6c7da2] transition duration-150"
      />
      <path
        d="M59.0729 56.8229H69.3167L70.925 46.4167H59.0708V40.7292C59.0708 36.4063 60.4833 32.5729 64.5271 32.5729H71.025V23.4917C69.8833 23.3375 67.4687 23 62.9062 23C53.3792 23 47.7938 28.0313 47.7938 39.4938V46.4167H38V56.8229H47.7938V85.425C49.7333 85.7167 51.6979 85.9146 53.7146 85.9146C55.5375 85.9146 57.3167 85.7479 59.0729 85.5104V56.8229Z"
        fill="white"
      />
    </svg>
  </div>
);

export const XIcon = ({ w }: IconComponentProps) => (
  <div title="Follow me on X" className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <circle
        cx="54.5"
        cy="54.5"
        r="54.5"
        className="fill-[black] group-hover:fill-[#676767] transition duration-150"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 30L48 55.5L30 77.5H35L51 59L63.5 77.5H79.5L59.5 49L76 30H70.5L57.5 46L46 30H30ZM65.5 73L38.5 34H43.5L71.5 73H65.5Z"
        fill="white"
        stroke="black"
      />
    </svg>
  </div>
);

export const InstagramIcon = ({ w }: IconComponentProps) => (
  <div title="Follow me on instagram" className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="54.5"
        cy="54.5"
        r="54.5"
        className="fill-[#e4447a] group-hover:fill-[#e46a93] transition duration-150"
      />
      <path
        d="M55.0833 68.6667C47.0437 68.6667 40.5 62.125 40.5 54.0833C40.5 46.0417 47.0437 39.5 55.0833 39.5C63.1229 39.5 69.6667 46.0417 69.6667 54.0833C69.6667 62.125 63.1229 68.6667 55.0833 68.6667ZM55.0833 43.6667C49.3396 43.6667 44.6667 48.3396 44.6667 54.0833C44.6667 59.8271 49.3396 64.5 55.0833 64.5C60.8271 64.5 65.5 59.8271 65.5 54.0833C65.5 48.3396 60.8271 43.6667 55.0833 43.6667Z"
        fill="white"
      />
      <path
        d="M70.709 41.583C72.4349 41.583 73.834 40.1839 73.834 38.458C73.834 36.7321 72.4349 35.333 70.709 35.333C68.9831 35.333 67.584 36.7321 67.584 38.458C67.584 40.1839 68.9831 41.583 70.709 41.583Z"
        fill="white"
      />
      <path
        d="M67.5833 81.1667H42.5833C34.5437 81.1667 28 74.625 28 66.5833V41.5833C28 33.5417 34.5437 27 42.5833 27H67.5833C75.6229 27 82.1667 33.5417 82.1667 41.5833V66.5833C82.1667 74.625 75.6229 81.1667 67.5833 81.1667ZM42.5833 31.1667C36.8396 31.1667 32.1667 35.8396 32.1667 41.5833V66.5833C32.1667 72.3271 36.8396 77 42.5833 77H67.5833C73.3271 77 78 72.3271 78 66.5833V41.5833C78 35.8396 73.3271 31.1667 67.5833 31.1667H42.5833Z"
        fill="white"
      />
    </svg>
  </div>
);

export const MailIcon = ({ w }: IconComponentProps) => (
  <div title="Mail me" className="group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={w}
      viewBox="0 0 26 26"
      id="mail"
    >
      -
      <path
        className="fill-[#363A40] group-hover:fill-[#5d5f65] transition duration-100"
        d="M13 0A13 13 0 0 0 0 13a13 13 0 0 0 13 13 13 13 0 0 0 13-13A13 13 0 0 0 13 0zM5.621 8v.004l.02.016h14.855a.5.5 0 0 1 .502.5v8.98a.5.5 0 0 1-.502.5H5.527a.5.5 0 0 1-.5-.5V8.805L5 8.783l.027-.035v-.232a.5.5 0 0 1 .5-.5h.082L5.621 8zm1.281 1.016 6.118 4.847 6.109-4.847H6.902zm-.877.582V17h13.971V9.602l-6.666 5.293a.5.5 0 0 1-.62 0L6.026 9.598z"
      />
    </svg>
  </div>
);

export const PinterestIcon = ({ w }: IconComponentProps) => (
  <div title="Mail me" className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="54.5"
        cy="54.5"
        r="54.5"
        className="fill-[#F22543] group-hover:fill-[#f05970] transition duration-150"
      />
      <path
        opacity="0.05"
        d="M83.3854 46.15C83.3854 31.2417 71.4479 20 55.6146 20C35.2667 20 26 34.15 26 47.3C26 53.8583 29.3854 62.4083 35.6604 65.3312C36.6729 65.8042 37.5979 65.8396 38.4125 65.4458C38.9562 65.1833 39.6688 64.6062 39.9583 63.3729L41.1167 58.6458C41.3792 57.5437 41.1438 56.5333 40.4104 55.6417C39.1063 54.0583 37.7833 50.7375 37.7833 47.4542C37.7833 39.6979 43.6458 31.4542 54.5125 31.4542C63.5333 31.4542 69.8333 37.5687 69.8333 46.3229C69.8333 56.1708 65.2 63.3187 58.8187 63.3187C57.3979 63.3187 56.1312 62.7479 55.3437 61.7521C54.6125 60.8271 54.3771 59.6208 54.675 58.3542C55.0833 56.6333 55.6437 54.825 56.1833 53.075C57.2125 49.7458 58.1833 46.6021 58.1833 44.0021C58.1833 39.2458 55.2271 36.0521 50.8292 36.0521C45.4333 36.0521 41.2083 41.4104 41.2083 48.2521C41.2083 51.1958 41.9229 53.4958 42.3542 54.6187C41.5937 57.8354 38.2937 71.8042 37.625 74.675C36.825 78.0917 36.9854 82.6 37.3167 86.1354C39.5958 87.1833 41.9833 88.0229 44.4625 88.65C46.0708 85.9854 48.5687 81.4854 49.55 77.7146C49.825 76.6562 50.5667 73.8271 51.1875 71.4625C53.475 73.1167 56.5729 74.1521 59.6792 74.1521C73.1958 74.15 83.3854 62.1125 83.3854 46.15Z"
        fill="black"
      />
      <path
        opacity="0.07"
        d="M82.3431 46.1493C82.3431 31.8348 70.8514 21.041 55.6139 21.041C35.9827 21.041 27.041 34.6514 27.041 47.2993C27.041 53.6243 30.4285 61.7452 36.1014 64.3868C36.366 64.5118 37.1764 64.8889 37.9598 64.5098C38.4556 64.2681 38.7889 63.8035 38.9473 63.1306L40.1035 58.4056C40.2889 57.6264 40.1285 56.9389 39.6056 56.3056C37.9202 54.2598 36.741 50.6202 36.741 47.4556C36.741 39.1952 42.9702 30.4139 54.5118 30.4139C64.1452 30.4139 70.8743 36.9556 70.8743 46.3244C70.8743 56.7764 65.8035 64.3619 58.8181 64.3619C57.0785 64.3619 55.5139 63.6473 54.5264 62.3994C53.5931 61.2202 53.2868 59.6973 53.6618 58.1139C54.0785 56.3598 54.6431 54.5348 55.1889 52.7681C56.1931 49.516 57.1431 46.4452 57.1431 44.0014C57.1431 39.8681 54.6056 37.0931 50.8306 37.0931C46.0202 37.0931 42.2514 41.9952 42.2514 48.2514C42.2514 51.3619 43.0827 53.6785 43.4452 54.5389C42.8639 56.9973 39.3348 71.9306 38.641 74.9119C37.8264 78.4014 38.0535 83.1285 38.4181 86.6639C40.0285 87.3473 41.7035 87.9014 43.4098 88.3806C44.9764 85.8119 47.5618 81.2244 48.5431 77.4535C48.8848 76.141 49.941 72.1139 50.5973 69.616C52.7098 71.7181 56.1827 73.1119 59.6806 73.1119C72.6014 73.1077 82.3431 61.5181 82.3431 46.1493Z"
        fill="black"
      />
      <path
        d="M55.6152 22.085C37.6319 22.085 28.084 34.1579 28.084 47.2995C28.084 53.41 31.3382 61.0183 36.5423 63.4412C37.3298 63.81 37.7548 63.6495 37.934 62.885C38.0736 62.3058 38.7736 59.4745 39.0902 58.16C39.1902 57.7391 39.1423 57.3787 38.8027 56.9662C37.0798 54.8766 35.7027 51.035 35.7027 47.4558C35.7027 38.2641 42.6611 29.3725 54.5152 29.3725C64.7506 29.3725 71.9173 36.3475 71.9173 46.3245C71.9173 57.5954 66.2256 65.4037 58.8194 65.4037C54.7298 65.4037 51.6673 62.0225 52.6486 57.8725C53.8256 52.9204 56.1006 47.5766 56.1006 44.0016C56.1006 40.8037 54.3861 38.1329 50.8298 38.1329C46.6486 38.1329 43.2923 42.4558 43.2923 48.2516C43.2923 51.9391 44.5381 54.435 44.5381 54.435C44.5381 54.435 40.409 71.8975 39.6527 75.1475C38.8152 78.735 39.1402 83.7745 39.5048 87.0704C40.4444 87.4391 41.384 87.8079 42.3569 88.11C44.059 85.3433 46.5944 80.8058 47.5361 77.1891C48.0423 75.2371 50.134 67.2829 50.134 67.2829C51.4923 69.8725 55.4611 72.0683 59.6819 72.0683C72.2486 72.0683 81.3027 60.5121 81.3027 46.1516C81.3027 32.3829 70.0715 22.085 55.6152 22.085Z"
        fill="white"
      />
    </svg>
  </div>
);

export const YoutubeIcon = ({ w }: IconComponentProps) => (
  <div title="Mail me" className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="54.5"
        cy="54.5"
        r="54.5"
        fill="#FF3D00"
        className="fill-[#FF3D00] group-hover:fill-[#f17a8c] transition duration-150"
      />
      <path
        d="M80.6398 67.437C80.1026 70.257 77.8198 72.4055 74.9998 72.8084C70.5684 73.4798 63.1827 74.2855 54.857 74.2855C46.6656 74.2855 39.2799 73.4798 34.7143 72.8084C31.8943 72.4055 29.6114 70.257 29.0743 67.437C28.5371 64.3484 28 59.7827 28 54.1428C28 48.5028 28.5371 43.9371 29.0743 40.8485C29.6114 38.0286 31.8943 35.88 34.7143 35.4771C39.1457 34.8057 46.5313 34 54.857 34C63.1827 34 70.4341 34.8057 74.9998 35.4771C77.8198 35.88 80.1026 38.0286 80.6398 40.8485C81.1769 43.9371 81.8483 48.5028 81.8483 54.1428C81.714 59.7827 81.1769 64.3484 80.6398 67.437Z"
        fill="white"
      />
      <path
        d="M49.4844 63.5421V44.7422L65.5986 54.1421L49.4844 63.5421Z"
        fill="#FF3D00"
      />
    </svg>
  </div>
);

export const ServeIcon = ({ w }: IconComponentProps) => (
  <div className="group">
    <svg
      width={w}
      height={w}
      viewBox="0 0 111 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 92.7049V68.4935L15.1184 66.5129L19.8751 89.634L1 92.7049Z"
        fill="#999FA6"
      />
      <path
        d="M21.4944 84.7606L18.0028 66.5129L30.1729 62.2626L51.9072 61.5727C53.9482 62.2403 55.8542 63.5755 52.6156 65.8899L39.2057 69.4949L57.1699 70.3405L75.8173 63.5755C77.6559 63.3678 81.0194 63.8159 79.7644 67.2696L55.247 81.4448H24.8343L21.4944 84.7606Z"
        fill="#999FA6"
      />
      <path
        d="M24.8343 58.8578V52.627L110 52.7827V58.8578H24.8343Z"
        fill="#999FA6"
      />
      <path
        d="M1 92.7049V68.4935L15.1184 66.5129L19.8751 89.634L1 92.7049Z"
        stroke="black"
        strokeWidth="0.0506035"
      />
      <path
        d="M21.4944 84.7606L18.0028 66.5129L30.1729 62.2626L51.9072 61.5727C53.9482 62.2403 55.8542 63.5755 52.6156 65.8899L39.2057 69.4949L57.1699 70.3405L75.8173 63.5755C77.6559 63.3678 81.0194 63.8159 79.7644 67.2696L55.247 81.4448H24.8343L21.4944 84.7606Z"
        stroke="black"
        strokeWidth="0.0506035"
      />
      <path
        d="M24.8343 58.8578V52.627L110 52.7827V58.8578H24.8343Z"
        stroke="black"
        strokeWidth="0.0506035"
      />
      <path
        d="M61.9065 9.96889C48.64 12.0099 29.3938 24.5933 30.8866 50.3505H37.3132C36.5036 40.9636 44.7013 16.9269 62.7162 12.828C58.2125 15.3835 45.511 23.6825 42.6519 50.3505H103.047C103.553 34.5369 96.6965 14.8774 70.914 9.96889C72.508 7.97006 75.9743 2.78319 68.6874 0H65.3982C62.9439 0.725317 58.086 4.07358 62.7162 9.96889H61.9065Z"
        fill="#999FA6"
      />
    </svg>
  </div>
);

export const PrepTimeIcon = ({ w }: IconComponentProps) => {
  return (
    <div className="group">
      <svg
        width={w}
        height={w}
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M55.0007 91.3333C72.5587 91.3333 86.7923 77.0997 86.7923 59.5417C86.7923 41.9836 72.5587 27.75 55.0007 27.75C37.4426 27.75 23.209 41.9836 23.209 59.5417C23.209 77.0997 37.4426 91.3333 55.0007 91.3333Z"
          stroke="#999FA6"
          strokeWidth="9.08333"
        />
        <path
          d="M23.2083 23.209L14.125 32.2923"
          stroke="#999FA6"
          strokeWidth="9.08333"
          strokeLinecap="round"
        />
        <path
          d="M86.791 23.209L95.8743 32.2923"
          stroke="#999FA6"
          strokeWidth="9.08333"
          strokeLinecap="round"
        />
        <path
          d="M41.375 50.4583L54.1339 58.9644C54.624 59.291 55.2825 59.1888 55.6504 58.7287L64.0833 48.1875"
          stroke="#999FA6"
          strokeWidth="9.08333"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const CookTimeIcon = ({ w, h }: IconComponentProps) => {
  return (
    <div className="group">
      <svg
        width={w}
        height={h}
        viewBox="0 0 198 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_243_57)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.02441 44.5653H47.8564C51.3369 44.5653 54.3179 46.8051 55.4297 49.931H88.1074L86.8828 43.4535C86.6089 42.0033 87.5596 40.6176 89.0098 40.3436C89.1709 40.3114 89.332 40.2953 89.4932 40.2953H195.325C196.791 40.2953 198 41.4877 198 42.9701C198 43.2762 197.952 43.5663 197.855 43.8402L193.52 60.2435C192.28 64.9647 190.185 69.412 187.043 72.538C184.207 75.3739 180.565 77.1464 176.021 77.1464H107.54C102.899 77.1464 99.0644 75.3256 96.1157 72.3768C92.9736 69.2347 90.895 64.8197 90.0088 60.0502L89.1064 55.2806H55.4297C54.3179 58.3905 51.3369 60.6464 47.8564 60.6464H8.02441C3.62549 60.6303 0 57.0209 0 52.6058C0 48.1908 3.60937 44.5653 8.02441 44.5653ZM168.368 0.785522C169.415 -0.261841 171.107 -0.261841 172.138 0.785522C173.169 1.83289 173.186 3.52478 172.138 4.55603C169.592 7.10193 170.752 9.27722 172.106 11.807C174.378 16.0609 177.004 20.9432 172.557 28.6293C171.816 29.9022 170.188 30.3373 168.916 29.5961C167.643 28.8549 167.208 27.2274 167.949 25.9545C170.897 20.8304 169.044 17.35 167.417 14.3046C165.064 9.92175 163.034 6.13513 168.368 0.785522ZM148.516 0.785522C149.563 -0.261841 151.255 -0.261841 152.287 0.785522C153.318 1.83289 153.334 3.52478 152.287 4.55603C149.741 7.10193 150.901 9.27722 152.254 11.807C154.526 16.0609 157.153 20.9432 152.706 28.6293C151.964 29.9022 150.337 30.3373 149.064 29.5961C147.791 28.8549 147.356 27.2274 148.097 25.9545C151.046 20.8304 149.193 17.35 147.565 14.3046C145.213 9.92175 143.183 6.13513 148.516 0.785522ZM128.681 0.785522C129.728 -0.261841 131.42 -0.261841 132.451 0.785522C133.499 1.83289 133.499 3.52478 132.451 4.55603C129.905 7.10193 131.065 9.27722 132.419 11.807C134.691 16.0609 137.317 20.9432 132.87 28.6293C132.129 29.9022 130.501 30.3373 129.229 29.5961C127.956 28.8549 127.52 27.2274 128.262 25.9545C131.21 20.8304 129.357 17.35 127.73 14.3046C125.361 9.92175 123.331 6.13513 128.681 0.785522ZM108.829 0.785522C109.876 -0.261841 111.568 -0.261841 112.6 0.785522C113.647 1.83289 113.647 3.52478 112.6 4.55603C110.054 7.10193 111.214 9.27722 112.567 11.807C114.839 16.0609 117.466 20.9432 113.019 28.6293C112.277 29.9022 110.65 30.3373 109.377 29.5961C108.104 28.8549 107.669 27.2274 108.41 25.9545C111.359 20.8304 109.506 17.35 107.878 14.3046C105.526 9.92175 103.496 6.13513 108.829 0.785522ZM188.38 58.8739L191.877 45.6288H92.7158L95.2456 59.0673C95.9546 62.8055 97.5337 66.2377 99.9023 68.6063C101.884 70.5883 104.462 71.8129 107.556 71.8129H176.038C179.019 71.8129 181.403 70.6366 183.289 68.7675C185.706 66.3343 187.365 62.7572 188.38 58.8739Z"
            fill="#999FA6"
          />
        </g>
        <defs>
          <clipPath id="clip0_243_57">
            <rect width="198" height="77.1464" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const CaloriesIcon = ({ w }: IconComponentProps) => {
  return (
    <div className="group">
      <svg
        width={w}
        height={w}
        viewBox="0 0 109 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.9156 93.4406C30.9095 96.7864 35.6394 99.1382 40.7177 100.303C41.2037 100.462 41.5307 99.8262 41.2037 99.5083C30.3264 89.1306 36.3032 77.899 40.7177 72.8351C43.8651 69.2199 48.3477 63.2658 48.0207 55.2815C48.0207 54.4822 48.8382 53.8418 49.4831 54.3232C55.6552 57.516 59.8744 64.542 61.0099 70.2872C62.7993 68.5341 63.4487 65.8182 63.4487 63.4247C63.4487 62.6254 64.4207 61.985 65.2336 62.6254C71.0787 67.8937 81.1431 85.7743 64.9066 99.8217C64.5842 100.144 64.9066 100.784 65.2336 100.626C70.1568 99.3349 74.7867 97.1117 78.8722 94.0765C105.337 73.639 88.1236 37.3964 76.9193 25.4246C75.4614 23.9849 72.8636 24.9432 72.8636 27.0187C72.7001 31.3333 71.4012 36.1202 67.9949 39.313C65.3971 28.4584 56.7407 16.1278 44.401 10.0602C42.7796 9.26082 40.8312 10.537 40.9947 12.2947C41.3127 27.1459 31.6253 36.6017 23.1823 48.8959C15.7113 59.9095 10.8426 80.188 26.9156 93.4406Z"
          fill="#999FA6"
        />
      </svg>
    </div>
  );
};

export const LoadingIcon = ({ w }: IconComponentProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={w}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <circle
          strokeDasharray="164.93361431346415 56.97787143782138"
          r="35"
          strokeWidth="10"
          stroke="#000000"
          fill="none"
          cy="50"
          cx="50"
        >
          <animateTransform
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};
