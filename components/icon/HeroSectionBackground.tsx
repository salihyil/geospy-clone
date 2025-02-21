import { SVGProps } from "react";
const HeroSectionBackground = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 1300" {...props}>
    <path
      fill="transparent"
      stroke="var(--token-d1b70223-6c17-4c93-9dd4-7a1775f7f7c5, rgb(212, 212, 216))"
      strokeDasharray="1px 1px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.93}
      d="M649.349 1039.74c215.606 0 390.391-174.785 390.391-390.391 0-215.606-174.785-390.39-390.391-390.39-215.606 0-390.39 174.784-390.39 390.39s174.784 390.391 390.39 390.391Zm-520.52-390.391c0-287.475 233.045-520.52 520.52-520.52 287.476 0 520.521 233.045 520.521 520.52 0 287.476-233.045 520.521-520.521 520.521-287.475 0-520.52-233.045-520.52-520.521Zm520.52 649.35c358.626 0 649.35-290.724 649.35-649.35C1298.699 290.724 1007.975 0 649.349 0 290.724 0 0 290.724 0 649.349c0 358.626 290.724 649.35 649.349 649.35Z"
      pathLength={1}
    />
  </svg>
);
export default HeroSectionBackground;
