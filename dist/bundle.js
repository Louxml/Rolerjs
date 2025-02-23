!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Roler=r():e.Roler=r()}(this,(()=>(()=>{"use strict";var e={d:(r,t)=>{for(var n in t)e.o(t,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:t[n]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};function t(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,u(n.key),n)}}function n(e,r,t){if("function"==typeof e?e===r:e.has(r))return arguments.length<3?r:t;throw new TypeError("Private element is not present on this object")}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r,t){return(r=u(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e){var r=function(e){if("object"!=s(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var t=r.call(e,"string");if("object"!=s(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==s(r)?r:r+""}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}e.r(r),e.d(r,{Extension:()=>l,ExtensionType:()=>c});var c={Application:"application",Renderer:"renderer",WebGLPipes:"webgl-pipes",WebGLPipesAdaptor:"webgl-pipes-adaptor",WebGLSystem:"webgl-system",Assets:"assets",LoadParser:"load-parser",ResolveParser:"resolve-parser",CacheParser:"cache-parser",DetectionParser:"detection-parser",Environment:"environment",TextureSource:"texture-source"},f=function(e){if("function"==typeof e||"object"===s(e)&&e.extension){var r,t,n,o;if(!e.extension)throw new Error("Extension class must have an extension object");var a=e.extension;if("string"==typeof a&&(a={type:[a]}),"string"==typeof a.type&&(a.type=[a.type]),!(a.type instanceof Array))throw new Error("This extension is type error.");if(null!==(t=(r=a).name)&&void 0!==t||(r.name=e.name),"string"!=typeof a.name)throw new Error("This extension is name error.");if(null!==(o=(n=a).priority)&&void 0!==o||(n.priority=0),"number"!=typeof a.priority)throw new Error("This extension is priority error.");e=i(i({},a),{},{ref:e})}if("object"!==s(e))throw new Error("Extension error");return i({},e)},l=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e)}return r=e,o=[{key:"queue",get:function(){return i({},n(e,this,h)._)}},{key:"add",value:function(){for(var r=this,t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];return o.map(f).forEach((function(t){t.type.forEach((function(o){var i,a=n(e,r,p)._,u=n(e,r,h)._;a[o]?a[o](t):(null!==(i=u[o])&&void 0!==i||(u[o]=[]),u[o].push(t))}))})),this}},{key:"remove",value:function(){for(var r=this,t=arguments.length,o=new Array(t),i=0;i<t;i++)o[i]=arguments[i];return o.map(f).forEach((function(t){t.type.forEach((function(o){var i,a;return null===(i=(a=n(e,r,y)._)[o])||void 0===i?void 0:i.call(a,t)}))})),this}},{key:"handle",value:function(r,t,o){var i=n(e,this,p)._,a=n(e,this,y)._;if(i[r]||a[r])throw new Error("Extension type ".concat(r," already has a handler"));i[r]=t,a[r]=o;var u,s=n(e,this,h)._;return s[r]&&(null===(u=s[r])||void 0===u||u.forEach((function(e){return t(e)})),delete s[r]),this}},{key:"handleByMap",value:function(e,r){return this.handle(e,(function(e){if(r[e.name])throw new Error("Extension name ".concat(e.name," already has a Extexsion"));r[e.name]=e.ref}),(function(e){delete r[e.name]}))}},{key:"handleByList",value:function(e,r){return this.handle(e,(function(e){r.includes(e.ref)?console.warn("This extension already exist"):(r.push(e.ref),r.sort((function(e,r){return f(r).priority-f(e).priority})))}),(function(e){var t=r.indexOf(e.ref);t>=0&&r.splice(t,1)}))}},{key:"handleByNamedList",value:function(e,r){return this.handle(e,(function(e){if(r.findIndex((function(r){return r.name===e.name}))>=0)console.warn("This extension already exist");else{var t={name:e.name,value:e.ref,priority:f(e).priority};r.push(t),r.sort((function(e,r){return r.priority-e.priority}))}}),(function(e){var t=r.findIndex((function(r){return r.name===e.name}));t>=0&&r.splice(t,1)}))}}],null&&t(r.prototype,null),o&&t(r,o),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,o}(),p={_:{}},y={_:{}},h={_:Object.create(null)};return r})()));