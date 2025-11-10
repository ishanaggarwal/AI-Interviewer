/**
 * Avatar Module
 * Handles all avatar rendering, animations, and interactions
 */

// Avatar state and configuration
let avatarCanvas = null;
let avatarCtx = null;
let avatarImage = null;
let avatarImageLoaded = false;
let mouseX = 0;
let mouseY = 0;
let animationFrameId = null;

// Avatar animation state
const avatarState = {
    mouthOpenness: 0,
    mouthAnimPhase: 0,
    eyeBlinkState: 0,
    isSpeaking: false,
    emotion: 'neutral',
    expressionIntensity: 0.5,
    eyeTrackingX: 0,
    eyeTrackingY: 0,
    glowIntensity: 0.5
};

// Avatar click state
let hasWelcomedUser = false;
let lastSpokenMessage = '';
let wasInterrupted = false;

/**
 * Initialize the avatar canvas and setup event listeners
 */
function initializeAvatar() {
    avatarCanvas = document.getElementById('avatarCanvas');
    if (!avatarCanvas) {
        console.error('❌ Avatar canvas not found');
        return;
    }
    
    avatarCtx = avatarCanvas.getContext('2d');
    
    // Set explicit canvas size (500x500 - 25% larger than original 400x400)
    avatarCanvas.width = 500;
    avatarCanvas.height = 500;
    
    console.log('🎨 Avatar canvas initialized: 500 x 500');
    
    // Try to load the robotic avatar image
    console.log('📥 Attempting to load robotic avatar face...');
    avatarImage = new Image();
    avatarImage.crossOrigin = "anonymous";
    
    avatarImage.onload = () => {
        console.log('✅ Robotic avatar face loaded successfully');
        avatarImageLoaded = true;
    };
    
    avatarImage.onerror = (err) => {
        console.log('⚠️ External image not available, using drawn avatar');
        avatarImageLoaded = false;
    };
    
    // Try to load from local file
    avatarImage.src = 'avatar-face.jpg';
    
    // Add click handler to avatar
    setupAvatarClickHandler();
    
    // Setup mouse tracking for eye movement
    setupMouseTracking();
    
    // Start the animation loop immediately
    startAvatarAnimation();
    
    console.log('✅ Avatar initialization complete - cosmic face will be visible immediately');
}

/**
 * Setup avatar click handler for intro/pause/resume functionality
 */
function setupAvatarClickHandler() {
    if (!avatarCanvas) return;
    
    avatarCanvas.addEventListener('click', () => {
        console.log('🖱️ Avatar clicked');
        
        // Exact introduction message as specified
        const EDITH_INTRO = "Hello! I'm Edith, your personal AI interview agent. I'm here to conduct four types of interviews: Technical interviews covering algorithms and data structures, Behavioral interviews using the STAR method to discuss your experiences, Coding interviews with a live editor supporting 8 programming languages, and System Design interviews focusing on architecture and scalability. Select an interview type above, then click 'Begin Interview' when you're ready. Click me anytime to pause or resume my speech!";
        
        if (!hasWelcomedUser) {
            // First click ever - introduce Edith with audio
            hasWelcomedUser = true;
            lastSpokenMessage = EDITH_INTRO;
            
            console.log('👋 First click - Introducing Edith with audio...');
            
            // Speak the introduction - user click ensures browser allows audio
            if (window.speakText) {
                console.log('🔊 Speaking Edith introduction...');
                window.speakText(EDITH_INTRO, true); // Use cache
            } else {
                console.error('❌ window.speakText not available');
            }
        } else {
            // Subsequent clicks - toggle speaking
            if (avatarState.isSpeaking) {
                // Currently speaking - stop it
                if (window.stopSpeaking) {
                    window.stopSpeaking();
                    console.log('🛑 Stopped speaking via avatar click');
                }
            } else {
                // Not speaking - replay intro
                console.log('🔁 Replaying Edith introduction');
                if (window.speakText) {
                    window.speakText(EDITH_INTRO, true); // Use cache for instant playback
                }
            }
        }
    });
    
    // Add hover effect cursor
    avatarCanvas.style.cursor = 'pointer';
    console.log('✅ Avatar click handler setup complete');
}

/**
 * Setup mouse tracking for eye movement
 */
function setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
}

/**
 * Main avatar drawing function
 */
