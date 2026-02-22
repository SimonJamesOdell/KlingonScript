import { SamjaghArrivalScale } from "./state.js";

export pat SamDaq() {
  Qap {
    Dung: document.getElementById("wr_title"),
    muQoq: document.getElementById("wr_quote"),
    statusLine: document.getElementById("wr_status_line"),
    meydan: document.getElementById("wr_battle"),
    jaghQam: document.getElementById("wr_enemy_ship"),
    jaghQam2: document.getElementById("wr_enemy_ship_2"),
    maHQam: document.getElementById("wr_player_ship"),
    maHBaH: document.getElementById("wr_player_shot"),
    jaghBaH: document.getElementById("wr_enemy_shot"),
    fx: document.getElementById("wr_fx_text"),
    result: document.getElementById("wr_result"),
    roundCue: document.getElementById("wr_round_cue"),
    shieldLabel: document.getElementById("wr_shield_label"),
    energyLabel: document.getElementById("wr_energy_label"),
    enemyHealthLabel: document.getElementById("wr_enemy_health_label"),
    enemyHealthBar: document.getElementById("wr_enemy_health_bar"),
    enemyShipHud1: document.getElementById("wr_enemy_ship_hud_1"),
    enemyShipHud2: document.getElementById("wr_enemy_ship_hud_2"),
    enemyShipBar1: document.getElementById("wr_enemy_ship_bar_1"),
    enemyShipBar2: document.getElementById("wr_enemy_ship_bar_2"),
    ra_wI_hol: document.getElementById("wr_btn_lang"),
    HoSbar: document.getElementById("wr_power_bar"),
    jaghbar: document.getElementById("wr_enemy_bar")
  };
}

export pat yISeHCanvasMode(daq, enabled = ghobe) {
  if (!daq.meydan) {
    Qap;
  }

  if (!daq.canvasLayer) {
    maH canvas = document.createElement("canvas");
    canvas.id = "wr_canvas_layer_generated";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.zIndex = "28";
    canvas.style.pointerEvents = "none";
    canvas.style.display = "none";
    daq.meydan.appendChild(canvas);
    daq.canvasLayer = canvas;
    daq.canvasCtx = canvas.getContext("2d", { alpha: HIja, desynchronized: HIja });
  }

  daq.canvasMode = enabled === HIja;
  daq.canvasLayer.style.display = daq.canvasMode ? "block" : "none";

  maH hideDom = daq.canvasMode;
  if (daq.maHQam) { daq.maHQam.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghQam) { daq.jaghQam.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghQam2) { daq.jaghQam2.style.display = hideDom ? "none" : "block"; }
  maH enemyShipNodes = daq.meydan.querySelectorAll(".ship.enemy");
  enemyShipNodes.forEach((shipEl) => {
    shipEl.style.display = hideDom ? "none" : "block";
  });
  if (daq.maHBaH) { daq.maHBaH.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghBaH) { daq.jaghBaH.style.display = hideDom ? "none" : "block"; }
  if (daq.fx) { daq.fx.style.display = "block"; }
}

