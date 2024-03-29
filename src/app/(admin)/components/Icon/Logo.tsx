import classNames from "classnames"

import styles from "./logo.module.scss"

export interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.698721 19.238827"
      className={classNames(styles.logo, className)}>
      <g
        transform="translate(-87.41254,-48.588912)">
        <g
          transform="translate(-257.28797,-138.89397)">
          <path
            className={classNames(styles.path__logo__fat)}
            d="m 351.29868,206.1368 c -8.21937,-2.70589 -8.94072,-13.87701 -1.14261,-17.69488 2.94444,-1.44156 3.39157,-1.33166 3.39157,0.83361 0,2.33509 0.25911,2.86504 2.79377,5.71391 6.15614,6.91931 3.03981,13.8082 -5.04273,11.14736 z m 10.3736,-5.34807 c -0.26774,-2.59409 -1.89176,-4.82174 -5.10936,-7.00844 -4.4307,-3.01113 -3.51266,-7.5091 1.08576,-5.3197 4.63143,2.20513 7.13156,8.59793 4.95556,12.67135 -0.756,1.41522 -0.75026,1.41733 -0.93196,-0.34321 z"
            id="path469" />
          <path
            className={classNames(styles.path__logo__thin)}
            d="m 361.67228,200.78873 c -0.26774,-2.59409 -1.89176,-4.82174 -5.10936,-7.00844 -4.4307,-3.01113 -3.51266,-7.5091 1.08576,-5.3197 4.63143,2.20513 7.13156,8.59793 4.95556,12.67135 -0.756,1.41522 -0.75026,1.41733 -0.93196,-0.34321 z"
            id="path467" />
        </g>
      </g>
    </svg>
  )
}

export default Logo