function drawAvatar() {
    if (!avatarCtx || !avatarCanvas) {
        console.error('❌ Canvas context not available');
        return;
    }
    
    const ctx = avatarCtx;
    const canvas = avatarCanvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Clear canvas with theme-appropriate background
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLightMode ? '#f5f5f7' : '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update mouth animation when speaking
    if (avatarState.isSpeaking) {
        avatarState.mouthAnimPhase += 0.3;
        avatarState.mouthOpenness = Math.abs(Math.sin(avatarState.mouthAnimPhase)) * 0.8 + 0.2;
        avatarState.glowIntensity = 0.3 + Math.abs(Math.sin(avatarState.mouthAnimPhase * 0.5)) * 0.4;
    } else {
        avatarState.mouthOpenness *= 0.9; // Smooth close
        avatarState.glowIntensity *= 0.95;
        if (avatarState.mouthOpenness < 0.01) {
            avatarState.mouthOpenness = 0;
            avatarState.mouthAnimPhase = 0;
        }
    }
    
    // Always draw the cosmic robotic face (don't wait for image)
    drawFuturisticAIFace(ctx, centerX, centerY);
    
    // Draw sound wave visualization when speaking
    if (avatarState.isSpeaking) {
        drawSoundWaves(ctx, centerX, canvas.height * 0.88, canvas.width * 0.7, 25);
    }
}

/**
 * Draw robotic avatar using image
 */
