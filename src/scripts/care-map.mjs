import 'leaflet/dist/leaflet.css';
import { distanceKm, googleDirections } from '../lib/map-links.mjs';
const root=document.querySelector('#care-map');
if(root){
 const records=JSON.parse(document.querySelector('#map-records').textContent);
 const form=root.querySelector('form'),grid=root.querySelector('.care-map-grid'),status=root.querySelector('[data-map-status]');
 const rows=new Map([...root.querySelectorAll('[data-map-result]')].map(el=>[el.dataset.mapResult,el]));
 const params=new URLSearchParams(location.search),controls=form.elements;
 for(const key of ['q','service','pet'])controls.namedItem(key).value=params.get(key)||'';
 for(const key of ['emergency','fee'])controls.namedItem(key).checked=params.get(key)==='1';
 let selected=records.find(p=>p.id===params.get('clinic'))||null,visible=records,position=null,map=null,L=null,layer=null,userMarker=null,loading=null;
 const markers=new Map();let locationRevision=0;
 const normalize=s=>s.toLowerCase().replace(/[.]/g,'');
 function persist(){const url=new URL(location.href);url.search='';for(const key of ['q','service','pet'])if(controls.namedItem(key).value)url.searchParams.set(key,controls.namedItem(key).value);for(const key of ['emergency','fee'])if(controls.namedItem(key).checked)url.searchParams.set(key,'1');if(selected)url.searchParams.set('clinic',selected.id);history.replaceState(null,'',url);}
 function icon(p){const index=records.indexOf(p)+1;return L.divIcon({className:'vet-map-pin'+(selected?.id===p.id?' selected':''),html:`<span><b>${index}</b></span>`,iconSize:[34,34],iconAnchor:[17,34]});}
 function fit(){if(map&&visible.length)map.fitBounds(visible.map(p=>[p.coordinates.lat,p.coordinates.lng]),{padding:[35,35],maxZoom:15});}
 function draw(){if(!map)return;layer.clearLayers();markers.clear();visible.forEach(p=>{const marker=L.marker([p.coordinates.lat,p.coordinates.lng],{icon:icon(p),title:p.name,alt:p.name,keyboard:true});const popup=document.createElement('div'),name=document.createElement('strong'),area=document.createElement('p'),link=document.createElement('a');name.textContent=p.name;area.textContent=p.area;link.href=p.href;link.textContent='View clinic profile →';popup.append(name,area,link);marker.bindPopup(popup).on('click',()=>choose(p.id,false));marker.addTo(layer);markers.set(p.id,marker);});}
 async function initMap(){if(map){map.invalidateSize();return;}if(loading)return loading;if(!root.querySelector('.map-stage').getBoundingClientRect().width)return;
 loading=(async()=>{try{const mod=await import('leaflet');L=mod.default||mod;root.querySelector('[data-map-loading]')?.remove();map=L.map('clinic-map',{scrollWheelZoom:false}).setView([22.718,75.875],12);layer=L.layerGroup().addTo(map);const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'}).addTo(map);tiles.on('tileerror',()=>{root.querySelector('[data-tile-status]').textContent='Some map tiles are unavailable. Clinic pins, the result list and Google Maps links still work.';});draw();fit();if(selected){choose(selected.id,false);map.setView([selected.coordinates.lat,selected.coordinates.lng],16);}if(position)drawUser();}catch{root.querySelector('[data-map-loading]')?.remove();root.querySelector('[data-tile-status]').textContent='Interactive map unavailable. Use the clinic list or Google Maps directions.';}finally{loading=null;}})();return loading;
 }
 function showView(view){grid.dataset.mobileView=view;root.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));if(view==='map')requestAnimationFrame(()=>initMap());}
 function choose(id,fromList=true){selected=visible.find(p=>p.id===id)||null;rows.forEach((row,key)=>{row.classList.toggle('is-selected',key===selected?.id);row.querySelector('[data-select]').setAttribute('aria-pressed',String(key===selected?.id));});const panel=root.querySelector('.map-selected');panel.hidden=!selected;if(!selected){persist();return;}
 root.querySelector('[data-selected-name]').textContent=selected.name;root.querySelector('[data-selected-address]').textContent=selected.address+', Indore';root.querySelector('[data-selected-note]').textContent=selected.mapLocation.note+' Checked '+selected.mapLocation.checkedAt+'.';root.querySelector('[data-selected-profile]').href=selected.href;root.querySelector('[data-selected-source]').href=selected.coordinateSource;updateRoute();updatePreview();markers.forEach((marker,key)=>marker.setIcon(icon(records.find(p=>p.id===key))));
 if(fromList){showView('map');if(map)map.setView([selected.coordinates.lat,selected.coordinates.lng],16);grid.scrollIntoView({behavior:'smooth',block:'start'});}else if(map){map.panTo([selected.coordinates.lat,selected.coordinates.lng]);const list=root.querySelector('.map-results'),row=rows.get(selected.id);if(innerWidth>760)list.scrollTop=row.offsetTop-list.offsetTop;}persist();
 }
 function updateRoute(){if(selected)root.querySelector('[data-selected-directions]').href=googleDirections(selected,root.querySelector('[data-travel]').value);}
 function updatePreview(){const details=root.querySelector('[data-google-preview]'),frame=details.querySelector('iframe');if(selected&&details.open){if(frame.getAttribute('src')!==selected.preview)frame.src=selected.preview;frame.title=`Google Maps preview: ${selected.name}`;}}
 function update(){const query=normalize(controls.namedItem('q').value.trim()).split(/\s+/),service=controls.namedItem('service').value,pet=controls.namedItem('pet').value,urgent=controls.namedItem('emergency').checked,fee=controls.namedItem('fee').checked;
 visible=records.filter(p=>{const text=normalize([p.name,p.area,p.address,...p.services,...p.doctorNames].join(' '));return query.every(term=>text.includes(term))&&(!service||p.services.includes(service))&&(!pet||p.species.includes(pet))&&(!fee||p.fees)&&(!urgent||p.hours.open24||p.services.some(s=>/emergency/i.test(s)));});
 if(position)visible.sort((a,b)=>distanceKm(position,a.coordinates)-distanceKm(position,b.coordinates));
 rows.forEach((row,id)=>{row.hidden=!visible.some(p=>p.id===id);row.querySelector('[data-distance]').textContent=position?`${distanceKm(position,records.find(p=>p.id===id).coordinates).toFixed(1)} km straight-line`:'';});visible.forEach(p=>root.querySelector('.map-results').append(rows.get(p.id)));
 root.querySelector('[data-map-empty]').hidden=visible.length>0;status.textContent=`${visible.length} of ${records.length} clinics${position?' · nearest first · straight-line distances':''}${urgent?' · emergency claims require a phone confirmation':''}`;
 if(selected&&!visible.some(p=>p.id===selected.id))choose(null,false);draw();fit();persist();
 }
 function drawUser(){if(!map||!position)return;userMarker?.remove();userMarker=L.circleMarker([position.lat,position.lng],{radius:7,color:'#fff',weight:3,fillColor:'#2563eb',fillOpacity:1}).addTo(map).bindPopup('Your approximate location');}
 form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',update);
 root.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.select)));
 root.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
 root.querySelector('[data-fit]').addEventListener('click',async()=>{showView('map');await initMap();fit();});
 root.querySelector('[data-reset]').addEventListener('click',()=>{locationRevision++;form.reset();position=null;userMarker?.remove();userMarker=null;choose(null,false);update();});
 root.querySelector('[data-travel]').addEventListener('change',updateRoute);root.querySelector('[data-google-preview]').addEventListener('toggle',updatePreview);
 root.querySelector('[data-share]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);status.textContent='View link copied. Your location is not included.';}catch{status.textContent='Copy the address in your browser to share these filters. Your location is not included.';}});
 root.querySelector('[data-nearby]').addEventListener('click',()=>{const revision=++locationRevision;if(!navigator.geolocation){status.textContent='Location is unavailable. Search by locality instead.';return;}status.textContent='Requesting your location…';navigator.geolocation.getCurrentPosition(result=>{if(revision!==locationRevision)return;position={lat:result.coords.latitude,lng:result.coords.longitude};update();drawUser();if(distanceKm(position,{lat:22.7196,lng:75.8577})>60)status.textContent+= ' · Your location is outside Indore; this directory currently covers Indore.';},()=>{if(revision===locationRevision)status.textContent='Location could not be accessed. Search by locality; all clinics remain available.';},{timeout:10000,maximumAge:60000,enableHighAccuracy:false});});
 update();if(selected){choose(selected.id,false);showView('map');}
 const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))initMap();},{rootMargin:'100px'});observer.observe(root.querySelector('.map-stage'));
 window.addEventListener('resize',()=>{if(root.querySelector('.map-stage').getBoundingClientRect().width)initMap();});
}
