import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },     // Ramp-up to 100 users
        { duration: '1m', target: 1000 },     // Ramp-up to 1000 users
        { duration: '1m', target: 10000 },    // Ramp-up to 10,000 users
        { duration: '30s', target: 0 },       // Ramp-down
    ],
};

export default function () {
    let resGamePage = http.get('http://localhost:3000/');
    check(resGamePage, { 'status is 200': (r) => r.status === 200 });

    let resLeaderboard = http.get('http://localhost:3000/high-score');
    check(resLeaderboard, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
