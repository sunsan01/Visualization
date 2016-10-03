!function(o,t){"function"==typeof define&&define.amd?define(["d3","topojson","./Choropleth","require"],t):o.map_TopoJSONChoropleth=t(o.d3,o.topojson,o.map_Choropleth,o.require)}(this,function(o,t,e,n){function r(){e.call(this),this.projection("mercator")}return r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.prototype._class+=" map_TopoJSONChoropleth",r.prototype.publish("region","GB","set","Region Data",["AT","BE","BG","CHLI","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GE","GR","HR","HU","IE","IS","IT","KS","LT","LU","LV","MD","MK","MT","ND","NL","NO","PL","PT","RO","RS","SE","SI","SK","UA"]),r.prototype.layerEnter=function(t,n,r){e.prototype.layerEnter.apply(this,arguments),this._selection.widgetElement(this._choroplethData),this.choroPaths=o.select(null);var a=this;this.tooltipHTML(function(o){var t=a.columns(),e=t&&t.length?t[0]:"Location",n=o&&o.length?o[o.length-1]:[""];return a.tooltipFormat({label:n[0],series:e,value:o[1]})})},r.prototype.layerUpdate=function(o){var r=this;return new Promise(function(a,i){r._prevRegion!==r.region()?(r._prevRegion=r.region(),n(["json!src/map/TopoJSON/"+r.region()+".json"],function(i){function c(t){r._choroTopologyIndex=t,e.prototype.layerUpdate.call(r,o,!0),a()}r._choroTopology=i,r._choroTopologyObjects=i.objects.PolbndA,r._choroTopologyFeatures=t.feature(r._choroTopology,r._choroTopologyObjects).features,n(["json!src/map/TopoJSON/"+r.region()+"_idx.json"],c,function(o){c({})})})):(e.prototype.layerUpdate.call(r,o),a())}).then(function(){var t=[];r.data().forEach(function(o){if(isNaN(o[0]))for(var e in r._choroTopologyIndex)for(var n in r._choroTopologyIndex[e])n===o[0]&&r._choroTopologyIndex[e][n].forEach(function(e){t.push([e].concat(o.filter(function(o,t){return t>0})).concat([o]))});else t.push(o.concat([o]))}),r.choroPaths=r._choroplethData.selectAll(".data").data(r.visible()?t:[],function(o){return o[0]}),r.choroPaths.enter().append("path").attr("class","data").call(r._selection.enter.bind(r._selection)).on("click",function(o){r._dataMap[o[0]]&&r.click(r.rowToObj(r._dataMap[o[0]]),"weight",r._selection.selected(r))}).on("mouseout.tooltip",r.tooltip.hide).on("mousemove.tooltip",r.tooltip.show),r.choroPaths.attr("d",function(t){var e=o._d3GeoPath(r._choroTopologyFeatures[t[0]]);return e||console.log("Unknown Country:  "+t),e}).style("fill",function(o){var t=r._palette(o[1],r._dataMinWeight,r._dataMaxWeight);return t}),r.choroPaths.exit().remove()})},r});