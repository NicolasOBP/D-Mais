import { Redirect } from "expo-router";

import { useAuth } from "@infra";

import { SignInScreen } from "@screens";

export default function SignIn() {
  const { authUser, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (authUser) {
    return <Redirect href={"/home"} />;
  }

  return <SignInScreen />;
}
