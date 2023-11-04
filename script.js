const form=document.querySelector("#form");
const amount=document.querySelector("#expense");
const descrip=document.querySelector("#description");
const catgory=document.querySelector("#category");
const lists=document.querySelector("#items");
form.addEventListener('submit',onsubmit);
lists.addEventListener('click',deletefn);
function onsubmit(e){
    let myoj={
    amount:amount.value,
    descrip:descrip.value,
    catgory:catgory.value
    };
    e.preventDefault();
    axios.post('https://crudcrud.com/api/700723434e2844dc8a71c58a72c93f68/appointmentdata',myoj)
    .then(res=> console.log(res))
    .catch(err=>console.log(err));
    showonscreen(myoj);
    amount.value="";
    descrip.value="";
    catgory.value="";
};
function deletefn(e){
    let arr=e.target.parentElement.innerText.split(" ");

    e.preventDefault();
    if(e.target.classList.contains('delete')){
        localStorage.removeItem(arr[1]);
        e.target.parentElement.style.display='none';
    }
    else if(e.target.classList.contains('edit')){
        amount.value=arr[0];
        descrip.value=arr[1];
        catgory.value=arr[2];
        e.target.parentElement.style.display='none';
    }
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/700723434e2844dc8a71c58a72c93f68/appointmentdata")
    .then((res)=>{
        for(var i=0;i<res.data.length;i++){
            showonscreen(res.data[i]);
        }
    } )
    .catch(err=>console.log(err));
})

function showonscreen(obj){
    let amt=obj.amount
    let des=obj.descrip
    let catg=obj.catgory
    const li=document.createElement('li');
    li.className='list-group-item';
    const delbtn=document.createElement('button');
    const editbtn=document.createElement('button');
    delbtn.appendChild(document.createTextNode('Delete'));
    delbtn.className='delete btn btn-danger mx-2';
    editbtn.appendChild(document.createTextNode('Edit'));
    editbtn.className='edit  btn btn-secondary';
    li.appendChild(document.createTextNode(`${amt} ${des} ${catg}`));
    li.append(delbtn);
    li.append(editbtn);
    lists.appendChild(li);
    
}