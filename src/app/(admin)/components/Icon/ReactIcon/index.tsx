import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';
import loadable from '@loadable/component';
export interface ReactIconProps extends IconBaseProps {
  name: string;
}

export default function Icon({ name, ...props }: ReactIconProps) {
  const lib = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase();
  const ElementIcon: IconType = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[name as keyof JSX.Element]
  }) as IconType;

  return <ElementIcon {...props} />
}