
const app = {
  data: {
    productList: []
  },
  el: {},
  render() {
    let template = '';
    this.data.productList.forEach((item, index) => {
      template = `${template}
        <tr>
          <td>${item.title}</td>
          <td width="120">${item.origin_price}</td>
          <td width="120">${item.price}</td>
          <td width="100">
            <span class="${item.is_enabled? 'text-success': 'text-secondary'}">${item.is_enabled? '啟用': '未啟用'}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
      `;
    });
    this.el.productList.innerHTML = template;
    this.el.productCount.innerText = this.data.productList.length;
    const removeBtns = document.querySelectorAll("button[data-action='remove']");
    removeBtns.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.removeProduct(item.dataset.id);
      });
   });
  },
  getProductList() {
    axios.get(`${API_URL}api/${API_PATH}/admin/products`)
      .then((response) => {
        if (response.data.success) {
          this.data.productList = response.data.products;
          this.render();
        } else {
          window.location = 'login.html';
        }
      });
  },
  removeProduct(id) {
    axios.delete(`${API_URL}api/${API_PATH}/admin/product/${id}`)
      .then((response) => {
        if (response.data.success) {
          this.getProductList();
        } else {      
          window.location = 'login.html';
        }
      });
  },
  init() {
    this.el.productList = document.getElementById('productList');
    this.el.productCount = document.getElementById('productCount');

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.getProductList();
  }
}

app.init();
