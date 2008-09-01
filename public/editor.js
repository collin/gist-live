/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();;

function diff_match_patch(){this.Diff_Timeout=1.0;this.Diff_EditCost=4;this.Diff_DualThreshold=32;this.Match_Balance=0.5;this.Match_Threshold=0.5;this.Match_MinLength=100;this.Match_MaxLength=1000;this.Patch_Margin=4;function getMaxBits(){var a=0;var b=1;var c=2;while(b!=c){a++;b=c;c=c<<1}return a}this.Match_MaxBits=getMaxBits()}var DIFF_DELETE=-1;var DIFF_INSERT=1;var DIFF_EQUAL=0;diff_match_patch.prototype.diff_main=function(a,b,c){if(a==b){return[[DIFF_EQUAL,a]]}if(typeof c=='undefined'){c=true}var d=c;var e=this.diff_commonPrefix(a,b);var f=a.substring(0,e);a=a.substring(e);b=b.substring(e);e=this.diff_commonSuffix(a,b);var g=a.substring(a.length-e);a=a.substring(0,a.length-e);b=b.substring(0,b.length-e);var h=this.diff_compute(a,b,d);if(f){h.unshift([DIFF_EQUAL,f])}if(g){h.push([DIFF_EQUAL,g])}this.diff_cleanupMerge(h);return h};diff_match_patch.prototype.diff_compute=function(b,c,d){var e;if(!b){return[[DIFF_INSERT,c]]}if(!c){return[[DIFF_DELETE,b]]}var f=b.length>c.length?b:c;var g=b.length>c.length?c:b;var i=f.indexOf(g);if(i!=-1){e=[[DIFF_INSERT,f.substring(0,i)],[DIFF_EQUAL,g],[DIFF_INSERT,f.substring(i+g.length)]];if(b.length>c.length){e[0][0]=e[2][0]=DIFF_DELETE}return e}f=g=null;var h=this.diff_halfMatch(b,c);if(h){var k=h[0];var l=h[1];var m=h[2];var n=h[3];var o=h[4];var p=this.diff_main(k,m,d);var q=this.diff_main(l,n,d);return p.concat([[DIFF_EQUAL,o]],q)}if(d&&(b.length<100||c.length<100)){d=false}var r;if(d){var a=this.diff_linesToChars(b,c);b=a[0];c=a[1];r=a[2]}e=this.diff_map(b,c);if(!e){e=[[DIFF_DELETE,b],[DIFF_INSERT,c]]}if(d){this.diff_charsToLines(e,r);this.diff_cleanupSemantic(e);e.push([DIFF_EQUAL,'']);var s=0;var t=0;var u=0;var v='';var w='';while(s<e.length){switch(e[s][0]){case DIFF_INSERT:u++;w+=e[s][1];break;case DIFF_DELETE:t++;v+=e[s][1];break;case DIFF_EQUAL:if(t>=1&&u>=1){var a=this.diff_main(v,w,false);e.splice(s-t-u,t+u);s=s-t-u;for(var j=a.length-1;j>=0;j--){e.splice(s,0,a[j])}s=s+a.length}u=0;t=0;v='';w='';break}s++}e.pop()}return e};diff_match_patch.prototype.diff_linesToChars=function(g,h){var i=[];var j={};i[0]='';function diff_linesToCharsMunge(a){var b='';var c=0;var d=-1;var e=i.length;while(d<a.length-1){d=a.indexOf('\n',c);if(d==-1){d=a.length-1}var f=a.substring(c,d+1);c=d+1;if(j.hasOwnProperty?j.hasOwnProperty(f):(j[f]!==undefined)){b+=String.fromCharCode(j[f])}else{b+=String.fromCharCode(e);j[f]=e;i[e++]=f}}return b}var k=diff_linesToCharsMunge(g);var l=diff_linesToCharsMunge(h);return[k,l,i]};diff_match_patch.prototype.diff_charsToLines=function(a,b){for(var x=0;x<a.length;x++){var c=a[x][1];var d=[];for(var y=0;y<c.length;y++){d[y]=b[c.charCodeAt(y)]}a[x][1]=d.join('')}};diff_match_patch.prototype.diff_map=function(b,c){var e=(new Date()).getTime()+this.Diff_Timeout*1000;var f=b.length+c.length-1;var g=this.Diff_DualThreshold*2<f;var h=[];var i=[];var j={};var l={};j[1]=0;l[1]=0;var x,y;var m;var n={};var o=false;var hasOwnProperty=!!(n.hasOwnProperty);var p=(b.length+c.length)%2;for(var d=0;d<f;d++){if(this.Diff_Timeout>0&&(new Date()).getTime()>e){return null}h[d]={};for(var k=-d;k<=d;k+=2){if(k==-d||k!=d&&j[k-1]<j[k+1]){x=j[k+1]}else{x=j[k-1]+1}y=x-k;if(g){m=x+','+y;if(p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(!p){n[m]=d}}while(!o&&x<b.length&&y<c.length&&b.charAt(x)==c.charAt(y)){x++;y++;if(g){m=x+','+y;if(p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(!p){n[m]=d}}}j[k]=x;h[d][x+','+y]=true;if(x==b.length&&y==c.length){return this.diff_path1(h,b,c)}else if(o){i=i.slice(0,n[m]+1);var a=this.diff_path1(h,b.substring(0,x),c.substring(0,y));return a.concat(this.diff_path2(i,b.substring(x),c.substring(y)))}}if(g){i[d]={};for(var k=-d;k<=d;k+=2){if(k==-d||k!=d&&l[k-1]<l[k+1]){x=l[k+1]}else{x=l[k-1]+1}y=x-k;m=(b.length-x)+','+(c.length-y);if(!p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(p){n[m]=d}while(!o&&x<b.length&&y<c.length&&b.charAt(b.length-x-1)==c.charAt(c.length-y-1)){x++;y++;m=(b.length-x)+','+(c.length-y);if(!p&&(hasOwnProperty?n.hasOwnProperty(m):(n[m]!==undefined))){o=true}if(p){n[m]=d}}l[k]=x;i[d][x+','+y]=true;if(o){h=h.slice(0,n[m]+1);var a=this.diff_path1(h,b.substring(0,b.length-x),c.substring(0,c.length-y));return a.concat(this.diff_path2(i,b.substring(b.length-x),c.substring(c.length-y)))}}}}return null};diff_match_patch.prototype.diff_path1=function(a,b,c){var e=[];var x=b.length;var y=c.length;var f=null;for(var d=a.length-2;d>=0;d--){while(1){if(a[d].hasOwnProperty?a[d].hasOwnProperty((x-1)+','+y):(a[d][(x-1)+','+y]!==undefined)){x--;if(f===DIFF_DELETE){e[0][1]=b.charAt(x)+e[0][1]}else{e.unshift([DIFF_DELETE,b.charAt(x)])}f=DIFF_DELETE;break}else if(a[d].hasOwnProperty?a[d].hasOwnProperty(x+','+(y-1)):(a[d][x+','+(y-1)]!==undefined)){y--;if(f===DIFF_INSERT){e[0][1]=c.charAt(y)+e[0][1]}else{e.unshift([DIFF_INSERT,c.charAt(y)])}f=DIFF_INSERT;break}else{x--;y--;if(f===DIFF_EQUAL){e[0][1]=b.charAt(x)+e[0][1]}else{e.unshift([DIFF_EQUAL,b.charAt(x)])}f=DIFF_EQUAL}}}return e};diff_match_patch.prototype.diff_path2=function(a,b,c){var e=[];var f=0;var x=b.length;var y=c.length;var g=null;for(var d=a.length-2;d>=0;d--){while(1){if(a[d].hasOwnProperty?a[d].hasOwnProperty((x-1)+','+y):(a[d][(x-1)+','+y]!==undefined)){x--;if(g===DIFF_DELETE){e[f-1][1]+=b.charAt(b.length-x-1)}else{e[f++]=[DIFF_DELETE,b.charAt(b.length-x-1)]}g=DIFF_DELETE;break}else if(a[d].hasOwnProperty?a[d].hasOwnProperty(x+','+(y-1)):(a[d][x+','+(y-1)]!==undefined)){y--;if(g===DIFF_INSERT){e[f-1][1]+=c.charAt(c.length-y-1)}else{e[f++]=[DIFF_INSERT,c.charAt(c.length-y-1)]}g=DIFF_INSERT;break}else{x--;y--;if(g===DIFF_EQUAL){e[f-1][1]+=b.charAt(b.length-x-1)}else{e[f++]=[DIFF_EQUAL,b.charAt(b.length-x-1)]}g=DIFF_EQUAL}}}return e};diff_match_patch.prototype.diff_commonPrefix=function(a,b){if(!a||!b||a.charCodeAt(0)!==b.charCodeAt(0)){return 0}var c=0;var d=Math.min(a.length,b.length);var e=d;var f=0;while(c<e){if(a.substring(f,e)==b.substring(f,e)){c=e;f=c}else{d=e}e=Math.floor((d-c)/2+c)}return e};diff_match_patch.prototype.diff_commonSuffix=function(a,b){if(!a||!b||a.charCodeAt(a.length-1)!==b.charCodeAt(b.length-1)){return 0}var c=0;var d=Math.min(a.length,b.length);var e=d;var f=0;while(c<e){if(a.substring(a.length-e,a.length-f)==b.substring(b.length-e,b.length-f)){c=e;f=c}else{d=e}e=Math.floor((d-c)/2+c)}return e};diff_match_patch.prototype.diff_halfMatch=function(h,k){var l=h.length>k.length?h:k;var m=h.length>k.length?k:h;if(l.length<10||m.length<1){return null}var n=this;function diff_halfMatchI(a,b,i){var c=a.substring(i,i+Math.floor(a.length/4));var j=-1;var d='';var e,best_longtext_b,best_shorttext_a,best_shorttext_b;while((j=b.indexOf(c,j+1))!=-1){var f=n.diff_commonPrefix(a.substring(i),b.substring(j));var g=n.diff_commonSuffix(a.substring(0,i),b.substring(0,j));if(d.length<g+f){d=b.substring(j-g,j)+b.substring(j,j+f);e=a.substring(0,i-g);best_longtext_b=a.substring(i+f);best_shorttext_a=b.substring(0,j-g);best_shorttext_b=b.substring(j+f)}}if(d.length>=a.length/2){return[e,best_longtext_b,best_shorttext_a,best_shorttext_b,d]}else{return null}}var o=diff_halfMatchI(l,m,Math.ceil(l.length/4));var p=diff_halfMatchI(l,m,Math.ceil(l.length/2));var q;if(!o&&!p){return null}else if(!p){q=o}else if(!o){q=p}else{q=o[4].length>p[4].length?o:p}var r,text1_b,text2_a,text2_b;if(h.length>k.length){r=q[0];text1_b=q[1];text2_a=q[2];text2_b=q[3]}else{text2_a=q[0];text2_b=q[1];r=q[2];text1_b=q[3]}var s=q[4];return[r,text1_b,text2_a,text2_b,s]};diff_match_patch.prototype.diff_cleanupSemantic=function(a){var b=false;var c=[];var d=0;var e=null;var f=0;var g=0;var h=0;while(f<a.length){if(a[f][0]==DIFF_EQUAL){c[d++]=f;g=h;h=0;e=a[f][1]}else{h+=a[f][1].length;if(e!==null&&(e.length<=g)&&(e.length<=h)){a.splice(c[d-1],0,[DIFF_DELETE,e]);a[c[d-1]+1][0]=DIFF_INSERT;d--;d--;f=d>0?c[d-1]:-1;g=0;h=0;e=null;b=true}}f++}if(b){this.diff_cleanupMerge(a)}this.diff_cleanupSemanticLossless(a)};diff_match_patch.prototype.diff_cleanupSemanticLossless=function(d){var e=/[^a-zA-Z0-9]/;var f=/\s/;var g=/[\r\n]/;var h=/\n\r?\n$/;var i=/^\r?\n\r?\n/;function diff_cleanupSemanticScore(a,b){if(!a||!b){return 5}var c=0;if(a.charAt(a.length-1).match(e)||b.charAt(0).match(e)){c++;if(a.charAt(a.length-1).match(f)||b.charAt(0).match(f)){c++;if(a.charAt(a.length-1).match(g)||b.charAt(0).match(g)){c++;if(a.match(h)||b.match(i)){c++}}}}return c}var j=1;while(j<d.length-1){if(d[j-1][0]==DIFF_EQUAL&&d[j+1][0]==DIFF_EQUAL){var k=d[j-1][1];var l=d[j][1];var m=d[j+1][1];var n=this.diff_commonSuffix(k,l);if(n){var o=l.substring(l.length-n);k=k.substring(0,k.length-n);l=o+l.substring(0,l.length-n);m=o+m}var p=k;var q=l;var r=m;var s=diff_cleanupSemanticScore(k,l)+diff_cleanupSemanticScore(l,m);while(l.charAt(0)===m.charAt(0)){k+=l.charAt(0);l=l.substring(1)+m.charAt(0);m=m.substring(1);var t=diff_cleanupSemanticScore(k,l)+diff_cleanupSemanticScore(l,m);if(t>=s){s=t;p=k;q=l;r=m}}if(d[j-1][1]!=p){if(p){d[j-1][1]=p}else{d.splice(j-1,1);j--}d[j][1]=q;if(r){d[j+1][1]=r}else{d.splice(j+1,1);j--}}}j++}};diff_match_patch.prototype.diff_cleanupEfficiency=function(a){var b=false;var c=[];var d=0;var e='';var f=0;var g=false;var h=false;var i=false;var j=false;while(f<a.length){if(a[f][0]==DIFF_EQUAL){if(a[f][1].length<this.Diff_EditCost&&(i||j)){c[d++]=f;g=i;h=j;e=a[f][1]}else{d=0;e=''}i=j=false}else{if(a[f][0]==DIFF_DELETE){j=true}else{i=true}if(e&&((g&&h&&i&&j)||((e.length<this.Diff_EditCost/2)&&(g+h+i+j)==3))){a.splice(c[d-1],0,[DIFF_DELETE,e]);a[c[d-1]+1][0]=DIFF_INSERT;d--;e='';if(g&&h){i=j=true;d=0}else{d--;f=d>0?c[d-1]:-1;i=j=false}b=true}}f++}if(b){this.diff_cleanupMerge(a)}};diff_match_patch.prototype.diff_cleanupMerge=function(a){a.push([DIFF_EQUAL,'']);var b=0;var c=0;var d=0;var e='';var f='';var g;while(b<a.length){switch(a[b][0]){case DIFF_INSERT:d++;f+=a[b][1];b++;break;case DIFF_DELETE:c++;e+=a[b][1];b++;break;case DIFF_EQUAL:if(c!==0||d!==0){if(c!==0&&d!==0){g=this.diff_commonPrefix(f,e);if(g!==0){if((b-c-d)>0&&a[b-c-d-1][0]==DIFF_EQUAL){a[b-c-d-1][1]+=f.substring(0,g)}else{a.splice(0,0,[DIFF_EQUAL,f.substring(0,g)]);b++}f=f.substring(g);e=e.substring(g)}g=this.diff_commonSuffix(f,e);if(g!==0){a[b][1]=f.substring(f.length-g)+a[b][1];f=f.substring(0,f.length-g);e=e.substring(0,e.length-g)}}if(c===0){a.splice(b-c-d,c+d,[DIFF_INSERT,f])}else if(d===0){a.splice(b-c-d,c+d,[DIFF_DELETE,e])}else{a.splice(b-c-d,c+d,[DIFF_DELETE,e],[DIFF_INSERT,f])}b=b-c-d+(c?1:0)+(d?1:0)+1}else if(b!==0&&a[b-1][0]==DIFF_EQUAL){a[b-1][1]+=a[b][1];a.splice(b,1)}else{b++}d=0;c=0;e='';f='';break}}if(a[a.length-1][1]===''){a.pop()}var h=false;b=1;while(b<a.length-1){if(a[b-1][0]==DIFF_EQUAL&&a[b+1][0]==DIFF_EQUAL){if(a[b][1].substring(a[b][1].length-a[b-1][1].length)==a[b-1][1]){a[b][1]=a[b-1][1]+a[b][1].substring(0,a[b][1].length-a[b-1][1].length);a[b+1][1]=a[b-1][1]+a[b+1][1];a.splice(b-1,1);h=true}else if(a[b][1].substring(0,a[b+1][1].length)==a[b+1][1]){a[b-1][1]+=a[b+1][1];a[b][1]=a[b][1].substring(a[b+1][1].length)+a[b+1][1];a.splice(b+1,1);h=true}}b++}if(h){this.diff_cleanupMerge(a)}};diff_match_patch.prototype.diff_xIndex=function(a,b){var c=0;var d=0;var e=0;var f=0;var x;for(x=0;x<a.length;x++){if(a[x][0]!==DIFF_INSERT){c+=a[x][1].length}if(a[x][0]!==DIFF_DELETE){d+=a[x][1].length}if(c>b){break}e=c;f=d}if(a.length!=x&&a[x][0]===DIFF_DELETE){return f}return f+(b-e)};diff_match_patch.prototype.diff_prettyHtml=function(a){var b=[];var i=0;for(var x=0;x<a.length;x++){var c=a[x][0];var d=a[x][1];var e=d.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'&para;<BR>');switch(c){case DIFF_INSERT:b[x]='<INS STYLE="background:#E6FFE6;" TITLE="i='+i+'">'+e+'</INS>';break;case DIFF_DELETE:b[x]='<DEL STYLE="background:#FFE6E6;" TITLE="i='+i+'">'+e+'</DEL>';break;case DIFF_EQUAL:b[x]='<SPAN TITLE="i='+i+'">'+e+'</SPAN>';break}if(c!==DIFF_DELETE){i+=d.length}}return b.join('')};diff_match_patch.prototype.diff_text1=function(a){var b=[];for(var x=0;x<a.length;x++){if(a[x][0]!==DIFF_INSERT){b[x]=a[x][1]}}return b.join('')};diff_match_patch.prototype.diff_text2=function(a){var b=[];for(var x=0;x<a.length;x++){if(a[x][0]!==DIFF_DELETE){b[x]=a[x][1]}}return b.join('')};diff_match_patch.prototype.diff_toDelta=function(a){var b=[];for(var x=0;x<a.length;x++){switch(a[x][0]){case DIFF_INSERT:b[x]='+'+encodeURI(a[x][1]);break;case DIFF_DELETE:b[x]='-'+a[x][1].length;break;case DIFF_EQUAL:b[x]='='+a[x][1].length;break}}return b.join('\t').replace(/\0/g,'%00').replace(/%20/g,' ')};diff_match_patch.prototype.diff_fromDelta=function(a,b){var c=[];var d=0;var e=0;b=b.replace(/%00/g,'\0');var f=b.split(/\t/g);for(var x=0;x<f.length;x++){var g=f[x].substring(1);switch(f[x].charAt(0)){case'+':try{c[d++]=[DIFF_INSERT,decodeURI(g)]}catch(ex){throw new Error('Illegal escape in diff_fromDelta: '+g);}break;case'-':case'=':var n=parseInt(g,10);if(isNaN(n)||n<0){throw new Error('Invalid number in diff_fromDelta: '+g);}var h=a.substring(e,e+=n);if(f[x].charAt(0)=='='){c[d++]=[DIFF_EQUAL,h]}else{c[d++]=[DIFF_DELETE,h]}break;default:if(f[x]){throw new Error('Invalid diff operation in diff_fromDelta: '+f[x]);}}}if(e!=a.length){throw new Error('Delta length ('+e+') does not equal source text length ('+a.length+').');}return c};diff_match_patch.prototype.match_main=function(a,b,c){c=Math.max(0,Math.min(c,a.length-b.length));if(a==b){return 0}else if(a.length===0){return null}else if(a.substring(c,c+b.length)==b){return c}else{return this.match_bitap(a,b,c)}};diff_match_patch.prototype.match_bitap=function(a,b,c){if(b.length>this.Match_MaxBits){throw new Error('Pattern too long for this browser.');}var s=this.match_alphabet(b);var f=a.length;f=Math.max(f,this.Match_MinLength);f=Math.min(f,this.Match_MaxLength);var g=this;function match_bitapScore(e,x){var d=Math.abs(c-x);return(e/b.length/g.Match_Balance)+(d/f/(1.0-g.Match_Balance))}var h=this.Match_Threshold;var i=a.indexOf(b,c);if(i!=-1){h=Math.min(match_bitapScore(0,i),h)}i=a.lastIndexOf(b,c+b.length);if(i!=-1){h=Math.min(match_bitapScore(0,i),h)}var k=1<<(b.length-1);i=null;var l,bin_mid;var m=Math.max(c+c,a.length);var n;for(var d=0;d<b.length;d++){var o=Array(a.length);l=c;bin_mid=m;while(l<bin_mid){if(match_bitapScore(d,bin_mid)<h){l=bin_mid}else{m=bin_mid}bin_mid=Math.floor((m-l)/2+l)}m=bin_mid;var p=Math.max(0,c-(bin_mid-c)-1);var q=Math.min(a.length-1,b.length+bin_mid);if(a.charAt(q)==b.charAt(b.length-1)){o[q]=(1<<(d+1))-1}else{o[q]=(1<<d)-1}for(var j=q-1;j>=p;j--){if(d===0){o[j]=((o[j+1]<<1)|1)&s[a.charAt(j)]}else{o[j]=((o[j+1]<<1)|1)&s[a.charAt(j)]|((n[j+1]<<1)|1)|((n[j]<<1)|1)|n[j+1]}if(o[j]&k){var r=match_bitapScore(d,j);if(r<=h){h=r;i=j;if(j>c){p=Math.max(0,c-(j-c))}else{break}}}}if(match_bitapScore(d+1,c)>h){break}n=o}return i};diff_match_patch.prototype.match_alphabet=function(a){var s={};for(var i=0;i<a.length;i++){s[a.charAt(i)]=0}for(var i=0;i<a.length;i++){s[a.charAt(i)]|=1<<(a.length-i-1)}return s};diff_match_patch.prototype.patch_addContext=function(a,b){var c=b.substring(a.start2,a.start2+a.length1);var d=0;while(b.indexOf(c)!=b.lastIndexOf(c)&&c.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin){d+=this.Patch_Margin;c=b.substring(a.start2-d,a.start2+a.length1+d)}d+=this.Patch_Margin;var e=b.substring(a.start2-d,a.start2);if(e!==''){a.diffs.unshift([DIFF_EQUAL,e])}var f=b.substring(a.start2+a.length1,a.start2+a.length1+d);if(f!==''){a.diffs.push([DIFF_EQUAL,f])}a.start1-=e.length;a.start2-=e.length;a.length1+=e.length+f.length;a.length2+=e.length+f.length};diff_match_patch.prototype.patch_make=function(a,b,c){var d,text2,diffs;if(typeof b=='undefined'){diffs=a;d=this.diff_text1(diffs);text2=''}else{d=a;text2=b;if(typeof c!='undefined'){diffs=c}else{diffs=this.diff_main(d,text2,true);if(diffs.length>2){this.diff_cleanupSemantic(diffs);this.diff_cleanupEfficiency(diffs)}}}if(diffs.length===0){return[]}var e=[];var f=new patch_obj();var g=0;var h=0;var i=0;var j=d;var k=d;for(var x=0;x<diffs.length;x++){var l=diffs[x][0];var m=diffs[x][1];if(!g&&l!==DIFF_EQUAL){f.start1=h;f.start2=i}switch(l){case DIFF_INSERT:f.diffs[g++]=diffs[x];f.length2+=m.length;k=k.substring(0,i)+m+k.substring(i);break;case DIFF_DELETE:f.length1+=m.length;f.diffs[g++]=diffs[x];k=k.substring(0,i)+k.substring(i+m.length);break;case DIFF_EQUAL:if(m.length<=2*this.Patch_Margin&&g&&diffs.length!=x+1){f.diffs[g++]=diffs[x];f.length1+=m.length;f.length2+=m.length}else if(m.length>=2*this.Patch_Margin){if(g){this.patch_addContext(f,j);e.push(f);f=new patch_obj();g=0;j=k}}break}if(l!==DIFF_INSERT){h+=m.length}if(l!==DIFF_DELETE){i+=m.length}}if(g){this.patch_addContext(f,j);e.push(f)}return e};diff_match_patch.prototype.patch_apply=function(a,b){if(a.length==0){return[b,[]]}var c=[];for(var x=0;x<a.length;x++){var d=a[x];var e=new patch_obj();e.diffs=d.diffs.slice();e.start1=d.start1;e.start2=d.start2;e.length1=d.length1;e.length2=d.length2;c[x]=e}a=c;var f=this.patch_addPadding(a);b=f+b+f;this.patch_splitMax(a);var g=0;var h=[];for(var x=0;x<a.length;x++){var i=a[x].start2+g;var j=this.diff_text1(a[x].diffs);var k=this.match_main(b,j,i);if(k===null){h[x]=false}else{h[x]=true;g=k-i;var l=b.substring(k,k+j.length);if(j==l){b=b.substring(0,k)+this.diff_text2(a[x].diffs)+b.substring(k+j.length)}else{var m=this.diff_main(j,l,false);this.diff_cleanupSemanticLossless(m);var n=0;var o;for(var y=0;y<a[x].diffs.length;y++){var p=a[x].diffs[y];if(p[0]!==DIFF_EQUAL){o=this.diff_xIndex(m,n)}if(p[0]===DIFF_INSERT){b=b.substring(0,k+o)+p[1]+b.substring(k+o)}else if(p[0]===DIFF_DELETE){b=b.substring(0,k+o)+b.substring(k+this.diff_xIndex(m,n+p[1].length))}if(p[0]!==DIFF_DELETE){n+=p[1].length}}}}}b=b.substring(f.length,b.length-f.length);return[b,h]};diff_match_patch.prototype.patch_addPadding=function(a){var b='';for(var x=0;x<this.Patch_Margin;x++){b+=String.fromCharCode(x)}for(var x=0;x<a.length;x++){a[x].start1+=b.length;a[x].start2+=b.length}var c=a[0];var d=c.diffs;if(d.length==0||d[0][0]!=DIFF_EQUAL){d.unshift([DIFF_EQUAL,b]);c.start1-=b.length;c.start2-=b.length;c.length1+=b.length;c.length2+=b.length}else if(b.length>d[0][1].length){var e=b.length-d[0][1].length;d[0][1]=b.substring(d[0][1].length)+d[0][1];c.start1-=e;c.start2-=e;c.length1+=e;c.length2+=e}c=a[a.length-1];d=c.diffs;if(d.length==0||d[d.length-1][0]!=DIFF_EQUAL){d.push([DIFF_EQUAL,b]);c.length1+=b.length;c.length2+=b.length}else if(b.length>d[d.length-1][1].length){var e=b.length-d[d.length-1][1].length;d[d.length-1][1]+=b.substring(0,e);c.length1+=e;c.length2+=e}return b};diff_match_patch.prototype.patch_splitMax=function(a){for(var x=0;x<a.length;x++){if(a[x].length1>this.Match_MaxBits){var b=a[x];a.splice(x,1);var c=this.Match_MaxBits;var d=b.start1;var e=b.start2;var f='';while(b.diffs.length!==0){var g=new patch_obj();var h=true;g.start1=d-f.length;g.start2=e-f.length;if(f!==''){g.length1=g.length2=f.length;g.diffs.push([DIFF_EQUAL,f])}while(b.diffs.length!==0&&g.length1<c-this.Patch_Margin){var i=b.diffs[0][0];var j=b.diffs[0][1];if(i===DIFF_INSERT){g.length2+=j.length;e+=j.length;g.diffs.push(b.diffs.shift());h=false}else{j=j.substring(0,c-g.length1-this.Patch_Margin);g.length1+=j.length;d+=j.length;if(i===DIFF_EQUAL){g.length2+=j.length;e+=j.length}else{h=false}g.diffs.push([i,j]);if(j==b.diffs[0][1]){b.diffs.shift()}else{b.diffs[0][1]=b.diffs[0][1].substring(j.length)}}}f=this.diff_text2(g.diffs);f=f.substring(f.length-this.Patch_Margin);var k=this.diff_text1(b.diffs).substring(0,this.Patch_Margin);if(k!==''){g.length1+=k.length;g.length2+=k.length;if(g.diffs.length!==0&&g.diffs[g.diffs.length-1][0]===DIFF_EQUAL){g.diffs[g.diffs.length-1][1]+=k}else{g.diffs.push([DIFF_EQUAL,k])}}if(!h){a.splice(x++,0,g)}}}}};diff_match_patch.prototype.patch_toText=function(a){var b=[];for(var x=0;x<a.length;x++){b[x]=a[x]}return b.join('')};diff_match_patch.prototype.patch_fromText=function(a){var b=[];if(!a){return b}a=a.replace(/%00/g,'\0');var c=a.split('\n');var d=0;while(d<c.length){var m=c[d].match(/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/);if(!m){throw new Error('Invalid patch string: '+c[d]);}var e=new patch_obj();b.push(e);e.start1=parseInt(m[1],10);if(m[2]===''){e.start1--;e.length1=1}else if(m[2]=='0'){e.length1=0}else{e.start1--;e.length1=parseInt(m[2],10)}e.start2=parseInt(m[3],10);if(m[4]===''){e.start2--;e.length2=1}else if(m[4]=='0'){e.length2=0}else{e.start2--;e.length2=parseInt(m[4],10)}d++;while(d<c.length){var f=c[d].charAt(0);try{var g=decodeURI(c[d].substring(1))}catch(ex){throw new Error('Illegal escape in patch_fromText: '+g);}if(f=='-'){e.diffs.push([DIFF_DELETE,g])}else if(f=='+'){e.diffs.push([DIFF_INSERT,g])}else if(f==' '){e.diffs.push([DIFF_EQUAL,g])}else if(f=='@'){break}else if(f===''){}else{throw new Error('Invalid patch mode "'+f+'" in: '+g);}d++}}return b};function patch_obj(){this.diffs=[];this.start1=null;this.start2=null;this.length1=0;this.length2=0}patch_obj.prototype.toString=function(){var a,coords2;if(this.length1===0){a=this.start1+',0'}else if(this.length1==1){a=this.start1+1}else{a=(this.start1+1)+','+this.length1}if(this.length2===0){coords2=this.start2+',0'}else if(this.length2==1){coords2=this.start2+1}else{coords2=(this.start2+1)+','+this.length2}var b=['@@ -'+a+' +'+coords2+' @@\n'];var c;for(var x=0;x<this.diffs.length;x++){switch(this.diffs[x][0]){case DIFF_INSERT:c='+';break;case DIFF_DELETE:c='-';break;case DIFF_EQUAL:c=' ';break}b[x+1]=c+encodeURI(this.diffs[x][1])+'\n'}return b.join('').replace(/\0/g,'%00').replace(/%20/g,' ')};;

 function EAL(){this.version="0.7.1.3";date=new Date();this.start_time=date.getTime();this.win="loading";this.error=false;this.baseURL="";this.template="";this.lang=new Object();this.load_syntax=new Object();this.syntax=new Object();this.loadedFiles=new Array();this.waiting_loading=new Object();this.scripts_to_load=new Array();this.sub_scripts_to_load=new Array();this.resize=new Array();this.hidden=new Object();this.default_settings={debug:false ,smooth_selection:true ,font_size:"10" ,font_family:"monospace" ,start_highlight:false ,toolbar:"search,go_to_line,fullscreen,|,undo,redo,|,select_font,|,change_smooth_selection,highlight,reset_highlight,|,help" ,begin_toolbar:"" ,end_toolbar:"" ,is_multi_files:false ,allow_resize:"both" ,min_width:400 ,min_height:125 ,replace_tab_by_spaces:false ,allow_toggle:true ,language:"en" ,syntax:"" ,syntax_selection_allow:"basic,brainfuck,c,cpp,css,html,js,pas,php,python,ruby,robotstxt,sql,tsql,vb,xml" ,display:"onload" ,max_undo:30 ,browsers:"known" ,plugins:"" ,gecko_spellcheck:false ,fullscreen:false ,is_editable:true ,wrap_text:false ,load_callback:"" ,save_callback:"" ,change_callback:"" ,submit_callback:"" ,EA_init_callback:"" ,EA_delete_callback:"" ,EA_load_callback:"" ,EA_unload_callback:"" ,EA_toggle_on_callback:"" ,EA_toggle_off_callback:"" ,EA_file_switch_on_callback:"" ,EA_file_switch_off_callback:"" ,EA_file_close_callback:"" };this.advanced_buttons=[ ['new_document','newdocument.gif','new_document',false],['search','search.gif','show_search',false],['go_to_line','go_to_line.gif','go_to_line',false],['undo','undo.gif','undo',true],['redo','redo.gif','redo',true],['change_smooth_selection','smooth_selection.gif','change_smooth_selection_mode',true],['reset_highlight','reset_highlight.gif','resync_highlight',true],['highlight','highlight.gif','change_highlight',true],['help','help.gif','show_help',false],['save','save.gif','save',false],['load','load.gif','load',false],['fullscreen','fullscreen.gif','toggle_full_screen',false] ];ua=navigator.userAgent;this.nav=new Object();this.nav['isMacOS']=(ua.indexOf('Mac OS')!=-1);this.nav['isIE']=(navigator.appName=="Microsoft Internet Explorer");if(this.nav['isIE']){this.nav['isIE']=ua.replace(/^.*?MSIE ([0-9\.]*).*$/,"$1");if(this.nav['isIE']<6)this.has_error();}if(this.nav['isNS']=ua.indexOf('Netscape/')!=-1){this.nav['isNS']=ua.substr(ua.indexOf('Netscape/')+9);if(this.nav['isNS']<8||!this.nav['isIE'])this.has_error();}if(this.nav['isOpera']=(ua.indexOf('Opera')!=-1)){this.nav['isOpera']=ua.replace(/^.*?Opera.*?([0-9\.]+).*$/i,"$1");if(this.nav['isOpera']<9)this.has_error();this.nav['isIE']=false;}this.nav['isGecko']=(ua.indexOf('Gecko')!=-1);if(this.nav['isFirefox'] =(ua.indexOf('Firefox')!=-1))this.nav['isFirefox']=ua.replace(/^.*?Firefox.*?([0-9\.]+).*$/i,"$1");if(this.nav['isIceweasel'] =(ua.indexOf('Iceweasel')!=-1))this.nav['isFirefox']=this.nav['isIceweasel']=ua.replace(/^.*?Iceweasel.*?([0-9\.]+).*$/i,"$1");if(this.nav['isCamino'] =(ua.indexOf('Camino')!=-1))this.nav['isCamino']=ua.replace(/^.*?Camino.*?([0-9\.]+).*$/i,"$1");if(this.nav['isSafari'] =(ua.indexOf('Safari')!=-1))this.nav['isSafari']=ua.replace(/^.*?Version\/([0-9]+\.[0-9]+).*$/i,"$1");if(this.nav['isIE']>=6||this.nav['isOpera']>=9||this.nav['isFirefox']||this.nav['isCamino']||this.nav['isSafari']>=3)this.nav['isValidBrowser']=true;
else this.nav['isValidBrowser']=false;this.set_base_url();for(var i=0;i<this.scripts_to_load.length;i++){setTimeout("eAL.load_script('"+this.baseURL+this.scripts_to_load[i]+".js');",1);this.waiting_loading[this.scripts_to_load[i]+".js"]=false;}this.add_event(window,"load",EAL.prototype.window_loaded);};EAL.prototype ={has_error:function(){this.error=true;for(var i in EAL.prototype){EAL.prototype[i]=function(){};}},window_loaded:function(){eAL.win="loaded";if (document.forms){for (var i=0;i<document.forms.length;i++){var form=document.forms[i];form.edit_area_replaced_submit=null;try{form.edit_area_replaced_submit=form.onsubmit;form.onsubmit="";}catch (e){}eAL.add_event(form,"submit",EAL.prototype.submit);eAL.add_event(form,"reset",EAL.prototype.reset);}}eAL.add_event(window,"unload",function(){for(var i in eAs){eAL.delete_instance(i);}});},init_ie_textarea:function(id){textarea=document.getElementById(id);try{if(textarea&&typeof(textarea.focused)=="undefined"){textarea.focus();textarea.focused=true;textarea.selectionStart=textarea.selectionEnd=0;get_IE_selection(textarea);eAL.add_event(textarea,"focus",IE_textarea_focus);eAL.add_event(textarea,"blur",IE_textarea_blur);}}catch(ex){}},init:function(settings){if(!settings["id"])this.has_error();if(this.error)return;if(eAs[settings["id"]])eAL.delete_instance(settings["id"]);for(var i in this.default_settings){if(typeof(settings[i])=="undefined")settings[i]=this.default_settings[i];}if(settings["browsers"]=="known"&&this.nav['isValidBrowser']==false){return;}if(settings["begin_toolbar"].length>0)settings["toolbar"]=settings["begin_toolbar"] +","+settings["toolbar"];if(settings["end_toolbar"].length>0)settings["toolbar"]=settings["toolbar"] +","+settings["end_toolbar"];settings["tab_toolbar"]=settings["toolbar"].replace(/ /g,"").split(",");settings["plugins"]=settings["plugins"].replace(/ /g,"").split(",");for(var i=0;i<settings["plugins"].length;i++){if(settings["plugins"][i].length==0)settings["plugins"].splice(i,1);}this.get_template();this.load_script(this.baseURL+"langs/"+settings["language"]+".js");if(settings["syntax"].length>0){settings["syntax"]=settings["syntax"].toLowerCase();this.load_script(this.baseURL+"reg_syntax/"+settings["syntax"]+".js");}eAs[settings["id"]]={"settings":settings};eAs[settings["id"]]["displayed"]=false;eAs[settings["id"]]["hidden"]=false;eAL.start(settings["id"]);},delete_instance:function(id){eAL.execCommand(id,"EA_delete");if(window.frames["frame_"+id]&&window.frames["frame_"+id].editArea){if(eAs[id]["displayed"])eAL.toggle(id,"off");window.frames["frame_"+id].editArea.execCommand("EA_unload");}var span=document.getElementById("EditAreaArroundInfos_"+id);if(span)span.parentNode.removeChild(span);var iframe=document.getElementById("frame_"+id);if(iframe){iframe.parentNode.removeChild(iframe);try{delete window.frames["frame_"+id];}catch (e){}}delete eAs[id];},start:function(id){if(this.win!="loaded"){setTimeout("eAL.start('"+id+"');",50);return;}for(var i in eAL.waiting_loading){if(eAL.waiting_loading[i]!="loaded"&&typeof(eAL.waiting_loading[i])!="function"){setTimeout("eAL.start('"+id+"');",50);return;}}if(!eAL.lang[eAs[id]["settings"]["language"]]||(eAs[id]["settings"]["syntax"].length>0&&!eAL.load_syntax[eAs[id]["settings"]["syntax"]])){setTimeout("eAL.start('"+id+"');",50);return;}if(eAs[id]["settings"]["syntax"].length>0)eAL.init_syntax_regexp();if(!document.getElementById("EditAreaArroundInfos_"+id)&&(eAs[id]["settings"]["debug"]||eAs[id]["settings"]["allow_toggle"])){var span=document.createElement("span");span.id="EditAreaArroundInfos_"+id;var html="";if(eAs[id]["settings"]["allow_toggle"]){checked=(eAs[id]["settings"]["display"]=="onload")?"checked":"";html+="<div id='edit_area_toggle_"+i+"'>";html+="<input id='edit_area_toggle_checkbox_"+id +"' class='toggle_"+id +"' type='checkbox' onclick='eAL.toggle(\""+id +"\");' accesskey='e' "+checked+" />";html+="<label for='edit_area_toggle_checkbox_"+id +"'>{$toggle}</label></div>";}if(eAs[id]["settings"]["debug"])html+="<textarea id='edit_area_debug_"+id +"' style='z-index:20;width:100%;height:120px;overflow:auto;border:solid black 1px;'></textarea><br />";html=eAL.translate(html,eAs[id]["settings"]["language"]);span.innerHTML=html;var father=document.getElementById(id).parentNode;var next=document.getElementById(id).nextSibling;if(next==null)father.appendChild(span);
else father.insertBefore(span,next);}if(!eAs[id]["initialized"]){this.execCommand(id,"EA_init");if(eAs[id]["settings"]["display"]=="later"){eAs[id]["initialized"]=true;return;}}if(this.nav['isIE']){eAL.init_ie_textarea(id);}var html_toolbar_content="";area=eAs[id];for(var i=0;i<area["settings"]["tab_toolbar"].length;i++){html_toolbar_content+=this.get_control_html(area["settings"]["tab_toolbar"][i],area["settings"]["language"]);}if(!this.iframe_script){this.iframe_script="";for(var i=0;i<this.sub_scripts_to_load.length;i++)this.iframe_script+='<script language="javascript" type="text/javascript" src="'+this.baseURL+this.sub_scripts_to_load[i] +'.js"></script>';}for(var i=0;i<area["settings"]["plugins"].length;i++){if(!eAL.all_plugins_loaded)this.iframe_script+='<script language="javascript" type="text/javascript" src="'+this.baseURL+'plugins/'+area["settings"]["plugins"][i]+'/'+area["settings"]["plugins"][i] +'.js"></script>';this.iframe_script+='<script language="javascript" type="text/javascript" src="'+this.baseURL+'plugins/'+area["settings"]["plugins"][i]+'/langs/'+area["settings"]["language"] +'.js"></script>';}if(!this.iframe_css){this.iframe_css="<link href='"+this.baseURL +"edit_area.css' rel='stylesheet' type='text/css' />";}var template=this.template.replace(/\[__BASEURL__\]/g,this.baseURL);template=template.replace("[__TOOLBAR__]",html_toolbar_content);template=this.translate(template,area["settings"]["language"],"template");template=template.replace("[__CSSRULES__]",this.iframe_css);template=template.replace("[__JSCODE__]",this.iframe_script);template=template.replace("[__EA_VERSION__]",this.version);area.textarea=document.getElementById(area["settings"]["id"]);eAs[area["settings"]["id"]]["textarea"]=area.textarea;if(typeof(window.frames["frame_"+area["settings"]["id"]])!='undefined')delete window.frames["frame_"+area["settings"]["id"]];var father=area.textarea.parentNode;var content=document.createElement("iframe");content.name="frame_"+area["settings"]["id"];content.id="frame_"+area["settings"]["id"];content.style.borderWidth="0px";setAttribute(content,"frameBorder","0");content.style.overflow="hidden";content.style.display="none";var next=area.textarea.nextSibling;if(next==null)father.appendChild(content);
else father.insertBefore(content,next);var frame=window.frames["frame_"+area["settings"]["id"]];frame.document.open();frame.eAs=eAs;frame.area_id=area["settings"]["id"];frame.document.area_id=area["settings"]["id"];frame.document.write(template);frame.document.close();},toggle:function(id,toggle_to){if(!toggle_to)toggle_to=(eAs[id]["displayed"]==true)?"off":"on";if(eAs[id]["displayed"]==true &&toggle_to=="off"){this.toggle_off(id);}
else if(eAs[id]["displayed"]==false &&toggle_to=="on"){this.toggle_on(id);}return false;},toggle_off:function(id){if(window.frames["frame_"+id]){var frame=window.frames["frame_"+id];if(frame.editArea.fullscreen['isFull'])frame.editArea.toggle_full_screen(false);eAs[id]["displayed"]=false;eAs[id]["textarea"].wrap="off";setAttribute(eAs[id]["textarea"],"wrap","off");var parNod=eAs[id]["textarea"].parentNode;var nxtSib=eAs[id]["textarea"].nextSibling;parNod.removeChild(eAs[id]["textarea"]);parNod.insertBefore(eAs[id]["textarea"],nxtSib);eAs[id]["textarea"].value=frame.editArea.textarea.value;var selStart=frame.editArea.last_selection["selectionStart"];var selEnd=frame.editArea.last_selection["selectionEnd"];var scrollTop=frame.document.getElementById("result").scrollTop;var scrollLeft=frame.document.getElementById("result").scrollLeft;document.getElementById("frame_"+id).style.display='none';eAs[id]["textarea"].style.display="inline";eAs[id]["textarea"].focus();if(this.nav['isIE']){eAs[id]["textarea"].selectionStart=selStart;eAs[id]["textarea"].selectionEnd=selEnd;eAs[id]["textarea"].focused=true;set_IE_selection(eAs[id]["textarea"]);}
else{if(this.nav['isOpera']){eAs[id]["textarea"].setSelectionRange(0,0);}try{eAs[id]["textarea"].setSelectionRange(selStart,selEnd);}catch(e){};}eAs[id]["textarea"].scrollTop=scrollTop;eAs[id]["textarea"].scrollLeft=scrollLeft;frame.editArea.execCommand("toggle_off");}},toggle_on:function(id){if(window.frames["frame_"+id]){var frame=window.frames["frame_"+id];area=window.frames["frame_"+id].editArea;area.textarea.value=eAs[id]["textarea"].value;var selStart=0;var selEnd=0;var scrollTop=0;var scrollLeft=0;if(eAs[id]["textarea"].use_last==true){var selStart=eAs[id]["textarea"].last_selectionStart;var selEnd=eAs[id]["textarea"].last_selectionEnd;var scrollTop=eAs[id]["textarea"].last_scrollTop;var scrollLeft=eAs[id]["textarea"].last_scrollLeft;eAs[id]["textarea"].use_last=false;}
else{try{var selStart=eAs[id]["textarea"].selectionStart;var selEnd=eAs[id]["textarea"].selectionEnd;var scrollTop=eAs[id]["textarea"].scrollTop;var scrollLeft=eAs[id]["textarea"].scrollLeft;}catch(ex){}}this.set_editarea_size_from_textarea(id,document.getElementById("frame_"+id));eAs[id]["textarea"].style.display="none";document.getElementById("frame_"+id).style.display="inline";area.execCommand("focus");eAs[id]["displayed"]=true;area.execCommand("update_size");window.frames["frame_"+id].document.getElementById("result").scrollTop=scrollTop;window.frames["frame_"+id].document.getElementById("result").scrollLeft=scrollLeft;area.area_select(selStart,selEnd-selStart);area.execCommand("toggle_on");}
else{var elem=document.getElementById(id);elem.last_selectionStart=elem.selectionStart;elem.last_selectionEnd=elem.selectionEnd;elem.last_scrollTop=elem.scrollTop;elem.last_scrollLeft=elem.scrollLeft;elem.use_last=true;eAL.start(id);}},set_editarea_size_from_textarea:function(id,frame){var elem=document.getElementById(id);var width=Math.max(eAs[id]["settings"]["min_width"],elem.offsetWidth)+"px";var height=Math.max(eAs[id]["settings"]["min_height"],elem.offsetHeight)+"px";if(elem.style.width.indexOf("%")!=-1)width=elem.style.width;if(elem.style.height.indexOf("%")!=-1)height=elem.style.height;frame.style.width=width;frame.style.height=height;},set_base_url:function(){if (!this.baseURL){this.baseURL = "http://localhost:4567/edit_area/"}var documentBasePath=document.location.href;if (documentBasePath.indexOf('?')!=-1)documentBasePath=documentBasePath.substring(0,documentBasePath.indexOf('?'));var documentURL=documentBasePath;documentBasePath=documentBasePath.substring(0,documentBasePath.lastIndexOf('/'));if (this.baseURL.indexOf('://')==-1&&this.baseURL.charAt(0)!='/'){this.baseURL=documentBasePath+"/"+this.baseURL;}this.baseURL+="/";},get_button_html:function(id,img,exec,isFileSpecific,baseURL){if(!baseURL)baseURL=this.baseURL;var cmd='editArea.execCommand(\''+exec+'\')';html='<a id="a_'+id +'" href="javascript:'+cmd+'" onclick="'+cmd+';return false;" onmousedown="return false;" target="_self" fileSpecific="'+(isFileSpecific?'yes':'no')+'">';html+='<img id="'+id+'" src="'+baseURL +'images/'+img+'" title="{$'+id+'}" width="20" height="20" class="editAreaButtonNormal" onmouseover="editArea.switchClass(this,\'editAreaButtonOver\');" onmouseout="editArea.restoreClass(this);" onmousedown="editArea.restoreAndSwitchClass(this,\'editAreaButtonDown\');" /></a>';return html;},get_control_html:function(button_name,lang){for (var i=0;i<this.advanced_buttons.length;i++){var but=this.advanced_buttons[i];if (but[0]==button_name){return this.get_button_html(but[0],but[1],but[2],but[3]);}}switch (button_name){case "*":case "return":return "<br />";case "|":case "separator":return '<img src="'+this.baseURL +'images/spacer.gif" width="1" height="15" class="editAreaSeparatorLine">';case "select_font":html="<select id='area_font_size' onchange='javascript:editArea.execCommand(\"change_font_size\")' fileSpecific='yes'>" +"<option value='-1'>{$font_size}</option>" +"<option value='8'>8 pt</option>" +"<option value='9'>9 pt</option>" +"<option value='10'>10 pt</option>" +"<option value='11'>11 pt</option>" +"<option value='12'>12 pt</option>" +"<option value='14'>14 pt</option>" +"</select>";return html;case "syntax_selection":var html="<select id='syntax_selection' onchange='javascript:editArea.execCommand(\"change_syntax\",this.value)' fileSpecific='yes'>";html+="<option value='-1'>{$syntax_selection}</option>";html+="</select>";return html;}return "<span id='tmp_tool_"+button_name+"'>["+button_name+"]</span>";},get_template:function(){if(this.template==""){var xhr_object=null;if(window.XMLHttpRequest)xhr_object=new XMLHttpRequest();
else if(window.ActiveXObject)xhr_object=new ActiveXObject("Microsoft.XMLHTTP");
else{alert("XMLHTTPRequest not supported. EditArea not loaded");return;}xhr_object.open("GET",this.baseURL+"template.html",false);xhr_object.send(null);if(xhr_object.readyState==4)this.template=xhr_object.responseText;
else this.has_error();}},translate:function(text,lang,mode){if(mode=="word")text=eAL.get_word_translation(text,lang);
else if(mode="template"){eAL.current_language=lang;text=text.replace(/\{\$([^\}]+)\}/gm,eAL.translate_template);}return text;},translate_template:function(){return eAL.get_word_translation(EAL.prototype.translate_template.arguments[1],eAL.current_language);},get_word_translation:function(val,lang){for(var i in eAL.lang[lang]){if(i==val)return eAL.lang[lang][i];}return "_"+val;},load_script:function(url){if (this.loadedFiles[url])return;try{var script=document.createElement("script");script.type="text/javascript";script.src=url;script.charset="UTF-8";var head=document.getElementsByTagName("head");head[0].appendChild(script);}catch(e){document.write('<sc'+'ript language="javascript" type="text/javascript" src="'+url+'" charset="UTF-8"></sc'+'ript>');}this.loadedFiles[url]=true;},add_event:function(obj,name,handler){if (obj.attachEvent){obj.attachEvent("on"+name,handler);}
else{obj.addEventListener(name,handler,false);}},remove_event:function(obj,name,handler){if (obj.detachEvent)obj.detachEvent("on"+name,handler);
else obj.removeEventListener(name,handler,false);},reset:function(e){var formObj=eAL.nav['isIE'] ? window.event.srcElement:e.target;if(formObj.tagName!='FORM')formObj=formObj.form;for(var i in eAs){var is_child=false;for (var x=0;x<formObj.elements.length;x++){if(formObj.elements[x].id==i)is_child=true;}if(window.frames["frame_"+i]&&is_child&&eAs[i]["displayed"]==true){var exec='window.frames["frame_'+i +'"].editArea.textarea.value=document.getElementById("'+i +'").value;';exec+='window.frames["frame_'+i +'"].editArea.execCommand("focus");';exec+='window.frames["frame_'+i +'"].editArea.check_line_selection();';exec+='window.frames["frame_'+i +'"].editArea.execCommand("reset");';window.setTimeout(exec,10);}}return;},submit:function(e){var formObj=eAL.nav['isIE'] ? window.event.srcElement:e.target;if(formObj.tagName!='FORM')formObj=formObj.form;for(var i in eAs){var is_child=false;for (var x=0;x<formObj.elements.length;x++){if(formObj.elements[x].id==i)is_child=true;}if(is_child){if(window.frames["frame_"+i]&&eAs[i]["displayed"]==true)document.getElementById(i).value=window.frames["frame_"+i].editArea.textarea.value;eAL.execCommand(i,"EA_submit");}}if(typeof(formObj.edit_area_replaced_submit)=="function"){res=formObj.edit_area_replaced_submit();if(res==false){if(eAL.nav['isIE'])return false;
else e.preventDefault();}}return;},getValue:function(id){if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){return window.frames["frame_"+id].editArea.textarea.value;}
else if(elem=document.getElementById(id)){return elem.value;}return false;},setValue:function(id,new_val){if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){window.frames["frame_"+id].editArea.textarea.value=new_val;window.frames["frame_"+id].editArea.execCommand("focus");window.frames["frame_"+id].editArea.check_line_selection(false);window.frames["frame_"+id].editArea.execCommand("onchange");}
else if(elem=document.getElementById(id)){elem.value=new_val;}},getSelectionRange:function(id){var sel={"start":0,"end":0};if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){var editArea=window.frames["frame_"+id].editArea;sel["start"]=editArea.textarea.selectionStart;sel["end"]=editArea.textarea.selectionEnd;}
else if(elem=document.getElementById(id)){sel=getSelectionRange(elem);}return sel;},setSelectionRange:function(id,new_start,new_end){if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){window.frames["frame_"+id].editArea.area_select(new_start,new_end-new_start);if(!this.nav['isIE']){window.frames["frame_"+id].editArea.check_line_selection(false);window.frames["frame_"+id].editArea.scroll_to_view();}}
else if(elem=document.getElementById(id)){setSelectionRange(elem,new_start,new_end);}},getSelectedText:function(id){var sel=this.getSelectionRange(id);return this.getValue(id).substring(sel["start"],sel["end"]);},setSelectedText:function(id,new_val){new_val=new_val.replace(/\r/g,"");var sel=this.getSelectionRange(id);var text=this.getValue(id);if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){var scrollTop=window.frames["frame_"+id].document.getElementById("result").scrollTop;var scrollLeft=window.frames["frame_"+id].document.getElementById("result").scrollLeft;}
else{var scrollTop=document.getElementById(id).scrollTop;var scrollLeft=document.getElementById(id).scrollLeft;}text=text.substring(0,sel["start"])+new_val +text.substring(sel["end"]);this.setValue(id,text);var new_sel_end=sel["start"]+new_val.length;this.setSelectionRange(id,sel["start"],new_sel_end);if(new_val !=this.getSelectedText(id).replace(/\r/g,"")){this.setSelectionRange(id,sel["start"],new_sel_end+new_val.split("\n").length -1);}if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){window.frames["frame_"+id].document.getElementById("result").scrollTop=scrollTop;window.frames["frame_"+id].document.getElementById("result").scrollLeft=scrollLeft;window.frames["frame_"+id].editArea.execCommand("onchange");}
else{document.getElementById(id).scrollTop=scrollTop;document.getElementById(id).scrollLeft=scrollLeft;}},insertTags:function(id,open_tag,close_tag){var old_sel=this.getSelectionRange(id);text=open_tag+this.getSelectedText(id)+close_tag;eAL.setSelectedText(id,text);var new_sel=this.getSelectionRange(id);if(old_sel["end"] > old_sel["start"])this.setSelectionRange(id,new_sel["end"],new_sel["end"]);
else this.setSelectionRange(id,old_sel["start"]+open_tag.length,old_sel["start"]+open_tag.length);},hide:function(id){if(document.getElementById(id)&&!this.hidden[id]){this.hidden[id]=new Object();this.hidden[id]["selectionRange"]=this.getSelectionRange(id);if(document.getElementById(id).style.display!="none"){this.hidden[id]["scrollTop"]=document.getElementById(id).scrollTop;this.hidden[id]["scrollLeft"]=document.getElementById(id).scrollLeft;}if(window.frames["frame_"+id]){this.hidden[id]["toggle"]=eAs[id]["displayed"];if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){var scrollTop=window.frames["frame_"+id].document.getElementById("result").scrollTop;var scrollLeft=window.frames["frame_"+id].document.getElementById("result").scrollLeft;}
else{var scrollTop=document.getElementById(id).scrollTop;var scrollLeft=document.getElementById(id).scrollLeft;}this.hidden[id]["scrollTop"]=scrollTop;this.hidden[id]["scrollLeft"]=scrollLeft;if(eAs[id]["displayed"]==true)eAL.toggle_off(id);}var span=document.getElementById("EditAreaArroundInfos_"+id);if(span){span.style.display='none';}document.getElementById(id).style.display="none";}},show:function(id){if((elem=document.getElementById(id))&&this.hidden[id]){elem.style.display="inline";elem.scrollTop=this.hidden[id]["scrollTop"];elem.scrollLeft=this.hidden[id]["scrollLeft"];var span=document.getElementById("EditAreaArroundInfos_"+id);if(span){span.style.display='inline';}if(window.frames["frame_"+id]){elem.style.display="inline";if(this.hidden[id]["toggle"]==true)eAL.toggle_on(id);scrollTop=this.hidden[id]["scrollTop"];scrollLeft=this.hidden[id]["scrollLeft"];if(window.frames["frame_"+id]&&eAs[id]["displayed"]==true){window.frames["frame_"+id].document.getElementById("result").scrollTop=scrollTop;window.frames["frame_"+id].document.getElementById("result").scrollLeft=scrollLeft;}
else{elem.scrollTop=scrollTop;elem.scrollLeft=scrollLeft;}}sel=this.hidden[id]["selectionRange"];this.setSelectionRange(id,sel["start"],sel["end"]);delete this.hidden[id];}},getCurrentFile:function(id){return this.execCommand(id,'get_file',this.execCommand(id,'curr_file'));},getFile:function(id,file_id){return this.execCommand(id,'get_file',file_id);},getAllFiles:function(id){return this.execCommand(id,'get_all_files()');},openFile:function(id,file_infos){return this.execCommand(id,'open_file',file_infos);},closeFile:function(id,file_id){return this.execCommand(id,'close_file',file_id);},setFileEditedMode:function(id,file_id,to){var reg1=new RegExp('\\\\','g');var reg2=new RegExp('"','g');return this.execCommand(id,'set_file_edited_mode("'+file_id.replace(reg1,'\\\\').replace(reg2,'\\"')+'",'+to +')');},execCommand:function(id,cmd,fct_param){switch(cmd){case "EA_init":if(eAs[id]['settings']["EA_init_callback"].length>0)eval(eAs[id]['settings']["EA_init_callback"]+"('"+id +"');");break;case "EA_delete":if(eAs[id]['settings']["EA_delete_callback"].length>0)eval(eAs[id]['settings']["EA_delete_callback"]+"('"+id +"');");break;case "EA_submit":if(eAs[id]['settings']["submit_callback"].length>0)eval(eAs[id]['settings']["submit_callback"]+"('"+id +"');");break;}if(window.frames["frame_"+id]&&window.frames["frame_"+id].editArea){if(fct_param!=undefined)return eval('window.frames["frame_'+id +'"].editArea.'+cmd +'(fct_param);');
else return eval('window.frames["frame_'+id +'"].editArea.'+cmd +';');}return false;}};var eAL=new EAL();var eAs=new Object(); function getAttribute(elm,aname){try{var avalue=elm.getAttribute(aname );}catch(exept){}if(! avalue){for(var i=0;i < elm.attributes.length;i ++){var taName=elm.attributes [i] .name.toLowerCase();if(taName==aname){avalue=elm.attributes [i] .value;return avalue;}}}return avalue;};function setAttribute(elm,attr,val){if(attr=="class"){elm.setAttribute("className",val);elm.setAttribute("class",val);}
else{elm.setAttribute(attr,val);}};function getChildren(elem,elem_type,elem_attribute,elem_attribute_match,option,depth){if(!option)var option="single";if(!depth)var depth=-1;if(elem){var children=elem.childNodes;var result=null;var results=new Array();for (var x=0;x<children.length;x++){strTagName=new String(children[x].tagName);children_class="?";if(strTagName!="undefined"){child_attribute=getAttribute(children[x],elem_attribute);if((strTagName.toLowerCase()==elem_type.toLowerCase()||elem_type=="")&&(elem_attribute==""||child_attribute==elem_attribute_match)){if(option=="all"){results.push(children[x]);}
else{return children[x];}}if(depth!=0){result=getChildren(children[x],elem_type,elem_attribute,elem_attribute_match,option,depth-1);if(option=="all"){if(result.length>0){results=results.concat(result);}}
else if(result!=null){return result;}}}}if(option=="all")return results;}return null;};function isChildOf(elem,parent){if(elem){if(elem==parent)return true;while(elem.parentNode !='undefined'){return isChildOf(elem.parentNode,parent);}}return false;};function getMouseX(e){if(e!=null&&typeof(e.pageX)!="undefined"){return e.pageX;}
else{return (e!=null?e.x:event.x)+document.documentElement.scrollLeft;}};function getMouseY(e){if(e!=null&&typeof(e.pageY)!="undefined"){return e.pageY;}
else{return (e!=null?e.y:event.y)+document.documentElement.scrollTop;}};function calculeOffsetLeft(r){return calculeOffset(r,"offsetLeft")};function calculeOffsetTop(r){return calculeOffset(r,"offsetTop")};function calculeOffset(element,attr){var offset=0;while(element){offset+=element[attr];element=element.offsetParent}return offset;};function get_css_property(elem,prop){if(document.defaultView){return document.defaultView.getComputedStyle(elem,null).getPropertyValue(prop);}
else if(elem.currentStyle){var prop=prop.replace(/-\D/gi,function(sMatch){return sMatch.charAt(sMatch.length-1).toUpperCase();});return elem.currentStyle[prop];}
else return null;}var move_current_element;function start_move_element(e,id,frame){var elem_id=(e.target||e.srcElement).id;if(id)elem_id=id;if(!frame)frame=window;if(frame.event)e=frame.event;move_current_element=frame.document.getElementById(elem_id);move_current_element.frame=frame;frame.document.onmousemove=move_element;frame.document.onmouseup=end_move_element;mouse_x=getMouseX(e);mouse_y=getMouseY(e);move_current_element.start_pos_x=mouse_x-(move_current_element.style.left.replace("px","")||calculeOffsetLeft(move_current_element));move_current_element.start_pos_y=mouse_y-(move_current_element.style.top.replace("px","")||calculeOffsetTop(move_current_element));return false;};function end_move_element(e){move_current_element.frame.document.onmousemove="";move_current_element.frame.document.onmouseup="";move_current_element=null;};function move_element(e){if(move_current_element.frame&&move_current_element.frame.event)e=move_current_element.frame.event;var mouse_x=getMouseX(e);var mouse_y=getMouseY(e);var new_top=mouse_y-move_current_element.start_pos_y;var new_left=mouse_x-move_current_element.start_pos_x;var max_left=move_current_element.frame.document.body.offsetWidth-move_current_element.offsetWidth;max_top=move_current_element.frame.document.body.offsetHeight-move_current_element.offsetHeight;new_top=Math.min(Math.max(0,new_top),max_top);new_left=Math.min(Math.max(0,new_left),max_left);move_current_element.style.top=new_top+"px";move_current_element.style.left=new_left+"px";return false;};var nav=eAL.nav;function getSelectionRange(textarea){return {"start":textarea.selectionStart,"end":textarea.selectionEnd};};function setSelectionRange(textarea,start,end){textarea.focus();start=Math.max(0,Math.min(textarea.value.length,start));end=Math.max(start,Math.min(textarea.value.length,end));if(nav['isOpera']){textarea.selectionEnd=1;textarea.selectionStart=0;textarea.selectionEnd=1;textarea.selectionStart=0;}textarea.selectionStart=start;textarea.selectionEnd=end;if(nav['isIE'])set_IE_selection(textarea);};function get_IE_selection(textarea){if(textarea&&textarea.focused){if(!textarea.ea_line_height){var div=document.createElement("div");div.style.fontFamily=get_css_property(textarea,"font-family");div.style.fontSize=get_css_property(textarea,"font-size");div.style.visibility="hidden";div.innerHTML="0";document.body.appendChild(div);textarea.ea_line_height=div.offsetHeight;document.body.removeChild(div);}var range=document.selection.createRange();var stored_range=range.duplicate();stored_range.moveToElementText(textarea );stored_range.setEndPoint('EndToEnd',range );if(stored_range.parentElement()==textarea){var elem=textarea;var scrollTop=0;while(elem.parentNode){scrollTop+=elem.scrollTop;elem=elem.parentNode;}var relative_top=range.offsetTop-calculeOffsetTop(textarea)+scrollTop;var line_start=Math.round((relative_top / textarea.ea_line_height)+1);var line_nb=Math.round(range.boundingHeight / textarea.ea_line_height);var range_start=stored_range.text.length-range.text.length;var tab=textarea.value.substr(0,range_start).split("\n");range_start+=(line_start-tab.length)*2;textarea.selectionStart=range_start;var range_end=textarea.selectionStart+range.text.length;tab=textarea.value.substr(0,range_start+range.text.length).split("\n");range_end+=(line_start+line_nb-1-tab.length)*2;textarea.selectionEnd=range_end;}}setTimeout("get_IE_selection(document.getElementById('"+textarea.id +"'));",50);};function IE_textarea_focus(){event.srcElement.focused=true;}function IE_textarea_blur(){event.srcElement.focused=false;}function set_IE_selection(textarea){if(!window.closed){var nbLineStart=textarea.value.substr(0,textarea.selectionStart).split("\n").length-1;var nbLineEnd=textarea.value.substr(0,textarea.selectionEnd).split("\n").length-1;var range=document.selection.createRange();range.moveToElementText(textarea );range.setEndPoint('EndToStart',range );range.moveStart('character',textarea.selectionStart-nbLineStart);range.moveEnd('character',textarea.selectionEnd-nbLineEnd-(textarea.selectionStart-nbLineStart));range.select();}};eAL.waiting_loading["elements_functions.js"]="loaded";
 EAL.prototype.start_resize_area=function(){document.onmouseup=eAL.end_resize_area;document.onmousemove=eAL.resize_area;eAL.toggle(eAL.resize["id"]);var textarea=eAs[eAL.resize["id"]]["textarea"];var div=document.getElementById("edit_area_resize");if(!div){div=document.createElement("div");div.id="edit_area_resize";div.style.border="dashed #888888 1px";}var width=textarea.offsetWidth -2;var height=textarea.offsetHeight -2;div.style.display="block";div.style.width=width+"px";div.style.height=height+"px";var father=textarea.parentNode;father.insertBefore(div,textarea);textarea.style.display="none";eAL.resize["start_top"]=calculeOffsetTop(div);eAL.resize["start_left"]=calculeOffsetLeft(div);};EAL.prototype.end_resize_area=function(e){document.onmouseup="";document.onmousemove="";var div=document.getElementById("edit_area_resize");var textarea=eAs[eAL.resize["id"]]["textarea"];var width=Math.max(eAs[eAL.resize["id"]]["settings"]["min_width"],div.offsetWidth-4);var height=Math.max(eAs[eAL.resize["id"]]["settings"]["min_height"],div.offsetHeight-4);if(eAL.nav['isIE']==6){width-=2;height-=2;}textarea.style.width=width+"px";textarea.style.height=height+"px";div.style.display="none";textarea.style.display="inline";textarea.selectionStart=eAL.resize["selectionStart"];textarea.selectionEnd=eAL.resize["selectionEnd"];eAL.toggle(eAL.resize["id"]);return false;};EAL.prototype.resize_area=function(e){var allow=eAs[eAL.resize["id"]]["settings"]["allow_resize"];if(allow=="both"||allow=="y"){new_y=getMouseY(e);var new_height=Math.max(20,new_y-eAL.resize["start_top"]);document.getElementById("edit_area_resize").style.height=new_height+"px";}if(allow=="both"||allow=="x"){new_x=getMouseX(e);var new_width=Math.max(20,new_x-eAL.resize["start_left"]);document.getElementById("edit_area_resize").style.width=new_width+"px";}return false;};eAL.waiting_loading["resize_area.js"]="loaded";
	EAL.prototype.get_regexp=function(text_array){res="(\\b)(";for(i=0;i<text_array.length;i++){if(i>0)res+="|";res+=this.get_escaped_regexp(text_array[i]);}res+=")(\\b)";reg=new RegExp(res);return res;};EAL.prototype.get_escaped_regexp=function(str){return str.replace(/(\.|\?|\*|\+|\\|\(|\)|\[|\]|\}|\{|\$|\^|\|)/g,"\\$1");};EAL.prototype.init_syntax_regexp=function(){var lang_style=new Object();for(var lang in this.load_syntax){if(!this.syntax[lang]){this.syntax[lang]=new Object();this.syntax[lang]["keywords_reg_exp"]=new Object();this.keywords_reg_exp_nb=0;if(this.load_syntax[lang]['KEYWORDS']){param="g";if(this.load_syntax[lang]['KEYWORD_CASE_SENSITIVE']===false)param+="i";for(var i in this.load_syntax[lang]['KEYWORDS']){if(typeof(this.load_syntax[lang]['KEYWORDS'][i])=="function")continue;this.syntax[lang]["keywords_reg_exp"][i]=new RegExp(this.get_regexp(this.load_syntax[lang]['KEYWORDS'][i] ),param);this.keywords_reg_exp_nb++;}}if(this.load_syntax[lang]['OPERATORS']){var str="";var nb=0;for(var i in this.load_syntax[lang]['OPERATORS']){if(typeof(this.load_syntax[lang]['OPERATORS'][i])=="function")continue;if(nb>0)str+="|";str+=this.get_escaped_regexp(this.load_syntax[lang]['OPERATORS'][i]);nb++;}if(str.length>0)this.syntax[lang]["operators_reg_exp"]=new RegExp("("+str+")","g");}if(this.load_syntax[lang]['DELIMITERS']){var str="";var nb=0;for(var i in this.load_syntax[lang]['DELIMITERS']){if(typeof(this.load_syntax[lang]['DELIMITERS'][i])=="function")continue;if(nb>0)str+="|";str+=this.get_escaped_regexp(this.load_syntax[lang]['DELIMITERS'][i]);nb++;}if(str.length>0)this.syntax[lang]["delimiters_reg_exp"]=new RegExp("("+str+")","g");}var syntax_trace=new Array();this.syntax[lang]["quotes"]=new Object();var quote_tab=new Array();if(this.load_syntax[lang]['QUOTEMARKS']){for(var i in this.load_syntax[lang]['QUOTEMARKS']){if(typeof(this.load_syntax[lang]['QUOTEMARKS'][i])=="function")continue;var x=this.get_escaped_regexp(this.load_syntax[lang]['QUOTEMARKS'][i]);this.syntax[lang]["quotes"][x]=x;quote_tab[quote_tab.length]="("+x+"(?:[^"+x+"\\\\]*(\\\\\\\\)*(\\\\"+x+"?)?)*("+x+"|$))";syntax_trace.push(x);}}this.syntax[lang]["comments"]=new Object();if(this.load_syntax[lang]['COMMENT_SINGLE']){for(var i in this.load_syntax[lang]['COMMENT_SINGLE']){if(typeof(this.load_syntax[lang]['COMMENT_SINGLE'][i])=="function")continue;var x=this.get_escaped_regexp(this.load_syntax[lang]['COMMENT_SINGLE'][i]);quote_tab[quote_tab.length]="("+x+"(.|\\r|\\t)*(\\n|$))";syntax_trace.push(x);this.syntax[lang]["comments"][x]="\n";}}if(this.load_syntax[lang]['COMMENT_MULTI']){for(var i in this.load_syntax[lang]['COMMENT_MULTI']){if(typeof(this.load_syntax[lang]['COMMENT_MULTI'][i])=="function")continue;var start=this.get_escaped_regexp(i);var end=this.get_escaped_regexp(this.load_syntax[lang]['COMMENT_MULTI'][i]);quote_tab[quote_tab.length]="("+start+"(.|\\n|\\r)*?("+end+"|$))";syntax_trace.push(start);syntax_trace.push(end);this.syntax[lang]["comments"][i]=this.load_syntax[lang]['COMMENT_MULTI'][i];}}if(quote_tab.length>0)this.syntax[lang]["comment_or_quote_reg_exp"]=new RegExp("("+quote_tab.join("|")+")","gi");if(syntax_trace.length>0)this.syntax[lang]["syntax_trace_regexp"]=new RegExp("((.|\n)*?)(\\\\*("+syntax_trace.join("|")+"|$))","gmi");if(this.load_syntax[lang]['SCRIPT_DELIMITERS']){this.syntax[lang]["script_delimiters"]=new Object();for(var i in this.load_syntax[lang]['SCRIPT_DELIMITERS']){if(typeof(this.load_syntax[lang]['SCRIPT_DELIMITERS'][i])=="function")continue;this.syntax[lang]["script_delimiters"][i]=this.load_syntax[lang]['SCRIPT_DELIMITERS'];}}this.syntax[lang]["custom_regexp"]=new Object();if(this.load_syntax[lang]['REGEXPS']){for(var i in this.load_syntax[lang]['REGEXPS']){if(typeof(this.load_syntax[lang]['REGEXPS'][i])=="function")continue;var val=this.load_syntax[lang]['REGEXPS'][i];if(!this.syntax[lang]["custom_regexp"][val['execute']])this.syntax[lang]["custom_regexp"][val['execute']]=new Object();this.syntax[lang]["custom_regexp"][val['execute']][i]={'regexp':new RegExp(val['search'],val['modifiers']),'class':val['class']};}}if(this.load_syntax[lang]['STYLES']){lang_style[lang]=new Object();for(var i in this.load_syntax[lang]['STYLES']){if(typeof(this.load_syntax[lang]['STYLES'][i])=="function")continue;if(typeof(this.load_syntax[lang]['STYLES'][i])!="string"){for(var j in this.load_syntax[lang]['STYLES'][i]){lang_style[lang][j]=this.load_syntax[lang]['STYLES'][i][j];}}
else{lang_style[lang][i]=this.load_syntax[lang]['STYLES'][i];}}}var style="";for(var i in lang_style[lang]){if(lang_style[lang][i].length>0){style+="."+lang +" ."+i.toLowerCase()+" span{"+lang_style[lang][i]+"}\n";style+="."+lang +" ."+i.toLowerCase()+"{"+lang_style[lang][i]+"}\n";}}this.syntax[lang]["styles"]=style;}}};eAL.waiting_loading["reg_syntax.js"]="loaded";
var editAreaLoader= eAL;var editAreas=eAs;EditAreaLoader=EAL;editAreaLoader.iframe_script= "<script type='text/javascript'> Ã EA(){Á.error=Ì;Á.inlinePopup=new Array({popup_id:\"area_search_replace\",icon_id:\"search\"},{popup_id:\"edit_area_help\",icon_id:\"help\"});Á.plugins=new Object();Á.line_number=0;Á.nav=È.eAL.nav;Á.É=new Object();Á.last_text_to_highlight=\"\";Á.last_hightlighted_text=\"\";Á.syntax_list=new Array();Á.allready_used_syntax=new Object();Á.ÂFocused=Ì;Á.previous=new Array();Á.next=new Array();Á.last_undo=\"\";Á.files=new Object();Á.filesIdAssoc=new Object();Á.curr_file='';Á.assocBracket=new Object();Á.revertAssocBracket=new Object();Á.assocBracket[\"(\"]=\")\";Á.assocBracket[\"{\"]=\"}\";Á.assocBracket[\"[\"]=\"]\";for(var index in Á.assocBracket){Á.revertAssocBracket[Á.assocBracket[index]]=index;}Á.is_editable=Ë;Á.lineHeight=16;Á.tab_nb_char=8;if(Á.nav['isOpera'])Á.tab_nb_char=6;Á.is_tabbing=Ì;Á.fullscreen={'isFull':Ì};Á.isResizing=Ì;Á.id=area_id;Á.Å=eAs[Á.id][\"Å\"];if((\"\"+Á.Å['replace_tab_by_spaces']).match(/^[0-9]+$/)){Á.tab_nb_char=Á.Å['replace_tab_by_spaces'];Á.tabulation=\"\";for(var i=0;i<Á.tab_nb_char;i++)Á.tabulation+=\" \";}\nelse{Á.tabulation=\"\t\";}if(Á.Å[\"syntax_selection_allow\"]&&Á.Å[\"syntax_selection_allow\"].Æ>0)Á.syntax_list=Á.Å[\"syntax_selection_allow\"].replace(/ /g,\"\").split(\",\");if(Á.Å['syntax'])Á.allready_used_syntax[Á.Å['syntax']]=Ë;};EA.Ä.update_size=Ã(){if(eAs[eA.id]&&eAs[eA.id][\"displayed\"]==Ë){if(eA.fullscreen['isFull']){È.document.getElementById(\"frame_\"+eA.id).Ç.width=È.document.getElementsByTagName(\"html\")[0].clientWidth+\"px\";È.document.getElementById(\"frame_\"+eA.id).Ç.height=È.document.getElementsByTagName(\"html\")[0].clientHeight+\"px\";}if(eA.tab_browsing_area.Ç.display=='block'&&!eA.nav['isIE']){eA.tab_browsing_area.Ç.height=\"0px\";eA.tab_browsing_area.Ç.height=(eA.result.offsetTop-eA.tab_browsing_area.offsetTop -1)+\"px\";}var height=document.body.offsetHeight-eA.get_all_toolbar_height()-4;eA.result.Ç.height=height +\"px\";var width=document.body.offsetWidth -2;eA.result.Ç.width=width+\"px\";for(var i=0;i<eA.inlinePopup.Æ;i++){var popup=$(eA.inlinePopup[i][\"popup_id\"]);var max_left=document.body.offsetWidth-popup.offsetWidth;var max_top=document.body.offsetHeight-popup.offsetHeight;if(popup.offsetTop>max_top)popup.Ç.top=max_top+\"px\";if(popup.offsetLeft>max_left)popup.Ç.left=max_left+\"px\";}}};EA.Ä.init=Ã(){Á.Â=$(\"Â\");Á.container=$(\"container\");Á.result=$(\"result\");Á.content_highlight=$(\"content_highlight\");Á.selection_field=$(\"selection_field\");Á.processing_screen=$(\"processing\");Á.editor_area=$(\"editor\");Á.tab_browsing_area=$(\"tab_browsing_area\");if(!Á.Å['is_editable'])Á.set_editable(Ì);if(syntax_selec=$(\"syntax_selection\")){for(var i=0;i<Á.syntax_list.Æ;i++){var syntax=Á.syntax_list[i];var option=document.createElement(\"option\");option.Ê=syntax;if(syntax==Á.Å['syntax'])option.selected=\"selected\";option.innerHTML=Á.get_translation(\"syntax_\"+syntax,\"word\");syntax_selec.appendChild(option);}}spans=È.getChildren($(\"toolbar_1\"),\"span\",\"\",\"\",\"all\",-1);for(var i=0;i<spans.Æ;i++){id=spans[i].id.replace(/tmp_tool_(.*)/,\"$1\");if(id!=spans[i].id){for(var j in Á.plugins){if(typeof(Á.plugins[j].get_control_html)==\"Ã\" ){html=Á.plugins[j].get_control_html(id);if(html!=Ì){html=Á.get_translation(html,\"template\");var new_span=document.createElement(\"span\");new_span.innerHTML=html;var father=spans[i].ÈNode;spans[i].ÈNode.replaceChild(new_span,spans[i]);break;}}}}}Á.Â.Ê=eAs[Á.id][\"Â\"].Ê;if(Á.Å[\"debug\"])Á.debug=È.document.getElementById(\"edit_area_debug_\"+Á.id);if($(\"redo\")!=null)Á.switchClassSticky($(\"redo\"),'editAreaButtonDisabled',Ë);if(typeof(È.eAL.syntax[Á.Å[\"syntax\"]])!=\"undefined\"){for(var i in È.eAL.syntax){Á.add_Ç(È.eAL.syntax[i][\"Çs\"]);}}if(Á.nav['isOpera'])$(\"editor\").onkeypress=keyDown;\nelse $(\"editor\").onkeydown=keyDown;for(var i=0;i<Á.inlinePopup.Æ;i++){if(Á.nav['isIE']||Á.nav['isFirefox'])$(Á.inlinePopup[i][\"popup_id\"]).onkeydown=keyDown;\nelse $(Á.inlinePopup[i][\"popup_id\"]).onkeypress=keyDown;}if(Á.Å[\"allow_resize\"]==\"both\"||Á.Å[\"allow_resize\"]==\"x\"||Á.Å[\"allow_resize\"]==\"y\")Á.allow_resize(Ë);È.eAL.toggle(Á.id,\"on\");Á.change_smooth_selection_mode(eA.smooth_selection);Á.execCommand(\"change_highlight\",Á.Å[\"start_highlight\"]);Á.set_font(eA.Å[\"font_family\"],eA.Å[\"font_size\"]);children=È.getChildren(document.body,\"\",\"selec\",\"none\",\"all\",-1);for(var i=0;i<children.Æ;i++){if(Á.nav['isIE'])children[i].unselectable=Ë;\nelse children[i].onmousedown=Ã(){return Ì};}if(Á.nav['isGecko']){Á.Â.spellcheck=Á.Å[\"gecko_spellcheck\"];}if(Á.nav['isOpera']){Á.editor_area.Ç.position=\"absolute\";Á.selection_field.Ç.marginTop=\"-1pt\";Á.selection_field.Ç.paddingTop=\"1pt\";$(\"cursor_pos\").Ç.marginTop=\"-1pt\";$(\"end_bracket\").Ç.marginTop=\"-1pt\";Á.content_highlight.Ç.marginTop=\"-1pt\";}if(Á.nav['isSafari']){Á.editor_area.Ç.position=\"absolute\";Á.selection_field.Ç.marginTop=\"-1pt\";Á.selection_field.Ç.paddingTop=\"1pt\";Á.selection_field.Ç.marginLeft=\"3px\";Á.content_highlight.Ç.marginTop=\"-1pt\";Á.content_highlight.Ç.marginLeft=\"3px\";$(\"cursor_pos\").Ç.marginLeft=\"3px\";$(\"end_bracket\").Ç.marginLeft=\"3px\";}È.eAL.add_event(Á.result,\"click\",Ã(e){if((e.target||e.srcElement)==eA.result){eA.area_select(eA.Â.Ê.Æ,0);}});if(Á.Å['is_multi_files']!=Ì)Á.open_file({'id':Á.curr_file,'text':''});Á.set_wrap_text(Á.Å['wrap_text'] );setTimeout(\"eA.focus();eA.manage_size();eA.execCommand('EA_load');\",10);Á.check_undo();Á.check_line_selection(Ë);Á.scroll_to_view();for(var i in Á.plugins){if(typeof(Á.plugins[i].onload)==\"Ã\")Á.plugins[i].onload();}if(Á.Å['fullscreen']==Ë)Á.toggle_full_screen(Ë);È.eAL.add_event(window,\"resize\",eA.update_size);È.eAL.add_event(È.window,\"resize\",eA.update_size);È.eAL.add_event(top.window,\"resize\",eA.update_size);È.eAL.add_event(window,\"unload\",Ã(){if(eAs[eA.id]&&eAs[eA.id][\"displayed\"])eA.execCommand(\"EA_unload\");});};EA.Ä.manage_size=Ã(onlyOneTime){if(!eAs[Á.id])return Ì;if(eAs[Á.id][\"displayed\"]==Ë&&Á.ÂFocused){var resized=Ì;if(Á.Å['wrap_text']){var area_width=Á.result.offsetWidth -50;}\nelse{var area_width=Á.Â.scrollWidth;var area_height=Á.Â.scrollHeight;if(Á.nav['isOpera']){area_width=10000;}}if(Á.nav['isIE']>=7)area_width-=45;if(Á.Â.previous_scrollWidth!=area_width){if(!Á.nav['isOpera']&&Á.Â.Ç.width&&(Á.Â.Ç.width.replace(\"px\",\"\")< area_width))area_width+=50;if(Á.nav['isGecko']||Á.nav['isOpera'])Á.container.Ç.width=(area_width+45)+\"px\";\nelse Á.container.Ç.width=area_width+\"px\";Á.Â.Ç.width=area_width+\"px\";Á.content_highlight.Ç.width=area_width+\"px\";Á.Â.previous_scrollWidth=area_width;resized=Ë;}var area_height=Á.Â.scrollHeight;if(Á.nav['isOpera']){area_height=Á.É['nb_line']*Á.lineHeight;}if(Á.nav['isGecko']&&Á.smooth_selection&&Á.É[\"nb_line\"])area_height=Á.É[\"nb_line\"]*Á.lineHeight;if(Á.Â.previous_scrollHeight!=area_height){Á.container.Ç.height=(area_height+2)+\"px\";Á.Â.Ç.height=area_height+\"px\";Á.content_highlight.Ç.height=area_height+\"px\";Á.Â.previous_scrollHeight=area_height;resized=Ë;}if(Á.É[\"nb_line\"] >=Á.line_number){var div_line_number=\"\";for(i=Á.line_number+1;i<Á.É[\"nb_line\"]+100;i++){div_line_number+=i+\"<br />\";Á.line_number++;}var span=document.createElement(\"span\");if(Á.nav['isIE'])span.unselectable=Ë;span.innerHTML=div_line_number;$(\"line_number\").appendChild(span);}Á.Â.scrollTop=\"0px\";Á.Â.scrollLeft=\"0px\";if(resized==Ë){Á.scroll_to_view();}}if(!onlyOneTime)setTimeout(\"eA.manage_size();\",100);};EA.Ä.add_event=Ã(obj,name,handler){if (Á.nav['isIE']){obj.attachEvent(\"on\"+name,handler);}\nelse{obj.addEventListener(name,handler,Ì);}};EA.Ä.execCommand=Ã(cmd,param){for(var i in Á.plugins){if(typeof(Á.plugins[i].execCommand)==\"Ã\"){if(!Á.plugins[i].execCommand(cmd,param))return;}}switch(cmd){case \"save\":if(Á.Å[\"save_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"save_callback\"]+\"('\"+Á.id +\"',eA.Â.Ê);\");break;case \"load\":if(Á.Å[\"load_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"load_callback\"]+\"('\"+Á.id +\"');\");break;case \"onchange\":if(Á.Å[\"change_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"change_callback\"]+\"('\"+Á.id +\"');\");break;case \"EA_load\":if(Á.Å[\"EA_load_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_load_callback\"]+\"('\"+Á.id +\"');\");break;case \"EA_unload\":if(Á.Å[\"EA_unload_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_unload_callback\"]+\"('\"+Á.id +\"');\");break;case \"toggle_on\":if(Á.Å[\"EA_toggle_on_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_toggle_on_callback\"]+\"('\"+Á.id +\"');\");break;case \"toggle_off\":if(Á.Å[\"EA_toggle_off_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_toggle_off_callback\"]+\"('\"+Á.id +\"');\");break;case \"re_sync\":if(!Á.do_highlight)break;case \"file_switch_on\":if(Á.Å[\"EA_file_switch_on_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_file_switch_on_callback\"]+\"(param);\");break;case \"file_switch_off\":if(Á.Å[\"EA_file_switch_off_callback\"].Æ>0)eval(\"È.\"+Á.Å[\"EA_file_switch_off_callback\"]+\"(param);\");break;case \"file_close\":if(Á.Å[\"EA_file_close_callback\"].Æ>0)return eval(\"È.\"+Á.Å[\"EA_file_close_callback\"]+\"(param);\");break;default:if(typeof(eval(\"eA.\"+cmd))==\"Ã\"){if(Á.Å[\"debug\"])eval(\"eA.\"+cmd +\"(param);\");\nelse try{eval(\"eA.\"+cmd +\"(param);\");}catch(e){};}}};EA.Ä.get_translation=Ã(word,mode){if(mode==\"template\")return È.eAL.translate(word,Á.Å[\"language\"],mode);\nelse return È.eAL.get_word_translation(word,Á.Å[\"language\"]);};EA.Ä.add_plugin=Ã(plug_name,plug_obj){for(var i=0;i<Á.Å[\"plugins\"].Æ;i++){if(Á.Å[\"plugins\"][i]==plug_name){Á.plugins[plug_name]=plug_obj;plug_obj.baseURL=È.eAL.baseURL+\"plugins/\"+plug_name+\"/\";if(typeof(plug_obj.init)==\"Ã\")plug_obj.init();}}};EA.Ä.load_css=Ã(url){try{link=document.createElement(\"link\");link.type=\"text/css\";link.rel=\"Çsheet\";link.media=\"all\";link.href=url;head=document.getElementsByTagName(\"head\");head[0].appendChild(link);}catch(e){document.write(\"<link href='\"+url +\"' rel='Çsheet' type='text/css' />\");}};EA.Ä.load_script=Ã(url){try{script=document.createElement(\"script\");script.type=\"text/javascript\";script.src =url;script.charset=\"UTF-8\";head=document.getElementsByTagName(\"head\");head[0].appendChild(script);}catch(e){document.write(\"<script type='text/javascript' src='\"+url+\"' charset=\\\"UTF-8\\\"><\"+\"/script>\");}};EA.Ä.add_lang=Ã(language,Ês){if(!È.eAL.lang[language])È.eAL.lang[language]=new Object();for(var i in Ês)È.eAL.lang[language][i]=Ês[i];};Ã $(id){return document.getElementById(id );};var eA=new EA();eA.add_event(window,\"load\",init);Ã init(){setTimeout(\"eA.init();\",10);};	EA.Ä.focus=Ã(){Á.Â.focus();Á.ÂFocused=Ë;};EA.Ä.check_line_selection=Ã(timer_checkup){if(!eAs[Á.id])return Ì;if(!Á.smooth_selection&&!Á.do_highlight){}\nelse if(Á.ÂFocused&&eAs[Á.id][\"displayed\"]==Ë&&Á.isResizing==Ì){infos=Á.get_selection_infos();if(Á.É[\"line_start\"] !=infos[\"line_start\"]||Á.É[\"line_nb\"] !=infos[\"line_nb\"]||infos[\"full_text\"] !=Á.É[\"full_text\"]||Á.reload_highlight){new_top=Á.lineHeight * (infos[\"line_start\"]-1);new_height=Math.max(0,Á.lineHeight * infos[\"line_nb\"]);new_width=Math.max(Á.Â.scrollWidth,Á.container.clientWidth -50);Á.selection_field.Ç.top=new_top+\"px\";Á.selection_field.Ç.width=new_width+\"px\";Á.selection_field.Ç.height=new_height+\"px\";$(\"cursor_pos\").Ç.top=new_top+\"px\";if(Á.do_highlight==Ë){var curr_text=infos[\"full_text\"].split(\"\\n\");var content=\"\";var start=Math.max(0,infos[\"line_start\"]-1);var end=Math.min(curr_text.Æ,infos[\"line_start\"]+infos[\"line_nb\"]-1);for(i=start;i< end;i++){content+=curr_text[i]+\"\\n\";}content=content.replace(/&/g,\"&amp;\");content=content.replace(/</g,\"&lt;\");content=content.replace(/>/g,\"&gt;\");if(Á.nav['isIE']||Á.nav['isOpera']||Á.nav['isFirefox'] >=3)Á.selection_field.innerHTML=\"<pre>\"+content.replace(\"\\n\",\"<br/>\")+\"</pre>\";\nelse Á.selection_field.innerHTML=content;if(Á.reload_highlight||(infos[\"full_text\"] !=Á.last_text_to_highlight&&(Á.É[\"line_start\"]!=infos[\"line_start\"]||Á.É[\"line_nb\"]!=infos[\"line_nb\"]||Á.É[\"nb_line\"]!=infos[\"nb_line\"])))Á.maj_highlight(infos);}}if(infos[\"line_start\"] !=Á.É[\"line_start\"]||infos[\"curr_pos\"] !=Á.É[\"curr_pos\"]||infos[\"full_text\"].Æ!=Á.É[\"full_text\"].Æ||Á.reload_highlight){var selec_char=infos[\"curr_line\"].charAt(infos[\"curr_pos\"]-1);var no_real_move=Ë;if(infos[\"line_nb\"]==1&&(Á.assocBracket[selec_char]||Á.revertAssocBracket[selec_char])){no_real_move=Ì;if(Á.findEndBracket(infos,selec_char)===Ë){$(\"end_bracket\").Ç.visibility=\"visible\";$(\"cursor_pos\").Ç.visibility=\"visible\";$(\"cursor_pos\").innerHTML=selec_char;$(\"end_bracket\").innerHTML=(Á.assocBracket[selec_char]||Á.revertAssocBracket[selec_char]);}\nelse{$(\"end_bracket\").Ç.visibility=\"hidden\";$(\"cursor_pos\").Ç.visibility=\"hidden\";}}\nelse{$(\"cursor_pos\").Ç.visibility=\"hidden\";$(\"end_bracket\").Ç.visibility=\"hidden\";}Á.displayToCursorPosition(\"cursor_pos\",infos[\"line_start\"],infos[\"curr_pos\"]-1,infos[\"curr_line\"],no_real_move);if(infos[\"line_nb\"]==1&&infos[\"line_start\"]!=Á.É[\"line_start\"])Á.scroll_to_view();}Á.É=infos;}if(timer_checkup){if(Á.do_highlight==Ë)setTimeout(\"eA.check_line_selection(Ë)\",50);\nelse setTimeout(\"eA.check_line_selection(Ë)\",50);}};EA.Ä.get_selection_infos=Ã(){if(Á.nav['isIE'])Á.getIESelection();start=Á.Â.selectionStart;end=Á.Â.selectionEnd;if(Á.É[\"selectionStart\"]==start&&Á.É[\"selectionEnd\"]==end&&Á.É[\"full_text\"]==Á.Â.Ê)return Á.É;if(Á.tabulation!=\"\t\"&&Á.Â.Ê.indexOf(\"\t\")!=-1){var len=Á.Â.Ê.Æ;Á.Â.Ê=Á.replace_tab(Á.Â.Ê);start=end=start+(Á.Â.Ê.Æ-len);Á.area_select(start,0);}var selections=new Object();selections[\"selectionStart\"]=start;selections[\"selectionEnd\"]=end;selections[\"full_text\"]=Á.Â.Ê;selections[\"line_start\"]=1;selections[\"line_nb\"]=1;selections[\"curr_pos\"]=0;selections[\"curr_line\"]=\"\";selections[\"indexOfCursor\"]=0;selections[\"selec_direction\"]=Á.É[\"selec_direction\"];var splitTab=selections[\"full_text\"].split(\"\\n\");var nbLine=Math.max(0,splitTab.Æ);var nbChar=Math.max(0,selections[\"full_text\"].Æ-(nbLine-1));if(selections[\"full_text\"].indexOf(\"\\r\")!=-1)nbChar=nbChar-(nbLine -1);selections[\"nb_line\"]=nbLine;selections[\"nb_char\"]=nbChar;if(start>0){var str=selections[\"full_text\"].substr(0,start);selections[\"curr_pos\"]=start-str.lastIndexOf(\"\\n\");selections[\"line_start\"]=Math.max(1,str.split(\"\\n\").Æ);}\nelse{selections[\"curr_pos\"]=1;}if(end>start){selections[\"line_nb\"]=selections[\"full_text\"].substring(start,end).split(\"\\n\").Æ;}selections[\"indexOfCursor\"]=Á.Â.selectionStart;selections[\"curr_line\"]=splitTab[Math.max(0,selections[\"line_start\"]-1)];if(selections[\"selectionStart\"]==Á.É[\"selectionStart\"]){if(selections[\"selectionEnd\"]>Á.É[\"selectionEnd\"])selections[\"selec_direction\"]=\"down\";\nelse if(selections[\"selectionEnd\"]==Á.É[\"selectionStart\"])selections[\"selec_direction\"]=Á.É[\"selec_direction\"];}\nelse if(selections[\"selectionStart\"]==Á.É[\"selectionEnd\"]&&selections[\"selectionEnd\"]>Á.É[\"selectionEnd\"]){selections[\"selec_direction\"]=\"down\";}\nelse{selections[\"selec_direction\"]=\"up\";}$(\"nbLine\").innerHTML=nbLine;$(\"nbChar\").innerHTML=nbChar;$(\"linePos\").innerHTML=selections[\"line_start\"];$(\"currPos\").innerHTML=selections[\"curr_pos\"];return selections;};EA.Ä.getIESelection=Ã(){var range=document.selection.createRange();var stored_range=range.duplicate();stored_range.moveToElementText(Á.Â );stored_range.setEndPoint('EndToEnd',range );if(stored_range.ÈElement()!=Á.Â)return;var scrollTop=Á.result.scrollTop+document.body.scrollTop;var relative_top=range.offsetTop-È.calculeOffsetTop(Á.Â)+scrollTop;var line_start=Math.round((relative_top / Á.lineHeight)+1);var line_nb=Math.round(range.boundingHeight / Á.lineHeight);var range_start=stored_range.text.Æ-range.text.Æ;var tab=Á.Â.Ê.substr(0,range_start).split(\"\\n\");range_start+=(line_start-tab.Æ)*2;Á.Â.selectionStart=range_start;var range_end=Á.Â.selectionStart+range.text.Æ;tab=Á.Â.Ê.substr(0,range_start+range.text.Æ).split(\"\\n\");range_end+=(line_start+line_nb-1-tab.Æ)*2;Á.Â.selectionEnd=range_end;};EA.Ä.setIESelection=Ã(){var nbLineStart=Á.Â.Ê.substr(0,Á.Â.selectionStart).split(\"\\n\").Æ-1;var nbLineEnd=Á.Â.Ê.substr(0,Á.Â.selectionEnd).split(\"\\n\").Æ-1;var range=document.selection.createRange();range.moveToElementText(Á.Â );range.setEndPoint('EndToStart',range );range.moveStart('character',Á.Â.selectionStart-nbLineStart);range.moveEnd('character',Á.Â.selectionEnd-nbLineEnd-(Á.Â.selectionStart-nbLineStart));range.select();};EA.Ä.tab_selection=Ã(){if(Á.is_tabbing)return;Á.is_tabbing=Ë;if(Á.nav['isIE'])Á.getIESelection();var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var insText=Á.Â.Ê.substring(start,end);var pos_start=start;var pos_end=end;if (insText.Æ==0){Á.Â.Ê=Á.Â.Ê.substr(0,start)+Á.tabulation+Á.Â.Ê.substr(end);pos_start=start+Á.tabulation.Æ;pos_end=pos_start;}\nelse{start=Math.max(0,Á.Â.Ê.substr(0,start).lastIndexOf(\"\\n\")+1);endText=Á.Â.Ê.substr(end);startText=Á.Â.Ê.substr(0,start);tmp=Á.Â.Ê.substring(start,end).split(\"\\n\");insText=Á.tabulation+tmp.join(\"\\n\"+Á.tabulation);Á.Â.Ê=startText+insText+endText;pos_start=start;pos_end=Á.Â.Ê.indexOf(\"\\n\",startText.Æ+insText.Æ);if(pos_end==-1)pos_end=Á.Â.Ê.Æ;}Á.Â.selectionStart=pos_start;Á.Â.selectionEnd=pos_end;if(Á.nav['isIE']){Á.setIESelection();setTimeout(\"eA.is_tabbing=Ì;\",100);}\nelse Á.is_tabbing=Ì;};EA.Ä.invert_tab_selection=Ã(){if(Á.is_tabbing)return;Á.is_tabbing=Ë;if(Á.nav['isIE'])Á.getIESelection();var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var insText=Á.Â.Ê.substring(start,end);var pos_start=start;var pos_end=end;if (insText.Æ==0){if(Á.Â.Ê.substring(start-Á.tabulation.Æ,start)==Á.tabulation){Á.Â.Ê=Á.Â.Ê.substr(0,start-Á.tabulation.Æ)+Á.Â.Ê.substr(end);pos_start=Math.max(0,start-Á.tabulation.Æ);pos_end=pos_start;}}\nelse{start=Á.Â.Ê.substr(0,start).lastIndexOf(\"\\n\")+1;endText=Á.Â.Ê.substr(end);startText=Á.Â.Ê.substr(0,start);tmp=Á.Â.Ê.substring(start,end).split(\"\\n\");insText=\"\";for(i=0;i<tmp.Æ;i++){for(j=0;j<Á.tab_nb_char;j++){if(tmp[i].charAt(0)==\"\t\"){tmp[i]=tmp[i].substr(1);j=Á.tab_nb_char;}\nelse if(tmp[i].charAt(0)==\" \")tmp[i]=tmp[i].substr(1);}insText+=tmp[i];if(i<tmp.Æ-1)insText+=\"\\n\";}Á.Â.Ê=startText+insText+endText;pos_start=start;pos_end=Á.Â.Ê.indexOf(\"\\n\",startText.Æ+insText.Æ);if(pos_end==-1)pos_end=Á.Â.Ê.Æ;}Á.Â.selectionStart=pos_start;Á.Â.selectionEnd=pos_end;if(Á.nav['isIE']){Á.setIESelection();setTimeout(\"eA.is_tabbing=Ì;\",100);}\nelse Á.is_tabbing=Ì;};EA.Ä.press_enter=Ã(){if(!Á.smooth_selection)return Ì;if(Á.nav['isIE'])Á.getIESelection();var scrollTop=Á.result.scrollTop;var scrollLeft=Á.result.scrollLeft;var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var start_last_line=Math.max(0,Á.Â.Ê.substring(0,start).lastIndexOf(\"\\n\")+1 );var begin_line=Á.Â.Ê.substring(start_last_line,start).replace(/^([ \t]*).*/gm,\"$1\");if(begin_line==\"\\n\"||begin_line==\"\\r\"||begin_line.Æ==0)return Ì;if(Á.nav['isIE']||Á.nav['isOpera']){begin_line=\"\\r\\n\"+begin_line;}\nelse{begin_line=\"\\n\"+begin_line;}Á.Â.Ê=Á.Â.Ê.substring(0,start)+begin_line+Á.Â.Ê.substring(end);Á.area_select(start+begin_line.Æ ,0);if(Á.nav['isIE']){Á.result.scrollTop=scrollTop;Á.result.scrollLeft=scrollLeft;}return Ë;};EA.Ä.findEndBracket=Ã(infos,bracket){var start=infos[\"indexOfCursor\"];var normal_order=Ë;if(Á.assocBracket[bracket])endBracket=Á.assocBracket[bracket];\nelse if(Á.revertAssocBracket[bracket]){endBracket=Á.revertAssocBracket[bracket];normal_order=Ì;}var end=-1;var nbBracketOpen=0;for(var i=start;i<infos[\"full_text\"].Æ&&i>=0;){if(infos[\"full_text\"].charAt(i)==endBracket){nbBracketOpen--;if(nbBracketOpen<=0){end=i;break;}}\nelse if(infos[\"full_text\"].charAt(i)==bracket)nbBracketOpen++;if(normal_order)i++;\nelse i--;}if(end==-1)return Ì;var endLastLine=infos[\"full_text\"].substr(0,end).lastIndexOf(\"\\n\");if(endLastLine==-1)line=1;\nelse line=infos[\"full_text\"].substr(0,endLastLine).split(\"\\n\").Æ+1;var curPos=end-endLastLine;Á.displayToCursorPosition(\"end_bracket\",line,curPos,infos[\"full_text\"].substring(endLastLine +1,end));return Ë;};EA.Ä.displayToCursorPosition=Ã(id,start_line,cur_pos,lineContent,no_real_move){var elem=$(\"test_font_size\");var dest=$(id);var postLeft=0;elem.innerHTML=\"<pre><span id='test_font_size_inner'>\"+lineContent.substr(0,cur_pos).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\")+\"</span></pre>\";posLeft=45+$('test_font_size_inner').offsetWidth;var posTop=Á.lineHeight * (start_line-1);if(no_real_move!=Ë){dest.Ç.top=posTop+\"px\";dest.Ç.left=posLeft+\"px\";}dest.cursor_top=posTop;dest.cursor_left=posLeft;};EA.Ä.area_select=Ã(start,Æ){Á.Â.focus();start=Math.max(0,Math.min(Á.Â.Ê.Æ,start));end=Math.max(start,Math.min(Á.Â.Ê.Æ,start+Æ));if(Á.nav['isIE']){Á.Â.selectionStart=start;Á.Â.selectionEnd=end;Á.setIESelection();}\nelse{if(Á.nav['isOpera']){Á.Â.setSelectionRange(0,0);}Á.Â.setSelectionRange(start,end);}Á.check_line_selection();};EA.Ä.area_get_selection=Ã(){var text=\"\";if(document.selection ){var range=document.selection.createRange();text=range.text;}\nelse{text=Á.Â.Ê.substring(Á.Â.selectionStart,Á.Â.selectionEnd);}return text;}; EA.Ä.replace_tab=Ã(text){return text.replace(/((\\n?)([^\t\\n]*)\t)/gi,eA.smartTab);};EA.Ä.smartTab=Ã(){val=\"                   \";return EA.Ä.smartTab.arguments[2]+EA.Ä.smartTab.arguments[3]+val.substr(0,eA.tab_nb_char-(EA.Ä.smartTab.arguments[3].Æ)%eA.tab_nb_char);};EA.Ä.show_waiting_screen=Ã(){width=Á.editor_area.offsetWidth;height=Á.editor_area.offsetHeight;if(Á.nav['isGecko']||Á.nav['isOpera']||Á.nav['isIE']>=7){width-=2;height-=2;}Á.processing_screen.Ç.display=\"block\";Á.processing_screen.Ç.width=width+\"px\";Á.processing_screen.Ç.height=height+\"px\";Á.waiting_screen_displayed=Ë;};EA.Ä.hide_waiting_screen=Ã(){Á.processing_screen.Ç.display=\"none\";Á.waiting_screen_displayed=Ì;};EA.Ä.add_Ç=Ã(Çs){if(Çs.Æ>0){newcss=document.createElement(\"Ç\");newcss.type=\"text/css\";newcss.media=\"all\";document.getElementsByTagName(\"head\")[0].appendChild(newcss);cssrules=Çs.split(\"}\");newcss=document.ÇSheets[0];if(newcss.rules){for(i=cssrules.Æ-2;i>=0;i--){newrule=cssrules[i].split(\"{\");newcss.addRule(newrule[0],newrule[1])}}\nelse if(newcss.cssRules){for(i=cssrules.Æ-1;i>=0;i--){if(cssrules[i].indexOf(\"{\")!=-1){newcss.insertRule(cssrules[i]+\"}\",0);}}}}};EA.Ä.set_font=Ã(family,size){var elems=new Array(\"Â\",\"content_highlight\",\"cursor_pos\",\"end_bracket\",\"selection_field\",\"line_number\");if(family&&family!=\"\")Á.Å[\"font_family\"]=family;if(size&&size>0)Á.Å[\"font_size\"]=size;if(Á.nav['isOpera'])Á.Å['font_family']=\"monospace\";var elem_font=$(\"area_font_size\");if(elem_font){for(var i=0;i<elem_font.Æ;i++){if(elem_font.options[i].Ê&&elem_font.options[i].Ê==Á.Å[\"font_size\"])elem_font.options[i].selected=Ë;}}elem=$(\"test_font_size\");elem.Ç.fontFamily=\"\"+Á.Å[\"font_family\"];elem.Ç.fontSize=Á.Å[\"font_size\"]+\"pt\";elem.innerHTML=\"0\";Á.lineHeight=elem.offsetHeight;for(var i=0;i<elems.Æ;i++){var elem=$(elems[i]);elem.Ç.fontFamily=Á.Å[\"font_family\"];elem.Ç.fontSize=Á.Å[\"font_size\"]+\"pt\";elem.Ç.lineHeight=Á.lineHeight+\"px\";}if(Á.nav['isOpera']){var start=Á.Â.selectionStart;var end=Á.Â.selectionEnd;var parNod=Á.Â.ÈNode,nxtSib=Á.Â.nextSibling;parNod.removeChild(Á.Â);parNod.insertBefore(Á.Â,nxtSib);Á.area_select(start,end-start);}Á.add_Ç(\"pre{font-family:\"+Á.Å[\"font_family\"]+\"}\");Á.last_line_selected=-1;Á.É=new Array();Á.resync_highlight();};EA.Ä.change_font_size=Ã(){var size=$(\"area_font_size\").Ê;if(size>0)Á.set_font(\"\",size);};EA.Ä.open_inline_popup=Ã(popup_id){Á.close_all_inline_popup();var popup=$(popup_id);var editor=$(\"editor\");for(var i=0;i<Á.inlinePopup.Æ;i++){if(Á.inlinePopup[i][\"popup_id\"]==popup_id){var icon=$(Á.inlinePopup[i][\"icon_id\"]);if(icon){Á.switchClassSticky(icon,'editAreaButtonSelected',Ë);break;}}}popup.Ç.height=\"auto\";popup.Ç.overflow=\"visible\";if(document.body.offsetHeight< popup.offsetHeight){popup.Ç.height=(document.body.offsetHeight-10)+\"px\";popup.Ç.overflow=\"auto\";}if(!popup.positionned){var new_left=editor.offsetWidth /2-popup.offsetWidth /2;var new_top=editor.offsetHeight /2-popup.offsetHeight /2;popup.Ç.left=new_left+\"px\";popup.Ç.top=new_top+\"px\";popup.positionned=Ë;}popup.Ç.visibility=\"visible\";};EA.Ä.close_inline_popup=Ã(popup_id){var popup=$(popup_id);for(var i=0;i<Á.inlinePopup.Æ;i++){if(Á.inlinePopup[i][\"popup_id\"]==popup_id){var icon=$(Á.inlinePopup[i][\"icon_id\"]);if(icon){Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);break;}}}popup.Ç.visibility=\"hidden\";};EA.Ä.close_all_inline_popup=Ã(e){for(var i=0;i<Á.inlinePopup.Æ;i++){Á.close_inline_popup(Á.inlinePopup[i][\"popup_id\"]);}Á.Â.focus();};EA.Ä.show_help=Ã(){Á.open_inline_popup(\"edit_area_help\");};EA.Ä.new_document=Ã(){Á.Â.Ê=\"\";Á.area_select(0,0);};EA.Ä.get_all_toolbar_height=Ã(){var area=$(\"editor\");var results=È.getChildren(area,\"div\",\"class\",\"area_toolbar\",\"all\",\"0\");var height=0;for(var i=0;i<results.Æ;i++){height+=results[i].offsetHeight;}return height;};EA.Ä.go_to_line=Ã(line){if(!line){var icon=$(\"go_to_line\");if(icon !=null){Á.restoreClass(icon);Á.switchClassSticky(icon,'editAreaButtonSelected',Ë);}line=prompt(Á.get_translation(\"go_to_line_prompt\"));if(icon !=null)Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);}if(line&&line!=null&&line.search(/^[0-9]+$/)!=-1){var start=0;var lines=Á.Â.Ê.split(\"\\n\");if(line > lines.Æ)start=Á.Â.Ê.Æ;\nelse{for(var i=0;i<Math.min(line-1,lines.Æ);i++)start+=lines[i].Æ+1;}Á.area_select(start,0);}};EA.Ä.change_smooth_selection_mode=Ã(setTo){if(Á.do_highlight)return;if(setTo !=null){if(setTo ===Ì)Á.smooth_selection=Ë;\nelse Á.smooth_selection=Ì;}var icon=$(\"change_smooth_selection\");Á.Â.focus();if(Á.smooth_selection===Ë){Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);Á.smooth_selection=Ì;$(\"selection_field\").Ç.display=\"none\";$(\"cursor_pos\").Ç.display=\"none\";$(\"end_bracket\").Ç.display=\"none\";}\nelse{Á.switchClassSticky(icon,'editAreaButtonSelected',Ì);Á.smooth_selection=Ë;$(\"selection_field\").Ç.display=\"block\";$(\"cursor_pos\").Ç.display=\"block\";$(\"end_bracket\").Ç.display=\"block\";}};EA.Ä.scroll_to_view=Ã(show){if(!Á.smooth_selection)return;var zone=$(\"result\");var cursor_pos_top=$(\"cursor_pos\").cursor_top;if(show==\"bottom\")cursor_pos_top+=(Á.É[\"line_nb\"]-1)* Á.lineHeight;var max_height_visible=zone.clientHeight+zone.scrollTop;var miss_top=cursor_pos_top+Á.lineHeight-max_height_visible;if(miss_top>0){zone.scrollTop=zone.scrollTop+miss_top;}\nelse if(zone.scrollTop > cursor_pos_top){zone.scrollTop=cursor_pos_top;}var cursor_pos_left=$(\"cursor_pos\").cursor_left;var max_width_visible=zone.clientWidth+zone.scrollLeft;var miss_left=cursor_pos_left+10-max_width_visible;if(miss_left>0){zone.scrollLeft=zone.scrollLeft+miss_left+50;}\nelse if(zone.scrollLeft > cursor_pos_left){zone.scrollLeft=cursor_pos_left;}\nelse if(zone.scrollLeft==45){zone.scrollLeft=0;}};EA.Ä.check_undo=Ã(only_once){if(!eAs[Á.id])return Ì;if(Á.ÂFocused&&eAs[Á.id][\"displayed\"]==Ë){var text=Á.Â.Ê;if(Á.previous.Æ<=1)Á.switchClassSticky($(\"undo\"),'editAreaButtonDisabled',Ë);if(!Á.previous[Á.previous.Æ-1]||Á.previous[Á.previous.Æ-1][\"text\"] !=text){Á.previous.push({\"text\":text,\"selStart\":Á.Â.selectionStart,\"selEnd\":Á.Â.selectionEnd});if(Á.previous.Æ > Á.Å[\"max_undo\"]+1)Á.previous.shift();}if(Á.previous.Æ >=2)Á.switchClassSticky($(\"undo\"),'editAreaButtonNormal',Ì);}if(!only_once)setTimeout(\"eA.check_undo()\",3000);};EA.Ä.undo=Ã(){if(Á.previous.Æ > 0){if(Á.nav['isIE'])Á.getIESelection();Á.next.push({\"text\":Á.Â.Ê,\"selStart\":Á.Â.selectionStart,\"selEnd\":Á.Â.selectionEnd});var prev=Á.previous.pop();if(prev[\"text\"]==Á.Â.Ê&&Á.previous.Æ > 0)prev=Á.previous.pop();Á.Â.Ê=prev[\"text\"];Á.last_undo=prev[\"text\"];Á.area_select(prev[\"selStart\"],prev[\"selEnd\"]-prev[\"selStart\"]);Á.switchClassSticky($(\"redo\"),'editAreaButtonNormal',Ì);Á.resync_highlight(Ë);Á.check_file_changes();}};EA.Ä.redo=Ã(){if(Á.next.Æ > 0){var next=Á.next.pop();Á.previous.push(next);Á.Â.Ê=next[\"text\"];Á.last_undo=next[\"text\"];Á.area_select(next[\"selStart\"],next[\"selEnd\"]-next[\"selStart\"]);Á.switchClassSticky($(\"undo\"),'editAreaButtonNormal',Ì);Á.resync_highlight(Ë);Á.check_file_changes();}if(Á.next.Æ==0)Á.switchClassSticky($(\"redo\"),'editAreaButtonDisabled',Ë);};EA.Ä.check_redo=Ã(){if(eA.next.Æ==0||eA.Â.Ê!=eA.last_undo){eA.next=new Array();eA.switchClassSticky($(\"redo\"),'editAreaButtonDisabled',Ë);}\nelse{Á.switchClassSticky($(\"redo\"),'editAreaButtonNormal',Ì);}};EA.Ä.switchClass=Ã(element,class_name,lock_state){var lockChanged=Ì;if (typeof(lock_state)!=\"undefined\"&&element !=null){element.classLock=lock_state;lockChanged=Ë;}if (element !=null&&(lockChanged||!element.classLock)){element.oldClassName=element.className;element.className=class_name;}};EA.Ä.restoreAndSwitchClass=Ã(element,class_name){if (element !=null&&!element.classLock){Á.restoreClass(element);Á.switchClass(element,class_name);}};EA.Ä.restoreClass=Ã(element){if (element !=null&&element.oldClassName&&!element.classLock){element.className=element.oldClassName;element.oldClassName=null;}};EA.Ä.setClassLock=Ã(element,lock_state){if (element !=null)element.classLock=lock_state;};EA.Ä.switchClassSticky=Ã(element,class_name,lock_state){var lockChanged=Ì;if (typeof(lock_state)!=\"undefined\"&&element !=null){element.classLock=lock_state;lockChanged=Ë;}if (element !=null&&(lockChanged||!element.classLock)){element.className=class_name;element.oldClassName=class_name;}};EA.Ä.scroll_page=Ã(params){var dir=params[\"dir\"];var shift_pressed=params[\"shift\"];screen_height=$(\"result\").clientHeight;var lines=Á.Â.Ê.split(\"\\n\");var new_pos=0;var Æ=0;var char_left=0;var line_nb=0;if(dir==\"up\"){var scroll_line=Math.ceil((screen_height -30)/Á.lineHeight);if(Á.É[\"selec_direction\"]==\"up\"){for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]-scroll_line,lines.Æ);line_nb++){new_pos+=lines[line_nb].Æ+1;}char_left=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]-1);if(shift_pressed)Æ=Á.É[\"selectionEnd\"]-new_pos-char_left;Á.area_select(new_pos+char_left,Æ);view=\"top\";}\nelse{view=\"bottom\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+Á.É[\"line_nb\"]-1-scroll_line,lines.Æ);line_nb++){new_pos+=lines[line_nb].Æ+1;}char_left=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]-1);if(shift_pressed){start=Math.min(Á.É[\"selectionStart\"],new_pos+char_left);Æ=Math.max(new_pos+char_left,Á.É[\"selectionStart\"] )-start;if(new_pos+char_left < Á.É[\"selectionStart\"])view=\"top\";}\nelse start=new_pos+char_left;Á.area_select(start,Æ);}}\nelse{var scroll_line=Math.floor((screen_height-30)/Á.lineHeight);if(Á.É[\"selec_direction\"]==\"down\"){view=\"bottom\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+Á.É[\"line_nb\"]-2+scroll_line,lines.Æ);line_nb++){if(line_nb==Á.É[\"line_start\"]-1)char_left=Á.É[\"selectionStart\"] -new_pos;new_pos+=lines[line_nb].Æ+1;}if(shift_pressed){Æ=Math.abs(Á.É[\"selectionStart\"]-new_pos);Æ+=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"]);Á.area_select(Math.min(Á.É[\"selectionStart\"],new_pos),Æ);}\nelse{Á.area_select(new_pos+char_left,0);}}\nelse{view=\"top\";for(line_nb=0;line_nb< Math.min(Á.É[\"line_start\"]+scroll_line-1,lines.Æ,lines.Æ);line_nb++){if(line_nb==Á.É[\"line_start\"]-1)char_left=Á.É[\"selectionStart\"] -new_pos;new_pos+=lines[line_nb].Æ+1;}if(shift_pressed){Æ=Math.abs(Á.É[\"selectionEnd\"]-new_pos-char_left);Æ+=Math.min(lines[Math.min(lines.Æ-1,line_nb)].Æ,Á.É[\"curr_pos\"])-char_left-1;Á.area_select(Math.min(Á.É[\"selectionEnd\"],new_pos+char_left),Æ);if(new_pos+char_left > Á.É[\"selectionEnd\"])view=\"bottom\";}\nelse{Á.area_select(new_pos+char_left,0);}}}Á.check_line_selection();Á.scroll_to_view(view);};EA.Ä.start_resize=Ã(e){È.eAL.resize[\"id\"]=eA.id;È.eAL.resize[\"start_x\"]=(e)? e.pageX:event.x+document.body.scrollLeft;È.eAL.resize[\"start_y\"]=(e)? e.pageY:event.y+document.body.scrollTop;if(eA.nav['isIE']){eA.Â.focus();eA.getIESelection();}È.eAL.resize[\"selectionStart\"]=eA.Â.selectionStart;È.eAL.resize[\"selectionEnd\"]=eA.Â.selectionEnd;È.eAL.start_resize_area();};EA.Ä.toggle_full_screen=Ã(to){if(typeof(to)==\"undefined\")to=!Á.fullscreen['isFull'];var old=Á.fullscreen['isFull'];Á.fullscreen['isFull']=to;var icon=$(\"fullscreen\");if(to&&to!=old){var selStart=Á.Â.selectionStart;var selEnd=Á.Â.selectionEnd;var html=È.document.getElementsByTagName(\"html\")[0];var frame=È.document.getElementById(\"frame_\"+Á.id);Á.fullscreen['old_overflow']=È.get_css_property(html,\"overflow\");Á.fullscreen['old_height']=È.get_css_property(html,\"height\");Á.fullscreen['old_width']=È.get_css_property(html,\"width\");Á.fullscreen['old_scrollTop']=html.scrollTop;Á.fullscreen['old_scrollLeft']=html.scrollLeft;Á.fullscreen['old_zIndex']=È.get_css_property(frame,\"z-index\");if(Á.nav['isOpera']){html.Ç.height=\"100%\";html.Ç.width=\"100%\";}html.Ç.overflow=\"hidden\";html.scrollTop=0;html.scrollLeft=0;frame.Ç.position=\"absolute\";frame.Ç.width=html.clientWidth+\"px\";frame.Ç.height=html.clientHeight+\"px\";frame.Ç.display=\"block\";frame.Ç.zIndex=\"999999\";frame.Ç.top=\"0px\";frame.Ç.left=\"0px\";frame.Ç.top=\"-\"+È.calculeOffsetTop(frame)+\"px\";frame.Ç.left=\"-\"+È.calculeOffsetLeft(frame)+\"px\";Á.switchClassSticky(icon,'editAreaButtonSelected',Ì);Á.fullscreen['allow_resize']=Á.resize_allowed;Á.allow_resize(Ì);if(Á.nav['isFirefox']){È.eAL.execCommand(Á.id,\"update_size();\");Á.area_select(selStart,selEnd-selStart);Á.scroll_to_view();Á.focus();}\nelse{setTimeout(\"È.eAL.execCommand('\"+Á.id +\"','update_size();');eA.focus();\",10);}}\nelse if(to!=old){var selStart=Á.Â.selectionStart;var selEnd=Á.Â.selectionEnd;var frame=È.document.getElementById(\"frame_\"+Á.id);frame.Ç.position=\"static\";frame.Ç.zIndex=Á.fullscreen['old_zIndex'];var html=È.document.getElementsByTagName(\"html\")[0];if(Á.nav['isOpera']){html.Ç.height=\"auto\";html.Ç.width=\"auto\";html.Ç.overflow=\"auto\";}\nelse if(Á.nav['isIE']&&È!=top){html.Ç.overflow=\"auto\";}\nelse html.Ç.overflow=Á.fullscreen['old_overflow'];html.scrollTop=Á.fullscreen['old_scrollTop'];html.scrollTop=Á.fullscreen['old_scrollLeft'];È.eAL.hide(Á.id);È.eAL.show(Á.id);Á.switchClassSticky(icon,'editAreaButtonNormal',Ì);if(Á.fullscreen['allow_resize'])Á.allow_resize(Á.fullscreen['allow_resize']);if(Á.nav['isFirefox']){Á.area_select(selStart,selEnd-selStart);setTimeout(\"eA.scroll_to_view();\",10);}}};EA.Ä.allow_resize=Ã(allow){var resize=$(\"resize_area\");if(allow){resize.Ç.visibility=\"visible\";È.eAL.add_event(resize,\"mouseup\",eA.start_resize);}\nelse{resize.Ç.visibility=\"hidden\";È.eAL.remove_event(resize,\"mouseup\",eA.start_resize);}Á.resize_allowed=allow;};EA.Ä.change_syntax=Ã(new_syntax,is_waiting){if(new_syntax==Á.Å['syntax'])return Ë;var founded=Ì;for(var i=0;i<Á.syntax_list.Æ;i++){if(Á.syntax_list[i]==new_syntax)founded=Ë;}if(founded==Ë){if(!È.eAL.load_syntax[new_syntax]){if(!is_waiting)È.eAL.load_script(È.eAL.baseURL+\"reg_syntax/\"+new_syntax+\".js\");setTimeout(\"eA.change_syntax('\"+new_syntax +\"',Ë);\",100);Á.show_waiting_screen();}\nelse{if(!Á.allready_used_syntax[new_syntax]){È.eAL.init_syntax_regexp();Á.add_Ç(È.eAL.syntax[new_syntax][\"Çs\"]);Á.allready_used_syntax[new_syntax]=Ë;}var sel=$(\"syntax_selection\");if(sel&&sel.Ê!=new_syntax){for(var i=0;i<sel.Æ;i++){if(sel.options[i].Ê&&sel.options[i].Ê==new_syntax)sel.options[i].selected=Ë;}}Á.Å['syntax']=new_syntax;Á.resync_highlight(Ë);Á.hide_waiting_screen();return Ë;}}return Ì;};EA.Ä.set_editable=Ã(is_editable){if(is_editable){document.body.className=\"\";Á.Â.readOnly=Ì;Á.is_editable=Ë;}\nelse{document.body.className=\"non_editable\";Á.Â.readOnly=Ë;Á.is_editable=Ì;}if(eAs[Á.id][\"displayed\"]==Ë)Á.update_size();};EA.Ä.set_wrap_text=Ã(to){Á.Å['wrap_text']=to;if(Á.Å['wrap_text']){wrap_mode='soft';Á.container.className+=' wrap_text';}\nelse{wrap_mode='off';Á.container.className=Á.container.className.replace(/ wrap_text/g,'');}var t=Á.Â;t.wrap=wrap_mode;t.setAttribute('wrap',wrap_mode);if(!Á.nav['isIE']){var start=t.selectionStart,end=t.selectionEnd;var parNod=t.ÈNode,nxtSib=t.nextSibling;parNod.removeChild(t);parNod.insertBefore(t,nxtSib);Á.area_select(start,end-start);}};EA.Ä.open_file=Ã(Å){if(Å['id']!=\"undefined\"){var id=Å['id'];var new_file=new Object();new_file['id']=id;new_file['title']=id;new_file['text']=\"\";new_file['É']=\"\";new_file['last_text_to_highlight']=\"\";new_file['last_hightlighted_text']=\"\";new_file['previous']=new Array();new_file['next']=new Array();new_file['last_undo']=\"\";new_file['smooth_selection']=Á.Å['smooth_selection'];new_file['do_highlight']=Á.Å['start_highlight'];new_file['syntax']=Á.Å['syntax'];new_file['scroll_top']=0;new_file['scroll_left']=0;new_file['selection_start']=0;new_file['selection_end']=0;new_file['edited']=Ì;new_file['font_size']=Á.Å[\"font_size\"];new_file['font_family']=Á.Å[\"font_family\"];new_file['toolbar']={'links':{},'selects':{}};new_file['compare_edited_text']=new_file['text'];Á.files[id]=new_file;Á.update_file(id,Å);Á.files[id]['compare_edited_text']=Á.files[id]['text'];var html_id='tab_file_'+encodeURIComponent(id);Á.filesIdAssoc[html_id]=id;Á.files[id]['html_id']=html_id;if(!$(Á.files[id]['html_id'])&&id!=\"\"){Á.tab_browsing_area.Ç.display=\"block\";var elem=document.createElement('li');elem.id=Á.files[id]['html_id'];var close=\"<img src=\\\"\"+È.eAL.baseURL +\"images/close.gif\\\" title=\\\"\"+Á.get_translation('close_tab','word')+\"\\\" onclick=\\\"eA.execCommand('close_file',eA.filesIdAssoc['\"+html_id +\"']);return Ì;\\\" class=\\\"hidden\\\" onmouseover=\\\"Á.className=''\\\" onmouseout=\\\"Á.className='hidden'\\\" />\";elem.innerHTML=\"<a onclick=\\\"javascript:eA.execCommand('switch_to_file',eA.filesIdAssoc['\"+html_id +\"']);\\\" selec=\\\"none\\\"><b><span><strong class=\\\"edited\\\">*</strong>\"+Á.files[id]['title']+close +\"</span></b></a>\";$('tab_browsing_list').appendChild(elem);var elem=document.createElement('text');Á.update_size();}if(id!=\"\")Á.execCommand('file_open',Á.files[id]);Á.switch_to_file(id,Ë);return Ë;}\nelse return Ì;};EA.Ä.close_file=Ã(id){if(Á.files[id]){Á.save_file(id);if(Á.execCommand('file_close',Á.files[id])!==Ì){var li=$(Á.files[id]['html_id']);li.ÈNode.removeChild(li);if(id==Á.curr_file){var next_file=\"\";var is_next=Ì;for(var i in Á.files){if(is_next){next_file=i;break;}\nelse if(i==id)is_next=Ë;\nelse next_file=i;}Á.switch_to_file(next_file);}delete (Á.files[id]);Á.update_size();}}};EA.Ä.save_file=Ã(id){if(Á.files[id]){var save=Á.files[id];save['É']=Á.É;save['last_text_to_highlight']=Á.last_text_to_highlight;save['last_hightlighted_text']=Á.last_hightlighted_text;save['previous']=Á.previous;save['next']=Á.next;save['last_undo']=Á.last_undo;save['smooth_selection']=Á.smooth_selection;save['do_highlight']=Á.do_highlight;save['syntax']=Á.Å['syntax'];save['text']=Á.Â.Ê;save['scroll_top']=Á.result.scrollTop;save['scroll_left']=Á.result.scrollLeft;save['selection_start']=Á.É[\"selectionStart\"];save['selection_end']=Á.É[\"selectionEnd\"];save['font_size']=Á.Å[\"font_size\"];save['font_family']=Á.Å[\"font_family\"];save['toolbar']={'links':{},'selects':{}};var links=$(\"toolbar_1\").getElementsByTagName(\"a\");for(var i=0;i<links.Æ;i++){if(links[i].getAttribute('fileSpecific')=='yes'){var save_butt=new Object();var img=links[i].getElementsByTagName('img')[0];save_butt['classLock']=img.classLock;save_butt['className']=img.className;save_butt['oldClassName']=img.oldClassName;save['toolbar']['links'][links[i].id]=save_butt;}}var selects=$(\"toolbar_1\").getElementsByTagName(\"select\");for(var i=0;i<selects.Æ;i++){if(selects[i].getAttribute('fileSpecific')=='yes'){save['toolbar']['selects'][selects[i].id]=selects[i].Ê;}}Á.files[id]=save;return save;}\nelse return Ì;};EA.Ä.update_file=Ã(id,new_Ês){for(var i in new_Ês){Á.files[id][i]=new_Ês[i];}};EA.Ä.display_file=Ã(id){if(id==''){Á.Â.readOnly=Ë;Á.tab_browsing_area.Ç.display=\"none\";$(\"no_file_selected\").Ç.display=\"block\";Á.result.className=\"empty\";if(!Á.files[''])Á.open_file({id:''});}\nelse{Á.result.className=\"\";Á.Â.readOnly=!Á.is_editable;$(\"no_file_selected\").Ç.display=\"none\";Á.tab_browsing_area.Ç.display=\"block\";}Á.check_redo(Ë);Á.check_undo(Ë);Á.curr_file=id;var lis=Á.tab_browsing_area.getElementsByTagName('li');for(var i=0;i<lis.Æ;i++){if(lis[i].id==Á.files[id]['html_id'])lis[i].className='selected';\nelse lis[i].className='';}var new_file=Á.files[id];Á.Â.Ê=new_file['text'];Á.set_font(new_file['font_family'],new_file['font_size']);Á.area_select(new_file['É']['selection_start'],new_file['É']['selection_end']-new_file['É']['selection_start']);Á.manage_size(Ë);Á.result.scrollTop=new_file['scroll_top'];Á.result.scrollLeft=new_file['scroll_left'];Á.previous=new_file['previous'];Á.next=new_file['next'];Á.last_undo=new_file['last_undo'];Á.check_redo(Ë);Á.check_undo(Ë);Á.execCommand(\"change_highlight\",new_file['do_highlight']);Á.execCommand(\"change_syntax\",new_file['syntax']);Á.execCommand(\"change_smooth_selection_mode\",new_file['smooth_selection']);var links=new_file['toolbar']['links'];for(var i in links){if(img=$(i).getElementsByTagName('img')[0]){var save_butt=new Object();img.classLock=links[i]['classLock'];img.className=links[i]['className'];img.oldClassName=links[i]['oldClassName'];}}var selects=new_file['toolbar']['selects'];for(var i in selects){var options=$(i).options;for(var j=0;j<options.Æ;j++){if(options[j].Ê==selects[i])$(i).options[j].selected=Ë;}}};EA.Ä.switch_to_file=Ã(file_to_show,force_refresh){if(file_to_show!=Á.curr_file||force_refresh){Á.save_file(Á.curr_file);if(Á.curr_file!='')Á.execCommand('file_switch_off',Á.files[Á.curr_file]);Á.display_file(file_to_show);if(file_to_show!='')Á.execCommand('file_switch_on',Á.files[file_to_show]);}};EA.Ä.get_file=Ã(id){if(id==Á.curr_file)Á.save_file(id);return Á.files[id];};EA.Ä.get_all_files=Ã(){tmp_files=Á.files;Á.save_file(Á.curr_file);if(tmp_files[''])delete(Á.files['']);return tmp_files;};EA.Ä.check_file_changes=Ã(){var id=Á.curr_file;if(Á.files[id]&&Á.files[id]['compare_edited_text']!=undefined){if(Á.files[id]['compare_edited_text'].Æ==Á.Â.Ê.Æ&&Á.files[id]['compare_edited_text']==Á.Â.Ê){if(Á.files[id]['edited']!=Ì)Á.set_file_edited_mode(id,Ì);}\nelse{if(Á.files[id]['edited']!=Ë)Á.set_file_edited_mode(id,Ë);}}};EA.Ä.set_file_edited_mode=Ã(id,to){if(Á.files[id]&&$(Á.files[id]['html_id'])){var link=$(Á.files[id]['html_id']).getElementsByTagName('a')[0];if(to==Ë){link.className='edited';}\nelse{link.className='';if(id==Á.curr_file)text=Á.Â.Ê;\nelse text=Á.files[id]['text'];Á.files[id]['compare_edited_text']=text;}Á.files[id]['edited']=to;}};var EA_keys={8:\"Retour arriere\",9:\"Tabulation\",12:\"Milieu (pave numerique)\",13:\"Entrer\",16:\"Shift\",17:\"Ctrl\",18:\"Alt\",19:\"Pause\",20:\"Verr Maj\",27:\"Esc\",32:\"Espace\",33:\"Page up\",34:\"Page down\",35:\"End\",36:\"Begin\",37:\"Fleche gauche\",38:\"Fleche haut\",39:\"Fleche droite\",40:\"Fleche bas\",44:\"Impr ecran\",45:\"Inser\",46:\"Suppr\",91:\"Menu Demarrer Windows / touche pomme Mac\",92:\"Menu Demarrer Windows\",93:\"Menu contextuel Windows\",112:\"F1\",113:\"F2\",114:\"F3\",115:\"F4\",116:\"F5\",117:\"F6\",118:\"F7\",119:\"F8\",120:\"F9\",121:\"F10\",122:\"F11\",123:\"F12\",144:\"Verr Num\",145:\"Arret defil\"};Ã keyDown(e){if(!e){e=event;}for(var i in eA.plugins){if(typeof(eA.plugins[i].onkeydown)==\"Ã\"){if(eA.plugins[i].onkeydown(e)===Ì){if(eA.nav['isIE'])e.keyCode=0;return Ì;}}}var target_id=(e.target||e.srcElement).id;var use=Ì;if (EA_keys[e.keyCode])letter=EA_keys[e.keyCode];\nelse letter=String.fromCharCode(e.keyCode);var low_letter=letter.toLowerCase();if(letter==\"Page up\"&&!eA.nav['isOpera']){eA.execCommand(\"scroll_page\",{\"dir\":\"up\",\"shift\":ShiftPressed(e)});use=Ë;}\nelse if(letter==\"Page down\"&&!eA.nav['isOpera']){eA.execCommand(\"scroll_page\",{\"dir\":\"down\",\"shift\":ShiftPressed(e)});use=Ë;}\nelse if(eA.is_editable==Ì){return Ë;}\nelse if(letter==\"Tabulation\"&&target_id==\"Â\"&&!CtrlPressed(e)&&!AltPressed(e)){if(ShiftPressed(e))eA.execCommand(\"invert_tab_selection\");\nelse eA.execCommand(\"tab_selection\");use=Ë;if(eA.nav['isOpera']||(eA.nav['isFirefox']&&eA.nav['isMacOS']))setTimeout(\"eA.execCommand('focus');\",1);}\nelse if(letter==\"Entrer\"&&target_id==\"Â\"){if(eA.press_enter())use=Ë;}\nelse if(letter==\"Entrer\"&&target_id==\"area_search\"){eA.execCommand(\"area_search\");use=Ë;}\nelse  if(letter==\"Esc\"){eA.execCommand(\"close_all_inline_popup\",e);use=Ë;}\nelse if(CtrlPressed(e)&&!AltPressed(e)&&!ShiftPressed(e)){switch(low_letter){case \"f\":eA.execCommand(\"area_search\");use=Ë;break;case \"r\":eA.execCommand(\"area_replace\");use=Ë;break;case \"q\":eA.execCommand(\"close_all_inline_popup\",e);use=Ë;break;case \"h\":eA.execCommand(\"change_highlight\");use=Ë;break;case \"g\":setTimeout(\"eA.execCommand('go_to_line');\",5);use=Ë;break;case \"e\":eA.execCommand(\"show_help\");use=Ë;break;case \"z\":use=Ë;eA.execCommand(\"undo\");break;case \"y\":use=Ë;eA.execCommand(\"redo\");break;default:break;}}if(eA.next.Æ > 0){setTimeout(\"eA.check_redo();\",10);}setTimeout(\"eA.check_file_changes();\",10);if(use){if(eA.nav['isIE'])e.keyCode=0;return Ì;}return Ë;};Ã AltPressed(e){if (window.event){return (window.event.altKey);}\nelse{if(e.modifiers)return (e.altKey||(e.modifiers % 2));\nelse return e.altKey;}};Ã CtrlPressed(e){if (window.event){return (window.event.ctrlKey);}\nelse{return (e.ctrlKey||(e.modifiers==2)||(e.modifiers==3)||(e.modifiers>5));}};Ã ShiftPressed(e){if (window.event){return (window.event.shiftKey);}\nelse{return (e.shiftKey||(e.modifiers>3));}};	EA.Ä.show_search=Ã(){if($(\"area_search_replace\").Ç.visibility==\"visible\"){Á.hidden_search();}\nelse{Á.open_inline_popup(\"area_search_replace\");var text=Á.area_get_selection();var search=text.split(\"\\n\")[0];$(\"area_search\").Ê=search;$(\"area_search\").focus();}};EA.Ä.hidden_search=Ã(){Á.close_inline_popup(\"area_search_replace\");};EA.Ä.area_search=Ã(mode){if(!mode)mode=\"search\";$(\"area_search_msg\").innerHTML=\"\";var search=$(\"area_search\").Ê;Á.Â.focus();Á.Â.ÂFocused=Ë;var infos=Á.get_selection_infos();var start=infos[\"selectionStart\"];var pos=-1;var pos_begin=-1;var Æ=search.Æ;if($(\"area_search_replace\").Ç.visibility!=\"visible\"){Á.show_search();return;}if(search.Æ==0){$(\"area_search_msg\").innerHTML=Á.get_translation(\"search_field_empty\");return;}if(mode!=\"replace\" ){if($(\"area_search_reg_exp\").checked)start++;\nelse start+=search.Æ;}if($(\"area_search_reg_exp\").checked){var opt=\"m\";if(!$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);pos=infos[\"full_text\"].substr(start).search(reg);pos_begin=infos[\"full_text\"].search(reg);if(pos!=-1){pos+=start;Æ=infos[\"full_text\"].substr(start).match(reg)[0].Æ;}\nelse if(pos_begin!=-1){Æ=infos[\"full_text\"].match(reg)[0].Æ;}}\nelse{if($(\"area_search_match_case\").checked){pos=infos[\"full_text\"].indexOf(search,start);pos_begin=infos[\"full_text\"].indexOf(search);}\nelse{pos=infos[\"full_text\"].toLowerCase().indexOf(search.toLowerCase(),start);pos_begin=infos[\"full_text\"].toLowerCase().indexOf(search.toLowerCase());}}if(pos==-1&&pos_begin==-1){$(\"area_search_msg\").innerHTML=\"<strong>\"+search+\"</strong> \"+Á.get_translation(\"not_found\");return;}\nelse if(pos==-1&&pos_begin !=-1){begin=pos_begin;$(\"area_search_msg\").innerHTML=Á.get_translation(\"restart_search_at_begin\");}\nelse begin=pos;if(mode==\"replace\"&&pos==infos[\"indexOfCursor\"]){var replace=$(\"area_replace\").Ê;var new_text=\"\";if($(\"area_search_reg_exp\").checked){var opt=\"m\";if(!$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);new_text=infos[\"full_text\"].substr(0,begin)+infos[\"full_text\"].substr(start).replace(reg,replace);}\nelse{new_text=infos[\"full_text\"].substr(0,begin)+replace+infos[\"full_text\"].substr(begin+Æ);}Á.Â.Ê=new_text;Á.area_select(begin,Æ);Á.area_search();}\nelse Á.area_select(begin,Æ);};EA.Ä.area_replace=Ã(){Á.area_search(\"replace\");};EA.Ä.area_replace_all=Ã(){var base_text=Á.Â.Ê;var search=$(\"area_search\").Ê;var replace=$(\"area_replace\").Ê;if(search.Æ==0){$(\"area_search_msg\").innerHTML=Á.get_translation(\"search_field_empty\");return;}var new_text=\"\";var nb_change=0;if($(\"area_search_reg_exp\").checked){var opt=\"mg\";if(!$(\"area_search_match_case\").checked)opt+=\"i\";var reg=new RegExp(search,opt);nb_change=infos[\"full_text\"].match(reg).Æ;new_text=infos[\"full_text\"].replace(reg,replace);}\nelse{if($(\"area_search_match_case\").checked){var tmp_tab=base_text.split(search);nb_change=tmp_tab.Æ -1;new_text=tmp_tab.join(replace);}\nelse{var lower_Ê=base_text.toLowerCase();var lower_search=search.toLowerCase();var start=0;var pos=lower_Ê.indexOf(lower_search);while(pos!=-1){nb_change++;new_text+=Á.Â.Ê.substring(start,pos)+replace;start=pos+search.Æ;pos=lower_Ê.indexOf(lower_search,pos+1);}new_text+=Á.Â.Ê.substring(start);}}if(new_text==base_text){$(\"area_search_msg\").innerHTML=\"<strong>\"+search+\"</strong> \"+Á.get_translation(\"not_found\");}\nelse{Á.Â.Ê=new_text;$(\"area_search_msg\").innerHTML=\"<strong>\"+nb_change+\"</strong> \"+Á.get_translation(\"occurrence_replaced\");setTimeout(\"eA.Â.focus();eA.Â.ÂFocused=Ë;\",100);}}; EA.Ä.change_highlight=Ã(change_to){if(Á.Å[\"syntax\"].Æ==0&&change_to==Ì){Á.switchClassSticky($(\"highlight\"),'editAreaButtonDisabled',Ë);Á.switchClassSticky($(\"reset_highlight\"),'editAreaButtonDisabled',Ë);return Ì;}if(Á.do_highlight==change_to)return Ì;if(Á.nav['isIE'])Á.getIESelection();var pos_start=Á.Â.selectionStart;var pos_end=Á.Â.selectionEnd;if(Á.do_highlight===Ë||change_to==Ì)Á.disable_highlight();\nelse Á.enable_highlight();Á.Â.focus();Á.Â.selectionStart=pos_start;Á.Â.selectionEnd=pos_end;if(Á.nav['isIE'])Á.setIESelection();};EA.Ä.disable_highlight=Ã(displayOnly){$(\"selection_field\").innerHTML=\"\";Á.content_highlight.Ç.visibility=\"hidden\";var new_Obj=Á.content_highlight.cloneNode(Ì);new_Obj.innerHTML=\"\";Á.content_highlight.ÈNode.insertBefore(new_Obj,Á.content_highlight);Á.content_highlight.ÈNode.removeChild(Á.content_highlight);Á.content_highlight=new_Obj;var old_class=È.getAttribute(Á.Â,\"class\");if(old_class){var new_class=old_class.replace(\"hidden\",\"\");È.setAttribute(Á.Â,\"class\",new_class);}Á.Â.Ç.backgroundColor=\"transÈ\";Á.switchClassSticky($(\"highlight\"),'editAreaButtonNormal',Ë);Á.switchClassSticky($(\"reset_highlight\"),'editAreaButtonDisabled',Ë);Á.do_highlight=Ì;Á.switchClassSticky($(\"change_smooth_selection\"),'editAreaButtonSelected',Ë);if(typeof(Á.smooth_selection_before_highlight)!=\"undefined\"&&Á.smooth_selection_before_highlight===Ì){Á.change_smooth_selection_mode(Ì);}};EA.Ä.enable_highlight=Ã(){Á.show_waiting_screen();Á.content_highlight.Ç.visibility=\"visible\";var new_class=È.getAttribute(Á.Â,\"class\")+\" hidden\";È.setAttribute(Á.Â,\"class\",new_class);if(Á.nav['isIE'])Á.Â.Ç.backgroundColor=\"#FFFFFF\";Á.switchClassSticky($(\"highlight\"),'editAreaButtonSelected',Ì);Á.switchClassSticky($(\"reset_highlight\"),'editAreaButtonNormal',Ì);Á.smooth_selection_before_highlight=Á.smooth_selection;if(!Á.smooth_selection)Á.change_smooth_selection_mode(Ë);Á.switchClassSticky($(\"change_smooth_selection\"),'editAreaButtonDisabled',Ë);Á.do_highlight=Ë;Á.resync_highlight();Á.hide_waiting_screen();};EA.Ä.maj_highlight=Ã(infos){if(Á.last_highlight_base_text==infos[\"full_text\"]&&Á.resync_highlight!==Ë)return;if(infos[\"full_text\"].indexOf(\"\\r\")!=-1)text_to_highlight=infos[\"full_text\"].replace(/\\r/g,\"\");\nelse text_to_highlight=infos[\"full_text\"];var start_line_pb=-1;var end_line_pb=-1;var stay_begin=\"\";var stay_end=\"\";var debug_opti=\"\";var date=new Date();var tps_start=date.getTime();var tps_middle_opti=date.getTime();if(Á.reload_highlight===Ë){Á.reload_highlight=Ì;}\nelse if(text_to_highlight.Æ==0){text_to_highlight=\"\\n \";}\nelse{var base_step=200;var cpt=0;var end=Math.min(text_to_highlight.Æ,Á.last_text_to_highlight.Æ);var step=base_step;while(cpt<end&&step>=1){if(Á.last_text_to_highlight.substr(cpt,step)==text_to_highlight.substr(cpt,step)){cpt+=step;}\nelse{step=Math.floor(step/2);}}var pos_start_change=cpt;var line_start_change=text_to_highlight.substr(0,pos_start_change).split(\"\\n\").Æ -1;cpt_last=Á.last_text_to_highlight.Æ;cpt=text_to_highlight.Æ;step=base_step;while(cpt>=0&&cpt_last>=0&&step>=1){if(Á.last_text_to_highlight.substr(cpt_last-step,step)==text_to_highlight.substr(cpt-step,step)){cpt-=step;cpt_last-=step;}\nelse{step=Math.floor(step/2);}}var pos_new_end_change=cpt;var pos_last_end_change=cpt_last;if(pos_new_end_change<=pos_start_change){if(Á.last_text_to_highlight.Æ < text_to_highlight.Æ){pos_new_end_change=pos_start_change+text_to_highlight.Æ-Á.last_text_to_highlight.Æ;pos_last_end_change=pos_start_change;}\nelse{pos_last_end_change=pos_start_change+Á.last_text_to_highlight.Æ-text_to_highlight.Æ;pos_new_end_change=pos_start_change;}}var change_new_text=text_to_highlight.substring(pos_start_change,pos_new_end_change);var change_last_text=Á.last_text_to_highlight.substring(pos_start_change,pos_last_end_change);var line_new_end_change=text_to_highlight.substr(0,pos_new_end_change).split(\"\\n\").Æ -1;var line_last_end_change=Á.last_text_to_highlight.substr(0,pos_last_end_change).split(\"\\n\").Æ -1;var change_new_text_line=text_to_highlight.split(\"\\n\").slice(line_start_change,line_new_end_change+1).join(\"\\n\");var change_last_text_line=Á.last_text_to_highlight.split(\"\\n\").slice(line_start_change,line_last_end_change+1).join(\"\\n\");var trace_new=Á.get_syntax_trace(change_new_text_line);var trace_last=Á.get_syntax_trace(change_last_text_line);if(trace_new==trace_last){date=new Date();tps_middle_opti=date.getTime();stay_begin=Á.last_hightlighted_text.split(\"\\n\").slice(0,line_start_change).join(\"\\n\");if(line_start_change>0)stay_begin+=\"\\n\";stay_end=Á.last_hightlighted_text.split(\"\\n\").slice(line_last_end_change+1).join(\"\\n\");if(stay_end.Æ>0)stay_end=\"\\n\"+stay_end;if(stay_begin.Æ==0&&pos_last_end_change==-1)change_new_text_line+=\"\\n\";text_to_highlight=change_new_text_line;}if(Á.Å[\"debug\"]){debug_opti=(trace_new==trace_last)?\"Optimisation\":\"No optimisation\";debug_opti+=\" start:\"+pos_start_change +\"(\"+line_start_change+\")\";debug_opti+=\" end_new:\"+pos_new_end_change+\"(\"+line_new_end_change+\")\";debug_opti+=\" end_last:\"+pos_last_end_change+\"(\"+line_last_end_change+\")\";debug_opti+=\"\\nchanged_text:\"+change_new_text+\" => trace:\"+trace_new;debug_opti+=\"\\nchanged_last_text:\"+change_last_text+\" => trace:\"+trace_last;debug_opti+=\"\\nchanged_line:\"+change_new_text_line;debug_opti+=\"\\nlast_changed_line:\"+change_last_text_line;debug_opti+=\"\\nstay_begin:\"+stay_begin.slice(-200);debug_opti+=\"\\nstay_end:\"+stay_end;debug_opti+=\"\\n\";}}date=new Date();tps_end_opti=date.getTime();var updated_highlight=Á.colorize_text(text_to_highlight);date=new Date();tps2=date.getTime();var hightlighted_text=stay_begin+updated_highlight+stay_end;date=new Date();inner1=date.getTime();var new_Obj=Á.content_highlight.cloneNode(Ì);if(Á.nav['isIE']||Á.nav['isOpera']||Á.nav['isFirefox'] >=3)new_Obj.innerHTML=\"<pre><span class='\"+Á.Å[\"syntax\"] +\"'>\"+hightlighted_text.replace(\"\\n\",\"<br/>\")+\"</span></pre>\";\nelse new_Obj.innerHTML=\"<span class='\"+Á.Å[\"syntax\"] +\"'>\"+hightlighted_text +\"</span>\";Á.content_highlight.ÈNode.replaceChild(new_Obj,Á.content_highlight);Á.content_highlight=new_Obj;if(infos[\"full_text\"].indexOf(\"\\r\")!=-1)Á.last_text_to_highlight=infos[\"full_text\"].replace(/\\r/g,\"\");\nelse Á.last_text_to_highlight=infos[\"full_text\"];Á.last_hightlighted_text=hightlighted_text;date=new Date();tps3=date.getTime();if(Á.Å[\"debug\"]){tot1=tps_end_opti-tps_start;tot_middle=tps_end_opti-tps_middle_opti;tot2=tps2-tps_end_opti;tps_join=inner1-tps2;tps_td2=tps3-inner1;Á.debug.Ê=\"Tps optimisation \"+tot1+\" (second part:\"+tot_middle+\")| tps reg exp:\"+tot2+\" | tps join:\"+tps_join;Á.debug.Ê+=\" | tps update highlight content:\"+tps_td2+\"(\"+tps3+\")\\n\";Á.debug.Ê+=debug_opti;}};EA.Ä.resync_highlight=Ã(reload_now){Á.reload_highlight=Ë;Á.last_highlight_base_text=\"\";Á.focus();if(reload_now)Á.check_line_selection(Ì);}; EA.Ä.comment_or_quote=Ã(){var new_class=\"\";var close_tag=\"\";for(var i in È.eAL.syntax[eA.current_code_lang][\"quotes\"]){if(EA.Ä.comment_or_quote.arguments[0].indexOf(i)==0){new_class=\"quotesmarks\";close_tag=È.eAL.syntax[eA.current_code_lang][\"quotes\"][i];}}if(new_class.Æ==0){for(var i in È.eAL.syntax[eA.current_code_lang][\"comments\"]){if(EA.Ä.comment_or_quote.arguments[0].indexOf(i)==0){new_class=\"comments\";close_tag=È.eAL.syntax[eA.current_code_lang][\"comments\"][i];}}}if(close_tag==\"\\n\"){return \"µ__\"+new_class +\"__µ\"+EA.Ä.comment_or_quote.arguments[0].replace(/(\\r?\\n)?$/m,\"µ_END_µ$1\");}\nelse{reg=new RegExp(È.eAL.get_escaped_regexp(close_tag)+\"$\",\"m\");if(EA.Ä.comment_or_quote.arguments[0].search(reg)!=-1)return \"µ__\"+new_class +\"__µ\"+EA.Ä.comment_or_quote.arguments[0]+\"µ_END_µ\";\nelse return \"µ__\"+new_class +\"__µ\"+EA.Ä.comment_or_quote.arguments[0];}};EA.Ä.get_syntax_trace=Ã(text){if(Á.Å[\"syntax\"].Æ>0&&È.eAL.syntax[Á.Å[\"syntax\"]][\"syntax_trace_regexp\"])return text.replace(È.eAL.syntax[Á.Å[\"syntax\"]][\"syntax_trace_regexp\"],\"$3\");};EA.Ä.colorize_text=Ã(text){text=\" \"+text;if(Á.Å[\"syntax\"].Æ>0)text=Á.apply_syntax(text,Á.Å[\"syntax\"]);return text.substr(1).replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/µ_END_µ/g,\"</span>\").replace(/µ__([a-zA-Z0-9]+)__µ/g,\"<span class='$1'>\");};EA.Ä.apply_syntax=Ã(text,lang){Á.current_code_lang=lang;if(!È.eAL.syntax[lang])return text;if(È.eAL.syntax[lang][\"custom_regexp\"]['before']){for(var i in È.eAL.syntax[lang][\"custom_regexp\"]['before']){var convert=\"$1µ__\"+È.eAL.syntax[lang][\"custom_regexp\"]['before'][i]['class'] +\"__µ$2µ_END_µ$3\";text=text.replace(È.eAL.syntax[lang][\"custom_regexp\"]['before'][i]['regexp'],convert);}}if(È.eAL.syntax[lang][\"comment_or_quote_reg_exp\"]){text=text.replace(È.eAL.syntax[lang][\"comment_or_quote_reg_exp\"],Á.comment_or_quote);}if(È.eAL.syntax[lang][\"keywords_reg_exp\"]){for(var i in È.eAL.syntax[lang][\"keywords_reg_exp\"]){text=text.replace(È.eAL.syntax[lang][\"keywords_reg_exp\"][i],'µ__'+i+'__µ$2µ_END_µ');}}if(È.eAL.syntax[lang][\"delimiters_reg_exp\"]){text=text.replace(È.eAL.syntax[lang][\"delimiters_reg_exp\"],'µ__delimiters__µ$1µ_END_µ');}if(È.eAL.syntax[lang][\"operators_reg_exp\"]){text=text.replace(È.eAL.syntax[lang][\"operators_reg_exp\"],'µ__operators__µ$1µ_END_µ');}if(È.eAL.syntax[lang][\"custom_regexp\"]['after']){for(var i in È.eAL.syntax[lang][\"custom_regexp\"]['after']){var convert=\"$1µ__\"+È.eAL.syntax[lang][\"custom_regexp\"]['after'][i]['class'] +\"__µ$2µ_END_µ$3\";text=text.replace(È.eAL.syntax[lang][\"custom_regexp\"]['after'][i]['regexp'],convert);}}return text;};var editArea= eA;EditArea=EA;</script>".replace(/Á/g,'this').replace(/Â/g,'textarea').replace(/Ã/g,'function').replace(/Ä/g,'prototype').replace(/Å/g,'settings').replace(/Æ/g,'length').replace(/Ç/g,'style').replace(/È/g,'parent').replace(/É/g,'last_selection').replace(/Ê/g,'value').replace(/Ë/g,'true').replace(/Ì/g,'false');
editAreaLoader.template= "<?xml version=\"1.0\" encoding=\"UTF-8\"?> <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"> <html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" > <head> <title>EditArea</title> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> [__CSSRULES__] [__JSCODE__] </head> <body> <div id='editor'> <div class='area_toolbar' id='toolbar_1'>[__TOOLBAR__]</div> <div class='area_toolbar' id='tab_browsing_area'><ul id='tab_browsing_list' class='menu'> <li> </li> </ul></div> <div id='result'> <div id='no_file_selected'></div> <div id='container'> <div id='cursor_pos' class='edit_area_cursor'>&nbsp;</div> <div id='end_bracket' class='edit_area_cursor'>&nbsp;</div> <div id='selection_field'></div> <div id='line_number' selec='none'></div> <div id='content_highlight'></div> <div id='test_font_size'></div> <textarea id='textarea' wrap='off' onchange='editArea.execCommand(\"onchange\");' onfocus='javascript:editArea.textareaFocused=true;' onblur='javascript:editArea.textareaFocused=false;'> </textarea> </div> </div> <div class='area_toolbar' id='toolbar_2'> <table class='statusbar' cellspacing='0' cellpadding='0'> <tr> <td class='total' selec='none'>{$position}:</td> <td class='infos' selec='none'> {$line_abbr} <span  id='linePos'>0</span>, {$char_abbr} <span id='currPos'>0</span> </td> <td class='total' selec='none'>{$total}:</td> <td class='infos' selec='none'> {$line_abbr} <span id='nbLine'>0</span>, {$char_abbr} <span id='nbChar'>0</span> </td> <td class='resize'> <span id='resize_area'><img src='[__BASEURL__]images/statusbar_resize.gif' alt='resize' selec='none'></span> </td> </tr> </table> </div> </div> <div id='processing'> <div id='processing_text'> {$processing} </div> </div> <div id='area_search_replace' class='editarea_popup'> <table cellspacing='2' cellpadding='0' style='width: 100%'> <tr> <td selec='none'>{$search}</td> <td><input type='text' id='area_search' /></td> <td id='close_area_search_replace'> <a onclick='Javascript:editArea.execCommand(\"hidden_search\")'><img selec='none' src='[__BASEURL__]images/close.gif' alt='{$close_popup}' title='{$close_popup}' /></a><br /> </tr><tr> <td selec='none'>{$replace}</td> <td><input type='text' id='area_replace' /></td> <td><img id='move_area_search_replace' onmousedown='return parent.start_move_element(event,\"area_search_replace\", parent.frames[\"frame_\"+editArea.id]);'  src='[__BASEURL__]images/move.gif' alt='{$move_popup}' title='{$move_popup}' /></td> </tr> </table> <div class='button'> <input type='checkbox' id='area_search_match_case' /><label for='area_search_match_case' selec='none'>{$match_case}</label> <input type='checkbox' id='area_search_reg_exp' /><label for='area_search_reg_exp' selec='none'>{$reg_exp}</label> <br /> <a onclick='Javascript:editArea.execCommand(\"area_search\")' selec='none'>{$find_next}</a> <a onclick='Javascript:editArea.execCommand(\"area_replace\")' selec='none'>{$replace}</a> <a onclick='Javascript:editArea.execCommand(\"area_replace_all\")' selec='none'>{$replace_all}</a><br /> </div> <div id='area_search_msg' selec='none'></div> </div> <div id='edit_area_help' class='editarea_popup'> <div class='close_popup'> <a onclick='Javascript:editArea.execCommand(\"close_all_inline_popup\")'><img src='[__BASEURL__]images/close.gif' alt='{$close_popup}' title='{$close_popup}' /></a> </div> <div><h2>Editarea [__EA_VERSION__]</h2><br /> <h3>{$shortcuts}:</h3> {$tab}: {$add_tab}<br /> {$shift}+{$tab}: {$remove_tab}<br /> {$ctrl}+f: {$search_command}<br /> {$ctrl}+r: {$replace_command}<br /> {$ctrl}+h: {$highlight}<br /> {$ctrl}+g: {$go_to_line}<br /> {$ctrl}+z: {$undo}<br /> {$ctrl}+y: {$redo}<br /> {$ctrl}+e: {$help}<br /> {$ctrl}+q, {$esc}: {$close_popup}<br /> {$accesskey} E: {$toggle}<br /> <br /> <em>{$about_notice}</em> <br /><div class='copyright'>&copy; Christophe Dolivet - 2007</div> </div> </div> </div> </body> </html> ";
editAreaLoader.iframe_css= "<style>body,html{margin:0;padding:0;height:100%;border:none;overflow:hidden;background-color:#FFF;}body,html,table,form,textarea{font:12px monospace,sans-serif;}#editor{border:solid #888 1px;overflow:visible;}#result{z-index:4;overflow:auto;border-top:solid #888 1px;border-bottom:solid #888 1px;position:relative;clear:both;}#result.empty{overflow:hidden;}#container{overflow:hidden;border:solid blue 0;position:relative;z-index:10;padding:0 5px 0 0;}#textarea{position:relative;top:0;left:0;padding:0 0 0 45px;width:100%;height:100%;overflow:hidden;z-index:7;border:solid green 0;background-color:transparent;}#textarea,#textarea:hover{outline:none;}#content_highlight{white-space:pre;margin:0 0 0 45px;padding:1px 0 0 0;position:absolute;z-index:4;overflow:visible;border:solid yellow 0;}#selection_field{margin:1px 0 0 45px;background-color:#E1F2F9;height:1px;position:absolute;z-index:5;top:-100px;padding:0;white-space:pre;overflow:hidden;}#container.wrap_text #content_highlight,#container.wrap_text #selection_field{white-space:pre-wrap;white-space:-moz-pre-wrap !important;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:99%;}#line_number{position:absolute;overflow:hidden;border-right:solid black 1px;z-index:8;width:38px;padding-right:5px;text-align:right;color:#AAAAAA;}#test_font_size{padding:0;margin:0;visibility:hidden;position:absolute;white-space:pre;}pre{margin:0;padding:0;}.hidden{opacity:0.2;filter:alpha(opacity=20);}#result .edit_area_cursor{position:absolute;z-index:6;background-color:#FF6633;top:-100px;margin:1px 0 0 0;}#result .edit_area_selection_field .overline{background-color:#996600;}.editarea_popup{border:solid 1px #888888;background-color:#ECE9D8;width:250px;padding:4px;position:absolute;visibility:hidden;z-index:15;top:-500px;}.editarea_popup,.editarea_popup table{font-family:sans-serif;font-size:10pt;}.editarea_popup img{border:0;}.editarea_popup .close_popup{float:right;line-height:16px;border:0;padding:0;}.editarea_popup h1,.editarea_popup h2,.editarea_popup h3,.editarea_popup h4,.editarea_popup h5,.editarea_popup h6{margin:0;padding:0;}.editarea_popup .copyright{text-align:right;}div#area_search_replace{}div#area_search_replace img{border:0;}div#area_search_replace div.button{text-align:center;line-height:1.7em;}div#area_search_replace .button a{cursor:pointer;border:solid 1px #888888;background-color:#DEDEDE;text-decoration:none;padding:0 2px;color:#000000;white-space:nowrap;}div#area_search_replace a:hover{background-color:#EDEDED;}div#area_search_replace  #move_area_search_replace{cursor:move;border:solid 1px #888;}div#area_search_replace  #close_area_search_replace{text-align:right;vertical-align:top;white-space:nowrap;}div#area_search_replace  #area_search_msg{height:18px;overflow:hidden;border-top:solid 1px #888;margin-top:3px;}#edit_area_help{width:350px;}#edit_area_help div.close_popup{float:right;}.area_toolbar{width:100%;margin:0;padding:0;background-color:#ECE9D8;text-align:center;}.area_toolbar,.area_toolbar table{font:11px sans-serif;}.area_toolbar img{border:0;vertical-align:middle;}.area_toolbar input{margin:0;padding:0;}.area_toolbar select{font-family:'MS Sans Serif',sans-serif,Verdana,Arial;font-size:7pt;font-weight:normal;margin:2px 0 0 0 ;padding:0;vertical-align:top;background-color:#F0F0EE;}table.statusbar{width:100%;}.area_toolbar td.infos{text-align:center;width:130px;border-right:solid 1px #888;border-width:0 1px 0 0;padding:0;}.area_toolbar td.total{text-align:right;width:50px;padding:0;}.area_toolbar td.resize{text-align:right;}.area_toolbar span#resize_area{cursor:nw-resize;visibility:hidden;}.editAreaButtonNormal,.editAreaButtonOver,.editAreaButtonDown,.editAreaSeparator,.editAreaSeparatorLine,.editAreaButtonDisabled,.editAreaButtonSelected {border:0; margin:0; padding:0; background:transparent;margin-top:0;margin-left:1px;padding:0;}.editAreaButtonNormal {border:1px solid #ECE9D8 !important;cursor:pointer;}.editAreaButtonOver {border:1px solid #0A246A !important;cursor:pointer;background-color:#B6BDD2;}.editAreaButtonDown {cursor:pointer;border:1px solid #0A246A !important;background-color:#8592B5;}.editAreaButtonSelected {border:1px solid #C0C0BB !important;cursor:pointer;background-color:#F4F2E8;}.editAreaButtonDisabled {filter:progid:DXImageTransform.Microsoft.Alpha(opacity=30);-moz-opacity:0.3;opacity:0.3;border:1px solid #F0F0EE !important;cursor:pointer;}.editAreaSeparatorLine {margin:1px 2px;background-color:#C0C0BB;width:2px;height:18px;}#processing{display:none;background-color:#ECE9D8;border:solid #888 1px;position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;text-align:center;}#processing_text{position:absolute;left:50%;top:50%;width:200px;height:20px;margin-left:-100px;margin-top:-10px;text-align:center;}#tab_browsing_area{display:none;background-color:#CCC9A8;border-top:1px solid #888;text-align:left;margin:0;}#tab_browsing_list {padding:0;margin:0;list-style-type:none;white-space:nowrap;}#tab_browsing_list li {float:left;margin:-1px;}#tab_browsing_list a {position:relative;display:block;text-decoration:none;float:left;cursor:pointer;line-height:14px;}#tab_browsing_list a span {display:block;color:#000;background:#ECE9D8;border:1px solid #888;border-width:1px 1px 0;text-align:center;padding:2px 2px 1px 4px;position:relative;}#tab_browsing_list a b {display:block;border-bottom:2px solid #617994;}#tab_browsing_list a .edited {display:none;}#tab_browsing_list a.edited .edited {display:inline;}#tab_browsing_list a img{margin-left:7px;}#tab_browsing_list a.edited img{margin-left:3px;}#tab_browsing_list a:hover span {background:#F4F2E8;border-color:#0A246A;}#tab_browsing_list .selected a span{background:#046380;color:#FFF;}#no_file_selected{height:100%;width:150%;background:#CCC;display:none;z-index:20;position:absolute;}.non_editable #editor{border-width:0 1px;}.non_editable .area_toolbar{display:none;}</style>";
;

// NOTE: to log/debug with Orbited, there are two methods:
//          Use firebug 
//              1) include Orbited.js (and not Log4js)
//              2) Orbited.loggers[LOGGERNAME].enabled = true
//              And it should do logging for that logger
//          Use log4js
//              1) include log4js.js BEFORE including Orbited.js
//              2) Orbited.loggers[LOGGERNAME].setLevel(Log4js.Level.ALL)
//              3) Orbited.loggers[LOGGERNAME].addAppender(new Log4js.ConsoleAppender())
//              Note: Other levels and appenders can be set as well (see Log4js docs)
//
//       When you are making a call to the logger, prefix the line (first three
//       Characters) with ;;; which we will strip out at build time. So if you
//       have an if statement thats logging specific, start that line with ;;;
//       as well. If you do a try/catch thats specific to logging, prefix all
//       lines involved with ;;;. You'll want to put the try closing } and the
//       catch statement on the same line, or this won't work.
//
//       the logging functions (info, warn, debug, error, etc.) take any number
//       of arguments, like in firebug. If you're using firebug for the logging,
//       you'll actually be able to inspect the objects that you log. Therefore
//       don't do logger.debug(obj1 + " -> " + obj2); as this will convert both
//       objects to strings and not allow you to inspect them in firebug. 
//       Instead call logger.debug(obj1, "->" obj2); Of course, for the Log4js
//       back-end, it will still toString the objects.

(function() {


var HANDSHAKE_TIMEOUT = 30000
var RETRY_INTERVAL = 250
var RETRY_TIMEOUT = 30000

Orbited = {}

Orbited.settings = {}
Orbited.settings.hostname = document.domain
Orbited.settings.port = (location.port.length > 0) ? location.port : 80
Orbited.settings.protocol = 'http'
Orbited.settings.log = false;
Orbited.settings.HEARTBEAT_TIMEOUT = 6000
Orbited.settings.POLL_INTERVAL = 2000
Orbited.settings.pageLoggerHeight = '200px'
Orbited.settings.pageLoggerWidth = null;
Orbited.settings.enableFFPrivleges = false;
Orbited.singleton = {}


// Orbited CometSession Errors
Orbited.Errors = {}
Orbited.Errors.ConnectionTimeout = 101
Orbited.Errors.InvalidHandshake = 102
Orbited.Errors.UserConnectionReset = 103
Orbited.Errors.Unauthorized = 106

Orbited.Statuses = {}
Orbited.Statuses.ServerClosedConnection = 201


Orbited.util = {}

Orbited.util.browser = null;
if (typeof(ActiveXObject) != "undefined") {
    Orbited.util.browser = 'ie'
} else if (navigator.product == 'Gecko' && window.find && !navigator.savePreferences) {
    Orbited.util.browser = 'firefox'
} else if((typeof window.addEventStream) === 'function') {
    Orbited.util.browser = 'opera'
} 


////
// NB: Base64 code was borrowed from Dojo; we had to fix decode for not
//     striping NULs though.  Tom Trenka from Dojo wont fix this because
//     he claims it helped to detect and avoid broken encoded data.
//     See http://svn.dojotoolkit.org/src/dojox/trunk/encoding/base64.js
//     See http://bugs.dojotoolkit.org/ticket/7400
(function(){
    Orbited.base64 = {};

    var p = "=";
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    if (window.btoa && window.btoa('1') == 'MQ==') {
        Orbited.base64.encode = function(data) { return btoa(data) };
        Orbited.base64.decode = function(data) { return atob(data) };
        return
    }

    Orbited.base64.encode=function(/* String */ba){
        //  summary
        //  Encode a string as a base64-encoded string
        var s=[], l=ba.length;
        var rm=l%3;
        var x=l-rm;
        for (var i=0; i<x;){
            var t=ba.charCodeAt(i++)<<16|ba.charCodeAt(i++)<<8|ba.charCodeAt(i++);
            s.push(tab.charAt((t>>>18)&0x3f)); 
            s.push(tab.charAt((t>>>12)&0x3f));
            s.push(tab.charAt((t>>>6)&0x3f));
            s.push(tab.charAt(t&0x3f));
        }
        //  deal with trailers, based on patch from Peter Wood.
        switch(rm){
            case 2:{
                var t=ba.charCodeAt(i++)<<16|ba.charCodeAt(i++)<<8;
                s.push(tab.charAt((t>>>18)&0x3f));
                s.push(tab.charAt((t>>>12)&0x3f));
                s.push(tab.charAt((t>>>6)&0x3f));
                s.push(p);
                break;
            }
            case 1:{
                var t=ba.charCodeAt(i++)<<16;
                s.push(tab.charAt((t>>>18)&0x3f));
                s.push(tab.charAt((t>>>12)&0x3f));
                s.push(p);
                s.push(p);
                break;
            }
        }
        return s.join("");  //  string
    };


    Orbited.base64.decode=function(/* string */str){
        //  summary
        //  Convert a base64-encoded string to an array of bytes
        var s=str.split(""), out=[];
        var l=s.length;
        var tl=0;
        while(s[--l]==p){ ++tl; }   //  strip off trailing padding
        for (var i=0; i<l;){
            var t=tab.indexOf(s[i++])<<18;
            if(i<=l){ t|=tab.indexOf(s[i++])<<12 };
            if(i<=l){ t|=tab.indexOf(s[i++])<<6 };
            if(i<=l){ t|=tab.indexOf(s[i++]) };
            out.push(String.fromCharCode((t>>>16)&0xff));
            out.push(String.fromCharCode((t>>>8)&0xff));
            out.push(String.fromCharCode(t&0xff));
        }
        // strip off trailing padding
        while(tl--){ out.pop(); }
        return out.join(""); //  string
    };
})();




Orbited.loggers = {}
Orbited.Loggers = {}
Orbited.util.loggingSystem = null;

if (window.Log4js) {
    Orbited.util.loggingSystem = 'log4js';
}
else if (window.console && console.firebug) {
    Orbited.util.loggingSystem = 'firebug';
}

Orbited.getLogger = function(name) {
    if (!Orbited.loggers[name]) {
        var logger = null;
        switch (Orbited.util.loggingSystem) {
            case 'firebug':
                logger = new Orbited.Loggers.FirebugLogger(name)
                break;
            case 'log4js':
                logger = new Orbited.Loggers.Log4jsLogger(name)
                break;

            default:
                logger = new Orbited.Loggers.PageLogger(name);
                break;
        }
        Orbited.loggers[name] = logger;
    }
    return Orbited.loggers[name]
}

// TODO: is it confusing to have Orbited.Loggers be the various logging classes
//       and Orbited.loggers be actual instances of logging classes?

Orbited.Loggers.FirebugLogger = function(name) {
    var self = this;
    self.name = name;
    self.enabled = false;
    var padArgs = function(args) {
        var newArgs = [ name + ":" ]
        for (var i = 0; i < args.length; ++i) {
            newArgs.push(args[i]);
        }
        return newArgs
    }
    self.log = function() {
        if (!self.enabled) { return }
        console.log.apply(this, padArgs(arguments))
    }
    self.debug = function() {
        if (!self.enabled) { return }
        console.debug.apply(this, padArgs(arguments))
    }
    self.info = function() {
        if (!self.enabled) { return }
        console.info.apply(this, padArgs(arguments))
    }
    self.warn = function() {
        if (!self.enabled) { return }
        console.warn.apply(this, padArgs(arguments))
    }    
    self.error = function() {
        if (!self.enabled) { return }
        console.error.apply(this, padArgs(arguments))
    }
    self.assert = function() {
        if (!self.enabled) { return }
        var newArgs = [arguments[0], name + ":" ]
        for (var i = 1; i < arguments.length; ++i) {
            newArgs.push(arguments[i]);
        }
        console.assert.apply(this, newArgs)
    }
    self.trace = function() {
        if (!self.enabled) { return }
        console.trace.apply(this, padArgs(arguments))
    }
}
Orbited.singleton.pageLoggerPane = null;

Orbited.Loggers.PageLogger = function(name) {
    var self = this;
    self.enabled = false;
    self.name = name;

    var checkPane = function() {
        if (!Orbited.singleton.pageLoggerPane) {
            var p = document.createElement("div");
            p.border = "1px solid black"
            if(Orbited.settings.pageLoggerHeight) {
                p.style.height = Orbited.settings.pageLoggerHeight;
            }
            if(Orbited.settings.pageLoggerWidth) {
                p.style.height = Orbited.settings.pageLoggerWidth;
            }

            p.style.overflow = "scroll"
            document.body.appendChild(p)
            Orbited.singleton.pageLoggerPane = p
        }
    }
    var show = function(data) {
        checkPane();
        var d = document.createElement('div')
        d.innerHTML = data
        Orbited.singleton.pageLoggerPane.appendChild(d)
        Orbited.singleton.pageLoggerPane.scrollTop = Orbited.singleton.pageLoggerPane.scrollHeight;
    }
    self.log = function() {
    }
    self.debug = function() {
        if (!self.enabled) { return }
        var newArgs = [ new Date(), "<b>" + name + "</b>" ]
        for (var i = 0; i < arguments.length; ++i) {
            newArgs.push(arguments[i]);
        }
        show(newArgs.join(", "));
    }
    self.info = function() {
    }
    self.warn = function() {
    }    
    self.error = function() {
    }
    self.assert = function() {
    }
    self.trace = function() {
    }
}


Orbited.Loggers.Log4jsLogger = function(name) {
    var self = this;
    self.name = name;
    // NOTE: Why oh WHY doesn't Log4js accept dots in the logger names, and 
    //       more importantly, why don't they have reasonble error messages?!
    var log4jsName = name
    while (log4jsName.indexOf('.') != -1) {
        log4jsName = log4jsName.replace('.', '_')
    }
    var logger = Log4js.getLogger(log4jsName)
    self.logger = logger
    logger.setLevel(Log4js.Level.OFF)

    var generateOutput = function(args) {
        var newArgs = [ name + ":" ]
        for (var i = 0; i < args.length; ++i) {
            newArgs.push(args[i]);
        }
        return newArgs.join(" ")
    }

    self.setLevel = function(level) {
        logger.setLevel(level)
    }
    self.addAppender = function(a) {
        logger.addAppender(a);
    }
    self.log= function() {
        // NOTE: log doesn't mean anything in Log4js. mapping it to info
        logger.info(generateOutput(arguments));
    }
    self.debug = function() {
        logger.debug(generateOutput(arguments));
    }
    self.info = function() {
        logger.info(generateOutput(arguments));
    }
    self.warn = function() {
        logger.warn(generateOutput(arguments));
    }    
    self.error = function() {
        logger.error(generateOutput(arguments));
    }
    self.assert = function() {
    }
    self.trace = function() {
    }

}
Orbited.system = Orbited.getLogger('system')



Orbited.CometTransports = {}

Orbited.util.chooseTransport = function() {
    var choices = []
    for (var name in Orbited.CometTransports) {
        var transport = Orbited.CometTransports[name];
        if (typeof(transport[Orbited.util.browser]) == "number") {
            Orbited.system.log('viable transport: ', name)
            choices.push(transport)
        }
    }
    // TODO: sort the choices by the values of transport[Orbited.util.browser]
    //       and return the transport with the highest value.
//    return XHRStream
    return choices[0]
}



var createXHR = function () {
    try { return new XMLHttpRequest(); } catch(e) {}
    try { return new ActiveXObject('MSXML3.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('MSXML2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    throw new Error('Could not find XMLHttpRequest or an alternative.');
}




Orbited.CometSession = function() {
    var self = this;
    self.readyState = self.READY_STATE_INITIALIZED;
    self.onopen = function() {}
    self.onread = function() {}
    self.onclose = function() {}
    var sessionUrl = null;
    var sessionKey = null;
    var sendQueue = []
    var packetCount = 0;
    var xhr = null;
    var handshakeTimer = null;
    var cometTransport = null;
    var pingInterval = 30000;
    var pingTimeout = 30000;
    var timeoutTimer = null;
    var lastPacketId = 0
    var sending = false;

    /*
     * self.open can only be used when readyState is INITIALIZED. Immediately
     * following a call to self.open, the readyState will be OPENING until a
     * connection with the server has been negotiated. self.open takes a url
     * as a single argument which desiginates the remote url with which to
     * establish the connection.
     */
    self.open = function(_url) {
        self.readyState = self.READY_STATE_OPENING;
        var url = new Orbited.URL(_url)
        if (url.isSameDomain(location.href)) {
            xhr = createXHR();
        }
        else {
            xhr = new Orbited.XSDR();
        }
//        xhr = createXHR();
        if (Orbited.settings.enableFFPrivleges) {
            try { 
                netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); 
            } catch (ex) { } 
        }        

        xhr.open('GET', _url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    sessionKey = xhr.responseText;
;;;                 self.logger.debug('session key is: ', sessionKey)
                    resetTimeout();
                    sessionUrl = new Orbited.URL(_url)
                    // START new URL way
//                    sessionUrl.extendPath(sessionKey)
                    // END: new URL way

                    // START: old URL way
                    if (sessionUrl.path[sessionUrl.path.length] != '/')
                        sessionUrl.path += '/'
                    sessionUrl.path += sessionKey
                    // END: old Url way
                    var transportClass = Orbited.util.chooseTransport()
                    cometTransport = new transportClass();
                    cometTransport.onReadFrame = transportOnReadFrame;
                    cometTransport.onclose = transportOnClose;
                    cometTransport.connect(sessionUrl.render())
                }
                
                else {
                    xhr = null;
                    self.readyState = self.READY_STATE_CLOSED;
                    self.onclose(Orbited.Errors.InvalidHandshake)
                }
            }
        }
        xhr.send(null);
    }
    
    /* 
     * self.send is only callable when readyState is OPEN. It will queue the data
     * up for delivery as soon as the upstream xhr is ready.
     */
    self.send = function(data) {
;;;     self.logger.debug('session.send', data)
        if (self.readyState != self.READY_STATE_OPEN) {
            throw new Error("Invalid readyState")
        }
        data = Orbited.base64.encode(data)
        sendQueue.push([++packetCount, "data", data])
;;;     self.logger.debug('sending==', sending);
        if (!sending) {
;;;         self.logger.debug('starting send');
            doSend()
        }
    }

    /* 
     * self.close sends a close frame to the server, at the end of the queue.
     * It also sets the readyState to CLOSING so that no further data may be
     * sent. onclose is not called immediately -- it waits for the server to
     * send a close event.
     */
    self.close = function() {
        switch(self.readyState) {
            case self.READY_STATE_CLOSING:
            case self.READY_STATE_CLOSED:
                return
            case self.READY_STATE_INITIALIZED:
                // TODO: call onclose here?
                self.readyState = self.READY_STATE_CLOSED
                return
            default:
                break
        }
        self.readyState = self.READY_STATE_CLOSING;
        // TODO: don't have a third element (remove the null).
        sendQueue.push([++packetCount, "close", null])
        if (!sending) {
            doSend()
        }
    }

    /* self.reset is a way to close immediately. The send queue will be discarded
     * and a close frame will be sent to the server. onclose is called immediately
     * without waiting for a reply from the server.
     */
    self.reset = function() {
        var origState = self.readyState
        self.readyState = self.READY_STATE_CLOSED;
        switch(origState) {
            case self.READY_STATE_INITIALIZED:
                self.onclose(Orbited.Errors.UserConnectionReset);
                break;
            case self.READY_STATE_OPENING:
                xhr.onreadystatechange = function() {};
                xhr.abort();
                self.onclose();
                break;
            case self.READY_STATE_OPEN:
                self.sendQueue = []
                self.sending = false;
                if (xhr.readyState < 4) {
                    xhr.onreadystatechange = function() {}
                    xhr.abort();
                }
                doClose(Orbited.Errors.UserConnectionReset);
                // TODO: send close frame
                //       -mcarter 7-29-08
                break;
            case self.READY_STATE_CLOSING:
                // TODO: Do nothing here?
                //       we need to figure out if we've attempted to send the close
                //       frame yet or not If not, we do something similar to case
                //       OPEN. either way, we should kill the transport and
                //       trigger onclose
                //       -mcarter 7-29-08                
                break;

            case self.READY_STATE_CLOSED:
                break
        }
    }

    var transportOnReadFrame = function(frame) {
;;;     self.logger.debug('transportOnReadFrame')
;;;     self.logger.debug('READ FRAME: ', frame.id, frame.name, frame.data ? frame.data.length : '');
        if (!isNaN(frame.id)) {
            lastPacketId = Math.max(lastPacketId, frame.id);
        }
;;;     self.logger.debug(frame)
        switch(frame.name) {
            case 'close':
                if (self.readyState < self.READY_STATE_CLOSED) {
                    doClose(Orbited.Statuses.ServerClosedConnection)
                }
                break;
            case 'data':
;;;             self.logger.debug('base64 decoding ' + frame.data.length + ' bytes of data')
                data = Orbited.base64.decode(frame.data)
;;;             self.logger.debug('decode complete');
                self.onread(data);
                break;
            case 'open':
                if (self.readyState == self.READY_STATE_OPENING) {
                    self.readyState = self.READY_STATE_OPEN;
;;;                 self.logger.debug('Call self.onopen()');
                    self.onopen();
                }
                else {
                    //TODO Throw and error?
                }
                break;
            case 'ping':
                // TODO: don't have a third element (remove the null).
                // NOTE: don't waste a request when we get a longpoll ping.
                switch(cometTransport.name) {
                    case 'longpoll':
                        break;
                    case 'poll':
                        break;
                    default:
                        sendQueue.push([++packetCount, "ping", null])
                        if (!sending) {
                            doSend()
                        }
                        break;                    
                }
                break;
            case 'opt':
                var args = frame.data.split(',')
                switch(args[0]) {
                    case 'pingTimeout':
                        pingTimeout = parseInt(args[1])*1000
                        break
                    case 'pingInterval':
                        pingInterval = parseInt(args[1])*1000
                        break;
                    default:
;;;                     self.logger.warn('unknown opt key', args[0])
                        break;
                }
        }
        resetTimeout();
    }
    var transportOnClose = function() {
;;;     self.logger.debug('transportOnClose');
        if (self.readyState < self.READY_STATE_CLOSED) {
            doClose(Orbited.Statuses.ServerClosedConnection)
        }
    }        
    var encodePackets = function(queue) {
        //TODO: optimize this.
        var output = []        
        for (var i =0; i < queue.length; ++i) {
            var frame = queue[i];
            for (var j =0; j < frame.length; ++j) {
                var arg = frame[j]
                if (arg == null) {
                    arg = ""
                }
                if (j == frame.length-1) {
                    output.push('0')
                }
                else {
                    output.push('1')
                }
                output.push(arg.toString().length)
                output.push(',')
                output.push(arg.toString())
            }
        }
        return output.join("")
    }

    var doSend = function(retries) {
;;;     self.logger.debug('in doSend');
        if (typeof(retries) == "undefined") {
            retries = 0
        }
        // TODO: I don't think this timeout formula is quite right...
        //       -mcarter 8-3-08
        if (retries*RETRY_INTERVAL >= RETRY_TIMEOUT) {
            doClose(Orbited.Errors.ConnectionTimeout)
            sending = false;
            return
        }
        if (sendQueue.length == 0) {
;;;         self.logger.debug('sendQueue exhausted');
            sending = false;
            return
        }
        sending = true;
;;;     self.logger.debug('setting sending=true');
        var numSent = sendQueue.length
        sessionUrl.setQsParameter('ack', lastPacketId)
//        xhr = createXHR();
        xhr.onreadystatechange = function() {
            switch(xhr.readyState) {
                
                case 4:
                    if (xhr.status == 200) {
                        resetTimeout();
                        sendQueue.splice(0, numSent)
                        return doSend();
                    }
                    else {
                        //TODO: implement retry back-off;
                        window.setTimeout(
                            function() {
                                doSend(++retries);
                            },
                            RETRY_INTERVAL
                        );
                    }
            }
        }
        var tdata = encodePackets(sendQueue)
;;;     self.logger.debug('post', retries, tdata);
        if (Orbited.settings.enableFFPrivleges) {
            try { 
                netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); 
            } catch (ex) { } 
        }        
        xhr.open('POST', sessionUrl.render(), true)
        xhr.send(tdata)

    }
    
    var doClose = function(code) {
;;;     self.logger.debug('doClose', code)
        unsetTimeout();
        self.readyState = self.READY_STATE_CLOSED;
        cometTransport.onReadFrame = function() {}
        if (cometTransport != null) {
            // TODO: is this line necessary?
            cometTransport.onclose = function() { }
            cometTransport.close()
        }
        self.onclose(code);

    }

    var resetTimeout = function() {
;;;     self.logger.debug('reset Timeout', pingInterval+pingTimeout)
        unsetTimeout();
        timeoutTimer = window.setTimeout(timedOut, pingInterval + pingTimeout);
    }
    var unsetTimeout = function() {
        window.clearTimeout(timeoutTimer);

    }
    var timedOut = function() {
;;;     self.logger.debug('timed out!')
        doClose(Orbited.Errors.ConnectionTimeout)
    }
};
Orbited.CometSession.prototype.logger = Orbited.getLogger("Orbited.CometSession");
Orbited.CometSession.prototype.READY_STATE_INITIALIZED  = 1;
Orbited.CometSession.prototype.READY_STATE_OPENING      = 2;
Orbited.CometSession.prototype.READY_STATE_OPEN         = 3;
Orbited.CometSession.prototype.READY_STATE_CLOSING      = 4;
Orbited.CometSession.prototype.READY_STATE_CLOSED       = 5;


Orbited.TCPSocket = function() {
    var self = this;

    // So we don't completely ambush people used to the 0.5 api...
    if (arguments.length > 0) {
        throw new Error("TCPSocket() accepts no arguments")
    }
    self.readyState = self.READY_STATE_INITIALIZED;
    self.onopen = function() { }
    self.onread = function() { }
    self.onclose = function() { }
    var onCloseTriggered = false;
    var buffer = ""
    var session = null;
    var binary = false;
    var handshakeState = null;
    var hostname = null;
    var port = null;

    /* self.open attempts to establish a tcp connection to the specified remote
     * hostname on the specified port. When specified as true, the optional
     * argument, isBinary, will cause onread to return byte arrays, and send
     * will only accept a byte array.
     */
    self.open = function(_hostname, _port, isBinary) {
        if (self.readyState != self.READY_STATE_INITIALIZED) {
            // TODO: allow reuse from readyState == self.READY_STATE_CLOSED?
            //       Re-use makes sense for xhr due to memory concerns, but
            //       probably not for tcp sockets. How often do you reconnect
            //       in the same page?
            //       -mcarter 7-30-08
            throw new Error("Invalid readyState");
        }
        // handle isBinary undefined/null case
        binary = !!isBinary;
        self.readyState = self.READY_STATE_OPENING;
        hostname = _hostname;
        port = _port;
        session = new Orbited.CometSession()
        var sessionUrl = new Orbited.URL('/tcp')
        sessionUrl.domain = Orbited.settings.hostname
        sessionUrl.port = Orbited.settings.port
        sessionUrl.protocol = Orbited.settings.protocol
        session.open(sessionUrl.render())
        session.onopen = sessionOnOpen;
        session.onread = sessionOnRead;
        session.onclose = sessionOnClose;
        handshakeState = "initial";
    }

    self.close = function() {
        if (self.readyState == self.READY_STATE_CLOSED) {
            return
        }
        self.readyState = self.READY_STATE_CLOSED
        doClose()
    }
    
    /* self.reset closes the connection from this end immediately. The server
     * may be notified, but there is no guarantee. The main purpose of the reset
     * function is for a quick teardown in the case of a user navigation.
     * if reset is not called when IE navigates, for instance, there will be 
     * potential issues with future TCPSocket communication.
     */
    self.reset = function() {
        if (session)
            session.reset();
    }

    self.send = function(data) {
        if (self.readyState != self.READY_STATE_OPEN) {
            throw new Error("Invalid readyState");
        }
        if (!binary) {
            data = Orbited.utf8.encode(data)
        }
;;;     self.logger.debug('SEND: ', data)
        session.send(data)
    }

    var process = function() {
        var result = Orbited.utf8.decode(buffer)
        var data = result[0]
        var i = result[1]
        buffer = buffer.slice(i)
        if (data.length > 0) {
            window.setTimeout(function() { self.onread(data) }, 0);
        }
    }

    var sessionOnRead = function(data) {
        switch(self.readyState) {
            case self.READY_STATE_OPEN:
;;;             self.logger.debug('READ: ', data)
                var data = data;
                if (self.binary) {
                    window.setTimeout(function() { self.onread(data) }, 0);
                }
                else {
;;;                 self.logger.debug('start buffer size:', buffer.length)
                    buffer += data;
//                    data.splice(0,0,buffer.length, 0)
//                    buffer.splice.apply(buffer, data)
                    process()
;;;                 self.logger.debug('end buffer size:', buffer.length)
                }
            break;
            case self.READY_STATE_OPENING:
                switch(handshakeState) {
                    case 'initial':
                        // NOTE: we should only get complete payloads during
                        //       the handshake. no need to buffer, then parse
                        data = Orbited.utf8.decode(data)[0];
;;;                     self.logger.debug('initial');
;;;                     self.logger.debug('data', data)
;;;                     self.logger.debug('len', data.length);
;;;                     self.logger.debug('typeof(data)', typeof(data))
;;;                     self.logger.debug('data[0] ', data.slice(0,1))
;;;                     self.logger.debug('type ', typeof(data.slice(0,1)))
                        var result = (data.slice(0,1) == '1')
;;;                     self.logger.debug('result', result)
                        if (!result) {
;;;                         self.logger.debug('!result');
                            var errorCode = data.slice(1,4)
                            doClose(parseInt(errorCode))
                        }
                        if (result) {
                            self.readyState = self.READY_STATE_OPEN;
;;;                         self.logger.debug('tcpsocket.onopen..')
                            self.onopen();
;;;                         self.logger.debug('did onopen');
                        }
                        break;
                }
                break;
        }
    }
    var doClose = function(code) {
;;;     self.logger.debug('doClose', code)
        if (session) {
            sessionOnClose = function() {}
            session.close()
            session = null;
        }
;;;     self.logger.debug('onCloseTriggered', onCloseTriggered)
        if (!onCloseTriggered) {
;;;         self.logger.debug('triggerClose timer', code)
            onCloseTriggered = true;
            window.setTimeout(function() {
;;;             self.logger.debug('onclose!', code);
                self.onclose(code) 
            }, 0)
        }
    }
    
    var sessionOnOpen = function(data) {
        // TODO: TCPSocket handshake
        var payload = hostname + ':' + port + '\n' 
;;;     self.logger.debug('sessionOpen; sending:', payload)
        payload = Orbited.utf8.encode(payload)
;;;     self.logger.debug('encoded payload:', payload)
        X = payload
        session.send(payload)
        handshakeState = 'initial'
    }
    
    var sessionOnClose = function(code) {
;;;     self.logger.debug('sessionOnClose');
        // If we are in the OPENING state, then the handshake code should
        // handle the close
        doClose(code);
    }
};
Orbited.TCPSocket.prototype.logger = Orbited.getLogger("Orbited.TCPSocket");
Orbited.TCPSocket.prototype.READY_STATE_INITIALIZED  = 1;
Orbited.TCPSocket.prototype.READY_STATE_OPENING      = 2;
Orbited.TCPSocket.prototype.READY_STATE_OPEN         = 3;
Orbited.TCPSocket.prototype.READY_STATE_CLOSING      = 4;
Orbited.TCPSocket.prototype.READY_STATE_CLOSED       = 5;





// XXX: the Orbited.XSDR stuff (presumably) doesn't work yet.
//      mcarter - 8-9-08 (~rev 476)

Orbited.singleton.XSDR = {
    receiveCbs: {},
    queues: {},
    id: 0,
    register: function(receive, queue) {
        var id = ++Orbited.singleton.XSDR.id;
        Orbited.singleton.XSDR.receiveCbs[id] = receive;
        Orbited.singleton.XSDR.queues[id] = queue;
;;;     Orbited.system.debug('id is', id)
        return id;
    }
}
Orbited.XSDR = function() {
    var self = this;
    var ifr = null;
    var url;
    var method;
    var data;
    var requestHeaders;
    var queue = []
    var id = Orbited.singleton.XSDR.register(
        function(data) { receive(data) }, 
        queue
    )
    var bridgeUrl = new Orbited.URL("")
    bridgeUrl.domain = Orbited.settings.hostname
    bridgeUrl.port = Orbited.settings.port
    bridgeUrl.path = '/static/xsdrBridge.html'
    bridgeUrl.hash = id.toString();
    bridgeUrl.protocol = Orbited.settings.protocol
;;; self.logger.debug('bridgeUrl.hash is', bridgeUrl.hash);
;;; self.logger.debug('bridgeUrl.path is', bridgeUrl.path);
;;; self.logger.debug('bridgeUrl is', bridgeUrl.render());
    var reset = function() {
        self.responseText = ""
        self.status = null;
        self.readyState = 0;
        url = null;
        method = null;
        data = null;
        requestHeaders = {};

    }
    reset();
    self.onreadystatechange = function() { }
    self.open = function(_method, _url, async) {
        if (self.readyState == 4) {
            reset();
        }
        if (self.readyState != 0) {
            throw new Error("Invalid readyState");
        }
        if (!async) {
            throw new Error("Only Async XSDR supported")
        }
;;;     self.logger.debug('open', _method, _url, async)
        self.readyState = 1;
        url = _url;
        method = _method;        
    }

    self.send = function(data) {
        if (self.readyState != 1) {
            throw new Error("Invalid readyState");
        }
;;;     self.logger.debug('send', data)
        if (!ifr) {
;;;         self.logger.debug('creating iframe')
            ifr = document.createElement("iframe")
            hideIframe(ifr);
            ifr.src = bridgeUrl.render()
;;;         self.logger.debug('set ifr.src to', ifr.src);
            document.body.appendChild(ifr);
        }
        else {
            queue.push([method, url, data, requestHeaders]);
        }
    }

    self.abort = function() {
        if (self.readyState > 0 && self.readyState < 4) {
            // TODO: push an ABORT command (so as not to reload the iframe)
//            queue.push(['ABORT']);
;;;         self.logger.debug('ABORT called');
            ifr.src = "about:blank"
            document.body.removeChild(ifr)
            ifr = null;
            self.readyState = 4;
            self.onreadystatechange();
        }
    }



//    self.abort = function() {
//        if (self.readyState > 0 && self.readyState < 4) {
//            queue.push(['ABORT']);
//        }
//    }

    self.setRequestHeader = function(key, val) {
        if (self.readyState != 0) {
            throw new Error("Invalid readyState");
        }
        requestHeaders[key] = val;
    }

    self.getResponseHeader = function() {
        if (self.readyState < 2) {
            throw new Error("Invalid readyState");
        }
        return responseHeaders[key]
    }

    var receive = function(payload) {
;;;     self.logger.debug('received', payload)
        switch(payload[0]) {
            case 'initialized':
                queue.push([method, url, data, requestHeaders]);
;;;             self.logger.debug('queue is', queue)
;;;             self.logger.debug('Orbited.singleton.XSDR.queues[id] is', Orbited.singleton.XSDR.queues[id])
                break;
            case 'readystatechange':
                var data = payload[1]
                self.readyState = data.readyState
;;;             self.logger.debug('readystatechange', self.readyState)
                if (data.status) {
                    self.status = data.status
;;;                 self.logger.debug('status', data.status)
                }
                if (data.responseText) {
                    self.responseText += data.responseText
;;;                 self.logger.debug('responseText', data.responseText)
                }
;;;             self.logger.debug('doing trigger');
                self.onreadystatechange();
;;;             self.logger.debug('trigger complete');
        }
    }

    var hideIframe =function (ifr) {
        ifr.style.display = 'block';
        ifr.style.width = '0';
        ifr.style.height = '0';
        ifr.style.border = '0';
        ifr.style.margin = '0';
        ifr.style.padding = '0';
        ifr.style.overflow = 'hidden';
        ifr.style.visibility = 'hidden';
    }
    
}

if (Orbited.util.browser == "opera")
{
    document.addEventListener('message', function(e) {
        var msg = e.data.split(" ");
        var cmd = msg.shift();
        if (cmd == "event") 
        {
            var id = msg.shift();
            var dataString = msg.join(" ");
            var data = JSON.parse(dataString);
    
            Orbited.singleton.XSDR.receiveCbs[id](data)
        }
        if (cmd == "queues")
        {
            var id = msg.shift();
            var queue = Orbited.singleton.XSDR.queues[id];
            if (queue.length > 0) {
                var data = queue.shift();
                e.source.postMessage(JSON.stringify(data), e.origin);
            }
        }
    }, false
    );
}

Orbited.XSDR.prototype.logger = Orbited.getLogger("Orbited.XSDR");
Orbited.singleton.XSDRBridgeLogger = Orbited.getLogger('XSDRBridge');

/* Comet Transports!
 */

Orbited.CometTransports.XHRStream = function() {
    var self = this;
    self.name = 'xhrstream'
    var url = null;
    var xhr = null;
    var ackId = null;
    var offset = 0;
    var heartbeatTimer = null;
    var retryTimer = null;
    var buffer = ""
    var retryInterval = 50
    self.readyState = 0
    self.onReadFrame = function(frame) {}
    self.onread = function(packet) { self.onReadFrame(packet); }
    self.onclose = function() { }

    self.close = function() {
        if (self.readyState == 2) {
            return
        }
        if (xhr != null && (xhr.readyState > 1 || xhr.readyState < 4)) {
            xhr.onreadystatechange = function() { }
            xhr.abort()
            xhr = null;
        }
        self.readyState = 2
        window.clearTimeout(heartbeatTimer);
        window.clearTimeout(retryTimer);
        self.onclose();
    }

    self.connect = function(_url) {
        if (self.readyState == 1) {
            throw new Error("Already Connected")
        }
        url = new Orbited.URL(_url)
        if (xhr == null) {
            if (url.isSameDomain(location.href)) {
                xhr = createXHR();
            }
            else {
                xhr = new Orbited.XSDR();
            }
        }
        url.path += '/xhrstream'
//        url.setQsParameter('transport', 'xhrstream')
        self.readyState = 1
        open()
    }
    var open = function() {
        try {
            if (typeof(ackId) == "number") {
                url.setQsParameter('ack', ackId)
            }
            if (typeof(xhr)== "undefined" || xhr == null) {
                throw new Error("how did this happen?");
            }
            if (Orbited.settings.enableFFPrivleges) {
                try { 
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); 
                } catch (ex) { } 
            }        
            
            xhr.open('GET', url.render(), true)
            xhr.onreadystatechange = function() {
;;;             self.logger.debug(xhr.readyState);
                if (self.readyState == 2) { 
                    return
                }
                switch(xhr.readyState) {
                    case 2:
                        // If we can't get the status, then we didn't actually
                        // get a valid xhr response -- we got a network error
                        try {
                            var status = xhr.status
                        }
                        catch(e) {
                            return
                        }
                        // If we got a 200, then we're in business
                        if (status == 200) {
                            heartbeatTimer = window.setTimeout(heartbeatTimeout, Orbited.settings.HEARTBEAT_TIMEOUT);
                            var testtimer = heartbeatTimer;
                        }
                        // Otherwise, case 4 should handle the reconnect,
                        // so do nothing here.
                        break;
                    case 3:
                        // If we can't get the status, then we didn't actually
                        // get a valid xhr response -- we got a network error
                        try {
                            var status = xhr.status
                        }
                        catch(e) {
                            return
                        }
                        // We successfully established a connection, so put the
                        // retryInterval back to a short value
                        if (status == 200) {
                            retryInterval = 50;
                            process();
                        }
                        break;
                    case 4:
                        var doReconnect = true;
                        try {
                            if (xhr.status === null) {
                                doReconnect = true;
                            }
                            else {
                                doReconnect = false;
                            }
                        }
                        catch(e) {
                        }
                        if (doReconnect) {
                            // Expoential backoff: Every time we fail to 
                            // reconnect, double the interval.
                            // TODO cap the max value. 
                            retryInterval *= 2;
//                            self.logger.debug('retryInterval', retryInterval)
                            window.clearTimeout(heartbeatTimer);
                            retryTimer = window.setTimeout(reconnect, retryInterval)
                            return;
                        }
                        switch(xhr.status) {
                            case 200:
//                                alert('finished, call process');
//                               if (typeof(Orbited) == "undefined") {
//                                    alert('must have reloaded')
//                                    break
//                                }
//                                alert('a');
//                                alert('stream over ' +  typeof(console) + ' ' + typeof(Orbited) + ' ' + Orbited + ' ...');
                                process();
                                offset = 0;
                                setTimeout(open, 0)
                                window.clearTimeout(heartbeatTimer);
                                break;
                            case 404:
                                self.close();
                            default:
                                self.close();
                        }
                }
            }
            xhr.send(null);
        }
        catch(e) {
            self.close()
        }
    }

    var reconnect = function() {
//        self.logger.debug('reconnect...')
        if (xhr.readyState < 4 && xhr.readyState > 0) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    reconnect();
                }
            }
//            self.logger.debug('do abort..')
            xhr.abort();
            window.clearTimeout(heartbeatTimer);            
        }
        else {
;;;         self.logger.debug('reconnect do open')
            offset = 0;
            setTimeout(open, 0)
        }
    }
    // 12,ab011,hello world
    var commaPos = -1;
    var argEnd = null;
    var frame = []
    var process = function() {
        var stream = xhr.responseText;
        receivedHeartbeat()

        // ignore leading whitespace, such as at the start of an xhr stream
        while (stream[offset] == ' ') {
            offset += 1
        }
        // ignore leading whitespace, such as at the start of an xhr stream
        while (stream[offset] == 'x') {
            offset += 1
        }

        var k = 0
        while (true) {
            k += 1
            if (k > 2000) {
                throw new Error("Borked XHRStream transport");
                return
            }
            if (commaPos == -1) {
                commaPos = stream.indexOf(',', offset)
            }
            if (commaPos == -1) {
                return
            }
            if (argEnd == null) {
                argSize = parseInt(stream.slice(offset+1, commaPos))
                argEnd = commaPos +1 + argSize
            }
            
            if (stream.length < argEnd) {
                return
            }
            var data = stream.slice(commaPos+1, argEnd)
            frame.push(data)
            var isLast = (stream.charAt(offset) == '0')
            offset = argEnd;
            argEnd = null;
            commaPos = -1
            if (isLast) {
                var frameCopy = frame
                frame = []
                receivedPacket(frameCopy)                
            }
        } 

    }
    var receivedHeartbeat = function() {
        window.clearTimeout(heartbeatTimer);
;;;     self.logger.debug('clearing heartbeatTimer', heartbeatTimer)
        heartbeatTimer = window.setTimeout(function() { 
;;;         self.logger.debug('timer', testtimer, 'did it'); 
            heartbeatTimeout();
        }, Orbited.settings.HEARTBEAT_TIMEOUT);
        var testtimer = heartbeatTimer;

;;;     self.logger.debug('heartbeatTimer is now', heartbeatTimer)
    }
    var heartbeatTimeout = function() {
;;;     self.logger.debug('heartbeat timeout... reconnect')
        reconnect();
    }
    var receivedPacket = function(args) {
        var testAckId = parseInt(args[0])
        if (!isNaN(testAckId)) {
            ackId = testAckId
        }
        var packet = {
            id: testAckId,
            name: args[1],
            data: args[2]
        }
        // TODO: shouldn't we put this in a window.setTimeout so that user
        //       code won't mess up our code?
        self.onread(packet)
    }
}
Orbited.CometTransports.XHRStream.prototype.logger = Orbited.getLogger("Orbited.CometTransports.XHRStream");
// XHRStream supported browsers
Orbited.CometTransports.XHRStream.firefox = 1.0
Orbited.CometTransports.XHRStream.firefox2 = 1.0
Orbited.CometTransports.XHRStream.firefox3 = 1.0
Orbited.CometTransports.XHRStream.safari2 = 1.0
Orbited.CometTransports.XHRStream.safari3 = 1.0





