const request  = require("supertest");
const server = require('../app.js');



beforeAll(async () => {
 // do something before anything else runs
 console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});


describe('Account basic route tests', () => {
  test('Create Account test (new)', async () => {
  const response = await request(server).post('/api/newaccount')
      .send({
        mail: 'testing123@gmail.com',
        password: '123456'
      })
  expect(response.status).toEqual(200);
  expect(response.text).toContain('Create success');
  });


  test('Create Account test (already exists)', async () => {
    const response = await request(server).post('/api/newaccount')
        .send({
          mail: 'testing123@gmail.com',
          password: '123456'
        })
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Account already exists');
    });


  test('Update Account Data test', async () => {
    const response = await request(server).put('/api/updateaccount?mail=testing123@gmail.com')
        .send({
          name: 'testing123',
          nickname: 'HAHA',
          sex: 'man',
          birthday: '1982-04-27'
        })
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Update success');
    });

  test('Upload avatar test', async () => {
    const filePath = './test_file/testfile.jpg';
    const response = await request(server).post('/api/uploadavatar?mail=testing123@gmail.com')
        .attach('pic', filePath)
      expect(response.status).toEqual(200);
      expect(response.text).toContain('Update success');
    });
  

  test('Get Account Data test', async () => {
  //const response = await request(server).get('/api/getaccount?mail=testing@gmail.com');
  const { body } = await request(server).get('/api/getaccount?mail=testing123@gmail.com');
  //expect(response.status).toEqual(200);
  expect(body).toMatchObject(
    {
      "mail": "testing123@gmail.com",
      "password": "123456",
      "name": "testing123",
      "nickname": "HAHA",
      "sex": "man",
      "birthday": "1982-04-27"
    }
  );
  });
 });



let id;

describe('Comment basic route tests', () => {
    test('Create comment test', async () => {
    //const response = await request(server).post('/api/newcomment')
    const { body } = await request(server).post('/api/newcomment')
        .send({
          name: 'testing123@gmail.com',
          content: 'hihihihihihihihi'
        })
    //expect(response.status).toEqual(200);
    //expect(response.text).toContain('Create success');
      expect(body).toMatchObject(
      {
        "name": "testing123@gmail.com",
        "content": "hihihihihihihihi"
      }
      );
      id = body['_id'];
    });


    test('Reply comment test', async () => {
        //const response = await request(server).post('/api/replycomment')
        const { body } = await request(server).post('/api/replycomment')
            .send({
              parent_id : id,
              name: 'kenney_YYY@gmail.com',
              content: 'NONONONONONO'
            })
        //expect(response.status).toEqual(200);
        //expect(response.text).toContain('Create success');
          expect(body).toMatchObject(
          {
            "name": "kenney_YYY@gmail.com",
            "content": "NONONONONONO"
          }
          );
    });


    test('Delete comment test', async () => {
        const response = await request(server).delete('/api/deletecomment?_id='+id)
     
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Delete success');
     });
});
