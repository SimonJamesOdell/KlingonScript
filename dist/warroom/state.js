export const waS = {
  HoS: 65,
  qIp: 0,
  nob: 3,
  yIn: 3,
  mI_score: 0,
  maHPos: 0,
  maHPosY: 0,
  jaghPosX: 38,
  jaghPos: 0,
  jaghPosX2: 26,
  jaghPos2: -18,
  jaghDive: 0,
  maHBaH_taH: false,
  maHBaH_tagh: 0,
  maHBaH_len: 420,
  maHBaHPosX: 0,
  maHBaHPosY: 0,
  maHBaHmey: [],
  maHBaH_max: 5,
  jaghBaH_taH: false,
  jaghBaH_tagh: 0,
  jaghBaH_len: 520,
  jaghBaHPosX: 86,
  jaghBaHPosY: 0,
  jaghBaH_qawH: 0,
  jaghBaH_color: "red",
  jaghBaHDive: false,
  log: [],
  jaghHoS: 90,
  jaghHoS_max: 90,
  jaghHoS2: 0,
  jaghHoS2_max: 0,
  jaghmey: [
    {
      id: 1,
      x: 38,
      y: 0,
      targetX: 38,
      targetY: 0,
      HoS: 90,
      HoS_max: 90
    }
  ],
  wav: 1,
  wav_max: 11,
  mI_xp: 0,
  patlh: "negh",
  taH: "fight",
  roundState: "wait",
  roundWaitUntil: Date.now() + 3000,
  roundIntroStart: 0,
  roundIntroLen: 760,
  roundClearUntil: 0,
  qam: 0,
  qam_len: 110,
  qIp_crit: 0.25
};

export function SamjaghArrivalScale(waS, now = Date.now()) {
  const waitUntil = Number(waS.roundWaitUntil ?? 0);
  const introStart = Number(waS.roundIntroStart ?? 0);
  const anchor = Number.isFinite(waitUntil)
    ? waitUntil - 3000
    : (Number.isFinite(introStart) && introStart > 0 ? introStart - 3000 : now);
  const elapsed = Math.max(0, now - anchor);
  const delayedElapsed = Math.max(0, elapsed - 1000);
  const t = Math.max(0, Math.min(1, delayedElapsed / 2000));
  const baseScale = 0.012;
  const eased = Math.pow(t, 5.2);
  return baseScale + (1 - baseScale) * eased;
}

export function yIchenjaghmey(mI_count, yIghoS = false) {
  const bossWave = Number(mI_count ?? waS.wav) > 10;
  const count = bossWave ? 1 : Math.max(1, Math.min(10, Number(mI_count ?? 1)));
  const base = Math.max(45, Math.floor((75 + waS.wav * 22) * 0.78));
  waS.jaghmey = [];

  let mI = 0;
  while (mI < count) {
    const yBase = Math.max(-42, Math.min(42, (mI - (count - 1) / 2) * 14));
    const xBase = Math.max(4, Math.min(46, 36 - mI * 5));
    const xSpawn = Math.max(46, Math.min(58, 50 + mI * 1.6));
    const boss = bossWave === true;
    const hp = boss ? Math.max(240, Math.floor(base * 2.6)) : base;
    const motionPhaseX = Math.random() * Math.PI * 2;
    const motionPhaseY = Math.random() * Math.PI * 2;
    const motionAmpX = 6 + Math.random() * 6;
    const motionAmpY = 8 + Math.random() * 8;
    const motionRateX = 620 + Math.random() * 220;
    const motionRateY = 460 + Math.random() * 200;
    waS.jaghmey.push({
      id: mI + 1,
      x: xSpawn,
      y: yBase,
      spawnX: xSpawn,
      targetX: xBase,
      targetY: yBase,
      HoS: hp,
      HoS_max: hp,
      boss,
      shotMul: boss ? 2 : 1,
      beamColor: boss ? "purple" : "red",
      motionPhaseX,
      motionPhaseY,
      motionAmpX,
      motionAmpY,
      motionRateX,
      motionRateY
    });
    mI = mI + 1;
  }
}

