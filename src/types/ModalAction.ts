type ModalAction = {
    label: string;         // The label text for the button
    onClick: (e?: React.FormEvent) => void;   // The function to be executed on click
    className?: string;    // Optional className for custom styling
  };