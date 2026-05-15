import { Redirect } from "expo-router";

import { useAuthCredentials } from "@infra";

import { SignInScreen } from "@screens";

export default function SignIn() {
  const { user } = useAuthCredentials();

  if (user) {
    return <Redirect href={"/home"} />;
  }

  return <SignInScreen />;
}