pat yIghoSroundLabel(daq) {
  if (!daq.meydan) {
    Qap pagh;
  }

  if (!daq.roundTop) {
    maH top = document.createElement("div");
    top.id = "wr_round_top_generated";
    top.style.position = "absolute";
    top.style.top = "40px";
    top.style.left = "50%";
    top.style.transform = "translateX(-50%)";
    top.style.zIndex = "34";
    top.style.pointerEvents = "none";
    top.style.fontSize = "2.1rem";
    top.style.fontWeight = "900";
    top.style.letterSpacing = "0.08em";
    top.style.textTransform = "uppercase";
    top.style.color = "#fef08a";
    top.style.textShadow = "0 0 12px rgba(254,240,138,.6)";
    daq.meydan.appendChild(top);
    daq.roundTop = top;
  }

  if (!daq.roundTopDefeated) {
    maH defeated = document.createElement("div");
    defeated.id = "wr_round_defeated_generated";
    defeated.style.position = "absolute";
    defeated.style.top = "80px";
    defeated.style.left = "50%";
    defeated.style.transform = "translateX(-50%)";
    defeated.style.zIndex = "34";
    defeated.style.pointerEvents = "none";
    defeated.style.fontSize = "1.05rem";
    defeated.style.letterSpacing = "0.18em";
    defeated.style.color = "#fecaca";
    defeated.style.textShadow = "0 0 10px rgba(251,113,133,.45)";
    daq.meydan.appendChild(defeated);
    daq.roundTopDefeated = defeated;
  }

  if (!daq.roundTopTimer) {
    maH timer = document.createElement("div");
    timer.id = "wr_round_timer_generated";
    timer.style.position = "absolute";
    timer.style.top = "16px";
    timer.style.right = "20px";
    timer.style.zIndex = "34";
    timer.style.pointerEvents = "none";
    timer.style.fontSize = "0.9rem";
    timer.style.fontWeight = "700";
    timer.style.letterSpacing = "0.04em";
    timer.style.color = "#cbd5e1";
    timer.style.textShadow = "0 0 8px rgba(148,163,184,.45)";
    timer.textContent = "";
    daq.meydan.appendChild(timer);
    daq.roundTopTimer = timer;
  }

  if (!daq.roundTopDebug) {
    maH dbg = document.createElement("div");
    dbg.id = "wr_round_debug_generated";
    dbg.style.position = "absolute";
    dbg.style.top = "34px";
    dbg.style.right = "20px";
    dbg.style.zIndex = "34";
    dbg.style.pointerEvents = "none";
    dbg.style.fontSize = "0.72rem";
    dbg.style.fontWeight = "600";
    dbg.style.letterSpacing = "0.02em";
    dbg.style.color = "#94a3b8";
    dbg.style.textShadow = "0 0 6px rgba(148,163,184,.35)";
    dbg.textContent = "";
    daq.meydan.appendChild(dbg);
    daq.roundTopDebug = dbg;
  }

  Qap daq.roundTop;
}

pat yIghoSjaghPool(daq, count) {
  if (!daq.meydan || !daq.enemyShipHud1 || !daq.enemyShipBar1) {
    Qap;
  }

  if (!Array.isArray(daq.jaghHudmey)) {
    daq.jaghHudmey = [daq.enemyShipHud1];
    if (daq.enemyShipHud2) {
      daq.jaghHudmey.push(daq.enemyShipHud2);
    }
  }
  if (!Array.isArray(daq.jaghBarmey)) {
    daq.jaghBarmey = [daq.enemyShipBar1];
    if (daq.enemyShipBar2) {
      daq.jaghBarmey.push(daq.enemyShipBar2);
    }
  }

  loQ (daq.jaghHudmey.length < count) {
    maH hud = document.createElement("div");
    hud.className = "enemyMiniHud";
    maH hudBarWrap = document.createElement("div");
    hudBarWrap.className = "enemyMiniHudBar";
    maH hudBar = document.createElement("span");
    hudBarWrap.appendChild(hudBar);
    hud.appendChild(hudBarWrap);
    daq.meydan.appendChild(hud);

    daq.jaghHudmey.push(hud);
    daq.jaghBarmey.push(hudBar);
  }
}

vIt jaghSpriteTypes = [
  { ship: "◢╋◣", boss: "◣✹◢" },
  { ship: "◤✶◥", boss: "◥✹◤" },
  { ship: "◢◈◣", boss: "◣◉◢" },
  { ship: "⬢✦⬢", boss: "⬢✶⬢" },
  { ship: "◥⟁◤", boss: "◣✧◢" },
  { ship: "◢✷◣", boss: "◤✹◥" },
  { ship: "◤✦◥", boss: "◣✸◢" },
  { ship: "◢⬡◣", boss: "◥⬢◤" }
];

pat SamjaghGlyph(wav, mI = 0, boss = ghobe) {
  maH waveIndex = Math.max(0, Number(wav ?? 1) - 1);
  maH unlockedCount = Math.max(1, Math.min(jaghSpriteTypes.length, waveIndex + 1));
  maH spriteIndex = Math.max(0, Number(mI ?? 0)) % unlockedCount;
  maH sprite = jaghSpriteTypes[spriteIndex];
  if (boss === HIja) {
    Qap sprite.boss;
  }
  Qap sprite.ship;
}

