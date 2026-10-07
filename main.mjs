// main.mjs
import { index, store, destroy } from "./controller.mjs";

const main = () => {
  // tambah dua data
  store({ nama: "Data 11", umur: 30, alamat: "Jl. Data 11", email: "data11@mail.com" });
  store({ nama: "Data 12", umur: 31, alamat: "Jl. Data 12", email: "data12@mail.com" });

  // tampilkan data (12 data)
  index();

  // hapus data
  destroy();

  // tampilkan data setelah dihapus (11 data)
  index();
};

main();
