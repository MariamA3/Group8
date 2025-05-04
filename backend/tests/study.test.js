const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Study = require('../src/models/study');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Study.deleteMany({});
});

describe('GET /api/studies', () => {
  it('should return an empty array when no studies exist', async () => {
    const res = await request(app).get('/api/studies');
    expect(res.statusCode).toBe(200);
    expect(res.body.study).toEqual([]);

  });

  it('should return a list of studies when they exist', async () => {
    await Study.create({ researcher: new mongoose.Types.ObjectId(), title: 'Test Study' });
    const res = await request(app).get('/api/studies');
    expect(res.statusCode).toBe(200);
    expect(res.body.study.length).toBe(1);
    expect(res.body.study[0].title).toBe('Test Study');
  });
});

describe('POST /api/studies', () => {
  it('should create a new study with valid data', async () => {
    const res = await request(app).post('/api/studies').send({
      researcher: new mongoose.Types.ObjectId(),
      title: 'New Study',
      description: 'Integration test',
      status: 'active',
      startdatem: new Date(),
      endDatem: new Date()
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.savedStudy.title).toBe('New Study');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/api/studies').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Researcher and Title are required/);
  });
});

describe('PUT /api/studies/:id and DELETE /api/studies/:id', () => {
  it('should update a study title', async () => {
    const study = await Study.create({
      researcher: new mongoose.Types.ObjectId(),
      title: 'Old Title',
      description: 'Initial description',
      status: 'active',
      startdatem: new Date(),
      endDatem: new Date()
    });
  
    const updatedData = {
      researcher: study.researcher,
      title: 'Updated Title',
      description: study.description,
      status: study.status,
      startdatem: study.startdatem,
      endDatem: study.endDatem
    };
  
    const res = await request(app)
      .put(`/api/studies/${study._id}`)
      .send(updatedData);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete a study', async () => {
    const study = await Study.create({ researcher: new mongoose.Types.ObjectId(), title: 'Delete Me' });
    const res = await request(app).delete(`/api/studies/${study._id}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 for non-existing study during delete', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/studies/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});