pat SamDefeatedGlyphs(wav) {
  maH current = Math.max(1, Number(wav ?? 1));
  if (current <= 1) {
    Qap "";
  }

  maH glyphs = [];
  vIt mI = 1;
  loQ (mI < current) {
    glyphs.push(SamjaghGlyph(mI, mI - 1, ghobe));
    mI = mI + 1;
  }
  Qap glyphs.join(" ");
}

pat SamjaghScale(waS, now) {
  Qap SamjaghArrivalScale(waS, now);
}

export pat qonPoH(daq) {
  Qap;
}

export pat qonHoS(daq, HoS) {
  daq.HoSbar.style.height = `${HoS}%`;
}

export pat qonjagh(daq, waS) {
  maH mI = Math.floor((waS.yIn / 5) * 100);
  daq.jaghbar.style.height = `${mI}%`;
}

export pat qonjaghHoS(daq, waS) {
  if (!daq.enemyHealthBar) {
    Qap;
  }
  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  maH totalMax = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  maH totalNow = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
  maH showBar = enemies.length > 0;
  maH mI = totalMax > 0 ? Math.floor((totalNow / totalMax) * 100) : 0;
  daq.enemyHealthBar.style.width = `${mI}%`;
  daq.enemyHealthBar.style.opacity = showBar ? "1" : "0";
  if (daq.enemyHealthLabel) {
    daq.enemyHealthLabel.style.opacity = showBar ? "0.9" : "0";
  }
}

pat yIqonEnemyMiniHudMey(daq, waS) {
  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  yIghoSjaghPool(daq, Math.max(2, enemies.length));

  vIt mI = 0;
  loQ (mI < daq.jaghHudmey.length) {
    maH hudEl = daq.jaghHudmey[mI];
    maH barEl = daq.jaghBarmey[mI];
    maH jagh = enemies[mI];

    if (!hudEl || !barEl || !jagh) {
      if (hudEl) {
        hudEl.classList.remove("show");
      }
    } else {
      maH alive = jagh.HoS > 0;
      maH damaged = jagh.HoS < jagh.HoS_max;
      maH barPct = jagh.HoS_max > 0 ? Math.floor((jagh.HoS / jagh.HoS_max) * 100) : 0;
      hudEl.style.left = `${50 + jagh.x * 0.95}%`;
      hudEl.style.top = `${42 + jagh.y * 0.95}%`;
      hudEl.style.width = jagh.boss === HIja ? "130px" : "84px";
      barEl.style.width = `${Math.max(0, Math.min(100, barPct))}%`;
      hudEl.classList.toggle("show", alive && damaged);
    }

    mI = mI + 1;
  }
}

