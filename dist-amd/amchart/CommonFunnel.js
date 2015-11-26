(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/HTMLWidget","amcharts.funnel","require"],t):e.amchart_CommonFunnel=t(e.d3,e.common_HTMLWidget,e.AmCharts,e.require)})(this,function(e,t,n,r){function i(){t.call(this),this._tag="div",this._chart={},this._selected=null,this._selections=[],this._dataUpdated=0,this._prevDataUpdated=-1,this._columnsUpdated=0,this._prevColumnsUpdated=-1}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" amchart_CommonFunnel",i.prototype.publish("fontSize",11,"number","Font Size",null,{tags:["Basic","Shared"]}),i.prototype.publish("fontFamily","Verdana","string","Font Name",null,{tags:["Basic","Shared","Shared"]}),i.prototype.publish("fontColor","#000000","html-color","Font Color",null,{tags:["Basic","Shared"]}),i.prototype.publish("flip",!0,"boolean","Flip Chart",null,{tags:["Intermediate"]}),i.prototype.publish("reverseDataSorting",!1,"boolean","Reverse Data Sorting",null,{tags:["Intermediate"]}),i.prototype.publish("marginLeft",0,"number","Margin (Left)",null,{tags:["Intermediate"]}),i.prototype.publish("marginRight",0,"number","Margin (Right)",null,{tags:["Intermediate"]}),i.prototype.publish("marginTop",null,"number","Margin (Top)",null,{tags:["Intermediate"]}),i.prototype.publish("marginBottom",null,"number","Margin (Bottom)",null,{tags:["Intermediate"]}),i.prototype.publish("labelPosition","center","set","Label Position",["left","right","center"],{tags:["Intermediate"]}),i.prototype.publish("showScrollbar",!1,"boolean","Show Chart Scrollbar",null,{tags:["Intermediate"]}),i.prototype.publish("startDuration",.3,"number","Start Duration (sec)",null,{tags:["Private"]}),i.prototype.publish("Depth3D",0,"number","3D Depth (px)",null,{tags:["Basic"]}),i.prototype.publish("Angle3D",0,"number","3D Angle (Deg)",null,{tags:["Basic"]}),i.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),i.prototype.publish("selectionMode","simple","set","Selection Mode",["simple","multi"],{tags:["Intermediate"]}),i.prototype.publish("selectionColor","#f00","html-color","Font Color",null,{tags:["Basic"]}),i.prototype.updateChartOptions=function(){this._chart.startDuration=this.startDuration(),this._chart.rotate=this.flip(),this._chart.pullOutOnlyOne=this.selectionMode()==="simple",this._chart.color=this.fontColor(),this._chart.colorField="sliceColor",this._chart.fontSize=this.fontSize(),this._chart.fontFamily=this.fontFamily(),this.marginLeft()&&(this._chart.marginLeft=this.marginLeft()),this.marginRight()&&(this._chart.marginRight=this.marginRight()),this.marginTop()&&(this._chart.marginTop=this.marginTop()),this.marginBottom()&&(this._chart.marginBottom=this.marginBottom()),this._chart.labelPosition=this.labelPosition(),this.titles=[],this.baloon={},this._chart.titleField=this.columns()[0],this._chart.valueField=this.columns()[1],this._chart.depth3D=this.Depth3D(),this._chart.angle=this.Angle3D();var e=function(e,t){return e[1]>t[1]?1:-1};this.reverseDataSorting()&&(e=function(e,t){return e[1]<t[1]?1:-1}),this.data().sort(e);if(this._dataUpdated>this._prevDataUpdated||this._columnsUpdated>this._prevColumnsUpdated)this._chart.dataProvider=this.formatData(this.data());return this._prevDataUpdated=this._dataUpdated,this._prevColumnsUpdated=this._columnsUpdated,this._chart.colors=this.data().map(function(e){return this._palette(e[0])},this),this.showScrollbar()?this._chart.chartScrollbar.enabled=!0:this._chart.chartScrollbar.enabled=!1,this._chart},i.prototype.formatData=function(e){var t=[],n=this;return e.forEach(function(e){var r={};n.columns().forEach(function(t,n){r[t]=e[n]}),t.push(r)}),t},i.prototype.enter=function(e,i){t.prototype.enter.apply(this,arguments);var s=this,o={type:"funnel",addClassNames:!0,autoResize:!0,autoMargins:!0,chartScrollbar:{}};typeof define=="function"&&define.amd&&(o.pathToImages=r.toUrl("amchartsImg")),this._chart=n.makeChart(e,o),this._chart.addListener("clickSlice",function(e){var t=e.chart.colorField,n=e.dataItem.dataContext;n[t]!==null&&n[t]!==undefined?(delete n[t],s.selectionMode()==="simple"&&(s._selected!==null&&delete s._selected.data[s._selected.field],s._selected=null)):(n[t]=s.selectionColor(),s.selectionMode()==="simple"&&(s._selected!==null&&delete s._selected.data[s._selected.field],s._selected={field:t,data:n,colIdx:1,dIdx:e.dataItem.index},s._selections.push(s._selected))),e.chart.validateData(),s.click(s.rowToObj(s.data()[e.dataItem.index]),s.columns()[1],s._selected!==null)})},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),e.style.width=this.size().width+"px",e.style.height=this.size().height+"px",this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},i.prototype.render=function(e){return t.prototype.render.apply(this,arguments)},i.prototype.data=function(e){return arguments.length&&this._dataUpdated++,t.prototype.data.apply(this,arguments)},i});