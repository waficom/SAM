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

class CancelReturn
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
    public function getCancelReturn(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "SELECT * FROM canceltransaksi ORDER BY $orderx DESC";
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
    public function addCancelReturn(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['canceled_date'] = $this->db->Date_Converter($data['canceled_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this->db->sqlBind($data, 'canceltransaksi', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCancelReturn(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id']);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['canceled_date'] = $this->db->Date_Converter($data['canceled_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $sql = $this->db->sqlBind($data, 'canceltransaksi', 'U', array('inv_code' => $params->inv_code));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteCancelReturn(stdClass $params)
    {
        $sql = "DELETE FROM canceltransaksi WHERE (co_id = '$params->co_id') and (inv_code = '$params->inv_code')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
