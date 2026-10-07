// ===== Tugas Pertemuan 3 JS: Manajemen Produk Toko Online =====

// 1. Array produkToko
let produkToko = [
  { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
  { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
  { id: 3, nama: "Keyboard", harga: 350000, stok: 7 }
];

// 2. Fungsi tambahProduk (Function Declaration)
// id dibuat otomatis: id terbesar saat ini + 1 (aman walaupun ada produk yang sudah dihapus)
function tambahProduk(nama, harga, stok) {
  let idBaru = 1;
  if (produkToko.length > 0) {
    idBaru = Math.max(...produkToko.map(p => p.id)) + 1;
  }

  produkToko.push({ id: idBaru, nama: nama, harga: harga, stok: stok });
  console.log(`Produk "${nama}" berhasil ditambahkan dengan id ${idBaru}.`);
}

// 3. Fungsi hapusProduk (Function Expression)
const hapusProduk = function (id) {
  const index = produkToko.findIndex(p => p.id === id);

  if (index === -1) {
    console.log(`Produk dengan id ${id} tidak ditemukan.`);
    return;
  }

  const dihapus = produkToko.splice(index, 1);
  console.log(`Produk "${dihapus[0].nama}" berhasil dihapus.`);
};

// 4. Fungsi tampilkanProduk (Arrow Function)
const tampilkanProduk = () => {
  console.log("\n=== Daftar Produk ===");

  if (produkToko.length === 0) {
    console.log("Belum ada produk.");
    return;
  }

  produkToko.forEach(p => {
    console.log(
      `ID: ${p.id} | ${p.nama} | Harga: Rp${p.harga.toLocaleString("id-ID")} | Stok: ${p.stok}`
    );
  });
};

// ===== Pengujian =====
tampilkanProduk();

tambahProduk("Monitor", 1800000, 4);
tampilkanProduk();

hapusProduk(2);   // hapus Mouse
hapusProduk(99);  // id tidak ada
tampilkanProduk();
