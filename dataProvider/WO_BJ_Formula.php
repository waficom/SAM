<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WO_BJ_Formula
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

    public function getWO_BJ_FormulaDetail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, b.prod_nama from wo2 a
                left join items b on a.co_id=b.co_id and a.prod_id=b.prod_id
        where a.co_id='$company' and
        a.prod_id = '$params->prod_id' and a.so_num = '$params->so_num' and a.wo_num = '$params->wo_num'
         ORDER BY a.prod_id DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function addWO_BJ_FormulaDetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $posted_by = $_SESSION['user']['name'];
        $sql=("execute procedure getbarangjadi_wo '$posted_by','$params->sat_id',
        $params->qty_pcs,$params->qty,'$params->no_ppd','$params->prod_id','$params->so_num','$params->wo_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updateWO_BJ_FormulaDetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $posted_by = $_SESSION['user']['name'];
        $posted_date =  $this->db->Date_Converter($params->posted_date);
        $sql=("execute procedure getbarangjadi_wo_u '$params->sat_id','$params->kegudang','$params->gudang_id','$params->sequence_no','$posted_date',
        '$posted_by','$params->no_ppd','$params->prod_id','$params->so_num','$params->wo_num','$co_id'
        ");
        $this->db->setSQL($sql);
       $this->db->execOnly();
    }
    public function deleteWO_BJ_FormulaDetail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo2 WHERE co_id = '$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and prod_id='$params->prod_id' and sequence_no='$params->sequence_no' ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}
