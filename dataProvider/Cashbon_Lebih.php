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

class Cashbon_Lebih
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

    public function getCashbon_Lebih(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "select * from cashbon where cb_type='L' ORDER BY $orderx DESC";
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
    public function addCashbon_Lebih(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['cb_type'] ='L';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['inv_code']);
        $sql = $this -> db -> sqlBind($data, 'cashbon', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCashbon_Lebih(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['inv_code']);
        $sql = $this -> db -> sqlBind($data, 'cashbon', 'U', array('inv_code' => $params -> inv_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteCashbon_Lebih(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM cashbon WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
