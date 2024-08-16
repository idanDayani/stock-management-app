import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

describe('PortfolioController (e2e)', () => {
  let app: INestApplication;
  const userId = 'test-user-id';

  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close();
  });

  it('/portfolio/addStock (POST) - should success add stock', async () => {
    const validStock = {
      symbol: `AAPL-${uuidv4}`,
      name: 'Apple Inc.',
      currency: 'USD',
      exchange: 'NASDAQ',
    };

    const response = await request(app.getHttpServer())
      .post('/portfolio/addStock')
      .send({ stock: validStock })
      .set('Cookie', `userId=${userId};`);

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('/portfolio/addStock (POST) - should fail add stock', async () => {
    const invalidStock = {
      name: 'Apple Inc.',
      currency: 'USD',
    };

    const response = await request(app.getHttpServer())
      .post('/portfolio/addStock')
      .send({ stock: invalidStock })
      .set('Cookie', `userId=${userId};`);

    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
