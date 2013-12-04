<?php

if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Acc_Penyusutan_Aset
{

    /**
     * @var dbHelper
     */
    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }
    public function getAcc_Penyusutan_Aset(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT A.*, B.coa_nama as acc_master_desc, C.coa_nama as acc_debit_desc, D.coa_nama as acc_credit_desc
        FROM account_penyusutan_aset A
        left join coa B on A.co_id=B.co_id and A.account_master=B.coa_id
        left join coa C on A.co_id=C.co_id and A.account_master=C.coa_id
        left join coa D on A.co_id=D.co_id and A.account_master=D.coa_id
        where a.co_id = '$company'
        ORDER BY apa_id ASC";
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
    public function addAcc_Penyusutan_Aset(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],  $data['acc_master_desc'], $data['acc_debit_desc'], $data['acc_credit_desc']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this->db->sqlBind($data, 'account_penyusutan_aset', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAcc_Penyusutan_Aset(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['apa_id'], $data['acc_master_desc'], $data['acc_debit_desc'], $data['acc_credit_desc']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this->db->sqlBind($data, 'account_penyusutan_aset', 'U', array('co_id' => $params->co_id,'apa_id' => $params->apa_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteAcc_Penyusutan_Aset(stdClass $params)
    {
        $sql = "DELETE FROM account_penyusutan_aset WHERE (co_id = '$params->co_id') and (apa_id = '$params->apa_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