Orbited.CometTransports.LongPoll = function() {
    var self = this;
    self.name = 'longpoll'
    var url = null;
    var xhr = null;
    var ackId = null;
    var retryTimer = null;
    var buffer = ""
    var retryInterval = 50
    self.readyState = 0
    self.onReadFrame = function(frame) {}
    self.onclose = function() { }

    self.close = function() {
        if (self.readyState == 2) {
            return
        }
        if (xhr != null && (xhr.readyState > 1 || xhr.readyState < 4)) {
            xhr.onreadystatechange = function() { }
            xhr.abort()
            xhr = null;
        }
        self.readyState = 2
        window.clearTimeout(retryTimer);
        self.onclose();
    }

    self.connect = function(_url) {
        if (self.readyState == 1) {
            throw new Error("Already Connected")
        }
        url = new Orbited.URL(_url)
        if (xhr == null) {
            if (url.isSameDomain(location.href)) {
                xhr = createXHR();
            }
            else {
                xhr = new Orbited.XSDR();
            }
        }
        url.path += '/longpoll'
//        url.setQsParameter('transport', 'xhrstream')
        self.readyState = 1
        open()
    }
    var open = function() {
        try {
            if (typeof(ackId) == "number") {
                url.setQsParameter('ack', ackId)
            }
            if (typeof(xhr)== "undefined" || xhr == null) {
                throw new Error("how did this happen?");
            }
            
            if (Orbited.settings.enableFFPrivleges) {
                try { 
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); 
                } catch (ex) { } 
            }        
            xhr.open('GET', url.render(), true)
            xhr.onreadystatechange = function() {
;;;             self.logger.debug('readystate', xhr.readyState)
                switch(xhr.readyState) {
                   case 4:
                        try {
                            xhr.status
                        }
                        catch(e) {
                            // Expoential backoff: Every time we fail to 
                            // reconnect, double the interval.
                            // TODO cap the max value. 
;;;                         self.logger.debug("start reconnect Timer (couldn't access xhr.status)")
                            retryInterval *= 2;
                            window.setTimeout(reconnect, retryInterval)
                            return;
                        }
                        switch(xhr.status) {
                            case 200:
                                process();
;;;                         self.logger.debug("completed request, reconnect immediately")
                                setTimeout(open, 0)
                                break;
                            case 404:
                                self.close();
                                break
                            case null:
                                // NOTE: for the XSDR case: 
                                // (we can always get status, but maybe its null)
                                retryInterval *= 2;
;;;                         self.logger.debug("start reconnect Timer (null xhr.status)")
                                window.setTimeout(reconnect, retryInterval)
                                break;                                
                            default:
                                // TODO: do we want to retry here?
;;;                         self.logger.debug("something broke, xhr.status=", xhr.status)
                                self.close();
                                break
                        }
                }
            }
            xhr.send(null);
        }
        catch(e) {
            self.close()
        }
    }

    var reconnect = function() {
;;;     self.logger.debug('reconnect...')
        if (xhr.readyState < 4 && xhr.readyState > 0) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    reconnect();
                }
            }
