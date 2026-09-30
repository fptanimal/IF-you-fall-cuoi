// ══════════════════════════════════════════════════════════
// PIXEL ART LORE INTRO — Full Canvas Renderer
// ══════════════════════════════════════════════════════════

var PixelIntro = (function () {
    var canvas, ctx, W, H, raf;
    var phase = 0, phaseTime = 0, totalTime = 0;
    var storyData = null, goalData = null;
    var onStartCallback = null;
    var typedChars = 0, typeSpeed = 35; // ms per char
    var lastTypeTime = 0;
    var btnGlow = 0, btnHover = false, skipBtnHover = false;
    var roomAlpha = 0, crtAlpha = 0;
    var skipReady = false;
    var starField = [];
    var scanlineOffset = 0;
    var portraitScanY = 0;
    var cityLights = [];
    var lampFlicker = 0;
    var deskItems = [];
    var loopTimer = 0;
    var isActive = false;

    // ── PIXEL ART PALETTE (warm retro) ──
    var PAL = {
        bg: '#05070a',
        wallDark: '#0f121d', wallMid: '#161a2b', wallLight: '#1d233a',
        floorDark: '#0d0908', floorMid: '#1a120f', floorLight: '#261b17',
        wood: '#3a2b1f', woodMid: '#2d1f16', woodDark: '#1a120d',
        bedSheet: '#1e2b45', bedPillow: '#2e3b55', bedFrame: '#130d0a',
        lampBase: '#3a3026', lampShade: '#8c6d31', lampGlow: 'rgba(255,160,60,0.15)',
        windowFrame: '#13131d', windowGlass: '#040810', nightSky: '#02040a',
        starColor: '#ffecb3',
        crtBody: '#22222a', crtScreen: '#0a140a', crtGlow: 'rgba(120,160,120,0.08)',
        crtText: '#b0c8a8', crtTextBright: '#d0ead0', crtHeader: '#80a880',
        crtBorder: '#14141c',
        btnBg: '#1a3350', btnBorder: '#3d618c', btnText: '#c0d5ff',
        btnGlowColor: 'rgba(61,97,140,0.5)',
        photoFrame: '#3d2b15', photoSkin: '#b38a5a', photoHair: '#2e1d13',
        photoShirt: '#2a3f6d', photoDress: '#6d2a3a',
        boxColor: '#3d523d', calColor: '#a49680',
        cityDark: '#080a15', cityMid: '#0f1226', cityLight: '#181c3a',
        windowLight: '#d4a441',
        skinTone: '#c49a7a', skinShadow: '#9a7658',
        hairDark: '#120a0a', hairLight: '#2d2319',
        rimLight: 'rgba(255,255,255,0.06)',
        highlight: 'rgba(255,255,255,0.1)'
    };

    // ── PHASES ──
    var PHASE = {
        DARK: 0, ROOM_REVEAL: 1, CRT_BOOT: 2,
        LORE_HEADER: 3, CHAPTER_TITLE: 4, PORTRAIT: 5,
        STORY_TEXT: 6, BUTTON_APPEAR: 7, IDLE: 8, FADE_OUT: 9
    };
    var PHASE_DURATION = [2000, 2000, 1500, 800, 1000, 1200, 12000, 1200, Infinity, 2000];

    // ── INIT ──
    function init(canvasEl, story, goal, onStart) {
        canvas = canvasEl;
        ctx = canvas.getContext('2d');

        // POLYFILL: roundRect for older environments
        if (!ctx.roundRect) {
            ctx.roundRect = function (x, y, w, h, r) {
                if (typeof r === 'number') r = [r, r, r, r];
                this.beginPath();
                this.moveTo(x + r[0], y);
                this.lineTo(x + w - r[1], y);
                this.quadraticCurveTo(x + w, y, x + w, y + r[1]);
                this.lineTo(x + w, y + h - r[2]);
                this.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
                this.lineTo(x + r[3], y + h);
                this.quadraticCurveTo(x, y + h, x, y + h - r[3]);
                this.lineTo(x, y + r[0]);
                this.quadraticCurveTo(x, y, x + r[0], y);
                this.closePath();
                return this;
            };
        }

        storyData = story;
        goalData = goal;
        onStartCallback = onStart;
        isActive = true;

        resize();
        window.addEventListener('resize', resize);
        canvas.addEventListener('click', onClick);
        canvas.addEventListener('mousemove', onMouseMove);
        document.addEventListener('keydown', onKey);

        // Generate starfield
        starField = [];
        for (var i = 0; i < 60; i++) {
            starField.push({
                x: Math.random(), y: Math.random() * 0.5,
                s: 0.5 + Math.random() * 1.5, b: Math.random(), sp: 0.5 + Math.random() * 2
            });
        }

        // Generate city lights
        cityLights = [];
        for (var i = 0; i < 40; i++) {
            cityLights.push({
                x: Math.random(), y: Math.random(),
                on: Math.random() > 0.3, flicker: Math.random() * 5
            });
        }

        phase = PHASE.DARK;
        phaseTime = 0;
        totalTime = 0;
        typedChars = 0;
        roomAlpha = 0;
        crtAlpha = 0;
        btnGlow = 0;
        portraitScanY = 0;
        skipReady = false;
        loopTimer = 0;

        cancelAnimationFrame(raf);
        var lastFrame = performance.now();
        function loop(now) {
            if (!isActive) return;
            var dt = Math.min(now - lastFrame, 50);
            lastFrame = now;
            update(dt);
            draw();
            raf = requestAnimationFrame(loop);
        }
        raf = requestAnimationFrame(loop);
    }

    function destroy() {
        isActive = false;
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        if (canvas) {
            canvas.removeEventListener('click', onClick);
            canvas.removeEventListener('mousemove', onMouseMove);
        }
        document.removeEventListener('keydown', onKey);
    }

    function resize() {
        var dpr = window.devicePixelRatio || 1;
        W = canvas.width = window.innerWidth * dpr;
        H = canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);
        // Update W/H to logical units for the rest of drawing
        W = window.innerWidth;
        H = window.innerHeight;
    }

    // ── UPDATE ──
    function update(dt) {
        totalTime += dt;
        phaseTime += dt;
        scanlineOffset = (scanlineOffset + dt * 0.05) % 4;
        lampFlicker = Math.sin(totalTime * 0.003) * 0.1 + 0.9;

        var dur = PHASE_DURATION[phase];
        if (phaseTime >= dur && phase < PHASE.IDLE) {
            phase++;
            phaseTime = 0;
            if (phase === PHASE.STORY_TEXT) {
                typedChars = 0;
                lastTypeTime = 0;
            }
            if (phase === PHASE.BUTTON_APPEAR) {
                skipReady = true;
            }
        }

        // Phase-specific updates
        if (phase === PHASE.ROOM_REVEAL) {
            roomAlpha = Math.min(1, phaseTime / 1800);
        } else if (phase >= PHASE.CRT_BOOT) {
            roomAlpha = 1;
        }

        if (phase === PHASE.CRT_BOOT) {
            crtAlpha = Math.min(1, phaseTime / 1200);
        } else if (phase > PHASE.CRT_BOOT) {
            crtAlpha = 1;
        }

        if (phase === PHASE.PORTRAIT) {
            portraitScanY = Math.min(1, phaseTime / 1000);
        } else if (phase > PHASE.PORTRAIT) {
            portraitScanY = 1;
        }

        if (phase === PHASE.STORY_TEXT) {
            lastTypeTime += dt;
            var plainText = getPlainStoryText();
            if (lastTypeTime >= typeSpeed && typedChars < plainText.length) {
                typedChars++;
                lastTypeTime = 0;
            }
        } else if (phase > PHASE.STORY_TEXT) {
            typedChars = 9999;
        }

        if (phase >= PHASE.BUTTON_APPEAR) {
            btnGlow = 0.5 + 0.5 * Math.sin(totalTime * 0.004);
        }

        // Idle loop back
        if (phase === PHASE.IDLE) {
            loopTimer += dt;
            if (loopTimer > 15000) {
                phase = PHASE.FADE_OUT;
                phaseTime = 0;
            }
        }

        if (phase === PHASE.FADE_OUT && phaseTime >= 2000) {
            phase = PHASE.DARK;
            phaseTime = 0;
            typedChars = 0;
            roomAlpha = 0;
            crtAlpha = 0;
            portraitScanY = 0;
            btnGlow = 0;
            skipReady = false;
            loopTimer = 0;
        }

        // City light flicker
        cityLights.forEach(function (l) {
            l.flicker -= dt * 0.001;
            if (l.flicker <= 0) {
                l.on = Math.random() > 0.25;
                l.flicker = 1 + Math.random() * 4;
            }
        });
    }

    // ── DRAW ──
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Determine effective alpha for fade out
        var fadeAlpha = 1;
        if (phase === PHASE.FADE_OUT) {
            fadeAlpha = 1 - phaseTime / 2000;
        }
        if (phase === PHASE.DARK) {
            fadeAlpha = 0;
        }

        ctx.save();
        ctx.globalAlpha = fadeAlpha;

        // Scale scene to fit screen
        var scaleX = W / 960;
        var scaleY = H / 540;
        var scale = Math.min(scaleX, scaleY);
        var offsetX = (W - 960 * scale) / 2;
        var offsetY = (H - 540 * scale) / 2;
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        // Background fill
        ctx.fillStyle = PAL.bg;
        ctx.fillRect(-10, -10, 980, 560);

        // Room (with reveal alpha)
        ctx.globalAlpha = fadeAlpha * roomAlpha;
        drawRoom();
        drawWindow();
        drawBed();
        drawLamp();
        drawDesk();
        drawDeskItems();

        // CRT Monitor
        ctx.globalAlpha = fadeAlpha * roomAlpha;
        drawCRTBody();

        ctx.globalAlpha = fadeAlpha * crtAlpha;
        drawCRTScreen();

        // Scanlines over entire scene
        ctx.globalAlpha = fadeAlpha * 0.08;
        drawScanlines(960, 540);

        // Room ambient glow
        ctx.globalAlpha = fadeAlpha * roomAlpha * 0.3;
        drawAmbientGlow();

        ctx.restore();

        // Dark background always
        if (phase === PHASE.DARK || phase === PHASE.FADE_OUT) {
            ctx.fillStyle = PAL.bg;
            ctx.globalAlpha = phase === PHASE.DARK ? 1 : phaseTime / 2000;
            ctx.fillRect(0, 0, W, H);
            ctx.globalAlpha = 1;

            // Show "Press any key" hint during dark phase
            if (phase === PHASE.DARK && phaseTime > 500) {
                ctx.fillStyle = 'rgba(255,255,255,' + (0.4 + 0.3 * Math.sin(totalTime * 0.003)) + ')';
                ctx.font = 'bold 18px "VT323", monospace';
                ctx.textAlign = 'center';
                ctx.fillText('CLICK TO START THE STORY', W / 2, H / 2);

                ctx.font = '12px "VT323", monospace';
                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                ctx.fillText('NHẤP CHUỘT ĐỂ BẮT ĐẦU CÂU CHUYỆN', W / 2, H / 2 + 30);
            }
        }

        // Skip hint / button
        if (phase > PHASE.DARK && phase < PHASE.IDLE) {
            ctx.save();
            ctx.fillStyle = skipBtnHover ? '#ffffff' : 'rgba(160,180,200,0.5)';
            ctx.font = 'bold 12px "Press Start 2P", "VT323", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var skipX = W - 110, skipY = H - 55, skipW = 90, skipH = 34;
            ctx.fillText('SKIP ⏭', skipX + skipW / 2, skipY + skipH / 2);
            ctx.strokeStyle = skipBtnHover ? '#ffffff' : 'rgba(160,180,200,0.3)';
            ctx.strokeRect(skipX, skipY, skipW, skipH);
            if (skipBtnHover) {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(skipX, skipY, skipW, skipH);
            }
            if (!skipBtnHover) {
                ctx.fillStyle = 'rgba(160,180,200,0.3)';
                ctx.font = '9px monospace';
                ctx.fillText('SPACE/ENTER', skipX + skipW / 2, skipY - 10);
            }
            ctx.restore();
        }
    }

    // ── ROOM DRAWING ──
    function drawRoom() {
        // Back wall (Patterned wallpaper feel)
        var grad = ctx.createLinearGradient(0, 0, 0, 320);
        grad.addColorStop(0, PAL.wallDark);
        grad.addColorStop(1, PAL.wallMid);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 960, 320);

        // Subtle wallpaper pattern (dithered dots)
        ctx.fillStyle = 'rgba(255,255,255,0.01)';
        for (var px = 0; px < 960; px += 32) {
            for (var py = 0; py < 320; py += 32) {
                ctx.fillRect(px, py, 1, 1);
            }
        }

        // Floor (High contrast boards)
        var fGrad = ctx.createLinearGradient(0, 320, 0, 540);
        fGrad.addColorStop(0, PAL.floorDark);
        fGrad.addColorStop(1, PAL.floorMid);
        ctx.fillStyle = fGrad;
        ctx.fillRect(0, 320, 960, 220);

        // Floor boards with perspective
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        for (var x = -200; x < 1200; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, 320);
            ctx.lineTo(x - 100, 540);
            ctx.stroke();
            // Grain highlights
            ctx.strokeStyle = 'rgba(255,255,255,0.02)';
            ctx.beginPath(); ctx.moveTo(x + 2, 320); ctx.lineTo(x - 98, 540); ctx.stroke();
        }

        // Heavy dither shadows in corners
        ditherRect(0, 0, 300, 540, 'rgba(0,0,0,0.3)', 2);
        ditherRect(660, 0, 300, 540, 'rgba(0,0,0,0.3)', 2);
        ditherRect(0, 480, 960, 60, 'rgba(0,0,0,0.4)', 2);

        // Baseboard
        ctx.fillStyle = PAL.floorDark;
        ctx.fillRect(0, 316, 960, 6);
    }

    function drawWindow() {
        var wx = 40, wy = 40, ww = 220, wh = 200;

        // Shadow behind frame
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(wx - 8, wy - 8, ww + 16, wh + 16);

        // Window frame
        ctx.fillStyle = PAL.windowFrame;
        ctx.fillRect(wx - 4, wy - 4, ww + 8, wh + 8);

        // Night sky (deep gradient)
        var sGrad = ctx.createLinearGradient(wx, wy, wx, wy + wh);
        sGrad.addColorStop(0, '#04060c');
        sGrad.addColorStop(1, '#0e0a15');
        ctx.fillStyle = sGrad;
        ctx.fillRect(wx, wy, ww, wh);

        // Moving Clouds
        drawClouds(wx, wy, ww, wh);

        // Stars (twinkling)
        starField.forEach(function (s) {
            var sx = wx + s.x * ww;
            var sy = wy + s.y * wh * 0.7;
            var bright = 0.4 + 0.6 * Math.abs(Math.sin(totalTime * 0.0012 * s.sp + s.b * 10));
            ctx.fillStyle = 'rgba(255,240,180,' + bright + ')';
            ctx.fillRect(Math.floor(sx), Math.floor(sy), Math.ceil(s.s), Math.ceil(s.s));
        });

        // City skyline with glow
        drawCitySkyline(wx, wy, ww, wh);

        // Glass reflection sheen
        var sheenX = (totalTime * 0.02) % (ww * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.beginPath();
        ctx.moveTo(wx + sheenX - 40, wy);
        ctx.lineTo(wx + sheenX, wy);
        ctx.lineTo(wx + sheenX - 60, wy + wh);
        ctx.lineTo(wx + sheenX - 100, wy + wh);
        ctx.fill();

        // Window grid
        ctx.fillStyle = PAL.windowFrame;
        ctx.fillRect(wx + ww / 2 - 2, wy, 4, wh);
        ctx.fillRect(wx, wy + wh / 2 - 2, ww, 4);

        // Window sill
        ctx.fillStyle = PAL.wood;
        ctx.fillRect(wx - 10, wy + wh + 4, ww + 20, 12);
        ctx.fillStyle = PAL.highlight;
        ctx.fillRect(wx - 10, wy + wh + 4, ww + 20, 2);

        // Curtains (detailed pixel folds)
        ctx.fillStyle = '#1a1425';
        ctx.fillRect(wx - 25, wy - 10, 28, wh + 30);
        ctx.fillRect(wx + ww - 3, wy - 10, 28, wh + 30);
        // Folds (dithered)
        ditherRect(wx - 25, wy - 10, 8, wh + 30, '#000', 2);
        ditherRect(wx + ww + 15, wy - 10, 8, wh + 30, '#000', 2);
    }

    function drawClouds(wx, wy, ww, wh) {
        ctx.fillStyle = 'rgba(40, 30, 60, 0.2)';
        for (var i = 0; i < 3; i++) {
            var cx = wx + ((totalTime * 0.005 + i * 100) % (ww + 100)) - 50;
            var cy = wy + 20 + i * 30;
            ctx.fillRect(cx, cy, 60, 10);
            ctx.fillRect(cx + 10, cy - 5, 40, 5);
        }
    }

    function drawCitySkyline(wx, wy, ww, wh) {
        var buildings = [
            { x: 0.02, w: 0.12, h: 0.55 },
            { x: 0.10, w: 0.08, h: 0.70 },
            { x: 0.16, w: 0.10, h: 0.45 },
            { x: 0.24, w: 0.06, h: 0.85 },
            { x: 0.28, w: 0.14, h: 0.50 },
            { x: 0.40, w: 0.08, h: 0.65 },
            { x: 0.46, w: 0.12, h: 0.40 },
            { x: 0.56, w: 0.06, h: 0.78 },
            { x: 0.60, w: 0.10, h: 0.55 },
            { x: 0.68, w: 0.14, h: 0.48 },
            { x: 0.78, w: 0.08, h: 0.72 },
            { x: 0.84, w: 0.10, h: 0.38 },
            { x: 0.92, w: 0.08, h: 0.60 }
        ];

        buildings.forEach(function (b, i) {
            var bx = wx + b.x * ww;
            var bw = b.w * ww;
            var bh = b.h * wh * 0.5;
            var by = wy + wh - bh;
            var col = i % 3 === 0 ? PAL.cityDark : i % 3 === 1 ? PAL.cityMid : PAL.cityLight;
            ctx.fillStyle = col;
            ctx.fillRect(Math.round(bx), Math.round(by), Math.round(bw), Math.round(bh));

            // Windows in buildings
            var winRows = Math.floor(bh / 10);
            var winCols = Math.floor(bw / 8);
            for (var r = 0; r < winRows; r++) {
                for (var c = 0; c < winCols; c++) {
                    var li = cityLights[(i * 7 + r * 3 + c) % cityLights.length];
                    if (li.on) {
                        ctx.fillStyle = 'rgba(255,208,96,' + (0.4 + Math.random() * 0.3) + ')';
                        ctx.fillRect(Math.round(bx + 3 + c * 8), Math.round(by + 3 + r * 10), 3, 4);
                    }
                }
            }
        });
    }

    function drawBed() {
        var bx = 40, by = 280, bw = 240, bh = 120;

        // Bed shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(bx + 10, by + bh - 5, bw - 10, 25);

        // Bed Frame
        ctx.fillStyle = PAL.bedFrame;
        ctx.fillRect(bx, by + 20, bw, bh);

        // Headboard (with wood texture)
        ctx.fillStyle = PAL.wood;
        ctx.fillRect(bx, by, 16, bh + 30);
        ditherRect(bx, by, 8, bh + 30, PAL.woodDark, 2);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(bx + 1, by + 2, 2, bh + 26); // Rim light

        // Mattress
        ctx.fillStyle = '#1a1625';
        ctx.fillRect(bx + 18, by + 25, bw - 22, bh - 10);

        // Sheets (Rich folds)
        ctx.fillStyle = PAL.bedSheet;
        ctx.fillRect(bx + 18, by + 40, bw - 22, bh - 30);
        // Folds highlight
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(bx + 40, by + 50, 60, 2);
        ctx.fillRect(bx + 100, by + 75, 80, 2);
        // Folds shadow
        ditherRect(bx + 18, by + 40, bw - 22, bh - 30, '#000', 4);

        // Pillow (Soft look)
        ctx.fillStyle = PAL.bedPillow;
        ctx.fillRect(bx + 25, by + 35, 65, 40);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(bx + 30, by + 38, 55, 3); // top shine

        // Bed legs
        ctx.fillStyle = PAL.woodDark;
        ctx.fillRect(bx + 20, by + bh + 10, 12, 35);
        ctx.fillRect(bx + bw - 32, by + bh + 10, 12, 35);
    }

    function drawLamp() {
        var lx = 270, ly = 240;

        // Lamp glow (warm circle)
        var gRad = ctx.createRadialGradient(lx + 10, ly - 20, 5, lx + 10, ly - 20, 120);
        gRad.addColorStop(0, 'rgba(255,200,100,' + (0.2 * lampFlicker) + ')');
        gRad.addColorStop(0.5, 'rgba(255,180,80,' + (0.08 * lampFlicker) + ')');
        gRad.addColorStop(1, 'rgba(255,160,60,0)');
        ctx.fillStyle = gRad;
        ctx.fillRect(lx - 110, ly - 140, 240, 240);

        // Lamp base
        ctx.fillStyle = PAL.lampBase;
        ctx.fillRect(lx + 2, ly + 20, 16, 8);

        // Lamp stem
        ctx.fillStyle = PAL.lampBase;
        ctx.fillRect(lx + 7, ly - 30, 6, 52);

        // Lamp shade
        ctx.fillStyle = PAL.lampShade;
        ctx.beginPath();
        ctx.moveTo(lx - 8, ly - 10);
        ctx.lineTo(lx + 28, ly - 10);
        ctx.lineTo(lx + 22, ly - 40);
        ctx.lineTo(lx - 2, ly - 40);
        ctx.closePath();
        ctx.fill();

        // Shade highlight
        ctx.fillStyle = 'rgba(255,255,200,0.2)';
        ctx.fillRect(lx, ly - 38, 20, 3);
    }

    function drawDesk() {
        var dx = 340, dy = 240, dw = 580, dh = 30;

        // Desk top surface
        ctx.fillStyle = PAL.wood;
        ctx.fillRect(dx, dy, dw, dh);

        // Desk top highlight & grain texture
        ctx.fillStyle = PAL.woodLight;
        ctx.fillRect(dx, dy, dw, 4);
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        for (var g = 0; g < 3; g++) {
            ctx.fillRect(dx, dy + 10 + g * 8, dw, 1);
        }

        // Desk front
        ctx.fillStyle = PAL.woodDark;
        ctx.fillRect(dx, dy + dh, dw, 140);

        // Desk drawers detail
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(dx + 10, dy + dh + 10, 180, 120);
        ctx.fillRect(dx + dw - 190, dy + dh + 10, 180, 120);

        // Drawer handles
        ctx.fillStyle = '#6a4a35';
        ctx.fillRect(dx + 90, dy + dh + 40, 20, 4);
        ctx.fillRect(dx + dw - 110, dy + dh + 40, 20, 4);

        // Desk front panel subtle highlight
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        ctx.fillRect(dx + 20, dy + dh + 20, dw - 40, 100);

        // Desk legs with feet
        ctx.fillStyle = '#222';
        ctx.fillRect(dx + 10, dy + dh + 130 + 90, 20, 10);
        ctx.fillRect(dx + dw - 30, dy + dh + 130 + 90, 20, 10);
        ctx.fillStyle = PAL.woodDark;
        ctx.fillRect(dx + 12, dy + dh + 130, 16, 100);
        ctx.fillRect(dx + dw - 28, dy + dh + 130, 16, 100);

        // Desk shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(dx - 5, dy + dh + 140, dw + 10, 8);
    }

    function drawDeskItems() {
        // Character specific desk items
        var charKey = typeof G !== 'undefined' ? G.character : 'minh';
        if (charKey === 'lan') drawMedicine(355, 195);
        else if (charKey === 'hung') drawBooks(355, 195);
        else if (charKey === 'khanh') drawDumbbell(355, 195);
        else drawFamilyPhoto(355, 195);

        // Floating dust particles in lamp light
        drawDust();

        // Coffee mug
        drawCoffeeMug(770, 215);

        // Box item (right of monitor)
        drawBox(815, 210);

        // Calendar (far right)
        drawCalendar(875, 165);
    }

    function drawMedicine(x, y) {
        // A pill bottle and stethoscope
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x+10, y+20, 30, 40); // Bottle body
        ctx.fillStyle = '#d0e0ff';
        ctx.fillRect(x+12, y+30, 26, 20); // Label
        ctx.fillStyle = '#fff';
        ctx.fillRect(x+15, y+15, 20, 5); // Cap base
        ctx.fillRect(x+17, y+10, 16, 5); // Cap top
        
        // Red cross
        ctx.fillStyle = '#e04040';
        ctx.fillRect(x+23, y+35, 4, 10);
        ctx.fillRect(x+20, y+38, 10, 4);

        // Pills scattered
        ctx.fillStyle = '#ffaaaa';
        ctx.beginPath(); ctx.arc(x+50, y+55, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#aaaaff';
        ctx.beginPath(); ctx.arc(x+60, y+58, 4, 0, Math.PI*2); ctx.fill();
    }

    function drawBooks(x, y) {
        // Stack of books
        // Bottom book
        ctx.fillStyle = '#3d523d';
        ctx.fillRect(x+5, y+45, 60, 15);
        ctx.fillStyle = '#eee';
        ctx.fillRect(x+7, y+47, 56, 11);
        
        // Middle book
        ctx.fillStyle = '#8c3a3a';
        ctx.fillRect(x+10, y+32, 50, 13);
        ctx.fillStyle = '#eee';
        ctx.fillRect(x+12, y+34, 46, 9);
        
        // Top book open
        ctx.fillStyle = '#4a608c';
        ctx.fillRect(x+15, y+22, 40, 10);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x+17, y+20, 17, 10);
        ctx.fillRect(x+36, y+20, 17, 10);
        
        // Text lines
        ctx.fillStyle = '#ccc';
        for(var i=0; i<3; i++) {
            ctx.fillRect(x+19, y+22+i*3, 13, 1);
            ctx.fillRect(x+38, y+22+i*3, 13, 1);
        }
    }

    function drawDumbbell(x, y) {
        // Briefcase
        ctx.fillStyle = '#4a3018';
        ctx.fillRect(x+15, y+20, 50, 40);
        ctx.fillStyle = '#2d1f16';
        ctx.fillRect(x+15, y+20, 50, 10);
        ctx.fillStyle = '#a49680';
        ctx.fillRect(x+35, y+26, 10, 8); // Lock
        ctx.fillRect(x+30, y+10, 20, 10); // Handle hole
        ctx.fillStyle = PAL.wood; // cutout
        ctx.fillRect(x+35, y+15, 10, 5);
        
        // Dumbbell in front
        ctx.fillStyle = '#777';
        ctx.fillRect(x, y+50, 40, 6); // Handle
        ctx.fillStyle = '#333';
        ctx.fillRect(x-5, y+40, 15, 26); // Left weight
        ctx.fillRect(x+30, y+40, 15, 26); // Right weight
        // Highlight
        ctx.fillStyle = '#555';
        ctx.fillRect(x-3, y+40, 5, 26);
        ctx.fillRect(x+32, y+40, 5, 26);
    }

    function drawDust() {
        var lx = 270, ly = 240;
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        for (var i = 0; i < 15; i++) {
            var dx = lx + Math.sin(totalTime * 0.001 + i) * 60;
            var dy = ly - 80 + Math.cos(totalTime * 0.0007 + i * 3) * 50;
            ctx.fillRect(dx, dy, 1, 1);
        }
    }

    function drawCoffeeMug(x, y) {
        ctx.fillStyle = '#eee';
        ctx.fillRect(x, y, 14, 18);
        ctx.fillStyle = '#ccc';
        ctx.fillRect(x + 10, y + 2, 4, 14); // handle part
        ctx.fillStyle = '#6a3b2a'; // coffee level
        ctx.fillRect(x + 2, y + 2, 10, 2);
    }

    var PIXEL_PAL = {
        '#': '#151518', '1': '#22293b', '2': '#323c53', '3': '#976145', '4': '#b67a57', '5': '#d09572',
        '6': '#7f3024', '7': '#a44232', '8': '#c6604a', '9': '#20578d', 'a': '#409ad3', 'b': '#95244e',
        'c': '#c9346d', 'd': '#f29dbf', 'e': '#ffffff', 'f': '#41241a', 'g': '#5e3426', 'M': '#652a21',
        'X': '#111111'
    };

    var FAMILY_ART = [
        "      #####                                  ",
        "    ##22221##            #####               ",
        "   #222111111#          #77778#              ",
        "   #211111111#         #7778887#             ",
        "   #1#555555##         #77#####7#     #######",
        "   #155555555#         #7#55555##    #gfgfgfg#",
        "   #355555555#         #75555555#   #fgfgfgfgf#",
        "   #355eX5eX5#         #75555555#   #f5555555f#",
        "   #345555554#         #755eX5eX#   #555555555#",
        "   #344444444#         ##4555554#   #55eX55eX5#",
        "    #3455e54#          #3455M554#   #455555554#",
        "    ##34444##           #344444#    #455MeM554#",
        "      #333#              #4444#     #455555554#",
        "    ###999###           ##3333##     ##4444##",
        "  ##aaa999aaa##        ##bccccb##     #dddd##",
        " #aaaaaa9aaaaaa#      #bbccccccbb#   #fddddff#",
        " #99aaaa9aaaa99#     #bbcccccbcbb#  #fddddddd#",
        " #aaaaaaaaaaaaa#    #bcbbbbbbcbcbb##ddddddddd#",
        " #9999999999999#   #bcbbbbbbbbbcbcdddddddddd#",
        " #aaaaaaaaaaaaa#  #bcbbbbbbbbbbcbcdddddddddd#",
        " #9999999999999# #bcbbbbbbbbbbbbccddcddddddd#",
        " #aaaaaaaaaaaaa##bbcbbbbbbbbbbbbcddccddddddd#",
        " #999999999999bbcbbbbbbbbbbbbbbddddddddddddd#"
    ];

    var LAN_ART = [
        "                                             ",
        "                                             ",
        "         #####                #####          ",
        "       ##fffff##            ##fffff##        ",
        "      #f5555555f#          #ff55555ff#       ",
        "     #f55X555X55f#        #ff5X555X5ff#      ",
        "     #f555555555f#        #f555555555f#      ",
        "     #f555M5M555f#        #f5555e5555f#      ",
        "     ##f5555555f##        ##f5555555f##      ",
        "       ##fffff##            ##fffff##        ",
        "      ###ccccc###          ###ddddd###       ",
        "    ##cccbbbbbbbccc##    ##ddddbbbdddd##     ",
        "   #ccccbbbbbbbbbcccc#  #dddddbbbbbddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    ",
        "   #ccccccccccccccccc#  #ddddddddddddddd#    "
    ];

    var HUNG_ART = [
        "                                             ",
        "                                             ",
        "               #######                       ",
        "             ##1111111##                     ",
        "            #11111111111#                    ",
        "           #11ee11111ee11#                   ",
        "           #11X1111111X11#                   ",
        "           #1111155511111#                   ",
        "           ##11111111111##                   ",
        "             ##fffffff##                     ",
        "            ###4444444###                    ",
        "          ##4444444444444##                  ",
        "         #44414444444441444#                 ",
        "         #44414444444441444#     #####       ",
        "         #44414444444441444#    #eeeee#      ",
        "         #44414444444441444#   #eXeeeX#      ",
        "         #44414444444441444#  #eXeeeXe#      ",
        "         #44414444444441444#  #eeeeeee#      ",
        "         #44414444444441444#  #9999999#      ",
        "         #44414444444441444#  #9999999#      ",
        "         #44414444444441444#  #aaaaaaa#      ",
        "         #44414444444441444#  #aaaaaaa#      ",
        "         #44414444444441444#  #aaaaaaa#      "
    ];

    var KHANH_ART = [
        "                                             ",
        "           #######                           ",
        "         ##f5f5f5f##                         ",
        "        #f555555555f#                        ",
        "       #f55X55555X55f#                       ",
        "       #f55555555555f#        #######        ",
        "       #f55555e55555f#       #1111111#       ",
        "       ##f555555555f##      #111111111#      ",
        "         ###fffff###        #111111111#      ",
        "       #####eeeee#####      #111111111#      ",
        "     ##eeeee99999eeeee##    ##1111111##      ",
        "    #eeeeeee99999eeeeeee#     #11111#        ",
        "   #eeeeeeee99999eeeeeeee#   ##eeeee##       ",
        "   #eeeeeeee99999eeeeeeee#  #eee111eee#      ",
        "  #eeeeeeeee99999eeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeee99999eeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeee99999eeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeee999eeeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeee999eeeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeee999eeeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeeee9eeeeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeeee9eeeeeeeeeee# #eee111eee#      ",
        "  #eeeeeeeeeeeeeeeeeeeeeee# #eee111eee#      "
    ];

    var familyImg = new Image();
    familyImg.src = 'assets/family.png';
    
    var lanLoreImg = new Image();
    lanLoreImg.src = 'assets/lore_lan_portrait_final.png?v=4';

    var hungLoreImg = new Image();
    hungLoreImg.src = 'assets/lore_hung_portrait.png?v=1';

    function drawPixelFamily(ctx, px, py, scale) {
        var artToDraw = FAMILY_ART;
        if (typeof G !== 'undefined') {
            if (G.character === 'lan') artToDraw = LAN_ART;
            else if (G.character === 'hung') artToDraw = HUNG_ART;
            else if (G.character === 'khanh') artToDraw = KHANH_ART;
        }
        
        if (artToDraw === LAN_ART && lanLoreImg && lanLoreImg.complete && lanLoreImg.naturalWidth > 0) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            var imgW = lanLoreImg.naturalWidth;
            var imgH = lanLoreImg.naturalHeight;
            
            // Match Minh's scale logic exactly
            var targetW = 68;
            var targetH = targetW * (imgH / imgW);
            var drawX = px + (90 - targetW) / 2;
            var drawY = py + (40 - targetH) / 2;
            
            ctx.drawImage(lanLoreImg, drawX, drawY, targetW, targetH);
            ctx.restore();
            return;
        }
        
        if (artToDraw === HUNG_ART && hungLoreImg && hungLoreImg.complete && hungLoreImg.naturalWidth > 0) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            var imgW = hungLoreImg.naturalWidth;
            var imgH = hungLoreImg.naturalHeight;
            
            // Match Minh and Lan's scale logic exactly
            var targetW = 68;
            var targetH = targetW * (imgH / imgW);
            var drawX = px + (90 - targetW) / 2;
            var drawY = py + (40 - targetH) / 2;
            
            ctx.drawImage(hungLoreImg, drawX, drawY, targetW, targetH);
            ctx.restore();
            return;
        }
        
        if (artToDraw === FAMILY_ART && familyImg && familyImg.complete && familyImg.naturalWidth > 0) {
            ctx.save();
            var imgW = familyImg.naturalWidth;
            var imgH = familyImg.naturalHeight;
            
            if (scale === 1.0) {
                // Desk photo frame (46x48 clipping box)
                // We'll scale it slightly wider so the empty space at the top is pushed out,
                // and the characters fill the frame nicely.
                var targetW = 55;
                var targetH = targetW * (imgH / imgW);
                // Center horizontally
                var drawX = px + (46 - targetW) / 2;
                // Rest at the bottom
                var bottomY = py + 23;
                var drawY = bottomY - targetH + (targetH * 0.05); // shift down slightly so bottom edge is hidden
                ctx.drawImage(familyImg, drawX, drawY, targetW, targetH);
            } else {
                // CRT Portrait (90x40 clipping box)
                // Scale width to 65 instead of 90 to fit more height (bodies) into the 40px box
                var targetW = 68;
                var targetH = targetW * (imgH / imgW);
                // Center horizontally in the 90px box
                var drawX = px + (90 - targetW) / 2;
                // The image has about 22% empty space at the top. We shift it up to hide it.
                var shiftY = targetH * 0.22;
                ctx.drawImage(familyImg, drawX, py - shiftY, targetW, targetH);
            }
            ctx.restore();
            return;
        }

        ctx.save();
        ctx.translate(px, py);
        for (var r = 0; r < artToDraw.length; r++) {
            var row = artToDraw[r];
            for (var c = 0; c < row.length; c++) {
                var ch = row[c];
                if (ch !== ' ') {
                    ctx.fillStyle = PIXEL_PAL[ch];
                    ctx.fillRect(c * scale, r * scale, scale, scale);
                }
            }
        }
        ctx.restore();
    }

    function drawFamilyPhoto(x, y) {
        // Frame
        ctx.fillStyle = PAL.photoFrame;
        ctx.fillRect(x - 3, y, 58, 60);
        ctx.fillStyle = '#4a3018';
        ctx.fillRect(x + 1, y + 4, 50, 52);

        // Photo background with beautiful gradient
        var bgGrad = ctx.createLinearGradient(x, y, x, y + 60);
        bgGrad.addColorStop(0, '#8ab0d0');
        bgGrad.addColorStop(1, '#e0f0ff');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(x + 3, y + 6, 46, 48);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 3, y + 6, 46, 48);
        ctx.clip();

        // Draw the exact pixel art the user wanted (shifted down to rest on base)
        drawPixelFamily(ctx, x + 3, y + 31, 1.0);

        ctx.restore();

        // Glass sheen reflection
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.moveTo(x + 3, y + 6); ctx.lineTo(x + 17, y + 6); ctx.lineTo(x + 3, y + 30); ctx.fill();
    }

    function drawBox(x, y) {
        // Box body
        ctx.fillStyle = PAL.boxColor;
        ctx.fillRect(x, y, 40, 30);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(x, y, 40, 3);
        // Label
        ctx.fillStyle = '#e0d0b0';
        ctx.fillRect(x + 8, y + 8, 24, 14);
        ctx.fillStyle = PAL.boxColor;
        ctx.font = '7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BỘT', x + 20, y + 19);
    }

    function drawCalendar(x, y) {
        // Calendar body
        ctx.fillStyle = PAL.calColor;
        ctx.fillRect(x, y, 50, 60);

        // Red header
        ctx.fillStyle = '#c04040';
        ctx.fillRect(x, y, 50, 14);
        ctx.fillStyle = '#fff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('THÁNG 3', x + 25, y + 10);

        // Grid
        ctx.fillStyle = '#444';
        ctx.font = '6px monospace';
        ctx.textAlign = 'center';
        for (var r = 0; r < 5; r++) {
            for (var c = 0; c < 7; c++) {
                var d = r * 7 + c + 1;
                if (d <= 31) {
                    ctx.fillStyle = d <= 15 ? '#c04040' : '#444';
                    ctx.fillText('' + d, x + 5 + c * 6.5, y + 24 + r * 9);
                }
            }
        }

        // Circle around a date (deadline marker)
        ctx.strokeStyle = '#ff4040';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + 5 + 3 * 6.5, y + 24 + 3 * 9 - 3, 5, 0, Math.PI * 2);
        ctx.stroke();
    }

    // ── CRT MONITOR ──
    function drawCRTBody() {
        var mx = 440, my = 40, mw = 350, mh = 260;

        // Monitor back
        ctx.fillStyle = '#1a1a24';
        ctx.fillRect(mx - 20, my + 15, mw + 40, mh - 15);

        // Monitor body with heavy dither shading
        ctx.fillStyle = PAL.crtBody;
        ctx.fillRect(mx - 12, my, mw + 24, mh);
        ditherRect(mx - 12, my, mw + 24, 40, 'rgba(255,255,255,0.05)', 2); // Top highlight
        ditherRect(mx - 12, my + mh - 40, mw + 24, 40, '#000', 2); // Bottom shadow

        // Monitor bezel (Distorted look)
        ctx.fillStyle = PAL.crtBorder;
        ctx.beginPath();
        ctx.roundRect(mx - 5, my + 5, mw + 10, mh - 10, 20);
        ctx.fill();

        // Screen area (curved)
        ctx.fillStyle = phase < PHASE.CRT_BOOT ? '#050505' : PAL.crtScreen;
        ctx.beginPath();
        ctx.roundRect(mx + 8, my + 15, mw - 16, mh - 36, 40);
        ctx.fill();

        // Stand
        ctx.fillStyle = '#111';
        ctx.fillRect(mx + mw / 2 - 40, my + mh, 80, 15);
        ctx.fillRect(mx + mw / 2 - 60, my + mh + 15, 120, 10);

        // Power LED (Glowing)
        var ledCol = phase >= PHASE.CRT_BOOT ? '#40ff40' : '#222';
        ctx.fillStyle = ledCol;
        if (phase >= PHASE.CRT_BOOT) {
            ctx.shadowColor = ledCol; ctx.shadowBlur = 10;
        }
        ctx.fillRect(mx + mw - 30, my + mh - 15, 6, 4);
        ctx.shadowBlur = 0;
    }

    function drawCRTScreen() {
        var sx = 448, sy = 52, sw = 330, sh = 230; // Slightly larger for barrel effect

        // 1. Barrel Distorted clipping & base
        ctx.save();
        ctx.beginPath();
        // Custom curved rectangle for barrel distortion feel
        ctx.roundRect(sx, sy, sw, sh, 40);
        ctx.clip();

        ctx.fillStyle = PAL.crtScreen;
        ctx.fillRect(sx, sy, sw, sh);

        // Subtler scanlines inside clipping
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        for (var sl = 0; sl < sh; sl += 2) {
            ctx.fillRect(sx, sy + sl + scanlineOffset, sw, 1);
        }

        var textX = sx + 25;
        var textY = sy + 30;

        // 2. Glass reflection (Dynamic)
        var gloss = 0.04 + Math.sin(totalTime * 0.002) * 0.02;
        ctx.fillStyle = 'rgba(255,255,255,' + gloss + ')';
        ctx.beginPath();
        ctx.moveTo(sx, sy); ctx.lineTo(sx + sw * 0.6, sy); ctx.lineTo(sx, sy + sh * 0.8); ctx.fill();

        // 3. Content
        if (phase >= PHASE.LORE_HEADER) {
            ctx.fillStyle = PAL.crtHeader;
            ctx.font = 'bold 18px "VT323", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('LORE', sx + sw / 2, textY);
            ctx.fillStyle = 'rgba(128,168,128,0.3)';
            ctx.fillRect(sx + sw / 2 - 35, textY + 6, 70, 2);
        }

        if (phase >= PHASE.CHAPTER_TITLE) {
            ctx.fillStyle = PAL.crtTextBright;
            ctx.font = '14px "VT323", monospace';
            var chapText = (storyData ? storyData.chapter : 'Chương 1').replace(/·/g, '-').replace(/<[^>]+>/g, '');
            ctx.fillText(chapText, sx + sw / 2, textY + 18);
        }

        if (phase >= PHASE.PORTRAIT) {
            drawCRTPortrait(sx + sw / 2 - 45, textY + 28, 90, 40, portraitScanY);
        }

        if (phase >= PHASE.STORY_TEXT) {
            var plainText = getPlainStoryText();
            var visibleText = plainText.substring(0, Math.min(typedChars, plainText.length));
            ctx.fillStyle = PAL.crtText;
            ctx.font = '11px "VT323", monospace'; // Reduced from 12px to 11px
            ctx.textAlign = 'left';
            var lineH = 12.5; // Reduced from 13.5 to 12.5
            wrapText(ctx, visibleText, textX, textY + 74, sw - 55, lineH); // Moved up slightly inside box

            // Cursor
            if (typedChars < plainText.length && Math.sin(totalTime * 0.01) > 0) {
                var cp = getCursorPosition(ctx, visibleText, textX, textY + 74, sw - 55, lineH);
                ctx.fillStyle = PAL.crtTextBright;
                ctx.fillRect(cp.x, cp.y - 10, 6, 12);
            }
        }

        if (phase >= PHASE.BUTTON_APPEAR) {
            drawStartButton(sx + sw / 2 - 55, sy + sh - 28, 110, 24);
        }

        // Inner vignette
        var vig = ctx.createRadialGradient(sx + sw / 2, sy + sh / 2, sw / 4, sx + sw / 2, sy + sh / 2, sw / 1.2);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(0,0,0,0.5)');
        ctx.fillStyle = vig;
        ctx.fillRect(sx, sy, sw, sh);

        ctx.restore();
    }

    function drawCRTPortrait(x, y, w, h, scanProgress) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h * scanProgress);
        ctx.clip();

        // Digital Portrait background removed to ensure transparency for all characters

        // Subtler digital dots for high-tech CRT vibe
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        for (var px = 0; px < w; px += 4) {
            for (var py = 0; py < h; py += 4) {
                ctx.fillRect(x + px, y + py, 1, 1);
            }
        }

        // Draw super high-res pixel portrait bodies tightly framing the CRT
        drawPixelFamily(ctx, x, y + 3, 2.0);

        // Digital scan line effect (Glowing intense laser)
        if (scanProgress < 1) {
            ctx.fillStyle = 'rgba(120,255,180,0.8)';
            ctx.fillRect(x, y + h * scanProgress - 2, w, 2);
            ctx.shadowColor = '#80ffb0';
            ctx.shadowBlur = 10;
            ctx.fillRect(x, y + h * scanProgress - 1, w, 1);
        }

        ctx.restore();
    }

    function drawStartButton(x, y, w, h) {
        // Pixel shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(x + 4, y + 4, w, h);

        // Core
        ctx.fillStyle = btnHover ? '#3d618c' : PAL.btnBg;
        ctx.fillRect(x, y, w, h);

        // Highlights (Pixel border)
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y, 2, h);

        ctx.strokeStyle = PAL.btnBorder;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        // Text
        ctx.fillStyle = PAL.btnText;
        ctx.font = 'bold 16px "VT323", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var btnText = (storyData && CFG.lang === 'en') ? '▶ START' : '▶ BẮT ĐẦU';

        // Inner glow on hover
        if (btnHover) {
            ctx.shadowColor = PAL.btnText; ctx.shadowBlur = 10;
        }
        ctx.fillText(btnText, x + w / 2, y + h / 2);
        ctx.shadowBlur = 0;
    }

    // ── AMBIENT ──
    function drawAmbientGlow() {
        // Lamp warm glow on wall
        var lGrad = ctx.createRadialGradient(280, 220, 10, 280, 220, 200);
        lGrad.addColorStop(0, 'rgba(255,180,80,0.15)');
        lGrad.addColorStop(1, 'rgba(255,160,60,0)');
        ctx.fillStyle = lGrad;
        ctx.fillRect(80, 20, 400, 400);

        // CRT glow on desk
        if (crtAlpha > 0) {
            var cGrad = ctx.createRadialGradient(600, 150, 30, 600, 250, 250);
            cGrad.addColorStop(0, 'rgba(160,200,160,' + (0.08 * crtAlpha) + ')');
            cGrad.addColorStop(1, 'rgba(100,150,100,0)');
            ctx.fillStyle = cGrad;
            ctx.fillRect(350, 0, 500, 400);
        }
    }

    function drawScanlines(sw, sh) {
        ctx.fillStyle = 'rgba(0,0,0,1)';
        for (var s = 0; s < sh; s += 4) {
            ctx.fillRect(0, s + (scanlineOffset | 0), sw, 1);
        }
    }

    // ── TEXT UTILS ──
    function getPlainStoryText() {
        if (!storyData) return 'Minh, 38 tuổi, nhân viên văn phòng bình thường. Bé Linh, con gái anh — bé Linh, 7 tuổi — vừa được chẩn đoán cần phẫu thuật tim bẩm sinh. Bác sĩ nói: không thể chờ. Chi phí ban đầu: 50.000.000đ. Bảo hiểm không đủ. Người thân không có. Thời hạn: 32 ngày.';
        var text = storyData.text || '';
        // Strip HTML tags and convert \n to spaces
        text = text.replace(/\\n/g, ' ').replace(/<[^>]+>/g, '');
        // Add goal info
        if (goalData) {
            text += ' Mục tiêu: Kiếm đủ ' + fmt(goalData.goal) + ' trong ' + goalData.days + ' ngày (Độ khó: ' + getDiffLabel() + ').';
        }
        return text;
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var ly = y;

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                context.fillText(line.trim(), x, ly);
                line = words[n] + ' ';
                ly += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line.trim(), x, ly);
    }

    function getCursorPosition(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var ly = y;

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                line = words[n] + ' ';
                ly += lineHeight;
            } else {
                line = testLine;
            }
        }
        var lw = context.measureText(line.trim()).width;
        return { x: x + lw, y: ly };
    }

    function ditherRect(x, y, w, h, col, density) {
        ctx.fillStyle = col;
        for (var px = 0; px < w; px += 2) {
            for (var py = 0; py < h; py += 2) {
                // simple dither pattern
                if ((px + py) % (density || 4) === 0) {
                    ctx.fillRect(x + px, y + py, 1, 1);
                }
            }
        }
    }

    // ── INPUT ──
    function onClick(e) {
        if (!isActive) return;

        var rect = canvas.getBoundingClientRect();
        var mx = (e.clientX - rect.left) / rect.width * W;
        var my = (e.clientY - rect.top) / rect.height * H;

        // During dark phase, skip to room reveal
        if (phase === PHASE.DARK) {
            phase = PHASE.ROOM_REVEAL;
            phaseTime = 0;
            return;
        }

        // Skip button logic
        if (phase > PHASE.DARK && phase < PHASE.IDLE) {
            var skipX = W - 110, skipY = H - 55, skipW = 90, skipH = 34;
            if (mx >= skipX && mx <= skipX + skipW && my >= skipY && my <= skipY + skipH) {
                phase = PHASE.BUTTON_APPEAR;
                phaseTime = 0;
                roomAlpha = 1;
                crtAlpha = 1;
                portraitScanY = 1;
                typedChars = 9999;
                skipReady = true;
                return;
            }
        }

        // Check button click
        if (phase >= PHASE.BUTTON_APPEAR) {
            // Convert to scene coordinates
            var scaleX = W / 960;
            var scaleY = H / 540;
            var scale = Math.min(scaleX, scaleY);
            var offsetX = (W - 960 * scale) / 2;
            var offsetY = (H - 540 * scale) / 2;

            var sceneMx = (mx - offsetX) / scale;
            var sceneMy = (my - offsetY) / scale;

            // Button bounds (matching drawStartButton: sx + sw/2 - 55, sy + sh - 28, 110, 24)
            var bx = 448 + 330 / 2 - 55;
            var by = 52 + 230 - 28;
            var bw = 110, bh = 24;

            if (sceneMx >= bx && sceneMx <= bx + bw && sceneMy >= by && sceneMy <= by + bh) {
                if (onStartCallback) {
                    destroy();
                    onStartCallback();
                }
            }
        }
    }

    function onMouseMove(e) {
        if (!isActive || phase < PHASE.BUTTON_APPEAR) {
            btnHover = false;
            return;
        }

        var rect = canvas.getBoundingClientRect();
        var mx = (e.clientX - rect.left) / rect.width * W;
        var my = (e.clientY - rect.top) / rect.height * H;

        var scaleX = W / 960;
        var scaleY = H / 540;
        var scale = Math.min(scaleX, scaleY);
        var offsetX = (W - 960 * scale) / 2;
        var offsetY = (H - 540 * scale) / 2;

        var sceneMx = (mx - offsetX) / scale;
        var sceneMy = (my - offsetY) / scale;

        var bx = 448 + 330 / 2 - 55;
        var by = 52 + 230 - 28;
        var bw = 110, bh = 24;

        btnHover = (sceneMx >= bx && sceneMx <= bx + bw && sceneMy >= by && sceneMy <= by + bh);

        // Skip button
        skipBtnHover = false;
        if (phase > PHASE.DARK && phase < PHASE.IDLE) {
            var skipX = W - 110, skipY = H - 55, skipW = 90, skipH = 34;
            skipBtnHover = (mx >= skipX && mx <= skipX + skipW && my >= skipY && my <= skipY + skipH);
        }

        canvas.style.cursor = (btnHover || skipBtnHover) ? 'pointer' : 'default';
    }

    function onKey(e) {
        if (!isActive) return;

        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            // Skip to idle / button phase
            if (phase < PHASE.BUTTON_APPEAR) {
                phase = PHASE.BUTTON_APPEAR;
                phaseTime = 0;
                roomAlpha = 1;
                crtAlpha = 1;
                portraitScanY = 1;
                typedChars = 9999;
                skipReady = true;
            } else if (phase >= PHASE.BUTTON_APPEAR) {
                // Start game
                if (onStartCallback) {
                    destroy();
                    onStartCallback();
                }
            }
        }

        if (e.key === 'Escape') {
            destroy();
            if (typeof backToMenu === 'function') backToMenu();
        }
    }

    // ── PUBLIC API ──
    return {
        init: init,
        destroy: destroy,
        isActive: function () { return isActive; }
    };
})();
