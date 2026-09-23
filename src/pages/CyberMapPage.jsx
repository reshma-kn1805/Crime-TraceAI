import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Layers, 
  Filter, 
  TrendingUp, 
  ShieldAlert, 
  ExternalLink, 
  Radio,
  Flame,
  Building,
  RotateCcw
} from 'lucide-react';
import { INDIAN_STATES_REGIONS, INDIA_MAP_DEFAULT_CENTER, INDIA_MAP_DEFAULT_ZOOM } from '../data/indianGeoData';
import { useCases } from '../context/CaseContext';
import { CYBERCRIME_CATEGORIES, SEVERITY_LEVELS } from '../data/mockCases';
import { formatINR, formatISTDate } from '../utils/formatters';

export const CyberMapPage = ({ onSelectCase }) => {
  const { cases } = useCases();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [viewMode, setViewMode] = useState('clusters'); // 'clusters' | 'heatmap'

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    const map = L.map(mapContainerRef.current, {
      center: INDIA_MAP_DEFAULT_CENTER,
      zoom: INDIA_MAP_DEFAULT_ZOOM,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 16
    });

    // Dark Matter SOC tile layer from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when cases or filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Filter cases
    const filtered = cases.filter(c => {
      const matchState = selectedState === 'All' || c.location.state === selectedState;
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchSev = selectedSeverity === 'All' || c.severity === selectedSeverity;
      return matchState && matchCat && matchSev;
    });

    filtered.forEach(c => {
      const lat = c.location.lat;
      const lng = c.location.lng;
      if (!lat || !lng) return;

      const isCritical = c.severity === 'Critical';
      const color = isCritical ? '#EF4444' : c.severity === 'High' ? '#F97316' : '#00B4D8';

      // Custom pulsing HTML pin
      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}; opacity: 0.3; animation: pulseGlow 1.8s infinite;"></div>
            <div style="width: 14px; height: 14px; border-radius: 50%; background: ${color}; border: 2px solid #FFFFFF; box-shadow: 0 0 10px ${color};"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([lat, lng], { icon });

      // Popup card (law enforcement confidential)
      const popupContent = `
        <div style="font-family: var(--font-sans); color: #0F172A; min-width: 240px; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-mono); font-weight: 700; color: #0077B6; font-size: 0.85rem;">${c.id}</span>
            <span style="background: ${isCritical ? '#FEE2E2' : '#E0F2FE'}; color: ${isCritical ? '#991B1B' : '#0369A1'}; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
              ${c.severity}
            </span>
          </div>

          <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 4px; line-height: 1.3;">
            ${c.title}
          </div>

          <div style="font-size: 0.76rem; color: #475569; margin-bottom: 6px;">
            <strong>Category:</strong> ${c.category}<br/>
            <strong>Jurisdiction:</strong> ${c.location.city}, ${c.location.state}<br/>
            <strong>Loss Reported:</strong> ${formatINR(c.victim.financialLoss)}<br/>
            <strong>Date:</strong> ${formatISTDate(c.createdAt)}
          </div>

          <div style="border-top: 1px solid #E2E8F0; padding-top: 8px; margin-top: 6px; text-align: right;">
            <button id="btn-popup-${c.id}" style="background: #00B4D8; color: #FFFFFF; border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.76rem; font-weight: 600; cursor: pointer;">
              Open Case Dossier →
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${c.id}`);
        if (btn) {
          btn.onclick = () => onSelectCase(c.id);
        }
      });

      markersLayer.addLayer(marker);
    });

    // If state filter selected, pan to state
    if (selectedState !== 'All') {
      const stateObj = INDIAN_STATES_REGIONS.find(s => s.name === selectedState);
      if (stateObj && stateObj.center) {
        map.flyTo(stateObj.center, stateObj.zoom, { duration: 1.2 });
      }
    }
  }, [cases, selectedState, selectedCategory, selectedSeverity, onSelectCase]);

  // Reset View to full India
  const handleResetView = () => {
    setSelectedState('All');
    setSelectedCategory('All');
    setSelectedSeverity('All');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(INDIA_MAP_DEFAULT_CENTER, INDIA_MAP_DEFAULT_ZOOM, { duration: 1 });
    }
  };

  return (
    <div className="page-wrapper" style={{ maxWidth: '100%' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <MapPin size={26} style={{ color: 'var(--accent-cyan)' }} />
            National Geographic Cybercrime Intelligence Map
          </h1>
          <p className="page-subtitle">
            Spatial distribution, jurisdictional hotspots, and syndication origins across Indian States & Police Units.
          </p>
        </div>

        <div className="page-actions">
          <button onClick={handleResetView} className="btn btn-outline btn-sm">
            <RotateCcw size={14} /> Reset India View
          </button>
        </div>
      </div>

      {/* Map Control Bar */}
      <div className="soc-card" style={{ padding: '12px 18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={14} /> State Filter:
            </span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All">All Indian States (Pan-India)</option>
              {INDIAN_STATES_REGIONS.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>

            <select
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Cybercrime Categories</option>
              {CYBERCRIME_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="All">All Severities</option>
              {SEVERITY_LEVELS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('clusters')}
              style={{
                background: viewMode === 'clusters' ? 'var(--accent-cyan)' : 'transparent',
                color: viewMode === 'clusters' ? '#060B18' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Incident Pins
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              style={{
                background: viewMode === 'heatmap' ? 'var(--accent-cyan)' : 'transparent',
                color: viewMode === 'heatmap' ? '#060B18' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Flame size={13} /> Density Hotspots
            </button>
          </div>
        </div>
      </div>

      {/* Main Map + Side Intelligence Panel Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '20px', alignItems: 'start' }}>
        {/* Interactive Leaflet Map Container */}
        <div className="soc-card" style={{ padding: 0, overflow: 'hidden', height: '620px', position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

          {/* Map Overlay Badge */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            zIndex: 10,
            background: 'rgba(10, 17, 40, 0.9)',
            border: '1px solid var(--border-medium)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            backdropFilter: 'blur(6px)',
            fontSize: '0.74rem'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '2px' }}>
              Map Coordinates: Indian Territorial Cyber Polygon
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              CartoDB SOC Dark Matter Layer • Privacy-Safe Geocoding
            </div>
          </div>
        </div>

        {/* Side Regional Analytics Leaderboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Top States Card */}
          <div className="soc-card">
            <div className="soc-card-title" style={{ marginBottom: '14px' }}>
              <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
              State Incident Hotspots (CY 2026)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {INDIAN_STATES_REGIONS.slice(0, 6).map((region, idx) => (
                <div
                  key={region.id}
                  onClick={() => setSelectedState(region.name)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: selectedState === region.name ? 'rgba(0, 180, 216, 0.15)' : 'var(--bg-secondary)',
                    border: '1px solid',
                    borderColor: selectedState === region.name ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                      #{idx + 1} {region.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>
                      {region.incidentCount}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>{region.topThreat}</span>
                    <span style={{ color: '#FCA5A5' }}>{formatINR(region.lossINR)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indian Cyber Hubs Card */}
          <div className="soc-card">
            <div className="soc-card-title" style={{ marginBottom: '12px' }}>
              <Building size={16} style={{ color: 'var(--accent-cyan)' }} />
              Specialized Cyber Police Stations
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.76rem' }}>
              {[
                { city: 'Bengaluru', station: 'CID Cyber Crime Police Station (Infantry Rd)' },
                { city: 'New Delhi', station: 'Special Cell IFSO (Dwarka HQ)' },
                { city: 'Mumbai', station: 'BKC Cyber Police Station (Bandra)' },
                { city: 'Hyderabad', station: 'Telangana Cyber Security Bureau (TGCSB)' },
                { city: 'Chennai', station: 'Greater Chennai CCB Cyber Wing' }
              ].map((h, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{h.city}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{h.station}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
