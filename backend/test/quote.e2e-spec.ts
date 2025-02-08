import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/dal/prisma/prisma.service';
import { AuthService } from '../src/bll/auth.service';
import { UserService } from '../src/bll/users.service';
import { RegisterDto } from '../src/models/dtos/auth.dto';
import { CreateQuote } from '../src/models/dtos/quote.dto';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authService: AuthService;
  let userService: UserService;
  let token: string;
  let quoteId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    authService = moduleFixture.get(AuthService);
    userService = moduleFixture.get(UserService);
    await app.init();

    // Clear the database before running the tests
    await prisma.quote.deleteMany();
    await prisma.user.deleteMany();

    // Register a new user
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password',
    };
    await userService.createUser(registerDto);

    // Login the user
    const loginResult = await authService.login({
      email: registerDto.email,
      password: registerDto.password,
    });
    token = loginResult.access_token;

    // Create a quote
    const createQuoteDto: CreateQuote = {
      amount: 100,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
    };

    const response = await request(app.getHttpServer())
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send(createQuoteDto);

    quoteId = response.body.id;
  });

  it('should retrieve a quote by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/quote/${quoteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(quoteId);
  });

  afterAll(async () => {
    await prisma.quote.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });
});
