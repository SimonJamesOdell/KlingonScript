import {
  waS,
  ghurHoS,
  ghurQIp,
  ghurScore,
  ghurYIn,
  choHmaHPos,
  choHmaHPosY,
  choHjaghDive,
  ghurXp,
  loQnob,
  peghwav,
  resetwaS,
  yIchelLog,
  yIqonDe,
  yIlaDDe,
  yISeHDe,
  SamjaghArrivalScale
} from "./state.js";
import { SamDaq, qonwaS, qonHol, vangQIpViz, vangjaghViz, yISeHCanvasMode } from "./ui.js";

const daq = SamDaq();
let Hol = "tlh";
let qIj = false;
let gameOverArmedAt = 0;
let gameOverShown = false;
let musicReady = false;
let musicTracks = [];
let musicIndex = 0;
let musicVolume = 0.55;
let musicPlaying = false;
let musicAudio = null;
let starLayers = [];
let starSpeedMul = 1;
let starSpeedLast = 0;
let saveLast = 0;
let loopLast = 0;
let loopAccum = 0;
const LOOP_STEP = 33;
let integrityLast = 0;
let integrityStatus = "UNKNOWN";

function teH(daq) {
  return (
    daq.Dung &&
    daq.muQoq &&
    daq.statusLine &&
    daq.meydan &&
    daq.fx &&
    daq.ra_wI_hol &&
    daq.HoSbar &&
    daq.jaghbar
  );
}

function mugh(tlh, en) {
  if (Hol === "en") {
    return en;
  }

  return tlh;
}

function veStaH() {
  return waS.taH === "fight" && waS.roundState === "fight";
}

function yIqonSave(now = Date.now(), force = false) {
  if (!force && now - saveLast < 2000) {
    return;
  }
  saveLast = now;
  yIqonDe(Hol, qIj);
}

function yIghoSmusicUI() {
  if (!daq.meydan) {
    return null;
  }

  if (daq.musicWrap) {
    return daq.musicWrap;
  }

  const shell = daq.meydan.parentElement && daq.meydan.parentElement.parentElement;
  if (!shell) {
    return null;
  }

  const wrap = document.createElement("div");
  wrap.id = "wr_music_controls_generated";
  wrap.style.display = "flex";
  wrap.style.alignItems = "center";
  wrap.style.justifyContent = "center";
  wrap.style.gap = "8px";
  wrap.style.margin = "0 0 8px 0";
  wrap.style.flexWrap = "wrap";

  const makeBtn = (text) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.style.padding = "0.45rem 0.7rem";
    b.style.fontSize = "0.88rem";
    return b;
  };

  const prevBtn = makeBtn("⏮");
  const playBtn = makeBtn("▶");
  const nextBtn = makeBtn("⏭");
  const volDownBtn = makeBtn("Vol-");
  const volUpBtn = makeBtn("Vol+");
  const label = document.createElement("div");
  label.style.minWidth = "180px";
  label.style.maxWidth = "460px";
  label.style.overflow = "hidden";
  label.style.textOverflow = "ellipsis";
  label.style.whiteSpace = "nowrap";
  label.style.fontSize = "0.86rem";
  label.style.opacity = "0.9";
  label.textContent = "Music: no tracks";

  prevBtn.addEventListener("click", () => yIchoHmuzik(-1));
  playBtn.addEventListener("click", () => yItogglemuzik());
  nextBtn.addEventListener("click", () => yIchoHmuzik(1));
  volDownBtn.addEventListener("click", () => yIchoHvolume(-0.1));
  volUpBtn.addEventListener("click", () => yIchoHvolume(0.1));

  wrap.appendChild(prevBtn);
  wrap.appendChild(playBtn);
  wrap.appendChild(nextBtn);
  wrap.appendChild(volDownBtn);
  wrap.appendChild(volUpBtn);
  wrap.appendChild(label);

  shell.insertBefore(wrap, daq.meydan.parentElement);

  daq.musicWrap = wrap;
  daq.musicPrevBtn = prevBtn;
  daq.musicPlayBtn = playBtn;
  daq.musicNextBtn = nextBtn;
  daq.musicVolDownBtn = volDownBtn;
  daq.musicVolUpBtn = volUpBtn;
  daq.musicLabel = label;

  return wrap;
}

function yIrenderMusicLabel() {
  if (!daq.musicLabel) {
    return;
  }

  if (!Array.isArray(musicTracks) || musicTracks.length === 0) {
    daq.musicLabel.textContent = "Music: no tracks";
    if (daq.musicPlayBtn) {
      daq.musicPlayBtn.textContent = "▶";
      daq.musicPlayBtn.disabled = true;
    }
    return;
  }

  const now = musicTracks[Math.max(0, Math.min(musicTracks.length - 1, musicIndex))];
  const shortName = now.split("/").pop();
  daq.musicLabel.textContent = `Music: ${shortName}`;
  if (daq.musicPlayBtn) {
    daq.musicPlayBtn.textContent = musicPlaying ? "⏸" : "▶";
    daq.musicPlayBtn.disabled = false;
  }
}

function yIchoHvolume(delta) {
  musicVolume = Math.max(0, Math.min(1, musicVolume + delta));
  if (musicAudio) {
    musicAudio.volume = musicVolume;
  }
}

