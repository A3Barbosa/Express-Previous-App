//document.querySelector('#clickMe').addEventListener('click', checkThePal)
console.log('hello')
var check = document.getElementsByClassName("fa-check");
var trash = document.getElementsByClassName("fa-trash");

Array.from(check).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const check = this.parentNode.parentNode.childNodes[3].innerText
    console.log('click')
    fetch('names', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'check':check
      })
    }) 
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
     window.location.reload(true)
    })
  });
});
console.log('click')

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    console.log('click')
    fetch('names', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name
      })
    }).then(function (response) {
    window.location.reload()
    })
  });
});








