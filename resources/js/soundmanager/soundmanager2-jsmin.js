/** @license


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20130101
 */
(function (j, g) {
  function aa(aa, pa) {
    function ba(a) {
      return c.preferFlash && z && !c.ignoreFlash && c.flash[a] !== g && c.flash[a]
    }

    function q(a) {
      return function (d) {
        var e = this._s;
        !e || !e._a ? (e && e.id ? c._wD(e.id + ": Ignoring " + d.type) : c._wD(pb + "Ignoring " + d.type), d = null) : d = a.call(this, d);
        return d
      }
    }

    this.setupOptions = {
      url: aa || null,
      flashVersion: 8,
      debugMode: !0,
      debugFlash: !1,
      useConsole: !0,
      consoleOnly: !0,
      waitForWindowLoad: !1,
      bgColor: "#ffffff",
      useHighPerformance: !1,
      flashPollingInterval: null,
      html5PollingInterval: null,
      flashLoadTimeout: 1E3,
      wmode: null,
      allowScriptAccess: "always",
      useFlashBlock: !1,
      useHTML5Audio: !0,
      html5Test: /^(probably|maybe)$/i,
      preferFlash: !0,
      noSWFCache: !1
    };
    this.defaultOptions = {
      autoLoad: !1,
      autoPlay: !1,
      from: null,
      loops: 1,
      onid3: null,
      onload: null,
      whileloading: null,
      onplay: null,
      onpause: null,
      onresume: null,
      whileplaying: null,
      onposition: null,
      onstop: null,
      onfailure: null,
      onfinish: null,
      multiShot: !0,
      multiShotEvents: !1,
      position: null,
      pan: 0,
      stream: !0,
      to: null,
      type: null,
      usePolicyFile: !1,
      volume: 100
    };
    this.flash9Options = {
      isMovieStar: null, usePeakData: !1,
      useWaveformData: !1, useEQData: !1, onbufferchange: null, ondataerror: null
    };
    this.movieStarOptions = {bufferTime: 3, serverURL: null, onconnect: null, duration: null};
    this.audioFormats = {
      mp3: {
        type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
        required: !0
      },
      mp4: {
        related: ["aac", "m4a", "m4b"],
        type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
        required: !1
      },
      ogg: {type: ["audio/ogg; codecs=vorbis"], required: !1},
      wav: {
        type: ['audio/wav; codecs="1"',
          "audio/wav", "audio/wave", "audio/x-wav"], required: !1
      }
    };
    this.movieID = "sm2-container";
    this.id = pa || "sm2movie";
    this.debugID = "soundmanager-debug";
    this.debugURLParam = /([#?&])debug=1/i;
    this.versionNumber = "V2.97a.20130101";
    this.altURL = this.movieURL = this.version = null;
    this.enabled = this.swfLoaded = !1;
    this.oMC = null;
    this.sounds = {};
    this.soundIDs = [];
    this.didFlashBlock = this.muted = !1;
    this.filePattern = null;
    this.filePatterns = {flash8: /\.mp3(\?.*)?$/i, flash9: /\.mp3(\?.*)?$/i};
    this.features = {
      buffering: !1, peakData: !1, waveformData: !1,
      eqData: !1, movieStar: !1
    };
    this.sandbox = {
      type: null,
      types: {
        remote: "remote (domain-based) rules",
        localWithFile: "local with file access (no internet access)",
        localWithNetwork: "local with network (internet access only, no local access)",
        localTrusted: "local, trusted (local+internet access)"
      },
      description: null,
      noRemote: null,
      noLocal: null
    };
    this.html5 = {usingFlash: null};
    this.flash = {};
    this.ignoreFlash = this.html5Only = !1;
    var Pa, c = this, Qa = null, i = null, pb = "HTML5::", A, s = navigator.userAgent, R = j.location.href.toString(),
      h = document, qa, Ra, ra, l, C = [], sa = !0, x, S = !1, T = !1, n = !1, r = !1, ca = !1, k, qb = 0, U, v, ta, K, ua, I, L, M, Sa, va, da, F, ea, wa, N, xa, V, fa, ga, O, Ta, ya, Ua = ["log", "info", "warn", "error"], Va, za, Wa, W = null, Aa = null, p, Ba, P, Xa, ha, ia, Q, t, X = !1, Ca = !1, Ya, Za, $a, ja = 0, Y = null, ka, J = [], B = null, ab, la, Z, G, Da, Ea, bb, u, cb = Array.prototype.slice, D = !1, Fa, z, Ga, db, E, eb, Ha, ma = s.match(/(ipad|iphone|ipod)/i), fb = s.match(/android/i), H = s.match(/msie/i), rb = s.match(/webkit/i), Ia = s.match(/safari/i) && !s.match(/chrome/i), Ja = s.match(/opera/i), Ka = s.match(/(mobile|pre\/|xoom)/i) ||
        ma || fb, La = !R.match(/usehtml5audio/i) && !R.match(/sm2\-ignorebadua/i) && Ia && !s.match(/silk/i) && s.match(/OS X 10_6_([3-7])/i), gb = j.console !== g && console.log !== g, Ma = h.hasFocus !== g ? h.hasFocus() : null, na = Ia && (h.hasFocus === g || !h.hasFocus()), hb = !na, ib = /(mp3|mp4|mpa|m4a|m4b)/i, $ = h.location ? h.location.protocol.match(/http/i) : null, jb = !$ ? "http://" : "", kb = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i, lb = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "), sb = RegExp("\\.(" +
        lb.join("|") + ")(\\?.*)?$", "i");
    this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
    this.useAltURL = !$;
    var Na;
    try {
      Na = Audio !== g && (Ja && opera !== g && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== g
    } catch (ub) {
      Na = !1
    }
    this.hasHTML5 = Na;
    this.setup = function (a) {
      var d = !c.url;
      a !== g && (n && B && c.ok() && (a.flashVersion !== g || a.url !== g || a.html5Test !== g)) && Q(p("setupLate"));
      ta(a);
      d && (V && a.url !== g) && c.beginDelayedInit();
      !V && (a.url !== g && "complete" === h.readyState) && setTimeout(N, 1);
      return c
    };
    this.supported =
      this.ok = function () {
        return B ? n && !r : c.useHTML5Audio && c.hasHTML5
      };
    this.getMovie = function (c) {
      return A(c) || h[c] || j[c]
    };
    this.createSound = function (a, d) {
      function e() {
        f = ha(f);
        c.sounds[f.id] = new Pa(f);
        c.soundIDs.push(f.id);
        return c.sounds[f.id]
      }

      var b, f;
      b = null;
      b = "soundManager.createSound(): " + p(!n ? "notReady" : "notOK");
      if (!n || !c.ok())return Q(b), !1;
      d !== g && (a = {id: a, url: d});
      f = v(a);
      f.url = ka(f.url);
      f.id.toString().charAt(0).match(/^[0-9]$/) && c._wD("soundManager.createSound(): " + p("badID", f.id), 2);
      c._wD("soundManager.createSound(): " +
        f.id + " (" + f.url + ")", 1);
      if (t(f.id, !0))return c._wD("soundManager.createSound(): " + f.id + " exists", 1), c.sounds[f.id];
      la(f) ? (b = e(), c._wD(f.id + ": Using HTML5"), b._setup_html5(f)) : (8 < l && (null === f.isMovieStar && (f.isMovieStar = !(!f.serverURL && !(f.type && f.type.match(kb) || f.url.match(sb)))), f.isMovieStar && (c._wD("soundManager.createSound(): using MovieStar handling"), 1 < f.loops && k("noNSLoop"))), f = ia(f, "soundManager.createSound(): "), b = e(), 8 === l ? i._createSound(f.id, f.loops || 1, f.usePolicyFile) : (i._createSound(f.id,
        f.url, f.usePeakData, f.useWaveformData, f.useEQData, f.isMovieStar, f.isMovieStar ? f.bufferTime : !1, f.loops || 1, f.serverURL, f.duration || null, f.autoPlay, !0, f.autoLoad, f.usePolicyFile), f.serverURL || (b.connected = !0, f.onconnect && f.onconnect.apply(b))), !f.serverURL && (f.autoLoad || f.autoPlay) && b.load(f));
      !f.serverURL && f.autoPlay && b.play();
      return b
    };
    this.destroySound = function (a, d) {
      if (!t(a))return !1;
      var e = c.sounds[a], b;
      e._iO = {};
      e.stop();
      e.unload();
      for (b = 0; b < c.soundIDs.length; b++)if (c.soundIDs[b] === a) {
        c.soundIDs.splice(b,
          1);
        break
      }
      d || e.destruct(!0);
      delete c.sounds[a];
      return !0
    };
    this.load = function (a, d) {
      return !t(a) ? !1 : c.sounds[a].load(d)
    };
    this.unload = function (a) {
      return !t(a) ? !1 : c.sounds[a].unload()
    };
    this.onposition = this.onPosition = function (a, d, e, b) {
      return !t(a) ? !1 : c.sounds[a].onposition(d, e, b)
    };
    this.clearOnPosition = function (a, d, e) {
      return !t(a) ? !1 : c.sounds[a].clearOnPosition(d, e)
    };
    this.start = this.play = function (a, d) {
      var e = !1;
      return !n || !c.ok() ? (Q("soundManager.play(): " + p(!n ? "notReady" : "notOK")), e) : !t(a) ? (d instanceof Object ||
      (d = {url: d}), d && d.url && (c._wD('soundManager.play(): attempting to create "' + a + '"', 1), d.id = a, e = c.createSound(d).play()), e) : c.sounds[a].play(d)
    };
    this.setPosition = function (a, d) {
      return !t(a) ? !1 : c.sounds[a].setPosition(d)
    };
    this.stop = function (a) {
      if (!t(a))return !1;
      c._wD("soundManager.stop(" + a + ")", 1);
      return c.sounds[a].stop()
    };
    this.stopAll = function () {
      var a;
      c._wD("soundManager.stopAll()", 1);
      for (a in c.sounds)c.sounds.hasOwnProperty(a) && c.sounds[a].stop()
    };
    this.pause = function (a) {
      return !t(a) ? !1 : c.sounds[a].pause()
    };
    this.pauseAll = function () {
      var a;
      for (a = c.soundIDs.length - 1; 0 <= a; a--)c.sounds[c.soundIDs[a]].pause()
    };
    this.resume = function (a) {
      return !t(a) ? !1 : c.sounds[a].resume()
    };
    this.resumeAll = function () {
      var a;
      for (a = c.soundIDs.length - 1; 0 <= a; a--)c.sounds[c.soundIDs[a]].resume()
    };
    this.togglePause = function (a) {
      return !t(a) ? !1 : c.sounds[a].togglePause()
    };
    this.setPan = function (a, d) {
      return !t(a) ? !1 : c.sounds[a].setPan(d)
    };
    this.setVolume = function (a, d) {
      return !t(a) ? !1 : c.sounds[a].setVolume(d)
    };
    this.mute = function (a) {
      var d = 0;
      a instanceof
      String && (a = null);
      if (a) {
        if (!t(a))return !1;
        c._wD('soundManager.mute(): Muting "' + a + '"');
        return c.sounds[a].mute()
      }
      c._wD("soundManager.mute(): Muting all sounds");
      for (d = c.soundIDs.length - 1; 0 <= d; d--)c.sounds[c.soundIDs[d]].mute();
      return c.muted = !0
    };
    this.muteAll = function () {
      c.mute()
    };
    this.unmute = function (a) {
      a instanceof String && (a = null);
      if (a) {
        if (!t(a))return !1;
        c._wD('soundManager.unmute(): Unmuting "' + a + '"');
        return c.sounds[a].unmute()
      }
      c._wD("soundManager.unmute(): Unmuting all sounds");
      for (a = c.soundIDs.length -
        1; 0 <= a; a--)c.sounds[c.soundIDs[a]].unmute();
      c.muted = !1;
      return !0
    };
    this.unmuteAll = function () {
      c.unmute()
    };
    this.toggleMute = function (a) {
      return !t(a) ? !1 : c.sounds[a].toggleMute()
    };
    this.getMemoryUse = function () {
      var c = 0;
      i && 8 !== l && (c = parseInt(i._getMemoryUse(), 10));
      return c
    };
    this.disable = function (a) {
      var d;
      a === g && (a = !1);
      if (r)return !1;
      r = !0;
      k("shutdown", 1);
      for (d = c.soundIDs.length - 1; 0 <= d; d--)Va(c.sounds[c.soundIDs[d]]);
      U(a);
      u.remove(j, "load", L);
      return !0
    };
    this.canPlayMIME = function (a) {
      var d;
      c.hasHTML5 && (d = Z({type: a}));
      !d && B && (d = a && c.ok() ? !!(8 < l && a.match(kb) || a.match(c.mimePattern)) : null);
      return d
    };
    this.canPlayURL = function (a) {
      var d;
      c.hasHTML5 && (d = Z({url: a}));
      !d && B && (d = a && c.ok() ? !!a.match(c.filePattern) : null);
      return d
    };
    this.canPlayLink = function (a) {
      return a.type !== g && a.type && c.canPlayMIME(a.type) ? !0 : c.canPlayURL(a.href)
    };
    this.getSoundById = function (a, d) {
      if (!a)throw Error("soundManager.getSoundById(): sID is null/_undefined");
      var e = c.sounds[a];
      !e && !d && c._wD('"' + a + '" is an invalid sound ID.', 2);
      return e
    };
    this.onready =
      function (a, d) {
        if ("function" === typeof a)n && c._wD(p("queue", "onready")), d || (d = j), ua("onready", a, d), I(); else throw p("needFunction", "onready");
        return !0
      };
    this.ontimeout = function (a, d) {
      if ("function" === typeof a)n && c._wD(p("queue", "ontimeout")), d || (d = j), ua("ontimeout", a, d), I({type: "ontimeout"}); else throw p("needFunction", "ontimeout");
      return !0
    };
    this._writeDebug = function (a, d) {
      var e, b;
      if (!c.debugMode)return !1;
      if (gb && c.useConsole) {
        if (d && "object" === typeof d)console.log(a, d); else if (Ua[d] !== g)console[Ua[d]](a);
        else console.log(a);
        if (c.consoleOnly)return !0
      }
      e = A("soundmanager-debug");
      if (!e)return !1;
      b = h.createElement("div");
      0 === ++qb % 2 && (b.className = "sm2-alt");
      d = d === g ? 0 : parseInt(d, 10);
      b.appendChild(h.createTextNode(a));
      d && (2 <= d && (b.style.fontWeight = "bold"), 3 === d && (b.style.color = "#ff3333"));
      e.insertBefore(b, e.firstChild);
      return !0
    };
    -1 !== R.indexOf("sm2-debug=alert") && (this._writeDebug = function (c) {
      j.alert(c)
    });
    this._wD = this._writeDebug;
    this._debug = function () {
      var a, d;
      k("currentObj", 1);
      a = 0;
      for (d = c.soundIDs.length; a <
      d; a++)c.sounds[c.soundIDs[a]]._debug()
    };
    this.reboot = function (a, d) {
      c.soundIDs.length && c._wD("Destroying " + c.soundIDs.length + " SMSound objects...");
      var e, b, f;
      for (e = c.soundIDs.length - 1; 0 <= e; e--)c.sounds[c.soundIDs[e]].destruct();
      if (i)try {
        H && (Aa = i.innerHTML), W = i.parentNode.removeChild(i), k("flRemoved")
      } catch (g) {
        k("badRemove", 2)
      }
      Aa = W = B = i = null;
      c.enabled = V = n = X = Ca = S = T = r = D = c.swfLoaded = !1;
      c.soundIDs = [];
      c.sounds = {};
      if (a)C = []; else for (e in C)if (C.hasOwnProperty(e)) {
        b = 0;
        for (f = C[e].length; b < f; b++)C[e][b].fired = !1
      }
      d || c._wD("soundManager: Rebooting...");
      c.html5 = {usingFlash: null};
      c.flash = {};
      c.html5Only = !1;
      c.ignoreFlash = !1;
      j.setTimeout(function () {
        wa();
        d || c.beginDelayedInit()
      }, 20);
      return c
    };
    this.reset = function () {
      k("reset");
      return c.reboot(!0, !0)
    };
    this.getMoviePercent = function () {
      return i && "PercentLoaded"in i ? i.PercentLoaded() : null
    };
    this.beginDelayedInit = function () {
      ca = !0;
      N();
      setTimeout(function () {
        if (Ca)return !1;
        ga();
        ea();
        return Ca = !0
      }, 20);
      M()
    };
    this.destruct = function () {
      c._wD("soundManager.destruct()");
      c.disable(!0)
    };
    Pa = function (a) {
      var d, e, b = this, f, j, mb, m, h, n, q = !1, y = [], s = 0, Oa, u, r = null;
      e = d = null;
      this.sID = this.id = a.id;
      this.url = a.url;
      this._iO = this.instanceOptions = this.options = v(a);
      this.pan = this.options.pan;
      this.volume = this.options.volume;
      this.isHTML5 = !1;
      this._a = null;
      this.id3 = {};
      this._debug = function () {
        c._wD(b.id + ": Merged options:", b.options)
      };
      this.load = function (a) {
        var d = null;
        a !== g ? b._iO = v(a, b.options) : (a = b.options, b._iO = a, r && r !== b.url && (k("manURL"), b._iO.url = b.url, b.url = null));
        b._iO.url || (b._iO.url = b.url);
        b._iO.url =
          ka(b._iO.url);
        a = b.instanceOptions = b._iO;
        c._wD(b.id + ": load (" + a.url + ")");
        if (a.url === b.url && 0 !== b.readyState && 2 !== b.readyState)return k("onURL", 1), 3 === b.readyState && a.onload && a.onload.apply(b, [!!b.duration]), b;
        b.loaded = !1;
        b.readyState = 1;
        b.playState = 0;
        b.id3 = {};
        if (la(a))d = b._setup_html5(a), d._called_load ? c._wD(b.id + ": Ignoring request to load again") : (b._html5_canplay = !1, b.url !== a.url && (c._wD(k("manURL") + ": " + a.url), b._a.src = a.url, b.setPosition(0)), b._a.autobuffer = "auto", b._a.preload = "auto", b._a._called_load = !0, a.autoPlay && b.play()); else try {
          b.isHTML5 = !1, b._iO = ia(ha(a)), a = b._iO, 8 === l ? i._load(b.id, a.url, a.stream, a.autoPlay, a.usePolicyFile) : i._load(b.id, a.url, !!a.stream, !!a.autoPlay, a.loops || 1, !!a.autoLoad, a.usePolicyFile)
        } catch (e) {
          k("smError", 2), x("onload", !1), O({type: "SMSOUND_LOAD_JS_EXCEPTION", fatal: !0})
        }
        b.url = a.url;
        return b
      };
      this.unload = function () {
        0 !== b.readyState && (c._wD(b.id + ": unload()"), b.isHTML5 ? (m(), b._a && (b._a.pause(), Da(b._a, "about:blank"), r = "about:blank")) : 8 === l ? i._unload(b.id, "about:blank") :
          i._unload(b.id), f());
        return b
      };
      this.destruct = function (a) {
        c._wD(b.id + ": Destruct");
        b.isHTML5 ? (m(), b._a && (b._a.pause(), Da(b._a), D || mb(), b._a._s = null, b._a = null)) : (b._iO.onfailure = null, i._destroySound(b.id));
        a || c.destroySound(b.id, !0)
      };
      this.start = this.play = function (a, d) {
        var e, f, w = !0, w = null;
        e = b.id + ": play(): ";
        d = d === g ? !0 : d;
        a || (a = {});
        b.url && (b._iO.url = b.url);
        b._iO = v(b._iO, b.options);
        b._iO = v(a, b._iO);
        b._iO.url = ka(b._iO.url);
        b.instanceOptions = b._iO;
        if (b._iO.serverURL && !b.connected)return b.getAutoPlay() ||
        (c._wD(e + " Netstream not connected yet - setting autoPlay"), b.setAutoPlay(!0)), b;
        la(b._iO) && (b._setup_html5(b._iO), h());
        1 === b.playState && !b.paused && ((f = b._iO.multiShot) ? c._wD(e + "Already playing (multi-shot)", 1) : (c._wD(e + "Already playing (one-shot)", 1), w = b));
        if (null !== w)return w;
        a.url && a.url !== b.url && b.load(b._iO);
        b.loaded ? c._wD(e) : 0 === b.readyState ? (c._wD(e + "Attempting to load"), b.isHTML5 || (b._iO.autoPlay = !0), b.load(b._iO), b.instanceOptions = b._iO) : 2 === b.readyState ? (c._wD(e + "Could not load - exiting",
          2), w = b) : c._wD(e + "Loading - attempting to play...");
        if (null !== w)return w;
        !b.isHTML5 && (9 === l && 0 < b.position && b.position === b.duration) && (c._wD(e + "Sound at end, resetting to position:0"), a.position = 0);
        if (b.paused && 0 <= b.position && (!b._iO.serverURL || 0 < b.position))c._wD(e + "Resuming from paused state", 1), b.resume(); else {
          b._iO = v(a, b._iO);
          if (null !== b._iO.from && null !== b._iO.to && 0 === b.instanceCount && 0 === b.playState && !b._iO.serverURL) {
            f = function () {
              b._iO = v(a, b._iO);
              b.play(b._iO)
            };
            if (b.isHTML5 && !b._html5_canplay)c._wD(e +
              "Beginning load for from/to case"), b.load({oncanplay: f}), w = !1; else if (!b.isHTML5 && !b.loaded && (!b.readyState || 2 !== b.readyState))c._wD(e + "Preloading for from/to case"), b.load({onload: f}), w = !1;
            if (null !== w)return w;
            b._iO = u()
          }
          c._wD(e + "Starting to play");
          (!b.instanceCount || b._iO.multiShotEvents || !b.isHTML5 && 8 < l && !b.getAutoPlay()) && b.instanceCount++;
          b._iO.onposition && 0 === b.playState && n(b);
          b.playState = 1;
          b.paused = !1;
          b.position = b._iO.position !== g && !isNaN(b._iO.position) ? b._iO.position : 0;
          b.isHTML5 || (b._iO = ia(ha(b._iO)));
          b._iO.onplay && d && (b._iO.onplay.apply(b), q = !0);
          b.setVolume(b._iO.volume, !0);
          b.setPan(b._iO.pan, !0);
          b.isHTML5 ? (h(), e = b._setup_html5(), b.setPosition(b._iO.position), e.play()) : (w = i._start(b.id, b._iO.loops || 1, 9 === l ? b._iO.position : b._iO.position / 1E3, b._iO.multiShot), 9 === l && !w && (c._wD(e + "No sound hardware, or 32-sound ceiling hit"), b._iO.onplayerror && b._iO.onplayerror.apply(b)))
        }
        return b
      };
      this.stop = function (a) {
        var d = b._iO;
        1 === b.playState && (c._wD(b.id + ": stop()"), b._onbufferchange(0), b._resetOnPosition(0),
          b.paused = !1, b.isHTML5 || (b.playState = 0), Oa(), d.to && b.clearOnPosition(d.to), b.isHTML5 ? b._a && (a = b.position, b.setPosition(0), b.position = a, b._a.pause(), b.playState = 0, b._onTimer(), m()) : (i._stop(b.id, a), d.serverURL && b.unload()), b.instanceCount = 0, b._iO = {}, d.onstop && d.onstop.apply(b));
        return b
      };
      this.setAutoPlay = function (a) {
        c._wD(b.id + ": Autoplay turned " + (a ? "on" : "off"));
        b._iO.autoPlay = a;
        b.isHTML5 || (i._setAutoPlay(b.id, a), a && (!b.instanceCount && 1 === b.readyState) && (b.instanceCount++, c._wD(b.id + ": Incremented instance count to " +
          b.instanceCount)))
      };
      this.getAutoPlay = function () {
        return b._iO.autoPlay
      };
      this.setPosition = function (a) {
        a === g && (a = 0);
        var d = b.isHTML5 ? Math.max(a, 0) : Math.min(b.duration || b._iO.duration, Math.max(a, 0));
        b.position = d;
        a = b.position / 1E3;
        b._resetOnPosition(b.position);
        b._iO.position = d;
        if (b.isHTML5) {
          if (b._a)if (b._html5_canplay) {
            if (b._a.currentTime !== a) {
              c._wD(b.id + ": setPosition(" + a + ")");
              try {
                b._a.currentTime = a, (0 === b.playState || b.paused) && b._a.pause()
              } catch (e) {
                c._wD(b.id + ": setPosition(" + a + ") failed: " + e.message,
                  2)
              }
            }
          } else c._wD(b.id + ": setPosition(" + a + "): Cannot seek yet, sound not ready")
        } else a = 9 === l ? b.position : a, b.readyState && 2 !== b.readyState && i._setPosition(b.id, a, b.paused || !b.playState, b._iO.multiShot);
        b.isHTML5 && b.paused && b._onTimer(!0);
        return b
      };
      this.pause = function (a) {
        if (b.paused || 0 === b.playState && 1 !== b.readyState)return b;
        c._wD(b.id + ": pause()");
        b.paused = !0;
        b.isHTML5 ? (b._setup_html5().pause(), m()) : (a || a === g) && i._pause(b.id, b._iO.multiShot);
        b._iO.onpause && b._iO.onpause.apply(b);
        return b
      };
      this.resume =
        function () {
          var a = b._iO;
          if (!b.paused)return b;
          c._wD(b.id + ": resume()");
          b.paused = !1;
          b.playState = 1;
          b.isHTML5 ? (b._setup_html5().play(), h()) : (a.isMovieStar && !a.serverURL && b.setPosition(b.position), i._pause(b.id, a.multiShot));
          !q && a.onplay ? (a.onplay.apply(b), q = !0) : a.onresume && a.onresume.apply(b);
          return b
        };
      this.togglePause = function () {
        c._wD(b.id + ": togglePause()");
        if (0 === b.playState)return b.play({position: 9 === l && !b.isHTML5 ? b.position : b.position / 1E3}), b;
        b.paused ? b.resume() : b.pause();
        return b
      };
      this.setPan =
        function (a, c) {
          a === g && (a = 0);
          c === g && (c = !1);
          b.isHTML5 || i._setPan(b.id, a);
          b._iO.pan = a;
          c || (b.pan = a, b.options.pan = a);
          return b
        };
      this.setVolume = function (a, d) {
        a === g && (a = 100);
        d === g && (d = !1);
        b.isHTML5 ? b._a && (b._a.volume = Math.max(0, Math.min(1, a / 100))) : i._setVolume(b.id, c.muted && !b.muted || b.muted ? 0 : a);
        b._iO.volume = a;
        d || (b.volume = a, b.options.volume = a);
        return b
      };
      this.mute = function () {
        b.muted = !0;
        b.isHTML5 ? b._a && (b._a.muted = !0) : i._setVolume(b.id, 0);
        return b
      };
      this.unmute = function () {
        b.muted = !1;
        var a = b._iO.volume !== g;
        b.isHTML5 ? b._a && (b._a.muted = !1) : i._setVolume(b.id, a ? b._iO.volume : b.options.volume);
        return b
      };
      this.toggleMute = function () {
        return b.muted ? b.unmute() : b.mute()
      };
      this.onposition = this.onPosition = function (a, c, d) {
        y.push({position: parseInt(a, 10), method: c, scope: d !== g ? d : b, fired: !1});
        return b
      };
      this.clearOnPosition = function (b, a) {
        var c, b = parseInt(b, 10);
        if (isNaN(b))return !1;
        for (c = 0; c < y.length; c++)if (b === y[c].position && (!a || a === y[c].method))y[c].fired && s--, y.splice(c, 1)
      };
      this._processOnPosition = function () {
        var a, c;
        a = y.length;
        if (!a || !b.playState || s >= a)return !1;
        for (a -= 1; 0 <= a; a--)c = y[a], !c.fired && b.position >= c.position && (c.fired = !0, s++, c.method.apply(c.scope, [c.position]));
        return !0
      };
      this._resetOnPosition = function (b) {
        var a, c;
        a = y.length;
        if (!a)return !1;
        for (a -= 1; 0 <= a; a--)c = y[a], c.fired && b <= c.position && (c.fired = !1, s--);
        return !0
      };
      u = function () {
        var a = b._iO, d = a.from, e = a.to, f, g;
        g = function () {
          c._wD(b.id + ': "To" time of ' + e + " reached.");
          b.clearOnPosition(e, g);
          b.stop()
        };
        f = function () {
          c._wD(b.id + ': Playing "from" ' + d);
          if (null !==
            e && !isNaN(e))b.onPosition(e, g)
        };
        null !== d && !isNaN(d) && (a.position = d, a.multiShot = !1, f());
        return a
      };
      n = function () {
        var a, c = b._iO.onposition;
        if (c)for (a in c)if (c.hasOwnProperty(a))b.onPosition(parseInt(a, 10), c[a])
      };
      Oa = function () {
        var a, c = b._iO.onposition;
        if (c)for (a in c)c.hasOwnProperty(a) && b.clearOnPosition(parseInt(a, 10))
      };
      h = function () {
        b.isHTML5 && Ya(b)
      };
      m = function () {
        b.isHTML5 && Za(b)
      };
      f = function (a) {
        a || (y = [], s = 0);
        q = !1;
        b._hasTimer = null;
        b._a = null;
        b._html5_canplay = !1;
        b.bytesLoaded = null;
        b.bytesTotal = null;
        b.duration =
          b._iO && b._iO.duration ? b._iO.duration : null;
        b.durationEstimate = null;
        b.buffered = [];
        b.eqData = [];
        b.eqData.left = [];
        b.eqData.right = [];
        b.failures = 0;
        b.isBuffering = !1;
        b.instanceOptions = {};
        b.instanceCount = 0;
        b.loaded = !1;
        b.metadata = {};
        b.readyState = 0;
        b.muted = !1;
        b.paused = !1;
        b.peakData = {left: 0, right: 0};
        b.waveformData = {left: [], right: []};
        b.playState = 0;
        b.position = null;
        b.id3 = {}
      };
      f();
      this._onTimer = function (a) {
        var c, f = !1, g = {};
        if (b._hasTimer || a) {
          if (b._a && (a || (0 < b.playState || 1 === b.readyState) && !b.paused))c = b._get_html5_duration(),
          c !== d && (d = c, b.duration = c, f = !0), b.durationEstimate = b.duration, c = 1E3 * b._a.currentTime || 0, c !== e && (e = c, f = !0), (f || a) && b._whileplaying(c, g, g, g, g);
          return f
        }
      };
      this._get_html5_duration = function () {
        var a = b._iO;
        return (a = b._a && b._a.duration ? 1E3 * b._a.duration : a && a.duration ? a.duration : null) && !isNaN(a) && Infinity !== a ? a : null
      };
      this._apply_loop = function (b, a) {
        !b.loop && 1 < a && c._wD("Note: Native HTML5 looping is infinite.", 1);
        b.loop = 1 < a ? "loop" : ""
      };
      this._setup_html5 = function (a) {
        var a = v(b._iO, a), c = decodeURI, d = D ? Qa : b._a, e =
          c(a.url), g;
        D ? e === Fa && (g = !0) : e === r && (g = !0);
        if (d) {
          if (d._s)if (D)d._s && (d._s.playState && !g) && d._s.stop(); else if (!D && e === c(r))return b._apply_loop(d, a.loops), d;
          g || (f(!1), d.src = a.url, Fa = r = b.url = a.url, d._called_load = !1)
        } else b._a = a.autoLoad || a.autoPlay ? new Audio(a.url) : Ja && 10 > opera.version() ? new Audio(null) : new Audio, d = b._a, d._called_load = !1, D && (Qa = d);
        b.isHTML5 = !0;
        b._a = d;
        d._s = b;
        j();
        b._apply_loop(d, a.loops);
        a.autoLoad || a.autoPlay ? b.load() : (d.autobuffer = !1, d.preload = "auto");
        return d
      };
      j = function () {
        if (b._a._added_events)return !1;
        var a;
        b._a._added_events = !0;
        for (a in E)E.hasOwnProperty(a) && b._a && b._a.addEventListener(a, E[a], !1);
        return !0
      };
      mb = function () {
        var a;
        c._wD(b.id + ": Removing event listeners");
        b._a._added_events = !1;
        for (a in E)E.hasOwnProperty(a) && b._a && b._a.removeEventListener(a, E[a], !1)
      };
      this._onload = function (a) {
        var d = !!a || !b.isHTML5 && 8 === l && b.duration, a = b.id + ": ";
        c._wD(a + (d ? "onload()" : "Failed to load? - " + b.url), d ? 1 : 2);
        !d && !b.isHTML5 && (!0 === c.sandbox.noRemote && c._wD(a + p("noNet"), 1), !0 === c.sandbox.noLocal && c._wD(a + p("noLocal"),
          1));
        b.loaded = d;
        b.readyState = d ? 3 : 2;
        b._onbufferchange(0);
        b._iO.onload && b._iO.onload.apply(b, [d]);
        return !0
      };
      this._onbufferchange = function (a) {
        if (0 === b.playState || a && b.isBuffering || !a && !b.isBuffering)return !1;
        b.isBuffering = 1 === a;
        b._iO.onbufferchange && (c._wD(b.id + ": Buffer state change: " + a), b._iO.onbufferchange.apply(b));
        return !0
      };
      this._onsuspend = function () {
        b._iO.onsuspend && (c._wD(b.id + ": Playback suspended"), b._iO.onsuspend.apply(b));
        return !0
      };
      this._onfailure = function (a, d, e) {
        b.failures++;
        c._wD(b.id + ": Failures = " +
          b.failures);
        if (b._iO.onfailure && 1 === b.failures)b._iO.onfailure(b, a, d, e); else c._wD(b.id + ": Ignoring failure")
      };
      this._onfinish = function () {
        var a = b._iO.onfinish;
        b._onbufferchange(0);
        b._resetOnPosition(0);
        if (b.instanceCount && (b.instanceCount--, b.instanceCount || (Oa(), b.playState = 0, b.paused = !1, b.instanceCount = 0, b.instanceOptions = {}, b._iO = {}, m(), b.isHTML5 && (b.position = 0)), (!b.instanceCount || b._iO.multiShotEvents) && a))c._wD(b.id + ": onfinish()"), a.apply(b)
      };
      this._whileloading = function (a, c, d, e) {
        var f = b._iO;
        b.bytesLoaded = a;
        b.bytesTotal = c;
        b.duration = Math.floor(d);
        b.bufferLength = e;
        b.durationEstimate = !b.isHTML5 && !f.isMovieStar ? f.duration ? b.duration > f.duration ? b.duration : f.duration : parseInt(b.bytesTotal / b.bytesLoaded * b.duration, 10) : b.duration;
        b.isHTML5 || (b.buffered = [{start: 0, end: b.duration}]);
        (3 !== b.readyState || b.isHTML5) && f.whileloading && f.whileloading.apply(b)
      };
      this._whileplaying = function (a, c, d, e, f) {
        var m = b._iO;
        if (isNaN(a) || null === a)return !1;
        b.position = Math.max(0, a);
        b._processOnPosition();
        !b.isHTML5 &&
        8 < l && (m.usePeakData && (c !== g && c) && (b.peakData = {
          left: c.leftPeak,
          right: c.rightPeak
        }), m.useWaveformData && (d !== g && d) && (b.waveformData = {
          left: d.split(","),
          right: e.split(",")
        }), m.useEQData && (f !== g && f && f.leftEQ) && (a = f.leftEQ.split(","), b.eqData = a, b.eqData.left = a, f.rightEQ !== g && f.rightEQ && (b.eqData.right = f.rightEQ.split(","))));
        1 === b.playState && (!b.isHTML5 && (8 === l && !b.position && b.isBuffering) && b._onbufferchange(0), m.whileplaying && m.whileplaying.apply(b));
        return !0
      };
      this._oncaptiondata = function (a) {
        c._wD(b.id +
          ": Caption data received.");
        b.captiondata = a;
        b._iO.oncaptiondata && b._iO.oncaptiondata.apply(b, [a])
      };
      this._onmetadata = function (a, d) {
        c._wD(b.id + ": Metadata received.");
        var e = {}, f, g;
        f = 0;
        for (g = a.length; f < g; f++)e[a[f]] = d[f];
        b.metadata = e;
        b._iO.onmetadata && b._iO.onmetadata.apply(b)
      };
      this._onid3 = function (a, d) {
        c._wD(b.id + ": ID3 data received.");
        var e = [], f, g;
        f = 0;
        for (g = a.length; f < g; f++)e[a[f]] = d[f];
        b.id3 = v(b.id3, e);
        b._iO.onid3 && b._iO.onid3.apply(b)
      };
      this._onconnect = function (a) {
        a = 1 === a;
        c._wD(b.id + ": " + (a ? "Connected." :
          "Failed to connect? - " + b.url), a ? 1 : 2);
        if (b.connected = a)b.failures = 0, t(b.id) && (b.getAutoPlay() ? b.play(g, b.getAutoPlay()) : b._iO.autoLoad && b.load()), b._iO.onconnect && b._iO.onconnect.apply(b, [a])
      };
      this._ondataerror = function (a) {
        0 < b.playState && (c._wD(b.id + ": Data error: " + a), b._iO.ondataerror && b._iO.ondataerror.apply(b))
      };
      this._debug()
    };
    fa = function () {
      return h.body || h._docElement || h.getElementsByTagName("div")[0]
    };
    A = function (a) {
      return h.getElementById(a)
    };
    v = function (a, d) {
      var e = a || {}, b, f;
      b = d === g ? c.defaultOptions :
        d;
      for (f in b)b.hasOwnProperty(f) && e[f] === g && (e[f] = "object" !== typeof b[f] || null === b[f] ? b[f] : v(e[f], b[f]));
      return e
    };
    K = {onready: 1, ontimeout: 1, defaultOptions: 1, flash9Options: 1, movieStarOptions: 1};
    ta = function (a, d) {
      var e, b = !0, f = d !== g, h = c.setupOptions;
      if (a === g) {
        b = [];
        for (e in h)h.hasOwnProperty(e) && b.push(e);
        for (e in K)K.hasOwnProperty(e) && ("object" === typeof c[e] ? b.push(e + ": {...}") : c[e]instanceof Function ? b.push(e + ": function() {...}") : b.push(e));
        c._wD(p("setup", b.join(", ")));
        return !1
      }
      for (e in a)if (a.hasOwnProperty(e))if ("object" !== typeof a[e] || null === a[e] || a[e]instanceof Array || a[e]instanceof RegExp)f && K[d] !== g ? c[d][e] = a[e] : h[e] !== g ? (c.setupOptions[e] = a[e], c[e] = a[e]) : K[e] === g ? (Q(p(c[e] === g ? "setupUndef" : "setupError", e), 2), b = !1) : c[e]instanceof Function ? c[e].apply(c, a[e]instanceof Array ? a[e] : [a[e]]) : c[e] = a[e]; else if (K[e] === g)Q(p(c[e] === g ? "setupUndef" : "setupError", e), 2), b = !1; else return ta(a[e], e);
      return b
    };
    var nb = function (a) {
      var a = cb.call(a), c = a.length;
      oa ? (a[1] = "on" + a[1], 3 < c && a.pop()) : 3 === c && a.push(!1);
      return a
    }, ob = function (a,
                      c) {
      var e = a.shift(), b = [tb[c]];
      if (oa)e[b](a[0], a[1]); else e[b].apply(e, a)
    }, oa = j.attachEvent, tb = {
      add: oa ? "attachEvent" : "addEventListener",
      remove: oa ? "detachEvent" : "removeEventListener"
    };
    u = {
      add: function () {
        ob(nb(arguments), "add")
      }, remove: function () {
        ob(nb(arguments), "remove")
      }
    };
    E = {
      abort: q(function () {
        c._wD(this._s.id + ": abort")
      }), canplay: q(function () {
        var a = this._s, d;
        if (a._html5_canplay)return !0;
        a._html5_canplay = !0;
        c._wD(a.id + ": canplay");
        a._onbufferchange(0);
        d = a._iO.position !== g && !isNaN(a._iO.position) ? a._iO.position /
        1E3 : null;
        if (a.position && this.currentTime !== d) {
          c._wD(a.id + ": canplay: Setting position to " + d);
          try {
            this.currentTime = d
          } catch (e) {
            c._wD(a.id + ": canplay: Setting position of " + d + " failed: " + e.message, 2)
          }
        }
        a._iO._oncanplay && a._iO._oncanplay()
      }), canplaythrough: q(function () {
        var a = this._s;
        a.loaded || (a._onbufferchange(0), a._whileloading(a.bytesLoaded, a.bytesTotal, a._get_html5_duration()), a._onload(!0))
      }), ended: q(function () {
        var a = this._s;
        c._wD(a.id + ": ended");
        a._onfinish()
      }), error: q(function () {
        c._wD(this._s.id +
          ": HTML5 error, code " + this.error.code);
        this._s._onload(!1)
      }), loadeddata: q(function () {
        var a = this._s;
        c._wD(a.id + ": loadeddata");
        !a._loaded && !Ia && (a.duration = a._get_html5_duration())
      }), loadedmetadata: q(function () {
        c._wD(this._s.id + ": loadedmetadata")
      }), loadstart: q(function () {
        c._wD(this._s.id + ": loadstart");
        this._s._onbufferchange(1)
      }), play: q(function () {
        c._wD(this._s.id + ": play()");
        this._s._onbufferchange(0)
      }), playing: q(function () {
        c._wD(this._s.id + ": playing");
        this._s._onbufferchange(0)
      }), progress: q(function (a) {
        var d =
          this._s, e, b, f;
        e = 0;
        var g = "progress" === a.type, h = a.target.buffered, m = a.loaded || 0, j = a.total || 1;
        d.buffered = [];
        if (h && h.length) {
          e = 0;
          for (b = h.length; e < b; e++)d.buffered.push({start: 1E3 * h.start(e), end: 1E3 * h.end(e)});
          e = 1E3 * (h.end(0) - h.start(0));
          m = e / (1E3 * a.target.duration);
          if (g && 1 < h.length) {
            f = [];
            b = h.length;
            for (e = 0; e < b; e++)f.push(1E3 * a.target.buffered.start(e) + "-" + 1E3 * a.target.buffered.end(e));
            c._wD(this._s.id + ": progress, timeRanges: " + f.join(", "))
          }
          g && !isNaN(m) && c._wD(this._s.id + ": progress, " + Math.floor(100 *
              m) + "% loaded")
        }
        isNaN(m) || (d._onbufferchange(0), d._whileloading(m, j, d._get_html5_duration()), m && (j && m === j) && E.canplaythrough.call(this, a))
      }), ratechange: q(function () {
        c._wD(this._s.id + ": ratechange")
      }), suspend: q(function (a) {
        var d = this._s;
        c._wD(this._s.id + ": suspend");
        E.progress.call(this, a);
        d._onsuspend()
      }), stalled: q(function () {
        c._wD(this._s.id + ": stalled")
      }), timeupdate: q(function () {
        this._s._onTimer()
      }), waiting: q(function () {
        var a = this._s;
        c._wD(this._s.id + ": waiting");
        a._onbufferchange(1)
      })
    };
    la = function (a) {
      return a.serverURL ||
      a.type && ba(a.type) ? !1 : a.type ? Z({type: a.type}) : Z({url: a.url}) || c.html5Only
    };
    Da = function (a, c) {
      a && (a.src = c, a._called_load = !1);
      D && (Fa = null)
    };
    Z = function (a) {
      if (!c.useHTML5Audio || !c.hasHTML5)return !1;
      var d = a.url || null, a = a.type || null, e = c.audioFormats, b;
      if (a && c.html5[a] !== g)return c.html5[a] && !ba(a);
      if (!G) {
        G = [];
        for (b in e)e.hasOwnProperty(b) && (G.push(b), e[b].related && (G = G.concat(e[b].related)));
        G = RegExp("\\.(" + G.join("|") + ")(\\?.*)?$", "i")
      }
      b = d ? d.toLowerCase().match(G) : null;
      !b || !b.length ? a && (d = a.indexOf(";"),
        b = (-1 !== d ? a.substr(0, d) : a).substr(6)) : b = b[1];
      b && c.html5[b] !== g ? d = c.html5[b] && !ba(b) : (a = "audio/" + b, d = c.html5.canPlayType({type: a}), d = (c.html5[b] = d) && c.html5[a] && !ba(a));
      return d
    };
    bb = function () {
      function a(a) {
        var b, e, f = b = !1;
        if (!d || "function" !== typeof d.canPlayType)return b;
        if (a instanceof Array) {
          b = 0;
          for (e = a.length; b < e; b++)if (c.html5[a[b]] || d.canPlayType(a[b]).match(c.html5Test))f = !0, c.html5[a[b]] = !0, c.flash[a[b]] = !!a[b].match(ib);
          b = f
        } else a = d && "function" === typeof d.canPlayType ? d.canPlayType(a) : !1, b = !(!a || !a.match(c.html5Test));
        return b
      }

      if (!c.useHTML5Audio || !c.hasHTML5)return !1;
      var d = Audio !== g ? Ja && 10 > opera.version() ? new Audio(null) : new Audio : null, e, b, f = {}, h;
      h = c.audioFormats;
      for (e in h)if (h.hasOwnProperty(e) && (b = "audio/" + e, f[e] = a(h[e].type), f[b] = f[e], e.match(ib) ? (c.flash[e] = !0, c.flash[b] = !0) : (c.flash[e] = !1, c.flash[b] = !1), h[e] && h[e].related))for (b = h[e].related.length - 1; 0 <= b; b--)f["audio/" + h[e].related[b]] = f[e], c.html5[h[e].related[b]] = f[e], c.flash[h[e].related[b]] = f[e];
      f.canPlayType = d ? a : null;
      c.html5 =
        v(c.html5, f);
      return !0
    };
    F = {
      notReady: "Unavailable - wait until onready() has fired.",
      notOK: "Audio support is not available.",
      domError: "soundManagerexception caught while appending SWF to DOM.",
      spcWmode: "Removing wmode, preventing known SWF loading issue(s)",
      swf404: "soundManager: Verify that %s is a valid path.",
      tryDebug: "Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
      checkSWF: "See SWF output for more debug info.",
      localFail: "soundManager: Non-HTTP page (" + h.location.protocol +
      " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
      waitFocus: "soundManager: Special case: Waiting for SWF to load with window focus...",
      waitForever: "soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
      waitSWF: "soundManager: Waiting for 100% SWF load...",
      needFunction: "soundManager: Function object expected for %s",
      badID: 'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',
      currentObj: "soundManager: _debug(): Current sound objects",
      waitOnload: "soundManager: Waiting for window.onload()",
      docLoaded: "soundManager: Document already loaded",
      onload: "soundManager: initComplete(): calling soundManager.onload()",
      onloadOK: "soundManager.onload() complete",
      didInit: "soundManager: init(): Already called?",
      secNote: "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
      badRemove: "soundManager: Failed to remove Flash node.",
      shutdown: "soundManager.disable(): Shutting down",
      queue: "soundManager: Queueing %s handler",
      smError: "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
      fbTimeout: "No flash response, applying .swf_timedout CSS...",
      fbLoaded: "Flash loaded",
      flRemoved: "soundManager: Flash movie removed.",
      fbHandler: "soundManager: flashBlockHandler()",
      manURL: "SMSound.load(): Using manually-assigned URL",
      onURL: "soundManager.load(): current URL already assigned.",
      badFV: 'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
      as2loop: "Note: Setting stream:false so looping can work (flash 8 limitation)",
      noNSLoop: "Note: Looping not implemented for MovieStar formats",
      needfl9: "Note: Switching to flash 9, required for MP4 formats.",
      mfTimeout: "Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
      needFlash: "soundManager: Fatal error: Flash is needed to play some required formats, but is not available.",
      gotFocus: "soundManager: Got window focus.",
      policy: "Enabling usePolicyFile for data access",
      setup: "soundManager.setup(): allowed parameters: %s",
      setupError: 'soundManager.setup(): "%s" cannot be assigned with this method.',
      setupUndef: 'soundManager.setup(): Could not find option "%s"',
      setupLate: "soundManager.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
      noURL: "soundManager: Flash URL required. Call soundManager.setup({url:...}) to get started.",
      sm2Loaded: "SoundManager 2: Ready.",
      reset: "soundManager.reset(): Removing event callbacks",
      mobileUA: "Mobile UA detected, preferring HTML5 by default.",
      globalHTML5: "Using singleton HTML5 Audio() pattern for this device."
    };
    p = function () {
      var a = cb.call(arguments), c = a.shift(), c = F && F[c] ? F[c] : "", e, b;
      if (c && a && a.length) {
        e = 0;
        for (b = a.length; e < b; e++)c = c.replace("%s", a[e])
      }
      return c
    };
    ha = function (a) {
      8 === l && (1 < a.loops && a.stream) && (k("as2loop"), a.stream = !1);
      return a
    };
    ia = function (a, d) {
      if (a && !a.usePolicyFile && (a.onid3 || a.usePeakData || a.useWaveformData || a.useEQData))c._wD((d || "") + p("policy")), a.usePolicyFile = !0;
      return a
    };
    Q = function (a) {
      console !== g && console.warn !== g ? console.warn(a) : c._wD(a)
    };
    qa = function () {
      return !1
    };
    Va = function (a) {
      for (var c in a)a.hasOwnProperty(c) && "function" === typeof a[c] && (a[c] = qa)
    };
    za = function (a) {
      a === g && (a = !1);
      (r || a) && c.disable(a)
    };
    Wa = function (a) {
      var d = null;
      if (a)if (a.match(/\.swf(\?.*)?$/i)) {
        if (d = a.substr(a.toLowerCase().lastIndexOf(".swf?") + 4))return a
      } else a.lastIndexOf("/") !== a.length - 1 && (a += "/");
      a = (a && -1 !== a.lastIndexOf("/") ? a.substr(0, a.lastIndexOf("/") + 1) : "./") + c.movieURL;
      c.noSWFCache &&
      (a += "?ts=" + (new Date).getTime());
      return a
    };
    va = function () {
      l = parseInt(c.flashVersion, 10);
      8 !== l && 9 !== l && (c._wD(p("badFV", l, 8)), c.flashVersion = l = 8);
      var a = c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
      c.useHTML5Audio && (!c.html5Only && c.audioFormats.mp4.required && 9 > l) && (c._wD(p("needfl9")), c.flashVersion = l = 9);
      c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : 9 === l ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
      8 < l ? (c.defaultOptions = v(c.defaultOptions, c.flash9Options), c.features.buffering = !0, c.defaultOptions =
        v(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 = RegExp("\\.(mp3|" + lb.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0) : c.features.movieStar = !1;
      c.filePattern = c.filePatterns[8 !== l ? "flash9" : "flash8"];
      c.movieURL = (8 === l ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", a);
      c.features.peakData = c.features.waveformData = c.features.eqData = 8 < l
    };
    Ta = function (a, c) {
      if (!i)return !1;
      i._setPolling(a, c)
    };
    ya = function () {
      c.debugURLParam.test(R) && (c.debugMode = !0);
      if (A(c.debugID))return !1;
      var a,
        d, e, b;
      if (c.debugMode && !A(c.debugID) && (!gb || !c.useConsole || !c.consoleOnly)) {
        a = h.createElement("div");
        a.id = c.debugID + "-toggle";
        d = {
          position: "fixed",
          bottom: "0px",
          right: "0px",
          width: "1.2em",
          height: "1.2em",
          lineHeight: "1.2em",
          margin: "2px",
          textAlign: "center",
          border: "1px solid #999",
          cursor: "pointer",
          background: "#fff",
          color: "#333",
          zIndex: 10001
        };
        a.appendChild(h.createTextNode("-"));
        a.onclick = Xa;
        a.title = "Toggle SM2 debug console";
        s.match(/msie 6/i) && (a.style.position = "absolute", a.style.cursor = "hand");
        for (b in d)d.hasOwnProperty(b) &&
        (a.style[b] = d[b]);
        d = h.createElement("div");
        d.id = c.debugID;
        d.style.display = c.debugMode ? "block" : "none";
        if (c.debugMode && !A(a.id)) {
          try {
            e = fa(), e.appendChild(a)
          } catch (f) {
            throw Error(p("domError") + " \n" + f.toString());
          }
          e.appendChild(d)
        }
      }
    };
    t = this.getSoundById;
    k = function (a, d) {
      return !a ? "" : c._wD(p(a), d)
    };
    Xa = function () {
      var a = A(c.debugID), d = A(c.debugID + "-toggle");
      if (!a)return !1;
      sa ? (d.innerHTML = "+", a.style.display = "none") : (d.innerHTML = "-", a.style.display = "block");
      sa = !sa
    };
    x = function (a, c, e) {
      if (j.sm2Debugger !== g)try {
        sm2Debugger.handleEvent(a,
          c, e)
      } catch (b) {
      }
      return !0
    };
    P = function () {
      var a = [];
      c.debugMode && a.push("sm2_debug");
      c.debugFlash && a.push("flash_debug");
      c.useHighPerformance && a.push("high_performance");
      return a.join(" ")
    };
    Ba = function () {
      var a = p("fbHandler"), d = c.getMoviePercent(), e = {type: "FLASHBLOCK"};
      if (c.html5Only)return !1;
      c.ok() ? (c.didFlashBlock && c._wD(a + ": Unblocked"), c.oMC && (c.oMC.className = [P(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" "))) : (B && (c.oMC.className = P() + " movieContainer " + (null === d ? "swf_timedout" :
          "swf_error"), c._wD(a + ": " + p("fbTimeout") + (d ? " (" + p("fbLoaded") + ")" : ""))), c.didFlashBlock = !0, I({
        type: "ontimeout",
        ignoreInit: !0,
        error: e
      }), O(e))
    };
    ua = function (a, c, e) {
      C[a] === g && (C[a] = []);
      C[a].push({method: c, scope: e || null, fired: !1})
    };
    I = function (a) {
      a || (a = {type: c.ok() ? "onready" : "ontimeout"});
      if (!n && a && !a.ignoreInit || "ontimeout" === a.type && (c.ok() || r && !a.ignoreInit))return !1;
      var d = {success: a && a.ignoreInit ? c.ok() : !r}, e = a && a.type ? C[a.type] || [] : [], b = [], f, d = [d], g = B && !c.ok();
      a.error && (d[0].error = a.error);
      a = 0;
      for (f =
             e.length; a < f; a++)!0 !== e[a].fired && b.push(e[a]);
      if (b.length) {
        a = 0;
        for (f = b.length; a < f; a++)b[a].scope ? b[a].method.apply(b[a].scope, d) : b[a].method.apply(this, d), g || (b[a].fired = !0)
      }
      return !0
    };
    L = function () {
      j.setTimeout(function () {
        c.useFlashBlock && Ba();
        I();
        "function" === typeof c.onload && (k("onload", 1), c.onload.apply(j), k("onloadOK", 1));
        c.waitForWindowLoad && u.add(j, "load", L)
      }, 1)
    };
    Ga = function () {
      if (z !== g)return z;
      var a = !1, c = navigator, e = c.plugins, b, f = j.ActiveXObject;
      if (e && e.length)(c = c.mimeTypes) && (c["application/x-shockwave-flash"] &&
      c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description) && (a = !0); else if (f !== g && !s.match(/MSAppHost/i)) {
        try {
          b = new f("ShockwaveFlash.ShockwaveFlash")
        } catch (h) {
        }
        a = !!b
      }
      return z = a
    };
    ab = function () {
      var a, d, e = c.audioFormats;
      if (ma && s.match(/os (1|2|3_0|3_1)/i))c.hasHTML5 = !1, c.html5Only = !0, c.oMC && (c.oMC.style.display = "none"); else if (c.useHTML5Audio) {
        if (!c.html5 || !c.html5.canPlayType)c._wD("SoundManager: No HTML5 Audio() support detected."), c.hasHTML5 = !1;
        La && c._wD("soundManager: Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - " + (!z ? " would use flash fallback for MP3/MP4, but none detected." : "will use flash fallback for MP3/MP4, if available"), 1)
      }
      if (c.useHTML5Audio && c.hasHTML5)for (d in e)if (e.hasOwnProperty(d) && (e[d].required && !c.html5.canPlayType(e[d].type) || c.preferFlash && (c.flash[d] || c.flash[e[d].type])))a = !0;
      c.ignoreFlash && (a = !1);
      c.html5Only = c.hasHTML5 && c.useHTML5Audio && !a;
      return !c.html5Only
    };
    ka = function (a) {
      var d, e, b = 0;
      if (a instanceof Array) {
        d = 0;
        for (e = a.length; d < e; d++)if (a[d]instanceof Object) {
          if (c.canPlayMIME(a[d].type)) {
            b = d;
            break
          }
        } else if (c.canPlayURL(a[d])) {
          b = d;
          break
        }
        a[b].url && (a[b] = a[b].url);
        a = a[b]
      }
      return a
    };
    Ya = function (a) {
      a._hasTimer || (a._hasTimer = !0, !Ka && c.html5PollingInterval && (null === Y && 0 === ja && (Y = j.setInterval($a, c.html5PollingInterval)), ja++))
    };
    Za = function (a) {
      a._hasTimer && (a._hasTimer = !1, !Ka && c.html5PollingInterval && ja--)
    };
    $a = function () {
      var a;
      if (null !== Y && !ja)return j.clearInterval(Y),
        Y = null, !1;
      for (a = c.soundIDs.length - 1; 0 <= a; a--)c.sounds[c.soundIDs[a]].isHTML5 && c.sounds[c.soundIDs[a]]._hasTimer && c.sounds[c.soundIDs[a]]._onTimer()
    };
    O = function (a) {
      a = a !== g ? a : {};
      "function" === typeof c.onerror && c.onerror.apply(j, [{type: a.type !== g ? a.type : null}]);
      a.fatal !== g && a.fatal && c.disable()
    };
    db = function () {
      if (!La || !Ga())return !1;
      var a = c.audioFormats, d, e;
      for (e in a)if (a.hasOwnProperty(e) && ("mp3" === e || "mp4" === e))if (c._wD("soundManager: Using flash fallback for " + e + " format"), c.html5[e] = !1, a[e] && a[e].related)for (d =
                                                                                                                                                                                             a[e].related.length - 1; 0 <= d; d--)c.html5[a[e].related[d]] = !1
    };
    this._setSandboxType = function (a) {
      var d = c.sandbox;
      d.type = a;
      d.description = d.types[d.types[a] !== g ? a : "unknown"];
      "localWithFile" === d.type ? (d.noRemote = !0, d.noLocal = !1, k("secNote", 2)) : "localWithNetwork" === d.type ? (d.noRemote = !1, d.noLocal = !0) : "localTrusted" === d.type && (d.noRemote = !1, d.noLocal = !1)
    };
    this._externalInterfaceOK = function (a, d) {
      if (c.swfLoaded)return !1;
      var e;
      x("swf", !0);
      x("flashtojs", !0);
      c.swfLoaded = !0;
      na = !1;
      La && db();
      if (!d || d.replace(/\+dev/i,
          "") !== c.versionNumber.replace(/\+dev/i, ""))return e = 'soundManager: Fatal: JavaScript file build "' + c.versionNumber + '" does not match Flash SWF build "' + d + '" at ' + c.url + ". Ensure both are up-to-date.", setTimeout(function () {
        throw Error(e);
      }, 0), !1;
      setTimeout(ra, H ? 100 : 1)
    };
    ga = function (a, d) {
      function e() {
        var a = [], b, d = [];
        b = "SoundManager " + c.version + (!c.html5Only && c.useHTML5Audio ? c.hasHTML5 ? " + HTML5 audio" : ", no HTML5 audio support" : "");
        c.html5Only ? c.html5PollingInterval && a.push("html5PollingInterval (" +
          c.html5PollingInterval + "ms)") : (c.preferFlash && a.push("preferFlash"), c.useHighPerformance && a.push("useHighPerformance"), c.flashPollingInterval && a.push("flashPollingInterval (" + c.flashPollingInterval + "ms)"), c.html5PollingInterval && a.push("html5PollingInterval (" + c.html5PollingInterval + "ms)"), c.wmode && a.push("wmode (" + c.wmode + ")"), c.debugFlash && a.push("debugFlash"), c.useFlashBlock && a.push("flashBlock"));
        a.length && (d = d.concat([a.join(" + ")]));
        c._wD(b + (d.length ? " + " + d.join(", ") : ""), 1);
        eb()
      }

      function b(a,
                 b) {
        return '<param name="' + a + '" value="' + b + '" />'
      }

      if (S && T)return !1;
      if (c.html5Only)return va(), e(), c.oMC = A(c.movieID), ra(), T = S = !0, !1;
      var f = d || c.url, j = c.altURL || f, i = fa(), m = P(), l = null, l = h.getElementsByTagName("html")[0], k, q, n, l = l && l.dir && l.dir.match(/rtl/i), a = a === g ? c.id : a;
      va();
      c.url = Wa($ ? f : j);
      d = c.url;
      c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
      if (null !== c.wmode && (s.match(/msie 8/i) || !H && !c.useHighPerformance) && navigator.platform.match(/win32|win64/i))J.push(F.spcWmode), c.wmode = null;
      i =
      {
        name: a,
        id: a,
        src: d,
        quality: "high",
        allowScriptAccess: c.allowScriptAccess,
        bgcolor: c.bgColor,
        pluginspage: jb + "www.macromedia.com/go/getflashplayer",
        title: "JS/Flash audio component (SoundManager 2)",
        type: "application/x-shockwave-flash",
        wmode: c.wmode,
        hasPriority: "true"
      };
      c.debugFlash && (i.FlashVars = "debug=1");
      c.wmode || delete i.wmode;
      if (H)f = h.createElement("div"), q = ['<object id="' + a + '" data="' + d + '" type="' + i.type + '" title="' + i.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + jb + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
        b("movie", d), b("AllowScriptAccess", c.allowScriptAccess), b("quality", i.quality), c.wmode ? b("wmode", c.wmode) : "", b("bgcolor", c.bgColor), b("hasPriority", "true"), c.debugFlash ? b("FlashVars", i.FlashVars) : "", "</object>"].join(""); else for (k in f = h.createElement("embed"), i)i.hasOwnProperty(k) && f.setAttribute(k, i[k]);
      ya();
      m = P();
      if (i = fa())if (c.oMC = A(c.movieID) || h.createElement("div"), c.oMC.id)n = c.oMC.className, c.oMC.className = (n ? n + " " : "movieContainer") + (m ? " " + m : ""), c.oMC.appendChild(f), H && (k = c.oMC.appendChild(h.createElement("div")),
        k.className = "sm2-object-box", k.innerHTML = q), T = !0; else {
        c.oMC.id = c.movieID;
        c.oMC.className = "movieContainer " + m;
        k = m = null;
        c.useFlashBlock || (c.useHighPerformance ? m = {
          position: "fixed",
          width: "8px",
          height: "8px",
          bottom: "0px",
          left: "0px",
          overflow: "hidden"
        } : (m = {
          position: "absolute",
          width: "6px",
          height: "6px",
          top: "-9999px",
          left: "-9999px"
        }, l && (m.left = Math.abs(parseInt(m.left, 10)) + "px")));
        rb && (c.oMC.style.zIndex = 1E4);
        if (!c.debugFlash)for (n in m)m.hasOwnProperty(n) && (c.oMC.style[n] = m[n]);
        try {
          H || c.oMC.appendChild(f),
            i.appendChild(c.oMC), H && (k = c.oMC.appendChild(h.createElement("div")), k.className = "sm2-object-box", k.innerHTML = q), T = !0
        } catch (r) {
          throw Error(p("domError") + " \n" + r.toString());
        }
      }
      S = !0;
      e();
      return !0
    };
    ea = function () {
      if (c.html5Only)return ga(), !1;
      if (i)return !1;
      if (!c.url)return k("noURL"), !1;
      i = c.getMovie(c.id);
      i || (W ? (H ? c.oMC.innerHTML = Aa : c.oMC.appendChild(W), W = null, S = !0) : ga(c.id, c.url), i = c.getMovie(c.id));
      "function" === typeof c.oninitmovie && setTimeout(c.oninitmovie, 1);
      Ha();
      return !0
    };
    M = function () {
      setTimeout(Sa,
        1E3)
    };
    Sa = function () {
      var a, d = !1;
      if (!c.url || X)return !1;
      X = !0;
      u.remove(j, "load", M);
      if (na && !Ma)return k("waitFocus"), !1;
      n || (a = c.getMoviePercent(), 0 < a && 100 > a && (d = !0));
      setTimeout(function () {
        a = c.getMoviePercent();
        if (d)return X = !1, c._wD(p("waitSWF")), j.setTimeout(M, 1), !1;
        n || (c._wD("soundManager: No Flash response within expected time. Likely causes: " + (0 === a ? "SWF load failed, " : "") + "Flash blocked or JS-Flash security error." + (c.debugFlash ? " " + p("checkSWF") : ""), 2), !$ && a && (k("localFail", 2), c.debugFlash || k("tryDebug",
          2)), 0 === a && c._wD(p("swf404", c.url), 1), x("flashtojs", !1, ": Timed out" + $ ? " (Check flash security or flash blockers)" : " (No plugin/missing SWF?)"));
        !n && hb && (null === a ? c.useFlashBlock || 0 === c.flashLoadTimeout ? (c.useFlashBlock && Ba(), k("waitForever")) : (k("waitForever"), I({
          type: "ontimeout",
          ignoreInit: !0
        })) : 0 === c.flashLoadTimeout ? k("waitForever") : za(!0))
      }, c.flashLoadTimeout)
    };
    da = function () {
      if (Ma || !na)return u.remove(j, "focus", da), !0;
      Ma = hb = !0;
      k("gotFocus");
      X = !1;
      M();
      u.remove(j, "focus", da);
      return !0
    };
    Ha = function () {
      J.length &&
      (c._wD("SoundManager 2: " + J.join(" "), 1), J = [])
    };
    eb = function () {
      Ha();
      var a, d = [];
      if (c.useHTML5Audio && c.hasHTML5) {
        for (a in c.audioFormats)c.audioFormats.hasOwnProperty(a) && d.push(a + " = " + c.html5[a] + (!c.html5[a] && z && c.flash[a] ? " (using flash)" : c.preferFlash && c.flash[a] && z ? " (preferring flash)" : !c.html5[a] ? " (" + (c.audioFormats[a].required ? "required, " : "") + "and no flash support)" : ""));
        c._wD("SoundManager 2 HTML5 support: " + d.join(", "), 1)
      }
    };
    U = function (a) {
      if (n)return !1;
      if (c.html5Only)return k("sm2Loaded"),
        n = !0, L(), x("onload", !0), !0;
      var d = !0, e;
      if (!c.useFlashBlock || !c.flashLoadTimeout || c.getMoviePercent())n = !0, r && (e = {type: !z && B ? "NO_FLASH" : "INIT_TIMEOUT"});
      c._wD("SoundManager 2 " + (r ? "failed to load" : "loaded") + " (" + (r ? "Flash security/load error" : "OK") + ")", r ? 2 : 1);
      r || a ? (c.useFlashBlock && c.oMC && (c.oMC.className = P() + " " + (null === c.getMoviePercent() ? "swf_timedout" : "swf_error")), I({
        type: "ontimeout",
        error: e,
        ignoreInit: !0
      }), x("onload", !1), O(e), d = !1) : x("onload", !0);
      r || (c.waitForWindowLoad && !ca ? (k("waitOnload"),
        u.add(j, "load", L)) : (c.waitForWindowLoad && ca && k("docLoaded"), L()));
      return d
    };
    Ra = function () {
      var a, d = c.setupOptions;
      for (a in d)d.hasOwnProperty(a) && (c[a] === g ? c[a] = d[a] : c[a] !== d[a] && (c.setupOptions[a] = c[a]))
    };
    ra = function () {
      if (n)return k("didInit"), !1;
      if (c.html5Only)return n || (u.remove(j, "load", c.beginDelayedInit), c.enabled = !0, U()), !0;
      ea();
      try {
        i._externalInterfaceTest(!1), Ta(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)), c.debugMode || i._disableDebug(), c.enabled = !0, x("jstoflash", !0), c.html5Only ||
        u.add(j, "unload", qa)
      } catch (a) {
        return c._wD("js/flash exception: " + a.toString()), x("jstoflash", !1), O({
          type: "JS_TO_FLASH_EXCEPTION",
          fatal: !0
        }), za(!0), U(), !1
      }
      U();
      u.remove(j, "load", c.beginDelayedInit);
      return !0
    };
    N = function () {
      if (V)return !1;
      V = !0;
      Ra();
      ya();
      var a = null, a = null, d = j.console !== g && "function" === typeof console.log, e = R.toLowerCase();
      -1 !== e.indexOf("sm2-usehtml5audio=") && (a = "1" === e.charAt(e.indexOf("sm2-usehtml5audio=") + 18), d && console.log((a ? "Enabling " : "Disabling ") + "useHTML5Audio via URL parameter"),
        c.setup({useHTML5Audio: a}));
      -1 !== e.indexOf("sm2-preferflash=") && (a = "1" === e.charAt(e.indexOf("sm2-preferflash=") + 16), d && console.log((a ? "Enabling " : "Disabling ") + "preferFlash via URL parameter"), c.setup({preferFlash: a}));
      !z && c.hasHTML5 && (c._wD("SoundManager: No Flash detected" + (!c.useHTML5Audio ? ", enabling HTML5." : ". Trying HTML5-only mode."), 1), c.setup({
        useHTML5Audio: !0,
        preferFlash: !1
      }));
      bb();
      c.html5.usingFlash = ab();
      B = c.html5.usingFlash;
      !z && B && (J.push(F.needFlash), c.setup({flashLoadTimeout: 1}));
      h.removeEventListener &&
      h.removeEventListener("DOMContentLoaded", N, !1);
      ea();
      return !0
    };
    Ea = function () {
      "complete" === h.readyState && (N(), h.detachEvent("onreadystatechange", Ea));
      return !0
    };
    xa = function () {
      ca = !0;
      u.remove(j, "load", xa)
    };
    wa = function () {
      if (Ka && ((!c.setupOptions.useHTML5Audio || c.setupOptions.preferFlash) && J.push(F.mobileUA), c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash = !1, ma || fb && !s.match(/android\s2\.3/i)))J.push(F.globalHTML5), ma && (c.ignoreFlash = !0), D = !0
    };
    wa();
    Ga();
    u.add(j, "focus", da);
    u.add(j, "load", M);
    u.add(j,
      "load", xa);
    h.addEventListener ? h.addEventListener("DOMContentLoaded", N, !1) : h.attachEvent ? h.attachEvent("onreadystatechange", Ea) : (x("onload", !1), O({
      type: "NO_DOM2_EVENTS",
      fatal: !0
    }))
  }

  var pa = null;
  if (void 0 === j.SM2_DEFER || !SM2_DEFER)pa = new aa;
  j.SoundManager = aa;
  j.soundManager = pa
})(window);