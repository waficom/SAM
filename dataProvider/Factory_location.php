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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*
         FROM pabrik_location a
        where a.co_id='$company'
        order by a.description ASC";
        $this -> db -> setSQL($sql);
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
        $sql = "SELECT * FROM gudang WHERE pabrik_sequence = '$params->pabrik_sequence' ORDER BY gudang_id ASC";
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
    public function addFactorylocation(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'], $data['pabrik_sequence']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'pabrik_location', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function addGudanglocation(stdClass $params)
    {

        $data = get_object_vars($params);

        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'gudang', 'I');
        $this -> db -> setSQL($sql);
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
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pabrik_sequence'],$data['co_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'pabrik_location', 'U', array('co_id' => $params-> co_id,'pabrik_sequence' => $params-> pabrik_sequence));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateGudanglocation(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pabrik_sequence'],$data['co_id'],$data['old_gudang_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'gudang', 'U', array('co_id' => $params-> co_id,'pabrik_sequence' => $params-> pabrik_sequence,'gudang_id' => $params-> gudang_id));
        $this -> db -> setSQL($sql);
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
        $sql = "DELETE FROM gudang WHERE (co_id = '$params->co_id') and (pabrik_sequence = '$params->pabrik_sequence')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pabrik_location WHERE (co_id = '$params->co_id') and (pabrik_sequence = '$params->pabrik_sequence')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteGudanglocation(stdClass $params)
    {
        $sql = "DELETE FROM gudang WHERE (co_id = '$params->co_id') and (gudang_id = '$params->gudang_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
}
