import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('StockController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/stock/search (GET) - should get stock data from FMP API', async () => {
    const mockResponse = {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
    };

    const response = await request(app.getHttpServer())
      .get('/stock/search')
      .query({ symbol: 'AAPL' })
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
