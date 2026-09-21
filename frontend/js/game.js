function T(key) {
    if (typeof G !== 'undefined' && G.character === 'lan') {
        var fk = key + '_female';
        if (I18N[CFG.lang] && I18N[CFG.lang][fk]) return I18N[CFG.lang][fk];
        if (I18N.vi && I18N.vi[fk]) return I18N.vi[fk];
    }
    return I18N[CFG.lang][key] || I18N.vi[key] || key;
}
// Language is fixed to Vietnamese — setLang removed
function applyLang() {
    var L = I18N[CFG.lang];
    // Menu buttons
    var btns = document.querySelectorAll('.mbtn');
    if (btns[0]) btns[0].innerHTML = '<span class="ico">▶</span>' + L.newGame;
    if (btns[1]) btns[1].innerHTML = '<span class="ico">⏵</span>' + L.continueGame;
    if (btns[2]) btns[2].innerHTML = '<span class="ico">🧬</span>' + L.aiHealth;
    if (btns[3]) btns[3].innerHTML = '<span class="ico">⚙</span>' + L.settings;
    if (btns[4]) btns[4].innerHTML = '<span class="ico">📰</span>' + L.news;
    if (btns[5]) btns[5].innerHTML = '<span class="ico">ℹ️</span>' + (L.intro || 'GIỚI THIỆU');

    // Settings panel
    var settH = document.querySelector('.sett-h');
    if (settH) settH.textContent = L.settTitle;
    var settSub = document.querySelector('.sett-sub');
    if (settSub) settSub.textContent = L.settSub;
    var secTitles = document.querySelectorAll('.sett-sec-t');
    if (secTitles[0]) secTitles[0].textContent = L.settSound;
    if (secTitles[1]) secTitles[1].textContent = L.settDiff;
    if (secTitles[2]) secTitles[2].textContent = L.settLang;
    if (secTitles[3]) secTitles[3].textContent = L.settControls;
    var lbls = document.querySelectorAll('.sett-lbl');
    if (lbls[0]) lbls[0].textContent = L.bgm;
    if (lbls[1]) lbls[1].textContent = L.sfx;
    // Difficulty buttons (first .diff-grp = difficulty group)
    var diffGrp0 = document.querySelectorAll('.diff-grp')[0];
    if (diffGrp0) {
        var dbs = diffGrp0.querySelectorAll('.diff-btn');
        if (dbs[0]) dbs[0].textContent = L.easy;
        if (dbs[1]) dbs[1].textContent = L.normal;
        if (dbs[2]) dbs[2].textContent = L.hard;
    }
    // Difficulty description
    var dd = document.getElementById('diffDesc');
    if (dd) dd.textContent = getDiffDesc();
    // Settings action buttons
    var saBtns = document.querySelectorAll('.sa-btn');
    if (saBtns[0]) saBtns[0].textContent = L.settSave;
    if (saBtns[1]) saBtns[1].textContent = L.settBack;
    // Controls key labels
    var keyLbls = document.querySelectorAll('.key-lbl');
    if (keyLbls[0]) keyLbls[0].textContent = L.move;
    if (keyLbls[1]) keyLbls[1].textContent = L.interact;
    if (keyLbls[2]) keyLbls[2].textContent = L.wardrobe;
    if (keyLbls[3]) keyLbls[3].textContent = L.menuClose;
    if (keyLbls[4]) keyLbls[4].textContent = L.moveAlt;
    // Game back button
    var gBack = document.querySelector('.g-back');
    if (gBack) gBack.textContent = L.backMenu;
    // Money label
    var mLbl = document.querySelector('.money-lbl');
    if (mLbl) mLbl.textContent = L.moneyLabel;
    // HUD bar labels
    var hudEn = document.getElementById('hudEnLabel');
    if (hudEn) hudEn.textContent = L.hudEn;
    var hudHp = document.getElementById('hudHpLabel');
    if (hudHp) hudHp.textContent = L.hudHp;
    var hudFa = document.getElementById('hudFaLabel');
    if (hudFa) hudFa.textContent = L.hudFat;
    var hudTi = document.getElementById('hudTiLabel');
    if (hudTi) hudTi.textContent = L.hudTi;
    var hudHu = document.getElementById('hudHuLabel');
    if (hudHu) hudHu.textContent = L.hudHu;
    var hudKn = document.getElementById('hudKnLabel');
    if (hudKn) hudKn.textContent = L.hudKn;
    // HUD info labels (sleep, coffee, status)
    var lblSleep = document.getElementById('lblSleep');
    if (lblSleep) lblSleep.textContent = L.hudSleep + ' ';
    var slH = document.getElementById('slH');
    if (slH) slH.textContent = G.sleptYesterday ? L.sleptYes : L.sleptNo;

    var lblCoffee = document.getElementById('lblCoffee');
    if (lblCoffee) lblCoffee.textContent = L.hudCoffee + ' ';

    var lblStatus = document.getElementById('lblStatus');
    if (lblStatus) lblStatus.textContent = L.hudStatus + ' ';

    var lblWife = document.getElementById('lblWife');
    if (lblWife) lblWife.textContent = L.hudWife + ' ';

    var lblDaug = document.getElementById('lblDaug');
    if (lblDaug) lblDaug.textContent = L.hudDaug + ' ';

    // Warning bar
    var hw = document.getElementById('hwarn');
    if (hw) hw.textContent = L.hwarn;
    // Control hint bar
    var ch = document.querySelector('.chint');
    if (ch) ch.textContent = L.chint;
    // Event overlay static labels
    var eiLbl = document.querySelector('.ei-lbl');
    if (eiLbl) eiLbl.textContent = L.evImpactLbl;
    var evBtn = document.querySelector('.ev-confirm');
    if (evBtn) evBtn.textContent = L.evConfirm;
    // AI screen
    var aiTag = document.querySelector('.ai-tag');
    if (aiTag) aiTag.textContent = L.aiTag;
    var aiH2 = document.querySelector('.ai-header h2');
    if (aiH2) aiH2.textContent = L.aiTitle;
    var aiDescEl = document.querySelector('.ai-header p');
    if (aiDescEl) aiDescEl.textContent = L.aiDesc;
    var aiSecTs = document.querySelectorAll('.ai-section-title');
    if (aiSecTs[0]) aiSecTs[0].textContent = L.aiSectionBasic;
    if (aiSecTs[1]) aiSecTs[1].textContent = L.aiSectionBodyMet || 'CHỈ SỐ THỂ TRẠNG';
    if (aiSecTs[2]) aiSecTs[2].textContent = L.aiSectionMed || 'CHỈ SỐ Y TẾ KHÁCH QUAN';
    if (aiSecTs[3]) aiSecTs[3].textContent = L.aiSectionHist || 'TIỀN SỬ BỆNH LÝ & GIA ĐÌNH';
    if (aiSecTs[4]) aiSecTs[4].textContent = L.aiSectionSymp || 'TRIỆU CHỨNG HIỆN TẠI';
    if (aiSecTs[5]) aiSecTs[5].textContent = L.aiSectionSleep;
    if (aiSecTs[6]) aiSecTs[6].textContent = L.aiSectionDiet;
    if (aiSecTs[7]) aiSecTs[7].textContent = L.aiSectionRisk;
    if (aiSecTs[8]) aiSecTs[8].textContent = L.aiSectionExtra;
    var aiSubmitBtn = document.getElementById('aiSubmitBtn');
    if (aiSubmitBtn && !aiSubmitBtn.disabled) aiSubmitBtn.textContent = L.aiSubmit;
    var aiDisc = document.querySelector('.ai-disclaimer');
    if (aiDisc) aiDisc.textContent = L.aiDisclaimer;
    var aiRTop = document.querySelector('.ai-right-top h3');
    if (aiRTop) aiRTop.innerHTML = '<span class="ai-status-dot" id="aiDot"></span>' + L.aiAnalysisHeader;

    var lblAge = document.getElementById('lbl_ai_age'); if (lblAge && L.aiAgeLbl) lblAge.textContent = L.aiAgeLbl;
    var lblJob = document.getElementById('lbl_ai_job'); if (lblJob && L.aiJobLbl) lblJob.textContent = L.aiJobLbl;
    var lblCam = document.getElementById('lbl_ai_cam'); if (lblCam && L.aiCamVerify) lblCam.innerHTML = L.aiCamVerify;
    var lblGen = document.getElementById('lbl_ai_gender'); if (lblGen && L.aiGenderLbl) lblGen.textContent = L.aiGenderLbl;
    var lblHei = document.getElementById('lbl_ai_height'); if (lblHei && L.aiHeightLbl) lblHei.textContent = L.aiHeightLbl;
    var lblWei = document.getElementById('lbl_ai_weight'); if (lblWei && L.aiWeightLbl) lblWei.textContent = L.aiWeightLbl;
    var lblBmi = document.getElementById('lbl_ai_bmi'); if (lblBmi && L.aiBmiLbl) lblBmi.textContent = L.aiBmiLbl;
    var lblSlp = document.getElementById('lbl_ai_sleep'); if (lblSlp && L.aiSleepLbl) lblSlp.textContent = L.aiSleepLbl;
    var lblBed = document.getElementById('lbl_ai_bedtime'); if (lblBed && L.aiBedtimeLbl) lblBed.textContent = L.aiBedtimeLbl;
    var lblSlB = document.getElementById('lbl_ai_sleep_bad'); if (lblSlB && L.aiSleepBadLbl) lblSlB.textContent = L.aiSleepBadLbl;
    var lblDrt = document.getElementById('lbl_ai_diet'); if (lblDrt && L.aiDietLbl) lblDrt.textContent = L.aiDietLbl;
    var lblExe = document.getElementById('lbl_ai_exercise'); if (lblExe && L.aiExeLbl) lblExe.textContent = L.aiExeLbl;

    var camStartBtn = document.getElementById('camStartBtn');
    if (camStartBtn) camStartBtn.innerHTML = '📷 ' + L.aiCamStart;
    var camBtns = document.querySelectorAll('#camPreview button');
    if (camBtns[0]) camBtns[0].innerHTML = '📸 ' + L.aiCamCapture;
    if (camBtns[1]) camBtns[1].innerHTML = L.aiCamClose;
    var camCapt = document.querySelector('#camCaptured div');
    if (camCapt) camCapt.innerHTML = L.aiCamDone;
    var camRtr = document.querySelector('#camCaptured button');
    if (camRtr) camRtr.innerHTML = '🔄 ' + L.aiCamRetry;

    var aiGen = document.getElementById('ai_gender');
    if (aiGen && L.aiMale) { aiGen.options[0].text = L.aiMale; aiGen.options[1].text = L.aiFemale; }

    var aiBed = document.getElementById('ai_bedtime');
    if (aiBed && L.aiBed) { aiBed.options[0].text = L.aiBed[0]; aiBed.options[1].text = L.aiBed[1]; aiBed.options[2].text = L.aiBed[2]; aiBed.options[3].text = L.aiBed[3]; aiBed.options[4].text = L.aiBed[4]; aiBed.options[5].text = L.aiBed[5]; }

    var aiDiet = document.getElementById('ai_diet');
    if (aiDiet && L.aiDiet) { aiDiet.options[0].text = L.aiDiet[0]; aiDiet.options[1].text = L.aiDiet[1]; aiDiet.options[2].text = L.aiDiet[2]; aiDiet.options[3].text = L.aiDiet[3]; aiDiet.options[4].text = L.aiDiet[4]; }

    var aiExe = document.getElementById('ai_exercise');
    if (aiExe && L.aiExe) { aiExe.options[0].text = L.aiExe[0]; aiExe.options[1].text = L.aiExe[1]; aiExe.options[2].text = L.aiExe[2]; aiExe.options[3].text = L.aiExe[3]; }

    var rChecks = document.querySelectorAll('.ai-check-group .ai-check');
    if (rChecks.length > 0) {
        var rcKeys = ['rcSmoking', 'rcAlcohol', 'rcStress', 'rcOverwork', 'rcNoSocial', 'rcCaffeine', 'rcInsomnia', 'rcSkipMeal', 'rcGameAbuse', 'rcNoBreak', 'rcSleep3h', 'rcLongStress', 'rcSedentary', 'rcEnergy'];
        rcKeys.forEach(function (k, i) { if (rChecks[i] && L[k]) rChecks[i].innerHTML = L[k]; });
    }

    var aiExtra = document.getElementById('ai_extra');
    if (aiExtra && L.aiExtraPlc) aiExtra.placeholder = L.aiExtraPlc;

    var aiIdleText = document.querySelector('.ai-idle p');
    if (aiIdleText && L.aiIdleTxt) aiIdleText.innerHTML = L.aiIdleTxt;

    // Update game objects if loaded
    if (G.objs && G.objs.length) {
        var descMap = { overtime: 'descOT', overtime2: 'descProject', overtime3: 'descOvernight', freelance: 'descFreelance', sleep: 'descSleep', rest: 'descRest', exercise: 'descExercise', coffee: 'descCoffee', gaming: 'descGaming', social: 'descSocial', doctor: 'descDoctor' };
        G.objs.forEach(function (o) { if (descMap[o.t]) o.desc = L[descMap[o.t]]; });
    }
    // Update NPC advice
    if (G.npcs && G.npcs.length) {
        if (G.npcs[0]) G.npcs[0].advice = L.npc1;
        if (G.npcs[1]) G.npcs[1].advice = L.npc2;
        if (G.npcs[2]) G.npcs[2].advice = L.npc3;
        if (G.npcs[3]) G.npcs[3].advice = L.npc4 || ['(Advice)'];
        if (G.npcs[4]) G.npcs[4].advice = L.npc4 || ['(Advice)']; // use same advice category
        if (G.npcs[5]) G.npcs[5].advice = L.npcChild || ['(Advice)'];
        if (G.npcs[6]) G.npcs[6].advice = L.npcMom || ['(Advice)'];
    }
    G._roomLabels = [L.roomOffice, L.roomNight, L.roomRest, L.roomCafe];

    // News screen translations
    var newsTitle = document.getElementById('newsTitle');
    if (newsTitle) newsTitle.innerHTML = L.newsHeader || 'TIN TỨC & <span>SỰ KIỆN</span>';
    var newsSub = document.getElementById('newsSub');
    if (newsSub) newsSub.textContent = L.newsSubtitle || 'Cập nhật những thông tin y tế và sức khỏe mới nhất';
    var newsBackBtn = document.querySelector('.news-back-btn');
    if (newsBackBtn) newsBackBtn.textContent = L.newsBack || 'BACK TO MENU';

    // App Content Section translations
    var ac_h2 = document.querySelector('.ac-header h2');
    // if (ac_h2 && L.acHeader) ac_h2.innerHTML = L.acHeader;
    var ac_p = document.querySelector('.ac-header p');
    // if (ac_p && L.acSub) ac_p.innerHTML = L.acSub; // Use hardcoded HTML instead

    var ac_cards_h3 = document.querySelectorAll('.ac-card h3');
    var ac_cards_p = document.querySelectorAll('.ac-card p');
    if (ac_cards_h3.length >= 4 && L.acC1T) {
        ac_cards_h3[0].textContent = L.acC1T;
        ac_cards_p[0].textContent = L.acC1D;
        ac_cards_h3[1].textContent = L.acC2T;
        ac_cards_p[1].textContent = L.acC2D;
        ac_cards_h3[2].textContent = L.acC3T;
        ac_cards_p[2].textContent = L.acC3D;
        ac_cards_h3[3].textContent = L.acC4T;
        ac_cards_p[3].textContent = L.acC4D;
    }

    if (G.scr === 'menu') spawnMainMenuHearts();
}

function spawnMainMenuHearts() {
    var container = document.querySelector('.ac-section');
    if (!container) return;
    for (var i = 0; i < 3; i++) {
        setTimeout(function () {
            var h = document.createElement('div');
            h.className = 'heart-part';
            h.innerHTML = '❤️';
            h.style.left = Math.random() * 95 + '%';
            h.style.top = Math.random() * 20 + 10 + '%';
            h.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(h);
            setTimeout(function () { h.remove(); }, 5000);
        }, i * 300);
    }
}


// ── AUDIO ───────────────────────────────────────────
var ACtx = window.AudioContext || window.webkitAudioContext, actx = null;
var AMB = { oscs: null, lfo: null, gain: null };
function getAC() {
    if (!actx) {
        actx = new ACtx();
        // Add resume listener for browsers that block audio until interaction
        var resumeAuto = function () {
            if (actx && actx.state === 'suspended') actx.resume();
            window.removeEventListener('click', resumeAuto);
            window.removeEventListener('keydown', resumeAuto);
        };
        window.addEventListener('click', resumeAuto);
        window.addEventListener('keydown', resumeAuto);
    }
    return actx;
}
function tone(f, tp, d, v, delay) {
    if (!CFG.sfxOn) return;
    try {
        var a = getAC(), o = a.createOscillator(), g = a.createGain(), flt = a.createBiquadFilter(), st = a.currentTime + (delay || 0);
        flt.type = 'lowpass'; flt.frequency.value = 3000; flt.Q.value = 1.5;
        o.connect(flt); flt.connect(g); g.connect(a.destination); o.type = tp || 'sine'; o.frequency.value = f;
        var vol = (v || .08) * CFG.sfxVol;
        g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(vol, st + .01); g.gain.exponentialRampToValueAtTime(.001, st + d);
        o.start(st); o.stop(st + d + .05);
        // Harmonic overtone for richness
        var o2 = a.createOscillator(), g2 = a.createGain();
        o2.connect(flt); o2.type = tp || 'sine'; o2.frequency.value = f * 2;
        g2.gain.setValueAtTime(0, st); g2.gain.linearRampToValueAtTime(vol * .15, st + .01); g2.gain.exponentialRampToValueAtTime(.001, st + d * .7);
        o2.start(st); o2.stop(st + d + .05);
    } catch (e) { }
}
function nz(d, v, lp) {
    if (!CFG.sfxOn) return;
    try {
        var a = getAC(), buf = a.createBuffer(1, a.sampleRate * d, a.sampleRate), dat = buf.getChannelData(0);
        for (var i = 0; i < dat.length; i++) dat[i] = Math.random() * 2 - 1;
        var s = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter(), f2 = a.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = lp || 600; f.Q.value = 2;
        f2.type = 'highpass'; f2.frequency.value = 80;
        s.buffer = buf; s.connect(f2); f2.connect(f); f.connect(g); g.connect(a.destination);
        var vol = (v || .05) * CFG.sfxVol;
        g.gain.setValueAtTime(vol, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + d);
        s.start(); s.stop(a.currentTime + d);
    } catch (e) { }
}
var SFX = {
    coin: function () { tone(880, 'sine', .06, .12); setTimeout(function () { tone(1100, 'sine', .08, .1); }, 40); },
    bigcoin: function () { [880, 1100, 1320, 1760].forEach(function (f, i) { tone(f, 'sine', .14, .1, i * .06); }); },
    click: function () { tone(700, 'square', .05, .04); },
    coffee: function () { tone(440, 'triangle', .12, .06); setTimeout(function () { tone(360, 'triangle', .1, .05); }, 80); nz(.2, .03, 300); },
    sleep: function () { tone(220, 'sine', .4, .05); setTimeout(function () { tone(180, 'sine', .5, .04); }, 300); setTimeout(function () { tone(150, 'sine', .6, .03); }, 700); },
    warn: function () { for (var i = 0; i < 4; i++) { (function (k) { setTimeout(function () { tone(440, 'square', .12, .1); }, k * 220); })(i); } },
    danger: function () { for (var i = 0; i < 5; i++) { (function (k) { setTimeout(function () { tone(380, 'sawtooth', .15, .1); nz(.1, .05, 800); }, k * 180); })(i); } },
    death: function () { nz(1.5, .1, 200);[300, 250, 200, 160, 120, 90].forEach(function (f, i) { tone(f, 'sawtooth', 1.2, .09, i * .18); }); },
    win: function () { [262, 330, 392, 523, 659, 784].forEach(function (f, i) { tone(f, 'sine', .28, .09, i * .1); }); },
    heartbeat: function () { try { var a = getAC(), g = a.createGain(), o = a.createOscillator(); o.connect(g); g.connect(a.destination); o.frequency.value = 52; o.type = 'sine'; var t = a.currentTime; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25 * CFG.sfxVol, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + .15); o.start(t); o.stop(t + .17); } catch (e) { } },
    story: function () { tone(330, 'sine', .5, .05); setTimeout(function () { tone(392, 'sine', .5, .05); }, 200); setTimeout(function () { tone(494, 'sine', .6, .06); }, 400); },
    aibeep: function () { tone(600, 'sine', .08, .05); setTimeout(function () { tone(800, 'sine', .1, .06); }, 80); tone(400, 'triangle', .15, .04, .15); },
    event: function () { [[110, 0], [138.6, .08], [164.8, .18], [207.7, .32]].forEach(function (p) { tone(p[0], 'sawtooth', .9, .12, p[1]); }); nz(.4, .09, 300); setTimeout(function () { tone(165, 'sine', .6, .06); tone(208, 'sine', .5, .05, .12); }, 650); },
    typing: function () { for (var i = 0; i < 8; i++) { (function (k) { setTimeout(function () { tone(300 + Math.random() * 200, 'square', .03, .03); }, k * 60 + Math.random() * 30); })(i); } },
    anxiety: function () { tone(130, 'sawtooth', .8, .08); tone(138, 'sawtooth', .7, .07, .1); nz(.6, .06, 400); setTimeout(function () { tone(110, 'sine', .9, .06); tone(165, 'triangle', .5, .05); }, 400); setTimeout(function () { tone(98, 'sawtooth', 1, .07); nz(.4, .04, 250); }, 800); },
    npcTalk: function () { tone(500, 'sine', .1, .06); setTimeout(function () { tone(550, 'sine', .08, .05); }, 80); setTimeout(function () { tone(480, 'sine', .12, .06); }, 160); }
};
var alarmInt = null, heartInt = null;
function startAlarm() { if (alarmInt) return; SFX.danger(); alarmInt = setInterval(function () { if (G.fatigue >= 85 && G.scr === 'game') SFX.danger(); else stopAlarm(); }, 1100); }
function stopAlarm() { clearInterval(alarmInt); alarmInt = null; }
function startHeartbeat() { if (heartInt) return; heartInt = setInterval(function () { if (G.hp <= 30 && G.scr === 'game') SFX.heartbeat(); else stopHeartbeat(); }, 700); }
function stopHeartbeat() { clearInterval(heartInt); heartInt = null; }
function startAmbient(type) {
    stopAmbient();
    if (!CFG.musicOn) return;
    try {
        var a = getAC(), mg = a.createGain();
        mg.gain.value = CFG.musicVol * .09;
        mg.connect(a.destination);
        var base = type === 'menu' ? 55 : type === 'tense' ? 41 : 49;
        var oscs = [];
        [base, base * 1.5, base * 2, base * 2.5].forEach(function (f, i) {
            var o = a.createOscillator(), g2 = a.createGain();
            o.type = i < 2 ? 'sine' : 'triangle'; o.frequency.value = f;
            o.detune.value = i % 2 === 0 ? -5 : 5;
            g2.gain.value = i === 0 ? .5 : i === 1 ? .25 : i === 2 ? .12 : .07;
            o.connect(g2); g2.connect(mg); o.start(); oscs.push(o);
        });
        var lfo = a.createOscillator(), lfog = a.createGain();
        lfo.frequency.value = .12; lfog.gain.value = .04;
        lfo.connect(lfog); lfog.connect(mg.gain); lfo.start();
        AMB.oscs = oscs; AMB.lfo = lfo; AMB.gain = mg;
    } catch (e) { }
}
function stopAmbient() {
    if (!AMB.oscs) return;
    try { AMB.oscs.forEach(function (o) { o.stop(); }); if (AMB.lfo) AMB.lfo.stop(); } catch (e) { }
    AMB.oscs = null; AMB.lfo = null;
}
function updateAudio() {
    CFG.musicOn = document.getElementById('tog_music').checked;
    CFG.sfxOn = document.getElementById('tog_sfx').checked;
    var bgm = document.getElementById('bgMusic');
    if (!CFG.musicOn) {
        stopAmbient();
        if (bgm) bgm.pause();
    } else {
        if (G.scr === 'menu') startAmbient('menu');
        else if (G.scr === 'game') startAmbient(G.fatigue > 70 ? 'tense' : 'office');
        if (bgm && bgm.paused) {
            bgm.volume = CFG.musicVol * 0.3; // Nhạc nền nhẹ nhàng
            bgm.play().catch(function(e){});
        }
    }
}
function updateVol(t, v) {
    var pct = Math.round(v);
    if (t === 'music') { 
        CFG.musicVol = pct / 100; 
        document.getElementById('sv_music').textContent = pct + '%'; 
        if (AMB.gain) AMB.gain.gain.value = CFG.musicVol * .09; 
        var bgm = document.getElementById('bgMusic');
        if (bgm) bgm.volume = CFG.musicVol * 0.3;
    }
    else { CFG.sfxVol = pct / 100; document.getElementById('sv_sfx').textContent = pct + '%'; }
}

// ── STATE ───────────────────────────────────────────
var G = { scr: 'menu', level: 0, day: 1, hour: 6, energy: 100, hoursAwake: 0, money: 0, hp: 100, fatigue: 0, coffeeToday: 0, sleptYesterday: false, timeUpdating: false, inventory: [], hunger: 100, knowledge: 0, relWife: 0, relDaughter: 0, stats: { totalCoffee: 0, totalSleep: 0, totalWork: 0, warningIgnores: 0, mealsMissed: 0 }, p: { x: 500, y: 320, sz: 18, spd: 5.0, moving: false }, npcs: [], objs: [], keys: {}, near: null, nearNpc: null, parts: [], shake: 0, modalOpen: false, evOpen: false, goal: 50000000, maxDays: 32, tutorialShown: false, workingAnim: false, workAnimTimer: 0, workTimer: { active: false, start: 0, duration: 0, label: '', isWork: false, isRest: false }, xrayActive: false, xrayY: 0, camX: 0, camY: 0, mapW: 3200, mapH: 1800, zoom: 1.35, lastMedicalAdvice: "" };
function startWorkTimer(label, hours, isWork, isRest) {
    G.workTimer = { active: true, start: Date.now(), duration: hours * 1200, label: label, isWork: !!isWork, isRest: !!isRest };
}

// ── TIME MANAGER (CENTRAL) ───────────────────────────
function updateGameTime(hours) {
    if (!hours || hours <= 0 || G.timeUpdating) return false;
    hours = Math.max(1, Math.round(hours));
    G.timeUpdating = true;
    var oldDay = G.day, oldHour = G.hour;
    G.hour += hours;
    G.hoursAwake += hours;
    while (G.hour >= 24) { G.hour -= 24; G.day++; G.coffeeToday = 0; }
    // Energy drain: work costs more when tired
    var awakeBonus = G.hoursAwake > 16 ? 1.5 : G.hoursAwake > 12 ? 1.2 : 1;

    // Random Life Impact (Stress)
    var stressMult = 1;
    if (G.lifeFactors && G.lifeFactors.economicStatus === 'poor') stressMult = 1.2;

    // Fatigue from being awake
    if (G.hoursAwake > 16) {
        G.fatigue = Math.min(100, G.fatigue + Math.round(hours * 2 * awakeBonus * getDiff().fm * stressMult));
        var hpDrain = hours * 0.5;
        if (G.lifeFactors && G.lifeFactors.baseHealth === 'low') hpDrain *= 1.5;
        G.hp = Math.max(1, G.hp - Math.round(hpDrain));
    }

    // Environment Impact on Health
    if (G.lifeFactors && G.lifeFactors.environment === 'polluted') {
        G.hp = Math.max(1, G.hp - Math.round(hours * 0.25));
    }

    // Hunger drains safely each hour in game automatically
    for (let i = 0; i < hours; i++) {
        drainHunger();
    }

    showTimeToast(hours, oldHour, G.hour, oldDay !== G.day);
    updateHUD();
    if (G.day > G.maxDays && G.money < G.goal) { G.timeUpdating = false; triggerFail(); return false; }
    checkEvents();
    G.timeUpdating = false;
    return true;
}
function canWork() {
    if (G.energy <= 0) {
        showM('⚡ KIỆT SỨC', '<p>Năng lượng = 0. Bạn <b>phải nghỉ ngơi</b> trước khi làm việc tiếp.</p><div class="wbox">⚠ Đi ngủ hoặc nghỉ ngơi để phục hồi năng lượng!</div><button class="bok" onclick="closeM()">OK</button>');
        return false;
    }
    return true;
}
function getEfficiency() {
    var eff = 1;
    if (G.hoursAwake > 20) eff *= 0.4;
    else if (G.hoursAwake > 16) eff *= 0.6;
    else if (G.hoursAwake > 12) eff *= 0.8;
    if (G.energy < 20) eff *= 0.5;
    else if (G.energy < 40) eff *= 0.7;
    if (G.fatigue > 80) eff *= 0.5;
    else if (G.fatigue > 60) eff *= 0.75;
    return Math.max(0.2, eff);
}
function drainEnergy(hours, intensity) {
    intensity = intensity || 1;
    var drain = hours * 5 * intensity;
    if (G.hoursAwake > 16) drain *= 1.5;
    G.energy = Math.max(0, Math.round(G.energy - drain));
}
function recoverEnergy(hours, quality) {
    quality = quality || 1;
    var recover = hours * 8 * quality;
    G.energy = Math.min(100, Math.round(G.energy + recover));
    G.hoursAwake = Math.max(0, G.hoursAwake - hours * 2);
}
function showTimeToast(hours, oldH, newH, newDay) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(0,0,0,.88);border:1px solid rgba(255,215,0,.5);color:#ffd700;padding:10px 24px;font-family:Courier New,monospace;font-size:13px;border-radius:6px;pointer-events:none;animation:fadeIn .3s ease;letter-spacing:1px;text-align:center;';
    var msg = '🕒 +' + hours + ' giờ đã trôi qua';
    if (newDay) msg += '<br><span style="color:#ff8800;font-size:11px">📅 Ngày ' + G.day + ' bắt đầu</span>';
    if (G.energy <= 20) msg += '<br><span style="color:#ff4444;font-size:10px">⚡ Năng lượng thấp!</span>';
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = '0'; toast.style.transition = 'opacity .5s'; }, 2000);
    setTimeout(function () { toast.remove(); }, 2600);
}
function formatHour(h) {
    var hh = Math.floor(h);
    var mm = Math.floor((h - hh) * 60);
    return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
}

// ── HUNGER SYSTEM (NEW) ──────────────────────────────
// G.hunger represents Fullness. 100 = completely full, 0 = starving.
// Drops by 5 per action. If 0, drops HP by 5 and shows warning.
function drainHunger() {
    if (G.hunger > 0) {
        G.hunger = Math.max(0, G.hunger - 5);
    } else {
        G.hp = Math.max(0, G.hp - 5);
        popText(G.p.x, G.p.y + 40, '-5 HP (ĐÓI LẢ)', true);
        if (SFX.hit) SFX.hit(); // play damage sound if exists
        if (G.hp <= 0) triggerDeath('starvation');
        G.stats.mealsMissed++;
    }
}
function recoverHunger(val) {
    if (val <= 0) return;
    G.hunger = Math.min(100, G.hunger + val);
}

