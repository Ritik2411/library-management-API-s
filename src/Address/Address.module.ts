import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/Book/Book.module';
import { AddressController } from './Address.controller';
import { AddressService } from './Address.services';
import { AddressEntity } from './Context/Address.context';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), BookModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
