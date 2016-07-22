(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","./Axis","../common/Utility","css!./XYAxis"],t):e.chart_XYAxis=t(e.d3,e.common_SVGWidget,e.chart_Axis,e.common_Utility)})(this,function(e,t,n,r){function i(){t.call(this),r.SimpleSelectionMixin.call(this),this._drawStartPos="origin",this.domainAxis=(new n).orientation_default("bottom").type_default("ordinal").overlapMode_default("stagger").shrinkToFit_default("high").extend_default(0),this.valueAxis=(new n).orientation_default("left").type_default("linear").shrinkToFit_default("high");var i=this;this.xBrush=e.svg.brush().on("brush",function(){return i.brushMoved()}),this.yBrush=e.svg.brush().on("brush",function(){return i.brushMoved()})}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" chart_XYAxis",i.prototype.mixin(r.SimpleSelectionMixin),i.prototype.publish("orientation","horizontal","set","Selects orientation for the axis",["horizontal","vertical"]),i.prototype.publish("selectionMode",!1,"boolean","Range Selector"),i.prototype.publishProxy("xAxisTickCount","domainAxis","tickCount"),i.prototype.publishProxy("xAxisTickFormat","domainAxis","tickFormat"),i.prototype.publishProxy("xAxisType","domainAxis","type"),i.prototype.publishProxy("xAxisTypeTimePattern","domainAxis","timePattern"),i.prototype.publish("xAxisDomainLow",null,"string","X-Axis Low",null,{optional:!0,disable:function(e){return e.xAxisType()==="ordinal"}}),i.prototype.publish("xAxisDomainHigh",null,"string","X-Axis High",null,{optional:!0,disable:function(e){return e.xAxisType()==="ordinal"}}),i.prototype.publishProxy("xAxisOverlapMode","domainAxis","overlapMode"),i.prototype.publishProxy("xAxisLabelRotation","domainAxis","labelRotation"),i.prototype.publishProxy("xAxisDomainPadding","domainAxis","extend"),i.prototype.publish("xAxisGuideLines",!1,"boolean","Y-Axis Guide Lines"),i.prototype.publish("xAxisFocus",!1,"boolean","X-Axis Focus",null,{disable:function(e){return e.orientation()!=="horizontal"}}),i.prototype.publish("xAxisFocusHeight",80,"number","X-Axis Focus Height",null,{disable:function(e){return!e.xAxisFocus()}}),i.prototype.publishProxy("yAxisTitle","valueAxis","title"),i.prototype.publishProxy("yAxisTickCount","valueAxis","tickCount"),i.prototype.publishProxy("yAxisTickFormat","valueAxis","tickFormat"),i.prototype.publishProxy("yAxisType","valueAxis","type"),i.prototype.publishProxy("yAxisTypeTimePattern","valueAxis","timePattern"),i.prototype.publishProxy("yAxisTypePowExponent","valueAxis","powExponent"),i.prototype.publishProxy("yAxisTypeLogBase","valueAxis","logBase"),i.prototype.publish("yAxisDomainLow",null,"string","Y-Axis Low",null,{optional:!0,disable:function(e){return e.yAxisType()==="ordinal"}}),i.prototype.publish("yAxisDomainHigh",null,"string","Y-Axis High",null,{optional:!0,disable:function(e){return e.yAxisType()==="ordinal"}}),i.prototype.publishProxy("yAxisDomainPadding","valueAxis","extend"),i.prototype.publish("yAxisGuideLines",!0,"boolean","Y-Axis Guide Lines"),i.prototype.publish("regions",[],"array","Regions"),i.prototype.publish("sampleData","","set","Display Sample Data",["","ordinal","ordinalRange","linear","time-x","time-y"]),i.prototype.resetSelection=function(){return this._prevBrush=null,this},i.prototype.columns=function(e){return t.prototype.columns.apply(this,arguments)},i.prototype.parseData=function(e){return this.domainAxis.parse(e)},i.prototype.parseValue=function(e){return this.valueAxis.parse(e,!0)},i.prototype.formatData=function(e){return this.domainAxis.format(e)},i.prototype.formatValue=function(e){return this.valueAxis.format(e,!0)},i.prototype.parsedData=function(){return this.data().map(function(e){return e.map(function(e,t){return t===0?this.parseData(e):t>=this.columns().length?e:this.parseValue(e)},this)},this)},i.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments),this.svg=n.append("g"),this.svgRegions=n.append("g"),this.svgDomainGuide=this.svg.append("g"),this.svgValueGuide=this.svg.append("g"),this.svgData=this.svg.append("g"),this.svgDataClipRect=this.svg.append("clipPath").attr("id",this.id()+"_clippath").append("rect").attr("x",0).attr("y",0),this.svgData=this.svg.append("g").attr("clip-path","url(#"+this.id()+"_clippath)"),this._selection.widgetElement(this.svgData),this.svgFocus=n.append("g"),this.domainAxis.target(this.svg.node()).guideTarget(this.svgDomainGuide.node()),this.valueAxis.target(this.svg.node()).guideTarget(this.svgValueGuide.node()),this.svgBrush=n.append("g").attr("class","brush")},i.prototype.resizeBrushHandle=function(e,t,n){var r,i,s;return e==="e"||e==="w"?(r=+(e==="e"),i=r?1:-1,s=n/3,"M"+.5*i+","+s+"A6,6 0 0 "+r+" "+6.5*i+","+(s+6)+"V"+(2*s-6)+"A6,6 0 0 "+r+" "+.5*i+","+2*s+"Z"+"M"+2.5*i+","+(s+8)+"V"+(2*s-8)+"M"+4.5*i+","+(s+8)+"V"+(2*s-8)):(r=+(e==="s"),s=r?1:-1,i=t/3,"M"+i+", "+.5*s+"A6,6 0 0 "+(r+1)%2+" "+(i+6)+","+6.5*s+"H"+(2*i-6)+"A6,6 0 0 "+(r+1)%2+" "+2*i+","+.5*s+"Z"+"M"+(i+8)+","+2.5*s+"H"+(2*i-8)+"M"+(i+8)+","+4.5*s+"H"+(2*i-8))},i.prototype.brushMoved=t.prototype.debounce(function(){var t=this.data().filter(function(e){var t=e[0];return this.xAxisType()==="ordinal"&&(t=this.domainAxis.d3Scale(t)+(this.domainAxis.d3Scale.rangeBand?this.domainAxis.d3Scale.rangeBand()/2:0)),this.orientation()==="horizontal"?t>=this.xBrush.extent()[0]&&t<=this.xBrush.extent()[1]:t>=this.yBrush.extent()[0]&&t<=this.yBrush.extent()[1]},this);this.selection(t)},250),i.prototype.dataPos=function(e){return this.domainAxis.scalePos(e)},i.prototype.valuePos=function(e){return this.valueAxis.scalePos(e)},i.prototype.setScaleRange=function(e,t){this.xAxis.width(e),this.yAxis.height(t)},i.prototype.calcMargin=function(e,t,n){var r={top:!n&&this.selectionMode()?10:2,right:n&&(this.selectionMode()||this.xAxisFocus())?10:2,bottom:(this.xAxisFocus()?this.xAxisFocusHeight():0)+2,left:2},i=this.width()-r.left-r.right,s=this.height()-r.top-r.bottom,o=30,u=30;for(var a=0;a<10;++a){this.xAxis.width(i-u).height(0);var f=this.xAxis.calcOverflow(t);this.yAxis.width(0).height(s-o);var l=this.yAxis.calcOverflow(t),c=f.depth,h=l.depth;if(c===o&&h===u){o=c,u=h;break}o=c,u=h}return this.xAxis.x(i/2+u/2+r.left).y(s+r.top).width(i-u),this.yAxis.x(r.left).y(s/2-o/2+r.top).height(s-o),r.left+=u,r.bottom+=o,r},i.prototype.updateRegions=function(t,n,r){var i=this,s=this.svgRegions.selectAll(".region").data(this.regions());s.enter().append("rect").attr("class","region"),r?s.attr("x",function(e){return i.dataPos(e.x0)}).attr("y",0).attr("width",function(e){return i.dataPos(e.x1)-i.dataPos(e.x0)}).attr("height",this.height()).style("stroke",function(e){return i._palette(e.colorID)}).style("fill",function(t){return e.hsl(i._palette(t.colorID)).brighter()}):s.attr("x",0).attr("y",function(e){return i.dataPos(e.x0)}).attr("width",this.width()).attr("height",function(e){return i.dataPos(e.x0)-i.dataPos(e.x1)}).style("stroke",function(e){return i._palette(e.colorID)}).style("fill",function(t){return e.hsl(i._palette(t.colorID)).brighter()}),s.exit().remove()},i.prototype.update=function(t,n){var r=this,i=this.orientation()==="horizontal";this.updateRegions(t,n,i),this.domainAxis.orientation(i?"bottom":"left").title(this.columns()[0]),this.valueAxis.orientation(i?"left":"bottom"),this.xAxis=i?this.domainAxis:this.valueAxis,this.yAxis=i?this.valueAxis:this.domainAxis;var s=i?this.xBrush:this.yBrush,o=i?this.yBrush:this.xBrush,u=o.extent();switch(this.xAxisType()){case"ordinal":this.domainAxis.ordinals(this.data().map(function(e){return e[0]}));break;default:var a=this.xAxisDomainLow()?this.xAxisDomainLow():this.domainAxis.parseInvert(e.min(this.parsedData(),function(e){return e[0]})),f=this.xAxisDomainHigh()?this.xAxisDomainHigh():this.domainAxis.parseInvert(e.max(this.parsedData(),function(e){return e[0]}));a!==undefined&&f!==undefined&&this.domainAxis.low(a).high(f)}var l=this.yAxisDomainLow()?this.yAxisDomainLow():this.valueAxis.parseInvert(e.min(this.parsedData(),function(t){return e.min(t.filter(function(e,t){return t>0&&r.columns()[t]&&r.columns()[t].indexOf("__")!==0&&e!==null}),function(e){return e instanceof Array?e[0]:e})})),c=this.yAxisDomainHigh()?this.yAxisDomainHigh():this.valueAxis.parseInvert(e.max(this.parsedData(),function(t){return e.max(t.filter(function(e,t){return t>0&&r.columns()[t]&&r.columns()[t].indexOf("__")!==0&&e!==null}),function(e){return e instanceof Array?e[1]:e})}));this.valueAxis.low(l).high(c),this.margin=this.calcMargin(t,n,i);var h=this.width()-this.margin.left-this.margin.right;h<0&&(h=0);var p=this.height()-this.margin.top-this.margin.bottom;p<0&&(p=0);var d=i?h:p,v=i?p:h;this.domainAxis.tickLength(this.xAxisGuideLines()?v:0).render(),this.valueAxis.tickLength(this.yAxisGuideLines()?d:0).render(),this.svgDataClipRect.attr("width",h).attr("height",p),this.svgData.transition().attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.xBrush.x(this.domainAxis.d3Scale),this.yBrush.y(this.domainAxis.d3Scale);if(this.selectionMode()){this._prevXAxisType!==this.xAxisType()&&(this._prevXAxisType=this.xAxisType(),this._prevBrush=null);if(!this._prevBrush)switch(this.xAxisType()){case"ordinal":s.extent([0,d]);break;default:s.extent(this.domainAxis.d3Scale.domain())}else if(this._prevBrush&&this._prevBrush.orientation!==this.orientation())switch(this.xAxisType()){case"ordinal":s.extent([d-u[0]*d/this._prevBrush.maxCurrExtent,d-u[1]*d/this._prevBrush.maxCurrExtent]);break;default:s.extent(u)}this._prevBrush={orientation:this.orientation(),maxCurrExtent:d}}this.svgBrush.attr("transform","translate("+this.margin.left+", "+this.margin.top+")").style("display",this.selectionMode()?null:"none").call(s).selectAll(".background").transition().attr("width",h).attr("height",p),this.svgBrush.selectAll(".extent, .resize rect").transition().attr(i?"y":"x",0).attr(i?"height":"width",v);var m=this.svgBrush.selectAll(".resize").selectAll("path").data(function(e){return e});m.enter().append("path"),m.transition().attr("d",function(e){return r.resizeBrushHandle(e,h,p)}),this.updateFocusChart(t,n,this.margin,h,p,i),this.updateChart(t,n,this.margin,h,p,i,250)},i.prototype.updateFocusChart=function(e,t,n,r,i,s){function a(){if(o.focusChart.xAxisType()!=="ordinal")o.xAxis.domain(o.focusChart.xBrush.extent());else{var e=o.focusChart.xBrush.extent(),t=e[1]-e[0],n=t/r;o.xAxis.range([-e[0]/n,(r-e[0])/n])}o.xAxis.svgAxis.call(o.xAxis.d3Axis),o.xAxis.svgGuides.call(o.xAxis.d3Guides)}var o=this,u=this.svgFocus.selectAll("#"+this.id()+"_focusChart").data(this.xAxisFocus()?[!0]:[]);u.enter().append("g").attr("id",this.id()+"_focusChart").each(function(u){o.focusChart=(new o.constructor).target(this),o.focusChart.xBrush.on("brush.focus",function(){a(),o.updateChart(e,t,n,r,i,s,0)})}),u.each(function(e){o.copyPropsTo(o.focusChart),o.focusChart.xAxisFocus(!1).selectionMode(!0).tooltipStyle("none").orientation("horizontal").xAxisGuideLines(!1).xAxisDomainLow(null).xAxisDomainHigh(null).yAxisGuideLines(!1).x(o.width()/2).y(o.height()-o.xAxisFocusHeight()/2).width(o.width()).height(o.xAxisFocusHeight()).columns(o.columns()).data(o.data()).render(),a()}),u.exit().each(function(e){o.focusChart&&(o.focusChart.target(null),delete o.focusChart)}).remove()},i.prototype.updateChart=function(e,t,n,r,i,s,o){},i.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},i.prototype.selection=function(e){},i});