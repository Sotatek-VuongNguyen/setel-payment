export class CreatePaymentDto {
  readonly checksum: string;
  readonly currentTime: number;
  readonly amount: number;
  readonly orderId: string;
}
