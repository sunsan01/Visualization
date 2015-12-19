(function(e,t){typeof define=="function"&&define.amd?define(["d3","topojson","./Layer","./Utility","../common/Palette","../common/Utility","css!./GeoHash"],t):e.map_GeoHash=t(e.d3,e.topojson,e.map_Layer,e.map_Utility,e.common_Palette,e.common_Utility)})(this,function(e,t,n,r,i,s){function o(){n.call(this)}return o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.prototype._class+=" map_GeoHash",o.prototype._palette=i.rainbow("default"),o.prototype.publish("paletteID","YlOrRd","set","Palette ID",o.prototype._palette.switch(),{tags:["Basic","Shared"]}),o.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("opacity",1,"number","Opacity",null,{tags:["Advanced"]}),o.prototype.publish("meshVisible",!0,"boolean","Mesh Visibility"),o.prototype.publish("meshColor",null,"html-color","Stroke Color",null,{optional:!0}),o.prototype.publish("meshStrokeWidth",.25,"number","Stroke Width"),o.prototype.data=function(e){var t=n.prototype.data.apply(this,arguments);return arguments.length&&(this._dataMinWeight=null,this._dataMaxWeight=null,this.data().forEach(function(e){if(!this._dataMinWeight||e[1]<this._dataMinWeight)this._dataMinWeight=e[1];if(!this._dataMaxWeight||e[1]>this._dataMaxWeight)this._dataMaxWeight=e[1]},this)),t},o.prototype.layerEnter=function(t,i,o){n.prototype.layerEnter.apply(this,arguments),this.geohash=new r.Geohash,this._geoHashTransform=i.append("g"),this._selection=new s.SimpleSelection(this._geoHashTransform),this.geoHashPaths=e.select(null)},o.prototype.layerUpdate=function(e){n.prototype.layerUpdate.apply(this,arguments),this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this.geoHashPaths=this._geoHashTransform.selectAll(".data").data(this.visible()?this.data():[],function(e){return e[0]});var t=this;this.geoHashPaths.enter().append("path").attr("class","data").call(this._selection.enter.bind(this._selection)).on("click",function(e){t.click(t.rowToObj(e),"weight",t._selection.selected(this))}),this.geoHashPaths.attr("d",function(n){var r=t.geohash.bounds(n[0]),i={type:"LineString",coordinates:[[r.sw.lon,r.ne.lat],[r.ne.lon,r.ne.lat],[r.ne.lon,r.sw.lat],[r.sw.lon,r.sw.lat]]};return e._d3GeoPath(i)}).style("fill",function(e){var n=t._palette(e[1],t._dataMinWeight,t._dataMaxWeight);return n}),this.geoHashPaths.exit().remove()},o.prototype.layerZoomed=function(e){n.prototype.layerZoomed.apply(this,arguments),this._geoHashTransform.style("opacity",this.opacity()).attr("transform","translate("+e._zoom.translate()+")scale("+e._zoom.scale()+")").attr("stroke-width",1.5/e._zoom.scale()+"px")},o.prototype.click=function(e,t,n){console.log("Click:  "+JSON.stringify(e)+", "+t+", "+n)},o});