// ── STORY EVENTS ────────────────────────────────────
var LV_EVENTS = {
    daughter: [
        {
            day: 9, triggered: false, chapter: '🚨 BIẾN CỐ · NGÀY 9', title: 'Biến <span style="color:#ff4444">Chứng Bất Ngờ</span>',
            text: '11 giờ đêm. Điện thoại Minh rung lên.\n\n"Anh Minh ơi... bé Linh vừa sốt cao 40 độ. Có dấu hiệu viêm phổi sau phẫu thuật. Chúng tôi cần dùng thuốc kháng sinh đặc trị nhập khẩu ngay trong đêm nay."\n\nAnh đứng như trời trồng giữa văn phòng đang im lặng. Tay run run bấm số bác sĩ.\n\n<em style="color:rgba(255,180,180,.7)">"Con ơi... ba sẽ lo được, nghe con..."</em>',
            extraGoal: 12000000, sound: 'event'
        },
        {
            day: 20, triggered: false, chapter: '💊 BIẾN CỐ · NGÀY 20', title: 'Thuốc Đặc Trị <span style="color:#ff4444">Khan Hiếm</span>',
            text: 'Bé Linh qua cơn nguy kịch. Nhưng bác sĩ nói cần liệu trình phục hồi dài hạn.\n\n"Loại thuốc này chỉ còn tại bệnh viện Pháp ở TP.HCM. Đắt gấp đôi thị trường. Nhưng đây là lựa chọn tốt nhất cho con bé."\n\nMinh nhìn ảnh con trong điện thoại. Không do dự.\n\n<em style="color:rgba(255,180,180,.7)">"Không có gì quý hơn con."</em>',
            extraGoal: 8000000, sound: 'event'
        }
    ],
    debt: [
        {
            day: 8, triggered: false, chapter: '📈 BIẾN CỐ · NGÀY 8', title: 'Lãi Mẹ <span style="color:#ff4444">Đẻ Lãi Con</span>',
            text: 'Giọng người đàn ông lạnh như băng qua điện thoại:\n\n"Anh Minh à, tuần trước anh không gửi đúng hạn. Theo hợp đồng, lãi trễ được cộng vào gốc. Tôi đã cập nhật lại sổ rồi."\n\nMinh nhìn vào con số trên màn hình. Nó nhảy lên cao hơn anh tưởng rất nhiều.\n\n<em style="color:rgba(255,180,180,.7)">Bẫy. Đây là cái bẫy từ đầu.</em>',
            extraGoal: 22000000, sound: 'event'
        },
        {
            day: 22, triggered: false, chapter: '🚪 BIẾN CỐ · NGÀY 22', title: 'Chúng <span style="color:#ff4444">Gõ Cửa Nhà</span>',
            text: '10 giờ tối. Có tiếng gõ cửa mạnh.\n\nHai người đàn ông to lớn đứng trước cửa. Một người cầm điếu thuốc, nhìn vào phòng trong — bé Linh đang ngủ.\n\n"Sếp tôi nói anh chậm trễ nhiều quá rồi. Anh muốn gia đình yên ổn thì lo đi. Tuần này. Không thương lượng."\n\n<em style="color:rgba(255,180,180,.7)">Minh gật đầu, lòng như lửa đốt.</em>',
            extraGoal: 18000000, sound: 'event'
        }
    ],
    hospital: [
        {
            day: 9, triggered: false, chapter: '🔬 BIẾN CỐ · NGÀY 9', title: 'Khối U <span style="color:#ff4444">Thứ Hai</span>',
            text: 'Kết quả PET scan vừa về. Bác sĩ ngồi xuống, giọng thận trọng:\n\n"Anh Minh... chúng tôi phát hiện thêm một khối u nhỏ ở gan. Giai đoạn đầu, vẫn điều trị được. Nhưng cần bắt đầu ngay — song song với phác đồ hiện tại."\n\nMinh nghe tiếng ù trong tai. Anh nghĩ mình đã chuẩn bị. Nhưng không ai chuẩn bị được cho điều này.\n\n<em style="color:rgba(255,180,180,.7)">"Mẹ không biết gì. Đừng cho mẹ biết."</em>',
            extraGoal: 45000000, sound: 'event'
        },
        {
            day: 25, triggered: false, chapter: '✈️ BIẾN CỐ · NGÀY 25', title: 'Thiết Bị <span style="color:#ff4444">Nhập Khẩu</span>',
            text: 'Hội đồng y khoa họp khẩn.\n\n"Ca phẫu thuật của bà cần robot phẫu thuật thế hệ mới — hiện chỉ có tại bệnh viện quốc tế. Tỷ lệ thành công cao hơn 40%. Đây là cơ hội tốt nhất chúng tôi có thể đề nghị."\n\nMinh nhìn ra cửa sổ. Bầu trời tối đen. Anh không hỏi giá. Anh chỉ gật đầu.\n\n<em style="color:rgba(255,180,180,.7)">"Làm mọi thứ có thể. Tôi sẽ lo tiền."</em>',
            extraGoal: 35000000, sound: 'event'
        }
    ],
    shipper: [
        {
            day: 10, triggered: false, chapter: '🏥 BIẾN CỐ · NGÀY 10', title: 'Vật Lý <span style="color:#ff4444">Trị Liệu</span>',
            text: 'Bác sĩ thông báo: "Để bà có thể đi lại được, cần liệu trình vật lý trị liệu chuyên sâu kết hợp máy xung điện não. Chi phí này không nằm trong danh mục bảo hiểm."\n\nMinh nhìn đôi chân gầy gò của mẹ. Anh biết mình phải nỗ lực hơn nữa.\n\n<em style="color:rgba(255,180,180,.7)">"Dù vất vả thế nào, con cũng sẽ giúp mẹ đứng dậy được."</em>',
            extraGoal: 60000000, sound: 'event'
        },
        {
            day: 25, triggered: false, chapter: '🫁 BIẾN CỐ · NGÀY 25', title: 'Máy <span style="color:#ff4444">Trợ Thở</span>',
            text: 'Phổi của bà bị ảnh hưởng sau cơn đột quỵ. Cần một chiếc máy trợ thở cá nhân để bà có thể về nhà điều trị ngoại trú.\n\n"Chiếc máy này sẽ giúp bà ngủ ngon hơn và tránh nguy cơ suy hô hấp về đêm."\n\n<em style="color:rgba(255,180,180,.7)">Minh lại lao ra đường, những cuốc xe xuyên đêm bắt đầu...</em>',
            extraGoal: 50000000, sound: 'event'
        }
    ]
};
function resetLvEvents(storyKey) {
    if (LV_EVENTS[storyKey]) LV_EVENTS[storyKey].forEach(function (e) { e.triggered = false; });
}
function checkEvents() {
    var lvs = getLvs(), story = lvs[G.level] ? lvs[G.level].story : null;
    if (!story) return;
    var evs = LV_EVENTS[story] || [];
    evs.forEach(function (ev) {
        if (!ev.triggered && G.day >= ev.day) { ev.triggered = true; setTimeout(function () { showStoryEvent(ev); }, 300); }
    });
}
function showStoryEvent(ev) {
    if (!ev) return;
    SFX.anxiety(); SFX.event();
    var newGoal = G.goal + ev.extraGoal;
    document.getElementById('evChapter').textContent = ev.chapter;
    document.getElementById('evTitle').innerHTML = ev.title;
    document.getElementById('evText').textContent = ev.text.replace(/<[^>]+>/g, '');
    // keep HTML in text
    document.getElementById('evText').innerHTML = ev.text;
    document.getElementById('evVal').textContent = '+' + fmt(ev.extraGoal);
    document.getElementById('evNew').textContent = T('evNewGoal') + fmt(newGoal) + ' (' + T('goalWord') + Math.max(0, G.maxDays - G.day) + T('evDaysLeft');
    G.goal = newGoal;
    G.evOpen = true;
    document.getElementById('evOverlay').classList.add('on');
    updateHUD();
}
function closeEvent() {
    G.evOpen = false;
    document.getElementById('evOverlay').classList.remove('on');
    SFX.click();
}

// ── ROUTING ─────────────────────────────────────────
function go(s) {
    document.querySelectorAll('.screen').forEach(function (el) { el.classList.remove('active'); });
    G.scr = s;
    
    var itip = document.getElementById('itip');
    var chint = document.querySelector('.chint');
    if (itip) itip.style.display = (s === 'game') ? 'block' : 'none';
    if (chint) chint.style.display = (s === 'game') ? 'block' : 'none';

    var bgm = document.getElementById('bgMusic');
    if (bgm && CFG.musicOn) {
        if (bgm.paused) {
            bgm.volume = CFG.musicVol * 0.3;
            bgm.play().catch(function(e){});
        }
    } else if (bgm && !CFG.musicOn) {
        bgm.pause();
    }

    var aiChat = document.getElementById('aiChat');
    if (aiChat) {
        if (s === 'menu') aiChat.style.display = 'none';
        else if (s === 'ai') aiChat.style.display = 'flex';
    }

    if (s === 'menu') {
        document.getElementById('mainMenu').classList.add('active');
        startAmbient('menu');
        initHearts();
    }
    else if (s === 'story') { document.getElementById('storyScreen').classList.add('active'); stopAmbient(); }
    else if (s === 'game') { document.getElementById('gameScreen').classList.add('active'); startAmbient('office'); updateHUD(); requestAnimationFrame(gameLoop); }
    else if (s === 'ai') { document.getElementById('aiScreen').classList.add('active'); stopAmbient(); }
    else if (s === 'news') { document.getElementById('newsScreen').classList.add('active'); stopAmbient(); }
    else if (s === 'settings') { document.getElementById('settingsScreen').classList.add('active'); }
    else if (s === 'appContent') { document.getElementById('appContentScreen').classList.add('active'); stopAmbient(); }
}

