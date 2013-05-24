<?php
/*
GaiaEHR (Electronic Health Records)
Facilities.php
Facilities dataProvider
Copyright (C) 2012 Ernesto J. Rodriguez (Certun)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');
class Factory_location
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

    /**
     * @param stdClass $params
     * @return array
     */

    public function getFactorylocation(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "SELECT * FROM pabrik_location ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

    public function getGudanglocation(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "SELECT * FROM gudang WHERE pabrik_sequence = '" . $params->pabrik_sequence ."' ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        //print_r($sql);
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
    public function addFactorylocation(stdClass $params)
    {

        $data = get_object_vars($params);

        //error_reporting(-1);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'], $data['pabrik_sequence']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'pabrik_location', 'I');
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function addGudanglocation(stdClass $params)
    {

        $data = get_object_vars($params);

        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'gudang', 'I');
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateFactorylocation(stdClass $params)
    {
        $data = get_object_vars($params);
        //$data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pabrik_sequence'],$data['co_id']);
        $sql = $this -> db -> sqlBind($data, 'pabrik_location', 'U', array('pabrik_sequence' => $params-> pabrik_sequence));
        $this -> db -> setSQL($sql);
       //  print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateGudanglocation(stdClass $params)
    {
        $data = get_object_vars($params);
        //$data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pabrik_sequence'],$data['co_id'],$data['old_gudang_id']);
        $sql = $this -> db -> sqlBind($data, 'gudang', 'U', array('co_id' => $params-> co_id,'pabrik_sequence' => $params-> pabrik_sequence,'gudang_id' => $params-> old_gudang_id));
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }


    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteFactorylocation(stdClass $params)
    {
//		$sql = $this -> db -> sqlBind($data, 'Factlocation', 'U', array('Factlocation_id' => $params -> Factlocation_id));
        $sql = "DELETE FROM gudang WHERE (co_id = '$params->co_id') and (pabrik_sequence = '$params->pabrik_sequence')";
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pabrik_location WHERE (co_id = '$params->co_id') and (pabrik_sequence = '$params->pabrik_sequence')";
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteGudanglocation(stdClass $params)
    {
//		$sql = $this -> db -> sqlBind($data, 'Factlocation', 'U', array('Factlocation_id' => $params -> Factlocation_id));
        $sql = "DELETE FROM gudang WHERE (co_id = '$params->co_id') and (gudang_id = '$params->gudang_id')";
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
}
