export const HeroBanner = () => (
  <div className="relative w-full text-center">
    <img
      alt="header"
      src="image/Box.png"
      className="block w-full object-contain"
    />
    <div className="absolute top-0 z-10 flex h-full w-full items-center justify-center text-white">
      <h1 className="flex items-center gap-2">
        <span className="text-display-md font-semibold md:text-display-xl">
          Create
        </span>
        <span className="heroBanner-text-gradient font-semibold">
          things together
        </span>
      </h1>
    </div>
  </div>
);
