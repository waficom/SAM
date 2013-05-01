<?php
/**
 * GaiaEHR Configuration file per site
 * MySQL Config
 * Database Init Configuration
 */
//$_SESSION['site'] = array();
$_SESSION['site']['db']['type'] = 'fbd';
$_SESSION['site']['db']['host'] = 'localhost';
$_SESSION['site']['db']['port'] = '3050';
$_SESSION['site']['db']['username'] = 'SYSDBA';
$_SESSION['site']['db']['password'] = 'masterkey';
$_SESSION['site']['db']['database'] = '/var/db/sam.fdb';
/**
 * AES Key
 * 256bit - key
 */
$_SESSION['site']['AESkey'] = "k6g4j0ffjhnjg4wq0y3gyadtomy0c37k";
/**
 * Default site language and theme
 * Check if the localization variable already has a value, if not pass the 
 * default language.
 */
$_SESSION['site']['name'] = 'SAM';
$_SESSION['site']['default_localization']  = 'en_US';
$_SESSION['site']['theme'] = 'ext-all';
$_SESSION['site']['timezone'] = 'Asia/Jakarta';

$_SESSION['site']['id']    = basename(dirname(__FILE__));
$_SESSION['site']['dir']   = $_SESSION['site']['id'];
$_SESSION['site']['url']   = $_SESSION['url'] . '/sites/' . $_SESSION['site']['dir'];
$_SESSION['site']['path']  = str_replace('\\', '/', dirname(__FILE__));
$_SESSION['site']['temp']['url']  = $_SESSION['site']['url'] . '/temp';
$_SESSION['site']['temp']['path'] = $_SESSION['site']['path'] . '/temp';