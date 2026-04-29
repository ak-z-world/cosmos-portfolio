"use client";

export default function FilmOverlays() {
  return (
    <>
      {/* Film grain */}
      <div className="grain-overlay" aria-hidden="true" />
      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />
      {/* Horizontal scan line */}
      <div className="scanline" aria-hidden="true" />
      {/* Letterbox bars */}
      <div className="letterbox-top" aria-hidden="true" />
      <div className="letterbox-bottom" aria-hidden="true" />
    </>
  );
}