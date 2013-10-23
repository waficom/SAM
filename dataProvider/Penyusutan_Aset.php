<?php

if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Penyusutan_Aset
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
    public function getPenyusutan_Aset(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM penyusutan_aset where co_id='$company'
        ORDER BY $orderx DESC";
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
    public function addPenyusutan_Aset(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this->db->sqlBind($data, 'penyusutan_aset', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePenyusutan_Aset(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['pa_id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $sql = $this->db->sqlBind($data, 'penyusutan_aset', 'U', array('co_id' => $params->co_id,'pa_id' => $params->pa_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePenyusutan_Aset(stdClass $params)
    {
        $sql = "DELETE FROM penyusutan_aset WHERE (co_id = '$params->co_id') and (pa_id = '$params->pa_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