export const muQoq = [
  "Qapla'!",
  "Heghlu'meH QaQ jajvam!",
  "jagh yIbuS. yIchargh!",
  "matlhHa'ghach yIHoH.",
  "batlh bIHeghjaj!"
];

export function SammuQoq() {
  const mI = Math.floor(Math.random() * muQoq.length);
  return muQoq[mI];
}

export function ghurHoS(nob) {
  waS.HoS = Math.max(0, Math.min(100, waS.HoS + nob));
  return waS.HoS;
}

export function ghurScore(mI) {
  waS.mI_score = Math.max(0, waS.mI_score + mI);
  return waS.mI_score;
}

export function ghurYIn(mI) {
  waS.yIn = Math.max(0, waS.yIn + mI);
  if (waS.yIn <= 0) {
    waS.taH = "lose";
  }

  return waS.yIn;
}

export function choHmaHPos(mI) {
  waS.maHPos = Math.max(-46, Math.min(46, waS.maHPos + mI));
  return waS.maHPos;
}

export function choHmaHPosY(mI) {
  waS.maHPosY = Math.max(-42, Math.min(42, waS.maHPosY + mI));
  return waS.maHPosY;
}

export function choHjaghPos(mI) {
  waS.jaghPos = Math.max(-46, Math.min(46, mI));
  return waS.jaghPos;
}

export function choHjaghPosX(mI) {
  waS.jaghPosX = Math.max(4, Math.min(46, mI));
  return waS.jaghPosX;
}

export function choHjaghPos2(mI) {
  waS.jaghPos2 = Math.max(-46, Math.min(46, mI));
  return waS.jaghPos2;
}

export function choHjaghPosX2(mI) {
  waS.jaghPosX2 = Math.max(4, Math.min(46, mI));
  return waS.jaghPosX2;
}

export function choHjaghDive(poH) {
  waS.jaghDive = poH;
  return waS.jaghDive;
}

export function ghurjaghHoS(nob) {
  waS.jaghHoS = Math.max(0, Math.min(waS.jaghHoS_max, waS.jaghHoS + nob));
  return waS.jaghHoS;
}

export function ghurjaghHoS2(nob) {
  waS.jaghHoS2 = Math.max(0, Math.min(waS.jaghHoS2_max, waS.jaghHoS2 + nob));
  return waS.jaghHoS2;
}

export function ghurQIp() {
  waS.qIp = waS.qIp + 1;
  return waS.qIp;
}

export function ghurXp(ghur) {
  waS.mI_xp = waS.mI_xp + ghur;

  if (waS.mI_xp >= 180) {
    waS.patlh = "la'";
  } else if (waS.mI_xp >= 120) {
    waS.patlh = "Sogh";
  } else if (waS.mI_xp >= 70) {
    waS.patlh = "lagh";
  } else if (waS.mI_xp >= 30) {
    waS.patlh = "wa'DIch";
  } else {
    waS.patlh = "negh";
  }

  return waS.mI_xp;
}

export function loQnob() {
  if (waS.nob <= 0) {
    return false;
  }

  waS.nob = waS.nob - 1;
  return true;
}

export function peghwav() {
  waS.wav = waS.wav + 1;

  if (waS.wav > waS.wav_max) {
    waS.taH = "win";
    waS.jaghHoS = 0;
    return "win";
  }

  waS.nob = Math.min(8, waS.nob + 1);
  waS.yIn = 5;
  waS.HoS = 100;
  yIchenjaghmey(waS.wav, true);
  waS.jaghHoS_max = waS.jaghmey.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  waS.jaghHoS = waS.jaghmey.reduce((sum, jagh) => sum + jagh.HoS, 0);
  waS.jaghHoS2_max = 0;
  waS.jaghHoS2 = 0;
  waS.maHBaHmey = [];
  waS.maHBaH_taH = false;
  waS.jaghBaH_taH = false;
  waS.jaghDive = 0;
  waS.roundState = "wait";
  waS.roundWaitUntil = Date.now() + 3000;
  waS.roundIntroStart = 0;
  waS.roundClearUntil = 0;
  return "next";
}