;;;         self.logger.debug('do abort..')
            xhr.abort();
            window.clearTimeout(heartbeatTimer);            
        }
        else {
;;;         self.logger.debug('reconnect do open')
            offset = 0;
            setTimeout(open, 0)
        }
    }
    // 12,ab011,hello world
    var process = function() {
        var commaPos = -1;
        var argEnd = null;
        var argSize;
        var frame = []
        var stream = xhr.responseText;
        var offset = 0


        var k = 0
        while (true) {
            k += 1
            if (k > 2000) {
                throw new Error("Borked XHRStream transport");
                return
            }
            if (commaPos == -1) {
                commaPos = stream.indexOf(',', offset)
            }
            if (commaPos == -1) {
;;;             self.logger.debug('no more commas. offset:', offset, 'stream.length:', stream.length);
                return
            }
            if (argEnd == null) {
                argSize = parseInt(stream.slice(offset+1, commaPos))
                argEnd = commaPos +1 + argSize
            }
;;;         self.logger.assert(true);
/*            if (stream.length < argEnd) {
;;;             self.logger.debug('how did we get here? stream.length:', stream.length, 'argEnd:', argEnd, 'offset:', offset)
                return
            }*/
            var data = stream.slice(commaPos+1, argEnd)
;;;         self.logger.assert(data.length == argSize, 'argSize:', argSize, 'data.length', data.length)
            if (data.length != argSize) {
                DEBUGDATA = stream
            }
            frame.push(data)
            var isLast = (stream.charAt(offset) == '0')
            offset = argEnd;
            argEnd = null;
            commaPos = -1
            if (isLast) {
                var frameCopy = frame
                frame = []
                receivedPacket(frameCopy)                
            }
        } 

    }
    var receivedPacket = function(args) {
        var testAckId = parseInt(args[0])
;;;     self.logger.debug('args', args)
        if (!isNaN(testAckId)) {
            ackId = testAckId
        }
;;;     self.logger.debug('testAckId', testAckId, 'ackId', ackId)
        var packet = {
            id: testAckId,
            name: args[1],
            data: args[2]
        }
        // TODO: shouldn't we put this in a window.setTimeout so that user
        //       code won't mess up our code?
        self.onReadFrame(packet)
    }
}
Orbited.CometTransports.LongPoll.prototype.logger = Orbited.getLogger("Orbited.CometTransports.LongPoll");
// LongPoll supported browsers
/*
Orbited.CometTransports.LongPoll.firefox = 0.9
Orbited.CometTransports.LongPoll.firefox2 = 0.9
Orbited.CometTransports.LongPoll.firefox3 = 0.9
Orbited.CometTransports.LongPoll.safari2 = 0.9
Orbited.CometTransports.LongPoll.safari3 = 0.9
Orbited.CometTransports.LongPoll.opera = 0.9
Orbited.CometTransports.LongPoll.ie = 0.9
*/



