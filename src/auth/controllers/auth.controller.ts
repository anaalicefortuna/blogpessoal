import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UsuarioLogin } from "../entities/usuario.entity";
import { LocalAuthGuard } from "../guard/loca-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('Logar')
    async Login(@Body() user: UsuarioLogin):Promise<any>{
        return this.authService.login(user);
    }
}