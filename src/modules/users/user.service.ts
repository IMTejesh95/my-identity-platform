import bcrypt from "bcrypt";
import { prisma } from "../../plugins/prisma";

export class UserService {
  async createUser(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password_hash: hash,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password_hash);
    return valid ? user : null;
  }
}
