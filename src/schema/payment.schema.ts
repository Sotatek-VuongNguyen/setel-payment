import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop()
  order_id: string;

  @Prop({ default: new Date().getTime() })
  created_time: number;

  @Prop({ default: new Date().getTime() })
  updated_time: number;

  @Prop({ default: 0 })
  del_flag: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
