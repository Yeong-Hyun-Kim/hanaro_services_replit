const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for generating business ideas using Gemini
app.post('/api/generate-idea', async (req, res) => {
    try {
        const { business } = req.body;
        
        if (!business) {
            return res.status(400).json({ error: '사업 설명이 필요합니다.' });
        }

        // Import Gemini API
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
다음 사업에 대한 실용적이고 구체적인 개선 아이디어 3가지를 한국어로 제안해주세요:

사업 설명: ${business}

다음 형식으로 답변해주세요:
1. [첫 번째 아이디어]
2. [두 번째 아이디어] 
3. [세 번째 아이디어]

각 아이디어는 실제로 실행 가능하고 구체적이어야 하며, 소상공인이 적용할 수 있는 수준이어야 합니다.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the response to extract ideas
        const ideas = text.split(/\d+\./).filter(idea => idea.trim().length > 0).map(idea => idea.trim());
        
        res.json({ 
            ideas: ideas.length > 0 ? ideas : [
                '온라인 주문 시스템 도입으로 고객 편의성 향상',
                'SNS 마케팅을 통한 브랜드 인지도 제고',
                '고객 피드백을 활용한 서비스 개선'
            ]
        });
    } catch (error) {
        console.error('Error generating business idea:', error);
        res.status(500).json({ 
            error: '아이디어 생성 중 오류가 발생했습니다.',
            ideas: [
                '온라인 주문 시스템 도입으로 고객 편의성 향상',
                'SNS 마케팅을 통한 브랜드 인지도 제고', 
                '고객 피드백을 활용한 서비스 개선'
            ]
        });
    }
});

// API endpoint for explaining policies using Gemini
app.post('/api/explain-policy', async (req, res) => {
    try {
        const { policyType } = req.body;
        
        if (!policyType) {
            return res.status(400).json({ error: '정책 유형이 필요합니다.' });
        }

        // Import Gemini API
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
다음 소상공인 지원 정책에 대해 쉽고 자세하게 설명해주세요:

정책명: ${policyType}

다음 내용을 포함하여 설명해주세요:
- 정책의 목적과 대상
- 지원 내용 및 규모
- 신청 방법 및 절차
- 필요 서류
- 주의사항

소상공인이 이해하기 쉽게 친근한 톤으로 설명해주세요.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const explanation = response.text();
        
        res.json({ explanation });
    } catch (error) {
        console.error('Error explaining policy:', error);
        res.status(500).json({ 
            error: '정책 설명 생성 중 오류가 발생했습니다.',
            explanation: '죄송합니다. 현재 정책 설명 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 함께가게 서버가 http://0.0.0.0:${PORT}에서 실행 중입니다.`);
    console.log(`📱 Korean AI business diagnostic service is ready!`);
    
    if (process.env.GEMINI_API_KEY) {
        console.log('✅ Gemini API key detected - AI features will be available');
    } else {
        console.log('⚠️  No Gemini API key found - AI features will use fallback responses');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});
