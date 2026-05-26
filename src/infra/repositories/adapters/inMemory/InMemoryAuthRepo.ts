import { AuthUser, IAuthRepo } from "@domain";

import { mockAuthUsers } from "./data/mockAuthUsers";

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

export class InMemoryAuthRepo implements IAuthRepo {
  async signIn(
    company: string,
    password: string,
    userName: string,
  ): Promise<AuthUser> {
    await delay();
    const user = mockAuthUsers.find(
      (user) => user.company === company && user.userName === userName,
    );

    if (user) {
      return user;
    }

    throw new Error("Usuário não encontrado", {
      cause: "Verifique suas credenciais e tente novamente",
    });
  }
  async signOut(): Promise<void> {
    await delay();
  }
}
