import * as React from "react";
import type { SVGProps } from "react";
const SvgTrashCanIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path stroke="#000" d="M8 1.5V4M3 4h10M4 6l1 8h6l1.5-8" />
  </svg>
);
export default SvgTrashCanIcon;
