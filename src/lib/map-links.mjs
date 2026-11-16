export function googleDirections(provider,mode='driving') {
 const params=new URLSearchParams({api:'1',destination:provider.coordinates?`${provider.coordinates.lat},${provider.coordinates.lng}`:`${provider.name}, ${provider.address}, Indore`,travelmode:['driving','walking','bicycling','transit'].includes(mode)?mode:'driving'});
 if(provider.mapLocation?.placeId)params.set('destination_place_id',provider.mapLocation.placeId);
 return `https://www.google.com/maps/dir/?${params}`;
}
export function googlePreview(provider) {
 const params=new URLSearchParams({output:'embed',z:'16',hl:'en'});
 if(provider.mapLocation?.cid)params.set('cid',provider.mapLocation.cid);
 else params.set('q',`${provider.coordinates.lat},${provider.coordinates.lng}`);
 return `https://maps.google.com/maps?${params}`;
}
export function distanceKm(a,b) {
 const r=Math.PI/180,dLat=(b.lat-a.lat)*r,dLng=(b.lng-a.lng)*r;
 const x=Math.sin(dLat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLng/2)**2;
 return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(Math.max(0,1-x)));
}
