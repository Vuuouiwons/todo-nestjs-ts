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

@ApiUnprocessableEntityResponse({ description: 'Payload validation failed' })
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
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ description: 'User registered' })
  @ApiConflictResponse({ description: 'Email already registered' })
  async signUp(@Body(new ValidationPipe()) body: SignUpDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Login success', type: SignInResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async signIn(@Body(new ValidationPipe()) body: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }
}
