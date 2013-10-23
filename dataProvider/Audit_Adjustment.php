<?php

if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Audit_Adjustment
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

    public function getAudit_Adjustment(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from AUDIT_ADJUSTMENT where co_id='$company' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addAudit_Adjustment()
    {
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure GL_AuditAdjustment_I '$useredit','$userinput','$co_id'");
		$this->db->execOnly();
    }


    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAudit_Adjustment(stdClass $params)
    {

        $co_id= $_SESSION['user']['site'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure GL_AuditAdjustment_U '$params->posted_date','$useredit','$params->inv_code','$co_id'");
        $this->db->execOnly();
    }

    public function deleteAudit_Adjustment(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM audit_adjustment WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
