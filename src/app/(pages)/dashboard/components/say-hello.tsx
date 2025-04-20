"use client";
import { CloudSun, Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const SayHello = () => {
  const hour = new Date().getHours();
  const { data, status } = useSession();
  const [greeting, setGreeting] = useState("");
  const [Icon, setIcon] = useState(() => Sun);

  useEffect(() => {
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
      setIcon(() => Sun);
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
      setIcon(() => CloudSun);
    } else {
      setGreeting("Good Evening");
      setIcon(() => Moon);
    }
  }, [hour]);

  return (
    <div className="flex items-center space-x-2 text-xl font-semibold pl-10">
      {status !== "loading" && (
        <>
          {" "}
          <Icon className="text-yellow-500" size={34} />
          <span className="text-4xl font-serif">
            {greeting}, {data?.user?.name?.split(" ")[0]}
          </span>
        </>
      )}
    </div>
  );
};

export default SayHello;