export function resetwaS() {
  waS.HoS = 65;
  waS.qIp = 0;
  waS.nob = 3;
  waS.yIn = 3;
  waS.mI_score = 0;
  waS.maHPos = 0;
  waS.maHPosY = 0;
  waS.jaghPosX = 38;
  waS.jaghPos = 0;
  waS.jaghPosX2 = 26;
  waS.jaghPos2 = -18;
  waS.jaghDive = 0;
  waS.maHBaH_taH = false;
  waS.maHBaH_tagh = 0;
  waS.maHBaH_len = 420;
  waS.maHBaHPosX = 0;
  waS.maHBaHPosY = 0;
  waS.maHBaHmey = [];
  waS.maHBaH_max = 5;
  waS.jaghBaH_taH = false;
  waS.jaghBaH_tagh = 0;
  waS.jaghBaH_len = 520;
  waS.jaghBaHPosX = 86;
  waS.jaghBaHPosY = 0;
  waS.jaghBaH_qawH = 0;
  waS.jaghBaH_color = "red";
  waS.jaghBaHDive = false;
  waS.log = [];
  waS.jaghHoS = 90;
  waS.jaghHoS_max = 90;
  waS.jaghHoS2 = 0;
  waS.jaghHoS2_max = 0;
  waS.jaghmey = [];
  waS.wav = 1;
  waS.wav_max = 11;
  waS.mI_xp = 0;
  waS.patlh = "negh";
  waS.taH = "fight";
  waS.roundState = "wait";
  waS.roundWaitUntil = Date.now() + 3000;
  waS.roundIntroStart = 0;
  waS.roundIntroLen = 760;
  waS.roundClearUntil = 0;
  waS.qam = 0;
  waS.qam_len = 110;
  waS.qIp_crit = 0.25;
  yIchenjaghmey(1);
}

export function yIchelLog(ghItlh) {
  waS.log.unshift({
    poH: new Date().toLocaleTimeString(),
    ghItlh
  });

  if (waS.log.length > 8) {
    waS.log.pop();
  }
}

export function yIqonDe(Hol, qIj) {
  localStorage.setItem("klingon-warroom-save", JSON.stringify({
    waS,
    Hol,
    qIj
  }));
}

