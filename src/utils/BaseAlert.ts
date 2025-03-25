import Swal, { SweetAlertOptions } from 'sweetalert2';

const BaseAlert = {
  success: (message: string, title: string = 'Thành công!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal2-popup-custom',
        confirmButton: 'swal2-confirm-custom',
      },
    });
  },

  error: (message: string, title: string = 'Lỗi!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Đóng',
      customClass: {
        popup: 'swal2-popup-custom',
        confirmButton: 'swal2-confirm-custom',
      },
    });
  },

  info: (message: string, title: string = 'Thông báo') => {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Đóng',
      customClass: {
        popup: 'swal2-popup-custom',
        confirmButton: 'swal2-confirm-custom',
      },
    });
  },

  confirm: (message: string, confirmCallback: () => void, title: string = 'Xác nhận') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'swal2-popup-custom',
        confirmButton: 'swal2-confirm-custom',
        cancelButton: 'swal2-cancel-custom',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  },
};

export default BaseAlert;
