import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    handleHealth() {
        return {
            'status': 'OK'
        };
    }
}
