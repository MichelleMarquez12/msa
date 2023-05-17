<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");

$python = "C:/Users/Usuario/AppData/Local/Programs/Python/Python39/python.exe ";
$search = '"'.$_POST['busqueda']."&".$_POST['campo'].'"';

$out = array();
exec($python." ./pyfetch.py ".$search." 2>&1",$out);
//print_r($out);
echo($out[1]);