Orbited.CometTransports.Poll = function() {
    var self = this;
    self.name = 'poll'
    var url = null;
    var xhr = null;
    var ackId = null;
    var retryTimer = null;
    var buffer = ""
    var baseRetryInterval = Orbited.settings.POLL_INTERVAL
    var retryInterval = baseRetryInterval;
    self.readyState = 0
    self.onReadFrame = function(frame) {}
    self.onclose = function() { }

    self.close = function() {
        if (self.readyState == 2) {
            return
        }
        if (xhr != null && (xhr.readyState > 1 || xhr.readyState < 4)) {
            xhr.onreadystatechange = function() { }
            xhr.abort()
            xhr = null;
        }
        self.readyState = 2
        window.clearTimeout(retryTimer);
        self.onclose();
    }

    self.connect = function(_url) {
        if (self.readyState == 1) {
            throw new Error("Already Connected")
        }
        url = new Orbited.URL(_url)
        if (xhr == null) {
            if (url.isSameDomain(location.href)) {
                xhr = createXHR();
            }
            else {
                xhr = new Orbited.XSDR();
            }
        }
        url.path += '/poll'
//        url.setQsParameter('transport', 'xhrstream')
        self.readyState = 1
        open()
    }
    var open = function() {
        try {
            if (typeof(ackId) == "number") {
                url.setQsParameter('ack', ackId)
            }
            if (typeof(xhr)== "undefined" || xhr == null) {
                throw new Error("how did this happen?");
            }
            
            if (Orbited.settings.enableFFPrivleges) {
                try { 
                    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); 
                } catch (ex) { } 
            }        
            xhr.open('GET', url.render(), true)
            xhr.onreadystatechange = function() {
                switch(xhr.readyState) {
                   case 4:
                        try {
                            xhr.status
                        }
                        catch(e) {
                            // Expoential backoff: Every time we fail to 
                            // reconnect, double the interval.
                            // TODO cap the max value. 
                            retryInterval *= 2;
                            window.setTimeout(reconnect, retryInterval)
                            return;
                        }
                        switch(xhr.status) {
                            case 200:
                                retryInterval = baseRetryInterval;
                                process();
                                setTimeout(open, retryInterval)
                                break;
                            case 404:
                                self.close();
                                break
                            case null:
                                // NOTE: for the XSDR case: Long
                                // (we can always get status, but maybe its null)
                                retryInterval *= 2;
                                window.setTimeout(reconnect, retryInterval)
                                break;                                
                            default:
                                // TODO: do we want to retry here?
                                self.close();
                                break
                        }
                }
            }
            xhr.send(null);
        }
        catch(e) {
            self.close()
        }
    }

    var reconnect = function() {
;;;     self.logger.debug('reconnect...')
        if (xhr.readyState < 4 && xhr.readyState > 0) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    reconnect();
                }
            }
