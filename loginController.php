<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");

$python = "C:/Users/Usuario/AppData/Local/Programs/Python/Python39/python.exe ";
$search = '"'.$_POST['usr']."&".$_POST['pswd'].'"';
$out = array();
exec($python." ./pylogin.py ".$search." 2>&1",$out);
//print_r($out);
try{
    if ($out[0] == "succefull_login"){
        echo("Usuario encontrado con exito");
    }else{
        echo("Usuario y/0 credenciales incorrectas");
    }
}catch(ErrorException $e){
    
}

