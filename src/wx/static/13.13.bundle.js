webpackJsonp([13],{59:function(e,t,o){"use strict";var s=o(85);e.exports={route:{data:function(e){var t=e.to,o=e.next,i={id:t.params.messageId};s.get(i,function(e,t){e||o({message:t})})}},data:function(){return{message:{}}}}},85:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={get:function(e,t){setTimeout(function(){t(null,{id:e.id,text:"Hello this is a message"})},3e3)}}},131:function(e,t){e.exports="<div><div v-if=$loadingRouteData>Loading data...</div><div v-if=!$loadingRouteData>message #{{message.id}}: {{message.text}}</div></div>"},170:function(e,t,o){var s,i;s=o(59),i=o(131),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)}});