;;;         self.logger.debug('do abort..')
            xhr.abort();
            window.clearTimeout(heartbeatTimer);            
        }
        else {
;;;         self.logger.debug('reconnect do open')
            offset = 0;
            setTimeout(open, 0)
        }
    }
    // 12,ab011,hello world
    var process = function() {
        var commaPos = -1;
        var argEnd = null;
        var argSize;
        var frame = []
        var stream = xhr.responseText;
        var offset = 0


        var k = 0
        while (true) {
            k += 1
            if (k > 2000) {
                throw new Error("Borked XHRStream transport");
                return
            }
            if (commaPos == -1) {
                commaPos = stream.indexOf(',', offset)
            }
            if (commaPos == -1) {
;;;             self.logger.debug('no more commas. offset:', offset, 'stream.length:', stream.length);
                return
            }
            if (argEnd == null) {
                argSize = parseInt(stream.slice(offset+1, commaPos))
                argEnd = commaPos +1 + argSize
            }
;;;         self.logger.assert(true);
/*            if (stream.length < argEnd) {
;;;             self.logger.debug('how did we get here? stream.length:', stream.length, 'argEnd:', argEnd, 'offset:', offset)
                return
            }*/
            var data = stream.slice(commaPos+1, argEnd)
;;;         self.logger.assert(data.length == argSize, 'argSize:', argSize, 'data.length', data.length)
            if (data.length != argSize) {
                DEBUGDATA = stream
            }
            frame.push(data)
            var isLast = (stream.charAt(offset) == '0')
            offset = argEnd;
            argEnd = null;
            commaPos = -1
            if (isLast) {
                var frameCopy = frame
                frame = []
                receivedPacket(frameCopy)                
            }
        } 

    }
    var receivedPacket = function(args) {
        var testAckId = parseInt(args[0])
;;;     self.logger.debug('args', args)
        if (!isNaN(testAckId)) {
            ackId = testAckId
        }
;;;     self.logger.debug('testAckId', testAckId, 'ackId', ackId)
        var packet = {
            id: testAckId,
            name: args[1],
            data: args[2]
        }
        // TODO: shouldn't we put this in a window.setTimeout so that user
        //       code won't mess up our code?
        self.onReadFrame(packet)
    }
}
Orbited.CometTransports.Poll.prototype.logger = Orbited.getLogger("Orbited.CometTransports.Poll");

