<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class GRN_Return
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

    public function getGRN_Return(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from gr0
        where co_id='$company' and gr_type='B' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }

    public function addGRN_Return(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['name'];
        $useredit = $_SESSION['user']['name'];
        $sql=("execute procedure goods_received_return_i '$useredit','$userinput','$params->grn_return','$co_id'
        ");
        $this->db->setSQL($sql);
       $this->db->execOnly();

    }
    public function updateGRN_Return(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name'];
        $sql=("execute procedure goods_received_return_u '$params->keterangan','$useredit','$params->gr_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updateGRN_Return_Posting(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name'];
        $posted_date =  $this->db->Date_Converter($params->posted_date);
        $sql=("execute procedure goods_received_return_p '$useredit','$posted_date','$params->gr_num','$co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deleteGRN_Return(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM gr11 WHERE co_id = '$company' and gr_num='$params->gr_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr10 WHERE co_id = '$company' and gr_num='$params->gr_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr0 WHERE co_id = '$company' and gr_num='$params->gr_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}
