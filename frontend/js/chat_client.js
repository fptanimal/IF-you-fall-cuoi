// ── OLLAMA API CONFIG ──
// ── CHATBOT API CONFIG ──
var CHAT_SYSTEM_PROMPT = `VAI TRÒ: Bạn là "Trợ lý sức khỏe AI" — người bạn đồng hành trong game "If You Fall". Bạn hiểu áp lực của người lao động Việt Nam: deadline, tăng ca, áp lực tài chính, trách nhiệm gia đình. Phong cách: ấm áp, đồng cảm, dùng ngôn ngữ gần gũi thay vì y khoa khô khan.

BẢN CHẤT CÔNG CỤ:
- Đây là công cụ mô phỏng giáo dục, KHÔNG phải chẩn đoán y khoa.
- Dữ liệu tham khảo từ WHO, AHA, CDC, Lancet, NEJM, NIH — các nguồn dịch tễ học công khai.
- KHÔNG tự nhận là bác sĩ thật. Luôn nhắc rằng kết quả chỉ mang tính tham khảo.

NGUYÊN TẮC PHẢN HỒI:
- Kiểm chứng dữ liệu: nếu người dùng cung cấp thông tin vô lý hoặc nguy hiểm, bác bỏ lịch sự và đưa cảnh báo an toàn.
- Phạm vi: chỉ trả lời các vấn đề liên quan tới sức khỏe, y tế, lối sống. Từ chối các chủ đề ngoài phạm vi.
- Giọng điệu: như một người bạn quan tâm, không lên lớp. Ví dụ: "Mình hiểu áp lực deadline rất lớn, nhưng..." thay vì "Bạn phải...".

ĐỊNH DẠNG PHẢN HỒI (BẮT BUỘC):
[Cảnh báo]: (nếu có dấu hiệu nguy hiểm)
[Phân tích]: (dựa trên dữ liệu người dùng cung cấp)
[Lời khuyên]: (hướng xử trí / lối sống — KHÔNG thay thế chẩn đoán bác sĩ)

LUÔN: không kê toa, không đưa ra chẩn đoán dứt khoát. Khi có triệu chứng nghiêm trọng (đau ngực, khó thở, liệt nửa người, co giật) → phải khuyến cáo gọi 115 ngay.
LUÔN kết thúc phản hồi bằng: "⚠ Lưu ý: Đây là thông tin tham khảo từ mô phỏng AI, không phải chẩn đoán y khoa. Nếu có triệu chứng bất thường, hãy đến bệnh viện hoặc gọi 115."`;


// Window memory: giữ chỉ N cặp (user+assistant) gần nhất để gửi lên API
var CHAT_WINDOW_PAIRS = 3;
var DEFAULT_TEMPERATURE = 0.2;
var DEFAULT_TOP_P = 0.1;

function getPatientSummaryForPrompt() {
    try {
        var parts = [];
        var hrEl = document.getElementById('ai_heart_rate');
        if (hrEl) parts.push('Nhịp tim: ' + hrEl.options[hrEl.selectedIndex].text);
        var bpEl = document.getElementById('ai_blood_pressure');
        if (bpEl) parts.push('Huyết áp: ' + bpEl.options[bpEl.selectedIndex].text);
        var gluEl = document.getElementById('ai_blood_sugar');
        if (gluEl) parts.push('Đường huyết: ' + gluEl.options[gluEl.selectedIndex].text);
        var wEl = document.getElementById('ai_weight');
        if (wEl && wEl.value) parts.push('Cân nặng: ' + wEl.value + ' kg');
        var bmiEl = document.getElementById('ai_bmi');
        if (bmiEl && bmiEl.value) parts.push('BMI: ' + bmiEl.value);
        var spo2El = document.getElementById('ai_spo2');
        if (spo2El && spo2El.value) parts.push('SpO2: ' + spo2El.value + '%');
        return parts.length ? parts.join(' · ') : 'Không có dữ liệu thiết bị/khám ban đầu.';
    } catch (e) {
        return 'Không có dữ liệu thiết bị/khám ban đầu.';
    }
}

function startNewCase() {
    chatHistory = [];
    var chatBox = document.getElementById('aiChatMessages');
    if (chatBox) {
        // Clear messages and show notice
        chatBox.innerHTML = '';
        appendChatMsg('⚪ Đã bắt đầu ca trực mới. Ngữ cảnh trước đó đã được xóa.', 'bot');
    }
}
var chatHistory = [];
var isAIChatBusy = false;

