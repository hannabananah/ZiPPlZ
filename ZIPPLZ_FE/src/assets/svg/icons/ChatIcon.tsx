import * as React from "react";
import type { SVGProps } from "react";
const SvgChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#6B6E76"
      d="M8 2C4.333 2 1.333 4.387 1.333 7.333A4.81 4.81 0 0 0 3.167 11c0 .4-.28 1.447-1.834 3a7.36 7.36 0 0 0 4.314-1.667c.76.22 1.56.334 2.353.334 3.667 0 6.667-2.387 6.667-5.334S11.667 2 8 2m0 9.333c-2.947 0-5.333-1.793-5.333-4s2.386-4 5.333-4 5.333 1.794 5.333 4-2.386 4-5.333 4"
    />
  </svg>
);
export default SvgChatIcon;
