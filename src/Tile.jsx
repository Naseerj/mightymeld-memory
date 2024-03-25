export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-16 w-[4rem] bg-blue-300 m-4 rounded-md"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block h-16 w-[4rem] m-4 bg-[#6467F2] rounded-md">
          <Content
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block h-16 w-[4rem] m-4 bg-[#EEF2FF] text-[#C7D2FF]">
          <Content
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return (
    <div onClick={flip} className={className}>
      
    </div>
  );
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
