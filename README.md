# Edith - AI Interview Agent 🤖# 🤖 Virtual Avatar Voicebot



An interactive AI-powered technical interviewer with real-time speech recognition, canvas-based animated avatar, and OpenAI GPT-4 integration. Features Apple-inspired minimalist design with clean typography, subtle animations, and seamless user experience.A stunning, interactive AI-powered voice assistant with real-time speech recognition, animated avatar, and natural conversation capabilities.



![License](https://img.shields.io/badge/license-MIT-blue.svg)## ✨ Features

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)### 🎨 **Visual Design**

- Modern gradient UI (blue → purple → pink)

## ✨ Features- Animated avatar with facial expressions

- Smooth transitions and glow effects

### 🎤 **Voice-Powered Interviews**- Responsive design for all devices

- Real-time speech recognition (Web Speech API)- Light/Dark theme support

- Natural text-to-speech with female voice profiles

- Click avatar to pause/resume speech### 🗣️ **Voice Interaction**

- Continuous listening with auto-restart- Real-time speech recognition

- Text-to-speech responses

### 🎯 **Multiple Interview Types**- Live transcription display

- **Technical**: Deep dive into algorithms, data structures, system design- Adjustable speech speed

- **Behavioral**: STAR method questions, teamwork scenarios- Voice enable/disable toggle

- **Coding**: Hands-on algorithmic challenges with code editor

- **System Design**: Large-scale architecture problems### 🤖 **AI Capabilities**

- Natural language understanding

### 🎨 **Cosmic Avatar**- Contextual responses

- Human-shaped AI entity with galaxy-inspired design- Sentiment analysis (positive/neutral/negative)

- Animated mouth sync with speech- Conversation memory

- Eye tracking follows mouse cursor- Smart response generation

- Glowing particles and energy streams

- Interactive click-to-pause feature### 🎭 **Avatar Animation**

- Mouth movement during speech

### 💻 **Built-in Code Editor**- Eye blinking animations

- Support for 8 programming languages- Expression changes based on sentiment

- Live code execution (JavaScript, Python simulation)- Floating and glow effects

- Syntax highlighting- Canvas-based rendering

- Compilation status and error display

### 💾 **Additional Features**

### ⏱️ **Interview Tracking**- Conversation logging with timestamps

- Real-time duration counter (seconds → minutes → hours)- Settings panel with customization

- Response count tracking- Chat history management

- Interview type display- Keyboard shortcuts (Ctrl+Space to toggle)

- Progress statistics- Browser compatibility checks



## 🚀 Quick Start## 🚀 Getting Started



### Prerequisites### Prerequisites

- Modern web browser (Chrome/Edge recommended for best speech API support)- Modern web browser (Chrome, Firefox, Safari, Edge)

- OpenAI API key- Microphone access for speech recognition

- Internet connection for fonts and icons

### Installation

### Installation

1. **Clone the repository**1. **Download the project** (already in your Downloads folder)

   ```bash2. **Open the project folder** in VS Code or your preferred editor

   git clone https://github.com/ishanaggarwal/virtual-avatar-voicebot.git3. **Launch the application**:

   cd virtual-avatar-voicebot   - Option 1: Open `index.html` directly in your browser

   ```   - Option 2: Use a local server (recommended):

     ```bash

2. **Add your OpenAI API Key**     # Using Python

        python -m http.server 8000

   Open `script-fixed.js` and add your API key at line 27:     

   ```javascript     # Using Node.js

   apiKey: 'your-openai-api-key-here'     npx serve .

   ```     

     # Using PHP

3. **Run locally**     php -S localhost:8000

        ```

   ```bash4. **Allow microphone access** when prompted by your browser

   # Option 1 - Python HTTP Server

   python3 -m http.server 8000### Usage

   1. Click **"Start Conversation"** to begin

   # Option 2 - Node.js serve2. Speak naturally into your microphone

   npx serve .3. Watch the avatar respond with animations

   4. View live transcription and chat history

   # Option 3 - Direct file open5. Adjust settings using the gear icon ⚙️

   open index.html

   ```## 🛠️ File Structure



