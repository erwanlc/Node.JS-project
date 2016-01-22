/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20130101
 */
(function (i, g) {
  function R(R, fa) {
    function S(b) {
      return c.preferFlash && A && !c.ignoreFlash && c.flash[b] !== g && c.flash[b]
    }

    function m(b) {
      return function (c) {
        var d = this._s;
        return !d || !d._a ? null : b.call(this, c)
      }
    }

    this.setupOptions = {
      url: R || null,
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
      isMovieStar: null,
      usePeakData: !1,
      useWaveformData: !1,
      useEQData: !1,
      onbufferchange: null,
      ondataerror: null
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
      wav: {type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"], required: !1}
    };
    this.movieID =
      "sm2-container";
    this.id = fa || "sm2movie";
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
    this.features = {buffering: !1, peakData: !1, waveformData: !1, eqData: !1, movieStar: !1};
    this.sandbox = {};
    this.html5 = {usingFlash: null};
    this.flash = {};
    this.ignoreFlash = this.html5Only = !1;
    var Ga, c = this, Ha = null, h = null, T, q = navigator.userAgent, ga = i.location.href.toString(), l = document, ha, Ia, ia, k, r = [], J = !1, K = !1, j = !1, s = !1, ja = !1, L, t, ka, U, la, B, C, D, Ja, ma, V, na, W, oa, E, pa, M, qa, X, F, Ka, ra, La, sa, Ma, N = null, ta = null, v, ua, G, Y, Z, H, p, O = !1, va = !1, Na, Oa, Pa, $ = 0, P = null, aa, Qa = [], u = null, Ra, ba, Q, y, wa, xa, Sa, n, db = Array.prototype.slice, w = !1, ya, A, za, Ta, x, ca = q.match(/(ipad|iphone|ipod)/i), Ua = q.match(/android/i), z = q.match(/msie/i), eb = q.match(/webkit/i), Aa = q.match(/safari/i) && !q.match(/chrome/i), Ba = q.match(/opera/i), Ca = q.match(/(mobile|pre\/|xoom)/i) || ca || Ua, Va = !ga.match(/usehtml5audio/i) && !ga.match(/sm2\-ignorebadua/i) && Aa && !q.match(/silk/i) && q.match(/OS X 10_6_([3-7])/i), Da = l.hasFocus !== g ? l.hasFocus() : null, da = Aa && (l.hasFocus === g || !l.hasFocus()), Wa = !da, Xa = /(mp3|mp4|mpa|m4a|m4b)/i, Ea = l.location ? l.location.protocol.match(/http/i) : null, Ya = !Ea ? "http://" : "", Za = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i, $a = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
      fb = RegExp("\\.(" + $a.join("|") + ")(\\?.*)?$", "i");
    this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
    this.useAltURL = !Ea;
    var Fa;
    try {
      Fa = Audio !== g && (Ba && opera !== g && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== g
    } catch (hb) {
      Fa = !1
    }
    this.hasHTML5 = Fa;
    this.setup = function (b) {
      var e = !c.url;
      b !== g && (j && u && c.ok() && (b.flashVersion !== g || b.url !== g || b.html5Test !== g)) && H(v("setupLate"));
      ka(b);
      e && (M && b.url !== g) && c.beginDelayedInit();
      !M && (b.url !== g && "complete" === l.readyState) && setTimeout(E, 1);
      return c
    };
    this.supported = this.ok = function () {
      return u ? j && !s : c.useHTML5Audio && c.hasHTML5
    };
    this.getMovie = function (b) {
      return T(b) || l[b] || i[b]
    };
    this.createSound = function (b, e) {
      function d() {
        a = Y(a);
        c.sounds[a.id] = new Ga(a);
        c.soundIDs.push(a.id);
        return c.sounds[a.id]
      }

      var a, f = null;
      if (!j || !c.ok())return H(void 0), !1;
      e !== g && (b = {id: b, url: e});
      a = t(b);
      a.url = aa(a.url);
      if (p(a.id, !0))return c.sounds[a.id];
      ba(a) ? (f = d(), f._setup_html5(a)) : (8 < k && null === a.isMovieStar && (a.isMovieStar = !(!a.serverURL && !(a.type && a.type.match(Za) || a.url.match(fb)))),
        a = Z(a, void 0), f = d(), 8 === k ? h._createSound(a.id, a.loops || 1, a.usePolicyFile) : (h._createSound(a.id, a.url, a.usePeakData, a.useWaveformData, a.useEQData, a.isMovieStar, a.isMovieStar ? a.bufferTime : !1, a.loops || 1, a.serverURL, a.duration || null, a.autoPlay, !0, a.autoLoad, a.usePolicyFile), a.serverURL || (f.connected = !0, a.onconnect && a.onconnect.apply(f))), !a.serverURL && (a.autoLoad || a.autoPlay) && f.load(a));
      !a.serverURL && a.autoPlay && f.play();
      return f
    };
    this.destroySound = function (b, e) {
      if (!p(b))return !1;
      var d = c.sounds[b], a;
      d._iO = {};
      d.stop();
      d.unload();
      for (a = 0; a < c.soundIDs.length; a++)if (c.soundIDs[a] === b) {
        c.soundIDs.splice(a, 1);
        break
      }
      e || d.destruct(!0);
      delete c.sounds[b];
      return !0
    };
    this.load = function (b, e) {
      return !p(b) ? !1 : c.sounds[b].load(e)
    };
    this.unload = function (b) {
      return !p(b) ? !1 : c.sounds[b].unload()
    };
    this.onposition = this.onPosition = function (b, e, d, a) {
      return !p(b) ? !1 : c.sounds[b].onposition(e, d, a)
    };
    this.clearOnPosition = function (b, e, d) {
      return !p(b) ? !1 : c.sounds[b].clearOnPosition(e, d)
    };
    this.start = this.play = function (b, e) {
      var d =
        !1;
      return !j || !c.ok() ? (H("soundManager.play(): " + v(!j ? "notReady" : "notOK")), d) : !p(b) ? (e instanceof Object || (e = {url: e}), e && e.url && (e.id = b, d = c.createSound(e).play()), d) : c.sounds[b].play(e)
    };
    this.setPosition = function (b, e) {
      return !p(b) ? !1 : c.sounds[b].setPosition(e)
    };
    this.stop = function (b) {
      return !p(b) ? !1 : c.sounds[b].stop()
    };
    this.stopAll = function () {
      for (var b in c.sounds)c.sounds.hasOwnProperty(b) && c.sounds[b].stop()
    };
    this.pause = function (b) {
      return !p(b) ? !1 : c.sounds[b].pause()
    };
    this.pauseAll = function () {
      var b;
      for (b = c.soundIDs.length - 1; 0 <= b; b--)c.sounds[c.soundIDs[b]].pause()
    };
    this.resume = function (b) {
      return !p(b) ? !1 : c.sounds[b].resume()
    };
    this.resumeAll = function () {
      var b;
      for (b = c.soundIDs.length - 1; 0 <= b; b--)c.sounds[c.soundIDs[b]].resume()
    };
    this.togglePause = function (b) {
      return !p(b) ? !1 : c.sounds[b].togglePause()
    };
    this.setPan = function (b, e) {
      return !p(b) ? !1 : c.sounds[b].setPan(e)
    };
    this.setVolume = function (b, e) {
      return !p(b) ? !1 : c.sounds[b].setVolume(e)
    };
    this.mute = function (b) {
      var e = 0;
      b instanceof String && (b = null);
      if (b)return !p(b) ?
        !1 : c.sounds[b].mute();
      for (e = c.soundIDs.length - 1; 0 <= e; e--)c.sounds[c.soundIDs[e]].mute();
      return c.muted = !0
    };
    this.muteAll = function () {
      c.mute()
    };
    this.unmute = function (b) {
      b instanceof String && (b = null);
      if (b)return !p(b) ? !1 : c.sounds[b].unmute();
      for (b = c.soundIDs.length - 1; 0 <= b; b--)c.sounds[c.soundIDs[b]].unmute();
      c.muted = !1;
      return !0
    };
    this.unmuteAll = function () {
      c.unmute()
    };
    this.toggleMute = function (b) {
      return !p(b) ? !1 : c.sounds[b].toggleMute()
    };
    this.getMemoryUse = function () {
      var b = 0;
      h && 8 !== k && (b = parseInt(h._getMemoryUse(),
        10));
      return b
    };
    this.disable = function (b) {
      var e;
      b === g && (b = !1);
      if (s)return !1;
      s = !0;
      for (e = c.soundIDs.length - 1; 0 <= e; e--)La(c.sounds[c.soundIDs[e]]);
      L(b);
      n.remove(i, "load", C);
      return !0
    };
    this.canPlayMIME = function (b) {
      var e;
      c.hasHTML5 && (e = Q({type: b}));
      !e && u && (e = b && c.ok() ? !!(8 < k && b.match(Za) || b.match(c.mimePattern)) : null);
      return e
    };
    this.canPlayURL = function (b) {
      var e;
      c.hasHTML5 && (e = Q({url: b}));
      !e && u && (e = b && c.ok() ? !!b.match(c.filePattern) : null);
      return e
    };
    this.canPlayLink = function (b) {
      return b.type !== g && b.type && c.canPlayMIME(b.type) ?
        !0 : c.canPlayURL(b.href)
    };
    this.getSoundById = function (b) {
      if (!b)throw Error("soundManager.getSoundById(): sID is null/_undefined");
      return c.sounds[b]
    };
    this.onready = function (b, c) {
      if ("function" === typeof b)c || (c = i), la("onready", b, c), B(); else throw v("needFunction", "onready");
      return !0
    };
    this.ontimeout = function (b, c) {
      if ("function" === typeof b)c || (c = i), la("ontimeout", b, c), B({type: "ontimeout"}); else throw v("needFunction", "ontimeout");
      return !0
    };
    this._wD = this._writeDebug = function () {
      return !0
    };
    this._debug = function () {
    };
    this.reboot = function (b, e) {
      var d, a, f;
      for (d = c.soundIDs.length - 1; 0 <= d; d--)c.sounds[c.soundIDs[d]].destruct();
      if (h)try {
        z && (ta = h.innerHTML), N = h.parentNode.removeChild(h)
      } catch (g) {
      }
      ta = N = u = h = null;
      c.enabled = M = j = O = va = J = K = s = w = c.swfLoaded = !1;
      c.soundIDs = [];
      c.sounds = {};
      if (b)r = []; else for (d in r)if (r.hasOwnProperty(d)) {
        a = 0;
        for (f = r[d].length; a < f; a++)r[d][a].fired = !1
      }
      c.html5 = {usingFlash: null};
      c.flash = {};
      c.html5Only = !1;
      c.ignoreFlash = !1;
      i.setTimeout(function () {
        oa();
        e || c.beginDelayedInit()
      }, 20);
      return c
    };
    this.reset =
      function () {
        return c.reboot(!0, !0)
      };
    this.getMoviePercent = function () {
      return h && "PercentLoaded"in h ? h.PercentLoaded() : null
    };
    this.beginDelayedInit = function () {
      ja = !0;
      E();
      setTimeout(function () {
        if (va)return !1;
        X();
        W();
        return va = !0
      }, 20);
      D()
    };
    this.destruct = function () {
      c.disable(!0)
    };
    Ga = function (b) {
      var e, d, a = this, f, ab, i, I, l, m, q = !1, j = [], n = 0, s, u, r = null;
      d = e = null;
      this.sID = this.id = b.id;
      this.url = b.url;
      this._iO = this.instanceOptions = this.options = t(b);
      this.pan = this.options.pan;
      this.volume = this.options.volume;
      this.isHTML5 = !1;
      this._a = null;
      this.id3 = {};
      this._debug = function () {
      };
      this.load = function (b) {
        var c = null;
        b !== g ? a._iO = t(b, a.options) : (b = a.options, a._iO = b, r && r !== a.url && (a._iO.url = a.url, a.url = null));
        a._iO.url || (a._iO.url = a.url);
        a._iO.url = aa(a._iO.url);
        b = a.instanceOptions = a._iO;
        if (b.url === a.url && 0 !== a.readyState && 2 !== a.readyState)return 3 === a.readyState && b.onload && b.onload.apply(a, [!!a.duration]), a;
        a.loaded = !1;
        a.readyState = 1;
        a.playState = 0;
        a.id3 = {};
        if (ba(b))c = a._setup_html5(b), c._called_load || (a._html5_canplay = !1, a.url !==
        b.url && (a._a.src = b.url, a.setPosition(0)), a._a.autobuffer = "auto", a._a.preload = "auto", a._a._called_load = !0, b.autoPlay && a.play()); else try {
          a.isHTML5 = !1, a._iO = Z(Y(b)), b = a._iO, 8 === k ? h._load(a.id, b.url, b.stream, b.autoPlay, b.usePolicyFile) : h._load(a.id, b.url, !!b.stream, !!b.autoPlay, b.loops || 1, !!b.autoLoad, b.usePolicyFile)
        } catch (e) {
          F({type: "SMSOUND_LOAD_JS_EXCEPTION", fatal: !0})
        }
        a.url = b.url;
        return a
      };
      this.unload = function () {
        0 !== a.readyState && (a.isHTML5 ? (I(), a._a && (a._a.pause(), wa(a._a, "about:blank"), r = "about:blank")) :
          8 === k ? h._unload(a.id, "about:blank") : h._unload(a.id), f());
        return a
      };
      this.destruct = function (b) {
        a.isHTML5 ? (I(), a._a && (a._a.pause(), wa(a._a), w || i(), a._a._s = null, a._a = null)) : (a._iO.onfailure = null, h._destroySound(a.id));
        b || c.destroySound(a.id, !0)
      };
      this.start = this.play = function (b, c) {
        var e, d;
        d = !0;
        d = null;
        c = c === g ? !0 : c;
        b || (b = {});
        a.url && (a._iO.url = a.url);
        a._iO = t(a._iO, a.options);
        a._iO = t(b, a._iO);
        a._iO.url = aa(a._iO.url);
        a.instanceOptions = a._iO;
        if (a._iO.serverURL && !a.connected)return a.getAutoPlay() || a.setAutoPlay(!0),
          a;
        ba(a._iO) && (a._setup_html5(a._iO), l());
        1 === a.playState && !a.paused && ((e = a._iO.multiShot) || (d = a));
        if (null !== d)return d;
        b.url && b.url !== a.url && a.load(a._iO);
        a.loaded || (0 === a.readyState ? (a.isHTML5 || (a._iO.autoPlay = !0), a.load(a._iO), a.instanceOptions = a._iO) : 2 === a.readyState && (d = a));
        if (null !== d)return d;
        !a.isHTML5 && (9 === k && 0 < a.position && a.position === a.duration) && (b.position = 0);
        if (a.paused && 0 <= a.position && (!a._iO.serverURL || 0 < a.position))a.resume(); else {
          a._iO = t(b, a._iO);
          if (null !== a._iO.from && null !== a._iO.to &&
            0 === a.instanceCount && 0 === a.playState && !a._iO.serverURL) {
            e = function () {
              a._iO = t(b, a._iO);
              a.play(a._iO)
            };
            if (a.isHTML5 && !a._html5_canplay)a.load({oncanplay: e}), d = !1; else if (!a.isHTML5 && !a.loaded && (!a.readyState || 2 !== a.readyState))a.load({onload: e}), d = !1;
            if (null !== d)return d;
            a._iO = u()
          }
          (!a.instanceCount || a._iO.multiShotEvents || !a.isHTML5 && 8 < k && !a.getAutoPlay()) && a.instanceCount++;
          a._iO.onposition && 0 === a.playState && m(a);
          a.playState = 1;
          a.paused = !1;
          a.position = a._iO.position !== g && !isNaN(a._iO.position) ? a._iO.position :
            0;
          a.isHTML5 || (a._iO = Z(Y(a._iO)));
          a._iO.onplay && c && (a._iO.onplay.apply(a), q = !0);
          a.setVolume(a._iO.volume, !0);
          a.setPan(a._iO.pan, !0);
          a.isHTML5 ? (l(), d = a._setup_html5(), a.setPosition(a._iO.position), d.play()) : (d = h._start(a.id, a._iO.loops || 1, 9 === k ? a._iO.position : a._iO.position / 1E3, a._iO.multiShot), 9 === k && !d && a._iO.onplayerror && a._iO.onplayerror.apply(a))
        }
        return a
      };
      this.stop = function (b) {
        var c = a._iO;
        1 === a.playState && (a._onbufferchange(0), a._resetOnPosition(0), a.paused = !1, a.isHTML5 || (a.playState = 0), s(), c.to &&
        a.clearOnPosition(c.to), a.isHTML5 ? a._a && (b = a.position, a.setPosition(0), a.position = b, a._a.pause(), a.playState = 0, a._onTimer(), I()) : (h._stop(a.id, b), c.serverURL && a.unload()), a.instanceCount = 0, a._iO = {}, c.onstop && c.onstop.apply(a));
        return a
      };
      this.setAutoPlay = function (b) {
        a._iO.autoPlay = b;
        a.isHTML5 || (h._setAutoPlay(a.id, b), b && !a.instanceCount && 1 === a.readyState && a.instanceCount++)
      };
      this.getAutoPlay = function () {
        return a._iO.autoPlay
      };
      this.setPosition = function (b) {
        b === g && (b = 0);
        var c = a.isHTML5 ? Math.max(b, 0) : Math.min(a.duration ||
          a._iO.duration, Math.max(b, 0));
        a.position = c;
        b = a.position / 1E3;
        a._resetOnPosition(a.position);
        a._iO.position = c;
        if (a.isHTML5) {
          if (a._a && a._html5_canplay && a._a.currentTime !== b)try {
            a._a.currentTime = b, (0 === a.playState || a.paused) && a._a.pause()
          } catch (e) {
          }
        } else b = 9 === k ? a.position : b, a.readyState && 2 !== a.readyState && h._setPosition(a.id, b, a.paused || !a.playState, a._iO.multiShot);
        a.isHTML5 && a.paused && a._onTimer(!0);
        return a
      };
      this.pause = function (b) {
        if (a.paused || 0 === a.playState && 1 !== a.readyState)return a;
        a.paused = !0;
        a.isHTML5 ? (a._setup_html5().pause(), I()) : (b || b === g) && h._pause(a.id, a._iO.multiShot);
        a._iO.onpause && a._iO.onpause.apply(a);
        return a
      };
      this.resume = function () {
        var b = a._iO;
        if (!a.paused)return a;
        a.paused = !1;
        a.playState = 1;
        a.isHTML5 ? (a._setup_html5().play(), l()) : (b.isMovieStar && !b.serverURL && a.setPosition(a.position), h._pause(a.id, b.multiShot));
        !q && b.onplay ? (b.onplay.apply(a), q = !0) : b.onresume && b.onresume.apply(a);
        return a
      };
      this.togglePause = function () {
        if (0 === a.playState)return a.play({
          position: 9 === k && !a.isHTML5 ?
            a.position : a.position / 1E3
        }), a;
        a.paused ? a.resume() : a.pause();
        return a
      };
      this.setPan = function (b, c) {
        b === g && (b = 0);
        c === g && (c = !1);
        a.isHTML5 || h._setPan(a.id, b);
        a._iO.pan = b;
        c || (a.pan = b, a.options.pan = b);
        return a
      };
      this.setVolume = function (b, e) {
        b === g && (b = 100);
        e === g && (e = !1);
        a.isHTML5 ? a._a && (a._a.volume = Math.max(0, Math.min(1, b / 100))) : h._setVolume(a.id, c.muted && !a.muted || a.muted ? 0 : b);
        a._iO.volume = b;
        e || (a.volume = b, a.options.volume = b);
        return a
      };
      this.mute = function () {
        a.muted = !0;
        a.isHTML5 ? a._a && (a._a.muted = !0) : h._setVolume(a.id,
          0);
        return a
      };
      this.unmute = function () {
        a.muted = !1;
        var b = a._iO.volume !== g;
        a.isHTML5 ? a._a && (a._a.muted = !1) : h._setVolume(a.id, b ? a._iO.volume : a.options.volume);
        return a
      };
      this.toggleMute = function () {
        return a.muted ? a.unmute() : a.mute()
      };
      this.onposition = this.onPosition = function (b, c, e) {
        j.push({position: parseInt(b, 10), method: c, scope: e !== g ? e : a, fired: !1});
        return a
      };
      this.clearOnPosition = function (a, b) {
        var c, a = parseInt(a, 10);
        if (isNaN(a))return !1;
        for (c = 0; c < j.length; c++)if (a === j[c].position && (!b || b === j[c].method))j[c].fired &&
        n--, j.splice(c, 1)
      };
      this._processOnPosition = function () {
        var b, c;
        b = j.length;
        if (!b || !a.playState || n >= b)return !1;
        for (b -= 1; 0 <= b; b--)c = j[b], !c.fired && a.position >= c.position && (c.fired = !0, n++, c.method.apply(c.scope, [c.position]));
        return !0
      };
      this._resetOnPosition = function (a) {
        var b, c;
        b = j.length;
        if (!b)return !1;
        for (b -= 1; 0 <= b; b--)c = j[b], c.fired && a <= c.position && (c.fired = !1, n--);
        return !0
      };
      u = function () {
        var b = a._iO, c = b.from, e = b.to, d, f;
        f = function () {
          a.clearOnPosition(e, f);
          a.stop()
        };
        d = function () {
          if (null !== e && !isNaN(e))a.onPosition(e,
            f)
        };
        null !== c && !isNaN(c) && (b.position = c, b.multiShot = !1, d());
        return b
      };
      m = function () {
        var b, c = a._iO.onposition;
        if (c)for (b in c)if (c.hasOwnProperty(b))a.onPosition(parseInt(b, 10), c[b])
      };
      s = function () {
        var b, c = a._iO.onposition;
        if (c)for (b in c)c.hasOwnProperty(b) && a.clearOnPosition(parseInt(b, 10))
      };
      l = function () {
        a.isHTML5 && Na(a)
      };
      I = function () {
        a.isHTML5 && Oa(a)
      };
      f = function (b) {
        b || (j = [], n = 0);
        q = !1;
        a._hasTimer = null;
        a._a = null;
        a._html5_canplay = !1;
        a.bytesLoaded = null;
        a.bytesTotal = null;
        a.duration = a._iO && a._iO.duration ?
          a._iO.duration : null;
        a.durationEstimate = null;
        a.buffered = [];
        a.eqData = [];
        a.eqData.left = [];
        a.eqData.right = [];
        a.failures = 0;
        a.isBuffering = !1;
        a.instanceOptions = {};
        a.instanceCount = 0;
        a.loaded = !1;
        a.metadata = {};
        a.readyState = 0;
        a.muted = !1;
        a.paused = !1;
        a.peakData = {left: 0, right: 0};
        a.waveformData = {left: [], right: []};
        a.playState = 0;
        a.position = null;
        a.id3 = {}
      };
      f();
      this._onTimer = function (b) {
        var c, f = !1, g = {};
        if (a._hasTimer || b) {
          if (a._a && (b || (0 < a.playState || 1 === a.readyState) && !a.paused))c = a._get_html5_duration(), c !== e && (e = c,
            a.duration = c, f = !0), a.durationEstimate = a.duration, c = 1E3 * a._a.currentTime || 0, c !== d && (d = c, f = !0), (f || b) && a._whileplaying(c, g, g, g, g);
          return f
        }
      };
      this._get_html5_duration = function () {
        var b = a._iO;
        return (b = a._a && a._a.duration ? 1E3 * a._a.duration : b && b.duration ? b.duration : null) && !isNaN(b) && Infinity !== b ? b : null
      };
      this._apply_loop = function (a, b) {
        a.loop = 1 < b ? "loop" : ""
      };
      this._setup_html5 = function (b) {
        var b = t(a._iO, b), c = decodeURI, e = w ? Ha : a._a, d = c(b.url), g;
        w ? d === ya && (g = !0) : d === r && (g = !0);
        if (e) {
          if (e._s)if (w)e._s && (e._s.playState && !g) && e._s.stop(); else if (!w && d === c(r))return a._apply_loop(e, b.loops), e;
          g || (f(!1), e.src = b.url, ya = r = a.url = b.url, e._called_load = !1)
        } else a._a = b.autoLoad || b.autoPlay ? new Audio(b.url) : Ba && 10 > opera.version() ? new Audio(null) : new Audio, e = a._a, e._called_load = !1, w && (Ha = e);
        a.isHTML5 = !0;
        a._a = e;
        e._s = a;
        ab();
        a._apply_loop(e, b.loops);
        b.autoLoad || b.autoPlay ? a.load() : (e.autobuffer = !1, e.preload = "auto");
        return e
      };
      ab = function () {
        if (a._a._added_events)return !1;
        var b;
        a._a._added_events = !0;
        for (b in x)x.hasOwnProperty(b) &&
        a._a && a._a.addEventListener(b, x[b], !1);
        return !0
      };
      i = function () {
        var b;
        a._a._added_events = !1;
        for (b in x)x.hasOwnProperty(b) && a._a && a._a.removeEventListener(b, x[b], !1)
      };
      this._onload = function (b) {
        b = !!b || !a.isHTML5 && 8 === k && a.duration;
        a.loaded = b;
        a.readyState = b ? 3 : 2;
        a._onbufferchange(0);
        a._iO.onload && a._iO.onload.apply(a, [b]);
        return !0
      };
      this._onbufferchange = function (b) {
        if (0 === a.playState || b && a.isBuffering || !b && !a.isBuffering)return !1;
        a.isBuffering = 1 === b;
        a._iO.onbufferchange && a._iO.onbufferchange.apply(a);
        return !0
      };
      this._onsuspend = function () {
        a._iO.onsuspend && a._iO.onsuspend.apply(a);
        return !0
      };
      this._onfailure = function (b, c, e) {
        a.failures++;
        if (a._iO.onfailure && 1 === a.failures)a._iO.onfailure(a, b, c, e)
      };
      this._onfinish = function () {
        var b = a._iO.onfinish;
        a._onbufferchange(0);
        a._resetOnPosition(0);
        a.instanceCount && (a.instanceCount--, a.instanceCount || (s(), a.playState = 0, a.paused = !1, a.instanceCount = 0, a.instanceOptions = {}, a._iO = {}, I(), a.isHTML5 && (a.position = 0)), (!a.instanceCount || a._iO.multiShotEvents) && b && b.apply(a))
      };
      this._whileloading =
        function (b, c, e, d) {
          var f = a._iO;
          a.bytesLoaded = b;
          a.bytesTotal = c;
          a.duration = Math.floor(e);
          a.bufferLength = d;
          a.durationEstimate = !a.isHTML5 && !f.isMovieStar ? f.duration ? a.duration > f.duration ? a.duration : f.duration : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10) : a.duration;
          a.isHTML5 || (a.buffered = [{start: 0, end: a.duration}]);
          (3 !== a.readyState || a.isHTML5) && f.whileloading && f.whileloading.apply(a)
        };
      this._whileplaying = function (b, c, e, d, f) {
        var h = a._iO;
        if (isNaN(b) || null === b)return !1;
        a.position = Math.max(0, b);
        a._processOnPosition();
        !a.isHTML5 && 8 < k && (h.usePeakData && (c !== g && c) && (a.peakData = {
          left: c.leftPeak,
          right: c.rightPeak
        }), h.useWaveformData && (e !== g && e) && (a.waveformData = {
          left: e.split(","),
          right: d.split(",")
        }), h.useEQData && (f !== g && f && f.leftEQ) && (b = f.leftEQ.split(","), a.eqData = b, a.eqData.left = b, f.rightEQ !== g && f.rightEQ && (a.eqData.right = f.rightEQ.split(","))));
        1 === a.playState && (!a.isHTML5 && (8 === k && !a.position && a.isBuffering) && a._onbufferchange(0), h.whileplaying && h.whileplaying.apply(a));
        return !0
      };
      this._oncaptiondata = function (b) {
        a.captiondata =
          b;
        a._iO.oncaptiondata && a._iO.oncaptiondata.apply(a, [b])
      };
      this._onmetadata = function (b, c) {
        var e = {}, d, f;
        d = 0;
        for (f = b.length; d < f; d++)e[b[d]] = c[d];
        a.metadata = e;
        a._iO.onmetadata && a._iO.onmetadata.apply(a)
      };
      this._onid3 = function (b, c) {
        var e = [], d, f;
        d = 0;
        for (f = b.length; d < f; d++)e[b[d]] = c[d];
        a.id3 = t(a.id3, e);
        a._iO.onid3 && a._iO.onid3.apply(a)
      };
      this._onconnect = function (b) {
        b = 1 === b;
        if (a.connected = b)a.failures = 0, p(a.id) && (a.getAutoPlay() ? a.play(g, a.getAutoPlay()) : a._iO.autoLoad && a.load()), a._iO.onconnect && a._iO.onconnect.apply(a,
          [b])
      };
      this._ondataerror = function () {
        0 < a.playState && a._iO.ondataerror && a._iO.ondataerror.apply(a)
      }
    };
    qa = function () {
      return l.body || l._docElement || l.getElementsByTagName("div")[0]
    };
    T = function (b) {
      return l.getElementById(b)
    };
    t = function (b, e) {
      var d = b || {}, a, f;
      a = e === g ? c.defaultOptions : e;
      for (f in a)a.hasOwnProperty(f) && d[f] === g && (d[f] = "object" !== typeof a[f] || null === a[f] ? a[f] : t(d[f], a[f]));
      return d
    };
    U = {onready: 1, ontimeout: 1, defaultOptions: 1, flash9Options: 1, movieStarOptions: 1};
    ka = function (b, e) {
      var d, a = !0, f = e !==
        g, h = c.setupOptions;
      for (d in b)if (b.hasOwnProperty(d))if ("object" !== typeof b[d] || null === b[d] || b[d]instanceof Array || b[d]instanceof RegExp)f && U[e] !== g ? c[e][d] = b[d] : h[d] !== g ? (c.setupOptions[d] = b[d], c[d] = b[d]) : U[d] === g ? (H(v(c[d] === g ? "setupUndef" : "setupError", d), 2), a = !1) : c[d]instanceof Function ? c[d].apply(c, b[d]instanceof Array ? b[d] : [b[d]]) : c[d] = b[d]; else if (U[d] === g)H(v(c[d] === g ? "setupUndef" : "setupError", d), 2), a = !1; else return ka(b[d], d);
      return a
    };
    var bb = function (b) {
      var b = db.call(b), c = b.length;
      ea ? (b[1] =
        "on" + b[1], 3 < c && b.pop()) : 3 === c && b.push(!1);
      return b
    }, cb = function (b, c) {
      var d = b.shift(), a = [gb[c]];
      if (ea)d[a](b[0], b[1]); else d[a].apply(d, b)
    }, ea = i.attachEvent, gb = {
      add: ea ? "attachEvent" : "addEventListener",
      remove: ea ? "detachEvent" : "removeEventListener"
    };
    n = {
      add: function () {
        cb(bb(arguments), "add")
      }, remove: function () {
        cb(bb(arguments), "remove")
      }
    };
    x = {
      abort: m(function () {
      }), canplay: m(function () {
        var b = this._s, c;
        if (b._html5_canplay)return !0;
        b._html5_canplay = !0;
        b._onbufferchange(0);
        c = b._iO.position !== g && !isNaN(b._iO.position) ?
        b._iO.position / 1E3 : null;
        if (b.position && this.currentTime !== c)try {
          this.currentTime = c
        } catch (d) {
        }
        b._iO._oncanplay && b._iO._oncanplay()
      }), canplaythrough: m(function () {
        var b = this._s;
        b.loaded || (b._onbufferchange(0), b._whileloading(b.bytesLoaded, b.bytesTotal, b._get_html5_duration()), b._onload(!0))
      }), ended: m(function () {
        this._s._onfinish()
      }), error: m(function () {
        this._s._onload(!1)
      }), loadeddata: m(function () {
        var b = this._s;
        !b._loaded && !Aa && (b.duration = b._get_html5_duration())
      }), loadedmetadata: m(function () {
      }), loadstart: m(function () {
        this._s._onbufferchange(1)
      }),
      play: m(function () {
        this._s._onbufferchange(0)
      }), playing: m(function () {
        this._s._onbufferchange(0)
      }), progress: m(function (b) {
        var c = this._s, d, a, f = 0, f = b.target.buffered;
        d = b.loaded || 0;
        var g = b.total || 1;
        c.buffered = [];
        if (f && f.length) {
          d = 0;
          for (a = f.length; d < a; d++)c.buffered.push({start: 1E3 * f.start(d), end: 1E3 * f.end(d)});
          f = 1E3 * (f.end(0) - f.start(0));
          d = f / (1E3 * b.target.duration)
        }
        isNaN(d) || (c._onbufferchange(0), c._whileloading(d, g, c._get_html5_duration()), d && (g && d === g) && x.canplaythrough.call(this, b))
      }), ratechange: m(function () {
      }),
      suspend: m(function (b) {
        var c = this._s;
        x.progress.call(this, b);
        c._onsuspend()
      }), stalled: m(function () {
      }), timeupdate: m(function () {
        this._s._onTimer()
      }), waiting: m(function () {
        this._s._onbufferchange(1)
      })
    };
    ba = function (b) {
      return b.serverURL || b.type && S(b.type) ? !1 : b.type ? Q({type: b.type}) : Q({url: b.url}) || c.html5Only
    };
    wa = function (b, c) {
      b && (b.src = c, b._called_load = !1);
      w && (ya = null)
    };
    Q = function (b) {
      if (!c.useHTML5Audio || !c.hasHTML5)return !1;
      var e = b.url || null, b = b.type || null, d = c.audioFormats, a;
      if (b && c.html5[b] !== g)return c.html5[b] && !S(b);
      if (!y) {
        y = [];
        for (a in d)d.hasOwnProperty(a) && (y.push(a), d[a].related && (y = y.concat(d[a].related)));
        y = RegExp("\\.(" + y.join("|") + ")(\\?.*)?$", "i")
      }
      a = e ? e.toLowerCase().match(y) : null;
      !a || !a.length ? b && (e = b.indexOf(";"), a = (-1 !== e ? b.substr(0, e) : b).substr(6)) : a = a[1];
      a && c.html5[a] !== g ? e = c.html5[a] && !S(a) : (b = "audio/" + a, e = c.html5.canPlayType({type: b}), e = (c.html5[a] = e) && c.html5[b] && !S(b));
      return e
    };
    Sa = function () {
      function b(a) {
        var b, d, f = b = !1;
        if (!e || "function" !== typeof e.canPlayType)return b;
        if (a instanceof
          Array) {
          b = 0;
          for (d = a.length; b < d; b++)if (c.html5[a[b]] || e.canPlayType(a[b]).match(c.html5Test))f = !0, c.html5[a[b]] = !0, c.flash[a[b]] = !!a[b].match(Xa);
          b = f
        } else a = e && "function" === typeof e.canPlayType ? e.canPlayType(a) : !1, b = !(!a || !a.match(c.html5Test));
        return b
      }

      if (!c.useHTML5Audio || !c.hasHTML5)return !1;
      var e = Audio !== g ? Ba && 10 > opera.version() ? new Audio(null) : new Audio : null, d, a, f = {}, h;
      h = c.audioFormats;
      for (d in h)if (h.hasOwnProperty(d) && (a = "audio/" + d, f[d] = b(h[d].type), f[a] = f[d], d.match(Xa) ? (c.flash[d] = !0, c.flash[a] = !0) : (c.flash[d] = !1, c.flash[a] = !1), h[d] && h[d].related))for (a = h[d].related.length - 1; 0 <= a; a--)f["audio/" + h[d].related[a]] = f[d], c.html5[h[d].related[a]] = f[d], c.flash[h[d].related[a]] = f[d];
      f.canPlayType = e ? b : null;
      c.html5 = t(c.html5, f);
      return !0
    };
    na = {};
    v = function () {
    };
    Y = function (b) {
      8 === k && (1 < b.loops && b.stream) && (b.stream = !1);
      return b
    };
    Z = function (b) {
      if (b && !b.usePolicyFile && (b.onid3 || b.usePeakData || b.useWaveformData || b.useEQData))b.usePolicyFile = !0;
      return b
    };
    H = function () {
    };
    ha = function () {
      return !1
    };
    La = function (b) {
      for (var c in b)b.hasOwnProperty(c) &&
      "function" === typeof b[c] && (b[c] = ha)
    };
    sa = function (b) {
      b === g && (b = !1);
      (s || b) && c.disable(b)
    };
    Ma = function (b) {
      var e = null;
      if (b)if (b.match(/\.swf(\?.*)?$/i)) {
        if (e = b.substr(b.toLowerCase().lastIndexOf(".swf?") + 4))return b
      } else b.lastIndexOf("/") !== b.length - 1 && (b += "/");
      b = (b && -1 !== b.lastIndexOf("/") ? b.substr(0, b.lastIndexOf("/") + 1) : "./") + c.movieURL;
      c.noSWFCache && (b += "?ts=" + (new Date).getTime());
      return b
    };
    ma = function () {
      k = parseInt(c.flashVersion, 10);
      8 !== k && 9 !== k && (c.flashVersion = k = 8);
      var b = c.debugMode || c.debugFlash ?
        "_debug.swf" : ".swf";
      c.useHTML5Audio && (!c.html5Only && c.audioFormats.mp4.required && 9 > k) && (c.flashVersion = k = 9);
      c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : 9 === k ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
      8 < k ? (c.defaultOptions = t(c.defaultOptions, c.flash9Options), c.features.buffering = !0, c.defaultOptions = t(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 = RegExp("\\.(mp3|" + $a.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0) : c.features.movieStar = !1;
      c.filePattern = c.filePatterns[8 !== k ?
        "flash9" : "flash8"];
      c.movieURL = (8 === k ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", b);
      c.features.peakData = c.features.waveformData = c.features.eqData = 8 < k
    };
    Ka = function (b, c) {
      if (!h)return !1;
      h._setPolling(b, c)
    };
    ra = function () {
      c.debugURLParam.test(ga) && (c.debugMode = !0)
    };
    p = this.getSoundById;
    G = function () {
      var b = [];
      c.debugMode && b.push("sm2_debug");
      c.debugFlash && b.push("flash_debug");
      c.useHighPerformance && b.push("high_performance");
      return b.join(" ")
    };
    ua = function () {
      v("fbHandler");
      var b = c.getMoviePercent(),
        e = {type: "FLASHBLOCK"};
      if (c.html5Only)return !1;
      c.ok() ? c.oMC && (c.oMC.className = [G(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (u && (c.oMC.className = G() + " movieContainer " + (null === b ? "swf_timedout" : "swf_error")), c.didFlashBlock = !0, B({
        type: "ontimeout",
        ignoreInit: !0,
        error: e
      }), F(e))
    };
    la = function (b, c, d) {
      r[b] === g && (r[b] = []);
      r[b].push({method: c, scope: d || null, fired: !1})
    };
    B = function (b) {
      b || (b = {type: c.ok() ? "onready" : "ontimeout"});
      if (!j && b && !b.ignoreInit || "ontimeout" === b.type &&
        (c.ok() || s && !b.ignoreInit))return !1;
      var e = {success: b && b.ignoreInit ? c.ok() : !s}, d = b && b.type ? r[b.type] || [] : [], a = [], f, e = [e], g = u && !c.ok();
      b.error && (e[0].error = b.error);
      b = 0;
      for (f = d.length; b < f; b++)!0 !== d[b].fired && a.push(d[b]);
      if (a.length) {
        b = 0;
        for (f = a.length; b < f; b++)a[b].scope ? a[b].method.apply(a[b].scope, e) : a[b].method.apply(this, e), g || (a[b].fired = !0)
      }
      return !0
    };
    C = function () {
      i.setTimeout(function () {
        c.useFlashBlock && ua();
        B();
        "function" === typeof c.onload && c.onload.apply(i);
        c.waitForWindowLoad && n.add(i, "load",
          C)
      }, 1)
    };
    za = function () {
      if (A !== g)return A;
      var b = !1, c = navigator, d = c.plugins, a, f = i.ActiveXObject;
      if (d && d.length)(c = c.mimeTypes) && (c["application/x-shockwave-flash"] && c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description) && (b = !0); else if (f !== g && !q.match(/MSAppHost/i)) {
        try {
          a = new f("ShockwaveFlash.ShockwaveFlash")
        } catch (h) {
        }
        b = !!a
      }
      return A = b
    };
    Ra = function () {
      var b, e, d = c.audioFormats;
      if (ca && q.match(/os (1|2|3_0|3_1)/i))c.hasHTML5 = !1, c.html5Only = !0, c.oMC &&
      (c.oMC.style.display = "none"); else if (c.useHTML5Audio && (!c.html5 || !c.html5.canPlayType))c.hasHTML5 = !1;
      if (c.useHTML5Audio && c.hasHTML5)for (e in d)if (d.hasOwnProperty(e) && (d[e].required && !c.html5.canPlayType(d[e].type) || c.preferFlash && (c.flash[e] || c.flash[d[e].type])))b = !0;
      c.ignoreFlash && (b = !1);
      c.html5Only = c.hasHTML5 && c.useHTML5Audio && !b;
      return !c.html5Only
    };
    aa = function (b) {
      var e, d, a = 0;
      if (b instanceof Array) {
        e = 0;
        for (d = b.length; e < d; e++)if (b[e]instanceof Object) {
          if (c.canPlayMIME(b[e].type)) {
            a = e;
            break
          }
        } else if (c.canPlayURL(b[e])) {
          a =
            e;
          break
        }
        b[a].url && (b[a] = b[a].url);
        b = b[a]
      }
      return b
    };
    Na = function (b) {
      b._hasTimer || (b._hasTimer = !0, !Ca && c.html5PollingInterval && (null === P && 0 === $ && (P = i.setInterval(Pa, c.html5PollingInterval)), $++))
    };
    Oa = function (b) {
      b._hasTimer && (b._hasTimer = !1, !Ca && c.html5PollingInterval && $--)
    };
    Pa = function () {
      var b;
      if (null !== P && !$)return i.clearInterval(P), P = null, !1;
      for (b = c.soundIDs.length - 1; 0 <= b; b--)c.sounds[c.soundIDs[b]].isHTML5 && c.sounds[c.soundIDs[b]]._hasTimer && c.sounds[c.soundIDs[b]]._onTimer()
    };
    F = function (b) {
      b = b !==
      g ? b : {};
      "function" === typeof c.onerror && c.onerror.apply(i, [{type: b.type !== g ? b.type : null}]);
      b.fatal !== g && b.fatal && c.disable()
    };
    Ta = function () {
      if (!Va || !za())return !1;
      var b = c.audioFormats, e, d;
      for (d in b)if (b.hasOwnProperty(d) && ("mp3" === d || "mp4" === d))if (c.html5[d] = !1, b[d] && b[d].related)for (e = b[d].related.length - 1; 0 <= e; e--)c.html5[b[d].related[e]] = !1
    };
    this._setSandboxType = function () {
    };
    this._externalInterfaceOK = function () {
      if (c.swfLoaded)return !1;
      c.swfLoaded = !0;
      da = !1;
      Va && Ta();
      setTimeout(ia, z ? 100 : 1)
    };
    X = function (b,
                  e) {
      function d(a, b) {
        return '<param name="' + a + '" value="' + b + '" />'
      }

      if (J && K)return !1;
      if (c.html5Only)return ma(), c.oMC = T(c.movieID), ia(), K = J = !0, !1;
      var a = e || c.url, f = c.altURL || a, h = qa(), i = G(), k = null, k = l.getElementsByTagName("html")[0], j, n, m, k = k && k.dir && k.dir.match(/rtl/i), b = b === g ? c.id : b;
      ma();
      c.url = Ma(Ea ? a : f);
      e = c.url;
      c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
      if (null !== c.wmode && (q.match(/msie 8/i) || !z && !c.useHighPerformance) && navigator.platform.match(/win32|win64/i))Qa.push(na.spcWmode),
        c.wmode = null;
      h = {
        name: b,
        id: b,
        src: e,
        quality: "high",
        allowScriptAccess: c.allowScriptAccess,
        bgcolor: c.bgColor,
        pluginspage: Ya + "www.macromedia.com/go/getflashplayer",
        title: "JS/Flash audio component (SoundManager 2)",
        type: "application/x-shockwave-flash",
        wmode: c.wmode,
        hasPriority: "true"
      };
      c.debugFlash && (h.FlashVars = "debug=1");
      c.wmode || delete h.wmode;
      if (z)a = l.createElement("div"), n = ['<object id="' + b + '" data="' + e + '" type="' + h.type + '" title="' + h.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' +
      Ya + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', d("movie", e), d("AllowScriptAccess", c.allowScriptAccess), d("quality", h.quality), c.wmode ? d("wmode", c.wmode) : "", d("bgcolor", c.bgColor), d("hasPriority", "true"), c.debugFlash ? d("FlashVars", h.FlashVars) : "", "</object>"].join(""); else for (j in a = l.createElement("embed"), h)h.hasOwnProperty(j) && a.setAttribute(j, h[j]);
      ra();
      i = G();
      if (h = qa())if (c.oMC = T(c.movieID) || l.createElement("div"), c.oMC.id)m = c.oMC.className, c.oMC.className =
        (m ? m + " " : "movieContainer") + (i ? " " + i : ""), c.oMC.appendChild(a), z && (j = c.oMC.appendChild(l.createElement("div")), j.className = "sm2-object-box", j.innerHTML = n), K = !0; else {
        c.oMC.id = c.movieID;
        c.oMC.className = "movieContainer " + i;
        j = i = null;
        c.useFlashBlock || (c.useHighPerformance ? i = {
          position: "fixed",
          width: "8px",
          height: "8px",
          bottom: "0px",
          left: "0px",
          overflow: "hidden"
        } : (i = {
          position: "absolute",
          width: "6px",
          height: "6px",
          top: "-9999px",
          left: "-9999px"
        }, k && (i.left = Math.abs(parseInt(i.left, 10)) + "px")));
        eb && (c.oMC.style.zIndex =
          1E4);
        if (!c.debugFlash)for (m in i)i.hasOwnProperty(m) && (c.oMC.style[m] = i[m]);
        try {
          z || c.oMC.appendChild(a), h.appendChild(c.oMC), z && (j = c.oMC.appendChild(l.createElement("div")), j.className = "sm2-object-box", j.innerHTML = n), K = !0
        } catch (p) {
          throw Error(v("domError") + " \n" + p.toString());
        }
      }
      return J = !0
    };
    W = function () {
      if (c.html5Only)return X(), !1;
      if (h || !c.url)return !1;
      h = c.getMovie(c.id);
      h || (N ? (z ? c.oMC.innerHTML = ta : c.oMC.appendChild(N), N = null, J = !0) : X(c.id, c.url), h = c.getMovie(c.id));
      "function" === typeof c.oninitmovie &&
      setTimeout(c.oninitmovie, 1);
      return !0
    };
    D = function () {
      setTimeout(Ja, 1E3)
    };
    Ja = function () {
      var b, e = !1;
      if (!c.url || O)return !1;
      O = !0;
      n.remove(i, "load", D);
      if (da && !Da)return !1;
      j || (b = c.getMoviePercent(), 0 < b && 100 > b && (e = !0));
      setTimeout(function () {
        b = c.getMoviePercent();
        if (e)return O = !1, i.setTimeout(D, 1), !1;
        !j && Wa && (null === b ? c.useFlashBlock || 0 === c.flashLoadTimeout ? c.useFlashBlock && ua() : B({
          type: "ontimeout",
          ignoreInit: !0
        }) : 0 !== c.flashLoadTimeout && sa(!0))
      }, c.flashLoadTimeout)
    };
    V = function () {
      if (Da || !da)return n.remove(i,
        "focus", V), !0;
      Da = Wa = !0;
      O = !1;
      D();
      n.remove(i, "focus", V);
      return !0
    };
    L = function (b) {
      if (j)return !1;
      if (c.html5Only)return j = !0, C(), !0;
      var e = !0, d;
      if (!c.useFlashBlock || !c.flashLoadTimeout || c.getMoviePercent())j = !0, s && (d = {type: !A && u ? "NO_FLASH" : "INIT_TIMEOUT"});
      if (s || b)c.useFlashBlock && c.oMC && (c.oMC.className = G() + " " + (null === c.getMoviePercent() ? "swf_timedout" : "swf_error")), B({
        type: "ontimeout",
        error: d,
        ignoreInit: !0
      }), F(d), e = !1;
      s || (c.waitForWindowLoad && !ja ? n.add(i, "load", C) : C());
      return e
    };
    Ia = function () {
      var b, e =
        c.setupOptions;
      for (b in e)e.hasOwnProperty(b) && (c[b] === g ? c[b] = e[b] : c[b] !== e[b] && (c.setupOptions[b] = c[b]))
    };
    ia = function () {
      if (j)return !1;
      if (c.html5Only)return j || (n.remove(i, "load", c.beginDelayedInit), c.enabled = !0, L()), !0;
      W();
      try {
        h._externalInterfaceTest(!1), Ka(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)), c.debugMode || h._disableDebug(), c.enabled = !0, c.html5Only || n.add(i, "unload", ha)
      } catch (b) {
        return F({type: "JS_TO_FLASH_EXCEPTION", fatal: !0}), sa(!0), L(), !1
      }
      L();
      n.remove(i, "load", c.beginDelayedInit);
      return !0
    };
    E = function () {
      if (M)return !1;
      M = !0;
      Ia();
      ra();
      !A && c.hasHTML5 && c.setup({useHTML5Audio: !0, preferFlash: !1});
      Sa();
      c.html5.usingFlash = Ra();
      u = c.html5.usingFlash;
      !A && u && (Qa.push(na.needFlash), c.setup({flashLoadTimeout: 1}));
      l.removeEventListener && l.removeEventListener("DOMContentLoaded", E, !1);
      W();
      return !0
    };
    xa = function () {
      "complete" === l.readyState && (E(), l.detachEvent("onreadystatechange", xa));
      return !0
    };
    pa = function () {
      ja = !0;
      n.remove(i, "load", pa)
    };
    oa = function () {
      if (Ca && (c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash = !1, ca || Ua && !q.match(/android\s2\.3/i)))ca && (c.ignoreFlash = !0), w = !0
    };
    oa();
    za();
    n.add(i, "focus", V);
    n.add(i, "load", D);
    n.add(i, "load", pa);
    l.addEventListener ? l.addEventListener("DOMContentLoaded", E, !1) : l.attachEvent ? l.attachEvent("onreadystatechange", xa) : F({
      type: "NO_DOM2_EVENTS",
      fatal: !0
    })
  }

  var fa = null;
  if (void 0 === i.SM2_DEFER || !SM2_DEFER)fa = new R;
  i.SoundManager = R;
  i.soundManager = fa
})(window);