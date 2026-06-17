
let data=[];
function rupiah(n){return 'Rp'+n.toLocaleString('id-ID');}
function tambah(){
const menu=document.getElementById('menu').value;
const modal=Number(document.getElementById('modal').value);
const jual=Number(document.getElementById('jual').value);
const qty=Number(document.getElementById('qty').value);
if(!menu||!modal||!jual||!qty)return;

data.push({menu,modal,jual,qty});
render();
}
function render(){
let omzet=0,totalModal=0;
const tb=document.getElementById('tbody');
tb.innerHTML='';
data.forEach(d=>{
const om=d.jual*d.qty;
const md=d.modal*d.qty;
omzet+=om; totalModal+=md;
tb.innerHTML+=`<tr><td>${d.menu}</td><td>${d.qty}</td><td>${rupiah(om)}</td><td>${rupiah(om-md)}</td></tr>`;
});
document.getElementById('omzet').innerText=rupiah(omzet);
document.getElementById('totalModal').innerText=rupiah(totalModal);
document.getElementById('laba').innerText=rupiah(omzet-totalModal);
}