function yIchoHmuzik(step) {
  if (!Array.isArray(musicTracks) || musicTracks.length === 0 || !musicAudio) {
    return;
  }

  musicIndex = (musicIndex + step + musicTracks.length) % musicTracks.length;
  musicAudio.src = `./warroom/music/${musicTracks[musicIndex]}`;
  if (musicPlaying) {
    musicAudio.play().catch(() => {
      musicPlaying = false;
      yIrenderMusicLabel();
    });
  }
  yIrenderMusicLabel();
}

function yItogglemuzik() {
  if (!musicAudio || !Array.isArray(musicTracks) || musicTracks.length === 0) {
    return;
  }

  if (musicPlaying) {
    musicAudio.pause();
    musicPlaying = false;
    yIrenderMusicLabel();
    return;
  }

  musicAudio.play().then(() => {
    musicPlaying = true;
    yIrenderMusicLabel();
  }).catch(() => {
    musicPlaying = false;
    yIrenderMusicLabel();
  });
}

function yISeHmuzik() {
  if (musicReady) {
    return;
  }

  yIghoSmusicUI();

  musicAudio = new Audio();
  musicAudio.preload = "metadata";
  musicAudio.volume = musicVolume;
  musicAudio.addEventListener("ended", () => {
    yIchoHmuzik(1);
  });

  fetch("./warroom/music/playlist.json", { cache: "no-store" })
    .then((res) => res.ok ? res.json() : { tracks: [] })
    .then((payload) => {
      musicTracks = payload && Array.isArray(payload.tracks) ? payload.tracks.filter((t) => typeof t === "string" && t.toLowerCase().endsWith(".mp3")) : [];
      if (musicTracks.length > 0) {
        musicIndex = 0;
        musicAudio.src = `./warroom/music/${musicTracks[musicIndex]}`;
      }
      yIrenderMusicLabel();
      musicReady = true;
    })
    .catch(() => {
      musicTracks = [];
      yIrenderMusicLabel();
      musicReady = true;
    });
}

function yIghoSgameOverUI() {
  if (!daq.meydan) {
    return null;
  }

  if (!daq.gameOverWrap) {
    const wrap = document.createElement("div");
    wrap.id = "wr_game_over_generated";
    wrap.style.position = "absolute";
    wrap.style.inset = "0";
    wrap.style.display = "none";
    wrap.style.alignItems = "center";
    wrap.style.justifyContent = "center";
    wrap.style.flexDirection = "column";
    wrap.style.gap = "14px";
    wrap.style.background = "rgba(2,6,23,.78)";
    wrap.style.zIndex = "40";
    wrap.style.pointerEvents = "auto";

    const title = document.createElement("div");
    title.textContent = "Game Over";
    title.style.fontSize = "2.4rem";
    title.style.fontWeight = "900";
    title.style.letterSpacing = "0.06em";
    title.style.textTransform = "uppercase";
    title.style.color = "#fda4af";
    title.style.textShadow = "0 0 14px rgba(244,63,94,.6)";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Replay";
    btn.style.fontSize = "1.05rem";
    btn.style.padding = "0.7rem 1.1rem";
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (Date.now() < gameOverArmedAt || btn.disabled) {
        return;
      }
      yItaghqa();
    });

    wrap.appendChild(title);
    wrap.appendChild(btn);
    daq.meydan.appendChild(wrap);

    daq.gameOverWrap = wrap;
    daq.gameOverTitle = title;
    daq.gameOverBtn = btn;
  }

  return daq.gameOverWrap;
}

function qonGameOverUI() {
  const wrap = yIghoSgameOverUI();
  if (!wrap) {
    return;
  }

  if (waS.taH === "lose") {
    if (!gameOverShown) {
      gameOverArmedAt = Date.now() + 450;
      gameOverShown = true;
    }
    daq.gameOverTitle.textContent = Hol === "en" ? "Game Over" : "Qapbe'";
    daq.gameOverBtn.textContent = Hol === "en" ? "Replay" : "taghqa'";
    daq.gameOverBtn.disabled = Date.now() < gameOverArmedAt;
    daq.meydan.style.cursor = "auto";
    wrap.style.display = "flex";
  } else {
    gameOverShown = false;
    gameOverArmedAt = 0;
    daq.gameOverBtn.disabled = false;
    daq.meydan.style.cursor = "none";
    wrap.style.display = "none";
  }
}

function yISeHstars() {
  const stars = daq.meydan.querySelectorAll(".stars");
  starLayers = [];
  stars.forEach((star) => {
    if (star.classList.contains("whizz")) {
      star.style.display = "none";
      return;
    }

    function yISeH() {
      star.style.setProperty("--y1", `${Math.floor(Math.random() * 240) - 120}px`);
      star.style.setProperty("--y2", `${Math.floor(Math.random() * 240) - 120}px`);
      star.style.setProperty("--y3", `${Math.floor(Math.random() * 240) - 120}px`);
    }

    function yISeHwhizz() {
      star.style.setProperty("--wy1", `${Math.floor(Math.random() * 180) - 90}px`);
      star.style.setProperty("--wy2", `${Math.floor(Math.random() * 180) - 90}px`);
      const hueA = Math.floor(Math.random() * 45) + 195;
      const hueB = Math.floor(Math.random() * 45) + 15;
      const alphaA = (0.72 + (Math.random() * 0.26)).toFixed(2);
      const alphaB = (0.62 + (Math.random() * 0.3)).toFixed(2);
      star.style.setProperty("--whizzA", `hsla(${hueA}, 95%, 90%, ${alphaA})`);
      star.style.setProperty("--whizzB", `hsla(${hueB}, 98%, 74%, ${alphaB})`);
    }

    yISeH();
    if (star.classList.contains("whizz")) {
      yISeHwhizz();
      star.addEventListener("animationiteration", yISeHwhizz);
    }

    const css = window.getComputedStyle(star);
    const baseDur = Math.max(0.2, parseFloat(css.animationDuration) || 10);
    const baseOpacity = Math.max(0, Math.min(1, parseFloat(css.opacity) || 1));
    starLayers.push({ star, baseDur, baseOpacity, anim: null, hidden: false });
  });
}

