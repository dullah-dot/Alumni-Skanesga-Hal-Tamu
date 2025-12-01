<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

// koneksi DB
$conn = new mysqli("localhost", "root", "", "import_db");
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

// ====================================================
// 1. EKSTRAK ZIP FOTO
// ====================================================
$zipFile = $_FILES['fotozip']['tmp_name'];
$zip = new ZipArchive;

if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo('uploads/');
    $zip->close();
} else {
    die("Gagal membuka file ZIP foto.");
}

// ====================================================
// 2. BACA EXCEL
// ====================================================
$spreadsheet = IOFactory::load($_FILES['excel']['tmp_name']);
$sheet = $spreadsheet->getActiveSheet();
$data = $sheet->toArray();

// lewati header
$first = true;

foreach ($data as $row) {
    if ($first) {
        $first = false;
        continue;
    }

    // ambil data
    $nis   = $conn->real_escape_string($row[0]);
    $nama  = $conn->real_escape_string($row[1]);
    $kelas = $conn->real_escape_string($row[2]);
    $alamat = $conn->real_escape_string($row[3]);
    $nohp  = $conn->real_escape_string($row[4]);
    $email = $conn->real_escape_string($row[5]);
    $foto  = $conn->real_escape_string($row[6]);
    $studi = $conn->real_escape_string($row[7]);
    $kerja = $conn->real_escape_string($row[8]);

    // cek foto ada di folder?
    $fotoPath = 'uploads/' . $foto;
    if (!file_exists($fotoPath)) {
        echo "Foto $foto tidak ditemukan. Lewat.<br>";
        $foto = NULL; // atau biarkan kosong
    }

    // insert
    $sql = "INSERT INTO siswa
        (nis, nama, kelas, alamat_tinggal, no_hp, email, foto, status_studi_lanjut, status_bekerja)
        VALUES
        ('$nis', '$nama', '$kelas', '$alamat', '$nohp', '$email', '$foto', '$studi', '$kerja')";
    $conn->query($sql);
}

echo "Import selesai. Fotomu juga udah masuk folder uploads.";
