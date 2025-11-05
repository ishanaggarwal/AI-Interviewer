# Virtual Avatar Voicebot - AI Agent Instructions

## Project Overview
Interactive AI-powered technical interviewer with real-time speech recognition, canvas-based animated avatar, and OpenAI GPT-4 integration. Features Apple-inspired minimalist design with clean typography, subtle animations, and seamless user experience.

## Architecture

### Core Components
- **`index.html`**: Minimalist UI structure with Apple-style components (pills, cards, clean buttons)
- **`script-fixed.js`**: Production script with OpenAI integration (primary)
- **`script.js`**: Original version with Tony Stark personality (legacy/reference)
- **`style.css`**: Apple Design System — SF Pro typography, subtle shadows, smooth transitions
- **`test.html`**: Minimal speech API testing environment

### Design Philosophy
The app follows Apple's design principles:
- **Minimalism**: Clean white/light gray backgrounds, no gradients or glows
- **Typography**: SF Pro Display/Text system fonts (via -apple-system)
- **Colors**: Blue (#0071e3) primary, green (#30d158) success, subdued grays
- **Spacing**: 4px grid system, generous whitespace
- **Animations**: Subtle, smooth cubic-bezier transitions (0.3s-0.5s)
- **Components**: Rounded rectangles (12-24px), pill-shaped indicators, card-based layouts

### Main Entry Point
The app loads `script-fixed.js` (per `package.json` main field), not `script.js`. Always edit `script-fixed.js` for production changes.

## Key Patterns & Conventions

### Apple-Style UI Components
**Buttons** (style.css:390-435):
- Primary: Blue background, white text, 13px padding, 12px radius
- Hover: Slight darkening + 1px upward transform
- Active: scale(0.98) for tactile feedback
- No shadows or glows (unlike original gradient version)

**Toggle Switches** (style.css:212-240):
- iOS-style: 51×31px, green when active
- 27px white circle thumb with subtle shadow
- Smooth 0.15s cubic-bezier transition

**Status Pills** (style.css:323-370):
- Inline-flex, rounded-full (24px), light background
- Small pulsing dots for active states
- Minimal text with SF Pro at 0.9375rem

**Cards/Panels** (style.css:460-545):
- Light gray background (--background-secondary)
- 1px border with rgba(0,0,0,0.08)
- Soft shadow (0 2px 8px rgba(0,0,0,0.04))
- 18px border radius for premium feel

### Conversation Engine Pattern
`ConversationEngine` class (script-fixed.js:85) manages AI interactions:
- **Context Window**: Last 10 exchanges to manage token usage
- **System Prompt**: `SDE_INTERVIEWER_PROMPT` defines interviewer personality (script-fixed.js:43)
- **Interview Context**: Auto-injected into each request with phase, duration, response count
- **Error Handling**: Graceful degradation when API key missing or network fails

### OpenAI Integration
Configuration in `OPENAI_CONFIG` (script-fixed.js:26):
```javascript
{ apiKey, endpoint: 'https://api.openai.com/v1/chat/completions', 
  model: 'gpt-4', maxTokens: 500, temperature: 0.7 }
```
**Security Note**: API key is hardcoded in script-fixed.js:27 - should be moved to environment variables or secure storage.

### Avatar Animation System
Canvas-based rendering with state machine (script-fixed.js:16):
- **`avatarState`**: Controls mouth openness, eye blink, expression intensity, eye tracking
- **Animation Loop**: Continuous requestAnimationFrame for smooth 60fps rendering
- **Mouse Tracking**: Eyes follow cursor position for interactive feel
- **Speech Sync**: Mouth animates during TTS playback via `isSpeaking` flag

### Speech APIs
- **Recognition**: Web Speech API (`webkitSpeechRecognition` for Chrome compatibility)
- **Synthesis**: Native `speechSynthesis` with configurable speed (settings panel)
- **Workflow**: Start Interview → Enable Mic → Continuous recognition → Process with OpenAI → Speak response

## Critical Workflows

### Starting an Interview
1. User clicks "Start Interview" button
2. `ConversationEngine.startInterview()` initializes session (script-fixed.js:128)
3. System prompt + interview context sent to OpenAI
4. Welcome message displayed and spoken
5. Speech recognition activates for continuous listening

### Processing User Input
1. Speech recognition captures candidate answer
2. `ConversationEngine.processUserInput()` (script-fixed.js:91) called
3. Response recorded in `candidateResponses[]` array
4. OpenAI generates contextual follow-up question
5. Phase auto-detected from interviewer response keywords
6. Interview stats updated (duration, response count, current phase)
7. TTS speaks interviewer's response while avatar animates

### Running Locally
No build step required - pure vanilla JavaScript:
```bash
# Option 1: Direct file open
open index.html

# Option 2: Local server (recommended for full speech API support)
python -m http.server 8000  # or npx serve .
open http://localhost:8000
```

## Browser Compatibility Notes
- **Speech Recognition**: Requires `https://` or `localhost` for microphone access
- **Preferred**: Chrome/Edge (best Web Speech API support)
- **Canvas**: Works across all modern browsers

## Development Gotchas

1. **Two Script Files**: `script.js` is legacy (Tony Stark personality), `script-fixed.js` is production
2. **API Key Security**: Hardcoded in script-fixed.js:27 - rotate if exposed publicly
3. **Context Window**: Limited to 10 exchanges to prevent token overflow
4. **Phase Detection**: Keywords-based (brittle) - consider explicit phase commands
5. **No Tests**: No automated tests despite Playwright dependency in package.json

## Common Customizations

**Change Interviewer Personality**: Edit `SDE_INTERVIEWER_PROMPT` (script-fixed.js:43)

**Adjust Interview Structure**: Modify phases in `InterviewSession.currentPhase` logic

**Theme Customization**: Edit CSS variables in style.css:4-38 (`--primary-gradient`, `--accent`, etc.)

**Avatar Appearance**: Canvas rendering logic starts at script-fixed.js:~400 (search for `drawAvatar`)

## Dependencies
- **Runtime**: Browser-native APIs only (Web Speech, Canvas, Fetch)
- **Dev**: Playwright (in package.json but unused - consider removing or adding tests)
- **External**: OpenAI GPT-4 API, Google Fonts (Inter), Font Awesome icons

## Integration Points
- **OpenAI API**: Direct fetch to `/v1/chat/completions` endpoint
- **Web Speech API**: Browser microphone → text, text → audio
- **LocalStorage**: Settings persistence (voice enabled, theme, speech speed)