function yISeHpageParallax() {
  if (document.getElementById("wr_page_parallax_generated")) {
    return;
  }

  if (!document.getElementById("wr_page_parallax_style_generated")) {
    const styleEl = document.createElement("style");
    styleEl.id = "wr_page_parallax_style_generated";
    styleEl.textContent = `
.wrPageParallaxGen {
  position: fixed;
  inset: -18vh -8vw;
  pointer-events: none;
  z-index: -1;
  opacity: .36;
  background-image:
    radial-gradient(circle at 16% 26%, rgba(186,230,253,.45) 0 1px, transparent 1.8px),
    radial-gradient(circle at 72% 38%, rgba(125,211,252,.42) 0 1px, transparent 2px),
    radial-gradient(circle at 34% 72%, rgba(224,242,254,.34) 0 .9px, transparent 1.7px),
    radial-gradient(circle at 84% 78%, rgba(191,219,254,.28) 0 1.1px, transparent 2px);
  background-size: 720px 440px, 840px 520px, 680px 420px, 900px 560px;
  animation: wrPageParallaxDrift 42s linear infinite;
}
@keyframes wrPageParallaxDrift {
  0% { transform: translate3d(0, 0, 0) scale(1.01); }
  50% { transform: translate3d(-1.6vw, 2.2vh, 0) scale(1.035); }
  100% { transform: translate3d(-3.2vw, 4.4vh, 0) scale(1.01); }
}
`;
    document.head.appendChild(styleEl);
  }

  const layer = document.createElement("div");
  layer.id = "wr_page_parallax_generated";
  layer.className = "wrPageParallaxGen";
  document.body.prepend(layer);
}

function yIqonStarSpeed() {
  if (!Array.isArray(starLayers) || starLayers.length === 0) {
    return;
  }

  const normalMul = 2;
  const clearMul = normalMul * 8;
  let target = normalMul;
  const now = Date.now();
  const clearUntil = Number(waS.roundClearUntil ?? 0);

  if (Number.isFinite(clearUntil) && now < clearUntil) {
    target = clearMul;
  } else if (waS.taH === "fight" && waS.roundState === "wait") {
    const waitUntil = Number(waS.roundWaitUntil ?? 0);
    const waitStart = waitUntil - 3000;
    let t = 1;
    if (Number.isFinite(waitUntil) && Number.isFinite(waitStart) && waitUntil > waitStart) {
      t = Math.max(0, Math.min(1, (now - waitStart) / (waitUntil - waitStart)));
    }

    const eased = t * t * (3 - 2 * t);
    target = clearMul + (normalMul - clearMul) * eased;
  }

  const dt = starSpeedLast > 0 ? Math.max(1, now - starSpeedLast) : 33;
  starSpeedLast = now;
  const blend = 1 - Math.exp(-dt / 220);
  starSpeedMul = starSpeedMul + (target - starSpeedMul) * blend;

  if (Math.abs(target - starSpeedMul) < 0.01) {
    starSpeedMul = target;
  }

  starLayers.forEach((layer) => {
    if (!layer.anim && typeof layer.star.getAnimations === "function") {
      const anims = layer.star.getAnimations();
      if (Array.isArray(anims) && anims.length > 0) {
        layer.anim = anims[0];
      }
    }

    if (layer.anim && typeof layer.anim.playbackRate === "number") {
      layer.anim.playbackRate = starSpeedMul;
    } else {
      const dur = Math.max(0.2, layer.baseDur / starSpeedMul);
      layer.star.style.animationDuration = `${dur}s`;
    }
  });
}

function yISeHroundFlow(now = Date.now()) {
  if (waS.taH !== "fight") {
    return;
  }

  if (waS.roundState === "wait") {
    waS.HoS = 100;

    if (!Number.isFinite(waS.roundWaitUntil)) {
      waS.roundWaitUntil = now + 3000;
    }
    if (now >= waS.roundWaitUntil) {
      waS.roundState = "intro";
      waS.roundIntroStart = now;
    }
    return;
  }

  if (waS.roundState === "intro") {
    const introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));
    if (!Number.isFinite(waS.roundIntroStart) || waS.roundIntroStart <= 0) {
      waS.roundIntroStart = now;
    }
    if (now - waS.roundIntroStart >= introLen) {
      waS.roundState = "fight";
      waS.roundIntroStart = 0;
    }
  }
}

