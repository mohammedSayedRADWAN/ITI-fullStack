import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello beginners!';
  }

  getHelloDevelopers(): string {
    return 'Hello Developers!';
  }
}
