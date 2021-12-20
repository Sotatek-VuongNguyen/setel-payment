import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePaymentDto } from 'src/dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post()
  public async createPayment(
    @Res() res,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    try {
      const checksum = createPaymentDto.checksum;

      if (!checksum) throw new Error('Invalid request');

      const obj = {
        currentTime: createPaymentDto.currentTime,
        orderId: createPaymentDto.orderId,
        amount: createPaymentDto.amount,
      };

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const md5 = require('md5');
      const encode = md5(JSON.stringify(obj));

      if (checksum !== encode) throw new Error('Invalid request');

      const payment = await this.paymentService.create(createPaymentDto);

      if (!payment)
        throw new Error(
          `Cannot create payment order ${createPaymentDto.orderId}`,
        );

      return res.status(HttpStatus.OK).json({
        status: 200,
        message: 'Order payment successfully',
      });
    } catch (e) {
      console.log('error', e.message);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: e.message,
        status: 400,
      });
    }
  }
}
