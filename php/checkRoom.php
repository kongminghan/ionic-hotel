<?php
    header('Access-Control-Allow-Origin: *');
    $con = mysqli_connect("localhost","id1167025_admin","admin");
    if (!$con) 
    {
        die('Could not connect: ' . mysqli_error($con));
    }
    mysqli_select_db($con,"id1167025_fairytale");

    $postdata = file_get_contents("php://input");
    if(isset($postdata)) {
        $request = json_decode($postdata);  
        $qty = $request->qty;
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        $response = array();
    
        $result = mysqli_query($con,"SELECT * FROM room where max_adult >= '$qty'");

        while($row = mysqli_fetch_array($result))
        {
            $a=$row['room_id'];
            $query = mysqli_query($con,"SELECT sum(qty_reserve) FROM roominventory where arrival <= '$startDate' and departure >= '$endDate' and room_id='$a' and status !='out'");
            
            while($rows = mysqli_fetch_array($query))
            {
                $inogbuwin=$rows['sum(qty_reserve)'];
            }
            $angavil = $row['qty'] - $inogbuwin;

            $obj = new stdClass;
            $obj->room_id = $a;
            $obj->type = $row['type'];
            $obj->rate = $row['rate'];            
            $obj->max = $row["max_adult"];
            $obj->available = $angavil;
            $obj->desc = $row["description"];
            $obj->bed = $row["num_bed"];
            $obj->img = 'https://fairytale.000webhostapp.com/hotel/'.$row["image"];

            array_push($response, $obj);
        }
        echo json_encode($response);
    }else{
        echo 'error';
    }
?>