function yIrInSystemCheck(report = false) {
  const now = Date.now();
  const errors = [];
  const warns = [];

  if (!["fight", "win", "lose"].includes(String(waS.taH))) {
    errors.push("bad taH");
    waS.taH = "fight";
  }

  if (!["wait", "intro", "fight"].includes(String(waS.roundState))) {
    errors.push("bad roundState");
    waS.roundState = "wait";
    waS.roundWaitUntil = now + 3000;
  }

  if (!Number.isFinite(Number(waS.roundWaitUntil))) {
    errors.push("bad roundWaitUntil");
    waS.roundWaitUntil = now + 3000;
  }

  if (!Number.isFinite(Number(waS.roundIntroLen))) {
    errors.push("bad roundIntroLen");
    waS.roundIntroLen = 760;
  }
  waS.roundIntroLen = Math.max(120, Math.min(5000, Number(waS.roundIntroLen)));

  if (!Number.isFinite(Number(waS.roundIntroStart))) {
    errors.push("bad roundIntroStart");
    waS.roundIntroStart = 0;
  }

  if (!Array.isArray(waS.jaghmey)) {
    errors.push("bad jaghmey");
    waS.jaghmey = [];
  }

  waS.jaghmey = waS.jaghmey.filter((jagh) => Number.isFinite(jagh.x) && Number.isFinite(jagh.y) && Number.isFinite(jagh.HoS));

  const scale = SamjaghArrivalScale(waS, now);
  if (!Number.isFinite(scale) || scale < 0 || scale > 1.2) {
    errors.push("bad arrival scale");
  }

  if (scale < 0.5 && waS.jaghBaH_taH === true) {
    errors.push("early enemy fire");
    waS.jaghBaH_taH = false;
  }

  if (waS.taH === "fight" && waS.roundState === "wait") {
    if (waS.roundWaitUntil < now - 1000 || waS.roundWaitUntil > now + 12000) {
      warns.push("wait timer drift");
      waS.roundWaitUntil = now + 3000;
    }
    if (daq.roundCue && String(daq.roundCue.textContent ?? "").trim().length === 0) {
      warns.push("cue hidden");
    }
  }

  integrityStatus = errors.length === 0 ? "PASS" : "FAIL";
  waS.integrityStatus = integrityStatus;
  waS.integrityErrors = errors.length;
  waS.integrityWarns = warns.length;

  if (report || errors.length > 0) {
    let msg = `[SYS ${integrityStatus}] err:${errors.length} warn:${warns.length}`;
    if (errors.length > 0) {
      msg = `${msg} | ${errors.join(", ")}`;
    } else if (warns.length > 0) {
      msg = `${msg} | ${warns.join(", ")}`;
    }
    yIchelLog(msg);
  }

  return { pass: errors.length === 0, errors, warns };
}

function qon() {
  const muQoq = "";
  yIqonStarSpeed();
  qonHol(daq, Hol);
  qonwaS(daq, waS, muQoq, Hol);
  qonGameOverUI();
  yIqonSave(Date.now());
}

function yIchIDmaHBaHmey() {
  const now = Date.now();
  if (!Array.isArray(waS.maHBaHmey)) {
    waS.maHBaHmey = [];
  }
  waS.maHBaHmey = waS.maHBaHmey.filter((baH) => Number.isFinite(baH.tagh) && Number.isFinite(baH.len) && now - baH.tagh < baH.len);
  waS.maHBaH_taH = waS.maHBaHmey.length > 0;

  if (waS.maHBaH_taH) {
    const nIteb = waS.maHBaHmey[waS.maHBaHmey.length - 1];
    waS.maHBaH_tagh = nIteb.tagh;
    waS.maHBaH_len = nIteb.len;
    waS.maHBaHPosX = nIteb.posX;
    waS.maHBaHPosY = nIteb.posY;
  }
}

