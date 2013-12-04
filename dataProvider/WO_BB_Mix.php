<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WO_BB_Mix
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

    public function getWO_BJ_Mix(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, b.prod_nama
        from wo4 a
        left join items b on a.prod_id=b.prod_id and a.co_id=b.co_id
        where a.co_id='$company' and a.wo_num='$params->wo_num' and a.so_num='$params->so_num' and a.no_ppd='$params->no_ppd' and a.for_prod_id='$params->for_prod_id'
        ORDER BY prod_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function addWO_BJ_Mix(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['prod_nama']);
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this->db->sqlBind($data, 'wo4', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;

    }
    public function updateWO_BJ_Mix(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['prod_nama']);
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'wo4', 'U', array('wo_num' => $params->wo_num,'so_num' => $params->so_num,'no_ppd' => $params->no_ppd,'sat_id' => $params->sat_id,'for_prod_id' => $params->for_prod_id, 'co_id' => $params->co_id, 'prod_id' => $params->prod_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWO_BJ_Mix(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo4 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and for_prod_id='$params->for_prod_id' and prod_id='$params->prod_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}
