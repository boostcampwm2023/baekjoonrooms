import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res() res) {
    console.log(req.user);
    res.cookie('user', JSON.stringify(req.user));
    return res.redirect('http://localhost:5173/lobby');
  }
}