function qeqQIpmey() {
  if (!veStaH()) {
    return;
  }

  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  const now = Date.now();
  const prevNow = now - 40;
  const fieldW = Math.max(1, daq.meydan.clientWidth || Math.floor(daq.meydan.getBoundingClientRect().width));
  const fieldH = Math.max(1, daq.meydan.clientHeight);
  const beamLen = 100;
  const hitRadiusX = 28;
  const hitRadiusY = 28;

  const qel = [];
  let mI = 0;
  while (mI < waS.maHBaHmey.length) {
    const baH = waS.maHBaHmey[mI];
    const len = Math.max(50, Number(baH.len ?? 520));
    const t = Math.max(0, Math.min(1, (now - baH.tagh) / len));
    const tPrev = Math.max(0, Math.min(1, (prevNow - baH.tagh) / len));
    const shotLeftPct = 50 + Number(baH.posX ?? 0) * 0.95;
    const tipPx = fieldW * ((shotLeftPct + 3) / 100);
    let beamTravel = Math.max(0, fieldW - tipPx - beamLen);
    const travelFloor = Math.max(fieldW * 0.72, 280);
    beamTravel = Math.max(beamTravel, travelFloor);
    const beamLeft = tipPx + beamTravel * t;
    const beamRight = beamLeft + beamLen;
    const beamLeftPrev = tipPx + beamTravel * tPrev;
    const beamRightPrev = beamLeftPrev + beamLen;
    const beamSweepLeft = Math.min(beamLeft, beamLeftPrev);
    const beamSweepRight = Math.max(beamRight, beamRightPrev);
    const beamYPct = 50 + Number(baH.posY ?? 0) * 0.95;
    const beamYPx = fieldH * (beamYPct / 100);

    let hitIndex = -1;
    let hitYPct = 50;
    let hitXPct = 80;
    let bestNihPx = 999;
    let eI = 0;
    while (eI < enemies.length) {
      const jagh = enemies[eI];
      if (jagh.HoS > 0) {
        const enemyXPct = 50 + jagh.x * 0.95;
        const enemyYPct = 50 + jagh.y * 0.95;
        const enemyXPx = fieldW * (enemyXPct / 100);
        const enemyYPx = fieldH * (enemyYPct / 100);
        const enemyRadiusX = jagh.boss === true ? 44 : hitRadiusX;
        const enemyRadiusY = jagh.boss === true ? 40 : hitRadiusY;
        const nIHpx = Math.abs(beamYPx - enemyYPx);
        const xHit = enemyXPx + enemyRadiusX >= beamSweepLeft && enemyXPx - enemyRadiusX <= beamSweepRight;
        const yHit = nIHpx <= enemyRadiusY;
        if (xHit && yHit && nIHpx < bestNihPx) {
          hitIndex = eI;
          hitXPct = enemyXPct;
          hitYPct = enemyYPct;
          bestNihPx = nIHpx;
        }
      }
      eI = eI + 1;
    }

    if (hitIndex >= 0) {
      waS.dbg_lastHit = now;
      let qawH = Number(baH.qawH ?? 0);
      const crit = baH.crit === true;
      if (bestNihPx < 14) {
        qawH = qawH + 6;
      }

      const target = enemies[hitIndex];
      target.HoS = Math.max(0, target.HoS - qawH);
      waS.jaghHoS_max = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
      waS.jaghHoS = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
      const xpGain = 6 + (crit ? 6 : 0);
      const pointsGain = crit ? 36 : 18;
      vangQIpViz(daq, pointsGain, crit, hitXPct, hitYPct - 4);
      ghurXp(xpGain);
      ghurScore(pointsGain);
      yIchelLog(mugh(
        `qIp ta': ${baH.qIp} | jagh HoS -${qawH}${crit ? " (nIv)" : ""}`,
        `Strike ${baH.qIp} | Enemy power -${qawH}${crit ? " (critical)" : ""}`
      ));

      const waveClear = enemies.length > 0 && enemies.every((jagh) => jagh.HoS <= 0);
      if (waveClear) {
        const De_result = peghwav();
        if (De_result === "win") {
          ghurScore(120);
          yIchelLog(mugh("Qapchu'! jaghmey DatIvta'.", "Victory! You defeated every wave."));
        } else {
          const nowClear = Date.now();
          const clearLen = 2000;
          const clearFadeLen = 350;
          waS.roundClearUntil = nowClear + clearLen;
          waS.roundWaitUntil = nowClear + clearLen + clearFadeLen + 3000;
          ghurXp(15);
          ghurScore(60);
          yIchelLog(mugh(`wav ${waS.wav} tagh!`, `Wave ${waS.wav} begins!`));
        }
      }
    } else {
      qel.push(baH);
    }

    mI = mI + 1;
  }

  waS.maHBaHmey = qel;
  waS.maHBaH_taH = waS.maHBaHmey.length > 0;

  if (waS.jaghBaH_taH) {
    const eTagh = Number(waS.jaghBaH_tagh);
    const eLenRaw = Number(waS.jaghBaH_len);
    const eLen = Math.max(120, Number.isFinite(eLenRaw) ? eLenRaw : 520);
    if (!Number.isFinite(eTagh) || now - eTagh > eLen + 80) {
      waS.jaghBaH_taH = false;
      return;
    }
    const eT = Math.max(0, Math.min(1, (now - eTagh) / eLen));
    const eTPrev = Math.max(0, Math.min(1, (prevNow - eTagh) / eLen));
    const eTipPx = fieldW * ((waS.jaghBaHPosX - 3) / 100);
    const eStart = eTipPx - beamLen;
    const eTravel = Math.max(0, eTipPx);
    const eLeft = eStart - eTravel * eT;
    const eRight = eLeft + beamLen;
    const eLeftPrev = eStart - eTravel * eTPrev;
    const eRightPrev = eLeftPrev + beamLen;
    const eSweepLeft = Math.min(eLeft, eLeftPrev);
    const eSweepRight = Math.max(eRight, eRightPrev);
    const playerXPct = 50 + waS.maHPos * 0.95;
    const playerYPct = 50 + waS.maHPosY * 0.95;
    const playerXPx = fieldW * (playerXPct / 100);
    const playerYPx = fieldH * (playerYPct / 100);
    const enemyBeamYPct = 50 + waS.jaghBaHPosY * 0.95;
    const enemyBeamYPx = fieldH * (enemyBeamYPct / 100);
    const xHitPlayer = playerXPx + 24 >= eSweepLeft && playerXPx - 24 <= eSweepRight;
    const yHitPlayer = Math.abs(playerYPx - enemyBeamYPx) <= 28;

    if (xHitPlayer && yHitPlayer) {
      const motlh = Math.max(0, Number(waS.jaghBaH_qawH ?? 0));
      ghurHoS(-motlh);
      if (waS.jaghBaHDive === true) {
        ghurYIn(-1);
      }
      vangjaghViz(daq, motlh, playerXPct, playerYPct - 4);
      yIchelLog(mugh(`jagh qIp: -${motlh} HoS`, `Enemy hit: -${motlh} power`));
      waS.jaghBaH_taH = false;

      if (waS.taH === "lose") {
        yIchelLog(mugh("luj. HoS pagh. taghqa'meH r yIghItlh.", "You lost. Shields are at 0. Press R to play again."));
      }
    } else if (eT >= 1) {
      waS.jaghBaH_taH = false;
    }
  }
}

function yItaghqa() {
  resetwaS();
  waS.HoS = 100;
  waS.yIn = 5;
  choHjaghDive(0);
  yIchelLog(mugh("wa'maH wa' taghqa'.", "Campaign restarted."));
  qon();
}

