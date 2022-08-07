import { AuthenticationEntity } from 'src/Authentication/Context/Authentication.entity';

export interface IAddress {
  Area: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  userId: AuthenticationEntity;
}
