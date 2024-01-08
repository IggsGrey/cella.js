(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("crypto-js"));
	else if(typeof define === 'function' && define.amd)
		define(["crypto-js"], factory);
	else if(typeof exports === 'object')
		exports["Cella"] = factory(require("crypto-js"));
	else
		root["Cella"] = factory(root["CryptoJS"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_crypto_js__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cella.ts":
/*!**********************!*\
  !*** ./src/cella.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var encrypt_1 = __webpack_require__(/*! ./encryption/encrypt */ "./src/encryption/encrypt.ts");
var exceptions_1 = __importDefault(__webpack_require__(/*! ./exceptions/exceptions */ "./src/exceptions/exceptions.ts"));
var storage_1 = __importDefault(__webpack_require__(/*! ./storage/storage */ "./src/storage/storage.ts"));
var Cella = /** @class */ (function () {
    function Cella(props) {
        var _this = this;
        var _a, _b;
        this.transforms = [];
        this.defaultStorage = storage_1.default.localStorage;
        this.execStore = function (_a) {
            var key = _a.key, value = _a.value;
            if (!key || !key.length)
                throw exceptions_1.default.nullKey;
            // if(localStorage.getItem(key)) throw exceptions.keyExists
            // execute inbound transforms if any
            if (_this.transforms.length) {
                _this.transforms.forEach(function (t) {
                    value = t.inbound(value);
                });
            }
            // ensure value is most defnitely a string
            if (!value)
                value = '';
            else
                value = JSON.stringify(value);
            // apply encryption if any
            if (_this.encrypt) {
                if (!_this.encrypt.secret || !_this.encrypt.secret.length)
                    throw exceptions_1.default.nullSecretKey;
                value = encrypt_1.applyEncrypt(value, _this.encrypt.secret);
            }
            _this.storage.store(key, value);
        };
        this.execGet = function (_a) {
            var _b;
            var key = _a.key;
            if (!key || !key.length)
                throw exceptions_1.default.nullKey;
            var value = (_b = _this.storage.get(key)) !== null && _b !== void 0 ? _b : '';
            // apply decryption if any
            if (_this.encrypt) {
                if (!_this.encrypt.secret || !_this.encrypt.secret.length)
                    throw exceptions_1.default.nullSecretKey;
                value = encrypt_1.applyDecrypt(value, _this.encrypt.secret);
            }
            // parse json
            if (value.length) {
                try {
                    value = JSON.parse(value);
                }
                catch (_c) {
                    // parsing from json will fail if
                    // retrieved value is an 8byte (is that what crypto-js said?) encrypted item
                    throw exceptions_1.default.retrievingUndecryptedItem;
                }
            }
            // execute outbound transforms if any
            if (_this.transforms.length) {
                _this.transforms.forEach(function (t) {
                    value = t.outbound(value);
                });
            }
            return value;
        };
        this.execEject = function (_a) {
            var key = _a.key;
            if (!key || !key.length)
                throw exceptions_1.default.nullKey;
            _this.storage.eject(key);
        };
        this.store = function (_a) {
            var key = _a.key, value = _a.value;
            return Promise.resolve(_this.execStore({ key: key, value: value }));
        };
        this.get = function (param) {
            if (typeof param == 'object') {
                return Promise.resolve(_this.execGet({ key: param === null || param === void 0 ? void 0 : param.key }));
            }
            else if (typeof param == 'string') {
                return Promise.resolve(_this.execGet({ key: param }));
            }
            else {
                return Promise.reject();
            }
        };
        this.eject = function (param) {
            if (typeof param == 'object') {
                return Promise.resolve(_this.execEject({ key: param === null || param === void 0 ? void 0 : param.key }));
            }
            else if (typeof param == 'string') {
                return Promise.resolve(_this.execEject({ key: param }));
            }
            else {
                return Promise.reject();
            }
            // return (new Promise((resolve, reject) => {
            // 	resolve(this.execEject({ key }));
            // })) as Promise<void>;
        };
        // determine storage engine
        if (props === null || props === void 0 ? void 0 : props.storage) {
            // type check probably not required.
            if (typeof (props === null || props === void 0 ? void 0 : props.storage) == 'object' && 'type' in (props === null || props === void 0 ? void 0 : props.storage)) {
                var selectedEngine = props.storage;
                if (selectedEngine.type == 'indexedDB') {
                    this.storage = storage_1.default[selectedEngine.type](selectedEngine.name);
                }
                else {
                    this.storage = storage_1.default[selectedEngine.type];
                }
            }
            this.storage = (_a = props === null || props === void 0 ? void 0 : props.storage) !== null && _a !== void 0 ? _a : this.defaultStorage;
        }
        else {
            this.storage = this.defaultStorage;
        }
        // assign modifier functions (transforms) if any
        if ((_b = props === null || props === void 0 ? void 0 : props.transforms) === null || _b === void 0 ? void 0 : _b.length) {
            this.transforms = props === null || props === void 0 ? void 0 : props.transforms;
        }
        // bind encrypt
        this.encrypt = props === null || props === void 0 ? void 0 : props.encrypt;
    }
    return Cella;
}());
exports.default = Cella;


/***/ }),

