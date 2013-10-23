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
class ReleaseOrder
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

    public function getReleaseOrder(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'so_num';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM releasedorder where co_id='$company' ORDER BY $orderx DESC";
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

    public function updateReleaseOrder(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['released_date'] = $this->db->Date_Converter($data['released_date']);
        unset($data['id'], $data['so_num'], $data['co_id'], $data['old_so_num'],$data['tanggal']
        ,$data['cust_nama'],$data['cust_po_num'],$data['tgl_jt_kirim'],$data['ppn_so'],$data['n_netto'],$data['statusdesc']);
        if (is_null($data['released']) || ($data['released'] == '')) {
            $data['released'] = '0';
        }
        $data['status'] = 'B';
        $sql = $this -> db -> sqlBind($data, 'so0', 'U', array('so_num' => $params -> so_num));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */

}
