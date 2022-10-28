import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/loca-auth.guard";
import { AuthService } from "../services/auth.service";

@ApiTags('Usuario')
@Controller('/auth')
@ApiBearerAuth()
export class AuthController{
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('Logar')
    async Login(@Body() user: UsuarioLogin):Promise<any>{
        return this.authService.login(user);
    }
}