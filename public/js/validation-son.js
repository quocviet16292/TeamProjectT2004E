// Cấu hình mặc định cho giới hạn độ dài input text
const MIN_LENGTH = 1; // giới hạn tối thiểu mặc định là 1 ký tự
const MAX_LENGTH = 255; // giới hạn mặc định đối đa là 255 ký tự

let validationFields = []; // biến lưu thông tin các trường cần validation

// Hằng `validation` này là 1 object, mỗi key của object này là 1 function
// sẽ làm 1 công việc cụ thể cho việc `validation` của chúng ta
const validation = {
  // Hàm init, để sử dụng ta gọi `validation.init`
  // đây là hàm khởi tạo ban đầu, tham số truyển vào là 1 array chứa thông tin
  // các trường cần validation
  // VD: [{
  //   selector: '.name', --> selector của thẻ input
  //   name: 'name', --> name của thẻ input
  //   type: 'text', --> kiểu mà ta muốn validation cho trường này
  //   min: 1, --> độ dài tối thiểu cho phép ( nếu không nhập, mặc định là 1 )
  //   max: 32 --> độ dài tối đa cho phép ( nếu không nhập, mặc định là 255 )
  // }]
  init: function(fields) {
    validationFields = fields;

    // Gọi tới hàm `generate` trong object `validation`
    // This ở đây đại diện cho chính object `validation`
    // Thay vì gọi `validation.generate` -> `this.generate`
    // vì chúng ta đang đứng trong chính object `validation`
    this.generate();
  },
  // Hàm tạo ra cách thức validation của chúng ta
  generate: function() {
    // Lặp qua tất cả các trường cần được validation
    for (const field of validationFields) {
      // Lấy ra element từ selector được truyền vào
      const fieldElement = this.getElement(field.selector);

      // Lắng nghe sự kiện `focus` của element
      fieldElement.onfocus = function() {
        // Khi focus vào element này thì class `error` (nếu có) sẽ bị gỡ bỏ
        // Các bạn có thể thấy khi `focus` vào 1 thẻ `input` thì input sẽ không có viền màu đỏ
        this.classList.remove('error');
      }

      const that = this; // *Chú thích 1: this ở đây đại diện cho object `validation`
      // vì nó đang nằm trong function là giá trị của object `validation`
      fieldElement.onblur = function() {
        // Nếu ở đây gọi là this.checkFieldError thì sẽ lỗi
        // vì this trong function này đang đại diện cho chính element mà chúng ta blur (* Đọc lại chú thích 1)
        // vì nó đang nằm trong function của 1 event trong DOM, cụ thể ở đây là event `blur`
        // Nên để giữ được `this` ở bên ngoài kia ta phải gán `this` đó vào 1 biến hoặc hằng `that`
        that.checkFieldError(field); // --> gọi tới hàm `checkFieldError` thuộc object `validation`
      }

      // Tạo ra nội dung `Tooltip` cho mỗi trường input
      const messageWrap = document.createElement('p'); // --> Tạo ra 1 thẻ p
      messageWrap.className = 'input-message'; // --> Gán class `input-message` cho thẻ p vừa tạo

      // Tạo ra nội dung `Tooltip`. VD: `Enter your phone number, numbers only`
      const message = this.getMessage(field); // --> gọi tới hàm `getMessage` thuộc object `validation`
      const messageNode = document.createTextNode(message); // --> tạo ra 1 textNode với nội dung vừa tạo

      // Đưa textNode vừa tạo vào trong thẻ p với class `input-message` vừa tạo phía trên
      messageWrap.appendChild(messageNode);

      // Đưa nội dung thẻ p với class `input-message` vào trong thẻ cha của thẻ input ngoài giao diện
      // `parentElement` --> để lấy ra element cha của chính element hiện tại
      fieldElement.parentElement.appendChild(messageWrap);
    }
  },
  // Hàm kiểm tra toàn bộ các trường cần validation
  // Trả về true nếu có lỗi, trả về false nếu không có lỗi
  // Vì tên hàm là `checkAllError` nên nếu có lỗi trả về true sẽ hợp lý hơn
  checkAllError: function() {
    let isError = false; // --> mặc định `isError` ta gán = false

    // Duyệt qua tất cả các trường cần validation
    for (const field of validationFields) {
      // Gọi tới hàm `checkFieldError` và truyền giá trị `field` vào
      // Nếu hàm `checkFieldError` trả về true thì hán `isError` = true --> được hiểu là trường này có lỗi
      this.checkFieldError(field) && (isError = true);
    }
    return isError; // --> trả về kết quả, nếu không trường nào lỗi --> trả về false
    // Nếu ít nhất 1 trường lỗi --> trả về true
    // Dựa vào hàm này, ta hoàn toàn có thể biết là form của chúng ta có lỗi nào hay ko
  },
  // Hàm kiểm tra cụ thể 1 trường có lỗi hay không ( hàm phía trên là kiểm tra tất cả
  // các trường ). Hàm này kiểm tra từng trường 1 thôi
  checkFieldError: function(field) {
    const fieldElement = this.getElement(field.selector); // --> lấy element qua `selector`
    // field.type ở đây có giá trị là `text` hoặc `number`
    // nên ta suy ra `this[field.type]` có thể là `this.text` hoặc `this.number`
    // this.text --> gọi tới function `text` thuộc object `validation`
    // this.number --> gọi tới function `number` thuộc object `validation`
    const valid = this[field.type](fieldElement.value, field.min, field.max);
    // Nếu có lỗi (`valid` nghĩa là hợp lệ => `!valid` nghĩa là không hợp lệ => có lỗi)
    if (!valid) {
      fieldElement.classList.add('error'); // Có lỗi thì add class `error` cho thẻ input đó
      return true; // trả về giá trị boolean `true` => gọi tới hàm này nếu nhận về `true` nghĩa là có lỗi
    }
    fieldElement.classList.remove('error'); // Không có lỗi thì remove class `error` đi
    return false; // trả về `false`, hiểu là khi gọi hàm này, nhận đc `false` => không có lỗi
  },
  // Hàm kiểm tra có lỗi gì hay không
  // lỗi => return false
  // không lỗi => return true
  noError: function() {
    const haveError = this.checkAllError(); // gọi tới hàm `checkAllError` của object `validation`
    return !haveError; // vì hàm `checkAllError` trả về `true` nếu có lỗi
    // còn hàm này thì ngược lại, nên cần return ra giá trị phủ định lại. Cụ thẻ: `!haveError`
  },
  // Hàm validation cho kiểu text
  text: function (value, min = MIN_LENGTH, max = MAX_LENGTH) {
    const length = value.length; // lấy ra độ dài
    return length >= min && length <= max; // nếu thoả mãn => return `true` & ngược lại
  },
  // Hàm validation cho kiểu `number`
  number: function(value, min = MIN_LENGTH, max = MAX_LENGTH) {
    const isNumber = !!value && !isNaN(value); // kiểm tra `value` nhận vào có phải số hay ko
    const length = value.length;
    return isNumber && length >= min && length <= max; // nếu thoả mãn => return `true` & ngược lại
  },
  email: function(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  // Hàm tạo ra nội dung `Tooltip` cho các thẻ input
  getMessage: function(field) {
    let message = 'Enter your ' + field.name; // Mặc định

    // nếu type là `number` thì thêm câu này
    if (field.type === 'number') {
      message += ', numbers only';
    }

    // nếu tồn tại giới hạn nhỏ nhất khi nhập text vào input
    // vd: tối thiểu 1 ký tự
    if (field.min) {
      message += ', minimum ' + field.min + ' charactors'; // --> thì thêm dòng này
    }

    // nếu tồn tại giới hạn nhỏ nhất khi nhập text vào input
    // vd: tối đa 255 ký tự
    if (field.max) {
      message += ', maximum ' + field.max + ' charactors'; // --> thì thêm dòng này
    }
    return message; // trả về message hoàn chỉnh
  },
  // hàm get 1 element theo selector
  getElement: function(selector) {
    const element = document.querySelector(selector);
    return element;
  }
}
