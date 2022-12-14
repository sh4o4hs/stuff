/* eslint-disable */
 
/*!
 * @pixi-spine/base - v3.0.7
 * Compiled Thu, 05 Aug 2021 00:33:10 UTC
 *
 * @pixi-spine/base is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2019-2020, Ivan Igorevich Popelyshev <ivan.popelyshev@gmail.com>, All Rights Reserved
 */
this.PIXI = this.PIXI || {};
this.PIXI.spine = this.PIXI.spine || {};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pixi/constants'), require('@pixi/core'), require('@pixi/math'), require('@pixi/display'), require('@pixi/sprite'), require('@pixi/mesh-extras'), require('@pixi/graphics'), require('@pixi/utils')) :
    typeof define === 'function' && define.amd ? define(['exports', '@pixi/constants', '@pixi/core', '@pixi/math', '@pixi/display', '@pixi/sprite', '@pixi/mesh-extras', '@pixi/graphics', '@pixi/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._pixi_spine_base = {}, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI.utils));
}(this, (function (exports, constants, core, math, display, sprite, meshExtras, graphics, utils) { 'use strict';

    /**
     * @public
     */
    exports.AttachmentType = void 0;
    (function (AttachmentType) {
        AttachmentType[AttachmentType["Region"] = 0] = "Region";
        AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
        AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
        AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
        AttachmentType[AttachmentType["Path"] = 4] = "Path";
        AttachmentType[AttachmentType["Point"] = 5] = "Point";
        AttachmentType[AttachmentType["Clipping"] = 6] = "Clipping";
    })(exports.AttachmentType || (exports.AttachmentType = {}));

    /**
     * @public
     */
    var BinaryInput = /** @class */ (function () {
        function BinaryInput(data, strings, index, buffer) {
            if (strings === void 0) { strings = new Array(); }
            if (index === void 0) { index = 0; }
            if (buffer === void 0) { buffer = new DataView(data.buffer); }
            this.strings = strings;
            this.index = index;
            this.buffer = buffer;
        }
        BinaryInput.prototype.readByte = function () {
            return this.buffer.getInt8(this.index++);
        };
        BinaryInput.prototype.readUnsignedByte = function () {
            return this.buffer.getUint8(this.index++);
        };
        BinaryInput.prototype.readShort = function () {
            var value = this.buffer.getInt16(this.index);
            this.index += 2;
            return value;
        };
        BinaryInput.prototype.readInt32 = function () {
            var value = this.buffer.getInt32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readInt = function (optimizePositive) {
            var b = this.readByte();
            var result = b & 0x7F;
            if ((b & 0x80) != 0) {
                b = this.readByte();
                result |= (b & 0x7F) << 7;
                if ((b & 0x80) != 0) {
                    b = this.readByte();
                    result |= (b & 0x7F) << 14;
                    if ((b & 0x80) != 0) {
                        b = this.readByte();
                        result |= (b & 0x7F) << 21;
                        if ((b & 0x80) != 0) {
                            b = this.readByte();
                            result |= (b & 0x7F) << 28;
                        }
                    }
                }
            }
            return optimizePositive ? result : ((result >>> 1) ^ -(result & 1));
        };
        BinaryInput.prototype.readStringRef = function () {
            var index = this.readInt(true);
            return index == 0 ? null : this.strings[index - 1];
        };
        BinaryInput.prototype.readString = function () {
            var byteCount = this.readInt(true);
            switch (byteCount) {
                case 0:
                    return null;
                case 1:
                    return "";
            }
            byteCount--;
            var chars = "";
            for (var i = 0; i < byteCount;) {
                var b = this.readByte();
                switch (b >> 4) {
                    case 12:
                    case 13:
                        chars += String.fromCharCode(((b & 0x1F) << 6 | this.readByte() & 0x3F));
                        i += 2;
                        break;
                    case 14:
                        chars += String.fromCharCode(((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F));
                        i += 3;
                        break;
                    default:
                        chars += String.fromCharCode(b);
                        i++;
                }
            }
            return chars;
        };
        BinaryInput.prototype.readFloat = function () {
            var value = this.buffer.getFloat32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readBoolean = function () {
            return this.readByte() != 0;
        };
        return BinaryInput;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    /**
     * @public
     */
    function filterFromString(text) {
        switch (text.toLowerCase()) {
            case "nearest": return exports.TextureFilter.Nearest;
            case "linear": return exports.TextureFilter.Linear;
            case "mipmap": return exports.TextureFilter.MipMap;
            case "mipmapnearestnearest": return exports.TextureFilter.MipMapNearestNearest;
            case "mipmaplinearnearest": return exports.TextureFilter.MipMapLinearNearest;
            case "mipmapnearestlinear": return exports.TextureFilter.MipMapNearestLinear;
            case "mipmaplinearlinear": return exports.TextureFilter.MipMapLinearLinear;
            default: throw new Error("Unknown texture filter " + text);
        }
    }
    /**
     * @public
     */
    function wrapFromString(text) {
        switch (text.toLowerCase()) {
            case "mirroredtepeat": return exports.TextureWrap.MirroredRepeat;
            case "clamptoedge": return exports.TextureWrap.ClampToEdge;
            case "repeat": return exports.TextureWrap.Repeat;
            default: throw new Error("Unknown texture wrap " + text);
        }
    }
    /**
     * @public
     */
    exports.TextureFilter = void 0;
    (function (TextureFilter) {
        TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
        TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
        TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
        TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
        TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
        TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
        TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear"; // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
    })(exports.TextureFilter || (exports.TextureFilter = {}));
    /**
     * @public
     */
    exports.TextureWrap = void 0;
    (function (TextureWrap) {
        TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
        TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
        TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat"; // WebGLRenderingContext.REPEAT
    })(exports.TextureWrap || (exports.TextureWrap = {}));
    /**
     * @public
     */
    var TextureRegion = /** @class */ (function () {
        function TextureRegion() {
            //thats for overrides
            this.size = null;
            this.names = null;
            this.values = null;
        }
        Object.defineProperty(TextureRegion.prototype, "width", {
            get: function () {
                var tex = this.texture;
                if (tex.trim) {
                    return tex.trim.width;
                }
                return tex.orig.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "height", {
            get: function () {
                var tex = this.texture;
                if (tex.trim) {
                    return tex.trim.height;
                }
                return tex.orig.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "u", {
            get: function () {
                return this.texture._uvs.x0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "v", {
            get: function () {
                return this.texture._uvs.y0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "u2", {
            get: function () {
                return this.texture._uvs.x2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "v2", {
            get: function () {
                return this.texture._uvs.y2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "offsetX", {
            get: function () {
                var tex = this.texture;
                return tex.trim ? tex.trim.x : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "offsetY", {
            get: function () {
                // console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
                return this.spineOffsetY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "pixiOffsetY", {
            get: function () {
                var tex = this.texture;
                return tex.trim ? tex.trim.y : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "spineOffsetY", {
            get: function () {
                var tex = this.texture;
                return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "originalWidth", {
            get: function () {
                return this.texture.orig.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "originalHeight", {
            get: function () {
                return this.texture.orig.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "x", {
            get: function () {
                return this.texture.frame.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "y", {
            get: function () {
                return this.texture.frame.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "rotate", {
            get: function () {
                return this.texture.rotate !== 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "degrees", {
            get: function () {
                return (360 - this.texture.rotate * 45) % 360;
            },
            enumerable: false,
            configurable: true
        });
        return TextureRegion;
    }());

    var RegionFields = /** @class */ (function () {
        function RegionFields() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.originalWidth = 0;
            this.originalHeight = 0;
            this.rotate = 0;
            this.index = 0;
        }
        return RegionFields;
    }());
    /**
     * @public
     */
    var TextureAtlas = /** @class */ (function () {
        function TextureAtlas(atlasText, textureLoader, callback) {
            this.pages = new Array();
            this.regions = new Array();
            if (atlasText) {
                this.addSpineAtlas(atlasText, textureLoader, callback);
            }
        }
        TextureAtlas.prototype.addTexture = function (name, texture) {
            var pages = this.pages;
            var page = null;
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].baseTexture === texture.baseTexture) {
                    page = pages[i];
                    break;
                }
            }
            if (page === null) {
                page = new TextureAtlasPage();
                page.name = 'texturePage';
                var baseTexture = texture.baseTexture;
                page.width = baseTexture.realWidth;
                page.height = baseTexture.realHeight;
                page.baseTexture = baseTexture;
                //those fields are not relevant in Pixi
                page.minFilter = page.magFilter = exports.TextureFilter.Nearest;
                page.uWrap = exports.TextureWrap.ClampToEdge;
                page.vWrap = exports.TextureWrap.ClampToEdge;
                pages.push(page);
            }
            var region = new TextureAtlasRegion();
            region.name = name;
            region.page = page;
            region.texture = texture;
            region.index = -1;
            this.regions.push(region);
            return region;
        };
        TextureAtlas.prototype.addTextureHash = function (textures, stripExtension) {
            for (var key in textures) {
                if (textures.hasOwnProperty(key)) {
                    this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
                }
            }
        };
        TextureAtlas.prototype.addSpineAtlas = function (atlasText, textureLoader, callback) {
            return this.load(atlasText, textureLoader, callback);
        };
        TextureAtlas.prototype.load = function (atlasText, textureLoader, callback) {
            var _this = this;
            if (textureLoader == null)
                throw new Error("textureLoader cannot be null.");
            var reader = new TextureAtlasReader(atlasText);
            var entry = new Array(4);
            var page = null;
            var pageFields = {};
            var region = null;
            pageFields["size"] = function () {
                page.width = parseInt(entry[1]);
                page.height = parseInt(entry[2]);
            };
            pageFields["format"] = function () {
                // page.format = Format[tuple[0]]; we don't need format in WebGL
            };
            pageFields["filter"] = function () {
                page.minFilter = filterFromString(entry[1]);
                page.magFilter = filterFromString(entry[2]);
            };
            pageFields["repeat"] = function () {
                if (entry[1].indexOf('x') != -1)
                    page.uWrap = exports.TextureWrap.Repeat;
                if (entry[1].indexOf('y') != -1)
                    page.vWrap = exports.TextureWrap.Repeat;
            };
            pageFields["pma"] = function () {
                page.pma = entry[1] == "true";
            };
            var regionFields = {};
            regionFields["xy"] = function () {
                region.x = parseInt(entry[1]);
                region.y = parseInt(entry[2]);
            };
            regionFields["size"] = function () {
                region.width = parseInt(entry[1]);
                region.height = parseInt(entry[2]);
            };
            regionFields["bounds"] = function () {
                region.x = parseInt(entry[1]);
                region.y = parseInt(entry[2]);
                region.width = parseInt(entry[3]);
                region.height = parseInt(entry[4]);
            };
            regionFields["offset"] = function () {
                region.offsetX = parseInt(entry[1]);
                region.offsetY = parseInt(entry[2]);
            };
            regionFields["orig"] = function () {
                region.originalWidth = parseInt(entry[1]);
                region.originalHeight = parseInt(entry[2]);
            };
            regionFields["offsets"] = function () {
                region.offsetX = parseInt(entry[1]);
                region.offsetY = parseInt(entry[2]);
                region.originalWidth = parseInt(entry[3]);
                region.originalHeight = parseInt(entry[4]);
            };
            regionFields["rotate"] = function () {
                var rotateValue = entry[1];
                var rotate = 0;
                if (rotateValue.toLocaleLowerCase() == "true") {
                    rotate = 6;
                }
                else if (rotateValue.toLocaleLowerCase() == "false") {
                    rotate = 0;
                }
                else {
                    rotate = ((720 - parseFloat(rotateValue)) % 360) / 45;
                }
                region.rotate = rotate;
            };
            regionFields["index"] = function () {
                region.index = parseInt(entry[1]);
            };
            var line = reader.readLine();
            // Ignore empty lines before first entry.
            while (line != null && line.trim().length == 0)
                line = reader.readLine();
            // Header entries.
            while (true) {
                if (line == null || line.trim().length == 0)
                    break;
                if (reader.readEntry(entry, line) == 0)
                    break; // Silently ignore all header fields.
                line = reader.readLine();
            }
            var iterateParser = function () {
                while (true) {
                    if (line == null) {
                        return callback && callback(_this);
                    }
                    if (line.trim().length == 0) {
                        page = null;
                        line = reader.readLine();
                    }
                    else if (page === null) {
                        page = new TextureAtlasPage();
                        page.name = line.trim();
                        while (true) {
                            if (reader.readEntry(entry, line = reader.readLine()) == 0)
                                break;
                            var field = pageFields[entry[0]];
                            if (field)
                                field();
                        }
                        _this.pages.push(page);
                        textureLoader(page.name, function (texture) {
                            if (texture === null) {
                                _this.pages.splice(_this.pages.indexOf(page), 1);
                                return callback && callback(null);
                            }
                            page.baseTexture = texture;
                            //TODO: set scaleMode and mipmapMode from spine
                            if (page.pma) {
                                texture.alphaMode = constants.ALPHA_MODES.PMA;
                            }
                            if (!texture.valid) {
                                texture.setSize(page.width, page.height);
                            }
                            _this.pages.push(page);
                            page.setFilters();
                            if (!page.width || !page.height) {
                                page.width = texture.realWidth;
                                page.height = texture.realHeight;
                                if (!page.width || !page.height) {
                                    console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                                }
                            }
                            iterateParser();
                        });
                        _this.pages.push(page);
                        break;
                    }
                    else {
                        region = new RegionFields();
                        var atlasRegion = new TextureAtlasRegion();
                        atlasRegion.name = line;
                        atlasRegion.page = page;
                        var names = null;
                        var values = null;
                        while (true) {
                            var count = reader.readEntry(entry, line = reader.readLine());
                            if (count == 0)
                                break;
                            var field = regionFields[entry[0]];
                            if (field)
                                field();
                            else {
                                if (names == null) {
                                    names = [];
                                    values = [];
                                }
                                names.push(entry[0]);
                                var entryValues = [];
                                for (var i = 0; i < count; i++)
                                    entryValues.push(parseInt(entry[i + 1]));
                                values.push(entryValues);
                            }
                        }
                        if (region.originalWidth == 0 && region.originalHeight == 0) {
                            region.originalWidth = region.width;
                            region.originalHeight = region.height;
                        }
                        var resolution = page.baseTexture.resolution;
                        region.x /= resolution;
                        region.y /= resolution;
                        region.width /= resolution;
                        region.height /= resolution;
                        region.originalWidth /= resolution;
                        region.originalHeight /= resolution;
                        region.offsetX /= resolution;
                        region.offsetY /= resolution;
                        var swapWH = region.rotate % 4 !== 0;
                        var frame = new math.Rectangle(region.x, region.y, swapWH ? region.height : region.width, swapWH ? region.width : region.height);
                        var orig = new math.Rectangle(0, 0, region.originalWidth, region.originalHeight);
                        var trim = new math.Rectangle(region.offsetX, region.originalHeight - region.height - region.offsetY, region.width, region.height);
                        atlasRegion.texture = new core.Texture(atlasRegion.page.baseTexture, frame, orig, trim, region.rotate);
                        atlasRegion.index = region.index;
                        atlasRegion.texture.updateUvs();
                        _this.regions.push(atlasRegion);
                    }
                }
            };
            iterateParser();
        };
        TextureAtlas.prototype.findRegion = function (name) {
            for (var i = 0; i < this.regions.length; i++) {
                if (this.regions[i].name == name) {
                    return this.regions[i];
                }
            }
            return null;
        };
        TextureAtlas.prototype.dispose = function () {
            for (var i = 0; i < this.pages.length; i++) {
                this.pages[i].baseTexture.dispose();
            }
        };
        return TextureAtlas;
    }());
    /**
     * @public
     */
    var TextureAtlasReader = /** @class */ (function () {
        function TextureAtlasReader(text) {
            this.index = 0;
            this.lines = text.split(/\r\n|\r|\n/);
        }
        TextureAtlasReader.prototype.readLine = function () {
            if (this.index >= this.lines.length)
                return null;
            return this.lines[this.index++];
        };
        TextureAtlasReader.prototype.readEntry = function (entry, line) {
            if (line == null)
                return 0;
            line = line.trim();
            if (line.length == 0)
                return 0;
            var colon = line.indexOf(':');
            if (colon == -1)
                return 0;
            entry[0] = line.substr(0, colon).trim();
            for (var i = 1, lastMatch = colon + 1;; i++) {
                var comma = line.indexOf(',', lastMatch);
                if (comma == -1) {
                    entry[i] = line.substr(lastMatch).trim();
                    return i;
                }
                entry[i] = line.substr(lastMatch, comma - lastMatch).trim();
                lastMatch = comma + 1;
                if (i == 4)
                    return 4;
            }
        };
        return TextureAtlasReader;
    }());
    /**
     * @public
     */
    var TextureAtlasPage = /** @class */ (function () {
        function TextureAtlasPage() {
            this.minFilter = exports.TextureFilter.Nearest;
            this.magFilter = exports.TextureFilter.Nearest;
            this.uWrap = exports.TextureWrap.ClampToEdge;
            this.vWrap = exports.TextureWrap.ClampToEdge;
        }
        TextureAtlasPage.prototype.setFilters = function () {
            var tex = this.baseTexture;
            var filter = this.minFilter;
            if (filter == exports.TextureFilter.Linear) {
                tex.scaleMode = constants.SCALE_MODES.LINEAR;
            }
            else if (this.minFilter == exports.TextureFilter.Nearest) {
                tex.scaleMode = constants.SCALE_MODES.NEAREST;
            }
            else {
                tex.mipmap = constants.MIPMAP_MODES.POW2;
                if (filter == exports.TextureFilter.MipMapNearestNearest) {
                    tex.scaleMode = constants.SCALE_MODES.NEAREST;
                }
                else {
                    tex.scaleMode = constants.SCALE_MODES.LINEAR;
                }
            }
        };
        return TextureAtlasPage;
    }());
    /**
     * @public
     */
    var TextureAtlasRegion = /** @class */ (function (_super) {
        __extends(TextureAtlasRegion, _super);
        function TextureAtlasRegion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextureAtlasRegion;
    }(TextureRegion));

    var fround_polyfill = (function (array) {
        return function (x) {
            return array[0] = x, array[0];
        };
    })(new Float32Array(1));
    var fround = Math.fround || fround_polyfill;
    /**
     * @public
     */
    var IntSet = /** @class */ (function () {
        function IntSet() {
            this.array = new Array();
        }
        IntSet.prototype.add = function (value) {
            var contains = this.contains(value);
            this.array[value | 0] = value | 0;
            return !contains;
        };
        IntSet.prototype.contains = function (value) {
            return this.array[value | 0] != undefined;
        };
        IntSet.prototype.remove = function (value) {
            this.array[value | 0] = undefined;
        };
        IntSet.prototype.clear = function () {
            this.array.length = 0;
        };
        return IntSet;
    }());
    /**
     * @public
     */
    var StringSet = /** @class */ (function () {
        function StringSet() {
            this.entries = {};
            this.size = 0;
        }
        StringSet.prototype.add = function (value) {
            var contains = this.entries[value];
            this.entries[value] = true;
            if (!contains) {
                this.size++;
                return true;
            }
            return false;
        };
        StringSet.prototype.addAll = function (values) {
            var oldSize = this.size;
            for (var i = 0, n = values.length; i < n; i++)
                this.add(values[i]);
            return oldSize != this.size;
        };
        StringSet.prototype.contains = function (value) {
            return this.entries[value];
        };
        StringSet.prototype.clear = function () {
            this.entries = {};
            this.size = 0;
        };
        return StringSet;
    }());
    /**
     * @public
     */
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 0; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.prototype.set = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            return this.clamp();
        };
        Color.prototype.setFromColor = function (c) {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
            return this;
        };
        Color.prototype.setFromString = function (hex) {
            hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
            this.r = parseInt(hex.substr(0, 2), 16) / 255;
            this.g = parseInt(hex.substr(2, 2), 16) / 255;
            this.b = parseInt(hex.substr(4, 2), 16) / 255;
            this.a = hex.length != 8 ? 1 : parseInt(hex.substr(6, 2), 16) / 255;
            return this;
        };
        Color.prototype.add = function (r, g, b, a) {
            this.r += r;
            this.g += g;
            this.b += b;
            this.a += a;
            return this.clamp();
        };
        Color.prototype.clamp = function () {
            if (this.r < 0)
                this.r = 0;
            else if (this.r > 1)
                this.r = 1;
            if (this.g < 0)
                this.g = 0;
            else if (this.g > 1)
                this.g = 1;
            if (this.b < 0)
                this.b = 0;
            else if (this.b > 1)
                this.b = 1;
            if (this.a < 0)
                this.a = 0;
            else if (this.a > 1)
                this.a = 1;
            return this;
        };
        Color.rgba8888ToColor = function (color, value) {
            color.r = ((value & 0xff000000) >>> 24) / 255;
            color.g = ((value & 0x00ff0000) >>> 16) / 255;
            color.b = ((value & 0x0000ff00) >>> 8) / 255;
            color.a = ((value & 0x000000ff)) / 255;
        };
        Color.rgb888ToColor = function (color, value) {
            color.r = ((value & 0x00ff0000) >>> 16) / 255;
            color.g = ((value & 0x0000ff00) >>> 8) / 255;
            color.b = ((value & 0x000000ff)) / 255;
        };
        Color.fromString = function (hex) {
            return new Color().setFromString(hex);
        };
        Color.WHITE = new Color(1, 1, 1, 1);
        Color.RED = new Color(1, 0, 0, 1);
        Color.GREEN = new Color(0, 1, 0, 1);
        Color.BLUE = new Color(0, 0, 1, 1);
        Color.MAGENTA = new Color(1, 0, 1, 1);
        return Color;
    }());
    /**
     * @public
     */
    var MathUtils = /** @class */ (function () {
        function MathUtils() {
        }
        MathUtils.clamp = function (value, min, max) {
            if (value < min)
                return min;
            if (value > max)
                return max;
            return value;
        };
        MathUtils.cosDeg = function (degrees) {
            return Math.cos(degrees * MathUtils.degRad);
        };
        MathUtils.sinDeg = function (degrees) {
            return Math.sin(degrees * MathUtils.degRad);
        };
        MathUtils.signum = function (value) {
            return value > 0 ? 1 : value < 0 ? -1 : 0;
        };
        MathUtils.toInt = function (x) {
            return x > 0 ? Math.floor(x) : Math.ceil(x);
        };
        MathUtils.cbrt = function (x) {
            var y = Math.pow(Math.abs(x), 1 / 3);
            return x < 0 ? -y : y;
        };
        MathUtils.randomTriangular = function (min, max) {
            return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
        };
        MathUtils.randomTriangularWith = function (min, max, mode) {
            var u = Math.random();
            var d = max - min;
            if (u <= (mode - min) / d)
                return min + Math.sqrt(u * d * (mode - min));
            return max - Math.sqrt((1 - u) * d * (max - mode));
        };
        MathUtils.PI = 3.1415927;
        MathUtils.PI2 = MathUtils.PI * 2;
        MathUtils.radiansToDegrees = 180 / MathUtils.PI;
        MathUtils.radDeg = MathUtils.radiansToDegrees;
        MathUtils.degreesToRadians = MathUtils.PI / 180;
        MathUtils.degRad = MathUtils.degreesToRadians;
        return MathUtils;
    }());
    /**
     * @public
     */
    var Interpolation = /** @class */ (function () {
        function Interpolation() {
        }
        Interpolation.prototype.apply = function (start, end, a) {
            return start + (end - start) * this.applyInternal(a);
        };
        return Interpolation;
    }());
    /**
     * @public
     */
    var Pow = /** @class */ (function (_super) {
        __extends(Pow, _super);
        function Pow(power) {
            var _this = _super.call(this) || this;
            _this.power = 2;
            _this.power = power;
            return _this;
        }
        Pow.prototype.applyInternal = function (a) {
            if (a <= 0.5)
                return Math.pow(a * 2, this.power) / 2;
            return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
        };
        return Pow;
    }(Interpolation));
    /**
     * @public
     */
    var PowOut = /** @class */ (function (_super) {
        __extends(PowOut, _super);
        function PowOut(power) {
            return _super.call(this, power) || this;
        }
        PowOut.prototype.applyInternal = function (a) {
            return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
        };
        return PowOut;
    }(Pow));
    /**
     * @public
     */
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
            for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                dest[j] = source[i];
            }
        };
        Utils.arrayFill = function (array, fromIndex, toIndex, value) {
            for (var i = fromIndex; i < toIndex; i++)
                array[i] = value;
        };
        Utils.setArraySize = function (array, size, value) {
            if (value === void 0) { value = 0; }
            var oldSize = array.length;
            if (oldSize == size)
                return array;
            array.length = size;
            if (oldSize < size) {
                for (var i = oldSize; i < size; i++)
                    array[i] = value;
            }
            return array;
        };
        Utils.ensureArrayCapacity = function (array, size, value) {
            if (value === void 0) { value = 0; }
            if (array.length >= size)
                return array;
            return Utils.setArraySize(array, size, value);
        };
        Utils.newArray = function (size, defaultValue) {
            var array = new Array(size);
            for (var i = 0; i < size; i++)
                array[i] = defaultValue;
            return array;
        };
        Utils.newFloatArray = function (size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS)
                return new Float32Array(size);
            else {
                var array = new Array(size);
                for (var i = 0; i < array.length; i++)
                    array[i] = 0;
                return array;
            }
        };
        Utils.newShortArray = function (size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS)
                return new Int16Array(size);
            else {
                var array = new Array(size);
                for (var i = 0; i < array.length; i++)
                    array[i] = 0;
                return array;
            }
        };
        Utils.toFloatArray = function (array) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
        };
        Utils.toSinglePrecision = function (value) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? fround(value) : value;
        };
        // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
        Utils.webkit602BugfixHelper = function (alpha, blend) {
        };
        Utils.contains = function (array, element, identity) {
            if (identity === void 0) { identity = true; }
            for (var i = 0; i < array.length; i++)
                if (array[i] == element)
                    return true;
            return false;
        };
        Utils.enumValue = function (type, name) {
            return type[name[0].toUpperCase() + name.slice(1)];
        };
        Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
        return Utils;
    }());
    /**
     * @public
     */
    var DebugUtils = /** @class */ (function () {
        function DebugUtils() {
        }
        DebugUtils.logBones = function (skeleton) {
            for (var i = 0; i < skeleton.bones.length; i++) {
                var bone = skeleton.bones[i];
                var mat = bone.matrix;
                console.log(bone.data.name + ", " + mat.a + ", " + mat.b + ", " + mat.c + ", " + mat.d + ", " + mat.tx + ", " + mat.ty);
            }
        };
        return DebugUtils;
    }());
    /**
     * @public
     */
    var Pool = /** @class */ (function () {
        function Pool(instantiator) {
            this.items = new Array();
            this.instantiator = instantiator;
        }
        Pool.prototype.obtain = function () {
            return this.items.length > 0 ? this.items.pop() : this.instantiator();
        };
        Pool.prototype.free = function (item) {
            if (item.reset)
                item.reset();
            this.items.push(item);
        };
        Pool.prototype.freeAll = function (items) {
            for (var i = 0; i < items.length; i++)
                this.free(items[i]);
        };
        Pool.prototype.clear = function () {
            this.items.length = 0;
        };
        return Pool;
    }());
    /**
     * @public
     */
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vector2.prototype.length = function () {
            var x = this.x;
            var y = this.y;
            return Math.sqrt(x * x + y * y);
        };
        Vector2.prototype.normalize = function () {
            var len = this.length();
            if (len != 0) {
                this.x /= len;
                this.y /= len;
            }
            return this;
        };
        return Vector2;
    }());
    /**
     * @public
     */
    var TimeKeeper = /** @class */ (function () {
        function TimeKeeper() {
            this.maxDelta = 0.064;
            this.framesPerSecond = 0;
            this.delta = 0;
            this.totalTime = 0;
            this.lastTime = Date.now() / 1000;
            this.frameCount = 0;
            this.frameTime = 0;
        }
        TimeKeeper.prototype.update = function () {
            var now = Date.now() / 1000;
            this.delta = now - this.lastTime;
            this.frameTime += this.delta;
            this.totalTime += this.delta;
            if (this.delta > this.maxDelta)
                this.delta = this.maxDelta;
            this.lastTime = now;
            this.frameCount++;
            if (this.frameTime > 1) {
                this.framesPerSecond = this.frameCount / this.frameTime;
                this.frameTime = 0;
                this.frameCount = 0;
            }
        };
        return TimeKeeper;
    }());
    /**
     * @public
     */
    var WindowedMean = /** @class */ (function () {
        function WindowedMean(windowSize) {
            if (windowSize === void 0) { windowSize = 32; }
            this.addedValues = 0;
            this.lastValue = 0;
            this.mean = 0;
            this.dirty = true;
            this.values = new Array(windowSize);
        }
        WindowedMean.prototype.hasEnoughData = function () {
            return this.addedValues >= this.values.length;
        };
        WindowedMean.prototype.addValue = function (value) {
            if (this.addedValues < this.values.length)
                this.addedValues++;
            this.values[this.lastValue++] = value;
            if (this.lastValue > this.values.length - 1)
                this.lastValue = 0;
            this.dirty = true;
        };
        WindowedMean.prototype.getMean = function () {
            if (this.hasEnoughData()) {
                if (this.dirty) {
                    var mean = 0;
                    for (var i = 0; i < this.values.length; i++)
                        mean += this.values[i];
                    this.mean = mean / this.values.length;
                    this.dirty = false;
                }
                return this.mean;
            }
            return 0;
        };
        return WindowedMean;
    }());

    /**
     * @public
     */
    var settings = {
        yDown: true,
        /**
         * pixi-spine gives option to not fail at certain parsing errors
         * spine-ts fails here
         */
        FAIL_ON_NON_EXISTING_SKIN: false,
        /**
         * past Spine.globalAutoUpdate
         */
        GLOBAL_AUTO_UPDATE: true,
        /**
         * past Spine.globalDelayLimit
         */
        GLOBAL_DELAY_LIMIT: 0,
    };

    var tempRgb = [0, 0, 0];
    /**
     * @public
     */
    var SpineSprite = /** @class */ (function (_super) {
        __extends(SpineSprite, _super);
        function SpineSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.region = null;
            _this.attachment = null;
            return _this;
        }
        return SpineSprite;
    }(sprite.Sprite));
    /**
     * @public
     */
    var SpineMesh = /** @class */ (function (_super) {
        __extends(SpineMesh, _super);
        function SpineMesh(texture, vertices, uvs, indices, drawMode) {
            var _this = _super.call(this, texture, vertices, uvs, indices, drawMode) || this;
            _this.region = null;
            _this.attachment = null;
            return _this;
        }
        return SpineMesh;
    }(meshExtras.SimpleMesh));
    /**
     * A class that enables the you to import and run your spine animations in pixi.
     * The Spine animation data needs to be loaded using either the Loader or a SpineLoader before it can be used by this class
     * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
     *
     * ```js
     * let spineAnimation = new spine(spineData);
     * ```
     *
     * @public
     * @class
     * @extends Container
     * @memberof spine
     * @param spineData {object} The spine data loaded from a spine atlas.
     */
    var SpineBase = /** @class */ (function (_super) {
        __extends(SpineBase, _super);
        function SpineBase(spineData) {
            var _this = _super.call(this) || this;
            if (!spineData) {
                throw new Error('The spineData param is required.');
            }
            if ((typeof spineData) === "string") {
                throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            }
            /**
             * The spineData object
             *
             * @member {object}
             */
            _this.spineData = spineData;
            /**
             * A spine Skeleton object
             *
             * @member {object}
             */
            _this.createSkeleton(spineData);
            /**
             * An array of containers
             *
             * @member {Container[]}
             */
            _this.slotContainers = [];
            _this.tempClipContainers = [];
            for (var i = 0, n = _this.skeleton.slots.length; i < n; i++) {
                var slot = _this.skeleton.slots[i];
                var attachment = slot.getAttachment();
                var slotContainer = _this.newContainer();
                _this.slotContainers.push(slotContainer);
                _this.addChild(slotContainer);
                _this.tempClipContainers.push(null);
                if (!attachment) {
                    continue;
                }
                if (attachment.type === exports.AttachmentType.Region) {
                    var spriteName = attachment.region.name;
                    var sprite = _this.createSprite(slot, attachment, spriteName);
                    slot.currentSprite = sprite;
                    slot.currentSpriteName = spriteName;
                    slotContainer.addChild(sprite);
                }
                else if (attachment.type === exports.AttachmentType.Mesh) {
                    var mesh = _this.createMesh(slot, attachment);
                    slot.currentMesh = mesh;
                    slot.currentMeshId = attachment.id;
                    slot.currentMeshName = attachment.name;
                    slotContainer.addChild(mesh);
                }
                else if (attachment.type === exports.AttachmentType.Clipping) {
                    _this.createGraphics(slot, attachment);
                    slotContainer.addChild(slot.clippingContainer);
                    slotContainer.addChild(slot.currentGraphics);
                }
            }
            /**
             * The tint applied to all spine slots. This is a [r,g,b] value. A value of [1,1,1] will remove any tint effect.
             *
             * @member {number}
             * @memberof spine.Spine#
             */
            _this.tintRgb = new Float32Array([1, 1, 1]);
            _this.autoUpdate = true;
            _this.visible = true;
            return _this;
        }
        Object.defineProperty(SpineBase.prototype, "autoUpdate", {
            /**
             * If this flag is set to true, the spine animation will be automatically updated every
             * time the object id drawn. The down side of this approach is that the delta time is
             * automatically calculated and you could miss out on cool effects like slow motion,
             * pause, skip ahead and the sorts. Most of these effects can be achieved even with
             * autoUpdate enabled but are harder to achieve.
             *
             * @member {boolean}
             * @memberof spine.Spine#
             * @default true
             */
            get: function () {
                return this._autoUpdate;
            },
            set: function (value) {
                if (value !== this._autoUpdate) {
                    this._autoUpdate = value;
                    this.updateTransform = value ? SpineBase.prototype.autoUpdateTransform : display.Container.prototype.updateTransform;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpineBase.prototype, "tint", {
            /**
             * The tint applied to the spine object. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
             *
             * @member {number}
             * @memberof spine.Spine#
             * @default 0xFFFFFF
             */
            get: function () {
                return utils.rgb2hex(this.tintRgb);
            },
            set: function (value) {
                this.tintRgb = utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpineBase.prototype, "delayLimit", {
            /**
             * Limit value for the update dt with Spine.globalDelayLimit
             * that can be overridden with localDelayLimit
             * @return {number} - Maximum processed dt value for the update
             */
            get: function () {
                var limit = typeof this.localDelayLimit !== "undefined" ?
                    this.localDelayLimit : settings.GLOBAL_DELAY_LIMIT;
                // If limit is 0, this means there is no limit for the delay
                return limit || Number.MAX_VALUE;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the spine skeleton and its animations by delta time (dt)
         *
         * @param dt {number} Delta time. Time by which the animation should be updated
         */
        SpineBase.prototype.update = function (dt) {
            // Limit delta value to avoid animation jumps
            var delayLimit = this.delayLimit;
            if (dt > delayLimit)
                dt = delayLimit;
            this.state.update(dt);
            this.state.apply(this.skeleton);
            //check we haven't been destroyed via a spine event callback in state update
            if (!this.skeleton)
                return;
            this.skeleton.updateWorldTransform();
            var slots = this.skeleton.slots;
            // in case pixi has double tint
            var globalClr = this.color;
            var light = null, dark = null;
            if (globalClr) {
                light = globalClr.light;
                dark = globalClr.dark;
            }
            else {
                light = this.tintRgb;
            }
            // let thack = false;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var attachment = slot.getAttachment();
                var slotContainer = this.slotContainers[i];
                if (!attachment) {
                    slotContainer.visible = false;
                    continue;
                }
                var spriteColor = null;
                var attColor = attachment.color;
                switch (attachment.type) {
                    case exports.AttachmentType.Region:
                        var region = attachment.region;
                        if (region) {
                            if (slot.currentMesh) {
                                slot.currentMesh.visible = false;
                                slot.currentMesh = null;
                                slot.currentMeshId = undefined;
                                slot.currentMeshName = undefined;
                            }
                            var ar = region;
                            if (!slot.currentSpriteName || slot.currentSpriteName !== ar.name) {
                                var spriteName = ar.name;
                                if (slot.currentSprite) {
                                    slot.currentSprite.visible = false;
                                }
                                slot.sprites = slot.sprites || {};
                                if (slot.sprites[spriteName] !== undefined) {
                                    slot.sprites[spriteName].visible = true;
                                }
                                else {
                                    var sprite = this.createSprite(slot, attachment, spriteName);
                                    slotContainer.addChild(sprite);
                                }
                                slot.currentSprite = slot.sprites[spriteName];
                                slot.currentSpriteName = spriteName;
                                // force sprite update when attachment name is same.
                                // issues https://github.com/pixijs/pixi-spine/issues/318
                            }
                            else if (slot.currentSpriteName === ar.name && !slot.hackRegion) {
                                this.setSpriteRegion(attachment, slot.currentSprite, region);
                            }
                        }
                        var transform = slotContainer.transform;
                        transform.setFromMatrix(slot.bone.matrix);
                        if (slot.currentSprite.color) {
                            //YAY! double - tint!
                            spriteColor = slot.currentSprite.color;
                        }
                        else {
                            tempRgb[0] = light[0] * slot.color.r * attColor.r;
                            tempRgb[1] = light[1] * slot.color.g * attColor.g;
                            tempRgb[2] = light[2] * slot.color.b * attColor.b;
                            slot.currentSprite.tint = utils.rgb2hex(tempRgb);
                        }
                        slot.currentSprite.blendMode = slot.blendMode;
                        break;
                    case exports.AttachmentType.Mesh:
                        if (slot.currentSprite) {
                            //TODO: refactor this thing, switch it on and off for container
                            slot.currentSprite.visible = false;
                            slot.currentSprite = null;
                            slot.currentSpriteName = undefined;
                            //TODO: refactor this shit
                            var transform_1 = new math.Transform();
                            transform_1._parentID = -1;
                            transform_1._worldID = slotContainer.transform._worldID;
                            slotContainer.transform = transform_1;
                        }
                        var id = attachment.id;
                        if (!slot.currentMeshId || slot.currentMeshId !== id) {
                            var meshId = id;
                            if (slot.currentMesh) {
                                slot.currentMesh.visible = false;
                            }
                            slot.meshes = slot.meshes || {};
                            if (slot.meshes[meshId] !== undefined) {
                                slot.meshes[meshId].visible = true;
                            }
                            else {
                                var mesh = this.createMesh(slot, attachment);
                                slotContainer.addChild(mesh);
                            }
                            slot.currentMesh = slot.meshes[meshId];
                            slot.currentMeshName = attachment.name;
                            slot.currentMeshId = meshId;
                        }
                        attachment.computeWorldVerticesOld(slot, slot.currentMesh.vertices);
                        if (slot.currentMesh.color) {
                            // pixi-heaven
                            spriteColor = slot.currentMesh.color;
                        }
                        else {
                            tempRgb[0] = light[0] * slot.color.r * attColor.r;
                            tempRgb[1] = light[1] * slot.color.g * attColor.g;
                            tempRgb[2] = light[2] * slot.color.b * attColor.b;
                            slot.currentMesh.tint = utils.rgb2hex(tempRgb);
                        }
                        slot.currentMesh.blendMode = slot.blendMode;
                        break;
                    case exports.AttachmentType.Clipping:
                        if (!slot.currentGraphics) {
                            this.createGraphics(slot, attachment);
                            slotContainer.addChild(slot.clippingContainer);
                            slotContainer.addChild(slot.currentGraphics);
                        }
                        this.updateGraphics(slot, attachment);
                        slotContainer.alpha = 1.0;
                        slotContainer.visible = true;
                        continue;
                    default:
                        slotContainer.visible = false;
                        continue;
                }
                slotContainer.visible = true;
                // pixi has double tint
                if (spriteColor) {
                    var r0 = slot.color.r * attColor.r;
                    var g0 = slot.color.g * attColor.g;
                    var b0 = slot.color.b * attColor.b;
                    //YAY! double-tint!
                    spriteColor.setLight(light[0] * r0 + dark[0] * (1.0 - r0), light[1] * g0 + dark[1] * (1.0 - g0), light[2] * b0 + dark[2] * (1.0 - b0));
                    if (slot.darkColor) {
                        r0 = slot.darkColor.r;
                        g0 = slot.darkColor.g;
                        b0 = slot.darkColor.b;
                    }
                    else {
                        r0 = 0.0;
                        g0 = 0.0;
                        b0 = 0.0;
                    }
                    spriteColor.setDark(light[0] * r0 + dark[0] * (1 - r0), light[1] * g0 + dark[1] * (1 - g0), light[2] * b0 + dark[2] * (1 - b0));
                }
                slotContainer.alpha = slot.color.a;
            }
            //== this is clipping implementation ===
            //TODO: remove parent hacks when pixi masks allow it
            var drawOrder = this.skeleton.drawOrder;
            var clippingAttachment = null;
            var clippingContainer = null;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                var slot = slots[drawOrder[i].data.index];
                var slotContainer = this.slotContainers[drawOrder[i].data.index];
                if (!clippingContainer) {
                    //Adding null check as it is possible for slotContainer.parent to be null in the event of a spine being disposed off in its loop callback
                    if (slotContainer.parent !== null && slotContainer.parent !== this) {
                        slotContainer.parent.removeChild(slotContainer);
                        //silend add hack
                        slotContainer.parent = this;
                    }
                }
                if (slot.currentGraphics && slot.getAttachment()) {
                    clippingContainer = slot.clippingContainer;
                    clippingAttachment = slot.getAttachment();
                    clippingContainer.children.length = 0;
                    this.children[i] = slotContainer;
                    if (clippingAttachment.endSlot === slot.data) {
                        clippingAttachment.endSlot = null;
                    }
                }
                else {
                    if (clippingContainer) {
                        var c = this.tempClipContainers[i];
                        if (!c) {
                            c = this.tempClipContainers[i] = this.newContainer();
                            c.visible = false;
                        }
                        this.children[i] = c;
                        //silent remove hack
                        slotContainer.parent = null;
                        clippingContainer.addChild(slotContainer);
                        if (clippingAttachment.endSlot == slot.data) {
                            clippingContainer.renderable = true;
                            clippingContainer = null;
                            clippingAttachment = null;
                        }
                    }
                    else {
                        this.children[i] = slotContainer;
                    }
                }
            }
        };
        ;
        SpineBase.prototype.setSpriteRegion = function (attachment, sprite, region) {
            // prevent setters calling when attachment and region is same
            if (sprite.attachment === attachment && sprite.region === region) {
                return;
            }
            sprite.region = region;
            sprite.attachment = attachment;
            sprite.texture = region.texture;
            sprite.rotation = attachment.rotation * MathUtils.degRad;
            sprite.position.x = attachment.x;
            sprite.position.y = attachment.y;
            sprite.alpha = attachment.color.a;
            if (!region.size) {
                sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
                sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
            }
            else {
                //hacked!
                sprite.scale.x = region.size.width / region.originalWidth;
                sprite.scale.y = -region.size.height / region.originalHeight;
            }
        };
        SpineBase.prototype.setMeshRegion = function (attachment, mesh, region) {
            if (mesh.attachment === attachment && mesh.region === region) {
                return;
            }
            mesh.region = region;
            mesh.attachment = attachment;
            mesh.texture = region.texture;
            region.texture.updateUvs();
            mesh.uvBuffer.update(attachment.regionUVs);
        };
        /**
         * When autoupdate is set to yes this function is used as pixi's updateTransform function
         *
         * @private
         */
        SpineBase.prototype.autoUpdateTransform = function () {
            if (settings.GLOBAL_AUTO_UPDATE) {
                this.lastTime = this.lastTime || Date.now();
                var timeDelta = (Date.now() - this.lastTime) * 0.001;
                this.lastTime = Date.now();
                this.update(timeDelta);
            }
            else {
                this.lastTime = 0;
            }
            display.Container.prototype.updateTransform.call(this);
        };
        ;
        /**
         * Create a new sprite to be used with core.RegionAttachment
         *
         * @param slot {spine.Slot} The slot to which the attachment is parented
         * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
         * @private
         */
        SpineBase.prototype.createSprite = function (slot, attachment, defName) {
            var region = attachment.region;
            if (slot.hackAttachment === attachment) {
                region = slot.hackRegion;
            }
            var texture = region.texture;
            var sprite = this.newSprite(texture);
            sprite.anchor.set(0.5);
            this.setSpriteRegion(attachment, sprite, attachment.region);
            slot.sprites = slot.sprites || {};
            slot.sprites[defName] = sprite;
            return sprite;
        };
        ;
        /**
         * Creates a Strip from the spine data
         * @param slot {spine.Slot} The slot to which the attachment is parented
         * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
         * @private
         */
        SpineBase.prototype.createMesh = function (slot, attachment) {
            var region = attachment.region;
            if (slot.hackAttachment === attachment) {
                region = slot.hackRegion;
                slot.hackAttachment = null;
                slot.hackRegion = null;
            }
            var strip = this.newMesh(region.texture, new Float32Array(attachment.regionUVs.length), attachment.regionUVs, new Uint16Array(attachment.triangles), constants.DRAW_MODES.TRIANGLES);
            if (typeof strip._canvasPadding !== "undefined") {
                strip._canvasPadding = 1.5;
            }
            strip.alpha = attachment.color.a;
            strip.region = attachment.region;
            this.setMeshRegion(attachment, strip, region);
            slot.meshes = slot.meshes || {};
            slot.meshes[attachment.id] = strip;
            return strip;
        };
        ;
        //@ts-ignore
        SpineBase.prototype.createGraphics = function (slot, clip) {
            var graphics = this.newGraphics();
            var poly = new math.Polygon([]);
            graphics.clear();
            graphics.beginFill(0xffffff, 1);
            graphics.drawPolygon(poly);
            graphics.renderable = false;
            slot.currentGraphics = graphics;
            slot.clippingContainer = this.newContainer();
            slot.clippingContainer.mask = slot.currentGraphics;
            return graphics;
        };
        SpineBase.prototype.updateGraphics = function (slot, clip) {
            var geom = slot.currentGraphics.geometry;
            var vertices = geom.graphicsData[0].shape.points;
            var n = clip.worldVerticesLength;
            vertices.length = n;
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            geom.invalidate();
        };
        /**
         * Changes texture in attachment in specific slot.
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotIndex {number}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureBySlotIndex = function (slotIndex, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            var attachment = slot.getAttachment();
            var region = attachment.region;
            if (texture) {
                region = new TextureRegion();
                region.texture = texture;
                region.size = size;
                slot.hackRegion = region;
                slot.hackAttachment = attachment;
            }
            else {
                slot.hackRegion = null;
                slot.hackAttachment = null;
            }
            if (slot.currentSprite && slot.currentSprite.region != region) {
                this.setSpriteRegion(attachment, slot.currentSprite, region);
                slot.currentSprite.region = region;
            }
            else if (slot.currentMesh && slot.currentMesh.region != region) {
                this.setMeshRegion(attachment, slot.currentMesh, region);
            }
            return true;
        };
        /**
         * Changes texture in attachment in specific slot.
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotName {string}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureBySlotName = function (slotName, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var index = this.skeleton.findSlotIndex(slotName);
            if (index == -1) {
                return false;
            }
            return this.hackTextureBySlotIndex(index, texture, size);
        };
        /**
         * Changes texture of an attachment
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotName {string}
         * @param attachmentName {string}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureAttachment = function (slotName, attachmentName, texture, size) {
            if (size === void 0) { size = null; }
            // changes the texture of an attachment at the skeleton level
            var slotIndex = this.skeleton.findSlotIndex(slotName);
            var attachment = this.skeleton.getAttachmentByName(slotName, attachmentName);
            attachment.region.texture = texture;
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            // gets the currently active attachment in this slot
            var currentAttachment = slot.getAttachment();
            if (attachmentName === currentAttachment.name) {
                // if the attachment we are changing is currently active, change the the live texture
                var region = attachment.region;
                if (texture) {
                    region = new TextureRegion();
                    region.texture = texture;
                    region.size = size;
                    slot.hackRegion = region;
                    slot.hackAttachment = currentAttachment;
                }
                else {
                    slot.hackRegion = null;
                    slot.hackAttachment = null;
                }
                if (slot.currentSprite && slot.currentSprite.region != region) {
                    this.setSpriteRegion(currentAttachment, slot.currentSprite, region);
                    slot.currentSprite.region = region;
                }
                else if (slot.currentMesh && slot.currentMesh.region != region) {
                    this.setMeshRegion(currentAttachment, slot.currentMesh, region);
                }
                return true;
            }
            return false;
        };
        //those methods can be overriden to spawn different classes
        SpineBase.prototype.newContainer = function () {
            return new display.Container();
        };
        SpineBase.prototype.newSprite = function (tex) {
            return new SpineSprite(tex);
        };
        SpineBase.prototype.newGraphics = function () {
            return new graphics.Graphics();
        };
        SpineBase.prototype.newMesh = function (texture, vertices, uvs, indices, drawMode) {
            return new SpineMesh(texture, vertices, uvs, indices, drawMode);
        };
        SpineBase.prototype.transformHack = function () {
            return 1;
        };
        /**
         * Hack for pixi-display and pixi-lights. Every attachment name ending with a suffix will be added to different layer
         * @param nameSuffix
         * @param group
         * @param outGroup
         */
        SpineBase.prototype.hackAttachmentGroups = function (nameSuffix, group, outGroup) {
            if (!nameSuffix) {
                return undefined;
            }
            var list_d = [], list_n = [];
            for (var i = 0, len = this.skeleton.slots.length; i < len; i++) {
                var slot = this.skeleton.slots[i];
                var name_1 = slot.currentSpriteName || slot.currentMeshName || "";
                var target = slot.currentSprite || slot.currentMesh;
                if (name_1.endsWith(nameSuffix)) {
                    target.parentGroup = group;
                    list_n.push(target);
                }
                else if (outGroup && target) {
                    target.parentGroup = outGroup;
                    list_d.push(target);
                }
            }
            return [list_d, list_n];
        };
        ;
        SpineBase.prototype.destroy = function (options) {
            for (var i = 0, n = this.skeleton.slots.length; i < n; i++) {
                var slot = this.skeleton.slots[i];
                for (var name_2 in slot.meshes) {
                    slot.meshes[name_2].destroy(options);
                }
                slot.meshes = null;
                for (var name_3 in slot.sprites) {
                    slot.sprites[name_3].destroy(options);
                }
                slot.sprites = null;
            }
            for (var i = 0, n = this.slotContainers.length; i < n; i++) {
                this.slotContainers[i].destroy(options);
            }
            this.spineData = null;
            this.skeleton = null;
            this.slotContainers = null;
            this.stateData = null;
            this.state = null;
            this.tempClipContainers = null;
            _super.prototype.destroy.call(this, options);
        };
        SpineBase.clippingPolygon = [];
        return SpineBase;
    }(display.Container));
    /**
     * The visibility of the spine object. If false the object will not be drawn,
     * the updateTransform function will not be called, and the spine will not be automatically updated.
     *
     * @member {boolean}
     * @memberof spine.Spine#
     * @default true
     */
    Object.defineProperty(SpineBase.prototype, 'visible', {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value !== this._visible) {
                this._visible = value;
                if (value) {
                    this.lastTime = 0;
                }
            }
        }
    });

    /// <reference path="../global.d.ts" />

    exports.BinaryInput = BinaryInput;
    exports.Color = Color;
    exports.DebugUtils = DebugUtils;
    exports.IntSet = IntSet;
    exports.Interpolation = Interpolation;
    exports.MathUtils = MathUtils;
    exports.Pool = Pool;
    exports.Pow = Pow;
    exports.PowOut = PowOut;
    exports.SpineBase = SpineBase;
    exports.SpineMesh = SpineMesh;
    exports.SpineSprite = SpineSprite;
    exports.StringSet = StringSet;
    exports.TextureAtlas = TextureAtlas;
    exports.TextureAtlasPage = TextureAtlasPage;
    exports.TextureAtlasRegion = TextureAtlasRegion;
    exports.TextureRegion = TextureRegion;
    exports.TimeKeeper = TimeKeeper;
    exports.Utils = Utils;
    exports.Vector2 = Vector2;
    exports.WindowedMean = WindowedMean;
    exports.filterFromString = filterFromString;
    exports.settings = settings;
    exports.wrapFromString = wrapFromString;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
if (typeof _pixi_spine_base !== 'undefined') { Object.assign(this.PIXI.spine, _pixi_spine_base); }
//# sourceMappingURL=base.js.map
