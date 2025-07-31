
async function login(name, pass) {
    let data = await fetch('https://6810f37b27f2fdac241374ae.mockapi.io/Users')
    data=await data.json()
    console.log(data)
}

login('ksd', 'lwjehf')

document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
     let username = e.target.children[1].value
     let password = e.target.children[2].value
});