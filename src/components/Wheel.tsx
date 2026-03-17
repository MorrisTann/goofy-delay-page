type WheelProps = {
  rotation: number;
  isSpinning: boolean;
  isLoadingTime: boolean;
  onSpin: () => void;
};

export function Wheel({
  rotation,
  isSpinning,
  isLoadingTime,
  onSpin,
}: WheelProps) {
  return (
    <div className="wheel-wrapper">
      {/* fixed pointer at the top, points down */}
      <div className="pointer" />

      {/* spinning wheel */}
      <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
        {/* sector labels – rotate together with the wheel */}
        <div className="wheel-label wheel-label-top">1s</div>
        <div className="wheel-label wheel-label-right">3s</div>
        <div className="wheel-label wheel-label-bottom">5s</div>
        <div className="wheel-label wheel-label-left">10s</div>
      </div>

      {/* center button on top of the wheel – does not rotate */}
      <button
        className="center-button"
        onClick={onSpin}
        disabled={isSpinning || isLoadingTime}
      >
        {isSpinning ? "..." : "SPINNI"}
      </button>
    </div>
  );
}
