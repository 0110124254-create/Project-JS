// controller.mjs
import users from "./data.mjs";

// Melihat data (menggunakan map)
const index = () => {
  console.log("===== DAFTAR USER =====");
  users.map((user, i) => {
    console.log(
      `${i + 1}. Nama: ${user.nama} | Umur: ${user.umur} | Alamat: ${user.alamat} | Email: ${user.email}`
    );
  });
  console.log(`Total data: ${users.length}\n`);
};

// Menambah data (menggunakan push)
const store = (user) => {
  users.push(user);
  console.log(`Data "${user.nama}" berhasil ditambahkan.`);
};

// Menghapus data (default: data terakhir, atau berdasarkan index)
const destroy = (i = users.length - 1) => {
  if (i < 0 || i >= users.length) {
    console.log("Data tidak ditemukan.");
    return;
  }
  const [dihapus] = users.splice(i, 1);
  console.log(`Data "${dihapus.nama}" berhasil dihapus.`);
};

export { index, store, destroy };
