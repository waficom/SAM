<?php
/*
require_once('classes/pdo_database.class.php');
$_SESSION['site']['db']['type'] = 'fbd';
$_SESSION['site']['db']['host'] = 'localhost';
$_SESSION['site']['db']['port'] = '3050';
$_SESSION['site']['db']['username'] = 'SYSDBA';
$_SESSION['site']['db']['password'] = 'masterkey';
$_SESSION['site']['db']['database'] = '/var/db/sam.fdb';

$dbtype = (string)$_SESSION['site']['db']['type'];
$host = (string)$_SESSION['site']['db']['host'];
$port = (int)$_SESSION['site']['db']['port'];
$dbName = (string)$_SESSION['site']['db']['database'];
$dbUser = (string)$_SESSION['site']['db']['username'];
$dbPass = (string)$_SESSION['site']['db']['password'];

try
{
    # object = new wArLeY_DBMS(shortcut_database_type, server, database_name, user, password, port);
    $dbx = new wArLeY_DBMS($dbtype, $host, $dbName, $dbUser, $dbPass, $port);
    ///3.- Connect to database.
    $conn = $dbx->Cnxn(); //This step is really neccesary for create connection to database, and getting the errors in methods.

    ///4.- Check if connection are succesful or return error.
    if($conn==false) die("Error: Cant connect to database.");

    ///5.- If connection fail you can print the error... Note: Every operation you execute can try print this line, for get the latest error ocurred.
    echo $dbx->getError(); //Show error description if exist, else is empty.

//				}
}
catch(PDOException $e)
{
    $this->err = $e->getMessage();
}


$date = new DateTime("2013-04-15 16:43:21", new DateTimeZone('Asia/Jakarta'));
$locale="unix";

if (!is_null($date))
{
    print_r($date);
    if ($locale == "unix")
        $date = date("Y-m-d H:i:s", $date->date);
    print_r($date);
    # Separate Date from Time
    if (strpos($date, 'T')) {
        $date = explode("T", $date);
    } else
    {
        $date = explode(" ", $date);
    }

    $date = $date[0];

}
*/

require_once("lib/JavaBridge/java/Java.inc");
$date = "10/01/08";
if (!is_null($date))
{
    $date = new DateTime($date, new DateTimeZone('Asia/Jakarta'));

    echo $date->format('U');
    echo '<br>';

    # Separate Date from Time
    $strdate = $date->format('m/d/Y H:i:s');
    echo $strdate;

    echo '<br>';

    $strdate = explode(" ", $strdate);

    $date = $strdate[0];

}

echo 'Inilah : '.$date.'<br>';


$formatter = new Java('java.text.SimpleDateFormat', "MM/dd/yyyy");

$tgl = $formatter->parse($date);

$temp = new Java('java.util.Date', $date);

echo 'temp = ' . $temp . '<br>';
echo 'tgl = ' . $tgl . '<br>';


?>