// Poll supported browsers
/*Orbited.CometTransports.Poll.firefox = 0.5
Orbited.CometTransports.Poll.opera = 0.5
Orbited.CometTransports.Poll.ie = 0.5
*/





Orbited.CometTransports.HTMLFile = function() {
    var self = this;
    self.name = 'htmlfile'
    var id = ++Orbited.singleton.HTMLFile.i;
    Orbited.singleton.HTMLFile.instances[id] = self;
    var htmlfile = null
    var ifr = null;
    var url = null;
    var restartUrl = null;
    var restartTimer = null;
    // TODO: move constant to Orbited.settings
    var baseRestartTimeout = 2000;
    var restartTimeout = baseRestartTimeout;
    self.onReadFrame = function(frame) {}
    self.onread = function(packet) { self.onReadFrame(packet); }
    self.onclose = function() { }
    self.connect = function(_url) {
        if (self.readyState == 1) {
            throw new Error("Already Connected")
        }
        url = new Orbited.URL(_url)
        url.path += '/htmlfile'
        url.setQsParameter('frameID', id.toString())
        self.readyState = 1
        doOpen(url.render())
    }

    var doOpenIfr = function() {
        
        var ifr = document.createElement('iframe')
        ifr.src = url.render()
        document.body.appendChild(ifr)
    }

    var doOpen = function(_url) {
        htmlfile = new ActiveXObject('htmlfile'); // magical microsoft object
        htmlfile.open();
//        htmlfile.write('<html><script>' + 'document.domain="' + document.domain + '";' + '</script></html>');
        htmlfile.write('<html></html>');
        htmlfile.parentWindow.Orbited = Orbited;
        htmlfile.close();
        var iframe_div = htmlfile.createElement('div');
        htmlfile.body.appendChild(iframe_div);
        ifr = htmlfile.createElement('iframe');
        iframe_div.appendChild(ifr);
        ifr.src = _url;
        restartUrl = _url;
        restartTimer = window.setTimeout(reconnect, restartTimeout)
    }
    
    // TODO: expose this in another way besides the public api
    self.restartingStream = function(_url) {
        restartUrl = _url;
        restartTimer = window.setTimeout(reconnect, restartTimeout)
    }
    
    var reconnect = function() {
;;;     self.logger.debug('doing reconnect... ' + restartTimeout);
        restartTimeout*=2;
        ifr.src = restartUrl;
        restartTimer = window.setTimeout(reconnect, restartTimeout)        
    }

    self.streamStarted = function() {
;;;     self.logger.debug('stream started..');
        window.clearTimeout(restartTimer);
        restartTimer = null;
        restartTimeout = baseRestartTimeout;
    }
    
    self.streamClosed = function() {
;;;     self.logger.debug('stream closed!');
        window.clearTimeout(restartTimer);
        self.close()
    }

    self.receive = function(id, name, data) {
        packet = {
            id: id,
            name: name,
            data: data
        }
        self.onread(packet)
    }
    
    self.close = function() {
        if (self.readyState == 2) {
            return
        }
;;;     self.logger.debug('close called, clearing timer');
        window.clearTimeout(restartTimer);
        self.readyState = 2
        ifr.src = 'about:blank'
        htmlfile = null;
        CollectGarbage();
        self.onclose();
    }

}
Orbited.CometTransports.HTMLFile.prototype.logger = Orbited.getLogger("Orbited.CometTransports.HTMLFile");
// HTMLFile supported browsers
Orbited.CometTransports.HTMLFile.ie = 1.0;
Orbited.singleton.HTMLFile = {
    i: 0,
    instances: {}
}




