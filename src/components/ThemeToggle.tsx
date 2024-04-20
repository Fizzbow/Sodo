import { motion } from "framer-motion";
import { useState } from "react";
import themes, { Theme } from "../contexts/themes";

interface Props {
  themes: Theme[];
  setTheme: (themeId: Theme["themeId"]) => void;
}

const draw = {
  hidden: { scale: 0 },
  visible: (i: number) => {
    if (!themes[i]) return { scale: 0 };

    return {
      fill: themes[i].color,
      scale: 1,
      // transition: {
      //   scale: { delay, duration: 0.01 },
      // },
      // transition: {
      //   delayChildren: 1,
      //   staggerChildren: 0.5,
      // },
    };
  },
};

const ThemeToggle = ({ themes, setTheme }: Props) => {
  const [showToggle, setShowToggle] = useState(false);
  return (
    <header flex="~ row items-center justify-end" className="h-10">
      <div className="   flex flex-row items-center  justify-center top-[8px] right-[-50px]  relative  w-50 h-50">
        <motion.button
          cursor-pointer
          className="bg-word/100
          z-1
          text-backdrop/100 font-700 text-18px
          p-2
          flex
          absolute top-[50%] left-[50%] translate-[-50%]
          rounded-[50%]
          justify-center
          border-none"
          onClick={() => setShowToggle(!showToggle)}
        >
          <div className="i-gravity-ui:palette text-7" />
        </motion.button>

        {showToggle && (
          <motion.svg
            initial="hidden"
            animate="visible"
            className="absolute"
            xmlns="http://www.w3.org/2000/svg"
            width="212"
            height="206"
            viewBox="0 0 212 206"
            fill="none"
          >
            <motion.path
              className="cursor-pointer"
              d="M148.317 159.63C148.858 160.355 149.238 161.181 149.433 162.056C149.628 162.93 149.634 163.835 149.45 164.712C149.266 165.59 148.897 166.42 148.366 167.151C147.834 167.883 147.152 168.499 146.363 168.961C137.358 174.168 127.376 177.582 116.999 179.004C106.623 180.425 96.0584 179.826 85.9224 177.241C85.024 177.014 84.1843 176.607 83.4574 176.047C82.7305 175.486 82.1325 174.783 81.7018 173.984C81.2712 173.185 81.0173 172.308 80.9567 171.408C80.8961 170.508 81.03 169.605 81.3498 168.759L98.2267 123.802C98.3977 123.329 98.7434 122.935 99.1966 122.697C99.6498 122.458 100.178 122.391 100.679 122.51C103.353 123.203 106.142 123.371 108.883 123.003C111.624 122.636 114.262 121.74 116.642 120.369C117.084 120.109 117.611 120.019 118.118 120.116C118.625 120.213 119.077 120.49 119.385 120.894L148.317 159.63Z"
              custom={0}
              variants={draw}
              whileHover={{ scale: 1.1 }}
              stroke="white"
              strokeWidth={4}
              strokeLinejoin="round"
            />
            <motion.path
              className="cursor-pointer"
              d="M83.927 161.973C83.6512 162.711 83.2201 163.385 82.6612 163.953C82.1024 164.52 81.428 164.968 80.681 165.268C79.9341 165.569 79.1309 165.714 78.3228 165.696C77.5147 165.678 76.7194 165.497 75.9874 165.164C61.8178 158.711 50.2529 147.872 43.1066 134.344C42.7355 133.645 42.5185 132.879 42.4696 132.093C42.4207 131.308 42.5409 130.522 42.8226 129.784C43.1043 129.047 43.5412 128.374 44.1055 127.81C44.6697 127.246 45.3489 126.803 46.0996 126.508L84.8831 111.28C85.3654 111.095 85.9014 111.092 86.3859 111.272C86.8705 111.451 87.2685 111.8 87.5019 112.25C89.6072 116.203 92.9975 119.369 97.1458 121.257C97.6238 121.47 98.001 121.851 98.2016 122.323C98.4021 122.795 98.4111 123.324 98.2266 123.802L83.927 161.973Z"
              custom={1}
              variants={draw}
              stroke="white"
              strokeWidth={4}
              whileHover={{ scale: 1.1 }}
              strokeLinejoin="round"
            />
            <motion.path
              className="cursor-pointer"
              d="M54.9537 123.035C54.3122 123.288 53.6233 123.41 52.9309 123.391C52.2385 123.371 51.5578 123.212 50.9321 122.924C50.3064 122.635 49.7495 122.223 49.2968 121.713C48.8441 121.204 48.5055 120.608 48.3027 119.965C45.4864 110.902 44.973 101.311 46.8062 92.0133C46.9354 91.351 47.2054 90.7221 47.5988 90.1669C47.9923 89.6117 48.5006 89.1423 49.0913 88.7888C49.6821 88.4353 50.3422 88.2054 51.0295 88.1138C51.7168 88.0222 52.4163 88.0709 53.0831 88.2569L84.0933 96.9008C84.5933 97.034 85.0241 97.3441 85.3009 97.77C85.5778 98.196 85.6808 98.7072 85.5898 99.2031C84.9563 102.4 85.1274 105.698 86.0886 108.816C86.2411 109.299 86.2019 109.82 85.9787 110.276C85.7556 110.732 85.3647 111.091 84.8831 111.28L54.9537 123.035Z"
              custom={2}
              variants={draw}
              stroke="white"
              strokeWidth={4}
              whileHover={{ scale: 1.1 }}
              strokeLinejoin="round"
            />
            <motion.path
              className="cursor-pointer"
              d="M60.2329 90.2361C59.6779 90.0827 59.1618 89.8186 58.7175 89.4607C58.2733 89.1029 57.9105 88.659 57.6525 88.1575C57.3944 87.6559 57.2466 87.1077 57.2185 86.5476C57.1905 85.9875 57.2827 85.4279 57.4894 84.9043C59.6673 79.4062 62.8186 74.3209 66.8008 69.8785C67.1784 69.458 67.6417 69.1181 68.1612 68.8803C68.6808 68.6424 69.2455 68.5118 69.8196 68.4966C70.3938 68.4814 70.9649 68.582 71.4971 68.7921C72.0292 69.0021 72.5107 69.317 72.9114 69.7169L90.2039 87.0855C90.5544 87.4516 90.7526 87.931 90.7603 88.4309C90.768 88.9308 90.5845 89.4157 90.2455 89.7918C88.7025 91.5426 87.4793 93.5372 86.629 95.6891C86.4414 96.1644 86.0759 96.5534 85.6057 96.7781C85.1355 97.0028 84.5954 97.0466 84.0933 96.9008L60.2329 90.2361Z"
              variants={draw}
              custom={3}
              stroke="white"
              strokeWidth={4}
              whileHover={{ scale: 1.1 }}
              strokeLinejoin="round"
            />
          </motion.svg>
        )}

        {/* {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="53"
            viewBox="0 0 36 53"
            fill="none"
          >
            <path
              d="M3.01147 11.5679C2.96263 12.332 3.07008 13.0981 3.32716 13.8185L20.7273 50L32.625 49.627L33 8.6018C33.0017 7.83536 32.8469 7.07675 32.5454 6.37314C32.2438 5.66952 31.8019 5.03592 31.247 4.51172C30.6922 3.98753 30.0363 3.58391 29.3201 3.32599C28.6039 3.06807 27.8428 2.96134 27.0839 3.01244C20.2886 3.44431 13.5613 4.63152 7.02471 6.55237C6.2941 6.76242 5.6141 7.12152 5.0269 7.60736C4.4397 8.09321 3.9578 8.69547 3.61111 9.37676C3.26442 10.058 3.06032 10.8039 3.01147 11.5679Z"
              fill="#F9C0C0"
              stroke="white"
              stroke-width="5"
              stroke-linejoin="round"
            />
          </svg>
        } */}

        {/* {showToggle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="overflow-hidden  rounded-[50%] absolute  w-50 h-50"
          >
            {themes.map((theme, idx) => (
              <motion.li
                key={theme.themeId}
                onClick={() => setTheme(theme.themeId)}
                style={{ backgroundColor: theme.color }}
                className="cursor-pointer rounded-[50%] self-center justify-self-center w-9 h-9 rounded-[50%]"
                variants={item(idx)}
              />
            ))}
          </motion.div>
        )} */}
      </div>
    </header>
  );
};

export default ThemeToggle;
