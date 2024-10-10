const req=require('supertest');
const app=require('../server.cjs');
const { afterAll } = require('jest-circus');
const sqlite3=require('sqlite3').verbose();
let db
let server
beforeAll((done) => {
    server = app.listen(4000, () => {
        console.log('Server is running on port 4000'); 
        db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.log('error occurred while creating the database', err.message);
            } else {
                db.run('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, player TEXT, score INTEGER, date TEXT)', (err) => {
                    if (err) {
                        console.log('error occurred while creating the table', err.message);
                    }
                    done(); 
                });
            }
        });
    });
});

afterAll((done) => {
    db.close((err) => {
        if (err) {
            console.log('error occurred while closing the database', err.message);
        }
        server.close();
        done(); // Close the server
    });
});
describe('GET /',()=>{
    it('responds with 200',async()=>{
        await req(app).get('/').expect(200);
    });
});
describe('GET /high-score',()=>{
    it('responds with 200',async()=>{
        await req(app).get('/high-score').expect(200);
    });
});
describe('POST /addScore', ()=>{
    it('responds with 200 and returns score saved',async ()=>{
        const add=await req(app)
        .post('/addScore')
        .send({
            player:'test1',
            score:100,
            date:new Date().toISOString(),
        });
        expect(add.statusCode).toBe(200);
        expect(add.text).toBe('score saved');
        
    });
});
