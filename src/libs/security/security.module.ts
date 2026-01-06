import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecurityService } from './security.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [SecurityService],
    exports: [SecurityService],
})
export class SecurityModule { }