/***/ "./src/encryption/encrypt.ts":
/*!***********************************!*\
  !*** ./src/encryption/encrypt.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyDecrypt = exports.applyEncrypt = void 0;
var crypto_js_1 = __importDefault(__webpack_require__(/*! crypto-js */ "crypto-js"));
// Encrypt
var applyEncrypt = function (text, secret) {
    return crypto_js_1.default.AES.encrypt(text, secret).toString();
};
exports.applyEncrypt = applyEncrypt;
// Decrypt
var applyDecrypt = function (cipherText, secret) {
    var bytes = crypto_js_1.default.AES.decrypt(cipherText, secret);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.applyDecrypt = applyDecrypt;


/***/ }),

/***/ "./src/exceptions/exceptions.ts":
/*!**************************************!*\
  !*** ./src/exceptions/exceptions.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var exceptions = {
    nullSecretKey: 'NO SECRET KEY DEFINED. YOU NEED TO DEFINED A SECRET KEY IN ORDER TO SUCCESSFULLY ENCRYPT OR DECRYPT DATA.',
    nullKey: 'NO STORAGE ITEM KEY DEFINED. UNABLE TO IDENTIFY STORAGE ITEM TO RETRIEVE',
    retrievingUndecryptedItem: 'TRYING TO RETRIEVE ENCRYPTED ITEM WITH INVALD OR UNSPECIFIED DECRYPTION CODE',
    indexedDB: {
        unsupported: 'THIS BROWSER DOES NOT YET SUPPORT THE INDEXEDDB SPECIFICATION OR IT IS IMPROPERLY SPECIFED'
    }
};
exports.default = exceptions;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable @typescript-eslint/no-var-requires */
var Cella = __webpack_require__(/*! ./cella */ "./src/cella.ts").default;
module.exports = Cella;


/***/ }),

/***/ "./src/storage/indexedDB.ts":
/*!**********************************!*\
  !*** ./src/storage/indexedDB.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var customIndexedDB = function (name) {
    return {
        store: function (key, value) { return localStorage.setItem(key, value); },
        get: function (key) { return localStorage.getItem(key); },
        eject: function (key) { return localStorage.removeItem(key); }
    };
};
exports.default = customIndexedDB;


/***/ }),

/***/ "./src/storage/localStorage.ts":
/*!*************************************!*\
  !*** ./src/storage/localStorage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var customLocalStorage = {
    store: function (key, value) { return localStorage.setItem(key, value); },
    get: function (key) { return localStorage.getItem(key); },
    eject: function (key) { return localStorage.removeItem(key); }
};
exports.default = customLocalStorage;


/***/ }),

/***/ "./src/storage/storage.ts":
/*!********************************!*\
  !*** ./src/storage/storage.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var indexedDB_1 = __importDefault(__webpack_require__(/*! ./indexedDB */ "./src/storage/indexedDB.ts"));
var localStorage_1 = __importDefault(__webpack_require__(/*! ./localStorage */ "./src/storage/localStorage.ts"));
var storage = {
    localStorage: localStorage_1.default,
    indexedDB: function (name) { return indexedDB_1.default(name); }
};
exports.default = storage;


/***/ }),

/***/ "crypto-js":
/*!*****************************************************************************************************!*\
  !*** external {"commonjs":"crypto-js","commonjs2":"crypto-js","amd":"crypto-js","root":"CryptoJS"} ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_crypto_js__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});
//# sourceMappingURL=index.js.map