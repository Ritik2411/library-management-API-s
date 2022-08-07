import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PatchDto } from 'src/Book/Dto/Patch.dto';
import { AddressService } from './Address.services';
import { AddressDto } from './Dto/Address.dto';
import { UpdateAddressDto } from './Dto/Update.address.dto';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('get_all_address')
  async getAllAddress(@Res() response: Response) {
    try {
      const result = await this.addressService.getAllAddress();
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Post('add_address')
  async addAddress(@Body() address: AddressDto, @Res() response: Response) {
    try {
      const result = await this.addressService.addAddress(address);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }

  @Put('edit_address/:id')
  async editAddress(
    @Param('id') id: string,
    @Body() data: UpdateAddressDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.addressService.updateAddress(id, data);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Patch('patch_address/:id')
  async patchAddress(
    @Param('id') id: string,
    @Body() data: PatchDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.addressService.patchAddress(id, data);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }
}
