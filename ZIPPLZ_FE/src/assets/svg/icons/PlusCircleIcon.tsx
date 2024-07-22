import * as React from 'react';
import type { SVGProps } from 'react';

const PlusCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_588_16147)">
      <path
        d="M16.0001 10.667V21.3337M10.6667 16.0003H21.3334M29.3334 16.0003C29.3334 23.3641 23.3639 29.3337 16.0001 29.3337C8.63628 29.3337 2.66675 23.3641 2.66675 16.0003C2.66675 8.63653 8.63628 2.66699 16.0001 2.66699C23.3639 2.66699 29.3334 8.63653 29.3334 16.0003Z"
        stroke="#626262"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_588_16147">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default PlusCircleIcon;