Orbited.CometTransports.SSE = function() {
    var self = this;
    self.name = 'sse'
    self.onReadFrame = function(frame) {}
    self.onclose = function() { }
    self.readyState = 0;
    var heartbeatTimer = null;
    var source = null
    var url = null;
    var lastEventId = -1;

    self.close = function() {
        if (self.readyState == 2) {
            return;
        }
        // TODO: can someone test this and get back to me? (No opera at the moment)
        //     : -mcarter 7-26-08
        self.readyState = 2
        doClose();
        self.onclose();
    }

    self.connect = function(_url) {
        if (self.readyState == 1) {
            throw new Error("Already Connected")
        }
        url = new Orbited.URL(_url)
        url.path += '/sse'
        self.readyState = 1
        doOpen();
    }
    doClose = function() {
        source.removeEventSource(source.getAttribute('src'))
        source.setAttribute('src',"")
        if (opera.version() < 9.5) {
            document.body.removeChild(source)
        }
        source = null;
    }
    doOpen = function() {
/*
        if (typeof(lastEventId) == "number") {
            url.setQsParameter('ack', lastEventId)
        }
*/
        source = document.createElement("event-source");
        source.setAttribute('src', url.render());
        // NOTE: without this check opera 9.5 would make two connections.
        if (opera.version() < 9.5) {
            document.body.appendChild(source);
        }
        source.addEventListener('payload', receivePayload, false);

//        source.addEventListener('heartbeat', receiveHeartbeat, false);
        // start up the heartbeat timer...
//        receiveHeartbeat();
    }

    var receivePayload = function(event) {
        var data = eval(event.data);
        if (typeof(data) != 'undefined') {
            for (var i = 0; i < data.length; ++i) {
                var packet = data[i]
                receive(packet[0], packet[1], packet[2]);
            }
        }
    
    }
/*    var receiveHeartbeat = function() {
        window.clearTimeout(heartbeatTimer);
        heartbeatTimer = window.setTimeout(reconnect, Orbited.settings.HEARTBEAT_TIMEOUT)
    }
*/
    var receive = function(id, name, data) {
        var tempId = parseInt(id);
        if (!isNaN(tempId)) {
            // NOTE: The old application/x-dom-event-stream transport doesn't
            //       allow us to put in the lastEventId on reconnect, so we are
            //       bound to get double copies of some of the events. Therefore
            //       we are going to throw out the duplicates. Its not clear to
            //       me that this is a perfect solution.
            //       -mcarter 8-9-08
            if (tempId <= lastEventId) {
                return
            }
            lastEventId = tempId;
        }
        // NOTE: we are dispatching null-id packets. Is this correct?
        //       -mcarter 9-8-08
        packet = {
            id: id,
            name: name,
            data: data
        }
        self.onReadFrame(packet)
    }
}
Orbited.CometTransports.SSE.prototype.logger = Orbited.getLogger("Orbited.CometTransports.SSE");

