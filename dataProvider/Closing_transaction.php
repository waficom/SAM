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

class Closing_transaction
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
    public function getCT_month(stdClass $params)
    {

        $sql = "SELECT * FROM closing_month ORDER BY periode_month DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getCT_year(stdClass $params)
    {

        $sql = "SELECT * FROM closing_year ORDER BY periode_year DESC";
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
    public function addCT_month(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['closing_date'] = $this->db->Date_Converter($data['closing_date']);
        $sql = $this->db->sqlBind($data, 'closing_month', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function addCT_year(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['closing_date'] = $this->db->Date_Converter($data['closing_date']);
        $sql = $this->db->sqlBind($data, 'closing_year', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCT_month(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['periode_month']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['closing_date'] = $this->db->Date_Converter($data['closing_date']);
        $sql = $this->db->sqlBind($data, 'closing_month', 'U', array('periode_month' => $params->periode_month));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updateCT_year(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['periode_year']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['closing_date'] = $this->db->Date_Converter($data['closing_date']);
        $sql = $this->db->sqlBind($data, 'closing_year', 'U', array('periode_year' => $params->periode_year));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteCT_month(stdClass $params)
    {
        $sql = "DELETE FROM closing_month WHERE (co_id = '$params->co_id') and (periode_month = '$params->periode_month')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteCT_year(stdClass $params)
    {
        $sql = "DELETE FROM closing_year WHERE (co_id = '$params->co_id') and (periode_year = '$params->periode_year')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
