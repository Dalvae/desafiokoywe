import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

interface CryptoMktResponse {
  [key: string]: {
    currency: string;
    price: string;
    timestamp: string;
  };
}

@Injectable()
export class ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}

  async getRate(from: string, to: string): Promise<number> {
    try {
      const { data } = await firstValueFrom<{ data: CryptoMktResponse }>(
        this.httpService.get(
          `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${from}&to=${to}`,
        ),
      );

      const price = data[from]?.price;
      return price ? parseFloat(price) : 0;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error fetching exchange rate:', error.response?.data);
      }
    }
  }
}
