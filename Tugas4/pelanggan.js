// ===== Tugas Pertemuan 4 JS: Sistem Manajemen Transportasi (OOP) =====

// Class induk, isinya data yang sama buat semua kendaraan
class Kendaraan {
  constructor(merk, model, tahun, tarifPerHari) {
    this.merk = merk;
    this.model = model;
    this.tahun = tahun;
    this.tarifPerHari = tarifPerHari;
    this.tersedia = true; // true = belum disewa siapa-siapa
  }

  getInfo() {
    return `${this.merk} ${this.model} (${this.tahun})`;
  }

  // Hitung biaya sewa, nanti bisa ditimpa sama class anak
  hitungBiaya(hari) {
    return this.tarifPerHari * hari;
  }
}

// Class anak: Mobil, punya properti tambahan jumlah pintu
class Mobil extends Kendaraan {
  constructor(merk, model, tahun, tarifPerHari, pintu) {
    super(merk, model, tahun, tarifPerHari); // panggil constructor induk
    this.pintu = pintu;
  }

  getInfo() {
    return `Mobil ${super.getInfo()}, ${this.pintu} pintu`;
  }
}

// Class anak: Motor, punya properti tambahan tipe
// Hitung biayanya beda: sewa 3 hari atau lebih dapat diskon 10%
class Motor extends Kendaraan {
  constructor(merk, model, tahun, tarifPerHari, tipe) {
    super(merk, model, tahun, tarifPerHari);
    this.tipe = tipe;
  }

  getInfo() {
    return `Motor ${super.getInfo()}, tipe ${this.tipe}`;
  }

  hitungBiaya(hari) {
    const total = this.tarifPerHari * hari;
    return hari >= 3 ? total * 0.9 : total;
  }
}

// Class Pelanggan: simpan data pelanggan dan kendaraan yang dia sewa
class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = []; // daftar transaksi sewa, awalnya kosong
  }

  // Catat transaksi sewa kendaraan
  sewaKendaraan(kendaraan, hari) {
    // kalau kendaraan lagi disewa orang lain, gak boleh disewa
    if (!kendaraan.tersedia) {
      console.log(`${kendaraan.getInfo()} lagi disewa, gak bisa disewa.`);
      return;
    }

    const total = kendaraan.hitungBiaya(hari);

    // simpan transaksinya
    this.kendaraanDisewa.push({ kendaraan: kendaraan, hari: hari, total: total });
    kendaraan.tersedia = false; // tandai kendaraan udah disewa

    console.log(
      `${this.nama} nyewa ${kendaraan.getInfo()} selama ${hari} hari. Total: Rp${total.toLocaleString("id-ID")}`
    );
  }

  // Kembalikan kendaraan (biar bisa disewa lagi)
  kembalikanKendaraan(kendaraan) {
    const index = this.kendaraanDisewa.findIndex(t => t.kendaraan === kendaraan);

    if (index === -1) {
      console.log(`${this.nama} gak nyewa ${kendaraan.getInfo()}.`);
      return;
    }

    this.kendaraanDisewa.splice(index, 1); // hapus dari daftar sewa
    kendaraan.tersedia = true;
    console.log(`${this.nama} udah ngembaliin ${kendaraan.getInfo()}.`);
  }
}

// Tampilkan pelanggan yang lagi nyewa kendaraan
const tampilkanPelangganMenyewa = (daftarPelanggan) => {
  console.log("\n=== Pelanggan yang Lagi Menyewa ===");

  // ambil pelanggan yang punya minimal 1 kendaraan disewa
  const penyewa = daftarPelanggan.filter(p => p.kendaraanDisewa.length > 0);

  if (penyewa.length === 0) {
    console.log("Belum ada yang nyewa.");
    return;
  }

  penyewa.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nama} (${p.nomorTelepon})`);
    p.kendaraanDisewa.forEach(t => {
      console.log(
        `   - ${t.kendaraan.getInfo()} | ${t.hari} hari | Rp${t.total.toLocaleString("id-ID")}`
      );
    });
  });
};

// ===== Coba jalanin =====

// bikin kendaraan
const mobil1 = new Mobil("Toyota", "Avanza", 2022, 400000, 4);
const motor1 = new Motor("Honda", "Vario", 2023, 100000, "Matic");

// bikin pelanggan
const andi = new Pelanggan("Andi", "081234567890");
const budi = new Pelanggan("Budi", "082198765432");
const citra = new Pelanggan("Citra", "085611223344");

const semuaPelanggan = [andi, budi, citra];

andi.sewaKendaraan(mobil1, 2);  // Andi nyewa mobil 2 hari
budi.sewaKendaraan(motor1, 3);  // Budi nyewa motor 3 hari (kena diskon)
citra.sewaKendaraan(mobil1, 1); // gagal, mobil udah disewa Andi

tampilkanPelangganMenyewa(semuaPelanggan);

andi.kembalikanKendaraan(mobil1); // Andi balikin mobil
tampilkanPelangganMenyewa(semuaPelanggan);