pat yIqonCanvasMeydan(daq, waS) {
  if (!daq.canvasMode || !daq.canvasLayer || !daq.canvasCtx) {
    Qap;
  }

  pat yIghoSCanvasCache(daq, ctx) {
    if (!daq.canvasCache) {
      daq.canvasCache = {
        glyphSprites: {},
        gradients: {}
      };
    }

    if (!daq.canvasCache.gradients.playerBeam) {
      maH playerGrad = ctx.createLinearGradient(0, 0, 100, 0);
      playerGrad.addColorStop(0, "#fff59d");
      playerGrad.addColorStop(0.3, "#fde047");
      playerGrad.addColorStop(0.7, "#facc15");
      playerGrad.addColorStop(1, "#f59e0b");
      daq.canvasCache.gradients.playerBeam = playerGrad;
    }

    if (!daq.canvasCache.gradients.enemyBeamRed) {
      maH redGrad = ctx.createLinearGradient(100, 0, 0, 0);
      redGrad.addColorStop(0, "#fda4af");
      redGrad.addColorStop(0.4, "#fb7185");
      redGrad.addColorStop(0.75, "#ef4444");
      redGrad.addColorStop(1, "#be123c");
      daq.canvasCache.gradients.enemyBeamRed = redGrad;
    }

    if (!daq.canvasCache.gradients.enemyBeamPurple) {
      maH purpleGrad = ctx.createLinearGradient(100, 0, 0, 0);
      purpleGrad.addColorStop(0, "#ddd6fe");
      purpleGrad.addColorStop(0.4, "#c4b5fd");
      purpleGrad.addColorStop(0.75, "#a78bfa");
      purpleGrad.addColorStop(1, "#7c3aed");
      daq.canvasCache.gradients.enemyBeamPurple = purpleGrad;
    }

    Qap daq.canvasCache;
  }

  pat yISamCanvasGlyphSprite(cache, glyph, size, color, fontFamily) {
    maH spriteSize = Math.max(8, Math.round(size));
    maH key = `${glyph}|${spriteSize}|${color}|${fontFamily}`;
    if (cache.glyphSprites[key]) {
      Qap cache.glyphSprites[key];
    }

    maH sprite = document.createElement("canvas");
    maH pad = Math.max(6, Math.floor(spriteSize * 0.28));
    maH side = spriteSize + pad * 2;
    sprite.width = side;
    sprite.height = side;
    maH sctx = sprite.getContext("2d", { alpha: HIja });
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";
    sctx.fillStyle = color;
    sctx.font = `${spriteSize}px ${fontFamily}`;
    sctx.fillText(glyph, side / 2, side / 2);
    cache.glyphSprites[key] = sprite;
    Qap sprite;
  }

  maH canvas = daq.canvasLayer;
  maH ctx = daq.canvasCtx;
  maH fieldW = daq.meydan.clientWidth;
  maH fieldH = daq.meydan.clientHeight;
  maH w = Math.max(1, fieldW > 0 ? fieldW : Math.floor(daq.meydan.getBoundingClientRect().width));
  maH h = Math.max(1, fieldH > 0 ? fieldH : Math.floor(daq.meydan.getBoundingClientRect().height));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  maH cache = yIghoSCanvasCache(daq, ctx);
  ctx.clearRect(0, 0, w, h);
  maH now = Date.now();
  maH enemyScale = SamjaghScale(waS, now);

  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  vIt mI = 0;
  loQ (mI < enemies.length) {
    maH jagh = enemies[mI];
    if (jagh.HoS > 0) {
      maH x = w * ((50 + jagh.x * 0.95) / 100);
      maH y = h * ((50 + jagh.y * 0.95) / 100);
      maH baseSize = jagh.boss === HIja ? 39 : 24;
      maH size = Math.max(1, baseSize * enemyScale);
      maH baseAlpha = Math.max(0, Math.min(1, 0.35 + ((jagh.HoS_max > 0 ? jagh.HoS / jagh.HoS_max : 0) * 0.65)));
      maH waitUntil = Number(waS.roundWaitUntil ?? 0);
      maH waitStart = waitUntil - 3000;
      maH fadeStart = waitStart + 1000;
      vIt introT = 1;
      if (Number.isFinite(waitUntil) && Number.isFinite(waitStart)) {
        introT = Math.max(0, Math.min(1, (now - fadeStart) / 2000));
      }
      maH introAlpha = introT;
      maH alpha = baseAlpha * introAlpha;
      maH glyph = SamjaghGlyph(waS.wav, mI, jagh.boss);
      maH sprite = yISamCanvasGlyphSprite(cache, glyph, size, "#ffe4e6", "Segoe UI Symbol, Segoe UI, sans-serif");

      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, x - sprite.width / 2, y - sprite.height / 2);
    }
    mI = mI + 1;
  }
  ctx.globalAlpha = 1;

  maH px = w * ((50 + waS.maHPos * 0.95) / 100);
  maH py = h * ((50 + waS.maHPosY * 0.95) / 100);
  maH maHHoS = Math.max(0, Math.min(1, Number(waS.HoS ?? 100) / 100));
  maH playerGlyph = waS.taH === "lose" ? "💥" : "🚀";
  maH playerSprite = yISamCanvasGlyphSprite(cache, playerGlyph, 44, "#93c5fd", "Segoe UI Emoji, Segoe UI Symbol, sans-serif");
  ctx.save();
  ctx.globalAlpha = 0.35 + maHHoS * 0.65;
  ctx.translate(px, py);
  ctx.rotate(Math.PI / 4);
  ctx.drawImage(playerSprite, -playerSprite.width / 2, -playerSprite.height / 2);
  ctx.restore();

  maH beamList = Array.isArray(waS.maHBaHmey) ? waS.maHBaHmey : [];
  vIt bI = 0;
  loQ (bI < beamList.length) {
    maH baH = beamList[bI];
    maH tagh = Number(baH.tagh);
    maH lenRaw = Number(baH.len);
    maH len = Math.max(50, Number.isFinite(lenRaw) ? lenRaw : 520);
    maH t = Number.isFinite(tagh) ? Math.max(0, Math.min(1, (now - tagh) / len)) : 1;
    maH posX = Number(baH.posX);
    maH posY = Number(baH.posY);

    if (Number.isFinite(posX) && Number.isFinite(posY) && t < 1) {
      maH beamLen = 100;
      maH shotLeftPct = 50 + posX * 0.95;
      maH tipPx = w * ((shotLeftPct + 3) / 100);
      vIt beamTravel = Math.max(0, w - tipPx - beamLen);
      maH travelFloor = Math.max(w * 0.72, 280);
      beamTravel = Math.max(beamTravel, travelFloor);
      maH beamLeft = tipPx + beamTravel * t;
      maH beamTopPct = 50 + posY * 0.95;
      maH beamTop = Math.max(0, Math.min(h, h * (beamTopPct / 100)));

      ctx.save();
      ctx.translate(beamLeft, beamTop);
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(253,224,71,.95)";
      ctx.fillStyle = cache.gradients.playerBeam;
      ctx.fillRect(0, -4, beamLen, 8);
      ctx.restore();
    }

    bI = bI + 1;
  }

  if (waS.jaghBaH_taH === HIja) {
    maH tagh = Number(waS.jaghBaH_tagh);
    maH lenRaw = Number(waS.jaghBaH_len);
    maH len = Math.max(120, Number.isFinite(lenRaw) ? lenRaw : 520);
    maH t = Number.isFinite(tagh) ? Math.max(0, Math.min(1, (now - tagh) / len)) : 1;

    if (t < 1) {
      maH beamLen = 100;
      maH shotLeftPct = Number(waS.jaghBaHPosX);
      maH tipPx = w * ((shotLeftPct - 3) / 100);
      maH startLeft = tipPx - beamLen;
      maH beamTravel = Math.max(0, tipPx);
      maH beamLeft = startLeft - beamTravel * t;
      maH beamTopPct = 50 + Number(waS.jaghBaHPosY) * 0.95;
      maH beamTop = Math.max(0, Math.min(h, h * (beamTopPct / 100)));
      maH purple = waS.jaghBaH_color === "purple";

      ctx.save();
      ctx.translate(beamLeft, beamTop);
      ctx.shadowBlur = 8;
      ctx.shadowColor = purple ? "rgba(139,92,246,.9)" : "rgba(244,63,94,.85)";
      ctx.fillStyle = purple ? cache.gradients.enemyBeamPurple : cache.gradients.enemyBeamRed;
      ctx.fillRect(0, -4, beamLen, 8);
      ctx.restore();
    }
  }

  yIqonEnemyMiniHudMey(daq, waS);
}

