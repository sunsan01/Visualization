(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","../graph/Graph","../graph/Edge","../common/Shape","async!http://maps.google.com/maps/api/js?sensor=false","css!./GMap"],t):e.map_GMap=t(e.d3,e.common_SVGWidget,e.graph_Graph,e.graph_Edge,e.common_Shape)})(this,function(e,t,n,r,i){function s(e){n.call(this),this.layout("none"),this._markers=[]}return s.prototype=Object.create(n.prototype),s.prototype._class+=" map_GMap",s.prototype.testData=function(){var e=[{geo_lat:"37.665074",geo_long:"-122.384375",__viz_markerIcon:"green-dot.png"},{geo_lat:"32.690680",geo_long:"-117.178540"},{geo_lat:"39.709455",geo_long:"-104.969859"},{geo_lat:"41.244123",geo_long:"-95.961610"},{geo_lat:"32.688980",geo_long:"-117.192040"},{geo_lat:"45.786490",geo_long:"-108.526600"},{geo_lat:"45.796180",geo_long:"-108.535652"},{geo_lat:"45.774320",geo_long:"-108.494370"},{geo_lat:"45.777062",geo_long:"-108.549835",__viz_markerIcon:"red-dot.png"}],t=[],n=[],s=null;return e.forEach(function(e){var o=(new i).shape("circle").radius(3).data(e);t.push(o),s&&n.push((new r).sourceVertex(s).targetVertex(o).targetMarker("arrowHead")),s=o}),this.data({vertices:t,edges:n}),this},s.prototype.data=function(e){arguments.length&&this.graphData.nodeValues().forEach(function(e){e._marker&&e._marker.setMap(null)});var t=n.prototype.data.apply(this,arguments);return t},s.prototype.enter=function(t,r,i){n.prototype.enter.apply(this,arguments),this._googleMap=new google.maps.Map(e.select(this._target).node(),{zoom:4,center:new google.maps.LatLng(42.877742,-97.380979),mapTypeId:google.maps.MapTypeId.ROADMAP}),this._gmOverlay=new google.maps.OverlayView;var s=this;this._gmOverlay.onAdd=function(){s.layer=e.select(this.getPanes().overlayLayer).append("div").style("position","absolute").attr("class","gmapLayer"),s.layer.node().appendChild(s._parentElement.node()),s._gmOverlay.draw=function(){var e=s._gmOverlay.getProjection(),t=s._googleMap.getBounds(),n=e.fromLatLngToDivPixel(t.getSouthWest()),r=e.fromLatLngToDivPixel(t.getNorthEast()),i=s.layer.node();i.style.left=n.x+"px",i.style.top=r.y+"px",i.style.width=r.x-n.x+"px",i.style.height=n.y-r.y+"px",s.firstRun?s.calcLatLong(n.x,r.y):(s.firstRun=!0,setTimeout(function(){s.calcLatLong(n.x,r.y),s.zoomToFit()},100))},google.maps.event.addListener(s._googleMap,"center_changed",function(){s._gmOverlay.draw()})},this._gmOverlay.setMap(this._googleMap)},s.prototype.createMarker=function(e,t,n,r){return new google.maps.Marker({position:new google.maps.LatLng(e,t),animation:google.maps.Animation.DROP,title:r,icon:"http://maps.google.com/mapfiles/ms/icons/"+n,map:this._googleMap})},s.prototype.createCircle=function(e,t,n){var r=new google.maps.Circle({radius:16093*t/10,fillColor:n,strokeColor:n,map:this._googleMap});return r.bindTo("center",e,"position"),r},s.prototype.calcLatLong=function(e,t){e+=this.width()/2,t+=this.height()/2;var n=this._gmOverlay.getProjection(),r=this;this.graphData.nodeValues().forEach(function(i){var s=new google.maps.LatLng(i._data.geo_lat,i._data.geo_long);i._data.__viz_markerIcon&&!i._marker&&(i._marker=r.createMarker(i._data.geo_lat,i._data.geo_long,i._data.__viz_markerIcon,"")),s=n.fromLatLngToDivPixel(s),s.x-=e,s.y-=t,i.move(s)}),this.graphData.edgeValues().forEach(function(e){e.points([])})},s.prototype.zoomTo=function(e){var t=0,n=new google.maps.LatLngBounds;return e.forEach(function(e){var r=new google.maps.LatLng(e.geo_lat,e.geo_long);n.extend(r),++t}),t&&(this._googleMap.setCenter(n.getCenter()),this._googleMap.fitBounds(n),this._googleMap.getZoom()>12&&this._googleMap.setZoom(12)),this},s.prototype.zoomToFit=function(){return this.zoomTo(this.graphData.nodeValues().map(function(e){return e._data}))},s});