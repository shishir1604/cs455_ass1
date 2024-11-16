const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    responseType: 'arraybuffer',  
    maxBodyLength: Infinity,
    maxContentLength: Infinity
});

const servers = {
    primary: [
        'https://cs455-ass1-1.onrender.com',
        'https://cs455-ass1.onrender.com'
    ],
    backup: 'https://twocs455-ass1.onrender.com'
};

let currentServerIndex = 0;

app.get('/status1', (req, res) => {
    res.json({ 
        status: 'Load Balancer Active',
        currentServer: servers.primary[currentServerIndex],
        timestamp: new Date().toISOString()
    });
});

app.get('/status2', async (req, res) => {
    try {
        const statusChecks = await Promise.all(
            servers.primary.map(async (server) => {
                try {
                    const response = await axiosInstance.get(server, { 
                        timeout: 5000,
                        responseType: 'json' 
                    });
                    return { server, status: 'healthy', code: response.status };
                } catch (error) {
                    return { server, status: 'unhealthy', error: error.message };
                }
            })
        );

        res.json({
            primary: statusChecks,
            backup: servers.backup,
            currentActive: servers.primary[currentServerIndex]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.all('*', async (req, res) => {
    const startTime = Date.now();
    let attempts = 0;
    let error = null;

    while (attempts < servers.primary.length) {
        const server = servers.primary[currentServerIndex];
        try {
            console.log(`Attempting request to ${server}${req.originalUrl}`);
            
            const response = await axiosInstance({
                method: req.method,
                url: `${server}${req.originalUrl}`,
                data: req.body,
                headers: { 
                    ...req.headers,
                    host: new URL(server).host,
                    'accept-encoding': 'gzip, deflate, br'
                },
                responseType: 'arraybuffer'
            });

            const contentType = response.headers['content-type'];
            
            Object.entries(response.headers).forEach(([key, value]) => {
                if (key !== 'content-encoding' && key !== 'content-length') {
                    res.setHeader(key, value);
                }
            });

            if (contentType && (contentType.includes('text') || contentType.includes('json'))) {
                const textData = Buffer.from(response.data).toString('utf-8');
                if (contentType.includes('json')) {
                    return res.json(JSON.parse(textData));
                }
                return res.send(textData);
            }

            console.log(`✅ Request successful to ${server} in ${Date.now() - startTime}ms`);
            
            return res.status(response.status).send(Buffer.from(response.data));

        } catch (err) {
            console.log(`❌ Failed request to ${server}: ${err.message}`);
            error = err;
            attempts++;
            currentServerIndex = (currentServerIndex + 1) % servers.primary.length;
        }
    }
    try {
        console.log(`🔄 Trying backup server: ${servers.backup}`);
        const response = await axiosInstance({
            method: req.method,
            url: `${servers.backup}${req.originalUrl}`,
            data: req.body,
            headers: { 
                ...req.headers,
                host: new URL(servers.backup).host,
                'accept-encoding': 'gzip, deflate, br'
            }
        });

        const contentType = response.headers['content-type'];
        
        Object.entries(response.headers).forEach(([key, value]) => {
            if (key !== 'content-encoding' && key !== 'content-length') {
                res.setHeader(key, value);
            }
        });

        if (contentType && (contentType.includes('text') || contentType.includes('json'))) {
            const textData = Buffer.from(response.data).toString('utf-8');
            if (contentType.includes('json')) {
                return res.json(JSON.parse(textData));
            }
            return res.send(textData);
        }

        console.log(`✅ Backup server request successful in ${Date.now() - startTime}ms`);
        return res.status(response.status).send(Buffer.from(response.data));

    } catch (backupError) {
        console.log(`❌ Backup server also failed: ${backupError.message}`);
        return res.status(503).json({
            error: 'All servers are currently unavailable',
            timeTaken: Date.now() - startTime
        });
    }
});

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
    console.log('Primary servers:', servers.primary);
    console.log('Backup server:', servers.backup);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