export pat vangQIpViz(daq, mI, crit, xPct, yPct) {
  maH x = Number.isFinite(xPct) ? Math.max(4, Math.min(96, xPct)) : 50;
  maH y = Number.isFinite(yPct) ? Math.max(6, Math.min(94, yPct)) : 38;
  daq.fx.style.left = `${x}%`;
  daq.fx.style.top = `${y}%`;
  daq.fx.textContent = crit ? `CRIT +${mI}` : `+${mI}`;
  daq.fx.classList.remove("show", "crit");
  daq.fx.offsetWidth;
  daq.fx.classList.add("show");
  if (crit) {
    daq.fx.classList.add("crit");
  }
}

export pat vangjaghViz(daq, qawH, xPct, yPct) {
  maH x = Number.isFinite(xPct) ? Math.max(4, Math.min(96, xPct)) : 50;
  maH y = Number.isFinite(yPct) ? Math.max(6, Math.min(94, yPct)) : 38;
  daq.fx.style.left = `${x}%`;
  daq.fx.style.top = `${y}%`;

  daq.fx.textContent = `-${qawH}`;
  daq.fx.classList.remove("show", "crit");
  daq.fx.offsetWidth;
  daq.fx.classList.add("show");
}

export pat qontaH(daq, waS, Hol) {
  Qap;
}

