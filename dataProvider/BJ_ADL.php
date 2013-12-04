<?php
/*
 GaiaEHR (Electronic Health Records)
 User.php
 User dataProvider
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
if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class BJ_ADL
{

    private $db;
    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }
    public function getBJ_ADL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM bj_adl where co_id='$company' ORDER BY prod_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }

    public function addBJ_ADL(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this->db->sqlBind($data, 'bj_adl', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateBJ_ADL(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this->db->sqlBind($data, 'bj_adl', 'U', array('co_id' => $params->co_id,'prod_id' => $params->prod_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteBJ_ADL(stdClass $params)
    {
        $sql = "DELETE FROM bj_Adl WHERE (co_id = '$params->co_id') and (prod_id = '$params->prod_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
