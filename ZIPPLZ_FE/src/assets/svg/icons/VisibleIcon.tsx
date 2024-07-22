import * as React from "react";
import type { SVGProps } from "react";
const SvgVisibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#000"
      d="m2 8-.468-.176L1.466 8l.066.175zm12 0 .468.176.066-.176-.066-.175zm-11.532.175C3.266 6.048 5.43 4.5 8 4.5v-1c-2.97 0-5.519 1.791-6.468 4.324zM8 4.5c2.57 0 4.735 1.548 5.532 3.676l.936-.351C13.52 5.292 10.97 3.5 8 3.5zm5.532 3.325C12.735 9.952 10.57 11.5 8 11.5v1c2.97 0 5.519-1.791 6.468-4.324zM8 11.5c-2.57 0-4.734-1.548-5.532-3.676l-.936.351C2.482 10.71 5.03 12.5 8 12.5z"
    />
    <circle cx={8} cy={8} r={2} stroke="#000" />
  </svg>
);
export default SvgVisibleIcon;
