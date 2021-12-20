import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from 'src/schema/payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDto } from 'src/dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  public async create(createPaymentDto: CreatePaymentDto): Promise<any> {
    return this.paymentModel.create(createPaymentDto);
  }
}
