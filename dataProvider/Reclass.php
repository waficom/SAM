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

class Reclass
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

    public function getViewReclassOVB(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from view_reclass where co_id='$company' and account = '$params->account' or so_num='$params->so_num'
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
    public function getViewReclassOBJ(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select * from rpt_reclass_bj('$params->periode','$params->so_num','$company')
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
    public function addViewReclassOVB(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['inv_type'] = 'OVB';
        unset($data['id'],$data['check'],$data['coa_nama'],$data['so_num'] );
        $sql = $this -> db -> sqlBind($data, 'ap_reclass', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addViewReclassOBJ(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['inv_type'] = 'OBJ';
        unset($data['id'],$data['do_num'],$data['so_num'],$data['qty_susut'],$data['total'],$data['qty_do'],$data['rata2_hpp']);
        $sql = $this -> db -> sqlBind($data, 'ap_reclass', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
