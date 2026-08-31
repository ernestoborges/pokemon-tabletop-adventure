export default function PokeballDefaultToken({ size = 64 }: { size?: number }) {
  const outerWhiteCircleSizeProportion = 13 / 16;
  const outerGrayCircleSizeProportion = 10 / 16;
  const barWidthProportion = 10 / 16;
  const barHeightProportion = 1 / 16;
  const innerWhiteCircleSizeProportion = 5 / 16;
  const innerGrayCircleSizeProportion = 3 / 16;

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="relative rounded-full bg-white shadow-md"
        style={{
          width: size * outerWhiteCircleSizeProportion,
          height: size * outerWhiteCircleSizeProportion,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"
          style={{
            width: size * outerGrayCircleSizeProportion,
            height: size * outerGrayCircleSizeProportion,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
          style={{
            width: size * barWidthProportion,
            height: size * barHeightProportion,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: size * innerWhiteCircleSizeProportion,
            height: size * innerWhiteCircleSizeProportion,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300"
          style={{
            width: size * innerGrayCircleSizeProportion,
            height: size * innerGrayCircleSizeProportion,
          }}
        />
      </div>
    </div>
  );
}
