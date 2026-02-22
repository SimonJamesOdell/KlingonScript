import { SamjaghArrivalScale } from "./state.js";

export function SamDaq() {
  return {
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

export function yISeHCanvasMode(daq, enabled = false) {
  if (!daq.meydan) {
    return;
  }

  if (!daq.canvasLayer) {
    const canvas = document.createElement("canvas");
    canvas.id = "wr_canvas_layer_generated";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.zIndex = "28";
    canvas.style.pointerEvents = "none";
    canvas.style.display = "none";
    daq.meydan.appendChild(canvas);
    daq.canvasLayer = canvas;
    daq.canvasCtx = canvas.getContext("2d", { alpha: true, desynchronized: true });
  }

  daq.canvasMode = enabled === true;
  daq.canvasLayer.style.display = daq.canvasMode ? "block" : "none";

  const hideDom = daq.canvasMode;
  if (daq.maHQam) { daq.maHQam.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghQam) { daq.jaghQam.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghQam2) { daq.jaghQam2.style.display = hideDom ? "none" : "block"; }
  const enemyShipNodes = daq.meydan.querySelectorAll(".ship.enemy");
  enemyShipNodes.forEach((shipEl) => {
    shipEl.style.display = hideDom ? "none" : "block";
  });
  if (daq.maHBaH) { daq.maHBaH.style.display = hideDom ? "none" : "block"; }
  if (daq.jaghBaH) { daq.jaghBaH.style.display = hideDom ? "none" : "block"; }
  if (daq.fx) { daq.fx.style.display = "block"; }
}

function yIghoSroundLabel(daq) {
  if (!daq.meydan) {
    return null;
  }

  if (!daq.roundTop) {
    const top = document.createElement("div");
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
    const defeated = document.createElement("div");
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
    const timer = document.createElement("div");
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
    const dbg = document.createElement("div");
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

  return daq.roundTop;
}

function yIghoSjaghPool(daq, count) {
  if (!daq.meydan || !daq.enemyShipHud1 || !daq.enemyShipBar1) {
    return;
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

  while (daq.jaghHudmey.length < count) {
    const hud = document.createElement("div");
    hud.className = "enemyMiniHud";
    const hudBarWrap = document.createElement("div");
    hudBarWrap.className = "enemyMiniHudBar";
    const hudBar = document.createElement("span");
    hudBarWrap.appendChild(hudBar);
    hud.appendChild(hudBarWrap);
    daq.meydan.appendChild(hud);

    daq.jaghHudmey.push(hud);
    daq.jaghBarmey.push(hudBar);
  }
}

let jaghSpriteTypes = [
  { ship: "◢╋◣", boss: "◣✹◢" },
  { ship: "◤✶◥", boss: "◥✹◤" },
  { ship: "◢◈◣", boss: "◣◉◢" },
  { ship: "⬢✦⬢", boss: "⬢✶⬢" },
  { ship: "◥⟁◤", boss: "◣✧◢" },
  { ship: "◢✷◣", boss: "◤✹◥" },
  { ship: "◤✦◥", boss: "◣✸◢" },
  { ship: "◢⬡◣", boss: "◥⬢◤" }
];

function SamjaghGlyph(wav, mI = 0, boss = false) {
  const waveIndex = Math.max(0, Number(wav ?? 1) - 1);
  const unlockedCount = Math.max(1, Math.min(jaghSpriteTypes.length, waveIndex + 1));
  const spriteIndex = Math.max(0, Number(mI ?? 0)) % unlockedCount;
  const sprite = jaghSpriteTypes[spriteIndex];
  if (boss === true) {
    return sprite.boss;
  }
  return sprite.ship;
}

function SamDefeatedGlyphs(wav) {
  const current = Math.max(1, Number(wav ?? 1));
  if (current <= 1) {
    return "";
  }

  const glyphs = [];
  let mI = 1;
  while (mI < current) {
    glyphs.push(SamjaghGlyph(mI, mI - 1, false));
    mI = mI + 1;
  }
  return glyphs.join(" ");
}

function SamjaghScale(waS, now) {
  return SamjaghArrivalScale(waS, now);
}

export function qonPoH(daq) {
  return;
}

export function qonHoS(daq, HoS) {
  daq.HoSbar.style.height = `${HoS}%`;
}

export function qonjagh(daq, waS) {
  const mI = Math.floor((waS.yIn / 5) * 100);
  daq.jaghbar.style.height = `${mI}%`;
}

export function qonjaghHoS(daq, waS) {
  if (!daq.enemyHealthBar) {
    return;
  }
  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  const totalMax = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  const totalNow = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
  const showBar = enemies.length > 0;
  const mI = totalMax > 0 ? Math.floor((totalNow / totalMax) * 100) : 0;
  daq.enemyHealthBar.style.width = `${mI}%`;
  daq.enemyHealthBar.style.opacity = showBar ? "1" : "0";
  if (daq.enemyHealthLabel) {
    daq.enemyHealthLabel.style.opacity = showBar ? "0.9" : "0";
  }
}

function yIqonEnemyMiniHudMey(daq, waS) {
  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  yIghoSjaghPool(daq, Math.max(2, enemies.length));

  let mI = 0;
  while (mI < daq.jaghHudmey.length) {
    const hudEl = daq.jaghHudmey[mI];
    const barEl = daq.jaghBarmey[mI];
    const jagh = enemies[mI];

    if (!hudEl || !barEl || !jagh) {
      if (hudEl) {
        hudEl.classList.remove("show");
      }
    } else {
      const alive = jagh.HoS > 0;
      const damaged = jagh.HoS < jagh.HoS_max;
      const barPct = jagh.HoS_max > 0 ? Math.floor((jagh.HoS / jagh.HoS_max) * 100) : 0;
      hudEl.style.left = `${50 + jagh.x * 0.95}%`;
      hudEl.style.top = `${42 + jagh.y * 0.95}%`;
      hudEl.style.width = jagh.boss === true ? "130px" : "84px";
      barEl.style.width = `${Math.max(0, Math.min(100, barPct))}%`;
      hudEl.classList.toggle("show", alive && damaged);
    }

    mI = mI + 1;
  }
}

function yIqonCanvasMeydan(daq, waS) {
  if (!daq.canvasMode || !daq.canvasLayer || !daq.canvasCtx) {
    return;
  }

  function yIghoSCanvasCache(daq, ctx) {
    if (!daq.canvasCache) {
      daq.canvasCache = {
        glyphSprites: {},
        gradients: {}
      };
    }

    if (!daq.canvasCache.gradients.playerBeam) {
      const playerGrad = ctx.createLinearGradient(0, 0, 100, 0);
      playerGrad.addColorStop(0, "#fff59d");
      playerGrad.addColorStop(0.3, "#fde047");
      playerGrad.addColorStop(0.7, "#facc15");
      playerGrad.addColorStop(1, "#f59e0b");
      daq.canvasCache.gradients.playerBeam = playerGrad;
    }

    if (!daq.canvasCache.gradients.enemyBeamRed) {
      const redGrad = ctx.createLinearGradient(100, 0, 0, 0);
      redGrad.addColorStop(0, "#fda4af");
      redGrad.addColorStop(0.4, "#fb7185");
      redGrad.addColorStop(0.75, "#ef4444");
      redGrad.addColorStop(1, "#be123c");
      daq.canvasCache.gradients.enemyBeamRed = redGrad;
    }

    if (!daq.canvasCache.gradients.enemyBeamPurple) {
      const purpleGrad = ctx.createLinearGradient(100, 0, 0, 0);
      purpleGrad.addColorStop(0, "#ddd6fe");
      purpleGrad.addColorStop(0.4, "#c4b5fd");
      purpleGrad.addColorStop(0.75, "#a78bfa");
      purpleGrad.addColorStop(1, "#7c3aed");
      daq.canvasCache.gradients.enemyBeamPurple = purpleGrad;
    }

    return daq.canvasCache;
  }

  function yISamCanvasGlyphSprite(cache, glyph, size, color, fontFamily) {
    const spriteSize = Math.max(8, Math.round(size));
    const key = `${glyph}|${spriteSize}|${color}|${fontFamily}`;
    if (cache.glyphSprites[key]) {
      return cache.glyphSprites[key];
    }

    const sprite = document.createElement("canvas");
    const pad = Math.max(6, Math.floor(spriteSize * 0.28));
    const side = spriteSize + pad * 2;
    sprite.width = side;
    sprite.height = side;
    const sctx = sprite.getContext("2d", { alpha: true });
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";
    sctx.fillStyle = color;
    sctx.font = `${spriteSize}px ${fontFamily}`;
    sctx.fillText(glyph, side / 2, side / 2);
    cache.glyphSprites[key] = sprite;
    return sprite;
  }

  const canvas = daq.canvasLayer;
  const ctx = daq.canvasCtx;
  const fieldW = daq.meydan.clientWidth;
  const fieldH = daq.meydan.clientHeight;
  const w = Math.max(1, fieldW > 0 ? fieldW : Math.floor(daq.meydan.getBoundingClientRect().width));
  const h = Math.max(1, fieldH > 0 ? fieldH : Math.floor(daq.meydan.getBoundingClientRect().height));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const cache = yIghoSCanvasCache(daq, ctx);
  ctx.clearRect(0, 0, w, h);
  const now = Date.now();
  const enemyScale = SamjaghScale(waS, now);

  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  let mI = 0;
  while (mI < enemies.length) {
    const jagh = enemies[mI];
    if (jagh.HoS > 0) {
      const x = w * ((50 + jagh.x * 0.95) / 100);
      const y = h * ((50 + jagh.y * 0.95) / 100);
      const baseSize = jagh.boss === true ? 39 : 24;
      const size = Math.max(1, baseSize * enemyScale);
      const baseAlpha = Math.max(0, Math.min(1, 0.35 + ((jagh.HoS_max > 0 ? jagh.HoS / jagh.HoS_max : 0) * 0.65)));
      const waitUntil = Number(waS.roundWaitUntil ?? 0);
      const waitStart = waitUntil - 3000;
      const fadeStart = waitStart + 1000;
      let introT = 1;
      if (Number.isFinite(waitUntil) && Number.isFinite(waitStart)) {
        introT = Math.max(0, Math.min(1, (now - fadeStart) / 2000));
      }
      const introAlpha = introT;
      const alpha = baseAlpha * introAlpha;
      const glyph = SamjaghGlyph(waS.wav, mI, jagh.boss);
      const sprite = yISamCanvasGlyphSprite(cache, glyph, size, "#ffe4e6", "Segoe UI Symbol, Segoe UI, sans-serif");

      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, x - sprite.width / 2, y - sprite.height / 2);
    }
    mI = mI + 1;
  }
  ctx.globalAlpha = 1;

  const px = w * ((50 + waS.maHPos * 0.95) / 100);
  const py = h * ((50 + waS.maHPosY * 0.95) / 100);
  const maHHoS = Math.max(0, Math.min(1, Number(waS.HoS ?? 100) / 100));
  const playerGlyph = waS.taH === "lose" ? "💥" : "🚀";
  const playerSprite = yISamCanvasGlyphSprite(cache, playerGlyph, 44, "#93c5fd", "Segoe UI Emoji, Segoe UI Symbol, sans-serif");
  ctx.save();
  ctx.globalAlpha = 0.35 + maHHoS * 0.65;
  ctx.translate(px, py);
  ctx.rotate(Math.PI / 4);
  ctx.drawImage(playerSprite, -playerSprite.width / 2, -playerSprite.height / 2);
  ctx.restore();

  const beamList = Array.isArray(waS.maHBaHmey) ? waS.maHBaHmey : [];
  let bI = 0;
  while (bI < beamList.length) {
    const baH = beamList[bI];
    const tagh = Number(baH.tagh);
    const lenRaw = Number(baH.len);
    const len = Math.max(50, Number.isFinite(lenRaw) ? lenRaw : 520);
    const t = Number.isFinite(tagh) ? Math.max(0, Math.min(1, (now - tagh) / len)) : 1;
    const posX = Number(baH.posX);
    const posY = Number(baH.posY);

    if (Number.isFinite(posX) && Number.isFinite(posY) && t < 1) {
      const beamLen = 100;
      const shotLeftPct = 50 + posX * 0.95;
      const tipPx = w * ((shotLeftPct + 3) / 100);
      let beamTravel = Math.max(0, w - tipPx - beamLen);
      const travelFloor = Math.max(w * 0.72, 280);
      beamTravel = Math.max(beamTravel, travelFloor);
      const beamLeft = tipPx + beamTravel * t;
      const beamTopPct = 50 + posY * 0.95;
      const beamTop = Math.max(0, Math.min(h, h * (beamTopPct / 100)));

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

  if (waS.jaghBaH_taH === true) {
    const tagh = Number(waS.jaghBaH_tagh);
    const lenRaw = Number(waS.jaghBaH_len);
    const len = Math.max(120, Number.isFinite(lenRaw) ? lenRaw : 520);
    const t = Number.isFinite(tagh) ? Math.max(0, Math.min(1, (now - tagh) / len)) : 1;

    if (t < 1) {
      const beamLen = 100;
      const shotLeftPct = Number(waS.jaghBaHPosX);
      const tipPx = w * ((shotLeftPct - 3) / 100);
      const startLeft = tipPx - beamLen;
      const beamTravel = Math.max(0, tipPx);
      const beamLeft = startLeft - beamTravel * t;
      const beamTopPct = 50 + Number(waS.jaghBaHPosY) * 0.95;
      const beamTop = Math.max(0, Math.min(h, h * (beamTopPct / 100)));
      const purple = waS.jaghBaH_color === "purple";

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

export function vangQIpViz(daq, mI, crit, xPct, yPct) {
  const x = Number.isFinite(xPct) ? Math.max(4, Math.min(96, xPct)) : 50;
  const y = Number.isFinite(yPct) ? Math.max(6, Math.min(94, yPct)) : 38;
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

export function vangjaghViz(daq, qawH, xPct, yPct) {
  const x = Number.isFinite(xPct) ? Math.max(4, Math.min(96, xPct)) : 50;
  const y = Number.isFinite(yPct) ? Math.max(6, Math.min(94, yPct)) : 38;
  daq.fx.style.left = `${x}%`;
  daq.fx.style.top = `${y}%`;

  daq.fx.textContent = `-${qawH}`;
  daq.fx.classList.remove("show", "crit");
  daq.fx.offsetWidth;
  daq.fx.classList.add("show");
}

export function qontaH(daq, waS, Hol) {
  return;
}

export function qonqam(daq, waS) {
  return;
}

function mughTaH(waS, Hol) {
  if (waS.taH === "win") {
    return Hol === "en" ? "Victory" : "Qapchu'";
  }

  if (waS.taH === "lose") {
    return Hol === "en" ? "Defeat" : "luj";
  }

  return Hol === "en" ? "Battle" : "veS";
}

function qonStatus(daq, waS, Hol) {
  const taH = mughTaH(waS, Hol);
  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  const totalNow = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
  const totalMax = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  const rankCount = enemies.filter((jagh) => jagh.HoS > 0).length;
  if (Hol === "en") {
    daq.statusLine.textContent = `Enemy ${totalNow}/${totalMax} | Ranks ${rankCount} | Power ${waS.HoS}/100 | Lives ${waS.yIn} | Score ${waS.mI_score} | Wave ${waS.wav}/${waS.wav_max} | XP ${waS.mI_xp} | ${taH}`;
  } else {
    daq.statusLine.textContent = `jagh ${totalNow}/${totalMax} | boQ ${rankCount} | HoS ${waS.HoS}/100 | yIn ${waS.yIn} | mI' ${waS.mI_score} | wav ${waS.wav}/${waS.wav_max} | xI ${waS.mI_xp} | ${taH}`;
  }
}

function qonResult(daq, waS, Hol) {
  if (!daq.result) {
    return;
  }

  const now = Date.now();
  const clearUntil = Number(waS.roundClearUntil ?? 0);
  const clearFadeLen = 350;
  if (waS.taH === "fight" && Number.isFinite(clearUntil) && now < clearUntil) {
    daq.result.textContent = Hol === "en" ? "ROUND CLEARED" : "wav Qaw'lu'";
    daq.result.classList.add("show");
    return;
  }

  if (waS.taH === "fight" && Number.isFinite(clearUntil) && now < clearUntil + clearFadeLen) {
    daq.result.textContent = Hol === "en" ? "ROUND CLEARED" : "wav Qaw'lu'";
    daq.result.classList.remove("show");
    return;
  }

  daq.result.textContent = "";
  daq.result.classList.remove("show");
}

function qonRoundCue(daq, waS, Hol) {
  if (!daq.roundCue) {
    return;
  }

  if (waS.taH !== "fight") {
    daq.roundCue.textContent = "";
    daq.roundCue.classList.remove("show", "fight");
    return;
  }

  const now = Date.now();
  const waitUntil = Number(waS.roundWaitUntil ?? 0);
  const introStart = Number(waS.roundIntroStart ?? 0);
  const introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));
  const clearUntil = Number(waS.roundClearUntil ?? 0);
  const clearFadeLen = 350;
  if (Number.isFinite(clearUntil) && now < clearUntil + clearFadeLen) {
    daq.roundCue.textContent = "";
    daq.roundCue.classList.remove("show", "fight");
    return;
  }
  const showCountdown = Number.isFinite(waitUntil) && now < waitUntil;
  const showIntro = Number.isFinite(introStart) && introStart > 0 && now >= introStart && now < introStart + introLen;

  if (showCountdown) {
    const rem = waitUntil - now;
    const mI = Math.max(1, Math.min(3, Math.ceil(Math.max(0, rem) / 1000)));
    daq.roundCue.textContent = `${mI}...`;
    daq.roundCue.classList.remove("fight");
    daq.roundCue.classList.add("show");
    return;
  }

  if (showIntro || waS.roundState === "intro") {
    daq.roundCue.textContent = Hol === "en" ? "fight!" : "veS!";
    daq.roundCue.classList.remove("fight");
    daq.roundCue.classList.add("show", "fight");
    return;
  }

  daq.roundCue.textContent = "";
  daq.roundCue.classList.remove("show", "fight");
}

function qonRoundTop(daq, waS, Hol) {
  const top = yIghoSroundLabel(daq);
  if (!top) {
    return;
  }

  top.textContent = Hol === "en" ? `ROUND ${waS.wav}` : `wav ${waS.wav}`;

  if (daq.roundTopDefeated) {
    const defeated = SamDefeatedGlyphs(waS.wav);
    if (defeated.length > 0) {
      daq.roundTopDefeated.textContent = Hol === "en"
        ? `Defeated: ${defeated}`
        : `jaghpu' qaw': ${defeated}`;
    } else {
      daq.roundTopDefeated.textContent = "";
    }
  }

  if (daq.roundTopTimer) {
    const now = Date.now();
    const waitUntil = Number(waS.roundWaitUntil ?? 0);
    if (waS.taH === "fight" && Number.isFinite(waitUntil) && now < waitUntil) {
      const rem = Math.max(0, waitUntil - now);
      const mI = Math.max(1, Math.min(3, Math.ceil(rem / 1000)));
      daq.roundTopTimer.textContent = Hol === "en"
        ? `Countdown ${mI}...`
        : `wejDIch ${mI}...`;
    } else {
      const roundStart = Number.isFinite(waitUntil) ? waitUntil - 3000 : now;
      const elapsedMs = Math.max(0, now - roundStart);
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const tenths = Math.floor((elapsedMs % 1000) / 100);
      daq.roundTopTimer.textContent = Hol === "en"
        ? `Round Time ${elapsedSec}.${tenths}s`
        : `poH ${elapsedSec}.${tenths}s`;
    }
  }

  if (daq.roundTopDebug) {
    daq.roundTopDebug.textContent = "";
  }
}

export function qonwaS(daq, waS, muQoq, Hol) {
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

export function qonHol(daq, hol) {
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

export function qonLog(daq, log) {
  return;
}

export function rarQIj(daq) {
  document.body.classList.toggle("qIj");
}
