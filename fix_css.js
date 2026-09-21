const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// The merged CSS block to insert
const newCSS = `
/* ── CHAT MESSAGES MERGED BLOCK ── */
.chat-msg {
    display: block; /* Fixed: Removed display: flex to prevent text breaking into columns */
    max-width: 88%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 13px;
    line-height: 1.65;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    animation: msg-in 0.3s ease-out;
}

@keyframes msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

.chat-msg.bot {
    align-self: flex-start;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(20, 60, 140, 0.08));
    border: 1px solid rgba(41, 121, 255, 0.15);
    color: #d0d8e8;
    border-bottom-left-radius: 4px;
}

.chat-msg.bot b {
    color: #5a9cff;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 4px;
}

.chat-msg.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #2979ff, #1565c0);
    color: #fff;
    border-bottom-right-radius: 4px;
    box-shadow: 0 3px 12px rgba(41, 121, 255, 0.25);
}

.chat-msg .msg-content {
    /* If any specific styles are needed for the text wrapper */
    display: block;
}

.chat-msg.typing {
    align-self: flex-start;
    background: rgba(41, 121, 255, 0.06);
    border: 1px solid rgba(41, 121, 255, 0.1);
    padding: 14px 20px;
    border-bottom-left-radius: 4px;
}
`;

// Define blocks to remove based on start and end strings
const blocksToRemove = [
    { // Block 1
        start: '.chat-msg {',
        end: 'box-shadow: 0 4px 20px rgba(41, 121, 255, 0.3);\r\n}\r\n'
    },
    { // Block 2
        start: '.chat-msg {',
        end: 'border-top-right-radius: 2px;\r\n}\r\n'
    },
    { // Block 3
        start: '.chat-msg {',
        end: 'box-shadow: 0 3px 12px rgba(41, 121, 255, 0.25);\r\n}\r\n'
    }
];

// Fallback logic to remove by parsing if exact string fails (due to line endings)
// But to be safe, I'll use regex to remove them.

css = css.replace(/\.chat-msg\s*\{[\s\S]*?box-shadow:\s*0\s*4px\s*20px\s*rgba\(41,\s*121,\s*255,\s*0\.3\);\s*\}/, '');
css = css.replace(/\.chat-msg\s*\{[\s\S]*?border-top-right-radius:\s*2px;\s*\}/, '');
css = css.replace(/\.chat-msg\s*\{[\s\S]*?box-shadow:\s*0\s*3px\s*12px\s*rgba\(41,\s*121,\s*255,\s*0\.25\);\s*\}/, '');

// Also remove .chat-msg.bot b from block 3 if it wasn't captured
css = css.replace(/\.chat-msg\.bot b\s*\{[\s\S]*?text-transform:\s*uppercase;\s*\}/g, '');
css = css.replace(/@keyframes msg-in\s*\{[\s\S]*?\}\s*\}/g, '');


css += newCSS;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed CSS blocks');
