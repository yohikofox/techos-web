import { getServerSession,Session } from "next-auth";
import React from "react";

export type WithSessionProps = {
  session: Session | undefined | null;
} & React.JSX.IntrinsicAttributes;

export default async function withSession(
  Component: React.FC<WithSessionProps>
) {
  const session = await getServerSession();

  const render = (props: React.JSX.IntrinsicAttributes) => {
    return (
      <>
        <Component {...props} session={session} />
      </>
    );
  };

  return render;
}
