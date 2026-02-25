import React, { createContext, useContext, useState, useEffect } from "react";

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem("ethio-stem-muted");
        return saved === "true";
    });

    const toggleMute = () => {
        setIsMuted((prev) => {
            const newState = !prev;
            localStorage.setItem("ethio-stem-muted", String(newState));
            if (newState) {
                window.speechSynthesis.cancel();
            }
            return newState;
        });
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
