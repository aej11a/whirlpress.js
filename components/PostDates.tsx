// render the date with styles, and the modified date if it's not the same
export const PostDates = ({
  date,
  modified,
}: {
  date: Date;
  modified: Date;
}) => (
  <div className="text-gray-500 mb-5">
    <span className="mr-2">
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
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
  </div>
);
