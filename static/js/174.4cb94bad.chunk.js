"use strict";(globalThis.webpackChunktodo_app=globalThis.webpackChunktodo_app||[]).push([[174],{1047(e,t,n){n.d(t,{A:()=>F});var r=n(9950),i=n(2004),o=n(8465);function s(e){try{return e.matches(":focus-visible")}catch(t){0}return!1}var a=n(9254),l=n(8463),u=n(1506);const c=n(2529).A;var p=n(8573);class d{static create(){return new d}static use(){const e=(0,p.A)(d.create).current,[t,n]=r.useState(!1);return e.shouldMount=t,e.setShouldMount=n,r.useEffect(e.mountEffect,[t]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=function(){let e,t;const n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&null!==this.ref.current&&(this.didMount=!0,this.mounted.resolve())};start(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then(()=>this.ref.current?.start(...t))}stop(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then(()=>this.ref.current?.stop(...t))}pulsate(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.mount().then(()=>this.ref.current?.pulsate(...t))}}var h=n(8587),f=n(8168);var m=n(5540),v=n(8555);function b(e,t){var n=Object.create(null);return e&&r.Children.map(e,function(e){return e}).forEach(function(e){n[e.key]=function(e){return t&&(0,r.isValidElement)(e)?t(e):e}(e)}),n}function g(e,t,n){return null!=n[t]?n[t]:e.props[t]}function y(e,t,n){var i=b(e.children),o=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var s in e)s in t?o.length&&(i[s]=o,o=[]):o.push(s);var a={};for(var l in t){if(i[l])for(r=0;r<i[l].length;r++){var u=i[l][r];a[i[l][r]]=n(u)}a[l]=n(l)}for(r=0;r<o.length;r++)a[o[r]]=n(o[r]);return a}(t,i);return Object.keys(o).forEach(function(s){var a=o[s];if((0,r.isValidElement)(a)){var l=s in t,u=s in i,c=t[s],p=(0,r.isValidElement)(c)&&!c.props.in;!u||l&&!p?u||!l||p?u&&l&&(0,r.isValidElement)(c)&&(o[s]=(0,r.cloneElement)(a,{onExited:n.bind(null,a),in:c.props.in,exit:g(a,"exit",e),enter:g(a,"enter",e)})):o[s]=(0,r.cloneElement)(a,{in:!1}):o[s]=(0,r.cloneElement)(a,{onExited:n.bind(null,a),in:!0,exit:g(a,"exit",e),enter:g(a,"enter",e)})}}),o}var A=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},x=function(e){function t(t,n){var r,i=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}(0,m.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,i,o=t.children,s=t.handleExited;return{children:t.firstRender?(n=e,i=s,b(n.children,function(e){return(0,r.cloneElement)(e,{onExited:i.bind(null,e),in:!0,appear:g(e,"appear",n),enter:g(e,"enter",n),exit:g(e,"exit",n)})})):y(e,o,s),firstRender:!1}},n.handleExited=function(e,t){var n=b(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=(0,f.A)({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=(0,h.A)(e,["component","childFactory"]),o=this.state.contextValue,s=A(this.state.children).map(n);return delete i.appear,delete i.enter,delete i.exit,null===t?r.createElement(v.A.Provider,{value:o},s):r.createElement(v.A.Provider,{value:o},r.createElement(t,i,s))},t}(r.Component);x.propTypes={},x.defaultProps={component:"div",childFactory:function(e){return e}};const k=x;var M=n(4888),R=n(8283),E=n(4414);const S=function(e){const{className:t,classes:n,pulsate:o=!1,rippleX:s,rippleY:a,rippleSize:l,in:u,onExited:c,timeout:p}=e,[d,h]=r.useState(!1),f=(0,i.A)(t,n.ripple,n.rippleVisible,o&&n.ripplePulsate),m={width:l,height:l,top:-l/2+a,left:-l/2+s},v=(0,i.A)(n.child,d&&n.childLeaving,o&&n.childPulsate);return u||d||h(!0),r.useEffect(()=>{if(!u&&null!=c){const e=setTimeout(c,p);return()=>{clearTimeout(e)}}},[c,u,p]),(0,E.jsx)("span",{className:f,style:m,children:(0,E.jsx)("span",{className:v})})};var w=n(1763);const P=(0,w.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),C=R.i7`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,T=R.i7`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,$=R.i7`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,j=(0,a.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),V=(0,a.Ay)(S,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${P.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${C};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  &.${P.ripplePulsate} {
    animation-duration: ${e=>{let{theme:t}=e;return t.transitions.duration.shorter}}ms;
  }

  & .${P.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${P.childLeaving} {
    opacity: 0;
    animation-name: ${T};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  & .${P.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${$};
    animation-duration: 2500ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,D=r.forwardRef(function(e,t){const n=(0,l.b)({props:e,name:"MuiTouchRipple"}),{center:o=!1,classes:s={},className:a,...u}=n,[c,p]=r.useState([]),d=r.useRef(0),h=r.useRef(null);r.useEffect(()=>{h.current&&(h.current(),h.current=null)},[c]);const f=r.useRef(!1),m=(0,M.A)(),v=r.useRef(null),b=r.useRef(null),g=r.useCallback(e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:o,cb:a}=e;p(e=>[...e,(0,E.jsx)(V,{classes:{ripple:(0,i.A)(s.ripple,P.ripple),rippleVisible:(0,i.A)(s.rippleVisible,P.rippleVisible),ripplePulsate:(0,i.A)(s.ripplePulsate,P.ripplePulsate),child:(0,i.A)(s.child,P.child),childLeaving:(0,i.A)(s.childLeaving,P.childLeaving),childPulsate:(0,i.A)(s.childPulsate,P.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:o},d.current)]),d.current+=1,h.current=a},[s]),y=r.useCallback(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{};const{pulsate:r=!1,center:i=o||t.pulsate,fakeElement:s=!1}=t;if("mousedown"===e?.type&&f.current)return void(f.current=!1);"touchstart"===e?.type&&(f.current=!0);const a=s?null:b.current,l=a?a.getBoundingClientRect():{width:0,height:0,left:0,top:0};let u,c,p;if(i||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)u=Math.round(l.width/2),c=Math.round(l.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;u=Math.round(t-l.left),c=Math.round(n-l.top)}if(i)p=Math.sqrt((2*l.width**2+l.height**2)/3),p%2===0&&(p+=1);else{const e=2*Math.max(Math.abs((a?a.clientWidth:0)-u),u)+2,t=2*Math.max(Math.abs((a?a.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}e?.touches?null===v.current&&(v.current=()=>{g({pulsate:r,rippleX:u,rippleY:c,rippleSize:p,cb:n})},m.start(80,()=>{v.current&&(v.current(),v.current=null)})):g({pulsate:r,rippleX:u,rippleY:c,rippleSize:p,cb:n})},[o,g,m]),A=r.useCallback(()=>{y({},{pulsate:!0})},[y]),x=r.useCallback((e,t)=>{if(m.clear(),"touchend"===e?.type&&v.current)return v.current(),v.current=null,void m.start(0,()=>{x(e,t)});v.current=null,p(e=>e.length>0?e.slice(1):e),h.current=t},[m]);return r.useImperativeHandle(t,()=>({pulsate:A,start:y,stop:x}),[A,y,x]),(0,E.jsx)(j,{className:(0,i.A)(P.root,s.root,a),ref:b,...u,children:(0,E.jsx)(k,{component:null,exit:!0,children:c})})}),I=D;var O=n(423);function N(e){return(0,O.Ay)("MuiButtonBase",e)}const B=(0,w.A)("MuiButtonBase",["root","disabled","focusVisible"]),z=(0,a.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${B.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}});function L(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return c(i=>(n&&n(i),r||e[t](i),!0))}const F=r.forwardRef(function(e,t){const n=(0,l.b)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:p=!1,children:h,className:f,component:m="button",disabled:v=!1,disableRipple:b=!1,disableTouchRipple:g=!1,focusRipple:y=!1,focusVisibleClassName:A,LinkComponent:x="a",onBlur:k,onClick:M,onContextMenu:R,onDragLeave:S,onFocus:w,onFocusVisible:P,onKeyDown:C,onKeyUp:T,onMouseDown:$,onMouseLeave:j,onMouseUp:V,onTouchEnd:D,onTouchMove:O,onTouchStart:B,tabIndex:F=0,TouchRippleProps:X,touchRippleRef:Y,type:H,..._}=n,U=r.useRef(null),W=d.use(),K=(0,u.A)(W.ref,Y),[q,G]=r.useState(!1);v&&q&&G(!1),r.useImperativeHandle(a,()=>({focusVisible:()=>{G(!0),U.current.focus()}}),[]);const J=W.shouldMount&&!b&&!v;r.useEffect(()=>{q&&y&&!b&&W.pulsate()},[b,y,q,W]);const Q=L(W,"start",$,g),Z=L(W,"stop",R,g),ee=L(W,"stop",S,g),te=L(W,"stop",V,g),ne=L(W,"stop",e=>{q&&e.preventDefault(),j&&j(e)},g),re=L(W,"start",B,g),ie=L(W,"stop",D,g),oe=L(W,"stop",O,g),se=L(W,"stop",e=>{s(e.target)||G(!1),k&&k(e)},!1),ae=c(e=>{U.current||(U.current=e.currentTarget),s(e.target)&&(G(!0),P&&P(e)),w&&w(e)}),le=()=>{const e=U.current;return m&&"button"!==m&&!("A"===e.tagName&&e.href)},ue=c(e=>{y&&!e.repeat&&q&&" "===e.key&&W.stop(e,()=>{W.start(e)}),e.target===e.currentTarget&&le()&&" "===e.key&&e.preventDefault(),C&&C(e),e.target===e.currentTarget&&le()&&"Enter"===e.key&&!v&&(e.preventDefault(),M&&M(e))}),ce=c(e=>{y&&" "===e.key&&q&&!e.defaultPrevented&&W.stop(e,()=>{W.pulsate(e)}),T&&T(e),M&&e.target===e.currentTarget&&le()&&" "===e.key&&!e.defaultPrevented&&M(e)});let pe=m;"button"===pe&&(_.href||_.to)&&(pe=x);const de={};"button"===pe?(de.type=void 0===H?"button":H,de.disabled=v):(_.href||_.to||(de.role="button"),v&&(de["aria-disabled"]=v));const he=(0,u.A)(t,U),fe={...n,centerRipple:p,component:m,disabled:v,disableRipple:b,disableTouchRipple:g,focusRipple:y,tabIndex:F,focusVisible:q},me=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,s={root:["root",t&&"disabled",n&&"focusVisible"]},a=(0,o.A)(s,N,i);return n&&r&&(a.root+=` ${r}`),a})(fe);return(0,E.jsxs)(z,{as:pe,className:(0,i.A)(me.root,f),ownerState:fe,onBlur:se,onClick:M,onContextMenu:Z,onFocus:ae,onKeyDown:ue,onKeyUp:ce,onMouseDown:Q,onMouseLeave:ne,onMouseUp:te,onDragLeave:ee,onTouchEnd:ie,onTouchMove:oe,onTouchStart:re,ref:he,tabIndex:v?-1:F,type:H,...de,..._,children:[h,J?(0,E.jsx)(I,{ref:K,center:p,...X}):null]})})},6639(e,t,n){n.d(t,{A:()=>R});var r=n(9950),i=n(2004),o=n(8465),s=n(8283),a=n(9254),l=n(4265),u=n(8463),c=n(1676),p=n(1734),d=n(1763),h=n(423);function f(e){return(0,h.Ay)("MuiCircularProgress",e)}(0,d.A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=n(4414);const v=44,b=s.i7`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,g=s.i7`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,y="string"!==typeof b?s.AH`
        animation: ${b} 1.4s linear infinite;
      `:null,A="string"!==typeof g?s.AH`
        animation: ${g} 1.4s ease-in-out infinite;
      `:null,x=(0,a.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`color${(0,c.A)(n.color)}`]]}})((0,l.A)(e=>{let{theme:t}=e;return{display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("transform")}},{props:{variant:"indeterminate"},style:y||{animation:`${b} 1.4s linear infinite`}},...Object.entries(t.palette).filter((0,p.A)()).map(e=>{let[n]=e;return{props:{color:n},style:{color:(t.vars||t).palette[n].main}}})]}})),k=(0,a.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),M=(0,a.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.circle,t[`circle${(0,c.A)(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})((0,l.A)(e=>{let{theme:t}=e;return{stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink},style:A||{animation:`${g} 1.4s ease-in-out infinite`}}]}})),R=r.forwardRef(function(e,t){const n=(0,u.b)({props:e,name:"MuiCircularProgress"}),{className:r,color:s="primary",disableShrink:a=!1,size:l=40,style:p,thickness:d=3.6,value:h=0,variant:b="indeterminate",...g}=n,y={...n,color:s,disableShrink:a,size:l,thickness:d,value:h,variant:b},A=(e=>{const{classes:t,variant:n,color:r,disableShrink:i}=e,s={root:["root",n,`color${(0,c.A)(r)}`],svg:["svg"],circle:["circle",`circle${(0,c.A)(n)}`,i&&"circleDisableShrink"]};return(0,o.A)(s,f,t)})(y),R={},E={},S={};if("determinate"===b){const e=2*Math.PI*((v-d)/2);R.strokeDasharray=e.toFixed(3),S["aria-valuenow"]=Math.round(h),R.strokeDashoffset=`${((100-h)/100*e).toFixed(3)}px`,E.transform="rotate(-90deg)"}return(0,m.jsx)(x,{className:(0,i.A)(A.root,r),style:{width:l,height:l,...E,...p},ownerState:y,ref:t,role:"progressbar",...S,...g,children:(0,m.jsx)(k,{className:A.svg,ownerState:y,viewBox:"22 22 44 44",children:(0,m.jsx)(M,{className:A.circle,style:R,ownerState:y,cx:v,cy:v,r:(v-d)/2,fill:"none",strokeWidth:d})})})})},1506(e,t,n){n.d(t,{A:()=>r});const r=n(5393).A},1014(e,t,n){n.d(t,{A:()=>r});const r=n(3539).A},2529(e,t,n){n.d(t,{A:()=>o});var r=n(9950),i=n(1399);const o=function(e){const t=r.useRef(e);return(0,i.A)(()=>{t.current=e}),r.useRef(function(){return(0,t.current)(...arguments)}).current}},8573(e,t,n){n.d(t,{A:()=>o});var r=n(9950);const i={};function o(e,t){const n=r.useRef(i);return n.current===i&&(n.current=e(t)),n}},4888(e,t,n){n.d(t,{A:()=>a});var r=n(8573),i=n(9950);const o=[];class s{static create(){return new s}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear}function a(){const e=(0,r.A)(s.create).current;var t;return t=e.disposeEffect,i.useEffect(t,o),e}},8555(e,t,n){n.d(t,{A:()=>r});const r=n(9950).createContext(null)},5540(e,t,n){function r(e,t){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},r(e,t)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}n.d(t,{A:()=>i})},8587(e,t,n){function r(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}n.d(t,{A:()=>r})}}]);