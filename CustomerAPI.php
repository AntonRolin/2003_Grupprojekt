<?php
$firstname = [
    "Anna", 
    "Bengt", 
    "Cecile", 
    "Denise", 
    "Erik",
    "Frida",
    "Gustav",
    "Helena",
    "Ivar",
    "Joel",
    "Hakim"]; //Admin
$lastname = [
    "Andersson", 
    "Bengtsson", 
    "Cederkvist", 
    "Dengler", 
    "Eriksson",
    "Fryck", 
    "Gran",
    "Hallax",
    "Ibsen",
    "Jonsson",
    "Hakimsson"];//Admin
$email = [
    "anna_andersson@exempel.se", 
    "bengt_bengtsson@exempel.se", 
    "cecile_cederkvist@exempel.se", 
    "denise_dengler@exempel.se", 
    "erik_eriksson@exempel.se",
    "frida_fryck@exempel.se",
    "gustav_gran@exempel.se",
    "helena_hallax@exempel.se",
    "ivar_ibsen@exempel.se",
    "joel_jonsson@exempel.se",
    "hakim@admin.se"];//Admin
$password =[
    "annaandersson", 
    "bengtbengtsson", 
    "cecilecederkvist", 
    "denisedengler", 
    "erikeriksson",
    "fridafryck",
    "gustavgran",
    "helenahallax",
    "ivaribsen",
    "joeljonsson",
    "admin"];//Admin
$shipping = [
    "Upplandsgatan 1", 
    "Kommendörsgatan 32", 
    "Samaritgränd 4", 
    "Svaluddsvägen 1",
    "Vasavägen 1",
    "Smala gränd 1",
    "Stöcksjö Södra byväg 9",
    "Kungsholmstorg 11",
    "",
    "bsatugatn 1",
    ""];//Admin
$zipcode = [
    11123, 
    11448, 
    11853, 
    76015,
    16951,
    11139,
    90580,
    "",
    12030, 
    11820,
    ""];//Admin
$city =[
    "Stockholm", 
    "Stockholm", 
    "Stockholm", 
    "Gräddö",
    "Solna",
    "Stockholm",
    "Umeå",
    "Stockholm",
    "Stockholm",
    "Stockholm",
    ""];//Admin


    $customers = [];
    for($i=0; $i<count($firstname); $i++){
        $customer = ["firstname"=>$firstname[$i], "lastname"=>$lastname[$i], "email"=>$email[$i], "password"=>$password[$i],
        "shipping"=>$shipping[$i], "zipcode"=>$zipcode[$i], "city"=>$city[$i]];
        array_push($customers, $customer);
    }
    $json = json_encode($customers, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    
    echo "<pre>";
    print_r($json);
    echo "</pre>";
?>