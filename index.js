
const app = {
  data: {},
  el: {},
  doLogin(e) {
    e.preventDefault();
    axios.post(`${API_URL}admin/signin`, {
      username: this.el.inputUserName.value,
      password: this.el.inputPassword.value,
    })
    .then((response) => {
      if (response.data.success) {
        const { token, expired } = response.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  init() {
    this.el.inputUserName = document.getElementById('username');
    this.el.inputPassword = document.getElementById('password');
    this.el.form = document.getElementById('form');
    this.el.form.addEventListener('submit', (e) => {
      this.doLogin(e);
    });
  }
}

app.init();
