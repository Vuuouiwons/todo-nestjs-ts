import { Controller, Get, Post, Body, UseInterceptors, Version, HttpCode, UseGuards, Req, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { SignUpDto, SignInDto } from './dto/create-user.dto';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { User } from 'src/common/database/user.entity';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new account',
    description: 'Creates a new user record and returns the user object (excluding password).'
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User successfully created.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already exists.',
    schema: {
      example: {
        "meta": {
          "statusCode": 400,
          "error": "Bad Request",
          "timestamp": "2026-01-05T06:01:16.144Z",
          "errorId": "0a8ec311-599d-4c02-8a00-e6c78d0336d6"
        },
        "message": "email already registered"
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Email and password validation failed.',
    schema: {
      example: {
        "meta": {
          "statusCode": 422,
          "error": "Unprocessable Entity",
          "timestamp": "2026-asdasdasd01-05T06:08:03.174Z",
          "errorId": "30155ea3-16ba-4c73-8917-0ba3d17fed6b"
        },
        "message": [
          {
            "property": "username",
            "children": [],
            "constraints": [
              "username can only contain lowercase letters, numbers, and underscores",
              "username too lonasdasdg",
              "username too short",
              "username asdasdasis required",
              "username must be a string"
            ]
          },
          {
            "property": "email",
            "children": [],
            "constraints": [
              "email dasdasdasdis required",
              "invalid email address"
            ]
          },
          {
            "property": "password",
            "children": [],
            "constraints": [
              "password must include uppercase, lowercase, number, special character, and no spaces",
              "password must be at most 128 characters",
              "password must be at least 8 characters",
              "password is required",
              "password must be a string"
            ]
          }
        ]
      }
    }
  })
  async signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.userService.signUp(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Verifies credentials and returns a JWT access token and user info.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login successful.',
    schema: {
      example: {
        "meta": {
          "timestamp": "2026-01-05T06:00:32.225Z",
          "statusCode": 201,
          "path": "/v1/auth/login",
          "method": "POST"
        },
        "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCjc1OTY0MzJ9.JpAAHopswIXAJjBZq7DbM_H6h8_H1SQQz8WAipzUWws"
        }
      }
    }
  })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials.' })
  async signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(IdentityInterceptor)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current profile',
    description: 'Retrieves the data of the currently authenticated user from the JWT payload.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully.',
    schema: {
      example: {
        "meta": {
          "timestamp": "2026-01-05T06:09:43.201Z",
          "statusCode": 200,
          "path": "/v1/auth/me",
          "method": "GET"
        },
        "data": {
          "username": "workout500"
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Missing or invalid token.'
  })
  async findOne(@Req() request) {
    return this.userService.findOne(request.user);
  }
}
