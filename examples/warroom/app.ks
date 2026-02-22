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

maH daq = SamDaq();
vIt Hol = "tlh";
vIt qIj = ghobe;
vIt gameOverArmedAt = 0;
vIt gameOverShown = ghobe;
vIt musicReady = ghobe;
vIt musicTracks = [];
vIt musicIndex = 0;
vIt musicVolume = 0.55;
vIt musicPlaying = ghobe;
vIt musicAudio = pagh;
vIt starLayers = [];
vIt starSpeedMul = 1;
vIt starSpeedLast = 0;
vIt saveLast = 0;
vIt loopLast = 0;
vIt loopAccum = 0;
maH LOOP_STEP = 33;
vIt integrityLast = 0;
vIt integrityStatus = "UNKNOWN";

pat teH(daq) {
  Qap (
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

pat mugh(tlh, en) {
  if (Hol === "en") {
    Qap en;
  }

  Qap tlh;
}

pat veStaH() {
  Qap waS.taH === "fight" && waS.roundState === "fight";
}

pat yIqonSave(now = Date.now(), force = ghobe) {
  if (!force && now - saveLast < 2000) {
    Qap;
  }
  saveLast = now;
  yIqonDe(Hol, qIj);
}

pat yIghoSmusicUI() {
  if (!daq.meydan) {
    Qap pagh;
  }

  if (daq.musicWrap) {
    Qap daq.musicWrap;
  }

  maH shell = daq.meydan.parentElement && daq.meydan.parentElement.parentElement;
  if (!shell) {
    Qap pagh;
  }

  maH wrap = document.createElement("div");
  wrap.id = "wr_music_controls_generated";
  wrap.style.display = "flex";
  wrap.style.alignItems = "center";
  wrap.style.justifyContent = "center";
  wrap.style.gap = "8px";
  wrap.style.margin = "0 0 8px 0";
  wrap.style.flexWrap = "wrap";

  maH makeBtn = (text) => {
    maH b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.style.padding = "0.45rem 0.7rem";
    b.style.fontSize = "0.88rem";
    Qap b;
  };

  maH prevBtn = makeBtn("⏮");
  maH playBtn = makeBtn("▶");
  maH nextBtn = makeBtn("⏭");
  maH volDownBtn = makeBtn("Vol-");
  maH volUpBtn = makeBtn("Vol+");
  maH label = document.createElement("div");
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

  Qap wrap;
}

pat yIrenderMusicLabel() {
  if (!daq.musicLabel) {
    Qap;
  }

  if (!Array.isArray(musicTracks) || musicTracks.length === 0) {
    daq.musicLabel.textContent = "Music: no tracks";
    if (daq.musicPlayBtn) {
      daq.musicPlayBtn.textContent = "▶";
      daq.musicPlayBtn.disabled = HIja;
    }
    Qap;
  }

  maH now = musicTracks[Math.max(0, Math.min(musicTracks.length - 1, musicIndex))];
  maH shortName = now.split("/").pop();
  daq.musicLabel.textContent = `Music: ${shortName}`;
  if (daq.musicPlayBtn) {
    daq.musicPlayBtn.textContent = musicPlaying ? "⏸" : "▶";
    daq.musicPlayBtn.disabled = ghobe;
  }
}

pat yIchoHvolume(delta) {
  musicVolume = Math.max(0, Math.min(1, musicVolume + delta));
  if (musicAudio) {
    musicAudio.volume = musicVolume;
  }
}

pat yIchoHmuzik(step) {
  if (!Array.isArray(musicTracks) || musicTracks.length === 0 || !musicAudio) {
    Qap;
  }

  musicIndex = (musicIndex + step + musicTracks.length) % musicTracks.length;
  musicAudio.src = `./warroom/music/${musicTracks[musicIndex]}`;
  if (musicPlaying) {
    musicAudio.play().catch(() => {
      musicPlaying = ghobe;
      yIrenderMusicLabel();
    });
  }
  yIrenderMusicLabel();
}

pat yItogglemuzik() {
  if (!musicAudio || !Array.isArray(musicTracks) || musicTracks.length === 0) {
    Qap;
  }

  if (musicPlaying) {
    musicAudio.pause();
    musicPlaying = ghobe;
    yIrenderMusicLabel();
    Qap;
  }

  musicAudio.play().then(() => {
    musicPlaying = HIja;
    yIrenderMusicLabel();
  }).catch(() => {
    musicPlaying = ghobe;
    yIrenderMusicLabel();
  });
}

pat yISeHmuzik() {
  if (musicReady) {
    Qap;
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
      musicReady = HIja;
    })
    .catch(() => {
      musicTracks = [];
      yIrenderMusicLabel();
      musicReady = HIja;
    });
}

pat yIghoSgameOverUI() {
  if (!daq.meydan) {
    Qap pagh;
  }

  if (!daq.gameOverWrap) {
    maH wrap = document.createElement("div");
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

    maH title = document.createElement("div");
    title.textContent = "Game Over";
    title.style.fontSize = "2.4rem";
    title.style.fontWeight = "900";
    title.style.letterSpacing = "0.06em";
    title.style.textTransform = "uppercase";
    title.style.color = "#fda4af";
    title.style.textShadow = "0 0 14px rgba(244,63,94,.6)";

    maH btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Replay";
    btn.style.fontSize = "1.05rem";
    btn.style.padding = "0.7rem 1.1rem";
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (Date.now() < gameOverArmedAt || btn.disabled) {
        Qap;
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

  Qap daq.gameOverWrap;
}

pat qonGameOverUI() {
  maH wrap = yIghoSgameOverUI();
  if (!wrap) {
    Qap;
  }

  if (waS.taH === "lose") {
    if (!gameOverShown) {
      gameOverArmedAt = Date.now() + 450;
      gameOverShown = HIja;
    }
    daq.gameOverTitle.textContent = Hol === "en" ? "Game Over" : "Qapbe'";
    daq.gameOverBtn.textContent = Hol === "en" ? "Replay" : "taghqa'";
    daq.gameOverBtn.disabled = Date.now() < gameOverArmedAt;
    daq.meydan.style.cursor = "auto";
    wrap.style.display = "flex";
  } else {
    gameOverShown = ghobe;
    gameOverArmedAt = 0;
    daq.gameOverBtn.disabled = ghobe;
    daq.meydan.style.cursor = "none";
    wrap.style.display = "none";
  }
}

pat yISeHstars() {
  maH stars = daq.meydan.querySelectorAll(".stars");
  starLayers = [];
  stars.forEach((star) => {
    if (star.classList.contains("whizz")) {
      star.style.display = "none";
      Qap;
    }

    pat yISeH() {
      star.style.setProperty("--y1", `${Math.floor(Math.random() * 240) - 120}px`);
      star.style.setProperty("--y2", `${Math.floor(Math.random() * 240) - 120}px`);
      star.style.setProperty("--y3", `${Math.floor(Math.random() * 240) - 120}px`);
    }

    pat yISeHwhizz() {
      star.style.setProperty("--wy1", `${Math.floor(Math.random() * 180) - 90}px`);
      star.style.setProperty("--wy2", `${Math.floor(Math.random() * 180) - 90}px`);
      maH hueA = Math.floor(Math.random() * 45) + 195;
      maH hueB = Math.floor(Math.random() * 45) + 15;
      maH alphaA = (0.72 + (Math.random() * 0.26)).toFixed(2);
      maH alphaB = (0.62 + (Math.random() * 0.3)).toFixed(2);
      star.style.setProperty("--whizzA", `hsla(${hueA}, 95%, 90%, ${alphaA})`);
      star.style.setProperty("--whizzB", `hsla(${hueB}, 98%, 74%, ${alphaB})`);
    }

    yISeH();
    if (star.classList.contains("whizz")) {
      yISeHwhizz();
      star.addEventListener("animationiteration", yISeHwhizz);
    }

    maH css = window.getComputedStyle(star);
    maH baseDur = Math.max(0.2, parseFloat(css.animationDuration) || 10);
    maH baseOpacity = Math.max(0, Math.min(1, parseFloat(css.opacity) || 1));
    starLayers.push({ star, baseDur, baseOpacity, anim: pagh, hidden: ghobe });
  });
}

pat yISeHpageParallax() {
  if (document.getElementById("wr_page_parallax_generated")) {
    Qap;
  }

  if (!document.getElementById("wr_page_parallax_style_generated")) {
    maH styleEl = document.createElement("style");
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

  maH layer = document.createElement("div");
  layer.id = "wr_page_parallax_generated";
  layer.className = "wrPageParallaxGen";
  document.body.prepend(layer);
}

pat yIqonStarSpeed() {
  if (!Array.isArray(starLayers) || starLayers.length === 0) {
    Qap;
  }

  maH normalMul = 2;
  maH clearMul = normalMul * 8;
  vIt target = normalMul;
  maH now = Date.now();
  maH clearUntil = Number(waS.roundClearUntil ?? 0);

  if (Number.isFinite(clearUntil) && now < clearUntil) {
    target = clearMul;
  } else if (waS.taH === "fight" && waS.roundState === "wait") {
    maH waitUntil = Number(waS.roundWaitUntil ?? 0);
    maH waitStart = waitUntil - 3000;
    vIt t = 1;
    if (Number.isFinite(waitUntil) && Number.isFinite(waitStart) && waitUntil > waitStart) {
      t = Math.max(0, Math.min(1, (now - waitStart) / (waitUntil - waitStart)));
    }

    maH eased = t * t * (3 - 2 * t);
    target = clearMul + (normalMul - clearMul) * eased;
  }

  maH dt = starSpeedLast > 0 ? Math.max(1, now - starSpeedLast) : 33;
  starSpeedLast = now;
  maH blend = 1 - Math.exp(-dt / 220);
  starSpeedMul = starSpeedMul + (target - starSpeedMul) * blend;

  if (Math.abs(target - starSpeedMul) < 0.01) {
    starSpeedMul = target;
  }

  starLayers.forEach((layer) => {
    if (!layer.anim && typeof layer.star.getAnimations === "function") {
      maH anims = layer.star.getAnimations();
      if (Array.isArray(anims) && anims.length > 0) {
        layer.anim = anims[0];
      }
    }

    if (layer.anim && typeof layer.anim.playbackRate === "number") {
      layer.anim.playbackRate = starSpeedMul;
    } else {
      maH dur = Math.max(0.2, layer.baseDur / starSpeedMul);
      layer.star.style.animationDuration = `${dur}s`;
    }
  });
}

pat yISeHroundFlow(now = Date.now()) {
  if (waS.taH !== "fight") {
    Qap;
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
    Qap;
  }

  if (waS.roundState === "intro") {
    maH introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));
    if (!Number.isFinite(waS.roundIntroStart) || waS.roundIntroStart <= 0) {
      waS.roundIntroStart = now;
    }
    if (now - waS.roundIntroStart >= introLen) {
      waS.roundState = "fight";
      waS.roundIntroStart = 0;
    }
  }
}

pat yIrInSystemCheck(report = ghobe) {
  maH now = Date.now();
  maH errors = [];
  maH warns = [];

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

  maH scale = SamjaghArrivalScale(waS, now);
  if (!Number.isFinite(scale) || scale < 0 || scale > 1.2) {
    errors.push("bad arrival scale");
  }

  if (scale < 0.5 && waS.jaghBaH_taH === HIja) {
    errors.push("early enemy fire");
    waS.jaghBaH_taH = ghobe;
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
    vIt msg = `[SYS ${integrityStatus}] err:${errors.length} warn:${warns.length}`;
    if (errors.length > 0) {
      msg = `${msg} | ${errors.join(", ")}`;
    } else if (warns.length > 0) {
      msg = `${msg} | ${warns.join(", ")}`;
    }
    yIchelLog(msg);
  }

  Qap { pass: errors.length === 0, errors, warns };
}

pat qon() {
  maH muQoq = "";
  yIqonStarSpeed();
  qonHol(daq, Hol);
  qonwaS(daq, waS, muQoq, Hol);
  qonGameOverUI();
  yIqonSave(Date.now());
}

pat yIchIDmaHBaHmey() {
  maH now = Date.now();
  if (!Array.isArray(waS.maHBaHmey)) {
    waS.maHBaHmey = [];
  }
  waS.maHBaHmey = waS.maHBaHmey.filter((baH) => Number.isFinite(baH.tagh) && Number.isFinite(baH.len) && now - baH.tagh < baH.len);
  waS.maHBaH_taH = waS.maHBaHmey.length > 0;

  if (waS.maHBaH_taH) {
    maH nIteb = waS.maHBaHmey[waS.maHBaHmey.length - 1];
    waS.maHBaH_tagh = nIteb.tagh;
    waS.maHBaH_len = nIteb.len;
    waS.maHBaHPosX = nIteb.posX;
    waS.maHBaHPosY = nIteb.posY;
  }
}

pat qeqQIpmey() {
  if (!veStaH()) {
    Qap;
  }

  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  maH now = Date.now();
  maH prevNow = now - 40;
  maH fieldW = Math.max(1, daq.meydan.clientWidth || Math.floor(daq.meydan.getBoundingClientRect().width));
  maH fieldH = Math.max(1, daq.meydan.clientHeight);
  maH beamLen = 100;
  maH hitRadiusX = 28;
  maH hitRadiusY = 28;

  maH qel = [];
  vIt mI = 0;
  loQ (mI < waS.maHBaHmey.length) {
    maH baH = waS.maHBaHmey[mI];
    maH len = Math.max(50, Number(baH.len ?? 520));
    maH t = Math.max(0, Math.min(1, (now - baH.tagh) / len));
    maH tPrev = Math.max(0, Math.min(1, (prevNow - baH.tagh) / len));
    maH shotLeftPct = 50 + Number(baH.posX ?? 0) * 0.95;
    maH tipPx = fieldW * ((shotLeftPct + 3) / 100);
    vIt beamTravel = Math.max(0, fieldW - tipPx - beamLen);
    maH travelFloor = Math.max(fieldW * 0.72, 280);
    beamTravel = Math.max(beamTravel, travelFloor);
    maH beamLeft = tipPx + beamTravel * t;
    maH beamRight = beamLeft + beamLen;
    maH beamLeftPrev = tipPx + beamTravel * tPrev;
    maH beamRightPrev = beamLeftPrev + beamLen;
    maH beamSweepLeft = Math.min(beamLeft, beamLeftPrev);
    maH beamSweepRight = Math.max(beamRight, beamRightPrev);
    maH beamYPct = 50 + Number(baH.posY ?? 0) * 0.95;
    maH beamYPx = fieldH * (beamYPct / 100);

    vIt hitIndex = -1;
    vIt hitYPct = 50;
    vIt hitXPct = 80;
    vIt bestNihPx = 999;
    vIt eI = 0;
    loQ (eI < enemies.length) {
      maH jagh = enemies[eI];
      if (jagh.HoS > 0) {
        maH enemyXPct = 50 + jagh.x * 0.95;
        maH enemyYPct = 50 + jagh.y * 0.95;
        maH enemyXPx = fieldW * (enemyXPct / 100);
        maH enemyYPx = fieldH * (enemyYPct / 100);
        maH enemyRadiusX = jagh.boss === HIja ? 44 : hitRadiusX;
        maH enemyRadiusY = jagh.boss === HIja ? 40 : hitRadiusY;
        maH nIHpx = Math.abs(beamYPx - enemyYPx);
        maH xHit = enemyXPx + enemyRadiusX >= beamSweepLeft && enemyXPx - enemyRadiusX <= beamSweepRight;
        maH yHit = nIHpx <= enemyRadiusY;
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
      vIt qawH = Number(baH.qawH ?? 0);
      maH crit = baH.crit === HIja;
      if (bestNihPx < 14) {
        qawH = qawH + 6;
      }

      maH target = enemies[hitIndex];
      target.HoS = Math.max(0, target.HoS - qawH);
      waS.jaghHoS_max = enemies.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
      waS.jaghHoS = enemies.reduce((sum, jagh) => sum + jagh.HoS, 0);
      maH xpGain = 6 + (crit ? 6 : 0);
      maH pointsGain = crit ? 36 : 18;
      vangQIpViz(daq, pointsGain, crit, hitXPct, hitYPct - 4);
      ghurXp(xpGain);
      ghurScore(pointsGain);
      yIchelLog(mugh(
        `qIp ta': ${baH.qIp} | jagh HoS -${qawH}${crit ? " (nIv)" : ""}`,
        `Strike ${baH.qIp} | Enemy power -${qawH}${crit ? " (critical)" : ""}`
      ));

      maH waveClear = enemies.length > 0 && enemies.every((jagh) => jagh.HoS <= 0);
      if (waveClear) {
        maH De_result = peghwav();
        if (De_result === "win") {
          ghurScore(120);
          yIchelLog(mugh("Qapchu'! jaghmey DatIvta'.", "Victory! You defeated every wave."));
        } else {
          maH nowClear = Date.now();
          maH clearLen = 2000;
          maH clearFadeLen = 350;
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
    maH eTagh = Number(waS.jaghBaH_tagh);
    maH eLenRaw = Number(waS.jaghBaH_len);
    maH eLen = Math.max(120, Number.isFinite(eLenRaw) ? eLenRaw : 520);
    if (!Number.isFinite(eTagh) || now - eTagh > eLen + 80) {
      waS.jaghBaH_taH = ghobe;
      Qap;
    }
    maH eT = Math.max(0, Math.min(1, (now - eTagh) / eLen));
    maH eTPrev = Math.max(0, Math.min(1, (prevNow - eTagh) / eLen));
    maH eTipPx = fieldW * ((waS.jaghBaHPosX - 3) / 100);
    maH eStart = eTipPx - beamLen;
    maH eTravel = Math.max(0, eTipPx);
    maH eLeft = eStart - eTravel * eT;
    maH eRight = eLeft + beamLen;
    maH eLeftPrev = eStart - eTravel * eTPrev;
    maH eRightPrev = eLeftPrev + beamLen;
    maH eSweepLeft = Math.min(eLeft, eLeftPrev);
    maH eSweepRight = Math.max(eRight, eRightPrev);
    maH playerXPct = 50 + waS.maHPos * 0.95;
    maH playerYPct = 50 + waS.maHPosY * 0.95;
    maH playerXPx = fieldW * (playerXPct / 100);
    maH playerYPx = fieldH * (playerYPct / 100);
    maH enemyBeamYPct = 50 + waS.jaghBaHPosY * 0.95;
    maH enemyBeamYPx = fieldH * (enemyBeamYPct / 100);
    maH xHitPlayer = playerXPx + 24 >= eSweepLeft && playerXPx - 24 <= eSweepRight;
    maH yHitPlayer = Math.abs(playerYPx - enemyBeamYPx) <= 28;

    if (xHitPlayer && yHitPlayer) {
      maH motlh = Math.max(0, Number(waS.jaghBaH_qawH ?? 0));
      ghurHoS(-motlh);
      if (waS.jaghBaHDive === HIja) {
        ghurYIn(-1);
      }
      vangjaghViz(daq, motlh, playerXPct, playerYPct - 4);
      yIchelLog(mugh(`jagh qIp: -${motlh} HoS`, `Enemy hit: -${motlh} power`));
      waS.jaghBaH_taH = ghobe;

      if (waS.taH === "lose") {
        yIchelLog(mugh("luj. HoS pagh. taghqa'meH r yIghItlh.", "You lost. Shields are at 0. Press R to play again."));
      }
    } else if (eT >= 1) {
      waS.jaghBaH_taH = ghobe;
    }
  }
}

pat yItaghqa() {
  resetwaS();
  waS.HoS = 100;
  waS.yIn = 5;
  choHjaghDive(0);
  yIchelLog(mugh("wa'maH wa' taghqa'.", "Campaign restarted."));
  qon();
}

pat qeqIp() {
  maH now = Date.now();
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
    Qap;
  }

  if (now < waS.qam) {
    yIchelLog(mugh("qatlh yIloS: qam taH", "Weapons cooling down"));
    qon();
    Qap;
  }

  if (waS.maHBaHmey.length >= waS.maHBaH_max) {
    yIchelLog(mugh("maHBaHmey law'qu'. yIloS.", "Too many shots in flight. Hold."));
    qon();
    Qap;
  }

  if (waS.HoS < 2) {
    yIchelLog(mugh("HoS ngeb. cha' HoS yIpoQ qIpmeH.", "Not enough energy. Need 2 power to fire."));
    qon();
    Qap;
  }

  ghurHoS(-2);

  waS.maHBaHmey.push({
    tagh: now,
    len: 520,
    posX: waS.maHPos,
    posY: waS.maHPosY,
    qIp: ghurQIp(),
    qawH: 0,
    crit: ghobe
  });
  waS.maHBaH_taH = HIja;
  waS.maHBaH_tagh = now;
  waS.maHBaH_len = 520;
  waS.maHBaHPosX = waS.maHPos;
  waS.maHBaHPosY = waS.maHPosY;

  waS.qam = now + waS.qam_len;
  vIt qawH = (Math.floor(Math.random() * 9) + 10) * 2;
  maH crit = Math.random() < waS.qIp_crit;

  if (crit) {
    qawH = qawH + 24;
    ghurXp(12);
  }

  maH baH = waS.maHBaHmey[waS.maHBaHmey.length - 1];
  baH.qawH = qawH;
  baH.crit = crit;

  yIchelLog(mugh(
    `qIp ta': ${baH.qIp} | QaytaH`,
    `Strike ${baH.qIp} | in flight`
  ));

  qon();
}

pat qenob() {
  if (!veStaH()) {
    Qap;
  }

  if (!loQnob()) {
    maH jaq = Math.floor(Math.random() * 6) + 4;
    ghurHoS(jaq);
    ghurScore(-10);
    yIchelLog(mugh(
      `nob lIngbe'. Qul yIghoS: +${jaq} HoS, mI' -10`,
      `No supplies left. Emergency reroute: +${jaq} power, score -10`
    ));
    qon();
    Qap;
  }

  maH ghur = Math.floor(Math.random() * 18) + 10;
  ghurHoS(ghur);
  ghurXp(4);
  ghurScore(8);
  yIchelLog(mugh(`nob chen: +${ghur} HoS`, `Supply restored: +${ghur} power`));
  qon();
}

pat qejaghQIp() {
  if (!veStaH()) {
    Qap;
  }

  if (SamjaghArrivalScale(waS, Date.now()) < 0.5) {
    Qap;
  }

  if (waS.jaghBaH_taH) {
    Qap;
  }

  maH aliveEnemies = Array.isArray(waS.jaghmey)
    ? waS.jaghmey.filter((jagh) => jagh.HoS > 0)
    : [];
  maH aliveCount = aliveEnemies.length;
  if (aliveCount === 0) {
    Qap;
  }

  maH fireChance = Math.min(0.92, 0.22 + waS.wav * 0.055 + Math.max(0, aliveCount - 1) * 0.08);
  if (Math.random() > fireChance) {
    Qap;
  }

  maH now = Date.now();
  maH dive = waS.jaghDive > now;
  vIt motlh = dive ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 4) + 3;
  maH shooters = Array.isArray(waS.jaghmey)
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
    Qap;
  }
  maH sortedShooters = shooters.slice().sort((a, b) => a.aimBias - b.aimBias);
  maH topShooters = Math.min(3, sortedShooters.length);
  maH pick = sortedShooters[Math.floor(Math.random() * topShooters)];
  maH damageMul = Math.max(1, Number(pick.shotMul ?? 1));
  motlh = Math.floor(motlh * damageMul);

  waS.jaghBaH_taH = HIja;
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

pat qechmeydan() {
  try {
    yIchIDmaHBaHmey();
    qeqQIpmey();
  } catch {
    waS.maHBaHmey = [];
    waS.maHBaH_taH = ghobe;
    waS.jaghBaH_taH = ghobe;
  }

  if (waS.HoS < 100) {
    ghurHoS(0.03);
  }

  if (waS.taH !== "fight") {
    Qap;
  }

  maH now = Date.now();
  maH enemies = Array.isArray(waS.jaghmey) ? waS.jaghmey : [];
  maH fieldW = Math.max(1, daq.meydan.clientWidth || Math.floor(daq.meydan.getBoundingClientRect().width));
  maH fieldH = Math.max(1, daq.meydan.clientHeight || Math.floor(daq.meydan.getBoundingClientRect().height));

  if (waS.roundState === "wait") {
    maH waitStart = waS.roundWaitUntil - 3000;
    if (now >= waitStart) {
      maH tCount = Math.max(0, Math.min(1, (now - waitStart) / 3000));
      enemies.forEach((jagh, mI) => {
        if (jagh.HoS <= 0) {
          Qap;
        }

        maH xTarget = Math.max(4, Math.min(46, Number(jagh.targetX ?? 36 - mI * 5)));
        maH yTarget = Math.max(-42, Math.min(42, Number(jagh.targetY ?? (mI - ((enemies.length - 1) / 2)) * 14)));
        maH targetXPct = 50 + xTarget * 0.95;
        maH targetYPct = 50 + yTarget * 0.95;
        maH targetXPx = fieldW * (targetXPct / 100);
        maH targetYPx = fieldH * (targetYPct / 100);
        maH spawnXPx = targetXPx + 100;
        maH spawnYPx = targetYPx - 100;
        maH xStart = ((spawnXPx / fieldW) * 100 - 50) / 0.95;
        maH yStart = ((spawnYPx / fieldH) * 100 - 50) / 0.95;

        maH phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
        maH phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
        maH ampX = Math.max(4, Math.min(14, Number(jagh.motionAmpX ?? 8)));
        maH ampY = Math.max(6, Math.min(18, Number(jagh.motionAmpY ?? 12)));
        maH rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
        maH rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
        maH xOsc = Math.cos(now / rateX + phaseX) * ampX + Math.sin(now / (rateX * 0.56) + phaseY * 0.7) * (ampX * 0.35);
        maH yOsc = Math.sin(now / rateY + phaseY) * ampY + Math.cos(now / (rateY * 0.62) + phaseX * 0.8) * (ampY * 0.3);
        maH xWave = Math.max(4, Math.min(46, xTarget + xOsc));
        maH yWave = Math.max(-42, Math.min(42, yTarget + yOsc));
        maH xDesired = xStart + (xWave - xStart) * tCount;
        maH yDesired = yStart + (yWave - yStart) * tCount;
        jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.11 : xDesired;
        jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.11 : yDesired;
      });
    }

    if (now >= waS.roundWaitUntil) {
      waS.roundState = "intro";
      waS.roundIntroStart = now;
    }
    Qap;
  }

  if (waS.roundState === "intro") {
    maH introLen = Math.max(120, Number(waS.roundIntroLen ?? 760));

    enemies.forEach((jagh, mI) => {
      if (jagh.HoS <= 0) {
        Qap;
      }

      maH xTarget = Math.max(4, Math.min(46, Number(jagh.targetX ?? 36 - mI * 5)));
      maH yTarget = Math.max(-42, Math.min(42, Number(jagh.targetY ?? (mI - ((enemies.length - 1) / 2)) * 14)));
      maH phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
      maH phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
      maH ampX = Math.max(8, Math.min(22, Number(jagh.motionAmpX ?? 8) * 1.7));
      maH ampY = Math.max(20, Math.min(44, Number(jagh.motionAmpY ?? 12) * 2.4));
      maH rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
      maH rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
      maH xWave = 27
        + Math.cos(now / (rateX * 0.95) + phaseX) * ampX
        + Math.sin(now / (rateX * 0.53) + phaseY * 0.8) * (ampX * 0.28);
      maH yWave = Math.sin(now / (rateY * 0.92) + phaseY) * ampY
        + Math.cos(now / (rateY * 0.58) + phaseX * 0.75) * (ampY * 0.24);
      maH xDesired = Math.max(4, Math.min(46, (xTarget * 0.45) + (xWave * 0.55)));
      maH yDesired = Math.max(-42, Math.min(42, (yTarget * 0.4) + (yWave * 0.6)));
      jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.16 : xDesired;
      jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.16 : yDesired;
    });

    if (now - waS.roundIntroStart >= introLen) {
      waS.roundState = "fight";
      waS.roundIntroStart = 0;
    }
    Qap;
  }

  if (Math.random() < 0.018 + waS.wav * 0.002) {
    choHjaghDive(now + 1200);
    yIchelLog(mugh("jagh yItlhuH!", "Enemy dive attack!"));
  }

  enemies.forEach((jagh, mI) => {
    if (jagh.HoS <= 0) {
      Qap;
    }

    maH diveLead = waS.jaghDive > now && mI === 0;
    vIt xDesired = jagh.x;
    vIt yDesired = jagh.y;
    if (diveLead) {
      maH pIn = Math.sin(now / 150 + mI * 0.4) * 6;
      xDesired = Math.max(4, Math.min(46, waS.maHPos + 16 + Math.sin(now / 210 + mI * 0.7) * 4));
      yDesired = Math.max(-42, Math.min(42, waS.maHPosY + pIn));
    } else {
      maH phaseX = Number(jagh.motionPhaseX ?? (waS.wav * 0.33 + mI * 0.91));
      maH phaseY = Number(jagh.motionPhaseY ?? (waS.wav * 0.57 + mI * 1.27));
      maH ampX = Math.max(8, Math.min(22, Number(jagh.motionAmpX ?? 8) * 1.7));
      maH ampY = Math.max(20, Math.min(44, Number(jagh.motionAmpY ?? 12) * 2.4));
      maH rateX = Math.max(420, Number(jagh.motionRateX ?? (680 - waS.wav * 10)));
      maH rateY = Math.max(360, Number(jagh.motionRateY ?? (520 - waS.wav * 8)));
      maH xWave = 27
        + Math.cos(now / (rateX * 0.95) + phaseX) * ampX
        + Math.sin(now / (rateX * 0.53) + phaseY * 0.8) * (ampX * 0.28);
      maH yWave = Math.sin(now / (rateY * 0.92) + phaseY) * ampY
        + Math.cos(now / (rateY * 0.58) + phaseX * 0.75) * (ampY * 0.24);
      xDesired = Math.max(4, Math.min(46, xWave));
      yDesired = Math.max(-42, Math.min(42, yWave));
    }

    jagh.x = Number.isFinite(jagh.x) ? jagh.x + (xDesired - jagh.x) * 0.14 : xDesired;
    jagh.y = Number.isFinite(jagh.y) ? jagh.y + (yDesired - jagh.y) * 0.14 : yDesired;
  });
}

pat yIra'Key() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "v" || event.key === "V") {
      yIrInSystemCheck(HIja);
      qon();
      Qap;
    }

    if (event.key === " " || event.key === "Enter") {
      if (waS.taH !== "fight") {
        if (waS.taH === "lose") {
          Qap;
        }
        yItaghqa();
        Qap;
      }
      qeqIp();
      Qap;
    }

    if (event.key === "r" || event.key === "R") {
      if (waS.taH === "lose") {
        Qap;
      }
      yItaghqa();
    }
  });
}

