const SUPABASE_URL = "https://nnnagxitvlknjrjlzwox.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubmFneGl0dmxrbmpyamx6d294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NDE1NjcsImV4cCI6MjA5NzIxNzU2N30.08dpaNPSOaEGxMLFWeTNbLMgq_eeVLi0UfkSVXHKWyE";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const tbody = document.getElementById("tbody");

async function loadSales() {

  const { data, error } = await supabaseClient
    .from("sales")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  render(data);
}

function rupiah(n) {
  return "Rp" + Number(n).toLocaleString("id-ID");
}

function render(data) {

  let omzet = 0;
  let totalModal = 0;

  tbody.innerHTML = "";

  data.forEach(item => {

    const om = item.harga * item.qty;
    const md = item.modal * item.qty;

    omzet += om;
    totalModal += md;

    tbody.innerHTML += `
      <tr>
        <td>${item.menu}</td>
        <td>${item.qty}</td>
        <td>${rupiah(om)}</td>
        <td>${rupiah(om - md)}</td>
      </tr>
    `;
  });

  document.getElementById("omzet").innerText =
    rupiah(omzet);

  document.getElementById("totalModal").innerText =
    rupiah(totalModal);

  document.getElementById("laba").innerText =
    rupiah(omzet - totalModal);
}

async function tambah() {

  const menu =
    document.getElementById("menu").value;

  const modal =
    Number(document.getElementById("modal").value);

  const harga =
    Number(document.getElementById("jual").value);

  const qty =
    Number(document.getElementById("qty").value);

  if (!menu || !modal || !harga || !qty) {
    alert("Lengkapi semua data");
    return;
  }

  const { error } = await supabaseClient
    .from("sales")
    .insert([
      {
        menu,
        qty,
        modal,
        harga
      }
    ]);

  if (error) {
    console.error(error);
    alert("Gagal menyimpan");
    return;
  }

  document.getElementById("menu").value = "";
  document.getElementById("modal").value = "";
  document.getElementById("jual").value = "";
  document.getElementById("qty").value = "";

  loadSales();
}

window.onload = loadSales;
