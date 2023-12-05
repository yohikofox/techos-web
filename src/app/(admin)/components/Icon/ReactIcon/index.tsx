import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';
import { ImSpinner3 } from "react-icons/im";
import loadable from '@loadable/component';
import classNames from 'classnames';
import styles from './styles.module.scss';
export interface ReactIconProps extends IconBaseProps {
  name: string;
}

export default function Icon({ name, className, ...props }: ReactIconProps) {
  let lib = "";
  let iconName = name;

  if (/^\w+\/\w+$/.test(name)) {
    const [extractedLibName, extractedIconName] = name.split("/");
    lib = extractedLibName;
    iconName = extractedIconName;
  }
  else lib = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase();

  const ElementIcon: IconType = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[iconName as keyof JSX.Element],
    fallback: <><ImSpinner3 className={classNames(styles.spinner, className)} {...props} /></>
  }) as IconType;

  return <ElementIcon className={className} {...props} />
}