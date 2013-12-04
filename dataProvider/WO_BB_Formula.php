<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WO_BB_Formula
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

    public function getWO_BB_Formula(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from view_workorderdetail
        where co_id='$company' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function getWO_BB_FormulaDetail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, b.bb_nama from wo1 a
                left join bahanbaku b on a.co_id=b.co_id and a.bb_id=b.bb_id
        where a.co_id='$company' and
        a.prod_id = '$params->prod_id' and a.so_num = '$params->so_num' and a.wo_num = '$params->wo_num'
         ORDER BY a.bb_id DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function addtWO_BB_FormulaDetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql=("execute procedure getbahanbaku_wo '$params->sat_id',
        '$params->jml_paket','$params->so_num','$params->formula_id','$params->prod_id','$params->no_ppd','$params->wo_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function addWO_BB_Formula(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['name'];
        $useredit = $_SESSION['user']['name'];
        $sql=("execute procedure getworkorderdetail '$params->no_ppd','$userinput','$useredit','$params->keterangan',
        '$params->ka_shift','$params->shift','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function deleteWO_BB_Formula(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo1 WHERE co_id = '$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and prod_id='$params->prod_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo4 WHERE co_id = '$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and prod_id='$params->prod_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo0 WHERE co_id = '$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and prod_id='$params->prod_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}