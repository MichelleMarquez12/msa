<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");

$python = "C:/Users/Usuario/AppData/Local/Programs/Python/Python39/python.exe ";
$string = "'".$_POST['tipo_rep'].",".$_POST['usr'].",".$_POST['tipo_usr'].",".$_POST['ubicacion'].",".$_POST['fecha'].",".$_POST['hora'].",".$_POST['descripcion']."'";

$out = array();
exec($python." ./pyinserter.py ".$string." 2>&1",$out);
//print_r($out);
echo($out[1]);