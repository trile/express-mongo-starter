const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Greeting} = require('../models/greeting');
const {greetings, populateGreetings} = require('./seed/seed');

beforeEach(populateGreetings);

describe('GET /404error', () => {
  let text = "Path not found";
  it('should receive 404 error', (done) => {
    request(app)
      .get('/404error')
      .expect(404)
      .expect((res) => {
        expect(res.error.text).toBe(text);
      })
      .end(done);
  });
});

describe('POST /learngreeting', () => {
  let greetingText = "Hola";
  let text = "I have learned to say greeting.";
  it('should create a new documnet in database', (done) => {
    request(app)
      .post('/learngreeting')
      .send({text: greetingText})
      .expect(200)
      .expect((res) => {
        expect(res.text).toBe(text);
      })
      .end((err)=> {
        if (err) done (err);

        Greeting.findOne({text: greetingText}).then((greeting) => {
          expect(greeting).toExist();
          expect(greeting.text).toBe(greetingText);
          done();
        }).catch((err) => done(err));
      });
  })
});

describe('GET /saygreeting', () => {
  let greetingText = "Hello World!";
  it('should return the only greeting in database', (done) => {
    request(app)
      .get('/saygreeting')
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(greetingText);
      })
      .end(done);
  })
});
