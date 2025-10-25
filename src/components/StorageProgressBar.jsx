import React from "react";
import { use } from "react";

const StorageProgressBar = ({user}) => {
  // Convert bytes to GB and round to 2 decimal places
  console.log(user)
//     if (!user || !user.usedSpace || !user.totalSpace) {
//         console.log("object", user);
//     return null; // or return a placeholder if user data is not available
//   }
  const usedGB = (user.usedSpace / (1024 ** 3)).toFixed(2);
  const totalGB = (user.totalSpace / (1024 ** 3)).toFixed(2);
  const percentage = user.totalSpace === 0 ? 0 : (user.usedSpace / user.totalSpace) * 100;

  let barColor = "bg-blue-500";
  if (percentage >= 90) barColor = "bg-red-500";
  else if (percentage >= 70) barColor = "bg-yellow-500";

  return (
     <div className="px-3 py-0">
        <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`${barColor} h-[6px]`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1 font-bold">
          <span>{usedGB} GB used</span>
          <span>{totalGB} GB total</span>
        </div>
    </div>
  );
};

export default StorageProgressBar;