Orbited.CometTransports.SSE.opera = 1.0;
Orbited.CometTransports.SSE.opera8 = 1.0;
Orbited.CometTransports.SSE.opera9 = 1.0;
Orbited.CometTransports.SSE.opera9_5 = 0.8;



/* This is an old implementation of the URL class. Jacob is cleaning it up
 * mcarter, 7-30-08
 */
Orbited.URL = function(_url) {
    var self = this;
    var protocolIndex = _url.indexOf("://")
    if (protocolIndex != -1)
        self.protocol = _url.slice(0,protocolIndex)
    else
        protocolIndex = -3
    var domainIndex = _url.indexOf('/', protocolIndex+3)
    if (domainIndex == -1)
        domainIndex=_url.length
    var hashIndex = _url.indexOf("#", domainIndex)
    if (hashIndex != -1)
        self.hash = _url.slice(hashIndex+1)
    else
        hashIndex = _url.length
    var uri = _url.slice(domainIndex, hashIndex)
    var qsIndex = uri.indexOf('?')
    if (qsIndex == -1)
        qsIndex=uri.length
    self.path = uri.slice(0, qsIndex)
    self.qs = uri.slice(qsIndex+1)
    if (self.path == "")
        self.path = "/"
    var domain = _url.slice(protocolIndex+3, domainIndex)
    var portIndex = domain.indexOf(":")
    if (portIndex == -1) {
        self.port = 80
        portIndex = domain.length
    }
    else {
        self.port = parseInt(domain.slice(portIndex+1))
    }
    if (isNaN(this.port))
        throw new Error("Invalid _url")
    self.domain = domain.slice(0, portIndex)

    self.render = function() {
        var output = ""
        if (typeof(self.protocol) != "undefined")
            output += self.protocol + "://"
        output += self.domain
        if (self.port != 80 && typeof(self.port) != "undefined" && self.port != null)
            if (typeof(self.port) != "string" || self.port.length > 0)
                output += ":" + self.port
        if (typeof(self.path) == "undefined" || self.path == null)
            output += '/'
        else
            output += self.path
        if (self.qs.length > 0)
            output += '?' + self.qs
        if (typeof(self.hash) != "undefined" && self.hash.length > 0)
            output += "#" + self.hash
        return output
    }
    self.isSameDomain = function(_url) {
        _url = new Orbited.URL(_url)

        if (!_url.domain || !self.domain)
            return true
        return (_url.port == self.port && _url.domain == self.domain)
    }
    self.isSameParentDomain = function(_url) {
        _url = new Orbited.URL(_url)
        if (_url.domain == self.domain) {
            return true;
        }
        var orig_domain = _url.domain;
        var parts = document.domain.split('.')
//        var orig_domain = document.domain
        for (var i = 0; i < parts.length-1; ++i) {
            var new_domain = parts.slice(i).join(".")
            if (orig_domain == new_domain)
                return true;
        }
        return false
    }

    var decodeQs = function(qs) {
    //    alert('a')
        if (qs.indexOf('=') == -1) return {}
        var result = {}
        var chunks = qs.split('&')
        for (var i = 0; i < chunks.length; ++i) {
            var cur = chunks[i]
            var pieces = cur.split('=')
            result[pieces[0]] = pieces[1]
        }
        return result
    }
    var encodeQs = function(o) {
            var output = ""
            for (var key in o)
                output += "&" + key + "=" + o[key]
            return output.slice(1)
        }
    self.setQsParameter = function(key, val) {
        var curQsObj = decodeQs(self.qs)
        curQsObj[key] = val
        self.qs = encodeQs(curQsObj)
    }

    self.mergeQs = function(qs) {
        var newQsObj = decodeQs(qs)
        for (key in newQsObj) {
            curQsObj[key] = newQsObj[key]
        }
    }
    self.removeQsParameter = function(key) {
        var curQsObj = decodeQs(self.qs)
        delete curQsObj[key]
        self.qs = encodeQs(curQsObj)
    }

    self.merge = function(targetUrl) {
        if (typeof(self.protocol) != "undefined" && self.protocol.length > 0) {
            self.protocol = targetUrl.protocol
        }
        if (targetUrl.domain.length > 0) {
            self.domain = targetUrl.domain
            self.port = targetUrl.port
        }
        self.path = targetUrl.path
        self.qs = targetUrl.qs
        self.hash = targetUrl.hash
    }

}

Orbited.utf8 = {}
Orbited.utf8.decode = function(s) {    
    var ret = [];
    var j = 0
    function pad6(str) {
        while(str.length < 6) { str = "0" + str; } return str;
    }
    for (var i=0; i < s.length; i++) {
        if ((s.charCodeAt(i) & 0xf8) == 0xf0) {
            if (s.length -j < 4) { break }
            j+=4;
            ret.push(String.fromCharCode(parseInt(
                         (s.charCodeAt(i) & 0x07).toString(2) +
                  pad6((s.charCodeAt(i+1) & 0x3f).toString(2)) +
                  pad6((s.charCodeAt(i+2) & 0x3f).toString(2)) +
                  pad6((s.charCodeAt(i+3) & 0x3f).toString(2))
                , 2)));
            i += 3;
        } else if ((s.charCodeAt(i) & 0xf0) == 0xe0) {
            if (s.length -j < 3) { break }
            j+=3;
            ret.push(String.fromCharCode(parseInt(
                  (s.charCodeAt(i) & 0x0f).toString(2) +
                  pad6((s.charCodeAt(i+1) & 0x3f).toString(2)) +
                  pad6((s.charCodeAt(i+2) & 0x3f).toString(2))
                , 2)));
            i += 2;
        } else if ((s.charCodeAt(i) & 0xe0) == 0xc0) {
            j+=2
            if (s.length -j < 2) { break }
                ret.push(String.fromCharCode(parseInt(
                       (s.charCodeAt(i) & 0x1f).toString(2) +
                pad6((s.charCodeAt(i+1) & 0x3f).toString(2), 6)
                , 2)));
            i += 1;
        } else {
            j+=1
            ret.push(String.fromCharCode(s.charCodeAt(i)));
        }
    }
    return [ret.join(""), j];
}

// TODO rename to encode
Orbited.utf8.encode = function(text) {
    var ret = [];
    
    function pad(str, len) {
        while(str.length < len) { str = "0" + str; } return str;
    }
    var e = String.fromCharCode
    for (var i=0; i < text.length; i++) {
        var chr = text.charCodeAt(i);
        if (chr <= 0x7F) {
            ret.push(e(chr));
        } else if(chr <= 0x7FF) {
            var binary = pad(chr.toString(2), 11);
            ret.push(e(parseInt("110"   + binary.substr(0,5), 2)));
            ret.push(e(parseInt("10"    + binary.substr(5,6), 2)));
        } else if(chr <= 0xFFFF) {
            var binary = pad(chr.toString(2), 16);
            ret.push(e(parseInt("1110"  + binary.substr(0,4), 2)));
            ret.push(e(parseInt("10"    + binary.substr(4,6), 2)));
            ret.push(e(parseInt("10"    + binary.substr(10,6), 2)));
        } else if(chr <= 0x10FFFF) {
            var binary = pad(chr.toString(2), 21);
            ret.push(e(parseInt("11110" + binary.substr(0,3), 2)));
            ret.push(e(parseInt("10"    + binary.substr(3,6), 2)));
            ret.push(e(parseInt("10"    + binary.substr(9,6), 2)));
            ret.push(e(parseInt("10"    + binary.substr(15,6), 2)));
        }
    }
    return ret.join("");
}


})();


if (!this.JSON) {

// Create a JSON object only if one does not already exist. We create the
// object in a closure to avoid creating global variables.

    JSON = function () {

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            escapeable.lastIndex = 0;
            return escapeable.test(string) ?
                '"' + string.replace(escapeable, function (a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    return '\\u' + ('0000' +
                            (+(a.charCodeAt(0))).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        }


        function str(key, holder) {

// Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

// What happens next depends on the value's type.

            switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// If the object has a dontEnum length property, we'll treat it as an array.

                if (typeof value.length === 'number' &&
                        !(value.propertyIsEnumerable('length'))) {

// The object is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                                partial.join(',\n' + gap) + '\n' +
                                    mind + ']' :
                              '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                            mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }

// Return the JSON object containing the stringify and parse methods.

        return {
            stringify: function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

// If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                        (typeof replacer !== 'object' ||
                         typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

                return str('', {'': value});
            },


            parse: function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' + ('0000' +
                                (+(a.charCodeAt(0))).toString(16)).slice(-4);
                    });
                }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function' ?
                        walk({'': j}, '') : j;
                }

// If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            }
        };
    }();
}
;

jQuery(function(){
  Legs = (function(socket){

    var remoteMethods = {
      patch:  function(patch) {
//         window.passbacks.push(JSON.stringify({method:'patch',args:[patch]}))
        window.passbacks.push(patch)
      }
    };

    var id=0;

    function do_send() {
      var method = [].shift.apply(arguments);
      var payload = {id:id++, method: method, params:arguments};
      socket.send(JSON.stringify(payload)+"\r\n");
    }
    
    // Thanks http://github.com/Bluebie for the tip
    // about making sure a full message has been
    // send down the wire!
    var in_buffer = "";
    socket.onread = function(new_data) {
      in_buffer = in_buffer + new_data;
      var splitted = in_buffer.split("\n", 2);
      if (splitted.length == 1) {
        return;
      } 
      else {
        var message = splitted[0]; 
        in_buffer = splitted[1];
        var rpc = JSON.parse(message);
        if(remoteMethods[rpc.method]) remoteMethods[rpc.method].apply(null, rpc.params);
      }
    };

    socket.open('localhost', '30274');

    return {
      diff: function(diff) {  
        do_send('diff', diff);
      }
    }
  })(new Orbited.TCPSocket());
});