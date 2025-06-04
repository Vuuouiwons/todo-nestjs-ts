import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello-world')
export class HelloController {
  constructor(private readonly helloService: HelloService) { }

  @Get()
  helloWorld() {
    return this.helloService.helloWorld();
  }
}
