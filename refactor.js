const fs = require('fs');
const path = require('path');

const gameJsPath = path.join(__dirname, 'frontend', 'js', 'game.js');
let gameJsContent = fs.readFileSync(gameJsPath, 'utf8');

// The markers for AI Health
const healthStartIdx = gameJsContent.indexOf('// ── AI HEALTH ────────────────────────────────────────');
const healthEndMarker = '// ── MENU BG ──────────────────────────────────────────';
const healthEndIdx = gameJsContent.indexOf(healthEndMarker);

if (healthStartIdx > -1 && healthEndIdx > -1) {
    const healthContent = gameJsContent.substring(healthStartIdx, healthEndIdx);
    fs.writeFileSync(path.join(__dirname, 'frontend', 'js', 'health_calc.js'), healthContent, 'utf8');
    gameJsContent = gameJsContent.replace(healthContent, '\n// ── AI HEALTH MOVED TO health_calc.js ──\n');
}

// The markers for Chatbot
const chatStartMarker = '// ── OLLAMA API CONFIG ──';
const chatStartIdx = gameJsContent.indexOf(chatStartMarker);
const chatEndMarker = 'function calcBMI() {';
const chatEndIdx = gameJsContent.indexOf(chatEndMarker);

if (chatStartIdx > -1 && chatEndIdx > -1) {
    const chatContent = gameJsContent.substring(chatStartIdx, chatEndIdx);
    fs.writeFileSync(path.join(__dirname, 'frontend', 'js', 'chat_client.js'), chatContent, 'utf8');
    gameJsContent = gameJsContent.replace(chatContent, '\n// ── CHATBOT MOVED TO chat_client.js ──\n');
}

fs.writeFileSync(gameJsPath, gameJsContent, 'utf8');
console.log('Refactoring complete.');
