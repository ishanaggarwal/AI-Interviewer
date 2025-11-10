// Configuration Module - Centralized configuration for the application
// Contains API keys, settings, and constants

(function() {
    'use strict';

    // OpenAI API Configuration
    const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    const OPENAI_MODEL = 'gpt-4';

    // Avatar Configuration
    const AVATAR_CONFIG = {
        width: 400,
        height: 400,
        animationSpeed: 0.02,
        glowIntensity: 0.8,
        particleCount: 150,
        circuitLineWidth: 1.5,
        eyeGlowRadius: 8
    };

    // Speech Configuration
    const SPEECH_CONFIG = {
        rate: 0.9,
        pitch: 0.95,
        volume: 0.95,
        lang: 'en-US',
        preferredVoices: ['Samantha', 'Ava', 'Allison', 'Zira', 'Hazel']
    };

    // Speech Recognition Configuration
    const RECOGNITION_CONFIG = {
        continuous: true,
        interimResults: true,
        lang: 'en-US',
        maxAlternatives: 1
    };

    // Interview Configuration
    const INTERVIEW_CONFIG = {
        types: {
            technical: {
                name: 'Technical Interview',
                description: 'Deep dive into technical skills and problem-solving',
                color: '#0071e3'
            },
            behavioral: {
                name: 'Behavioral Interview',
                description: 'STAR method questions about past experiences',
                color: '#00c8ff'
            },
            coding: {
                name: 'Coding Challenge',
                description: 'Live coding and algorithm questions',
                color: '#30d158'
            },
            system: {
                name: 'System Design',
                description: 'Architecture and scalability discussions',
                color: '#bf5af2'
            }
        },
        maxDuration: 3600000, // 1 hour in milliseconds
        questionDelay: 1000 // Delay before asking next question
    };

    // Code Editor Configuration
    const EDITOR_CONFIG = {
        languages: [
            { value: 'python', label: 'Python', extension: '.py' },
            { value: 'javascript', label: 'JavaScript', extension: '.js' },
            { value: 'java', label: 'Java', extension: '.java' },
            { value: 'cpp', label: 'C++', extension: '.cpp' },
            { value: 'csharp', label: 'C#', extension: '.cs' },
            { value: 'go', label: 'Go', extension: '.go' },
            { value: 'ruby', label: 'Ruby', extension: '.rb' },
            { value: 'swift', label: 'Swift', extension: '.swift' }
        ],
        theme: 'dark',
        fontSize: 14,
        tabSize: 4,
        timeout: 5000 // Execution timeout in milliseconds
    };

    // UI Configuration
    const UI_CONFIG = {
        statusUpdateDelay: 2000,
        autoScrollDelay: 100,
        buttonDebounceTime: 300,
        maxChatHistory: 100
    };

    // Edith Introduction Message
    const EDITH_INTRO = "Hello! I'm Edith, your Personal Interview Agent. I'm here to help you practice for technical interviews, behavioral questions, coding challenges, and system design discussions. Click on any interview type to begin, or use the code editor to practice your coding skills. I'm excited to work with you!";

    // Export configuration globally
    window.CONFIG = {
        OPENAI_API_KEY,
        OPENAI_API_URL,
        OPENAI_MODEL,
        AVATAR_CONFIG,
        SPEECH_CONFIG,
        RECOGNITION_CONFIG,
        INTERVIEW_CONFIG,
        EDITOR_CONFIG,
        UI_CONFIG,
        EDITH_INTRO
    };

    console.log('Configuration module loaded');

})();
