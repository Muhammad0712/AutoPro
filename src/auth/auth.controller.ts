import { Controller } from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
}