pat yIra'mouse() {
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
      Qap;
    }
    maH rect = daq.meydan.getBoundingClientRect();
    maH posX = ((event.clientX - rect.left) / rect.width) * 100 - 50;
    maH pos = ((event.clientY - rect.top) / rect.height) * 100 - 50;
    maH targetX = Math.max(-46, Math.min(46, posX));
    maH target = Math.max(-42, Math.min(42, pos));
    choHmaHPos(targetX - waS.maHPos);
    choHmaHPosY(target - waS.maHPosY);
  });

  daq.meydan.addEventListener("pointermove", (event) => {
    if (waS.taH === "lose") {
      Qap;
    }
    maH rect = daq.meydan.getBoundingClientRect();
    maH posX = ((event.clientX - rect.left) / rect.width) * 100 - 50;
    maH pos = ((event.clientY - rect.top) / rect.height) * 100 - 50;
    maH targetX = Math.max(-46, Math.min(46, posX));
    maH target = Math.max(-42, Math.min(42, pos));
    choHmaHPos(targetX - waS.maHPos);
    choHmaHPosY(target - waS.maHPosY);
  });

  daq.meydan.addEventListener("click", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        Qap;
      }
      yItaghqa();
      Qap;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("pointerdown", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        Qap;
      }
      yItaghqa();
      Qap;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("mousedown", () => {
    if (waS.taH !== "fight") {
      if (waS.taH === "lose") {
        Qap;
      }
      yItaghqa();
      Qap;
    }
    qeqIp();
  });

  daq.meydan.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    qenob();
  });
}

