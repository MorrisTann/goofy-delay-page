type WheelProps = {
  rotation: number;
  isSpinning: boolean;
  isLoadingTime: boolean;
  onSpin: () => void;
  options?: number[];
  wheelRef?: React.RefObject<HTMLDivElement | null>;
  spinDisabled?: boolean;
};

export function Wheel({
  rotation,
  isSpinning,
  isLoadingTime,
  onSpin,
  options = [3, 5, 10, 20],
  wheelRef,
  spinDisabled = false,
}: WheelProps) {
  const [top, right, bottom, left] = options;
  return (
    <div className="wheel-wrapper">
      {/* fixed pointer at the top, points down */}
      <div className="pointer" />

      {/* spinning wheel – ref allows parent to update transform without re-render (Safari fix) */}
      <div
        ref={wheelRef}
        className="wheel"
        style={{ transform: `rotate(${rotation}deg) translateZ(0)` }}
      >
        {/* sector labels – rotate together with the wheel */}
        <div className="wheel-label wheel-label-top">{top}s</div>
        <div className="wheel-label wheel-label-right">{right}s</div>
        <div className="wheel-label wheel-label-bottom">{bottom}s</div>
        <div className="wheel-label wheel-label-left">{left}s</div>
      </div>

      {/* center button on top of the wheel – does not rotate */}
      <button
        className="center-button"
        onClick={onSpin}
        disabled={isSpinning || isLoadingTime || spinDisabled}
      >
        {isSpinning ? "..." : "SPINNI"}
      </button>
    </div>
  );
}
