<?php 
    if(isset($_SERVER['HTTP_ORIGIN'])){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Accept, X-Requested-With");
    }

    $response = array();

    require_once __DIR__ . '/dbconfig.php';

    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    $result = mysqli_query($db , "select * from students") or die(mysqli_connect_error());

    if(mysqli_num_rows($result) > 0){
        $response['students'] = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $mahasiswa = array();
            $mahasiswa['nim'] = $row['nim'];
            $mahasiswa['nama'] = $row['nama'];
            $mahasiswa['prodi'] = $row['prodi'];
            $mahasiswa['foto'] = $row['foto'];
            array_push($response['students'], $mahasiswa);
        }

        $response['success'] = 1;
        echo json_encode($response);
    }else{
        $response['success'] = 0;
        $response['message'] = 'Tidak ada mahasiswa yang ditemukan';
        echo json_encode($response);
    }

    mysqli_free_result($result);
?>