function qeqIp() {
  const now = Date.now();
  waS.dbg_lastShot = now;
  yIchIDmaHBaHmey();

  if (!Number.isFinite(waS.qam) || waS.qam < 0 || waS.qam > now + 2000) {
    waS.qam = 0;
  }
  if (!Number.isFinite(waS.qam_len)) {
    waS.qam_len = 110;
  }
  waS.qam_len = Math.max(60, Math.min(1200, waS.qam_len));

  if (!veStaH()) {
    qon();
    return;
  }

  if (now < waS.qam) {
    yIchelLog(mugh("qatlh yIloS: qam taH", "Weapons cooling down"));
    qon();
    return;
  }

  if (waS.maHBaHmey.length >= waS.maHBaH_max) {
    yIchelLog(mugh("maHBaHmey law'qu'. yIloS.", "Too many shots in flight. Hold."));
    qon();
    return;
  }

  if (waS.HoS < 2) {
    yIchelLog(mugh("HoS ngeb. cha' HoS yIpoQ qIpmeH.", "Not enough energy. Need 2 power to fire."));
    qon();
    return;
  }

  ghurHoS(-2);

  waS.maHBaHmey.push({
    tagh: now,
    len: 520,
    posX: waS.maHPos,
    posY: waS.maHPosY,
    qIp: ghurQIp(),
    qawH: 0,
    crit: false
  });
  waS.maHBaH_taH = true;
  waS.maHBaH_tagh = now;
  waS.maHBaH_len = 520;
  waS.maHBaHPosX = waS.maHPos;
  waS.maHBaHPosY = waS.maHPosY;

  waS.qam = now + waS.qam_len;
  let qawH = (Math.floor(Math.random() * 9) + 10) * 2;
  const crit = Math.random() < waS.qIp_crit;

  if (crit) {
    qawH = qawH + 24;
    ghurXp(12);
  }

  const baH = waS.maHBaHmey[waS.maHBaHmey.length - 1];
  baH.qawH = qawH;
  baH.crit = crit;

  yIchelLog(mugh(
    `qIp ta': ${baH.qIp} | QaytaH`,
    `Strike ${baH.qIp} | in flight`
  ));

  qon();
}

function qenob() {
  if (!veStaH()) {
    return;
  }

  if (!loQnob()) {
    const jaq = Math.floor(Math.random() * 6) + 4;
    ghurHoS(jaq);
    ghurScore(-10);
    yIchelLog(mugh(
      `nob lIngbe'. Qul yIghoS: +${jaq} HoS, mI' -10`,
      `No supplies left. Emergency reroute: +${jaq} power, score -10`
    ));
    qon();
    return;
  }

  const ghur = Math.floor(Math.random() * 18) + 10;
  ghurHoS(ghur);
  ghurXp(4);
  ghurScore(8);
  yIchelLog(mugh(`nob chen: +${ghur} HoS`, `Supply restored: +${ghur} power`));
  qon();
}

function qejaghQIp() {
  if (!veStaH()) {
    return;
  }

  if (SamjaghArrivalScale(waS, Date.now()) < 0.5) {
    return;
  }

  if (waS.jaghBaH_taH) {
    return;
  }

  const aliveEnemies = Array.isArray(waS.jaghmey)
    ? waS.jaghmey.filter((jagh) => jagh.HoS > 0)
    : [];
  const aliveCount = aliveEnemies.length;
  if (aliveCount === 0) {
    return;
  }

  const fireChance = Math.min(0.92, 0.22 + waS.wav * 0.055 + Math.max(0, aliveCount - 1) * 0.08);
  if (Math.random() > fireChance) {
    return;
  }

  const now = Date.now();
  const dive = waS.jaghDive > now;
  let motlh = dive ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 4) + 3;
  const shooters = Array.isArray(waS.jaghmey)
    ? waS.jaghmey
      .filter((jagh) => jagh.HoS > 0)
      .map((jagh) => ({
        x: 50 + jagh.x * 0.95,
        y: jagh.y,
        aimBias: Math.abs(jagh.y - waS.maHPosY),
        shotMul: Math.max(1, Number(jagh.shotMul ?? 1)),
        beamColor: String(jagh.beamColor ?? "red")
      }))
    : [];
  if (shooters.length === 0) {
    return;
  }
  const sortedShooters = shooters.slice().sort((a, b) => a.aimBias - b.aimBias);
  const topShooters = Math.min(3, sortedShooters.length);
  const pick = sortedShooters[Math.floor(Math.random() * topShooters)];
  const damageMul = Math.max(1, Number(pick.shotMul ?? 1));
  motlh = Math.floor(motlh * damageMul);

  waS.jaghBaH_taH = true;
  waS.jaghBaH_tagh = now;
  waS.jaghBaH_len = Math.max(220, 520 - waS.wav * 22 - Math.max(0, aliveCount - 1) * 25);
  waS.jaghBaHPosX = pick.x;
  waS.jaghBaHPosY = pick.y;
  waS.jaghBaH_qawH = motlh;
  waS.jaghBaH_color = pick.beamColor === "purple" ? "purple" : "red";
  waS.jaghBaHDive = dive;

  yIchelLog(mugh(`jagh qIp: QaytaH -${motlh}`, `Enemy shot in flight: -${motlh}`));

  qon();
}

