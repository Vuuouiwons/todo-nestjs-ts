import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { SignInResponseDto } from './dto/response-auth.dto';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register user' })
  @ApiCreatedResponse({ description: 'user registered' })
  @ApiConflictResponse({ description: 'email already registered' })
  @ApiUnprocessableEntityResponse({ description: 'payload validation failed' })
  async signUp(@Body(new ValidationPipe()) body: SignUpDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'login' })
  @ApiCreatedResponse({ description: 'login success', type: SignInResponseDto })
  @ApiNotFoundResponse({ description: 'email or password not registered' })
  @ApiBadRequestResponse({ description: 'email or password incorrect' })
  async signIn(@Body() body: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }
}
