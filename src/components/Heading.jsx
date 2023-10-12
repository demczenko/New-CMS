import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold dark:text-white">{title}</h2>
      {subtitle && <p className="text-base text-neutral-300">{subtitle}</p>}
    </div>
  );
};

export default Heading;