function qechmeydan() {
  try {
    yIchIDmaHBaHmey();
    qeqQIpmey();
  } catch {
    waS.maHBaHmey = [];
    waS.maHBaH_taH = false;
    waS.jaghBaH_taH = false;
  }

  if (waS.HoS < 100) {
    ghurHoS(0.03);
  }

  if (waS.taH !== "fight") {
    return;
  }

  const now = Date.now();
  const enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  const fieldW = Math.max(1, daq.meydan.clientWidth || Math.floor(daq.meydan.getBoundingClientRect().width));
  const fieldH = Math.max(1, daq.meydan.clientHeight || Math.floor(daq.meydan.getBoundingClientRect().height));

  if (waS.roundState === "wait") {
    const waitStart = waS.roundWaitUntil - 3000;
    if (now >= waitStart) {
      const tCount = Math.max(0, Math.min(1, (now - waitStart) / 3000));
      enemies.forEach((jagh, mI) => {
        if (jagh.HoS <= 0) {
          return;
        }

        const xTarget = Math.max(4, Math.min(46, Number(jagh.targetX ?? 36 - mI * 5)));
        const yTarget = Math.max(-42, Math.min(42, Number(jagh.targetY ?? (mI - ((enemies.length - 1) / 2)) * 14)));
        const targetXPct = 50 + xTarget * 0.95;
        const targetYPct = 50 + yTarget * 0.95;
        const targetXPx = fieldW * (targetXPct / 100);
        const targetYPx = fieldH * (targetYPct / 100);
        const spawnXPx = targetXPx + 100;
        const spawnYPx = targetYPx - 100;
        const xStart = ((spawnXPx / fieldW) * 100 - 50) / 0.95;
        const yStart = ((spawnYPx / fieldH) * 100 - 50) / 0.95;

        const phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
        const phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
        const ampX = Math.max(4, Math.min(14, Number(jagh.motionAmpX ?? 8)));
        const ampY = Math.max(6, Math.min(18, Number(jagh.motionAmpY ?? 12)));
        const rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
        const rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
        const xOsc = Math.cos(now / rateX + phaseX) * ampX + Math.sin(now / (rateX * 0.56) + phaseY * 0.7) * (ampX * 0.35);
        const yOsc = Math.sin(now / rateY + phaseY) * ampY + Math.cos(now / (rateY * 0.62) + phaseX * 0.8) * (ampY * 0.3);
        const xWave = Math.max(4, Math.min(46, xTarget + xOsc));
        const yWave = Math.max(-42, Math.min(42, yTarget + yOsc));
        const xDesired = xStart + (xWave - xStart) * tCount;
        const yDesired = yStart + (yWave - yStart) * tCount;
        jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.11 : xDesired;
        jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.11 : yDesired;
      });
    }

    if (now >= waS.roundWaitUntil) {
      waS.roundState = "intro";
      waS.roundIntroStart = now;
    }
    return;
  }

  if (waS.roundState === "intro") {
    const introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));

    enemies.forEach((jagh, mI) => {
      if (jagh.HoS <= 0) {
        return;
      }

      const xTarget = Math.max(4, Math.min(46, Number(jagh.targetX ?? 36 - mI * 5)));
      const yTarget = Math.max(-42, Math.min(42, Number(jagh.targetY ?? (mI - ((enemies.length - 1) / 2)) * 14)));
      const phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
      const phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
      const ampX = Math.max(8, Math.min(22, Number(jagh.motionAmpX ?? 8) * 1.7));
      const ampY = Math.max(20, Math.min(44, Number(jagh.motionAmpY ?? 12) * 2.4));
      const rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
      const rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
      const xWave = 27
        + Math.cos(now / (rateX * 0.95) + phaseX) * ampX
        + Math.sin(now / (rateX * 0.53) + phaseY * 0.8) * (ampX * 0.28);
      const yWave = Math.sin(now / (rateY * 0.92) + phaseY) * ampY
        + Math.cos(now / (rateY * 0.58) + phaseX * 0.75) * (ampY * 0.24);
      const xDesired = Math.max(4, Math.min(46, (xTarget * 0.45) + (xWave * 0.55)));
      const yDesired = Math.max(-42, Math.min(42, (yTarget * 0.4) + (yWave * 0.6)));
      jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.16 : xDesired;
      jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.16 : yDesired;
    });

    if (now - waS.roundIntroStart >= introLen) {
      waS.roundState = "fight";
      waS.roundIntroStart = 0;
    }
    return;
  }

  if (Math.random() < 0.018 + waS.wav * 0.002) {
    choHjaghDive(now + 1200);
    yIchelLog(mugh("jagh yItlhuH!", "Enemy dive attack!"));
  }

  enemies.forEach((jagh, mI) => {
    if (jagh.HoS <= 0) {
      return;
    }

    const diveLead = waS.jaghDive > now && mI === 0;
    let xDesired = jagh.x;
    let yDesired = jagh.y;
    if (diveLead) {
      const pIn = Math.sin(now / 150 + mI * 0.4) * 6;
      xDesired = Math.max(4, Math.min(46, waS.maHPos + 16 + Math.sin(now / 210 + mI * 0.7) * 4));
      yDesired = Math.max(-42, Math.min(42, waS.maHPosY + pIn));
    } else {
      const phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
      const phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
      const ampX = Math.max(8, Math.min(22, Number(jagh.motionAmpX ?? 8) * 1.7));
      const ampY = Math.max(20, Math.min(44, Number(jagh.motionAmpY ?? 12) * 2.4));
      const rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
      const rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
      const xWave = 27
        + Math.cos(now / (rateX * 0.95) + phaseX) * ampX
        + Math.sin(now / (rateX * 0.53) + phaseY * 0.8) * (ampX * 0.28);
      const yWave = Math.sin(now / (rateY * 0.92) + phaseY) * ampY
        + Math.cos(now / (rateY * 0.58) + phaseX * 0.75) * (ampY * 0.24);
      xDesired = Math.max(4, Math.min(46, xWave));
      yDesired = Math.max(-42, Math.min(42, yWave));
    }

    jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.14 : xDesired;
    jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.14 : yDesired;
  });
}

