import { Redirect } from "expo-router";

import { SignInScreen } from "@screens";

export default function SignIn() {
  const auth = null;

  if (auth) {
    return <Redirect href={"/home"} />;
  }

  return <SignInScreen />;
}
