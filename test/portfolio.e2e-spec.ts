import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

dotenv.config();

describe('PortfolioController (e2e)', () => {
  let app: INestApplication;
  const userId = 'test-user-id';

  beforeAll(async () => {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://localhost/stock-management';
    process.env.MONGO_URI = mongoUri;

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

  it('/portfolio/addStock (POST)', async () => {
    const stock = {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currency: 'USD',
      exchange: 'NASDAQ',
    };

    const response = await request(app.getHttpServer())
      .post('/portfolio/addStock')
      .send({ stock })
      .set('Cookie', `userId=${userId};`)
      .expect(201);

    expect(response.status).toBe(201);
  });
});
