/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.115
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
import{a as O}from"./chunk-LYPPBP4Q.js";import{c as I,d as V}from"./chunk-S7TTFAYA.js";import{a as W,b as v}from"./chunk-PYVDHCDQ.js";import{a as R}from"./chunk-JMWWNZHX.js";import{a as k}from"./chunk-4KGDZUZQ.js";import{e as N}from"./chunk-F3TINEFX.js";var z=Math.cos,Z=Math.sin,D=Math.sqrt,L={computePosition:function(t,n,a,r,o,s,e){let i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,l=g.latitude-t.granYCos*r+o*t.granXSin,u=z(l),c=Z(l),C=i.z*c,S=g.longitude+r*t.granYSin+o*t.granXCos,w=u*z(S),m=u*Z(S),d=i.x*w,R=i.y*m,Y=D(d*w+R*m+C*c);if(s.x=d/Y,s.y=R/Y,s.z=C/Y,a){let n=t.stNwCorner;N(n)?(l=n.latitude-t.stGranYCos*r+o*t.stGranXSin,S=n.longitude+r*t.stGranYSin+o*t.stGranXCos,e.x=(S-t.stWest)*t.lonScalar,e.y=(l-t.stSouth)*t.latScalar):(e.x=(S-h.west)*t.lonScalar,e.y=(l-h.south)*t.latScalar)}}},A=new V,g=new W,F=new v,b=new W,q=new O;function B(t,n,a,r,o,s,e){let i=Math.cos(n),h=r*i,l=a*i,u=Math.sin(n),c=r*u,C=a*u;g=q.project(t,g),g=W.subtract(g,b,g);let S=V.fromRotation(n,A);g=V.multiplyByVector(S,g,g),g=W.add(g,b,g),t=q.unproject(g,t),s-=1,e-=1;let w=t.latitude,m=w+s*C,d=w-h*e,R=w-h*e+s*C,Y=Math.max(w,m,d,R),X=Math.min(w,m,d,R),p=t.longitude,O=p+s*l,I=p+e*c,f=p+e*c+s*l,_=Math.max(p,O,I,f),P=Math.min(p,O,I,f);return{north:Y,south:X,east:_,west:P,granYCos:h,granYSin:c,granXCos:l,granXSin:C,nwCorner:t}}L.computeOptions=function(t,n,a,r,o,s,e){let i=t.east,g=t.west,h=t.north,l=t.south,u=!1,c=!1;h===R.PI_OVER_TWO&&(u=!0),l===-R.PI_OVER_TWO&&(c=!0);let C,S=h-l;C=g>i?R.TWO_PI-g+i:i-g;let w=Math.ceil(C/n)+1,m=Math.ceil(S/n)+1,d=C/(w-1),Y=S/(m-1),X=I.northwest(t,s),p=I.center(t,F);(0!==a||0!==r)&&(p.longitude<X.longitude&&(p.longitude+=R.TWO_PI),b=q.project(p,b));let O=Y,W=d,f=0,_=0,P=I.clone(t,o),M={granYCos:O,granYSin:f,granXCos:W,granXSin:_,nwCorner:X,boundingRectangle:P,width:w,height:m,northCap:u,southCap:c};if(0!==a){let t=B(X,a,d,Y,p,w,m);if(h=t.north,l=t.south,i=t.east,g=t.west,h<-R.PI_OVER_TWO||h>R.PI_OVER_TWO||l<-R.PI_OVER_TWO||l>R.PI_OVER_TWO)throw new k("Rotated rectangle is invalid.  It crosses over either the north or south pole.");M.granYCos=t.granYCos,M.granYSin=t.granYSin,M.granXCos=t.granXCos,M.granXSin=t.granXSin,P.north=h,P.south=l,P.east=i,P.west=g}if(0!==r){a-=r;let t=I.northwest(P,e),n=B(t,a,d,Y,p,w,m);M.stGranYCos=n.granYCos,M.stGranXCos=n.granXCos,M.stGranYSin=n.granYSin,M.stGranXSin=n.granXSin,M.stNwCorner=t,M.stWest=n.west,M.stSouth=n.south}return M};var nt=L;export{nt as a};