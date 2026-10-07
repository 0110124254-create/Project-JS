'use strict';

const readline = require('readline');

let produkList = [
  { id: 1, nama: 'Laptop', harga: 12000000 },
  { id: 2, nama: 'Smartphone', harga: 5000000 },
  { id: 3, nama: 'Headphone', harga: 850000 },
  { id: 4, nama: 'Smartwatch', harga: 2300000 },
  { id: 5, nama: 'Mouse', harga: 250000 }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(n);

function tampilPesan(teks) {
  console.log(`\n${teks}`);
}

function tampilMenu() {
  console.log('\n========================================');
  console.log('   APLIKASI MANAJEMEN PRODUK');
  console.log('========================================');
  console.log('1. Tambah produk');
  console.log('2. Hapus produk');
  console.log('3. Tampilkan semua produk');
  console.log('4. Hapus beberapa produk');
  console.log('5. Keluar');
  console.log('========================================');
}

function validasiHarga(nilai) {
  const harga = Number(nilai);
  return Number.isFinite(harga) && harga >= 0;
}

function parseIds(input) {
  if (!input || input.trim() === '') return [];

  return input
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((id) => Number.isInteger(id) && id > 0);
}

function tambahProduk(id, nama, harga) {
  produkList = [...produkList, { id, nama, harga }];
  console.log(`\nProduk "${nama}" berhasil ditambahkan dengan ID ${id}.`);
}

function hapusProduk(...ids) {
  const idsUnik = [...new Set(ids)];
  const produkYangAda = produkList.filter(({ id }) => idsUnik.includes(id));

  if (produkYangAda.length === 0) {
    tampilPesan('Tidak ada produk dengan ID yang dimasukkan.');
    return;
  }

  const sebelum = produkList.length;
  produkList = produkList.filter(({ id }) => !idsUnik.includes(id));
  console.log(`\nBerhasil menghapus ${sebelum - produkList.length} produk.`);
}

function tampilkanProduk() {
  if (produkList.length === 0) {
    tampilPesan('Belum ada produk di daftar.');
    return;
  }

  console.log('\nDaftar Produk Saat Ini:');
  console.table(
    produkList.map(({ id, nama, harga }) => ({
      ID: id,
      Nama: nama,
      Harga: rupiah(harga)
    }))
  );
}

function askPertanyaan(pertanyaan) {
  return new Promise((resolve) => {
    rl.question(pertanyaan, (jawaban) => resolve(jawaban));
  });
}

async function main() {
  console.log('Selamat datang di aplikasi manajemen produk!');

  while (true) {
    tampilMenu();
    const pilihan = await askPertanyaan('Pilih menu: ');

    switch (pilihan.trim()) {
      case '1': {
        const nama = await askPertanyaan('Nama produk: ');
        const hargaInput = await askPertanyaan('Harga (Rp): ');

        if (!nama.trim() || !validasiHarga(hargaInput)) {
          tampilPesan('Nama dan harga tidak valid. Silakan coba lagi.');
          break;
        }

        const harga = Number(hargaInput);
        const idBaru = produkList.reduce((maks, { id }) => Math.max(maks, id), 0) + 1;
        tambahProduk(idBaru, nama.trim(), harga);
        break;
      }

      case '2': {
        const inputId = await askPertanyaan('Masukkan ID produk yang ingin dihapus: ');
        const ids = parseIds(inputId);

        if (ids.length === 0) {
          tampilPesan('ID yang dimasukkan tidak valid.');
          break;
        }

        hapusProduk(...ids);
        break;
      }

      case '3':
        tampilkanProduk();
        break;

      case '4': {
        const inputIds = await askPertanyaan('Masukkan beberapa ID (pisahkan dengan koma): ');
        const ids = parseIds(inputIds);

        if (ids.length === 0) {
          tampilPesan('Tidak ada ID yang valid untuk dihapus.');
          break;
        }

        hapusProduk(...ids);
        break;
      }

      case '5':
        console.log('\nProgram selesai. Sampai jumpa!');
        rl.close();
        return;

      default:
        tampilPesan('Pilihan tidak valid. Silakan pilih menu 1-5.');
        break;
    }
  }
}

main();
