import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/// My code starts here

// Endpoint to handle airtime purchases by accepting the amount and phone number
@Post('/buy-airtime')
buyAirtime(@Body() body: { amount: number; phoneNumber: string }): string {
  return `Airtime of ${body.amount} purchased for ${body.phoneNumber}`;
}

@Post('/pay-bills')
payBills(@Body() body: { amount: number; biller: string }): string {
  return `Bill payment of ${body.amount} made to ${body.biller}`;
}

@Post('/send-tokens')
sendTokens(@Body() body: { amount: number; recipient: string }): string {
  return `Sent ${body.amount} tokens to ${body.recipient}`;
}
}

// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirtimeModule } from './airtime/airtime.module';
import { BillsPaymentModule } from './bills-payment/bills-payment.module';
import { TokenTransferModule } from './token-transfer/token-transfer.module';

@Module({
imports: [AirtimeModule, BillsPaymentModule, TokenTransferModule],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}

// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
let appController: AppController;

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [AppService],
  }).compile();

  appController = app.get<AppController>(AppController);
});

describe('root', () => {
  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });

  it('should handle airtime purchases', () => {
    const result = appController.buyAirtime({ amount: 100, phoneNumber: '1234567890' });
    expect(result).toBe('Airtime of 100 purchased for 1234567890');
  });

  it('should handle bill payments', () => {
    const result = appController.payBills({ amount: 200, biller: 'Electricity' });
    expect(result).toBe('Bill payment of 200 made to Electricity');
  });

  it('should handle token transfers', () => {
    const result = appController.sendTokens({ amount: 50, recipient: '0xRecipientAddress' });
    expect(result).toBe('Sent 50 tokens to 0xRecipientAddress');
  });
});
});
