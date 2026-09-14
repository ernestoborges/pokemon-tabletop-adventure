import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border border-gray-600 rounded-full cursor-pointer"
    >
      <div className="w-8 h-8 overflow-hidden">
        <div
          className="flex h-full w-16 items-center justify-center transition-all duration-600"
          style={{
            transform: theme === "dark" ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          <MdLightMode className="text-gray-600 w-8" />
          <MdDarkMode className="text-gray-600 w-8" />
        </div>
      </div>
    </button>
  );
}

// function DarkModeButton2() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   return (
//     <button onClick={() => setIsDarkMode(!isDarkMode)}>
//       <div className="w-12 h-12 rounded-full overflow-hidden">
//         <div
//           className="flex h-full w-24 items-center justify-center relative transition-all duration-600"
//           style={{
//             transform: isDarkMode ? "translateX(-50%)" : "translateX(0%)",
//           }}
//         >
//           <Espeon />
//           <Umbreon />
//         </div>
//       </div>
//     </button>
//   );
// }

// function Espeon() {
//   return (
//     <div className="w-12 relative w-full h-full bg-pink-300 overflow-hidden">
//       <div className="absolute flex flex-col gap-1 items-center justify-center top-[20px] left-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="w-4 h-4 bg-red-500 rounded-[100%] px-2 py-1/2 overflow-hidden">
//           <div className="w-1 h-1 bg-white rounded-full" />
//         </div>
//         <div className="flex gap-4">
//           {/* <div className="w-6 h-4 p-1 bg-red-500 rounded-tr-[100%] rounded-tl-[40%] rounded-br-[40%] rounded-bl-[100%] flex items-center justify-center"></div> */}
//           <div className="relative overflow-hidden w-5 h-3 p-1 bg-purple-400 rounded-tr-[100%] rounded-tl-[20%] rounded-bl-[70%] rounded-br-[10%] flex items-center justify-center">
//             <div className="absolute -top-[2px] right-[1px] bg-white w-3 h-3 rounded-[100%]"></div>
//           </div>
//           <div className="relative overflow-hidden w-5 h-3 p-1 bg-purple-400 rounded-tl-[100%] rounded-tr-[20%] rounded-br-[70%] rounded-bl-[10%] flex items-center justify-center">
//             <div className="absolute -top-[2px] left-[1px] bg-white w-3 h-3 rounded-[100%]"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// function Umbreon() {
//   return (
//     <div className="w-12 relative w-full h-full bg-gray-900 overflow-hidden">
//       <div className="absolute flex flex-col gap-1 items-center justify-center top-[16px] left-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="w-4 h-6 p-1 bg-yellow-500 rounded-[100%] flex items-center justify-center">
//           <div className="w-full h-full bg-gray-900 rounded-[100%]"></div>
//         </div>
//         <div className="flex gap-4">
//           {/* <div className="w-6 h-4 p-1 bg-red-500 rounded-tr-[100%] rounded-tl-[40%] rounded-br-[40%] rounded-bl-[100%] flex items-center justify-center"></div> */}
//           <div className="relative overflow-hidden w-5 h-3 p-1 bg-red-500 rounded-tr-[100%] rounded-tl-[20%] rounded-bl-[70%] rounded-br-[10%] flex items-center justify-center">
//             <div className="absolute -top-[2px] right-1 bg-black w-[8px] h-3 bg-gray-900 rounded-[100%]"></div>
//             <div className="absolute top-1 right-[4px] bg-white w-[2px] h-[2px] bg-gray-900 rounded-[100%]"></div>
//           </div>
//           <div className="relative overflow-hidden w-5 h-3 p-1 bg-red-500 rounded-tl-[100%] rounded-tr-[20%] rounded-br-[70%] rounded-bl-[10%] flex items-center justify-center">
//             <div className="absolute -top-[2px] left-1 bg-black w-[8px] h-3 bg-gray-900 rounded-[100%]"></div>
//             <div className="absolute top-1 left-[10px] bg-white w-[2px] h-[2px] bg-gray-900 rounded-[100%]"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
