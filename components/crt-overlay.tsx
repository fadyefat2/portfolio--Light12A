"use client"

export default function CRTOverlay() {

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden select-none">
      {/* Refined Scanlines - Lower opacity for readability */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
      
      {/* Subtle Vignette - Focuses attention on content */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(10, 10, 15, 0) 40%, rgba(0, 0, 0, 0.6) 100%)"
        }}
      />

      <style jsx global>{`
        /* Static Noise - Only active on specific elements via filter if needed, 
           otherwise kept extremely subtle here */
        .crt-noise {
          opacity: 0.02;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        }
      `}</style>
    </div>
  )
}

