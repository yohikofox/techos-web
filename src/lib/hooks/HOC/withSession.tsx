import { getServerSession } from "next-auth";
import React from "react";

export default async function withSession(Component: any) {
  const session = await getServerSession();

  const render = (props: any) => {
    return (
      <>
        <Component {...props} session={session} />
      </>
    );
  };

  return render;
}
