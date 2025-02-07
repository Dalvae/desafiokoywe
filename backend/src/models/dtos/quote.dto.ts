import { ApiProperty } from '@nestjs/swagger';

export class CreateQuote {
  @ApiProperty({ description: 'The amount to be converted' })
  amount: number;

  @ApiProperty({ description: 'The currency to convert from' })
  fromCurrency: string;

  @ApiProperty({ description: 'The currency to convert to' })
  toCurrency: string;

  @ApiProperty({
    description: 'The ID of the user requesting the quote',
    required: false,
  })
  userId?: string;
}

export class QuoteResponse {
  @ApiProperty({ description: 'The unique identifier of the quote' })
  id: string;

  @ApiProperty({ description: 'The currency to convert from' })
  fromCurrency: string;

  @ApiProperty({ description: 'The currency to convert to' })
  toCurrency: string;

  @ApiProperty({ description: 'The amount to be converted' })
  amount: number;

  @ApiProperty({ description: 'The exchange rate used for the conversion' })
  rate: number;

  @ApiProperty({ description: 'The converted amount' })
  convertedAmount: number;

  @ApiProperty({ description: 'The date and time when the quote was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date and time when the quote expires' })
  expiresAt: Date;

  @ApiProperty({ description: 'The ID of the user who requested the quote' })
  userId: string;
}