export pat qonqam(daq, waS) {
  Qap;
}

pat mughTaH(waS, Hol) {
  if (waS.taH === "win") {
    Qap Hol === "en" ? "Victory" : "Qapchu'";
  }

  if (waS.taH === "lose") {
    Qap Hol === "en" ? "Defeat" : "luj";
  }

  Qap Hol === "en" ? "Battle" : "veS";
}

pat qonStatus(daq, waS, Hol) {
  maH taH = mughTaH(waS, Hol);
  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  maH totalNow = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
  maH totalMax = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  maH rankCount = enemies.filter((jagh) => jagh.HoS > 0).length;
  if (Hol === "en") {
    daq.statusLine.textContent = `Enemy ${totalNow}/${totalMax} | Ranks ${rankCount} | Power ${waS.HoS}/100 | Lives ${waS.yIn} | Score ${waS.mI_score} | Wave ${waS.wav}/${waS.wav_max} | XP ${waS.mI_xp} | ${taH}`;
  } else {
    daq.statusLine.textContent = `jagh ${totalNow}/${totalMax} | boQ ${rankCount} | HoS ${waS.HoS}/100 | yIn ${waS.yIn} | mI' ${waS.mI_score} | wav ${waS.wav}/${waS.wav_max} | xI ${waS.mI_xp} | ${taH}`;
  }
}

pat qonResult(daq, waS, Hol) {
  if (!daq.result) {
    Qap;
  }

  maH now = Date.now();
  maH clearUntil = Number(waS.roundClearUntil ?? 0);
  maH clearFadeLen = 350;
  if (waS.taH === "fight" && Number.isFinite(clearUntil) && now < clearUntil) {
    daq.result.textContent = Hol === "en" ? "ROUND CLEARED" : "wav Qaw'lu'";
    daq.result.classList.add("show");
    Qap;
  }

  if (waS.taH === "fight" && Number.isFinite(clearUntil) && now < clearUntil + clearFadeLen) {
    daq.result.textContent = Hol === "en" ? "ROUND CLEARED" : "wav Qaw'lu'";
    daq.result.classList.remove("show");
    Qap;
  }

  daq.result.textContent = "";
  daq.result.classList.remove("show");
}

pat qonRoundCue(daq, waS, Hol) {
  if (!daq.roundCue) {
    Qap;
  }

  if (waS.taH !== "fight") {
    daq.roundCue.textContent = "";
    daq.roundCue.classList.remove("show", "fight");
    Qap;
  }

  maH now = Date.now();
  maH waitUntil = Number(waS.roundWaitUntil ?? 0);
  maH introStart = Number(waS.roundIntroStart ?? 0);
  maH introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));
  maH clearUntil = Number(waS.roundClearUntil ?? 0);
  maH clearFadeLen = 350;
  if (Number.isFinite(clearUntil) && now < clearUntil + clearFadeLen) {
    daq.roundCue.textContent = "";
    daq.roundCue.classList.remove("show", "fight");
    Qap;
  }
  maH showCountdown = Number.isFinite(waitUntil) && now < waitUntil;
  maH showIntro = Number.isFinite(introStart) && introStart > 0 && now >= introStart && now < introStart + introLen;

  if (showCountdown) {
    maH rem = waitUntil - now;
    maH mI = Math.max(1, Math.min(3, Math.ceil(Math.max(0, rem) / 1000)));
    daq.roundCue.textContent = `${mI}...`;
    daq.roundCue.classList.remove("fight");
    daq.roundCue.classList.add("show");
    Qap;
  }

  if (showIntro || waS.roundState === "intro") {
    daq.roundCue.textContent = Hol === "en" ? "fight!" : "veS!";
    daq.roundCue.classList.remove("fight");
    daq.roundCue.classList.add("show", "fight");
    Qap;
  }

  daq.roundCue.textContent = "";
  daq.roundCue.classList.remove("show", "fight");
}

