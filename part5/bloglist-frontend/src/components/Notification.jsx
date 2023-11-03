const Notification = ({ children, error }) => {
  const color = error ? "red" : "green";

  if (children === null) {
    return null;
  }

  return (
    <div
      style={{
        color,
        borderColor: color,
        borderStyle: "solid",
        borderWidth: 3,
        padding: 10,
        borderRadius: 7,
        background: "lightgray",
        marginBlock: 5,
      }}
    >
      {children}
    </div>
  );
};

export default Notification;
