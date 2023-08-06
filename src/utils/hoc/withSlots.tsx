import MainLayout from "@/components/MainLayout";
import { Children } from "react";

export default function withSlots(Component: React.ComponentType) {
  return function WithSlots(props: any) {
    const { children } = props;
    return (
      <MainLayout>
        <Component {...props}>
          {children}
        </Component>
      </MainLayout>
    );
  };
}
//  createElement(Component, Object.assign({}, props), children)