// ── HEART PARTICLES ─────────────────────────────────
var _hpTimer = null;
function initHearts() {
    if (_hpTimer) return;
    _hpTimer = setInterval(function () {
        if (G.scr !== 'menu') return;
        createHeart();
    }, 600);
}
function createHeart() {
    var container = document.getElementById('hp-container');
    if (!container) return;
    var h = document.createElement('div');
    h.className = 'hp-heart';
    var startX = Math.random() * 100;
    var size = 4 + Math.random() * 8; // Smaller for dots
    var duration = 10 + Math.random() * 20;
    var sway = (Math.random() - 0.5) * 200;
    var color = Math.random() > 0.5 ? 'rgba(0, 212, 180, 0.4)' : 'rgba(255, 85, 0, 0.4)';
    var glow = color.replace('0.4', '0.7');

    h.style.left = startX + '%';
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.animationDuration = duration + 's';
    h.style.setProperty('--sway', sway + 'px');
    h.style.background = color;
    h.style.boxShadow = '0 0 15px ' + glow;

    container.appendChild(h);
    setTimeout(function () { h.remove(); }, duration * 1000);
}
function backToMenu() { SFX.click(); stopAlarm(); stopHeartbeat(); closeM(); cancelAnimationFrame(G._raf); if (typeof PixelIntro !== 'undefined') PixelIntro.destroy(); var ss = document.getElementById('storyScreen'); if (ss) ss.classList.remove('pixel-intro-active'); go('menu'); }
function openAI() { 
    SFX.click(); 
    var modal = document.getElementById('aiDisclaimerModal');
    if(modal) {
        modal.classList.add('open');
        var cb = document.getElementById('disclaimerCheck');
        var btn = document.getElementById('disclaimerBtn');
        if(cb) cb.checked = false;
        if(btn) { btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed'; }
    } else {
        SFX.aibeep();
        go('ai'); 
    }
}
function agreeAIDisclaimer() {
    SFX.aibeep();
    var modal = document.getElementById('aiDisclaimerModal');
    if(modal) modal.classList.remove('open');
    go('ai');
}
function closeAIDisclaimer() {
    SFX.click();
    var modal = document.getElementById('aiDisclaimerModal');
    if(modal) modal.classList.remove('open');
}
function toggleAIDisclaimerBtn() {
    var cb = document.getElementById('disclaimerCheck');
    var btn = document.getElementById('disclaimerBtn');
    if(cb && btn) {
        btn.disabled = !cb.checked;
        btn.style.opacity = cb.checked ? '1' : '0.5';
        btn.style.cursor = cb.checked ? 'pointer' : 'not-allowed';
    }
}
function openNews() { SFX.click(); renderNews(); go('news'); }
var MEDICAL_NEWS_POOL = [
    { id: 1, title: "Tắm đêm: Thói quen 'sát thủ' gây đột quỵ ở người trẻ", desc: "Các chuyên gia cảnh báo việc tắm nước lạnh sau 10 giờ đêm làm co mạch máu đột ngột, tăng nguy cơ nhồi máu não lên gấp 3 lần.", img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Cơ chế gây đột quỵ:</b> Khi nhiệt độ cơ thể thay đổi đột ngột do tiếp xúc với nước lạnh vào ban đêm, hệ thần kinh giao cảm bị kích thích mạnh mẽ. Mạch máu ngoại vi co rút lại đột ngột khiến huyết áp tăng vọt. Sự gia tăng áp lực này có thể làm vỡ các vi mạch máu trong não hoặc làm bong tróc các mảng xơ vữa động mạch, tạo thành huyết khối (cục máu đông) di chuyển lên não và gây tắc nghẽn.</p><p><b>Khuyến cáo y khoa:</b> Tuyệt đối không tắm nước lạnh sau 22h, đặc biệt với những người có tiền sử bệnh tim mạch, huyết áp cao, hoặc đang trong tình trạng căng thẳng, mệt mỏi cao độ.</p>" },
    { id: 2, title: "Phát hiện sớm 5 dấu hiệu Cơn thiếu máu não cục bộ (TIA)", desc: "Mờ mắt, nói đớ, tê yếu tay chân thoáng qua không phải là trúng gió. Đây là lời cảnh báo cuối cùng trước cơn đột quỵ tàn khốc.", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Định nghĩa y khoa:</b> TIA (Cơn thiếu máu não cục bộ thoáng qua) là tình trạng ngừng cung cấp máu tạm thời cho một phần của não. Dù các triệu chứng thường tự biến mất trong vòng 24 giờ, nhưng đây là <i>lời cảnh báo đỏ</i>: 1 trong 3 người bị TIA sẽ gặp phải cơn đột quỵ thực sự trong thời gian ngắn sau đó.</p><p><b>Dấu hiệu nhận biết cốt lõi:</b></p><ul><li>Tê yếu đột ngột một bên mặt, tay hoặc chân.</li><li>Nói đớ, khó diễn đạt hoặc khó hiểu lời người khác nói.</li><li>Đột ngột mờ mắt một hoặc cả hai bên.</li><li>Mất thăng bằng, chóng mặt không rõ nguyên nhân.</li></ul><p><b>Hành động:</b> Ngay cả khi triệu chứng đã qua, bệnh nhân cần được đưa đến chuyên khoa tim mạch - thần kinh để tầm soát nguyên nhân (như rung nhĩ, hẹp động mạch cảnh) ngay lập tức.</p>" },
    { id: 3, title: "Ăn quá mặn: Kẻ thù số 1 của Huyết Áp và Mạch Máu", desc: "WHO khuyến cáo người Việt đang ăn muối gấp đôi tiêu chuẩn, dẫn đến nguy cơ vỡ mạch máu não và xơ vữa động mạch.", img: "https://images.unsplash.com/photo-1615486171448-4fd6d17b5880?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Tác động sinh lý:</b> Lượng Natri (thành phần chính của muối) dư thừa trong máu làm tăng thẩm thấu nước vào lòng mạch, làm tăng thể tích tuần hoàn. Điều này buộc tim phải bơm mạnh hơn, làm tăng áp lực lên thành mạch, dẫn đến cao huyết áp mạn tính.</p><p><b>Hậu quả tim mạch & đột quỵ:</b> Huyết áp cao kéo dài làm tổn thương lớp nội mạc mạch máu, tạo điều kiện cho cholesterol xấu (LDL) lắng đọng, hình thành mảng xơ vữa. Khi mảng xơ vữa này vỡ ra, cục máu đông sẽ hình thành và bít tắc động mạch vành (gây nhồi máu cơ tim) hoặc động mạch não (gây nhồi máu não).</p><p><b>Khuyến nghị:</b> Giảm lượng muối tiêu thụ xuống dưới 5g/ngày (khoảng 1 muỗng cà phê).</p>" },
    { id: 4, title: "Cứu sống nam thanh niên 28 tuổi nhồi máu cơ tim do cày game", desc: "Thức trắng 2 đêm liên tục kết hợp hút thuốc lá, bệnh nhân nhập viện trong tình trạng tim ngừng đập, ngực đau thắt dữ dội.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Phân tích ca lâm sàng:</b> Bệnh nhân 28 tuổi, tiền sử hút thuốc lá, có lối sống ít vận động và thường xuyên thức khuya chơi game. Tình trạng căng thẳng kéo dài (stress do game) giải phóng adrenaline và cortisol, làm tăng nhịp tim và co thắt mạch vành. Kết hợp với sự tăng đông máu do ngồi lâu và hóa chất từ thuốc lá, một cục máu đông đã hình thành, bít tắc hoàn toàn nhánh liên thất trước của động mạch vành trái.</p><p><b>Bài học cảnh tỉnh:</b> Nhồi máu cơ tim không còn là bệnh của người già. Bất kỳ ai duy trì lối sống độc hại (thức khuya, ngồi lâu, stress liên tục, hút thuốc) đều đang kích hoạt quả bom nổ chậm trong chính hệ tim mạch của mình.</p>" },
    { id: 5, title: "Quy tắc F.A.S.T: Cứu mạng người bị Đột quỵ trong 'Thời gian vàng'", desc: "Chỉ có 3 đến 4 giờ để sử dụng thuốc tiêu sợi huyết. Nắm vững quy tắc FAST để nhận diện và gọi 115 ngay lập tức.", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Quy tắc nhận diện Đột Quỵ (Stroke):</b></p><ul><li><b>F - Face (Mặt):</b> Yêu cầu người bệnh cười. Quan sát xem một bên mặt có bị xệ xuống, mất nếp nhăn mũi má hay không.</li><li><b>A - Arms (Tay):</b> Yêu cầu giơ hai tay lên cao. Quan sát xem một bên tay có rớt xuống hoặc không thể giơ lên được hay không.</li><li><b>S - Speech (Lời nói):</b> Yêu cầu nói một câu đơn giản. Chú ý xem giọng có bị đớt, líu nhíu, hoặc không thể nói được không.</li><li><b>T - Time (Thời gian):</b> Khi thấy BẤT KỲ dấu hiệu nào ở trên, thời gian là não tủy. Gọi ngay 115. TUYỆT ĐỐI KHÔNG cạo gió, chích máu 10 đầu ngón tay hay cho bệnh nhân uống thuốc không rõ nguồn gốc.</li></ul><p>Mỗi phút trôi qua khi não bị thiếu máu, khoảng 2 triệu tế bào thần kinh sẽ chết vĩnh viễn.</p>" },
    { id: 6, title: "Tại sao tỷ lệ đột quỵ ở người 20-30 tuổi tăng vọt 30%?", desc: "Lối sống ít vận động, áp lực công việc (stress) và thói quen tiêu thụ thức ăn nhanh, nước tăng lực là nguyên nhân chính.", img: "https://images.unsplash.com/photo-1498837167922-41c53b310968?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Góc nhìn chuyên môn tim mạch:</b> Đột quỵ trẻ hóa xuất phát từ sự tích lũy sớm các yếu tố nguy cơ. Giới trẻ hiện đại đối mặt với 'Hội chứng chuyển hóa' bao gồm: béo phì trung tâm, rối loạn mỡ máu, huyết áp cao và kháng insulin. Những yếu tố này phá hủy lớp nội mạc mạch máu từ rất sớm.</p><p>Ngoài ra, dị dạng mạch máu não bẩm sinh (như phình động mạch) kết hợp với những đợt stress cấp tính hoặc lạm dụng chất kích thích (rượu, bia, thuốc lá, thức uống tăng lực chứa hàm lượng caffeine cao) sẽ làm tăng huyết áp kịch phát, dẫn đến vỡ mạch máu (đột quỵ xuất huyết).</p>" },
    { id: 7, title: "Phân biệt Nhồi máu cơ tim và Đột quỵ: 2 sát thủ thầm lặng", desc: "Dù cùng gây ra bởi cục máu đông, nhồi máu cơ tim khiến đau thắt ngực, trong khi đột quỵ gây liệt mặt và yếu liệt chi.", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Sự khác biệt cốt lõi:</b></p><ul><li><b>Nhồi máu cơ tim (Heart Attack):</b> Xảy ra khi động mạch vành (cung cấp máu nuôi tim) bị tắc nghẽn. <i>Triệu chứng đặc trưng:</i> Đau thắt ngực trái dữ dội, cảm giác như bị đá tảng đè lên ngực, cơn đau lan ra cánh tay trái, lên hàm hoặc ra sau lưng, kèm vã mồ hôi hột, khó thở.</li><li><b>Đột quỵ (Stroke):</b> Xảy ra khi mạch máu nuôi não bị bít tắc hoặc vỡ. <i>Triệu chứng đặc trưng:</i> Không nhất thiết phải đau (trừ xuất huyết não có thể gây đau đầu dữ dội), nhưng gây mất chức năng thần kinh đột ngột như liệt nửa người, méo miệng, mất ngôn ngữ.</li></ul><p>Cả hai đều là tình trạng cấp cứu y tế tối khẩn cấp, yêu cầu sự can thiệp của các bác sĩ chuyên khoa trong 'thời gian vàng'.</p>" },
    { id: 8, title: "Tác hại kinh hoàng của Thức Khuya đến Nhịp Tim", desc: "Nghiên cứu mới nhất từ AHA chỉ ra thức sau 12h đêm liên tục làm tăng nguy cơ rung nhĩ và ngưng tim đột ngột.", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Ảnh hưởng lên hệ tim mạch:</b> Giấc ngủ là thời gian để hệ tim mạch nghỉ ngơi, nhịp tim và huyết áp tự nhiên hạ thấp. Thức khuya tước đi quá trình phục hồi này. Thiếu ngủ mạn tính làm rối loạn nhịp sinh học, tăng cường hoạt động của hệ thần kinh giao cảm và trục vùng dưới đồi - tuyến yên - tuyến thượng thận, dẫn đến việc sản sinh dư thừa hormone stress.</p><p>Hậu quả là tim đập nhanh hơn, mạch máu co lại, huyết áp tăng, thúc đẩy quá trình xơ vữa động mạch và làm tăng nguy cơ xuất hiện các cơn <i>rung nhĩ</i> – nguyên nhân hàng đầu tạo cục máu đông gây đột quỵ não.</p>" },
    { id: 9, title: "Rung nhĩ: Bệnh lý nhịp tim nguy hiểm gây đột quỵ lớn gấp 5 lần", desc: "Trái tim đập không đều khiến máu ứ đọng tạo cục máu đông, bắn lên não gây tắc nghẽn mạch máu não toàn phần.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Cơ chế tạo huyết khối:</b> Rung nhĩ là một loại rối loạn nhịp tim phổ biến, trong đó hai tâm nhĩ (buồng trên của tim) đập loạn xạ, không đồng bộ với hai tâm thất. Do tim co bóp không hiệu quả, máu không được bơm đi hết mà ứ đọng lại ở tiểu nhĩ trái.</p><p>Máu ứ đọng rất dễ đông lại thành cục máu đông. Khi cục máu đông này bong ra, nó sẽ trôi theo dòng máu, đi qua động mạch cảnh lên não. Kích thước cục máu đông từ tim thường lớn, gây tắc nghẽn các động mạch não lớn, dẫn đến hậu quả tàn phế rất nặng nề hoặc tử vong nhanh chóng.</p>" },
    { id: 10, title: "Uống thuốc Huyết áp lúc nào là tốt nhất để phòng Đột quỵ?", desc: "Nhiều bệnh nhân bỏ thuốc khi thấy khỏe mạnh, dẫn đến cơn tăng huyết áp kịch phát làm đứt mạch máu não.", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Tầm quan trọng của việc tuân thủ thuốc:</b> Cao huyết áp được ví như 'kẻ giết người thầm lặng' vì hiếm khi có triệu chứng rõ ràng. Khi cảm thấy khỏe mạnh không có nghĩa là huyết áp đã ổn định. Bỏ thuốc đột ngột có thể gây hiệu ứng dội ngược, làm huyết áp tăng vọt bất ngờ, đánh vỡ các mạch máu nhỏ trong não (đột quỵ xuất huyết).</p><p><b>Thời điểm vàng:</b> Khuyến cáo hiện đại cho thấy việc uống thuốc huyết áp vào buổi tối trước khi đi ngủ có thể mang lại hiệu quả bảo vệ tốt hơn đối với tim mạch, vì giúp kiểm soát huyết áp vào ban đêm và sáng sớm (thời điểm dễ xảy ra biến cố đột quỵ nhất). Tuy nhiên, bệnh nhân CẦN tuân thủ tuyệt đối chỉ định của bác sĩ điều trị.</p>" },
    { id: 11, title: "Ngồi lì liên tục >4 tiếng mỗi ngày: Cảnh báo huyết khối tĩnh mạch", desc: "Dân văn phòng chú ý: Máu đông có thể hình thành ở chân, di chuyển lên phổi và tim gây thuyên tắc phổi tử vong ngay lập tức.", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Hội chứng hạng phổ thông (Economy Class Syndrome):</b> Không chỉ xảy ra trên máy bay, việc ngồi làm việc liên tục trước máy tính mà không đứng dậy vận động khiến máu ở chi dưới bị ứ trệ. Trọng lực làm máu khó quay trở về tim, tạo điều kiện hình thành huyết khối tĩnh mạch sâu (DVT).</p><p><b>Nguy cơ thuyên tắc phổi:</b> Khi người bệnh đột ngột đứng lên, cục máu đông ở chân có thể vỡ ra, đi ngược về tĩnh mạch chủ dưới, qua tim phải và bị kẹt lại ở động mạch phổi. Thuyên tắc phổi cấp là biến chứng tim mạch cực kỳ nguy hiểm, có thể gây ngừng tim và tử vong trong vài phút.</p>" },
    { id: 12, title: "Sự thật về 'Chích máu đầu ngón tay' khi đột quỵ", desc: "Giới y khoa khẳng định đây là phương pháp phản khoa học, làm lỡ mất thời gian vàng và khiến bệnh nhân chết não nhanh hơn.", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Giải mã tin đồn thất thiệt:</b> Chích máu 10 đầu ngón tay, vắt chanh vào miệng hay cạo gió là những sai lầm chết người thường gặp trong sơ cứu đột quỵ. Việc chích máu gây đau đớn khiến huyết áp bệnh nhân tăng vọt, làm tình trạng xuất huyết não (nếu có) trở nên tồi tệ hơn rất nhiều.</p><p>Hơn nữa, những thao tác vô ích này làm mất đi <i>'thời gian vàng' (dưới 4.5 giờ kể từ khi phát bệnh)</i> - thời điểm mà các bác sĩ có thể sử dụng thuốc tiêu sợi huyết (rTPA) để làm tan cục máu đông, cứu sống vùng não đang hấp hối. Hành động duy nhất đúng đắn là: Gọi ngay cấp cứu 115.</p>" },
    { id: 13, title: "Mùa nắng nóng cực đoan: Số ca đột quỵ não nhập viện tăng gấp đôi", desc: "Chênh lệch nhiệt độ giữa phòng điều hòa và ngoài trời khiến mạch máu giãn nở và co thắt liên tục, dễ dẫn đến vỡ mạch.", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Sốc nhiệt và tim mạch:</b> Nhiệt độ cao khiến cơ thể mất nước qua mồ hôi, làm giảm thể tích tuần hoàn và khiến máu trở nên đặc hơn, dễ hình thành huyết khối. Đồng thời, việc bước từ phòng điều hòa lạnh (18-20 độ C) ra môi trường nắng nóng (38-40 độ C), hoặc ngược lại, bắt buộc hệ thống mạch máu ngoại vi phải co giãn quá nhanh để điều hòa thân nhiệt.</p><p>Sự dao động huyết áp dữ dội này có thể vượt quá khả năng chịu đựng của các mạch máu yếu, đặc biệt ở người lớn tuổi hoặc người bị xơ vữa động mạch, dẫn tới đứt mạch máu não.</p>" },
    { id: 14, title: "Stress công việc: Liều thuốc độc từ từ hủy hoại trái tim bạn", desc: "Áp lực deadline sản sinh liên tục hormone cortisol, gây xơ cứng động mạch và tăng nhịp tim bất thường ở giới trẻ.", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400&h=200", content: "<p><b>Cơ chế tổn thương do Stress mạn tính:</b> Khác với stress cấp tính (nhanh chóng qua đi), áp lực công việc triền miên duy trì nồng độ hormone cortisol và adrenaline ở mức cao trong máu suốt thời gian dài. Hệ quả là tăng tình trạng viêm hệ thống, làm tổn thương màng trong của mạch máu.</p><p>Đồng thời, stress thường đi kèm với các thói quen xấu bồi thêm để 'giảm căng thẳng' như: hút thuốc, uống rượu bia, ăn thức ăn nhanh nhiều dầu mỡ và lười vận động. Tất cả tạo thành một vòng luẩn quẩn tàn phá sức khỏe tim mạch, đưa người trẻ tiến nhanh tới bờ vực của chứng Nhồi máu cơ tim cấp.</p>" }
];

async function renderNews() {
    var grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div style="width:100%; text-align:center; padding: 40px; color: #00d4b4; grid-column: 1 / -1;"><p style="font-size:24px; animation: pulseGlow 1.5s infinite alternate;">📡 Đang tải kiến thức y khoa...</p></div>';

    // Simulate network delay to give a "reload" feel
    await new Promise(r => setTimeout(r, 600));

    // Shuffle the medical news pool
    var shuffled = MEDICAL_NEWS_POOL.slice().sort(function() { return 0.5 - Math.random() });
    var items = shuffled.slice(0, 9); // Show 9 items
    
    var html = '';
    items.forEach(function (a) {
        var d = new Date();
        d.setMinutes(d.getMinutes() - Math.floor(Math.random() * 300)); // Random past time today
        var dateStr = d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});

        html += '<div class="news-card" onclick="openMedicalReport(' + a.id + ')">' +
            '<div class="news-img-wrap">' +
            '<img src="' + a.img + '" alt="news">' +
            '<div class="news-badge" style="background:#cc2222;font-weight:bold;">Y KHOA CHUYÊN SÂU</div></div>' +
            '<div class="news-info"><h3 style="font-size:16px; margin-bottom:10px; color:#fff; font-weight:bold;">' + a.title + '</h3><p style="font-size:13px; color:#aaa; margin-bottom:15px; line-height: 1.5;">' + a.desc + '</p><div class="news-more" style="color:#ffcc00;">' + dateStr + ' →</div></div>' +
            '</div>';
    });
    grid.innerHTML = html;
}

function openMedicalReport(id) {
    SFX.click();
    var report = MEDICAL_NEWS_POOL.find(function(r) { return r.id === id; });
    if (!report) return;
    
    var contentHtml = '<div style="text-align:left; color:#ccc; line-height:1.6; font-size:14px; padding: 10px; max-height: 60vh; overflow-y: auto;">' +
        '<img src="' + report.img + '" style="width:100%; max-height: 200px; object-fit: cover; border-radius:8px; margin-bottom:15px; box-shadow:0 4px 15px rgba(0,0,0,0.5);">' +
        '<div style="font-size:12px; color:#ffcc00; margin-bottom:15px; font-weight:bold; letter-spacing: 1px;">BÁO CÁO Y KHOA: TIM MẠCH & ĐỘT QUỴ</div>' +
        report.content +
        '</div>' +
        '<button class="bok" onclick="closeM()" style="width:100%; margin-top:15px;">ĐÃ HIỂU</button>';
        
    showM(report.title, contentHtml);
}
function openSettings() { SFX.click(); go('settings'); }
function openAppContent() { SFX.click(); go('appContent'); }
function saveSettings() { SFX.win(); go('menu'); }
function setDiff(d, btn) {
    CFG.diff = d;
    // Only reset difficulty buttons (first .diff-grp), not language buttons
    var diffGrp = document.querySelectorAll('.diff-grp')[0];
    if (diffGrp) diffGrp.querySelectorAll('.diff-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('diffDesc').textContent = getDiffDesc();
    SFX.click();
}

// ── STORIES ─────────────────────────────────────────
var STORIES = {
    daughter: {
        chapter: 'Chương 1 · Người Cha', title: 'Vì <span style="color:#ffd700">Con Gái</span> Nhỏ',
        text: 'Minh, 38 tuổi, nhân viên văn phòng bình thường.\n\nCon gái anh — bé Linh, 7 tuổi — vừa được chẩn đoán cần phẫu thuật tim bẩm sinh. Bác sĩ nói: không thể chờ.\n\nChi phí ban đầu: <b style="color:#ffd700">50,000,000đ</b>. Bảo hiểm không đủ. Người thân không có. Thời hạn: 32 ngày.\n\n<em style="color:rgba(200,180,180,.7)">"Ba sẽ lo được con ơi..." — anh nói, giọng run. Rồi bắt đầu làm thêm ca.</em>'
    },
    debt: {
        chapter: 'Chương 2 · Áp Lực', title: 'Khoản Nợ <span style="color:#ff4444">Không Hồi Kết</span>',
        text: 'Tiền phẫu thuật đã lo xong. Linh đã ổn.\n\nNhưng để trả kịp tháng trước, Minh đã vay tín dụng đen từ một người quen quen. Lãi 28%/tháng. Anh không đọc kỹ hợp đồng.\n\nSố tiền cần trả: <b style="color:#ffd700">95,000,000đ</b>. Thời hạn 36 ngày — "sau đó tụi tôi sẽ ghé nhà anh".\n\n<em style="color:rgba(200,180,180,.7)">Anh ngủ 3 tiếng mỗi đêm. Mắt đỏ hoe. Nhưng không có lựa chọn.</em>'
    },
    hospital: {
        chapter: 'Chương 3 · Ranh Giới', title: 'Căn Phòng <span style="color:#e63946">Cuối Hành Lang</span>',
        text: 'Nợ đã trả. Minh thở phào — được hai ngày.\n\nMẹ anh gọi điện, giọng nhẹ nhàng như thường: "Con không cần lo." Nhưng anh đến bệnh viện. Kết quả: ung thư giai đoạn 2.\n\nChi phí điều trị: <b style="color:#ffd700">185,000,000đ</b>. Bác sĩ nói còn 40 ngày để bắt đầu phác đồ tốt nhất.\n\n<em style="color:rgba(200,180,180,.7)">"Lần này khác. Minh hiểu rõ hơn — tiền có thể kiếm lại. Nhưng mẹ thì không."</em>'
    },
    shipper: {
        chapter: 'Chương 4 · Người Con Hiếu Thảo', title: 'Anh Shipper <span style="color:#fbbf24">Chăm Mẹ</span> Đột Quỵ',
        text: 'Minh đã vượt qua tất cả. Tiền chữa bệnh cho mẹ đã nộp.\\n\\nNhưng sau ca phẫu thuật, mẹ bị di chứng đột quỵ nặng — liệt nửa người, ngồi xe lăn, cần tập vật lý trị liệu mỗi ngày.\\n\\nViện phí tái khám + vật lý trị liệu + thuốc hàng tháng: <b style="color:#ffd700">250,000,000đ</b>. Thời hạn: 45 ngày.\\n\\nAnh tranh thủ sau giờ làm về đút cơm cho mẹ, chải tóc, tập đi từng bước.\\n\\n<em style="color:rgba(200,180,180,.7)">"Từng phút được ở cạnh mẹ lúc này đều rất quý giá." — Lấy cảm hứng từ câu chuyện có thật (Thanh Niên, 2026).</em>'
    }
};
function openCharacterSelect() {
    var html = '<div style="text-align:center;margin-bottom:15px;color:#ccc;font-size:14px">Vui lòng chọn nhân vật bạn muốn nhập vai:</div>';
    html += '<div style="display:flex;gap:15px;justify-content:center;margin-bottom:20px;">';
    
    // Nam (Minh)
    html += '<div style="flex:1;background:rgba(255,255,255,0.05);border:2px solid #3b82f6;border-radius:12px;padding:15px;cursor:pointer;transition:all 0.2s" onclick="selectCharacter(\'minh\')" onmouseover="this.style.background=\'rgba(59,130,246,0.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'">';
    html += '<div style="font-size:40px;margin-bottom:10px;text-align:center">👨‍💼</div>';
    html += '<h3 style="color:#3b82f6;margin-bottom:5px;font-size:16px;text-align:center">MINH (NAM)</h3>';
    html += '<p style="font-size:11px;color:#aaa;line-height:1.4;text-align:center">Nhân viên văn phòng. Trụ cột gia đình đang gánh chịu áp lực viện phí và nợ nần.</p>';
    html += '</div>';

    // Nữ (Lan)
    html += '<div style="flex:1;background:rgba(255,255,255,0.05);border:2px solid #ec4899;border-radius:12px;padding:15px;cursor:pointer;transition:all 0.2s" onclick="selectCharacter(\'lan\')" onmouseover="this.style.background=\'rgba(236,72,153,0.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'">';
    html += '<div style="font-size:40px;margin-bottom:10px;text-align:center">👩‍👧</div>';
    html += '<h3 style="color:#ec4899;margin-bottom:5px;font-size:16px;text-align:center">LAN (NỮ)</h3>';
    html += '<p style="font-size:11px;color:#aaa;line-height:1.4;text-align:center">Người mẹ đơn thân. Làm mọi công việc vất vả để lo cho con gái nhỏ và cha già.</p>';
    html += '</div>';

    // Sinh viên (Hùng)
    html += '<div style="flex:1;background:rgba(255,255,255,0.05);border:2px solid #34d399;border-radius:12px;padding:15px;cursor:pointer;transition:all 0.2s" onclick="selectCharacter(\'hung\')" onmouseover="this.style.background=\'rgba(52,211,153,0.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'">';
    html += '<div style="font-size:40px;margin-bottom:10px;text-align:center">🧑‍🎓</div>';
    html += '<h3 style="color:#34d399;margin-bottom:5px;font-size:16px;text-align:center">HÙNG (HSSV)</h3>';
    html += '<p style="font-size:11px;color:#aaa;line-height:1.4;text-align:center">Sinh viên nghèo. Vừa học vừa làm cật lực để lo cho em gái ăn học và cha bệnh.</p>';
    html += '</div>';
    
    // Nam béo phì (Khánh)
    html += '<div style="flex:1;background:rgba(255,255,255,0.05);border:2px solid #a855f7;border-radius:12px;padding:15px;cursor:pointer;transition:all 0.2s" onclick="selectCharacter(\'khanh\')" onmouseover="this.style.background=\'rgba(168,85,247,0.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'">';
    html += '<div style="font-size:40px;margin-bottom:10px;text-align:center">🏃‍♂️</div>';
    html += '<h3 style="color:#a855f7;margin-bottom:5px;font-size:16px;text-align:center">KHÁNH (CÔNG SỞ)</h3>';
    html += '<p style="font-size:11px;color:#aaa;line-height:1.4;text-align:center">Thừa cân, hay bị đồng nghiệp soi mói. Đang phấn đấu giảm cân và thăng chức.</p>';
    html += '</div>';

    html += '</div>';
    html += '<button class="bok" onclick="closeM()" style="width:100%">QUAY LẠI</button>';

    showM('CHỌN NHÂN VẬT', html);
}

function selectCharacter(char) {
    G.character = char;
    closeM();
    openStory();
}

function openStory() {
    SFX.story();
    G.level = 0; G.day = 1; G.hour = 6; G.energy = 100; G.hoursAwake = 0; G.money = 0; G.hp = 100; G.fatigue = 0; G.coffeeToday = 0; G.sleptYesterday = false; G.timeUpdating = false; G.inventory = []; G.hunger = 100; G.knowledge = 0; G.relWife = 0; G.relDaughter = 0;
    G.aiDeathWarned = false;

    // Mission tracking counters
    G.totalOvertimeHours = 0;
    G.totalDoctorVisits = 0;
    G.totalExercise = 0;
    G.totalSewingJobs = 0;
    G.totalOnlineSales = 0;
    G.totalShipperRuns = 0;
    G.totalFreelanceCode = 0;
    G.totalGymSessions = 0;

    // Clear any lingering danger UI from previous run
    var v = document.getElementById('vig');
    if (v) v.className = 'vig';
    stopAlarm(); stopHeartbeat();

    // Reset and initialize character-specific missions
    initMissions();

    // Nhân vật đã được chọn từ openCharacterSelect(), lưu trong G.character

    // Khanh specific state
    if (G.character === 'khanh') {
        G.khanhWeight = 100.0;
        G.gymTime = 3000;
        G.bossRel = 0;
        G.khanhTasksDone = 0;
        document.getElementById('weightContainer').style.display = 'flex';
        var wv = document.getElementById('weightV');
        if (wv) wv.textContent = '100.0 kg';
        var wb = document.getElementById('weightB');
        if (wb) wb.style.width = '100%';
    } else {
        document.getElementById('weightContainer').style.display = 'none';
    }

    // Random Life Factors
    G.lifeFactors = {
        economicStatus: Math.random() < 0.3 ? 'poor' : (Math.random() < 0.8 ? 'average' : 'rich'),
        environment: Math.random() < 0.3 ? 'polluted' : (Math.random() < 0.8 ? 'normal' : 'clean'),
        baseHealth: Math.random() < 0.3 ? 'low' : (Math.random() < 0.8 ? 'medium' : 'high')
    };

    if (G.lifeFactors.economicStatus === 'poor') { G.money = 0; G.fatigue += 15; }
    if (G.lifeFactors.baseHealth === 'low') { G.hp = 80; }
    if (G.lifeFactors.baseHealth === 'high') { G.hp = 120; }

    var lvs = getLvs();
    G.goal = lvs[0].goal; G.maxDays = lvs[0].days;
    resetLvEvents(lvs[0].story);
    showStoryScreen(lvs[0].story, lvs[0]);
}
function showStoryScreen(s, lv) {
    go('story');
    var storyKey = 'story' + s.charAt(0).toUpperCase() + s.slice(1);
    if (G.character === 'lan') storyKey += '_female';
    if (G.character === 'hung') storyKey += '_hung';
    if (G.character === 'khanh') storyKey += '_khanh';
    var storyData = I18N[CFG.lang][storyKey] || I18N[CFG.lang]['story' + s.charAt(0).toUpperCase() + s.slice(1)] || STORIES[s];

    var sdCloned = { chapter: storyData.chapter, title: storyData.title, text: storyData.text };

    var extraText = "";
    if (G.lifeFactors) {
        if (G.lifeFactors.economicStatus === 'poor') extraText += "Bạn sinh ra trong hoàn cảnh khó khăn (-tiền/mệt). ";
        if (G.lifeFactors.environment === 'polluted') extraText += "Môi trường sống ô nhiễm (Hại sức khỏe). ";
        if (G.lifeFactors.baseHealth === 'low') extraText += "Sức khỏe bẩm sinh yếu. ";
        if (extraText !== "") {
            sdCloned.text += '\n\n<em style="color:#ffcc00">[ Cuộc đời ngẫu nhiên: ' + extraText + ']</em>';
        }
    }

    // Store current story/level for startGameFromStory
    G._currentStory = s;
    G._currentLv = lv;

    // Try pixel art intro
    var pixelCanvas = document.getElementById('pixelIntroCanvas');
    if (pixelCanvas && typeof PixelIntro !== 'undefined') {
        document.getElementById('storyScreen').classList.add('pixel-intro-active');
        PixelIntro.init(pixelCanvas, sdCloned, lv, function () {
            document.getElementById('storyScreen').classList.remove('pixel-intro-active');
            startGameFromStory();
        });
        return;
    }

    // Fallback: original text story
    document.getElementById('storyScroll').innerHTML =
        '<div class="story-chapter">' + sdCloned.chapter + '</div>' +
        '<div class="story-title">' + sdCloned.title + '</div>' +
        '<div class="story-text">' + sdCloned.text.replace(/\\n/g, '<br>') + '</div>' +
        '<div class="story-goal">' +
        '<div class="goal-lbl">' + T('goalLabel') + '</div>' +
        '<div class="goal-val">' + fmt(lv.goal) + '</div>' +
        '<div class="goal-sub">' + T('goalSub1') + lv.days + T('goalSub2') + getDiffLabel() + '</div>' +
        '</div>';
    document.getElementById('storyControls').innerHTML =
        '<button class="story-btn" onclick="startGameFromStory()">' + T('storyStart') + '</button>' +
        '<button class="story-btn sec" onclick="backToMenu()">' + T('storyBack') + '</button>';
    animStoryBg();
}
function startGameFromStory() {
    if (typeof PixelIntro !== 'undefined') PixelIntro.destroy();
    SFX.click(); initWorld(); applyLang();
    if (!G.tutorialShown) {
        G.tutorialShown = true;
        showM(T('tutTitle'), '<div class="ibox" style="margin-bottom:10px"><p style="color:#00ffff;font-weight:bold">' + T('tutMove') + '</p><p>' + T('tutMoveText') + '</p></div>' +
            '<div class="ibox" style="margin-bottom:10px"><p style="color:#ffff00;font-weight:bold">' + T('tutInteract') + '</p><p>' + T('tutInteractText') + '</p></div>' +
            '<div class="gbox" style="margin-bottom:10px"><p style="color:#ffff00;font-weight:bold">' + T('tutGoal') + '</p><p>' + T('tutGoalText') + '</p></div>' +
            '<div class="ibox" style="margin-bottom:10px;border-left-color:#00ffff"><p style="color:#00ffff;font-weight:bold">' + T('tutRooms') + '</p><p>' + T('tutRoomsText') + '</p></div>' +
            '<div class="wbox" style="margin-bottom:10px"><p style="color:#ffcccc;font-weight:bold">' + T('tutHealth') + '</p><p>' + T('tutHealthText') + '</p></div>' +
            '<div class="ibox" style="margin-bottom:10px;border-left-color:#ccccff"><p style="color:#ccccff;font-weight:bold">' + T('tutNpc') + '</p><p>' + T('tutNpcText') + '</p></div>' +
            '<button class="bok gold" onclick="closeM();go(\'game\')" style="width:100%;font-size:14px;padding:14px">' + T('tutPlay') + '</button>');
    } else {
        go('game');
    }
}
var storyBgRaf;
function animStoryBg() { cancelAnimationFrame(storyBgRaf); var c = document.getElementById('storyBg'), x = c.getContext('2d'); function draw() { if (G.scr !== 'story') return; var W = c.width = window.innerWidth, H = c.height = window.innerHeight, t = Date.now() / 1000; var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#00010c'); g.addColorStop(1, '#0a0005'); x.fillStyle = g; x.fillRect(0, 0, W, H); x.strokeStyle = 'rgba(120,80,80,.15)'; x.lineWidth = 1; for (var i = 0; i < 60; i++) { var rx = ((i * 137.5 + t * 160) % W), ry = ((t * 200 + i * 83) % H); x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 2, ry + 14); x.stroke(); } storyBgRaf = requestAnimationFrame(draw); } draw(); }

// ── WORLD ───────────────────────────────────────────
// ── WORLD ───────────────────────────────────────────
function initWorld() {
    // City Layout Properties
    G.roadW = 100;

    // 1. CORE FUNCTIONAL BUILDINGS (The interactive ones)
    G.objs = [
        // TOP BLOCKS
        { x: 280, y: 200, w: 220, h: 260, t: 'doctor', lbl: 'Bệnh Viện Đa Khoa', col: '#cbd5e1', colT: '#94a3b8', winC: '#60a5fa', desc: 'Bệnh viện & Hồi phục' },
        { x: 880, y: 180, w: 180, h: 220, t: 'bg', lbl: '', col: '#475569', colT: '#334155', winC: '#60a5fa' },
        { x: 1300, y: 220, w: 240, h: 300, t: 'overtime', lbl: 'Tòa Nhà A', col: '#94a3b8', colT: '#64748b', winC: '#38bdf8', desc: 'Làm việc (+$$)' },
        { x: 2200, y: 200, w: 200, h: 280, t: 'overtime2', lbl: 'Tòa Nhà B', col: '#cbd5e1', colT: '#94a3b8', winC: '#38bdf8', desc: 'Làm dự án (+$$$)' },
        { x: 2500, y: 200, w: 220, h: 260, t: 'fastfood', lbl: 'Nhà Hàng Fast Food', col: '#ef4444', colT: '#b91c1c', winC: '#fca5a5', desc: 'Đồ ăn nhanh' },

        // MIDDLE BLOCKS
        { x: 200, y: 700, w: 160, h: 180, t: 'sleep', lbl: 'Nhà Của Minh', col: '#475569', colT: '#334155', winC: '#fbbf24', desc: 'Nghỉ ngơi & Ngủ' },
        { x: 420, y: 640, w: 140, h: 160, t: 'wardrobe', lbl: 'Tủ Đồ Nhỏ', col: '#3b82f6', colT: '#2563eb', winC: '#e0f2fe', desc: 'Tặng quà gia đình' },
        { x: 1300, y: 720, w: 260, h: 200, t: 'freelance', lbl: 'Freelance Hub', col: '#1e293b', colT: '#334155', winC: '#06b6d4', desc: 'Làm tự do (+$$)' },
        { x: 2300, y: 700, w: 280, h: 240, t: 'overtime3', lbl: 'Văn Phòng Tổng Hợp', col: '#1e293b', colT: '#0f172a', winC: '#38bdf8', desc: 'Làm đêm (+$$$$)' },

        // BOTTOM BLOCKS
        { x: 180, y: 1100, w: 120, h: 140, t: 'coffee', lbl: 'Tiệm Cafe 24h', col: '#9a3412', colT: '#7c2d12', winC: '#fcd34d', desc: 'Uống nước (+Energy)' },
        { x: 380, y: 1100, w: 220, h: 220, t: 'gaming', lbl: 'Cyber Center', col: '#1e1b4b', colT: '#312e81', winC: '#d946ef', desc: 'Giải trí (-Mệt)' },
        { x: 800, y: 1100, w: 180, h: 180, t: 'rest', lbl: 'Spa Thư Giãn', col: '#8b5cf6', colT: '#6d28d9', winC: '#c4b5fd', desc: 'Nghỉ ngơi 100%' },
        { x: 1450, y: 1150, w: 380, h: 260, t: 'exercise', lbl: 'Khu Liên Hợp Thể Thao', col: '#064e3b', colT: '#065f46', winC: '#34d399', desc: 'Tập thể dục (+HP)' },
        { x: 2400, y: 1100, w: 200, h: 220, t: 'study', lbl: 'Trung Tâm Đào Tạo', col: '#064e3b', colT: '#105e4e', winC: '#2dd4bf', desc: 'Nâng cao trình độ' },
        { x: 2100, y: 1600, w: 260, h: 200, t: 'doctor', lbl: 'Nhà Thuốc Quận 1', col: '#f8fafc', colT: '#e2e8f0', winC: '#60a5fa', desc: 'Mua thực phẩm (+HP)' },
        { x: 300, y: 1600, w: 360, h: 260, t: 'social', lbl: 'Công Viên Kết Nối', col: '#059669', colT: '#047857', winC: '#34d399', desc: 'Gặp bạn bè' },
        { x: 1000, y: 1600, w: 320, h: 220, t: 'mall', lbl: 'Trung Tâm Mua Sắm', col: '#831843', colT: '#9d174d', winC: '#f472b6', desc: 'Mua sắm đồ đạc' },
        { x: 1400, y: 1600, w: 240, h: 200, t: 'food', lbl: 'Nhà Hàng Chính', col: '#431407', colT: '#78350f', winC: '#fbbf24', desc: 'Ăn uống' }
    ];

    if (G.character === 'lan') {
        G.objs.forEach(function(o) {
            if (o.t === 'overtime') { o.lbl = 'Xưởng May Gia Công'; o.desc = 'Làm mướn (+$$$)'; o.col = '#831843'; o.colT = '#ec4899'; o.winC = '#fce7f3'; }
            if (o.t === 'overtime3') { o.lbl = 'Chợ Đêm'; o.desc = 'Bán hàng đêm (+$$$$)'; o.col = '#7c2d12'; o.colT = '#f59e0b'; o.winC = '#fef3c7'; }
            if (o.t === 'freelance') { o.lbl = 'Tiệm Nail Nhỏ'; o.desc = 'Làm móng dạo (+$$)'; o.col = '#9d174d'; o.colT = '#db2777'; o.winC = '#fbcfe8'; }
            if (o.t === 'sleep') { o.lbl = 'Phòng Trọ 2 Mẹ Con'; o.desc = 'Nghỉ ngơi cùng con gái'; }
            if (o.t === 'wardrobe') { o.lbl = 'Tủ Đồ 2 Mẹ Con'; o.desc = 'Mua quà cho con'; }
            if (o.t === 'overtime2') { o.lbl = 'Xưởng May Đêm'; o.desc = 'Làm tăng ca (+$$$)'; o.col = '#701a75'; o.colT = '#a855f7'; o.winC = '#e9d5ff'; }
        });
    } else if (G.level === 3) { // Minh Chapter 4: Shipper
        G.objs.forEach(function(o) {
            if (o.t === 'overtime') { o.lbl = 'Bưu Cục Giao Hàng'; o.desc = 'Giao hàng nhanh (+$$$)'; o.col = '#f59e0b'; o.colT = '#78350f'; }
            if (o.t === 'overtime2') { o.lbl = 'Kho Phân Loại'; o.desc = 'Sắp xếp hàng hóa (+$$$)'; o.col = '#ea580c'; o.colT = '#7c2d12'; }
            if (o.t === 'freelance') { o.lbl = 'Giao Hàng Dạo'; o.desc = 'Nhận đơn lẻ (+$$)'; }
            if (o.t === 'overtime3') { o.lbl = 'Giao Hàng Đêm'; o.desc = 'Tăng ca đêm (+$$$$)'; o.col = '#431407'; o.colT = '#78350f'; }
        });
    }

    if (G.character === 'hung') {
        G.objs.forEach(function(o) {
            if (o.t === 'overtime') { o.lbl = 'Tiệm Net Cỏ'; o.desc = 'Trực ca ngày (+$$)'; o.col = '#064e3b'; o.colT = '#059669'; }
            if (o.t === 'overtime3') { o.lbl = 'Net Đêm'; o.desc = 'Trực ca 12h (+$$$$)'; o.col = '#1e1b4b'; o.colT = '#312e81'; }
            if (o.t === 'freelance') { o.lbl = 'Code Dạo'; o.desc = 'Fix bug dạo (+$$$)'; o.col = '#020617'; o.colT = '#3b82f6'; }
            if (o.t === 'sleep') { o.lbl = 'Phòng Trọ 2m2'; o.desc = 'Ngủ tranh thủ'; }
            if (o.t === 'wardrobe') { o.lbl = 'Góc Học Tập'; o.desc = 'Gửi tiền về cho em'; }
            if (o.t === 'overtime2') { o.lbl = 'Dự Án Đồ Án'; o.desc = 'Làm thuê đồ án (+$$$)'; o.col = '#1e293b'; o.colT = '#64748b'; }
        });
    }

    if (G.character === 'khanh') {
        G.objs.forEach(function(o) {
            if (o.t === 'overtime') { o.lbl = 'Văn Phòng Công Ty'; o.desc = 'Làm việc (+$$)'; }
            if (o.t === 'overtime3') { o.lbl = 'Chạy Deadline Đêm'; o.desc = 'OT xuyên đêm (+$$$$)'; }
            if (o.t === 'freelance') { o.lbl = 'Khu Vực Đồng Nghiệp'; o.desc = 'Gặp đồng nghiệp'; }
            if (o.t === 'exercise') { o.lbl = 'Phòng Gym Khang Trang'; o.desc = 'Tập Gym Giảm Cân'; o.t = 'gym'; o.col = '#047857'; o.colT = '#065f46'; o.winC = '#10b981'; }
            if (o.t === 'wardrobe') { o.lbl = 'Trung Tâm Quà Tặng'; o.desc = 'Mua quà tặng Sếp'; }
            if (o.t === 'overtime2') { o.lbl = 'Phòng Sếp'; o.desc = 'Nhận nhiệm vụ thăng chức'; o.t = 'boss_room'; o.col = '#b91c1c'; o.colT = '#991b1b'; }
        });
    }

    // 2. DECORATIVE BUILDINGS (Background)
    // Fill gaps between roads with non-interactive city blocks
    var blocks = [
        { x1: 0, x2: 500, y1: 0, y2: 350 }, { x1: 700, x2: 1700, y1: 0, y2: 350 }, { x1: 1900, x2: 2900, y1: 0, y2: 350 },
        { x1: 0, x2: 500, y1: 550, y2: 1250 }, { x1: 700, x2: 1700, y1: 550, y2: 1250 }, { x1: 1900, x2: 2900, y1: 550, y2: 1250 },
        { x1: 0, x2: 500, y1: 1450, y2: 1800 }, { x1: 700, x2: 1700, y1: 1450, y2: 1800 }, { x1: 1900, x2: 2900, y1: 1450, y2: 1800 }
    ];

    blocks.forEach(function (b) {
        // Add a few random buildings per block
        for (var i = 0; i < 4; i++) {
            var bw = 80 + Math.random() * 120, bh = 80 + Math.random() * 150;
            var bx = b.x1 + 40 + Math.random() * (b.x2 - b.x1 - 100);
            var by = b.y1 + 40 + Math.random() * (b.y2 - b.y1 - 100);

            // Check if overlaps with existing functional buildings (AABB + padding)
            var overlap = G.objs.some(function (o) {
                var pad = 60; // 60px minimum walking gap
                return Math.abs(o.x - bx) < (o.w + bw) / 2 + pad && Math.abs(o.y - by) < (o.h + bh) / 2 + pad;
            });

            if (!overlap) {
                G.objs.push({
                    x: bx, y: by, w: bw, h: bh,
                    t: 'bg', lbl: '', ic: '', col: '#334155', colT: '#1e293b', winC: '#38bdf8'
                });
            }
        }
    });

    // Traffic System - Proper 2-lane traffic on all roads
    // Roads: Horizontal y=450, y=1350 | Vertical x=600, x=1800, x=3000
    // Vietnam drives on the RIGHT side of the road
    var carColors = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ec4899', '#f97316', '#06b6d4'];
    function rCol() { return carColors[Math.floor(Math.random() * carColors.length)]; }
    G.cars = [];
    // Horizontal roads - 2 lanes each
    var hRoads = [450, 1350];
    hRoads.forEach(function (ry) {
        // Right lane (going right, dir=1): y = ry + 12
        for (var i = 0; i < 2; i++) {
            G.cars.push({ x: Math.random() * G.mapW, y: ry + 12, v: 1.2 + Math.random() * 1.3, dir: 1, col: rCol(), roadY: ry + 12, laneOffset: 12 });
        }
        // Left lane (going left, dir=-1): y = ry - 12
        for (var i = 0; i < 2; i++) {
            G.cars.push({ x: Math.random() * G.mapW, y: ry - 12, v: 1.2 + Math.random() * 1.3, dir: -1, col: rCol(), roadY: ry - 12, laneOffset: -12 });
        }
    });
    // Vertical roads - 2 lanes each
    var vRoads = [600, 1800, 3000];
    vRoads.forEach(function (rx) {
        // Right lane (going down, dir=1): x = rx + 12
        G.cars.push({ x: rx + 12, y: Math.random() * G.mapH, v: 1.2 + Math.random() * 1.3, dir: 1, col: rCol(), isVert: true, roadX: rx + 12, laneOffset: 12 });
        // Left lane (going up, dir=-1): x = rx - 12
        G.cars.push({ x: rx - 12, y: Math.random() * G.mapH, v: 1.2 + Math.random() * 1.3, dir: -1, col: rCol(), isVert: true, roadX: rx - 12, laneOffset: -12 });
    });

    G.npcs = [
        { id: 'Mai (Vợ)', x: 450, y: 500, col: '#ff69b4', spd: .25, tx: null, ty: null, name: 'Mai (Vợ)', ic: '👩' },
        { id: 'Bé Linh', x: 1550, y: 500, col: '#ff1493', spd: .25, tx: null, ty: null, name: 'Bé Linh', ic: '👧' },
        { id: 'Sếp Hương', x: 550, y: 1200, col: '#dc143c', spd: .15, tx: null, ty: null, name: 'Sếp Hương', ic: '👩‍💼' },
        { id: 'Thành', x: 2000, y: 1200, col: '#4a90e2', spd: .3, tx: null, ty: null, name: 'Thành', ic: '👨‍💻' },
        { id: 'BS. Hằng', x: 1200, y: 800, col: '#10b981', spd: .2, tx: null, ty: null, name: 'BS. Hằng', ic: '👩‍⚕️' }
    ];
    
    if (G.character === 'khanh') {
        G.npcs = [
            { id: 'Sếp Tổng', x: 2300, y: 350, col: '#dc143c', spd: 0, tx: null, ty: null, name: 'Sếp Tổng', ic: '🤵‍♂️' },
            { id: 'Đồng Nghiệp A', x: 1350, y: 800, col: '#4a90e2', spd: .1, tx: null, ty: null, name: 'Đồng Nghiệp A', ic: '👨‍💼' },
            { id: 'Đồng Nghiệp B', x: 1450, y: 850, col: '#4a90e2', spd: .1, tx: null, ty: null, name: 'Đồng Nghiệp B', ic: '👩‍💼' }
        ];
    }
    
    G.quests = [];
    G.npcStates = {};
    G.parts = [];

    updateLocList();
}

// HUD Helpers
function updateLocList() {
    var list = document.getElementById('mapLocList');
    if (!list) return;
    list.innerHTML = '';
    G.objs.forEach(function (o) {
        var div = document.createElement('div');
        div.className = 'map-loc-item';
        div.innerHTML = '<span>' + o.lbl + '</span>';
        div.onclick = function () {
            SFX.click();
            // Teleport player near the building (below it), not inside
            G.p.x = o.x; G.p.y = o.y + o.h / 2 + 40;
            // Auto collapse after selection
            document.getElementById('mapLocListWrap').classList.remove('show');
        };
        list.appendChild(div);
    });
}

// ── INPUT ────────────────────────────────────────────
document.addEventListener('keydown', function (e) {
    G.keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === 'e' && !G.modalOpen && !G.evOpen) { interact(); }
    if (e.key.toLowerCase() === 'f' && !G.modalOpen && !G.evOpen) { mInventory(); }
    if (e.key === 'Escape') { closeM(); if (G.evOpen) closeEvent(); else if (G.scr === 'game') backToMenu(); }
});
document.addEventListener('keyup', function (e) { G.keys[e.key.toLowerCase()] = false; });

// ── PARTICLES ────────────────────────────────────────
function spawnP(x, y, tp) { var cs = { money: ['#ffd700', '#ffaa00', '#fff176'], dmg: ['#ff4444', '#ff6666', '#cc0000'] }; var c = cs[tp] || cs.money; for (var i = 0; i < 6; i++) { var a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 2; G.parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5, life: 1, d: .02 + Math.random() * .02, c: c[Math.floor(Math.random() * c.length)], sz: 2 + Math.random() * 3 }); } }
function updP() { G.parts = G.parts.filter(function (p) { p.x += p.vx; p.y += p.vy; p.vy += .04; p.life -= p.d; return p.life > 0; }); }
function drawP(gx) { G.parts.forEach(function (p) { gx.globalAlpha = p.life; gx.fillStyle = p.c; gx.beginPath(); gx.arc(p.x, p.y, p.sz * p.life, 0, Math.PI * 2); gx.fill(); }); gx.globalAlpha = 1; }
function popText(x, y, txt, isBad) {
    var gs = document.getElementById('gameScreen');
    var d = document.createElement('div');
    d.className = isBad ? 'dmg-pop' : 'money-pop';
    d.textContent = txt;
    var rect = document.getElementById('gameCanvas').getBoundingClientRect();
    // Calculate screen coordinates from world coordinates
    var sx = x - G.camX;
    var sy = y - G.camY;
    d.style.left = (rect.left + sx - 30) + 'px';
    d.style.top = (rect.top + sy - 40) + 'px';
    gs.appendChild(d);
    setTimeout(function () { d.remove(); }, 1200);
}

// ── EARNINGS ─────────────────────────────────────────
function calcOT(mult) {
    var base = 2000000 + G.level * 1200000;
    var fatPen = G.fatigue > 80 ? .5 : G.fatigue > 60 ? .75 : G.fatigue > 40 ? .9 : 1;
    var efficiency = getEfficiency();
    var earn = base * mult * fatPen * efficiency * getDiff().em;
    
    // Scale earning based on character
    var charKey = G.character || 'minh';
    if (charKey === 'lan') earn *= 0.5; // Lan earns 50%
    else if (charKey === 'hung') earn *= 0.3; // Hung earns 30%

    return Math.round(earn / 10000) * 10000;
}
function fatAmt(base) { return Math.round(base * getDiff().fm); }

// ── INTERACTIONS ─────────────────────────────────────
function interact() {
    if ((!G.near && !G.nearNpc) || G.modalOpen || G.evOpen) return;
    SFX.click();
    if (G.nearNpc) { talkToNpc(G.nearNpc); return; }
    var t = G.near.t;
    var actions = { overtime: mOvertime1, overtime2: mOvertime2, overtime3: mOvertime3, freelance: mFreelance, study: mStudy, sleep: mSleep, rest: mRest, coffee: mCoffee, food: mFood, fastfood: mFastFood, doctor: mDoctor, exercise: mExercise, gaming: mGaming, mall: mMall, wardrobe: mInventory, social: mSocial, gym: mGym, boss_room: mBossRoom };
    if (actions[t]) actions[t]();
}

var NPC_DIALOGUES = {
    'Mai (Vợ)': [
        { state: 'init', emotion: 'worried', text: 'Anh ơi, viện phí tháng này của Linh sắp đến hạn rồi. Em sợ con không chờ được nữa...', options: [{ text: 'Đưa 2,000,000đ', action: 'give_family_money' }, { text: 'Anh sẽ cố xoay sở', close: true }] }
    ],
    'Bé Linh': [
        { state: 'init', emotion: 'happy', text: 'Ba ơi ba mệt hả? Ba đừng làm việc nữa nha, chơi với con một xíu thôi!', options: [{ text: 'Chơi với con (Tốn 2 giờ)', action: 'play_with_linh' }, { text: 'Ba bận, tí ba chơi nhé', close: true }] }
    ],
    'Sếp Hương': [
        { state: 'init', emotion: 'stern', text: 'Minh ơi, project của team mình đang cháy. Khách hối dữ quá. Cậu nhận làm thâu đêm ráng cày xong trong nay nhé? Công ty thưởng 1.5 triệu.', options: [{ text: 'Nhận làm thâu đêm', action: 'take_overtime' }, { text: 'Xin lỗi sếp, em đuối quá...', close: true }] }
    ],
    'Thành': [
        { state: 'init', emotion: 'tired', text: 'Ê Minh, dạo này tao tức ngực trái quá, thở hụt hơi. Chắc do ngồi code 15 tiếng/ngày. Mày đi làm bát phở với tao không?', options: [{ text: 'Đi ăn phở (-50,000đ)', action: 'eat_with_thanh' }, { text: 'Mày đi đi, tao cố thêm 1 hàm c.', close: true }] }
    ],
    'BS. Hằng': [
        { state: 'init', emotion: 'focused', text: 'Huyết áp cậu đang 165/100, mức báo động khẩn cấp! Nhịp tim đập loạn. Mua thuốc bảo vệ mạch máu ngay kẻo đột quỵ, tôi không đùa đâu.', options: [{ text: 'Mua thuốc (-500,000đ)', action: 'buy_medicine' }, { text: 'Tôi không có tiền...', close: true }] }
    ],
    'Sếp Tổng': [
        { state: 'init', emotion: 'stern', text: 'Khánh, cậu biết dự án tới quan trọng thế nào mà. Làm đêm nay đi, thưởng 2 triệu. Nhưng thân hình cậu ục ịch quá, liệu có gánh nổi không?', options: [{ text: 'Em nhận làm thâu đêm', action: 'take_overtime_khanh' }, { text: 'Em xin lỗi Sếp...', close: true }] },
        { state: 'init_2', emotion: 'angry', text: 'Thiết kế của cậu bị khách hàng chê tơi tả. Cậu béo chây lười à? Sửa lại ngay cho tôi đêm nay!', options: [{ text: 'Sửa thiết kế ngay (-25 HP)', action: 'take_overtime_khanh2' }, { text: 'Để mai em sửa', close: true }] },
        { state: 'init_3', emotion: 'focused', text: 'Có một đống số liệu đang cần tổng hợp gấp. Cậu ngồi lại làm hết đi, tôi sẽ tính thêm lương.', options: [{ text: 'Làm báo cáo (-35 HP)', action: 'take_overtime_khanh3' }, { text: 'Em có việc bận rồi', close: true }] },
        { state: 'promoted_1', emotion: 'focused', text: 'Khánh, tôi thấy cậu đã nỗ lực giảm cân và làm việc rất chăm chỉ. Tôi giao cho cậu dự án hạng A này, đừng làm tôi thất vọng!', options: [{ text: 'Nhận dự án hạng A (Khó)', action: 'take_project_khanh' }, { text: 'Để em xem lại lịch', close: true }] },
        { state: 'promoted_1_2', emotion: 'focused', text: 'Tiến độ dự án hạng A đang chậm. Cậu phải đích thân đi gặp đối tác xử lý vấn đề ngay.', options: [{ text: 'Đi gặp đối tác (-45 HP)', action: 'take_project_khanh2' }, { text: 'Để team khác đi', close: true }] },
        { state: 'promoted_2', emotion: 'happy', text: 'Tuyệt vời! Cậu Khánh, dự án thành công vang dội. Mọi người đều ấn tượng với sự thay đổi của cậu. Giám đốc đã duyệt cất nhắc cậu lên Trưởng Phòng!', options: [{ text: 'Cảm ơn Sếp! (Tăng Lương)', action: 'become_manager' }] },
        { state: 'manager', emotion: 'happy', text: 'Chào Trưởng phòng Khánh. Dạo này vóc dáng săn chắc quá, ráng duy trì nhé!', options: [{ text: 'Cảm ơn Sếp!', close: true }] }
    ],
    'Đồng Nghiệp A': [
        { state: 'init', emotion: 'smirk', text: 'Ê Khánh, nãy Sếp nói bộ mặt công ty cần người thon gọn đó. Cỡ mày thì... haha.', options: [{ text: 'Làm ngơ (Tăng Stress)', action: 'ignore_insult' }] }
    ],
    'Đồng Nghiệp B': [
        { state: 'init', emotion: 'tired', text: 'Khánh ơi, tớ đuối quá, cậu gánh hộ tớ phần data này được không? Tớ bao trà sữa.', options: [{ text: 'Làm hộ (Tốn sức, kiếm 100k)', action: 'help_colleague' }, { text: 'Tớ cũng đang bận', close: true }] }
    ]
};

function talkToNpc(npc) {
    if (G.modalOpen || G.evOpen) return;
    SFX.npcTalk();
    G.modalOpen = true;

    // HEALTH REMINDER OVERRIDE
    if (G.hp < 35 || G.fatigue > 75) {
        renderNpcHealthWarning(npc);
        return;
    }

    var stateId = G.npcStates[npc.name] || 'init';
    renderNpcDialog(npc, stateId);
}

function renderNpcHealthWarning(npc) {
    var reminders = T('npc1'); // Default pool
    if (npc.name === 'Sếp Hương' || npc.name === 'BS. Hằng') reminders = T('npc3');
    if (npc.name === 'Thành' || npc.name === 'Mai (Vợ)') reminders = T('npc2');

    var msg = reminders[Math.floor(Math.random() * reminders.length)];

    document.getElementById('dIcon').textContent = npc.ic;
    document.getElementById('dName').textContent = npc.name + ' (Lo lắng)';
    document.getElementById('dText').innerHTML = '<span style="color:#ffcc00">"Này anh bạn, nhìn anh không ổn lắm đâu... ' + msg + '"</span>';

    document.getElementById('dOptions').innerHTML = '<button class="d-btn" onclick="closeNpcDialog()">Cảm ơn, tôi sẽ chú ý</button>';
    document.getElementById('npcDialogueOverlay').classList.add('open');
}

function renderNpcDialog(npc, stateId) {
    var dialogs = NPC_DIALOGUES[npc.name];
    var dData = dialogs ? dialogs.find(function (d) { return d.state === stateId; }) : { emotion: 'neutral', text: '...', options: [{ text: 'Rời đi', close: true }] };
    if (!dData && dialogs) dData = dialogs[0];

    document.getElementById('dIcon').textContent = npc.ic;
    document.getElementById('dName').textContent = npc.name;
    document.getElementById('dText').innerHTML = dData.text;

    var optsHtml = '';
    dData.options.forEach(function (opt, idx) {
        optsHtml += '<button class="d-btn" onclick="handleNpcOption(\'' + npc.name + '\', ' + idx + ')">' + opt.text + '</button>';
    });
    document.getElementById('dOptions').innerHTML = optsHtml;
    document.getElementById('npcDialogueOverlay').classList.add('open');
}

function handleNpcOption(npcName, optIdx) {
    SFX.click();
    var stateId = G.npcStates[npcName] || 'init';
    var dialogs = NPC_DIALOGUES[npcName];
    var dData = dialogs.find(function (d) { return d.state === stateId; });
    var opt = dData.options[optIdx];

    if (opt.close) {
        closeNpcDialog();
        return;
    }
    if (opt.action) {
        var qMsg = '';
        if (opt.action === 'take_overtime') {
            var earnAmt = 1500000;
            var charKey = G.character || 'minh';
            if (charKey === 'lan') earnAmt = 750000;
            if (charKey === 'hung') earnAmt = 450000;
            G.money += earnAmt; G.hp -= 20; G.fatigue += 30; G.mins += 240;
            qMsg = '🩸 Đổi sinh mạng lấy tiền... (+' + fmt(earnAmt) + ', -20 HP)';
        }
        if (opt.action === 'eat_with_thanh') {
            if (G.money >= 50000) { G.money -= 50000; G.hp += 15; G.fatigue -= 10; G.mins += 30; qMsg = '🍲 Bát phở nóng xoa dịu dạ dày... (+15 HP)'; } else { qMsg = '❌ Bạn không đủ 50.000đ!'; }
        }
        if (opt.action === 'give_family_money') {
            if (G.money >= 2000000) { G.money -= 2000000; G.hp += 5; qMsg = '❤️ Mai cười buồn, nhưng ánh mắt biết ơn. (-2.000.000đ)'; } else { qMsg = '❌ Không có đủ xu nào... Cảm giác bất lực!'; }
        }
        if (opt.action.startsWith('take_overtime_khanh')) {
            var earnMap = {
                'take_overtime_khanh': 2000000,
                'take_overtime_khanh2': 1500000,
                'take_overtime_khanh3': 2500000
            };
            var hpMap = {
                'take_overtime_khanh': 30,
                'take_overtime_khanh2': 25,
                'take_overtime_khanh3': 35
            };
            var earnAmt = earnMap[opt.action];
            var hpCost = hpMap[opt.action];
            
            closeNpcDialog();
            G.workingAnim = true;
            G.workAnimTimer = 60;
            startWorkTimer('Đang cày cuốc...', 6, true, false);
            var typInt = setInterval(function () { if (G.workingAnim) SFX.typing(); else clearInterval(typInt); }, 200);
            var duration = 6 * 1200;

            setTimeout(function() {
                G.workingAnim = false;
                G.money += earnAmt;
                G.hp -= hpCost;
                if (G.hp < 1) G.hp = 1; // Bất tử khi làm cho sếp
                G.fatigue += 40; G.mins += 360;
                G.khanhTasksDone = (G.khanhTasksDone || 0) + 1;
                
                var qMsg = '🩸 Bạn đã cày thâu đêm... (+' + fmt(earnAmt) + ', -' + hpCost + ' HP, +40 Mệt Mỏi)';
                popText(G.p.x, G.p.y, qMsg);
                
                var sState = G.npcStates['Sếp Tổng'] || 'init';
                var taskKeys = ['init', 'init_2', 'init_3'];
                var randomNext = taskKeys[Math.floor(Math.random() * taskKeys.length)];
                
                if (G.khanhTasksDone >= 2 && G.khanhWeight <= 95 && G.bossRel >= 10 && sState.startsWith('init')) {
                    G.npcStates['Sếp Tổng'] = 'promoted_1';
                } else {
                    G.npcStates['Sếp Tổng'] = randomNext; // Nhiệm vụ thay đổi liên tục
                }
                
                if (G.hp > 100) G.hp = 100;
                if (G.fatigue > 100) G.fatigue = 100;
                updateGameTime(6);
                updateQuestsHUD();
            }, duration);
            return;
        }
        if (opt.action.startsWith('take_project_khanh')) {
            var earnAmt = opt.action === 'take_project_khanh' ? 5000000 : 4000000;
            var hpCost = opt.action === 'take_project_khanh' ? 40 : 45;
            
            closeNpcDialog();
            G.workingAnim = true;
            G.workAnimTimer = 80;
            startWorkTimer('Đang cày dự án...', 8, true, false);
            var typInt2 = setInterval(function () { if (G.workingAnim) SFX.typing(); else clearInterval(typInt2); }, 200);
            var duration2 = 8 * 1200;

            setTimeout(function() {
                G.workingAnim = false;
                G.money += earnAmt; 
                G.hp -= hpCost; 
                if (G.hp < 1) G.hp = 1; // Bất tử khi làm cho sếp
                G.fatigue += 50; G.mins += 480;
                G.khanhTasksDone = (G.khanhTasksDone || 0) + 1;
                
                var qMsg = '🩸 Cày ải dự án lớn... (+' + fmt(earnAmt) + ', -' + hpCost + ' HP, +50 Mệt)';
                popText(G.p.x, G.p.y, qMsg);
                
                var sState = G.npcStates['Sếp Tổng'] || 'init';
                var taskKeys = ['promoted_1', 'promoted_1_2'];
                var randomNext = taskKeys[Math.floor(Math.random() * taskKeys.length)];
                
                if (G.khanhTasksDone >= 5 && G.khanhWeight <= 85 && G.bossRel >= 30 && sState.startsWith('promoted_1')) {
                    G.npcStates['Sếp Tổng'] = 'promoted_2';
                } else {
                    G.npcStates['Sếp Tổng'] = randomNext; // Nhiệm vụ thay đổi liên tục
                }
                
                if (G.hp > 100) G.hp = 100;
                if (G.fatigue > 100) G.fatigue = 100;
                updateGameTime(8);
                updateQuestsHUD();
            }, duration2);
            return;
        }
        if (opt.action === 'become_manager') {
            G.money += 15000000; G.hp += 20;
            G.npcStates['Sếp Tổng'] = 'manager';
            qMsg = '🎉 BẠN ĐÃ ĐƯỢC THĂNG CHỨC! (+15.000.000đ, +20 HP)';
        }
        if (opt.action === 'ignore_insult') {
            G.hp -= 10; G.fatigue += 15;
            qMsg = '💬 Những lời miệt thị khiến bạn cắn rứt. (-10 HP, +15 Mệt Mỏi)';
        }
        if (opt.action === 'help_colleague') {
            G.money += 100000; G.hp -= 5; G.fatigue += 10; G.mins += 60;
            qMsg = '🧋 Vừa làm hộ vừa uống trà sữa... (+100.000đ, Tăng mệt mỏi)';
        }
        if (opt.action === 'buy_medicine') {
            if (G.money >= 500000) { G.money -= 500000; G.hp += 30; qMsg = '💊 Mạch máu được bảo vệ, tim đập êm hơn. (+30 HP)'; } else { qMsg = '❌ Rỗng túi. Liều mạng chờ cơ may...'; }
        }
        if (opt.action === 'play_with_linh') {
            G.hp += 25; G.fatigue -= 20; G.mins += 120;
            G.relDaughter = Math.min(100, (G.relDaughter || 0) + 15);
            qMsg = '👨‍👧 Cái ôm của Linh tiếp năng lượng lớn lao. (+25 HP, +15 Tình cảm con)';
        }

        if (G.hp < 0) G.hp = 0; if (G.hp > 100) G.hp = 100;
        if (G.fatigue < 0) G.fatigue = 0; if (G.fatigue > 100) G.fatigue = 100;

        if (qMsg) popText(G.p.x, G.p.y, qMsg);

        if (opt.action === 'open_store') {
            closeNpcDialog(); mMall(); return;
        }
        updateQuestsHUD();
        closeNpcDialog();
        return;
    }
    if (opt.next) {
        G.npcStates[npcName] = opt.next;
        var npc = G.npcs.find(function (n) { return n.name === npcName; });
        renderNpcDialog(npc, opt.next);
    }
}

function closeNpcDialog() {
    G.modalOpen = false;
    document.getElementById('npcDialogueOverlay').classList.remove('open');
}

function updateQuestsHUD() {
    var qc = document.getElementById('questContainer');
    var ql = document.getElementById('questList');
    if (G.quests.length > 0) {
        qc.style.display = 'block';
        var html = '';
        G.quests.forEach(function (q) { html += '<div class="q-item">' + q + '</div>'; });
        ql.innerHTML = html;
    } else {
        qc.style.display = 'none';
    }
}

// ── BẢNG NHIỆM VỤ (MISSION BOARD) ──────────────────
function toggleMissionBoard() {
    var ml = document.getElementById('missionList');
    var tog = document.getElementById('missionToggle');
    if (ml.style.display === 'none') { ml.style.display = 'block'; tog.textContent = '▼'; }
    else { ml.style.display = 'none'; tog.textContent = '▶'; }
}

// ── MISSION DEFINITIONS (CÁ NHÂN HÓA 100% KHÔNG TRÙNG LẶP) ──
var MISSION_POOL = {
    minh: [
        { id: 'm_money50m', icon: '💎', text: 'Gom 50 triệu trả nợ tín dụng đen', key: 'money', target: 50000000, type: 'counter' },
        { id: 'm_relwife30', icon: '💕', text: 'Hàn gắn tình cảm với Mai (QH 30)', key: 'relWife', target: 30, type: 'counter' },
        { id: 'm_relwife80', icon: '💗', text: 'Đưa vợ đi chơi hâm nóng (QH 80)', key: 'relWife', target: 80, type: 'counter' },
        { id: 'm_hp90', icon: '❤️', text: 'Bảo vệ sức khỏe vì gia đình (HP > 90)', key: 'hp', target: 90, type: 'threshold' },
        { id: 'm_hp100', icon: '🛡️', text: 'Đạt thể trạng hoàn hảo (HP 100)', key: 'hp', target: 100, type: 'threshold' },
        { id: 'm_ot15', icon: '⏰', text: 'Cày 15 giờ OT liên tục', key: 'totalOvertimeHours', target: 15, type: 'counter' },
        { id: 'm_ot30', icon: '🌙', text: 'Bán mạng vì tiền: 30 giờ OT', key: 'totalOvertimeHours', target: 30, type: 'counter' }
    ],
    lan: [
        { id: 'l_money30m', icon: '💎', text: 'Dành dụm 30 triệu mổ tim cho con', key: 'money', target: 30000000, type: 'counter' },
        { id: 'l_reldau40', icon: '👧', text: 'Dỗ dành bé vui vẻ (QH con 40)', key: 'relDaughter', target: 40, type: 'counter' },
        { id: 'l_reldau80', icon: '💝', text: 'Con gái khỏe mạnh (QH con 80)', key: 'relDaughter', target: 80, type: 'counter' },
        { id: 'l_sew10', icon: '🧵', text: 'Thức đêm may 10 đơn gia công', key: 'totalSewingJobs', target: 10, type: 'counter' },
        { id: 'l_sew25', icon: '👗', text: 'Hoàn thành 25 đơn may mặc', key: 'totalSewingJobs', target: 25, type: 'counter' },
        { id: 'l_sell5', icon: '📱', text: 'Livestream chốt 5 đơn hàng online', key: 'totalOnlineSales', target: 5, type: 'counter' },
        { id: 'l_sleep', icon: '🛏', text: 'Chợp mắt nghỉ ngơi (Mệt < 20)', key: 'fatigue', target: 20, type: 'below' }
    ],
    hung: [
        { id: 'h_money10m', icon: '💰', text: 'Gửi 10 triệu học phí cho em gái', key: 'money', target: 10000000, type: 'counter' },
        { id: 'h_kn30', icon: '📚', text: 'Ôn thi qua môn (Tri Thức 30)', key: 'knowledge', target: 30, type: 'counter' },
        { id: 'h_kn100', icon: '🏆', text: 'Giành học bổng xuất sắc (Tri Thức 100)', key: 'knowledge', target: 100, type: 'counter' },
        { id: 'h_ship10', icon: '🚴', text: 'Chạy 10 cuốc xe ôm công nghệ', key: 'totalShipperRuns', target: 10, type: 'counter' },
        { id: 'h_code5', icon: '💻', text: 'Code thuê 5 dự án phần mềm', key: 'totalFreelanceCode', target: 5, type: 'counter' },
        { id: 'h_eat', icon: '🍜', text: 'Ăn no bụng sinh viên (Đói > 80)', key: 'hunger', target: 80, type: 'threshold' },
        { id: 'h_eat100', icon: '🍔', text: 'Một bữa thịnh soạn no nê (Đói 100)', key: 'hunger', target: 100, type: 'threshold' }
    ],
    khanh: [
        { id: 'k_work3', icon: '💼', text: 'Hoàn thành 3 task cho Sếp Tổng', key: 'khanhTasksDone', target: 3, type: 'counter' },
        { id: 'k_work10', icon: '⭐', text: 'Nhân viên xuất sắc (Hoàn thành 10 task)', key: 'khanhTasksDone', target: 10, type: 'counter' },
        { id: 'k_gym80', icon: '🏋', text: 'Kỷ luật bản thân: Giảm cân xuống 80kg', key: 'khanhWeight', target: 80, type: 'decrease', start: 100 },
        { id: 'k_gym70', icon: '💪', text: 'Lột xác hoàn toàn: Body 70kg', key: 'khanhWeight', target: 70, type: 'decrease', start: 100 },
        { id: 'k_gym10', icon: '🏃', text: 'Kiên trì: 10 buổi tập Gym', key: 'totalGymSessions', target: 10, type: 'counter' },
        { id: 'k_promoted', icon: '📈', text: 'Đạt danh hiệu Trưởng Phòng', key: '_bossPromoted1', target: 1, type: 'counter' },
        { id: 'k_doc3', icon: '🏥', text: 'Khám định kỳ BMI 3 lần', key: 'totalDoctorVisits', target: 3, type: 'counter' }
    ]
};

function initMissions() {
    G.activeMissions = [];
    G.completedMissionIds = [];
    G.missionCompletedCount = 0;
    assignNewMissions(3);
}

function assignNewMissions(count) {
    var char = G.character || 'minh';
    var pool = MISSION_POOL[char] || MISSION_POOL.minh;
    var available = pool.filter(function(m) {
        // Không chọn nhiệm vụ đã hoàn thành hoặc đang active
        var activeIds = G.activeMissions.map(function(a) { return a.id; });
        return G.completedMissionIds.indexOf(m.id) === -1 && activeIds.indexOf(m.id) === -1;
    });
    // Shuffle
    for (var i = available.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = available[i]; available[i] = available[j]; available[j] = tmp;
    }
    var toAdd = available.slice(0, count);
    toAdd.forEach(function(m) {
        G.activeMissions.push({
            id: m.id, icon: m.icon, text: m.text, key: m.key,
            target: m.target, type: m.type, start: m.start || 0,
            completed: false, justCompleted: false
        });
    });
    // Nếu hết nhiệm vụ trong pool thì reset lại
    if (toAdd.length === 0 && G.activeMissions.length === 0) {
        G.completedMissionIds = [];
        assignNewMissions(count);
    }
}

function getMissionProgress(m) {
    var val = 0;
    if (m.key === '_bossPromoted1') {
        val = (G.npcStates && G.npcStates['Sếp Tổng'] && G.npcStates['Sếp Tổng'] !== 'init') ? 1 : 0;
    } else {
        val = G[m.key] || 0;
    }

    if (m.type === 'counter' || m.type === 'threshold') {
        var pct = Math.min(100, Math.round((val / m.target) * 100));
        return { current: val, pct: pct, done: val >= m.target };
    }
    if (m.type === 'below') {
        // fatigue < target means completed
        var pct = val <= m.target ? 100 : Math.max(0, Math.round((1 - (val - m.target) / (100 - m.target)) * 100));
        return { current: val, pct: pct, done: val <= m.target };
    }
    if (m.type === 'decrease') {
        var startVal = m.start || 100;
        var range = startVal - m.target;
        var dropped = startVal - val;
        var pct = Math.min(100, Math.max(0, Math.round((dropped / range) * 100)));
        return { current: val, pct: pct, done: val <= m.target };
    }
    return { current: 0, pct: 0, done: false };
}

function checkMissionCompletion() {
    if (!G.activeMissions) return;
    var anyCompleted = false;
    G.activeMissions.forEach(function(m) {
        if (m.completed) return;
        var prog = getMissionProgress(m);
        if (prog.done) {
            m.completed = true;
            m.justCompleted = true;
            anyCompleted = true;
            G.completedMissionIds.push(m.id);
            G.missionCompletedCount = (G.missionCompletedCount || 0) + 1;
        }
    });
    if (anyCompleted) {
        // Hiệu ứng hoàn thành
        setTimeout(function() {
            // Xóa nhiệm vụ đã hoàn thành và thêm mới
            var justDone = G.activeMissions.filter(function(m) { return m.justCompleted; });
            justDone.forEach(function(m) {
                popText(G.p.x, G.p.y, '✅ ' + m.text, false);
                SFX.win();
            });
            G.activeMissions = G.activeMissions.filter(function(m) { return !m.completed; });
            assignNewMissions(justDone.length);
        }, 300);
    }
}

function updateMissionBoard() {
    var board = document.getElementById('missionBoard');
    var list = document.getElementById('missionList');
    if (!board || !list) return;

    if (!G.activeMissions) initMissions();
    board.style.display = 'block';
    checkMissionCompletion();

    var html = '';
    // Header: số nhiệm vụ đã hoàn thành
    html += '<div style="font-size:9px;color:rgba(122,173,255,0.5);margin-bottom:4px;">Đã hoàn thành: ' + (G.missionCompletedCount || 0) + ' nhiệm vụ</div>';

    if (G.activeMissions.length === 0) {
        html += '<div style="color:#aaa;font-size:10px;text-align:center;padding:8px;">Đang tải nhiệm vụ mới...</div>';
    }

    G.activeMissions.forEach(function(m) {
        var prog = getMissionProgress(m);
        var barColor = prog.pct >= 100 ? '#10b981' : prog.pct >= 60 ? '#fbbf24' : '#3b82f6';
        var borderColor = prog.pct >= 80 ? 'rgba(16,185,129,0.5)' : 'rgba(122,173,255,0.2)';

        html += '<div style="padding:5px 6px;margin-bottom:5px;background:rgba(255,255,255,0.03);border-left:3px solid ' + borderColor + ';border-radius:4px;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">';
        html += '<span>' + m.icon + ' ' + m.text + '</span>';
        html += '<span style="font-size:10px;font-weight:900;color:' + barColor + ';">' + prog.pct + '%</span>';
        html += '</div>';
        // Progress bar
        html += '<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">';
        html += '<div style="height:100%;width:' + prog.pct + '%;background:' + barColor + ';border-radius:2px;transition:width 0.5s ease;"></div>';
        html += '</div>';
        html += '</div>';
    });

    // Cảnh báo khẩn cấp (không có progress bar)
    if (G.hp <= 40) html += '<div style="padding:3px 6px;margin-top:2px;border-left:3px solid rgba(255,68,68,0.6);border-radius:4px;background:rgba(255,0,0,0.05);color:#ff6666;font-size:10px;">⚠ HP thấp! Đi khám Bệnh Viện</div>';
    if (G.hunger <= 30) html += '<div style="padding:3px 6px;margin-top:2px;border-left:3px solid rgba(255,170,0,0.6);border-radius:4px;background:rgba(255,170,0,0.05);color:#ffaa00;font-size:10px;">⚠ Đói! Ra Nhà Hàng / Fast Food ăn</div>';

    list.innerHTML = html;
}
function mOvertime1() {
    if (!canWork()) return; var eff = getEfficiency(), fatRisk = G.fatigue > 70;
    var e1 = Math.round(calcOT(0.4) * eff), f1 = fatAmt(6), k1 = 0;
    var e2 = Math.round(calcOT(0.8) * eff), f2 = fatAmt(12), k2 = 0;
    var e3 = Math.round(calcOT(1.2) * eff), f3 = fatAmt(18), k3 = 20;
    var e4 = Math.round(calcOT(1.6) * eff), f4 = fatAmt(25), k4 = 20;
    var e5 = Math.round(calcOT(2.1) * eff), f5 = fatAmt(35), k5 = 50;
    var e6 = Math.round(calcOT(2.7) * eff), f6 = fatAmt(45), k6 = 50;

    function renderBtn(txt, earn, fat, hrs, reqKn, jsCall) {
        if (G.knowledge >= reqKn) {
            return '<button class="cb" onclick="' + jsCall + '">' + txt + '<span class="cb-tag cb-good">+' + fmt(earn) + '</span><span class="cb-tag cb-bad">+' + fat + '% mệt | ' + hrs + 'h</span></button>';
        } else {
            return '<button class="cb" style="opacity:0.5;cursor:not-allowed">🔒 ' + txt + '<span class="cb-tag" style="color:#aaa">Cần ' + reqKn + ' Tri Thức</span></button>';
        }
    }

    showM(T('actOt1Title'), '<p>' + T('actOt1Sub') + '</p>' +
        (eff < 0.8 ? '<div class="wbox">⚠ Hiệu suất: ' + Math.round(eff * 100) + '%</div>' : '') +
        (fatRisk ? '<div class="wbox">⚠ Rất mệt!</div>' : '') +
        '<div class="cg" style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' +
        renderBtn(T('actOt1_1'), e1, f1, 1, k1, 'doOvertime(' + e1 + ',' + f1 + ',false,1)') +
        renderBtn(T('actOt1_2'), e2, f2, 2, k2, 'doOvertime(' + e2 + ',' + f2 + ',false,2)') +
        renderBtn(T('actOt1_3'), e3, f3, 3, k3, 'doOvertime(' + e3 + ',' + f3 + ',false,3)') +
        renderBtn(T('actOt1_4'), e4, f4, 4, k4, 'doOvertime(' + e4 + ',' + f4 + ',false,4)') +
        renderBtn(T('actOt1_5'), e5, f5, 5, k5, 'doOvertime(' + e5 + ',' + f5 + ',false,5)') +
        renderBtn(T('actOt1_6'), e6, f6, 6, k6, 'doOvertime(' + e6 + ',' + f6 + ',false,6)') +
        '</div><button class="cb" onclick="closeM()" style="margin-top:6px;width:100%">' + T('actOt1No') + '</button>');
}
function mOvertime2() {
    if (!canWork()) return; var eff = getEfficiency();
    var e1 = Math.round(calcOT(0.8) * eff), f1 = fatAmt(8), k1 = 30;
    var e2 = Math.round(calcOT(1.5) * eff), f2 = fatAmt(15), k2 = 30;
    var e3 = Math.round(calcOT(2.2) * eff), f3 = fatAmt(22), k3 = 60;
    var e4 = Math.round(calcOT(3.0) * eff), f4 = fatAmt(28), k4 = 60;
    var e5 = Math.round(calcOT(15.0) * eff), f5 = fatAmt(50), k5 = 120;
    var e6 = 20000000, f6 = 80, k6 = 150;

    function renderBtn2(txt, earn, fat, hrs, reqKn, jsCall, extLabel) {
        if (G.knowledge >= reqKn) {
            return '<button class="cb" onclick="' + jsCall + '">' + txt + '<span class="cb-tag cb-good">+' + fmt(earn) + '</span><span class="cb-tag cb-bad">+' + fat + '% mệt | ' + extLabel + ' | ' + hrs + 'h</span></button>';
        } else {
            return '<button class="cb" style="opacity:0.5;cursor:not-allowed">🔒 ' + txt + '<span class="cb-tag" style="color:#aaa">Cần ' + reqKn + ' Tri Thức</span></button>';
        }
    }

    showM(T('actOt2Title'), '<p>' + T('actOt2Sub') + '</p>' +
        '<div class="cg" style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' +
        renderBtn2(T('actOt2_1'), e1, f1, 2, k1, 'doOvertime(' + e1 + ',' + f1 + ',false,2)', '') +
        renderBtn2(T('actOt2_2'), e2, f2, 3, k2, 'doOvertime(' + e2 + ',' + f2 + ',false,3)', '') +
        renderBtn2(T('actOt2_3'), e3, f3, 4, k3, 'doOvertime(' + e3 + ',' + f3 + ',false,4)', '') +
        renderBtn2(T('actOt2_4'), e4, f4, 5, k4, 'doOvertime(' + e4 + ',' + f4 + ',false,5)', '') +
        renderBtn2(T('actOt2_5'), e5, f5, 8, k5, 'doOvertime(' + e5 + ',' + f5 + ',true,8,30)', '-30HP') +
        renderBtn2(T('actOt2_6'), e6, f6, 12, k6, 'doOvertime(' + e6 + ', 80, true, 12, \'intl\')', '-80HP') +
        '</div><button class="cb" onclick="closeM()" style="margin-top:6px;width:100%">' + T('actOt2No') + '</button>');
}
function mOvertime3() {
    if (!canWork()) return; var eff = getEfficiency();
    var e1 = Math.round(calcOT(2.2) * eff), f1 = fatAmt(22), k1 = 50;
    var e2 = Math.round(calcOT(4.5) * eff), f2 = fatAmt(45), k2 = 100;
    var e3 = Math.round(calcOT(6.0) * eff), f3 = fatAmt(65), k3 = 150;

    function renderBtn3(txt, earn, fat, hrs, reqKn, jsCall, hpL) {
        if (G.knowledge >= reqKn) {
            return '<button class="cb" onclick="' + jsCall + '" style="border-color:rgba(255,50,50,.5)">' + txt + '<span class="cb-tag cb-good">+' + fmt(earn) + '</span><span class="cb-tag cb-bad">+' + fat + '% mệt | ' + hpL + ' | ' + hrs + 'h</span></button>';
        } else {
            return '<button class="cb" style="opacity:0.5;cursor:not-allowed">🔒 ' + txt + '<span class="cb-tag" style="color:#aaa">Cần ' + reqKn + ' Tri Thức</span></button>';
        }
    }

    showM(T('actOt3Title'), '<p>' + T('actOt3Sub') + '</p>' +
        (G.fatigue > 50 ? '<div class="wbox">⚠ Nguy hiểm — Mệt >50%!</div>' : '') +
        '<div class="cg">' +
        renderBtn3(T('actOt3_1'), e1, f1, 4, k1, 'doOvertime(' + e1 + ',' + f1 + ',true,4)', '-10HP') +
        renderBtn3(T('actOt3_2'), e2, f2, 7, k2, 'doOvertime(' + e2 + ',' + f2 + ',true,7)', '-25HP') +
        renderBtn3(T('actOt3_3'), e3, f3, 9, k3, 'doOvertime(' + e3 + ',' + f3 + ',true,9)', '-40HP') +
        '<button class="cb" onclick="closeM()">' + T('actOt3No') + '</button></div>');
}

function mStudy() {
    if (!canWork()) return; var eff = getEfficiency();
    var hList = [
        { id: '1', name: 'Đọc sách Kỹ Năng', ic: '📖', kn: 5, f: fatAmt(5), h: 1, e: 0, ed: 5 },
        { id: '2', name: 'Thuyết Trình', ic: '🎤', kn: 12, f: fatAmt(10), h: 2, e: 0, ed: 10 },
        { id: '3', name: 'Teamwork', ic: '🤝', kn: 15, f: fatAmt(12), h: 2, e: 0, ed: 12 },
        { id: '4', name: 'Nấu Nướng', ic: '🍳', kn: 20, f: fatAmt(10), h: 3, e: 0, ed: 8 },
        { id: '5', name: 'Lãnh Đạo', ic: '👑', kn: 30, f: fatAmt(20), h: 4, e: 0, ed: 18 },
        { id: '6', name: 'Học Tiếng Anh', ic: '🇺🇸', kn: 45, f: fatAmt(25), h: 5, e: 0, ed: 20 },
        { id: '7', name: 'Học Tiếng Hàn', ic: '🇰🇷', kn: 45, f: fatAmt(25), h: 5, e: 0, ed: 20 },
        { id: '8', name: 'Học Tiếng Pháp', ic: '🇫🇷', kn: 45, f: fatAmt(25), h: 5, e: 0, ed: 20 },
        { id: '9', name: 'Ôn thi THPTQG', ic: '📝', kn: 80, f: fatAmt(40), h: 8, e: 0, ed: 35 }
    ];
    var btnHtml = '';
    for (var i = 0; i < hList.length; i++) {
        var o = hList[i];
        var badTag = '+' + o.f + '% mệt | ' + o.h + 'h';
        btnHtml += '<button class="cb" onclick="doStudy(' + o.kn + ',' + o.f + ',' + o.h + ', ' + o.ed + ')">' + o.ic + ' ' + o.name + '<span class="cb-tag cb-good">+' + o.kn + ' Tri Thức</span><span class="cb-tag cb-bad">' + badTag + '</span></button>';
    }
    showM('📚 HỌC THÊM KỸ NĂNG', '<p style="color:rgba(200,180,200,.8);font-size:13px;margin-bottom:12px">Học thêm để mở khóa các công việc lương cao. Điểm Tri Thức hiện tại: <b style="color:#00d4b4">' + Math.floor(G.knowledge) + '</b></p><div class="cg" style="height:300px;overflow-y:auto">' + btnHtml + '<button class="cb" onclick="closeM()" style="position:sticky;bottom:0;background:#1a1a1a">❌ Đóng</button></div>');
}

function doStudy(knGain, fat, hours, enDrain) {
    closeM(); G.workingAnim = true; G.workAnimTimer = 30;
    var typInt = setInterval(function () { if (G.workAnimTimer > 0) SFX.typing(); else clearInterval(typInt); }, 250);
    setTimeout(function () {
        G.workingAnim = false;
        G.knowledge += knGain;
        G.fatigue = Math.min(100, G.fatigue + fat);
        G.energy = Math.max(0, G.energy - enDrain);
        G.stats.totalWork += hours;
        if (G.fatigue >= 70 || G.hp <= 35) G.stats.warningIgnores++;

        updateGameTime(hours);
        spawnP(G.p.x, G.p.y, 'money'); // Uses money particles for now
        popText(G.p.x, G.p.y, '+' + knGain + ' Tri Thức'); SFX.win();
        checkDanger();
        if (G.fatigue >= 100) triggerDeath('exhaustion'); else checkWin();
    }, 800);
}

function mFreelance() {
    if (!canWork()) return; var eff = getEfficiency();
    var lst = [
        { id: 1, e: Math.round(calcOT(1.8) * eff), f: fatAmt(12), h: 3, hp: 0, k: 0 },
        { id: 2, e: Math.round(calcOT(1.0) * eff), f: fatAmt(7), h: 2, hp: 0, k: 0 },
        { id: 3, e: Math.round(calcOT(0.5) * eff), f: fatAmt(4), h: 1, hp: 0, k: 0 },
        { id: 4, e: Math.round(calcOT(0.7) * eff), f: fatAmt(5), h: 4, hp: 0, k: 0 },
        { id: 5, e: Math.round(calcOT(1.3) * eff), f: fatAmt(16), h: 2, hp: -2, k: 0 },
        { id: 6, e: Math.round(calcOT(0.9) * eff), f: fatAmt(10), h: 3, hp: 0, k: 20 },
        { id: 7, e: Math.round(calcOT(2.2) * eff), f: fatAmt(24), h: 5, hp: -8, k: 20 },
        { id: 8, e: Math.round(calcOT(0.8) * eff), f: fatAmt(8), h: 2, hp: 0, k: 20 },
        { id: 9, e: Math.round(calcOT(1.5) * eff), f: fatAmt(18), h: 4, hp: -3, k: 20 },
        { id: 10, e: Math.round(calcOT(0.4) * eff), f: fatAmt(3), h: 1, hp: 0, k: 20 },
        { id: 11, e: Math.round(calcOT(2.5) * eff), f: fatAmt(28), h: 6, hp: -10, k: 50 },
        { id: 12, e: Math.round(calcOT(1.1) * eff), f: fatAmt(12), h: 3, hp: -1, k: 50 },
        { id: 13, e: Math.round(calcOT(1.3) * eff), f: fatAmt(15), h: 4, hp: 0, k: 50 },
        { id: 14, e: Math.round(calcOT(0.8) * eff), f: fatAmt(6), h: 2, hp: 0, k: 50 },
        { id: 15, e: Math.round(calcOT(1.2) * eff), f: fatAmt(10), h: 3, hp: 0, k: 50 },
        { id: 16, e: Math.round(calcOT(0.6) * eff), f: Math.round(fatAmt(2) - 5), h: 2, hp: +2, k: 100 },
        { id: 17, e: Math.round(calcOT(1.4) * eff), f: fatAmt(13), h: 4, hp: 0, k: 100 }
    ];
    var btnHtml = '';
    for (var i = 0; i < lst.length; i++) {
        var o = lst[i];
        var badTag = '+' + o.f + '% mệt' + (o.hp < 0 ? ' | ' + o.hp + 'HP' : '') + ' | ' + o.h + 'h';
        if (G.knowledge >= o.k) {
            btnHtml += '<button class="cb" onclick="doOvertime(' + o.e + ',' + o.f + ',' + (o.hp < 0 ? "true" : "false") + ',' + o.h + ', ' + Math.abs(o.hp) + ')">' + T('actFree_' + o.id) + '<span class="cb-tag cb-good">+' + fmt(o.e) + '</span><span class="cb-tag cb-bad">' + badTag + '</span></button>';
        } else {
            btnHtml += '<button class="cb" style="opacity:0.5;cursor:not-allowed">🔒 ' + T('actFree_' + o.id) + '<span class="cb-tag" style="color:#aaa">Cần ' + o.k + ' Tri Thức</span></button>';
        }
    }
    showM(T('actFreeTitle'), '<p>' + T('actFreeSub') + '</p><div class="cg" style="height:300px;overflow-y:auto">' + btnHtml + '<button class="cb" onclick="closeM()" style="position:sticky;bottom:0;background:#1a1a1a">' + T('actFreeNo') + '</button></div>');
}
function doOvertime(earn, fat, overnight, hours, customHpLoss) {
    hours = hours || 3;
    var projectedHp = G.hp - (customHpLoss !== undefined && customHpLoss !== false ? customHpLoss : (overnight ? (hours <= 4 ? 10 : (hours <= 7 ? 25 : 40)) : Math.round(hours * 1.5)));
    var projectedFat = G.fatigue + fat;

    if (!G.aiDeathWarned && (projectedHp <= 20 || projectedFat >= 85)) {
        closeM();
        setTimeout(function () {
            showM('🚨 CẢNH BÁO AI XUYÊN PHÁP 🚨',
                '<div style="text-align:center; animation:pulse-red 1s infinite; margin-bottom:15px">' +
                '<span style="font-size:60px; text-shadow: 0 0 20px #ff0000">🧬</span></div>' +
                '<p style="color:#ff4444;font-size:16px;font-weight:bold;text-align:center;text-transform:uppercase">HỆ THỐNG AI DỰ ĐOÁN TUỔI THỌ PHÁT HIỆN DẤU HIỆU ĐỘT TỬ!</p>' +
                '<p style="color:#ddd;line-height:1.5;margin-bottom:15px">Cơ thể bạn đã chạm ngưỡng chịu đựng tối đa. Theo phân tích sinh học hiện tại của hệ thống AI, nếu bạn tiếp tục cắn răng làm công việc này, <b>tuổi thọ của bạn sẽ cạn kiệt ngay lập tức và dẫn đến Đột Quỵ / Qua đời!</b></p>' +
                '<div style="background:rgba(255,0,0,0.1); border-left: 3px solid #ff0000; padding:10px; margin-bottom:15px"><p style="color:#ffaa00;font-size:12px;font-style:italic">Sinh mệnh không thể có lại. Đừng vì tiền mà đánh đổi sự sống.</p></div>' +
                '<div style="display:flex; flex-direction:column; gap:8px"><button class="bok gold" onclick="closeM(); G.aiDeathWarned = true;">TÔI HIỂU - TÔI SẼ NGHỈ NGƠI NGAY</button>' +
                '<button class="cb" style="border-color:#440000;color:#ff5555" onclick="G.aiDeathWarned = true; doOvertime(' + earn + ',' + fat + ',' + overnight + ',' + hours + ',' + (customHpLoss ? ('\'' + customHpLoss + '\'') : 'false') + ');">MẶC KỆ AI - TÔI CẦN TIỀN (NGUY HIỂM)</button></div>');
        }, 100);
        return;
    }

    closeM(); G.workingAnim = true; G.workAnimTimer = 40;
    startWorkTimer('⌨ Đang làm việc (' + hours + 'h)', hours, true, false);
    var typInt = setInterval(function () { if (G.workAnimTimer > 0) SFX.typing(); else clearInterval(typInt); }, 200);
    var duration = hours * 1200;
    setTimeout(function () {
        G.workingAnim = false;
        G.money += earn;

        if (customHpLoss === 'intl') {
            G.fatigue = Math.min(99, G.fatigue + 80);
            G.hp = Math.max(1, G.hp - 80);
            G.energy = Math.max(0, G.energy - 80);
        } else {
            G.fatigue = Math.min(100, G.fatigue + fat);
            var baseHpLoss = overnight ? (hours <= 4 ? 10 : (hours <= 7 ? 25 : 40)) : Math.round(hours * 1.5);
            var hpLoss = (customHpLoss !== undefined && customHpLoss !== false) ? customHpLoss : baseHpLoss;
            G.hp = Math.max(1, G.hp - hpLoss);
            drainEnergy(hours, overnight ? 1.5 : 1);
        }

        updateGameTime(hours);
        G.stats.totalWork += hours;
        G.totalOvertimeHours = (G.totalOvertimeHours || 0) + hours;
        // Track character-specific freelance actions
        if (G.character === 'lan') { G.totalSewingJobs = (G.totalSewingJobs || 0) + 1; G.totalOnlineSales = (G.totalOnlineSales || 0) + (Math.random() < 0.5 ? 1 : 0); }
        if (G.character === 'hung' && hours <= 2) { G.totalShipperRuns = (G.totalShipperRuns || 0) + 1; }
        if (G.character === 'hung' && hours >= 3) { G.totalFreelanceCode = (G.totalFreelanceCode || 0) + 1; }
        if (G.fatigue >= 70 || G.hp <= 35) G.stats.warningIgnores++;
        spawnP(G.p.x, G.p.y, 'money'); popText(G.p.x, G.p.y, '+' + fmt(earn)); SFX.bigcoin();
        checkDanger();
        // Cảnh báo đói sau khi làm
        if (G.hunger <= 30) {
            setTimeout(function() {
                showM('🍔 BỤN ĐÓI QUÁ!', '<div class="wbox" style="text-align:center"><p style="font-size:18px;margin-bottom:8px">😫 Bụng đói cồn cào...</p><p style="color:#ddd;font-size:13px">Bạn cần ăn gì đó ngay! Hãy ra <b style="color:#ff8844">Nhà Hàng</b> hoặc <b style="color:#ffaa00">Fast Food</b> trên bản đồ để nạp năng lượng.</p></div>' +
                    '<div style="display:flex;gap:8px;margin-top:12px"><button class="bok gold" onclick="closeM()" style="flex:1">👍 ĐÃ HIỂU</button></div>');
            }, 500);
        }
        if (G.fatigue >= 100) triggerDeath('exhaustion'); else checkWin();
    }, duration);
}
function mSleep() {
    showM(T('actSleepTitle'), '<p>' + T('actSleepSub') + '</p>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doSleep(2)">' + T('actSleep2') + '<span class="cb-tag cb-good">-10% mệt | +3HP</span><span class="cb-tag cb-bad">2 giờ</span></button>' +
        '<button class="cb" onclick="doSleep(4)">' + T('actSleep4') + '<span class="cb-tag cb-good">-20% mệt | +7HP</span><span class="cb-tag cb-bad">4 giờ</span></button>' +
        '<button class="cb" onclick="doSleep(6)">' + T('actSleep6') + '<span class="cb-tag cb-good">-35% mệt | +10HP</span><span class="cb-tag cb-bad">6 giờ</span></button>' +
        '<button class="cb" onclick="doSleep(8)">' + T('actSleep8') + '<span class="cb-tag cb-good">-50% mệt | +15HP | +⚡</span><span class="cb-tag cb-bad">8 giờ</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actSleepNo') + '</button></div>');
}
function doSleep(hours) {
    closeM();
    var duration = hours * 1200;
    startWorkTimer('🛏 Đang ngủ (' + hours + 'h)', hours, false, true);
    setTimeout(function () {
        var fatReduce = hours === 2 ? 10 : (hours === 4 ? 20 : (hours === 6 ? 35 : 50));
        var hpGain = hours === 2 ? 3 : (hours === 4 ? 7 : (hours === 6 ? 10 : 15));
        G.fatigue = Math.max(0, G.fatigue - fatReduce);
        G.hp = Math.min(100, G.hp + hpGain);
        if (hours >= 6) { G.sleptYesterday = true; G.hoursAwake = 0; } else { G.sleptYesterday = false; }
        recoverEnergy(hours, 1.2);
        G.stats.totalSleep += hours;
        SFX.sleep(); popText(G.p.x, G.p.y, 'ZZZ... -' + fatReduce + '%');
        updateGameTime(hours); checkDanger();
    }, duration);
}
function mRest() {
    showM(T('actRestTitle'), '<p>' + T('actRestSub') + '</p>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doRest(2)">' + T('actRest2') + '<span class="cb-tag cb-good">-20% mệt | +5HP</span><span class="cb-tag cb-bad">2 giờ</span></button>' +
        '<button class="cb" onclick="doRest(4)">' + T('actRest4') + '<span class="cb-tag cb-good">-40% mệt | +10HP</span><span class="cb-tag cb-bad">4 giờ</span></button>' +
        '<button class="cb" onclick="doRest(6)">' + T('actRest6') + '<span class="cb-tag cb-good">-60% mệt | +15HP</span><span class="cb-tag cb-bad">6 giờ</span></button>' +
        '<button class="cb" onclick="doRest(24)">' + T('actRest24') + '<span class="cb-tag cb-good">100% Phục hồi</span><span class="cb-tag cb-bad">24 giờ</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actRestNo') + '</button></div>');
}
function doRest(hours) {
    closeM();
    var duration = hours * 1200;
    startWorkTimer('🧘 Đang nghỉ ngơi (' + hours + 'h)', hours, false, true);
    setTimeout(function () {
        var fatReduce = hours === 2 ? 20 : (hours === 4 ? 40 : (hours === 6 ? 60 : 100));
        var hpGain = hours === 2 ? 5 : (hours === 4 ? 10 : (hours === 6 ? 15 : 50));
        G.fatigue = Math.max(0, G.fatigue - fatReduce);
        G.hp = Math.min(100, G.hp + hpGain);
        recoverEnergy(hours >= 24 ? 8 : hours, 0.8);
        if (hours >= 24) { G.sleptYesterday = true; G.hoursAwake = 0; }
        updateGameTime(hours); popText(G.p.x, G.p.y, '-' + fatReduce + '% mệt | ' + hours + 'h'); SFX.sleep(); checkDanger();
        G.stats.totalSleep += hours;
    }, duration);
}
function mCoffee() {
    showM(T('actDrinksTitle'),
        '<p>' + T('actDrinksSub') + '</p>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doDrink(\'coffee\')" style="border-color:rgba(210,150,50,.4)">' + T('actDrinksCoffee') +
        '<span class="cb-tag cb-good">-15% mệt | +15⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(50000 * (1 + G.coffeeToday)) + '</span>' +
        (G.coffeeToday >= 3 ? '<span class="cb-tag cb-bad">' + T('actDrinksCoffeeWarn') + '</span>' : '') + '</button>' +
        '<button class="cb" onclick="doDrink(\'milktea\')" style="border-color:rgba(220,130,180,.4)">' + T('actDrinksMilktea') +
        '<span class="cb-tag cb-good">-10% mệt | +10⚡ | +3HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(65000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'water\')" style="border-color:rgba(100,180,255,.4)">' + T('actDrinksWater') +
        '<span class="cb-tag cb-good">-5% mệt | +5⚡</span>' +
        '<span class="cb-tag" style="color:#4ecdc4">' + T('actFree') + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'milk\')" style="border-color:rgba(255,255,220,.3)">' + T('actDrinksMilk') +
        '<span class="cb-tag cb-good">-8% mệt | +8HP | +8⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(35000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'matcha\')" style="border-color:rgba(100,220,100,.4)">' + T('actDrinksMatcha') +
        '<span class="cb-tag cb-good">-12% mệt | +12 | +5HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(70000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'cola\')" style="border-color:rgba(220,50,50,.4)">' + T('actDrinksCola') +
        '<span class="cb-tag cb-good">-10% mệt | +15⚡ | -3HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(20000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'lemon\')" style="border-color:rgba(240,240,100,.4)">' + T('actDrinksLemon') +
        '<span class="cb-tag cb-good">-5% mệt | +10⚡ | +2HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(25000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'chocolate\')" style="border-color:rgba(140,80,50,.4)">' + T('actDrinksChocolate') +
        '<span class="cb-tag cb-good">-12% mệt | +15⚡ | +5HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(40000) + '</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actDrinksNo') + '</button></div>');
}

function mFood() {
    showM('🍽️ NHÀ HÀNG CHÍNH',
        '<p style="color:rgba(200,180,200,.8);font-size:13px;margin-bottom:12px">Thưởng thức các món chính để no bụng, hồi máu và tăng năng lượng.</p>' +
        '<div class="cg" style="height:350px;overflow-y:auto;padding-right:5px">' +
        '<button class="cb" onclick="doDrink(\'noodles\')" style="border-color:rgba(230,170,80,.4)">' + T('actDrinksNoodles') +
        '<span class="cb-tag cb-good">+15HP | +15⚡ | +3% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(25000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'pho\')" style="border-color:rgba(255,180,100,.4)">' + T('actDrinksPho') +
        '<span class="cb-tag cb-good">+25HP | +20⚡ | +4% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(60000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'friedrice\')" style="border-color:rgba(220,160,50,.4)">' + T('actDrinksFriedRice') +
        '<span class="cb-tag cb-good">+40🍖 | +35⚡ | +5HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(50000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'brokenrice\')" style="border-color:rgba(240,140,40,.4)">' + T('actDrinksBrokenRice') +
        '<span class="cb-tag cb-good">+45🍖 | +35⚡ | +5HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(65000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'banhcuon\')" style="border-color:rgba(230,230,200,.4)">' + T('actDrinksBanhCuon') +
        '<span class="cb-tag cb-good">+20HP | +15⚡ | +2% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(35000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'soup\')" style="border-color:rgba(200,150,50,.4)">' + T('actDrinksSoup') +
        '<span class="cb-tag cb-good">+12HP | +10⚡ | -2% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(30000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'porridge\')" style="border-color:rgba(220,220,200,.4)">' + T('actDrinksPorridge') +
        '<span class="cb-tag cb-good">+15HP | +15⚡ | -3% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(25000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'soursoup\')" style="border-color:rgba(255,100,50,.4)">' + T('actDrinksSourSoup') +
        '<span class="cb-tag cb-good">+35🍖 | +10HP | +20⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(55000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'braisedcarp\')" style="border-color:rgba(180,100,20,.4)">' + T('actDrinksBraisedCarp') +
        '<span class="cb-tag cb-good">+40🍖 | +10HP | +25⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(80000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'braisedpork\')" style="border-color:rgba(150,80,20,.4)">' + T('actDrinksBraisedPork') +
        '<span class="cb-tag cb-good">+50🍖 | +15HP | +30⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(60000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'boiledegg\')" style="border-color:rgba(250,250,200,.4)">' + T('actDrinksBoiledEgg') +
        '<span class="cb-tag cb-good">+10🍖 | +2HP | +5⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(10000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'friedegg\')" style="border-color:rgba(240,200,50,.4)">' + T('actDrinksFriedEgg') +
        '<span class="cb-tag cb-good">+15🍖 | +2HP | +8⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(15000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'stickyrice\')" style="border-color:rgba(200,200,100,.4)">' + T('actDrinksStickyRice') +
        '<span class="cb-tag cb-good">+30🍖 | +5HP | +20⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(25000) + '</span></button>' +
        '<button class="cb" onclick="closeM()" style="position:sticky;bottom:0;background:#1a1a1a">Đóng Thực Đơn</button></div>');
}

function mFastFood() {
    showM('🍔 FAST FOOD',
        '<p style="color:rgba(200,180,200,.8);font-size:13px;margin-bottom:12px">Đồ ăn nhanh, tiện lợi nhưng có thể làm tăng nhẹ mệt mỏi nếu ăn quá thường xuyên.</p>' +
        '<div class="cg" style="height:350px;overflow-y:auto;padding-right:5px">' +
        '<button class="cb" onclick="doDrink(\'fries\')" style="border-color:rgba(255,200,50,.4)">' + T('actDrinksFries') +
        '<span class="cb-tag cb-good">+10HP | +10⚡ | +2% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(45000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'chicken\')" style="border-color:rgba(200,100,50,.4)">' + T('actDrinksChicken') +
        '<span class="cb-tag cb-good">+20HP | +25⚡ | +5% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(80000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'pizza\')" style="border-color:rgba(250,150,100,.4)">' + T('actDrinksPizza') +
        '<span class="cb-tag cb-good">+35HP | +40⚡ | +8% mệt</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(150000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'hamburger\')" style="border-color:rgba(250,180,100,.4)">' + T('actDrinksHamburger') +
        '<span class="cb-tag cb-good">+35🍖 | +5HP | +25⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(45000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'banhmi\')" style="border-color:rgba(220,150,50,.4)">' + T('actDrinksBanhMi') +
        '<span class="cb-tag cb-good">+25🍖 | +5HP | +15⚡</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(20000) + '</span></button>' +
        '<button class="cb" onclick="doDrink(\'icecream\')" style="border-color:rgba(180,240,255,.4)">' + T('actDrinksIceCream') +
        '<span class="cb-tag cb-good">-8% mệt | +12⚡ | +2HP</span>' +
        '<span class="cb-tag cb-cost">-' + fmt(30000) + '</span></button>' +
        '<button class="cb" onclick="closeM()" style="position:sticky;bottom:0;background:#1a1a1a">Đóng Thực Đơn</button></div>');
}
function doDrink(type) {
    closeM();
    var drinks = {
        'coffee': { cost: 50000 * (1 + G.coffeeToday), fat: -15, hp: (G.coffeeToday >= 3 ? -10 : 0), en: 15, hu: 0, isCoffee: true, ico: '☕' },
        'milktea': { cost: 65000, fat: -10, hp: 3, en: 10, hu: 5, isCoffee: false, ico: '🧋' },
        'water': { cost: 0, fat: -5, hp: 0, en: 5, hu: 0, isCoffee: false, ico: '💧' },
        'milk': { cost: 35000, fat: -8, hp: 8, en: 8, hu: 10, isCoffee: false, ico: '🥛' },
        'matcha': { cost: 70000, fat: -12, hp: 5, en: 12, hu: 5, isCoffee: false, ico: '🍵' },
        'cola': { cost: 20000, fat: -10, hp: -3, en: 15, hu: 0, isCoffee: false, ico: '🥤' },
        'lemon': { cost: 25000, fat: -5, hp: 2, en: 10, hu: 0, isCoffee: false, ico: '🍋' },
        'fries': { cost: 45000, fat: 2, hp: 2, en: 10, hu: 15, isCoffee: false, ico: '🍟' },
        'chicken': { cost: 80000, fat: 5, hp: 5, en: 25, hu: 35, isCoffee: false, ico: '🍗' },
        'pizza': { cost: 150000, fat: 8, hp: 10, en: 40, hu: 50, isCoffee: false, ico: '🍕' },
        'noodles': { cost: 25000, fat: 3, hp: 5, en: 15, hu: 20, isCoffee: false, ico: '🍜' },
        'pho': { cost: 60000, fat: 4, hp: 5, en: 20, hu: 35, isCoffee: false, ico: '🍲' },
        'friedrice': { cost: 50000, fat: 6, hp: 5, en: 35, hu: 40, isCoffee: false, ico: '🍛' },
        'brokenrice': { cost: 65000, fat: 7, hp: 5, en: 35, hu: 45, isCoffee: false, ico: '🍱' },
        'icecream': { cost: 30000, fat: -8, hp: 2, en: 12, hu: 5, isCoffee: false, ico: '🍦' },
        'chocolate': { cost: 40000, fat: -12, hp: 5, en: 15, hu: 10, isCoffee: false, ico: '🍫' },
        'banhcuon': { cost: 35000, fat: 2, hp: 5, en: 15, hu: 25, isCoffee: false, ico: '🌯' },
        'soup': { cost: 30000, fat: -2, hp: 5, en: 10, hu: 20, isCoffee: false, ico: '🍲' },
        'porridge': { cost: 25000, fat: -3, hp: 5, en: 15, hu: 25, isCoffee: false, ico: '🥣' },
        'soursoup': { cost: 55000, fat: -5, hp: 10, en: 20, hu: 35, isCoffee: false, ico: '🥘' },
        'braisedcarp': { cost: 80000, fat: -6, hp: 10, en: 25, hu: 40, isCoffee: false, ico: '🐟' },
        'braisedpork': { cost: 60000, fat: -4, hp: 15, en: 30, hu: 50, isCoffee: false, ico: '🍖' },
        'boiledegg': { cost: 10000, fat: -1, hp: 2, en: 5, hu: 10, isCoffee: false, ico: '🥚' },
        'friedegg': { cost: 15000, fat: -2, hp: 2, en: 8, hu: 15, isCoffee: false, ico: '🍳' },
        'stickyrice': { cost: 25000, fat: -2, hp: 5, en: 20, hu: 30, isCoffee: false, ico: '🍚' },
        'banhmi': { cost: 20000, fat: -1, hp: 5, en: 15, hu: 25, isCoffee: false, ico: '🥖' },
        'hamburger': { cost: 45000, fat: 2, hp: 5, en: 25, hu: 35, isCoffee: false, ico: '🍔' }
    };
    var d = drinks[type]; if (!d) return;
    if (d.cost > 0 && G.money < d.cost) { showM(T('actNoMoneyTitle'), '<p>' + T('actNoMoneySub') + '</p><button class="bok" onclick="closeM()">' + T('actOk') + '</button>'); return; }
    if (d.cost > 0) G.money = Math.max(0, G.money - d.cost);
    G.fatigue = Math.max(0, Math.min(100, G.fatigue + d.fat));
    G.energy = Math.min(100, G.energy + d.en);
    G.hp = Math.max(1, Math.min(100, G.hp + d.hp));
    recoverHunger(d.hu);

    // Ăn đồ ăn thì Khánh tăng cân
    if (G.character === 'khanh' && d.hu >= 15) {
        var weightGain = Math.round(d.hu / 20 * 10) / 10; // ~0.5-2.5kg tuỳ đồ ăn
        G.khanhWeight = Math.min(120, G.khanhWeight + weightGain);
        var wv = document.getElementById('weightV');
        if (wv) wv.textContent = G.khanhWeight.toFixed(1) + ' kg';
    }

    if (d.isCoffee) { G.coffeeToday++; G.stats.totalCoffee++; }
    updateGameTime(1);
    popText(G.p.x, G.p.y, d.ico + (d.cost > 0 ? ' -' + fmt(d.cost) : ' FREE') + ' +' + (d.hp || 0) + 'HP');
    SFX.coffee(); if (G.hp <= 0) triggerDeath('overdose'); checkDanger();
}

var MALL_ITEMS = {
    'jacket': { id: 'mall_jacket', price: 650000, type: 'clothes', relBonus: 30, icon: '🧥' },
    'shoes': { id: 'mall_shoes', price: 500000, type: 'clothes', relBonus: 25, icon: '👟' },
    'teddy': { id: 'mall_teddy', price: 150000, type: 'gifts', relBonus: 18, icon: '🧸' },
    'doll': { id: 'mall_doll', price: 80000, type: 'gifts', relBonus: 10, icon: '🪆' },
    'lego': { id: 'mall_lego', price: 450000, type: 'gifts', relBonus: 35, icon: '🧱' },
    'flowers': { id: 'mall_flowers', price: 200000, type: 'gifts', relBonus: 18, icon: '💐' },
    'necklace': { id: 'mall_necklace', price: 1200000, type: 'luxury', relBonus: 50, icon: '📿' },
    'perfume': { id: 'mall_perfume', price: 850000, type: 'luxury', relBonus: 40, icon: '✨' },
    'ring': { id: 'mall_ring', price: 5000000, type: 'luxury', relBonus: 100, icon: '💍' },
    'watch': { id: 'mall_watch', price: 3500000, type: 'luxury', relBonus: 80, icon: '⌚' }
};

function getMallItemName(key) {
    var it = MALL_ITEMS[key];
    if (!it) return key;
    return T(it.id);
}

function mMall() {
    var html = '<p style="margin-bottom:12px;color:rgba(200,180,200,.8);font-size:13px">Mua sắm đồ đạc, quần áo hoặc quà tặng cho gia đình. Tiền của bạn: <b style="color:#ffd700">' + fmt(G.money) + '</b></p>';
    html += '<div style="max-height:300px;overflow-y:auto;padding-right:5px"><div class="cg" style="grid-template-columns:1fr 1fr">';
    for (var key in MALL_ITEMS) {
        var it = MALL_ITEMS[key];
        html += '<button class="cb" onclick="buyMallItem(\'' + key + '\', ' + it.price + ')">' + it.icon + ' ' + getMallItemName(key) + '<span class="cb-tag cb-good">+' + it.relBonus + ' T.Cảm</span><span class="cb-tag cb-bad">-' + fmt(it.price) + '</span></button>';
    }
    html += '</div></div><button class="cb" onclick="closeM()" style="margin-top:8px">Đóng Cửa Hàng</button>';
    showM('🛍 TRUNG TÂM MUA SẮM', html);
}

function buyMallItem(key, price) {
    if (G.money < price) {
        showM('❌ KHÔNG ĐỦ TIỀN', '<p>Bạn cần ít nhất <b>' + fmt(price) + '</b> để mua vật phẩm này. Bạn chỉ có <b>' + fmt(G.money) + '</b>.</p><button class="bok" onclick="mMall()">Quay Lại</button>');
        return;
    }
    G.money -= price;
    G.inventory.push(key);
    popText(G.p.x, G.p.y, '-' + fmt(price));
    updateHUD();
    SFX.coffee();
    mMall();
}

function mInventory() {
    if (G.inventory.length === 0) {
        showM('🎒 TỦ ĐỒ', '<p style="color:#aaa;text-align:center;padding:20px">Túi đồ của bạn đang trống.<br>Hãy đến Trung tâm mua sắm để mua quà nhé.</p><button class="bok" onclick="closeM()">Đóng</button>');
        return;
    }

    // Group inventory
    var counts = {};
    G.inventory.forEach(function (k) { counts[k] = (counts[k] || 0) + 1; });

    var html = '<p style="margin-bottom:12px;color:rgba(200,180,200,.8);font-size:13px">Bạn có thể chọn quà để tặng Vợ hoặc Con gái.</p>';
    html += '<div style="max-height:300px;overflow-y:auto;padding-right:5px">';

    for (var key in counts) {
        var count = counts[key];
        var it = MALL_ITEMS[key];
        if (!it) continue;
        html += '<div style="background:rgba(255,255,255,.05);padding:10px;margin-bottom:8px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">';
        html += '<div><span style="font-size:24px;margin-right:8px">' + it.icon + '</span> <b>' + getMallItemName(key) + '</b> <span style="color:#ffd700;font-size:12px">x' + count + '</span><br><span style="color:#a8e6cf;font-size:11px">+' + it.relBonus + ' Tình cảm</span></div>';
        html += '<div style="display:flex;gap:4px">';
        if (G.character !== 'lan') {
            html += '<button onclick="giveGift(\'wife\', \'' + key + '\')" style="background:#ff9a9e;color:#fff;border:none;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:12px">Tặng Vợ</button>';
        }
        html += '<button onclick="giveGift(\'daughter\', \'' + key + '\')" style="background:#fecfef;color:#333;border:none;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:12px">Tặng Con</button>';
        if (G.character === 'khanh') {
            html += '<button onclick="giveGift(\'boss\', \'' + key + '\')" style="background:#fca5a5;color:#991b1b;border:none;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:12px">Tặng Sếp</button>';
        }
        html += '</div></div>';
    }

    html += '</div><button class="cb" onclick="closeM()" style="margin-top:8px">Đóng Túi Đồ</button>';
    showM('🎒 TỦ ĐỒ CỦA BẠN', html);
}

function giveGift(target, key) {
    var it = MALL_ITEMS[key];
    if (!it) return;
    var idx = G.inventory.indexOf(key);
    if (idx === -1) return;

    G.inventory.splice(idx, 1);

    var bonus = it.relBonus;
    var msg = '';

    if (target === 'wife') {
        G.relWife = Math.min(100, G.relWife + bonus);
        if (it.type === 'luxury') bonus += 5; // Extra bonus for luxury
        msg = 'Vợ bạn rất cảm động: "Cảm ơn anh nhé, anh đi làm vất vả rồi mà còn mua quà cho em nữa."';
    } else if (target === 'daughter') {
        G.relDaughter = Math.min(100, G.relDaughter + bonus);
        if (it.type === 'gifts') bonus += 5; // Extra bonus for toys
        msg = 'Bé Linh nhảy cẫng lên: "Tuyệt quá! Con thích món này lắm, ba là số một!"';
    } else if (target === 'boss') {
        bonus *= 2; // Sếp thích đồ xịn, tăng double hảo cảm
        G.bossRel = (G.bossRel || 0) + bonus;
        G.money += bonus * 10000; // Sếp thưởng tiền
        G.hp += 10;
        msg = 'Sếp Tổng rất vui: "Cậu Khánh chu đáo quá! Dự án đợt này công ty sẽ thưởng cho cậu." (+' + fmt(bonus * 10000) + ' & +10 HP)';

        if ((G.npcStates['Sếp Tổng'] || 'init') === 'init' && G.khanhTasksDone >= 2 && G.khanhWeight <= 95 && G.bossRel >= 10) {
            G.npcStates['Sếp Tổng'] = 'promoted_1';
        } else if (G.npcStates['Sếp Tổng'] === 'promoted_1' && G.khanhTasksDone >= 5 && G.khanhWeight <= 85 && G.bossRel >= 30) {
            G.npcStates['Sếp Tổng'] = 'promoted_2';
        }
    }

    SFX.win();
    updateHUD();
    showM('💖 TẶNG QUÀ THÀNH CÔNG', '<div class="gbox" style="text-align:center;padding:15px"><span style="font-size:40px">' + it.icon + '</span><p style="margin-top:10px;font-size:14px">' + msg + '</p></div><p style="color:#a8e6cf;text-align:center;margin-top:10px">+' + bonus + ' Tình cảm</p><button class="bok" onclick="mInventory()">Quay Lại Tủ Đồ</button>');
}

function mDoctor() {
    var diffMult = getDiff().gm;
    var c20 = Math.round((80000 + G.level * 40000) * diffMult);      // Khám nhỏ
    var c40 = Math.round((120000 + G.level * 70000) * diffMult);     // X-quang
    var c50 = Math.round((200000 + G.level * 100000) * diffMult);    // Khám cơ bản
    var c100 = Math.round((450000 + G.level * 150000) * diffMult);   // Gói toàn phần
    showM(T('actDocTitle'), '<p>' + T('actDocSub') + '</p>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doDoctor(' + c20 + ', 20, 10, 1)">🏥 Khám nhỏ / Kê đơn<span class="cb-tag cb-good">+20HP | -10% mệt | 1h</span><span class="cb-tag cb-cost">-' + fmt(c20) + '</span></button>' +
        '<button class="cb" onclick="doDoctor(' + c40 + ', 40, 15, 1)">🏥 Chụp X-Quang<span class="cb-tag cb-good">+40HP | -15% mệt | 1h</span><span class="cb-tag cb-cost">-' + fmt(c40) + '</span></button>' +
        '<button class="cb" onclick="doDoctor(' + c50 + ', 50, 20, 2)">🏥 ' + T('actDocBasic') + '<span class="cb-tag cb-good">+50HP | -20% mệt | 2h</span><span class="cb-tag cb-cost">-' + fmt(c50) + '</span></button>' +
        '<button class="cb" onclick="doDoctor(' + c100 + ', 100, 35, 4)">🏥 ' + T('actDocFull') + '<span class="cb-tag cb-good">+100HP | -35% mệt | 4h</span><span class="cb-tag cb-cost">-' + fmt(c100) + '</span></button>' +
        '<button class="cb" onclick="doDoctor(' + 50000 + ', 15, 5, 0)">' + T('actDocBuyMeds') + '<span class="cb-tag cb-good">+15HP | -5% mệt | 0h</span><span class="cb-tag cb-cost">-' + fmt(50000) + '</span></button>' +
        '<button class="cb" onclick="doDoctor(' + 35000 + ', 10, 15, 0)">' + T('actDocHeadacheMeds') + '<span class="cb-tag cb-good">+10HP | -15% mệt | 0h</span><span class="cb-tag cb-cost">-' + fmt(35000) + '</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actDocNo') + '</button></div>');
}
function doDoctor(cost, hpGain, fatReduce, hours) {
    closeM();
    if (G.money < cost) { showM(T('actNoMoneyTitle'), '<p>' + T('actNoMoneySub') + '</p><button class="bok" onclick="closeM()">' + T('actOk') + '</button>'); return; }
    G.money = Math.max(0, G.money - cost);

    var duration = hours * 1200;
    if (hours > 0) {
        G.xrayActive = true;
        startWorkTimer(T('actDocTitle'), hours, false, true);
    }

    setTimeout(function () {
        G.xrayActive = false;
        G.hp = Math.min(100, G.hp + hpGain);
        G.fatigue = Math.max(0, G.fatigue - fatReduce);
        G.totalDoctorVisits = (G.totalDoctorVisits || 0) + 1;
        recoverEnergy(hours, 0.5); updateGameTime(hours); spawnP(G.p.x, G.p.y, 'money');
        popText(G.p.x, G.p.y, '+' + hpGain + 'HP -' + fmt(cost)); SFX.win();

        if (fatReduce >= 20) {
            var L = I18N[CFG.lang];
            var advice = G.lastMedicalAdvice || ('<li style="margin-bottom:6px"><b>Khám lâm sàng bước đầu:</b> Mọi chỉ số hiện tại đều bình thường. Bạn nên duy trì lối sống lành mạnh và kiểm tra sức khỏe định kỳ.</li>');

            setTimeout(function () {
                showM(T('actDocFull'), '<div class="gbox" style="line-height:1.6;font-size:13px"><p style="margin-bottom:10px"><b>Kết quả phân tích y khoa:</b></p><ul style="padding-left:18px">' + advice + '</ul></div><button class="bok gold" onclick="closeM()">XÁC NHẬN</button>');
            }, 300);
        }
        checkDanger();
    }, duration);
}

function mExercise() {
    showM(T('actExTitle'), '<div class="ibox">' + T('actExSub') + '</div>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doExercise(0.5)">' + T('actEx30') + '<span class="cb-tag cb-good">+5HP | -8% mệt</span><span class="cb-tag cb-bad">-5⚡ | 1h</span></button>' +
        '<button class="cb" onclick="doExercise(0.75)">' + T('actEx45') + '<span class="cb-tag cb-good">+8HP | -12% mệt</span><span class="cb-tag cb-bad">-7⚡ | 1h</span></button>' +
        '<button class="cb" onclick="doExercise(1)">' + T('actEx10') + '<span class="cb-tag cb-good">+12HP | -16% mệt</span><span class="cb-tag cb-bad">-10⚡ | 1h</span></button>' +
        '<button class="cb" onclick="doExercise(1.5)">' + T('actEx15') + '<span class="cb-tag cb-good">+18HP | -22% mệt</span><span class="cb-tag cb-bad">-15⚡ | 2h</span></button>' +
        '<button class="cb" onclick="doExercise(2)">' + T('actEx20') + '<span class="cb-tag cb-good">+25HP | -30% mệt</span><span class="cb-tag cb-bad">-22⚡ | 2h</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actExNo') + '</button></div>');
}
function doExercise(intensity) {
    closeM();
    var hours = intensity <= 1 ? 1 : 2;
    var hpGain = Math.round(5 + intensity * 10);
    var fatReduce = Math.round(8 + intensity * 11);
    var enDrain = Math.round(5 + intensity * 8.5);
    G.hp = Math.min(100, G.hp + hpGain);
    G.fatigue = Math.max(0, G.fatigue - fatReduce);
    G.energy = Math.max(0, G.energy - enDrain);
    G.totalExercise = (G.totalExercise || 0) + 1;
    startWorkTimer(T('actExTitle'), hours, false, true);
    updateGameTime(hours);
    popText(G.p.x, G.p.y, '+' + hpGain + 'HP 🏋 ' + (intensity * 60) + 'min');
    SFX.win(); checkDanger();
}

function mGym() {
    if (G.gymActive) return;
    showM('Phòng Gym', '<div class="ibox">Tập Gym sẽ giảm 0.5kg và tốn 2 giờ trong game.</div>' +
        '<div class="cg"><button class="cb" onclick="doGym()">Tập Ngay (2s)</button><button class="cb" onclick="closeM()">Bỏ qua</button></div>');
}

function doGym() {
    closeM();
    if (G.gymActive) return;
    
    G.gymActive = true;
    G.keys = {}; // Stop movement
    var overlay = document.getElementById('gymProgressOverlay');
    var bar = document.getElementById('gymProgressBar');
    var text = document.getElementById('gymProgressText');
    
    overlay.style.display = 'block';
    bar.style.width = '0%';
    bar.style.transition = 'width 2s linear';
    text.textContent = 'Đang đốt mỡ...';
    
    // Force reflow
    void bar.offsetWidth;
    bar.style.width = '100%';
    
    setTimeout(function() {
        G.gymActive = false;
        overlay.style.display = 'none';
        bar.style.transition = 'none';
        bar.style.width = '0%';
        
        G.khanhWeight = Math.max(50, G.khanhWeight - 0.5);
        G.fatigue = Math.max(0, G.fatigue - 10);
        G.hp = Math.min(100, G.hp + 5);
        G.totalGymSessions = (G.totalGymSessions || 0) + 1;
        updateGameTime(2); // Tốn 2 giờ trong game
        
        if ((G.npcStates['Sếp Tổng'] || 'init') === 'init' && G.khanhTasksDone >= 2 && G.khanhWeight <= 95 && G.bossRel >= 10) {
            G.npcStates['Sếp Tổng'] = 'promoted_1';
        } else if (G.npcStates['Sếp Tổng'] === 'promoted_1' && G.khanhTasksDone >= 5 && G.khanhWeight <= 85 && G.bossRel >= 30) {
            G.npcStates['Sếp Tổng'] = 'promoted_2';
        }
        
        var wv = document.getElementById('weightV');
        if (wv) wv.textContent = G.khanhWeight.toFixed(1) + ' kg';
        popText(G.p.x, G.p.y, 'Giảm 0.5kg! (-2h)', false);
        SFX.buy();
        checkDanger();
        
    }, 2000); // Luôn 2 giây thực
}

function mBossRoom() {
    showM('Phòng Sếp', '<div class="ibox">Sếp đang bận. Bạn có muốn nhận thêm việc để ghi điểm?</div>' +
        '<div class="cg"><button class="cb" onclick="closeM(); handleNpcOption(\'Sếp Tổng\', 0)">Nhận việc khó (+2Tr, -30HP)</button><button class="cb" onclick="closeM()">Rời đi</button></div>');
}
function mGaming() {
    showM(T('actGameTitle'), '<div class="ibox">' + T('actGameSub') + '</div>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doGaming(0.5)">' + T('actGame30') + '<span class="cb-tag cb-good">-5% mệt | +2HP</span><span class="cb-tag cb-bad">1 giờ | 0đ</span></button>' +
        '<button class="cb" onclick="doGaming(1)">' + T('actGame10') + '<span class="cb-tag cb-good">-12% mệt | +4HP</span><span class="cb-tag cb-bad">1 giờ | 0đ</span></button>' +
        '<button class="cb" onclick="doGaming(2)">' + T('actGame20') + '<span class="cb-tag cb-good">-22% mệt | +6HP</span><span class="cb-tag cb-bad">2 giờ | 0đ</span></button>' +
        '<button class="cb" onclick="doGaming(3)">' + T('actGame30h') + '<span class="cb-tag cb-good">-30% mệt | +8HP</span><span class="cb-tag cb-bad">3 giờ | 0đ</span></button>' +
        '<button class="cb" onclick="closeM()">' + T('actGameNo') + '</button></div>');
}
function doGaming(hrs) {
    closeM();
    var hoursInt = Math.ceil(hrs);
    var fatReduce = hrs === 0.5 ? 5 : (hrs === 1 ? 12 : (hrs === 2 ? 22 : 30));
    var hpGain = hrs === 0.5 ? 2 : (hrs === 1 ? 4 : (hrs === 2 ? 6 : 8));
    G.fatigue = Math.max(0, G.fatigue - fatReduce);
    G.hp = Math.min(100, G.hp + hpGain);
    recoverEnergy(hoursInt, 0.3);
    startWorkTimer(T('actGameTitle'), hoursInt, false, true);
    updateGameTime(hoursInt);
    popText(G.p.x, G.p.y, '-' + fatReduce + '% mệt 🎮'); SFX.sleep(); checkDanger();
}
function mSocial() {
    showM('🌳 CÔNG VIÊN KẾT NỐI',
        '<p style="color:rgba(200,180,200,.8);font-size:13px;margin-bottom:12px">Đi dạo, hóng gió và gặp gỡ mọi người để giải tỏa căng thẳng.</p>' +
        '<div class="cg">' +
        '<button class="cb" onclick="doSocial(1, 10, 5)">Đi dạo công viên<span class="cb-tag cb-good">-10% mệt | +2HP</span><span class="cb-tag cb-bad">-5⚡ | 1h</span></button>' +
        '<button class="cb" onclick="doSocial(2, 20, 10)">Trò chuyện với bạn<span class="cb-tag cb-good">-20% mệt | +5HP</span><span class="cb-tag cb-bad">-10⚡ | 2h</span></button>' +
        '<button class="cb" onclick="doSocial(4, 35, 15)">Tập thể dục nhóm<span class="cb-tag cb-good">-35% mệt | +10HP</span><span class="cb-tag cb-bad">-15⚡ | 4h</span></button>' +
        '<button class="cb" onclick="closeM()" style="margin-top:6px">Quay Lại</button></div>');
}
function doSocial(hours, fatReduce, enDrain) {
    closeM();
    G.fatigue = Math.max(0, G.fatigue - fatReduce);
    G.hp = Math.min(100, G.hp + (hours === 1 ? 2 : (hours === 2 ? 5 : 10)));
    G.energy = Math.max(0, G.energy - enDrain);
    startWorkTimer('CÔNG VIÊN', hours, false, true);
    updateGameTime(hours);
    popText(G.p.x, G.p.y, '-' + fatReduce + '% mệt 🌳');
    SFX.win();
    checkDanger();
}

// ── NPC AUTO-TALK SYSTEM ───────────────────────────
var autoTalkMsgs = [
    { cond: function () { return G.hoursAwake > 12; }, msg: 'Bạn đã làm quá 12 tiếng rồi đó!' },
    { cond: function () { return G.fatigue > 70; }, msg: 'Cơ thể bạn đang cảnh báo đấy!' },
    { cond: function () { return G.hp < 40; }, msg: 'Anh trông mệt mỏi quá, đi khám bác sĩ đi!' },
    { cond: function () { return G.energy < 20; }, msg: 'Hết năng lượng rồi, nghỉ thôi!' },
    { cond: function () { return G.hour >= 22 || G.hour < 5; }, msg: 'Khuya rồi, về ngủ đi anh!' },
    { cond: function () { return G.coffeeToday >= 3; }, msg: 'Uống nhiều cà phê quá rồi, cẩn thận!' }
];
var lastAutoTalkTime = 0;
function checkAutoTalk() {
    if (G.modalOpen || G.evOpen || G.scr !== 'game') return;
    var now = Date.now();
    if (now - lastAutoTalkTime < 15000) return;
    if (G.fatigue < 50 && G.hp > 50 && G.energy > 30) return;
    for (var i = 0; i < autoTalkMsgs.length; i++) {
        if (autoTalkMsgs[i].cond()) {
            var npc = G.npcs[Math.floor(Math.random() * G.npcs.length)];
            lastAutoTalkTime = now;
            showAutoTalkBubble(npc, autoTalkMsgs[i].msg);
            break;
        }
    }
}
function showAutoTalkBubble(npc, msg) {
    var bubble = document.createElement('div');
    bubble.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(22,28,42,.92);border:1px solid rgba(122,173,255,.25);color:#d0d8e8;padding:12px 20px;font-family:Inter,sans-serif;font-size:13px;border-radius:16px;pointer-events:none;box-shadow:0 0 25px rgba(122,173,255,.12);max-width:400px;text-align:center;animation:fadeIn .4s ease';
    bubble.innerHTML = '<b style="color:#7aadff">🗣 ' + npc.name + ':</b> "' + msg + '"';
    document.body.appendChild(bubble);
    SFX.npcTalk();
    setTimeout(function () { bubble.style.opacity = '0'; bubble.style.transition = 'opacity .5s'; }, 3500);
    setTimeout(function () { bubble.remove(); }, 4000);
}

// ── DAY LOGIC (now driven by updateGameTime) ─────────
// advanceDay removed — day advancement handled by updateGameTime when hour >= 24
function checkDanger() {
    var v = document.getElementById('vig');
    var hwarn = document.getElementById('hwarn');
    if (G.fatigue >= 90 || G.hp <= 15) { v.className = 'vig vc'; startAlarm(); startAmbient('tense'); }
    else if (G.fatigue >= 70 || G.hp <= 35) { v.className = 'vig vh'; stopAlarm(); SFX.warn(); }
    else { v.className = 'vig'; stopAlarm(); stopHeartbeat(); }
    // Chỉ hiện 1 thanh cảnh báo duy nhất: dùng trạng thái ở hiPanel, ẩn hwarn riêng
    if (hwarn) hwarn.classList.remove('on');

    var faCont = document.getElementById('faContainer');
    if (faCont) {
        if (G.fatigue > 80) faCont.classList.add('danger-border');
        else faCont.classList.remove('danger-border');
    }
}
function checkWin() {
    if (G.money < G.goal) return;
    stopAlarm(); stopHeartbeat(); SFX.win();
    var lvs = getLvs(), next = G.level + 1;
    if (next >= lvs.length) {
        try { localStorage.setItem('iyf_won', 'true'); } catch (e) { }
        showM('🏆 HOÀN THÀNH TẤT CẢ!', '<div class="gbox" style="text-align:center"><p style="font-size:18px;font-weight:900;color:#ffd700">🎉 Bạn đã vượt qua tất cả!</p><p style="margin-top:8px;color:rgba(255,220,0,.6)">Hệ thống đã MỞ KHÓA nhân vật mới thay thế ngẫu nhiên cho lần chơi sau!</p></div><p>Từ một ca tăng ca lúc nửa đêm... đến lúc bước ra khỏi bệnh viện với ánh mắt bình yên.</p><button class="bok gold" onclick="backToMenu()">🏠 Menu</button>');
    }
    else {
        G.level = next; var lv = lvs[next]; G.goal = lv.goal; G.maxDays = lv.days;
        G.hp = Math.max(45, G.hp); G.fatigue = Math.min(55, G.fatigue); G.day = 1; G.hour = 6; G.energy = Math.max(50, G.energy); G.hoursAwake = 0; G.money = 0; G.coffeeToday = 0; G.timeUpdating = false; G.inventory = []; G.knowledge = 0; G.hunger = 100;
        resetLvEvents(lv.story);
        showM('✅ MỤC TIÊU HOÀN THÀNH!', '<div class="gbox"><p style="font-size:15px;font-weight:900;color:#ffd700">Kiếm đủ ' + fmt(lvs[next - 1].goal) + '!</p></div><p>Nhưng câu chuyện chưa kết thúc — thử thách mới đang chờ...</p><div class="wbox">⚠ Chương mới có phát sinh bất ngờ!</div><button class="bok gold" onclick="goNextLevel()">▶ CHƯƠNG TIẾP →</button>');
    }
}
function goNextLevel() { closeM(); var lvs = getLvs(); showStoryScreen(lvs[G.level].story, lvs[G.level]); }

function generateDetailedCause(cause) {
    var s = G.stats;
    var diagnoses = [];
    var avgSleep = s.totalSleep / Math.max(1, G.day);
    var avgWork = s.totalWork / Math.max(1, G.day);

    if (cause === 'traffic') {
        diagnoses.push("<b>Tai nạn giao thông cục bộ (Đa chấn thương):</b><br/>Một vụ va chạm mạnh dẫn đến đa chấn thương nội tạng, vỡ lách và xuất huyết não diện rộng.<br/><em style='color:#ffaaaa'>Nguyên nhân gián tiếp:</em> Thiếu ngủ làm giảm phản xạ ngang với say rượu.");
    } else {

        if (s.totalCoffee > 10 || G.coffeeToday > 4) {
            diagnoses.push("<b>Lạm dụng Caffeine (Ngộ độc hóa học):</b><br/>Việc nạp lượng lớn kích thích đã tước đoạt điện giải của cơ thể. Tim đập vọt lên 120 nhịp/phút lúc tĩnh, xé rách hệ thống van thành mạch, dẫn đến nhồi máu cơ tim cấp (Cơn nhồi máu ST chênh lên).");
        }
        if (avgSleep < 5) {
            diagnoses.push("<b>Thiếu ngủ trầm trọng (Thần kinh suy kiệt):</b><br/>Chỉ ngủ khoảng " + avgSleep.toFixed(1) + " giờ/ngày. Hormone Cortisol ngập trong máu khiến mạch máu viêm sưng. Hệ rác thải não bộ (Amyloid-beta) không được đào thải dẫn đến sương mù não, mất ý thức và dễ bề vỡ mạch máu não non.");
        }
        if (avgWork > 14) {
            diagnoses.push("<b>Làm việc quá tải (Stress Mạn Tính):</b><br/>Với " + avgWork.toFixed(1) + " giờ cày ải hằng ngày, hệ thống miễn dịch tự nhiên đình công. Huyết áp bạn thường trực ở ngưỡng 170/110 mmHg, ép căng lực bơm máu lên đỉnh điểm cho tới khi đứt vỡ.");
        }
        if (s.mealsMissed > 2) {
            diagnoses.push("<b>Suy Kiệt Dinh Dưỡng (Hạ Đường Huyết Nặng):</b><br/>Quên hơn " + s.mealsMissed + " bữa đói. Đường huyết tuột dốc không phanh. Các cơ quan tuần hoàn não đình trệ vì không có Glucozo nuôi dưỡng, tạo cơn hôn mê hệ thống.");
        }
        if (s.warningIgnores > 4) {
            diagnoses.push("<b>Tự Sát Thụ Động (Liên tục phớt lờ cảnh báo):</b><br/>Cơ thể đã khẩn thiết phát đi " + s.warningIgnores + " tín hiệu cầu cứu chí tử, nhưng bộ óc bạn đã đè nén tất cả vì công việc. Áp lực vật lý đã đánh sập sinh lý!");
        }

        if (diagnoses.length === 0) {
            diagnoses.push("Cơ thể bạn đã kiệt quệ hoàn toàn do lao lực và căng thẳng mạn tính mà không nhận được bất cứ sự phục hồi y khoa nào.");
        }
    }

    var improvements = [];
    if (cause === 'traffic') {
        improvements = [
            { factor: "Cấp cứu kịp thời trong 'Giờ vàng' 60 phút đầu sau tai nạn", source: "Bộ Y tế VN", yearsGained: [10, 20] },
            { factor: "Thắt dây an toàn và đội mũ bảo hiểm đúng cách giảm 45% tử vong", source: "WHO Road Safety", yearsGained: [5, 15] },
            { factor: "Học sơ cấp cứu (CPR + cầm máu) — cứu mạng nhiều người trong vài phút", source: "Hội Chữ Thập Đỏ", yearsGained: [5, 10] },
            { factor: "Không vượt đèn đỏ, tuân thủ tốc độ cho phép trong khu dân cư", source: "Cảnh sát Giao thông", yearsGained: [5, 10] }
        ];
    } else if (typeof MEDICAL_DATA !== 'undefined' && MEDICAL_DATA.protectiveFactors) {
        var pf = MEDICAL_DATA.protectiveFactors.slice();
        for (var i = 0; i < 3; i++) {
            if (pf.length > 0) {
                var pick = Math.floor(Math.random() * pf.length);
                improvements.push(pf[pick]);
                pf.splice(pick, 1);
            }
        }
    } else {
        improvements = [
            { factor: "Ngủ đủ 7-8 tiếng", source: "WHO", yearsGained: [2, 4] },
            { factor: "Chế độ ăn đầy đủ dinh dưỡng", source: "Bộ Y Tế", yearsGained: [3, 3] }
        ];
    }

    var html = '<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;margin-top:15px;text-align:left;max-width:900px;margin-left:auto;margin-right:auto;">';

    // Left Box - Detailed Cause
    html += '<div style="flex:1;min-width:300px;background:rgba(20,0,0,0.6);padding:20px;border-radius:12px;border:1px solid rgba(255,80,80,0.3);box-shadow:inset 0 0 20px rgba(255,0,0,0.1)">';
    html += '<h3 style="color:#ff6b6b;font-size:15px;margin-bottom:12px;border-bottom:1px solid rgba(255,100,100,0.2);padding-bottom:8px;text-transform:uppercase;letter-spacing:1px">📋 KHÁM NGHIỆM TỬ THI</h3>';
    html += '<div style="font-size:13.5px;line-height:1.7;color:#ddd">';
    diagnoses.forEach(function (d) { html += '<div style="margin-bottom:12px;padding-left:12px;border-left:3px solid #ff4444">' + d + '</div>'; });
    html += '</div></div>';

    // Right Box - Improvements
    html += '<div style="flex:1;min-width:300px;background:rgba(0,20,10,0.6);padding:20px;border-radius:12px;border:1px solid rgba(80,255,120,0.3);box-shadow:inset 0 0 20px rgba(0,255,100,0.05)">';
    html += '<h3 style="color:#00e676;font-size:15px;margin-bottom:12px;border-bottom:1px solid rgba(100,255,150,0.2);padding-bottom:8px;text-transform:uppercase;letter-spacing:1px">⚕️ LIỆU PHÁP Y KHOA ĐỂ SỐNG SÓT</h3>';
    html += '<div style="font-size:13.5px;line-height:1.7;color:#ddd">';
    improvements.forEach(function (imp) {
        html += '<div style="margin-bottom:12px;background:rgba(255,255,255,0.03);padding:10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05)">';
        html += '<b style="color:#00d4b4;font-size:14px">✔ ' + imp.factor + '</b><br/>';
        html += '<span style="color:#888;font-size:11px;font-style:italic">Chứng minh bởi: ' + imp.source + '</span>';
        if (imp.yearsGained) html += '<br><span style="display:inline-block;padding:3px 8px;background:rgba(0,255,100,0.1);color:#00ff88;border-radius:4px;font-size:11px;margin-top:6px;font-weight:bold">Hồi phục ' + imp.yearsGained[0] + ' đến ' + imp.yearsGained[1] + ' năm tuổi thọ</span>';
        html += '</div>';
    });
    html += '<div style="margin-top:15px;padding-top:10px;border-top:1px dashed rgba(255,255,255,0.1);font-size:13px;color:rgba(255,200,100,0.8);font-style:italic;text-align:center;font-weight:bold">Đấu tranh với tử thần là một quá trình chứ không phải là phép màu.</div>';
    html += '</div></div>';

    html += '</div>';
    return html;
}

function triggerDeath(cause) {
    if (document.getElementById('deathCutscene')) return;
    G.timeUpdating = false;
    stopAlarm(); stopHeartbeat(); SFX.death();
    document.getElementById('vig').className = 'vig vc';
    var msgs = {
        exhaustion: { t: '💀 GỤC NGÃ VÌ LÀM VIỆC QUÁ SỨC', b: 'Bạn đã cố sức làm việc liên tục đến cạn kiệt năng lượng, dẫn đến đột quỵ ngay tại chỗ.\n\nNhân viên bảo vệ đã gọi cấp cứu, nhưng mọi thứ đã quá muộn...\n\n<em style="color:#7aadff; font-style:normal">\n💡 CÁCH CẢI THIỆN SỨC KHỎE:\n- Luôn giữ "Mệt Mỏi" < 50% và "Sức Khỏe" > 50%.\n- Ngủ đủ 6-8 tiếng mỗi ngày tại nhà.\n- Mua đồ ăn để nạp Đồ No và Năng Lượng.\n- Đến Bệnh Viện (dấu thập đỏ) để hồi Sức khỏe.\n- Dạo Công Viên, chơi Game, Tập Thể Dục xả stress.</em>' },
        overdose: { t: '💀 QUÁ LIỀU CAFFEINE', b: 'Tim đập loạn nhịp. Bạn đã uống quá nhiều cà phê kích thích để bù đắp việc không ngủ.\n\nKhông ai ngờ thức uống nhỏ bé đó lại tước đi sinh mạng.' },
        starvation: { t: '💀 GỤC NGÃ VÌ ĐÓI LẢ', b: 'Bạn đã nhiều ngày không ăn uống đàng hoàng. Bụng đói cồn cào.\n\nCơ thể lịm đi trên chiếc ghế làm việc...\n\n<em style="color:rgba(200,180,200,.7)">Đừng tiết kiệm vài chục ngàn tiền cơm để trả giá bằng sinh mạng.</em>' },
        traffic: { t: '💀 TAI NẠN GIAO THÔNG DO THIẾU NGỦ', b: 'Vì quá thiếu ngủ, bạn đã mất tập trung và không kịp phản ứng khi bước ra đường.\n\nMột chiếc xe ô tô lao tới với tốc độ cao. Mọi thứ chìm vào bóng tối...\n\n<em style="color:#ff6b6b">"Thiếu ngủ làm giảm phản xạ và khả năng phán đoán, tương đương với say rượu. Hãy ngủ đủ giấc trước khi ra đường!"</em>' }
    };
    var m = msgs[cause] || msgs.exhaustion;
    // Cutscene: dramatic health warning
    var overlay = document.createElement('div');
    overlay.id = 'deathCutscene';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:background 2s ease;pointer-events:all;font-family:Inter,sans-serif;height:100vh;overflow-y:auto;';
    overlay.innerHTML = '<div style="text-align:center;opacity:0;transition:opacity 2s ease 1s;width:100%;max-width:1000px;padding:40px 20px" id="deathMsg">' +
        '<div style="font-size:60px;margin-bottom:20px;animation:pulse 1s infinite">💔</div>' +
        '<h2 style="color:#ff4444;font-size:28px;font-weight:900;letter-spacing:2px;margin-bottom:16px">' + m.t + '</h2>' +
        '<div style="color:#ccc;font-size:15px;white-space:pre-line;line-height:1.8;margin-bottom:24px;max-width:600px;margin-left:auto;margin-right:auto">' + m.b + '</div>' +
        generateDetailedCause(cause) +
        '<p style="color:#888;margin-top:24px;font-size:15px">Gánh nặng còn thiết hụt: <b style="color:#ffd700">' + fmt(Math.max(0, G.goal - G.money)) + '</b></p>' +
        '<div style="display:flex;gap:12px;margin-top:20px;justify-content:center">' +
        '<button onclick="document.querySelectorAll(\'#deathCutscene\').forEach(e=>e.remove());replayLevel()" style="padding:14px 28px;background:linear-gradient(135deg,#4a90e2,#3b82f6);color:#fff;border:none;border-radius:12px;cursor:pointer;font-size:15px;font-weight:600;box-shadow:0 4px 15px rgba(59,130,246,0.4)">🔄 KHỞI TẠO LẠI CUỘC ĐỜI</button>' +
        '<button onclick="document.querySelectorAll(\'#deathCutscene\').forEach(e=>e.remove());backToMenu()" style="padding:14px 28px;background:rgba(255,255,255,.05);color:#aaa;border:1px solid rgba(255,255,255,.1);border-radius:12px;cursor:pointer;font-size:15px;transition:0.2s" onmouseover="this.style.background=\'rgba(255,255,255,0.1)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'">🏠 MENU CHÍNH</button>' +
        '</div></div>';
    document.body.appendChild(overlay);
    setTimeout(function () { overlay.style.background = 'rgba(0,0,0,.95)'; }, 50);
    setTimeout(function () { document.getElementById('deathMsg').style.opacity = '1'; }, 500);
}
function triggerFail() {
    stopAlarm(); stopHeartbeat(); SFX.death();
    showM('⏰ HẾT THỜI GIAN', '<div class="wbox" style="text-align:center;padding:14px"><p style="font-size:16px;color:#ff6644;font-weight:bold">' + G.maxDays + ' ngày đã trôi qua...</p><p>Kiếm được <b style="color:#ffd700">' + fmt(G.money) + '</b> / <b>' + fmt(G.goal) + '</b></p><p style="color:rgba(200,180,180,.7);margin-top:8px">Còn thiếu: <b style="color:#ff4444">' + fmt(G.goal - G.money) + '</b></p></div><div style="display:flex;gap:8px;margin-top:12px"><button class="bok" onclick="replayLevel()" style="flex:1">🔄 CHƠI LẠI</button><button class="bok" style="background:#333;flex:1" onclick="backToMenu()">🏠 MENU</button></div>');
}
function replayLevel() {
    closeM();
    var lvs = getLvs(), lv = lvs[G.level];
    G.day = 1; G.hour = 6; G.energy = 100; G.hoursAwake = 0; G.money = 0; G.hp = 100; G.fatigue = 0; G.coffeeToday = 0; G.sleptYesterday = false; G.timeUpdating = false; G.inventory = []; G.relWife = 0; G.relDaughter = 0; G.stats = { totalCoffee: 0, totalSleep: 0, totalWork: 0, warningIgnores: 0, mealsMissed: 0 };
    G.goal = lv.goal; G.maxDays = lv.days;
    G.hunger = 100; G.knowledge = 0;
    document.getElementById('vig').className = 'vig';
    resetLvEvents(lv.story);
    initWorld(); showStoryScreen(lv.story, lv);
}
function fmt(n) { if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M đ'; if (n >= 1000) return Math.round(n / 1000) + 'K đ'; return n + 'đ'; }
function updateHUD() {
    var lvs = getLvs();
    document.getElementById('dayNum').textContent = G.day;
    document.getElementById('lvlNum').textContent = G.level + 1;
    document.getElementById('diffLbl').textContent = getDiffLabel();
    document.getElementById('hourDisp').textContent = formatHour(G.hour);
    var timeB = document.getElementById('timeB');
    if (timeB) timeB.style.width = (G.hour / 24 * 100) + '%';
    document.getElementById('enV').textContent = Math.round(G.energy) + '%';
    document.getElementById('enB').style.width = G.energy + '%';
    document.getElementById('hpV').textContent = Math.round(G.hp) + '%';
    document.getElementById('faV').textContent = Math.round(G.fatigue) + '%';
    document.getElementById('hpB').style.width = G.hp + '%';
    document.getElementById('faB').style.width = G.fatigue + '%';
    var huV = document.getElementById('huV');
    if (huV) { huV.textContent = Math.floor(G.hunger) + '/100'; document.getElementById('huB').style.width = G.hunger + '%'; }
    var knV = document.getElementById('knV');
    if (knV) { knV.textContent = Math.floor(G.knowledge); document.getElementById('knB').style.width = Math.min(100, (G.knowledge % 100)) + '%'; }
    var slH = document.getElementById('slH');
    if (slH) slH.textContent = G.sleptYesterday ? T('sleptYes') : T('sleptNo');
    var cfH = document.getElementById('cfH');
    if (cfH) cfH.textContent = G.coffeeToday + T('cups');
    document.getElementById('moneyV').textContent = fmt(G.money);
    document.getElementById('moneyGoal').textContent = T('goalPrefix') + fmt(G.goal);
    document.getElementById('moneyFill').style.width = Math.min(100, G.money / G.goal * 100) + '%';

    // HUD Relationship Update
    var rWife = document.getElementById('relWifeV');
    var rDaug = document.getElementById('relDaugV');
    var lWife = document.getElementById('lblWife');
    if (lWife && lWife.parentNode) {
        lWife.parentNode.style.display = (G.character === 'lan') ? 'none' : 'block';
    }
    if (rWife) rWife.textContent = Math.round(G.relWife) + '/100';
    if (rDaug) rDaug.textContent = Math.round(G.relDaughter) + '/100';

    var rk = document.getElementById('rkH');
    var em = document.getElementById('emH');
    var hi = document.getElementById('hiPanel');

    if (hi) hi.classList.remove('status-danger', 'status-warning');

    if (G.fatigue >= 85 || G.hp <= 15) {
        rk.textContent = T('statusDanger');
        rk.style.background = 'rgba(255, 68, 68, 0.2)';
        rk.style.color = '#ff4444';
        rk.style.border = '1px solid rgba(255, 68, 68, 0.4)';
        em.textContent = '💀';
        if (hi) hi.classList.add('status-danger');
    }
    else if (G.fatigue >= 70 || G.hp <= 30) {
        rk.textContent = T('statusWarning');
        rk.style.background = 'rgba(255, 136, 0, 0.2)';
        rk.style.color = '#ff8800';
        rk.style.border = '1px solid rgba(255, 136, 0, 0.4)';
        em.textContent = '😨';
        if (hi) hi.classList.add('status-warning');
    }
    else if (G.fatigue >= 50 || G.hp <= 60) {
        rk.textContent = T('statusTired');
        rk.style.background = 'rgba(255, 215, 0, 0.15)';
        rk.style.color = '#ffd700';
        rk.style.border = '1px solid rgba(255, 215, 0, 0.3)';
        em.textContent = '😫';
    }
    else {
        rk.textContent = T('statusNormal');
        rk.style.background = 'rgba(78, 205, 196, 0.15)';
        rk.style.color = '#4ecdc4';
        rk.style.border = '1px solid rgba(78, 205, 196, 0.3)';
        em.textContent = '😊';
    }
    if (G.hp <= 10) startHeartbeat();
    var tip = document.getElementById('itip');
    if (G.near) { tip.classList.add('on'); tip.textContent = T('interactWith') + G.near.lbl + ' (' + G.near.desc + ')'; }
    else tip.classList.remove('on');
}

// ── GAME LOOP ────────────────────────────────────────
var gc = document.getElementById('gameCanvas'), gx = gc.getContext('2d');
var lstStep = 0;
var lastTimeTick = Date.now();
function gameLoop() {
    if (G.scr !== 'game') return;
    updPlayer(); updNPCs(); updTraffic(); updP(); chkNear();
    var n = Date.now();
    if (n - lastTimeTick > 1000) {
        lastTimeTick = n;
        // 5 seconds real-time = 2 game minutes (0.0333 hours)
        // So 1 second real-time = 0.00666 game hours
        var dh = 0.006666;
        G.hour += dh;
        G.hoursAwake += dh;
        if (G.hour >= 24) { G.hour -= 24; G.day++; G.coffeeToday = 0; checkEvents(); }
        // Passive fatigue increase
        var awakeBonus = G.hoursAwake > 16 ? 1.5 : (G.hoursAwake > 12 ? 1.2 : 1);
        G.fatigue = Math.min(100, G.fatigue + (dh * 2 * awakeBonus * getDiff().fm));
        if (G.hoursAwake > 16) {
            G.hp = Math.max(1, G.hp - (dh * 0.5));
        }
        // Passive hunger drain
        G.hunger = Math.max(0, G.hunger - (dh * 5));
        if (G.hunger === 0) { G.hp = Math.max(0, G.hp - (dh * 5)); }

        updateHUD();
        updateMissionBoard();
        checkDanger();
    }
    // Real-time Road Hazard Check
    var rh = document.getElementById('roadHazard');
    if (rh) {
        var isNearRoute = false;
        var hRoads = [450, 1350], vRoads = [600, 1800, 3000];
        var dhaz = 65; // 65px danger distance
        for (var i = 0; i < hRoads.length; i++) { if (Math.abs(G.p.y - hRoads[i]) < dhaz) { isNearRoute = true; break; } }
        if (!isNearRoute) { for (var i = 0; i < vRoads.length; i++) { if (Math.abs(G.p.x - vRoads[i]) < dhaz) { isNearRoute = true; break; } } }
        rh.style.display = isNearRoute ? 'block' : 'none';
    }
    render();
    G._raf = requestAnimationFrame(gameLoop);
}
function playerCollidesBuilding(px, py) {
    var pSz = G.p.sz, pHalf = pSz * 0.5;
    for (var i = 0; i < G.objs.length; i++) {
        var o = G.objs[i];
        if (o.t === 'exercise' || o.t === 'social') continue; // Open areas, no collision
        var bx1 = o.x - o.w / 2, by1 = o.y - o.h / 2;
        var bx2 = o.x + o.w / 2, by2 = o.y + o.h / 2;
        if (px + pHalf > bx1 && px - pHalf < bx2 && py + pHalf > by1 && py - pHalf < by2) {
            return true;
        }
    }
    return false;
}
function updPlayer() {
    var p = G.p, dx = 0, dy = 0;
    if (G.keys['w'] || G.keys['arrowup']) dy = -p.spd;
    if (G.keys['s'] || G.keys['arrowdown']) dy = p.spd;
    if (G.keys['a'] || G.keys['arrowleft']) dx = -p.spd;
    if (G.keys['d'] || G.keys['arrowright']) dx = p.spd;
    if (dx && dy) { dx *= .707; dy *= .707; }
    p.moving = !!(dx || dy);
    var oldX = p.x, oldY = p.y;
    // Try move X first
    var newX = Math.max(20, Math.min(G.mapW - 20, p.x + dx));
    if (!playerCollidesBuilding(newX, p.y)) { p.x = newX; }
    // Try move Y
    var newY = Math.max(20, Math.min(G.mapH - 20, p.y + dy));
    if (!playerCollidesBuilding(p.x, newY)) { p.y = newY; }

    // Camera follow: try to center on player
    var screenW = 1200 / G.zoom, screenH = 620 / G.zoom;
    G.camX = p.x - screenW / 2;
    G.camY = p.y - screenH / 2;
    // Bound camera to map boundaries
    G.camX = Math.max(0, Math.min(G.mapW - screenW, G.camX));
    G.camY = Math.max(0, Math.min(G.mapH - screenH, G.camY));

    if (p.moving) { var n = Date.now(); if (n - lstStep > 380) { if (Math.random() < .1) nz(.04, .015); lstStep = n; } }
}
function npcCollidesBuilding(px, py) {
    for (var i = 0; i < G.objs.length; i++) {
        var o = G.objs[i];
        if (o.t === 'exercise' || o.t === 'social') continue;
        var bx1 = o.x - o.w / 2, by1 = o.y - o.h / 2;
        var bx2 = o.x + o.w / 2, by2 = o.y + o.h / 2;
        if (px + 10 > bx1 && px - 10 < bx2 && py + 10 > by1 && py - 10 < by2) {
            return true;
        }
    }
    return false;
}
function isOnRoad(px, py) {
    var hRoads = [450, 1350], vRoads = [600, 1800, 3000];
    for (var i = 0; i < hRoads.length; i++) {
        if (Math.abs(py - hRoads[i]) < 55) return true;
    }
    for (var i = 0; i < vRoads.length; i++) {
        if (Math.abs(px - vRoads[i]) < 55) return true;
    }
    return false;
}
function updNPCs() {
    G.npcs.forEach(function (n) {
        // Pick new target occasionally, but only on walkable areas (sidewalks, open areas)
        if (Math.random() < .006) {
            var attempts = 0, tx, ty;
            do {
                tx = Math.max(100, Math.min(G.mapW - 100, n.x + (Math.random() - .5) * 250));
                ty = Math.max(100, Math.min(G.mapH - 100, n.y + (Math.random() - .5) * 250));
                attempts++;
            } while (attempts < 10 && (npcCollidesBuilding(tx, ty) || isOnRoad(tx, ty)));
            if (attempts < 10) { n.tx = tx; n.ty = ty; }
        }
        if (n.tx) {
            var dx = n.tx - n.x, dy = n.ty - n.y, d = Math.hypot(dx, dy);
            if (d > 2) {
                var nx = n.x + dx / d * n.spd;
                var ny = n.y + dy / d * n.spd;
                // Check collision before moving
                if (!npcCollidesBuilding(nx, ny) && !isOnRoad(nx, ny)) {
                    n.x = nx; n.y = ny;
                } else {
                    // Try X only
                    if (!npcCollidesBuilding(n.x + dx / d * n.spd, n.y) && !isOnRoad(n.x + dx / d * n.spd, n.y)) {
                        n.x += dx / d * n.spd;
                    }
                    // Try Y only
                    else if (!npcCollidesBuilding(n.x, n.y + dy / d * n.spd) && !isOnRoad(n.x, n.y + dy / d * n.spd)) {
                        n.y += dy / d * n.spd;
                    }
                    else {
                        n.tx = null; n.ty = null; // Give up on this target
                    }
                }
            } else { n.tx = null; n.ty = null; }
        }
    });
}
function chkNear() {
    var p = G.p, nr = null, nearDist = 60; // interaction range from building edge
    G.objs.forEach(function (o) {
        if (o.t === 'bg') return; // skip decorative buildings
        var bx1 = o.x - o.w / 2 - nearDist, by1 = o.y - o.h / 2 - nearDist;
        var bx2 = o.x + o.w / 2 + nearDist, by2 = o.y + o.h / 2 + nearDist;
        if (p.x >= bx1 && p.x <= bx2 && p.y >= by1 && p.y <= by2) {
            nr = o;
        }
    });
    G.near = nr;
    G.nearNpc = null;
    var minNpcDist = 50;
    G.npcs.forEach(function (n) {
        if (Math.hypot(p.x - n.x, p.y - n.y) < minNpcDist) {
            G.nearNpc = n;
        }
    });
}
function col4(x1, y1, w1, h1, x2, y2, w2, h2) { return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2; }
function ltn(h, a) { var r = Math.min(255, parseInt(h.slice(1, 3), 16) + a), g2 = Math.min(255, parseInt(h.slice(3, 5), 16) + a), b = Math.min(255, parseInt(h.slice(5, 7), 16) + a); return 'rgb(' + r + ',' + g2 + ',' + b + ')'; }

// ── 3D PIXEL HELPERS ──────────────────────────────────
function drawBox3D(x, y, w, h, d, topC, frontC, sideC) {
    gx.fillStyle = frontC;
    gx.fillRect(x, y - d, w, h);
    gx.fillStyle = topC;
    gx.fillRect(x, y - d - 4, w, 4);
    gx.fillStyle = sideC;
    gx.fillRect(x + w - 3, y - d, 3, h);
    gx.strokeStyle = 'rgba(255,255,255,.08)'; gx.lineWidth = .5;
    gx.strokeRect(x, y - d - 4, w, h + 4);
}
function px3d(x, y, sz, d, col) {
    var r = parseInt(col.slice(1, 3), 16), g = parseInt(col.slice(3, 5), 16), b = parseInt(col.slice(5, 7), 16);
    var top = 'rgb(' + Math.min(255, r + 35) + ',' + Math.min(255, g + 35) + ',' + Math.min(255, b + 35) + ')';
    var side = 'rgb(' + Math.max(0, r - 20) + ',' + Math.max(0, g - 20) + ',' + Math.max(0, b - 20) + ')';
    drawBox3D(x, y, sz, d, 0, top, col, side);
}

// ── RENDER ───────────────────────────────────────────
function drawFloor() {
    var screenW = 1200, screenH = 620;

    // 1. Tiling Grass (Base)
    gx.fillStyle = '#1b3a1a'; // Darker grass base
    gx.fillRect(0, 0, G.mapW, G.mapH);

    // Pixel grass tufts
    gx.fillStyle = '#1e4020';
    for (var gx2 = 0; gx2 < G.mapW; gx2 += 60) {
        for (var gy2 = 0; gy2 < G.mapH; gy2 += 60) {
            var xOff = (gy2 % 120 === 0) ? 0 : 30;
            gx.fillRect(gx2 + xOff, gy2, 12, 12);
            gx.fillRect(gx2 + xOff + 8, gy2 + 8, 8, 8);
        }
    }

    // 2. Roads GRID
    var hRoads = [450, 1350], vRoads = [600, 1800, 3000];

    // Draw Sidewalks
    hRoads.forEach(function (y) {
        gx.fillStyle = '#334155'; gx.fillRect(0, y - 60, G.mapW, 120);
        gx.fillStyle = '#475569';
        for (var px = 0; px < G.mapW; px += 20) gx.fillRect(px, y - 60, 18, 118);
    });
    vRoads.forEach(function (x) {
        gx.fillStyle = '#334155'; gx.fillRect(x - 60, 0, 120, G.mapH);
        gx.fillStyle = '#475569';
        for (var py = 0; py < G.mapH; py += 20) gx.fillRect(x - 60, py, 118, 18);
    });

    // Draw Asphalt
    gx.fillStyle = '#0f172a'; // Deep asphalt
    hRoads.forEach(function (y) { gx.fillRect(0, y - 45, G.mapW, 90); });
    vRoads.forEach(function (x) { gx.fillRect(x - 45, 0, 90, G.mapH); });

    // Pixel Road Lines
    gx.fillStyle = '#fbbf24';
    hRoads.forEach(function (y) { for (var tx = 0; tx < G.mapW; tx += 80) { gx.fillRect(tx + 20, y - 4, 30, 8); gx.fillRect(tx + 20, y - 2, 34, 4); } });
    vRoads.forEach(function (x) { for (var ty = 0; ty < G.mapH; ty += 80) { gx.fillRect(x - 4, ty + 20, 8, 30); gx.fillRect(x - 2, ty + 20, 4, 34); } });

    // Traffic Lights (Đèn giao thông)
    var nTime = Date.now();
    var cycle = (nTime / 1000) % 15; // 15s chu kỳ
    var isGreen = cycle < 6;
    var isRed = cycle >= 7 && cycle < 14;
    var isYellow = !isGreen && !isRed;

    hRoads.forEach(function (y) {
        vRoads.forEach(function (x) {
            var tx = x - 70, ty = y - 70;
            // Cột đèn
            gx.fillStyle = '#1e293b'; gx.fillRect(tx, ty, 6, 40);
            gx.fillRect(tx, ty, 25, 6);
            // Hộp đèn
            gx.fillStyle = '#0f172a'; gx.fillRect(tx + 20, ty - 5, 12, 30);
            // Bóng đèn (Đỏ - Vàng - Xanh)
            gx.fillStyle = isRed ? '#ef4444' : '#450a0a'; gx.fillRect(tx + 22, ty - 3, 8, 8);
            gx.fillStyle = isYellow ? '#eab308' : '#422006'; gx.fillRect(tx + 22, ty + 6, 8, 8);
            gx.fillStyle = isGreen ? '#22c55e' : '#052e16'; gx.fillRect(tx + 22, ty + 15, 8, 8);
        });
    });

    // Trees (Decoration)
    G.objs.forEach(function (o) {
        if (o.t !== 'exercise') {
            drawTree(o.x + o.w / 2 + 50, o.y);
            drawTree(o.x - o.w / 2 - 50, o.y);
        }
    });
}

function drawTree(tx, ty) {
    // Blocky Shadow
    gx.fillStyle = 'rgba(0,0,0,0.3)'; gx.fillRect(tx - 16, ty + 4, 32, 12);
    // Trunk
    gx.fillStyle = '#451a03'; gx.fillRect(tx - 6, ty - 10, 12, 20);
    gx.fillStyle = '#290f01'; gx.fillRect(tx + 2, ty - 10, 4, 20); // Trunk shading
    // Blocky Voxel Foliage
    gx.fillStyle = '#166534'; gx.fillRect(tx - 20, ty - 30, 40, 24);
    gx.fillStyle = '#14532d'; gx.fillRect(tx - 20, ty - 6, 40, 4); // Foliage shadow
    gx.fillStyle = '#15803d'; gx.fillRect(tx - 14, ty - 40, 28, 10); // Top tier
    gx.fillStyle = '#22c55e'; gx.fillRect(tx - 14, ty - 40, 8, 4); // Shine
}

function drawBuilding(o) {
    var bx = o.x - o.w / 2, by = o.y - o.h / 2, t = Date.now() / 1000;
    var isBg = o.t === 'bg';

    if (o.t === 'exercise') {
        // 1. FLAT GRASS FIELD
        gx.fillStyle = '#065f46'; // Lighter pitch green
        gx.fillRect(bx, by, o.w, o.h);
        // 2. STADIUM BLEACHERS (Darker boundaries)
        gx.fillStyle = '#064e3b';
        gx.fillRect(bx, by, o.w, 15); gx.fillRect(bx, by + o.h - 15, o.w, 15);
        gx.fillRect(bx, by, 15, o.h); gx.fillRect(bx + o.w - 15, by, 15, o.h);
        // 3. COURT LINES (White bounds)
        gx.strokeStyle = '#fff'; gx.lineWidth = 3;
        gx.strokeRect(bx + 25, by + 25, o.w - 50, o.h - 50);
        gx.beginPath(); gx.moveTo(o.x, by + 25); gx.lineTo(o.x, by + o.h - 25); gx.stroke(); // Half line
        gx.beginPath(); gx.arc(o.x, o.y, 35, 0, Math.PI * 2); gx.stroke(); // Center circle
        // Keys/Penalty boxes
        gx.strokeRect(bx + 25, by + o.h / 2 - 40, 45, 80);
        gx.strokeRect(bx + o.w - 70, by + o.h / 2 - 40, 45, 80);

        // 4. FLOATING LABEL BOX
        var lbl = o.lbl || '';
        gx.font = 'bold 15px sans-serif';
        var tw = gx.measureText(lbl).width + 24;
        gx.fillStyle = 'rgba(0,0,0,0.85)'; gx.beginPath(); gx.roundRect(o.x - tw / 2, by + o.h / 2 - 18, tw, 36, 6); gx.fill();
        gx.fillStyle = '#fff'; gx.textAlign = 'center'; gx.textBaseline = 'middle'; gx.fillText(lbl, o.x, by + o.h / 2);

        // 5. INTERACTION "!" INDICATOR
        if (G.near === o) {
            var bounce = Math.sin(t * 8) * 6;
            gx.fillStyle = '#ef4444'; gx.beginPath(); gx.arc(o.x, by - 10 + bounce, 18, 0, Math.PI * 2); gx.fill();
            gx.fillStyle = '#fff'; gx.font = 'bold 20px Inter'; gx.fillText('!', o.x, by - 10 + bounce);
        }
        return; // End here for sports field
    }

    if (o.t === 'social') {
        // 1. PARK GRASS
        gx.fillStyle = '#059669'; gx.fillRect(bx, by, o.w, o.h);
        // 2. STONE PATH (Cross)
        gx.fillStyle = '#cbd5e1';
        gx.fillRect(bx, by + o.h / 2 - 20, o.w, 40);
        gx.fillRect(bx + o.w / 2 - 20, by, 40, o.h);
        // 3. FOUNTAIN
        gx.fillStyle = '#64748b'; gx.beginPath(); gx.arc(o.x, o.y, 45, 0, Math.PI * 2); gx.fill();
        gx.fillStyle = '#0ea5e9'; gx.beginPath(); gx.arc(o.x, o.y, 35, 0, Math.PI * 2); gx.fill();
        // 4. FLOATING LABEL
        var lbl = o.lbl || ''; gx.font = 'bold 15px sans-serif'; var tw = gx.measureText(lbl).width + 24;
        gx.fillStyle = 'rgba(0,0,0,0.85)'; gx.beginPath(); gx.roundRect(o.x - tw / 2, by + o.h / 2 - 18, tw, 36, 6); gx.fill();
        gx.fillStyle = '#fff'; gx.textAlign = 'center'; gx.textBaseline = 'middle'; gx.fillText(lbl, o.x, by + o.h / 2);
        // 5. INTERACTION "!"
        if (G.near === o) {
            var bounce = Math.sin(t * 8) * 6;
            gx.fillStyle = '#ef4444'; gx.beginPath(); gx.arc(o.x, by - 10 + bounce, 18, 0, Math.PI * 2); gx.fill();
            gx.fillStyle = '#fff'; gx.font = 'bold 20px Inter'; gx.fillText('!', o.x, by - 10 + bounce);
        }
        return;
    }

    // 1. DEPTH SHADOW
    gx.fillStyle = 'rgba(0,0,0,0.4)'; gx.fillRect(bx + 12, by + 12, o.w, o.h);

    // 2. FRONT FACE
    gx.fillStyle = o.col || '#334155';
    gx.fillRect(bx, by, o.w, o.h);

    // 3. WINDOWS AND SPECIFIC DETAILS
    var wW = 12, wH = 16, gX = 10, gY = 12;
    var startY = by + 25;

    if (o.t === 'doctor') {
        // RED CROSS LOGO
        gx.fillStyle = '#ef4444';
        var cx = o.x, cy = by + 40;
        gx.fillRect(cx - 10, cy - 25, 20, 50); // Vert
        gx.fillRect(cx - 25, cy - 10, 50, 20); // Horz
        startY = cy + 40; // Windows start below logo
    }
    else if (o.t === 'gaming') {
        // G-CENTER NEON SIGN
        var glow = 0.5 + Math.sin(t * 5) * 0.5;
        gx.shadowColor = o.winC; gx.shadowBlur = 10 + glow * 10;
        gx.fillStyle = o.winC; gx.font = 'bold 24px Courier New'; gx.textAlign = 'center';
        gx.fillText("CYBER", o.x, by + 35);
        gx.shadowBlur = 0;
        startY = by + 60;

        // DECORATIVE NEON STRIPES
        gx.fillStyle = o.winC;
        gx.fillRect(bx, by, o.w, 4);
        gx.fillRect(bx, by + o.h - 4, o.w, 4);
    }
    else if (o.t === 'mall') {
        // MASSIVE GLASS FACADE
        gx.fillStyle = '#0ea5e9'; // Glass base
        gx.fillRect(bx + 15, by + 15, o.w - 30, o.h - 30);

        // Glass grid
        gx.strokeStyle = 'rgba(255,255,255,0.4)'; gx.lineWidth = 2;
        for (var gxS = bx + 45; gxS < bx + o.w - 15; gxS += 40) {
            gx.beginPath(); gx.moveTo(gxS, by + 15); gx.lineTo(gxS, by + o.h - 15); gx.stroke();
        }
        for (var gyS = by + 45; gyS < by + o.h - 15; gyS += 30) {
            gx.beginPath(); gx.moveTo(bx + 15, gyS); gx.lineTo(bx + o.w - 15, gyS); gx.stroke();
        }

        // HUGE ARCHWAY ENTRANCE
        gx.fillStyle = '#1e293b';
        gx.fillRect(o.x - 50, by + o.h - 40, 100, 40);
        gx.fillStyle = '#fef08a'; // Bright warm lighting inside
        gx.fillRect(o.x - 35, by + o.h - 30, 70, 30);

        // "MEGA MALL" NEON SIGNBOARD
        gx.shadowColor = '#f43f5e'; gx.shadowBlur = 20;
        gx.fillStyle = '#ffe4e6'; gx.font = 'bold 28px sans-serif'; gx.textAlign = 'center';
        gx.fillText("MEGA MALL", o.x, by + 50);
        gx.shadowBlur = 0;

        startY = by + 500; // Skip regular windows
    }

    // Draw Windows
    if (o.t !== 'sleep' && o.t !== 'food' && o.t !== 'fastfood' && o.t !== 'coffee') {
        for (var wy = startY; wy < by + o.h - 40; wy += wH + gY) {
            for (var wx = bx + 20; wx < bx + o.w - 20; wx += wW + gX) {
                var lit = Math.sin(wx * 0.05 + wy * 0.1 + t * 0.4) > (isBg ? 0.3 : 0.0);
                // Make overtime 3 have continuous strip windows
                var curWW = (o.t === 'overtime3') ? wW * 2 : wW;
                if (wx + curWW > bx + o.w - 20) break;
                gx.fillStyle = lit ? (o.winC || '#fbbf24') : '#0f172a';
                gx.fillRect(wx, wy, curWW, wH);
                // True Pixel-Art 3D Window Bevels
                gx.fillStyle = 'rgba(0,0,0,0.5)'; gx.fillRect(wx + curWW - 2, wy, 2, wH); gx.fillRect(wx, wy + wH - 2, curWW, 2);
                gx.fillStyle = 'rgba(255,255,255,0.2)'; gx.fillRect(wx, wy, 2, wH); gx.fillRect(wx, wy, curWW, 2);
                // Sharp Corner Shine
                if (lit) { gx.fillStyle = '#fff'; gx.fillRect(wx + 2, wy + 2, 4, 4); }
                if (o.t === 'overtime3') wx += wW; // skip extra space
            }
        }
    } else if (o.t === 'sleep') {
        // House-style windows for Sleep
        for (var wy = by + 40; wy < by + o.h - 40; wy += 30) {
            for (var wx = bx + 20; wx < bx + o.w - 20; wx += 35) {
                var lit2 = Math.sin(wx * 0.05 + wy * 0.1 + t * 0.4) > 0.0;
                gx.fillStyle = lit2 ? o.winC : '#0f172a';
                gx.fillRect(wx, wy, 20, 20);
                gx.fillStyle = '#1e293b'; // Frame cross
                gx.fillRect(wx + 9, wy, 2, 20); gx.fillRect(wx, wy + 9, 20, 2);
            }
        }
    } else if (o.t === 'food' || o.t === 'fastfood' || o.t === 'coffee') {
        // Wide store-front windows
        gx.fillStyle = o.winC;
        gx.fillRect(bx + 20, by + 40, o.w - 40, 50);
        gx.fillStyle = 'rgba(255,255,255,0.3)';
        gx.beginPath(); gx.moveTo(bx + 50, by + 40); gx.lineTo(bx + 30, by + 90); gx.lineTo(bx + 45, by + 90); gx.lineTo(bx + 65, by + 40); gx.fill(); // Reflection
    }
    gx.globalAlpha = 1;

    // 4. TOP ROOF
    if (o.t === 'sleep') {
        // Sloped House Roof
        gx.fillStyle = '#78350f'; // Dark orange/brown
        gx.beginPath();
        gx.moveTo(bx - 10, by);
        gx.lineTo(bx + o.w / 2, by - 40);
        gx.lineTo(bx + o.w + 10, by);
        gx.closePath();
        gx.fill();
        // Chimney
        gx.fillStyle = '#451a03'; gx.fillRect(bx + o.w - 30, by - 35, 12, 25);
        // Smoke
        if (G.hour < 22 && G.hour > 5) {
            gx.fillStyle = 'rgba(255,255,255,0.4)';
            gx.beginPath(); gx.arc(bx + o.w - 24 + Math.sin(t * 2) * 5, by - 45 - (t * 10) % 20, 5 + (t * 5) % 5, 0, Math.PI * 2); gx.fill();
        }
    } else if (o.t === 'coffee' || o.t === 'food' || o.t === 'fastfood') {
        // Awnings for shops
        gx.fillStyle = o.colT || '#1e293b';
        gx.fillRect(bx, by - 15, o.w, 30);

        var awningW = 20;
        for (var awnx = bx; awnx < bx + o.w; awnx += awningW) {
            var awRealW = Math.min(awningW, bx + o.w - awnx);
            var isRed = (awnx / awningW) % 2 === 0;
            if (o.t === 'coffee') isRed = (awnx / awningW) % 2 === 0 ? '#9a3412' : '#fcd34d'; // brown/yellow
            else isRed = isRed ? '#ef4444' : '#f8fafc'; // red/white
            gx.fillStyle = isRed;
            gx.fillRect(awnx, by + 20, awRealW, 20);
            // round bottom
            gx.beginPath(); gx.arc(awnx + awRealW / 2, by + 40, awRealW / 2, 0, Math.PI); gx.fill();
        }
    } else if (o.t === 'overtime') {
        if (typeof G !== 'undefined' && G.character === 'lan') {
            // TAILORING WORKSHOP ROOF — fabric rolls
            gx.fillStyle = '#ec4899';
            gx.fillRect(bx, by - 15, o.w, 30);
            gx.fillStyle = '#f472b6'; gx.beginPath(); gx.arc(bx + 30, by, 10, 0, Math.PI * 2); gx.fill();
            gx.fillStyle = '#a855f7'; gx.beginPath(); gx.arc(bx + 60, by, 8, 0, Math.PI * 2); gx.fill();
            // Fabric rolls on roof
            gx.fillStyle = '#fce7f3'; gx.font = '24px sans-serif'; gx.textAlign = 'center';
            // Removed sewing icon fillText
            // Thread lines
            gx.strokeStyle = 'rgba(244,114,182,0.3)'; gx.lineWidth = 1; gx.setLineDash([4, 6]);
            for (var tl = by + 60; tl < by + o.h - 40; tl += 30) {
                gx.beginPath(); gx.moveTo(bx + 10, tl); gx.lineTo(bx + o.w - 10, tl); gx.stroke();
            }
            gx.setLineDash([]);
        } else {
            // Helipad on Modern Office
            gx.fillStyle = o.colT || '#1e293b';
            gx.fillRect(bx, by - 15, o.w, 30);
            gx.strokeStyle = '#94a3b8'; gx.lineWidth = 2;
            gx.beginPath(); gx.arc(bx + o.w / 2, by, 12, 0, Math.PI * 2); gx.stroke();
            gx.font = 'bold 12px sans-serif'; gx.fillStyle = '#cbd5e1'; gx.textAlign = 'center'; gx.textBaseline = 'middle';
            gx.fillText("H", bx + o.w / 2, by);
        }
    } else if (o.t === 'freelance' && typeof G !== 'undefined' && G.character === 'lan') {
        // NAIL SALON ROOF — nail polish bottles
        gx.fillStyle = '#db2777';
        gx.fillRect(bx, by - 15, o.w, 30);
        var nailColors = ['#f43f5e', '#a855f7', '#06b6d4', '#f59e0b', '#10b981'];
        for (var nb = 0; nb < nailColors.length; nb++) {
            var nbx = bx + 20 + nb * 35;
            if (nbx > bx + o.w - 20) break;
            gx.fillStyle = nailColors[nb];
            gx.fillRect(nbx, by + 25, 12, 25);
            gx.fillStyle = '#1e293b';
            gx.fillRect(nbx + 3, by + 20, 6, 8);
        }
        gx.fillStyle = 'rgba(255,255,255,' + (0.3 + Math.sin(t * 4) * 0.3) + ')';
        gx.font = '16px sans-serif'; gx.textAlign = 'center';
        // Removed decorative sparkle emojis
    } else if (o.t === 'overtime3') {
        if (typeof G !== 'undefined' && G.character === 'lan') {
            // NIGHT MARKET ROOF — lanterns + canopy
            gx.fillStyle = '#7c2d12';
            gx.fillRect(bx, by - 15, o.w, 30);
            var canopyColors = ['#ef4444', '#f59e0b', '#ef4444', '#f59e0b'];
            var stripeW = o.w / canopyColors.length;
            for (var sc = 0; sc < canopyColors.length; sc++) {
                gx.fillStyle = canopyColors[sc];
                gx.fillRect(bx + sc * stripeW, by + 15, stripeW, 15);
            }
            var lanternColors = ['#ef4444', '#fbbf24', '#ef4444'];
            for (var ln = 0; ln < lanternColors.length; ln++) {
                var lnx = bx + 40 + ln * 60;
                if (lnx > bx + o.w - 20) break;
                var sway = Math.sin(t * 2 + ln) * 3;
                gx.fillStyle = '#1e293b'; gx.fillRect(lnx + 4, by + 30, 2, 10);
                gx.fillStyle = lanternColors[ln];
                gx.beginPath(); gx.arc(lnx + 5 + sway, by + 48, 8, 0, Math.PI * 2); gx.fill();
                gx.fillStyle = 'rgba(255,200,50,0.15)';
                gx.beginPath(); gx.arc(lnx + 5 + sway, by + 48, 16, 0, Math.PI * 2); gx.fill();
            }
        } else {
            // Tech building antennas
            gx.fillStyle = o.colT || '#1e293b';
            gx.fillRect(bx, by - 15, o.w, 30);
            gx.fillStyle = '#475569';
            gx.fillRect(bx + 20, by - 45, 4, 30);
            gx.fillRect(bx + o.w - 30, by - 35, 2, 20);
            gx.fillStyle = Math.sin(t * 5) > 0 ? '#ef4444' : '#450a0a';
            gx.fillRect(bx + 19, by - 47, 6, 6);
        }
    } else {
        // Flat pseudo-3D roof
        gx.fillStyle = o.colT || '#1e293b';
        gx.fillRect(bx, by - 15, o.w, 30);
        gx.strokeStyle = 'rgba(255,255,255,0.1)'; gx.lineWidth = 1; gx.strokeRect(bx, by - 15, o.w, 30);
    }

    if (!isBg) {
        // 5. ENTRANCE
        gx.fillStyle = '#1e1b4b'; gx.fillRect(o.x - 20, by + o.h - 34, 40, 34); // Door frame
        gx.fillStyle = '#0f0e26'; gx.fillRect(o.x + 16, by + o.h - 34, 4, 34); // Frame depth
        gx.fillStyle = '#431407'; gx.fillRect(o.x - 16, by + o.h - 30, 32, 30); // Door
        gx.fillStyle = '#260a03'; gx.fillRect(o.x + 12, by + o.h - 30, 4, 30);  // Door shadow
        gx.fillStyle = '#fbbf24'; gx.fillRect(o.x + 6, by + o.h - 16, 4, 6); // Blocky handle

        // Specific Entrance Overrides
        if (o.t === 'doctor') {
            // Ambulance parking / emergency red stripes
            gx.fillStyle = '#ef4444'; gx.fillRect(o.x - 30, by + o.h - 30, 60, 5);
            gx.fillStyle = '#fff'; gx.fillRect(o.x - 30, by + o.h - 25, 60, 5);
        }

        // 6. FLOATING LABEL BOX (Blocky)
        var lbl = o.lbl || '';
        gx.font = 'bold 13px "Courier New", monospace'; // Pixel-ish fallback font
        var tw = gx.measureText(lbl).width + 20;
        gx.fillStyle = 'rgba(0,0,0,0.85)'; gx.fillRect(o.x - tw / 2, by + o.h / 2 - 18, tw, 30);
        gx.fillStyle = 'rgba(255,255,255,0.2)'; gx.fillRect(o.x - tw / 2, by + o.h / 2 - 18, tw, 2); // Top border
        gx.fillStyle = '#fff'; gx.textAlign = 'center'; gx.textBaseline = 'middle'; gx.fillText(lbl, o.x, by + o.h / 2 - 2);

        // 7. INTERACTION "!" INDICATOR (Blocky)
        if (G.near === o) {
            var bounce = Math.floor(Math.sin(t * 8) * 4) * 2; // Stepped bounce
            var px = o.x, py = by - 50 + bounce;
            gx.fillStyle = '#ef4444'; gx.fillRect(px - 14, py - 14, 28, 28);
            gx.fillStyle = '#b91c1c'; gx.fillRect(px + 10, py - 14, 4, 28); gx.fillRect(px - 14, py + 10, 24, 4);
            gx.fillStyle = '#fff'; gx.fillRect(px - 4, py - 8, 8, 10); gx.fillRect(px - 4, py + 4, 8, 4);
        }
    }
}

function updTraffic() {
    // Traffic light cycle (synced with drawFloor traffic lights)
    var cycle = (Date.now() / 1000) % 15;
    var hGreen = cycle < 6;  // horizontal cars can go
    var vGreen = cycle >= 7 && cycle < 14; // vertical cars can go
    var hRoadsList = [450, 1350], vRoadsList = [600, 1800, 3000];
    var p = G.p;

    G.cars.forEach(function (c) {
        var nearIntersection = false;

        if (c.isVert) {
            // Check if approaching an intersection
            for (var r = 0; r < hRoadsList.length; r++) {
                var distToInt = c.dir > 0 ? (hRoadsList[r] - c.y) : (c.y - hRoadsList[r]);
                if (distToInt > 0 && distToInt < 60) { nearIntersection = true; break; }
            }

            if (nearIntersection && !vGreen) {
                // Stop before intersection at red light
            } else {
                c.y += c.v * c.dir;
            }
            // Keep car strictly on its lane
            if (c.roadX) c.x = c.roadX;
            // Wrap around
            if (c.y > G.mapH + 50) c.y = -50;
            if (c.y < -50) c.y = G.mapH + 50;
        } else {
            // Horizontal car
            for (var r = 0; r < vRoadsList.length; r++) {
                var distToInt = c.dir > 0 ? (vRoadsList[r] - c.x) : (c.x - vRoadsList[r]);
                if (distToInt > 0 && distToInt < 60) { nearIntersection = true; break; }
            }

            if (nearIntersection && !hGreen) {
                // Stop before intersection at red light
            } else {
                c.x += c.v * c.dir;
            }
            // Keep car strictly on its lane
            if (c.roadY) c.y = c.roadY;
            // Wrap around
            if (c.x > G.mapW + 50) c.x = -50;
            if (c.x < -50) c.x = G.mapW + 50;
        }

        // Maintain safe distance from car ahead
        G.cars.forEach(function (other) {
            if (other === c) return;
            if (c.isVert === other.isVert) {
                if (c.isVert && c.roadX === other.roadX && c.dir === other.dir) {
                    var dist = (other.y - c.y) * c.dir;
                    if (dist > 0 && dist < 60) {
                        // Too close, slow down
                        if (c.isVert) c.y -= c.v * c.dir * 0.5;
                    }
                } else if (!c.isVert && c.roadY === other.roadY && c.dir === other.dir) {
                    var dist = (other.x - c.x) * c.dir;
                    if (dist > 0 && dist < 60) {
                        if (!c.isVert) c.x -= c.v * c.dir * 0.5;
                    }
                }
            }
        });

        // Car-player collision check
        var cw = c.isVert ? 24 : 36, ch = c.isVert ? 36 : 24;
        var cx = c.isVert ? c.x - 12 : c.x - 18;
        var cy = c.isVert ? c.y - 18 : c.y - 12;
        var pSz = p.sz * 0.5;
        if (p.x + pSz > cx && p.x - pSz < cx + cw && p.y + pSz > cy && p.y - pSz < cy + ch) {
            if (!G._carHitCooldown) {
                G._carHitCooldown = true;
                
                var dmg = 100; // Minh, Lan chết ngay sau 1 hit
                if (G.character === 'khanh') dmg = 25; // Khánh 4 hit
                else if (G.character === 'hung') dmg = 50; // Hùng 2 hit
                
                G.hp -= dmg;
                if (G.hp <= 0) {
                    triggerDeath('traffic');
                } else {
                    popText(p.x, p.y, '-' + dmg + ' HP (Cẩn thận xe!)', true);
                }
                setTimeout(function () { G._carHitCooldown = false; }, 3000);
            }
        }
    });
}

function drawTraffic() {
    G.cars.forEach(function (c) {
        var d = c.dir;
        // Car shadow
        gx.fillStyle = 'rgba(0,0,0,0.4)';
        if (c.isVert) gx.fillRect(c.x - 14, c.y - 16, 28, 38);
        else gx.fillRect(c.x - 16, c.y - 14, 38, 28);

        // Car chassis / Tires
        gx.fillStyle = '#0f172a';
        if (c.isVert) {
            gx.fillRect(c.x - 15, c.y - 12, 4, 8); gx.fillRect(c.x + 11, c.y - 12, 4, 8); // Rear tires
            gx.fillRect(c.x - 15, c.y + 8, 4, 8); gx.fillRect(c.x + 11, c.y + 8, 4, 8);  // Front tires
        } else {
            gx.fillRect(c.x - 12, c.y - 15, 8, 4); gx.fillRect(c.x + 8, c.y - 15, 8, 4); // Rear tires
            gx.fillRect(c.x - 12, c.y + 11, 8, 4); gx.fillRect(c.x + 8, c.y + 11, 8, 4); // Front tires
        }

        // Main body
        gx.fillStyle = c.col;
        var cw = c.isVert ? 24 : 36, ch = c.isVert ? 36 : 24;
        gx.fillRect(c.isVert ? c.x - 12 : c.x - 18, c.isVert ? c.y - 18 : c.y - 12, cw, ch);

        // Roof & Details
        if (c.isVert) {
            gx.fillStyle = 'rgba(255,255,255,0.2)'; gx.fillRect(c.x - 9, c.y - 6, 18, 12); // Cabin top
            gx.fillStyle = '#1e293b'; gx.fillRect(c.x - 8, c.dir > 0 ? c.y + 6 : c.y - 10, 16, 4); // Windshield
            gx.fillStyle = '#1e293b'; gx.fillRect(c.x - 8, c.dir > 0 ? c.y - 10 : c.y + 6, 16, 3); // Back window
            // Lights
            gx.fillStyle = c.dir > 0 ? '#fef08a' : '#ef4444'; // Front or Rear
            gx.fillRect(c.x - 10, c.dir > 0 ? c.y + 16 : c.y - 18, 5, 2);
            gx.fillRect(c.x + 5, c.dir > 0 ? c.y + 16 : c.y - 18, 5, 2);
            gx.fillStyle = c.dir > 0 ? '#ef4444' : '#fef08a';
            gx.fillRect(c.x - 10, c.dir > 0 ? c.y - 18 : c.y + 16, 5, 2);
            gx.fillRect(c.x + 5, c.dir > 0 ? c.y - 18 : c.y + 16, 5, 2);
        } else {
            gx.fillStyle = 'rgba(255,255,255,0.2)'; gx.fillRect(c.x - 6, c.y - 9, 12, 18); // Cabin top
            gx.fillStyle = '#1e293b'; gx.fillRect(c.dir > 0 ? c.x + 6 : c.x - 10, c.y - 8, 4, 16); // Windshield
            gx.fillStyle = '#1e293b'; gx.fillRect(c.dir > 0 ? c.x - 10 : c.x + 6, c.y - 8, 3, 16); // Back window
            // Lights
            gx.fillStyle = c.dir > 0 ? '#fef08a' : '#ef4444';
            gx.fillRect(c.dir > 0 ? c.x + 16 : c.x - 18, c.y - 10, 2, 5);
            gx.fillRect(c.dir > 0 ? c.x + 16 : c.x - 18, c.y + 5, 2, 5);
            gx.fillStyle = c.dir > 0 ? '#ef4444' : '#fef08a';
            gx.fillRect(c.dir > 0 ? c.x - 18 : c.x + 16, c.y - 10, 2, 5);
            gx.fillRect(c.dir > 0 ? c.x - 18 : c.x + 16, c.y + 5, 2, 5);
        }
    });
}

function drawObjs() {
    var screenW = 1200, screenH = 620;
    G.objs.forEach(function (o) {
        if (o.x + o.w / 2 < G.camX || o.x - o.w / 2 > G.camX + screenW || o.y + o.h / 2 < G.camY || o.y - o.h / 2 > G.camY + screenH) return;
        drawBuilding(o);

        // Interaction range circle
        if (G.near === o) {
            gx.strokeStyle = 'rgba(255,215,0,0.4)'; gx.setLineDash([5, 5]); gx.lineWidth = 2;
            gx.beginPath(); gx.arc(o.x, o.y, 100, 0, Math.PI * 2); gx.stroke(); gx.setLineDash([]);
        }
    });
}
function drawDesk3D(cx, cy, t) {
    drawBox3D(cx - 35, cy + 8, 70, 20, 0, '#3a3020', '#2a2218', '#1e180e');
    drawBox3D(cx - 35, cy, 70, 6, 2, '#4a3a28', '#3a2e1e', '#2e2214');
    drawBox3D(cx - 14, cy - 20, 28, 18, 3, '#222', '#111', '#0a0a0a');
    var sc = Math.sin(t * 2 + cx) > .5 ? 'rgba(80,170,255,.5)' : 'rgba(60,140,220,.35)'; gx.fillStyle = sc; gx.fillRect(cx - 11, cy - 18, 22, 13);
    drawBox3D(cx - 4, cy - 2, 8, 3, 1, '#333', '#222', '#1a1a1a');
}
function drawLamp3D(cx, cy, t) {
    var glow = .35 + Math.sin(t * 1.5 + cx) * .15;
    var lg = gx.createRadialGradient(cx, cy + 8, 2, cx, cy + 8, 40);
    lg.addColorStop(0, 'rgba(255,220,120,' + glow + ')'); lg.addColorStop(1, 'transparent');
    gx.fillStyle = lg; gx.beginPath(); gx.arc(cx, cy + 8, 40, 0, Math.PI * 2); gx.fill();
    px3d(cx - 1, cy + 10, 3, 14, '#555');
    gx.fillStyle = '#ffd700'; gx.beginPath(); gx.arc(cx, cy - 5, 4, 0, Math.PI * 2); gx.fill();
    gx.fillStyle = 'rgba(255,215,0,.3)'; gx.beginPath(); gx.arc(cx, cy - 5, 7, 0, Math.PI * 2); gx.fill();
}
function drawBed3D(cx, cy) {
    drawBox3D(cx - 38, cy - 14, 76, 40, 6, '#2a2a5a', '#1a1a3a', '#14142a');
    drawBox3D(cx - 38, cy - 18, 76, 6, 8, '#3a3a6a', '#2a2a5a', '#1e1e4a');
    drawBox3D(cx - 32, cy - 12, 20, 8, 8, '#eee', '#ddd', '#bbb');
}
function drawSofa3D(cx, cy) {
    drawBox3D(cx - 32, cy, 64, 22, 4, '#2a4a2a', '#1a2a1a', '#14201a');
    drawBox3D(cx - 36, cy - 6, 8, 28, 6, '#1e3a1e', '#1a2a1a', '#142014');
    drawBox3D(cx + 28, cy - 6, 8, 28, 6, '#1e3a1e', '#1a2a1a', '#142014');
}
function drawCoffee3D(cx, cy, t) {
    drawBox3D(cx - 18, cy - 28, 36, 42, 6, '#3a2a1a', '#2a1a0a', '#1e1208');
    gx.fillStyle = '#ffd700'; gx.beginPath(); gx.arc(cx, cy - 16, 4, 0, Math.PI * 2); gx.fill();
    gx.globalAlpha = .35 + Math.sin(t * 3) * .15; gx.strokeStyle = 'rgba(255,255,255,.5)'; gx.lineWidth = 1.5;
    for (var s = 0; s < 3; s++) {
        var sx2 = cx - 5 + s * 5, sOff = Math.sin(t * 2 + s * 2) * 4;
        gx.beginPath(); gx.moveTo(sx2, cy - 30); gx.quadraticCurveTo(sx2 + sOff, cy - 40, sx2 - sOff, cy - 50); gx.stroke();
    }
    gx.globalAlpha = 1;
    drawBox3D(cx - 6, cy - 4, 12, 10, 2, '#fff', '#eee', '#ccc');
    gx.fillStyle = '#8B4513'; gx.fillRect(cx - 4, cy - 2, 8, 6);
}
function drawMed3D(cx, cy) {
    drawBox3D(cx - 20, cy - 22, 40, 38, 6, '#f0f0f0', '#e0e0e0', '#c8c8c8');
    gx.strokeStyle = '#e63946'; gx.lineWidth = 2.5; gx.beginPath(); gx.moveTo(cx, cy - 16); gx.lineTo(cx, cy + 2); gx.stroke();
    gx.beginPath(); gx.moveTo(cx - 9, cy - 7); gx.lineTo(cx + 9, cy - 7); gx.stroke();
}
function drawChar(cx, cy, sz, col, moving, isP, fatigue, hp, name) {
    var t = Date.now() / 1000, by = moving ? Math.sin(t * 12) * 2 : 0; cy += by;
    var tired = fatigue > 60, critical = fatigue > 85 || hp < 20;

    gx.save();
    // Drop shadow for character
    gx.shadowColor = 'rgba(0,0,0,0.5)';
    gx.shadowBlur = 4;
    gx.shadowOffsetY = 4;

    // Legs (Stepping animation)
    var step = moving ? Math.sin(t * 12) * (sz * 0.35) : 0;
    gx.fillStyle = '#0f172a'; // Pants / Shoes
    gx.fillRect(cx - sz * 0.3, cy + sz * 0.3 - step, sz * 0.25, sz * 0.6 + step);
    gx.fillRect(cx + sz * 0.05, cy + sz * 0.3 + step, sz * 0.25, sz * 0.6 - step);

    // Block Body
    var bodyW = sz * 0.9;
    var bodyH = sz * 0.65;
    if (isP && typeof G !== 'undefined') {
        if (G.character === 'khanh') {
            // Body width thay đổi theo cân nặng: 50kg -> sz*0.85, 100kg -> sz*1.4
            var w = G.khanhWeight || 100;
            bodyW = sz * (0.85 + (w - 50) / 50 * 0.55);
            col = '#cbd5e1'; // Áo nhạt
        }
        if (G.character === 'hung') { bodyW = sz * 0.75; col = '#f59e0b'; } // Gầy, áo thun vàng
        if (G.character === 'lan') { col = '#ec4899'; } // Áo hồng
    }

    gx.fillStyle = col;
    gx.fillRect(cx - bodyW * 0.5, cy - sz * 0.3, bodyW, bodyH);
    gx.shadowColor = 'transparent'; // Turn off shadow for internal shading
    gx.fillStyle = 'rgba(0,0,0,0.2)'; // Body shading
    gx.fillRect(cx + bodyW * 0.1, cy - sz * 0.3, bodyW * 0.4, bodyH);

    // Accessories based on name
    if (name === 'Bác sĩ Nam') {
        gx.fillStyle = '#f8fafc'; // White coat
        gx.fillRect(cx - sz * 0.45, cy - sz * 0.3, sz * 0.9, sz * 0.75);
        gx.fillStyle = '#38bdf8'; // scrubs under
        gx.fillRect(cx - sz * 0.1, cy - sz * 0.3, sz * 0.2, sz * 0.5);
        gx.fillStyle = '#ef4444'; // stethoscope
        gx.fillRect(cx - sz * 0.2, cy - sz * 0.2, sz * 0.1, sz * 0.3);
        gx.fillRect(cx - sz * 0.2, cy + sz * 0.1, sz * 0.4, sz * 0.1);
    } else if (name === 'Game Thủ') {
        gx.fillStyle = '#10b981'; // Green hoodie
        gx.fillRect(cx - sz * 0.45, cy - sz * 0.3, sz * 0.9, sz * 0.65);
        gx.fillStyle = '#064e3b'; // hood
        gx.fillRect(cx - sz * 0.45, cy - sz * 0.4, sz * 0.9, sz * 0.2);
    } else if (name === 'Sếp Tổng') {
        gx.fillStyle = '#1e293b'; // dark suit
        gx.fillRect(cx - sz * 0.45, cy - sz * 0.3, sz * 0.9, sz * 0.65);
        gx.fillStyle = '#fff'; // shirt piece
        gx.fillRect(cx - sz * 0.15, cy - sz * 0.3, sz * 0.3, sz * 0.3);
        gx.fillStyle = '#f59e0b'; // golden tie
        gx.fillRect(cx - sz * 0.05, cy - sz * 0.2, sz * 0.1, sz * 0.4);
    }

    // Arms
    var armM = moving ? Math.cos(t * 12) * (sz * 0.3) : 0;
    var armCol = (name === 'Bác sĩ Nam') ? '#f8fafc' : col; // white coat arms
    if (name === 'Sếp Tổng') armCol = '#1e293b';
    gx.fillStyle = armCol;
    gx.fillRect(cx - bodyW * 0.5 - sz * 0.25, cy - sz * 0.2 + armM, sz * 0.25, sz * 0.45);
    gx.fillRect(cx + bodyW * 0.5, cy - sz * 0.2 - armM, sz * 0.25, sz * 0.45);

    // Hands (Blocky skin)
    var skinC = critical ? '#fca5a5' : tired ? '#fdba74' : '#fcd34d';
    gx.fillStyle = skinC;
    gx.fillRect(cx - bodyW * 0.5 - sz * 0.2, cy + sz * 0.25 + armM, sz * 0.18, sz * 0.15); // Left hand
    gx.fillRect(cx + bodyW * 0.5 + sz * 0.02, cy + sz * 0.25 - armM, sz * 0.18, sz * 0.15); // Right hand

    // Head setup & Outlines
    var tilt = critical ? Math.sin(t * 3) * 0.1 : tired ? Math.sin(t * 1.5) * 0.05 : 0;
    gx.translate(cx, cy - sz * 0.7); gx.rotate(tilt);

    // Draw thick outline around head to pop
    gx.fillStyle = '#0f172a';
    gx.fillRect(-sz * 0.45, -sz * 0.5, sz * 0.9, sz * 0.85);

    gx.fillStyle = skinC;
    gx.fillRect(-sz * 0.4, -sz * 0.45, sz * 0.8, sz * 0.75);

    // Hair
    gx.fillStyle = '#1e140f'; // Dark blocky hair
    if (name === 'Game Thủ') gx.fillStyle = '#ef4444'; // Red hair
    if (isP && typeof G !== 'undefined') {
        if (G.character === 'lan') {
            gx.fillRect(-sz * 0.45, -sz * 0.5, sz * 0.9, sz * 0.25);
            gx.fillRect(-sz * 0.55, -sz * 0.25, sz * 0.2, sz * 0.7); // long hair L
            gx.fillRect(sz * 0.35, -sz * 0.25, sz * 0.2, sz * 0.7); // long hair R
        } else if (G.character === 'hung') {
            gx.fillRect(-sz * 0.45, -sz * 0.5, sz * 0.9, sz * 0.3); // Thicker hair
            gx.fillRect(-sz * 0.5, -sz * 0.2, sz * 0.15, sz * 0.2); // messy sideburn
            gx.fillRect(sz * 0.35, -sz * 0.2, sz * 0.15, sz * 0.2);
        } else {
            gx.fillRect(-sz * 0.45, -sz * 0.5, sz * 0.9, sz * 0.25);
            gx.fillRect(-sz * 0.45, -sz * 0.25, sz * 0.2, sz * 0.2); // Sideburn L
            gx.fillRect(sz * 0.25, -sz * 0.25, sz * 0.2, sz * 0.2); // Sideburn R
        }
    } else {
        gx.fillRect(-sz * 0.45, -sz * 0.5, sz * 0.9, sz * 0.25);
        gx.fillRect(-sz * 0.45, -sz * 0.25, sz * 0.2, sz * 0.2); // Sideburn L
        gx.fillRect(sz * 0.25, -sz * 0.25, sz * 0.2, sz * 0.2); // Sideburn R
    }

    // Glasses for Hung
    if (isP && typeof G !== 'undefined' && G.character === 'hung') {
        gx.fillStyle = '#111'; // Gọng kính
        gx.fillRect(-sz * 0.3, -sz * 0.18, sz * 0.25, sz * 0.2); // Mắt trái
        gx.fillRect(sz * 0.05, -sz * 0.18, sz * 0.25, sz * 0.2); // Mắt phải
        gx.fillRect(-sz * 0.05, -sz * 0.1, sz * 0.1, sz * 0.05); // Cầu kính
    }

    // Game Thủ Headphones
    if (name === 'Game Thủ') {
        gx.fillStyle = '#1e293b';
        gx.fillRect(-sz * 0.5, -sz * 0.45, sz * 0.15, sz * 0.3); // left ear
        gx.fillRect(sz * 0.35, -sz * 0.45, sz * 0.15, sz * 0.3); // right ear
        gx.fillRect(-sz * 0.4, -sz * 0.55, sz * 0.8, sz * 0.1); // headband
    }

    // Eyes (Pixel blocks)
    gx.fillStyle = '#fff';
    gx.fillRect(-sz * 0.25, -sz * 0.15, sz * 0.2, sz * 0.15); // L eye
    gx.fillRect(sz * 0.05, -sz * 0.15, sz * 0.2, sz * 0.15); // R eye
    gx.fillStyle = critical ? '#ef4444' : '#000';
    gx.fillRect(-sz * 0.2, -sz * 0.1, sz * 0.1, sz * 0.1); // L pupil
    gx.fillRect(sz * 0.1, -sz * 0.1, sz * 0.1, sz * 0.1); // R pupil

    if (tired) {
        gx.fillStyle = 'rgba(0,0,0,0.3)';
        gx.fillRect(-sz * 0.25, 0, sz * 0.2, sz * 0.05); // Eye bags
        gx.fillRect(sz * 0.05, 0, sz * 0.2, sz * 0.05);
    }

    // Mouth
    gx.fillStyle = critical ? '#b91c1c' : '#854d0e';
    gx.fillRect(-sz * 0.1, sz * 0.1, sz * 0.2, sz * 0.08); // Neutral flat mouth
    gx.restore();

    // Tie or accessory for Player
    if (isP) {
        if (typeof G !== 'undefined') {
            if (G.character === 'lan') {
                gx.fillStyle = '#fce7f3'; // Light pink scarf
                gx.fillRect(cx - sz * 0.15, cy - sz * 0.25, sz * 0.3, sz * 0.2);
            } else if (G.character === 'khanh') {
                gx.fillStyle = '#3b82f6'; // Blue tie
                gx.fillRect(cx - sz * 0.1, cy - sz * 0.25, sz * 0.2, sz * 0.45);
            } else if (G.character === 'hung') {
                gx.fillStyle = '#1e293b'; // Dây đeo cặp
                gx.fillRect(cx - sz * 0.3, cy - sz * 0.3, sz * 0.15, sz * 0.6);
                gx.fillRect(cx + sz * 0.15, cy - sz * 0.3, sz * 0.15, sz * 0.6);
            } else {
                gx.fillStyle = '#ef4444';
                gx.fillRect(cx - sz * 0.1, cy - sz * 0.25, sz * 0.2, sz * 0.45); // Red tie
            }
        }

        // Blocky HP bar floating above
        var bw = sz * 2.5, bx = cx - bw / 2, by2 = cy - sz * 1.5;
        gx.fillStyle = '#1e293b'; gx.fillRect(bx, by2, bw, sz * 0.3);
        var hpC = G.hp > 60 ? '#10b981' : G.hp > 30 ? '#f59e0b' : '#ef4444';
        gx.fillStyle = hpC; gx.fillRect(bx + 1, by2 + 1, (bw - 2) * (G.hp / 100), sz * 0.3 - 2);
    }
}

function drawEnvironmentEffects() {
    var t = Date.now() / 1000;
    var h = G.hour;
    var isNight = h >= 19 || h <= 5;
    var isDusk = h >= 17 && h < 19;
    var isDawn = h >= 5 && h < 7;

    // Moving Clouds (World space parallax)
    gx.fillStyle = isNight ? 'rgba(200, 200, 255, 0.04)' : (isDusk || isDawn ? 'rgba(255, 200, 200, 0.06)' : 'rgba(255, 255, 255, 0.08)');
    for (var c = 0; c < 15; c++) {
        var cxOff = ((c * 153 + t * 15) % (G.mapW + 400)) - 200;
        var cyOff = (c * 342) % G.mapH;
        gx.beginPath();
        gx.arc(cxOff, cyOff, 80 + (c * 13) % 60, 0, Math.PI * 2);
        gx.arc(cxOff + 60, cyOff + 20, 60 + (c * 7) % 40, 0, Math.PI * 2);
        gx.arc(cxOff - 50, cyOff + 30, 70 + (c * 23) % 50, 0, Math.PI * 2);
        gx.fill();
    }

    // Floating Particles for daytime / nightime
    if (!isNight) {
        var vW = 1200 / G.zoom, vH = 620 / G.zoom;
        gx.fillStyle = 'rgba(255, 255, 200, 0.3)';
        for (var p = 0; p < 20; p++) {
            var px = ((p * 241 + t * 5) % vW) + G.camX;
            var py = ((p * 144 + Math.sin(t + p) * 10) % vH) + G.camY;
            gx.fillRect(px, py, 2, 2);
        }
    }

    // Screen/Camera fixed ambient overlay
    var overlayColor = 'rgba(0,0,0,0)';
    if (isNight) overlayColor = 'rgba(10, 15, 30, 0.6)';
    else if (isDusk) overlayColor = 'rgba(50, 20, 0, 0.3)';
    else if (isDawn) overlayColor = 'rgba(30, 40, 60, 0.2)';
    else overlayColor = 'rgba(255, 255, 255, 0.12)'; // Brighten daytime significantly

    gx.fillStyle = overlayColor;
    var w = 1200 / G.zoom, h = 620 / G.zoom;
    gx.fillRect(G.camX, G.camY, w, h); // Cover screen

    // Draw Stars in the sky randomly during night (no moon/sun per user request)
    if (isNight) {
        gx.save();
        gx.translate(G.camX + w / 2, G.camY + h / 2);
        for (var s = 0; s < 50; s++) {
            var sx = ((s * 321) % w) - w / 2;
            var sy = ((s * 513) % h) - h / 2;
            var twinkle = Math.sin(t * 2 + s) > 0 ? 0.8 : 0.1;
            gx.fillStyle = 'rgba(255, 255, 255, ' + twinkle + ')';
            gx.fillRect(sx, sy, 2, 2);
        }
        gx.restore();
    }
}
function render() {
    var sx = 0, sy = 0;
    if (G.shake > 0) { sx = (Math.random() - .5) * G.shake; sy = (Math.random() - .5) * G.shake; G.shake *= .85; }

    gx.clearRect(0, 0, 1200, 620);
    gx.save();
    gx.scale(G.zoom, G.zoom);
    gx.translate(sx - G.camX, sy - G.camY);

    drawFloor();
    drawTraffic();
    drawObjs();
    G.npcs.forEach(function (n) { drawChar(n.x, n.y, 16, n.col, !!n.tx, false, 0, 100, n.name); });
    var pCol = (typeof G !== 'undefined' && G.character === 'lan') ? '#d946ef' : '#2a5a9a';
    drawChar(G.p.x, G.p.y, G.p.sz, pCol, G.p.moving, true, G.fatigue, G.hp, 'Player');
    drawP(gx);
    drawEnvironmentEffects();

    if (G.near) {
        gx.strokeStyle = 'rgba(255,215,0,.25)'; gx.lineWidth = 1; gx.setLineDash([4, 6]);
        gx.beginPath(); gx.arc(G.near.x, G.near.y, 88, 0, Math.PI * 2); gx.stroke(); gx.setLineDash([]);
    }

    // ── WORK TIMER BAR (Rendered in World Space overhead) ──
    if (G.workTimer && G.workTimer.active) {
        var wt = G.workTimer;
        var elapsed = Date.now() - wt.start;
        var prog = Math.min(1, elapsed / wt.duration);
        var barW = 160, barH = 14, barY = G.p.y - 95, barX = G.p.x - barW / 2;

        // Background
        gx.fillStyle = 'rgba(0,0,0,0.85)';
        gx.beginPath(); gx.roundRect(barX, barY - 20, barW, barH + 24, 6); gx.fill();

        // Progress fill
        var barCol = wt.isWork ? '#ffd700' : wt.isRest ? '#4ecdc4' : '#ff9944';
        var pGrad = gx.createLinearGradient(barX, barY, barX + barW * prog, barY);
        pGrad.addColorStop(0, barCol); pGrad.addColorStop(1, 'rgba(255,255,255,0.4)');
        gx.fillStyle = pGrad; gx.beginPath(); gx.roundRect(barX + 2, barY + 2, (barW - 4) * prog, barH - 4, 4); gx.fill();

        // Border lines
        gx.strokeStyle = 'rgba(255,255,255,0.1)'; gx.lineWidth = 1; gx.strokeRect(barX + 2, barY + 2, barW - 4, barH - 4);

        // Label
        var remainMs = Math.max(0, wt.duration - elapsed);
        var remainSec = Math.ceil(remainMs / 1000);
        gx.font = 'bold 11px Inter,sans-serif'; gx.textAlign = 'center'; gx.textBaseline = 'middle';
        gx.fillStyle = '#fff';
        var cleanLabel = (wt.label || 'Đang thực hiện').replace(/<[^>]+>/g, '');
        gx.fillText(cleanLabel + ' (' + remainSec + 's)', G.p.x, barY - 8);

        if (prog >= 1) { G.workTimer.active = false; }
    }

    gx.restore();

    // SCREEN SPACE ELEMENTS (HUD, OVERLAYS)
    if (G.fatigue >= 80) { var a2 = ((G.fatigue - 80) / 20) * Math.abs(Math.sin(Date.now() / 500)) * .15; gx.fillStyle = 'rgba(200,0,0,' + a2 + ')'; gx.fillRect(0, 0, 1200, 620); }
    // Working animation overlay
    if (G.workingAnim) {
        G.workAnimTimer--;
        var wa = .6 + Math.sin(Date.now() / 200) * .2;
        gx.fillStyle = 'rgba(0,0,0,' + (.3 * wa) + ')'; gx.fillRect(0, 0, 1200, 620);
        gx.font = 'bold 18px Courier New'; gx.textAlign = 'center'; gx.textBaseline = 'middle';
        gx.fillStyle = 'rgba(255,215,0,' + wa + ')'; gx.fillText('ĐANG LÀM VIỆC...', 600, 310);
        var dots = '.'.repeat(Math.floor(Date.now() / 300) % 4);
        gx.font = '12px Courier New'; gx.fillStyle = 'rgba(200,200,255,.6)';
        gx.fillText('Gõ bàn phím' + dots, 600, 340);
    }

    // X-Ray Scanning Animation Overlay
    if (G.xrayActive) {
        var t = Date.now() / 1000;
        var scanPos = (Math.sin(t * 4) + 1) / 2; // 0 to 1 back and forth
        var screenW = 1200, screenH = 620;
        var sy = scanPos * screenH;

        // Draw blue beam blur
        gx.fillStyle = 'rgba(0, 255, 255, 0.15)';
        gx.fillRect(0, sy - 60, screenW, 120);

        // Draw sharp laser lines
        gx.shadowColor = '#00ffff'; gx.shadowBlur = 15;
        gx.fillStyle = '#00ffff';
        gx.fillRect(0, sy, screenW, 4);
        gx.fillRect(0, sy - 2, screenW, 8); // thickening
        gx.shadowBlur = 0;

    }
}

// ── MODAL ────────────────────────────────────────────
function showM(t, c) { G.modalOpen = true; document.getElementById('mbox').innerHTML = '<h2>' + t + '</h2>' + c; document.getElementById('movl').classList.add('on'); }
function closeM() { G.modalOpen = false; document.getElementById('movl').classList.remove('on'); }
function continueGame() { SFX.click(); if (G.day > 1 && G.hp > 0 && G.fatigue < 100) { go('game'); } else openCharacterSelect(); }

// ── WEBCAM FACE CAPTURE (REMOVED) ────────────────────────


// ── AI HEALTH MOVED TO health_calc.js ──
// ── MENU BG ──────────────────────────────────────────
var bgC = document.getElementById('bgCanvas'), bgX = bgC.getContext('2d');
function sizeBG() { bgC.width = window.innerWidth; bgC.height = window.innerHeight; } sizeBG(); window.addEventListener('resize', sizeBG);
var bPts = []; for (var bi = 0; bi < 55; bi++)bPts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0003, vy: (Math.random() - .5) * .0003, sz: Math.random() * 1.4 + .4, br: Math.random() });
(function animBG() { var W = bgC.width, H = bgC.height; bgX.fillStyle = 'rgba(0,0,0,.1)'; bgX.fillRect(0, 0, W, H); bPts.forEach(function (p) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0; if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0; var bv = Math.abs(Math.sin(Date.now() / 2200 + p.br * 10)); bgX.fillStyle = 'rgba(40,60,100,' + (0.22 * bv) + ')'; bgX.beginPath(); bgX.arc(p.x * W, p.y * H, p.sz, 0, Math.PI * 2); bgX.fill(); }); requestAnimationFrame(animBG); })();
(function () {
    var sc2 = document.getElementById('sceneCanvas'), sx3 = sc2.getContext('2d');
    var BLDS = [{ x: .00, w: .072, h: .36 }, { x: .08, w: .058, h: .48 }, { x: .15, w: .088, h: .30 }, { x: .25, w: .065, h: .52 }, { x: .33, w: .088, h: .40 }, { x: .43, w: .098, h: .45 }, { x: .54, w: .076, h: .33 }, { x: .63, w: .088, h: .50 }, { x: .73, w: .078, h: .38 }, { x: .82, w: .096, h: .44 }, { x: .93, w: .07, h: .30 }];
    function draw2() {
        var W = sc2.offsetWidth, H = sc2.offsetHeight; if (sc2.width !== W || sc2.height !== H) { sc2.width = W; sc2.height = H; } sx3.clearRect(0, 0, W, H); var t = Date.now() / 1000;
        var sky = sx3.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#020818'); sky.addColorStop(.35, '#06102a'); sky.addColorStop(.65, '#0a1530'); sky.addColorStop(1, '#0c1428'); sx3.fillStyle = sky; sx3.fillRect(0, 0, W, H);
        var stars = [.12, .34, .56, .78, .23, .67, .45, .89, .11, .55, .33, .77, .22, .44, .66, .88, .15, .37, .59, .81, .03, .27, .49, .71, .93, .07, .41, .63, .85, .19];
        stars.forEach(function (sv, i) { var starX = ((sv * 1234.5) % 1) * W, starY = ((sv * 678.9 + i * .07) % .52) * H, tw = .4 + .55 * Math.abs(Math.sin(t * .65 + i * 1.3)); sx3.globalAlpha = tw; sx3.fillStyle = '#fff'; sx3.beginPath(); sx3.arc(starX, starY, i % 3 === 0 ? 1.4 : i % 2 === 0 ? .9 : .6, 0, Math.PI * 2); sx3.fill(); }); sx3.globalAlpha = 1;
        var mx = W * .76, my = H * .2 + Math.sin(t * .14) * 4, mr = H * .088;
        var mg = sx3.createRadialGradient(mx, my, mr * .4, mx, my, mr * 2.8); mg.addColorStop(0, 'rgba(180,200,240,.22)'); mg.addColorStop(1, 'transparent'); sx3.fillStyle = mg; sx3.beginPath(); sx3.arc(mx, my, mr * 2.8, 0, Math.PI * 2); sx3.fill();
        var mb = sx3.createRadialGradient(mx - mr * .25, my - mr * .25, mr * .1, mx, my, mr); mb.addColorStop(0, 'rgba(220,230,250,.95)'); mb.addColorStop(.6, 'rgba(180,200,235,.8)'); mb.addColorStop(1, 'rgba(120,145,185,.5)'); sx3.fillStyle = mb; sx3.beginPath(); sx3.arc(mx, my, mr, 0, Math.PI * 2); sx3.fill();
        BLDS.forEach(function (b) { var bx = b.x * W, bw = b.w * W, bh = b.h * H, by = H - bh; sx3.fillStyle = '#060a14'; sx3.fillRect(bx, by, bw, bh); for (var wx = bx + 4; wx < bx + bw - 6; wx += 9) { for (var wy = by + 5; wy < by + bh - 6; wy += 11) { if (Math.sin(t * .14 + wx * .38 + wy * .28) > -.18) { var bright = .38 + Math.sin(t * .07 + wx * .18) * .18; sx3.fillStyle = 'rgba(255,' + (175 + Math.floor((wx * 7) % 40)) + ',75,' + bright + ')'; sx3.fillRect(wx, wy, 5, 7); } } } });
        var grd = sx3.createLinearGradient(0, H * .85, 0, H); grd.addColorStop(0, '#060a18'); grd.addColorStop(1, '#040810'); sx3.fillStyle = grd; sx3.fillRect(0, H * .85, W, H * .15);
        sx3.strokeStyle = 'rgba(80,100,140,.08)'; sx3.lineWidth = 1; for (var ri = 0; ri < 50; ri++) { var rx = ((ri * 137.5 + t * 175) % W), ry = ((t * 195 + ri * 79.7) % H); sx3.beginPath(); sx3.moveTo(rx, ry); sx3.lineTo(rx - 2, ry + 13); sx3.stroke(); }
        requestAnimationFrame(draw2);
    } draw2();
})();
document.querySelectorAll('.mbtn').forEach(function (b) { b.addEventListener('mouseenter', function () { SFX.click(); }); });
startAmbient('menu');
initHearts();

// ── HUD CONTROLS ─────────────────────────────────────
function initHUDControls() {
    var dpad = document.getElementById('dpad');
    if (!dpad) return;

    var btns = dpad.querySelectorAll('.dpad-btn');
    btns.forEach(function (btn) {
        var key = btn.dataset.key;

        function press(e) {
            e.preventDefault();
            G.keys[key] = true;
            btn.classList.add('active');
            SFX.click();
        }
        function release(e) {
            e.preventDefault();
            G.keys[key] = false;
            btn.classList.remove('active');
        }

        btn.addEventListener('mousedown', press);
        btn.addEventListener('mouseup', release);
        btn.addEventListener('mouseleave', release);

        btn.addEventListener('touchstart', press, { passive: false });
        btn.addEventListener('touchend', release, { passive: false });
        btn.addEventListener('touchcancel', release, { passive: false });
    });
}
initHUDControls();

// Prevent Game Controls mapping while typing in AI Chatbot
setTimeout(function () {
    var chatInput = document.getElementById('aiChatInput');
    if (chatInput) {
        chatInput.addEventListener('keydown', function (e) {
            e.stopPropagation();
            if (e.key === 'Enter') sendChatMessage();
        });
        chatInput.addEventListener('keyup', function (e) { e.stopPropagation(); });
        chatInput.addEventListener('keypress', function (e) { e.stopPropagation(); });
    }
}, 1000);

function toggleChat() {
    document.getElementById('aiChat').classList.toggle('minimized');
}

function openChat() {
    if(typeof SFX !== 'undefined') SFX.click();
    var aiChat = document.getElementById('aiChat');
    if (aiChat) {
        aiChat.style.display = 'flex';
        aiChat.classList.remove('minimized');
    }
}


// ── CHATBOT MOVED TO chat_client.js ──
function calcBMI() {
    var h = parseFloat(document.getElementById('ai_height').value);
    var w = parseFloat(document.getElementById('ai_weight').value);
    if (h > 0 && w > 0) {
        var bmi = w / ((h / 100) * (h / 100));
        document.getElementById('ai_bmi').value = bmi.toFixed(1);
    }
}

// ══════════════════════════════════════════════
// EMERGENCY CALL MODAL
// ══════════════════════════════════════════════
var _emergencyContacts = [];
try {
    _emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
} catch (e) { console.warn("localStorage restricted", e); }

function openEmergencyModal() {
    var modal = document.getElementById('emergencyModal');
    if (!modal) return;
    modal.classList.add('open');
    renderPersonalContacts();
    // Close on backdrop click
    modal.addEventListener('click', function _backdrop(e) {
        if (e.target === modal) {
            closeEmergencyModal();
            modal.removeEventListener('click', _backdrop);
        }
    });
}

function closeEmergencyModal() {
    var modal = document.getElementById('emergencyModal');
    if (modal) modal.classList.remove('open');
}

function renderPersonalContacts() {
    var container = document.getElementById('personalContacts');
    if (!container) return;
    if (_emergencyContacts.length === 0) {
        container.innerHTML = '<div style="color:rgba(200,200,200,0.3);font-size:12px;font-family:Inter,sans-serif;text-align:center;padding:10px;">Chưa có liên hệ nào. Thêm ngay bên dưới.</div>';
        return;
    }
    container.innerHTML = _emergencyContacts.map(function (c, i) {
        return '<div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 10px;">' +
            '<div style="font-size:20px;">👤</div>' +
            '<div style="flex:1;">' +
            '<div style="color:#eee;font-size:13px;font-family:Inter,sans-serif;font-weight:600;">' + c.name + '</div>' +
            '<div style="color:#aaa;font-size:11px;font-family:Inter,sans-serif;">' + c.phone + '</div>' +
            '</div>' +
            '<a href="tel:' + c.phone + '" onclick="closeEmergencyModal()" style="text-decoration:none;background:rgba(0,200,120,0.15);border:1px solid rgba(0,200,120,0.4);border-radius:6px;padding:6px 12px;color:#00dd88;font-size:13px;font-family:Inter,sans-serif;font-weight:bold;transition:all 0.15s;" onmouseover="this.style.background=\'rgba(0,200,120,0.3)\'" onmouseout="this.style.background=\'rgba(0,200,120,0.15)\'">📞 GỌI</a>' +
            '<button onclick="removePersonalContact(' + i + ')" style="background:transparent;border:none;color:#666;font-size:16px;cursor:pointer;padding:2px 4px;" title="Xóa" onmouseover="this.style.color=\'#ff4444\'" onmouseout="this.style.color=\'#666\'">✕</button>' +
            '</div>';
    }).join('');
}

function addPersonalContact() {
    var name = prompt('Tên liên hệ (VD: Mẹ, Anh Tuấn, Bạn thân):');
    if (!name || !name.trim()) return;
    var phone = prompt('Số điện thoại (nhập số thật, VD: 0901234567):');
    if (!phone || !phone.trim()) return;
    phone = phone.trim().replace(/\s/g, '');
    _emergencyContacts.push({ name: name.trim(), phone: phone });
    try { localStorage.setItem('emergencyContacts', JSON.stringify(_emergencyContacts)); } catch (e) { }
    renderPersonalContacts();
}

function removePersonalContact(index) {
    if (!confirm('Xóa liên hệ "' + _emergencyContacts[index].name + '"?')) return;
    _emergencyContacts.splice(index, 1);
    try { localStorage.setItem('emergencyContacts', JSON.stringify(_emergencyContacts)); } catch (e) { }
    renderPersonalContacts();
}

// Close modal with ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeEmergencyModal();
});