pat yIchelDe() {
  maH De_data = yIlaDDe();
  if (De_data) {
    yISeHDe(De_data);
    Hol = De_data.Hol === "en" ? "en" : "tlh";
    qIj = De_data.qIj === HIja;
    if (qIj) {
      document.body.classList.add("qIj");
    } else {
      document.body.classList.remove("qIj");
    }
    choHjaghDive(0);
    Qap;
  }

  resetwaS();
  choHjaghDive(0);
}

pat yIqengLoop(ts) {
  maH nowTs = Number(ts ?? 0);
  if (!Number.isFinite(nowTs) || nowTs <= 0) {
    nowTs = Date.now();
  }

  if (loopLast <= 0) {
    loopLast = nowTs;
  }

  maH dt = Math.max(0, Math.min(120, nowTs - loopLast));
  loopLast = nowTs;
  loopAccum = Math.min(250, loopAccum + dt);

  loQ (loopAccum >= LOOP_STEP) {
    try {
      yISeHroundFlow(Date.now());
    } catch {}

    try {
      qechmeydan();
    } catch {
      waS.maHBaHmey = [];
      waS.maHBaH_taH = ghobe;
      waS.jaghBaH_taH = ghobe;
    }

    loopAccum = loopAccum - LOOP_STEP;
  }

  if (integrityLast <= 0 || Date.now() - integrityLast >= 1000) {
    yIrInSystemCheck(ghobe);
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
  yISeHCanvasMode(daq, HIja);
  yIchelLog("Renderer: canvas");
  yISeHpageParallax();
  yISeHstars();
  yIra'Key();
  yIra'mouse();

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
  yIrInSystemCheck(HIja);
  if (typeof window !== "undefined") {
    window.wrCheck = () => yIrInSystemCheck(HIja);
  }
  qon();
}
