"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Optional: Auto-play might be blocked by browsers until user interaction
    // We set a reasonable starting volume
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="bg-primary/80 hover:bg-primary text-primary-foreground p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center border border-border"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="h-6 w-6 animate-pulse" />
        ) : (
          <VolumeX className="h-6 w-6 opacity-70" />
        )}
      </button>
      
      {/* 
        Using a reliable, royalty-free 8-bit track from Eric Skiff (CC-BY).
        You can replace the src with "/arcade.mp3" after adding your own file to the public folder. 
      */}
      <audio
        ref={audioRef}
        src="https://ericskiff.com/music/Resistor%20Anthems/01%20A%20Night%20Of%20Dizzy%20Spells.mp3"
        loop
      />
    </div>
  );
}
