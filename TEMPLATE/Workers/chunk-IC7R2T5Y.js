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
import{e as C}from"./chunk-LYPPBP4Q.js";import{a as n,e as b}from"./chunk-PYVDHCDQ.js";import{a as w}from"./chunk-JMWWNZHX.js";var j={},q=new n,L=new n,Q=new C,G=new b;function W(e,t,r,a,o,i,l,s,y,c){let m=e+t;n.multiplyByScalar(a,Math.cos(m),q),n.multiplyByScalar(r,Math.sin(m),L),n.add(q,L,q);let u=Math.cos(e);u*=u;let w=Math.sin(e);w*=w;let x=i/Math.sqrt(l*u+o*w)/s;return C.fromAxisAngle(q,x,Q),b.fromQuaternion(Q,G),b.multiplyByVector(G,y,c),n.normalize(c,c),n.multiplyByScalar(c,s,c),c}var U=new n,Z=new n,N=new n,v=new n;j.raisePositionsToHeight=function(e,t,r){let a=t.ellipsoid,o=t.height,i=t.extrudedHeight,l=r?e.length/3*2:e.length/3,s=new Float64Array(3*l),y=e.length,c=r?y:0;for(let m=0;m<y;m+=3){let t=m+1,l=m+2,y=n.fromArray(e,m,U);a.scaleToGeodeticSurface(y,y);let u=n.clone(y,Z),w=a.geodeticSurfaceNormal(y,v),x=n.multiplyByScalar(w,o,N);n.add(y,x,y),r&&(n.multiplyByScalar(w,i,x),n.add(u,x,u),s[m+c]=u.x,s[t+c]=u.y,s[l+c]=u.z),s[m]=y.x,s[t]=y.y,s[l]=y.z}return s};var D=new n,J=new n,K=new n;j.computeEllipsePositions=function(e,t,r){let a=e.semiMinorAxis,o=e.semiMajorAxis,i=e.rotation,l=e.center,s=8*e.granularity,y=a*a,c=o*o,m=o*a,u=n.magnitude(l),x=n.normalize(l,D),h=n.cross(n.UNIT_Z,l,J);h=n.normalize(h,h);let z=n.cross(x,h,K),f=1+Math.ceil(w.PI_OVER_TWO/s),P=w.PI_OVER_TWO/(f-1),_=w.PI_OVER_TWO-f*P;_<0&&(f-=Math.ceil(Math.abs(_)/P));let p,O,d,M,I,T=f*(f+2)*2,g=t?new Array(3*T):void 0,V=0,E=U,j=Z,v=4*f*3,A=v-1,R=0,B=r?new Array(v):void 0;for(_=w.PI_OVER_TWO,E=W(_,i,z,h,y,m,c,u,x,E),t&&(g[V++]=E.x,g[V++]=E.y,g[V++]=E.z),r&&(B[A--]=E.z,B[A--]=E.y,B[A--]=E.x),_=w.PI_OVER_TWO-P,p=1;p<f+1;++p){if(E=W(_,i,z,h,y,m,c,u,x,E),j=W(Math.PI-_,i,z,h,y,m,c,u,x,j),t){for(g[V++]=E.x,g[V++]=E.y,g[V++]=E.z,d=2*p+2,O=1;O<d-1;++O)M=O/(d-1),I=n.lerp(E,j,M,N),g[V++]=I.x,g[V++]=I.y,g[V++]=I.z;g[V++]=j.x,g[V++]=j.y,g[V++]=j.z}r&&(B[A--]=E.z,B[A--]=E.y,B[A--]=E.x,B[R++]=j.x,B[R++]=j.y,B[R++]=j.z),_=w.PI_OVER_TWO-(p+1)*P}for(p=f;p>1;--p){if(_=w.PI_OVER_TWO-(p-1)*P,E=W(-_,i,z,h,y,m,c,u,x,E),j=W(_+Math.PI,i,z,h,y,m,c,u,x,j),t){for(g[V++]=E.x,g[V++]=E.y,g[V++]=E.z,d=2*(p-1)+2,O=1;O<d-1;++O)M=O/(d-1),I=n.lerp(E,j,M,N),g[V++]=I.x,g[V++]=I.y,g[V++]=I.z;g[V++]=j.x,g[V++]=j.y,g[V++]=j.z}r&&(B[A--]=E.z,B[A--]=E.y,B[A--]=E.x,B[R++]=j.x,B[R++]=j.y,B[R++]=j.z)}_=w.PI_OVER_TWO,E=W(-_,i,z,h,y,m,c,u,x,E);let S={};return t&&(g[V++]=E.x,g[V++]=E.y,g[V++]=E.z,S.positions=g,S.numPts=f),r&&(B[A--]=E.z,B[A--]=E.y,B[A--]=E.x,S.outerPositions=B),S};var tt=j;export{tt as a};