<!DOCTYPE html>
<html>
<head>
    <title>Import Excel + Upload Foto</title>
</head>
<body>

<h2>Upload Excel dan Foto Siswa</h2>

<form action="upload.php" method="post" enctype="multipart/form-data">
    <p>File Excel:</p>
    <input type="file" name="excel" required>

    <p>Folder Foto (zip semua fotonya):</p>
    <input type="file" name="fotozip" required>

    <button type="submit">Upload</button>
</form>

</body>
</html>
