(function(e,t){typeof define=="function"&&define.amd?define(["d3","./CommonSerial","../api/INDChart"],t):e.amchart_Line=t(e.d3,e.amchart_CommonSerial,e.api_INDChart)})(this,function(e,t,n){function r(){t.call(this),this._tag="div",this._gType="line"}return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype._class+=" amchart_Line",r.prototype.implements(n.prototype),r.prototype.publish("paletteID","default","set","Palette ID",r.prototype._palette.switch(),{tags:["Basic","Shared"]}),r.prototype.publish("smoothLines",!1,"boolean","Causes chart data lines to draw smoothly",null,{tags:["Basic","Shared"]}),r.prototype.publish("stepLines",!1,"boolean","Causes chart data lines to draw smoothly",null,{tags:["Basic"]}),r.prototype.publish("tooltipTemplate","[[category]]([[title]]): [[value]]","string","Tooltip Text",null,{tags:["Basic"]}),r.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments)},r.prototype.updateChartOptions=function(){return t.prototype.updateChartOptions.apply(this,arguments),this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this),this.buildGraphs(this._gType),this._chart},r.prototype.buildGraphs=function(e){function a(e){return this.stepLines()?e.type="step":this.smoothLines()?e.type="smoothedLine":e.type="line",e}typeof this._chart.graphs=="undefined"&&(this._chart.graphs=[]);var n=this._chart.graphs.length,r=Math.max(n,this._valueField.length);for(var i=0;i<r;i++)if(typeof this._valueField!="undefined"&&typeof this._valueField[i]!="undefined"){var s=t.prototype.buildGraphObj.call(this,e,i),o=a.call(this,s);if(typeof this._chart.graphs[i]!="undefined")for(var u in o)this._chart.graphs[i][u]=o[u];else this._chart.addGraph(o)}else this._chart.removeGraph(this._chart.graphs[i])},r.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},r});