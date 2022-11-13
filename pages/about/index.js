import React, { useEffect, useState } from "react";

export default function About() {
  const [serverData, setData] = useState();
  useEffect(() => {
    const requestData = async () => {
      const res = await fetch("http://localhost:5551");
      const data = await res.json();
      console.log(data);
      setData(data.m);
    };
    requestData();
  }, []);

  return (
    <div>
      Server data: <span>{serverData}</span>
    </div>
  );
}
