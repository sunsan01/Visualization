!function(t,i){"function"==typeof define&&define.amd?define(["d3","../common/Class","../common/PropertyExt","../common/Utility","./HipieDDL","../other/Persist","../layout/Surface","./FlyoutButton"],i):t.marshaller_HipieDDLMixin=i(t.d3,t.common_Class,t.common_PropertyExt,t.common_PropertyExt,t.common_Utility,t.other_Persist,t.layout_Surface,t.marshaller_FlyoutButton)}(this,function(t,i,e,a,r,s,o,l){function n(){i.call(this),e.call(this)}n.prototype=Object.create(i.prototype),n.prototype.constructor=n,n.prototype.mixin(e),n.prototype._class+=" marshaller_HipieDDLMixin",n.prototype.publish("ddlUrl","","string","DDL URL",null,{tags:["Private"]}),n.prototype.publish("databomb","","string","Data Bomb",null,{tags:["Private"]}),n.prototype.publish("proxyMappings",{},"object","Proxy Mappings",null,{tags:["Private"]}),n.prototype.publish("timeout",null,"number","Timout (seconds)",null,{optional:!0}),n.prototype.publish("clearDataOnUpdate",!0,"boolean","Clear data prior to refresh",null),n.prototype.publish("propogateClear",!1,"boolean","Propogate clear to dependent visualizations",null),n.prototype.publish("missingDataString","***MISSING***","string","Missing data display string"),n.prototype.publish("autoCloseFlyout",!0,"boolean","Auto Close Flyout Filters"),n.prototype._gatherDashboards=function(t,i){i instanceof Object||i&&(i=JSON.parse(i)),this._ddlDashboards=[],this._ddlVisualizations=[],this._ddlPopupVisualizations=[],this._ddlLayerVisualizations=[];var e=this,a=null;t.accept({visit:function(t){t instanceof r.Dashboard?(a={dashboard:t,visualizations:[],layerVisualizations:[],popupVisualizations:[]},e._ddlDashboards.push(a)):t instanceof r.DataSource?t.databomb&&i[t.id]&&t.comms.databomb(i[t.id]):t instanceof r.Output?t.dataSource.databomb&&t.dataSource.comms.databombOutput(t.from,t.id):t instanceof r.Visualization&&t.widget&&(t.properties.flyout?(a.popupVisualizations.push(t),e._ddlPopupVisualizations.push(t)):t.parentVisualization?(a.layerVisualizations.push(t),e._ddlLayerVisualizations.push(t)):(a.visualizations.push(t),e._ddlVisualizations.push(t)))}})},n.prototype._marshallerRender=function(i,e){function a(){h._gatherDashboards(h._marshaller,h.databomb()),h._ddlVisualizations.forEach(function(t){d.remove(t.id),h._marshaller.widgetMappings().get(t.id)||(t.newWidgetSurface=null,t.widget instanceof o||"composite_MegaChart"===t.widget.classID()?t.newWidgetSurface=t.widget:t.newWidgetSurface=(new o).widget(t.widget),t.newWidgetSurface.title(t.title),t.widget.size({width:0,height:0}))}),h._ddlPopupVisualizations.forEach(function(t){d.remove(t.id);var i=t.events.getUpdatesVisualizations();i.forEach(function(i){switch(i.widget.classID()){case"composite_MegaChart":t._flyoutButton?i.widget.toolbarWidgets().push(t._flyoutButton.reference()):(t._flyoutButton=(new l).title(t.title).widget(t.widget).autoClose(h.autoCloseFlyout()),i.widget.toolbarWidgets().push(t._flyoutButton))}})}),d.forEach(function(t,i){h.clearContent(i)}),h.populateContent(),h._initialState?(h._marshaller.deserializeState(h._initialState.marshaller),delete h._initialState,i.render.call(h,e)):i.render.call(h,function(t){h._marshaller.primeData().then(function(i){e&&e(t)})})}if(""===this.ddlUrl()||this.ddlUrl()===this._prev_ddlUrl&&this.databomb()===this._prev_databomb)return this._marshaller&&this._marshaller.proxyMappings(this.proxyMappings()).timeout(this.timeout()).clearDataOnUpdate(this.clearDataOnUpdate()).propogateClear(this.propogateClear()).missingDataString(this.missingDataString()),i.render.call(this,function(t){e&&e(t)});this._prev_ddlUrl&&this._prev_ddlUrl!==this.ddlUrl()&&this.clearContent(),this._prev_ddlUrl=this.ddlUrl(),this._prev_databomb=this.databomb();var n=[];s.widgetArrayWalker(this.content(),function(t){n.push(t)});var p=t.map(n,function(t){return t.id()}),d=t.map(n.filter(function(t){return 0!==t.id().indexOf(t._idSeed)&&0!==t.id().indexOf("_pe")}),function(t){return t.id()}),h=this;this._marshaller=(new r.Marshaller).proxyMappings(this.proxyMappings()).clearDataOnUpdate(this.clearDataOnUpdate()).propogateClear(this.propogateClear()).missingDataString(this.missingDataString()).widgetMappings(p).on("commsEvent",function(t,i){h.commsEvent.apply(h,arguments)}).on("vizEvent",function(){h.vizEvent.apply(h,arguments)}),"["===this.ddlUrl()[0]||"{"===this.ddlUrl()[0]?this._marshaller.parse(this.ddlUrl(),a):this._marshaller.url(this.ddlUrl(),a)},n.prototype.primeData=function(t){return this._marshaller?this._marshaller.primeData(t):Promise.resolve()},n.prototype.dashboards=function(){var t={};for(var i in this._marshaller.dashboards)t[i]={},this._marshaller.dashboards[i].visualizations.forEach(function(e){t[i][e.id]=e.widget},this);return t},n.prototype.visualizations=function(){return this._marshaller._visualizationArray.map(function(t){return t.newWidgetSurface||t.widget})};var p="<!doctype html><html><head><meta charset='utf-8'><script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz.js'></script><script src='http://viz.hpccsystems.com/v1.14.0-rc5/dist-amd/hpcc-viz-common.js'></script></head><body style='padding:0px; margin:0px; overflow:hidden'><div id='placeholder' style='width:100%; height:100vh'></div><script>   require(['src/other/Persist'], function (Persist) {\n       Persist.create({STATE}, function(widget) {\n           widget\n               .target('placeholder')\n               .ddlUrl('{DDL}')\n               .databomb('{DATABOMB}')\n               .render()\n           ;\n       });\n   });</script></body></html>";return n.prototype.generateTestPage=function(){if(this._marshaller){var t=this,i=s.serialize(t,function(t,i){return"databomb"===i.id||"ddlUrl"===i.id?!0:!1}),e=this._marshaller.createDatabomb(),r=p.replace("{VERSION}",t.version()).replace("{STATE}",i).replace("{DDL}",t._marshaller._json.replace("WUID","databomb")).replace("{DATABOMB}",JSON.stringify(e));a.downloadBlob("html",r,"test")}},n.prototype.vizEvent=function(t,i,e,a,r){},n.prototype.commsEvent=function(t,i,e,a){},n.prototype.state=function(t){return arguments.length?(this.deserializeState(t),this):this.serializeState()},n.prototype.serializeState=function(){return{marshaller:this._marshaller?this._marshaller.serializeState():{}}},n.prototype.deserializeState=function(t){return this._marshaller?this._marshaller.deserializeState(t.marshaller):this._initialState=t,this},n.prototype.serializeRequests=function(){var t=null;return this._ddlPopupVisualizations.concat(this._ddlVisualizations).forEach(function(i){i.hasSelection()&&(t||(t={}),t[i.id]=i.reverseMappedSelection())}),t},n});