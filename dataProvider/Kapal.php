<?php

if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Kapal
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
    public function getVessel(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM vessel
        where co_id= '$company'
        ORDER BY timeedit DESC";
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
    public function addVessel(stdClass $params)
    {
        $data = get_object_vars($params);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this->db->sqlBind($data, 'vessel', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateVessel(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['vessel_id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $sql = $this->db->sqlBind($data, 'vessel', 'U', array('co_id' => $params->co_id,'vessel_id' => $params->vessel_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteVessel(stdClass $params)
    {
        $sql = "DELETE FROM vessel WHERE (co_id = '$params->co_id') and (vessel_id = '$params->vessel_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
