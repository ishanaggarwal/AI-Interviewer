# Edith - AI Interview Coach 🎯# Edith - AI Interview Agent 🤖# 🤖 Virtual Avatar Voicebot



An intelligent virtual avatar voicebot that helps you practice technical interviews with realistic AI-powered conversations and voice interactions.



![Demo](https://img.shields.io/badge/Status-Live-success)An interactive AI-powered technical interviewer with real-time speech recognition, canvas-based animated avatar, and OpenAI GPT-4 integration. Features Apple-inspired minimalist design with clean typography, subtle animations, and seamless user experience.A stunning, interactive AI-powered voice assistant with real-time speech recognition, animated avatar, and natural conversation capabilities.

![License](https://img.shields.io/badge/License-MIT-blue)



## 🌟 Features

![License](https://img.shields.io/badge/license-MIT-blue.svg)## ✨ Features

### 🎭 Interactive AI Avatar

- Cosmic-themed animated avatar with synchronized mouth movements![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

- Real-time visual feedback during conversations

- Smooth animations and particle effects![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)### 🎨 **Visual Design**



### 🎤 Voice & Text Input- Modern gradient UI (blue → purple → pink)

- **Voice Recognition**: Speak naturally using Web Speech API

- **Text Input**: Type your responses with Enter key support## ✨ Features- Animated avatar with facial expressions

- **Dual Mode**: Seamlessly switch between voice and text

- Smooth transitions and glow effects

### 🤖 Intelligent Conversations

- Powered by OpenAI GPT-4 for natural, context-aware responses### 🎤 **Voice-Powered Interviews**- Responsive design for all devices

- High-quality text-to-speech using OpenAI TTS (Nova voice)

- Audio caching for instant response playback- Real-time speech recognition (Web Speech API)- Light/Dark theme support



### 📚 Four Interview Types- Natural text-to-speech with female voice profiles



#### 1. **Technical Interview**- Click avatar to pause/resume speech### 🗣️ **Voice Interaction**

- Core programming concepts (OOP, design patterns)

- Data structures and algorithms- Continuous listening with auto-restart- Real-time speech recognition

- System architecture and scalability

- Database design and optimization- Text-to-speech responses



#### 2. **Behavioral Interview**### 🎯 **Multiple Interview Types**- Live transcription display

- STAR method evaluation

- Leadership and teamwork scenarios- **Technical**: Deep dive into algorithms, data structures, system design- Adjustable speech speed

- Problem-solving and conflict resolution

- Real past experience discussions- **Behavioral**: STAR method questions, teamwork scenarios- Voice enable/disable toggle



#### 3. **System Design Interview**- **Coding**: Hands-on algorithmic challenges with code editor

- Large-scale system architecture

- Scalability and reliability discussions- **System Design**: Large-scale architecture problems### 🤖 **AI Capabilities**

- Trade-off analysis

- Distributed systems concepts- Natural language understanding



#### 4. **Coding Interview** ⭐### 🎨 **Cosmic Avatar**- Contextual responses

- **12 Real LeetCode Easy Problems**

- Structured interview flow:- Human-shaped AI entity with galaxy-inspired design- Sentiment analysis (positive/neutral/negative)

  1. Problem presentation with examples

  2. Approach explanation- Animated mouth sync with speech- Conversation memory

  3. Time/space complexity analysis

  4. Code implementation in built-in editor- Eye tracking follows mouse cursor- Smart response generation

  5. Detailed code review and feedback

- Glowing particles and energy streams

### 💻 Code Editor

- Syntax highlighting for multiple languages- Interactive click-to-pause feature### 🎭 **Avatar Animation**

- Python, JavaScript, Java, C++, and more

- Share code directly with Edith for review- Mouth movement during speech

- Real-time feedback on your solutions

### 💻 **Built-in Code Editor**- Eye blinking animations

## 🚀 Getting Started

- Support for 8 programming languages- Expression changes based on sentiment

### Prerequisites

- Modern web browser (Chrome, Safari, Edge, Firefox)- Live code execution (JavaScript, Python simulation)- Floating and glow effects

- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

- Python 3 (for local server)- Syntax highlighting- Canvas-based rendering



### Installation- Compilation status and error display



1. **Clone the repository**### 💾 **Additional Features**

```bash

git clone https://github.com/ishanaggarwal/AI-Interviewer.git### ⏱️ **Interview Tracking**- Conversation logging with timestamps

cd AI-Interviewer

```- Real-time duration counter (seconds → minutes → hours)- Settings panel with customization



2. **Configure your API key**- Response count tracking- Chat history management



Edit `js/config.js` and `js/speech.js`:- Interview type display- Keyboard shortcuts (Ctrl+Space to toggle)

```javascript

const OPENAI_API_KEY = 'your-api-key-here';- Progress statistics- Browser compatibility checks

```



3. **Start the server**

```bash## 🚀 Quick Start## 🚀 Getting Started

python3 -m http.server 8000

```



4. **Open in browser**### Prerequisites### Prerequisites

```

http://localhost:8000- Modern web browser (Chrome/Edge recommended for best speech API support)- Modern web browser (Chrome, Firefox, Safari, Edge)

```

- OpenAI API key- Microphone access for speech recognition

## 📖 How to Use

- Internet connection for fonts and icons

### Starting an Interview

### Installation

1. **Click on Edith** (the avatar) to hear her introduction

2. **Select an interview type**: Technical, Behavioral, Coding, or System Design### Installation

3. **Click "Begin Interview"**

4. Edith will ask you questions based on the interview type1. **Clone the repository**1. **Download the project** (already in your Downloads folder)



### Coding Interview Workflow   ```bash2. **Open the project folder** in VS Code or your preferred editor



1. **Select "Coding Interview"**   git clone https://github.com/ishanaggarwal/virtual-avatar-voicebot.git3. **Launch the application**:

2. Edith presents a random LeetCode problem

3. **Explain your approach** (voice or text)   cd virtual-avatar-voicebot   - Option 1: Open `index.html` directly in your browser

4. **Explain complexity** (time and space)

5. **Code your solution** in the editor   ```   - Option 2: Use a local server (recommended):

6. **Click "Share with Edith"**

7. Get detailed feedback and discuss optimizations     ```bash



### Using Voice Input2. **Add your OpenAI API Key**     # Using Python



1. Click the 🎤 microphone button        python -m http.server 8000

2. Speak your answer clearly

3. The system auto-detects when you're done   Open `script-fixed.js` and add your API key at line 27:     

4. Your answer appears in the chat

5. Edith responds with feedback   ```javascript     # Using Node.js



## 🏗️ Project Structure   apiKey: 'your-openai-api-key-here'     npx serve .



```   ```     

AI-Interviewer/

├── index.html              # Main HTML file     # Using PHP

├── style.css               # Styling and animations

├── js/3. **Run locally**     php -S localhost:8000

│   ├── app.js             # Main application controller

│   ├── avatar.js          # Avatar rendering and animation        ```

│   ├── config.js          # Configuration and API keys

│   ├── conversation.js    # OpenAI chat integration   ```bash4. **Allow microphone access** when prompted by your browser

│   ├── interview.js       # Interview flow management

│   ├── interview-prompts.js  # Specialized prompts for each type   # Option 1 - Python HTTP Server

│   ├── leetcode-questions.js # LeetCode problem database

│   ├── speech.js          # Text-to-speech and voice recognition   python3 -m http.server 8000### Usage

│   ├── state.js           # Application state management

│   ├── ui.js              # UI helper functions   1. Click **"Start Conversation"** to begin

│   ├── utils.js           # Utility functions

│   └── codeEditor.js      # Code editor functionality   # Option 2 - Node.js serve2. Speak naturally into your microphone

└── README.md

```   npx serve .3. Watch the avatar respond with animations



## 🛠️ Tech Stack   4. View live transcription and chat history



- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3   # Option 3 - Direct file open5. Adjust settings using the gear icon ⚙️

- **AI**: OpenAI GPT-4 (Chat Completions), OpenAI TTS-1 (Text-to-Speech)

- **Voice**: Web Speech Recognition API   open index.html

- **Graphics**: HTML5 Canvas 2D API

- **Server**: Python HTTP Server (development)   ```## 🛠️ File Structure



## 🎨 Key Technical Features



- **Modular Architecture**: Separate concerns across 12+ JavaScript modules4. **Open in browser**```

- **Audio Caching**: Map-based caching for instant audio replay

- **State Management**: Centralized state with reactive updates   ```virtual-avatar-voicebot/

- **Voice Recognition**: Continuous speech recognition with auto-stop

- **Animated Avatar**: Canvas-based rendering with particle effects   http://localhost:8000├── index.html          # Main HTML structure

- **Responsive Design**: Apple-inspired dark theme with glassmorphism

   ```├── style.css           # Complete styling and animations

## 📝 LeetCode Problems Included

├── script.js           # Core JavaScript functionality

1. Two Sum

2. Roman to Integer## 📖 How to Use└── README.md          # This file

3. Valid Parentheses

4. Merge Two Sorted Lists```

5. Valid Palindrome

6. Contains Duplicate1. **Click the Avatar** - Edith introduces herself

7. Valid Anagram

8. Climbing Stairs2. **Select Interview Type** - Choose Technical/Behavioral/Coding/System Design## 🔧 Customization

9. Best Time to Buy and Sell Stock

10. Reverse Linked List3. **Click "Begin Interview"** - Start your session

11. Move Zeroes

12. Invert Binary Tree4. **Answer Questions** - Click "Speak Answer" to respond### Theme Colors



Each problem includes:5. **Code Challenges** - Use built-in editor for codingEdit CSS variables in `style.css`:

- Full problem description

- Multiple examples with explanations6. **Track Progress** - Monitor duration and responses```css

- Constraints

- Expected complexity guidance:root {



## 🤝 Contributing## 🛠️ Technology Stack    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);



Contributions are welcome! Feel free to:    --accent: #f093fb;

- Add more LeetCode problems

- Improve the avatar animations- **Frontend**: Vanilla JavaScript, HTML5, CSS3    /* ... more variables */

- Add new interview types

- Enhance the code editor- **AI**: OpenAI GPT-4 API}

- Fix bugs or improve performance

- **Speech**: Web Speech API```

## 📄 License

- **Graphics**: HTML5 Canvas 2D

This project is licensed under the MIT License.

- **Design**: Apple Design System### Avatar Appearance

## 👨‍💻 Author

Modify avatar rendering in `script.js`:

**Ishan Aggarwal**

- GitHub: [@ishanaggarwal](https://github.com/ishanaggarwal)## 🔒 Security Note```javascript



## 🙏 Acknowledgmentsfunction drawAvatar() {



- OpenAI for GPT-4 and TTS APIs**Important**: Update API key in `script-fixed.js` before deployment.    // Customize colors, size, expressions

- LeetCode for interview problem inspiration

- Web Speech API contributors    // Add new facial features



## 📞 Support## 🌐 Live Demo    // Change animation patterns



If you have any questions or run into issues, please open an issue on GitHub.}



---🚀 **[Try it live!](https://ishanaggarwal.github.io/virtual-avatar-voicebot/)**```



**Note**: This project requires an OpenAI API key. Usage of OpenAI APIs may incur costs based on your usage.



Built with ❤️ for aspiring software engineers## 📝 License### AI Responses


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