4. **Open in browser**```

   ```virtual-avatar-voicebot/

   http://localhost:8000├── index.html          # Main HTML structure

   ```├── style.css           # Complete styling and animations

├── script.js           # Core JavaScript functionality

## 📖 How to Use└── README.md          # This file

```

1. **Click the Avatar** - Edith introduces herself

2. **Select Interview Type** - Choose Technical/Behavioral/Coding/System Design## 🔧 Customization

3. **Click "Begin Interview"** - Start your session

4. **Answer Questions** - Click "Speak Answer" to respond### Theme Colors

5. **Code Challenges** - Use built-in editor for codingEdit CSS variables in `style.css`:

6. **Track Progress** - Monitor duration and responses```css

:root {

## 🛠️ Technology Stack    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);

    --accent: #f093fb;

- **Frontend**: Vanilla JavaScript, HTML5, CSS3    /* ... more variables */

- **AI**: OpenAI GPT-4 API}

- **Speech**: Web Speech API```

- **Graphics**: HTML5 Canvas 2D

- **Design**: Apple Design System### Avatar Appearance

Modify avatar rendering in `script.js`:

## 🔒 Security Note```javascript

function drawAvatar() {

**Important**: Update API key in `script-fixed.js` before deployment.    // Customize colors, size, expressions

    // Add new facial features

## 🌐 Live Demo    // Change animation patterns

}

🚀 **[Try it live!](https://ishanaggarwal.github.io/virtual-avatar-voicebot/)**```



## 📝 License### AI Responses

Update response patterns in `script.js`:

MIT License```javascript

function getContextualResponse(input) {

## 👤 Author    // Add new response categories

    // Customize personality

**Ishan Aggarwal**    // Add more contextual awareness

}

---```



**Built with ❤️ by Ishan Aggarwal**## 🔌 API Integration


### OpenAI GPT-4 Integration
Replace the placeholder function with real API calls:

```javascript
async function generateAIResponseWithOpenAI(userInput) {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a friendly virtual assistant...'
                },
                {
                    role: 'user',
                    content: userInput
                }
            ],
            max_tokens: 150,
            temperature: 0.7
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
}
```

### Azure Speech Services
For enhanced speech recognition and synthesis:

```javascript
// Add Azure Speech SDK
// Configure with your subscription key and region
// Replace Web Speech API calls
```

### ElevenLabs Voice Cloning
For realistic voice synthesis:

```javascript
async function speakWithElevenLabs(text) {
    const apiKey = 'YOUR_ELEVENLABS_API_KEY';
    const voiceId = 'YOUR_VOICE_ID';
    
    // Implementation for high-quality voice synthesis
}
```

## ⌨️ Keyboard Shortcuts

- **Ctrl + Space**: Toggle conversation on/off
- **Escape**: Close settings panel

## 🎯 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Speech Recognition | ✅ | ✅ | ✅ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Canvas Animation | ✅ | ✅ | ✅ | ✅ |
| Local Storage | ✅ | ✅ | ✅ | ✅ |

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Ensure microphone permissions are granted
- Check browser microphone settings
- Try refreshing the page

**Speech recognition not starting:**
- Use HTTPS or localhost (required for microphone access)
- Check browser console for errors
- Verify microphone is not used by another application

**Avatar not animating:**
- Ensure JavaScript is enabled
- Check browser console for canvas errors
- Try a different browser

**No voice output:**
- Check system volume settings
- Verify "Voice Enabled" setting is on
- Try different speech synthesis voices

## 🚧 Future Enhancements

- [ ] Voice training and personalization
- [ ] Multiple language support
- [ ] Advanced emotion recognition
- [ ] 3D avatar rendering with Three.js
- [ ] Integration with smart home devices
- [ ] Voice command recognition
- [ ] Export conversation transcripts
- [ ] Custom avatar appearance editor

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📞 Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the project repository.

---

**Enjoy your Virtual Avatar Voicebot! 🎉**