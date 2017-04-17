Utils = {
    open_in_new_tab: function(c) {
        window.open(c, "_blank").focus()
    },
    compare_object: function(c, g) {
        for (var f in c)
            if (c[f] != g[f])
                return !1;
        return !0
    },
    compare_array: function(c, g) {
        if (c.length != g.length)
            return !1;
        for (var f = 0; f < c.length; f++)
            if ("object" == typeof c) {
                if (!this.compare_object(c[f], g[f]))
                    return !1
            } else if (c[f] != g[f])
                return !1;
        return !0
    },
    copy_vector: function(c, g) {
        g.x = c.x;
        g.y = c.y
    },
    get_vector: function(c, g) {
        return {
            x: c.x - g.x,
            y: c.y - g.y
        }
    },
    mul_vector: function(c, g) {
        c.x *= g;
        c.y *= g
    },
    scalar_product: function(c, g) {
        return c.x * g.x + c.y * g.y
    },
    norm: function(c) {
        return Math.sqrt(c.x * c.x + c.y * c.y)
    },
    sign: function(c) {
        return 0 > c ? -1 : 1
    },
    cross_product: function(c, g) {
        return c.x * g.y - c.y * g.x
    },
    get_angle: function(c, g) {
        return Math.acos(this.scalar_product(c, g) / (this.norm(c) * this.norm(g))) * this.sign(this.cross_product(c, g))
    },
    get_std_angle: function(c, g) {
        return this.get_angle({
            x: 1,
            y: 0
        }, this.get_vector(c, g))
    },
    dist: function(c, g) {
        return Math.sqrt((g.x - c.x) * (g.x - c.x) + (g.y - c.y) * (g.y - c.y))
    },
    build_vector: function(c, g) {
        return {
            x: Math.cos(g) * c,
            y: Math.sin(g) * c
        }
    },
    add_vector: function(c, g) {
        c.x += g.x;
        c.y += g.y
    },
    sub_vector: function(c, g) {
        c.x -= g.x;
        c.y -= g.y
    },
    translate_vector: function(c, g, f) {
        c.x += g;
        c.y += f
    },
    translate_new_vector: function(c, g, f) {
        return {
            x: c.x + g,
            y: c.y + f
        }
    },
    move: function(c, g, f) {
        c.x += Math.cos(f) * g;
        c.y += Math.sin(f) * g
    },
    middle: function(c, g) {
        return Math.floor((c - g) / 2)
    },
    middle_point: function(c, g) {
        return {
            x: (c.x + g.x) / 2,
            y: (c.y + g.y) / 2
        }
    },
    rand_sign: function() {
        return .5 < Math.random() ? 1 : -1
    },
    get_rand_pos_in_circle: function(c, g, f) {
        var d = this.rand_sign()
          , e = this.rand_sign()
          , m = Math.random() * Math.PI / 2;
        return {
            x: Math.floor(c + Math.cos(m) * d * f),
            y: Math.floor(g + Math.sin(m) * e * f)
        }
    },
    Box: function(c, g, f, d) {
        this.x = c;
        this.y = g;
        this.w = f;
        this.h = d
    },
    randomize_list: function(c) {
        a = [];
        a.push.apply(a, c);
        for (c = []; 0 < a.length; ) {
            var g = Math.floor(Math.random() * a.length);
            c.push(a[g]);
            a.splice(g, 1)
        }
        return c
    },
    restore_number: function(c) {
        2E4 <= c ? c = 1E3 * (c - 2E4) : 1E4 <= c && (c = 100 * (c - 1E4));
        return c
    },
    simplify_number: function(c) {
        if (1E4 <= c) {
            var g = Math.max(0, 3 - (Math.floor(Math.log10(c)) - 2))
              , f = Math.floor(c / 1E3).toString();
            if (g) {
                f += "." + (c % 1E3 / 1E3).toString().substring(2).substring(0, g);
                c = f.length - 1;
                for (g = 0; 0 < c && "0" == f[c]; c--)
                    g++;
                f = f.substring(0, f.length - g);
                "." == f[f.length - 1] && (f = f.substring(0, f.length - 1))
            }
            return f + "k"
        }
        return c.toString()
    },
    ease_out_quad: function(c) {
        return c * (2 - c)
    },
    LinearAnimation: function(c, g, f, d, e, m) {
        this.o = c;
        this.v = g;
        this.max = f;
        this.min = d;
        this.max_speed = e;
        this.min_speed = m;
        this.update = function() {
            if (this.o) {
                var c = this.v + delta * this.max_speed;
                if (c > this.max)
                    return this.v = this.max,
                    this.o = !1,
                    !0;
                this.v = c
            } else
                c = this.v - delta * this.min_speed,
                c < this.min ? (this.v = this.min,
                this.o = !0) : this.v = c
        }
        ;
        return !1
    },
    Ease: function(c, g, f, d, e, m) {
        this.fun = c;
        this.ed = g;
        this.em = f;
        this.sx = d;
        this.x = e;
        this.ex = m;
        this.ease = function(c) {
            c != this.ex && (this.ex = c,
            this.sx = this.x,
            this.ed = 0);
            this.ex != this.x && (this.ed += delta,
            this.ed > this.em ? this.x = this.ex : (c = this.fun(this.ed / this.em),
            this.x = this.sx + (this.ex - this.sx) * c))
        }
    },
    Ease2d: function(c, g, f, d, e, m, n, p, q) {
        this.fun = c;
        this.ed = g;
        this.em = f;
        this.sx = d;
        this.sy = e;
        this.x = m;
        this.y = n;
        this.ex = p;
        this.ey = q;
        this.ease = function(c) {
            if (c.x != this.ex || c.y != this.ey)
                this.ex = c.x,
                this.ey = c.y,
                this.sx = this.x,
                this.sy = this.y,
                this.ed = 0;
            if (this.ex != this.x || this.ey != this.y)
                this.ed += delta,
                this.ed > this.em ? (this.x = this.ex,
                this.y = this.ey) : (c = this.fun(this.ed / this.em),
                this.x = this.sx + (this.ex - this.sx) * c,
                this.y = this.sy + (this.ey - this.sy) * c)
        }
    }
};
(function(c) {
    var g = !1;
    "function" === typeof define && define.amd && (define(c),
    g = !0);
    "object" === typeof exports && (module.exports = c(),
    g = !0);
    if (!g) {
        var f = window.Cookies
          , d = window.Cookies = c();
        d.noConflict = function() {
            window.Cookies = f;
            return d
        }
    }
})(function() {
    function c() {
        for (var c = 0, d = {}; c < arguments.length; c++) {
            var e = arguments[c], g;
            for (g in e)
                d[g] = e[g]
        }
        return d
    }
    function g(f) {
        function d(e, g, n) {
            var p;
            if ("undefined" !== typeof document) {
                if (1 < arguments.length) {
                    n = c({
                        path: "/"
                    }, d.defaults, n);
                    if ("number" === typeof n.expires) {
                        var q = new Date;
                        q.setMilliseconds(q.getMilliseconds() + 864E5 * n.expires);
                        n.expires = q
                    }
                    try {
                        p = JSON.stringify(g),
                        /^[\{\[]/.test(p) && (g = p)
                    } catch (A) {}
                    g = f.write ? f.write(g, e) : encodeURIComponent(String(g)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                    e = encodeURIComponent(String(e));
                    e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    e = e.replace(/[\(\)]/g, escape);
                    return document.cookie = [e, "=", g, n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
                }
                e || (p = {});
                for (var q = document.cookie ? document.cookie.split("; ") : [], t = /(%[0-9A-Z]{2})+/g, r = 0; r < q.length; r++) {
                    var u = q[r].split("=")
                      , v = u.slice(1).join("=");
                    '"' === v.charAt(0) && (v = v.slice(1, -1));
                    try {
                        var z = u[0].replace(t, decodeURIComponent)
                          , v = f.read ? f.read(v, z) : f(v, z) || v.replace(t, decodeURIComponent);
                        if (this.json)
                            try {
                                v = JSON.parse(v)
                            } catch (A) {}
                        if (e === z) {
                            p = v;
                            break
                        }
                        e || (p[z] = v)
                    } catch (A) {}
                }
                return p
            }
        }
        d.set = d;
        d.get = function(c) {
            return d.call(d, c)
        }
        ;
        d.getJSON = function() {
            return d.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ;
        d.defaults = {};
        d.remove = function(e, f) {
            d(e, "", c(f, {
                expires: -1
            }))
        }
        ;
        d.withConverter = g;
        return d
    }
    return g(function() {})
});
function Mouse() {
    this.DOWN = 0;
    this.UP = 1;
    this.IDLE = 2;
    this.IN = 0;
    this.OUT = 1;
    this.pos = {
        x: 0,
        y: 0
    };
    this.angle = this.y_old = this.x_old = 0;
    this.state = this.IDLE;
    this.dist = this.IN;
    this.down = function() {
        this.state = this.DOWN
    }
    ;
    this.up = function() {
        this.state = this.UP
    }
    ;
    this.update = function() {
        return this.pos.x != this.x_old || this.pos.y != this.y_old ? (this.x_old = this.pos.x,
        this.y_old = this.pos.y,
        !0) : !1
    }
}
function Keyboard() {
    this.set_azerty = function() {
        this.LEFT = 81;
        this.RIGHT = 68;
        this.TOP = 90;
        this.DOWN = 83
    }
    ;
    this.set_qwerty = function() {
        this.LEFT = 65;
        this.RIGHT = 68;
        this.TOP = 87;
        this.BOTTOM = 83
    }
    ;
    this.UP = 0;
    this.DOWN = 1;
    this._1 = 49;
    this._2 = 50;
    this._3 = 51;
    this._4 = 52;
    this._5 = 53;
    this.CTRL = 17;
    this.ARROW_LEFT = 37;
    this.ARROW_RIGHT = 39;
    this.ARROW_TOP = 38;
    this.ARROW_BOTTOM = 40;
    this.SPACE = 32;
    this.R = 82;
    this.G = 71;
    this.V = 86;
    this.B = 66;
    this.set_qwerty();
    this.keys = Array(255).fill(this.UP);
    this.up = function(c) {
        this.keys[Math.min(c.charCode || c.keyCode, 255)] = this.UP
    }
    ;
    this.down = function(c) {
        c = Math.min(c.charCode || c.keyCode, 255);
        c == this.LEFT || c == this.ARROW_LEFT ? this.press_left() : c == this.TOP || c == this.ARROW_TOP ? this.press_top() : c == this.DOWN || c == this.ARROW_DOWN ? this.press_bottom() : c != this.RIGHT && c != this.ARROW_RIGHT || this.press_right();
        this.keys[c] = this.DOWN;
        return c
    }
    ;
    this.press_left = function() {
        this.keys[this.RIGHT] = this.UP;
        this.keys[this.ARROW_RIGHT] = this.UP
    }
    ;
    this.press_right = function() {
        this.keys[this.LEFT] = this.UP;
        this.keys[this.ARROW_LEFT] = this.UP
    }
    ;
    this.press_bottom = function() {
        this.keys[this.TOP] = this.UP;
        this.keys[this.ARROW_TOP] = this.UP
    }
    ;
    this.press_top = function() {
        this.keys[this.BOTTOM] = this.UP;
        this.keys[this.ARROW_BOTTOM] = this.UP
    }
    ;
    this.clear_directionnal = function() {
        this.keys[this.RIGHT] = this.UP;
        this.keys[this.ARROW_RIGHT] = this.UP;
        this.keys[this.LEFT] = this.UP;
        this.keys[this.ARROW_LEFT] = this.UP;
        this.keys[this.TOP] = this.UP;
        this.keys[this.ARROW_TOP] = this.UP;
        this.keys[this.BOTTOM] = this.UP;
        this.keys[this.ARROW_BOTTOM] = this.UP
    }
    ;
    this.is_left = function() {
        return this.keys[this.LEFT] || this.keys[this.ARROW_LEFT]
    }
    ;
    this.is_right = function() {
        return this.keys[this.RIGHT] || this.keys[this.ARROW_RIGHT]
    }
    ;
    this.is_top = function() {
        return this.keys[this.TOP] || this.keys[this.ARROW_TOP]
    }
    ;
    this.is_bottom = function() {
        return this.keys[this.BOTTOM] || this.keys[this.ARROW_BOTTOM]
    }
    ;
    this.is_ctrl = function() {
        return this.keys[this.CTRL]
    }
    ;
    this.is_1 = function() {
        return this.keys[this._1]
    }
    ;
    this.is_2 = function() {
        return this.keys[this._2]
    }
    ;
    this.is_3 = function() {
        return this.keys[this._3]
    }
    ;
    this.is_4 = function() {
        return this.keys[this._4]
    }
    ;
    this.is_space = function() {
        return this.keys[this.SPACE]
    }
    ;
    this.is_r = function() {
        return this.keys[this.R]
    }
    ;
    this.is_g = function() {
        return this.keys[this.G]
    }
    ;
    this.is_v = function() {
        return this.keys[this.V]
    }
    ;
    this.is_b = function() {
        return this.keys[this.B]
    }
}
var can = document.getElementById("game_canvas")
  , ctx = can.getContext("2d")
  , canw = can.width
  , canh = can.height
  , canw2 = can.width / 2
  , canh2 = can.height / 2
  , canm = {
    x: canw2,
    y: canh2
}
  , scale = 1;
can.oncontextmenu = function() {
    return !1
}
;
function CTI(c) {
    var g = new Image;
    g.src = c.toDataURL("image/png");
    g.width = c.width;
    g.height = c.height;
    return g
}
function resize_canvas() {
    can.width != window.innerWidth && (can.width = window.innerWidth,
    canw = can.width,
    canw2 = can.width / 2);
    can.height != window.innerHeight && (can.height = window.innerHeight,
    canh = can.height,
    canh2 = can.height / 2);
    canm = {
        x: canw2,
        y: canh2
    };
    user && (user.cam.rw = can.width,
    user.cam.rh = can.height);
    loader.is_run ? loader.update() : ui.is_run ? ui.update() : game.is_run && game.update()
}
var game_body = document.getElementById("game_body");
game_body.ondragstart = function() {
    return !1
}
;
game_body.ondrop = function() {
    return !1
}
;
game_body.onresize = resize_canvas;
(function() {
    for (var c = 0, g = ["ms", "moz", "webkit", "o"], f = 0; f < g.length && !window.requestAnimationFrame; ++f)
        window.requestAnimationFrame = window[g[f] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[g[f] + "CancelAnimationFrame"] || window[g[f] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(d, e) {
        var f = (new Date).getTime()
          , g = Math.max(0, 16 - (f - c))
          , p = window.setTimeout(function() {
            d(f + g)
        }, g);
        c = f + g;
        return p
    }
    );
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(c) {
        clearTimeout(c)
    }
    )
})();
IMAGES = {
    LOGO: "img/logo.png"
};
var SPRITE = {
    GROUND: ["#133A2B", "#032428"],
    CRAFT_LOADING: ["#4EB687", "#187484"],
    DAY: 0,
    NIGHT: 1,
    SWORD: 0,
    PICK: 1,
    HAND: 2,
    TREE: 3,
    BODY: 4,
    STONES: 5,
    SEED: 6,
    PICK_GOLD: 7,
    PICK_DIAMOND: 8,
    SWORD_GOLD: 9,
    SWORD_DIAMOND: 10,
    WOOD_FIRE: 11,
    WORKBENCH: 12,
    PLANT_SEED: 13,
    CRAFT_PICK: 14,
    PICK_WOOD: 15,
    WALL: 16,
    SPIKE: 17,
    MEAT: 18,
    COOKED_MEAT: 19,
    INV_PLANT: 82,
    BANDAGE: 21,
    CRAFT_SWORD: 22,
    CRAFT_WORK: 88,
    RABBIT: 91,
    PLAY: 87,
    GAUGES: 99,
    LEADERBOARD: 105,
    HURT: 137,
    COLD: 140,
    HUNGER: 143,
    GROUND_FIRE: 147,
    COUNTER: 151,
    CRAFT_SEED: 154,
    HERB: 158,
    HAND_SHADOW: 162,
    PLANT_MINI: 168,
    GOLD: 149,
    DIAMOND: 187,
    FIRE: 191,
    HALO_FIRE: 195,
    CRAFT_SWORD_GOLD: 200,
    CRAFT_SWORD_DIAMOND: 42,
    INV_SWORD_GOLD: 43,
    INV_SWORD_DIAMOND: 44,
    PLANT: 45,
    FRUIT: 46,
    CRAFT_PICK_GOLD: 47,
    CRAFT_PICK_DIAMOND: 48,
    INV_PICK_GOLD: 49,
    INV_PICK_DIAMOND: 50,
    INV_GOLD: 51,
    INV_DIAMOND: 52,
    WOLF: 53,
    INV_MEAT: 54,
    GEAR2: 55,
    CRAFT_FIRE: 56,
    INV_BANDAGE: 57,
    CRAFT_BANDAGE: 58,
    CORD: 59,
    INV_CORD: 60,
    YOUR_SCORE: 61,
    TREE_BRANCH: 62,
    HEAL: 63,
    INV_FIRE: 64,
    INV_WORK: 65,
    INV_SEED: 66,
    INV_PICK: 67,
    INV_PICK_WOOD: 68,
    CRAFT_PICK_WOOD: 69,
    INV_STONE: 70,
    INV_WOOD: 71,
    INV_WALL: 72,
    CRAFT_WALL: 73,
    INV_SPIKE: 74,
    CRAFT_SPIKE: 75,
    HURT_RABBIT: 76,
    INV_COOKED_MEAT: 77,
    GEAR: 78,
    CRAFT_COOKED_MEAT: 79,
    MINIMAP: 80,
    HURT_WOLF: 81,
    BIG_FIRE_WOOD: 20,
    CRAFT_BIG_FIRE: 83,
    INV_BIG_FIRE: 84,
    SPIDER: 85,
    INV_SWORD: 86,
    DIAMOND_WALL: 25,
    STONE_WALL: 23,
    CRAFT_STONE_WALL: 89,
    INV_STONE_WALL: 90,
    GOLD_WALL: 24,
    CRAFT_GOLD_WALL: 92,
    INV_GOLD_WALL: 93,
    INV_DIAMOND_WALL: 94,
    CRAFT_DIAMOND_WALL: 95,
    HURT_SPIDER: 96,
    EMPTY_SLOT: 97,
    WEB: 98,
    DOOR_WOOD_CLOSE: 26,
    CRAFT_DOOR_WOOD_CLOSE: 100,
    INV_DOOR_WOOD_CLOSE: 101,
    DOOR_WOOD_OPEN: 102,
    CHEST: 27,
    INV_CHEST: 106,
    CRAFT_CHEST: 107,
    CHEST_SLOT: 108,
    CHEST_SWORD: 109,
    CHEST_PICK: 110,
    CHEST_STONE: 111,
    CHEST_WOOD: 112,
    CHEST_PLANT: 113,
    CHEST_GOLD: 114,
    CHEST_DIAMOND: 115,
    CHEST_PICK_GOLD: 116,
    CHEST_PICK_DIAMOND: 117,
    CHEST_SWORD_GOLD: 118,
    CHEST_SWORD_DIAMOND: 119,
    CHEST_FIRE: 120,
    CHEST_WORK: 121,
    CHEST_SEED: 122,
    CHEST_WALL: 123,
    CHEST_SPIKE: 124,
    CHEST_PICK_WOOD: 125,
    CHEST_COOKED_MEAT: 126,
    CHEST_MEAT: 127,
    CHEST_BIG_FIRE: 128,
    CHEST_BANDAGE: 129,
    CHEST_CORD: 130,
    CHEST_STONE_WALL: 131,
    CHEST_GOLD_WALL: 132,
    CHEST_DIAMOND_WALL: 133,
    CHEST_DOOR_WOOD_CLOSE: 134,
    CHEST_WORKBENCH: 135,
    CHEST_CHEST: 136,
    STONE_SPIKE: 28,
    CRAFT_STONE_SPIKE: 138,
    INV_STONE_SPIKE: 139,
    GOLD_SPIKE: 29,
    INV_GOLD_SPIKE: 141,
    CRAFT_GOLD_SPIKE: 142,
    DIAMOND_SPIKE: 30,
    INV_DIAMOND_SPIKE: 144,
    CRAFT_DIAMOND_SPIKE: 145,
    CHEST_PLUS: 146,
    BAG: 35,
    CRAFT_BAG: 148,
    FUR: 34,
    INV_FUR: 150,
    EARMUFFS: 36,
    INV_EARMUFFS: 152,
    CRAFT_EARMUFFS: 153,
    DOOR_STONE_CLOSE: 31,
    CRAFT_DOOR_STONE_CLOSE: 155,
    INV_DOOR_STONE_CLOSE: 156,
    DOOR_STONE_OPEN: 157,
    DOOR_GOLD_CLOSE: 32,
    CRAFT_DOOR_GOLD_CLOSE: 159,
    INV_DOOR_GOLD_CLOSE: 160,
    DOOR_GOLD_OPEN: 161,
    DOOR_DIAMOND_CLOSE: 33,
    CRAFT_DOOR_DIAMOND_CLOSE: 163,
    INV_DOOR_DIAMOND_CLOSE: 164,
    DOOR_DIAMOND_OPEN: 165,
    CRAFT_COAT: 166,
    INV_COAT: 167,
    COAT: 37,
    CHEST_STONE_SPIKE: 169,
    CHEST_GOLD_SPIKE: 170,
    CHEST_DIAMOND_SPIKE: 171,
    CHEST_BAG: 172,
    CHEST_FUR: 173,
    CHEST_EARMUFFS: 174,
    CHEST_DOOR_STONE_CLOSE: 175,
    CHEST_DOOR_GOLD_CLOSE: 176,
    CHEST_DOOR_DIAMOND_CLOSE: 177,
    CHEST_COAT: 178,
    INV_BAG: 179,
    FUR_WOLF: 180,
    INV_FUR_WOLF: 181,
    CHEST_FUR_WOLF: 182,
    SPEAR: 38,
    INV_SPEAR: 188,
    CRAFT_SPEAR: 189,
    CHEST_SPEAR: 190,
    GOLD_SPEAR: 39,
    INV_GOLD_SPEAR: 192,
    CRAFT_GOLD_SPEAR: 193,
    CHEST_GOLD_SPEAR: 194,
    DIAMOND_SPEAR: 40,
    INV_DIAMOND_SPEAR: 196,
    CRAFT_DIAMOND_SPEAR: 197,
    CHEST_DIAMOND_SPEAR: 198,
    FURNACE_ON: 199,
    FURNACE_OFF: 41,
    INV_FURNACE: 201,
    CRAFT_FURNACE: 202,
    CHEST_FURNACE: 203,
    FURNACE_SLOT: 204,
    FURNACE_BUTTON: 205,
    FIR_SMALL: 206,
    FIR_MEDIUM: 207,
    FIR_HUGH: 208,
    STONES_WINTER: 209,
    GOLD_WINTER: 210,
    DIAMOND_WINTER: 211,
    GROUND_FIRE_WINTER: 212,
    AMETHYST: 213,
    INV_AMETHYST: 214
};
sprite = [];
function fill_path(c, g, f, d) {
    g && (c.fillStyle = g,
    c.fill());
    f && (c.lineWidth = d,
    c.strokeStyle = f,
    c.stroke())
}
function round_rect(c, g, f, d, e, m) {
    d < 2 * m && (m = d / 2);
    e < 2 * m && (m = e / 2);
    0 > m && (m = 0);
    c.beginPath();
    c.moveTo(g + m, f);
    c.arcTo(g + d, f, g + d, f + e, m);
    c.arcTo(g + d, f + e, g, f + e, m);
    c.arcTo(g, f + e, g, f, m);
    c.arcTo(g, f, g + d, f, m);
    c.closePath()
}
function circle(c, g, f, d) {
    c.beginPath();
    c.arc(g, f, d, 0, 2 * Math.PI)
}
function round_regular_polygon(c, g, f, d) {
    var e = 2 * Math.PI / g;
    c.beginPath();
    for (var m = [{
        x: f,
        y: 0
    }], n = [], p = 1; p < g; p++) {
        m.push({
            x: Math.cos(p * e) * f,
            y: Math.sin(p * e) * f
        });
        var q = m.length;
        n.push(Utils.middle_point(m[q - 2], m[q - 1]))
    }
    n.push(Utils.middle_point(m[m.length - 1], m[0]));
    f = n[n.length - 1];
    c.moveTo(f.x, f.y);
    for (p = 0; p < g; p++)
        c.arcTo(m[p].x, m[p].y, n[p].x, n[p].y, d);
    c.closePath()
}
function create_rotated_img(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = Math.sqrt(g.width * g.width + g.height * g.height);
    d2 = e / 2;
    f.width = e;
    f.height = e;
    d.translate(d2, d2);
    d.rotate(c);
    d.drawImage(g, -g.width / 2, -g.height / 2);
    return f
}
function create_message(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = Math.floor(28 * c)
      , m = Math.floor(20 * c);
    d.font = m + "px Baloo Paaji";
    var n = 8 * c
      , p = d.measureText(g).width + 2 * n;
    f.width = p;
    f.height = e;
    round_rect(d, 0, 0, p, e, 10 * c);
    d.globalAlpha = .5;
    fill_path(d, "#000");
    d.globalAlpha = 1;
    d.textBaseline = "middle";
    d.font = m + "px Baloo Paaji";
    d.beginPath();
    d.fillStyle = "#FFF";
    d.fillText(g, n, e / 2);
    return f
}
function create_hurt_player(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 120 * c
      , m = 110 * c
      , n = 20 * c
      , p = 112 * c
      , q = 82 * c
      , t = p / 2
      , r = q / 2
      , u = 4 * c;
    f.width = e;
    f.height = m;
    d.globalAlpha = 1;
    d.translate(e / 2, m / 2);
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, g, g, u);
    return f
}
function create_player(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 120 * c
      , m = 110 * c
      , n = 20 * c
      , p = 8 * c
      , q = 112 * c
      , t = 82 * c
      , r = q / 2
      , u = t / 2
      , v = 4 * c;
    f.width = e;
    f.height = m;
    d.translate(e / 2, m / 2 + p);
    d.globalAlpha = .5;
    round_rect(d, -r, -u, q, t, n);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    d.translate(0, -p);
    round_rect(d, -r, -u, q, t, n);
    fill_path(d, g[1], g[2], v);
    e = 25 * c;
    m = 20 * c;
    n = 15 * c;
    p = 5 * c;
    q = 28 * c;
    t = 12 * c;
    r = 22 * c;
    u = 12 * c;
    d.save();
    d.translate(-e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(-q, t);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    d.restore();
    d.save();
    d.translate(e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(r, u);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    return f
}
function create_plant_seed(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 40 * c
      , m = 40 * c;
    g.width = e;
    g.height = m;
    var e = c * e / 2
      , m = c * m / 2
      , n = 15 * c;
    d.save();
    d.translate(e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, f[0]);
    n = 5 * c;
    d.translate(2 * c, 1 * c);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, f[1]);
    d.restore();
    return g
}
function create_food_plant(c) {
    var g = document.createElement("canvas")
      , f = g.getContext("2d");
    g.width = 200 * c;
    g.height = 200 * c;
    c = create_plant(.35, !1, ["#0e3022", "#0b8052", "#077b49"]);
    f.drawImage(c, 10, 10);
    c = create_fruit(.9, !1, ["#54318e", "#725ba3"]);
    f.drawImage(c, 21, 20);
    c = create_fruit(.9, !1, ["#54318e", "#725ba3"]);
    f.drawImage(c, 38, 28);
    c = create_fruit(.9, !1, ["#54318e", "#725ba3"]);
    f.drawImage(c, 15, 37);
    c = create_fruit(.9, !1, ["#54318e", "#725ba3"]);
    f.drawImage(c, 32, 45);
    return g
}
function create_gear(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 100 * c
      , m = 100 * c;
    f.width = e;
    f.height = m;
    var n = 5 * c
      , p = 28 * c
      , q = n / 2
      , t = p / 2;
    d.translate(e / 2, m / 2);
    for (e = 0; 4 > e; e++)
        round_rect(d, -q, -t, n, p, 2 * c),
        d.rotate(Math.PI / 4),
        fill_path(d, g);
    d.arc(0, 0, 10 * c, 0, 2 * Math.PI);
    fill_path(d, g);
    d.globalCompositeOperation = "destination-out";
    circle(d, 0, 0, 4 * c);
    d.fill();
    return f
}
function create_minimap_object(c, g, f, d, e, m, n) {
    n = void 0 === n ? 0 : n;
    for (var p = -1 == m ? 0 : m; p >= n; p--)
        for (var q = 0; 100 > q; q++)
            for (var t = 0; 100 > t; t++)
                for (var r = MAP.tiles[t][q], r = -1 == m ? r[d] : r[d][p], u = 0; u < r.length; u++) {
                    var v = r[u];
                    c.fillStyle = f;
                    circle(c, v.x * g * .018, v.y * g * .018, e * g);
                    c.fill()
                }
}
function create_minimap(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 200 * c;
    f.height = 200 * c;
    d.translate(12 * c, 8 * c);
    d.fillStyle = g[9];
    d.fillRect(-7, 0, f.width - 10, f.height - 18);
    d.fillStyle = g[0];
    d.fillRect(0, 0, f.width - 25, f.height - 25);
    create_minimap_object(d, c, g[1], "p", 5, -1);
    create_minimap_object(d, c, g[2], "s", 3, 2, 2);
    create_minimap_object(d, c, g[3], "s", 4, 1, 1);
    create_minimap_object(d, c, g[4], "s", 5, 0, 0);
    create_minimap_object(d, c, g[5], "t", 3, 5, 4);
    create_minimap_object(d, c, g[6], "t", 4, 3, 2);
    create_minimap_object(d, c, g[7], "t", 4, 1, 0);
    create_minimap_object(d, c, g[8], "b", 4, 3, 2);
    create_minimap_object(d, c, g[9], "b", 4, 1, 0);
    create_minimap_object(d, c, g[10], "g", 3, 2, 2);
    create_minimap_object(d, c, g[11], "g", 4, 1, 1);
    create_minimap_object(d, c, g[12], "g", 5, 0, 0);
    create_minimap_object(d, c, g[13], "d", 3, 2, 2);
    create_minimap_object(d, c, g[14], "d", 4, 1, 1);
    create_minimap_object(d, c, g[15], "d", 5, 0, 0);
    d.translate(-7, -2);
    round_rect(d, 0, 0, f.width - 9, f.height - 14, 10);
    d.lineWidth = 5;
    d.strokeStyle = g[16];
    d.stroke();
    return f
}
function create_workbench(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 125 * c
      , n = 95 * c
      , p = 10 * c
      , q = 8 * c
      , t = 112 * c
      , r = 82 * c
      , u = t / 2
      , v = r / 2
      , z = 4 * c;
    d.width = m;
    d.height = n;
    e.translate(m / 2 - 4 * c, n / 2 + 4 * c);
    e.globalAlpha = g ? .5 : 1;
    round_rect(e, -u, -v, t, r, p);
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.translate(0, -q);
    round_rect(e, -u, -v, t, r, p);
    fill_path(e, f[1], f[2], z);
    m = 55 * c;
    n = 45 * c;
    p = 5;
    e.translate(-40 * c, -30 * c);
    round_rect(e, 0, 0, m, n, p);
    fill_path(e, f[3]);
    g = create_gear(.7 * c, f[3]);
    e.drawImage(g, 45 * c, -25 * c);
    g = create_gear(.7 * c, f[3]);
    e.drawImage(g, 45 * c, 15 * c);
    g = create_gear(1.2 * c, f[3]);
    e.drawImage(g, 28 * c, -30 * c);
    m = 15 * c;
    n = 70 * c;
    p = 5 * c;
    e.translate(78 * c, -5 * c);
    round_rect(e, 0, 0, m, n, p);
    fill_path(e, f[4]);
    m = 9 * c;
    n = 50 * c;
    p = 3 * c;
    e.translate(-20 * c, 20 * c);
    e.rotate(Math.PI / 5);
    e.globalAlpha = .6;
    round_rect(e, 0, 0, m, n, p);
    fill_path(e, f[5]);
    e.translate(-20 * c, 29 * c);
    e.rotate(Math.PI / 5);
    e.globalAlpha = .6;
    e.beginPath();
    e.lineJoin = "round";
    e.moveTo(0, 0);
    e.lineTo(0, 30 * c);
    e.lineTo(30 * c, 30 * c);
    e.closePath();
    fill_path(e, null , f[5], 8 * c);
    return d
}
function create_rabbit(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 6 * c;
    f.width = 85 * c;
    f.height = 115 * c;
    d.translate(-130 * c, -60 * c + e);
    d.globalAlpha = .5;
    d.beginPath();
    d.bezierCurveTo(190 * c, 87 * c, 201 * c, 59 * c, 208 * c, 64 * c);
    d.bezierCurveTo(213 * c, 68 * c, 204 * c, 93 * c, 195 * c, 109 * c);
    d.bezierCurveTo(195 * c, 109 * c, 202 * c, 124 * c, 191 * c, 141 * c);
    d.bezierCurveTo(182 * c, 151 * c, 164 * c, 155 * c, 148 * c, 144 * c);
    d.bezierCurveTo(136 * c, 135 * c, 138 * c, 111 * c, 145 * c, 104 * c);
    d.bezierCurveTo(140 * c, 92 * c, 131 * c, 67 * c, 138 * c, 63 * c);
    d.bezierCurveTo(145 * c, 61 * c, 153 * c, 82 * c, 155 * c, 96 * c);
    d.bezierCurveTo(167 * c, 91 * c, 178 * c, 92 * c, 187 * c, 98 * c);
    d.closePath();
    fill_path(d, g[0]);
    d.translate(0, -e);
    d.globalAlpha = 1;
    d.beginPath();
    d.bezierCurveTo(190 * c, 87 * c, 201 * c, 59 * c, 208 * c, 64 * c);
    d.bezierCurveTo(213 * c, 68 * c, 204 * c, 93 * c, 195 * c, 109 * c);
    d.bezierCurveTo(195 * c, 109 * c, 202 * c, 124 * c, 191 * c, 141 * c);
    d.bezierCurveTo(182 * c, 151 * c, 164 * c, 155 * c, 148 * c, 144 * c);
    d.bezierCurveTo(136 * c, 135 * c, 138 * c, 111 * c, 145 * c, 104 * c);
    d.bezierCurveTo(140 * c, 92 * c, 131 * c, 67 * c, 138 * c, 63 * c);
    d.bezierCurveTo(145 * c, 61 * c, 153 * c, 82 * c, 155 * c, 96 * c);
    d.bezierCurveTo(167 * c, 91 * c, 178 * c, 92 * c, 187 * c, 98 * c);
    d.closePath();
    fill_path(d, g[1], g[2], 4);
    var e = 155 * c
      , m = 133 * c
      , n = 10 * c
      , p = 3 * c
      , q = e + -3 * c
      , t = m + -5 * c;
    d.save();
    d.translate(e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(q, t);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    d.restore();
    d.save();
    d.translate(e + 27 * c, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(27 * c + q, t);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    return f
}
function create_hurt_rabbit(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 4 * c;
    f.width = 85 * c;
    f.height = 115 * c;
    d.translate(-130 * c, -60 * c);
    d.globalAlpha = 1;
    d.beginPath();
    d.bezierCurveTo(190 * c, 87 * c, 201 * c, 59 * c, 208 * c, 64 * c);
    d.bezierCurveTo(213 * c, 68 * c, 204 * c, 93 * c, 195 * c, 109 * c);
    d.bezierCurveTo(195 * c, 109 * c, 202 * c, 124 * c, 191 * c, 141 * c);
    d.bezierCurveTo(182 * c, 151 * c, 164 * c, 155 * c, 148 * c, 144 * c);
    d.bezierCurveTo(136 * c, 135 * c, 138 * c, 111 * c, 145 * c, 104 * c);
    d.bezierCurveTo(140 * c, 92 * c, 131 * c, 67 * c, 138 * c, 63 * c);
    d.bezierCurveTo(145 * c, 61 * c, 153 * c, 82 * c, 155 * c, 96 * c);
    d.bezierCurveTo(167 * c, 91 * c, 178 * c, 92 * c, 187 * c, 98 * c);
    d.closePath();
    fill_path(d, g, g, e);
    return f
}
function create_hurt_wolf(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 89 * c;
    f.height = 135 * c;
    d.translate(-23 * c, -8 * c);
    d.beginPath();
    d.bezierCurveTo(35 * c, 37 * c, 33 * c, 21 * c, 33 * c, 21 * c);
    d.bezierCurveTo(33 * c, 21 * c, 51 * c, 32 * c, 52 * c, 32 * c);
    d.bezierCurveTo(65 * c, 26 * c, 74 * c, 27 * c, 84 * c, 33 * c);
    d.bezierCurveTo(84 * c, 33 * c, 94 * c, 28 * c, 102 * c, 24 * c);
    d.bezierCurveTo(102 * c, 24 * c, 100 * c, 34 * c, 97 * c, 47 * c);
    d.bezierCurveTo(97 * c, 47 * c, 107 * c, 62 * c, 101 * c, 76 * c);
    d.bezierCurveTo(94 * c, 92 * c, 80 * c, 115 * c, 68 * c, 129 * c);
    d.bezierCurveTo(68 * c, 129 * c, 46 * c, 101 * c, 35 * c, 83 * c);
    d.bezierCurveTo(31 * c, 77 * c, 26 * c, 56 * c, 38 * c, 46 * c);
    d.closePath();
    fill_path(d, g, g, 4);
    return f
}
function create_wolf(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 8 * c;
    f.width = 89 * c;
    f.height = 135 * c;
    d.translate(-23 * c, -8 * c + e);
    d.globalAlpha = .5;
    d.beginPath();
    d.bezierCurveTo(35 * c, 37 * c, 33 * c, 21 * c, 33 * c, 21 * c);
    d.bezierCurveTo(33 * c, 21 * c, 51 * c, 32 * c, 52 * c, 32 * c);
    d.bezierCurveTo(65 * c, 26 * c, 74 * c, 27 * c, 84 * c, 33 * c);
    d.bezierCurveTo(84 * c, 33 * c, 94 * c, 28 * c, 102 * c, 24 * c);
    d.bezierCurveTo(102 * c, 24 * c, 100 * c, 34 * c, 97 * c, 47 * c);
    d.bezierCurveTo(97 * c, 47 * c, 107 * c, 62 * c, 101 * c, 76 * c);
    d.bezierCurveTo(94 * c, 92 * c, 80 * c, 115 * c, 68 * c, 129 * c);
    d.bezierCurveTo(68 * c, 129 * c, 46 * c, 101 * c, 35 * c, 83 * c);
    d.bezierCurveTo(31 * c, 77 * c, 26 * c, 56 * c, 38 * c, 46 * c);
    d.closePath();
    fill_path(d, g[0]);
    d.translate(0, -e);
    d.globalAlpha = 1;
    d.beginPath();
    d.bezierCurveTo(35 * c, 37 * c, 33 * c, 21 * c, 33 * c, 21 * c);
    d.bezierCurveTo(33 * c, 21 * c, 51 * c, 32 * c, 52 * c, 32 * c);
    d.bezierCurveTo(65 * c, 26 * c, 74 * c, 27 * c, 84 * c, 33 * c);
    d.bezierCurveTo(84 * c, 33 * c, 94 * c, 28 * c, 102 * c, 24 * c);
    d.bezierCurveTo(102 * c, 24 * c, 100 * c, 34 * c, 97 * c, 47 * c);
    d.bezierCurveTo(97 * c, 47 * c, 107 * c, 62 * c, 101 * c, 76 * c);
    d.bezierCurveTo(94 * c, 92 * c, 80 * c, 115 * c, 68 * c, 129 * c);
    d.bezierCurveTo(68 * c, 129 * c, 46 * c, 101 * c, 35 * c, 83 * c);
    d.bezierCurveTo(31 * c, 77 * c, 26 * c, 56 * c, 38 * c, 46 * c);
    d.closePath();
    fill_path(d, g[1], g[2], 4);
    var e = 49 * c
      , m = 83 * c
      , n = 8 * c
      , p = 3 * c
      , q = e + -3 * c
      , t = m + -5 * c;
    d.save();
    d.translate(e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(q, t);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    d.restore();
    d.save();
    d.translate(e + 37 * c, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[3]);
    d.restore();
    d.save();
    d.translate(37 * c + q, t);
    d.globalAlpha = 1;
    circle(d, 0, 0, p);
    fill_path(d, g[4]);
    return f
}
function create_meat(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 55 * c;
    g.height = 55 * c;
    d.translate(-65 * c, -55 * c + 8 * c);
    d.globalAlpha = 1;
    d.beginPath();
    d.moveTo(95 * c, 60 * c);
    d.bezierCurveTo(107 * c, 62 * c, 110 * c, 73 * c, 107 * c, 79 * c);
    d.bezierCurveTo(104 * c, 85 * c, 85 * c, 93 * c, 81 * c, 88 * c);
    d.bezierCurveTo(74 * c, 80 * c, 85 * c, 60 * c, 95 * c, 60 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 3);
    d.globalAlpha = 1;
    d.beginPath();
    d.moveTo(91 * c, 70 * c);
    d.bezierCurveTo(91 * c, 75 * c, 100 * c, 76 * c, 100 * c, 73 * c);
    d.bezierCurveTo(100 * c, 69 * c, 89 * c, 65 * c, 91 * c, 70 * c);
    d.closePath();
    fill_path(d, f[2], f[3], 3);
    return g
}
function create_hurt_spider(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 238 * c;
    f.height = 230 * c;
    d.translate(-93 * c, -110 * c);
    circle(d, 213.5 * c, 256.75 * c, 75 * c);
    fill_path(d, g);
    circle(d, 213.5 * c, 175.75 * c, 25 * c);
    fill_path(d, g);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(156.5 * c, 137.75 * c);
    d.bezierCurveTo(170.5 * c, 173.75 * c, 195.5 * c, 177.75 * c, 209.5 * c, 177.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(217.5 * c, 178.75 * c);
    d.bezierCurveTo(251.5 * c, 177.75 * c, 263.5 * c, 153.75 * c, 270.5 * c, 140.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(130.5 * c, 124.75 * c);
    d.bezierCurveTo(153.5 * c, 185.75 * c, 198.5 * c, 185.75 * c, 213.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 183.75 * c);
    d.bezierCurveTo(265.5 * c, 192.75 * c, 293.5 * c, 141.75 * c, 297.5 * c, 124.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(107.5 * c, 213.75 * c);
    d.bezierCurveTo(151.5 * c, 190.75 * c, 198.5 * c, 184.75 * c, 210.5 * c, 184.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(212.5 * c, 187.75 * c);
    d.bezierCurveTo(258.5 * c, 182.75 * c, 286.5 * c, 194.75 * c, 314.5 * c, 206.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(102.5 * c, 258.75 * c);
    d.bezierCurveTo(142.5 * c, 200.75 * c, 193.5 * c, 194.75 * c, 211.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 192.75 * c);
    d.bezierCurveTo(276.5 * c, 194.75 * c, 306.5 * c, 233.75 * c, 316.5 * c, 246.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(219.5 * c, 158.75 * c);
    d.bezierCurveTo(226.5 * c, 159.75 * c, 227.5 * c, 147.75 * c, 219.5 * c, 145.75 * c);
    d.closePath();
    d.lineWidth = 10 * c;
    d.strokeStyle = g;
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(210.5 * c, 160.75 * c);
    d.bezierCurveTo(203.5 * c, 159.75 * c, 199.5 * c, 146.75 * c, 210.5 * c, 145.75 * c);
    d.closePath();
    d.lineWidth = 10 * c;
    d.strokeStyle = g;
    d.stroke();
    return f
}
function create_spider(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 238 * c;
    f.height = 230 * c;
    d.translate(-93 * c, -110 * c + 5 * c);
    d.globalAlpha = .3;
    circle(d, 213.5 * c, 256.75 * c, 75 * c);
    fill_path(d, g[5]);
    circle(d, 213.5 * c, 175.75 * c, 25 * c);
    fill_path(d, g[5]);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(156.5 * c, 137.75 * c);
    d.bezierCurveTo(170.5 * c, 173.75 * c, 195.5 * c, 177.75 * c, 209.5 * c, 177.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(217.5 * c, 178.75 * c);
    d.bezierCurveTo(251.5 * c, 177.75 * c, 263.5 * c, 153.75 * c, 270.5 * c, 140.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(130.5 * c, 124.75 * c);
    d.bezierCurveTo(153.5 * c, 185.75 * c, 198.5 * c, 185.75 * c, 213.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 183.75 * c);
    d.bezierCurveTo(265.5 * c, 192.75 * c, 293.5 * c, 141.75 * c, 297.5 * c, 124.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(107.5 * c, 213.75 * c);
    d.bezierCurveTo(151.5 * c, 190.75 * c, 198.5 * c, 184.75 * c, 210.5 * c, 184.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(212.5 * c, 187.75 * c);
    d.bezierCurveTo(258.5 * c, 182.75 * c, 286.5 * c, 194.75 * c, 314.5 * c, 206.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(102.5 * c, 258.75 * c);
    d.bezierCurveTo(142.5 * c, 200.75 * c, 193.5 * c, 194.75 * c, 211.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 192.75 * c);
    d.bezierCurveTo(276.5 * c, 194.75 * c, 306.5 * c, 233.75 * c, 316.5 * c, 246.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[5];
    d.stroke();
    d.translate(0, -5);
    d.globalAlpha = 1;
    circle(d, 213.5 * c, 256.75 * c, 75 * c);
    fill_path(d, g[3]);
    circle(d, 213.5 * c, 175.75 * c, 25 * c);
    fill_path(d, g[3]);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(219.5 * c, 158.75 * c);
    d.bezierCurveTo(226.5 * c, 159.75 * c, 227.5 * c, 147.75 * c, 219.5 * c, 145.75 * c);
    d.closePath();
    d.lineWidth = 10 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(210.5 * c, 160.75 * c);
    d.bezierCurveTo(203.5 * c, 159.75 * c, 199.5 * c, 146.75 * c, 210.5 * c, 145.75 * c);
    d.closePath();
    d.lineWidth = 10 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(219.5 * c, 158.75 * c);
    d.bezierCurveTo(226.5 * c, 159.75 * c, 227.5 * c, 147.75 * c, 219.5 * c, 145.75 * c);
    d.closePath();
    d.fillStyle = g[0];
    d.fill();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(210.5 * c, 160.75 * c);
    d.bezierCurveTo(203.5 * c, 159.75 * c, 199.5 * c, 146.75 * c, 210.5 * c, 145.75 * c);
    d.closePath();
    d.fillStyle = g[0];
    d.fill();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(156.5 * c, 137.75 * c);
    d.bezierCurveTo(170.5 * c, 173.75 * c, 195.5 * c, 177.75 * c, 209.5 * c, 177.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(217.5 * c, 178.75 * c);
    d.bezierCurveTo(251.5 * c, 177.75 * c, 263.5 * c, 153.75 * c, 270.5 * c, 140.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(130.5 * c, 124.75 * c);
    d.bezierCurveTo(153.5 * c, 185.75 * c, 198.5 * c, 185.75 * c, 213.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 183.75 * c);
    d.bezierCurveTo(265.5 * c, 192.75 * c, 293.5 * c, 141.75 * c, 297.5 * c, 124.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(107.5 * c, 213.75 * c);
    d.bezierCurveTo(151.5 * c, 190.75 * c, 198.5 * c, 184.75 * c, 210.5 * c, 184.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(212.5 * c, 187.75 * c);
    d.bezierCurveTo(258.5 * c, 182.75 * c, 286.5 * c, 194.75 * c, 314.5 * c, 206.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(102.5 * c, 258.75 * c);
    d.bezierCurveTo(142.5 * c, 200.75 * c, 193.5 * c, 194.75 * c, 211.5 * c, 185.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 192.75 * c);
    d.bezierCurveTo(276.5 * c, 194.75 * c, 306.5 * c, 233.75 * c, 316.5 * c, 246.75 * c);
    d.lineWidth = 17 * c;
    d.strokeStyle = g[3];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(156.5 * c, 137.75 * c);
    d.bezierCurveTo(170.5 * c, 173.75 * c, 195.5 * c, 177.75 * c, 209.5 * c, 177.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(217.5 * c, 178.75 * c);
    d.bezierCurveTo(251.5 * c, 177.75 * c, 263.5 * c, 153.75 * c, 270.5 * c, 140.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(130.5 * c, 124.75 * c);
    d.bezierCurveTo(153.5 * c, 185.75 * c, 198.5 * c, 185.75 * c, 213.5 * c, 185.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 183.75 * c);
    d.bezierCurveTo(265.5 * c, 192.75 * c, 293.5 * c, 141.75 * c, 297.5 * c, 124.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(107.5 * c, 213.75 * c);
    d.bezierCurveTo(151.5 * c, 190.75 * c, 198.5 * c, 184.75 * c, 210.5 * c, 184.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(212.5 * c, 187.75 * c);
    d.bezierCurveTo(258.5 * c, 182.75 * c, 286.5 * c, 194.75 * c, 314.5 * c, 206.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(102.5 * c, 258.75 * c);
    d.bezierCurveTo(142.5 * c, 200.75 * c, 193.5 * c, 194.75 * c, 211.5 * c, 185.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(214.5 * c, 192.75 * c);
    d.bezierCurveTo(276.5 * c, 194.75 * c, 306.5 * c, 233.75 * c, 316.5 * c, 246.75 * c);
    d.lineWidth = 8 * c;
    d.strokeStyle = g[0];
    d.stroke();
    circle(d, 213.5 * c, 256.75 * c, 70 * c);
    fill_path(d, g[0]);
    circle(d, 213.5 * c, 175.75 * c, 20 * c);
    fill_path(d, g[0]);
    circle(d, 222 * c, 166 * c, 5 * c);
    d.fillStyle = g[2];
    d.fill();
    circle(d, 205 * c, 166 * c, 5 * c);
    d.fillStyle = g[2];
    d.fill();
    circle(d, 206.2 * c, 167 * c, 2.5 * c);
    d.fillStyle = g[4];
    d.fill();
    circle(d, 223.2 * c, 167 * c, 2.5 * c);
    d.fillStyle = g[4];
    d.fill();
    d.save();
    d.translate(213.5 * c, 293.75 * c);
    d.rotate(.76);
    round_rect(d, -22 * c, -21 * c, 44 * c, 42 * c, 6 * c);
    d.restore();
    d.fillStyle = g[1];
    d.fill();
    d.save();
    d.translate(212.5 * c, 258.25 * c);
    d.rotate(.8);
    round_rect(d, -15 * c, -14.5 * c, 30 * c, 29 * c, 6 * c);
    d.restore();
    d.fillStyle = g[1];
    d.fill();
    return f
}
function create_web(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 450 * c;
    f.height = 470 * c;
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(226.5 * c, 91.546875 * c);
    d.bezierCurveTo(254.5 * c, 115.546875 * c, 261.5 * c, 115.546875 * c, 294.5 * c, 109.546875 * c);
    d.bezierCurveTo(299.5 * c, 141.546875 * c, 315.5 * c, 151.546875 * c, 344.5 * c, 158.546875 * c);
    d.bezierCurveTo(330.5 * c, 195.546875 * c, 341.5 * c, 207.546875 * c, 361.5 * c, 226.546875 * c);
    d.bezierCurveTo(331.5 * c, 251.546875 * c, 335.5 * c, 270.546875 * c, 342.5 * c, 295.546875 * c);
    d.bezierCurveTo(300.5 * c, 296.546875 * c, 293.5 * c, 325.546875 * c, 292.5 * c, 344.546875 * c);
    d.bezierCurveTo(257.5 * c, 326.546875 * c, 242.5 * c, 338.546875 * c, 224.5 * c, 361.546875 * c);
    d.bezierCurveTo(200.5 * c, 329.546875 * c, 180.5 * c, 334.546875 * c, 155.5 * c, 341.546875 * c);
    d.bezierCurveTo(146.5 * c, 307.546875 * c, 140.5 * c, 302.546875 * c, 107.5 * c, 292.546875 * c);
    d.bezierCurveTo(117.5 * c, 253.546875 * c, 109.5 * c, 244.546875 * c, 89.5 * c, 224.546875 * c);
    d.bezierCurveTo(118.5 * c, 191.546875 * c, 114.5 * c, 182.546875 * c, 108.5 * c, 156.546875 * c);
    d.bezierCurveTo(143.5 * c, 149.546875 * c, 150.5 * c, 136.546875 * c, 157.5 * c, 106.546875 * c);
    d.bezierCurveTo(202.5 * c, 120.546875 * c, 211.5 * c, 103.546875 * c, 228.5 * c, 91.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(224.5 * c, 129.546875 * c);
    d.bezierCurveTo(247.5 * c, 147.546875 * c, 252.5 * c, 143.546875 * c, 274.5 * c, 141.546875 * c);
    d.bezierCurveTo(279.5 * c, 163.546875 * c, 289.5 * c, 168.546875 * c, 311.5 * c, 178.546875 * c);
    d.bezierCurveTo(301.5 * c, 199.546875 * c, 307.5 * c, 213.546875 * c, 323.5 * c, 226.546875 * c);
    d.bezierCurveTo(303.5 * c, 240.546875 * c, 303.5 * c, 255.546875 * c, 312.5 * c, 275.546875 * c);
    d.bezierCurveTo(281.5 * c, 278.546875 * c, 276.5 * c, 291.546875 * c, 272.5 * c, 313.546875 * c);
    d.bezierCurveTo(248.5 * c, 301.546875 * c, 239.5 * c, 310.546875 * c, 224.5 * c, 324.546875 * c);
    d.bezierCurveTo(211.5 * c, 304.546875 * c, 199.5 * c, 301.546875 * c, 176.5 * c, 309.546875 * c);
    d.bezierCurveTo(165.5 * c, 276.546875 * c, 159.5 * c, 275.546875 * c, 138.5 * c, 274.546875 * c);
    d.bezierCurveTo(148.5 * c, 248.546875 * c, 140.5 * c, 237.546875 * c, 125.5 * c, 225.546875 * c);
    d.bezierCurveTo(145.5 * c, 205.546875 * c, 146.5 * c, 195.546875 * c, 142.5 * c, 176.546875 * c);
    d.bezierCurveTo(173.5 * c, 164.546875 * c, 173.5 * c, 155.546875 * c, 178.5 * c, 140.546875 * c);
    d.bezierCurveTo(214.5 * c, 143.546875 * c, 214.5 * c, 135.546875 * c, 226.5 * c, 129.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(224.5 * c, 160.546875 * c);
    d.bezierCurveTo(236.5 * c, 168.546875 * c, 239.5 * c, 168.546875 * c, 258.5 * c, 168.546875 * c);
    d.bezierCurveTo(261.5 * c, 185.546875 * c, 268.5 * c, 187.546875 * c, 282.5 * c, 192.546875 * c);
    d.bezierCurveTo(277.5 * c, 208.546875 * c, 283.5 * c, 216.546875 * c, 289.5 * c, 228.546875 * c);
    d.bezierCurveTo(277.5 * c, 243.546875 * c, 280.5 * c, 253.546875 * c, 281.5 * c, 260.546875 * c);
    d.bezierCurveTo(264.5 * c, 260.546875 * c, 259.5 * c, 269.546875 * c, 256.5 * c, 283.546875 * c);
    d.bezierCurveTo(244.5 * c, 276.546875 * c, 232.5 * c, 283.546875 * c, 223.5 * c, 291.546875 * c);
    d.bezierCurveTo(213.5 * c, 276.546875 * c, 205.5 * c, 278.546875 * c, 190.5 * c, 281.546875 * c);
    d.bezierCurveTo(181.5 * c, 262.546875 * c, 173.5 * c, 259.546875 * c, 165.5 * c, 258.546875 * c);
    d.bezierCurveTo(169.5 * c, 239.546875 * c, 167.5 * c, 233.546875 * c, 157.5 * c, 225.546875 * c);
    d.bezierCurveTo(169.5 * c, 208.546875 * c, 170.5 * c, 203.546875 * c, 168.5 * c, 192.546875 * c);
    d.bezierCurveTo(181.5 * c, 187.546875 * c, 188.5 * c, 179.546875 * c, 192.5 * c, 168.546875 * c);
    d.bezierCurveTo(216.5 * c, 170.546875 * c, 218.5 * c, 163.546875 * c, 225.5 * c, 160.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(205.5 * c, 194.546875 * c);
    d.bezierCurveTo(216.5 * c, 192.546875 * c, 219.5 * c, 191.546875 * c, 225.5 * c, 185.546875 * c);
    d.bezierCurveTo(232.5 * c, 193.546875 * c, 237.5 * c, 191.546875 * c, 246.5 * c, 192.546875 * c);
    d.bezierCurveTo(249.5 * c, 202.546875 * c, 253.5 * c, 205.546875 * c, 258.5 * c, 207.546875 * c);
    d.bezierCurveTo(259.5 * c, 222.546875 * c, 256.5 * c, 223.546875 * c, 265.5 * c, 226.546875 * c);
    d.bezierCurveTo(256.5 * c, 231.546875 * c, 255.5 * c, 241.546875 * c, 259.5 * c, 248.546875 * c);
    d.bezierCurveTo(250.5 * c, 245.546875 * c, 245.5 * c, 252.546875 * c, 243.5 * c, 260.546875 * c);
    d.bezierCurveTo(234.5 * c, 256.546875 * c, 229.5 * c, 258.546875 * c, 223.5 * c, 265.546875 * c);
    d.bezierCurveTo(218.5 * c, 255.546875 * c, 213.5 * c, 257.546875 * c, 204.5 * c, 261.546875 * c);
    d.bezierCurveTo(203.5 * c, 251.546875 * c, 198.5 * c, 248.546875 * c, 189.5 * c, 244.546875 * c);
    d.bezierCurveTo(194.5 * c, 237.546875 * c, 192.5 * c, 231.546875 * c, 184.5 * c, 225.546875 * c);
    d.bezierCurveTo(191.5 * c, 211.546875 * c, 192.5 * c, 209.546875 * c, 190.5 * c, 204.546875 * c);
    d.bezierCurveTo(200.5 * c, 204.546875 * c, 204.5 * c, 198.546875 * c, 207.5 * c, 194.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(149.5 * c, 93.546875 * c);
    d.bezierCurveTo(287.5 * c, 332.546875 * c, 226 * c, 225.546875 * c, 302.5 * c, 357.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(224.5 * c, 66.546875 * c);
    d.bezierCurveTo(224.5 * c, 223.546875 * c, 224.5 * c, 223.546875 * c, 224.5 * c, 380.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(302.5 * c, 88.546875 * c);
    d.bezierCurveTo(222.5 * c, 227.546875 * c, 222.5 * c, 227.546875 * c, 142.5 * c, 366.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(361.5 * c, 147.546875 * c);
    d.bezierCurveTo(223 * c, 226.546875 * c, 223 * c, 226.546875 * c, 84.5 * c, 305.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(379.5 * c, 225.546875 * c);
    d.bezierCurveTo(221 * c, 225.546875 * c, 221 * c, 225.546875 * c, 62.5 * c, 225.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(90.5 * c, 147.546875 * c);
    d.bezierCurveTo(226.5 * c, 226.546875 * c, 226.5 * c, 226.546875 * c, 362.5 * c, 305.546875 * c);
    d.closePath();
    fill_path(d, void 0, g[0], 4);
    return f
}
function create_cord(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 75 * c;
    g.height = 55 * c;
    d.translate(-30 * c, -40 * c);
    d.globalAlpha = 1;
    d.beginPath();
    d.bezierCurveTo(67 * c, 56 * c, 72 * c, 71 * c, 72 * c, 71 * c);
    d.bezierCurveTo(72 * c, 71 * c, 84 * c, 70 * c, 75 * c, 82 * c);
    d.bezierCurveTo(70 * c, 88 * c, 61 * c, 89 * c, 58 * c, 89 * c);
    d.bezierCurveTo(55 * c, 89 * c, 40 * c, 89 * c, 46 * c, 77 * c);
    d.bezierCurveTo(46 * c, 77 * c, 43 * c, 63 * c, 43 * c, 63 * c);
    d.bezierCurveTo(35 * c, 61 * c, 35 * c, 53 * c, 42 * c, 47 * c);
    d.bezierCurveTo(48 * c, 42 * c, 62 * c, 41 * c, 66 * c, 43 * c);
    d.bezierCurveTo(70 * c, 45 * c, 72 * c, 48 * c, 67 * c, 56 * c);
    d.closePath();
    fill_path(d, f[0]);
    d.beginPath();
    d.bezierCurveTo(68 * c, 61 * c, 72 * c, 76 * c, 72 * c, 76 * c);
    d.bezierCurveTo(65 * c, 85 * c, 61 * c, 85 * c, 49 * c, 83 * c);
    d.bezierCurveTo(49 * c, 83 * c, 44 * c, 63 * c, 44 * c, 63 * c);
    d.bezierCurveTo(54 * c, 63 * c, 60 * c, 63 * c, 67 * c, 55 * c);
    d.closePath();
    fill_path(d, f[1]);
    d.beginPath();
    d.moveTo(69 * c, 65 * c);
    d.bezierCurveTo(70 * c, 61 * c, 81 * c, 66 * c, 86 * c, 66 * c);
    d.bezierCurveTo(90 * c, 66 * c, 97 * c, 63 * c, 97 * c, 56 * c);
    d.bezierCurveTo(97 * c, 50 * c, 93 * c, 47 * c, 88 * c, 44 * c);
    fill_path(d, !1, f[1], 2);
    d.beginPath();
    d.moveTo(50 * c, 48 * c);
    d.bezierCurveTo(43 * c, 52 * c, 50 * c, 54 * c, 51 * c, 54 * c);
    d.bezierCurveTo(54 * c, 54 * c, 59 * c, 52 * c, 59 * c, 49 * c);
    d.bezierCurveTo(59 * c, 48 * c, 55 * c, 46 * c, 50 * c, 48 * c);
    fill_path(d, f[2]);
    return g
}
function create_bandage(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 195 * c
      , m = 190 * c;
    g.width = e;
    g.height = m;
    var n = 10 * c
      , p = 35 * c
      , q = 150 * c
      , t = p / 2
      , r = q / 2
      , u = 4 * c;
    d.translate(e / 2 - 5 * c, m / 2 - 5 * c);
    d.rotate(-Math.PI / 1.25);
    d.globalAlpha = 1;
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], u);
    d.translate(0, 0);
    d.rotate(Math.PI / 3);
    d.globalAlpha = 1;
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], u);
    d.translate(0, 5);
    round_rect(d, -t / 2, -r / 2, p / 2, q / 3, n - 2);
    fill_path(d, f[1]);
    return g
}
function create_craft_button(c, g, f, d, e) {
    var m = document.createElement("canvas")
      , n = m.getContext("2d")
      , p = 70 * c
      , q = 70 * c
      , t = 10 * c
      , r = 5 * c;
    m.width = p;
    m.height = q + r;
    for (var u = 0; u < g.length; u++) {
        var v = g[u];
        n.globalAlpha = v.a;
        var z = v.f(f, !1, v.c);
        n.save();
        n.translate(p / 2 + v.x * c, q / 2 + v.y * c);
        n.rotate(v.r);
        n.drawImage(z, -z.width / 2, -z.height / 2);
        n.restore()
    }
    c = [];
    for (u = 0; u < d.length; u++)
        g = document.createElement("canvas"),
        f = g.getContext("2d"),
        g.width = p,
        g.height = q + r,
        f.globalAlpha = e / 2,
        2 == u ? round_rect(f, 0, r, p, q, t) : round_rect(f, 0, 0, p, q + r, t),
        fill_path(f, "#081a19"),
        f.globalAlpha = e,
        2 == u ? round_rect(f, 0, r, p, q, t) : round_rect(f, 0, 0, p, q, t),
        fill_path(f, d[u]),
        f.globalAlpha = 1,
        2 == u ? f.drawImage(m, 0, r) : f.drawImage(m, 0, 0),
        c.push(CTI(g));
    return c
}
function create_big_fire_wood(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 140 * c
      , m = 90 * c;
    g.width = 193 * c;
    g.height = 198 * c;
    var n = 10 * c
      , p = 25 * c
      , q = 180 * c
      , t = p / 2
      , r = q / 2
      , u = 4 * c;
    d.translate(-25 * c, 1 * c);
    d.translate(e, m);
    d.rotate(-Math.PI / 5);
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], u);
    d.translate(-30 * c, -25 * c);
    d.rotate(Math.PI / 3);
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], u);
    d.translate(35 * c, 30 * c);
    d.rotate(Math.PI / 3);
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], u);
    return g
}
function create_fire(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 145 * c
      , m = 145 * c;
    g.width = e;
    g.height = m;
    var n = 70 * c;
    d.translate(e / 2, m / 2);
    d.globalAlpha = .4;
    circle(d, 0, 0, n);
    fill_path(d, f[0]);
    n = 50 * c;
    d.translate(0, 0);
    d.globalAlpha = .8;
    circle(d, 0, 0, n);
    fill_path(d, f[0]);
    n = 35 * c;
    d.translate(0, 0);
    d.globalAlpha = .8;
    circle(d, 0, 0, n);
    fill_path(d, f[1]);
    n = 20 * c;
    d.translate(0, 0);
    d.globalAlpha = .8;
    circle(d, 0, 0, n);
    fill_path(d, f[2]);
    return g
}
function create_wood_fire(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 135 * c
      , m = 190 * c;
    g.width = e;
    g.height = m;
    var n = 10 * c
      , p = 25 * c
      , q = 180 * c
      , t = p / 2
      , r = q / 2;
    c *= 4;
    d.translate(e / 2, m / 2);
    d.rotate(-Math.PI / 5);
    d.globalAlpha = 1;
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], c);
    d.translate(0, 0);
    d.rotate(Math.PI / 5);
    d.globalAlpha = 1;
    round_rect(d, -t, -r, p, q, n);
    fill_path(d, f[0], f[1], c);
    return g
}
function create_ground_fire(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 205 * c
      , m = 205 * c;
    g.width = e;
    g.height = m;
    c *= 100;
    d.translate(e / 2, m / 2);
    d.globalAlpha = 1;
    circle(d, 0, 0, c);
    fill_path(d, f[0]);
    return g
}
function create_halo_fire(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 370 * c
      , m = 370 * c;
    g.width = e;
    g.height = m;
    d.globalAlpha = .2;
    circle(d, e / 2, m / 2, 180 * c);
    fill_path(d, f[0]);
    return g
}
function create_hand(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 220 * c
      , m = 220 * c
      , n = 16 * c
      , p = 4 * c;
    f.width = e;
    f.height = m;
    d.translate(e / 2, m / 2);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, g[0], g[1], p);
    return f
}
function create_hand_shadow(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = 220 * c
      , m = 220 * c
      , n = 16 * c;
    f.width = e;
    f.height = m;
    d.translate(e / 2, m / 2);
    d.globalAlpha = .5;
    circle(d, 0, 0, n);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    return f
}
function create_apricot_tree(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 210 * c
      , n = 205 * c
      , p = 30 * c
      , q = 20 * c
      , t = 200 * c
      , r = 180 * c
      , u = t / 2
      , v = r / 2;
    d.width = m;
    d.height = n;
    e.translate(m / 2, n / 2 - 8 * c);
    e.globalAlpha = .5;
    round_rect(e, -u, -v, t, r + q, p);
    fill_path(e, g[0]);
    f && e.rotate(Math.PI);
    e.globalAlpha = 1;
    round_rect(e, -u, -v, t, r, p);
    fill_path(e, g[1], g[2], 4);
    e.globalAlpha = 1;
    round_rect(e, -u + 35 * c, -v + 20 * c, t - 50 * c, r - 50 * c, p - 10 * c);
    fill_path(e, g[3]);
    return d
}
function create_tree_branch(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 450 * c
      , n = 145 * c
      , p = m / 2
      , q = n / 2
      , t = 10 * c
      , r = 300 * c
      , u = 30 * c
      , v = r / 2
      , z = u / 2;
    f ? (d.width = 145 * c,
    d.height = 450 * c,
    e.rotate(Math.PI / 2),
    e.save(),
    e.globalAlpha = .5,
    round_rect(e, 100 * c, -110 * c, r, u, t),
    fill_path(e, g[0]),
    e.translate(178 * c, -98 * c),
    round_rect(e, -v, -z - 6 * c, 100 * c, 100 * c, t),
    fill_path(e, g[0]),
    e.translate(-50 * c, 5 * c),
    round_rect(e, 220 * c, -15 * c, 90 * c, 90 * c, t),
    fill_path(e, g[0]),
    e.restore(),
    e.save(),
    e.globalAlpha = 1,
    e.translate(250 * c, -63 * c),
    round_rect(e, -v - 20 * c, -z, r, u, t),
    fill_path(e, g[1], g[2], 4),
    e.translate(-70 * c, -40 * c),
    round_rect(e, -v - 20 * c, -z, 100 * c, 100 * c, t),
    fill_path(e, g[3], g[4], 4),
    e.translate(-70 * c, 15 * c),
    round_rect(e, 220 * c, -22 * c, 90 * c, 90 * c, t),
    fill_path(e, g[3], g[4], 4),
    round_rect(e, 230 * c, -12 * c, 55 * c, 55 * c, t),
    fill_path(e, g[5]),
    e.translate(-70 * c, 0),
    round_rect(e, -15 * c, -2 * c, 60 * c, 60 * c, t)) : (d.width = m,
    d.height = n,
    e.save(),
    e.globalAlpha = .5,
    e.translate(p, q + 10 * c),
    round_rect(e, -v, -z, r, u, t),
    fill_path(e, g[0]),
    e.translate(-65 * c, -25 * c),
    round_rect(e, -v, -z - 6 * c, 100 * c, 100 * c, 15 * c),
    fill_path(e, g[0]),
    e.translate(-35 * c, -5 * c),
    round_rect(e, 220 * c, -15 * c, 90 * c, 90 * c, 15 * c),
    fill_path(e, g[0]),
    e.restore(),
    e.save(),
    e.globalAlpha = 1,
    e.translate(240 * c, 70 * c),
    round_rect(e, -v, -z, r, u, t),
    fill_path(e, g[1], g[2], 4),
    e.translate(-60 * c, -40 * c),
    round_rect(e, -v - 20 * c, -z, 100 * c, 100 * c, 15 * c),
    fill_path(e, g[3], g[4], 4),
    e.translate(-55 * c, 10 * c),
    round_rect(e, 220 * c, -22 * c, 90 * c, 90 * c, 15 * c),
    fill_path(e, g[3], g[4], 4),
    round_rect(e, 240 * c, -12 * c, 55 * c, 55 * c, 12 * c),
    fill_path(e, g[5]),
    e.translate(45 * c, 0 * c),
    round_rect(e, -145 * c, -2 * c, 60 * c, 60 * c, 12 * c));
    fill_path(e, g[5]);
    e.restore();
    return d
}
function create_apricot_forest(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = Math.max(g.width, c.width)
      , m = Math.max(g.height, c.height);
    f.width = e;
    f.height = m;
    d.drawImage(c, (e - c.width) / 2, (m - c.height) / 2);
    d.drawImage(g, (e - g.width) / 2, (m - g.height) / 2);
    return f
}
function create_pickaxe(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 105 * c
      , n = 125 * c
      , p = 4 * c
      , q = 10 * c
      , t = 5 * c
      , r = 10 * c
      , u = 110 * c
      , v = r / 2
      , z = u / 2;
    d.width = m;
    d.height = n;
    e.save();
    e.globalAlpha = g ? .5 : 1;
    e.translate(m / 2 + 8, n / 2 + t);
    round_rect(e, -v, -z, r, u, q);
    g ? fill_path(e, f[0]) : fill_path(e, f[1]);
    e.translate(-130 * c + t, -128 * c + t);
    e.beginPath();
    e.bezierCurveTo(159 * c, 93 * c, 156 * c, 99 * c, 154 * c, 102 * c);
    e.bezierCurveTo(128 * c, 92 * c, 90 * c, 93 * c, 72 * c, 96 * c);
    e.bezierCurveTo(68 * c, 84 * c, 143 * c, 73 * c, 162 * c, 86 * c);
    e.closePath();
    fill_path(e, f[2]);
    e.restore();
    e.translate(m / 2 + 8, n / 2);
    e.globalAlpha = 1;
    round_rect(e, -v, -z, r, u, q);
    fill_path(e, f[3], f[4], p);
    e.translate(-130 * c, -125 * c);
    e.beginPath();
    e.bezierCurveTo(159 * c, 93 * c, 156 * c, 99 * c, 154 * c, 102 * c);
    e.bezierCurveTo(128 * c, 92 * c, 90 * c, 93 * c, 72 * c, 96 * c);
    e.bezierCurveTo(68 * c, 84 * c, 143 * c, 73 * c, 162 * c, 86 * c);
    e.closePath();
    fill_path(e, f[5], f[6], p);
    return d
}
function create_sword(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 5 * c
      , n = 4 * c
      , p = 5 * c
      , q = 10 * c
      , t = 30 * c
      , r = q / 2
      , u = t / 2;
    d.width = 38 * c;
    d.height = 135 * c;
    e.save();
    e.translate(-105 * c, -30 * c + m);
    e.globalAlpha = g ? .5 : 1;
    e.beginPath();
    e.bezierCurveTo(121 * c, 56 * c, 124 * c, 65 * c, 128 * c, 77 * c);
    e.bezierCurveTo(126 * c, 94 * c, 124 * c, 119 * c, 124 * c, 133 * c);
    e.bezierCurveTo(122 * c, 133 * c, 115 * c, 134 * c, 114 * c, 133 * c);
    e.bezierCurveTo(113 * c, 118 * c, 110 * c, 94 * c, 109 * c, 77 * c);
    e.bezierCurveTo(111 * c, 69 * c, 116 * c, 56 * c, 118 * c, 49 * c);
    e.closePath();
    fill_path(e, f[0]);
    e.restore();
    e.save();
    e.translate(19 * c, 109 * c + m);
    round_rect(e, -r, -u, q, t, p);
    fill_path(e, f[0]);
    e.restore();
    e.save();
    e.translate(10 * c, 115 * c + m);
    round_rect(e, -r, -u, t, q, p);
    fill_path(e, f[0]);
    e.restore();
    e.save();
    e.translate(19 * c, 106 * c);
    e.globalAlpha = 1;
    round_rect(e, -r, -u, q, t, p);
    fill_path(e, f[1], f[2], n);
    e.restore();
    e.save();
    e.translate(10 * c, 112 * c);
    round_rect(e, -r, -u, t, q, p);
    fill_path(e, f[1], f[2], n);
    e.restore();
    e.save();
    e.translate(-100 * c, -40 * c);
    e.beginPath();
    e.bezierCurveTo(121 * c, 56 * c, 124 * c, 65 * c, 128 * c, 77 * c);
    e.bezierCurveTo(126 * c, 94 * c, 124 * c, 119 * c, 124 * c, 133 * c);
    e.bezierCurveTo(122 * c, 133 * c, 115 * c, 134 * c, 114 * c, 133 * c);
    e.bezierCurveTo(113 * c, 118 * c, 110 * c, 94 * c, 109 * c, 77 * c);
    e.bezierCurveTo(111 * c, 69 * c, 116 * c, 56 * c, 118 * c, 49 * c);
    e.closePath();
    fill_path(e, f[3], f[4], n);
    e.restore();
    return d
}
function create_seed(c) {
    var g = document.createElement("canvas")
      , f = g.getContext("2d")
      , d = 4 * c
      , e = 5 * c;
    g.width = 70 * c;
    g.height = 90 * c;
    f.save();
    f.translate(-80 * c, -70 * c + e);
    f.globalAlpha = .5;
    f.beginPath();
    f.bezierCurveTo(130 * c, 79 * c, 132 * c, 86 * c, 130 * c, 93 * c);
    f.bezierCurveTo(128 * c, 100 * c, 121 * c, 107 * c, 120 * c, 107 * c);
    f.bezierCurveTo(120 * c, 107 * c, 115 * c, 98 * c, 115 * c, 92 * c);
    f.bezierCurveTo(115 * c, 86 * c, 119 * c, 76 * c, 127 * c, 73 * c);
    f.closePath();
    fill_path(f, "#0d1b1c");
    f.restore();
    f.save();
    f.translate(-80 * c, -70 * c + e);
    f.globalAlpha = .5;
    f.beginPath();
    f.bezierCurveTo(112 * c, 109 * c, 111 * c, 100 * c, 106 * c, 93 * c);
    f.bezierCurveTo(104 * c, 90 * c, 91 * c, 87 * c, 91 * c, 87 * c);
    f.bezierCurveTo(91 * c, 88 * c, 91 * c, 96 * c, 94 * c, 102 * c);
    f.bezierCurveTo(97 * c, 108 * c, 106 * c, 112 * c, 113 * c, 112 * c);
    f.closePath();
    fill_path(f, "#0d1b1c");
    f.restore();
    f.save();
    f.translate(-80 * c, -70 * c + e);
    f.globalAlpha = .5;
    f.beginPath();
    f.bezierCurveTo(108 * c, 120 * c, 100 * c, 119 * c, 91 * c, 127 * c);
    f.bezierCurveTo(83 * c, 134 * c, 82 * c, 146 * c, 83 * c, 146 * c);
    f.bezierCurveTo(84 * c, 146 * c, 98 * c, 142 * c, 103 * c, 138 * c);
    f.bezierCurveTo(107 * c, 135 * c, 110 * c, 130 * c, 112 * c, 121 * c);
    f.closePath();
    fill_path(f, "#0d1b1c");
    f.restore();
    f.save();
    f.translate(3 * c, -93 * c + e);
    f.rotate(Math.PI / 5);
    f.globalAlpha = .5;
    f.beginPath();
    f.bezierCurveTo(130 * c, 79 * c, 132 * c, 86 * c, 130 * c, 93 * c);
    f.bezierCurveTo(128 * c, 100 * c, 121 * c, 107 * c, 120 * c, 107 * c);
    f.bezierCurveTo(120 * c, 107 * c, 115 * c, 98 * c, 115 * c, 92 * c);
    f.bezierCurveTo(115 * c, 86 * c, 119 * c, 76 * c, 127 * c, 73 * c);
    f.closePath();
    fill_path(f, "#0d1b1c");
    f.restore();
    f.save();
    f.translate(-80 * c, -70 * c);
    f.globalAlpha = 1;
    f.beginPath();
    f.bezierCurveTo(130 * c, 79 * c, 132 * c, 86 * c, 130 * c, 93 * c);
    f.bezierCurveTo(128 * c, 100 * c, 121 * c, 107 * c, 120 * c, 107 * c);
    f.bezierCurveTo(120 * c, 107 * c, 115 * c, 98 * c, 115 * c, 92 * c);
    f.bezierCurveTo(115 * c, 86 * c, 119 * c, 76 * c, 127 * c, 73 * c);
    f.closePath();
    fill_path(f, "#493d36", "#332b28", d);
    f.restore();
    f.save();
    f.translate(-80 * c, -70 * c);
    f.globalAlpha = 1;
    f.beginPath();
    f.bezierCurveTo(112 * c, 109 * c, 111 * c, 100 * c, 106 * c, 93 * c);
    f.bezierCurveTo(104 * c, 90 * c, 91 * c, 87 * c, 91 * c, 87 * c);
    f.bezierCurveTo(91 * c, 88 * c, 91 * c, 96 * c, 94 * c, 102 * c);
    f.bezierCurveTo(97 * c, 108 * c, 106 * c, 112 * c, 113 * c, 112 * c);
    f.closePath();
    fill_path(f, "#493d36", "#332b28", d);
    f.restore();
    f.save();
    f.translate(-80 * c, -70 * c);
    f.globalAlpha = 1;
    f.beginPath();
    f.bezierCurveTo(108 * c, 120 * c, 100 * c, 119 * c, 91 * c, 127 * c);
    f.bezierCurveTo(83 * c, 134 * c, 82 * c, 146 * c, 83 * c, 146 * c);
    f.bezierCurveTo(84 * c, 146 * c, 98 * c, 142 * c, 103 * c, 138 * c);
    f.bezierCurveTo(107 * c, 135 * c, 110 * c, 130 * c, 112 * c, 121 * c);
    f.closePath();
    fill_path(f, "#493d36", "#332b28", d);
    f.restore();
    f.save();
    f.translate(3 * c, -93 * c);
    f.rotate(Math.PI / 5);
    f.globalAlpha = 1;
    f.beginPath();
    f.bezierCurveTo(130 * c, 79 * c, 132 * c, 86 * c, 130 * c, 93 * c);
    f.bezierCurveTo(128 * c, 100 * c, 121 * c, 107 * c, 120 * c, 107 * c);
    f.bezierCurveTo(120 * c, 107 * c, 115 * c, 98 * c, 115 * c, 92 * c);
    f.bezierCurveTo(115 * c, 86 * c, 119 * c, 76 * c, 127 * c, 73 * c);
    f.closePath();
    fill_path(f, "#493d36", "#332b28", d);
    f.restore();
    return g
}
function create_text(c, g, f, d, e, m, n, p, q) {
    var t = document.createElement("canvas")
      , r = t.getContext("2d");
    m = m ? m * c : 0;
    var u = Math.floor(c * f);
    r.font = u + "px Baloo Paaji";
    p *= c;
    var v = n ? 2 * p : 0;
    q = q ? Math.min(r.measureText(g).width + 2 * c + v, q) : r.measureText(g).width + 2 * c + v;
    u = (u + m) * c + v;
    t.width = q;
    t.height = u;
    n && (r.fillStyle = n,
    round_rect(r, 0, 0, q, u, 2 * p),
    r.fill(),
    r.translate(p, p));
    r.textBaseline = "middle";
    r.font = f + "px Baloo Paaji";
    e && (r.beginPath(),
    r.fillStyle = e,
    r.fillText(g, 0, u / 2 + m - v / 2, q));
    r.beginPath();
    r.fillStyle = d;
    r.fillText(g, 0, (u - v) / 2, q);
    return t
}
function create_stone(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 220 * c
      , m = 220 * c
      , n = 100 * c
      , p = n / 4;
    c *= 20;
    g.width = e;
    g.height = m;
    d.translate(e / 2, m / 2 + c);
    d.globalAlpha = .5;
    round_regular_polygon(d, 7, n, p);
    fill_path(d, f[0]);
    d.globalAlpha = 1;
    d.translate(0, -c);
    round_regular_polygon(d, 7, n, p);
    fill_path(d, f[1]);
    round_regular_polygon(d, 6, .65 * n, .65 * p);
    fill_path(d, f[2]);
    return g
}
function create_gold(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 120 * c
      , m = 150 * c
      , n = 60 * c
      , p = n / 4
      , q = 15 * c;
    g.width = e;
    g.height = m;
    d.save();
    d.translate(e / 2 + 0 * c, m / 2 + 0 * c + q);
    d.rotate(Math.PI / 3);
    d.globalAlpha = .5;
    round_regular_polygon(d, 8, n, p);
    fill_path(d, f[0]);
    d.restore();
    d.save();
    d.translate(e / 2 - 11 * c, m / 2 + 12 * c);
    d.globalAlpha = 1;
    d.rotate(Math.PI / 3);
    d.translate(0, -q);
    round_regular_polygon(d, 8, n, p);
    fill_path(d, f[1]);
    d.restore();
    d.save();
    d.translate(e / 2 - 9 * c, m / 2 - 12 * c);
    d.rotate(Math.PI / 2.8);
    round_regular_polygon(d, 5, .5 * n, .4 * p);
    fill_path(d, f[2]);
    d.restore();
    d.save();
    d.translate(e / 2 + 19 * c, m / 2 + 5 * c);
    d.rotate(Math.PI / 1);
    round_regular_polygon(d, 5, .5 * n, .4 * p);
    fill_path(d, f[2]);
    d.restore();
    d.save();
    d.translate(e / 2 - 8 * c, m / 2 + 20 * c);
    d.rotate(Math.PI / 2.25);
    round_regular_polygon(d, 5, .5 * n, .4 * p);
    fill_path(d, f[2]);
    d.restore();
    return g
}
function create_diamond(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d")
      , e = 180 * c
      , m = 210 * c
      , n = 60 * c
      , p = n / 4
      , q = 20 * c;
    g.width = e;
    g.height = m;
    d.save();
    d.translate(e / 2 - 0 * c, m / 2 - 35 * c + q);
    d.rotate(Math.PI / -1.8);
    d.globalAlpha = .5;
    d.translate(0 * c, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[0]);
    d.restore();
    d.save();
    d.translate(e / 2 + 10 * c, m / 2 + 15 * c + q);
    d.rotate(Math.PI / 2);
    d.globalAlpha = .5;
    d.translate(0 * c, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[0]);
    d.restore();
    d.save();
    d.translate(e / 2 - 50 * c, m / 2 + 40 * c + q);
    d.rotate(Math.PI / 3);
    d.globalAlpha = .5;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[0]);
    d.restore();
    d.save();
    d.translate(e / 2 - 0 * c, m / 2 - 35 * c);
    d.rotate(Math.PI / -1.8);
    d.globalAlpha = 1;
    d.translate(0 * c, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[1]);
    d.restore();
    d.save();
    d.translate(e / 2 + 10 * c, m / 2 + 15 * c);
    d.rotate(Math.PI / 2);
    d.globalAlpha = 1;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[1]);
    d.restore();
    d.save();
    d.translate(e / 2 - 50 * c, m / 2 + 40 * c);
    d.rotate(Math.PI / 3);
    d.globalAlpha = 1;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[1]);
    d.restore();
    n = 30 * c;
    p = n / 4;
    d.save();
    d.translate(e / 2 + 5 * c, m / 2 - 20 * c);
    d.rotate(Math.PI / -1.8);
    d.globalAlpha = 1;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[2]);
    d.restore();
    d.save();
    d.translate(e / 2 + 0 * c, m / 2 + 10 * c);
    d.rotate(Math.PI / 2);
    d.globalAlpha = 1;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[2]);
    d.restore();
    d.save();
    d.translate(e / 2 - 45 * c, m / 2 + 35 * c);
    d.rotate(Math.PI / 3);
    d.globalAlpha = 1;
    d.translate(0, -20 * c);
    round_regular_polygon(d, 5, n, p);
    fill_path(d, f[2]);
    d.restore();
    circle(d, e / 2 - 7 * c, m / 2 + 7 * c, 5);
    fill_path(d, f[2]);
    return g
}
function create_plant(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 10 * c
      , n = 4 * c;
    d.width = 140 * c;
    d.height = 150 * c;
    e.translate(-50 * c, -38 * c + m);
    e.globalAlpha = g ? .5 : 1;
    e.beginPath();
    e.bezierCurveTo(160 * c, 65 * c, 160 * c, 85 * c, 152 * c, 95 * c);
    e.bezierCurveTo(152 * c, 95 * c, 173 * c, 94 * c, 187 * c, 102 * c);
    e.bezierCurveTo(187 * c, 102 * c, 180 * c, 120 * c, 155 * c, 126 * c);
    e.bezierCurveTo(154 * c, 126 * c, 166 * c, 138 * c, 169 * c, 148 * c);
    e.bezierCurveTo(169 * c, 148 * c, 148 * c, 152 * c, 133 * c, 140 * c);
    e.bezierCurveTo(133 * c, 140 * c, 134 * c, 160 * c, 122 * c, 175 * c);
    e.bezierCurveTo(122 * c, 175 * c, 107 * c, 162 * c, 107 * c, 144 * c);
    e.bezierCurveTo(107 * c, 144 * c, 98 * c, 164 * c, 73 * c, 167 * c);
    e.bezierCurveTo(73 * c, 167 * c, 72 * c, 134 * c, 90 * c, 127 * c);
    e.bezierCurveTo(90 * c, 127 * c, 70 * c, 134 * c, 55 * c, 123 * c);
    e.bezierCurveTo(55 * c, 123 * c, 58 * c, 115 * c, 75 * c, 104 * c);
    e.bezierCurveTo(75 * c, 104 * c, 66 * c, 96 * c, 61 * c, 77 * c);
    e.bezierCurveTo(61 * c, 77 * c, 83 * c, 74 * c, 102 * c, 89 * c);
    e.bezierCurveTo(102 * c, 89 * c, 92 * c, 66 * c, 110 * c, 41 * c);
    e.bezierCurveTo(111 * c, 40 * c, 130 * c, 54 * c, 130 * c, 82 * c);
    e.bezierCurveTo(130 * c, 82 * c, 143 * c, 67 * c, 159 * c, 65 * c);
    e.closePath();
    fill_path(e, f[0]);
    e.translate(0, 0 - m);
    e.globalAlpha = 1;
    e.beginPath();
    e.bezierCurveTo(160 * c, 65 * c, 160 * c, 85 * c, 152 * c, 95 * c);
    e.bezierCurveTo(152 * c, 95 * c, 173 * c, 94 * c, 187 * c, 102 * c);
    e.bezierCurveTo(187 * c, 102 * c, 180 * c, 120 * c, 155 * c, 126 * c);
    e.bezierCurveTo(154 * c, 126 * c, 166 * c, 138 * c, 169 * c, 148 * c);
    e.bezierCurveTo(169 * c, 148 * c, 148 * c, 152 * c, 133 * c, 140 * c);
    e.bezierCurveTo(133 * c, 140 * c, 134 * c, 160 * c, 122 * c, 175 * c);
    e.bezierCurveTo(122 * c, 175 * c, 107 * c, 162 * c, 107 * c, 144 * c);
    e.bezierCurveTo(107 * c, 144 * c, 98 * c, 164 * c, 73 * c, 167 * c);
    e.bezierCurveTo(73 * c, 167 * c, 72 * c, 134 * c, 90 * c, 127 * c);
    e.bezierCurveTo(90 * c, 127 * c, 70 * c, 134 * c, 55 * c, 123 * c);
    e.bezierCurveTo(55 * c, 123 * c, 58 * c, 115 * c, 75 * c, 104 * c);
    e.bezierCurveTo(75 * c, 104 * c, 66 * c, 96 * c, 61 * c, 77 * c);
    e.bezierCurveTo(61 * c, 77 * c, 83 * c, 74 * c, 102 * c, 89 * c);
    e.bezierCurveTo(102 * c, 89 * c, 92 * c, 66 * c, 110 * c, 41 * c);
    e.bezierCurveTo(111 * c, 40 * c, 130 * c, 54 * c, 130 * c, 82 * c);
    e.bezierCurveTo(130 * c, 82 * c, 143 * c, 67 * c, 159 * c, 65 * c);
    e.closePath();
    fill_path(e, f[1], f[2], n);
    return d
}
function create_fruit(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 18 * c;
    g.height = 18 * c;
    var e = 9 * c
      , m = 9 * c
      , n = 8 * c;
    d.save();
    d.translate(e, m);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, f[0]);
    n = 3 * c;
    d.translate(0, -3 * c);
    d.globalAlpha = 1;
    circle(d, 0, 0, n);
    fill_path(d, f[1]);
    d.restore();
    return g
}
function create_herb(c, g, f, d) {
    g = document.createElement("canvas");
    var e = g.getContext("2d");
    0 == d ? (g.width = 270 * c,
    g.height = 250 * c,
    e.beginPath(),
    e.moveTo(140 * c, 3 * c),
    e.translate(-25 * c, -20 * c),
    e.bezierCurveTo(218 * c, 31 * c, 251 * c, 61 * c, 265 * c, 85 * c),
    e.bezierCurveTo(278 * c, 108 * c, 295 * c, 160 * c, 285 * c, 195 * c),
    e.bezierCurveTo(271 * c, 242 * c, 213 * c, 268 * c, 188 * c, 266 * c),
    e.bezierCurveTo(139 * c, 262 * c, 70 * c, 244 * c, 47 * c, 204 * c),
    e.bezierCurveTo(20 * c, 158 * c, 35 * c, 78 * c, 59 * c, 56 * c),
    e.bezierCurveTo(90 * c, 28 * c, 124 * c, 23 * c, 140 * c, 23 * c),
    e.closePath(),
    fill_path(e, f[0])) : 1 == d ? (g.width = 430 * c,
    g.height = 350 * c,
    e.beginPath(),
    e.moveTo(180 * c, 5 * c),
    e.translate(-30 * c, -60 * c),
    e.bezierCurveTo(283 * c, 60 * c, 265 * c, 163 * c, 335 * c, 206 * c),
    e.bezierCurveTo(376 * c, 231 * c, 492 * c, 299 * c, 434 * c, 357 * c),
    e.bezierCurveTo(371 * c, 421 * c, 289 * c, 394 * c, 255 * c, 386 * c),
    e.bezierCurveTo(218 * c, 377 * c, 91 * c, 359 * c, 50 * c, 272 * c),
    e.bezierCurveTo(12 * c, 192 * c, 107 * c, 75 * c, 178 * c, 69 * c),
    e.closePath(),
    fill_path(e, f[0])) : 2 == d && (g.width = 400 * c,
    g.height = 300 * c,
    e.beginPath(),
    e.moveTo(80 * c, 52 * c),
    e.translate(-40 * c, -30 * c),
    e.bezierCurveTo(124 * c, 77 * c, 241 * c, 22 * c, 311 * c, 65 * c),
    e.bezierCurveTo(352 * c, 90 * c, 404 * c, 176 * c, 346 * c, 234 * c),
    e.bezierCurveTo(283 * c, 298 * c, 179 * c, 299 * c, 145 * c, 291 * c),
    e.bezierCurveTo(108 * c, 282 * c, 100 * c, 239 * c, 63 * c, 205 * c),
    e.bezierCurveTo(37 * c, 181 * c, 45 * c, 131 * c, 80 * c, 107 * c),
    e.closePath(),
    fill_path(e, f[0]));
    return g
}
function create_wall(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 130 * c
      , n = 142 * c;
    d.width = m;
    d.height = n;
    e.translate(m / 2, n / 2 + 7 * c);
    e.globalAlpha = g ? .5 : 1;
    circle(e, 0, 0, 60 * c);
    fill_path(e, f[0]);
    e.translate(0, -7 * c);
    e.globalAlpha = 1;
    circle(e, 0, 0, 60 * c, 0);
    fill_path(e, f[1], f[2], 4 * c);
    circle(e, 0, 0, 40 * c);
    fill_path(e, f[3]);
    circle(e, 0, 0, 25 * c);
    fill_path(e, f[4], f[5], 8 * c);
    return d
}
function create_wall_diamond(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 130 * c;
    g.height = 142 * c;
    d.save();
    d.translate(65 * c, 80 * c);
    d.rotate(.2);
    round_regular_polygon(d, 9, 60 * c, 10 * c);
    d.restore();
    fill_path(d, f[0]);
    d.save();
    d.translate(65 * c, 71 * c);
    d.rotate(.2);
    round_regular_polygon(d, 9, 60 * c, 10 * c);
    fill_path(d, f[1], f[2], 4);
    d.rotate(-.32);
    round_regular_polygon(d, 9, 38 * c, 10 * c);
    fill_path(d, f[3], f[4], 4);
    d.rotate(.68);
    round_regular_polygon(d, 9, 20 * c, 8 * c);
    fill_path(d, f[5], f[6], 6);
    d.restore();
    return g
}
function create_wall_stone(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 130 * c;
    d.height = 148 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(65 * c, 85 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.save();
    e.translate(65 * c, 75 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    fill_path(e, f[1], f[2], 4);
    e.rotate(.64);
    round_regular_polygon(e, 7, 40 * c, 10 * c);
    fill_path(e, f[3], f[4], 4);
    e.rotate(.12);
    round_regular_polygon(e, 7, 23 * c, 5 * c);
    e.restore();
    fill_path(e, f[5]);
    return d
}
function create_wall_gold(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 125 * c;
    d.height = 138 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(63 * c, 73 * c);
    e.rotate(1);
    round_regular_polygon(e, 8, 60 * c, 10 * c);
    fill_path(e, f[0]);
    e.restore();
    e.globalAlpha = 1;
    e.save();
    e.translate(63 * c, 63 * c);
    e.rotate(1);
    round_regular_polygon(e, 8, 60 * c, 10 * c);
    fill_path(e, f[1], f[2], 4);
    e.rotate(.56);
    round_regular_polygon(e, 8, 40 * c, 10 * c);
    fill_path(e, f[3], f[4], 4);
    e.rotate(.28);
    round_regular_polygon(e, 8, 28 * c, 8 * c);
    fill_path(e, f[5]);
    e.restore();
    return d
}
function create_door_wood(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 90 * c;
    d.height = 98 * c;
    e.globalAlpha = g ? .5 : 1;
    circle(e, 44 * c, 55 * c, 41 * c);
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    circle(e, 44 * c, 45 * c, 41 * c);
    fill_path(e, f[1], f[2], 4);
    circle(e, 44 * c, 45 * c, 31 * c);
    fill_path(e, f[3]);
    e.save();
    e.translate(45 * c, 45 * c);
    e.rotate(0);
    round_rect(e, -9 * c, -25.5 * c, 18 * c, 51 * c, 30 * c);
    e.restore();
    fill_path(e, f[4], f[4], 2);
    e.save();
    e.translate(45 * c, 45 * c);
    e.rotate(0);
    round_rect(e, -26 * c, -9 * c, 52 * c, 18 * c, 30 * c);
    e.restore();
    fill_path(e, f[4], f[4], 2);
    circle(e, 45 * c, 29 * c, 7 * c);
    fill_path(e, f[5]);
    circle(e, 45 * c, 61 * c, 7 * c);
    fill_path(e, f[5]);
    circle(e, 28 * c, 45 * c, 7 * c);
    fill_path(e, f[5]);
    circle(e, 62 * c, 45 * c, 7 * c);
    fill_path(e, f[5]);
    return d
}
function create_door_stone(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 90 * c;
    g.height = 98 * c;
    d.save();
    d.translate(44 * c, 50 * c);
    d.rotate(1.4);
    round_regular_polygon(d, 7, 41 * c, 10 * c);
    d.restore();
    fill_path(d, f[0]);
    d.globalAlpha = 1;
    d.save();
    d.translate(44 * c, 44 * c);
    d.rotate(1.4);
    round_regular_polygon(d, 7, 41 * c, 10 * c);
    fill_path(d, f[1], f[2], 4);
    round_regular_polygon(d, 7, 35 * c, 10 * c);
    fill_path(d, f[3], f[4], 4);
    round_regular_polygon(d, 7, 23 * c, 5 * c);
    d.restore();
    fill_path(d, f[5]);
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -9 * c, -25.5 * c, 18 * c, 51 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -26 * c, -9 * c, 52 * c, 18 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    circle(d, 45 * c, 29 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 45 * c, 61 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 28 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 62 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    return g
}
function create_door_gold(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 90 * c;
    g.height = 98 * c;
    d.save();
    d.translate(44 * c, 50 * c);
    d.rotate(1);
    round_regular_polygon(d, 8, 41 * c, 10 * c);
    fill_path(d, f[0]);
    d.restore();
    d.globalAlpha = 1;
    d.save();
    d.translate(44 * c, 44 * c);
    d.rotate(1);
    round_regular_polygon(d, 8, 41 * c, 10 * c);
    fill_path(d, f[1], f[2], 4);
    d.rotate(.56);
    round_regular_polygon(d, 8, 33 * c, 10 * c);
    fill_path(d, f[3], f[4], 4);
    d.rotate(.28);
    round_regular_polygon(d, 8, 24 * c, 8 * c);
    fill_path(d, f[5]);
    d.restore();
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -9 * c, -25.5 * c, 18 * c, 51 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -26 * c, -9 * c, 52 * c, 18 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    circle(d, 45 * c, 29 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 45 * c, 61 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 28 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 62 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    return g
}
function create_furnace_on(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 300 * c;
    d.height = 300 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(150 * c, 160 * c);
    e.rotate(6.28);
    round_regular_polygon(e, 6, 146 * c, 30 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(6.28);
    round_regular_polygon(e, 6, 146 * c, 30 * c);
    e.restore();
    fill_path(e, f[1], f[2], 8 * c);
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(0);
    round_regular_polygon(e, 6, 105 * c, 30 * c);
    e.restore();
    fill_path(e, f[3], f[3], 8 * c);
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(0);
    round_regular_polygon(e, 6, 66 * c, 30 * c);
    e.restore();
    fill_path(e, f[4], f[2], 8 * c);
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(0);
    round_regular_polygon(e, 6, 31 * c, 30 * c);
    e.restore();
    fill_path(e, f[5], f[6], 8 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(150 * c, 207 * c);
    e.bezierCurveTo(150 * c, 151 * c, 150 * c, 101 * c, 150 * c, 94 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(118 * c, 100 * c);
    e.bezierCurveTo(118 * c, 205 * c, 118 * c, 207 * c, 118 * c, 200 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(183 * c, 100 * c);
    e.bezierCurveTo(183 * c, 203 * c, 183 * c, 203 * c, 183 * c, 200 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    return d
}
function create_furnace_off(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 300 * c;
    d.height = 300 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(150 * c, 160 * c);
    e.rotate(6.28);
    round_regular_polygon(e, 6, 146 * c, 30 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(6.28);
    round_regular_polygon(e, 6, 146 * c, 30 * c);
    e.restore();
    fill_path(e, f[1], f[2], 8 * c);
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(0);
    round_regular_polygon(e, 6, 105 * c, 30 * c);
    e.restore();
    fill_path(e, f[3], f[3], 8 * c);
    e.save();
    e.translate(150 * c, 150 * c);
    e.rotate(0);
    round_regular_polygon(e, 6, 66 * c, 30 * c);
    e.restore();
    fill_path(e, f[4], f[2], 8 * c);
    e.save();
    e.translate(131 * c, 116 * c);
    round_regular_polygon(e, 7, 17 * c, 8 * c);
    e.restore();
    fill_path(e, f[6]);
    e.save();
    e.translate(163 * c, 168 * c);
    round_regular_polygon(e, 7, 25 * c, 8 * c);
    e.restore();
    fill_path(e, f[6]);
    e.save();
    e.translate(117 * c, 151 * c);
    round_regular_polygon(e, 7, 11 * c, 8 * c);
    e.restore();
    fill_path(e, f[6]);
    e.save();
    e.translate(167 * c, 122 * c);
    round_regular_polygon(e, 7, 12 * c, 8 * c);
    e.restore();
    fill_path(e, f[6]);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(150 * c, 207 * c);
    e.bezierCurveTo(150 * c, 151 * c, 150 * c, 101 * c, 150 * c, 94 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(118 * c, 100 * c);
    e.bezierCurveTo(118 * c, 205 * c, 118 * c, 207 * c, 118 * c, 200 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(183 * c, 100 * c);
    e.bezierCurveTo(183 * c, 203 * c, 183 * c, 203 * c, 183 * c, 200 * c);
    e.closePath();
    fill_path(e, void 0, f[2], 8 * c);
    return d
}
function create_furnace_slot(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 118 * c;
    g.height = 129 * c;
    d.save();
    d.translate(90 * c, 90 * c);
    round_rect(d, -86.5 * c, -86 * c, 110 * c, 110 * c, 15 * c);
    d.restore();
    fill_path(d, f[0], f[1], 4);
    return g
}
function create_door_diamond(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 90 * c;
    g.height = 98 * c;
    d.save();
    d.translate(44 * c, 50 * c);
    d.rotate(.2);
    round_regular_polygon(d, 9, 41 * c, 10 * c);
    d.restore();
    fill_path(d, f[0]);
    d.save();
    d.translate(44 * c, 44 * c);
    d.rotate(.2);
    round_regular_polygon(d, 9, 41 * c, 10 * c);
    fill_path(d, f[1], f[2], 4);
    d.rotate(-.32);
    round_regular_polygon(d, 9, 32 * c, 10 * c);
    fill_path(d, f[3], f[4], 4);
    d.rotate(.68);
    round_regular_polygon(d, 9, 23 * c, 8 * c);
    fill_path(d, f[5], f[6], 6);
    d.restore();
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -9 * c, -25.5 * c, 18 * c, 51 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    d.save();
    d.translate(45 * c, 45 * c);
    d.rotate(0);
    round_rect(d, -26 * c, -9 * c, 52 * c, 18 * c, 30 * c);
    d.restore();
    fill_path(d, f[4], f[4], 2);
    circle(d, 45 * c, 29 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 45 * c, 61 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 28 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    circle(d, 62 * c, 45 * c, 7 * c);
    fill_path(d, f[5]);
    return g
}
function create_coat(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 135 * c;
    g.height = 120 * c;
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(3.5 * c, 55.25 * c);
    d.bezierCurveTo(3.5 * c, 114.25 * c, 2.5 * c, 109.25 * c, 3.5 * c, 112.25 * c);
    d.bezierCurveTo(5.5 * c, 119.25 * c, 8.5 * c, 119.25 * c, 11.5 * c, 119.25 * c);
    d.bezierCurveTo(15.5 * c, 114.25 * c, 13.5 * c, 95.25 * c, 14.5 * c, 82.25 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 7 * c);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(6.5 * c, 43.25 * c);
    d.bezierCurveTo(3.5 * c, 27.25 * c, 7.5 * c, 20.25 * c, 25.5 * c, 11.25 * c);
    d.bezierCurveTo(45.5 * c, -.75 * c, 73.5 * c, 1.25 * c, 107.5 * c, 10.25 * c);
    d.bezierCurveTo(131.5 * c, 21.25 * c, 125.5 * c, 34.25 * c, 125.5 * c, 36.25 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 7 * c);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(120.5 * c, 62.25 * c);
    d.bezierCurveTo(121.5 * c, 95.25 * c, 120.5 * c, 80.25 * c, 120.5 * c, 100.25 * c);
    d.bezierCurveTo(118.5 * c, 119.25 * c, 123.5 * c, 118.25 * c, 129.5 * c, 113.25 * c);
    d.bezierCurveTo(133.5 * c, 107.25 * c, 130.5 * c, 97.25 * c, 130.5 * c, 87.25 * c);
    d.bezierCurveTo(129.5 * c, 56.25 * c, 130 * c, 70.75 * c, 129.5 * c, 54.25 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 7 * c);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(17.5 * c, 27 * c);
    d.bezierCurveTo(48.5 * c, 5 * c, 93.5 * c, 14 * c, 118.5 * c, 26 * c);
    d.bezierCurveTo(132.5 * c, 35 * c, 133.5 * c, 52 * c, 132.5 * c, 68 * c);
    d.bezierCurveTo(125.5 * c, 87 * c, 116.5 * c, 84 * c, 96.5 * c, 75 * c);
    d.bezierCurveTo(60.5 * c, 66 * c, 52.5 * c, 74 * c, 37.5 * c, 78 * c);
    d.bezierCurveTo(2.5 * c, 86 * c, 3.5 * c, 78 * c, 1.5 * c, 61 * c);
    d.bezierCurveTo(1.5 * c, 37 * c, 9.5 * c, 32 * c, 15.5 * c, 28 * c);
    d.closePath();
    fill_path(d, f[2], f[3], 7 * c);
    return g
}
function create_spear(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 81 * c;
    d.height = 263 * c;
    e.globalAlpha = g ? .6 : 1;
    e.save();
    e.translate(35 * c, 160 * c);
    e.rotate(0);
    round_rect(e, -6 * c, -94.5 * c, 12 * c, 189 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.save();
    e.translate(-9 * c, 11 * c);
    e.moveTo(26.0714111328125 * c, 50.9 * c);
    e.bezierCurveTo(32.0714111328125 * c, 35.892852783203125 * c, 39.0714111328125 * c, 18.892852783203125 * c, 45.0714111328125 * c, 7.892852783203125 * c);
    e.bezierCurveTo(51.0714111328125 * c, 13.892852783203125 * c, 56.0714111328125 * c, 36.892852783203125 * c, 60.0714111328125 * c, 50.892852783203125 * c);
    e.bezierCurveTo(52.5714111328125 * c, 58.892852783203125 * c, 52.5714111328125 * c, 58.892852783203125 * c, 45.0714111328125 * c, 66.89285278320312 * c);
    e.bezierCurveTo(37.0714111328125 * c, 58.892852783203125 * c, 37.0714111328125 * c, 58.892852783203125 * c, 29.0714111328125 * c, 50.892852783203125 * c);
    e.closePath();
    fill_path(e, f[0]);
    e.restore();
    e.globalAlpha = 1;
    e.save();
    e.translate(45.0714111328125 * c, 149.39285278320312 * c);
    e.rotate(0);
    round_rect(e, -6 * c, -94.5 * c, 12 * c, 189 * c, 10 * c);
    e.restore();
    fill_path(e, f[1], f[2], 6 * c);
    e.beginPath();
    e.lineCap = "round";
    e.lineJoin = "round";
    e.moveTo(29.0714111328125 * c, 50.9 * c);
    e.bezierCurveTo(32.0714111328125 * c, 35.892852783203125 * c, 39.0714111328125 * c, 18.892852783203125 * c, 45.0714111328125 * c, 7.892852783203125 * c);
    e.bezierCurveTo(51.0714111328125 * c, 13.892852783203125 * c, 56.0714111328125 * c, 36.892852783203125 * c, 60.0714111328125 * c, 50.892852783203125 * c);
    e.bezierCurveTo(52.5714111328125 * c, 58.892852783203125 * c, 52.5714111328125 * c, 58.892852783203125 * c, 45.0714111328125 * c, 66.89285278320312 * c);
    e.bezierCurveTo(37.0714111328125 * c, 58.892852783203125 * c, 37.0714111328125 * c, 58.892852783203125 * c, 29.0714111328125 * c, 50.892852783203125 * c);
    e.closePath();
    fill_path(e, f[3], f[4], 6 * c);
    return d
}
function create_plus_chest(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 200 * c;
    g.height = 200 * c;
    d.save();
    d.translate(112 * c, 158 * c);
    round_rect(d, -86.5 * c, -86 * c, 150 * c, 35 * c, 20 * c);
    d.restore();
    fill_path(d, f[0]);
    d.save();
    d.translate(170 * c, 100 * c);
    round_rect(d, -86.5 * c, -86 * c, 35 * c, 150 * c, 20 * c);
    d.restore();
    fill_path(d, f[0]);
    return g
}
function create_chest_slot(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 118 * c;
    g.height = 129 * c;
    d.save();
    d.translate(90 * c, 90 * c);
    round_rect(d, -86.5 * c, -86 * c, 110 * c, 110 * c, 15 * c);
    d.restore();
    fill_path(d, f[0], f[1], 4);
    d.save();
    round_rect(d, 30 * c, 115 * c, 60 * c, 5 * c, 15 * c);
    d.restore();
    fill_path(d, f[2], f[3], 4);
    d.save();
    round_rect(d, 50 * c, 117 * c, 20 * c, 10 * c, 15 * c);
    d.restore();
    fill_path(d, f[2]);
    return g
}
function create_chest(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 165 * c;
    g.height = 123 * c;
    d.save();
    d.translate(81 * c, 65 * c);
    round_rect(d, -78 * c, -54.5 * c, 156 * c, 109 * c, 20 * c);
    d.restore();
    fill_path(d, f[0]);
    d.save();
    d.translate(81 * c, 58 * c);
    round_rect(d, -78 * c, -54.5 * c, 156 * c, 109 * c, 20 * c);
    d.restore();
    fill_path(d, f[1], f[2], 4);
    d.save();
    d.translate(81 * c, 58 * c);
    round_rect(d, -69 * c, -47 * c, 138 * c, 93 * c, 15 * c);
    d.restore();
    fill_path(d, f[3], f[4], 4);
    d.save();
    d.translate(79 * c, 54 * c);
    round_rect(d, -34 * c, -40 * c, 68 * c, 88 * c, 13 * c);
    d.restore();
    fill_path(d, void 0, f[5], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(44 * c, 13 * c);
    d.bezierCurveTo(43.5 * c, 55 * c, 43.5 * c, 55 * c, 43 * c, 101 * c);
    d.closePath();
    fill_path(d, void 0, f[6], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(115 * c, 13 * c);
    d.bezierCurveTo(115 * c, 56 * c, 115 * c, 56 * c, 115 * c, 101 * c);
    d.closePath();
    fill_path(d, void 0, f[6], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(35 * c, 6 * c);
    d.bezierCurveTo(35 * c, 56 * c, 36 * c, 109 * c, 35 * c, 110 * c);
    d.closePath();
    fill_path(d, void 0, f[7], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(123 * c, 6 * c);
    d.bezierCurveTo(123 * c, 56 * c, 123 * c, 56 * c, 123 * c, 110 * c);
    d.closePath();
    fill_path(d, void 0, f[7], 4);
    d.save();
    d.translate(79 * c, 113 * c);
    round_rect(d, -18 * c, -2 * c, 36 * c, 4 * c, 20 * c);
    d.restore();
    fill_path(d, void 0, f[8], 4);
    d.save();
    d.translate(75 * c, 118 * c);
    round_rect(d, -6 * c, -2.5 * c, 20 * c, 5 * c, 20 * c);
    d.restore();
    fill_path(d, f[8]);
    return g
}
function create_bag(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 86 * c;
    g.height = 45 * c;
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(15 * c, 15 * c);
    d.bezierCurveTo(16 * c, 15 * c, 19.5 * c, 9 * c, 24 * c, 2 * c);
    d.bezierCurveTo(41 * c, 2 * c, 41 * c, 2 * c, 58 * c, 2 * c);
    d.bezierCurveTo(64 * c, 13 * c, 61 * c, 8 * c, 65 * c, 13 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 4);
    d.save();
    d.translate(43 * c, 27 * c);
    d.rotate(0);
    round_rect(d, -40 * c, -15 * c, 80 * c, 30 * c, 10 * c);
    d.restore();
    fill_path(d, f[0], f[1], 4);
    d.save();
    d.translate(43 * c, 33 * c);
    d.rotate(0);
    round_rect(d, -17 * c, -4.5 * c, 34 * c, 9 * c, 10 * c);
    d.restore();
    fill_path(d, f[0], f[1], 4);
    return g
}
function create_fur(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 92 * c;
    g.height = 108 * c;
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(31 * c, 10 * c);
    d.bezierCurveTo(37 * c, 2 * c, 49 * c, 0 * c, 61 * c, 15 * c);
    d.bezierCurveTo(81 * c, 31 * c, 78 * c, 25 * c, 79 * c, 37 * c);
    d.bezierCurveTo(76 * c, 44 * c, 81 * c, 56 * c, 85 * c, 63 * c);
    d.bezierCurveTo(91 * c, 71 * c, 90 * c, 78 * c, 83 * c, 84 * c);
    d.bezierCurveTo(60 * c, 98 * c, 67 * c, 95 * c, 57 * c, 102 * c);
    d.bezierCurveTo(47 * c, 106 * c, 43 * c, 106 * c, 31 * c, 98 * c);
    d.bezierCurveTo(22 * c, 91 * c, 17 * c, 89 * c, 7 * c, 84 * c);
    d.bezierCurveTo(1 * c, 77 * c, 4 * c, 73 * c, 7 * c, 60 * c);
    d.bezierCurveTo(11 * c, 50 * c, 5 * c, 32 * c, 15 * c, 27 * c);
    d.bezierCurveTo(26 * c, 18 * c, 26 * c, 24 * c, 31 * c, 10 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 4);
    return g
}
function create_earmuff(c, g, f) {
    g = document.createElement("canvas");
    var d = g.getContext("2d");
    g.width = 151 * c;
    g.height = 80 * c;
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(133.16665649414062 * c, 54.96875 * c);
    d.bezierCurveTo(136.16665649414062 * c, 18.96875 * c, 129.16665649414062 * c, 18.96875 * c, 114.16665649414062 * c, 13.96875 * c);
    d.bezierCurveTo(51.166656494140625 * c, .96875 * c, 36.166656494140625 * c, 16.96875 * c, 34.166656494140625 * c, 16.96875 * c);
    d.bezierCurveTo(8.166656494140625 * c, 28.96875 * c, 22.166656494140625 * c, 56.96875 * c, 21.166656494140625 * c, 57.96875 * c);
    d.closePath();
    fill_path(d, f[2], f[3], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(130.16665649414062 * c, 40.96875 * c);
    d.bezierCurveTo(132.16665649414062 * c, 35.96875 * c, 132.16665649414062 * c, 30.96875 * c, 132.16665649414062 * c, 29.96875 * c);
    d.bezierCurveTo(145.16665649414062 * c, 38.96875 * c, 144.16665649414062 * c, 43.96875 * c, 137.16665649414062 * c, 54.96875 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(20.166656494140625 * c, 33.96875 * c);
    d.bezierCurveTo(24.166656494140625 * c, 44.96875 * c, 21.666656494140625 * c, 39.46875 * c, 23.166656494140625 * c, 44.96875 * c);
    d.bezierCurveTo(19.166656494140625 * c, 49.96875 * c, 19.166656494140625 * c, 49.96875 * c, 15.166656494140625 * c, 54.96875 * c);
    d.bezierCurveTo(4.166656494140625 * c, 43.96875 * c, 10.166656494140625 * c, 35.96875 * c, 20.166656494140625 * c, 32.96875 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 4);
    d.beginPath();
    d.lineCap = "round";
    d.lineJoin = "round";
    d.moveTo(18.166656494140625 * c, 52.96875 * c);
    d.bezierCurveTo(24.166656494140625 * c, 31.96875 * c, 34.166656494140625 * c, 25.96875 * c, 75.16665649414062 * c, 23.96875 * c);
    d.bezierCurveTo(130.16665649414062 * c, 24.96875 * c, 129.16665649414062 * c, 32.96875 * c, 134.16665649414062 * c, 51.96875 * c);
    d.bezierCurveTo(138.16665649414062 * c, 70.96875 * c, 126.16665649414062 * c, 72.96875 * c, 90.16665649414062 * c, 73.96875 * c);
    d.bezierCurveTo(18.166656494140625 * c, 72.96875 * c, 15.166656494140625 * c, 68.96875 * c, 18.166656494140625 * c, 54.96875 * c);
    d.closePath();
    fill_path(d, f[0], f[1], 4);
    return g
}
function create_spike(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d")
      , m = 170 * c
      , n = 172 * c;
    d.width = m;
    d.height = n;
    e.translate(m / 2, n / 2 + 7 * c);
    e.globalAlpha = g ? .5 : 0;
    circle(e, 0, 0, 60 * c);
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.translate(0, -7 * c);
    e.save();
    for (g = 0; 10 > g; g++)
        e.rotate(Math.PI / 5),
        e.save(),
        e.translate(65 * c, 0),
        round_regular_polygon(e, 3, 20 * c, 4 * c),
        fill_path(e, f[1], f[2], 4 * c),
        e.restore();
    e.restore();
    circle(e, 0, 0, 60 * c, 0);
    fill_path(e, f[3], f[4], 4 * c);
    circle(e, 0, 0, 40 * c);
    fill_path(e, f[5]);
    circle(e, 0, 0, 25 * c);
    fill_path(e, f[6], f[7], 8 * c);
    return d
}
function create_spike_stone(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 170 * c;
    d.height = 170 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(85 * c, 95 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.translate(85 * c, 80 * c);
    for (g = 0; 10 > g; g++)
        e.rotate(Math.PI / 5),
        e.save(),
        e.translate(65 * c, 0),
        round_regular_polygon(e, 3, 21 * c, 4 * c),
        fill_path(e, f[1], f[2], 4 * c),
        e.restore();
    e.save();
    e.translate(0 * c, 0 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    fill_path(e, f[3], f[4], 4);
    e.rotate(.64);
    round_regular_polygon(e, 7, 40 * c, 10 * c);
    fill_path(e, f[5], f[6], 4);
    e.rotate(.12);
    round_regular_polygon(e, 7, 23 * c, 5 * c);
    e.restore();
    fill_path(e, f[7]);
    return d
}
function create_spike_gold(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 170 * c;
    d.height = 170 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(85 * c, 95 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.translate(85 * c, 82 * c);
    for (g = 0; 10 > g; g++)
        e.rotate(Math.PI / 5),
        e.save(),
        e.translate(65 * c, 0),
        round_regular_polygon(e, 3, 21 * c, 4 * c),
        fill_path(e, f[1], f[2], 4 * c),
        e.restore();
    e.save();
    e.translate(0 * c, 0 * c);
    e.rotate(1);
    round_regular_polygon(e, 8, 60 * c, 10 * c);
    fill_path(e, f[3], f[4], 4);
    e.rotate(.56);
    round_regular_polygon(e, 8, 40 * c, 10 * c);
    fill_path(e, f[5], f[6], 4);
    e.rotate(.28);
    round_regular_polygon(e, 8, 28 * c, 8 * c);
    fill_path(e, f[7]);
    e.restore();
    return d
}
function create_spike_diamond(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 170 * c;
    d.height = 170 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(85 * c, 95 * c);
    e.rotate(1.4);
    round_regular_polygon(e, 7, 60 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.translate(85 * c, 82 * c);
    for (g = 0; 10 > g; g++)
        e.rotate(Math.PI / 5),
        e.save(),
        e.translate(65 * c, 0),
        round_regular_polygon(e, 3, 21 * c, 4 * c),
        fill_path(e, f[1], f[2], 4 * c),
        e.restore();
    e.save();
    e.translate(0 * c, 0 * c);
    e.rotate(.2);
    round_regular_polygon(e, 9, 60 * c, 10 * c);
    fill_path(e, f[3], f[4], 4);
    e.rotate(-.32);
    round_regular_polygon(e, 9, 38 * c, 10 * c);
    fill_path(e, f[5], f[6], 4);
    e.rotate(.68);
    round_regular_polygon(e, 9, 20 * c, 8 * c);
    fill_path(e, f[7], f[8], 6);
    e.restore();
    return d
}
function create_fir_one(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 149 * c;
    f.height = 153 * c;
    d.globalAlpha = .5;
    circle(d, 74.5 * c, 85 * c, 66 * c);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    circle(d, 75.5 * c, 72.5 * c, 67 * c);
    fill_path(d, g[1], g[2], 4 * c);
    circle(d, 75.5 * c, 73.5 * c, 54 * c);
    fill_path(d, g[3]);
    d.globalAlpha = .5;
    circle(d, 74.5 * c, 80.5 * c, 39 * c);
    fill_path(d, g[4]);
    d.globalAlpha = 1;
    circle(d, 74.5 * c, 74.5 * c, 37 * c);
    fill_path(d, g[5]);
    return f
}
function create_fir_two(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 173 * c;
    f.height = 178 * c;
    d.globalAlpha = .5;
    circle(d, 86.5 * c, 95 * c, 80 * c);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    circle(d, 86.5 * c, 89 * c, 81 * c);
    fill_path(d, g[1], g[2], 4 * c);
    circle(d, 86.5 * c, 86 * c, 59 * c);
    fill_path(d, g[3], g[4], 4 * c);
    d.globalAlpha = .5;
    circle(d, 86.5 * c, 91 * c, 34 * c);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    circle(d, 86.5 * c, 89 * c, 34 * c);
    fill_path(d, g[5]);
    return f
}
function create_fir_three(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d");
    f.width = 253 * c;
    f.height = 260 * c;
    d.globalAlpha = .5;
    circle(d, 126.5 * c, 134 * c, 119 * c);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    circle(d, 126.5 * c, 124 * c, 119 * c);
    fill_path(d, g[1], g[2], 4 * c);
    circle(d, 126.5 * c, 127 * c, 100 * c);
    fill_path(d, g[3]);
    d.globalAlpha = .5;
    circle(d, 126.5 * c, 135 * c, 81 * c);
    fill_path(d, g[0]);
    d.globalAlpha = 1;
    circle(d, 126.5 * c, 125 * c, 84 * c);
    fill_path(d, g[4], g[5], 4 * c);
    d.globalAlpha = .5;
    circle(d, 126.5 * c, 125 * c, 61 * c);
    fill_path(d, g[6], g[7], 4 * c);
    d.globalAlpha = 1;
    circle(d, 126.5 * c, 134 * c, 40 * c);
    fill_path(d, g[0]);
    circle(d, 126.5 * c, 125 * c, 40 * c);
    fill_path(d, g[8]);
    return f
}
function create_amethyst(c, g, f) {
    var d = document.createElement("canvas")
      , e = d.getContext("2d");
    d.width = 154 * c;
    d.height = 165 * c;
    e.globalAlpha = g ? .5 : 1;
    e.save();
    e.translate(77 * c, 90 * c);
    round_regular_polygon(e, 9, 76 * c, 10 * c);
    e.restore();
    fill_path(e, f[0]);
    e.globalAlpha = 1;
    e.save();
    e.translate(77 * c, 82 * c);
    round_regular_polygon(e, 9, 73 * c, 10 * c);
    e.restore();
    fill_path(e, f[1]);
    e.save();
    e.translate(77 * c, 82 * c);
    round_regular_polygon(e, 9, 48 * c, 10 * c);
    e.restore();
    fill_path(e, f[2]);
    return d
}
function create_leaderboard(c) {
    var g = document.createElement("canvas")
      , f = g.getContext("2d")
      , d = 200 * c
      , e = 280 * c
      , m = 10 * c;
    g.width = d;
    g.height = e;
    f.beginPath();
    round_rect(f, 0, -m, d + m, e - m, m);
    f.globalAlpha = .8;
    fill_path(f, "#3D8075");
    f.globalAlpha = 1;
    e = create_text(c, "Leaderboard", 25, "#FFF");
    f.drawImage(e, (d - e.width) / 2, 5 * c);
    return g
}
function create_button_background(c, g) {
    var f = document.createElement("canvas")
      , d = f.getContext("2d")
      , e = c.w + c.lw
      , m = c.h + c.lw
      , n = .1 * m;
    f.width = e;
    f.height = m + n;
    d.beginPath();
    d.translate(e / 2, m / 2 + n);
    d.globalAlpha = .5;
    round_rect(d, -c.w / 2, -c.h / 2, c.w, c.h, c.r);
    fill_path(d, "#000", "#000", c.lw);
    d.globalAlpha = 1;
    d.beginPath();
    g || d.translate(0, -n);
    round_rect(d, -c.w / 2, -c.h / 2, c.w, c.h, c.r);
    fill_path(d, c.bg, c.fg, c.lw);
    d.beginPath();
    d.fillStyle = c.color;
    d.textBaseline = "middle";
    d.textAlign = "center";
    d.font = c.size + "px " + c.font;
    d.fillText(c.text, 0, 0);
    return f
}
function create_button(c) {
    for (var g = [], f = 0; f < c.length; f++)
        g.push(create_button_background(c[f], 2 == f ? !0 : !1));
    return g
}
function create_gauges(c) {
    var g = document.createElement("canvas")
      , f = g.getContext("2d")
      , d = 335 * c
      , e = 250 * c
      , m = 120 * c
      , n = 20 * c
      , p = 35 * c
      , q = 65 * c
      , t = 8 * c
      , r = 4 * c;
    g.width = d;
    g.height = m;
    f.globalAlpha = .3;
    round_rect(f, 2 * -t, 0, d + 2 * t, 1.2 * m, 2 * t);
    fill_path(f, "#000");
    f.globalAlpha = 1;
    f.beginPath();
    f.translate(0, 15 * c);
    d = create_text(c, "Life", 15, "#FFF");
    f.drawImage(d, 12 * c, 3 * c);
    round_rect(f, q, 0, e, n, t);
    fill_path(f, null , "#69A148", r);
    f.translate(0, p);
    d = create_text(c, "Food", 15, "#FFF");
    f.drawImage(d, 12 * c, 3 * c);
    round_rect(f, q, 0, e, n, t);
    fill_path(f, null , "#AF352A", r);
    f.translate(0, p);
    d = create_text(c, "Cold", 15, "#FFF");
    f.drawImage(d, 12 * c, 3 * c);
    round_rect(f, q, 0, e, n, t);
    fill_path(f, null , "#669BB1", r);
    return g
}
function create_images() {
    sprite[SPRITE.STONES] = [];
    sprite[SPRITE.STONES][SPRITE.DAY] = [];
    sprite[SPRITE.STONES][SPRITE.NIGHT] = [];
    sprite[SPRITE.STONES][SPRITE.DAY].push(CTI(create_stone(1.1, !1, ["#252B28", "#58645F", "#75827D"])));
    sprite[SPRITE.STONES][SPRITE.DAY].push(CTI(create_stone(.9, !1, ["#252B28", "#58645F", "#75827D"])));
    sprite[SPRITE.STONES][SPRITE.DAY].push(CTI(create_stone(.6, !1, ["#252B28", "#58645F", "#75827D"])));
    sprite[SPRITE.STONES][SPRITE.NIGHT].push(CTI(create_stone(1.1, !1, ["#030d14", "#123335", "#183f3f"])));
    sprite[SPRITE.STONES][SPRITE.NIGHT].push(CTI(create_stone(.9, !1, ["#030d14", "#123335", "#183f3f"])));
    sprite[SPRITE.STONES][SPRITE.NIGHT].push(CTI(create_stone(.6, !1, ["#030d14", "#123335", "#183f3f"])));
    sprite[SPRITE.GOLD] = [];
    sprite[SPRITE.GOLD][SPRITE.DAY] = [];
    sprite[SPRITE.GOLD][SPRITE.NIGHT] = [];
    sprite[SPRITE.GOLD][SPRITE.DAY].push(CTI(create_gold(1.5, !1, ["#282823", "#877c2d", "#c4bc51"])));
    sprite[SPRITE.GOLD][SPRITE.DAY].push(CTI(create_gold(1.3, !1, ["#282823", "#877c2d", "#c4bc51"])));
    sprite[SPRITE.GOLD][SPRITE.DAY].push(CTI(create_gold(1.1, !1, ["#282823", "#877c2d", "#c4bc51"])));
    sprite[SPRITE.GOLD][SPRITE.NIGHT].push(CTI(create_gold(1.5, !1, ["#030d14", "#1b4444", "#16605a"])));
    sprite[SPRITE.GOLD][SPRITE.NIGHT].push(CTI(create_gold(1.3, !1, ["#030d14", "#1b4444", "#16605a"])));
    sprite[SPRITE.GOLD][SPRITE.NIGHT].push(CTI(create_gold(1.1, !1, ["#030d14", "#1b4444", "#16605a"])));
    sprite[SPRITE.DIAMOND] = [];
    sprite[SPRITE.DIAMOND][SPRITE.DAY] = [];
    sprite[SPRITE.DIAMOND][SPRITE.NIGHT] = [];
    sprite[SPRITE.DIAMOND][SPRITE.DAY].push(CTI(create_diamond(1.1, !1, ["#232828", "#3fc9c9", "#74ede6"])));
    sprite[SPRITE.DIAMOND][SPRITE.DAY].push(CTI(create_diamond(.9, !1, ["#232828", "#3fc9c9", "#74ede6"])));
    sprite[SPRITE.DIAMOND][SPRITE.DAY].push(CTI(create_diamond(.7, !1, ["#232828", "#3fc9c9", "#74ede6"])));
    sprite[SPRITE.DIAMOND][SPRITE.NIGHT].push(CTI(create_diamond(1.1, !1, ["#030d14", "#2b9390", "#57bcb5"])));
    sprite[SPRITE.DIAMOND][SPRITE.NIGHT].push(CTI(create_diamond(.9, !1, ["#030d14", "#2b9390", "#57bcb5"])));
    sprite[SPRITE.DIAMOND][SPRITE.NIGHT].push(CTI(create_diamond(.7, !1, ["#030d14", "#2b9390", "#57bcb5"])));
    sprite[SPRITE.BODY] = [];
    sprite[SPRITE.BODY][SPRITE.DAY] = CTI(create_player(.6, ["#0d1b1c", "#dff2f7", "#187484", "#231f20", "#ffffff"]));
    sprite[SPRITE.BODY][SPRITE.NIGHT] = CTI(create_player(.6, ["#030d14", "#106664", "#01333a", "#15183f", "#ffffff"]));
    sprite[SPRITE.HAND] = [];
    sprite[SPRITE.HAND][SPRITE.DAY] = CTI(create_hand(.6, ["#dff2f7", "#187484"]));
    sprite[SPRITE.HAND][SPRITE.NIGHT] = CTI(create_hand(.6, ["#106664", "#01333a"]));
    sprite[SPRITE.HAND_SHADOW] = [];
    sprite[SPRITE.HAND_SHADOW][SPRITE.DAY] = CTI(create_hand_shadow(.6, ["#0d1b1c"]));
    sprite[SPRITE.HAND_SHADOW][SPRITE.NIGHT] = CTI(create_hand_shadow(.6, ["#030d14"]));
    sprite[SPRITE.TREE] = [];
    sprite[SPRITE.TREE][SPRITE.DAY] = [];
    sprite[SPRITE.TREE][SPRITE.NIGHT] = [];
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(1.1, ["#0e3022", "#0c8e5b", "#037542", "#209e64"], !1));
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(1.1, ["#0e3022", "#0c8e5b", "#037542", "#209e64"], !0));
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(.9, ["#0e3022", "#096d41", "#1f7b43", "#1f7b43"], !1));
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(.9, ["#0e3022", "#096d41", "#1f7b43", "#1f7b43"], !0));
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(.7, ["#0e3022", "#124c34", "#0E3D26", "#155136"], !1));
    sprite[SPRITE.TREE][SPRITE.DAY].push(create_apricot_tree(.7, ["#0e3022", "#124c34", "#0E3D26", "#155136"], !0));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(1.1, ["#030d14", "#124949", "#0e3838", "#15514f"], !0));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(1.1, ["#030d14", "#124949", "#0e3838", "#15514f"], !1));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(.9, ["#030d14", "#0b3534", "#144443", "#174240"], !0));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(.9, ["#030d14", "#0b3534", "#144443", "#174240"], !1));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(.7, ["#030d14", "#082b29", "#073332", "#073332"], !1));
    sprite[SPRITE.TREE][SPRITE.NIGHT].push(create_apricot_tree(.7, ["#030d14", "#082b29", "#073332", "#073332"], !0));
    sprite[SPRITE.TREE_BRANCH] = [];
    sprite[SPRITE.TREE_BRANCH][SPRITE.DAY] = [];
    sprite[SPRITE.TREE_BRANCH][SPRITE.NIGHT] = [];
    sprite[SPRITE.TREE_BRANCH][SPRITE.DAY].push(CTI(create_apricot_forest(create_tree_branch(1.1, "#0e3022 #4d2d14 #432516 #096d41 #08562e #107746".split(" "), !1), sprite[SPRITE.TREE][SPRITE.DAY][0])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.DAY].push(CTI(create_apricot_forest(create_tree_branch(1.1, "#0e3022 #4d2d14 #432516 #096d41 #08562e #107746".split(" "), !0), sprite[SPRITE.TREE][SPRITE.DAY][0])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.NIGHT].push(CTI(create_apricot_forest(create_tree_branch(1.1, "#030d14 #031619 #041c21 #0a3333 #113f3c #113f3c".split(" "), !1), sprite[SPRITE.TREE][SPRITE.NIGHT][1])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.NIGHT].push(CTI(create_apricot_forest(create_tree_branch(1.1, "#030d14 #031619 #041c21 #0a3333 #113f3c #113f3c".split(" "), !0), sprite[SPRITE.TREE][SPRITE.NIGHT][1])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.DAY].push(CTI(create_apricot_forest(create_tree_branch(.9, "#0e3022 #4d2d14 #432516 #096d41 #107746 #107746".split(" "), !1), sprite[SPRITE.TREE][SPRITE.DAY][2])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.DAY].push(CTI(create_apricot_forest(create_tree_branch(.9, "#0e3022 #4d2d14 #432516 #096d41 #107746 #107746".split(" "), !0), sprite[SPRITE.TREE][SPRITE.DAY][2])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.NIGHT].push(CTI(create_apricot_forest(create_tree_branch(.9, "#030d14 #031619 #041c21 #082b29 #083b3a #083b3a".split(" "), !1), sprite[SPRITE.TREE][SPRITE.NIGHT][3])));
    sprite[SPRITE.TREE_BRANCH][SPRITE.NIGHT].push(CTI(create_apricot_forest(create_tree_branch(.9, "#030d14 #031619 #041c21 #082b29 #083b3a #083b3a".split(" "), !0), sprite[SPRITE.TREE][SPRITE.NIGHT][3])));
    sprite[SPRITE.TREE][SPRITE.DAY][2] = CTI(sprite[SPRITE.TREE][SPRITE.DAY][2]);
    sprite[SPRITE.TREE][SPRITE.DAY][1] = CTI(sprite[SPRITE.TREE][SPRITE.DAY][1]);
    sprite[SPRITE.TREE][SPRITE.DAY][0] = CTI(sprite[SPRITE.TREE][SPRITE.DAY][0]);
    sprite[SPRITE.TREE][SPRITE.NIGHT][2] = CTI(sprite[SPRITE.TREE][SPRITE.NIGHT][2]);
    sprite[SPRITE.TREE][SPRITE.NIGHT][1] = CTI(sprite[SPRITE.TREE][SPRITE.NIGHT][1]);
    sprite[SPRITE.TREE][SPRITE.NIGHT][0] = CTI(sprite[SPRITE.TREE][SPRITE.NIGHT][0]);
    sprite[SPRITE.PICK_WOOD] = [];
    sprite[SPRITE.PICK_WOOD][SPRITE.DAY] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #4d2d14 #432516".split(" "))));
    sprite[SPRITE.PICK_WOOD][SPRITE.NIGHT] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#030d14 #000000 #030d14 #0d2e33 #0b2326 #0d2e33 #0b2326".split(" "))));
    sprite[SPRITE.PICK] = [];
    sprite[SPRITE.PICK][SPRITE.DAY] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #939393 #5f6061".split(" "))));
    sprite[SPRITE.PICK][SPRITE.NIGHT] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#030d14 #000000 #030d14 #0d2e33 #0b2326 #485e66 #1f343f".split(" "))));
    sprite[SPRITE.PICK_GOLD] = [];
    sprite[SPRITE.PICK_GOLD][SPRITE.DAY] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#0d1b1c #000000 #0d1b1c #493e26 #382e19 #c4bc51 #b29c32".split(" "))));
    sprite[SPRITE.PICK_GOLD][SPRITE.NIGHT] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#030d14 #000000 #030d14 #263947 #182935 #43aa82 #29997c".split(" "))));
    sprite[SPRITE.PICK_DIAMOND] = [];
    sprite[SPRITE.PICK_DIAMOND][SPRITE.DAY] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#0d1b1c #000000 #0d1b1c #262114 #211108 #63c9d6 #29aaa1".split(" "))));
    sprite[SPRITE.PICK_DIAMOND][SPRITE.NIGHT] = CTI(create_rotated_img(4, create_pickaxe(.75, !0, "#030d14 #000000 #030d14 #111316 #0a0b0c #73dde5 #3dc4c0".split(" "))));
    sprite[SPRITE.SWORD] = [];
    sprite[SPRITE.SWORD][SPRITE.DAY] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#4d2d14", "#432516", "#939393", "#5f6061"])));
    sprite[SPRITE.SWORD][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#0d2e33", "#0b2326", "#485e66", "#1f343f"])));
    sprite[SPRITE.SWORD_GOLD] = [];
    sprite[SPRITE.SWORD_GOLD][SPRITE.DAY] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"])));
    sprite[SPRITE.SWORD_GOLD][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#263947", "#182935", "#43aa82", "#29997c"])));
    sprite[SPRITE.SWORD_DIAMOND] = [];
    sprite[SPRITE.SWORD_DIAMOND][SPRITE.DAY] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"])));
    sprite[SPRITE.SWORD_DIAMOND][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_sword(.75, !0, ["#0d1b1c", "#111316", "#0a0b0c", "#73dde5", "#3dc4c0"])));
    sprite[SPRITE.SEED] = create_seed(1);
    sprite[SPRITE.HERB] = [];
    sprite[SPRITE.HERB][SPRITE.DAY] = [];
    sprite[SPRITE.HERB][SPRITE.NIGHT] = [];
    sprite[SPRITE.HERB][SPRITE.DAY].push(CTI(create_herb(.9, !1, ["#1b4936"], 0)));
    sprite[SPRITE.HERB][SPRITE.DAY].push(CTI(create_herb(.9, !1, ["#1b4936"], 1)));
    sprite[SPRITE.HERB][SPRITE.DAY].push(CTI(create_herb(.9, !1, ["#1b4936"], 2)));
    sprite[SPRITE.HERB][SPRITE.NIGHT].push(CTI(create_herb(.9, !1, ["#083033"], 0)));
    sprite[SPRITE.HERB][SPRITE.NIGHT].push(CTI(create_herb(.9, !1, ["#083033"], 1)));
    sprite[SPRITE.HERB][SPRITE.NIGHT].push(CTI(create_herb(.9, !1, ["#083033"], 2)));
    sprite[SPRITE.PLANT] = [];
    sprite[SPRITE.PLANT][SPRITE.DAY] = CTI(create_plant(1.2, !0, ["#0e3022", "#0b8052", "#077b49"]));
    sprite[SPRITE.PLANT][SPRITE.NIGHT] = CTI(create_plant(1.2, !0, ["#030d14", "#084442", "#0a4049"]));
    sprite[SPRITE.PLANT_MINI] = [];
    sprite[SPRITE.PLANT_MINI][SPRITE.DAY] = CTI(create_plant(.8, !0, ["#0e3022", "#0b8052", "#077b49"]));
    sprite[SPRITE.PLANT_MINI][SPRITE.NIGHT] = CTI(create_plant(.8, !0, ["#030d14", "#084442", "#0a4049"]));
    sprite[SPRITE.FRUIT] = [];
    sprite[SPRITE.FRUIT][SPRITE.DAY] = CTI(create_fruit(1.4, !1, ["#54318e", "#725ba3"]));
    sprite[SPRITE.FRUIT][SPRITE.NIGHT] = CTI(create_fruit(1.4, !1, ["#2f195e", "#5b498c"]));
    sprite[SPRITE.FIRE] = [];
    sprite[SPRITE.FIRE][SPRITE.DAY] = CTI(create_fire(.9, !1, ["#efd435", "#ec8d35", "#e96132"]));
    sprite[SPRITE.FIRE][SPRITE.NIGHT] = CTI(create_fire(.9, !1, ["#efdb7b", "#efe854", "#e8ef62"]));
    sprite[SPRITE.BIG_FIRE_WOOD] = [];
    sprite[SPRITE.BIG_FIRE_WOOD][SPRITE.DAY] = CTI(create_big_fire_wood(.9, !1, ["#4d2d14", "#432516"]));
    sprite[SPRITE.BIG_FIRE_WOOD][SPRITE.NIGHT] = CTI(create_big_fire_wood(.9, !1, ["#282404", "#0a0a01"]));
    sprite[SPRITE.WOOD_FIRE] = [];
    sprite[SPRITE.WOOD_FIRE][SPRITE.DAY] = CTI(create_wood_fire(.9, !1, ["#4d2d14", "#432516"]));
    sprite[SPRITE.WOOD_FIRE][SPRITE.NIGHT] = CTI(create_wood_fire(.9, !1, ["#282404", "#0a0a01"]));
    sprite[SPRITE.HALO_FIRE] = [];
    sprite[SPRITE.HALO_FIRE][SPRITE.DAY] = CTI(create_halo_fire(.9, !1, ["#efd435"]));
    sprite[SPRITE.HALO_FIRE][SPRITE.NIGHT] = CTI(create_halo_fire(.9, !1, ["#fffabb"]));
    sprite[SPRITE.GROUND_FIRE] = [];
    sprite[SPRITE.GROUND_FIRE][SPRITE.DAY] = CTI(create_ground_fire(.9, !1, ["#2d8f48"]));
    sprite[SPRITE.GROUND_FIRE][SPRITE.NIGHT] = CTI(create_ground_fire(.9, !1, ["#0b5454"]));
    sprite[SPRITE.GEAR] = CTI(create_gear(1, "#ffffff", 1));
    sprite[SPRITE.GEAR2] = CTI(create_gear(1.5, "#ffffff", 1));
    sprite[SPRITE.YOUR_SCORE] = CTI(create_text(1, "Your score:", 15, "#FFF"));
    sprite[SPRITE.CRAFT_SEED] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(3 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_seed,
        x: 0,
        y: 0,
        a: 1,
        r: 0
    }], .7, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_SEED] = create_craft_button(1, [{
        f: create_seed,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#756e52", "#898064", "#685b40"]
    }], .7, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.CRAFT_SWORD] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493d36", "#332b28", "#939393", "#5f6061"]
    }], .55, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_SWORD_GOLD] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .55, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_SWORD_DIAMOND] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .55, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_PICK_WOOD] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #4d2d14 #432516".split(" ")
    }], .5, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_PICK] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #939393 #5f6061".split(" ")
    }], .5, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_PICK_GOLD] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #493e26 #382e19 #c4bc51 #b29c32".split(" ")
    }], .5, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_PICK_DIAMOND] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #262114 #211108 #63c9d6 #29aaa1".split(" ")
    }], .5, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_FIRE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(7 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_wood_fire,
        x: 0,
        y: 0,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516", "#58645F", "#75827D"]
    }, {
        f: create_fire,
        x: 0,
        y: 0,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_FIRE] = create_craft_button(1, [{
        f: create_wood_fire,
        x: -2,
        y: -2,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516"]
    }, {
        f: create_fire,
        x: -2,
        y: -2,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#3ba578", "#4eb687", "#3da34d"], .8);
    sprite[SPRITE.CRAFT_BIG_FIRE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(7 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_big_fire_wood,
        x: -1,
        y: 0,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516", "#58645F", "#75827D", "#485548"]
    }, {
        f: create_fire,
        x: 0,
        y: 0,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_BIG_FIRE] = create_craft_button(1, [{
        f: create_big_fire_wood,
        x: -2,
        y: -1,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516", "#58645F", "#75827D", "#0c2c2e"]
    }, {
        f: create_fire,
        x: -2,
        y: -1,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#3ba578", "#4eb687", "#3da34d"], .8);
    sprite[SPRITE.INV_SWORD] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493d36", "#332b28", "#939393", "#5f6061"]
    }], .5, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_SWORD_GOLD] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .5, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_SWORD_DIAMOND] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .5, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_PICK_WOOD] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #4d2d14 #432516".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_PICK] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #939393 #5f6061".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_PICK_GOLD] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #493e26 #382e19 #c4bc51 #b29c32".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_PICK_DIAMOND] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #262114 #211108 #63c9d6 #29aaa1".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.INV_STONE] = create_craft_button(1, [{
        f: create_stone,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#252B28", "#58645F", "#75827D"]
    }], .23, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.INV_GOLD] = create_craft_button(1, [{
        f: create_gold,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#282823", "#877c2d", "#c4bc51"]
    }], .43, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.INV_DIAMOND] = create_craft_button(1, [{
        f: create_diamond,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#232828", "#3fc9c9", "#74ede6"]
    }], .33, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.INV_WOOD] = create_craft_button(1, [{
        f: create_wood_fire,
        x: 0,
        y: -5,
        a: 1,
        r: Math.PI / 2.5,
        c: ["#4d2d14", "#432516"]
    }], .3, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.EMPTY_SLOT] = create_craft_button(1, [], .3, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.INV_PLANT] = create_craft_button(1, [{
        f: create_food_plant,
        x: 0,
        y: -2,
        a: 1,
        r: 0
    }], .4, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.PLANT_SEED] = [];
    sprite[SPRITE.PLANT_SEED][SPRITE.DAY] = CTI(create_plant_seed(.9, !1, ["#7d613e", "#9e7e5a"]));
    sprite[SPRITE.PLANT_SEED][SPRITE.NIGHT] = CTI(create_plant_seed(.9, !1, ["#084442", "#125e5a"]));
    sprite[SPRITE.WORKBENCH] = [];
    sprite[SPRITE.WORKBENCH][SPRITE.DAY] = CTI(create_workbench(1.2, !0, "#0d1b1c #4d2d14 #432516 #756e52 #663f22 #9e9577".split(" ")));
    sprite[SPRITE.WORKBENCH][SPRITE.NIGHT] = CTI(create_workbench(1.2, !0, "#030d14 #0d2e33 #072322 #3e706b #123d3f #4e827c".split(" ")));
    sprite[SPRITE.CRAFT_WORK] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_workbench,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4d2d14 #432516 #756e52 #663f22 #9e9577".split(" ")
    }], .45, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_WORK] = create_craft_button(1, [{
        f: create_workbench,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4d2d14 #432516 #756e52 #663f22 #9e9577".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.INV_STONE_WALL] = create_craft_button(1, [{
        f: create_wall_stone,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .4, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.CRAFT_STONE_WALL] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_wall_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.WALL] = [];
    sprite[SPRITE.WALL][SPRITE.DAY] = CTI(create_wall(1, !0, "#0d1b1c #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")));
    sprite[SPRITE.WALL][SPRITE.NIGHT] = CTI(create_wall(1, !0, "#030d14 #0d2e33 #184747 #123b3f #0d2e33 #174444".split(" ")));
    sprite[SPRITE.DIAMOND_WALL] = [];
    sprite[SPRITE.DIAMOND_WALL][SPRITE.DAY] = CTI(create_wall_diamond(1, !0, "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")));
    sprite[SPRITE.DIAMOND_WALL][SPRITE.NIGHT] = CTI(create_wall_diamond(1, !0, "#030d14 #2b9390 #43b5af #43b5af #4bbcb4 #83ddd4 #59c9c0".split(" ")));
    sprite[SPRITE.INV_DIAMOND_WALL] = create_craft_button(1, [{
        f: create_wall_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .4, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.CRAFT_DIAMOND_WALL] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_wall_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.STONE_WALL] = [];
    sprite[SPRITE.STONE_WALL][SPRITE.DAY] = CTI(create_wall_stone(1, !0, "#0d1b1c #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")));
    sprite[SPRITE.STONE_WALL][SPRITE.NIGHT] = CTI(create_wall_stone(1, !0, "#030d14 #163a3a #214c4b #1f4948 #295957 #1f5955".split(" ")));
    sprite[SPRITE.GOLD_WALL] = [];
    sprite[SPRITE.GOLD_WALL][SPRITE.DAY] = CTI(create_wall_gold(1, !0, "#0d1b1c #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")));
    sprite[SPRITE.GOLD_WALL][SPRITE.NIGHT] = CTI(create_wall_gold(1, !0, "#030d14 #1f4948 #215e55 #1f6058 #2a7773 #2c7a70".split(" ")));
    sprite[SPRITE.INV_GOLD_WALL] = create_craft_button(1, [{
        f: create_wall_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .4, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.CRAFT_GOLD_WALL] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_wall_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CRAFT_WALL] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_wall,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .45, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_WALL] = create_craft_button(1, [{
        f: create_wall,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .45, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.SPIKE] = [];
    sprite[SPRITE.SPIKE][SPRITE.DAY] = CTI(create_spike(1, !0, "#0d1b1c #5f6061 #939393 #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")));
    sprite[SPRITE.SPIKE][SPRITE.NIGHT] = CTI(create_spike(1, !0, "#030d14 #1f343f #485e66 #0d2e33 #184747 #123b3f #0d2e33 #174444".split(" ")));
    sprite[SPRITE.CRAFT_SPIKE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spike,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_SPIKE] = create_craft_button(1, [{
        f: create_spike,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.GOLD_SPIKE] = [];
    sprite[SPRITE.GOLD_SPIKE][SPRITE.DAY] = CTI(create_spike_gold(1, !0, "#0d1b1c #69685a #9c9683 #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")));
    sprite[SPRITE.GOLD_SPIKE][SPRITE.NIGHT] = CTI(create_spike_gold(1, !0, "#030d14 #1a3732 #1e544c #1f4948 #215e55 #1f6058 #2a7773 #2c7a70".split(" ")));
    sprite[SPRITE.CRAFT_GOLD_SPIKE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spike_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_GOLD_SPIKE] = create_craft_button(1, [{
        f: create_spike_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DIAMOND_SPIKE] = [];
    sprite[SPRITE.DIAMOND_SPIKE][SPRITE.DAY] = CTI(create_spike_diamond(1, !0, "#0d1b1c #7d8b90 #9facaa #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")));
    sprite[SPRITE.DIAMOND_SPIKE][SPRITE.NIGHT] = CTI(create_spike_diamond(1, !0, "#030d14 #2c4b55 #546d77 #2b9390 #43b5af #43b5af #4bbcb4 #83ddd4 #59c9c0".split(" ")));
    sprite[SPRITE.CRAFT_DIAMOND_SPIKE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spike_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #7d8b90 #9facaa #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_DIAMOND_SPIKE] = create_craft_button(1, [{
        f: create_spike_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #7d8b90 #9facaa #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.STONE_SPIKE] = [];
    sprite[SPRITE.STONE_SPIKE][SPRITE.DAY] = CTI(create_spike_stone(1, !0, "#0d1b1c #6a7570 #939393 #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")));
    sprite[SPRITE.STONE_SPIKE][SPRITE.NIGHT] = CTI(create_spike_stone(1, !0, "#030d14 #1f343f #485e66 #163a3a #214c4b #1f4948 #295957 #1f5955".split(" ")));
    sprite[SPRITE.CRAFT_STONE_SPIKE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spike_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_STONE_SPIKE] = create_craft_button(1, [{
        f: create_spike_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DOOR_WOOD_CLOSE] = [];
    sprite[SPRITE.DOOR_WOOD_CLOSE][SPRITE.DAY] = CTI(create_door_wood(1.5, !0, "#0d1b1c #4c3b19 #574122 #644928 #574122 #735534".split(" ")));
    sprite[SPRITE.DOOR_WOOD_CLOSE][SPRITE.NIGHT] = CTI(create_door_wood(1.5, !0, "#030d14 #0d2e33 #184747 #123b3f #0d2e33 #174444".split(" ")));
    sprite[SPRITE.CRAFT_DOOR_WOOD_CLOSE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_door_wood,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3b19 #574122 #644928 #574122 #735534".split(" ")
    }], .6, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_DOOR_WOOD_CLOSE] = create_craft_button(1, [{
        f: create_door_wood,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3b19 #574122 #644928 #574122 #735534".split(" ")
    }], .6, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DOOR_WOOD_OPEN] = [];
    sprite[SPRITE.DOOR_WOOD_OPEN][SPRITE.DAY] = CTI(create_door_wood(1, !1, "#133a2b #133a2b #1a4935 #1a4935 #133a2b #1a4935".split(" ")));
    sprite[SPRITE.DOOR_WOOD_OPEN][SPRITE.NIGHT] = CTI(create_door_wood(1, !1, "#032428 #032428 #07393d #07393d #032428 #07393d".split(" ")));
    sprite[SPRITE.DOOR_STONE_CLOSE] = [];
    sprite[SPRITE.DOOR_STONE_CLOSE][SPRITE.DAY] = CTI(create_door_stone(1.5, !0, "#0d1b1c #6a7570 #939995 #9baaa3 #8a938e #adbcb5".split(" ")));
    sprite[SPRITE.DOOR_STONE_CLOSE][SPRITE.NIGHT] = CTI(create_door_stone(1.5, !0, "#030d14 #163a3a #214c4b #1f4948 #164542 #295957".split(" ")));
    sprite[SPRITE.CRAFT_DOOR_STONE_CLOSE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_door_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #8a938e #adbcb5".split(" ")
    }], .6, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_DOOR_STONE_CLOSE] = create_craft_button(1, [{
        f: create_door_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #8a938e #adbcb5".split(" ")
    }], .6, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DOOR_STONE_OPEN] = [];
    sprite[SPRITE.DOOR_STONE_OPEN][SPRITE.DAY] = CTI(create_door_stone(1, !1, "#133a2b #133a2b #1a4935 #1a4935 #133a2b #1a4935".split(" ")));
    sprite[SPRITE.DOOR_STONE_OPEN][SPRITE.NIGHT] = CTI(create_door_stone(1, !1, "#032428 #032428 #07393d #07393d #032428 #07393d".split(" ")));
    sprite[SPRITE.DOOR_GOLD_CLOSE] = [];
    sprite[SPRITE.DOOR_GOLD_CLOSE][SPRITE.DAY] = CTI(create_door_gold(1.5, !0, "#0d1b1c #877d36 #a08f47 #a7983c #9a8636 #c1b06b".split(" ")));
    sprite[SPRITE.DOOR_GOLD_CLOSE][SPRITE.NIGHT] = CTI(create_door_gold(1.5, !0, "#030d14 #1f4948 #215e55 #1f6058 #1f605c #2c7a70".split(" ")));
    sprite[SPRITE.CRAFT_DOOR_GOLD_CLOSE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_door_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #9a8636 #c1b06b".split(" ")
    }], .6, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_DOOR_GOLD_CLOSE] = create_craft_button(1, [{
        f: create_door_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #9a8636 #c1b06b".split(" ")
    }], .6, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DOOR_GOLD_OPEN] = [];
    sprite[SPRITE.DOOR_GOLD_OPEN][SPRITE.DAY] = CTI(create_door_gold(1, !1, "#133a2b #133a2b #1a4935 #1a4935 #133a2b #1a4935".split(" ")));
    sprite[SPRITE.DOOR_GOLD_OPEN][SPRITE.NIGHT] = CTI(create_door_gold(1, !1, "#032428 #032428 #07393d #07393d #032428 #07393d".split(" ")));
    sprite[SPRITE.DOOR_DIAMOND_CLOSE] = [];
    sprite[SPRITE.DOOR_DIAMOND_CLOSE][SPRITE.DAY] = CTI(create_door_diamond(1.5, !0, "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")));
    sprite[SPRITE.DOOR_DIAMOND_CLOSE][SPRITE.NIGHT] = CTI(create_door_diamond(1.5, !0, "#030d14 #2b9390 #43b5af #43b5af #4bbcb4 #83ddd4 #59c9c0".split(" ")));
    sprite[SPRITE.CRAFT_DOOR_DIAMOND_CLOSE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(4 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_door_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .6, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_DOOR_DIAMOND_CLOSE] = create_craft_button(1, [{
        f: create_door_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .6, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.DOOR_DIAMOND_OPEN] = [];
    sprite[SPRITE.DOOR_DIAMOND_OPEN][SPRITE.DAY] = CTI(create_door_diamond(1, !1, "#133a2b #133a2b #1a4935 #1a4935 #133a2b #1a4935".split(" ")));
    sprite[SPRITE.DOOR_DIAMOND_OPEN][SPRITE.NIGHT] = CTI(create_door_diamond(1, !1, "#032428 #032428 #07393d #07393d #032428 #07393d".split(" ")));
    sprite[SPRITE.CHEST] = [];
    sprite[SPRITE.CHEST][SPRITE.DAY] = CTI(create_chest(.5, !0, "#133a2b #9e8838 #c4a23a #4c3b19 #614627 #614627 #614627 #c4a23a #c4a23a #c4a23a".split(" ")));
    sprite[SPRITE.CHEST][SPRITE.NIGHT] = CTI(create_chest(.5, !0, "#032428 #266161 #2b6664 #123335 #1f5453 #1f5453 #1f5453 #2b6664 #2b6664 #2b6664".split(" ")));
    sprite[SPRITE.CRAFT_CHEST] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(6 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_chest,
        x: 0,
        y: 2,
        a: 1,
        r: 0,
        c: "#133a2b #9e8838 #c4a23a #4c3b19 #614627 #614627 #614627 #c4a23a #c4a23a #c4a23a".split(" ")
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_CHEST] = create_craft_button(1, [{
        f: create_chest,
        x: 0,
        y: 2,
        a: 1,
        r: 0,
        c: "#133a2b #9e8838 #c4a23a #4c3b19 #614627 #614627 #614627 #c4a23a #c4a23a #c4a23a".split(" ")
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.RABBIT] = [];
    sprite[SPRITE.RABBIT][SPRITE.DAY] = CTI(create_rabbit(.9, ["#0e3022", "#ee97bf", "#FFFFFF", "#000000", "#ffffff"]));
    sprite[SPRITE.RABBIT][SPRITE.NIGHT] = CTI(create_rabbit(.9, ["#030d14", "#4d1b59", "#5d3f77", "#220e26", "#ffffff"]));
    sprite[SPRITE.SPIDER] = [];
    sprite[SPRITE.SPIDER][SPRITE.DAY] = CTI(create_rotated_img(Math.PI, create_spider(.9, "#000000 #b7252c #b7252c #b7252c #FFFFFF #000000".split(" "))));
    sprite[SPRITE.SPIDER][SPRITE.NIGHT] = CTI(create_rotated_img(Math.PI, create_spider(.9, "#030d14 #401d49 #b7252c #401d49 #FFFFFF #000000".split(" "))));
    sprite[SPRITE.WEB] = CTI(create_web(.6, ["#FFFFFF"]));
    sprite[SPRITE.WOLF] = [];
    sprite[SPRITE.WOLF][SPRITE.DAY] = CTI(create_wolf(1.4, ["#0e3022", "#231f20", "#b7252c", "#b6222a", "#ffffff"]));
    sprite[SPRITE.WOLF][SPRITE.NIGHT] = CTI(create_wolf(1.4, ["#030d14", "#1e181c", "#462966", "#462966", "#ffffff"]));
    sprite[SPRITE.MEAT] = CTI(create_meat(1, !0, ["#dd5d57", "#ffffff", "#5e5d5e", "#ffffff"]));
    sprite[SPRITE.INV_MEAT] = create_craft_button(1, [{
        f: create_meat,
        x: 0,
        y: -3,
        a: 1,
        r: 0,
        c: ["#dd5d57", "#ffffff", "#5e5d5e", "#ffffff"]
    }], 1.4, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.COOKED_MEAT] = CTI(create_meat(1, !0, ["#602920", "#844f49", "#5e5d5e", "#d3ccc7"]));
    sprite[SPRITE.INV_COOKED_MEAT] = create_craft_button(1, [{
        f: create_meat,
        x: 0,
        y: -3,
        a: 1,
        r: 0,
        c: ["#602920", "#844f49", "#5e5d5e", "#d3ccc7"]
    }], 1.4, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.CRAFT_COOKED_MEAT] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(1.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_meat,
        x: 0,
        y: -5,
        a: 1,
        r: 0,
        c: ["#602920", "#844f49", "#5e5d5e", "#d3ccc7"]
    }], 1.4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CORD] = CTI(create_cord(1, !0, ["#cec0c4", "#ffffff", "#6d6768"]));
    sprite[SPRITE.INV_CORD] = create_craft_button(1, [{
        f: create_cord,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#cec0c4", "#ffffff", "#6d6768"]
    }], .9, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.FUR] = CTI(create_fur(1, !0, ["#ef96be", "#ffffff"]));
    sprite[SPRITE.INV_FUR] = create_craft_button(1, [{
        f: create_fur,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#ef96be", "#ffffff"]
    }], .5, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.FUR_WOLF] = CTI(create_fur(1, !0, ["#231f20", "#b6222a"]));
    sprite[SPRITE.INV_FUR_WOLF] = create_craft_button(1, [{
        f: create_fur,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#231f20", "#b6222a"]
    }], .5, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.EARMUFFS] = [];
    sprite[SPRITE.EARMUFFS][SPRITE.DAY] = CTI(create_earmuff(.6, !0, ["#f9efeb", "#dfd1cb", "#3e3c25", "#4d4a2e"]));
    sprite[SPRITE.EARMUFFS][SPRITE.NIGHT] = CTI(create_earmuff(.6, !0, ["#478e8b", "#327e73", "#073030", "#08403f"]));
    sprite[SPRITE.INV_EARMUFFS] = create_craft_button(1, [{
        f: create_earmuff,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#f9efeb", "#dfd1cb", "#3e3c25", "#4d4a2e"]
    }], .4, ["#3ba1a4", "#4eb0b6", "#3da39a"], .7);
    sprite[SPRITE.CRAFT_EARMUFFS] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_earmuff,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#f9efeb", "#dfd1cb", "#3e3c25", "#4d4a2e"]
    }], .4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.COAT] = [];
    sprite[SPRITE.COAT][SPRITE.DAY] = CTI(create_coat(.6, !0, ["#3e3c25", "#4d4a2e", "#f9efeb", "#dfd1cb"]));
    sprite[SPRITE.COAT][SPRITE.NIGHT] = CTI(create_coat(.6, !0, ["#073030", "#08403f", "#478e8b", "#327e73"]));
    sprite[SPRITE.INV_COAT] = create_craft_button(1, [{
        f: create_coat,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#3e3c25", "#4d4a2e", "#f9efeb", "#dfd1cb"]
    }], .4, ["#3ba1a4", "#4eb0b6", "#3da39a"], .7);
    sprite[SPRITE.CRAFT_COAT] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_coat,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#3e3c25", "#4d4a2e", "#f9efeb", "#dfd1cb"]
    }], .4, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.BANDAGE] = CTI(create_bandage(1, !1, ["#ffffff", "#cec0c4"]));
    sprite[SPRITE.CRAFT_BANDAGE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(5.5 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_bandage,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#ffffff", "#cec0c4"]
    }], .35, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_BANDAGE] = create_craft_button(1, [{
        f: create_bandage,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: ["#ffffff", "#cec0c4"]
    }], .35, ["#3ba578", "#4eb687", "#3da34d"], .7);
    sprite[SPRITE.BAG] = [];
    sprite[SPRITE.BAG][SPRITE.DAY] = CTI(create_bag(1, !1, ["#872f13", "#471e12"]));
    sprite[SPRITE.BAG][SPRITE.NIGHT] = CTI(create_bag(1, !1, ["#872f13", "#471e12"]));
    sprite[SPRITE.CRAFT_BAG] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(3 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_bag,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#872f13", "#471e12"]
    }], .7, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.INV_BAG] = create_craft_button(1, [{
        f: create_bag,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: ["#872f13", "#471e12"]
    }], .7, ["#3ba1a4", "#4eb0b6", "#3da39a"], .7);
    sprite[SPRITE.FURNACE_ON] = [];
    sprite[SPRITE.FURNACE_ON][SPRITE.DAY] = CTI(create_furnace_on(.5, !0, "#0d1b1c #939393 #5f6061 #c0c0c0 #ffad22 #fffdd5 #fee764".split(" ")));
    sprite[SPRITE.FURNACE_ON][SPRITE.NIGHT] = CTI(create_furnace_on(.5, !0, "#0d1b1c #485e66 #1f343f #60757d #ffdc73 #fffce2 #fef259".split(" ")));
    sprite[SPRITE.INV_FURNACE] = create_craft_button(1, [{
        f: create_furnace_on,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #939393 #5f6061 #c0c0c0 #ffad22 #fffdd5 #fee764".split(" ")
    }], .18, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.CRAFT_FURNACE] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(12 * c, "#918770")
        },
        x: 0,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_furnace_on,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #939393 #5f6061 #c0c0c0 #ffad22 #fffdd5 #fee764".split(" ")
    }], .18, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.FURNACE_OFF] = [];
    sprite[SPRITE.FURNACE_OFF][SPRITE.DAY] = CTI(create_furnace_off(.5, !0, "#0d1b1c #939393 #5f6061 #c0c0c0 #4f4f4f #6c6c6c #454545".split(" ")));
    sprite[SPRITE.FURNACE_OFF][SPRITE.NIGHT] = CTI(create_furnace_off(.5, !0, "#0d1b1c #485e66 #1f343f #60757d #152229 #0c1113 #0c1113".split(" ")));
    sprite[SPRITE.FURNACE_SLOT] = CTI(create_furnace_slot(.8, !0, ["#5f6061", "#939393"]));
    sprite[SPRITE.FURNACE_BUTTON] = create_craft_button(1, [{
        f: create_wood_fire,
        x: 0,
        y: 0,
        a: 1,
        r: Math.PI / 2.5,
        c: ["#4d2d14", "#432516"]
    }], .3, ["#494949", "#5b5858", "#3d3b3b"], 1);
    sprite[SPRITE.SPEAR] = [];
    sprite[SPRITE.SPEAR][SPRITE.DAY] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#0d1b1c", "#4d2d14", "#432516", "#939393", "#5f6061"])));
    sprite[SPRITE.SPEAR][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#0d1b1c", "#0d2e33", "#0b2326", "#485e66", "#1f343f"])));
    sprite[SPRITE.INV_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#4d2d14", "#432516", "#939393", "#5f6061"]
    }], .27, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.CRAFT_SPEAR] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(8 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#4d2d14", "#432516", "#939393", "#5f6061"]
    }], .27, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.GOLD_SPEAR] = [];
    sprite[SPRITE.GOLD_SPEAR][SPRITE.DAY] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"])));
    sprite[SPRITE.GOLD_SPEAR][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#030d14", "#263947", "#182935", "#43aa82", "#29997c"])));
    sprite[SPRITE.INV_GOLD_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .27, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.CRAFT_GOLD_SPEAR] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(8 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .27, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.DIAMOND_SPEAR] = [];
    sprite[SPRITE.DIAMOND_SPEAR][SPRITE.DAY] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"])));
    sprite[SPRITE.DIAMOND_SPEAR][SPRITE.NIGHT] = CTI(create_rotated_img(3, create_spear(.6, !0, ["#0d1b1c", "#111316", "#0a0b0c", "#73dde5", "#3dc4c0"])));
    sprite[SPRITE.INV_DIAMOND_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .27, ["#3ba578", "#4eb687", "#3da34d"], 1);
    sprite[SPRITE.CRAFT_DIAMOND_SPEAR] = create_craft_button(1, [{
        f: function(c) {
            return create_gear(8 * c, "#918770")
        },
        x: 2,
        y: 0,
        a: .3,
        r: 0
    }, {
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .27, ["#756e52", "#898064", "#685b40"], .8);
    sprite[SPRITE.CHEST_SEED] = create_craft_button(1, [{
        f: create_seed,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#756e52", "#898064", "#685b40"]
    }], .7, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_FIRE] = create_craft_button(1, [{
        f: create_wood_fire,
        x: -2,
        y: -2,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516"]
    }, {
        f: create_fire,
        x: -2,
        y: -2,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#968e55", "#b1a868", "#888046"], .8);
    sprite[SPRITE.CHEST_BIG_FIRE] = create_craft_button(1, [{
        f: create_big_fire_wood,
        x: -2,
        y: -1,
        a: 1,
        r: -Math.PI / 7,
        c: ["#4d2d14", "#432516", "#58645F", "#75827D", "#0c2c2e"]
    }, {
        f: create_fire,
        x: -2,
        y: -1,
        a: 1,
        r: -Math.PI / 7,
        c: ["#efd435", "#ec8d35", "#e96132"]
    }], .3, ["#968e55", "#b1a868", "#888046"], .8);
    sprite[SPRITE.CHEST_SWORD] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493d36", "#332b28", "#939393", "#5f6061"]
    }], .5, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_SWORD_GOLD] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .5, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_SWORD_DIAMOND] = create_craft_button(1, [{
        f: create_sword,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .5, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_PICK_WOOD] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #4d2d14 #432516".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_PICK] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #4d2d14 #432516 #939393 #5f6061".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_PICK_GOLD] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #493e26 #382e19 #c4bc51 #b29c32".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_PICK_DIAMOND] = create_craft_button(1, [{
        f: create_pickaxe,
        x: -2,
        y: 5,
        a: 1,
        r: -Math.PI / 5,
        c: "#0d1b1c #000000 #0d1b1c #262114 #211108 #63c9d6 #29aaa1".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_STONE] = create_craft_button(1, [{
        f: create_stone,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#252B28", "#58645F", "#75827D"]
    }], .23, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_GOLD] = create_craft_button(1, [{
        f: create_gold,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#282823", "#877c2d", "#c4bc51"]
    }], .43, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DIAMOND] = create_craft_button(1, [{
        f: create_diamond,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#232828", "#3fc9c9", "#74ede6"]
    }], .33, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_WOOD] = create_craft_button(1, [{
        f: create_wood_fire,
        x: 0,
        y: -5,
        a: 1,
        r: Math.PI / 2.5,
        c: ["#4d2d14", "#432516"]
    }], .3, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_PLANT] = create_craft_button(1, [{
        f: create_food_plant,
        x: 0,
        y: -2,
        a: 1,
        r: 0
    }], .4, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_WORKBENCH] = create_craft_button(1, [{
        f: create_workbench,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4d2d14 #432516 #756e52 #663f22 #9e9577".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_STONE_WALL] = create_craft_button(1, [{
        f: create_wall_stone,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DIAMOND_WALL] = create_craft_button(1, [{
        f: create_wall_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_GOLD_WALL] = create_craft_button(1, [{
        f: create_wall_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_WALL] = create_craft_button(1, [{
        f: create_wall,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .45, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_SPIKE] = create_craft_button(1, [{
        f: create_spike,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #4c3a15 #634828 #564021 #634828 #4c3a15".split(" ")
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_MEAT] = create_craft_button(1, [{
        f: create_meat,
        x: 0,
        y: -3,
        a: 1,
        r: 0,
        c: ["#dd5d57", "#ffffff", "#5e5d5e", "#ffffff"]
    }], 1.4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_COOKED_MEAT] = create_craft_button(1, [{
        f: create_meat,
        x: 0,
        y: -3,
        a: 1,
        r: 0,
        c: ["#602920", "#844f49", "#5e5d5e", "#d3ccc7"]
    }], 1.4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_CORD] = create_craft_button(1, [{
        f: create_cord,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#cec0c4", "#ffffff", "#6d6768"]
    }], .9, ["#9e8838", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_BANDAGE] = create_craft_button(1, [{
        f: create_bandage,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: ["#ffffff", "#cec0c4"]
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DOOR_WOOD_CLOSE] = create_craft_button(1, [{
        f: create_door_wood,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #4c3b19 #574122 #644928 #574122 #735534".split(" ")
    }], .6, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_CHEST] = create_craft_button(1, [{
        f: create_chest,
        x: 0,
        y: 2,
        a: 1,
        r: 0,
        c: "#133a2b #9e8838 #c4a23a #4c3b19 #614627 #614627 #614627 #c4a23a #c4a23a #c4a23a".split(" ")
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_SLOT] = CTI(create_chest_slot(.8, !0, ["#4c3b19", "#c4a23a", "#c4a23a", "#c4a23a"]));
    sprite[SPRITE.CHEST_PLUS] = create_craft_button(.5, [{
        f: create_plus_chest,
        x: 0,
        y: 2,
        a: 1,
        r: 0,
        c: ["#ffffff"]
    }], .16, ["#c4a23a", "#d0ad41", "#b89733"], .9);
    sprite[SPRITE.CHEST_STONE_SPIKE] = create_craft_button(1, [{
        f: create_spike_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #6a7570 #939995 #9baaa3 #adbcb5 #8a938e".split(" ")
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_GOLD_SPIKE] = create_craft_button(1, [{
        f: create_spike_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5f6061 #939393 #877d36 #a08f47 #a7983c #b29e4d #c1b06b".split(" ")
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DIAMOND_SPIKE] = create_craft_button(1, [{
        f: create_spike_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #7d8b90 #9facaa #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .35, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_BAG] = create_craft_button(1, [{
        f: create_bag,
        x: -2,
        y: -2,
        a: 1,
        r: 0,
        c: ["#872f13", "#471e12"]
    }], .7, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_FUR] = create_craft_button(1, [{
        f: create_fur,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#ef96be", "#ffffff"]
    }], .5, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_FUR_WOLF] = create_craft_button(1, [{
        f: create_fur,
        x: -3,
        y: -3,
        a: 1,
        r: 0,
        c: ["#231f20", "#b6222a"]
    }], .5, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_EARMUFFS] = create_craft_button(1, [{
        f: create_earmuff,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#f9efeb", "#dfd1cb", "#3e3c25", "#4d4a2e"]
    }], .4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DOOR_STONE_CLOSE] = create_craft_button(1, [{
        f: create_door_stone,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #6a7570 #939995 #9baaa3 #8a938e #adbcb5".split(" ")
    }], .6, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DOOR_GOLD_CLOSE] = create_craft_button(1, [{
        f: create_door_gold,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #877d36 #a08f47 #a7983c #9a8636 #c1b06b".split(" ")
    }], .6, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_DOOR_DIAMOND_CLOSE] = create_craft_button(1, [{
        f: create_door_diamond,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #5cc5ce #89d1d4 #86d0d1 #95d5d8 #e0f2f6 #b3e0e3".split(" ")
    }], .6, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_COAT] = create_craft_button(1, [{
        f: create_coat,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: ["#3e3c25", "#4d4a2e", "#f9efeb", "#dfd1cb"]
    }], .4, ["#968e55", "#b1a868", "#888046"], .7);
    sprite[SPRITE.CHEST_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#4d2d14", "#432516", "#939393", "#5f6061"]
    }], .27, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_GOLD_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#493e26", "#382e19", "#c4bc51", "#b29c32"]
    }], .27, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_DIAMOND_SPEAR] = create_craft_button(1, [{
        f: create_spear,
        x: 2,
        y: 0,
        a: 1,
        r: Math.PI / 5,
        c: ["#0d1b1c", "#262114", "#211108", "#63c9d6", "#29aaa1"]
    }], .27, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.CHEST_FURNACE] = create_craft_button(1, [{
        f: create_furnace_on,
        x: 0,
        y: 0,
        a: 1,
        r: 0,
        c: "#0d1b1c #939393 #5f6061 #c0c0c0 #ffad22 #fffdd5 #fee764".split(" ")
    }], .18, ["#968e55", "#b1a868", "#888046"], 1);
    sprite[SPRITE.HURT_WOLF] = CTI(create_hurt_wolf(1.4, "#BB0000"));
    sprite[SPRITE.HURT_SPIDER] = CTI(create_rotated_img(Math.PI, create_hurt_spider(.9, "#BB0000")));
    sprite[SPRITE.FIR_SMALL] = [];
    sprite[SPRITE.FIR_SMALL][SPRITE.DAY] = CTI(create_fir_one(1.2, "#191919 #134d35 #247349 #cde7d6 #122d1c #e3eee7".split(" ")));
    sprite[SPRITE.FIR_SMALL][SPRITE.NIGHT] = CTI(create_fir_one(1.2, ["#FFFFFF", "#000000", "#FFFFFF", "#000000"]));
    sprite[SPRITE.FIR_MEDIUM] = [];
    sprite[SPRITE.FIR_MEDIUM][SPRITE.DAY] = CTI(create_fir_two(1.2, "#191919 #134d35 #247349 #cde7d6 #122d1c #e3eee7".split(" ")));
    sprite[SPRITE.FIR_MEDIUM][SPRITE.NIGHT] = CTI(create_fir_two(1.2, ["#FFFFFF", "#000000", "#FFFFFF", "#000000"]));
    sprite[SPRITE.FIR_HUGH] = [];
    sprite[SPRITE.FIR_HUGH][SPRITE.DAY] = CTI(create_fir_three(1, "#0a2d18 #124c34 #227248 #ccedd9 #0a2d18 #2d7a55 #3c9660 #afddc1 #bbefd0 #0a2d18 #e4efe8".split(" ")));
    sprite[SPRITE.FIR_HUGH][SPRITE.NIGHT] = CTI(create_fir_three(1, ["#FFFFFF", "#000000", "#FFFFFF", "#000000"]));
    sprite[SPRITE.STONES_WINTER] = [];
    sprite[SPRITE.STONES_WINTER][SPRITE.DAY] = [];
    sprite[SPRITE.STONES_WINTER][SPRITE.NIGHT] = [];
    sprite[SPRITE.STONES_WINTER][SPRITE.DAY].push(CTI(create_stone(1.1, !1, ["#0a2d18", "#c3d1cb", "#e4efe8"])));
    sprite[SPRITE.STONES_WINTER][SPRITE.DAY].push(CTI(create_stone(.9, !1, ["#0a2d18", "#c3d1cb", "#e4efe8"])));
    sprite[SPRITE.STONES_WINTER][SPRITE.DAY].push(CTI(create_stone(.6, !1, ["#0a2d18", "#c3d1cb", "#e4efe8"])));
    sprite[SPRITE.STONES_WINTER][SPRITE.NIGHT].push(CTI(create_stone(1.1, !1, ["#0a2728", "#3c8e88", "#40a39b"])));
    sprite[SPRITE.STONES_WINTER][SPRITE.NIGHT].push(CTI(create_stone(.9, !1, ["#0a2728", "#3c8e88", "#40a39b"])));
    sprite[SPRITE.STONES_WINTER][SPRITE.NIGHT].push(CTI(create_stone(.6, !1, ["#0a2728", "#3c8e88", "#40a39b"])));
    sprite[SPRITE.GOLD_WINTER] = [];
    sprite[SPRITE.GOLD_WINTER][SPRITE.DAY] = [];
    sprite[SPRITE.GOLD_WINTER][SPRITE.NIGHT] = [];
    sprite[SPRITE.GOLD_WINTER][SPRITE.DAY].push(CTI(create_gold(1.5, !1, ["#2b280a", "#ddcf8a", "#f4efc6"])));
    sprite[SPRITE.GOLD_WINTER][SPRITE.DAY].push(CTI(create_gold(1.3, !1, ["#2b280a", "#ddcf8a", "#f4efc6"])));
    sprite[SPRITE.GOLD_WINTER][SPRITE.DAY].push(CTI(create_gold(1.1, !1, ["#2b280a", "#ddcf8a", "#f4efc6"])));
    sprite[SPRITE.GOLD_WINTER][SPRITE.NIGHT].push(CTI(create_gold(1.5, !1, ["#0a2728", "#3e8989", "#50a09c"])));
    sprite[SPRITE.GOLD_WINTER][SPRITE.NIGHT].push(CTI(create_gold(1.3, !1, ["#0a2728", "#3e8989", "#50a09c"])));
    sprite[SPRITE.GOLD_WINTER][SPRITE.NIGHT].push(CTI(create_gold(1.1, !1, ["#0a2728", "#3e8989", "#50a09c"])));
    sprite[SPRITE.DIAMOND_WINTER] = [];
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.DAY] = [];
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.NIGHT] = [];
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.DAY].push(CTI(create_diamond(1.1, !1, ["#123d38", "#70e0dd", "#95efea"])));
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.DAY].push(CTI(create_diamond(.9, !1, ["#123d38", "#70e0dd", "#95efea"])));
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.DAY].push(CTI(create_diamond(.7, !1, ["#123d38", "#70e0dd", "#95efea"])));
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.NIGHT].push(CTI(create_diamond(1.1, !1, ["#123d38", "#47b2ac", "#5cccc4"])));
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.NIGHT].push(CTI(create_diamond(.9, !1, ["#123d38", "#47b2ac", "#5cccc4"])));
    sprite[SPRITE.DIAMOND_WINTER][SPRITE.NIGHT].push(CTI(create_diamond(.7, !1, ["#123d38", "#47b2ac", "#5cccc4"])));
    sprite[SPRITE.AMETHYST] = [];
    sprite[SPRITE.AMETHYST][SPRITE.DAY] = CTI(create_amethyst(.9, !1, ["#1d051e", "#c27add", "#cd98e5"]));
    sprite[SPRITE.AMETHYST][SPRITE.NIGHT] = CTI(create_amethyst(.9, !1, ["#123d38", "#195f66", "#33a8a8"]));
    sprite[SPRITE.AMETHYST][SPRITE.DAY] = CTI(create_amethyst(1.1, !1, ["#1d051e", "#c27add", "#cd98e5"]));
    sprite[SPRITE.AMETHYST][SPRITE.NIGHT] = CTI(create_amethyst(1.1, !1, ["#123d38", "#195f66", "#33a8a8"]));
    sprite[SPRITE.AMETHYST][SPRITE.DAY] = CTI(create_amethyst(.7, !1, ["#1d051e", "#c27add", "#cd98e5"]));
    sprite[SPRITE.AMETHYST][SPRITE.NIGHT] = CTI(create_amethyst(.7, !1, ["#123d38", "#195f66", "#33a8a8"]));
    sprite[SPRITE.INV_AMETHYST] = create_craft_button(1, [{
        f: create_amethyst,
        x: -5,
        y: -5,
        a: 1,
        r: 0,
        c: ["#1d051e", "#c27add", "#cd98e5"]
    }], .31, ["#2b5c48", "#2b5c48", "#2b5c48"], .7);
    sprite[SPRITE.GROUND_FIRE_WINTER] = [];
    sprite[SPRITE.GROUND_FIRE_WINTER][SPRITE.DAY] = CTI(create_ground_fire(.9, !1, ["#a3c9bd"]));
    sprite[SPRITE.GROUND_FIRE_WINTER][SPRITE.NIGHT] = CTI(create_ground_fire(.9, !1, ["#1b6d6d"]));
    sprite[SPRITE.MINIMAP] = [];
    sprite[SPRITE.MINIMAP][SPRITE.DAY] = CTI(create_minimap(1, "#0d1c16 #54318e #6e7773 #6e7773 #6e7773 #124c34 #133a2b #133a2b #133a2b #133a2b #a8962c #a8962c #a8962c #3fc9c9 #3fc9c9 #3fc9c9 #0d1c16".split(" ")));
    sprite[SPRITE.MINIMAP][SPRITE.NIGHT] = CTI(create_minimap(1, "#021314 #2f195e #245655 #245655 #245655 #032625 #0b3534 #0b3534 #0b3534 #0b3534 #225150 #225150 #225150 #2b9390 #2b9390 #2b9390 #021314".split(" ")));
    sprite[SPRITE.HURT_RABBIT] = CTI(create_hurt_rabbit(.9, "#BB0000"));
    sprite[SPRITE.HURT] = CTI(create_hurt_player(.6, "#BB0000"));
    sprite[SPRITE.COLD] = CTI(create_hurt_player(.6, "#1CE7E0"));
    sprite[SPRITE.HUNGER] = CTI(create_hurt_player(.6, "#DBE71C"));
    sprite[SPRITE.HEAL] = CTI(create_hurt_player(.6, "#00BB00"));
    sprite[SPRITE.GAUGES] = CTI(create_gauges(1));
    sprite[SPRITE.LEADERBOARD] = CTI(create_leaderboard(1));
    sprite[SPRITE.COUNTER] = [];
    sprite[SPRITE.PLAY] = create_button([{
        text: "PLAY",
        size: 30,
        font: "Baloo Paaji",
        w: 150,
        h: 60,
        lw: 4,
        r: 10,
        bg: "#096D41",
        fg: "#096D41",
        color: "#FFF"
    }, {
        text: "PLAY",
        size: 30,
        font: "Baloo Paaji",
        w: 150,
        h: 60,
        lw: 4,
        r: 10,
        bg: "#002211",
        fg: "#002211",
        color: "#FFF"
    }, {
        text: "PLAY",
        size: 30,
        font: "Baloo Paaji",
        w: 150,
        h: 60,
        lw: 4,
        r: 10,
        bg: "#000000",
        fg: "#000000",
        color: "#FFF"
    }]);
    sprite[SPRITE.AUTO_FEED] = create_text(1, "Auto-Feed", 25, "#FFF", void 0, void 0, "#000", 5, 140)
}
function init_fake_world() {
    document.getElementById("game_body").style.backgroundColor = SPRITE.GROUND[fake_world.time];
    fake_world.items.push(new Item(ITEMS.FIRE,0,0,0,0,Math.random() * Math.PI * 2,0,0));
    fake_world.items.push(new Item(ITEMS.FRUIT,0,0,0,0,0,0,5));
    fake_world.items.push(new Item(ITEMS.WORKBENCH,0,0,0,0,Math.PI / 4,0,0));
    fake_world.items.push(new Item(ITEMS.FRUIT,0,0,0,0,0,0,5))
}
function draw_fake_world() {
    var c = fake_world.time;
    sprite[SPRITE.HERB] && (ctx.drawImage(sprite[SPRITE.HERB][c][1], canw2 + 480, canh2 + 190),
    ctx.drawImage(sprite[SPRITE.HERB][c][2], canw2 + 180, canh2 - 430),
    ctx.drawImage(sprite[SPRITE.HERB][c][1], canw2 - 855, canh2 + 100),
    ctx.drawImage(sprite[SPRITE.HERB][c][0], canw2 - 550, canh2 - 300),
    ctx.drawImage(sprite[SPRITE.HERB][c][0], canw2 - 1020, canh2 - 520));
    sprite[SPRITE.STONES] && (ctx.drawImage(sprite[SPRITE.STONES][c][1], canw2 - 80, canh2 - 640),
    ctx.drawImage(sprite[SPRITE.STONES][c][1], canw2 + 80, canh2 + 490),
    ctx.drawImage(sprite[SPRITE.STONES][c][2], canw2 - 180, canh2 - 700),
    ctx.drawImage(sprite[SPRITE.STONES][c][0], canw2 + 550, canh2 + 100),
    ctx.drawImage(sprite[SPRITE.STONES][c][1], canw2 + 450, canh2 + 300),
    ctx.drawImage(sprite[SPRITE.STONES][c][1], canw2 + 780, canh2 + 300),
    ctx.drawImage(sprite[SPRITE.STONES][c][2], canw2 + 980, canh2 + 200),
    ctx.drawImage(sprite[SPRITE.STONES][c][2], canw2 + 680, canh2 + 600),
    ctx.drawImage(sprite[SPRITE.STONES][c][2], canw2 - 380, canh2 + 100),
    ctx.drawImage(sprite[SPRITE.STONES][c][2], canw2 + 280, canh2 + 250));
    sprite[SPRITE.PLANT] && (ctx.drawImage(sprite[SPRITE.PLANT][c], canw2 - 590, canh2),
    ctx.drawImage(sprite[SPRITE.PLANT][c], canw2 + 120, canh2 - 390),
    ctx.drawImage(sprite[SPRITE.PLANT][c], canw2 - 270, canh2 + 340));
    sprite[SPRITE.TREE] && (ctx.drawImage(sprite[SPRITE.TREE][c][5], canw2 - 700, canh2 - 600),
    ctx.drawImage(sprite[SPRITE.TREE][c][5], canw2 - 970, canh2 - 250),
    ctx.drawImage(sprite[SPRITE.TREE][c][5], canw2 - 720, canh2 - 200),
    ctx.drawImage(sprite[SPRITE.TREE][c][3], canw2 - 1020, canh2 + 340),
    ctx.drawImage(sprite[SPRITE.TREE][c][3], canw2 - 1120, canh2 - 0),
    ctx.drawImage(sprite[SPRITE.TREE][c][2], canw2 - 630, canh2 - 300),
    ctx.drawImage(sprite[SPRITE.TREE][c][5], canw2 - 495, canh2 - 90),
    ctx.drawImage(sprite[SPRITE.TREE][c][4], canw2 - 520, canh2 + 340),
    ctx.drawImage(sprite[SPRITE.TREE][c][2], canw2 + 830, canh2 - 520));
    if (user && world) {
        var c = user.cam.x
          , g = user.cam.y;
        user.cam.x = canw2;
        user.cam.y = canh2;
        var f = world.time;
        world.time = fake_world.time;
        var d = fake_world.items;
        d[2].x = 400;
        d[2].y = 100;
        d[2].draw(SPRITE.WORKBENCH);
        var e = d[1];
        e.x = -500;
        e.y = 100;
        e.fruits[0].x = e.x - 20.5;
        e.fruits[0].y = e.y - 22.5;
        e.fruits[1].x = e.x - 35.5;
        e.fruits[1].y = e.y + 7.5;
        e.fruits[2].x = e.x + 7.5;
        e.fruits[2].y = e.y - 30;
        e.fruits[3].x = e.x + 22.5;
        e.fruits[3].y = e.y;
        e.fruits[4].x = e.x - 7.5;
        e.fruits[4].y = e.y + 14.5;
        for (var m = 0; m < e.info; m++)
            e.fruits[m].draw(SPRITE.FRUIT);
        e = d[3];
        e.x = 210;
        e.y = -290;
        e.fruits[0].x = e.x - 20.5;
        e.fruits[0].y = e.y - 22.5;
        e.fruits[1].x = e.x - 35.5;
        e.fruits[1].y = e.y + 7.5;
        e.fruits[2].x = e.x + 7.5;
        e.fruits[2].y = e.y - 30;
        e.fruits[3].x = e.x + 22.5;
        e.fruits[3].y = e.y;
        e.fruits[4].x = e.x - 7.5;
        e.fruits[4].y = e.y + 14.5;
        for (m = 0; m < e.info; m++)
            e.fruits[m].draw(SPRITE.FRUIT);
        d[0].x = 450;
        d[0].y = -100;
        d[0].draw_bg(SPRITE.WOOD_FIRE);
        d[0].draw_fg();
        user.cam.x = c;
        user.cam.y = g;
        world.time = f
    }
}
function draw_amount(c, g) {
    sprite[SPRITE.COUNTER][c] || (sprite[SPRITE.COUNTER][c] = create_text(scale, "x" + c, 20, "#FFF"));
    var f = sprite[SPRITE.COUNTER][c]
      , d = g.info.translate.x + g.info.img[0].width - f.width - 5 * scale
      , e = g.info.translate.y + g.info.img[0].height - f.height - 5 * scale;
    g.info.state == BUTTON_CLICK && (e += 5 * scale);
    ctx.drawImage(f, d, e)
}
function draw_furnace_inventory() {
    user.furnace.amount = 0;
    user.furnace.open = !1;
    var c = world.fast_units[user.uid]
      , g = WORLD.DIST_FURNACE;
    if (c) {
        for (var f = 0; f < world.units[ITEMS.FURNACE].length; f++) {
            var d = world.units[ITEMS.FURNACE][f]
              , e = Utils.dist(d, c);
            e < g && (g = e,
            user.furnace.open = !0,
            user.furnace.amount = d.info,
            user.furnace.pid = d.pid,
            user.furnace.iid = d.id)
        }
        g < WORLD.DIST_FURNACE && (g = sprite[SPRITE.FURNACE_SLOT],
        c = game.furnace_button,
        ctx.drawImage(g, Math.floor(c.info.translate.x + (c.info.img[0].width - g.width) / 2), Math.floor(c.info.translate.y + (c.info.img[0].height - g.height) / 2) + 3),
        0 < user.furnace.amount && (c.draw(ctx),
        g = user.furnace.amount,
        1 < g && draw_amount(g, c)))
    }
}
function draw_chest_inventory() {
    user.chest.id = -1;
    user.chest.open = !1;
    var c = world.fast_units[user.uid]
      , g = WORLD.DIST_CHEST;
    if (c) {
        for (var f = 0; f < world.units[ITEMS.CHEST].length; f++) {
            var d = world.units[ITEMS.CHEST][f]
              , e = Utils.dist(d, c);
            e < g && (g = e,
            user.chest.open = !0,
            user.chest.id = 1 >= d.action ? -1 : Math.floor(d.action / 2) - 1,
            user.chest.amount = d.info,
            user.chest.pid = d.pid,
            user.chest.iid = d.id)
        }
        for (f = 0; f < world.units[ITEMS.FURNACE].length; f++)
            if (e = Utils.dist(world.units[ITEMS.FURNACE][f], c),
            e < g) {
                g = WORLD.DIST_CHEST;
                user.chest.open = !1;
                user.chest.id = -1;
                break
            }
        g < WORLD.DIST_CHEST && (g = sprite[SPRITE.CHEST_SLOT],
        c = game.chest_buttons[0],
        ctx.drawImage(g, Math.floor(c.info.translate.x + (c.info.img[0].width - g.width) / 2), Math.floor(c.info.translate.y + (c.info.img[0].height - g.height) / 2) + 3),
        0 <= user.chest.id && (c = game.chest_buttons[user.chest.id],
        c.draw(ctx),
        g = user.chest.amount,
        1 < g && draw_amount(g, c)))
    }
}
function draw_minimap() {
    var c = game.minimap;
    ctx.globalAlpha = .8;
    ctx.drawImage(sprite[SPRITE.MINIMAP][world.time], c.translate.x, c.translate.y);
    ctx.globalAlpha = 1;
    var g = world.fast_units[user.uid];
    g && (ctx.fillStyle = "#fff",
    circle(ctx, c.translate.x + (.018 * g.x + 12) * scale, c.translate.y + (.018 * g.y + 8) * scale, 4 * scale),
    ctx.fill())
}
function draw_auto_feed() {
    user.auto_feed.enabled && ctx.drawImage(sprite[SPRITE.AUTO_FEED], user.auto_feed.translate.x, user.auto_feed.translate.y)
}
function draw_leaderboard() {
    var c = user.ldb
      , g = game.leaderboard;
    if (c.update) {
        c.update = !1;
        var c = c.ids
          , f = g.ctx
          , d = world.players
          , e = !1;
        f.clearRect(0, 0, g.can.width, g.can.height);
        f.drawImage(g.img, 0, 0);
        for (var m = 0; m < c.length; m++) {
            var n = d[c[m]];
            c[m] == user.id ? (e = !0,
            color = "#FFF") : color = "#A1BDCD";
            f.drawImage(create_text(scale, "" + (m + 1), 15 * scale, color), 20 * scale, (40 + 22 * m) * scale);
            n.ldb_label || (n.ldb_label = create_text(scale, n.nickname, 15 * scale, color, void 0, void 0, void 0, void 0, 110 * scale));
            f.drawImage(n.ldb_label, 39 * scale, (40 + 22 * m) * scale);
            f.drawImage(create_text(scale, Utils.simplify_number(n.score), 15 * scale, color), 156 * scale, (40 + 22 * m) * scale)
        }
        e || (f.drawImage(sprite[SPRITE.YOUR_SCORE], 15 * scale, (46 + 22 * m) * scale),
        f.drawImage(create_text(scale, Utils.simplify_number(world.players[user.id].score), 15 * scale, "#FFF"), 100 * scale, (46 + 22 * m) * scale))
    }
    ctx.drawImage(g.can, g.translate.x, g.translate.y)
}
function draw_ui_crafting() {
    var c = user.craft;
    if (!c.crafting && 0 < c.preview) {
        var g = world.fast_units[user.uid];
        ctx.save();
        ctx.translate(user.cam.x + g.x, user.cam.y + g.y);
        ctx.rotate(g.angle);
        g = sprite[c.preview][world.time];
        ctx.globalAlpha = .5;
        ctx.drawImage(g, 120 * scale + -g.width / 2, -g.height / 2);
        ctx.globalAlpha = 1;
        ctx.restore()
    }
    if (c.crafting) {
        var f = c.timeout.update()
          , g = world.fast_units[user.uid];
        ctx.save();
        ctx.translate(user.cam.x + g.x, user.cam.y + g.y);
        var g = sprite[SPRITE.GEAR]
          , d = -g.height / 2 - 125 * scale;
        ctx.drawImage(g, -g.width / 2, d);
        ctx.beginPath();
        ctx.lineWidth = 5 * scale;
        ctx.strokeStyle = SPRITE.CRAFT_LOADING[world.time];
        ctx.lineCap = "round";
        ctx.arc(0, d + g.height / 2, 25 * scale, 0, 2 * Math.PI * c.timeout.v);
        ctx.stroke();
        ctx.restore();
        for (g = 0; g < c.can_craft.length; g++) {
            d = c.can_craft[g];
            if (c.id == d.id) {
                var e = 53 * scale;
                round_rect(ctx, d.info.translate.x, d.info.translate.y + e * (1 - c.timeout.v), d.info.img[0].width, e * c.timeout.v + 17 * scale, 10 * scale);
                ctx.fillStyle = "#55B973";
                ctx.fill();
                ctx.globalAlpha = .8
            } else
                ctx.globalAlpha = .5;
            d.draw(ctx);
            ctx.globalAlpha = 1
        }
        f && (c.crafting = !1,
        c.timeout.v = 0,
        c.timeout.o = !1)
    } else
        for (g = 0; g < c.can_craft.length; g++)
            c.can_craft[g].draw(ctx)
}
function draw_ui_inventory() {
    for (var c = user.inv, g = world.fast_units[user.uid], f = 0; f < c.can_select.length; f++) {
        var d = c.can_select[f];
        c.id == d.id || g && g.clothe == d.id ? ctx.drawImage(d.info.img[2], d.info.translate.x, d.info.translate.y) : d.draw(ctx);
        var e = user.inv.n[d.id];
        1 < e && draw_amount(e, d);
        e = user.chest;
        e.open && (0 > e.id || e.id == d.id) && game.plus_buttons[d.id].draw(ctx);
        user.furnace.open && INV.WOOD == d.id && game.plus_buttons[d.id].draw(ctx)
    }
    if (d && f < c.max)
        for (g = sprite[SPRITE.EMPTY_SLOT][2],
        x = d.info.translate.x,
        y = d.info.translate.y,
        j = 1; f < c.max; f++,
        j++)
            ctx.drawImage(g, x + j * (g.width + 10), y)
}
function draw_gauges() {
    .25 > user.gauges.life.x && (ctx.globalAlpha = user.gauges.warn_life.v);
    ctx.fillStyle = "#69A148";
    ctx.fillRect(this.translate.x + 66 * scale, this.translate.y + 17 * scale, 247 * user.gauges.life.x * scale, 16 * scale);
    ctx.globalAlpha = 1;
    .25 > user.gauges.hunger.x && (ctx.fillStyle = "#8F050A",
    ctx.globalAlpha = user.gauges.warn_hunger.v,
    ctx.fillRect(this.translate.x + 66 * scale, this.translate.y + 52 * scale, 247 * scale, 16 * scale),
    ctx.globalAlpha = 1);
    ctx.fillStyle = "#AF352A";
    ctx.fillRect(this.translate.x + 66 * scale, this.translate.y + 52 * scale, 247 * user.gauges.hunger.x * scale, 16 * scale);
    .25 > user.gauges.cold.x && (ctx.fillStyle = "#366B91",
    ctx.globalAlpha = user.gauges.warn_cold.v,
    ctx.fillRect(this.translate.x + 66 * scale, this.translate.y + 87 * scale, 247 * scale, 16 * scale),
    ctx.globalAlpha = 1);
    ctx.fillStyle = "#669BB1";
    ctx.fillRect(this.translate.x + 66 * scale, this.translate.y + 87 * scale, 247 * user.gauges.cold.x * scale, 16 * scale);
    ctx.drawImage(this.img, this.translate.x, this.translate.y)
}
function draw_door(c) {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    if (this.hit.update) {
        this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1);
        var g = (1 - this.hit.anim.v) * delta * 600 * scale
          , f = Math.cos(this.hit.angle - this.angle) * g
          , g = Math.sin(this.hit.angle - this.angle) * g
    } else
        g = f = 0;
    c = sprite[c][world.time];
    w = -c.width;
    h = -c.height;
    ctx.drawImage(c, -w / 2 + f, -h / 2 + g, w, h);
    ctx.restore()
}
function draw_simple_item(c) {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    if (this.hit.update) {
        this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1);
        var g = (1 - this.hit.anim.v) * delta * 600 * scale
          , f = Math.cos(this.hit.angle - this.angle) * g
          , g = Math.sin(this.hit.angle - this.angle) * g
    } else
        g = f = 0;
    img = sprite[c][world.time];
    w = -img.width;
    h = -img.height;
    ctx.drawImage(img, -w / 2 + f, -h / 2 + g, w, h);
    ctx.restore()
}
function draw_simple_mobs(c, g) {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.breath.update();
    f = sprite[c][world.time];
    w = -f.width * this.breath.v;
    h = -f.height * this.breath.v;
    ctx.drawImage(f, -w / 2, -h / 2, w, h);
    if (this.action & STATE.HURT) {
        this.hit.update() && 0 == this.hit.o && (this.action -= STATE.HURT);
        ctx.globalAlpha = .6 - this.hit.v;
        var f = sprite[g];
        ctx.drawImage(f, -w / 2, -h / 2, w, h);
        ctx.globalAlpha = 1
    }
    ctx.restore()
}
function draw_breath(c) {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.breath.update();
    img = sprite[c][world.time];
    w = -img.width * this.breath.v;
    h = -img.height * this.breath.v;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore()
}
function draw_seed() {
    if (!(10 > this.info)) {
        ctx.save();
        ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
        ctx.rotate(this.angle);
        if (this.hit.update) {
            this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1);
            var c = (1 - this.hit.anim.v) * delta * 600 * scale
              , g = Math.cos(this.hit.angle - this.angle) * c
              , c = Math.sin(this.hit.angle - this.angle) * c
        } else
            c = g = 0;
        this.ground.update();
        var f = sprite[SPRITE.PLANT_SEED][world.time]
          , d = -f.width * this.ground.v
          , e = -f.height * this.ground.v;
        ctx.drawImage(f, -d / 2 + g, -e / 2 + c, d, e);
        ctx.restore()
    }
}
function draw_plant() {
    if (!(10 < this.info)) {
        ctx.save();
        ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
        ctx.rotate(this.angle);
        if (this.hit.update) {
            this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1);
            var c = (1 - this.hit.anim.v) * delta * 600 * scale
              , g = Math.cos(this.hit.angle - this.angle) * c
              , c = Math.sin(this.hit.angle - this.angle) * c
        } else
            c = g = 0;
        var f = sprite[SPRITE.PLANT_MINI][world.time];
        ctx.drawImage(f, -f.width / 2 + g, -f.width / 2 + c);
        ctx.restore();
        for (g = 0; g < this.info; g++)
            this.fruits[g].draw(SPRITE.FRUIT)
    }
}
function draw_furnace() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    if (this.hit.update) {
        this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1);
        var c = (1 - this.hit.anim.v) * delta * 600 * scale
          , g = Math.cos(this.hit.angle - this.angle) * c
          , c = Math.sin(this.hit.angle - this.angle) * c
    } else
        c = g = 0;
    img = 2 == this.action ? sprite[SPRITE.FURNACE_ON][world.time] : sprite[SPRITE.FURNACE_OFF][world.time];
    ctx.drawImage(img, -img.width / 2 + g, -img.height / 2 + c);
    ctx.restore()
}
function draw_furnace_ground() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.ground.update();
    var c = sprite[SPRITE.GROUND_FIRE][world.time]
      , g = -c.width * this.ground.v
      , f = -c.height * this.ground.v;
    ctx.drawImage(c, -g / 2, -f / 2, g, f);
    ctx.restore()
}
function draw_fire_ground(c) {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.ground.update();
    var g = sprite[SPRITE.GROUND_FIRE][world.time]
      , f = -g.width * this.ground.v
      , d = -g.height * this.ground.v;
    ctx.drawImage(g, -f / 2, -d / 2, f, d);
    this.hit.update ? (this.hit.anim.update() && 0 == this.hit.anim.o && (this.hit.update = !1),
    g = (1 - this.hit.anim.v) * delta * 600 * scale,
    f = Math.cos(this.hit.angle - this.angle) * g,
    d = Math.sin(this.hit.angle - this.angle) * g) : d = f = 0;
    g = sprite[c][world.time];
    ctx.drawImage(g, -g.width / 2 + f, -g.height / 2 + d);
    ctx.restore()
}
function draw_furnace_halo() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.halo.update();
    img = sprite[SPRITE.HALO_FIRE][world.time];
    w = -img.width * this.halo.v;
    h = -img.height * this.halo.v;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore()
}
function draw_fire_halo() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.rotate(this.angle);
    this.fire.update();
    img = sprite[SPRITE.FIRE][world.time];
    w = -img.width * this.fire.v;
    h = -img.height * this.fire.v;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    this.halo.update();
    img = sprite[SPRITE.HALO_FIRE][world.time];
    w = -img.width * this.halo.v;
    h = -img.height * this.halo.v;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore()
}
function draw_player_right_stuff(c, g, f) {
    if (0 <= c)
        switch (img = sprite[c][world.time],
        c) {
        case SPRITE.PICK:
        case SPRITE.PICK_GOLD:
        case SPRITE.PICK_DIAMOND:
        case SPRITE.PICK_WOOD:
            draw_image_transition(img, -img.width / 2 - scale * (45 + g), -img.height / 2 + scale * (f + 22));
            break;
        case SPRITE.SWORD:
        case SPRITE.SWORD_GOLD:
        case SPRITE.SWORD_DIAMOND:
            draw_image_transition(img, -img.width / 2 - scale * (41 + g), -img.height / 2 + scale * (f + 57));
            break;
        case SPRITE.SPEAR:
        case SPRITE.GOLD_SPEAR:
        case SPRITE.DIAMOND_SPEAR:
            draw_image_transition(img, -img.width / 2 - scale * (41 + g), -img.height / 2 + scale * (f + 57))
        }
}
var draw_player_clothe = function(c) {
    if (0 < c) {
        var g = sprite[c][world.time];
        switch (c) {
        case SPRITE.EARMUFFS:
            draw_image_transition(g, -g.width / 2, -g.height / 2 - 18 * scale);
            break;
        case SPRITE.COAT:
            draw_image_transition(g, -g.width / 2, -g.height / 2 - 10 * scale)
        }
    }
}
;
function draw_player() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    ctx.save();
    ctx.rotate(this.angle - Math.PI / 2);
    this.action & STATE.ATTACK || (this.action & STATE.IDLE ? this.idle.update() : this.action & STATE.WALK && this.walk.update());
    var c = this.idle.v
      , g = this.walk.v
      , f = sprite[SPRITE.HAND][world.time];
    shadow = sprite[SPRITE.HAND_SHADOW][world.time];
    if (this.action & STATE.ATTACK) {
        this.attack.update() && 0 == this.attack.o && (this.hand = !this.hand,
        this.action -= STATE.ATTACK,
        this.uid == user.uid && (user.control.mouse = 0));
        0 <= this.right && (this.hand = !0);
        var d = this.hand ? this.attack.v : -this.attack.v / 3
          , e = this.hand ? this.attack.v / 3 : -this.attack.v;
        ctx.save();
        ctx.rotate(d);
        draw_image_transition(shadow, -shadow.width / 2 - scale * (49 + c), -shadow.height / 2 + (15 + g) * scale);
        draw_player_right_stuff(this.right, c, g);
        draw_image_transition(f, -f.width / 2 - scale * (49 + c), -f.height / 2 + (11 + g) * scale);
        ctx.restore();
        ctx.save();
        ctx.rotate(e);
        draw_image_transition(shadow, -shadow.width / 2 + scale * (49 + c), -shadow.height / 2 + (15 + g) * scale);
        draw_image_transition(f, -f.width / 2 + scale * (49 + c), -f.height / 2 + (11 + g) * scale);
        ctx.restore()
    } else
        draw_image_transition(shadow, -shadow.width / 2 - scale * (49 + c), -shadow.height / 2 + (15 + g) * scale),
        draw_player_right_stuff(this.right, c, g),
        draw_image_transition(f, -f.width / 2 - scale * (49 + c), -f.height / 2 + (11 + g) * scale),
        draw_image_transition(shadow, -shadow.width / 2 + scale * (49 + c), -shadow.height / 2 + (15 + g) * scale),
        draw_image_transition(f, -f.width / 2 + scale * (49 + c), -f.height / 2 + (11 + g) * scale);
    var f = sprite[SPRITE.BODY][world.time];
    draw_image_transition(f, -f.width / 2, -f.height / 2);
    this.action & STATE.HEAL && (this.heal.update() && 0 == this.heal.o && (this.action -= STATE.HEAL),
    ctx.globalAlpha = .6 - this.heal.v,
    f = sprite[SPRITE.HEAL],
    ctx.drawImage(f, -f.width / 2, -f.height / 2),
    ctx.globalAlpha = 1);
    this.action & STATE.WEB && (this.web.update() && 0 == this.web.o && (this.action -= STATE.WEB),
    ctx.globalAlpha = .6 - this.web.v,
    f = sprite[SPRITE.WEB],
    ctx.drawImage(f, -f.width / 2, -f.height / 2),
    ctx.globalAlpha = 1);
    this.action & STATE.HURT && (this.hit.update() && 0 == this.hit.o && (this.action -= STATE.HURT),
    ctx.globalAlpha = .6 - this.hit.v,
    f = sprite[SPRITE.HURT],
    ctx.drawImage(f, -f.width / 2, -f.height / 2),
    ctx.globalAlpha = 1);
    this.action & STATE.COLD && (this.freeze.update() && 0 == this.freeze.o && (this.action -= STATE.COLD),
    ctx.globalAlpha = .6 - this.freeze.v,
    f = sprite[SPRITE.COLD],
    ctx.drawImage(f, -f.width / 2, -f.height / 2),
    ctx.globalAlpha = 1);
    this.action & STATE.HUNGER && (this.starve.update() && 0 == this.starve.o && (this.action -= STATE.HUNGER),
    ctx.globalAlpha = .6 - this.starve.v,
    f = sprite[SPRITE.HUNGER],
    ctx.drawImage(f, -f.width / 2, -f.height / 2),
    ctx.globalAlpha = 1);
    draw_player_clothe(this.clothe);
    ctx.restore();
    this.player.label || (this.player.label = create_text(scale, this.player.nickname, 20, "#FFF", "#000", 4));
    f = this.player.label;
    world.day == SPRITE.NIGHT && (ctx.globalAlpha = .5);
    ctx.drawImage(f, -f.width / 2, -f.height / 2 - 70 * scale);
    ctx.globalAlpha = 1;
    ctx.restore()
}
function draw_alert(c, g) {
    this.text && (ctx.globalAlpha = this.timeout.o ? 1 - this.timeout.v : 1,
    this.label || (this.label = create_text(scale, this.text, 40, c, null , null , g, 10)),
    ctx.drawImage(this.label, (can.width - this.label.width) / 2, 50 * scale),
    ctx.globalAlpha = 1,
    this.timeout.update() && 0 == this.timeout.o && (this.text = "",
    this.label = null ))
}
function draw_chat() {
    ctx.save();
    ctx.translate(user.cam.x + this.x, user.cam.y + this.y);
    this.text && (ctx.globalAlpha = this.chat.o ? 1 - this.chat.v : 1,
    this.label || (this.label = create_message(scale, this.text)),
    ctx.drawImage(this.label, -this.label.width / 2, -this.label.height / 2 - 110 * scale),
    this.chat.update() && 0 == this.chat.o && (this.text = "",
    this.label = null ));
    ctx.restore()
}
function draw_map_object(c, g, f, d, e, m, n, p) {
    p = void 0 === p ? 0 : p;
    for (var q = n; q >= p; q--)
        for (var t = c; t <= g; t++)
            for (var r = f; r <= d; r++)
                for (var u = MAP.tiles[r][t], u = 0 == n ? u[m] : u[m][q], v = 0; v < u.length; v++) {
                    var z = u[v];
                    if (z.update) {
                        z.hit.update() && 0 == z.hit.o && (z.update = !1);
                        var A = (1 - z.hit.v) * delta * 600 * scale
                          , C = Math.cos(z.angle) * A
                          , A = Math.sin(z.angle) * A
                    } else
                        A = C = 0;
                    var B = 0 == n ? sprite[e][world.time] : sprite[e][world.time][q];
                    ctx.drawImage(B, user.cam.x + z.x - B.width / 2 + C, user.cam.y + z.y - B.height / 2 + A)
                }
}
function draw_world() {
    var c = Math.max(Math.floor(-user.cam.x / world.dw) - 2, 0)
      , g = Math.min(Math.floor((-user.cam.x + user.cam.w) / world.dw) + 2, world.nw - 1)
      , f = Math.max(Math.floor(-user.cam.y / world.dh) - 2, 0)
      , d = Math.min(Math.floor((-user.cam.y + user.cam.h) / world.dh) + 1, world.nh - 1);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.HERB, "h", 2);
    for (var e = world.units[ITEMS.FURNACE], m = 0; m < e.length; m++)
        2 == e[m].action && draw_bg_transition(e[m]);
    e = world.units[ITEMS.FIRE];
    for (m = 0; m < e.length; m++)
        draw_bg_transition(e[m], SPRITE.WOOD_FIRE);
    for (var n = world.units[ITEMS.BIG_FIRE], m = 0; m < n.length; m++)
        draw_bg_transition(n[m], SPRITE.BIG_FIRE_WOOD);
    n = world.units[ITEMS.SEED];
    for (m = 0; m < n.length; m++)
        draw_bg_transition(n[m]);
    n = world.units[ITEMS.SEED];
    for (m = 0; m < n.length; m++)
        draw_fg_transition(n[m]);
    e = world.units[ITEMS.WOOD_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info && draw_transition(e[m], SPRITE.DOOR_WOOD_OPEN);
    e = world.units[ITEMS.STONE_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info && draw_transition(e[m], SPRITE.DOOR_STONE_OPEN);
    e = world.units[ITEMS.GOLD_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info && draw_transition(e[m], SPRITE.DOOR_GOLD_OPEN);
    e = world.units[ITEMS.DIAMOND_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info && draw_transition(e[m], SPRITE.DOOR_DIAMOND_OPEN);
    n = world.units[ITEMS.RABBIT];
    for (m = 0; m < n.length; m++)
        draw_transition(n[m], SPRITE.RABBIT, SPRITE.HURT_RABBIT);
    n = world.units[ITEMS.PLAYERS];
    for (m = 0; m < n.length; m++)
        n[m].draw();
    e = world.units[ITEMS.WOLF];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.WOLF, SPRITE.HURT_WOLF);
    e = world.units[ITEMS.SPIDER];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.SPIDER, SPRITE.HURT_SPIDER);
    e = world.units[ITEMS.CHEST];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.CHEST);
    e = world.units[ITEMS.WORKBENCH];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.WORKBENCH);
    e = world.units[ITEMS.FURNACE];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m]);
    e = world.units[ITEMS.WOOD_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info || draw_transition(e[m], SPRITE.DOOR_WOOD_CLOSE);
    e = world.units[ITEMS.STONE_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info || draw_transition(e[m], SPRITE.DOOR_STONE_CLOSE);
    e = world.units[ITEMS.GOLD_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info || draw_transition(e[m], SPRITE.DOOR_GOLD_CLOSE);
    e = world.units[ITEMS.DIAMOND_DOOR];
    for (m = 0; m < e.length; m++)
        e[m].info || draw_transition(e[m], SPRITE.DOOR_DIAMOND_CLOSE);
    e = world.units[ITEMS.WALL];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.WALL);
    e = world.units[ITEMS.STONE_WALL];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.STONE_WALL);
    e = world.units[ITEMS.GOLD_WALL];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.GOLD_WALL);
    e = world.units[ITEMS.DIAMOND_WALL];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.DIAMOND_WALL);
    e = world.units[ITEMS.SPIKE];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.SPIKE);
    e = world.units[ITEMS.STONE_SPIKE];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.STONE_SPIKE);
    e = world.units[ITEMS.GOLD_SPIKE];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.GOLD_SPIKE);
    e = world.units[ITEMS.DIAMOND_SPIKE];
    for (m = 0; m < e.length; m++)
        draw_transition(e[m], SPRITE.DIAMOND_SPIKE);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.GOLD, "g", 2);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.DIAMOND, "d", 2);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.PLANT, "p", 0);
    e = world.units[ITEMS.FRUIT];
    for (m = 0; m < e.length; m++)
        for (var p = 0; p < e[m].info; p++)
            draw_transition(e[m].fruits[p], SPRITE.FRUIT);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.STONES, "s", 2);
    e = world.units[ITEMS.FIRE];
    for (m = 0; m < e.length; m++)
        draw_fg_transition(e[m]);
    e = world.units[ITEMS.BIG_FIRE];
    for (m = 0; m < e.length; m++)
        draw_fg_transition(e[m]);
    e = world.units[ITEMS.FURNACE];
    for (m = 0; m < e.length; m++)
        2 == e[m].action && draw_fg_transition(e[m]);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.TREE, "t", 5, 4);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.TREE_BRANCH, "b", 3, 2);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.TREE, "t", 3, 2);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.TREE_BRANCH, "b", 1, 0);
    draw_map_transition(draw_map_object, f, d, c, g, SPRITE.TREE, "t", 1, 0);
    for (m = 0; m < n.length; m++)
        n[m].draw_text()
}
function draw_bg_transition(c, g) {
    world.transition ? (ctx.globalAlpha = 1,
    c.draw_bg(g),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1 - world.shade.v,
    c.draw_bg(g),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1) : c.draw_bg(g)
}
function draw_fg_transition(c, g) {
    world.transition ? (ctx.globalAlpha = 1,
    c.draw_fg(g),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1 - world.shade.v,
    c.draw_fg(g),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1) : c.draw_fg(g)
}
function draw_image_transition(c, g, f) {
    world.transition ? (ctx.globalAlpha = 1,
    ctx.drawImage(c, g, f),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1 - world.shade.v,
    ctx.drawImage(c, g, f),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1) : ctx.drawImage(c, g, f)
}
function draw_transition(c, g, f) {
    world.transition ? (ctx.globalAlpha = 1,
    c.draw(g, f),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1 - world.shade.v,
    c.draw(g, f),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1) : c.draw(g, f)
}
function draw_map_transition(c, g, f, d, e, m, n, p) {
    world.transition ? (ctx.globalAlpha = 1,
    c(g, f, d, e, m, n, p),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1 - world.shade.v,
    c(g, f, d, e, m, n, p),
    world.time = world.time ? 0 : 1,
    ctx.globalAlpha = 1) : c(g, f, d, e, m, n, p)
}
function draw_ground() {
    if (world.transition) {
        var c = world.time ? 1 - world.shade.v : world.shade.v;
        color = "#";
        var g = Math.floor(19 * c + 3 * (1 - c));
        color += 16 > g ? "0" + g.toString(16) : g.toString(16);
        g = Math.floor(58 * c + 36 * (1 - c));
        color += 16 > g ? "0" + g.toString(16) : g.toString(16);
        g = Math.floor(43 * c + 40 * (1 - c));
        color += 16 > g ? "0" + g.toString(16) : g.toString(16);
        ctx.fillStyle = color
    } else
        ctx.fillStyle = SPRITE.GROUND[world.time];
    ctx.fillRect(0, 0, canw, canh)
}
function draw_world_with_effect() {
    if (world.transition)
        var c = world.shade.update();
    draw_ground();
    draw_world();
    world.transition && c && (world.transition = !1,
    world.shade.v = 0,
    world.shade.o = !1)
}
var ANIMATION_STOP = 0
  , ANIMATION_RUN = 1
  , FOCUS_OUT = 0
  , FOCUS_IN = 1
  , ALIGN_CENTER = 0
  , ALIGN_LEFT = 1
  , STYLE_RETRO = 0
  , STYLE_FLAT = 1
  , KEYDOWN = 0
  , KEYPRESS = 1
  , GET_KEY_OUT = 0
  , GET_KEY_IN = 1
  , MOUSE_MOVE = 0
  , MOUSE_DOWN = 1
  , MOUSE_UP = 2
  , BUTTON_OUT = 0
  , BUTTON_IN = 1
  , BUTTON_CLICK = 2;
function gui_disable_antialiasing(c) {
    c.imageSmoothingEnabled = !1;
    c.webkitImageSmoothingEnabled = !1;
    c.mozImageSmoothingEnabled = !1;
    c.msImageSmoothingEnabled = !1;
    c.oImageSmoothingEnabled = !1
}
function get_mouse_pos(c, g) {
    var f = c.getBoundingClientRect();
    return {
        x: g.clientX - f.left,
        y: g.clientY - f.top
    }
}
function gui_create_button(c, g, f, d) {
    if (d)
        var e = d;
    var m = {
        width: c,
        height: g,
        img: e,
        state: BUTTON_OUT,
        translate: {
            x: 0,
            y: 0
        }
    };
    return {
        info: m,
        trigger: function(c, d, e) {
            c = m.translate;
            if (d.x > c.x && d.x < c.x + m.img[m.state].width && d.y > c.y && d.y < c.y + m.img[m.state].height)
                return e == MOUSE_DOWN ? m.state = BUTTON_CLICK : e == MOUSE_UP ? m.state = BUTTON_IN : e == MOUSE_MOVE && m.state != BUTTON_CLICK && (m.state = BUTTON_IN),
                !0;
            m.state = BUTTON_OUT;
            return !1
        },
        draw: function(c) {
            c.drawImage(m.img[m.state], m.translate.x, m.translate.y)
        }
    }
}
function gui_create_image(c) {
    var g = {
        x: 0,
        y: 0
    };
    return {
        img: c,
        translate: g,
        draw: function(f) {
            f.drawImage(c, g.x, g.y)
        }
    }
}
function gui_create_animation(c, g) {
    g = void 0 === g ? .033 : g;
    var f = {
        x: 0,
        y: 0
    }
      , d = 0
      , e = 0
      , m = function() {
        e += delta;
        e > g && (d = (d + 1) % c.length,
        e -= g);
        return c[d]
    }
    ;
    return {
        img: c,
        translate: f,
        draw: function(c) {
            c.drawImage(m(), f.x, f.y)
        }
    }
}
function gui_add_breath_effect(c, g, f, d, e, m, n) {
    c.end = g;
    c.start = f;
    c.speed_start = d;
    c.speed_end = e;
    c.width = c.img.width;
    c.height = c.img.height;
    c.scale = 1;
    c.breath = !1;
    c.draw = function(d) {
        d.drawImage(c.img, 0, 0, c.img.width, c.img.height, c.translate.x, c.translate.y, c.width, c.height)
    }
}
function gui_breath_effect(c) {
    c.scale += c.breath ? delta / c.speed_start : -delta / c.speed_end;
    c.scale > c.end ? c.breath = !1 : c.scale < c.start && (c.breath = !0)
}
var STATE = {
    DELETE: 1,
    HURT: 2,
    COLD: 4,
    HUNGER: 8,
    ATTACK: 16,
    WALK: 32,
    IDLE: 64,
    HEAL: 128,
    WEB: 256
}
  , CLIENT = {
    VERSION_NUMBER: 2,
    TIMEOUT_TIME: 2E3,
    TIMEOUT_NUMBER: 3,
    PING: new Uint8Array([0]),
    PING_DELAY: 6E4,
    ROTATE: .2,
    ATTACK: .2,
    CAM_DELAY: 50,
    MUTE_DELAY: 125E3,
    TIMEOUT_SERVER: 3E4,
    WAITING_FOR_SERVER: 8E3,
    DELAY_CONNECTION_UPDATE: 5,
    LAG_DISTANCE: 200,
    LOOSE_FOCUS: 15
};
function Client() {
    var c = this;
    this.socket = null ;
    this._current_id = 0;
    this.server_list = [];
    this.xhttp = new XMLHttpRequest;
    this.xhttp.onreadystatechange = function() {
        4 == this.readyState && 200 == this.status ? c.fun_after(!0, 4) : c.fun_after(!1, this.readyState)
    }
    ;
    this.xhttp_get = function(c, f) {
        this.fun_after = c;
        this.xhttp.open("GET", f, !0);
        this.xhttp.send()
    }
    ;
    this.store_server_list = function() {
        this.server_list = JSON.parse(this.xhttp.responseText)
    }
    ;
    this.update_server_list = function() {
        for (var c = "<option disabled>Choose a server</option>", f = 0; f < this.server_list.length; f++)
            c += "<option>" + this.server_list[f].a + " [" + this.server_list[f].nu + " players]</option>\n";
        f = document.getElementById("region_select");
        f.innerHTML = c;
        f.selectedIndex = Math.min(Math.floor(5 * Math.random() + 1), client.server_list.length)
    }
    ;
    this.timeout_number = this.timeout_server = 0;
    this.timeout_handler = null ;
    this.timeout = function() {
        c.timeout_number++;
        c.socket.close();
        c.timeout_number > CLIENT.TIMEOUT_NUMBER ? (___adsvid = 1,
        ui.error_level = CLIENT.ERROR_REFUSED,
        user.alert.text = "You cannot join this server",
        ui.waiting = !1) : c.connect_timeout()
    }
    ;
    this.kick = function(c) {
        this._current_id == this.socket._current_id && (this._current_id++,
        user.alert.text = "Kicked: " + c,
        game.quit(ui.run))
    }
    ;
    this.mute = function() {
        user.alert.text = "You speak too much"
    }
    ;
    this.old_version = function() {
        clearTimeout(this.timeout_handler);
        user.alert.text = "You have an old version, you need to clear your cache";
        ui.waiting = !1
    }
    ;
    this.build_stop = function() {
        this.gather([0, user.craft.id2, 1]);
        user.craft.restart()
    }
    ;
    this.get_focus = function() {
        this.socket.send(JSON.stringify([11]))
    }
    ;
    this.build_ok = function(c) {
        user.auto_feed.delay = 0;
        user.craft.do_craft(c)
    }
    ;
    this.survive = function() {
        user.alert.text = 0 == user.day ? "You survived 1 day" : "You survived " + (user.day + 1) + " days";
        user.alert.label = null ;
        user.alert.timeout.o = !1;
        user.alert.timeout.v = user.alert.timeout.max;
        user.day++
    }
    ;
    this.full = function() {
        ___adsvid = 1;
        clearTimeout(this.timeout_handler);
        user.alert.text = "Server is full! Spam the play button!";
        ui.waiting = !1
    }
    ;
    this.new_player = function(c) {
        var f = c[1]
          , d = world.players;
        d[f].nickname = c[2];
        d[f].score = 0;
        d[f].ldb_label = null ;
        d[f].label = null ;
        d[f].alive = !0
    }
    ;
    this.empty_res = function() {
        user.alert.text = "Resource is empty"
    }
    ;
    this.inv_full = function() {
        user.alert.text = "Inventory is full (right-click to empty items)"
    }
    ;
    this.gather = function(c) {
        for (var f = c.length, d = user.inv, e = 1; e < f; e += 2) {
            for (var m = c[e], n = c[e + 1], p = 0; p < d.can_select.length; p++)
                if (d.can_select[p].id == m) {
                    d.n[m] += n;
                    break
                }
            p == d.can_select.length && (d.n[m] = n,
            d.can_select.push(game.inv_buttons[m]),
            game.update_inv_buttons())
        }
        user.craft.update()
    }
    ;
    this.gauges = function(c, f, d) {
        user.gauges.l = c / 100;
        user.gauges.h = f / 100;
        user.gauges.c = d / 100
    }
    ;
    this.get_time = function(c) {
        world.time = c;
        world.transition = !0
    }
    ;
    this.change_ground = function() {
        document.getElementById("game_body").style.backgroundColor = SPRITE.GROUND[world.time]
    }
    ;
    this.kill_player = function(c) {
        world.players[c].alive = !1
    }
    ;
    this.set_cam = function(c) {
        c = new Uint16Array(c);
        player.cam.change(c[1], c[2])
    }
    ;
    this.recover_focus = function(c) {
        c = new Uint16Array(c);
        user.cam.change(c[1], c[2])
    }
    ;
    this.hitten_other = function(c, f) {
        for (var d = new Uint16Array(f), e = (c.length - 2) / 4, m = 0; m < e; m++) {
            var n = c[5 + 4 * m] / 255 * Math.PI * 2
              , p = world.fast_units[c[4 + 4 * m] * world.max_units + d[1 + 2 * m]];
            p && p.hit && (p.hit.angle = n,
            p.hit.update = n)
        }
    }
    ;
    this.hitten = function(c) {
        c = new Uint16Array(c);
        for (var f = (c.length - 1) / 4, d = 0; d < f; d++) {
            var e = 4 * d
              , m = c[3 + e] / 255 * Math.PI * 2
              , n = MAP.tiles[c[1 + e]][c[2 + e]];
            switch (c[4 + e]) {
            case 0:
                n.p[0].angle = m;
                n.p[0].update = !0;
                break;
            case 1:
                n.s[0][0].angle = m;
                n.s[0][0].update = !0;
                break;
            case 2:
                n.s[1][0].angle = m;
                n.s[1][0].update = !0;
                break;
            case 3:
                n.s[2][0].angle = m;
                n.s[2][0].update = !0;
                break;
            case 4:
                n.t[0][0].angle = m;
                n.t[0][0].update = !0;
                break;
            case 5:
                n.t[1][0].angle = m;
                n.t[1][0].update = !0;
                break;
            case 6:
                n.t[2][0].angle = m;
                n.t[2][0].update = !0;
                break;
            case 7:
                n.t[3][0].angle = m;
                n.t[3][0].update = !0;
                break;
            case 8:
                n.t[4][0].angle = m;
                n.t[4][0].update = !0;
                break;
            case 9:
                n.t[5][0].angle = m;
                n.t[5][0].update = !0;
                break;
            case 10:
                n.g[0][0].angle = m;
                n.g[0][0].update = !0;
                break;
            case 11:
                n.g[1][0].angle = m;
                n.g[1][0].update = !0;
                break;
            case 12:
                n.g[2][0].angle = m;
                n.g[2][0].update = !0;
                break;
            case 13:
                n.d[0][0].angle = m;
                n.d[0][0].update = !0;
                break;
            case 14:
                n.d[1][0].angle = m;
                n.d[1][0].update = !0;
                break;
            case 15:
                n.d[2][0].angle = m;
                n.d[2][0].update = !0;
                break;
            case 16:
                n.b[0][0].angle = m;
                n.b[0][0].update = !0;
                break;
            case 17:
                n.b[1][0].angle = m;
                n.b[1][0].update = !0;
                break;
            case 18:
                n.b[2][0].angle = m;
                n.b[2][0].update = !0;
                break;
            case 19:
                n.b[3][0].angle = m,
                n.b[3][0].update = !0
            }
        }
    }
    ;
    this.give_wood = function(c, f) {
        this.socket.send(JSON.stringify([12, f, c.pid, c.iid]))
    }
    ;
    this.give_item = function(c, f, d) {
        this.socket.send(JSON.stringify([8, f, d, c.pid, c.iid]))
    }
    ;
    this.take_chest = function(c) {
        this.socket.send(JSON.stringify([9, c.pid, c.iid]))
    }
    ;
    this.units = function(c, f, d) {
        c = new Uint16Array(c);
        d && world.delete_all_units();
        d = (f.length - 2) / 12;
        for (var e = 0; e < d; e++) {
            var m = 2 + 12 * e
              , n = 1 + 6 * e
              , p = f[m]
              , q = f[m + 1]
              , t = c[n + 4]
              , r = p * world.max_units + t;
            if (q & STATE.DELETE)
                world.delete_units(r);
            else {
                var u = f[m + 2]
                  , v = c[n + 2]
                  , z = c[n + 3]
                  , n = c[n + 5]
                  , m = f[m + 3] / 255 * Math.PI * 2;
                world.fast_units[r] ? (r = world.fast_units[r],
                r.r.x = v,
                r.r.y = z,
                0 != p && Utils.dist(r, r.r) > CLIENT.LAG_DISTANCE && (r.x = v,
                r.y = z),
                r.id != user.id && (r.nangle = m),
                r.action |= q,
                r.info = n,
                r.update && r.update(q)) : (p = new Item(u,p,t,v,z,m,q,n),
                world.fast_units[r] = p,
                world.units[u].push(p))
            }
        }
    }
    ;
    this.leaderboard = function(c) {
        this.timeout_server = old_timestamp;
        c = new Uint16Array(c);
        user.ldb.init(c)
    }
    ;
    this.chat = function(c) {
        var f = world.fast_units[c[1] * world.max_units];
        f && (f.text = c[2])
    }
    ;
    this.select_craft = function(c) {
        user.inv.max != user.inv.can_select.length || -1 != user.inv.find_item(RECIPES[c].id2) || user.inv.free_place(RECIPES[c].r) ? this.socket.send(JSON.stringify([7, c])) : this.inv_full()
    }
    ;
    this.workbench = function(c) {
        user.craft.workbench = c;
        user.craft.update()
    }
    ;
    this.fire = function(c) {
        user.craft.fire = c;
        user.craft.update()
    }
    ;
    this.dont_harvest = function(c) {
        user.alert.text = "This is not the right tool"
    }
    ;
    this.cancel_craft = function() {
        user.craft.restart()
    }
    ;
    this.decrease_item = function(c, f) {
        user.inv.decrease(c, f, user.inv.find_item(c));
        user.craft.update()
    }
    ;
    this.accept_build = function(c) {
        user.craft.preview = -1;
        user.inv.decrease(c, 1, user.inv.find_item(c))
    }
    ;
    this.cancel_crafting = function() {
        this.socket.send(JSON.stringify([10]))
    }
    ;
    this.send_build = function() {
        this.socket.send(JSON.stringify([5, user.craft.preview]))
    }
    ;
    this.select_inv = function(c, f) {
        switch (c) {
        case INV.BANDAGE:
        case INV.PLANT:
        case INV.MEAT:
        case INV.COOKED_MEAT:
            user.craft.preview = -1;
            this.socket.send(JSON.stringify([5, c]));
            break;
        case INV.WORKBENCH:
        case INV.SPIKE:
        case INV.SEED:
        case INV.FIRE:
        case INV.WALL:
        case INV.STONE_WALL:
        case INV.GOLD_WALL:
        case INV.DIAMOND_WALL:
        case INV.BIG_FIRE:
        case INV.CHEST:
        case INV.WOOD_DOOR:
        case INV.STONE_DOOR:
        case INV.GOLD_DOOR:
        case INV.DIAMOND_DOOR:
        case INV.STONE_SPIKE:
        case INV.GOLD_SPIKE:
        case INV.DIAMOND_SPIKE:
        case INV.FURNACE:
            user.craft.preview = user.craft.preview == c ? -1 : c;
            break;
        case INV.SWORD:
        case INV.PICK:
        case INV.PICK_WOOD:
        case INV.PICK_GOLD:
        case INV.PICK_DIAMOND:
        case INV.SWORD_GOLD:
        case INV.SWORD_DIAMOND:
        case INV.SPEAR:
        case INV.GOLD_SPEAR:
        case INV.DIAMOND_SPEAR:
            user.craft.preview = -1;
            c == user.inv.id ? (this.socket.send(JSON.stringify([5, INV.HAND])),
            user.inv.id = -1) : (this.socket.send(JSON.stringify([5, c])),
            user.inv.id = c);
            break;
        case INV.EARMUFFS:
        case INV.COAT:
            this.socket.send(JSON.stringify([5, c]))
        }
    }
    ;
    this.delete_inv = function(c, f) {
        user.inv.delete_item(c, f);
        user.craft.update();
        this.socket.send(JSON.stringify([6, c]))
    }
    ;
    this.send_attack = function(c) {
        var f = 2 * Math.PI;
        this.socket.send(JSON.stringify([4, Math.floor((c + f) % f * 255 / f)]))
    }
    ;
    this.send_angle = function(c) {
        var f = 2 * Math.PI;
        this.socket.send(JSON.stringify([3, Math.floor((c + f) % f * 255 / f)]))
    }
    ;
    this.send_move = function(c) {
        this.socket.send(JSON.stringify([2, c]))
    }
    ;
    this.send_chat = function(c) {
        world.fast_units[user.uid].text = c;
        this.socket.send(JSON.stringify([0, c]))
    }
    ;
    this.move_units = function(c) {
        var f = player.select.units;
        if (0 != f.length) {
            var d = [2]
              , e = [];
            Utils.sub_vector(c, {
                x: player.cam.rx,
                y: player.cam.ry
            });
            d.push(c.x);
            d.push(c.y);
            for (c = 0; c < f.length; c++)
                e.push(f[c].oid);
            d.push(e);
            this.socket.send(JSON.stringify(d))
        }
    }
    ;
    this.cam_delay = 0;
    this.last_cam = {
        x: 0,
        y: 0
    };
    this.update_cam = function() {
        if (old_timestamp - this.cam_delay > CLIENT.CAM_DELAY) {
            this.cam_delay = old_timestamp;
            var c = user.cam;
            if (this.last_cam.x != c.x || this.last_cam.y != c.y)
                this.socket.send(JSON.stringify([1, Math.floor(-c.x), Math.floor(-c.y)])),
                this.last_cam.x = c.x,
                this.last_cam.y = c.y
        }
    }
    ;
    this.ping_delay = 0;
    this.try_ping = function() {
        old_timestamp - this.ping_delay > CLIENT.PING_DELAY && (this.ping_delay = old_timestamp,
        this.ping())
    }
    ;
    this.lost = function() {
        this._current_id == this.socket._current_id && (this._current_id++,
        game.quit(ui.run),
        this.socket.close())
    }
    ;
    this.killed = function(c) {
        this._current_id == this.socket._current_id && (this._current_id++,
        game.quit(ui.run),
        this.socket.close())
    }
    ;
    this.ping = function() {
        this.socket.send(CLIENT.PING)
    }
    ;
    this.check_state = function() {
        3 == this.socket.readyState && (this.timeout_server -= CLIENT.TIMEOUT_SERVER)
    }
    ;
    this.check_pong = function() {
        delta > CLIENT.LOOSE_FOCUS && (this.timeout_server = old_timestamp);
        old_timestamp - this.timeout_server > CLIENT.TIMEOUT_SERVER && (this.timeout_server = old_timestamp,
        this.lost())
    }
    ;
    this.handshake = function(c) {
        ___adsvid++;
        clearTimeout(this.timeout_handler);
        this.timeout_server = old_timestamp;
        user.gauges.cold.ed = user.gauges.cold.em;
        user.gauges.hunger.ed = user.gauges.hunger.em;
        user.gauges.l = 1;
        user.gauges.c = 1;
        user.gauges.h = 1;
        user.inv.can_select = [];
        user.inv.n = [];
        user.inv.id = -1;
        user.craft.can_craft = [];
        user.craft.crafting = !1;
        user.craft.can_build = !1;
        user.craft.preview = -1;
        user.craft.id = -1;
        user.craft.workbench = !1;
        user.craft.fire = !1;
        world.time = c[7];
        world.transition = !1;
        user.day = 0;
        world.units[ITEMS.PLAYERS] = [];
        world.units[ITEMS.FRUIT] = [];
        world.units[ITEMS.WORKBENCH] = [];
        world.units[ITEMS.FIRE] = [];
        world.units[ITEMS.BIG_FIRE] = [];
        world.units[ITEMS.SEED] = [];
        world.units[ITEMS.WALL] = [];
        world.units[ITEMS.STONE_WALL] = [];
        world.units[ITEMS.GOLD_WALL] = [];
        world.units[ITEMS.DIAMOND_WALL] = [];
        world.units[ITEMS.WOOD_DOOR] = [];
        world.units[ITEMS.STONE_DOOR] = [];
        world.units[ITEMS.GOLD_DOOR] = [];
        world.units[ITEMS.DIAMOND_DOOR] = [];
        world.units[ITEMS.CHEST] = [];
        world.units[ITEMS.SPIKE] = [];
        world.units[ITEMS.STONE_SPIKE] = [];
        world.units[ITEMS.GOLD_SPIKE] = [];
        world.units[ITEMS.DIAMOND_SPIKE] = [];
        world.units[ITEMS.WOLF] = [];
        world.units[ITEMS.RABBIT] = [];
        world.units[ITEMS.SPIDER] = [];
        world.units[ITEMS.FURNACE] = [];
        world.fast_units = [];
        world.max_units = c[2];
        user.id = c[1];
        user.uid = user.id * world.max_units;
        keyboard.clear_directionnal();
        user.cam.change(c[4], c[5]);
        world.players = [];
        for (var f = world.players, d = 0; d < c[6]; d++)
            f.push(new Player(""));
        d = 0;
        for (c = c[3]; d < c.length; d++) {
            var e = f[c[d].i];
            e.nickname = c[d].n;
            e.score = Utils.restore_number(c[d].p);
            e.alive = !0
        }
        user.ldb.sort();
        ui.quit(game.run)
    }
    ;
    this.connect = function() {
        this.timeout_number = 0;
        this.connect_timeout()
    }
    ;
    this.connect_timeout = function() {
        var g = ui.server_list.id.selectedIndex - 1;
        this.socket = new WebSocket("ws://" + this.server_list[g].i + ":" + this.server_list[g].p);
        this.socket.binaryType = "arraybuffer";
        this.socket._current_id = this._current_id;
        this.socket.onmessage = function(f) {
            if (this._current_id == c._current_id)
                if ("string" == typeof f.data)
                    switch (f = JSON.parse(f.data),
                    f[0]) {
                    case 0:
                        c.chat(f);
                        break;
                    case 1:
                        c.kick(f[1]);
                        break;
                    case 2:
                        c.new_player(f);
                        break;
                    case 3:
                        c.handshake(f)
                    }
                else {
                    var d = new Uint8Array(f.data);
                    switch (d[0]) {
                    case 0:
                        c.units(f.data, d, !1);
                        break;
                    case 1:
                        c.units(f.data, d, !0);
                        break;
                    case 2:
                        c.killed(d[1]);
                        break;
                    case 3:
                        c.set_cam(f.data);
                        break;
                    case 4:
                        c.mute();
                        break;
                    case 5:
                        c.full();
                        break;
                    case 6:
                        c.leaderboard(f.data);
                        break;
                    case 7:
                        c.kill_player(d[1]);
                        break;
                    case 8:
                        c.old_version();
                        break;
                    case 9:
                        c.hitten(f.data);
                        break;
                    case 10:
                        c.get_time(d[1]);
                        break;
                    case 11:
                        c.gauges(d[1], d[2], d[3]);
                        break;
                    case 12:
                        c.empty_res();
                        break;
                    case 13:
                        c.inv_full();
                        break;
                    case 14:
                        c.gather(d);
                        break;
                    case 15:
                        c.survive();
                        break;
                    case 16:
                        c.build_ok(d[1]);
                        break;
                    case 17:
                        c.build_stop();
                        break;
                    case 18:
                        c.accept_build(d[1]);
                        break;
                    case 19:
                        c.workbench(d[1]);
                        break;
                    case 20:
                        c.fire(d[1]);
                        break;
                    case 21:
                        c.dont_harvest();
                        break;
                    case 22:
                        c.hitten_other(d, f.data);
                        break;
                    case 23:
                        c.decrease_item(d[1], d[2]);
                        break;
                    case 24:
                        c.recover_focus(f.data);
                        break;
                    case 25:
                        c.cancel_craft()
                    }
                }
        }
        ;
        this.socket.onopen = function() {
            clearTimeout(c.timeout_handler);
            c.socket.send(JSON.stringify([ui.nickname.input.value, screen.width, screen.height, CLIENT.VERSION_NUMBER]));
            c.timeout_handler = setTimeout(c.timeout, CLIENT.TIMEOUT_TIME)
        }
        ;
        this.timeout_handler = setTimeout(c.timeout, CLIENT.TIMEOUT_TIME)
    }
}
  , WORLD = {
    SPEED: 200,
    SPEED_ATTACK: 100,
    SPEED_COLLIDE: 100,
    RABBIT_SPEED: 300,
    WOLF_SPEED: 240,
    SPIDER_SPEED: 230,
    ROTATE: 10,
    DIST_CHEST: 100,
    DIST_FURNACE: 100
}
  , ITEMS = {
    PLAYERS: 0,
    FIRE: 1,
    WORKBENCH: 2,
    SEED: 3,
    WALL: 4,
    SPIKE: 5,
    BIG_FIRE: 6,
    STONE_WALL: 7,
    GOLD_WALL: 8,
    DIAMOND_WALL: 9,
    WOOD_DOOR: 10,
    CHEST: 11,
    STONE_SPIKE: 12,
    GOLD_SPIKE: 13,
    DIAMOND_SPIKE: 14,
    STONE_DOOR: 15,
    GOLD_DOOR: 16,
    DIAMOND_DOOR: 17,
    FURNACE: 18,
    RABBIT: 60,
    WOLF: 61,
    SPIDER: 62,
    FRUIT: 100
};
function Player(c) {
    this.nickname = c;
    this.ldb_label = this.label = null ;
    this.alive = !1;
    this.score = 0
}
function Item(c, g, f, d, e, m, n, p) {
    this.type = c;
    this.pid = g;
    this.id = f;
    this.x = d;
    this.y = e;
    this.nangle = this.angle = m;
    this.action = n;
    this.info = p;
    this.r = {
        x: d,
        y: e
    };
    world && (this.uid = g * world.max_units + f);
    switch (c) {
    case ITEMS.PLAYERS:
        this.player = world.players[this.pid];
        this.r = {
            x: d,
            y: e
        };
        this.draw = draw_player;
        this.hit = new Utils.LinearAnimation(!1,.6,.6,0,5,3);
        this.heal = new Utils.LinearAnimation(!1,.6,.6,0,5,3);
        this.freeze = new Utils.LinearAnimation(!1,.6,.6,0,5,3);
        this.starve = new Utils.LinearAnimation(!1,.6,.6,0,5,3);
        this.idle = new Utils.LinearAnimation(!0,0,2.25,-1.5,3.75,7.5);
        this.walk = new Utils.LinearAnimation(!0,0,7.5,-3,22.5,33.75);
        this.attack = new Utils.LinearAnimation(!1,0,0,-Math.PI / 3,6,9);
        this.chat = new Utils.LinearAnimation(!1,1,1,0,4,.25);
        this.web = new Utils.LinearAnimation(!1,.6,.6,0,1,3);
        this.text = "";
        this.label = null ;
        this.draw_text = draw_chat;
        this.hand = !0;
        this.right = -1;
        this.action = STATE.IDLE;
        this.info = INV.HAND;
        this.collide = !1;
        this.clothe = 0;
        this.update = function() {
            this.info & 32768 ? (this.collide = !0,
            this.info &= -32769) : this.collide = !1;
            this.clothe = Math.floor(this.info / 256);
            this.info -= 256 * this.clothe;
            this.right = this.info == INV.HAND ? -1 : this.info;
            this.action & STATE.COLD && this.action & STATE.HEAL && (this.action -= STATE.COLD + STATE.HEAL,
            this.action |= STATE.WEB)
        }
        ;
        this.update();
        break;
    case ITEMS.FIRE:
    case ITEMS.BIG_FIRE:
        this.draw_bg = draw_fire_ground;
        this.draw_fg = draw_fire_halo;
        this.fire = new Utils.LinearAnimation(!1,1,1.03,.98,.3,.3);
        this.ground = new Utils.LinearAnimation(!1,1,1.23,1.18,.01,.01);
        this.halo = new Utils.LinearAnimation(!1,1,1.23,1.18,.01,.01);
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        };
        break;
    case ITEMS.SEED:
        this.draw_bg = draw_seed;
        this.draw_fg = draw_plant;
        this.ground = new Utils.LinearAnimation(!1,.9,1.05,.9,.2,.2);
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        };
        this.fruits = [];
        for (c = 0; 3 > c; c++)
            this.fruits.push({
                draw: draw_breath,
                breath: new Utils.LinearAnimation(!1,.9 + .15 * Math.random(),1.05,.9,.2,.2)
            });
        this.fruits[0].x = this.x - 16.5;
        this.fruits[0].y = this.y - 15.5;
        this.fruits[1].x = this.x - 5.5;
        this.fruits[1].y = this.y + 7.5;
        this.fruits[2].x = this.x + 18;
        this.fruits[2].y = this.y - 5;
        break;
    case ITEMS.RABBIT:
    case ITEMS.WOLF:
    case ITEMS.SPIDER:
        this.draw = draw_simple_mobs;
        this.breath = new Utils.LinearAnimation(!1,.9 + .15 * Math.random(),1.05,.9,.2,.2);
        this.hit = new Utils.LinearAnimation(!1,.6,.6,0,5,3);
        break;
    case ITEMS.FRUIT:
        this.fruits = [];
        for (c = 0; 5 > c; c++)
            this.fruits.push({
                draw: draw_breath,
                breath: new Utils.LinearAnimation(!1,.9 + .15 * Math.random(),1.05,.9,.2,.2)
            });
        switch (this.id % 3) {
        case 0:
            this.fruits[0].x = this.x - 20.5;
            this.fruits[0].y = this.y - 22.5;
            this.fruits[1].x = this.x - 35.5;
            this.fruits[1].y = this.y + 7.5;
            this.fruits[2].x = this.x + 7.5;
            this.fruits[2].y = this.y - 30;
            this.fruits[3].x = this.x + 22.5;
            this.fruits[3].y = this.y;
            this.fruits[4].x = this.x - 7.5;
            this.fruits[4].y = this.y + 14.5;
            break;
        case 1:
            this.fruits[0].x = this.x - 30.5;
            this.fruits[0].y = this.y - 22.5;
            this.fruits[1].x = this.x - 15.5;
            this.fruits[1].y = this.y + 7.5;
            this.fruits[2].x = this.x + 15.5;
            this.fruits[2].y = this.y - 30;
            this.fruits[3].x = this.x + 12.5;
            this.fruits[3].y = this.y + 5;
            this.fruits[4].x = this.x - 40.5;
            this.fruits[4].y = this.y + 14.5;
            break;
        case 2:
            this.fruits[0].x = this.x - 20.5,
            this.fruits[0].y = this.y - 20.5,
            this.fruits[1].x = this.x - 35.5,
            this.fruits[1].y = this.y + 15.5,
            this.fruits[2].x = this.x + 7.5,
            this.fruits[2].y = this.y - 17,
            this.fruits[3].x = this.x + 22.5,
            this.fruits[3].y = this.y + 5,
            this.fruits[4].x = this.x - 7.5,
            this.fruits[4].y = this.y + 1.5
        }
        break;
    case ITEMS.SPIKE:
    case ITEMS.WALL:
    case ITEMS.STONE_WALL:
    case ITEMS.GOLD_WALL:
    case ITEMS.DIAMOND_WALL:
    case ITEMS.WORKBENCH:
    case ITEMS.STONE_SPIKE:
    case ITEMS.GOLD_SPIKE:
    case ITEMS.DIAMOND_SPIKE:
        this.draw = draw_simple_item;
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        };
        break;
    case ITEMS.CHEST:
        this.update = function(c) {
            this.action = c
        }
        ;
        this.draw = draw_simple_item;
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        };
        break;
    case ITEMS.WOOD_DOOR:
    case ITEMS.STONE_DOOR:
    case ITEMS.GOLD_DOOR:
    case ITEMS.DIAMOND_DOOR:
        this.draw = draw_door;
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        };
        break;
    case ITEMS.FURNACE:
        this.draw_bg = draw_furnace_ground,
        this.draw = draw_furnace,
        this.draw_fg = draw_furnace_halo,
        this.ground = new Utils.LinearAnimation(!1,1,1.23,1.18,.01,.01),
        this.halo = new Utils.LinearAnimation(!1,1,1.23,1.18,.01,.01),
        this.hit = {
            anim: new Utils.LinearAnimation(!1,1,1,0,10,10),
            update: !1,
            angle: 0
        },
        this.update = function(c) {
            this.action = c
        }
    }
}
function World(c) {
    function g(c, e, f) {
        for (k = 0; k < c[e].length; k++)
            for (l = 0; l < c[e][k].length; l++)
                c[e][k][l].hit = f,
                c[e][k][l].update = !1,
                c[e][k][l].time = 0,
                c[e][k][l].angle = 0
    }
    this.max_units = c;
    this.players = [];
    this.units = [];
    this.units[ITEMS.PLAYERS] = [];
    this.units[ITEMS.FRUIT] = [];
    this.units[ITEMS.RABBIT] = [];
    this.units[ITEMS.WOLF] = [];
    this.units[ITEMS.SPIDER] = [];
    this.units[ITEMS.WORBENCH] = [];
    this.units[ITEMS.FIRE] = [];
    this.units[ITEMS.BIG_FIRE] = [];
    this.units[ITEMS.SEED] = [];
    this.units[ITEMS.SPIKE] = [];
    this.units[ITEMS.STONE_SPIKE] = [];
    this.units[ITEMS.GOLD_SPIKE] = [];
    this.units[ITEMS.DIAMOND_SPIKE] = [];
    this.units[ITEMS.WALL] = [];
    this.units[ITEMS.STONE_WALL] = [];
    this.units[ITEMS.GOLD_WALL] = [];
    this.units[ITEMS.DIAMOND_WALL] = [];
    this.units[ITEMS.WOOD_DOOR] = [];
    this.units[ITEMS.STONE_DOOR] = [];
    this.units[ITEMS.GOLD_DOOR] = [];
    this.units[ITEMS.DIAMOND_DOOR] = [];
    this.units[ITEMS.FURNACE] = [];
    this.units[ITEMS.CHEST] = [];
    this.fast_units = [];
    this.dh = this.dw = this.nh = this.nw = 100;
    this.w = this.nw * this.dw;
    this.h = this.nh * this.dh;
    this.shade = new Utils.LinearAnimation(!1,0,1,0,1,1);
    this.transition = !1;
    for (c = 0; c < this.nh; c++)
        for (j = 0; j < this.nw; j++) {
            var f = MAP.tiles[c][j];
            for (k = 0; k < f.p.length; k++)
                f.p[k].hit = new Utils.LinearAnimation(!1,1,1,0,10,10),
                f.p[k].update = !1,
                f.p[k].time = 0,
                f.p[k].angle = 0;
            g(f, "t", new Utils.LinearAnimation(!1,1,1,0,10,10));
            g(f, "s", new Utils.LinearAnimation(!1,1,1,0,10,10));
            g(f, "g", new Utils.LinearAnimation(!1,1,1,0,10,10));
            g(f, "d", new Utils.LinearAnimation(!1,1,1,0,10,10));
            g(f, "b", new Utils.LinearAnimation(!1,1,1,0,10,10))
        }
    this.time = SPRITE.DAY;
    this.delete_all_units = function() {
        this.fast_units = [];
        this.units[ITEMS.PLAYERS] = [];
        this.units[ITEMS.WORKBENCH] = [];
        this.units[ITEMS.FIRE] = [];
        this.units[ITEMS.BIG_FIRE] = [];
        this.units[ITEMS.SEED] = [];
        this.units[ITEMS.SPIKE] = [];
        this.units[ITEMS.STONE_SPIKE] = [];
        this.units[ITEMS.GOLD_SPIKE] = [];
        this.units[ITEMS.DIAMOND_SPIKE] = [];
        this.units[ITEMS.WALL] = [];
        this.units[ITEMS.STONE_WALL] = [];
        this.units[ITEMS.GOLD_WALL] = [];
        this.units[ITEMS.DIAMOND_WALL] = [];
        this.units[ITEMS.WOOD_DOOR] = [];
        this.units[ITEMS.STONE_DOOR] = [];
        this.units[ITEMS.GOLD_DOOR] = [];
        this.units[ITEMS.DIAMOND_DOOR] = [];
        this.units[ITEMS.FURNACE] = [];
        this.units[ITEMS.CHEST] = [];
        this.units[ITEMS.FRUIT] = [];
        this.units[ITEMS.RABBIT] = [];
        this.units[ITEMS.WOLF] = [];
        this.units[ITEMS.SPIDER] = []
    }
    ;
    this.delete_units = function(c) {
        if (this.fast_units[c]) {
            type = this.fast_units[c].type;
            this.fast_units[c] = null ;
            for (var e = this.units[type], f = 0; f < e.length; f++)
                if (e[f].uid == c) {
                    e.splice(f, 1);
                    break
                }
        }
    }
    ;
    this.move_units = function(c, e, f, g) {
        for (var p = 0; p < c.length; p++) {
            b = c[p];
            if (b.angle != b.nangle) {
                var q = 2 * Math.PI;
                b.angle = (b.angle + q) % q;
                b.nangle = (b.nangle + q) % q;
                if (b.angle != b.nangle) {
                    var t = b.nangle - b.angle
                      , r = Math.abs(t);
                    r > Math.PI && (r = 2 * Math.PI - r);
                    r = r / Math.PI * 3 * WORLD.ROTATE * delta;
                    b.angle = t > Math.PI ? b.angle - r : t < -Math.PI ? b.angle + r : 0 > t ? b.angle - r : b.angle + r;
                    b.angle = (b.angle + q) % q;
                    Math.abs(b.angle - b.nangle) < r && (b.angle = b.nangle)
                }
            }
            if (b.x != b.r.x || b.y != b.r.y)
                b.action & STATE.IDLE && (b.action -= STATE.IDLE),
                b.action |= STATE.WALK,
                q = Utils.get_std_angle(b, b.r) + Math.PI,
                q = Utils.build_vector(f && b.action & STATE.ATTACK ? delta * f : b.collide ? delta * g : delta * e, q),
                Utils.norm(q) < Utils.norm(Utils.get_vector(b, b.r)) ? Utils.add_vector(b, q) : (b.action & STATE.WALK && (b.action -= STATE.WALK),
                b.action |= STATE.IDLE,
                Utils.copy_vector(b.r, b))
        }
    }
    ;
    this.update = function() {
        this.move_units(this.units[ITEMS.PLAYERS], WORLD.SPEED, WORLD.SPEED_ATTACK, WORLD.SPEED_COLLIDE);
        this.move_units(this.units[ITEMS.RABBIT], WORLD.RABBIT_SPEED);
        this.move_units(this.units[ITEMS.WOLF], WORLD.WOLF_SPEED);
        this.move_units(this.units[ITEMS.SPIDER], WORLD.SPIDER_SPEED)
    }
}
var CRAFT = {
    FIRE: 0,
    WORKBENCH: 1,
    SWORD: 2,
    PICK: 3,
    SEED: 4,
    PICK_GOLD: 5,
    PICK_DIAMOND: 6,
    SWORD_GOLD: 7,
    SWORD_DIAMOND: 8,
    PICK_WOOD: 9,
    WALL: 10,
    SPIKE: 11,
    COOKED_MEAT: 12,
    BIG_FIRE: 13,
    BANDAGE: 14,
    STONE_WALL: 15,
    GOLD_WALL: 16,
    DIAMOND_WALL: 17,
    WOOD_DOOR: 18,
    CHEST: 19,
    STONE_SPIKE: 20,
    GOLD_SPIKE: 21,
    DIAMOND_SPIKE: 22,
    STONE_DOOR: 23,
    GOLD_DOOR: 24,
    DIAMOND_DOOR: 25,
    EARMUFFS: 26,
    COAT: 27,
    SPEAR: 28,
    GOLD_SPEAR: 29,
    DIAMOND_SPEAR: 30,
    FURNACE: 31
}
  , INV = {
    SWORD: 0,
    PICK: 1,
    STONE: 2,
    WOOD: 3,
    PLANT: 4,
    GOLD: 5,
    DIAMOND: 6,
    PICK_GOLD: 7,
    PICK_DIAMOND: 8,
    SWORD_GOLD: 9,
    SWORD_DIAMOND: 10,
    FIRE: 11,
    WORKBENCH: 12,
    SEED: 13,
    HAND: 14,
    PICK_WOOD: 15,
    WALL: 16,
    SPIKE: 17,
    MEAT: 18,
    COOKED_MEAT: 19,
    BIG_FIRE: 20,
    BANDAGE: 21,
    CORD: 22,
    STONE_WALL: 23,
    GOLD_WALL: 24,
    DIAMOND_WALL: 25,
    WOOD_DOOR: 26,
    CHEST: 27,
    STONE_SPIKE: 28,
    GOLD_SPIKE: 29,
    DIAMOND_SPIKE: 30,
    STONE_DOOR: 31,
    GOLD_DOOR: 32,
    DIAMOND_DOOR: 33,
    FUR: 34,
    FUR_WOLF: 35,
    EARMUFFS: 36,
    COAT: 37,
    SPEAR: 38,
    GOLD_SPEAR: 39,
    DIAMOND_SPEAR: 40,
    FURNACE: 41
}
  , RECIPES = [{
    r: [[3, 30], [2, 5]],
    w: 0,
    f: 0,
    id: CRAFT.FIRE,
    id2: INV.FIRE,
    time: .1
}, {
    r: [[3, 40], [2, 20]],
    w: 0,
    f: 0,
    id: CRAFT.WORKBENCH,
    id2: INV.WORKBENCH,
    time: 1 / 15
}, {
    r: [[3, 60], [2, 30]],
    w: 1,
    f: 0,
    id: CRAFT.SWORD,
    id2: INV.SWORD,
    time: 1 / 15
}, {
    r: [[15, 1], [3, 60], [2, 20]],
    w: 1,
    f: 0,
    id: CRAFT.PICK,
    id2: INV.PICK,
    time: 1 / 15
}, {
    r: [[4, 3], [3, 20]],
    w: 0,
    f: 1,
    id: CRAFT.SEED,
    id2: INV.SEED,
    time: .1
}, {
    r: [[3, 60], [5, 30], [2, 40], [1, 1]],
    w: 1,
    f: 0,
    id: CRAFT.PICK_GOLD,
    id2: INV.PICK_GOLD,
    time: .05
}, {
    r: [[6, 30], [5, 60], [2, 100], [7, 1]],
    w: 1,
    f: 0,
    id: CRAFT.PICK_DIAMOND,
    id2: INV.PICK_DIAMOND,
    time: 1 / 30
}, {
    r: [[3, 80], [5, 50], [2, 60], [0, 1]],
    w: 1,
    f: 0,
    id: CRAFT.SWORD_GOLD,
    id2: INV.SWORD_GOLD,
    time: .05
}, {
    r: [[6, 50], [5, 80], [2, 100], [9, 1]],
    w: 1,
    f: 0,
    id: CRAFT.SWORD_DIAMOND,
    id2: INV.SWORD_DIAMOND,
    time: 1 / 30
}, {
    r: [[3, 15]],
    w: 0,
    f: 0,
    id: CRAFT.PICK_WOOD,
    id2: INV.PICK_WOOD,
    time: .2
}, {
    r: [[3, 20]],
    w: 1,
    f: 0,
    id: CRAFT.WALL,
    id2: INV.WALL,
    time: .2
}, {
    r: [[16, 1], [3, 20], [2, 15]],
    w: 1,
    f: 0,
    id: CRAFT.SPIKE,
    id2: INV.SPIKE,
    time: .05
}, {
    r: [[18, 1]],
    w: 0,
    f: 1,
    id: CRAFT.COOKED_MEAT,
    id2: INV.COOKED_MEAT,
    time: .1
}, {
    r: [[11, 1], [3, 40], [2, 10]],
    w: 0,
    f: 0,
    id: CRAFT.BIG_FIRE,
    id2: INV.BIG_FIRE,
    time: .1
}, {
    r: [[22, 3]],
    w: 1,
    f: 0,
    id: CRAFT.BANDAGE,
    id2: INV.BANDAGE,
    time: .2
}, {
    r: [[16, 1], [2, 20]],
    w: 1,
    f: 0,
    id: CRAFT.STONE_WALL,
    id2: INV.STONE_WALL,
    time: .2
}, {
    r: [[23, 1], [5, 20]],
    w: 1,
    f: 0,
    id: CRAFT.GOLD_WALL,
    id2: INV.GOLD_WALL,
    time: .2
}, {
    r: [[24, 1], [6, 20]],
    w: 1,
    f: 0,
    id: CRAFT.DIAMOND_WALL,
    id2: INV.DIAMOND_WALL,
    time: .2
}, {
    r: [[3, 60]],
    w: 1,
    f: 0,
    id: CRAFT.WOOD_DOOR,
    id2: INV.WOOD_DOOR,
    time: .125
}, {
    r: [[3, 60], [2, 20], [5, 10]],
    w: 1,
    f: 0,
    id: CRAFT.CHEST,
    id2: INV.CHEST,
    time: .05
}, {
    r: [[23, 1], [2, 35]],
    w: 1,
    f: 0,
    id: CRAFT.STONE_SPIKE,
    id2: INV.STONE_SPIKE,
    time: .05
}, {
    r: [[24, 1], [5, 20], [2, 15]],
    w: 1,
    f: 0,
    id: CRAFT.GOLD_SPIKE,
    id2: INV.GOLD_SPIKE,
    time: .05
}, {
    r: [[25, 1], [6, 20], [2, 15]],
    w: 1,
    f: 0,
    id: CRAFT.DIAMOND_SPIKE,
    id2: INV.DIAMOND_SPIKE,
    time: .05
}, {
    r: [[26, 1], [2, 60]],
    w: 1,
    f: 0,
    id: CRAFT.STONE_DOOR,
    id2: INV.STONE_DOOR,
    time: .125
}, {
    r: [[31, 1], [5, 60]],
    w: 1,
    f: 0,
    id: CRAFT.GOLD_DOOR,
    id2: INV.GOLD_DOOR,
    time: .125
}, {
    r: [[32, 1], [6, 60]],
    w: 1,
    f: 0,
    id: CRAFT.DIAMOND_DOOR,
    id2: INV.DIAMOND_DOOR,
    time: .125
}, {
    r: [[34, 8], [22, 4]],
    w: 1,
    f: 0,
    id: CRAFT.EARMUFFS,
    id2: INV.EARMUFFS,
    time: 1 / 15
}, {
    r: [[36, 1], [34, 5], [35, 10], [22, 6]],
    w: 1,
    f: 0,
    id: CRAFT.COAT,
    id2: INV.COAT,
    time: .04
}, {
    r: [[3, 80], [2, 20]],
    w: 1,
    f: 0,
    id: CRAFT.SPEAR,
    id2: INV.SPEAR,
    time: 1 / 15
}, {
    r: [[3, 120], [5, 40], [2, 50], [38, 1]],
    w: 1,
    f: 0,
    id: CRAFT.GOLD_SPEAR,
    id2: INV.GOLD_SPEAR,
    time: .05
}, {
    r: [[3, 250], [6, 50], [5, 80], [39, 1]],
    w: 1,
    f: 0,
    id: CRAFT.DIAMOND_SPEAR,
    id2: INV.DIAMOND_SPEAR,
    time: 1 / 30
}, {
    r: [[3, 150], [2, 100], [5, 50]],
    w: 1,
    f: 0,
    id: CRAFT.FURNACE,
    id2: INV.FURNACE,
    time: .05
}];
function User() {
    this.init = function() {}
    ;
    this.furnace = {
        amount: 0,
        pid: 1,
        iid: -1,
        open: !1
    };
    this.chest = {
        id: -1,
        amount: 0,
        pid: 1,
        iid: -1,
        open: !1
    };
    this.day = this.uid = this.id = 0;
    this.cam = new Utils.Ease2d(Utils.ease_out_quad,0,.4,0,0,canw2,canh2,canw2,canh2);
    this.cam.delay = 0;
    this.cam.update = function() {
        var c = world.fast_units[user.uid];
        c ? (this.delay = 0,
        this.ease({
            x: Math.max(Math.min(canw2 - c.x, -2), -world.w + 2 + canw),
            y: Math.max(Math.min(canh2 - c.y, -2), -world.h + 2 + canh)
        })) : (this.delay += delta,
        3 < this.delay && (this.delay = 0,
        client.get_focus()))
    }
    ;
    this.cam.w = screen.width;
    this.cam.h = screen.height;
    this.cam.rw = this.cam.w;
    this.cam.rh = this.cam.h;
    this.cam.rx = 0;
    this.cam.ry = 0;
    this.cam.rdw = 0;
    this.cam.rdh = 0;
    this.cam.change = function(c, g) {
        this.x = -Math.min(Math.max(2 * -world.dw, c - world.dw - this.rw / 2), world.w - this.rw);
        this.y = -Math.min(Math.max(2 * -world.dh, g - (world.dh + this.rh) / 2), world.h - this.rh + world.dh);
        this.ex = this.x;
        this.ey = this.y
    }
    ;
    this.control = {
        angle: 0,
        timeout: 0,
        previous: 0,
        mouse: 0,
        update: function() {
            this.mouse += delta;
            if (!mouse.state) {
                var c = world.fast_units[user.uid];
                c && !(c.action & STATE.ATTACK) && this.mouse > CLIENT.ATTACK && (this.mouse = 0,
                client.send_attack(c.angle))
            }
            var c = world.fast_units[user.uid]
              , g = Utils.get_std_angle(mouse.pos, c ? {
                x: user.cam.x + c.x,
                y: user.cam.y + c.y
            } : canm);
            if (c = world.fast_units[user.uid])
                c.angle = g,
                c.nangle = g;
            this.timeout += delta;
            this.timeout > CLIENT.ROTATE && (this.timeout = 0,
            this.angle != g && (client.send_angle(g),
            this.angle = g));
            user.chat.open || (c = 0,
            keyboard.is_left() && (c |= 1),
            g = keyboard.is_right(),
            (this.previous.right = g) && (c |= 2),
            keyboard.is_bottom() && (c |= 4),
            keyboard.is_top() && (c |= 8),
            this.previous != c && client.send_move(c),
            this.previous = c)
        }
    };
    this.gauges = {
        c: 1,
        l: 1,
        h: 1,
        warn_cold: new Utils.LinearAnimation(!0,0,1,0,3,3),
        warn_life: new Utils.LinearAnimation(!0,0,1,0,2,2),
        warn_hunger: new Utils.LinearAnimation(!0,0,1,0,3,3),
        cold: new Utils.Ease(Utils.ease_out_quad,0,1,0,0,1),
        life: new Utils.Ease(Utils.ease_out_quad,0,1,0,0,1),
        hunger: new Utils.Ease(Utils.ease_out_quad,0,1,0,0,1),
        update: function() {
            this.warn_cold.update();
            this.warn_life.update();
            this.warn_hunger.update();
            this.cold.ease(this.c);
            this.life.ease(this.l);
            this.hunger.ease(this.h)
        }
    };
    this.inv = {
        max: 8,
        n: [],
        id: -1,
        can_select: [],
        free_place: function(c) {
            for (i = 0; i < c.length; i++)
                if (this.n[c[i][0]] == c[i][1])
                    return !0;
            return !1
        },
        find_item: function(c) {
            for (var g = 0; g < this.can_select.length; g++)
                if (this.can_select[g].id == c)
                    return g;
            return -1
        },
        delete_item: function(c, g) {
            this.n[c] = 0;
            this.can_select.splice(g, 1);
            this.id == c && (this.id = -1);
            game.update_inv_buttons()
        },
        decrease: function(c, g, f) {
            update = !0;
            this.n[c] = Math.max(0, this.n[c] - g);
            !this.n[c] && 0 <= f && this.delete_item(c, f)
        }
    };
    this.auto_feed = {
        enabled: !1,
        translate: {
            x: 0,
            y: 0
        },
        delay: 0,
        update: function() {
            !this.enabled || 0 <= user.craft.id || (this.delay += delta,
            2 < this.delay && (this.delay = 0,
            .25 > user.gauges.h && (user.inv.n[INV.PLANT] ? client.select_inv(INV.PLANT, user.inv.find_item(INV.PLANT)) : user.inv.n[INV.COOKED_MEAT] ? client.select_inv(INV.COOKED_MEAT, user.inv.find_item(INV.COOKED_MEAT)) : user.inv.n[INV.MEAT] && client.select_inv(INV.MEAT, user.inv.find_item(INV.MEAT)))))
        }
    };
    this.craft = {
        id: -1,
        id2: -1,
        timeout: new Utils.LinearAnimation(!1,0,1,0,1,1),
        crafting: !1,
        preview: -1,
        can_craft: [],
        workbench: !1,
        fire: !1,
        do_craft: function(c) {
            var g = RECIPES[c];
            this.id = c;
            this.crafting = !0;
            this.timeout.max_speed = g.time;
            this.id2 = g.id2;
            for (c = 0; c < g.r.length; c++) {
                var f = g.r[c];
                user.inv.decrease(f[0], f[1], user.inv.find_item(f[0]))
            }
            game.update_inv_buttons()
        },
        update: function() {
            this.can_craft = [];
            for (var c in RECIPES) {
                var g = RECIPES[c]
                  , f = !0;
                if (g.r) {
                    for (var d = 0; d < g.r.length; d++) {
                        if (g.w > this.workbench || g.f > this.fire) {
                            f = !1;
                            break
                        }
                        var e = g.r[d];
                        if (!user.inv.n[e[0]] || user.inv.n[e[0]] < e[1]) {
                            f = !1;
                            break
                        }
                    }
                    f && this.can_craft.push(game.craft_buttons[g.id])
                }
            }
            game.update_craft_buttons();
            game.update_chest_buttons();
            game.update_furnace_button()
        },
        restart: function() {
            this.id = -1;
            this.crafting = !1;
            this.timeout.v = 0;
            this.timeout.o = !1;
            this.update()
        }
    };
    this.alert = {
        timeout: new Utils.LinearAnimation(!1,1,1,0,4,.4),
        text: "",
        label: null ,
        draw: draw_alert
    };
    this.ldb = {
        can: document.createElement("canvas"),
        ids: [],
        update: !0,
        translate: {
            x: 0,
            y: 0
        },
        sort: function() {
            for (var c = [], g = world.players, f = 0; f < g.length; f++)
                g[f].alive && c.push({
                    id: f,
                    s: g[f].score
                });
            c.sort(function(c, e) {
                return e.s - c.s
            });
            this.ids = [];
            for (f = 0; f < c.length && 10 > f; f++)
                this.ids.push(c[f].id);
            this.update = !0
        },
        init: function(c) {
            for (var g = world.players, f = 0; f < g.length; f++)
                g[f].score = 0;
            g[user.id].score = Utils.restore_number(c[1]);
            this.ids = [];
            for (f = 2; f < c.length; f += 2)
                this.ids.push(c[f]),
                g[c[f]].score = Utils.restore_number(c[f + 1]);
            this.update = !0
        }
    };
    this.ldb.can.width = 180 * scale;
    this.ldb.can.height = 300 * scale;
    this.ldb.ctx = this.ldb.can.getContext("2d");
    this.chat = {
        open: !1,
        input: document.getElementById("chat_input"),
        style: document.getElementById("chat_block").style,
        update: function() {
            this.style.left = Math.floor(can.width / 2 - 150) + "px";
            this.style.top = Math.floor(can.height / 2 - 15 - 110 * scale) + "px"
        },
        quit: function() {
            this.open = !1;
            this.style.display = "none";
            this.input.value = ""
        },
        run: function() {
            world.fast_units[user.uid].text || (this.open ? (this.open = !1,
            this.style.display = "none",
            this.input.value && (client.send_chat(this.input.value),
            this.input.value = "")) : (this.open = !0,
            this.style.display = "inline-block",
            this.input.focus()))
        }
    }
}
var LOADER = {
    SERVER_INFO_URL: "datas/server_info.txt"
};
function Loader(c, g, f) {
    this.can = c;
    this.ctx = g;
    this.logo = {
        translate: {
            x: 0,
            y: 0
        },
        style: document.getElementById("loading").style,
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.logo.style.position = "absolute";
    this.logo.style.display = "inline-block";
    this.logo.update();
    this.is_run = !0;
    this.stop = function() {
        this.is_run = !1
    }
    ;
    this.loading = {
        total: 1
    };
    var d = this
      , e = function() {}
      , m = 0;
    this.quit_effect = function() {
        d.update();
        m++;
        40 == m ? (d.stop(),
        e()) : window.setTimeout(d.quit_effect, 33)
    }
    ;
    this.quit = function(c) {
        e = c;
        d.quit_effect()
    }
    ;
    var n = Object.keys(IMAGES).length
      , p = 0;
    c = function() {
        p++;
        p == n && (create_text(1, "l", 20, "#000"),
        r())
    }
    ;
    var q = function(c, d) {
        c && (client.store_server_list(),
        client.update_server_list(),
        setTimeout(f, 100))
    }
      , t = function() {
        client.xhttp_get(q, LOADER.SERVER_INFO_URL)
    }
      , r = function() {
        document.fonts && document.fonts.check ? document.fonts.check("1em Baloo Paaji") ? setTimeout(t, 100) : setTimeout(r, 100) : setTimeout(t, 1E3)
    }
    ;
    g = function() {}
    ;
    for (var u in IMAGES) {
        var v = IMAGES[u];
        IMAGES[u] = new Image;
        IMAGES[u].onload = c;
        IMAGES[u].onerror = g;
        IMAGES[u].src = v
    }
    this.update = function() {
        this.logo.translate.x = (this.can.width - 500) / 2;
        this.logo.translate.y = (this.can.height - 150) / 2;
        this.logo.translate.y -= 2500 / (40 - m + 1) - 48;
        this.logo.update()
    }
    ;
    this.logo.update();
    this.draw = function() {
        draw_fake_world();
        0 >= p || this.update()
    }
}
function UI(c, g) {
    this.can = c;
    this.ctx = g;
    var f = this;
    this.waiting = !1;
    this.loading = {
        translate: {
            x: 0,
            y: 0
        },
        angle: 0,
        img: sprite[SPRITE.GEAR2],
        draw: function() {
            this.angle += 2 * delta;
            g.save();
            g.translate(this.translate.x + this.img.width / 2, this.translate.y + this.img.height / 2);
            g.rotate(this.angle);
            g.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            g.restore()
        }
    };
    this.logo = gui_create_image(IMAGES.LOGO);
    gui_add_breath_effect(this.logo, 1.01, .99, 32, 64, this.logo.img.width, this.logo.img.height);
    this.server_list = {
        id: document.getElementById("region_select"),
        style: document.getElementById("region_select").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.nickname = {
        id: document.getElementById("nickname_block"),
        style: document.getElementById("nickname_block").style,
        input: document.getElementById("nickname_input"),
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.nickname.id.addEventListener("keyup", function(c) {
        c.preventDefault();
        13 != c.keyCode || f.waiting || f.play_game()
    });
    this.nickname.input.value = Cookies.get("starve_nickname") ? Cookies.get("starve_nickname") : "";
    this.all_rights_reserved = {
        id: document.getElementById("all_rights_reserved"),
        style: document.getElementById("all_rights_reserved").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.more_io_games = {
        id: document.getElementById("more_io_games"),
        style: document.getElementById("more_io_games").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.creation = {
        id: document.getElementById("creation"),
        style: document.getElementById("creation").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.sidebox = {
        id: document.getElementById("sidebox"),
        style: document.getElementById("sidebox").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.youtube = {
        id: document.getElementById("youtube"),
        style: document.getElementById("youtube").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.discord = {
        id: document.getElementById("discord"),
        style: document.getElementById("discord").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.trevda = {
        id: document.getElementById("trevda"),
        style: document.getElementById("trevda").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.deeeepio = {
        id: document.getElementById("deeeepio"),
        style: document.getElementById("deeeepio").style,
        translate: {
            x: 0,
            y: 0
        },
        update: function() {
            this.style.left = this.translate.x + "px";
            this.style.top = Math.floor(this.translate.y) + "px"
        }
    };
    this.play = gui_create_button(0, 0, "", sprite[SPRITE.PLAY]);
    var d = 0
      , e = function() {
        f.update();
        d++;
        30 == d ? (f.add_event_listener(),
        f.update()) : window.setTimeout(e, 33)
    }
    ;
    this.quit = function(c) {
        m = c;
        f.remove_event_listener();
        f.can.style.cursor = "auto";
        n = -1;
        p()
    }
    ;
    var m, n = -1, p = function() {
        f.update();
        n++;
        30 == n ? (Cookies.set("starve_nickname", f.nickname.input.value),
        f.nickname.style.display = "none",
        f.server_list.style.display = "none",
        f.all_rights_reserved.style.display = "none",
        f.more_io_games.style.display = "none",
        f.creation.style.display = "none",
        f.sidebox.style.display = "none",
        f.youtube.style.display = "none",
        f.discord.style.display = "none",
        f.trevda.style.display = "none",
        f.deeeepio.style.display = "none",
        f.stop(),
        m()) : window.setTimeout(p, 33)
    }
    ;
    this.is_run = !1;
    this.stop = function() {
        this.is_run = !1
    }
    ;
    this.run = function() {
        document.getElementById("game_body").style.backgroundColor = SPRITE.GROUND[fake_world.time];
        f.nickname.style.display = "inline-block";
        f.server_list.style.display = "inline-block";
        f.all_rights_reserved.style.display = "inline-block";
        f.more_io_games.style.display = "inline-block";
        f.creation.style.display = "inline-block";
        f.sidebox.style.display = "inline-block";
        f.youtube.style.display = "inline-block";
        f.discord.style.display = "inline-block";
        f.trevda.style.display = "inline-block";
        f.deeeepio.style.display = "inline-block";
        f.waiting = !1;
        f.is_run = !0;
        n = -1;
        d = 0;
        e()
    }
    ;
    this.update = function() {
        this.logo.translate.x = (this.can.width - this.logo.width) / 2 - 20;
        this.logo.translate.y = Math.max((this.can.height - this.logo.height) / 2 - 100, 20);
        this.play.info.translate.x = (this.can.width - this.play.info.img[0].width) / 2;
        this.play.info.translate.y = Math.max((this.can.height - this.logo.img.height) / 2 - 100, 20) + 420;
        this.loading.translate.x = (this.can.width - this.loading.img.width) / 2;
        this.loading.translate.y = this.play.info.translate.y - 42 * scale;
        this.nickname.translate.x = (this.can.width - 350) / 2;
        this.nickname.translate.y = this.play.info.translate.y - 135;
        this.server_list.translate.x = (this.can.width - 350) / 2;
        this.server_list.translate.y = this.play.info.translate.y - 58;
        this.all_rights_reserved.translate.x = (this.can.width - 300) / 2;
        this.all_rights_reserved.translate.y = this.can.height - 30;
        this.more_io_games.translate.x = 10;
        this.more_io_games.translate.y = this.can.height - 35;
        this.creation.translate.x = 10;
        this.creation.translate.y = 5;
        this.sidebox.translate.x = this.can.width - 280;
        this.sidebox.translate.y = 0;
        this.youtube.translate.x = (this.can.width - 120) / 2;
        this.youtube.translate.y = this.play.info.translate.y - 175;
        this.discord.translate.x = this.can.width - 370;
        this.discord.translate.y = -25;
        this.trevda.translate.x = Math.floor((this.can.width - 350) / 2 - 450);
        this.trevda.translate.y = Math.floor((this.can.height - 250) / 2 - 100);
        this.deeeepio.translate.x = Math.floor((this.can.width - 350) / 2 - 450);
        this.deeeepio.translate.y = this.trevda.translate.y + 280;
        if (30 != d || -1 != n) {
            var c = 0;
            30 != d && (c = 1500 / (d + 1) - 50);
            -1 != n && (c = -(1750 / (30 - n + 1) - 48));
            this.logo.translate.y -= c;
            this.play.info.translate.y -= c;
            this.loading.translate.y -= c;
            this.nickname.translate.y -= c;
            this.server_list.translate.y -= c;
            this.sidebox.translate.y -= c;
            this.youtube.translate.y -= c;
            this.deeeepio.translate.y -= c;
            this.discord.translate.y -= 0 < c ? c : -c;
            this.creation.translate.y -= 0 < c ? c : -c;
            this.all_rights_reserved.translate.y -= 0 > c ? c : -c;
            this.more_io_games.translate.y -= 0 > c ? c : -c
        }
        this.nickname.update();
        this.server_list.update();
        this.all_rights_reserved.update();
        this.more_io_games.update();
        this.creation.update();
        this.sidebox.update();
        this.youtube.update();
        this.discord.update();
        this.trevda.update();
        this.deeeepio.update()
    }
    ;
    this.effect = function() {
        gui_breath_effect(this.logo);
        this.logo.width = this.logo.img.width * this.logo.scale;
        this.logo.height = this.logo.img.height * this.logo.scale
    }
    ;
    this.draw = function() {
        draw_fake_world();
        this.effect();
        this.update();
        this.logo.draw(this.ctx);
        f.waiting ? this.loading.draw() : this.play.draw(this.ctx);
        user.alert.draw("#FFFFFF", "#4acb76")
    }
    ;
    this.trigger_mousedown = function(c) {
        c = get_mouse_pos(this.can, c);
        f.waiting || f.play.trigger(f.can, c, MOUSE_DOWN)
    }
    ;
    this.play_game = function() {
        f.waiting = !0;
        ___adsvid % 2 || !adplayer ? client.connect() : adplayer.startPreRoll()
    }
    ;
    this.trigger_mouseup = function(c) {
        c = get_mouse_pos(this.can, c);
        !f.waiting && f.play.trigger(f.can, c, MOUSE_UP) && (f.play.info.state = BUTTON_OUT,
        f.play_game())
    }
    ;
    this.trigger_mousemove = function(d) {
        d = get_mouse_pos(this.can, d);
        var e = !1;
        f.waiting || (e |= f.play.trigger(f.can, d, MOUSE_MOVE));
        c.style.cursor = e ? "pointer" : "auto"
    }
    ;
    this.add_event_listener = function() {
        window.addEventListener("mousedown", this.trigger_mousedown, !1);
        window.addEventListener("mouseup", this.trigger_mouseup, !1);
        window.addEventListener("mousemove", this.trigger_mousemove, !1)
    }
    ;
    this.remove_event_listener = function() {
        window.removeEventListener("mousedown", this.trigger_mousedown, !1);
        window.removeEventListener("mouseup", this.trigger_mouseup, !1);
        window.removeEventListener("mousemove", this.trigger_mousemove, !1)
    }
}
function Game(c, g) {
    var f = this;
    this.can = c;
    this.ctx = g;
    this.minimap = {
        translate: {
            x: 0,
            y: 0
        }
    };
    this.leaderboard = {
        translate: {
            x: 0,
            y: 0
        },
        img: sprite[SPRITE.LEADERBOARD],
        can: document.createElement("canvas")
    };
    this.leaderboard.can.width = this.leaderboard.img.width;
    this.leaderboard.can.height = this.leaderboard.img.height;
    this.leaderboard.ctx = this.leaderboard.can.getContext("2d");
    this.gauges = {
        translate: {
            x: 0,
            y: 0
        },
        img: sprite[SPRITE.GAUGES],
        draw: draw_gauges
    };
    this.furnace_button = gui_create_button(0, 0, "", sprite[SPRITE.FURNACE_BUTTON]);
    this.chest_buttons = [];
    this.chest_buttons[INV.SWORD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SWORD]);
    this.chest_buttons[INV.SWORD].id = INV.SWORD;
    this.chest_buttons[INV.PICK] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PICK]);
    this.chest_buttons[INV.PICK].id = INV.PICK;
    this.chest_buttons[INV.STONE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_STONE]);
    this.chest_buttons[INV.STONE].id = INV.STONE;
    this.chest_buttons[INV.WOOD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_WOOD]);
    this.chest_buttons[INV.WOOD].id = INV.WOOD;
    this.chest_buttons[INV.PLANT] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PLANT]);
    this.chest_buttons[INV.PLANT].id = INV.PLANT;
    this.chest_buttons[INV.GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_GOLD]);
    this.chest_buttons[INV.GOLD].id = INV.GOLD;
    this.chest_buttons[INV.DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DIAMOND]);
    this.chest_buttons[INV.DIAMOND].id = INV.DIAMOND;
    this.chest_buttons[INV.PICK_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PICK_GOLD]);
    this.chest_buttons[INV.PICK_GOLD].id = INV.PICK_GOLD;
    this.chest_buttons[INV.PICK_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PICK_DIAMOND]);
    this.chest_buttons[INV.PICK_DIAMOND].id = INV.PICK_DIAMOND;
    this.chest_buttons[INV.SWORD_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SWORD_GOLD]);
    this.chest_buttons[INV.SWORD_GOLD].id = INV.SWORD_GOLD;
    this.chest_buttons[INV.SWORD_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SWORD_DIAMOND]);
    this.chest_buttons[INV.SWORD_DIAMOND].id = INV.SWORD_DIAMOND;
    this.chest_buttons[INV.FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FIRE]);
    this.chest_buttons[INV.FIRE].id = INV.FIRE;
    this.chest_buttons[INV.WORKBENCH] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_WORKBENCH]);
    this.chest_buttons[INV.WORKBENCH].id = INV.WORKBENCH;
    this.chest_buttons[INV.SEED] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SEED]);
    this.chest_buttons[INV.SEED].id = INV.SEED;
    this.chest_buttons[INV.WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_WALL]);
    this.chest_buttons[INV.WALL].id = INV.WALL;
    this.chest_buttons[INV.SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SPIKE]);
    this.chest_buttons[INV.SPIKE].id = INV.SPIKE;
    this.chest_buttons[INV.PICK_WOOD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PICK_WOOD]);
    this.chest_buttons[INV.PICK_WOOD].id = INV.PICK_WOOD;
    this.chest_buttons[INV.COOKED_MEAT] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_COOKED_MEAT]);
    this.chest_buttons[INV.COOKED_MEAT].id = INV.COOKED_MEAT;
    this.chest_buttons[INV.MEAT] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_MEAT]);
    this.chest_buttons[INV.MEAT].id = INV.MEAT;
    this.chest_buttons[INV.BIG_FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_BIG_FIRE]);
    this.chest_buttons[INV.BIG_FIRE].id = INV.BIG_FIRE;
    this.chest_buttons[INV.BANDAGE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_BANDAGE]);
    this.chest_buttons[INV.BANDAGE].id = INV.BANDAGE;
    this.chest_buttons[INV.CORD] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_CORD]);
    this.chest_buttons[INV.CORD].id = INV.CORD;
    this.chest_buttons[INV.STONE_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_STONE_WALL]);
    this.chest_buttons[INV.STONE_WALL].id = INV.STONE_WALL;
    this.chest_buttons[INV.GOLD_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_GOLD_WALL]);
    this.chest_buttons[INV.GOLD_WALL].id = INV.GOLD_WALL;
    this.chest_buttons[INV.DIAMOND_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DIAMOND_WALL]);
    this.chest_buttons[INV.DIAMOND_WALL].id = INV.DIAMOND_WALL;
    this.chest_buttons[INV.WOOD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DOOR_WOOD_CLOSE]);
    this.chest_buttons[INV.WOOD_DOOR].id = INV.WOOD_DOOR;
    this.chest_buttons[INV.CHEST] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_CHEST]);
    this.chest_buttons[INV.CHEST].id = INV.CHEST;
    this.chest_buttons[INV.STONE_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_STONE_SPIKE]);
    this.chest_buttons[INV.STONE_SPIKE].id = INV.STONE_SPIKE;
    this.chest_buttons[INV.GOLD_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_GOLD_SPIKE]);
    this.chest_buttons[INV.GOLD_SPIKE].id = INV.GOLD_SPIKE;
    this.chest_buttons[INV.DIAMOND_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DIAMOND_SPIKE]);
    this.chest_buttons[INV.DIAMOND_SPIKE].id = INV.DIAMOND_SPIKE;
    this.chest_buttons[INV.BAG] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_BAG]);
    this.chest_buttons[INV.BAG].id = INV.BAG;
    this.chest_buttons[INV.FUR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FUR]);
    this.chest_buttons[INV.FUR].id = INV.FUR;
    this.chest_buttons[INV.FUR_WOLF] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FUR_WOLF]);
    this.chest_buttons[INV.FUR_WOLF].id = INV.FUR_WOLF;
    this.chest_buttons[INV.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_EARMUFFS]);
    this.chest_buttons[INV.EARMUFFS].id = INV.EARMUFFS;
    this.chest_buttons[INV.STONE_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DOOR_STONE_CLOSE]);
    this.chest_buttons[INV.STONE_DOOR].id = INV.STONE_DOOR;
    this.chest_buttons[INV.GOLD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DOOR_GOLD_CLOSE]);
    this.chest_buttons[INV.GOLD_DOOR].id = INV.GOLD_DOOR;
    this.chest_buttons[INV.DIAMOND_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DOOR_DIAMOND_CLOSE]);
    this.chest_buttons[INV.DIAMOND_DOOR].id = INV.DIAMOND_DOOR;
    this.chest_buttons[INV.FUR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FUR]);
    this.chest_buttons[INV.FUR].id = INV.FUR;
    this.chest_buttons[INV.FUR_WOLF] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FUR_WOLF]);
    this.chest_buttons[INV.FUR_WOLF].id = INV.FUR_WOLF;
    this.chest_buttons[INV.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_EARMUFFS]);
    this.chest_buttons[INV.EARMUFFS].id = INV.EARMUFFS;
    this.chest_buttons[INV.COAT] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_COAT]);
    this.chest_buttons[INV.COAT].id = INV.COAT;
    this.chest_buttons[INV.SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_SPEAR]);
    this.chest_buttons[INV.SPEAR].id = INV.SPEAR;
    this.chest_buttons[INV.GOLD_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_GOLD_SPEAR]);
    this.chest_buttons[INV.GOLD_SPEAR].id = INV.GOLD_SPEAR;
    this.chest_buttons[INV.DIAMOND_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_DIAMOND_SPEAR]);
    this.chest_buttons[INV.DIAMOND_SPEAR].id = INV.DIAMOND_SPEAR;
    this.chest_buttons[INV.FURNACE] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_FURNACE]);
    this.chest_buttons[INV.FURNACE].id = INV.FURNACE;
    this.plus_buttons = [];
    for (var d = 0; 100 > d; d++)
        this.plus_buttons[d] = gui_create_button(0, 0, "", sprite[SPRITE.CHEST_PLUS]);
    this.inv_buttons = [];
    this.inv_buttons[INV.SWORD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SWORD]);
    this.inv_buttons[INV.SWORD].id = INV.SWORD;
    this.inv_buttons[INV.PICK] = gui_create_button(0, 0, "", sprite[SPRITE.INV_PICK]);
    this.inv_buttons[INV.PICK].id = INV.PICK;
    this.inv_buttons[INV.STONE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_STONE]);
    this.inv_buttons[INV.STONE].id = INV.STONE;
    this.inv_buttons[INV.STONE].info.img[2] = this.inv_buttons[INV.STONE].info.img[0];
    this.inv_buttons[INV.WOOD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_WOOD]);
    this.inv_buttons[INV.WOOD].id = INV.WOOD;
    this.inv_buttons[INV.WOOD].info.img[2] = this.inv_buttons[INV.WOOD].info.img[0];
    this.inv_buttons[INV.PLANT] = gui_create_button(0, 0, "", sprite[SPRITE.INV_PLANT]);
    this.inv_buttons[INV.PLANT].id = INV.PLANT;
    this.inv_buttons[INV.GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_GOLD]);
    this.inv_buttons[INV.GOLD].id = INV.GOLD;
    this.inv_buttons[INV.GOLD].info.img[2] = this.inv_buttons[INV.GOLD].info.img[0];
    this.inv_buttons[INV.DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DIAMOND]);
    this.inv_buttons[INV.DIAMOND].id = INV.DIAMOND;
    this.inv_buttons[INV.DIAMOND].info.img[2] = this.inv_buttons[INV.DIAMOND].info.img[0];
    this.inv_buttons[INV.PICK_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_PICK_GOLD]);
    this.inv_buttons[INV.PICK_GOLD].id = INV.PICK_GOLD;
    this.inv_buttons[INV.PICK_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.INV_PICK_DIAMOND]);
    this.inv_buttons[INV.PICK_DIAMOND].id = INV.PICK_DIAMOND;
    this.inv_buttons[INV.SWORD_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SWORD_GOLD]);
    this.inv_buttons[INV.SWORD_GOLD].id = INV.SWORD_GOLD;
    this.inv_buttons[INV.SWORD_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SWORD_DIAMOND]);
    this.inv_buttons[INV.SWORD_DIAMOND].id = INV.SWORD_DIAMOND;
    this.inv_buttons[INV.FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FIRE]);
    this.inv_buttons[INV.FIRE].id = INV.FIRE;
    this.inv_buttons[INV.WORKBENCH] = gui_create_button(0, 0, "", sprite[SPRITE.INV_WORK]);
    this.inv_buttons[INV.WORKBENCH].id = INV.WORKBENCH;
    this.inv_buttons[INV.SEED] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SEED]);
    this.inv_buttons[INV.SEED].id = INV.SEED;
    this.inv_buttons[INV.WALL] = gui_create_button(0, 0, "", sprite[SPRITE.INV_WALL]);
    this.inv_buttons[INV.WALL].id = INV.WALL;
    this.inv_buttons[INV.SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SPIKE]);
    this.inv_buttons[INV.SPIKE].id = INV.SPIKE;
    this.inv_buttons[INV.PICK_WOOD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_PICK_WOOD]);
    this.inv_buttons[INV.PICK_WOOD].id = INV.PICK_WOOD;
    this.inv_buttons[INV.COOKED_MEAT] = gui_create_button(0, 0, "", sprite[SPRITE.INV_COOKED_MEAT]);
    this.inv_buttons[INV.COOKED_MEAT].id = INV.COOKED_MEAT;
    this.inv_buttons[INV.MEAT] = gui_create_button(0, 0, "", sprite[SPRITE.INV_MEAT]);
    this.inv_buttons[INV.MEAT].id = INV.MEAT;
    this.inv_buttons[INV.BIG_FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_BIG_FIRE]);
    this.inv_buttons[INV.BIG_FIRE].id = INV.BIG_FIRE;
    this.inv_buttons[INV.BANDAGE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_BANDAGE]);
    this.inv_buttons[INV.BANDAGE].id = INV.BANDAGE;
    this.inv_buttons[INV.CORD] = gui_create_button(0, 0, "", sprite[SPRITE.INV_CORD]);
    this.inv_buttons[INV.CORD].id = INV.CORD;
    this.inv_buttons[INV.STONE_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.INV_STONE_WALL]);
    this.inv_buttons[INV.STONE_WALL].id = INV.STONE_WALL;
    this.inv_buttons[INV.GOLD_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.INV_GOLD_WALL]);
    this.inv_buttons[INV.GOLD_WALL].id = INV.GOLD_WALL;
    this.inv_buttons[INV.DIAMOND_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DIAMOND_WALL]);
    this.inv_buttons[INV.DIAMOND_WALL].id = INV.DIAMOND_WALL;
    this.inv_buttons[INV.WOOD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DOOR_WOOD_CLOSE]);
    this.inv_buttons[INV.WOOD_DOOR].id = INV.WOOD_DOOR;
    this.inv_buttons[INV.CHEST] = gui_create_button(0, 0, "", sprite[SPRITE.INV_CHEST]);
    this.inv_buttons[INV.CHEST].id = INV.CHEST;
    this.inv_buttons[INV.STONE_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_STONE_SPIKE]);
    this.inv_buttons[INV.STONE_SPIKE].id = INV.STONE_SPIKE;
    this.inv_buttons[INV.GOLD_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_GOLD_SPIKE]);
    this.inv_buttons[INV.GOLD_SPIKE].id = INV.GOLD_SPIKE;
    this.inv_buttons[INV.DIAMOND_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DIAMOND_SPIKE]);
    this.inv_buttons[INV.DIAMOND_SPIKE].id = INV.DIAMOND_SPIKE;
    this.inv_buttons[INV.BAG] = gui_create_button(0, 0, "", sprite[SPRITE.INV_BAG]);
    this.inv_buttons[INV.BAG].id = INV.BAG;
    this.inv_buttons[INV.FUR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FUR]);
    this.inv_buttons[INV.FUR].id = INV.FUR;
    this.inv_buttons[INV.FUR_WOLF] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FUR_WOLF]);
    this.inv_buttons[INV.FUR_WOLF].id = INV.FUR_WOLF;
    this.inv_buttons[INV.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.INV_EARMUFFS]);
    this.inv_buttons[INV.EARMUFFS].id = INV.EARMUFFS;
    this.inv_buttons[INV.STONE_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DOOR_STONE_CLOSE]);
    this.inv_buttons[INV.STONE_DOOR].id = INV.STONE_DOOR;
    this.inv_buttons[INV.GOLD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DOOR_GOLD_CLOSE]);
    this.inv_buttons[INV.GOLD_DOOR].id = INV.GOLD_DOOR;
    this.inv_buttons[INV.DIAMOND_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DOOR_DIAMOND_CLOSE]);
    this.inv_buttons[INV.DIAMOND_DOOR].id = INV.DIAMOND_DOOR;
    this.inv_buttons[INV.FUR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FUR]);
    this.inv_buttons[INV.FUR].id = INV.FUR;
    this.inv_buttons[INV.FUR_WOLF] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FUR_WOLF]);
    this.inv_buttons[INV.FUR_WOLF].id = INV.FUR_WOLF;
    this.inv_buttons[INV.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.INV_EARMUFFS]);
    this.inv_buttons[INV.EARMUFFS].id = INV.EARMUFFS;
    this.inv_buttons[INV.COAT] = gui_create_button(0, 0, "", sprite[SPRITE.INV_COAT]);
    this.inv_buttons[INV.COAT].id = INV.COAT;
    this.inv_buttons[INV.SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_SPEAR]);
    this.inv_buttons[INV.SPEAR].id = INV.SPEAR;
    this.inv_buttons[INV.GOLD_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_GOLD_SPEAR]);
    this.inv_buttons[INV.GOLD_SPEAR].id = INV.GOLD_SPEAR;
    this.inv_buttons[INV.DIAMOND_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.INV_DIAMOND_SPEAR]);
    this.inv_buttons[INV.DIAMOND_SPEAR].id = INV.DIAMOND_SPEAR;
    this.inv_buttons[INV.FURNACE] = gui_create_button(0, 0, "", sprite[SPRITE.INV_FURNACE]);
    this.inv_buttons[INV.FURNACE].id = INV.FURNACE;
    this.craft_buttons = [];
    this.craft_buttons[CRAFT.SWORD] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SWORD]);
    this.craft_buttons[CRAFT.SWORD].id = CRAFT.SWORD;
    this.craft_buttons[CRAFT.PICK] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_PICK]);
    this.craft_buttons[CRAFT.PICK].id = CRAFT.PICK;
    this.craft_buttons[CRAFT.FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_FIRE]);
    this.craft_buttons[CRAFT.FIRE].id = CRAFT.FIRE;
    this.craft_buttons[CRAFT.WORKBENCH] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_WORK]);
    this.craft_buttons[CRAFT.WORKBENCH].id = CRAFT.WORKBENCH;
    this.craft_buttons[CRAFT.WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_WALL]);
    this.craft_buttons[CRAFT.WALL].id = CRAFT.WALL;
    this.craft_buttons[CRAFT.SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SPIKE]);
    this.craft_buttons[CRAFT.SPIKE].id = CRAFT.SPIKE;
    this.craft_buttons[CRAFT.SEED] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SEED]);
    this.craft_buttons[CRAFT.SEED].id = CRAFT.SEED;
    this.craft_buttons[CRAFT.PICK_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_PICK_GOLD]);
    this.craft_buttons[CRAFT.PICK_GOLD].id = CRAFT.PICK_GOLD;
    this.craft_buttons[CRAFT.PICK_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_PICK_DIAMOND]);
    this.craft_buttons[CRAFT.PICK_DIAMOND].id = CRAFT.PICK_DIAMOND;
    this.craft_buttons[CRAFT.SWORD_GOLD] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SWORD_GOLD]);
    this.craft_buttons[CRAFT.SWORD_GOLD].id = CRAFT.SWORD_GOLD;
    this.craft_buttons[CRAFT.SWORD_DIAMOND] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SWORD_DIAMOND]);
    this.craft_buttons[CRAFT.SWORD_DIAMOND].id = CRAFT.SWORD_DIAMOND;
    this.craft_buttons[CRAFT.PICK_WOOD] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_PICK_WOOD]);
    this.craft_buttons[CRAFT.PICK_WOOD].id = CRAFT.PICK_WOOD;
    this.craft_buttons[CRAFT.COOKED_MEAT] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_COOKED_MEAT]);
    this.craft_buttons[CRAFT.COOKED_MEAT].id = CRAFT.COOKED_MEAT;
    this.craft_buttons[CRAFT.BIG_FIRE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_BIG_FIRE]);
    this.craft_buttons[CRAFT.BIG_FIRE].id = CRAFT.BIG_FIRE;
    this.craft_buttons[CRAFT.BANDAGE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_BANDAGE]);
    this.craft_buttons[CRAFT.BANDAGE].id = CRAFT.BANDAGE;
    this.craft_buttons[CRAFT.STONE_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_STONE_WALL]);
    this.craft_buttons[CRAFT.STONE_WALL].id = CRAFT.STONE_WALL;
    this.craft_buttons[CRAFT.GOLD_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_GOLD_WALL]);
    this.craft_buttons[CRAFT.GOLD_WALL].id = CRAFT.GOLD_WALL;
    this.craft_buttons[CRAFT.DIAMOND_WALL] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DIAMOND_WALL]);
    this.craft_buttons[CRAFT.DIAMOND_WALL].id = CRAFT.DIAMOND_WALL;
    this.craft_buttons[CRAFT.WOOD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DOOR_WOOD_CLOSE]);
    this.craft_buttons[CRAFT.WOOD_DOOR].id = CRAFT.WOOD_DOOR;
    this.craft_buttons[CRAFT.CHEST] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_CHEST]);
    this.craft_buttons[CRAFT.CHEST].id = CRAFT.CHEST;
    this.craft_buttons[CRAFT.STONE_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_STONE_SPIKE]);
    this.craft_buttons[CRAFT.STONE_SPIKE].id = CRAFT.STONE_SPIKE;
    this.craft_buttons[CRAFT.GOLD_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_GOLD_SPIKE]);
    this.craft_buttons[CRAFT.GOLD_SPIKE].id = CRAFT.GOLD_SPIKE;
    this.craft_buttons[CRAFT.DIAMOND_SPIKE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DIAMOND_SPIKE]);
    this.craft_buttons[CRAFT.DIAMOND_SPIKE].id = CRAFT.DIAMOND_SPIKE;
    this.craft_buttons[CRAFT.BAG] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_BAG]);
    this.craft_buttons[CRAFT.BAG].id = CRAFT.BAG;
    this.craft_buttons[CRAFT.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_EARMUFFS]);
    this.craft_buttons[CRAFT.EARMUFFS].id = CRAFT.EARMUFFS;
    this.craft_buttons[CRAFT.STONE_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DOOR_STONE_CLOSE]);
    this.craft_buttons[CRAFT.STONE_DOOR].id = CRAFT.STONE_DOOR;
    this.craft_buttons[CRAFT.GOLD_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DOOR_GOLD_CLOSE]);
    this.craft_buttons[CRAFT.GOLD_DOOR].id = CRAFT.GOLD_DOOR;
    this.craft_buttons[CRAFT.DIAMOND_DOOR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DOOR_DIAMOND_CLOSE]);
    this.craft_buttons[CRAFT.DIAMOND_DOOR].id = CRAFT.DIAMOND_DOOR;
    this.craft_buttons[CRAFT.EARMUFFS] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_EARMUFFS]);
    this.craft_buttons[CRAFT.EARMUFFS].id = CRAFT.EARMUFFS;
    this.craft_buttons[CRAFT.COAT] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_COAT]);
    this.craft_buttons[CRAFT.COAT].id = CRAFT.COAT;
    this.craft_buttons[CRAFT.SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_SPEAR]);
    this.craft_buttons[CRAFT.SPEAR].id = CRAFT.SPEAR;
    this.craft_buttons[CRAFT.GOLD_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_GOLD_SPEAR]);
    this.craft_buttons[CRAFT.GOLD_SPEAR].id = CRAFT.GOLD_SPEAR;
    this.craft_buttons[CRAFT.DIAMOND_SPEAR] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_DIAMOND_SPEAR]);
    this.craft_buttons[CRAFT.DIAMOND_SPEAR].id = CRAFT.DIAMOND_SPEAR;
    this.craft_buttons[CRAFT.FURNACE] = gui_create_button(0, 0, "", sprite[SPRITE.CRAFT_FURNACE]);
    this.craft_buttons[CRAFT.FURNACE].id = CRAFT.FURNACE;
    this.update_craft_buttons = function() {
        for (var c = user.craft.can_craft, d = 10, e = 10, f = 0; f < c.length; f++)
            0 < f && !(f % 4) && (d += c[0].info.img[0].width + 10,
            e = 10),
            c[f].info.translate.x = d,
            c[f].info.translate.y = e,
            e += 10 + c[f].info.img[0].height
    }
    ;
    this.update_chest_buttons = function() {
        for (var c = Math.floor(Math.floor((3 + user.craft.can_craft.length) / 4) * (10 + this.chest_buttons[0].info.img[0].width) + 35), d = 0; d < this.chest_buttons.length; d++)
            this.chest_buttons[d] && (this.chest_buttons[d].info.translate.x = c,
            this.chest_buttons[d].info.translate.y = 22)
    }
    ;
    this.update_furnace_button = function() {
        this.furnace_button.info.translate.x = Math.floor(Math.floor((3 + user.craft.can_craft.length) / 4) * (10 + this.furnace_button.info.img[0].width) + 35);
        this.furnace_button.info.translate.y = 22
    }
    ;
    this.update_inv_buttons = function() {
        for (var d = user.inv.can_select, e = 0; e < d.length; e++)
            d[e].info.translate.x = (d[e].info.img[0].width + 10) * e + this.gauges.img.width + 50,
            d[e].info.translate.y = c.height - d[e].info.img[0].width - 10,
            this.plus_buttons[d[e].id].info.translate.x = d[e].info.translate.x + 18,
            this.plus_buttons[d[e].id].info.translate.y = d[e].info.translate.y - this.plus_buttons[d[e].id].info.img[0].height - 6
    }
    ;
    var e = 0
      , m = function() {
        f.update();
        e++;
        30 == e ? (f.add_event_listener(),
        f.update()) : window.setTimeout(m, 33)
    }
    ;
    this.quit = function(c) {
        n = c;
        f.remove_event_listener();
        f.can.style.cursor = "auto";
        p = -1;
        q()
    }
    ;
    var n, p = -1, q = function() {
        f.update();
        p++;
        30 == p ? (f.stop(),
        n()) : window.setTimeout(q, 33)
    }
    ;
    this.is_run = !1;
    this.stop = function() {
        this.is_run = !1
    }
    ;
    this.run = function() {
        client.change_ground();
        f.is_run = !0;
        p = -1;
        e = 0;
        m()
    }
    ;
    this.update = function() {
        this.leaderboard.translate.x = this.can.width - this.leaderboard.img.width;
        this.leaderboard.translate.y = 0;
        user.auto_feed.translate.x = this.leaderboard.translate.x - sprite[SPRITE.AUTO_FEED].width - 10;
        user.auto_feed.translate.y = 10;
        this.minimap.translate.x = this.can.width - 3 - sprite[SPRITE.MINIMAP][0].width;
        this.minimap.translate.y = this.can.height - 3 - sprite[SPRITE.MINIMAP][0].height;
        this.gauges.translate.x = 0;
        this.gauges.translate.y = this.can.height - this.gauges.img.height;
        this.update_craft_buttons();
        this.update_inv_buttons();
        this.update_chest_buttons();
        this.update_furnace_button();
        user.chat.update();
        var c = 0;
        30 != e && (c = 1500 / (e + 1) - 50);
        -1 != p && (c = -(1500 / (30 - p + 1) - 48));
        this.leaderboard.translate.y -= 0 < c ? c : -c;
        user.auto_feed.translate.y -= 0 < c ? c : -c;
        this.gauges.translate.y -= 0 > c ? c : -c;
        this.minimap.translate.y -= 0 > c ? c : -c
    }
    ;
    this.draw_UI = function() {
        draw_minimap();
        draw_leaderboard();
        draw_auto_feed();
        this.gauges.draw();
        draw_ui_crafting();
        draw_ui_inventory();
        draw_chest_inventory();
        draw_furnace_inventory();
        user.alert.draw("#FFF")
    }
    ;
    this.update_scene = function() {
        user.cam.update();
        user.gauges.update();
        user.control.update();
        user.auto_feed.update();
        world.update()
    }
    ;
    this.draw_scene = function() {
        draw_world_with_effect()
    }
    ;
    this.update_connection = function() {
        client.check_state();
        client.check_pong();
        client.try_ping();
        client.update_cam()
    }
    ;
    this.draw = function() {
        this.update_connection();
        this.update_scene();
        this.draw_scene();
        this.draw_UI()
    }
    ;
    this.trigger_keyup = function(c) {
        user.chat.open && 27 == c.keyCode ? user.chat.quit() : 13 == c.keyCode ? user.chat.run() : user.chat.open || 82 != c.keyCode || (user.auto_feed.enabled = !user.auto_feed.enabled);
        keyboard.up(c)
    }
    ;
    this.trigger_keydown = function(c) {
        keyboard.down(c);
        8 != c.keyCode || user.chat.open || c.preventDefault()
    }
    ;
    this.trigger_mousedown = function(c) {
        mouse.pos = get_mouse_pos(this.can, c);
        c = !1;
        var d = user.chest;
        0 > user.craft.id && 0 <= d.id && (c |= f.chest_buttons[user.chest.id].trigger(f.can, mouse.pos, MOUSE_DOWN));
        if (0 > user.craft.id)
            for (var e = user.inv.can_select, g = 0; g < e.length; g++)
                if (c |= e[g].trigger(f.can, mouse.pos, MOUSE_DOWN),
                d.open && (0 > d.id || d.id == e[g].id) || user.furnace.open && e[g].id == INV.WOOD)
                    c |= f.plus_buttons[e[g].id].trigger(f.can, mouse.pos, MOUSE_DOWN);
        if (0 > user.craft.id && 0 > user.craft.preview)
            for (e = user.craft.can_craft,
            g = 0; g < e.length; g++)
                c |= e[g].trigger(f.can, mouse.pos, MOUSE_DOWN);
        c || (0 <= user.craft.preview ? client.send_build() : mouse.down())
    }
    ;
    this.trigger_mouseup = function(c) {
        mouse.pos = get_mouse_pos(this.can, c);
        mouse.up();
        var d = user.chest
          , e = user.furnace;
        if (0 > user.craft.id && 0 <= d.id) {
            var g = f.chest_buttons[user.chest.id].trigger(f.can, mouse.pos, MOUSE_UP);
            g && client.take_chest(d)
        }
        if (0 > user.craft.id)
            for (var m = user.inv.can_select, n = 0; n < m.length; n++)
                (g = m[n].trigger(f.can, mouse.pos, MOUSE_UP)) ? 1 == c.which ? client.select_inv(m[n].id, n) : 3 == c.which && 0 > user.craft.preview && client.delete_inv(m[n].id, n) : d.open && (0 > d.id || d.id == m[n].id) ? (g = f.plus_buttons[m[n].id].trigger(f.can, mouse.pos, MOUSE_UP)) && 0 > user.craft.preview && client.give_item(d, m[n].id, c.shiftKey ? 10 : 1) : e.open && m[n].id == INV.WOOD && (g = f.plus_buttons[m[n].id].trigger(f.can, mouse.pos, MOUSE_UP)) && 0 > user.craft.preview && client.give_wood(e, c.shiftKey ? 10 : 1);
        if (0 > user.craft.id && 0 > user.craft.preview)
            for (m = user.craft.can_craft,
            n = 0; n < m.length; n++)
                (g = m[n].trigger(f.can, mouse.pos, MOUSE_UP)) && client.select_craft(m[n].id);
        user.craft.crafting && 3 == c.which && client.cancel_crafting()
    }
    ;
    this.trigger_mousemove = function(d) {
        mouse.pos = get_mouse_pos(this.can, d);
        d = !1;
        var e = user.chest;
        0 > user.craft.id && 0 <= e.id && (d |= f.chest_buttons[e.id].trigger(f.can, mouse.pos, MOUSE_MOVE));
        if (0 > user.craft.id)
            for (var g = user.inv.can_select, m = 0; m < g.length; m++)
                if (d |= g[m].trigger(f.can, mouse.pos, MOUSE_MOVE),
                e.open && (0 > e.id || e.id == g[m].id) || user.furnace.open && g[m].id == INV.WOOD)
                    d |= f.plus_buttons[g[m].id].trigger(f.can, mouse.pos, MOUSE_MOVE);
        if (0 > user.craft.id && 0 > user.craft.preview)
            for (g = user.craft.can_craft,
            m = 0; m < g.length; m++)
                d |= g[m].trigger(f.can, mouse.pos, MOUSE_MOVE);
        c.style.cursor = d ? "pointer" : "auto"
    }
    ;
    this.add_event_listener = function() {
        window.addEventListener("mousedown", this.trigger_mousedown, !1);
        window.addEventListener("mouseup", this.trigger_mouseup, !1);
        window.addEventListener("mousemove", this.trigger_mousemove, !1);
        window.addEventListener("keyup", this.trigger_keyup, !1);
        window.addEventListener("keydown", this.trigger_keydown, !1)
    }
    ;
    this.remove_event_listener = function() {
        window.removeEventListener("mousedown", this.trigger_mousedown, !1);
        window.removeEventListener("mouseup", this.trigger_mouseup, !1);
        window.removeEventListener("mousemove", this.trigger_mousemove, !1);
        window.removeEventListener("keyup", this.trigger_keyup, !1);
        window.removeEventListener("keydown", this.trigger_keydown, !1)
    }
}
var fake_world = {
    time: Math.floor(2 * Math.random()),
    items: []
};
init_fake_world();
var ui, game = {
    is_run: !1
}, world, user, client = new Client, keyboard = new Keyboard, mouse = new Mouse, delta = 0, old_timestamp = 0, fps = {
    img: !1,
    counter: 0,
    delay: 0,
    cycle: 60,
    display: !0
}, loader = new Loader(can,ctx,function() {
    create_images();
    game = new Game(can,ctx);
    ui = new UI(can,ctx);
    world = new World;
    user = new User;
    loader.quit(function() {
        loader.logo.style.display = "none";
        ui.run()
    })
}
);
function draw(c) {
    window.requestAnimationFrame(draw);
    delta = (c - old_timestamp) / 1E3;
    old_timestamp = c;
    delta = 1 < delta ? 1 : delta;
    game.is_run ? game.draw() : (ctx.clearRect(0, 0, can.width, can.height),
    loader.is_run ? loader.draw() : ui.is_run && ui.draw())
}
resize_canvas();
draw(0);
function initAipPreroll() {
    "undefined" != typeof aipPlayer ? adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_FULLSCREEN: !0,
        PREROLL_ELEM: document.getElementById("preroll"),
        AIP_COMPLETE: function() {
            client.connect()
        },
        AIP_REMOVE: function() {}
    }) : client.connect()
}
function getScript(c, g) {
    var f = document.head || document.getElementsByTagName("head")[0]
      , d = document.createElement("script")
      , e = !0;
    d.async = "async";
    d.type = "text/javascript";
    d.charset = "UTF-8";
    d.src = c;
    d.onload = d.onreadystatechange = function() {
        !e || d.readyState && !/loaded|complete/.test(d.readyState) || (e = !1,
        g(),
        d.onload = d.onreadystatechange = null )
    }
    ;
    f.appendChild(d)
}
getScript("//api.adinplay.com/player/v2/MFN/starve.io/player.min.js", initAipPreroll);
var ___adsvid = 1;