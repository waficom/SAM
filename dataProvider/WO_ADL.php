<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WO_ADL
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

    public function getWO_ADL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, c.cust_nama, d.formula_id
        from wo0 a
        inner join so0 b on a.co_id=b.co_id and a.so_num=b.so_num
        inner join customer c on b.cust_id=c.cust_id and b.co_id=c.co_id
        inner join pp_detailproduksi d on a.so_num=d.so_num and a.co_id=d.co_id
        where a.co_id='$company' order by a.timeedit DESC
        ";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function addWO_ADL(stdClass $params)
    {
        if($params->status=='true'){
            $params->status = '1';
        }else{
            $params->status = '0';
        }
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['name'];
        $useredit = $_SESSION['user']['name'];
        $sql=("execute procedure get_wo_adl '$params->status','$params->no_ppd','$userinput','$useredit','$params->keterangan',
        '$params->ka_shift','$params->shift','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();

    }
    public function updateWO_ADL(stdClass $params)
    {
        if($params->status=='true'){
            $params->status = '1';
        }else{
            $params->status = '0';
        }
        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name'];
        $params->posted_date = $this->db->Date_Converter( $params->posted_date);
        $sql=("execute procedure get_wo_adl_u ' $params->posted_date','$params->status','$params->wo_num','$params->no_ppd','$useredit','$params->keterangan',
        '$params->ka_shift','$params->shift','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function deleteWO_ADL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo3 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and co_id='$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo2 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and co_id='$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo4 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and prod_id='$params->prod_id' and co_id='$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo1 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and prod_id='$params->prod_id' and co_id='$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo0 WHERE co_id='$company' and wo_num='$params->wo_num' and so_num='$params->so_num' and no_ppd='$params->no_ppd' and prod_id='$params->prod_id' and co_id='$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function getWOBB_ADL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, c.bb_nama
        from wo1 A
        left join bahanbaku C on A.bb_id=C.bb_id and a.co_id=c.co_id
        where a.co_id='$company' and a.prod_id = '$params->prod_id' and a.so_num = '$params->so_num' and a.wo_num = '$params->wo_num'
        order by a.bb_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function addWOBB_ADL(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['bb_nama'], $data['status']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this->db->sqlBind($data, 'wo1', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updateWOBB_ADL(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['bb_nama'], $data['status'] );
        $sql = $this -> db -> sqlBind($data, 'wo1', 'U', array('bb_id' => $params->bb_id,'wo_num' => $params->wo_num,'so_num' => $params->so_num,'no_ppd' => $params->no_ppd,'prod_id' => $params->prod_id, 'co_id' => $params->co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function getWOBJM_ADL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*
        from wo2 A
        where a.co_id='$company' and a.so_num = '$params->so_num' and a.wo_num = '$params->wo_num' and a.no_ppd = '$params->no_ppd'
        order by a.prod_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function updateWOBJM_ADL(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['status'] );
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this -> db -> sqlBind($data, 'wo2', 'U', array('prod_id' => $params->prod_id,'wo_num' => $params->wo_num,'so_num' => $params->so_num,'no_ppd' => $params->no_ppd,'sequence_no' => $params->sequence_no, 'co_id' => $params->co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}
