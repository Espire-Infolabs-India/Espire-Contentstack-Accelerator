if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Mesh_home.webp",revision:"d36a039dac1316694cdda6c788e39467"},{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/static/aa6nA3Zb51PGMyNuOsmQb/_buildManifest.js",revision:"c9e7e7bbd48f51e860f4933adee90361"},{url:"/_next/static/aa6nA3Zb51PGMyNuOsmQb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/286-c5368c9a58815394.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/415.7b3923475af44ce1.js",revision:"7b3923475af44ce1"},{url:"/_next/static/chunks/450-62fbf1c63246dceb.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/536-ff864426e3a8ee0b.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/543-ae6d3a983207d35c.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/75fc9c18-7acc005baae731fb.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/fd9d1056-cc48c28d170fddc2.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/framework-35f277e00a5ea5dc.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/main-3d6439214e135b80.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/main-app-60d4180cd4ba8218.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/%5Bpage%5D-93b0ab31ad977eb7.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/404-4eab01c7fec66226.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/_app-b7413279032e8724.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/blog-e1cefc311bf582e0.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/blog/%5Bpost%5D-7446268d10742664.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/index-c7be6e67651450e6.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/index_rename-04cab15314e75e1b.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/product-86fbd704fbe0b38b.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/product/%5Bdetails%5D-ebd8bfc1a1b318c5.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/pages/sitemap.xml-ceaeb2bcf2189d75.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6996934c1081bfc8.js",revision:"aa6nA3Zb51PGMyNuOsmQb"},{url:"/_next/static/css/ed407b64efa8d7a6.css",revision:"ed407b64efa8d7a6"},{url:"/_next/static/media/Mesh_home.354290d3.webp",revision:"d36a039dac1316694cdda6c788e39467"},{url:"/contentstack-readme-logo.png",revision:"b876b33d59cbf5ce3ec7d9242745a7de"},{url:"/copy.svg",revision:"b6ed71ceabe5e24a1ae9d3b964c92404"},{url:"/favicon.ico",revision:"9a6e4aaa6e90b763a122b06b12417091"},{url:"/icon/icon-192x192.png",revision:"ca9d675a868e5e2ef3389bf8e9e41ef6"},{url:"/icon/icon-256x256.png",revision:"4f4eed8bd6c5ce7c92ab25bc0f6d6319"},{url:"/icon/icon-384x384.png",revision:"d20f17d829aa3f2a136a2e20c3cd566f"},{url:"/icon/icon-512x512.png",revision:"9e5e8e7e2f879b75d304f2214fd46ac1"},{url:"/images/hero_banner.webp",revision:"840be483aa7240bbbfa52ebcc3ca3237"},{url:"/images/hero_banner_1.jpg",revision:"d5c36cb8133a342507880a6c970e51b5"},{url:"/images/hero_banner_2.webp",revision:"efd05cf7102b1a33d8c1fb03f1a32b68"},{url:"/images/hero_banner_3.jpg",revision:"6d0f09bbababa28d8631fbfd9e8ea690"},{url:"/json.svg",revision:"7b433b4965ec8546087482b1d0cc21c1"},{url:"/manifest.json",revision:"46cbd3b8d736e5caa98d8c92129b1d87"},{url:"/starter-app.png",revision:"b0383c57ab01d0be2aee3ed14771e519"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
