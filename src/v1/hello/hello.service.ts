import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  helloWorld() {
    return `Hello World!`;
  }
}
