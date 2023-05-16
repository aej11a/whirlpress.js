// render the date with styles, and the modified date if it's not the same
export const PostDates = ({
  date,
  modified,
  inline,
}: {
  date: Date;
  modified?: Date;
  inline?: boolean;
}) => (
  <div className={`text-gray-500 mb-5 ${inline ? "inline" : ""}`}>
    <span className="mr-2">
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
    {modified ? (
      <>
        <br className="md:hidden" />
        {date.getTime() < modified.getTime() && (
          <span className="mr-2 italic">
            (modified{" "}
            {modified.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            )
          </span>
        )}
      </>
    ) : null}
  </div>
);
