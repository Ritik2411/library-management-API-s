import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateEvent, UpdateResult } from 'typeorm';
import { AddressEntity } from './Context/Address.context';
import { IAddress } from './Interface/Address.interface';
import { IUpdateAddress } from './Interface/Update.address.interface';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>
  ) {}

  getAllAddress(): Promise<AddressEntity[]> {
    return this.addressRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async addAddress(data: IAddress): Promise<AddressEntity> {
    const address = this.addressRepository.create({
      Area: data.Area,
      city: data.city,
      country: data.country,
      pincode: data.pincode,
      state: data.state,
      user: data.userId,
    });

    return await this.addressRepository.save(address);
  }

  async updateAddress(id: string, data: IUpdateAddress): Promise<UpdateResult> {
    const user = await this.addressRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return await this.addressRepository.update(id, {
        Area: data.Area,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
        state: data.state,
      });
    }
  }

  async patchAddress(id: string, data: any): Promise<UpdateResult> {
    const user = await this.addressRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return await this.addressRepository.update(id, data);
    }
  }
}
