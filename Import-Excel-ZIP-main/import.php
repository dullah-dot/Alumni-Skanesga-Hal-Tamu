<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$conn = mysqli_connect("localhost", "root", "", "db_murid");

// lokasi file excel
$file = "data_murid.xlsx";

// load file excel
$spreadsheet = IOFactory::load($file);
$sheet = $spreadsheet->getActiveSheet();
$rows = $sheet->toArray();

// skip header
$first = true;

foreach ($rows as $row) {
    if ($first) { 
        $first = false; 
        continue; 
    }

    $nis           = $row[0];
    $nama          = $row[1];
    $kelas         = $row[2];
    $alamat        = $row[3];
    $no_hp         = $row[4];
    $email         = $row[5];
    $foto          = $row[6]; // nama file foto
    $studi_lanjut  = $row[7];
    $bekerja       = $row[8];

    // insert otomatis
    $query = "INSERT INTO murid (nis, nama, kelas, alamat, no_hp, email, foto, studi_lanjut, bekerja)
              VALUES (
                '$nis', 
                '$nama', 
                '$kelas', 
                '$alamat', 
                '$no_hp', 
                '$email', 
                '$foto',
                '$studi_lanjut',
                '$bekerja'
              )";

    mysqli_query($conn, $query);
}

echo "Import selesai, jangan rewel.";