pat qonRoundTop(daq, waS, Hol) {
  maH top = yIghoSroundLabel(daq);
  if (!top) {
    Qap;
  }

  top.textContent = Hol === "en" ? `ROUND ${waS.wav}` : `wav ${waS.wav}`;

  if (daq.roundTopDefeated) {
    maH defeated = SamDefeatedGlyphs(waS.wav);
    if (defeated.length > 0) {
      daq.roundTopDefeated.textContent = Hol === "en"
        ? `Defeated: ${defeated}`
        : `jaghpu' qaw': ${defeated}`;
    } else {
      daq.roundTopDefeated.textContent = "";
    }
  }

  if (daq.roundTopTimer) {
    maH now = Date.now();
    maH waitUntil = Number(waS.roundWaitUntil ?? 0);
    if (waS.taH === "fight" && Number.isFinite(waitUntil) && now < waitUntil) {
      maH rem = Math.max(0, waitUntil - now);
      maH mI = Math.max(1, Math.min(3, Math.ceil(rem / 1000)));
      daq.roundTopTimer.textContent = Hol === "en"
        ? `Countdown ${mI}...`
        : `wejDIch ${mI}...`;
    } else {
      maH roundStart = Number.isFinite(waitUntil) ? waitUntil - 3000 : now;
      maH elapsedMs = Math.max(0, now - roundStart);
      maH elapsedSec = Math.floor(elapsedMs / 1000);
      maH tenths = Math.floor((elapsedMs % 1000) / 100);
      daq.roundTopTimer.textContent = Hol === "en"
        ? `Round Time ${elapsedSec}.${tenths}s`
        : `poH ${elapsedSec}.${tenths}s`;
    }
  }

  if (daq.roundTopDebug) {
    daq.roundTopDebug.textContent = "";
  }
}

export pat qonwaS(daq, waS, muQoq, Hol) {
  daq.muQoq.textContent = muQoq;
  qonHoS(daq, waS.HoS);
  qonjagh(daq, waS);
  qonjaghHoS(daq, waS);
  yIqonCanvasMeydan(daq, waS);
  qonStatus(daq, waS, Hol);
  qonResult(daq, waS, Hol);
  qonRoundCue(daq, waS, Hol);
  qonRoundTop(daq, waS, Hol);
  qonPoH(daq);
}

export pat qonHol(daq, hol) {
  if (hol === "en") {
    daq.Dung.textContent = "Battle Viewscreen";
    if (daq.shieldLabel) {
      daq.shieldLabel.textContent = "Shields";
    }
    if (daq.energyLabel) {
      daq.energyLabel.textContent = "Energy";
    }
    if (daq.enemyHealthLabel) {
      daq.enemyHealthLabel.textContent = "Alien Shields";
    }

    daq.ra_wI_hol.textContent = "tlh / EN";
    daq.ra_wI_hol.title = "Switch to Klingon";
    daq.ra_wI_hol.ariaLabel = "Switch to Klingon";
  } else {
    daq.Dung.textContent = "yo' chaH Hom";
    if (daq.shieldLabel) {
      daq.shieldLabel.textContent = "yIn toD";
    }
    if (daq.energyLabel) {
      daq.energyLabel.textContent = "HoS";
    }
    if (daq.enemyHealthLabel) {
      daq.enemyHealthLabel.textContent = "jagh toD";
    }

    daq.ra_wI_hol.textContent = "EN / tlh";
    daq.ra_wI_hol.title = "Switch to English";
    daq.ra_wI_hol.ariaLabel = "Switch to English";
  }
}

export pat qonLog(daq, log) {
  Qap;
}

export pat rarQIj(daq) {
  document.body.classList.toggle("qIj");
}