function yIra__Key() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "v" || event.key === "V") {
      yIrInSystemCheck(true);
      qon();
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      if (waS.taH !== "fight") {
        if (waS.taH === "lose") {
          return;
        }
        yItaghqa();
        return;
      }
      qeqIp();
      return;
    }

    if (event.key === "r" || event.key === "R") {
      if (waS.taH === "lose") {
        return;
      }
      yItaghqa();
    }
  });
}

function yIra__mouse() {
  daq.meydan.addEventListener("mouseenter", () => {
    daq.meydan.style.cursor = "none";
  });

  daq.meydan.addEventListener("mouseleave", () => {
    daq.meydan.style.cursor = "crosshair";
  });

  daq.meydan.addEventListener("pointerenter", () => {
    daq.meydan.style.cursor = "none";
  });

  daq.meydan.addEventListener("pointerleave", () => {
    daq.meydan.style.cursor = "crosshair";
  });

  daq.meydan.addEventListener("mousemove", (event) => {
    if (waS.taH === "lose") {
      return;
    }
    const rect = daq.meydan.getBoundingClientRect();
    const posX = ((event.clientX - rect.left) / rect.width) * 100 - 50;
    const pos = ((event.clientY - rect.top) / rect.height) * 100 - 50;
    const targetX = Math.max(-46, Math.min(46, posX));
    const target = Math.max(-42, Math.min(42, pos));
    choHmaHPos(targetX - waS.maHPos);
    choHmaHPosY(target - waS.maHPosY);
  });

  daq.meydan.addEventListener("pointermove", (event) => {
    if (waS.taH === "lose") {
      return;
    }
    const rect = daq.meydan.getBoundingClientRect();
    const posX = ((event.clientX - rect.left) / rect.width) * 100 - 50;
    const pos = ((event.clientY - rect.top) / rect.height) * 100 - 50;
    const targetX = Math.max(-46, Math.min(46, posX));
    const target = Math.max(-42, Math.min(42, pos));
    choHmaHPos(targetX - waS.maHPos);
    choHmaHPosY(target - waS.maHPosY);
  });

  daq.meydan.addEventListener("click", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        return;
      }
      yItaghqa();
      return;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("pointerdown", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        return;
      }
      yItaghqa();
      return;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("mousedown", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        return;
      }
      yItaghqa();
      return;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    qenob();
  });
}

function yIchelDe() {
  const De_data = yIlaDDe();
  if (De_data) {
    yISeHDe(De_data);
    Hol = De_data.Hol === "en" ? "en" : "tlh";
    qIj = De_data.qIj === true;
    if (qIj) {
      document.body.classList.add("qIj");
    } else {
      document.body.classList.remove("qIj");
    }
    choHjaghDive(0);
    return;
  }

  resetwaS();
  choHjaghDive(0);
}

function yIqengLoop(ts) {
  const nowTs = Number(ts ?? 0);
  if (!Number.isFinite(nowTs) || nowTs <= 0) {
    nowTs = Date.now();
  }

  if (loopLast <= 0) {
    loopLast = nowTs;
  }

  const dt = Math.max(0, Math.min(120, nowTs - loopLast));
  loopLast = nowTs;
  loopAccum = Math.min(250, loopAccum + dt);

  while (loopAccum >= LOOP_STEP) {
    try {
      yISeHroundFlow(Date.now());
    } catch {}

    try {
      qechmeydan();
    } catch {
      waS.maHBaHmey = [];
      waS.maHBaH_taH = false;
      waS.jaghBaH_taH = false;
    }

    loopAccum = loopAccum - LOOP_STEP;
  }

  if (integrityLast <= 0 || Date.now() - integrityLast >= 1000) {
    yIrInSystemCheck(false);
    integrityLast = Date.now();
  }

  try {
    qon();
  } catch {}

  requestAnimationFrame(yIqengLoop);
}

if (!teH(daq)) {
  console.error("Daq Sambe': war room DOM incomplete");
} else {
  yISeHmuzik();
  yIchelDe();
  yISeHCanvasMode(daq, true);
  yIchelLog("Renderer: canvas");
  yISeHpageParallax();
  yISeHstars();
  yIra__Key();
  yIra__mouse();

  daq.ra_wI_hol.addEventListener("click", () => {
    if (Hol === "tlh") {
      Hol = "en";
      yIchelLog("Hol choHlu': English");
    } else {
      Hol = "tlh";
      yIchelLog("Hol choHlu': tlhIngan Hol");
    }

    qon();
  });

  requestAnimationFrame(yIqengLoop);

  setInterval(() => {
    qejaghQIp();
  }, 250);

  yIchelLog(mugh("yo' raQ wa'DIch Qapta'.", "War Room initialized."));
  yIrInSystemCheck(true);
  if (typeof window !== "undefined") {
    window.wrCheck = () => yIrInSystemCheck(true);
  }
  qon();
}
