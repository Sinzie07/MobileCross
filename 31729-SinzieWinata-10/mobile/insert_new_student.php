<?php 
    if(isset($_SERVER['HTTP_ORIGIN'])){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Accept, X-Requested-With");
    }

    
    $response = array();

    if(isset($_POST['nim']) && isset($_POST['nama']) && isset($_POST['prodi']) && isset($_FILES['foto'])){
        $nim = $_POST['nim'];
        $nama = $_POST['nama'];
        $prodi = $_POST['prodi'];
        $foto = $_FILES['foto'];

        require_once __DIR__ . '/dbconfig.php';

        $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());
        

        $source = $foto['tmp_name'];
        $destinations = 'uploads/' . $foto['name'];
        move_uploaded_file($source, $destinations);

        $result = mysqli_query($db, "insert into students(nim, nama, prodi, foto) values('$nim', '$nama', '$prodi', '$destinations')");

        if($result){
            $response['success'] = 1;
            $response['message'] = 'Data mahasiswa berhasil dimasukan !!';
        }else{
            $response['success'] = 0;
            $response['message'] = 'Ada kesalahan';
        }

        echo json_encode($response);
    }
    else{
        $response['success'] = 0;
        $response['message'] = 'Data tidak lengkap';
        
        echo json_encode($response);
    }
?>