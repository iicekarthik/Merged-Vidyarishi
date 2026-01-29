"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import "odometer/themes/odometer-theme-default.css";

const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <span>00</span>,
});

const AdminCounterWidget = ({
  counterStyle = "two",
  icon,
  title,
  value = 0,
  styleClass = "",
  iconClass = "",
  numberClass = "",
}) => {
  const [odometerValue, setOdometerValue] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) setOdometerValue(value);
  }, [inView, value]);

  /* ================= STYLE TWO (ADMIN DASHBOARD) ================= */
  if (counterStyle === "two") {
    return (
      <div
        ref={ref}
        className={`rbt-counterup variation-01 rbt-hover-03 ${styleClass}`}
      >
        <div className="inner">
          <div className={`rbt-round-icon ${iconClass}`}>
            <i className={icon} />
          </div>

          <div className="content">
            <h3 className={`counter without-icon ${numberClass}`}>
              <Odometer format="d" duration={1000} value={odometerValue} />
            </h3>
            <span className="rbt-title-style-2 d-block">{title}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminCounterWidget;