export function yIlaDDe() {
  const raw = localStorage.getItem("klingon-warroom-save");
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function yISeHDe(De_data) {
  if (!De_data || !De_data.waS) {
    return false;
  }

  const m = De_data.waS;

  waS.HoS = Number(m.HoS ?? waS.HoS);
  waS.qIp = Number(m.qIp ?? waS.qIp);
  waS.nob = Number(m.nob ?? waS.nob);
  waS.yIn = Number(m.yIn ?? waS.yIn);
  waS.mI_score = Number(m.mI_score ?? waS.mI_score);
  waS.maHPos = Number(m.maHPos ?? waS.maHPos);
  waS.maHPosY = Number(m.maHPosY ?? waS.maHPosY);
  waS.jaghPosX = Number(m.jaghPosX ?? waS.jaghPosX);
  waS.jaghPos = Number(m.jaghPos ?? waS.jaghPos);
  waS.jaghPosX2 = Number(m.jaghPosX2 ?? waS.jaghPosX2);
  waS.jaghPos2 = Number(m.jaghPos2 ?? waS.jaghPos2);
  waS.jaghDive = Number(m.jaghDive ?? waS.jaghDive);
  waS.maHBaH_taH = m.maHBaH_taH === true;
  waS.maHBaH_tagh = Number(m.maHBaH_tagh ?? waS.maHBaH_tagh);
  waS.maHBaH_len = Number(m.maHBaH_len ?? waS.maHBaH_len);
  waS.maHBaHPosX = Number(m.maHBaHPosX ?? waS.maHBaHPosX);
  waS.maHBaHPosY = Number(m.maHBaHPosY ?? waS.maHBaHPosY);
  waS.maHBaHmey = Array.isArray(m.maHBaHmey)
    ? m.maHBaHmey
      .slice(0, 5)
      .map((baH) => ({
        tagh: Number(baH.tagh ?? 0),
        len: Math.max(50, Number(baH.len ?? 520)),
        posX: Number(baH.posX ?? 0),
        posY: Number(baH.posY ?? 0)
      }))
    : [];
  waS.maHBaH_max = Math.max(1, Math.min(5, Number(m.maHBaH_max ?? waS.maHBaH_max)));
  waS.jaghBaH_taH = m.jaghBaH_taH === true;
  waS.jaghBaH_tagh = Number(m.jaghBaH_tagh ?? waS.jaghBaH_tagh);
  waS.jaghBaH_len = Number(m.jaghBaH_len ?? waS.jaghBaH_len);
  waS.jaghBaHPosX = Number(m.jaghBaHPosX ?? waS.jaghBaHPosX);
  waS.jaghBaHPosY = Number(m.jaghBaHPosY ?? waS.jaghBaHPosY);
  waS.jaghBaH_qawH = Number(m.jaghBaH_qawH ?? waS.jaghBaH_qawH);
  waS.jaghBaH_color = String(m.jaghBaH_color ?? waS.jaghBaH_color);
  waS.jaghBaHDive = m.jaghBaHDive === true;
  waS.log = Array.isArray(m.log) ? m.log.slice(0, 8) : waS.log;
  waS.jaghHoS = Number(m.jaghHoS ?? waS.jaghHoS);
  waS.jaghHoS_max = Number(m.jaghHoS_max ?? waS.jaghHoS_max);
  waS.jaghHoS2 = Number(m.jaghHoS2 ?? waS.jaghHoS2);
  waS.jaghHoS2_max = Number(m.jaghHoS2_max ?? waS.jaghHoS2_max);
  waS.jaghmey = Array.isArray(m.jaghmey)
    ? m.jaghmey
      .slice(0, waS.wav_max)
      .map((jagh, mI) => ({
        id: Number(jagh.id ?? mI + 1),
        x: Number(jagh.x ?? 36 - mI * 5),
        y: Number(jagh.y ?? (mI - ((m.jaghmey.length - 1) / 2)) * 14),
        spawnX: Number(jagh.spawnX ?? jagh.x ?? 58 + mI * 2),
        targetX: Number(jagh.targetX ?? jagh.x ?? 36 - mI * 5),
        targetY: Number(jagh.targetY ?? jagh.y ?? (mI - ((m.jaghmey.length - 1) / 2)) * 14),
        HoS: Math.max(0, Number(jagh.HoS ?? 0)),
        HoS_max: Math.max(1, Number(jagh.HoS_max ?? 1)),
        boss: jagh.boss === true,
        shotMul: Math.max(1, Number(jagh.shotMul ?? 1)),
        beamColor: String(jagh.beamColor ?? "red"),
        motionPhaseX: Number(jagh.motionPhaseX ?? 0),
        motionPhaseY: Number(jagh.motionPhaseY ?? 0),
        motionAmpX: Number(jagh.motionAmpX ?? 8),
        motionAmpY: Number(jagh.motionAmpY ?? 12),
        motionRateX: Number(jagh.motionRateX ?? 700),
        motionRateY: Number(jagh.motionRateY ?? 520)
      }))
    : [];
  waS.wav = Number(m.wav ?? waS.wav);
  waS.wav_max = Number(m.wav_max ?? waS.wav_max);
  waS.mI_xp = Number(m.mI_xp ?? waS.mI_xp);
  waS.patlh = String(m.patlh ?? waS.patlh);
  waS.taH = String(m.taH ?? waS.taH);
  waS.roundState = String(m.roundState ?? waS.roundState);
  waS.roundWaitUntil = Number(m.roundWaitUntil ?? waS.roundWaitUntil);
  waS.roundIntroStart = Number(m.roundIntroStart ?? waS.roundIntroStart);
  waS.roundIntroLen = Number(m.roundIntroLen ?? waS.roundIntroLen);
  waS.roundClearUntil = Number(m.roundClearUntil ?? waS.roundClearUntil);
  waS.qam = Number(m.qam ?? waS.qam);
  waS.qam_len = Number(m.qam_len ?? waS.qam_len);
  waS.qIp_crit = Number(m.qIp_crit ?? waS.qIp_crit);

  const now = Date.now();
  if (!Number.isFinite(waS.qam) || waS.qam < 0 || waS.qam > now + 2000) {
    waS.qam = 0;
  }
  if (!Number.isFinite(waS.qam_len)) {
    waS.qam_len = 110;
  }
  waS.qam_len = Math.max(60, Math.min(1200, waS.qam_len));

  if (!Number.isFinite(waS.maHBaH_max)) {
    waS.maHBaH_max = 5;
  }
  waS.maHBaH_max = Math.max(1, Math.min(5, waS.maHBaH_max));

  waS.maHBaHmey = Array.isArray(waS.maHBaHmey)
    ? waS.maHBaHmey.filter((baH) => Number.isFinite(baH.tagh) && Number.isFinite(baH.len) && Number.isFinite(baH.posX) && Number.isFinite(baH.posY))
    : [];

  if (!Number.isFinite(waS.jaghBaH_tagh) || waS.jaghBaH_tagh < 0 || waS.jaghBaH_tagh > now + 2000) {
    waS.jaghBaH_tagh = 0;
  }
  if (!Number.isFinite(waS.jaghBaH_len)) {
    waS.jaghBaH_len = 520;
  }
  waS.jaghBaH_len = Math.max(120, Math.min(1200, waS.jaghBaH_len));
  if (!Number.isFinite(waS.jaghBaHPosX)) {
    waS.jaghBaHPosX = 86;
  }
  waS.jaghBaHPosX = Math.max(-46, Math.min(46, waS.jaghBaHPosX));
  if (!Number.isFinite(waS.jaghBaHPosY)) {
    waS.jaghBaHPosY = 0;
  }
  waS.jaghBaHPosY = Math.max(-46, Math.min(46, waS.jaghBaHPosY));
  if (!Number.isFinite(waS.jaghPosX)) {
    waS.jaghPosX = 38;
  }
  waS.jaghPosX = Math.max(4, Math.min(46, waS.jaghPosX));
  if (!Number.isFinite(waS.jaghPosX2)) {
    waS.jaghPosX2 = 26;
  }
  waS.jaghPosX2 = Math.max(4, Math.min(46, waS.jaghPosX2));
  if (!Number.isFinite(waS.jaghPos2)) {
    waS.jaghPos2 = -18;
  }
  waS.jaghPos2 = Math.max(-46, Math.min(46, waS.jaghPos2));
  if (!Number.isFinite(waS.jaghHoS2_max)) {
    waS.jaghHoS2_max = 0;
  }
  waS.jaghHoS2_max = Math.max(0, waS.jaghHoS2_max);
  if (!Number.isFinite(waS.jaghHoS2)) {
    waS.jaghHoS2 = 0;
  }
  waS.jaghHoS2 = Math.max(0, Math.min(waS.jaghHoS2_max, waS.jaghHoS2));
  if (!Number.isFinite(waS.jaghBaH_qawH)) {
    waS.jaghBaH_qawH = 0;
  }
  waS.jaghBaH_qawH = Math.max(0, Math.min(40, waS.jaghBaH_qawH));
  waS.jaghBaH_color = waS.jaghBaH_color === "purple" ? "purple" : "red";

  if (!Array.isArray(waS.jaghmey) || waS.jaghmey.length === 0) {
    yIchenjaghmey(Math.max(1, Math.min(waS.wav_max, waS.wav)));
  }

  waS.jaghmey = waS.jaghmey.map((jagh, mI) => ({
    id: Number.isFinite(jagh.id) ? jagh.id : mI + 1,
    x: Math.max(4, Math.min(64, Number(jagh.x ?? 36 - mI * 5))),
    y: Math.max(-42, Math.min(42, Number(jagh.y ?? 0))),
    spawnX: Math.max(54, Math.min(96, Number(jagh.spawnX ?? jagh.x ?? 58 + mI * 2))),
    targetX: Math.max(4, Math.min(46, Number(jagh.targetX ?? jagh.x ?? 36 - mI * 5))),
    targetY: Math.max(-42, Math.min(42, Number(jagh.targetY ?? jagh.y ?? 0))),
    HoS_max: Math.max(1, Number(jagh.HoS_max ?? 1)),
    HoS: Math.max(0, Math.min(Math.max(1, Number(jagh.HoS_max ?? 1)), Number(jagh.HoS ?? 0))),
    boss: jagh.boss === true,
    shotMul: Math.max(1, Math.min(4, Number(jagh.shotMul ?? 1))),
    beamColor: String(jagh.beamColor ?? "red") === "purple" ? "purple" : "red",
    motionPhaseX: Number.isFinite(Number(jagh.motionPhaseX)) ? Number(jagh.motionPhaseX) : (Math.random() * Math.PI * 2),
    motionPhaseY: Number.isFinite(Number(jagh.motionPhaseY)) ? Number(jagh.motionPhaseY) : (Math.random() * Math.PI * 2),
    motionAmpX: Math.max(4, Math.min(16, Number(jagh.motionAmpX ?? 8))),
    motionAmpY: Math.max(6, Math.min(20, Number(jagh.motionAmpY ?? 12))),
    motionRateX: Math.max(420, Math.min(980, Number(jagh.motionRateX ?? 700))),
    motionRateY: Math.max(360, Math.min(860, Number(jagh.motionRateY ?? 520)))
  }));

  if (!["fight", "wait", "intro"].includes(waS.roundState)) {
    waS.roundState = "fight";
  }
  if (!Number.isFinite(waS.roundWaitUntil)) {
    waS.roundWaitUntil = now + 3000;
  }
  if (!Number.isFinite(waS.roundIntroStart)) {
    waS.roundIntroStart = 0;
  }
  if (!Number.isFinite(waS.roundIntroLen)) {
    waS.roundIntroLen = 760;
  }
  waS.roundIntroLen = Math.max(120, Math.min(1200, waS.roundIntroLen));
  if (!Number.isFinite(waS.roundClearUntil)) {
    waS.roundClearUntil = 0;
  }
  waS.roundClearUntil = Math.max(0, waS.roundClearUntil);

  if (waS.roundState === "wait") {
    if (waS.roundWaitUntil < now - 1000 || waS.roundWaitUntil > now + 10000) {
      waS.roundWaitUntil = now + 3000;
    }
    waS.roundIntroStart = 0;
  } else if (waS.roundState === "intro") {
    if (waS.roundIntroStart <= 0 || waS.roundIntroStart > now + 1000 || waS.roundIntroStart < now - 10000) {
      waS.roundIntroStart = now;
    }
  } else {
    waS.roundIntroStart = 0;
  }

  waS.jaghHoS_max = waS.jaghmey.reduce((sum, jagh) => sum + jagh.HoS_max, 0);
  waS.jaghHoS = waS.jaghmey.reduce((sum, jagh) => sum + jagh.HoS, 0);

  return true;
}
