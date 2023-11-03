import PropTypes from "prop-types";

const Toggleable = ({ children, openText, visible, onVisibleChange }) => {
  return (
    <>
      <div>{visible && children}</div>
      <div>
        <button onClick={() => onVisibleChange(!visible)}>
          {visible ? "cancel" : openText}
        </button>
      </div>
    </>
  );
};
Toggleable.propTypes = {
  openText: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
};

export default Toggleable;
