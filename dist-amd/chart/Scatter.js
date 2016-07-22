(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","./XYAxis","../api/INDChart","../api/ITooltip","css!./Scatter"],t):e.chart_Scatter=t(e.d3,e.common_SVGWidget,e.chart_XYAxis,e.api_INDChart,e.api_ITooltip)})(this,function(e,t,n,r,i){function s(e){n.call(this),r.call(this),i.call(this),this.xAxisGuideLines_default(!0).yAxisGuideLines_default(!0)}return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype._class+=" chart_Scatter",s.prototype.implements(r.prototype),s.prototype.implements(i.prototype),s.prototype.publish("paletteID","default","set","Palette ID",s.prototype._palette.switch(),{tags:["Basic","Shared"]}),s.prototype.publish("pointShape","cross","set","Shape of the data points",["circle","rectangle","cross"]),s.prototype.publish("pointSize",6,"number","Point Size"),s.prototype.publish("interpolate","","set","Interpolate Data",["","linear","step","step-before","step-after","basis","bundle","cardinal","monotone"]),s.prototype.publish("interpolateFill",!1,"boolean","Fill Interpolation"),s.prototype.publish("interpolateFillOpacity",.66,"number","Fill Interpolation Opacity"),s.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),s.prototype.xPos=function(e){return this.orientation()==="horizontal"?this.dataPos(e.label):this.valuePos(e.value)},s.prototype.yPos=function(e){return this.orientation()==="horizontal"?this.valuePos(e.value):this.dataPos(e.label)},s.prototype.enter=function(e,t){n.prototype.enter.apply(this,arguments);var r=this;this.tooltipHTML(function(e){return r.tooltipFormat({label:e.label,series:r.columns()[e.colIdx],value:e.value})})},s.prototype.updateChart=function(t,n,r,i,s,o){function a(e){switch(e){case"rectangle":return"rect";case"circle":return"circle";case"cross":return"path"}}var u=this;this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this._prevPointShape!==this.pointShape()&&(this.svgData.selectAll(".data").remove(),this._prevPointShape=this.pointShape());var f=this.flattenData().map(function(e){return e.shape=a(u.pointShape()),e}),l=this.svgData.selectAll(".point").data(f,function(e,t){return e.shape+"_"+t});l.enter().append("g").attr("class","point").each(function(t){var n=e.select(this);n.append("circle").attr("class","pointSelection").on("mouseout.tooltip",u.tooltip.hide).on("mousemove.tooltip",u.tooltip.show).call(u._selection.enter.bind(u._selection)).on("click",function(e,t){u.click(u.rowToObj(u.data()[e.rowIdx]),u.columns()[e.colIdx],u._selection.selected(this))}),n.append(t.shape).attr("class","pointShape")}),l.each(function(t){var n=e.select(this).select(".pointSelection");n.attr("cx",function(e){return u.xPos(e)}).attr("cy",function(e){return u.yPos(e)}).attr("r",u.pointSize());var r=e.select(this).select(".pointShape");switch(t.shape){case"rect":r.attr("x",function(e){return u.xPos(e)-u.pointSize()/2}).attr("y",function(e){return u.yPos(e)-u.pointSize()/2}).attr("width",u.pointSize()).attr("height",u.pointSize()).style("fill",function(e,t){return u._palette(u.columns()[e.colIdx])});break;case"circle":r.attr("cx",function(e){return u.xPos(e)}).attr("cy",function(e){return u.yPos(e)}).attr("r",u.pointSize()/2).style("fill",function(e,t){return u._palette(u.columns()[e.colIdx])});break;case"path":r.attr("d",function(e){return"M"+(u.xPos(e)-u.pointSize()/2)+" "+(u.yPos(e)-u.pointSize()/2)+" "+"L"+(u.xPos(e)+u.pointSize()/2)+" "+(u.yPos(e)+u.pointSize()/2)+" "+"M"+(u.xPos(e)-u.pointSize()/2)+" "+(u.yPos(e)+u.pointSize()/2)+" "+"L"+(u.xPos(e)+u.pointSize()/2)+" "+(u.yPos(e)-u.pointSize()/2)}).style("stroke",function(e,t){return u._palette(u.columns()[e.colIdx])})}}),l.exit().remove();var c=this.svgData.selectAll(".area").data(this.columns().filter(function(e,t){return u.interpolate()&&u.interpolateFill()&&t>0}));c.enter().append("path").attr("class","area");var h=e.svg.area().interpolate(this.interpolate());o?h.x(function(e){return u.xPos(e)}).y0(function(e){return s}).y1(function(e){return u.yPos(e)}):h.y(function(e){return u.yPos(e)}).x0(function(e){return 0}).x1(function(e){return u.xPos(e)}),c.each(function(t,n){var r=e.select(this);r.attr("d",h(f.filter(function(e){return e.colIdx===n+1}))).style("opacity",u.interpolateFillOpacity()).style("stroke","none").style("fill",function(t,r){return e.hsl(u._palette(u.columns()[n+1])).brighter()})}),c.exit().remove();var p=this.svgData.selectAll(".line").data(this.columns().filter(function(e,t){return u.interpolate()&&t>0}));p.enter().append("path").attr("class","line");var d=e.svg.line().x(function(e){return u.xPos(e)}).y(function(e){return u.yPos(e)}).interpolate(this.interpolate());p.each(function(t,n){var r=e.select(this),i=f.filter(function(e){return e.colIdx===n+1});r.attr("d",d(i)).style("stroke",function(e,t){return u._palette(u.columns()[n+1])}).style("fill","none")}),p.exit().remove()},s.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},s});