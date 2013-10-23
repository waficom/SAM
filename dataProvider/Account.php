<?php

if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Account
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
    public function getAccount(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'coa_id';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM coa
        where co_id= '$company'
        ORDER BY $orderx ASC";
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
    public function addAccount(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this->db->sqlBind($data, 'coa', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAccount(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['coa_id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $sql = $this->db->sqlBind($data, 'coa', 'U', array('co_id' => $params->co_id,'coa_id' => $params->coa_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteAccount(stdClass $params)
    {
        $sql = "DELETE FROM coa WHERE (co_id = '$params->co_id') and (coa_id = '$params->coa_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
