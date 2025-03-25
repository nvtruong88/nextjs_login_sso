// utils/helper.ts

/**
 * Định dạng ngày theo định dạng 'dd/mm/yyyy'
 * @param date - Ngày cần định dạng (có thể là Date hoặc string)
 * @returns Ngày đã định dạng (string)
 */
export function formatDate(date: Date | string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  export function convertToInputDate(dateString: string): string {
    if (!dateString || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return ""; // Return empty if the input is invalid
    }
  
    const [month, day, year] = dateString.split("/");
    // Ensure components are padded to 2 digits
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }  
  
  /**
   * Kiểm tra xem một chuỗi có phải là email hợp lệ hay không
   * @param email - Chuỗi email cần kiểm tra (string)
   * @returns True nếu hợp lệ, false nếu không (boolean)
   */
  export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Định dạng một số tiền thành chuỗi với ký hiệu tiền tệ
   * @param amount - Số tiền cần định dạng (number)
   * @param currencySymbol - Ký hiệu tiền tệ (string), mặc định là '$'
   * @returns Số tiền đã định dạng (string)
   */
  export function formatCurrency(amount: number, currencySymbol: string = '$'): string {
    return `${currencySymbol}${amount.toFixed(2)}`;
  }
  
  /**
   * Tạo một mảng từ một chuỗi phân tách
   * @param str - Chuỗi cần tách (string)
   * @param delimiter - Ký tự phân tách (string), mặc định là ','
   * @returns Mảng các phần tử đã tách (Array<string>)
   */
  export function splitStringToArray(str: string, delimiter: string = ','): Array<string> {
    return str.split(delimiter).map(item => item.trim());
  }
  
  /**
   * Tạo một UUID (Unique Identifier)
   * @returns UUID (string)
   */
  export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  