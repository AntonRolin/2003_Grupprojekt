<?php

$percentage =[15, 0];
$flatReduction=[0, 100];
$description=["15% rabatt", "100kr rabatt"];
$expirationDate=["Ett datum", "Ett datum"];

$coupons = [];
    for($i=0; $i<count($percentage); $i++){
        $coupon = ["percentage"=>$percentage[$i], "flatReduction"=>$flatReduction[$i], "description"=>$description[$i], "expirationDate"=>$expirationDate[$i]];
        array_push($coupons, $coupon);
    }
    $json = json_encode($coupons, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    
    echo "<pre>";
    print_r($json);
    echo "</pre>";

    ?>