type ModalProps = {
    showModal: boolean;
    modalData: any;
    handleCloseModal: () => void;
    size: 'fullscreen' | 'large' | 'small' | 'custom'; // Size options
    actions?: ModalAction[] | undefined;
    bodyContent?: React.ReactNode;
  };