function drawImageAvatar(ctx, canvas, centerX, centerY) {
    ctx.save();
    
    // Add cyan glow around avatar when speaking
    if (avatarState.isSpeaking || avatarState.glowIntensity > 0.01) {
        const glowSize = Math.min(canvas.width, canvas.height) * 0.48;
        const gradient = ctx.createRadialGradient(centerX, centerY, glowSize * 0.7, centerX, centerY, glowSize);
        gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
        gradient.addColorStop(0.6, `rgba(0, 200, 255, ${avatarState.glowIntensity * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 200, 255, ${avatarState.glowIntensity * 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw the robotic face image
    const imgSize = Math.min(canvas.width, canvas.height) * 0.9;
    ctx.drawImage(
        avatarImage,
        centerX - imgSize / 2,
        centerY - imgSize / 2,
        imgSize,
        imgSize
    );
    
    // Overlay mouth animation
    if (avatarState.mouthOpenness > 0.05) {
        const mouthY = centerY + imgSize * 0.15;
        const mouthWidth = imgSize * 0.15;
        const mouthHeight = imgSize * 0.08 * avatarState.mouthOpenness;
        
        ctx.fillStyle = `rgba(0, 200, 255, ${avatarState.mouthOpenness * 0.4})`;
        ctx.beginPath();
        ctx.ellipse(centerX, mouthY, mouthWidth, mouthHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(10, 10, 30, ${avatarState.mouthOpenness * 0.6})`;
        ctx.beginPath();
        ctx.ellipse(centerX, mouthY, mouthWidth * 0.7, mouthHeight * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

/**
 * Draw a robotic face using canvas primitives
 */
function drawRoboticFace(ctx, canvas, centerX, centerY) {
    const faceRadius = 140;
    
    ctx.save();
    
    // Outer glow when speaking
    if (avatarState.isSpeaking || avatarState.glowIntensity > 0.01) {
        const gradient = ctx.createRadialGradient(centerX, centerY, faceRadius * 0.8, centerX, centerY, faceRadius * 1.3);
        gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
        gradient.addColorStop(0.7, `rgba(0, 200, 255, ${avatarState.glowIntensity * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 200, 255, ${avatarState.glowIntensity * 0.6})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, faceRadius * 1.3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Head - metallic gradient
    const headGradient = ctx.createLinearGradient(centerX - faceRadius, centerY - faceRadius, centerX + faceRadius, centerY + faceRadius);
    headGradient.addColorStop(0, '#4a5568');
    headGradient.addColorStop(0.5, '#7c8a9e');
    headGradient.addColorStop(1, '#3a4555');
    
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, faceRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Head outline
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Face panel details (hexagonal pattern)
    ctx.strokeStyle = '#1a202c';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI / 3) - Math.PI / 2;
        const x1 = centerX + Math.cos(angle) * faceRadius * 0.7;
        const y1 = centerY + Math.sin(angle) * faceRadius * 0.7;
        const x2 = centerX + Math.cos(angle + Math.PI / 3) * faceRadius * 0.7;
        const y2 = centerY + Math.sin(angle + Math.PI / 3) * faceRadius * 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Eyes - glowing cyan
    const eyeY = centerY - 20;
    const eyeSpacing = 50;
    const eyeSize = 25;
    const eyeGlow = avatarState.isSpeaking ? avatarState.glowIntensity : 0.6;
    
    // Left eye
    const leftEyeGradient = ctx.createRadialGradient(centerX - eyeSpacing, eyeY, 0, centerX - eyeSpacing, eyeY, eyeSize);
    leftEyeGradient.addColorStop(0, `rgba(0, 255, 255, ${eyeGlow})`);
    leftEyeGradient.addColorStop(0.5, `rgba(0, 200, 255, ${eyeGlow * 0.8})`);
    leftEyeGradient.addColorStop(1, `rgba(0, 150, 200, ${eyeGlow * 0.3})`);
    
    ctx.fillStyle = leftEyeGradient;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(centerX - eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(centerX + eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye inner circles
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(centerX - eyeSpacing, eyeY, eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + eyeSpacing, eyeY, eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    // Mouth - animated
    const mouthY = centerY + 50;
    const mouthWidth = 70;
    const mouthHeight = 8 + avatarState.mouthOpenness * 30;
    
    if (avatarState.mouthOpenness > 0.05) {
        // Glowing mouth when speaking
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 200, 255, 0.6)';
        ctx.fillStyle = `rgba(0, 200, 255, ${avatarState.mouthOpenness * 0.5})`;
    } else {
        ctx.fillStyle = '#1a202c';
    }
    
    ctx.beginPath();
    ctx.ellipse(centerX, mouthY, mouthWidth, mouthHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth inner shadow
    if (avatarState.mouthOpenness > 0.05) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(10, 10, 30, ${avatarState.mouthOpenness * 0.7})`;
        ctx.beginPath();
        ctx.ellipse(centerX, mouthY, mouthWidth * 0.8, mouthHeight * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Mouth outline
    ctx.strokeStyle = '#00c8ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, mouthY, mouthWidth, mouthHeight, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
}

/**
 * Draw sound waves when avatar is speaking
 */
function drawSoundWaves(ctx, x, y, width, height) {
    const barCount = 12;
    const barWidth = width / barCount * 0.5;
    const spacing = width / barCount;
    
    for (let i = 0; i < barCount; i++) {
        // Create varied heights based on position and animation phase
        const heightVariation = Math.abs(Math.sin(avatarState.mouthAnimPhase * 0.8 + i * 0.5));
        const barHeight = height * (0.2 + heightVariation * avatarState.mouthOpenness * 0.8);
        const barX = x - width / 2 + i * spacing;
        const barY = y - barHeight / 2;
        
        // Gradient from cyan to blue
        const gradient = ctx.createLinearGradient(barX, barY, barX, barY + barHeight);
        gradient.addColorStop(0, '#00c8ff');
        gradient.addColorStop(1, '#0071e3');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 200, 255, 0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.shadowBlur = 0;
    }
}

/**
 * Draw futuristic AI face (fallback when no image)
 */
function drawFuturisticAIFace(ctx, centerX, centerY) {
    const time = Date.now() / 1000;
    
    // COSMIC DIGITAL BEING - Human-shaped with tech elements
    
    // Background cosmic aura
    const auraGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160);
    auraGradient.addColorStop(0, 'rgba(0, 200, 255, 0.3)');
    auraGradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.2)');
    auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
    ctx.fill();
    
    // Floating particles around head
    for (let i = 0; i < 50; i++) {
        const angle = (time * 0.5 + i) * 0.4;
        const radius = 110 + (i % 4) * 15;
        const px = centerX + Math.cos(angle) * radius;
        const py = centerY + Math.sin(angle) * radius;
        const twinkle = Math.sin(time * 3 + i) * 0.5 + 0.5;
        const color = i % 3 === 0 ? `rgba(0, 255, 255, ${twinkle * 0.7})` : 
                      i % 3 === 1 ? `rgba(255, 100, 255, ${twinkle * 0.6})` :
                                    `rgba(255, 255, 255, ${twinkle * 0.8})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Head shape - human proportions
    const headGradient = ctx.createRadialGradient(centerX, centerY - 10, 20, centerX, centerY - 10, 90);
    headGradient.addColorStop(0, 'rgba(100, 200, 255, 0.9)');
    headGradient.addColorStop(0.5, 'rgba(50, 150, 255, 0.7)');
    headGradient.addColorStop(1, 'rgba(20, 100, 200, 0.5)');
    
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    // Human head shape: wider at top, narrow at chin
    ctx.ellipse(centerX, centerY - 20, 70, 55, 0, 0, Math.PI); // Top of head
    ctx.ellipse(centerX, centerY + 10, 65, 40, 0, 0, Math.PI); // Lower face
    ctx.fill();
    
    // Head glow
    ctx.shadowColor = 'rgba(0, 200, 255, 0.6)';
    ctx.shadowBlur = 25;
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Hair/energy crown
    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI - Math.PI;
        const length = 25 + Math.sin(time * 2 + i) * 8;
        const startX = centerX + Math.cos(angle) * 70;
        const startY = centerY - 20 + Math.sin(angle) * 55;
        const endX = startX + Math.cos(angle - 0.3) * length;
        const endY = startY + Math.sin(angle - 0.3) * length;
        
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${0.7})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    // Circuit pattern on forehead
    const circuitPulse = Math.sin(time * 2) * 0.3 + 0.7;
    ctx.strokeStyle = `rgba(0, 255, 255, ${circuitPulse * 0.5})`;
    ctx.lineWidth = 1;
    
    // Central circuit line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 65);
    ctx.lineTo(centerX, centerY - 45);
    ctx.stroke();
    
    // Circuit nodes
    for (let i = -1; i <= 1; i++) {
        const nx = centerX + i * 15;
        const ny = centerY - 50;
        const glow = Math.sin(time * 2.5 + i) * 0.5 + 0.5;
        
        ctx.fillStyle = `rgba(0, 255, 255, ${glow})`;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Node connections
        if (i !== 0) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - 45);
            ctx.lineTo(nx, ny);
            ctx.stroke();
        }
    }
    
    // Third eye
    const thirdEyeGlow = Math.sin(time * 1.5) * 0.4 + 0.6;
    ctx.fillStyle = `rgba(200, 100, 255, ${thirdEyeGlow})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 58, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = `rgba(200, 100, 255, ${thirdEyeGlow * 0.5})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 58, 7, 0, Math.PI * 2);
    ctx.stroke();
    
    // Eyes
    const eyeY = centerY - 20;
    const eyeSpacing = 28;
    
    drawDigitalEye(ctx, centerX - eyeSpacing, eyeY, time);
    drawDigitalEye(ctx, centerX + eyeSpacing, eyeY, time);
    
    // Eyebrows
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Left eyebrow
    ctx.beginPath();
    ctx.moveTo(centerX - eyeSpacing - 12, eyeY - 12);
    ctx.quadraticCurveTo(centerX - eyeSpacing, eyeY - 15, centerX - eyeSpacing + 12, eyeY - 12);
    ctx.stroke();
    
    // Right eyebrow
    ctx.beginPath();
    ctx.moveTo(centerX + eyeSpacing - 12, eyeY - 12);
    ctx.quadraticCurveTo(centerX + eyeSpacing, eyeY - 15, centerX + eyeSpacing + 12, eyeY - 12);
    ctx.stroke();
    
    // Nose
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 8);
    ctx.lineTo(centerX, centerY + 8);
    ctx.quadraticCurveTo(centerX + 3, centerY + 10, centerX + 6, centerY + 11);
    ctx.stroke();
    
    // Cheekbones with subtle glow
    const cheekGlow = Math.sin(time * 1.2) * 0.2 + 0.3;
    for (let side of [-1, 1]) {
        ctx.fillStyle = `rgba(255, 100, 200, ${cheekGlow})`;
        ctx.beginPath();
        ctx.ellipse(centerX + side * 45, centerY + 5, 12, 8, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Mouth
    drawDigitalMouth(ctx, centerX, centerY + 35, time, avatarState.isSpeaking, avatarState.mouthOpenness);
    
    // Jawline definition
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 25, 55, Math.PI * 0.3, Math.PI * 0.7);
    ctx.stroke();
    
    // Neck suggestion
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 20, centerY + 60);
    ctx.lineTo(centerX - 15, centerY + 75);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY + 60);
    ctx.lineTo(centerX + 15, centerY + 75);
    ctx.stroke();
    
    // Face contour circuits
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.25)';
    ctx.lineWidth = 1;
    for (let side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(centerX + side * 60, centerY - 10);
        ctx.quadraticCurveTo(centerX + side * 55, centerY + 10, centerX + side * 45, centerY + 30);
        ctx.stroke();
    }
    
    // Energy streams from temples
    for (let side of [-1, 1]) {
        for (let i = 0; i < 2; i++) {
            const streamX = centerX + side * 75;
            const streamY = centerY - 15 + i * 15;
            const offset = (time * 40 + i * 20) % 60;
            
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 - offset / 120})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(streamX, streamY);
            ctx.lineTo(streamX + side * offset, streamY);
            ctx.stroke();
        }
    }
}

/**
 * Draw digital eye for AI face
 */
function drawDigitalEye(ctx, x, y, time) {
    // Glowing cyan digital eye
    const blinkFactor = avatarState.eyeBlinkState > 0 ? (1 - avatarState.eyeBlinkState) : 1;
    
    // Outer glow
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
    glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.6)');
    glowGradient.addColorStop(0.5, 'rgba(0, 200, 255, 0.3)');
    glowGradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shape
    ctx.fillStyle = 'rgba(0, 50, 100, 0.8)';
    ctx.beginPath();
    ctx.ellipse(x, y, 15, 12 * blinkFactor, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Iris - bright cyan
    const irisGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
    irisGradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
    irisGradient.addColorStop(0.6, 'rgba(0, 200, 255, 0.9)');
    irisGradient.addColorStop(1, 'rgba(0, 150, 255, 0.7)');
    
    ctx.fillStyle = irisGradient;
    ctx.beginPath();
    ctx.arc(x, y, 10 * blinkFactor, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupil - darker center
    ctx.fillStyle = 'rgba(0, 100, 150, 0.9)';
    ctx.beginPath();
    ctx.arc(x, y, 4 * blinkFactor, 0, Math.PI * 2);
    ctx.fill();
    
    // Bright center point
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(x - 2, y - 2, 2 * blinkFactor, 0, Math.PI * 2);
    ctx.fill();
    
    // Tech rings around eye
    const ringPulse = Math.sin(time * 2) * 0.3 + 0.7;
    ctx.strokeStyle = `rgba(0, 255, 255, ${ringPulse * 0.5 * blinkFactor})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.stroke();
}

/**
 * Draw digital mouth for AI face
 */
function drawDigitalMouth(ctx, x, y, time, isSpeaking, openness) {
    const mouthWidth = 45;
    const mouthHeight = isSpeaking ? 3 + openness * 15 : 2;
    
    // Mouth glow
    if (isSpeaking) {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, mouthWidth);
        glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
        glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(x - mouthWidth, y - 10, mouthWidth * 2, 20);
    }
    
    // Main mouth shape
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    if (isSpeaking) {
        // Open mouth
        ctx.fillStyle = 'rgba(0, 100, 150, 0.6)';
        ctx.beginPath();
        ctx.ellipse(x, y, mouthWidth * 0.5, mouthHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth outline
        ctx.beginPath();
        ctx.ellipse(x, y, mouthWidth * 0.5, mouthHeight, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Sound waves
        for (let i = 0; i < 3; i++) {
            const waveY = y + 15 + i * 8;
            const waveOffset = (time * 5 + i) % 1;
            const alpha = 1 - waveOffset;
            
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 20 - waveOffset * 10, waveY);
            ctx.lineTo(x + 20 + waveOffset * 10, waveY);
            ctx.stroke();
        }
    } else {
        // Closed mouth - slight smile
        ctx.beginPath();
        ctx.moveTo(x - mouthWidth * 0.5, y);
        ctx.quadraticCurveTo(x, y + 5, x + mouthWidth * 0.5, y);
        ctx.stroke();
    }
}

/**
 * Start avatar animation loop
 */
function startAvatarAnimation() {
    function animate() {
        drawAvatar();
        animationFrameId = requestAnimationFrame(animate);
    }
    animate();
    console.log('🎬 Avatar animation started');
}

/**
 * Stop avatar animation
 */
function stopAvatarAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        console.log('⏸️ Avatar animation stopped');
    }
}

/**
 * Set avatar speaking state
 */
function setAvatarSpeaking(isSpeaking) {
    avatarState.isSpeaking = isSpeaking;
    if (isSpeaking) {
        lastSpokenMessage = ''; // Will be set by speech module
    }
}

/**
 * Update avatar mouth openness for speech animation
 */
function updateMouthOpenness(openness) {
    avatarState.mouthOpenness = Math.max(0, Math.min(1, openness));
}

/**
 * Trigger eye blink animation
 */
function triggerEyeBlink() {
    avatarState.eyeBlinkState = 1;
    setTimeout(() => {
        avatarState.eyeBlinkState = 0.5;
        setTimeout(() => {
            avatarState.eyeBlinkState = 0;
        }, 50);
    }, 50);
}

/**
 * Set avatar emotion
 */
function setAvatarEmotion(emotion) {
    avatarState.emotion = emotion;
}

// Export functions to global scope for use by other modules
window.initializeAvatar = initializeAvatar;
window.startAvatarAnimation = startAvatarAnimation;
window.stopAvatarAnimation = stopAvatarAnimation;
window.setAvatarSpeaking = setAvatarSpeaking;
window.updateMouthOpenness = updateMouthOpenness;
window.triggerEyeBlink = triggerEyeBlink;
window.setAvatarEmotion = setAvatarEmotion;
window.avatarState = avatarState;

console.log('✅ Avatar module loaded');
