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

class Bank
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
    public function getBank(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'bank_code';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM bank_m where co_id='$company' ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        // print_r($sql);
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
    public function addBank(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['old_bank_code']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this->db->sqlBind($data, 'bank_m', 'I');
        $this->db->setSQL($sql);
        //print_r($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateBank(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['bank_code'], $data['old_bank_code']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $sql = $this->db->sqlBind($data, 'bank_m', 'U', array('bank_code' => $params->old_bank_code));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteBank(stdClass $params)
    {
        $sql = "DELETE FROM bank_m WHERE (co_id = '$params->co_id') and (bank_code = '$params->bank_code')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
