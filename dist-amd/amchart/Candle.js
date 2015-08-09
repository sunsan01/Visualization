(function(e,t){typeof define=="function"&&define.amd?define(["d3","./CommonSerial","amcharts.serial","../api/INDChart"],t):e.amchart_Candle=t(e.d3,e.amchart_CommonSerial,e.amcharts,e.api_INDChart)})(this,function(e,t,n,r){function i(){t.call(this),this._tag="div",this._gType="candlestick"}return i.prototype=Object.create(t.prototype),i.prototype.implements(r.prototype),i.prototype._class+=" amchart_Candle",i.prototype.publish("paletteID","default","set","Palette ID",i.prototype._palette.switch(),{tags:["Basic","Shared"]}),i.prototype.publish("isStacked",!0,"boolean","Stack CHart",null,{tags:["Basic","Shared"]}),i.prototype.publish("fillOpacity",.7,"number","Opacity of The Fill Color",null,{min:0,max:1,step:.001,inputType:"range",tags:["Intermediate","Shared"]}),i.prototype.publish("paletteGrouping","By Column","set","Palette Grouping",["By Category","By Column"],{tags:["Basic"]}),i.prototype.publish("tooltipTemplate",'<div style="text-align:left;"><b>[[category]]</b><br/> Open:<b>[[open]]</b> Close:<b>[[close]]</b><br/>Low:<b>[[low]]</b> High:<b>[[high]]</b></div>',"string","Tooltip Text",null,{tags:["Intermediate"]}),i.prototype.publish("columnWidth",.62,"number","Bar Width",null,{tags:["Basic"]}),i.prototype.publish("stackType","regular","set","Stack Type",["none","regular","100%"],{tags:["Basic"]}),i.prototype.publish("useOhlcLines",!1,"boolean","Use OHLC Lines",null,{tags:["Intermediate"]}),i.prototype.testData=function(){return this.columns(["Subject","low","open","close","high"]),this.data([["Geography",10,15,35,40],["English",20,25,45,55]]),this},i.prototype.columns=function(e){if(!arguments.length)return this._columns;var n=this,r=t.prototype.columns.apply(this,arguments);return this._categoryField=e[0],this._lowField=[],this._openField=[],this._highField=[],this._closeField=[],e.slice(1,e.length).forEach(function(e,t){switch(t%4){case 0:n._lowField.push(e);break;case 1:n._openField.push(e);break;case 2:n._closeField.push(e);break;case 3:n._highField.push(e)}}),this._columns=e,r},i.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments)},i.prototype.updateChartOptions=function(){var e=this;this._gType=this.useOhlcLines()?"ohlc":"candlestick",t.prototype.updateChartOptions.apply(this,arguments),this._chart.categoryAxis.startOnAxis=!1;switch(this.paletteGrouping()){case"By Category":this._chart.dataProvider.forEach(function(t,n){e._chart.dataProvider[n].color=e._palette(n),e._chart.dataProvider[n].linecolor=e.lineColor()!==null?e.lineColor():e._palette(n)}),this._chart.colors=[];break;case"By Column":this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this);break;default:this._chart.colors=this._columns.filter(function(e,t){return t>0}).map(function(e){return this._palette(e)},this)}return this.buildGraphs(this._gType),this._chart},i.prototype.buildGraphs=function(e){function a(e){return this.columnWidth()&&(e.columnWidth=this.columnWidth()),this.paletteGrouping()==="By Category"&&(e.colorField="color",e.lineColorField="linecolor"),e.fillAlphas=this.fillOpacity(),e}typeof this._chart.graphs=="undefined"&&(this._chart.graphs=[]);var n=this._chart.graphs.length,r=Math.max(n,this._valueField.length);for(var i=0;i<r;i++)if(typeof this._openField!="undefined"&&typeof this._openField[i]!="undefined"){var s=t.prototype.buildGraphObj.call(this,e,i),o=a.call(this,s);if(typeof this._chart.graphs[i]!="undefined")for(var u in o)this._chart.graphs[i][u]=o[u];else this._chart.addGraph(o)}else this._chart.removeGraph(this._chart.graphs[i])},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},i});