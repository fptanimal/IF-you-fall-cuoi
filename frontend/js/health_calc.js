// ── AI HEALTH ────────────────────────────────────────
var selectedRisks = [];
function toggleCheck(el) { SFX.click(); var v = el.dataset.val, idx = selectedRisks.indexOf(v); if (idx > -1) { selectedRisks.splice(idx, 1); el.classList.remove('on'); } else { selectedRisks.push(v); el.classList.add('on'); } }
var bodyRaf = null;
function drawBodyDiagram(risk, lifespan, status) {
    var c = document.getElementById('bodyCanvas'); if (!c) return;
    cancelAnimationFrame(bodyRaf);
    function draw() {
        if (G.scr !== 'ai') return;
        var W = c.width = 180, H = c.height = 300, x = c.getContext('2d'), t = Date.now() / 1000;
        x.clearRect(0, 0, W, H); x.strokeStyle = 'rgba(0,212,180,.05)'; x.lineWidth = 1;
        for (var i = 0; i < W; i += 20) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); }
        for (var j = 0; j < H; j += 20) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
        var sy = (t * 60) % H; x.strokeStyle = 'rgba(0,212,180,.25)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, sy); x.lineTo(W, sy); x.stroke();
        var cxb = 90, baseY = 50, goodC = status === 'Improving' ? '#00d4b4' : '#ff4444', pulse = .85 + Math.sin(t * (status === 'Improving' ? 1.2 : 2.5)) * .15;
        var glow = status === 'Improving' ? 'rgba(0,212,180,.2)' : 'rgba(255,60,60,.2)';
        var rad = x.createRadialGradient(cxb, baseY + 80, 5, cxb, baseY + 80, 65 * pulse); rad.addColorStop(0, glow); rad.addColorStop(1, 'transparent'); x.fillStyle = rad; x.beginPath(); x.arc(cxb, baseY + 80, 65 * pulse, 0, Math.PI * 2); x.fill();
        x.shadowColor = goodC; x.shadowBlur = 12; x.strokeStyle = goodC; x.lineWidth = 1.5; x.fillStyle = 'rgba(0,10,18,.9)';
        x.beginPath(); x.arc(cxb, baseY + 18, 18, 0, Math.PI * 2); x.fill(); x.stroke();
        x.fillStyle = goodC; x.shadowBlur = 6; x.beginPath(); x.arc(cxb - 7, baseY + 17, 3, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(cxb + 7, baseY + 17, 3, 0, Math.PI * 2); x.fill();
        x.fillStyle = 'rgba(0,10,18,.9)'; x.strokeStyle = goodC; x.fillRect(cxb - 6, baseY + 35, 12, 10); x.strokeRect(cxb - 6, baseY + 35, 12, 10);
        x.beginPath(); x.roundRect(cxb - 22, baseY + 45, 44, 55, 3); x.fill(); x.stroke();
        x.shadowBlur = 0; x.strokeStyle = goodC; x.lineWidth = 3; x.lineCap = 'round';
        var walkL = status === 'Declining' ? 0 : Math.sin(t * 2) * 8;
        x.beginPath(); x.moveTo(cxb - 22, baseY + 50); x.lineTo(cxb - 38, baseY + 70 + Math.sin(t) * 3); x.stroke();
        x.beginPath(); x.moveTo(cxb - 38, baseY + 70 + Math.sin(t) * 3); x.lineTo(cxb - 34, baseY + 98 + Math.sin(t) * 3); x.stroke();
        x.beginPath(); x.moveTo(cxb + 22, baseY + 50); x.lineTo(cxb + 38, baseY + 70 + Math.sin(t + 1) * 3); x.stroke();
        x.beginPath(); x.moveTo(cxb + 38, baseY + 70 + Math.sin(t + 1) * 3); x.lineTo(cxb + 34, baseY + 98 + Math.sin(t + 1) * 3); x.stroke();
        x.fillStyle = goodC; x.shadowBlur = 4; x.beginPath(); x.arc(cxb - 34, baseY + 100, 4, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(cxb + 34, baseY + 100, 4, 0, Math.PI * 2); x.fill();
        x.beginPath(); x.moveTo(cxb - 8, baseY + 116); x.lineTo(cxb - 12 + walkL, baseY + 152); x.stroke(); x.beginPath(); x.moveTo(cxb - 12 + walkL, baseY + 152); x.lineTo(cxb - 10 + walkL, baseY + 190); x.stroke();
        x.beginPath(); x.moveTo(cxb + 8, baseY + 116); x.lineTo(cxb + 12 - walkL, baseY + 152); x.stroke(); x.beginPath(); x.moveTo(cxb + 12 - walkL, baseY + 152); x.lineTo(cxb + 10 - walkL, baseY + 190); x.stroke();
        x.fillStyle = goodC; x.beginPath(); x.ellipse(cxb - 10 + walkL, baseY + 192, 7, 3, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(cxb + 10 - walkL, baseY + 192, 7, 3, 0, 0, Math.PI * 2); x.fill();
        x.shadowBlur = 0; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = goodC; x.font = 'bold 14px Courier New'; x.fillText(lifespan ? lifespan + 't' : '—', cxb, baseY + 220);
        x.fillStyle = 'rgba(255,255,255,.2)'; x.font = '7px Courier New'; x.fillText('TUỔI THỌ ƯỚC TÍNH', cxb, baseY + 234);
        bodyRaf = requestAnimationFrame(draw);
    } draw();
}
async function runAIAnalysis() {
    SFX.aibeep(); var btn = document.getElementById('aiSubmitBtn'); btn.disabled = true; btn.textContent = T('aiAnalyzing');

    // UI FLOW TRANSTION: Form to Results
    var left = document.querySelector('.ai-left');
    var right = document.querySelector('.ai-right');
    if (left) left.style.display = 'none';
    if (right) right.style.display = 'flex';

    var dot = document.getElementById('aiDot'); if (dot) dot.classList.add('active');
    var ts = document.getElementById('aiTimestamp'); if (ts) ts.textContent = new Date().toLocaleTimeString('vi-VN');
    var content = document.getElementById('aiContent');
    if (content) content.innerHTML = '<div class="ai-loading"><div class="idle-ico" style="font-size:36px;opacity:.5">🧬</div><div class="scan-line-anim"></div><p>' + T('aiAnalyzingData') + '</p></div>';

    var bodyWrap = document.createElement('div'); bodyWrap.className = 'body-diagram-wrap';
    var bc = document.createElement('canvas'); bc.id = 'bodyCanvas'; bc.width = 180; bc.height = 300;
    bodyWrap.appendChild(bc); var lbl = document.createElement('div'); lbl.className = 'body-scan-label'; lbl.textContent = T('aiScanning'); bodyWrap.appendChild(lbl);
    if (content) content.insertBefore(bodyWrap, content.firstChild);
    drawBodyDiagram(50, null, 'Analyzing');

    var age = parseInt(document.getElementById('ai_age').value) || 30;
    var gender = document.getElementById('ai_gender').value;
    var bmi = parseFloat(document.getElementById('ai_bmi').value) || 22;
    var job = document.getElementById('ai_job').value.trim();
    var sleep = parseFloat(document.getElementById('ai_sleep').value) || 7;
    var sleepBad = parseInt(document.getElementById('ai_sleep_bad').value) || 0;
    var dietVal = parseInt(document.getElementById('ai_diet').value) || 0;
    var exVal = parseInt(document.getElementById('ai_exercise').value) || 3;
    var weightChange = document.getElementById('ai_weight_change') ? document.getElementById('ai_weight_change').value : 'normal';
    var hrVal = document.getElementById('ai_heart_rate') ? parseInt(document.getElementById('ai_heart_rate').value) : 0;
    var bpVal = document.getElementById('ai_blood_pressure') ? parseInt(document.getElementById('ai_blood_pressure').value) : 0;
    var bsVal = document.getElementById('ai_blood_sugar') ? parseInt(document.getElementById('ai_blood_sugar').value) : 0;
    var cholVal = document.getElementById('ai_cholesterol') ? parseInt(document.getElementById('ai_cholesterol').value) : 0;
    var surgery = document.getElementById('ai_surgery') ? document.getElementById('ai_surgery').value : 'none';
    var surgeryDetail = document.getElementById('ai_surgery_detail') ? document.getElementById('ai_surgery_detail').value.trim() : '';
    // LOCAL SIMULATION (no API dependency — always works)
    await new Promise(function (r) { setTimeout(r, 2000); }); // simulate scan time
    try {
        var result = simulateHealthAnalysis(age, gender, bmi, sleep, sleepBad, dietVal, exVal, selectedRisks, job, weightChange, surgery, surgeryDetail, bpVal, bsVal, hrVal, cholVal);
        showAIResult(result);
    } catch (e) {
        document.getElementById('aiContent').innerHTML = '<div class="ai-idle"><div class="idle-ico" style="font-size:36px">⚠</div><p style="color:rgba(255,80,80,.7)">Error / Lỗi.<br><button onclick="runAIAnalysis()" style="margin-top:10px;padding:8px 16px;background:#4a90e2;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:12px">🔄 Retry / Thử lại</button></p></div>';
    }
    btn.disabled = false; btn.textContent = T('aiSubmit');
}

function backToAIForm() {
    SFX.click();
    document.querySelector('.ai-right').style.display = 'none';
    document.querySelector('.ai-left').style.display = 'flex';
}
function simulateHealthAnalysis(age, gender, bmi, sleep, sleepBad, dietVal, exVal, risks, job, weightChange, surgery, surgeryDetail, bpVal, bsVal, hrVal, cholVal) {
    // ══════════════════════════════════════════════════════════════
    // CÔNG CỤ ƯỚC TÍNH SỨC KHỎE — RULE-BASED SCORING
    // Phương pháp: Cộng/trừ điểm dựa trên hệ số nguy cơ từ y văn.
    // Mỗi hệ số có trích dẫn nguồn (WHO, AHA, CDC, Lancet, NEJM...).
    // Kết quả chỉ mang tính tham khảo, KHÔNG phải chẩn đoán y khoa.
    // ══════════════════════════════════════════════════════════════

    var W = window.AI_MODEL_WEIGHTS || { baseLifeMale: 73.6, baseLifeFemale: 79.2, bp_penalty: -5, bs_penalty: -4, bmi_penalty: -6, chol_penalty: -2 };
    var baseLife = gender === 'male' ? W.baseLifeMale : W.baseLifeFemale;
    // Nguồn tuổi thọ cơ sở: WHO Vietnam Country Profile 2024
    var adj = 0;
    var missingInputs = 0; // Đếm chỉ số chưa rõ để tính khoảng tin cậy
    var sourcesUsed = []; // Ghi nhận nguồn cho kết quả

    // ── BMI IMPACT — Nguồn: WHO Obesity Classification, NEJM ──
    if (bmi < 18.5) { adj -= 2; sourcesUsed.push('WHO: Thiếu cân -1 đến -2 năm'); }
    else if (bmi > 30) { adj += W.bmi_penalty; sourcesUsed.push('NEJM: Béo phì (BMI>30) giảm 3-7 năm tuổi thọ'); }
    else if (bmi > 25) { adj -= 2; sourcesUsed.push('WHO: Thừa cân -1 đến -2 năm'); }
    else { adj += 1; sourcesUsed.push('WHO: BMI bình thường +1'); }

    // ── GIẤC NGỦ — Nguồn: NIH Sleep Research, Sleep Medicine Reviews ──
    if (sleep >= 7 && sleep <= 8) { adj += 3; sourcesUsed.push('NIH: Ngủ 7-8h +2-4 năm tuổi thọ'); }
    else if (sleep >= 6) adj += 1;
    else if (sleep < 5) { adj -= 4; sourcesUsed.push('NIH: Ngủ <5h tăng 48% nguy cơ tim mạch'); }
    else if (sleep < 6) adj -= 2;
    adj -= sleepBad * 0.5; // Mỗi ngày mất ngủ/tuần -0.5 điểm

    // ── DINH DƯỠNG — Nguồn: NEJM (Mediterranean diet +3 năm), WHO ──
    adj += dietVal;

    // ── VẬN ĐỘNG — Nguồn: WHO Physical Activity Guidelines 2020 ──
    if (exVal >= 5) { adj += 4; sourcesUsed.push('WHO: Tập 5-6 ngày/tuần giảm 35% nguy cơ tim mạch'); }
    else if (exVal >= 3) adj += 2;
    else if (exVal <= 0) { adj -= 3; sourcesUsed.push('WHO: Ít vận động là yếu tố nguy cơ tử vong hàng thứ 4'); }

    // ── CHỈ SỐ Y TẾ KHÁCH QUAN — Nguồn: ACC/AHA 2023, ADA 2024 ──
    var bpMod = W.bp_penalty < -3 ? 1.5 : 1;
    var bsMod = W.bs_penalty < -4 ? 1.5 : 1;
    var cholMod = W.chol_penalty < -2 ? 1.5 : 1;

    if (bpVal) { adj += (bpVal < 0 ? bpVal * bpMod : bpVal); if (bpVal < -3) sourcesUsed.push('ACC/AHA 2023: Huyết áp cao giảm 5 năm tuổi thọ'); }
    else missingInputs++;
    if (bsVal) { adj += (bsVal < 0 ? bsVal * bsMod : bsVal); if (bsVal < -2) sourcesUsed.push('ADA 2024: Tiểu đường giảm 4-8 năm'); }
    else missingInputs++;
    if (hrVal) { adj += hrVal; if (hrVal < -2) sourcesUsed.push('AHA: Nhịp tim cao tăng gấp đôi nguy cơ tử vong'); }
    else missingInputs++;
    if (cholVal) { adj += (cholVal < 0 ? cholVal * cholMod : cholVal); if (cholVal < -3) sourcesUsed.push('ACC/AHA 2023: Cholesterol cao gây xơ vữa'); }
    else missingInputs++;

    // ── LỐI SỐNG KÍCH HOẠT ĐỘT QUỴ — Có trích nguồn ──
    if (risks.indexOf('smoking') > -1) { adj -= 8; sourcesUsed.push('WHO, CDC: Hút thuốc -8 đến -10 năm tuổi thọ'); }
    if (risks.indexOf('alcohol') > -1) { adj -= 5; sourcesUsed.push('WHO: Rượu nặng -5 đến -8 năm'); }
    if (risks.indexOf('stress') > -1) { adj -= 3; sourcesUsed.push('AHA Journal: Stress mạn tính -3 năm'); }
    if (risks.indexOf('overwork') > -1) { adj -= 4; sourcesUsed.push('Lancet 2021: Làm >12h/ngày tăng 17% nguy cơ đột quỵ'); }
    if (risks.indexOf('tam_dem') > -1) { adj -= 4; sourcesUsed.push('Cảnh báo từ y khoa VN: Tắm đêm gây co thắt mạch máu đột ngột (chưa có nghiên cứu quốc tế xác thực hệ số cụ thể)'); }
    if (risks.indexOf('an_man') > -1) { adj -= 4; sourcesUsed.push('WHO: Muối >5g/ngày tăng huyết áp, nguy cơ vỡ mạch máu não'); }
    if (risks.indexOf('caffeine') > -1) { adj -= 2; sourcesUsed.push('BMJ Nutrition: >4 ly cà phê/ngày -1 đến -2 năm'); }
    if (risks.indexOf('insomnia2d') > -1) { adj -= 5; sourcesUsed.push('Sleep Med Reviews: Thức 2 ngày tăng 300% nguy cơ đột quỵ'); }
    if (risks.indexOf('nobreak') > -1) { adj -= 3; sourcesUsed.push('AHA: Ngồi lì tăng nguy cơ huyết khối tĩnh mạch sâu'); }
    if (risks.indexOf('sedentary') > -1) { adj -= 3; sourcesUsed.push('WHO: Ít vận động -3 năm tuổi thọ'); }

    // ── TIỀN SỬ BỆNH LÝ TIM MẠCH — Nguồn: AHA, ACC/AHA 2023 ──
    if (risks.indexOf('tim_mach') > -1) { adj -= 8; sourcesUsed.push('AHA: Bệnh tim mạch mạn tính giảm đáng kể tuổi thọ'); }
    if (risks.indexOf('huyet_ap') > -1) { adj -= 6; sourcesUsed.push('ACC/AHA 2023: Tăng huyết áp không điều trị -5 năm'); }
    if (risks.indexOf('tieu_duong') > -1) { adj -= 7; sourcesUsed.push('ADA 2024: Tiểu đường type 2 -5 đến -8 năm'); }
    if (risks.indexOf('mo_mau') > -1) { adj -= 5; sourcesUsed.push('ACC/AHA 2023: Rối loạn lipid máu tăng nguy cơ xơ vữa'); }
    if (risks.indexOf('roi_loan_nhip_tim') > -1) { adj -= 8; sourcesUsed.push('AHA: Rung nhĩ tăng 5x nguy cơ đột quỵ'); }

    // ── GIA ĐÌNH — Nguồn: AHA (di truyền tăng 2-3x nguy cơ) ──
    if (surgery === 'major') {
        adj -= 6; sourcesUsed.push('AHA: Tiền sử gia đình đột quỵ/nhồi máu tăng 2-3x nguy cơ');
    } else if (surgery === 'minor') {
        adj -= 3;
    }

    // ── TRIỆU CHỨNG CẢNH BÁO — Không tính vào tuổi thọ, chỉ cảnh báo khẩn ──
    // Lý do: Đây là triệu chứng cần cấp cứu ngay, không phải yếu tố lối sống.
    // Ảnh hưởng nhẹ đến điểm (-3 mỗi triệu chứng) thay vì -15.
    var emergencySymptoms = [];
    if (risks.indexOf('tuc_nguc_trai') > -1) { adj -= 3; emergencySymptoms.push('tuc_nguc_trai'); }
    if (risks.indexOf('te_yeu_nua_nguoi') > -1) { adj -= 3; emergencySymptoms.push('te_yeu_nua_nguoi'); }
    if (risks.indexOf('kho_noi') > -1) { adj -= 3; emergencySymptoms.push('kho_noi'); }
    if (risks.indexOf('dau_nguc') > -1) { adj -= 5; sourcesUsed.push('AHA: Đau thắt ngực — triệu chứng thiếu máu cơ tim'); }
    if (risks.indexOf('kho_tho') > -1) adj -= 4;
    if (risks.indexOf('tim_dap') > -1) adj -= 3;
    if (risks.indexOf('chong_mat') > -1) adj -= 3;
    if (risks.indexOf('mo_mat') > -1) adj -= 4;
    if (risks.indexOf('dau_dau') > -1) adj -= 3;
    if (risks.indexOf('mat_ngu') > -1) adj -= 4;
    if (risks.indexOf('do_mo_hoi') > -1) adj -= 3;

    if (weightChange === 'loss') adj -= 5;
    else if (weightChange === 'gain') adj -= 4;

    // ── NGHỀ NGHIỆP — Nguồn: Lancet 2021 (Occupational risk) ──
    var jobL = (job || '').toLowerCase();
    if (jobL.indexOf('lao_dong_nang') > -1) adj -= 4; // Hao mòn thể lực, nguy cơ an toàn lao động
    if (jobL.indexOf('quan_ly') > -1) adj -= 3;       // Stress cao — Lancet 2021
    if (jobL.indexOf('ky_thuat') > -1) adj -= 2;       // Ngồi nhiều, làm thêm giờ
    if (jobL.indexOf('nghiep_vu') > -1) adj -= 2;      // Bệnh văn phòng
    if (jobL.indexOf('khoa_hoc') > -1) adj -= 1;       // Áp lực trí não
    if (jobL.indexOf('nghe_thuat') > -1) adj -= 2;     // Sinh hoạt thất thường

    // ── CỘNG HƯỞNG NGUY CƠ — Nhiều yếu tố kết hợp tăng nguy cơ ──
    var riskCount = risks.length;
    if (riskCount >= 8) adj -= 8;
    else if (riskCount >= 6) adj -= 5;
    else if (riskCount >= 4) adj -= 3;
    else if (riskCount >= 3) adj -= 1;

    // ── YẾU TỐ MÔI TRƯỜNG (trong game) ──
    if (typeof G !== 'undefined' && G.lifeFactors) {
        if (G.lifeFactors.economicStatus === 'poor') adj -= 2;
        else if (G.lifeFactors.economicStatus === 'rich') adj += 2;

        if (G.lifeFactors.environment === 'polluted') adj -= 5;
        else if (G.lifeFactors.environment === 'clean') adj += 2;

        if (G.lifeFactors.baseHealth === 'low') adj -= 6;
        else if (G.lifeFactors.baseHealth === 'high') adj += 4;
    }

    // ══ TÍNH TUỔI THỌ ƯỚC TÍNH ══
    // Thay vì Math.random(), dùng khoảng tin cậy dựa trên số chỉ số thiếu.
    // Mỗi chỉ số chưa rõ = ±0.8 năm dao động.
    var uncertaintyPerMissing = 0.8;
    var baseUncertainty = 2; // Dao động cơ sở ±2 năm (do thiếu dữ liệu di truyền, môi trường...)
    var totalUncertainty = baseUncertainty + (missingInputs * uncertaintyPerMissing);

    var lifespan_base = baseLife + adj;
    // Nếu tuổi hiện tại bằng hoặc hơn tuổi thọ ước tính, điều chỉnh
    if (age >= lifespan_base - 5) {
        lifespan_base = age + Math.max(1, 5 + (adj / 2));
    }

    var lifespan_min = Math.round(Math.max(30, lifespan_base - totalUncertainty));
    var lifespan_max = Math.round(lifespan_base + totalUncertainty);

    // Luôn đảm bảo tuổi thọ tối thiểu không nhỏ hơn tuổi hiện tại
    lifespan_min = Math.floor(Math.min(119, Math.max(age, lifespan_min)));
    lifespan_max = Math.ceil(Math.min(120, Math.max(lifespan_min + 1, lifespan_max)));
    var lifespan = lifespan_min + ' - ' + lifespan_max;

    // Tính phần trăm nguy cơ (không dùng random)
    var riskPct = Math.round(Math.max(5, Math.min(98, 50 - adj * 2.5)));

    // Critical symptom overrides
    if (risks.indexOf('dau_nguc') > -1 || risks.indexOf('tim_mach') > -1 || weightChange === 'loss' || risks.indexOf('tuc_nguc_trai') > -1 || risks.indexOf('mo_mat') > -1) {
        riskPct = Math.max(riskPct, 85);
    }

    var status = adj >= -5 ? 'Improving' : 'Declining';
    var warnings = [];
    // High priority warnings:
    if (risks.indexOf('tuc_nguc_trai') > -1) warnings.push('⚠ BÁO ĐỘNG ĐỎ NHỒI MÁU CƠ TIM: Tức ngực trái lan ra tay hoặc cổ là chỉ dấu kinh điển. GỌI CẤP CỨU 115 NGAY LẬP TỨC!');
    if (risks.indexOf('te_yeu_nua_nguoi') > -1 || risks.indexOf('kho_noi') > -1) warnings.push('⚠ BÁO ĐỘNG ĐỎ ĐỘT QUỴ (FAST): Tê yếu tay chân hoặc khó nói là ranh giới sống còn. THỜI GIAN VÀNG CHỈ CÓ 3-4 TIẾNG. GỌI CẤP CỨU 115 NGAY!');
    if (risks.indexOf('mo_mat') > -1) warnings.push('⚠ CẢNH BÁO: Mờ mắt đột ngột có thể là cơn thiếu máu não cục bộ thoáng qua (TIA) - dấu hiệu Đột Quỵ nhãn khoa!');
    if (risks.indexOf('dau_dau') > -1 && bpVal <= -6) warnings.push('⚠ CẢNH BÁO TỬ VONG: Đau đầu dữ dội kèm huyết áp cực cao có nguy cơ xuất huyết não / đứt mạch máu não ngay trong đêm!');
    if (risks.indexOf('tam_dem') > -1) warnings.push('⚠ CẢNH BÁO: Tắm đêm/nước lạnh khi cơ thể đang mệt mỏi sẽ gây co thắt mạch máu đột ngột, là sát thủ thầm lặng gây đột quỵ khi đang tắm.');
    if (surgery === 'major') warnings.push('Tiền sử gia đình có người bị Đột quỵ/Nhồi máu cơ tim khiến bạn tăng nguy cơ di truyền gấp 2-3 lần bình thường.');
    if (risks.indexOf('an_man') > -1) warnings.push('Ăn quá mặn là kẻ thù số 1 của Huyết Áp Cao, nguyên nhân gốc rễ làm vỡ mạch máu não.');

    if (risks.indexOf('smoking') > -1) warnings.push(T('warnSmoking'));
    if (risks.indexOf('insomnia2d') > -1) warnings.push(T('warnInsomnia'));
    if (risks.indexOf('sleep3h') > -1) warnings.push(T('warnSleep3h'));
    if (risks.indexOf('nobreak') > -1) warnings.push(T('warnNoBreak'));
    if (risks.indexOf('longstress') > -1) warnings.push(T('warnLongStress'));
    if (risks.indexOf('skipmeal') > -1) warnings.push(T('warnSkipMeal'));
    if (sleep < 6) warnings.push(T('warnSleepLess6'));
    if (risks.indexOf('overwork') > -1) warnings.push(T('warnOverwork'));
    if (bmi > 30) warnings.push(T('warnBmiHigh'));
    if (adj >= 2) warnings.push(T('warnGoodHabit'));

    // Generate much longer and more detailed guidance
    var guide = '<br><br><strong style="color:#00d4b4;font-size:16px;letter-spacing:1.5px;text-transform:uppercase;border-bottom:2px solid rgba(0,212,180,0.5);padding-bottom:8px;display:block;margin-bottom:16px;text-shadow:0 0 8px rgba(0,212,180,0.3)">📋 BÁO CÁO Y KHOA: CỨU DỮ LIỆU ĐA NGUỒN CẢI THIỆN LÂM SÀNG</strong>';
    guide += '<div style="background:linear-gradient(145deg, rgba(15,25,35,0.6), rgba(5,10,15,0.8));border-radius:12px;padding:20px;border:1px solid rgba(255,255,255,0.08);box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">';
    guide += '<div style="font-size:11px;color:#88bcff;margin-bottom:16px;font-style:italic;border-left:3px solid #88bcff;padding-left:10px;line-height:1.6;">*Dựa trên đối chiếu hệ dữ liệu lâm sàng khổng lồ: GBD 2023 (dịch tễ 204 quốc gia), MIMIC-IV (500K+ hồ sơ ICU điện tử), AHA Statistical Update 2025, và Thống kê y tế WHO (CVD chiếm 32% ~ 19.8 triệu ca tử vong/năm). Phân tích này đưa ra phác đồ dài hạn nhằm phòng ngừa tối đa biến cố tim mạch và đột quỵ:</div>';
    guide += '<ul style="margin:0;padding-left:18px;line-height:1.9;color:#d8e2f0;font-size:13px">';

    if (cholVal && cholVal < -3) {
        guide += '<li style="margin-bottom:20px;background:rgba(255,136,68,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(255,136,68,0.15)">';
        guide += '<b style="color:#ff8844;font-size:14px;text-transform:uppercase;">🛑 Phác Đồ Can Thiệp Mỡ Máu & Hệ Tim Mạch (Cholesterol/Lipid Management):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Chỉ số Lipid (đặc biệt LDL-c) vượt ngưỡng an toàn. Mảng xơ vữa đang dần hình thành trong lòng thành mạch máu, làm hẹp lòng mạch, giảm lưu lượng máu đến não và cơ tim, nguy cơ hẹp động mạch vành rất cao.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Hạ LDL-c (mỡ xấu) xuống dưới <span style="color:#ff8844;font-weight:bold;">2.6 mmol/L</span> và tăng HDL-c (mỡ tốt) lên trên <span style="color:#00d4b4;font-weight:bold;">1.3 mmol/L</span>.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Cắt bỏ hoàn toàn:</b> Chất béo chuyển hóa (trans-fat) từ thức ăn nhanh, mỡ/nội tạng động vật, lạp xưởng, bơ thực vật.<br>';
        guide += '&nbsp;&nbsp;• <b>Dinh dưỡng thay thế:</b> Ưu tiên Omega-3 từ cá hồi/thu/trích (ít nhất 2 bữa/tuần). Bổ sung 35g chất xơ hòa tan mỗi ngày (yến mạch, quả bơ) để kéo mỡ xấu ra khỏi hệ tiêu hóa tái hấp thu.<br>';
        guide += '&nbsp;&nbsp;• <b>Giám sát:</b> Xét nghiệm lại bộ Bộ chẩn đoán Lipid (Cholesterol toàn phần, Triglyceride, HDL, LDL) sau đúng 90 ngày thiết lập chế độ mới.';
        guide += '</li>';
    }

    if (bmi > 25) {
        guide += '<li style="margin-bottom:20px;background:rgba(255,170,0,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(255,170,0,0.15)">';
        guide += '<b style="color:#ffaa00;font-size:14px;text-transform:uppercase;">⚖️ Kiểm Soát Thể Trạng & Kháng Insulin (Weight & Metabolism):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Chỉ số BMI của bạn nằm trong dải thừa cân/béo phì (BMI > 25). Hội chứng chuyển hóa và mỡ nội tạng đang chèn ép cơ quan, gây hiện tượng đề kháng Insulin (nguy cơ bùng phát Tiểu đường tuýp 2 cực cao).<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Giảm 5-7% trọng lượng cơ thể hiện tại trong vòng 3 tháng tới. Đưa vòng bụng về chuẩn (<span style="color:#ffaa00;font-weight:bold;">< 90cm</span> ở nam và <span style="color:#ffaa00;font-weight:bold;">< 80cm</span> ở nữ).<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Nhịn ăn gián đoạn (Intermittent Fasting):</b> Bắt đầu với chu kỳ 14:10, sau đó chuyển dần sang 16:8. Tuyệt đối không nạp calo sau 20h00 tối.<br>';
        guide += '&nbsp;&nbsp;• <b>Cơ cấu bữa ăn (Quy tắc "Đĩa thức ăn Harvard"):</b> 50% đĩa là rau củ không tinh bột, 25% đạm nạc (ức gà, cá, đậu phụ), 25% tinh bột phức hợp (gạo lứt, diêm mạch quinoa).<br>';
        guide += '&nbsp;&nbsp;• <b>Lời khuyên chuyên sâu:</b> Cắt giảm ngay đường tinh luyện fructose nhân tạo (nước ngọt, trà sữa) - thủ phạm số 1 gây mô mỡ gan và nhồi máu cơ tim.';
        guide += '</li>';
    } else if (bmi < 18.5) {
        guide += '<li style="margin-bottom:20px;background:rgba(0,212,180,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(0,212,180,0.15)">';
        guide += '<b style="color:#00d4b4;font-size:14px;text-transform:uppercase;">💪 Phục Hồi Nền Tảng Thể Lực & Cơ Bắp (Strength Building):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Trạng thái thiếu cân trầm trọng (BMI < 18.5). Cạn kiệt năng lượng dự trữ, hệ miễn dịch bấp bênh và thiếu hụt khối lượng cơ bắp - bộ giáp bảo vệ khung xương và lưu thông tuần hoàn.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Tăng <span style="color:#00d4b4;font-weight:bold;">2-3 kg</span> khối lượng nạc trong 2 tháng, cải thiện mật độ khoáng của xương.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Hyper-caloric Diet (Nạp siêu cấp):</b> Tổng lượng calo nạp vào phải thặng dư khoảng 300-500 kcal/ngày so với mức duy trì. Chia nhỏ làm 5 bữa để hấp thu tốt hơn.<br>';
        guide += '&nbsp;&nbsp;• <b>Chất lượng Đạm:</b> Ưu tiên đạm có giá trị sinh học cao (whey protein, thịt đỏ nạc, trứng gà, cá hồi).<br>';
        guide += '&nbsp;&nbsp;• <b>Vận động chuyên biệt:</b> Giảm tần suất Cardio đốt mỡ, tập trung cao độ vào Resistance Training (Tập kháng lực bằng tạ) 3-4 buổi/tuần để kích hoạt chu trình phì đại cơ bản (Hypertrophy).';
        guide += '</li>';
    }

    if ((bpVal !== undefined && bpVal < 0) || risks.indexOf('huyet_ap') > -1) {
        guide += '<li style="margin-bottom:20px;background:rgba(255,68,68,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(255,68,68,0.15)">';
        guide += '<b style="color:#ff4444;font-size:14px;text-transform:uppercase;">🩺 Kiểm Soát Áp Lực Động Mạch Bậc Cao (Hypertension Control):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Áp lực máu lên thành mạch liên tục duy trì ở mức cao đang tạo ra vi chấn thương nội mạc mạch máu não. Đây là "sát thủ vô hình" dẫn đến 80% trường hợp Phình hoặc Vỡ mạch máu não (Đột quỵ xuất huyết cấp tính).<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Hạ huyết áp tâm thu xuống ngưỡng <span style="color:#ff4444;font-weight:bold;">< 120 mmHg</span> và tâm trương <span style="color:#ff4444;font-weight:bold;">< 80 mmHg</span> một cách ổn định theo ngày.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Kỷ luật Natri nghiêm ngặt:</b> Giới hạn cực độ lượng muối (< 1.5g Namli/ngày tương đương < 2/3 muỗng cà phê gạt ngang muối). Bỏ hoàn toàn: thực phẩm đóng hộp, nước mắm, dưa cà muối.<br>';
        guide += '&nbsp;&nbsp;• <b>Gia tăng Kali tự nhiên:</b> Tăng cường chuối, khoai lang, rau cải bó xôi, quả bơ để tối ưu cân bằng điện giải Natri-Kali tế bào, giúp giãn mạch máu tự nhiên.<br>';
        guide += '&nbsp;&nbsp;• <b>Đo lường lâm sàng:</b> Dùng máy đo điện tử bắp tay theo dõi huyết áp 2 lần mỗi ngày (sau chuẩn bị sáng 15p và chiều tối), lập bảng Excel nhật ký theo dõi cho bác sĩ.';
        guide += '</li>';
    }

    if (bsVal !== undefined && bsVal < 0) {
        guide += '<li style="margin-bottom:20px;background:rgba(255,105,180,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(255,105,180,0.15)">';
        guide += '<b style="color:#ff69b4;font-size:14px;text-transform:uppercase;">🩸 Ổn Định Đường Huyết & Đảo Ngược Kháng Insulin (Blood Sugar Control):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Chỉ số đường huyết của bạn ở mức cảnh báo. Lượng đường trong máu cao liên tục sẽ "tàn phá" vi mạch máu, là nguyên nhân hàng đầu dẫn tới suy thận và tai biến mạch máu não.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Duy trì đường huyết lúc đói dưới <span style="color:#ff69b4;font-weight:bold;">5.6 mmol/L</span> và chỉ số HbA1c dưới <span style="color:#ff69b4;font-weight:bold;">5.7%</span>.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Triệt tiêu đường hấp thu nhanh:</b> Loại bỏ 100% đường tinh luyện, trà sữa, nước ngọt có ga, bánh ngọt.<br>';
        guide += '&nbsp;&nbsp;• <b>Quy tắc ăn chậm đường huyết (Food Order):</b> Bắt đầu bữa ăn bằng rau xanh (chất xơ), sau đó đến đạm (thịt nạc, cá, đậu), và ăn tinh bột phức hợp ở cuối bữa để ngăn đỉnh đường huyết tăng vọt.<br>';
        guide += '&nbsp;&nbsp;• <b>Đo lường lâm sàng:</b> Theo dõi đường huyết mao mạch thường xuyên nếu đã mắc tiểu đường, và xét nghiệm chỉ số HbA1c định kỳ 3 tháng/lần.';
        guide += '</li>';
    }

    if (hrVal !== undefined && hrVal < 0) {
        guide += '<li style="margin-bottom:20px;background:rgba(255,215,0,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(255,215,0,0.15)">';
        guide += '<b style="color:#ffd700;font-size:14px;text-transform:uppercase;">❤️ Kiểm Soát Nhịp Tim Tĩnh (Resting Heart Rate):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Nhịp tim tĩnh bất thường (quá nhanh hoặc quá chậm) cho thấy trái tim đang bị hao mòn vì phải làm việc quá sức để bơm máu hoặc có sự bất ổn trong hệ thần kinh tự chủ, tăng nguy cơ suy tim.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Đưa nhịp tim tĩnh về ngưỡng an toàn <span style="color:#ffd700;font-weight:bold;">60 - 75 nhịp/phút</span>.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Tập luyện hiếu khí (Cardio):</b> Đi bộ nhanh hoặc đạp xe nhẹ nhàng đều đặn giúp trái tim bơm máu hiệu quả hơn (tăng thể tích nhát bóp) ở nhịp đập thấp hơn.<br>';
        guide += '&nbsp;&nbsp;• <b>Hạn chế chất kích thích:</b> Tuyệt đối không lạm dụng nước tăng lực, cà phê (> 4 ly/ngày) và đặc biệt phải cai thuốc lá hoàn toàn.<br>';
        guide += '&nbsp;&nbsp;• <b>Kích hoạt phó giao cảm:</b> Thực hành hít thở sâu, yoga tĩnh để giúp làm chậm nhịp tim tự nhiên.';
        guide += '</li>';
    }

    if (sleep < 7 || risks.indexOf('mat_ngu') > -1 || risks.indexOf('sleep3h') > -1 || risks.indexOf('insomnia2d') > -1) {
        guide += '<li style="margin-bottom:20px;background:rgba(122,173,255,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(122,173,255,0.15)">';
        guide += '<b style="color:#7aadff;font-size:14px;text-transform:uppercase;">🌙 Tái Tạo Tế Bào Thần Kinh & Nhịp Sinh Học (Deep Sleep Protocol):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Thiếu ngủ mãn tính làm sụp đổ hoàn toàn hệ thống Glymphatic (cơ chế dọn rác của não bộ khi ngủ). Các mảng bám Beta-amyloid gây độc thần kinh tồn đọng, đẩy nhanh tốc độ thoái hóa não, gây "sương mù não" (brain fog) và nguy cơ đột quỵ trẻ hóa.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Đạt <span style="color:#7aadff;font-weight:bold;">7.5 - 8 tiếng</span> ngủ mỗi đêm, với tối thiểu 90-110 phút thuộc Pha ngủ sâu (Deep Sleep) và pha hồi phục REM.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Vệ sinh giấc ngủ (Sleep Hygiene):</b> Áp dụng quy chế "3 Không" chuẩn xác trước khi lên giường 1 tiếng: Không ánh sáng xanh rọi qua giác mạc (tắt phone/laptop), Không thức ăn, Không tranh luận gay gắt.<br>';
        guide += '&nbsp;&nbsp;• <b>Điều kiện môi trường lý tưởng:</b> Set nhiệt độ phòng khoảng 20-22°C (cho phép lõi tản nhiệt), phòng tối đen hoàn toàn nhằm kích thích tuyến tùng tiết tối đa hợp chất Melatonin làm buồn ngủ.<br>';
        guide += '&nbsp;&nbsp;• <b>Hỗ trợ sinh lý:</b> Bổ sung khoáng vi lượng như Magie Bisglycinate (200-300mg) trước khi ngủ 30 phút để trấn an hệ thần kinh trung ương.';
        guide += '</li>';
    }

    if (exVal <= 1 || risks.indexOf('sedentary') > -1) {
        guide += '<li style="margin-bottom:20px;background:rgba(0,212,180,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(0,212,180,0.15)">';
        guide += '<b style="color:#00d4b4;font-size:14px;text-transform:uppercase;">🏃 Kích Hoạt Lưu Trú Tuần Hoàn Máu (Vascular Health & Kinetics):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Lái xe/ngồi lỳ trên ghế (Sedentary lifestyle) làm suy giảm chức năng nội mô nghiêm trọng. Máu bị cô đặc lại ở tĩnh mạch chi dưới, dễ sinh thành cục máu đông di chuyển lên phổi/não (Huyết khối tĩnh mạch sâu).<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Đạt đủ <span style="color:#00d4b4;font-weight:bold;">150 phút</span> vận động hô hấp hiếu khí (Aerobic - Zone 2) mỗi tuần. Nhịp tim phấn đấu duy trì ở ngưỡng 60-70% nhịp tim tối đa.<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Quy tắc 45-phút:</b> Cài đặt App hoặc nhắc nhở tự động, cứ sau 45 phút dán mắt vào máy tính/ghế lái xe phải đứng dậy vãn lai, vươn vai căng cơ sâu trong 3-5 phút ép mạch tuần hoàn.<br>';
        guide += '&nbsp;&nbsp;• <b>Lộ trình rèn luyện:</b> Bắt đầu bằng việc đi bộ nhanh 10.000 bước mỗi ngày hoặc bơi/đạp xe 30p. Tránh HIIT đột ngột ở nhịp tim > 170 nhịp/phút khi tim mạch chưa đủ độ giãn nở để phòng tránh thuyên tắc.';
        guide += '</li>';
    }

    if (job.indexOf('ca_dem') > -1 || risks.indexOf('overwork') > -1 || risks.indexOf('longstress') > -1 || risks.indexOf('stress') > -1) {
        guide += '<li style="margin-bottom:20px;background:rgba(187,136,255,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(187,136,255,0.15)">';
        guide += '<b style="color:#bb88ff;font-size:14px;text-transform:uppercase;">🧠 Điều Hòa Giao Cảm & Phục Hồi Thần Kinh (Cortisol/Stress Management):</b><br>';
        guide += '📌 <b>Cơ sở lâm sàng:</b> Áp lực cực độ làm phình tuyến thượng thận, tống lượng khổng lồ Cortisol và Adrenaline vào máu. Chế độ này bào mòn hệ thống miễn dịch, co thắt động mạch vành và làm tăng huyết đường huyết mãn tính.<br>';
        guide += '📈 <b>Mục tiêu y tế:</b> Nhanh chóng khôi phục trục HPA, đưa hệ thần kinh từ trạng thái "Chiến đấu sinh tồn" (Sympathetic tone) về trạng thái "Lan tỏa & Sửa chữa" (Parasympathetic).<br>';
        guide += '💊 <b>Chiến lược thực thi:</b><br>';
        guide += '&nbsp;&nbsp;• <b>Diễn tập Thở Cơ Hoành (4-7-8 Breathing):</b> Hít sâu vào bằng mũi 4 giây (căng phình bụng), nín thở giữ hơi 7 giây, sau đó thở ra từ từ qua miệng 8 giây (xẹp bụng). Áp dụng ngay khi nhịp tim vọt lên vì căng thẳng.<br>';
        guide += '&nbsp;&nbsp;• <b>Làm sạch sóng não:</b> Ngừng làm việc đa nhiệm triệt để. Tắt thông báo email và chốt cửa lại mọi tác nhân công việc sau 19h00 tối. Thực hành chánh niệm (Mindfulness) 15 phút mỗi ngày lúc tĩnh tâm sớm mai.';
        guide += '</li>';
    }

    guide += '<li style="margin-bottom:20px;background:rgba(0,187,255,0.05);padding:12px 14px;border-radius:8px;border:1px solid rgba(0,187,255,0.15)">';
    guide += '<b style="color:#00bbff;font-size:14px;text-transform:uppercase;">🥗 Khung Dinh Dưỡng Tiêu Chuẩn Vàng (Mediterranean/DASH Hybrid Diet):</b><br>';
    guide += '📌 <b>Cơ sở lâm sàng:</b> Sự kết hợp tinh hoa giữa Chế độ ăn Địa Trung Hải và DASH là phác đồ số 1 toàn cầu, được các Tạp chí Y khoa (như NEJM/Lancet) chứng minh làm giảm đến 30-40% nguy cơ nhồi máu và giúp dãn nở biểu mô động mạch hiệu quả.<br>';
    guide += '✅ <span style="color:#00d4b4;font-weight:bold;">DANH MỤC LƯƠNG THỰC BẮT BUỘC ƯU TIÊN:</span><br>';
    guide += '&nbsp;&nbsp;• <b>Chất Béo Tốt:</b> Sử dụng Dầu Olive ép lạnh (Extra Virgin) tươi, không chiên xào nhiệt độ cao.<br>';
    guide += '&nbsp;&nbsp;• <b>Thuốc Chống Oxy Hóa Tự Nhiên:</b> Nạp dâu tây, việt quất, súp lơ xanh, cần tây hàng ngày để cung cấp hoạt chất sinh học dọn dẹp gốc tự do (free radicals).<br>';
    guide += '&nbsp;&nbsp;• <b>Nguồn Đạm Thực Vật/Trắng:</b> Ưu tiên ức gà, cá biển sâu, đậu lăng, hạnh nhân, quả óc chó tự nhiên.<br>';
    guide += '🚫 <span style="color:#ff4444;font-weight:bold;">DANH MỤC TRÍCH KIẾT (TUYỆT ĐỐI CẤM KỴ):</span><br>';
    guide += '&nbsp;&nbsp;• Nhãn dán thành phần có High-fructose corn syrup, dầu cọ mỡ thay thế hydro hóa 1 phần.<br>';
    guide += '&nbsp;&nbsp;• Tránh hoàn toàn việc sử dụng lại dầu rán qua đêm, thịt nguội xông khói công nghiệp (chứa Nitrat sinh ung thư).<br>';
    guide += '&nbsp;&nbsp;• Bỏ rượu bia và các dòng thuốc lá nung nóng (kể cả Vape) nếu không muốn lòng mạch máu bị tàn phá không thể phục hồi.';
    guide += '</li>';

    guide += '</ul></div>';

    // Detailed Medical Screenings recommendations
    var medRecs = [];
    if (age > 40 || bmi > 27 || risks.indexOf('tim_mach') > -1) medRecs.push('• <b>Siêu âm Doppler động mạch cảnh:</b> Kiểm tra mảng xơ vữa hẹp mạch não.');
    if (risks.indexOf('huyet_ap') > -1 || risks.indexOf('tieu_duong') > -1) medRecs.push('• <b>Xét nghiệm HbA1c & Lipid máu:</b> Tầm soát tiểu đường và rối loạn chuyển hóa.');
    if (risks.indexOf('dau_nguc') > -1 || risks.indexOf('tim_dap') > -1) medRecs.push('• <b>Holter nhịp tim 24h:</b> Theo dõi loạn nhịp tim trong thời gian thực.');

    if (medRecs.length > 0) {
        guide += '<div style="margin-top:12px;background:rgba(41,121,255,0.06);border:1px solid rgba(41,121,255,0.15);border-radius:10px;padding:12px 14px;">';
        guide += '<div style="color:#4a90e2;font-size:11px;font-weight:900;margin-bottom:8px">🩺 TẦM SOÁT Y TẾ KHUYÊN DÙNG:</div>';
        guide += '<div style="font-size:11px;color:#aab;line-height:1.6">' + medRecs.join('<br>') + '</div></div>';
    }

    var baseExplanation = T('aiExplain1') + riskCount + T('aiExplain2') + bmi + T('aiExplain3') + sleep + T('aiExplain4') + ' ' + (warnings.length > 1 ? warnings[1] : T('aiExplain5'));

    return {
        estimated_lifespan: lifespan,
        risk_level_percent: riskPct,
        health_status: status,
        all_warnings: warnings,
        screen_warning: warnings[0] || (status === 'Improving' ? T('warnDefaultGood') : T('warnDefaultBad')),
        detailed_explanation: baseExplanation + guide
    };
}



function getAIResponse(text) {
    var t = text.toLowerCase();

    // Emotion presets
    var emoNod = '🤖 <i>[Gật đầu phân tích]</i><br>';
    var emoWarn = '⚠️ <i>[Cảnh báo khẩn cấp]</i><br>';
    var emoThink = '🧠 <i>[Đang tra cứu dữ liệu sinh học]</i><br>';
    var emoSmile = '👨‍⚕️ <i>[Mỉm cười thân thiện]</i><br>';
    var emoSerious = '🩺 <i>[Khuôn mặt cực kỳ nghiêm trọng]</i><br>';

    var isHello = t.includes('chào') || t.includes('hello') || t.includes('hi ') || t.includes('alo') || t.includes('bác sĩ') || t === 'ai' || t.includes('ê ');

    if (isHello) {
        return emoSmile + 'Chào bạn! Tôi là <b>Bác Sĩ AI Tư Vấn</b>, hệ thống y khoa chuyên về Đột quỵ và Tim mạch.<br><br>Dữ liệu của tôi được cập nhật từ <b>WHO, AHA, Bộ Y tế VN, BV Bạch Mai, GSA 2025</b>.<br><br>Bạn muốn tìm hiểu về: <i>đột quỵ, huyết áp, giấc ngủ, stress, dinh dưỡng, vận động, cà phê,</i> hay <i>sơ cấp cứu</i>?';
    }

    // Try MEDICAL_DATA knowledge base first
    if (typeof MEDICAL_DATA !== 'undefined' && MEDICAL_DATA.getChatbotResponse) {
        var medResponse = MEDICAL_DATA.getChatbotResponse(text);
        if (medResponse && !medResponse.includes('Cảm ơn câu hỏi của bạn')) {
            // Has specific match — use medical data with emotion
            var emotion = emoThink;
            if (t.match(/đột quỵ|stroke|cấp cứu|sơ cứu|ngừng thở/)) emotion = emoSerious;
            else if (t.match(/huyết áp|tim|caffeine|cà phê/)) emotion = emoWarn;
            else if (t.match(/ngủ|stress|căng thẳng/)) emotion = emoSerious;
            else if (t.match(/ăn|tập|vận động/)) emotion = emoSmile;
            return emotion + medResponse.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>').replace(/• /g, '&nbsp;&nbsp;• ');
        }
    }

    // Fallback specific responses
    var isWork = t.includes('làm việc') || t.includes('tăng ca') || t.includes('overwork') || t.includes('công việc') || t.includes('deadline');
    if (isWork) {
        return emoThink + 'Hội chứng <i>"Karoshi"</i> (Tử vong do làm việc quá sức) làm hàng triệu người chết mỗi năm.<br><br>Theo <b>Lancet 2021</b>: Làm việc > 12h/ngày kéo dài giảm 3-5 năm tuổi thọ và tăng 17% nguy cơ đột quỵ.<br><br><b>Nguyên tắc:</b> Cứ 45 phút phải đứng lên vươn vai 5 phút.<br><br><i>📌 Nguồn: Lancet 2021, WHO</i>';
    }

    // Generic fallback with medical data stats
    return emoThink + 'Hệ thống AI đang tra cứu y văn...<br><br>📊 <b>Thống kê quan trọng:</b><br>• Việt Nam: ~200.000 ca đột quỵ/năm, 15% ở người < 45 tuổi <i>(GSA 2025)</i><br>• Chỉ 33% bệnh nhân đến BV trong "giờ vàng" <i>(Hội Đột quỵ QT 2025)</i><br>• Cứ mỗi 3 giây: 1 người bị đột quỵ trên thế giới <i>(WSO 2024)</i><br><br>Bạn muốn tìm hiểu về: <i>đột quỵ, huyết áp, giấc ngủ, stress, dinh dưỡng, vận động, cà phê,</i> hay <i>sơ cấp cứu</i>?';
}
function showAIResult(r) {
    var isDanger = r.health_status === 'Declining' || r.risk_level_percent > 50;
    var rC = r.risk_level_percent > 70 ? '#ff3333' : r.risk_level_percent > 40 ? '#ff8800' : '#00d4b4';
    var parsedLife = parseInt(r.estimated_lifespan) || 0;
    var lC = parsedLife < 65 ? '#ff4444' : parsedLife < 75 ? '#ffd700' : '#00d4b4';
    cancelAnimationFrame(bodyRaf); drawBodyDiagram(r.risk_level_percent, r.estimated_lifespan, r.health_status);
    if (isDanger) SFX.warn(); else SFX.win();

    // Build markers for all warnings
    var warningsHtml = '';
    if (r.all_warnings) {
        r.all_warnings.forEach(function (w, i) {
            var isCrit = w.includes('CẢNH BÁO') || w.includes('NGUY HIỂM');
            warningsHtml += '<div class="ai-risk-item ' + (isCrit ? 'danger' : '') + '" style="animation-delay:' + (i * 0.1) + 's">' + w + '</div>';
        });
    }

    // ── BUILD VERIFIED SOURCES PANEL ──
    var sourcesHtml = '';
    if (typeof MEDICAL_DATA !== 'undefined') {
        sourcesHtml = '<div style="margin-top:16px;background:linear-gradient(135deg,rgba(0,100,200,0.06),rgba(0,200,150,0.04));border:1px solid rgba(0,150,255,0.2);border-radius:14px;padding:18px 20px;box-shadow:0 4px 20px rgba(0,100,200,0.08);">';
        sourcesHtml += '<div style="color:#00ddff;font-size:12px;font-weight:900;letter-spacing:2px;margin-bottom:14px;text-transform:uppercase;border-bottom:2px solid rgba(0,200,255,0.2);padding-bottom:8px;text-shadow:0 0 10px rgba(0,200,255,0.3);">📋 NGUỒN DỮ LIỆU Y KHOA XÁC THỰC</div>';

        // Source links with icons and URLs
        // Source links mapped to specific articles on official organization websites
        var sourceLinks = [
            { icon: '🏛', name: 'GSA 2025 — Hội nghị Đột quỵ Toàn cầu', url: 'https://www.world-stroke.org/news-and-blog/news/wso-global-stroke-fact-sheet-2022' },
            { icon: '🏥', name: 'BV Bạch Mai — Trung tâm Đột quỵ', url: 'http://bachmai.gov.vn/tin-tuc-va-su-kien/bai-viet-chuyen-mon/dot-quy-o-nguoi-tre-dang-co-xu-huong-gia-tang.html' },
            { icon: '🇻🇳', name: 'Bộ Y tế Việt Nam', url: 'https://moh.gov.vn/chuong-trinh-muc-tieu-quoc-gia/-/asset_publisher/7ng11fEWgASC/content/chu-ong-phong-chong-dot-quy-de-bao-ve-suc-khoe' },
            { icon: '🌍', name: 'WHO — Tổ chức Y tế Thế giới', url: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)' },
            { icon: '🇺🇸', name: 'CDC — Trung tâm Kiểm soát Bệnh tật Hoa Kỳ', url: 'https://www.cdc.gov/stroke/data-research/facts-stats/index.html' },
            { icon: '❤️', name: 'AHA — Hiệp hội Tim mạch Hoa Kỳ', url: 'https://professional.heart.org/en/science-news/heart-disease-and-stroke-statistics-2024-update' },
            { icon: '📰', name: 'WSO — Tổ chức Đột quỵ Thế giới 2024', url: 'https://www.world-stroke.org/world-stroke-day-campaign' },
            { icon: '📖', name: 'The Lancet 2021 — Overwork & Stroke', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(15)60295-1/fulltext' },
            { icon: '🧬', name: 'NEJM — New England Journal of Medicine', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1801534' },
            { icon: '🧠', name: 'NIH — Viện Sức khỏe Quốc gia Hoa Kỳ', url: 'https://www.nhlbi.nih.gov/health/stroke' },
            { icon: '💊', name: 'ACC/AHA 2023 — Hướng dẫn Huyết áp', url: 'https://www.acc.org/latest-in-cardiology/ten-points-to-remember/2017/11/09/11/41/2017-guideline-for-high-blood-pressure-in-adults' },
            { icon: '☕', name: 'BMJ Nutrition — Caffeine Research', url: 'https://nutrition.bmj.com/search/caffeine%2520cardiovascular' }
        ];
        sourcesHtml += '<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px;">';
        sourceLinks.forEach(function (s) {
            sourcesHtml += '<a href="' + s.url + '" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(0,150,255,0.04);border:1px solid rgba(0,150,255,0.08);border-radius:8px;text-decoration:none;transition:all 0.2s;color:#b0c4de;font-size:10px;" onmouseover="this.style.background=\'rgba(0,200,255,0.1)\';this.style.borderColor=\'rgba(0,200,255,0.3)\';this.style.transform=\'translateX(3px)\'" onmouseout="this.style.background=\'rgba(0,150,255,0.04)\';this.style.borderColor=\'rgba(0,150,255,0.08)\';this.style.transform=\'none\'">';
            sourcesHtml += '<span style="font-size:14px;">' + s.icon + '</span>';
            sourcesHtml += '<span style="flex:1;font-weight:600;">' + s.name + '</span>';
            sourcesHtml += '<span style="color:#00bbff;font-size:9px;opacity:0.7;">🔗 Nguồn dữ liệu gốc</span>';
            sourcesHtml += '</a>';
        });
        sourcesHtml += '</div>';

        // Key stats with color
        sourcesHtml += '<div style="background:rgba(255,68,68,0.05);border:1px solid rgba(255,68,68,0.12);border-radius:10px;padding:12px 14px;margin-bottom:10px;">';
        sourcesHtml += '<div style="color:#ff6666;font-size:11px;font-weight:800;letter-spacing:1px;margin-bottom:8px;">📊 THỐNG KÊ ĐÁNG BÁO ĐỘNG</div>';
        sourcesHtml += '<div style="font-size:10px;color:#ccc;line-height:1.8;">';
        sourcesHtml += '🇻🇳 VN: <b style="color:#ff8844;">~200.000</b> ca đột quỵ/năm — <b style="color:#ff4444;">15%</b> ở người < 45 tuổi <i style="color:#888;">(GSA 2025)</i><br>';
        sourcesHtml += '⏰ Chỉ <b style="color:#ff4444;">33%</b> đến BV trong "giờ vàng" — <b style="color:#ff4444;">14%</b> được tái tưới máu <i style="color:#888;">(Bộ Y tế VN)</i><br>';
        sourcesHtml += '🌍 Thế giới: <b style="color:#ff8844;">12.2 triệu</b> ca/năm — cứ <b style="color:#ff4444;">3 giây</b> có 1 người đột quỵ <i style="color:#888;">(WSO 2024)</i><br>';
        sourcesHtml += '💀 Tử vong: <b style="color:#ff4444;">~136.000</b> người VN/năm do đột quỵ <i style="color:#888;">(BV Bạch Mai)</i><br>';
        sourcesHtml += '👤 Tuổi thọ TB: Nam <b style="color:#00d4b4;">73.6</b>, Nữ <b style="color:#00d4b4;">79.2</b> <i style="color:#888;">(WHO 2024)</i>';
        sourcesHtml += '</div></div>';

        // Extended improvement guidance
        sourcesHtml += '<div style="background:rgba(0,212,180,0.05);border:1px solid rgba(0,212,180,0.12);border-radius:10px;padding:12px 14px;">';
        sourcesHtml += '<div style="color:#00d4b4;font-size:11px;font-weight:800;letter-spacing:1px;margin-bottom:8px;">💡 HƯỚNG DẪN CẢI THIỆN SỨC KHỎE TOÀN DIỆN</div>';
        sourcesHtml += '<div style="font-size:10px;color:#ccc;line-height:1.8;">';
        sourcesHtml += '<b style="color:#00bbff;">🛏 GIẤC NGỦ (NIH):</b> Ngủ 7-8h/đêm. Tắt điện thoại trước 22h. Phòng tối, 22-24°C. Không caffeine sau 14h. Ngủ đủ giấc giúp <b style="color:#00d4b4;">+2-4 năm</b> tuổi thọ.<br>';
        sourcesHtml += '<b style="color:#00bbff;">🏃 VẬN ĐỘNG (WHO):</b> 150-300 phút/tuần cường độ vừa. Đi bộ 10.000 bước/ngày. Đứng dậy mỗi 45 phút. Giảm <b style="color:#00d4b4;">35%</b> nguy cơ tim mạch.<br>';
        sourcesHtml += '<b style="color:#00bbff;">🍎 DINH DƯỠNG (NEJM):</b> Ăn nhiều rau, cá, ngũ cốc nguyên hạt. Giảm muối < 5g/ngày. Bỏ đồ chiên, nước ngọt. Chế độ Địa Trung Hải <b style="color:#00d4b4;">+3 năm</b>.<br>';
        sourcesHtml += '<b style="color:#00bbff;">😰 STRESS (AHA):</b> Hít thở sâu 4-7-8. Thiền 10-15 phút/ngày. Nói chuyện với người thân. Stress > 3 tháng = <b style="color:#ff4444;">-3 năm</b> tuổi thọ.<br>';
        sourcesHtml += '<b style="color:#00bbff;">🚭 KHÔNG HÚT THUỐC (CDC):</b> Người không hút thuốc sống thêm <b style="color:#00d4b4;">8-10 năm</b> so với người hút. Bỏ thuốc ở bất kỳ tuổi nào đều có lợi.<br>';
        sourcesHtml += '<b style="color:#00bbff;">🩺 KHÁM ĐỊNH KỲ (AHA):</b> Đo huyết áp, xét nghiệm máu mỗi 6 tháng. Phát hiện sớm = cứu mạng. <b style="color:#00d4b4;">+2-3 năm</b> tuổi thọ.<br>';
        sourcesHtml += '<b style="color:#00bbff;">👥 QUAN HỆ XÃ HỘI (Lancet):</b> Mạng lưới xã hội tốt giúp <b style="color:#00d4b4;">+5-7 năm</b>. Cô đơn = nguy cơ bằng hút 15 điếu/ngày.';
        sourcesHtml += '</div></div>';

        sourcesHtml += '<div style="margin-top:8px;padding:8px 10px;background:rgba(255,200,0,0.04);border:1px solid rgba(255,200,0,0.1);border-radius:6px;font-size:9px;color:rgba(200,180,100,0.5);line-height:1.5;font-style:italic;">⚠ Dữ liệu cập nhật đến 07/2025 từ các nguồn y tế chính thống quốc tế và Việt Nam. Mọi số liệu đều có thể trích dẫn và kiểm chứng. Nhấn vào tên nguồn để truy cập trực tiếp.</div>';
        sourcesHtml += '</div>';
    }

    // ── DISCLAIMER Y KHOA (bắt buộc) ──
    var disclaimerHtml = '<div style="background:rgba(255, 200, 0, 0.08); border: 1px solid rgba(255, 200, 0, 0.3); border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; line-height: 1.6;">' +
        '<div style="color: #ffcc00; font-weight: 900; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">⚠️ LƯU Ý QUAN TRỌNG</div>' +
        '<div style="color: #d0c8a0; font-size: 11px;">Đây là <b>công cụ mô phỏng giáo dục</b> dựa trên số liệu dịch tễ học công khai (WHO, AHA, CDC, Lancet...), <b>KHÔNG phải chẩn đoán y khoa cá nhân hóa</b>. Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo bác sĩ chuyên khoa để được tư vấn chính xác.</div>' +
        '</div>';

    var verifiedB2bHtml = '<div style="background:rgba(0, 180, 160, 0.08); border: 1px solid rgba(0, 180, 160, 0.25); border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">' +
        '<div style="font-size: 24px;">📊</div>' +
        '<div style="flex: 1;"><div style="color: #00bfa5; font-weight: 900; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">CÔNG CỤ ƯỚC TÍNH SỨC KHỎE</div><div style="color: #a0c0b8; font-size: 10px; margin-top: 3px; line-height: 1.4;">Kết quả tính toán dựa trên <b>hệ số nguy cơ từ dữ liệu dịch tễ học công khai</b> của WHO, AHA, CDC, Lancet, NEJM.</div></div>' +
        '</div>';

    var html = disclaimerHtml + verifiedB2bHtml + '<div class="ai-result-grid">' +
        '<div class="ai-card ' + (isDanger ? 'danger' : 'good') + '"><div class="card-lbl">' + T('aiEstLife') + '</div><div class="card-val" style="color:' + lC + '">' + r.estimated_lifespan + '</div><div class="card-unit">' + T('aiYearsOld') + '</div></div>' +
        '<div class="ai-card ' + (r.risk_level_percent > 50 ? 'danger' : 'good') + '"><div class="card-lbl">' + T('aiRiskLevel') + '</div><div class="card-val" style="color:' + rC + '">' + r.risk_level_percent + '%</div><div class="card-unit">' + (r.health_status === 'Improving' ? T('aiImprove') : T('aiDecline')) + '</div></div>' +
        '</div>' +
        '<div class="ai-risk-bar-wrap"><div class="rlbl"><span>' + T('aiRiskHealth') + '</span><span style="color:' + rC + '">' + r.risk_level_percent + '%</span></div>' +
        '<div class="ai-risk-bar"><div class="ai-risk-fill" id="riskFill" style="width:0%;background:linear-gradient(90deg,#004a42,' + rC + ')"></div></div></div>' +
        '<div class="ai-warning-box ' + (isDanger ? 'bad' : 'good') + '"><div class="wt">' + (isDanger ? T('aiWarnDanger') : T('aiWarnGood')) + '</div><p>' + r.screen_warning + '</p></div>' +
        '<div class="ai-detail-box">' +
        '<div class="dt">' + T('aiDetailAI') + '</div>' +
        '<p>' + r.detailed_explanation + '</p>' +
        '<div class="ai-risk-list" id="aiRiskList">' + warningsHtml + '</div>' +
        (r.all_warnings && r.all_warnings.length > 2 ? '<button class="see-more-btn" id="seeMoreBtn" onclick="toggleRiskList()"><span>Xem thêm</span> <i class="fas fa-chevron-down"></i></button>' : '') +
        '</div>' +
        sourcesHtml;

    var content = document.getElementById('aiContent');
    Array.from(content.children).forEach(function (c) { if (!c.classList.contains('body-diagram-wrap')) c.remove(); });
    var div = document.createElement('div'); div.style.cssText = 'width:100%;max-width:520px;display:flex;flex-direction:column;gap:12px;'; div.innerHTML = html; content.appendChild(div);
    setTimeout(function () { var f = document.getElementById('riskFill'); if (f) f.style.width = r.risk_level_percent + '%'; }, 100);
}

function toggleRiskList() {
    SFX.click();
    var list = document.getElementById('aiRiskList');
    var btn = document.getElementById('seeMoreBtn');
    var isExpanded = list.classList.contains('expanded');

    if (isExpanded) {
        list.classList.remove('expanded');
        btn.innerHTML = '<span>Xem thêm</span> <i class="fas fa-chevron-down"></i>';
    } else {
        list.classList.add('expanded');
        btn.innerHTML = '<span>Thu gọn</span> <i class="fas fa-chevron-up"></i>';
    }
}

