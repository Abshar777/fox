"use client";

/**
 * Submit button that asks first. Deleting a note is irreversible and the
 * table puts the control one click away, so it gets a confirmation step.
 */
export default function ConfirmButton({
  children,
  message = "Are you sure?",
  className = "",
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
