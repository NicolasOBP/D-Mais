import { AuthUser, IAuthRepo } from "@domain";

import { authUsers } from "./data/authUsers";

export class InMemoryAuthRepo implements IAuthRepo {
  async signIn(
    company: string,
    password: string,
    userName: string,
  ): Promise<AuthUser> {
    const user = authUsers.find(
      (user) => user.company === company && user.userName === userName,
    );

    if (user) {
      return user;
    }

    throw new Error("Usuário não encontrado", {
      cause: "Verifique suas credenciais e tente novamente",
    });
  }
  async signOut(): Promise<void> {}
}