async function sendChatMessage() {
    var input = document.getElementById('aiChatInput');
    var rawText = input.value.trim();
    if (!rawText || isAIChatBusy) return;

    isAIChatBusy = true;
    appendChatMsg(rawText, 'user');
    input.value = '';
    input.disabled = true;
    var sendBtn = input.parentElement.querySelector('button');
    if (sendBtn) sendBtn.disabled = true;
    SFX.typing();

    // Show typing indicator
    var typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg typing';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    var chatBox = document.getElementById('aiChatMessages');
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add raw user message to history (for display)
    chatHistory.push({ role: 'user', content: rawText });

    // Simulate brief "thinking" delay for realism
    await new Promise(function (r) { setTimeout(r, 600 + Math.random() * 600); });

    // Remove typing indicator
    var indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();

    try {
        // Build window-limited history (last N pairs)
        var maxItems = CHAT_WINDOW_PAIRS * 2;
        var historyForSend = chatHistory.slice(-maxItems);

        // Replace the final user message with a templated input that includes patient/wearable summary
        var patientSummary = getPatientSummaryForPrompt();
        var templatedUser = `Dựa trên dữ liệu thực tế: [${patientSummary}]\nCâu hỏi của người dùng: "${rawText}"\nLưu ý: Trả lời chuyên sâu nhưng KHÔNG khẳng định đây là chẩn đoán y khoa cuối cùng.`;

        if (historyForSend.length > 0 && historyForSend[historyForSend.length - 1].role === 'user') {
            historyForSend[historyForSend.length - 1] = { role: 'user', content: templatedUser };
        } else {
            historyForSend.push({ role: 'user', content: templatedUser });
        }

        var bodyData = {
            messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }].concat(historyForSend),
            temperature: DEFAULT_TEMPERATURE,
            top_p: DEFAULT_TOP_P,
            stream: false
        };

        let apiStatus = null;
        let apiErrorMsg = null;

        // Try API endpoint (Vercel or Backend)
        var response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData),
            timeout: 8000
        });

        if (!response.ok) {
            apiStatus = response.status;
            apiErrorMsg = `API /api/chat trả về ${apiStatus} ${response.statusText}`;
            console.warn(apiErrorMsg, '- Đang thử localhost backend...');
            try {
                response = await fetch('http://localhost:8899/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyData),
                    timeout: 5000
                });
            } catch (e2) {
                console.warn('Localhost backend không khả dụng.');
                throw new Error(`Fallback Error: ${apiStatus || 'Network'} - Vercel route failed and Localhost down.`);
            }
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        var data = await response.json();
        var aiText = "";

        if (data.choices && data.choices.length > 0) {
            aiText = data.choices[0].message?.content || data.choices[0].message || '';
        } else if (data.message && data.message.content) {
            aiText = data.message.content;
        } else if (typeof data === 'string') {
            aiText = data;
        } else {
            throw new Error('Invalid response format: ' + JSON.stringify(data).substring(0, 100));
        }

        if (!aiText || aiText.trim().length === 0) {
            throw new Error('Empty response from API');
        }

        var formattedText = '<em style="color:#00e676;font-size:10px;">🟢 Online (AI)</em><br>' + formatAIResponse(aiText);
        appendChatMsg(formattedText, 'bot');
        chatHistory.push({ role: 'assistant', content: aiText });
        SFX.aibeep();

    } catch (e) {
        console.error("Chat API Error Detailed:", e);
        var fallbackResponse = getAIResponse(rawText);
        
        let techReason = "Mất kết nối API";
        if (e.message.includes('404')) techReason = "404 - Sai môi trường chạy (Cần deploy Vercel)";
        else if (e.message.includes('429')) techReason = "429 - Hết quota AI";
        else if (e.message.includes('401') || e.message.includes('403')) techReason = "Sai API Key";
        else if (e.message.includes('500')) techReason = "500 - Lỗi Server (Kiểm tra Model/Backend)";
        
        var offlineHint = `<em style="color:#ff8a65;font-size:10px;">🔴 Offline — Trả lời từ dữ liệu nội bộ (Lý do: ${techReason})</em><br>`;
        appendChatMsg(offlineHint + formatAIResponse(fallbackResponse), 'bot');
        chatHistory.push({ role: 'assistant', content: fallbackResponse });
        SFX.warn();
    }

    input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    input.focus();
    isAIChatBusy = false;
}

function formatAIResponse(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.+?)\*/g, '<i>$1</i>')
        .replace(/\n/g, '<br>')
        .replace(/^- /gm, '&nbsp;&nbsp;• ')
        .replace(/^(\d+)\. /gm, '&nbsp;&nbsp;$1. ');
}

function appendChatMsg(text, sender) {
    var chatBox = document.getElementById('aiChatMessages');
    if (!chatBox) return;
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg ' + sender;
    var label = sender === 'bot' ? '<b>BÁC SĨ AI</b> <span style="font-size:10px;color:#ff8888;font-weight:normal;">(mô phỏng • chỉ tham khảo)</span><br>' : '';
    msgDiv.innerHTML = label + '<div class="msg-content">' + text.replace(/\\n/g, '<br>') + '</div>';
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

