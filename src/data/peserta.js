// DATA DUMMY — tidak terhubung ke backend
// Edit file ini untuk menyesuaikan data peserta


export const DUMMY_PESERTA = [
  {
    id: 13,
    username: "Alfansyah Ghifari",
    no_hp: "089535200505",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 14,
    username: "Andika Alam Pratama",
    no_hp: "081400796283",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 15,
    username: "Dhimas Ageng Prasetyo",
    no_hp: "085692242695",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 16,
    username: "Ken Ichiza Farrel Aryasatya",
    no_hp: "087776834436",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 17,
    username: "Muhamad Ilham Ramadhan",
    no_hp: "082694348876",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 18,
    username: "Daitoryo Prabu Arena",
    no_hp: "089864706207",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 19,
    username: "Muhamad Rasya Arkariza",
    no_hp: "085333858350",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 20,
    username: "Sekar Kumala Dewi",
    no_hp: "085776093460",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 21,
    username: "Abdullah Syafiq Al Ghifari",
    no_hp: "089523723591",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 22,
    username: "Pajar Muhamad Supar",
    no_hp: "087776905421",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 23,
    username: "Aulia Wulandari",
    no_hp: "089532238681",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 25,
    username: "Nayla Rachmawati Asy Syifa",
    no_hp: "065699648354",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 26,
    username: "M Fahri Aditia Permana",
    no_hp: "085223547824",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 27,
    username: "Hidayat Ahmad",
    no_hp: "082299945506",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 29,
    username: "Maruf",
    no_hp: "089950260461",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 30,
    username: "Jun Sriva Elferada Panggabean",
    no_hp: "083088448447",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 31,
    username: "Muhammad Tadjiyah",
    no_hp: "089794411109",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 32,
    username: "Bagas Sulistyo",
    no_hp: "089363663437",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 33,
    username: "Muhammad Farhan",
    no_hp: "081211839431",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 34,
    username: "Harfin Abid Nasrulloh",
    no_hp: "085870049",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 35,
    username: "Jordy Augusto Da Silva Frituz",
    no_hp: "087786462895",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
  {
    id: 36,
    username: "Adelia Nazwa Eka Putri",
    no_hp: "085778643807",
    nama_jurusan: "Pengembangan web dengan node JS dan react JS",
    role_id: 2,
  },
  {
    id: 37,
    username: "Muhammad Fattah Dharmaseta",
    no_hp: "082123547824",
    nama_jurusan: "Pengelolaan Logistik Melalui Teknologi Informasi",
    role_id: 2,
  },
  {
    id: 38,
    username: "Jujun Junaedi",
    no_hp: "085670059",
    nama_jurusan: "Pemasangan Sistem Integrasi Bangunan Cerdas",
    role_id: 2,
  },
];

// Admin dummy
export const DUMMY_ADMIN = {
  id: 8,
  username: "Admin",
  role_id: 1,
};

// PIN dummy untuk login (username → pin)
// Semua peserta default pin: 12345
export const DUMMY_PINS = {};
DUMMY_PESERTA.forEach((p) => {
  DUMMY_PINS[p.username.toLowerCase()] = "12345";
});
DUMMY_PINS["admin"] = "admin123";

// Cari peserta by ID
export function getPesertaById(id) {
  return DUMMY_PESERTA.find((p) => p.id === Number(id)) || null;
}

// Cari peserta by username + pin (simulasi login)
export function loginDummy(username, pin) {
  const key = username.trim().toLowerCase();
  if (key === "admin" && pin === DUMMY_PINS["admin"]) {
    return { success: true, user: DUMMY_ADMIN, token: "dummy-admin-token", role_id: 1 };
  }
  const peserta = DUMMY_PESERTA.find(
    (p) => p.username.toLowerCase() === key
  );
  if (!peserta) return { success: false, message: "Nama tidak ditemukan" };
  if (DUMMY_PINS[key] !== pin) return { success: false, message: "PIN salah" };
  return {
    success: true,
    user: peserta,
    token: "dummy-token-" + peserta.id,
    role_id: peserta.role_id,
  };
}
