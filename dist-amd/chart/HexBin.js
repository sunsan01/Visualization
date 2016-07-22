(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","./XYAxis","../api/INDChart","../api/ITooltip","../common/Palette","d3-hexbin","css!./HexBin"],t):e.chart_HexBin=t(e.d3,e.common_SVGWidget,e.chart_XYAxis,e.api_INDChart,e.api_ITooltip,e.common_Palette)})(this,function(e,t,n,r,i,s,o){function u(e){n.call(this),r.call(this),i.call(this),this._hexbin=new o,this.xAxisGuideLines_default(!1).yAxisGuideLines_default(!1)}return o=o||e.hexbin||window.d3.hexbin,u.prototype=Object.create(n.prototype),u.prototype.constructor=u,u.prototype._class+=" chart_HexBin",u.prototype.implements(r.prototype),u.prototype.implements(i.prototype),u.prototype._palette=s.rainbow("default"),u.prototype.publish("paletteID","Blues","set","Palette ID",u.prototype._palette.switch(),{tags:["Basic","Shared"]}),u.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),u.prototype.publish("binSize",20,"number","Bin radius"),u.prototype.xPos=function(e){return this.orientation()==="horizontal"?this.dataPos(e.label):this.valuePos(e.value)},u.prototype.yPos=function(e){return this.orientation()==="horizontal"?this.valuePos(e.value):this.dataPos(e.label)},u.prototype.updateChart=function(t,n,r,i,s,o,u){var a=this;this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this._hexbin.size([i,s]).radius(this.binSize());var f=this.flattenData(),l=f.map(function(e,t){return[a.xPos(e),a.yPos(e)]}),c=this._hexbin(l),h=e.max(c,function(e){return e.length}),p=this.svgData.selectAll(".hexagon").data(c,function(e,t){return e.i+"_"+e.j});p.enter().append("path").attr("class","hexagon").attr("transform",function(e){return"translate("+e.x+","+e.y+")scale(0)"}),p.transition().duration(u).attr("d",this._hexbin.hexagon()).attr("transform",function(e){return"translate("+e.x+","+e.y+")scale(1)"}).style("fill",function(e){return a._palette(e.length,0,h)}),p.exit().transition().duration(u).attr("transform",function(e){return"translate("+e.x+","+e.y+")scale(0)"}).remove()},u.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},u});