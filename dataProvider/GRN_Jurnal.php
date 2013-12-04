<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class GRN_Jurnal
{
    /**
     * @var dbHelper
     */
    private $db;
    /**
     * Creates the dbHelper instance
     */
    function __construct()
    {
        $this -> db = new dbHelper();
        return;
    }

    public function getGRN_Jurnal(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, d.vend_nama, b.vend_nama as vend_tr_nama, c.gudang_nama
        from gr0 a
        left join vendor b on a.vend_id_trans=b.vend_id and a.co_id=b.co_id
        left join gudang c on a.gudang_id=c.gudang_id and a.co_id=c.co_id
        left join vendor d on a.vend_id=d.vend_id and a.co_id=d.co_id
        where a.co_id='$company' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }

}
