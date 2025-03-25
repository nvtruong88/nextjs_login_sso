const Modal: React.FC<ModalProps> = ({
  showModal,
  modalData,
  handleCloseModal,
  size,
  actions = [],
  bodyContent,
}) => {
  const modalClass =
    size === "fullscreen"
      ? "modal-fullscreen"
      : size === "large"
      ? "modal-lg"
      : size === "small"
      ? "modal-sm"
      : "modal-custom-size"; // Custom size class

  return (
    showModal &&(
      <>
        {/* Backdrop */}
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseModal} // Close modal when backdrop is clicked
        ></div>

        {/* Modal */}
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className={`modal-dialog ${modalClass}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {bodyContent ? (
                  bodyContent
                ) : (
                  "Không tồn tại mẫu"
                )}
              </div>
              <div className="modal-footer">
                {actions.length > 0 ? (
                  actions.map((action, index) => (
                    <button
                      key={index}
                      className={`btn ${action.className || "btn-primary"}`}
                      onClick={action.onClick}
                    >
                      {action.label}
                    </button>
                  ))
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
