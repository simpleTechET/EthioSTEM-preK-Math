import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/context/AudioContext";

export const MuteButton = ({ className }: { className?: string }) => {
    const { isMuted, toggleMute } = useAudio();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className={`rounded-full border-2 border-white bg-white/50 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 ${className}`}
            title={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? (
                <VolumeX className="w-5 h-5 text-rose-500" />
            ) : (
                <Volume2 className="w-5 h-5 text-forest-600" />
            )}
        </Button>
    );
};
