import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
    stages: [
        { duration: '1m', target: 5 },     
        { duration: '5m', target: 5 },
        { duration: '1m', target: 0 },    

    ],
};
const gameUrls = [
    "https://cs455-ass1.onrender.com", 
    "https://cs455-ass1-1.onrender.com", 
    "https://twocs455-ass1.onrender.com"
  ];
  const leaderboardUrl = "/high-score";
export default function () {
    for (let gameUrl of gameUrls){
    let resGamePage = http.get(gameUrl);
    check(resGamePage, { 'status is 200': (r) => r.status === 200 });

    let resLeaderboard = http.get(gameUrl + leaderboardUrl);
    check(resLeaderboard, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    }
}
