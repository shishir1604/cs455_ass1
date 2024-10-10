const express=require('express');
const cors=require('cors');
const sqlite3=require('sqlite3').verbose();
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const port=3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
const db=new sqlite3.Database(':memory:', (err)=>{
    if(err){
        console.log('error ocurred while creating the database',err.message);
    }
    else{
        db.run('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, player TEXT, score INTEGER, date TEXT)', (err)=>{
            if(err){
                console.log('error ocurred while creating the table',err.message);
            }
        });
    }
});
app.post('/addScore', (req,res)=>{
    const player=req.body.player;
    const score=req.body.score;
    const date=new Date().toISOString();
    
    db.run('INSERT INTO scores (player,score,date) VALUES (?,?,?)',[player,score,date],(err)=>{
        if(err){
            console.log('error occured while adding',err.message);
            res.status(500).send('error saving score');
        }
        else{
            res.status(200).send('score saved');
            console.log('score saved'); 
        }
    });
});
app.get('/high-score',(req,res)=>{
    db.all('SELECT * FROM scores ORDER BY score DESC LIMIT 10',(err,row)=>{
        if(err){
            console.log('error occured while getting high score',err.message);
            res.status(500).send('error getting high score');
        }
        else{
            res.status(200).send(row);
            console.log('high score fetched');
        }
    });

});
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'index.html'));
});
if(require.main===module){
    app.listen(port,()=>{
        console.log('server is running on port',port);
    });
}
module.exports=app;
