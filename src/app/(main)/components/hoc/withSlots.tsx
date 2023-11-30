import MainLayout from "@/components/MainLayout";

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