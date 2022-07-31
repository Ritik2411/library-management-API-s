import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const api = {
      swagger_route: 'http://localhost:4000/api',
    };
    return api;
  }
}
